import type { CompanyAnalysis, PeerCompany } from '../types/valuation';
import {
  getEBIT,
  getEBITDA,
  getEffectiveMarketCap,
  getEffectiveSharePrice,
  getEffectiveShares,
  getHistoricalFCF,
  getLastIndex,
  getNetIncome,
  getROE,
  getShareholderReturns,
} from './accounting';
import { computeCostOfCapital } from './costOfCapital';
import { computeDCF_FCFF, computeEVBridge } from './dcf';
import { safeDiv } from './format';

export interface StatSummary {
  count: number;
  mean: number | null;
  median: number | null;
  q1: number | null;
  q3: number | null;
  min: number | null;
  max: number | null;
}

export interface MultipleImpliedValuation {
  metric: string;
  label: string;
  companyCurrentMultiple: number | null;
  peerStats: StatSummary;
  impliedPriceLow: number | null; // Q1 (or min if <4 peers)
  impliedPriceMedian: number | null;
  impliedPriceHigh: number | null; // Q3 (or max if <4 peers)
  upsideAtMedian: number | null;
}

export interface FundamentalMultiplesResult {
  justifiedPE: number | null;
  justifiedPB: number | null;
  justifiedEvEbitda: number | null;
  impliedPriceJustifiedPE: number | null;
  impliedPriceJustifiedPB: number | null;
  companyCurrent: {
    evToEbitda: number | null;
    evToEbit: number | null;
    evToSales: number | null;
    pe: number | null;
    pb: number | null;
    fcfYield: number | null; // %
  };
}

