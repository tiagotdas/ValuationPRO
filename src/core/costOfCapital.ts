import type { CompanyAnalysis } from '../types/valuation';
import {
  getEffectiveMarketCap,
  getInterestCoverage,
  getLastIndex,
  getTotalDebt,
} from './accounting';
import { safeDiv } from './format';

export interface SyntheticRatingResult {
  interestCoverage: number;
  rating: string;
  spread: number; // %
}

export interface CostOfCapitalResult {
  leveredBeta: number;
  unleveredBeta: number;
  costOfEquity: number; // %
  preTaxCostOfDebt: number; // %
  afterTaxCostOfDebt: number; // %
  syntheticRating: SyntheticRatingResult;
  equityWeight: number; // % (0..100)
  debtWeight: number; // % (0..100)
  debtToEquity: number; // ratio
  wacc: number; // %
}

/**
 * Damodaran synthetic credit rating table (Large Manufacturing / Emerging Market adapted).
 */
const SYNTHETIC_RATING_TABLE: Array<{ minIcr: number; rating: string; spread: number }> = [
  { minIcr: 8.5, rating: 'AAA', spread: 0.65 },
  { minIcr: 6.5, rating: 'AA', spread: 0.85 },
  { minIcr: 5.5, rating: 'A+', spread: 1.05 },
  { minIcr: 4.25, rating: 'A', spread: 1.2 },
  { minIcr: 3.0, rating: 'A-', spread: 1.45 },
  { minIcr: 2.5, rating: 'BBB', spread: 1.9 },
  { minIcr: 2.25, rating: 'BB+', spread: 2.45 },
  { minIcr: 2.0, rating: 'BB', spread: 3.0 },
  { minIcr: 1.75, rating: 'B+', spread: 3.75 },
  { minIcr: 1.5, rating: 'B', spread: 4.5 },
  { minIcr: 1.25, rating: 'B-', spread: 5.5 },
  { minIcr: 0.8, rating: 'CCC', spread: 7.5 },
  { minIcr: 0.65, rating: 'CC', spread: 9.5 },
  { minIcr: 0.2, rating: 'C', spread: 12.0 },
  { minIcr: -Infinity, rating: 'D', spread: 15.0 },
];

export function getSyntheticCreditSpread(interestCoverage: number): SyntheticRatingResult {
  const icr = Number.isFinite(interestCoverage) ? interestCoverage : 0;
  for (const row of SYNTHETIC_RATING_TABLE) {
    if (icr >= row.minIcr) {
      return { interestCoverage: icr, rating: row.rating, spread: row.spread };
    }
  }
  return { interestCoverage: icr, rating: 'D', spread: 15.0 };
}

/**
 * Hamada equation: Beta_L = Beta_U * [1 + (1 - t_m) * (D / E)]
 */
export function computeLeveredBeta(
  unleveredBeta: number,
  debtToEquity: number,
  marginalTaxRatePercent: number
): number {
  const tax = Math.min(0.6, Math.max(0, marginalTaxRatePercent / 100));
  const de = Math.max(0, debtToEquity);
  return unleveredBeta * (1 + (1 - tax) * de);
}

/**
 * Inverse Hamada equation: Beta_U = Beta_L / [1 + (1 - t_m) * (D / E)]
 */
export function computeUnleveredBeta(
  leveredBeta: number,
  debtToEquity: number,
  marginalTaxRatePercent: number
): number {
  const tax = Math.min(0.6, Math.max(0, marginalTaxRatePercent / 100));
  const de = Math.max(0, debtToEquity);
  return safeDiv(leveredBeta, 1 + (1 - tax) * de);
}

export function computeCostOfCapital(
  company: CompanyAnalysis,
  overrides?: { waccDelta?: number; keDelta?: number }
): CostOfCapitalResult {
  const a = company.valuationAssumptions;
  const f = company.financials;
  const lastIdx = getLastIndex(f);

  const totalDebt = Math.max(0, getTotalDebt(f, a.includeLeasesInDebt)[lastIdx] ?? 0);
  const marketCap = Math.max(0, getEffectiveMarketCap(company));

  let debtWeightDec = 0;
  let equityWeightDec = 1;

  if (a.capitalStructureMode === 'target') {
    debtWeightDec = Math.min(0.95, Math.max(0, a.targetDebtToCapital / 100));
    equityWeightDec = 1 - debtWeightDec;
  } else {
    const totalCapital = marketCap + totalDebt;
    if (totalCapital > 0) {
      debtWeightDec = safeDiv(totalDebt, totalCapital);
      equityWeightDec = safeDiv(marketCap, totalCapital);
    }
  }

  const debtToEquity = equityWeightDec > 0 ? debtWeightDec / equityWeightDec : 0;

  const leveredBeta =
    a.betaMode === 'hamada'
      ? computeLeveredBeta(a.unleveredBeta, debtToEquity, a.marginalTaxRate)
      : a.leveredBeta;

  const unleveredBeta =
    a.betaMode === 'hamada'
      ? a.unleveredBeta
      : computeUnleveredBeta(a.leveredBeta, debtToEquity, a.marginalTaxRate);

  const icr = getInterestCoverage(f)[lastIdx] ?? 0;
  const syntheticRating = getSyntheticCreditSpread(icr);

  // CAPM: Ke = Rf + Beta_L * ERP + CRP + Size
  const keBase =
    a.riskFreeRate +
    leveredBeta * a.equityRiskPremium +
    a.countryRiskPremium +
    a.sizePremium;
  const costOfEquity = keBase + (overrides?.keDelta ?? 0);

  // Cost of Debt: manual or Rf + Synthetic Credit Spread (+ CRP if nominal USD emerging)
  const preTaxCostOfDebt =
    a.costOfDebtMode === 'synthetic'
      ? a.riskFreeRate + syntheticRating.spread
      : a.costOfDebt;

  // Tax shield uses marginal statutory tax rate (Damodaran / McKinsey best practice)
  const marginalTax = Math.min(0.6, Math.max(0, a.marginalTaxRate / 100));
  const afterTaxCostOfDebt = preTaxCostOfDebt * (1 - marginalTax);

  const waccBase = equityWeightDec * costOfEquity + debtWeightDec * afterTaxCostOfDebt;
  const wacc = waccBase + (overrides?.waccDelta ?? 0);

  return {
    leveredBeta,
    unleveredBeta,
    costOfEquity,
    preTaxCostOfDebt,
    afterTaxCostOfDebt,
    syntheticRating,
    equityWeight: equityWeightDec * 100,
    debtWeight: debtWeightDec * 100,
    debtToEquity,
    wacc,
  };
}
