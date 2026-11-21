import type { CompanyAnalysis } from '../types/valuation';
import { getEffectiveSharePrice } from './accounting';
import { computeCostOfCapital } from './costOfCapital';
import { computeDCF_FCFE, computeDCF_FCFF } from './dcf';
import { computeDDM } from './ddm';
import { computeRelativeValuation } from './multiples';

export interface SensitivityCell {
  valuePerShare: number;
  upsidePercent: number | null;
  valid: boolean;
}

export interface SensitivityMatrix {
  title: string;
  rowLabel: string;
  colLabel: string;
  rowValues: number[];
  colValues: number[];
  rowUnit: string;
  colUnit: string;
  cells: SensitivityCell[][];
}

export interface ScenarioOutcome {
  key: 'bear' | 'base' | 'bull';
  label: string;
  probability: number;
  wacc: number;
  terminalGrowth: number;
  enterpriseValue: number;
  equityValue: number;
  valuePerShare: number;
  upsidePercent: number | null;
}

export interface ScenariosSummary {
  outcomes: ScenarioOutcome[];
  totalProbability: number;
  expectedValuePerShare: number;
  expectedUpsidePercent: number | null;
}

export interface FootballFieldBar {
  id: string;
  label: string;
  subtitle: string;
  low: number;
  mid: number;
  high: number;
  category: 'intrinsic' | 'relative' | 'market';
}

export interface FootballFieldSummary {
  currentSharePrice: number;
  bars: FootballFieldBar[];
  consensusLow: number | null;
  consensusMid: number | null;
  consensusHigh: number | null;
}

export function computeWaccGrowthMatrix(company: CompanyAnalysis): SensitivityMatrix {
  const coc = computeCostOfCapital(company);
  const a = company.valuationAssumptions;
  const waccDeltas = [-2.0, -1.0, 0, 1.0, 2.0];
  const gDeltas = [-1.5, -0.75, 0, 0.75, 1.5];

  const rowValues = waccDeltas.map((d) => Number((coc.wacc + d).toFixed(2)));
  const colValues = gDeltas.map((d) => Number((a.terminalGrowthRate + d).toFixed(2)));

  const cells: SensitivityCell[][] = waccDeltas.map((wd) =>
    gDeltas.map((gd) => {
      const res = computeDCF_FCFF(company, {
        waccDelta: wd,
        terminalGrowthOverride: a.terminalGrowthRate + gd,
        terminalMethodOverride:
          a.terminalMethod === 'exit_multiple' ? 'value_driver' : a.terminalMethod,
      });
      return {
        valuePerShare: res.valuePerShare,
        upsidePercent: res.upsidePercent,
        valid: res.valid && res.valuePerShare > 0,
      };
    })
  );

  return {
    title: 'Sensibilidade: WACC × Crescimento Perpétuo (g)',
    rowLabel: 'WACC (%)',
    colLabel: 'Cresc. Perpétuo g (%)',
    rowValues,
    colValues,
    rowUnit: '%',
    colUnit: '%',
    cells,
  };
}

export function computeWaccMarginMatrix(company: CompanyAnalysis): SensitivityMatrix {
  const coc = computeCostOfCapital(company);
  const a = company.valuationAssumptions;
  const waccDeltas = [-2.0, -1.0, 0, 1.0, 2.0];
  const marginDeltas = [-4.0, -2.0, 0, 2.0, 4.0];

  const rowValues = waccDeltas.map((d) => Number((coc.wacc + d).toFixed(2)));
  const colValues = marginDeltas.map((d) => Number((a.ebitMarginTarget + d).toFixed(1)));

  const cells: SensitivityCell[][] = waccDeltas.map((wd) =>
    marginDeltas.map((md) => {
      const res = computeDCF_FCFF(company, {
        waccDelta: wd,
        ebitMarginDelta: md,
      });
      return {
        valuePerShare: res.valuePerShare,
        upsidePercent: res.upsidePercent,
        valid: res.valid && res.valuePerShare > 0,
      };
    })
  );

  return {
    title: 'Sensibilidade: WACC × Margem EBIT Alvo',
    rowLabel: 'WACC (%)',
    colLabel: 'Margem EBIT Alvo (%)',
    rowValues,
    colValues,
    rowUnit: '%',
    colUnit: '%',
    cells,
  };
}

