import type { CompanyAnalysis, FinancialStatements } from '../types/valuation';
import { safeAvg, safeDiv } from './format';

export interface BalanceSheetCheck {
  year: string;
  totalAssets: number;
  totalLiabilitiesAndEquity: number;
  diff: number;
  isBalanced: boolean;
}

export interface DuPontDecomposition {
  year: string;
  netMargin: number; // %
  assetTurnover: number; // x
  equityMultiplier: number; // x
  roe: number; // %
}

export interface ShareholderReturnMetrics {
  payoutRatio: number; // % of net income
  fcfPayoutRatio: number; // % of FCF
  dividendYield: number; // %
  buybackYield: number; // %
  totalShareholderYield: number; // %
  sustainableGrowthRate: number; // %
}

export interface HistoricalAverages {
  salesCagr: number;
  ebitMargin: number;
  effectiveTaxRate: number;
  capexPercentSales: number;
  depPercentSales: number;
  nwcPercentSales: number;
  roic: number;
  roe: number;
  payoutRatio: number;
}

export function getPeriodCount(f: FinancialStatements): number {
  return f.years.length;
}

export function getLastIndex(f: FinancialStatements): number {
  return Math.max(0, f.years.length - 1);
}

export function getGrossProfit(f: FinancialStatements): number[] {
  return f.netSales.map((sales, i) => sales - (f.cogs[i] ?? 0));
}

export function getEBIT(f: FinancialStatements): number[] {
  return f.netSales.map((sales, i) => {
    const baseOp = sales - (f.cogs[i] ?? 0) - (f.sga[i] ?? 0) - (f.rd[i] ?? 0);
    if (f.daRecognition === 'separate') {
      return baseOp - (f.depreciationAmortization[i] ?? 0);
    }
    return baseOp;
  });
}

export function getEBITDA(f: FinancialStatements): number[] {
  const ebit = getEBIT(f);
  return ebit.map((e, i) => e + (f.depreciationAmortization[i] ?? 0));
}

export function getEBT(f: FinancialStatements): number[] {
  const ebit = getEBIT(f);
  return ebit.map((e, i) => e + (f.financialIncome[i] ?? 0) - (f.interestExpense[i] ?? 0));
}

export function getNetIncome(f: FinancialStatements): number[] {
  const ebt = getEBT(f);
  return ebt.map((e, i) => e - (f.taxes[i] ?? 0));
}

export function getEffectiveTaxRates(
  f: FinancialStatements,
  fallbackTaxRatePercent = 34
): number[] {
  const ebt = getEBT(f);
  return ebt.map((e, i) => {
    const tax = f.taxes[i] ?? 0;
    if (e > 0 && tax >= 0) {
      return Math.min(60, Math.max(0, (tax / e) * 100));
    }
    return fallbackTaxRatePercent;
  });
}

export function getNOPAT(f: FinancialStatements, fallbackTaxRatePercent = 34): number[] {
  const ebit = getEBIT(f);
  const taxRates = getEffectiveTaxRates(f, fallbackTaxRatePercent);
  return ebit.map((e, i) => e * (1 - taxRates[i] / 100));
}

export function getTotalCurrentAssets(f: FinancialStatements): number[] {
  return f.years.map(
    (_, i) =>
      (f.cashAndEquivalents[i] ?? 0) +
      (f.accountsReceivable[i] ?? 0) +
      (f.inventories[i] ?? 0) +
      (f.otherCurrentAssets[i] ?? 0)
  );
}

export function getTotalNonCurrentAssets(f: FinancialStatements): number[] {
  return f.years.map(
    (_, i) =>
      (f.fixedAssets[i] ?? 0) +
      (f.intangiblesGoodwill[i] ?? 0) +
      (f.rightOfUseAssets[i] ?? 0) +
      (f.nonOperatingAssets[i] ?? 0) +
      (f.otherNonCurrentAssets[i] ?? 0)
  );
}

