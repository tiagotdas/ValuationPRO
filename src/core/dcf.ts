import type { CompanyAnalysis, TerminalMethod } from '../types/valuation';
import {
  getEffectiveMarketCap,
  getEffectiveSharePrice,
  getEffectiveShares,
  getLastIndex,
  getOperatingWorkingCapital,
  getTotalDebt,
} from './accounting';
import { computeCostOfCapital, type CostOfCapitalResult } from './costOfCapital';
import { clamp, safeDiv } from './format';

export interface EVBridgeResult {
  shortAndLongTermDebt: number;
  leaseLiabilities: number;
  totalDebtUsed: number;
  cashAndEquivalents: number;
  netDebt: number;
  minorityInterest: number;
  preferredStock: number;
  provisionsAdjustment: number;
  nonOperatingAssets: number;
  /** Net deduction from EV to reach Equity Value: Equity = EV - netDeductionFromEV */
  netDeductionFromEV: number;
}

export interface FCFFProjectionRow {
  yearIndex: number;
  yearLabel: string;
  sales: number;
  salesGrowth: number; // %
  ebit: number;
  ebitMargin: number; // %
  ebitda: number;
  taxRate: number; // %
  taxes: number;
  nopat: number;
  da: number;
  capex: number;
  nwc: number;
  deltaNWC: number;
  reinvestment: number;
  fcff: number;
  discountPeriod: number;
  discountFactor: number;
  pvFcff: number;
}

export interface FCFFValuationResult {
  valid: boolean;
  errorMessage?: string;
  costOfCapital: CostOfCapitalResult;
  projections: FCFFProjectionRow[];
  pvOfExplicitFcff: number;
  terminalMethod: TerminalMethod;
  terminalValue: number;
  pvOfTerminalValue: number;
  terminalValueShareOfEV: number; // %
  impliedExitMultiple: number;
  impliedTerminalGrowth: number; // %
  impliedReinvestmentRate: number; // %
  impliedTerminalROIC: number | null; // %
  enterpriseValue: number;
  bridge: EVBridgeResult;
  equityValue: number;
  sharesUsed: number;
  valuePerShare: number;
  currentSharePrice: number;
  upsidePercent: number | null;
  safetyMarginPrice: number;
}

export interface FCFEProjectionRow {
  yearIndex: number;
  yearLabel: string;
  sales: number;
  salesGrowth: number; // %
  ebit: number;
  interestExpense: number;
  ebt: number;
  taxes: number;
  netIncome: number;
  da: number;
  capex: number;
  deltaNWC: number;
  netReinvestment: number;
  netDebtIssuance: number;
  endingDebt: number;
  fcfe: number;
  discountPeriod: number;
  discountFactor: number;
  pvFcfe: number;
}

export interface FCFEValuationResult {
  valid: boolean;
  errorMessage?: string;
  costOfEquity: number; // %
  projections: FCFEProjectionRow[];
  pvOfExplicitFcfe: number;
  terminalValue: number;
  pvOfTerminalValue: number;
  terminalValueShareOfEquity: number; // %
  cashAndNonOperatingAdded: number;
  equityValue: number;
  sharesUsed: number;
  valuePerShare: number;
  currentSharePrice: number;
  upsidePercent: number | null;
  safetyMarginPrice: number;
}

export interface ReverseDCFResult {
  valid: boolean;
  impliedSalesCAGR: number | null; // %
  impliedEbitMargin: number | null; // %
  currentMarketCap: number;
  baseProjectedCAGR: number; // %
  baseEbitMarginTarget: number; // %
}

export interface DCFOverrides {
  waccDelta?: number;
  keDelta?: number;
  salesGrowthDelta?: number;
  uniformSalesGrowth?: number;
  ebitMarginDelta?: number;
  uniformEbitMargin?: number;
  terminalGrowthOverride?: number;
  terminalGrowthDelta?: number;
  exitMultipleOverride?: number;
  terminalMethodOverride?: TerminalMethod;
}