export interface RelativeValuationResult {
  peerValuations: MultipleImpliedValuation[];
  fundamentals: FundamentalMultiplesResult;
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  if (sorted.length === 1) return sorted[0];
  const idx = (sorted.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
}

export function computeStatSummary(values: Array<number | null | undefined>): StatSummary {
  const valid = values
    .filter((v): v is number => v !== null && v !== undefined && Number.isFinite(v) && v > 0)
    .sort((a, b) => a - b);

  if (valid.length === 0) {
    return { count: 0, mean: null, median: null, q1: null, q3: null, min: null, max: null };
  }

  const mean = valid.reduce((a, b) => a + b, 0) / valid.length;
  return {
    count: valid.length,
    mean,
    median: percentile(valid, 0.5),
    q1: percentile(valid, 0.25),
    q3: percentile(valid, 0.75),
    min: valid[0],
    max: valid[valid.length - 1],
  };
}

export function computeRelativeValuation(company: CompanyAnalysis): RelativeValuationResult {
  const f = company.financials;
  const a = company.valuationAssumptions;
  const lastIdx = getLastIndex(f);

  const marketCap = getEffectiveMarketCap(company);
  const shares = getEffectiveShares(company);
  const currentPrice = getEffectiveSharePrice(company);
  const bridge = computeEVBridge(company);
  const currentEV = marketCap > 0 ? marketCap + bridge.netDeductionFromEV : 0;

  const sales = f.netSales[lastIdx] ?? 0;
  const ebit = getEBIT(f)[lastIdx] ?? 0;
  const ebitda = getEBITDA(f)[lastIdx] ?? 0;
  const netIncome = getNetIncome(f)[lastIdx] ?? 0;
  const bookEquity = f.shareholdersEquity[lastIdx] ?? 0;
  const fcf = getHistoricalFCF(f)[lastIdx] ?? 0;

  const companyCurrent = {
    evToEbitda: currentEV > 0 && ebitda > 0 ? safeDiv(currentEV, ebitda) : null,
    evToEbit: currentEV > 0 && ebit > 0 ? safeDiv(currentEV, ebit) : null,
    evToSales: currentEV > 0 && sales > 0 ? safeDiv(currentEV, sales) : null,
    pe: marketCap > 0 && netIncome > 0 ? safeDiv(marketCap, netIncome) : null,
    pb: marketCap > 0 && bookEquity > 0 ? safeDiv(marketCap, bookEquity) : null,
    fcfYield: marketCap > 0 ? safeDiv(fcf, marketCap) * 100 : null,
  };

  const peers: PeerCompany[] = company.peers ?? [];

  const evMultipleToPrice = (mult: number | null, driver: number): number | null => {
    if (mult === null || driver <= 0 || shares <= 0) return null;
    const impliedEV = mult * driver;
    const impliedEq = impliedEV - bridge.netDeductionFromEV;
    return safeDiv(impliedEq, shares);
  };

  const eqMultipleToPrice = (mult: number | null, driver: number): number | null => {
    if (mult === null || driver <= 0 || shares <= 0) return null;
    return safeDiv(mult * driver, shares);
  };

  const fcfYieldToPrice = (yieldPct: number | null, fcfVal: number): number | null => {
    if (yieldPct === null || yieldPct <= 0 || fcfVal <= 0 || shares <= 0) return null;
    const impliedMarketCap = safeDiv(fcfVal, yieldPct / 100);
    return safeDiv(impliedMarketCap, shares);
  };

  const buildRow = (
    metric: string,
    label: string,
    companyVal: number | null,
    stats: StatSummary,
    toPrice: (m: number | null) => number | null,
    invertBounds = false
  ): MultipleImpliedValuation => {
    const pLowRaw = toPrice(invertBounds ? stats.q3 : stats.q1);
    const pMed = toPrice(stats.median);
    const pHighRaw = toPrice(invertBounds ? stats.q1 : stats.q3);
    const upside =
      pMed !== null && currentPrice > 0
        ? ((pMed - currentPrice) / currentPrice) * 100
        : null;

    return {
      metric,
      label,
      companyCurrentMultiple: companyVal,
      peerStats: stats,
      impliedPriceLow: pLowRaw,
      impliedPriceMedian: pMed,
      impliedPriceHigh: pHighRaw,
      upsideAtMedian: upside,
    };
  };

  const peerValuations: MultipleImpliedValuation[] = [
    buildRow(
      'evToEbitda',
      'EV / EBITDA',
      companyCurrent.evToEbitda,
      computeStatSummary(peers.map((p) => p.evToEbitda)),
      (m) => evMultipleToPrice(m, ebitda)
    ),
    buildRow(
      'evToEbit',
      'EV / EBIT',
      companyCurrent.evToEbit,
      computeStatSummary(peers.map((p) => p.evToEbit)),
      (m) => evMultipleToPrice(m, ebit)
    ),
    buildRow(
      'evToSales',
      'EV / Receita',
      companyCurrent.evToSales,
      computeStatSummary(peers.map((p) => p.evToSales)),
      (m) => evMultipleToPrice(m, sales)
    ),
    buildRow(
      'pe',
      'P / L (P/E)',
      companyCurrent.pe,
      computeStatSummary(peers.map((p) => p.pe)),
      (m) => eqMultipleToPrice(m, netIncome)
    ),
    buildRow(
      'pb',
      'P / VP (P/B)',
      companyCurrent.pb,
      computeStatSummary(peers.map((p) => p.pb)),
      (m) => eqMultipleToPrice(m, bookEquity)
    ),
    buildRow(
      'fcfYield',
      'FCF Yield (%)',
      companyCurrent.fcfYield,
      computeStatSummary(peers.map((p) => p.fcfYield)),
      (y) => fcfYieldToPrice(y, fcf),
      true // higher yield => lower price
    ),
  ];

  // Fundamental (Justified) Multiples (CFA / Damodaran)
  const coc = computeCostOfCapital(company);
  const keDec = coc.costOfEquity / 100;
  const gDec = a.terminalGrowthRate / 100;
  const returns = getShareholderReturns(company);
  const roeDec = (getROE(f)[lastIdx] ?? 0) / 100;
  const payoutDec = Math.min(1, Math.max(0.1, returns.payoutRatio / 100 || 0.4));

  const justifiedPE =
    keDec > gDec ? safeDiv(payoutDec * (1 + gDec), keDec - gDec) : null;
  const justifiedPB =
    keDec > gDec && roeDec > gDec ? safeDiv(roeDec - gDec, keDec - gDec) : null;

  const dcfBase = computeDCF_FCFF(company);
  const justifiedEvEbitda =
    dcfBase.valid && ebitda > 0 ? safeDiv(dcfBase.enterpriseValue, ebitda) : null;

  const impliedPriceJustifiedPE =
    justifiedPE !== null && netIncome > 0 && shares > 0
      ? safeDiv(justifiedPE * netIncome, shares)
      : null;
  const impliedPriceJustifiedPB =
    justifiedPB !== null && bookEquity > 0 && shares > 0
      ? safeDiv(justifiedPB * bookEquity, shares)
      : null;

  return {
    peerValuations,
    fundamentals: {
      justifiedPE,
      justifiedPB,
      justifiedEvEbitda,
      impliedPriceJustifiedPE,
      impliedPriceJustifiedPB,
      companyCurrent,
    },
  };
}