export function getTotalAssets(f: FinancialStatements): number[] {
  const ca = getTotalCurrentAssets(f);
  const nca = getTotalNonCurrentAssets(f);
  return ca.map((c, i) => c + nca[i]);
}

export function getTotalCurrentLiabilities(f: FinancialStatements): number[] {
  return f.years.map(
    (_, i) =>
      (f.accountsPayable[i] ?? 0) +
      (f.shortTermDebt[i] ?? 0) +
      (f.otherCurrentLiabilities[i] ?? 0)
  );
}

export function getTotalLiabilitiesAndEquity(f: FinancialStatements): number[] {
  return f.years.map(
    (_, i) =>
      (f.shareholdersEquity[i] ?? 0) +
      (f.minorityInterest[i] ?? 0) +
      (f.preferredStock[i] ?? 0) +
      (f.shortTermDebt[i] ?? 0) +
      (f.longTermDebt[i] ?? 0) +
      (f.leaseLiabilities[i] ?? 0) +
      (f.provisions[i] ?? 0) +
      (f.accountsPayable[i] ?? 0) +
      (f.otherCurrentLiabilities[i] ?? 0) +
      (f.otherNonCurrentLiabilities[i] ?? 0)
  );
}

export function getBalanceSheetChecks(f: FinancialStatements): BalanceSheetCheck[] {
  const assets = getTotalAssets(f);
  const liabEq = getTotalLiabilitiesAndEquity(f);
  return f.years.map((year, i) => {
    const diff = assets[i] - liabEq[i];
    const tolerance = Math.max(0.05, Math.abs(assets[i]) * 0.005);
    return {
      year,
      totalAssets: assets[i],
      totalLiabilitiesAndEquity: liabEq[i],
      diff,
      isBalanced: Math.abs(diff) <= tolerance,
    };
  });
}

export function getTotalDebt(f: FinancialStatements, includeLeases = true): number[] {
  return f.years.map(
    (_, i) =>
      (f.shortTermDebt[i] ?? 0) +
      (f.longTermDebt[i] ?? 0) +
      (includeLeases ? f.leaseLiabilities[i] ?? 0 : 0)
  );
}

export function getNetDebt(f: FinancialStatements, includeLeases = true): number[] {
  const debt = getTotalDebt(f, includeLeases);
  return debt.map((d, i) => d - (f.cashAndEquivalents[i] ?? 0));
}

/**
 * Operating Net Working Capital (excludes cash and short-term debt).
 */
export function getOperatingWorkingCapital(f: FinancialStatements): number[] {
  return f.years.map(
    (_, i) =>
      (f.accountsReceivable[i] ?? 0) +
      (f.inventories[i] ?? 0) +
      (f.otherCurrentAssets[i] ?? 0) -
      (f.accountsPayable[i] ?? 0) -
      (f.otherCurrentLiabilities[i] ?? 0)
  );
}

/**
 * Invested Capital (Financing Approach - McKinsey/Damodaran):
 * Total Equity (incl. MI & Pref) + Total Debt (incl. Leases) - Cash - Non-Operating Assets.
 */
export function getInvestedCapital(f: FinancialStatements, includeLeases = true): number[] {
  const totalDebt = getTotalDebt(f, includeLeases);
  return f.years.map(
    (_, i) =>
      (f.shareholdersEquity[i] ?? 0) +
      (f.minorityInterest[i] ?? 0) +
      (f.preferredStock[i] ?? 0) +
      totalDebt[i] -
      (f.cashAndEquivalents[i] ?? 0) -
      (f.nonOperatingAssets[i] ?? 0)
  );
}

/**
 * Capital Employed = Total Assets - Total Current Liabilities (standard ROCE denominator).
 */
export function getCapitalEmployed(f: FinancialStatements): number[] {
  const assets = getTotalAssets(f);
  const currLiab = getTotalCurrentLiabilities(f);
  return assets.map((a, i) => a - currLiab[i]);
}