export function computeEVBridge(company: CompanyAnalysis): EVBridgeResult {
  const f = company.financials;
  const a = company.valuationAssumptions;
  const lastIdx = getLastIndex(f);

  const shortAndLongTermDebt =
    (f.shortTermDebt[lastIdx] ?? 0) + (f.longTermDebt[lastIdx] ?? 0);
  const leaseLiabilities = f.leaseLiabilities[lastIdx] ?? 0;
  const totalDebtUsed =
    shortAndLongTermDebt + (a.includeLeasesInDebt ? leaseLiabilities : 0);
  const cashAndEquivalents = f.cashAndEquivalents[lastIdx] ?? 0;
  const netDebt = totalDebtUsed - cashAndEquivalents;
  const minorityInterest = f.minorityInterest[lastIdx] ?? 0;
  const preferredStock = f.preferredStock[lastIdx] ?? 0;
  const provisionsAdjustment = a.includeProvisionsInBridge
    ? f.provisions[lastIdx] ?? 0
    : 0;
  const nonOperatingAssets = f.nonOperatingAssets[lastIdx] ?? 0;

  const netDeductionFromEV =
    netDebt +
    minorityInterest +
    preferredStock +
    provisionsAdjustment -
    nonOperatingAssets;

  return {
    shortAndLongTermDebt,
    leaseLiabilities,
    totalDebtUsed,
    cashAndEquivalents,
    netDebt,
    minorityInterest,
    preferredStock,
    provisionsAdjustment,
    nonOperatingAssets,
    netDeductionFromEV,
  };
}

function getGrowthVector(
  rawGrowth: number[],
  horizon: number,
  delta = 0,
  uniform?: number
): number[] {
  if (uniform !== undefined) {
    return Array.from({ length: horizon }, () => uniform);
  }
  const clean = rawGrowth.filter((v) => Number.isFinite(v));
  const fallback = clean.length > 0 ? clean[clean.length - 1] : 5;
  return Array.from({ length: horizon }, (_, i) => {
    const base = i < clean.length ? clean[i] : fallback;
    return base + delta;
  });
}

function getNextYearLabels(years: string[], horizon: number): string[] {
  const last = years[years.length - 1] ?? '';
  const parsedLast = Number.parseInt(last, 10);
  const baseYear = Number.isFinite(parsedLast)
    ? parsedLast
    : new Date().getFullYear();
  return Array.from({ length: horizon }, (_, i) => `${baseYear + i + 1}E`);
}

