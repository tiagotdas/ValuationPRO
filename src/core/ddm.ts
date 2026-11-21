import type { CompanyAnalysis, DDMModelType } from '../types/valuation';
import {
  getEffectiveSharePrice,
  getShareholderReturns,
  type ShareholderReturnMetrics,
} from './accounting';
import { computeCostOfCapital } from './costOfCapital';
import { clamp, safeDiv } from './format';

export interface DDMProjectionRow {
  year: number;
  dividend: number;
  growthRate: number; // %
  pvDividend: number;
}

export interface DDMResult {
  valid: boolean;
  errorMessage?: string;
  model: DDMModelType;
  costOfEquity: number; // %
  d0: number;
  d1: number;
  longTermGrowth: number; // %
  highGrowthRate: number; // %
  highGrowthYears: number;
  projections: DDMProjectionRow[];
  terminalValue: number;
  pvOfTerminalValue: number;
  valuePerShare: number;
  currentSharePrice: number;
  upsidePercent: number | null;
  safetyMarginPrice: number;
  shareholderReturns: ShareholderReturnMetrics;
}

/**
 * Dividend Discount Model supporting:
 * 1. Gordon Growth (1-Stage): V0 = D0 * (1 + g) / (Ke - g)
 * 2. Two-Stage DDM: explicit high-growth phase N years + Gordon terminal value
 * 3. H-Model (Fuller-Hsia): linear fade of growth from g_S to g_L over 2H years:
 *    V0 = [D0 * (1 + g_L) + D0 * H * (g_S - g_L)] / (Ke - g_L)
 */
export function computeDDM(company: CompanyAnalysis): DDMResult {
  const a = company.valuationAssumptions;
  const coc = computeCostOfCapital(company);
  const keDec = coc.costOfEquity / 100;
  const gLongDec = a.dividendGrowthRate / 100;
  const gHighDec = a.ddmHighGrowthRate / 100;
  const highYears = clamp(Math.round(a.ddmHighGrowthYears || 5), 1, 15);

  const d0 = company.dividendPerShare;
  const currentSharePrice = getEffectiveSharePrice(company);
  const shareholderReturns = getShareholderReturns(company);

  if (!d0 || d0 <= 0) {
    return {
      valid: false,
      errorMessage: 'Informe um Dividendo por Ação (D0) maior que zero para calcular o DDM.',
      model: a.ddmModel,
      costOfEquity: coc.costOfEquity,
      d0: 0,
      d1: 0,
      longTermGrowth: a.dividendGrowthRate,
      highGrowthRate: a.ddmHighGrowthRate,
      highGrowthYears: highYears,
      projections: [],
      terminalValue: 0,
      pvOfTerminalValue: 0,
      valuePerShare: 0,
      currentSharePrice,
      upsidePercent: null,
      safetyMarginPrice: 0,
      shareholderReturns,
    };
  }

  if (keDec <= gLongDec || keDec <= 0) {
    return {
      valid: false,
      errorMessage: 'Custo do Capital Próprio (Ke) deve ser maior que o crescimento perpétuo de dividendos (g).',
      model: a.ddmModel,
      costOfEquity: coc.costOfEquity,
      d0,
      d1: d0 * (1 + gLongDec),
      longTermGrowth: a.dividendGrowthRate,
      highGrowthRate: a.ddmHighGrowthRate,
      highGrowthYears: highYears,
      projections: [],
      terminalValue: 0,
      pvOfTerminalValue: 0,
      valuePerShare: 0,
      currentSharePrice,
      upsidePercent: null,
      safetyMarginPrice: 0,
      shareholderReturns,
    };
  }

  let valuePerShare = 0;
  let terminalValue = 0;
  let pvOfTerminalValue = 0;
  let d1 = d0 * (1 + gLongDec);
  const projections: DDMProjectionRow[] = [];

  if (a.ddmModel === 'gordon') {
    d1 = d0 * (1 + gLongDec);
    valuePerShare = safeDiv(d1, keDec - gLongDec);
    terminalValue = valuePerShare;
    pvOfTerminalValue = valuePerShare;
    for (let t = 1; t <= 5; t++) {
      const div = d0 * Math.pow(1 + gLongDec, t);
      projections.push({
        year: t,
        dividend: div,
        growthRate: a.dividendGrowthRate,
        pvDividend: div / Math.pow(1 + keDec, t),
      });
    }
  } else if (a.ddmModel === 'two_stage') {
    let pvExplicit = 0;
    let prevDiv = d0;
    for (let t = 1; t <= highYears; t++) {
      const div = prevDiv * (1 + gHighDec);
      const pvDiv = div / Math.pow(1 + keDec, t);
      pvExplicit += pvDiv;
      projections.push({
        year: t,
        dividend: div,
        growthRate: a.ddmHighGrowthRate,
        pvDividend: pvDiv,
      });
      prevDiv = div;
    }
    d1 = projections[0]?.dividend ?? d0 * (1 + gHighDec);
    const dNext = prevDiv * (1 + gLongDec);
    terminalValue = safeDiv(dNext, keDec - gLongDec);
    pvOfTerminalValue = terminalValue / Math.pow(1 + keDec, highYears);
    valuePerShare = pvExplicit + pvOfTerminalValue;
  } else {
    // H-Model (Fuller-Hsia): fade duration = highYears (= 2H), so H = highYears / 2
    const H = highYears / 2;
    const numerator = d0 * (1 + gLongDec) + d0 * H * (gHighDec - gLongDec);
    valuePerShare = safeDiv(numerator, keDec - gLongDec);

    let prevDiv = d0;
    for (let t = 1; t <= highYears; t++) {
      const gT = gHighDec - ((gHighDec - gLongDec) * t) / highYears;
      const div = prevDiv * (1 + gT);
      projections.push({
        year: t,
        dividend: div,
        growthRate: gT * 100,
        pvDividend: div / Math.pow(1 + keDec, t),
      });
      prevDiv = div;
    }
    d1 = projections[0]?.dividend ?? d0 * (1 + gHighDec);
    terminalValue = safeDiv(prevDiv * (1 + gLongDec), keDec - gLongDec);
    pvOfTerminalValue = terminalValue / Math.pow(1 + keDec, highYears);
  }

  const upsidePercent =
    currentSharePrice > 0
      ? ((valuePerShare - currentSharePrice) / currentSharePrice) * 100
      : null;
  const safetyMarginPrice =
    valuePerShare * (1 - clamp(a.safetyMarginTarget, 0, 80) / 100);

  return {
    valid: true,
    model: a.ddmModel,
    costOfEquity: coc.costOfEquity,
    d0,
    d1,
    longTermGrowth: a.dividendGrowthRate,
    highGrowthRate: a.ddmHighGrowthRate,
    highGrowthYears: highYears,
    projections,
    terminalValue,
    pvOfTerminalValue,
    valuePerShare,
    currentSharePrice,
    upsidePercent,
    safetyMarginPrice,
    shareholderReturns,
  };
}