export function getHistoricalFCF(f: FinancialStatements): number[] {
  return f.years.map((_, i) => (f.cfo[i] ?? 0) - Math.abs(f.capex[i] ?? 0));
}

export function getEPS(f: FinancialStatements, dilutedShares: number): number[] {
  return getNetIncome(f).map((ni) => safeDiv(ni, dilutedShares));
}

export function getGrossMargin(f: FinancialStatements): number[] {
  const gp = getGrossProfit(f);
  return gp.map((g, i) => safeDiv(g, f.netSales[i] ?? 0) * 100);
}

export function getEBITMargin(f: FinancialStatements): number[] {
  const ebit = getEBIT(f);
  return ebit.map((e, i) => safeDiv(e, f.netSales[i] ?? 0) * 100);
}

export function getEBITDAMargin(f: FinancialStatements): number[] {
  const ebitda = getEBITDA(f);
  return ebitda.map((e, i) => safeDiv(e, f.netSales[i] ?? 0) * 100);
}

export function getNetProfitMargin(f: FinancialStatements): number[] {
  const ni = getNetIncome(f);
  return ni.map((n, i) => safeDiv(n, f.netSales[i] ?? 0) * 100);
}

export function getOperatingCashFlowMargin(f: FinancialStatements): number[] {
  return f.cfo.map((c, i) => safeDiv(c, f.netSales[i] ?? 0) * 100);
}

export function getFCFMargin(f: FinancialStatements): number[] {
  const fcf = getHistoricalFCF(f);
  return fcf.map((c, i) => safeDiv(c, f.netSales[i] ?? 0) * 100);
}

export function getROE(f: FinancialStatements): number[] {
  const ni = getNetIncome(f);
  return ni.map((n, i) => {
    const denom =
      i === 0
        ? f.shareholdersEquity[i] ?? 0
        : safeAvg(f.shareholdersEquity[i - 1] ?? 0, f.shareholdersEquity[i] ?? 0);
    return denom > 0 ? safeDiv(n, denom) * 100 : 0;
  });
}

/**
 * Tax-adjusted ROA: [Net Income + Interest Expense * (1 - t)] / Average Total Assets
 */
export function getROA(f: FinancialStatements, fallbackTaxRatePercent = 34): number[] {
  const ni = getNetIncome(f);
  const assets = getTotalAssets(f);
  const taxRates = getEffectiveTaxRates(f, fallbackTaxRatePercent);
  return ni.map((n, i) => {
    const unleveredIncome = n + (f.interestExpense[i] ?? 0) * (1 - taxRates[i] / 100);
    const denom = i === 0 ? assets[i] : safeAvg(assets[i - 1], assets[i]);
    return denom > 0 ? safeDiv(unleveredIncome, denom) * 100 : 0;
  });
}

export function getROIC(
  f: FinancialStatements,
  fallbackTaxRatePercent = 34,
  includeLeases = true
): number[] {
  const nopat = getNOPAT(f, fallbackTaxRatePercent);
  const ic = getInvestedCapital(f, includeLeases);
  return nopat.map((n, i) => {
    const denom = i === 0 ? ic[i] : safeAvg(ic[i - 1], ic[i]);
    return denom > 0 ? safeDiv(n, denom) * 100 : 0;
  });
}

export function getROCE(f: FinancialStatements): number[] {
  const ebit = getEBIT(f);
  const ce = getCapitalEmployed(f);
  return ebit.map((e, i) => {
    const denom = i === 0 ? ce[i] : safeAvg(ce[i - 1], ce[i]);
    return denom > 0 ? safeDiv(e, denom) * 100 : 0;
  });
}

export function getEquityRatio(f: FinancialStatements): number[] {
  const assets = getTotalAssets(f);
  return f.shareholdersEquity.map((eq, i) => safeDiv(eq, assets[i]) * 100);
}

export function getGearingRatio(f: FinancialStatements, includeLeases = true): number[] {
  const netDebt = getNetDebt(f, includeLeases);
  return netDebt.map((nd, i) => safeDiv(nd, f.shareholdersEquity[i] ?? 0));
}