export function computeDCF_FCFF(
  company: CompanyAnalysis,
  overrides?: DCFOverrides
): FCFFValuationResult {
  const f = company.financials;
  const a = company.valuationAssumptions;
  const lastIdx = getLastIndex(f);
  const horizon = clamp(Math.round(a.projectionYears || 5), 5, 10);

  const costOfCapital = computeCostOfCapital(company, {
    waccDelta: overrides?.waccDelta,
    keDelta: overrides?.keDelta,
  });
  const waccDec = costOfCapital.wacc / 100;
  const bridge = computeEVBridge(company);
  const sharesUsed = getEffectiveShares(company);
  const currentSharePrice = getEffectiveSharePrice(company);

  const terminalMethod = overrides?.terminalMethodOverride ?? a.terminalMethod;
  const gPercent =
    overrides?.terminalGrowthOverride ??
    a.terminalGrowthRate + (overrides?.terminalGrowthDelta ?? 0);
  const gDec = gPercent / 100;
  const exitMultiple = overrides?.exitMultipleOverride ?? a.exitEvEbitdaMultiple;

  const growthVec = getGrowthVector(
    a.salesGrowth,
    horizon,
    overrides?.salesGrowthDelta ?? 0,
    overrides?.uniformSalesGrowth
  );
  const yearLabels = getNextYearLabels(f.years, horizon);

  let lastSales = f.netSales[lastIdx] ?? 0;
  let lastNWC = getOperatingWorkingCapital(f)[lastIdx] ?? 0;

  const projections: FCFFProjectionRow[] = [];
  let pvOfExplicitFcff = 0;

  for (let i = 0; i < horizon; i++) {
    const t = i + 1;
    const progress = horizon > 1 ? i / (horizon - 1) : 1;
    const salesGrowth = growthVec[i];
    const sales = lastSales * (1 + salesGrowth / 100);

    const ebitMargin =
      overrides?.uniformEbitMargin !== undefined
        ? overrides.uniformEbitMargin
        : a.ebitMarginStart +
          (a.ebitMarginTarget - a.ebitMarginStart) * progress +
          (overrides?.ebitMarginDelta ?? 0);

    // Linear convergence from effective tax rate to marginal statutory tax rate
    const taxRate =
      a.effectiveTaxRate + (a.marginalTaxRate - a.effectiveTaxRate) * progress;

    const ebit = sales * (ebitMargin / 100);
    const taxes = ebit > 0 ? ebit * (taxRate / 100) : 0;
    const nopat = ebit - taxes;
    const da = sales * (a.depAsPercentOfSales / 100);
    const ebitda = ebit + da;
    const capex = sales * (a.capexAsPercentOfSales / 100);
    const nwc = sales * (a.nwcAsPercentOfSales / 100);
    const deltaNWC = nwc - lastNWC;
    const reinvestment = capex - da + deltaNWC;
    const fcff = nopat - reinvestment;

    const discountPeriod = a.midYearConvention ? t - 0.5 : t;
    const discountFactor =
      waccDec > -0.99 ? 1 / Math.pow(1 + waccDec, discountPeriod) : 0;
    const pvFcff = fcff * discountFactor;
    pvOfExplicitFcff += pvFcff;

    projections.push({
      yearIndex: t,
      yearLabel: yearLabels[i],
      sales,
      salesGrowth,
      ebit,
      ebitMargin,
      ebitda,
      taxRate,
      taxes,
      nopat,
      da,
      capex,
      nwc,
      deltaNWC,
      reinvestment,
      fcff,
      discountPeriod,
      discountFactor,
      pvFcff,
    });

    lastSales = sales;
    lastNWC = nwc;
  }

  const lastRow = projections[projections.length - 1];
  const invalidRate =
    terminalMethod !== 'exit_multiple' && waccDec <= gDec;

  if (lastSales <= 0 || invalidRate || waccDec <= 0) {
    return {
      valid: false,
      errorMessage:
        lastSales <= 0
          ? 'Receita líquida histórica deve ser maior que zero para projetar o DCF.'
          : 'WACC deve ser estritamente maior que a taxa de crescimento perpétuo (g).',
      costOfCapital,
      projections,
      pvOfExplicitFcff,
      terminalMethod,
      terminalValue: 0,
      pvOfTerminalValue: 0,
      terminalValueShareOfEV: 0,
      impliedExitMultiple: 0,
      impliedTerminalGrowth: 0,
      impliedReinvestmentRate: 0,
      impliedTerminalROIC: null,
      enterpriseValue: 0,
      bridge,
      equityValue: 0,
      sharesUsed,
      valuePerShare: 0,
      currentSharePrice,
      upsidePercent: null,
      safetyMarginPrice: 0,
    };
  }

  let terminalValue = 0;
  let impliedReinvestmentRate = 0;
  let impliedTerminalROIC: number | null = null;

  const nopatNext = lastRow.nopat * (1 + gDec);

  if (terminalMethod === 'value_driver') {
    const roicTermDec = Math.max(0.01, a.terminalROIC / 100);
    const reinvRate = gDec > 0 ? clamp(gDec / roicTermDec, 0, 0.95) : 0;
    const fcffTerminal = nopatNext * (1 - reinvRate);
    terminalValue = safeDiv(fcffTerminal, waccDec - gDec);
    impliedReinvestmentRate = reinvRate * 100;
    impliedTerminalROIC = a.terminalROIC;
  } else if (terminalMethod === 'gordon') {
    const fcffTerminal = lastRow.fcff * (1 + gDec);
    terminalValue = safeDiv(fcffTerminal, waccDec - gDec);
    const reinvRate = nopatNext > 0 ? 1 - fcffTerminal / nopatNext : 0;
    impliedReinvestmentRate = reinvRate * 100;
    impliedTerminalROIC =
      reinvRate > 0.001 && gDec > 0 ? (gDec / reinvRate) * 100 : null;
  } else {
    // Exit Multiple (EV / EBITDA)
    terminalValue = Math.max(0, lastRow.ebitda) * Math.max(0, exitMultiple);
    const fcffTerminalImplied = lastRow.fcff * (1 + gDec);
    const reinvRate = nopatNext > 0 ? 1 - fcffTerminalImplied / nopatNext : 0;
    impliedReinvestmentRate = reinvRate * 100;
    impliedTerminalROIC =
      reinvRate > 0.001 && gDec > 0 ? (gDec / reinvRate) * 100 : null;
  }

  // Discount TV back from end of Year N (standard conservative practice even under mid-year explicit CFs)
  const pvOfTerminalValue = terminalValue / Math.pow(1 + waccDec, horizon);
  const enterpriseValue = pvOfExplicitFcff + pvOfTerminalValue;
  const terminalValueShareOfEV =
    enterpriseValue > 0 ? safeDiv(pvOfTerminalValue, enterpriseValue) * 100 : 0;

  const impliedExitMultiple = safeDiv(terminalValue, lastRow.ebitda);
  const impliedTerminalGrowthDec =
    terminalValue + lastRow.fcff > 0
      ? safeDiv(terminalValue * waccDec - lastRow.fcff, terminalValue + lastRow.fcff)
      : 0;

  const equityValue = enterpriseValue - bridge.netDeductionFromEV;
  const valuePerShare = sharesUsed > 0 ? safeDiv(equityValue, sharesUsed) : 0;
  const upsidePercent =
    currentSharePrice > 0
      ? ((valuePerShare - currentSharePrice) / currentSharePrice) * 100
      : null;
  const safetyMarginPrice =
    valuePerShare * (1 - clamp(a.safetyMarginTarget, 0, 80) / 100);

  return {
    valid: true,
    costOfCapital,
    projections,
    pvOfExplicitFcff,
    terminalMethod,
    terminalValue,
    pvOfTerminalValue,
    terminalValueShareOfEV,
    impliedExitMultiple,
    impliedTerminalGrowth: impliedTerminalGrowthDec * 100,
    impliedReinvestmentRate,
    impliedTerminalROIC,
    enterpriseValue,
    bridge,
    equityValue,
    sharesUsed,
    valuePerShare,
    currentSharePrice,
    upsidePercent,
    safetyMarginPrice,
  };
}