export function computeWaccExitMultipleMatrix(company: CompanyAnalysis): SensitivityMatrix {
  const coc = computeCostOfCapital(company);
  const a = company.valuationAssumptions;
  const waccDeltas = [-2.0, -1.0, 0, 1.0, 2.0];
  const multDeltas = [-2.0, -1.0, 0, 1.0, 2.0];

  const rowValues = waccDeltas.map((d) => Number((coc.wacc + d).toFixed(2)));
  const colValues = multDeltas.map((d) =>
    Number(Math.max(1, a.exitEvEbitdaMultiple + d).toFixed(1))
  );

  const cells: SensitivityCell[][] = waccDeltas.map((wd) =>
    colValues.map((mult) => {
      const res = computeDCF_FCFF(company, {
        waccDelta: wd,
        exitMultipleOverride: mult,
        terminalMethodOverride: 'exit_multiple',
      });
      return {
        valuePerShare: res.valuePerShare,
        upsidePercent: res.upsidePercent,
        valid: res.valid && res.valuePerShare > 0,
      };
    })
  );

  return {
    title: 'Sensibilidade: WACC × Múltiplo de Saída (EV/EBITDA)',
    rowLabel: 'WACC (%)',
    colLabel: 'EV/EBITDA Saída (x)',
    rowValues,
    colValues,
    rowUnit: '%',
    colUnit: 'x',
    cells,
  };
}

export function computeScenarios(company: CompanyAnalysis): ScenariosSummary {
  const a = company.valuationAssumptions;
  const currentPrice = getEffectiveSharePrice(company);
  const keys: Array<'bear' | 'base' | 'bull'> = ['bear', 'base', 'bull'];

  const outcomes: ScenarioOutcome[] = keys.map((key) => {
    const cfg = a.scenarios[key];
    const res = computeDCF_FCFF(company, {
      salesGrowthDelta: cfg.salesGrowthDelta,
      ebitMarginDelta: cfg.ebitMarginDelta,
      waccDelta: cfg.waccDelta,
      terminalGrowthDelta: cfg.terminalGrowthDelta,
    });
    return {
      key,
      label: cfg.label,
      probability: cfg.probability,
      wacc: res.costOfCapital.wacc,
      terminalGrowth: a.terminalGrowthRate + cfg.terminalGrowthDelta,
      enterpriseValue: res.enterpriseValue,
      equityValue: res.equityValue,
      valuePerShare: res.valid ? Math.max(0, res.valuePerShare) : 0,
      upsidePercent: res.valid ? res.upsidePercent : null,
    };
  });

  const totalProbability = outcomes.reduce((acc, o) => acc + Math.max(0, o.probability), 0);
  const expectedValuePerShare =
    totalProbability > 0
      ? outcomes.reduce((acc, o) => acc + o.valuePerShare * (Math.max(0, o.probability) / totalProbability), 0)
      : 0;
  const expectedUpsidePercent =
    currentPrice > 0 && expectedValuePerShare > 0
      ? ((expectedValuePerShare - currentPrice) / currentPrice) * 100
      : null;

  return {
    outcomes,
    totalProbability,
    expectedValuePerShare,
    expectedUpsidePercent,
  };
}