export function getNetDebtToEBITDA(f: FinancialStatements, includeLeases = true): number[] {
  const netDebt = getNetDebt(f, includeLeases);
  const ebitda = getEBITDA(f);
  return netDebt.map((nd, i) => (ebitda[i] > 0 ? safeDiv(nd, ebitda[i]) : 0));
}

export function getInterestCoverage(f: FinancialStatements): number[] {
  const ebit = getEBIT(f);
  return ebit.map((e, i) => {
    const interest = Math.abs(f.interestExpense[i] ?? 0);
    return interest > 0 ? safeDiv(e, interest) : e > 0 ? 99 : 0;
  });
}

export function getCapexToCFO(f: FinancialStatements): number[] {
  return f.capex.map((c, i) => safeDiv(Math.abs(c), f.cfo[i] ?? 0) * 100);
}

export function getCashConversionFCFToNI(f: FinancialStatements): number[] {
  const fcf = getHistoricalFCF(f);
  const ni = getNetIncome(f);
  return fcf.map((c, i) => (ni[i] > 0 ? safeDiv(c, ni[i]) * 100 : 0));
}

export function getCFOToEBITDA(f: FinancialStatements): number[] {
  const ebitda = getEBITDA(f);
  return f.cfo.map((c, i) => (ebitda[i] > 0 ? safeDiv(c, ebitda[i]) * 100 : 0));
}

export function getCurrentRatio(f: FinancialStatements): number[] {
  const ca = getTotalCurrentAssets(f);
  const cl = getTotalCurrentLiabilities(f);
  return ca.map((c, i) => safeDiv(c, cl[i]));
}

export function getQuickRatio(f: FinancialStatements): number[] {
  const ca = getTotalCurrentAssets(f);
  const cl = getTotalCurrentLiabilities(f);
  return ca.map((c, i) => safeDiv(c - (f.inventories[i] ?? 0), cl[i]));
}

export function getDSO(f: FinancialStatements): number[] {
  return f.accountsReceivable.map((ar, i) => safeDiv(ar, f.netSales[i] ?? 0) * 365);
}

export function getDIO(f: FinancialStatements): number[] {
  return f.inventories.map((inv, i) => safeDiv(inv, f.cogs[i] ?? 0) * 365);
}

export function getDPO(f: FinancialStatements): number[] {
  return f.accountsPayable.map((ap, i) => safeDiv(ap, f.cogs[i] ?? 0) * 365);
}

export function getCashConversionCycle(f: FinancialStatements): number[] {
  const dso = getDSO(f);
  const dio = getDIO(f);
  const dpo = getDPO(f);
  return dso.map((d, i) => d + dio[i] - dpo[i]);
}

export function getDuPontDecomposition(f: FinancialStatements): DuPontDecomposition[] {
  const ni = getNetIncome(f);
  const assets = getTotalAssets(f);
  return f.years.map((year, i) => {
    const avgAssets = i === 0 ? assets[i] : safeAvg(assets[i - 1], assets[i]);
    const avgEquity =
      i === 0
        ? f.shareholdersEquity[i] ?? 0
        : safeAvg(f.shareholdersEquity[i - 1] ?? 0, f.shareholdersEquity[i] ?? 0);
    const netMargin = safeDiv(ni[i], f.netSales[i] ?? 0) * 100;
    const assetTurnover = safeDiv(f.netSales[i] ?? 0, avgAssets);
    const equityMultiplier = safeDiv(avgAssets, avgEquity);
    const roe = (netMargin / 100) * assetTurnover * equityMultiplier * 100;
    return { year, netMargin, assetTurnover, equityMultiplier, roe };
  });
}

export function getCAGR(values: number[]): number | null {
  if (values.length < 2) return null;
  const start = values[0];
  const end = values[values.length - 1];
  if (start <= 0 || end <= 0) return null;
  const periods = values.length - 1;
  return (Math.pow(end / start, 1 / periods) - 1) * 100;
}