/**
 * Rigorous FCFE Valuation (Damodaran framework):
 * FCFE_t = Net Income_t - (1 - delta) * (CAPEX_t - D&A_t + deltaNWC_t)
 * where delta = target debt financing ratio of net reinvestment,
 * and interest expense tracks the projected debt balance.
 */
export function computeDCF_FCFE(
  company: CompanyAnalysis,
  overrides?: DCFOverrides
): FCFEValuationResult {
  const f = company.financials;
  const a = company.valuationAssumptions;
  const lastIdx = getLastIndex(f);
  const horizon = clamp(Math.round(a.projectionYears || 5), 5, 10);

  const coc = computeCostOfCapital(company, { keDelta: overrides?.keDelta });
  const keDec = coc.costOfEquity / 100;
  const kdDec = coc.preTaxCostOfDebt / 100;
  const gPercent =
    overrides?.terminalGrowthOverride ??
    a.terminalGrowthRate + (overrides?.terminalGrowthDelta ?? 0);
  const gDec = gPercent / 100;

  const sharesUsed = getEffectiveShares(company);
  const currentSharePrice = getEffectiveSharePrice(company);
  const deltaDebtRatio = clamp(a.fcfeTargetDebtRatio / 100, 0, 0.85);

  const growthVec = getGrowthVector(
    a.salesGrowth,
    horizon,
    overrides?.salesGrowthDelta ?? 0,
    overrides?.uniformSalesGrowth
  );
  const yearLabels = getNextYearLabels(f.years, horizon);

  let lastSales = f.netSales[lastIdx] ?? 0;
  let lastNWC = getOperatingWorkingCapital(f)[lastIdx] ?? 0;
  let currentDebt = Math.max(0, getTotalDebt(f, a.includeLeasesInDebt)[lastIdx] ?? 0);

  const projections: FCFEProjectionRow[] = [];
  let pvOfExplicitFcfe = 0;

  for (let i = 0; i < horizon; i++) {
    const t = i + 1;
    const progress = horizon > 1 ? i / (horizon - 1) : 1;
    const salesGrowth = growthVec[i];
    const sales = lastSales * (1 + salesGrowth / 100);

    const ebitMargin =
      overrides?.uniformEbitMargin !== undefined
        ? overrides.uniformEbitMargin
        : a.ebitMarginStart +
          (a.ebitMarginTarget - a.ebitMarginStart) * progress +
          (overrides?.ebitMarginDelta ?? 0);
    const taxRate =
      a.effectiveTaxRate + (a.marginalTaxRate - a.effectiveTaxRate) * progress;

    const ebit = sales * (ebitMargin / 100);
    const interestExpense = currentDebt * kdDec;
    const ebt = ebit - interestExpense;
    const taxes = ebt > 0 ? ebt * (taxRate / 100) : 0;
    const netIncome = ebt - taxes;

    const da = sales * (a.depAsPercentOfSales / 100);
    const capex = sales * (a.capexAsPercentOfSales / 100);
    const nwc = sales * (a.nwcAsPercentOfSales / 100);
    const deltaNWC = nwc - lastNWC;

    const netReinvestment = capex - da + deltaNWC;
    const netDebtIssuance = deltaDebtRatio * netReinvestment;
    const endingDebt = Math.max(0, currentDebt + netDebtIssuance);
    const actualDebtFlow = endingDebt - currentDebt;
    const fcfe = netIncome - netReinvestment + actualDebtFlow;

    const discountPeriod = a.midYearConvention ? t - 0.5 : t;
    const discountFactor =
      keDec > -0.99 ? 1 / Math.pow(1 + keDec, discountPeriod) : 0;
    const pvFcfe = fcfe * discountFactor;
    pvOfExplicitFcfe += pvFcfe;

    projections.push({
      yearIndex: t,
      yearLabel: yearLabels[i],
      sales,
      salesGrowth,
      ebit,
      interestExpense,
      ebt,
      taxes,
      netIncome,
      da,
      capex,
      deltaNWC,
      netReinvestment,
      netDebtIssuance: actualDebtFlow,
      endingDebt,
      fcfe,
      discountPeriod,
      discountFactor,
      pvFcfe,
    });

    lastSales = sales;
    lastNWC = nwc;
    currentDebt = endingDebt;
  }

  if (lastSales <= 0 || keDec <= gDec || keDec <= 0) {
    return {
      valid: false,
      errorMessage:
        lastSales <= 0
          ? 'Receita líquida histórica deve ser maior que zero para projetar o FCFE.'
          : 'Custo do Capital Próprio (Ke) deve ser estritamente maior que g.',
      costOfEquity: coc.costOfEquity,
      projections,
      pvOfExplicitFcfe,
      terminalValue: 0,
      pvOfTerminalValue: 0,
      terminalValueShareOfEquity: 0,
      cashAndNonOperatingAdded: 0,
      equityValue: 0,
      sharesUsed,
      valuePerShare: 0,
      currentSharePrice,
      upsidePercent: null,
      safetyMarginPrice: 0,
    };
  }

  const lastRow = projections[projections.length - 1];
  const terminalValue = safeDiv(lastRow.fcfe * (1 + gDec), keDec - gDec);
  const pvOfTerminalValue = terminalValue / Math.pow(1 + keDec, horizon);

  // Add cash & non-operating assets since projected EBT excludes financial income on cash (Damodaran)
  const cashAndNonOperatingAdded =
    (f.cashAndEquivalents[lastIdx] ?? 0) +
    (f.nonOperatingAssets[lastIdx] ?? 0) -
    (f.preferredStock[lastIdx] ?? 0) -
    (f.minorityInterest[lastIdx] ?? 0);

  const equityValue = pvOfExplicitFcfe + pvOfTerminalValue + cashAndNonOperatingAdded;
  const terminalValueShareOfEquity =
    equityValue > 0 ? safeDiv(pvOfTerminalValue, equityValue) * 100 : 0;
  const valuePerShare = sharesUsed > 0 ? safeDiv(equityValue, sharesUsed) : 0;
  const upsidePercent =
    currentSharePrice > 0
      ? ((valuePerShare - currentSharePrice) / currentSharePrice) * 100
      : null;
  const safetyMarginPrice =
    valuePerShare * (1 - clamp(a.safetyMarginTarget, 0, 80) / 100);

  return {
    valid: true,
    costOfEquity: coc.costOfEquity,
    projections,
    pvOfExplicitFcfe,
    terminalValue,
    pvOfTerminalValue,
    terminalValueShareOfEquity,
    cashAndNonOperatingAdded,
    equityValue,
    sharesUsed,
    valuePerShare,
    currentSharePrice,
    upsidePercent,
    safetyMarginPrice,
  };
}