export function computeFootballField(company: CompanyAnalysis): FootballFieldSummary {
  const currentSharePrice = getEffectiveSharePrice(company);
  const bars: FootballFieldBar[] = [];

  // 1. DCF FCFF (Bear - Base - Bull)
  const scenarios = computeScenarios(company);
  const bear = scenarios.outcomes.find((o) => o.key === 'bear');
  const base = scenarios.outcomes.find((o) => o.key === 'base');
  const bull = scenarios.outcomes.find((o) => o.key === 'bull');
  if (base && base.valuePerShare > 0) {
    const low = Math.min(bear?.valuePerShare || base.valuePerShare, base.valuePerShare);
    const high = Math.max(bull?.valuePerShare || base.valuePerShare, base.valuePerShare);
    bars.push({
      id: 'dcf-fcff-scenarios',
      label: 'DCF FCFF (Cenários)',
      subtitle: 'Bear / Base / Bull',
      low,
      mid: base.valuePerShare,
      high,
      category: 'intrinsic',
    });
  }

  // 2. DCF FCFF Exit Multiple (+/- 1x WACC/Multiple range)
  const fcffExitLow = computeDCF_FCFF(company, {
    terminalMethodOverride: 'exit_multiple',
    exitMultipleOverride: Math.max(1, company.valuationAssumptions.exitEvEbitdaMultiple - 1),
    waccDelta: 1,
  });
  const fcffExitMid = computeDCF_FCFF(company, { terminalMethodOverride: 'exit_multiple' });
  const fcffExitHigh = computeDCF_FCFF(company, {
    terminalMethodOverride: 'exit_multiple',
    exitMultipleOverride: company.valuationAssumptions.exitEvEbitdaMultiple + 1,
    waccDelta: -1,
  });
  if (fcffExitMid.valid && fcffExitMid.valuePerShare > 0) {
    bars.push({
      id: 'dcf-fcff-exit',
      label: 'DCF FCFF (Exit Multiple)',
      subtitle: 'EV/EBITDA Saída (±1x)',
      low: Math.max(0, Math.min(fcffExitLow.valuePerShare, fcffExitMid.valuePerShare)),
      mid: fcffExitMid.valuePerShare,
      high: Math.max(fcffExitHigh.valuePerShare, fcffExitMid.valuePerShare),
      category: 'intrinsic',
    });
  }

  // 3. DCF FCFE (+/- 1% Ke)
  const fcfeLow = computeDCF_FCFE(company, { keDelta: 1 });
  const fcfeMid = computeDCF_FCFE(company);
  const fcfeHigh = computeDCF_FCFE(company, { keDelta: -1 });
  if (fcfeMid.valid && fcfeMid.valuePerShare > 0) {
    bars.push({
      id: 'dcf-fcfe',
      label: 'DCF FCFE (Acionista)',
      subtitle: 'Faixa Ke ±1,0%',
      low: Math.max(0, Math.min(fcfeLow.valuePerShare, fcfeMid.valuePerShare)),
      mid: fcfeMid.valuePerShare,
      high: Math.max(fcfeHigh.valuePerShare, fcfeMid.valuePerShare),
      category: 'intrinsic',
    });
  }

  // 4. DDM
  const ddm = computeDDM(company);
  if (ddm.valid && ddm.valuePerShare > 0) {
    bars.push({
      id: 'ddm',
      label: 'DDM (Dividendos)',
      subtitle: ddm.model === 'gordon' ? 'Gordon' : ddm.model === 'two_stage' ? '2 Estágios' : 'Modelo H',
      low: ddm.valuePerShare * 0.9,
      mid: ddm.valuePerShare,
      high: ddm.valuePerShare * 1.1,
      category: 'intrinsic',
    });
  }

  // 5. Peer Multiples (EV/EBITDA, P/E, EV/Sales)
  const rel = computeRelativeValuation(company);
  for (const row of rel.peerValuations) {
    if (
      ['evToEbitda', 'pe', 'evToSales'].includes(row.metric) &&
      row.impliedPriceMedian !== null &&
      row.impliedPriceMedian > 0
    ) {
      const low = Math.max(0, row.impliedPriceLow ?? row.impliedPriceMedian * 0.9);
      const high = Math.max(row.impliedPriceHigh ?? row.impliedPriceMedian * 1.1, low);
      bars.push({
        id: `peer-${row.metric}`,
        label: `Comps (${row.label})`,
        subtitle: `Q1 – Mediana – Q3 (${row.peerStats.count} pares)`,
        low,
        mid: row.impliedPriceMedian,
        high,
        category: 'relative',
      });
    }
  }

  // 6. 52-Week Trading Range
  if (company.week52Low > 0 && company.week52High > company.week52Low) {
    bars.push({
      id: 'week52',
      label: 'Faixa 52 Semanas',
      subtitle: 'Mín – Atual – Máx',
      low: company.week52Low,
      mid: currentSharePrice > 0 ? currentSharePrice : (company.week52Low + company.week52High) / 2,
      high: company.week52High,
      category: 'market',
    });
  }

  const valuationBars = bars.filter((b) => b.category !== 'market' && b.mid > 0);
  const consensusLow =
    valuationBars.length > 0
      ? valuationBars.reduce((acc, b) => acc + b.low, 0) / valuationBars.length
      : null;
  const consensusMid =
    valuationBars.length > 0
      ? valuationBars.reduce((acc, b) => acc + b.mid, 0) / valuationBars.length
      : null;
  const consensusHigh =
    valuationBars.length > 0
      ? valuationBars.reduce((acc, b) => acc + b.high, 0) / valuationBars.length
      : null;

  return {
    currentSharePrice,
    bars,
    consensusLow,
    consensusMid,
    consensusHigh,
  };
}