export function getShareholderReturns(company: CompanyAnalysis): ShareholderReturnMetrics {
  const f = company.financials;
  const idx = getLastIndex(f);
  const ni = getNetIncome(f)[idx] ?? 0;
  const fcf = getHistoricalFCF(f)[idx] ?? 0;
  const divs = Math.abs(f.dividendsPaid[idx] ?? 0);
  const buybacks = Math.abs(f.shareRepurchases[idx] ?? 0);
  const marketCap = getEffectiveMarketCap(company);
  const roe = getROE(f)[idx] ?? 0;

  const payoutRatio = ni > 0 ? safeDiv(divs, ni) * 100 : 0;
  const fcfPayoutRatio = fcf > 0 ? safeDiv(divs, fcf) * 100 : 0;
  const dividendYield =
    marketCap > 0
      ? safeDiv(divs, marketCap) * 100
      : company.sharePrice > 0
        ? safeDiv(company.dividendPerShare, company.sharePrice) * 100
        : 0;
  const buybackYield = marketCap > 0 ? safeDiv(buybacks, marketCap) * 100 : 0;
  const totalShareholderYield = dividendYield + buybackYield;
  const retention = Math.max(0, 1 - payoutRatio / 100);
  const sustainableGrowthRate = roe * retention;

  return {
    payoutRatio,
    fcfPayoutRatio,
    dividendYield,
    buybackYield,
    totalShareholderYield,
    sustainableGrowthRate,
  };
}

export function getEffectiveShares(company: CompanyAnalysis): number {
  return company.dilutedShares > 0 ? company.dilutedShares : company.basicShares;
}

export function getEffectiveMarketCap(company: CompanyAnalysis): number {
  const shares = getEffectiveShares(company);
  if (company.sharePrice > 0 && shares > 0) {
    return company.sharePrice * shares;
  }
  return company.marketCap;
}

export function getEffectiveSharePrice(company: CompanyAnalysis): number {
  if (company.sharePrice > 0) return company.sharePrice;
  const shares = getEffectiveShares(company);
  return shares > 0 ? safeDiv(company.marketCap, shares) : 0;
}

export function getHistoricalAverages(
  f: FinancialStatements,
  fallbackTaxRate = 34,
  includeLeases = true
): HistoricalAverages {
  const mean = (arr: number[]) =>
    arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

  const salesCagr = getCAGR(f.netSales) ?? 5;
  const ebitMargin = mean(getEBITMargin(f));
  const effectiveTaxRate = mean(getEffectiveTaxRates(f, fallbackTaxRate));
  const capexPct = mean(
    f.capex.map((c, i) => safeDiv(Math.abs(c), f.netSales[i] ?? 0) * 100)
  );
  const depPct = mean(
    f.depreciationAmortization.map((d, i) => safeDiv(Math.abs(d), f.netSales[i] ?? 0) * 100)
  );
  const nwcSeries = getOperatingWorkingCapital(f);
  const nwcPct = mean(nwcSeries.map((n, i) => safeDiv(n, f.netSales[i] ?? 0) * 100));
  const roic = mean(getROIC(f, fallbackTaxRate, includeLeases));
  const roe = mean(getROE(f));
  const ni = getNetIncome(f);
  const payout = mean(
    f.dividendsPaid.map((d, i) => (ni[i] > 0 ? safeDiv(Math.abs(d), ni[i]) * 100 : 0))
  );

  return {
    salesCagr: Number(salesCagr.toFixed(2)),
    ebitMargin: Number(ebitMargin.toFixed(2)),
    effectiveTaxRate: Number(effectiveTaxRate.toFixed(2)),
    capexPercentSales: Number(capexPct.toFixed(2)),
    depPercentSales: Number(depPct.toFixed(2)),
    nwcPercentSales: Number(nwcPct.toFixed(2)),
    roic: Number(roic.toFixed(2)),
    roe: Number(roe.toFixed(2)),
    payoutRatio: Number(payout.toFixed(2)),
  };
}