/**
 * Reverse DCF (Market-Implied Expectations):
 * Solves for the constant revenue CAGR and constant EBIT margin implied by the current Market Cap.
 */
export function computeReverseDCF(company: CompanyAnalysis): ReverseDCFResult {
  const targetMarketCap = getEffectiveMarketCap(company);
  const a = company.valuationAssumptions;
  const horizon = clamp(Math.round(a.projectionYears || 5), 5, 10);
  const growthVec = getGrowthVector(a.salesGrowth, horizon);
  const compounded = growthVec.reduce((acc, g) => acc * (1 + g / 100), 1);
  const baseProjectedCAGR = (Math.pow(Math.max(0.01, compounded), 1 / horizon) - 1) * 100;

  if (targetMarketCap <= 0) {
    return {
      valid: false,
      impliedSalesCAGR: null,
      impliedEbitMargin: null,
      currentMarketCap: 0,
      baseProjectedCAGR,
      baseEbitMarginTarget: a.ebitMarginTarget,
    };
  }

  const solveBisection = (
    fn: (x: number) => number,
    lowInit: number,
    highInit: number
  ): number | null => {
    let lo = lowInit;
    let hi = highInit;
    const fLo = fn(lo) - targetMarketCap;
    const fHi = fn(hi) - targetMarketCap;
    if (!Number.isFinite(fLo) || !Number.isFinite(fHi)) return null;
    if (fLo * fHi > 0) return null;

    for (let iter = 0; iter < 60; iter++) {
      const mid = (lo + hi) / 2;
      const fMid = fn(mid) - targetMarketCap;
      if (Math.abs(fMid) < Math.max(1e-4, targetMarketCap * 1e-6)) {
        return mid;
      }
      if (fLo * fMid <= 0) {
        hi = mid;
      } else {
        lo = mid;
      }
    }
    return (lo + hi) / 2;
  };

  const impliedSalesCAGR = solveBisection(
    (g) => computeDCF_FCFF(company, { uniformSalesGrowth: g }).equityValue,
    -25,
    80
  );

  const impliedEbitMargin = solveBisection(
    (m) => computeDCF_FCFF(company, { uniformEbitMargin: m }).equityValue,
    0.5,
    75
  );

  return {
    valid: impliedSalesCAGR !== null || impliedEbitMargin !== null,
    impliedSalesCAGR,
    impliedEbitMargin,
    currentMarketCap: targetMarketCap,
    baseProjectedCAGR,
    baseEbitMarginTarget: a.ebitMarginTarget,
  };
}
