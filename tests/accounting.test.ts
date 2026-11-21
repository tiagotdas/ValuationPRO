import { describe, expect, it } from 'vitest';
import {
  getBalanceSheetChecks,
  getCAGR,
  getCashConversionCycle,
  getDuPontDecomposition,
  getEBIT,
  getEBITDA,
  getHistoricalFCF,
  getInterestCoverage,
  getInvestedCapital,
  getNetIncome,
  getNOPAT,
  getROA,
  getROE,
  getROIC,
  getShareholderReturns,
} from '../src/core/accounting';
import { createEmptyFinancials } from '../src/state/defaults';
import { createSampleCompanies } from '../src/state/samples';

describe('Accounting & Fundamental Ratios Engine', () => {
  const [alfa] = createSampleCompanies();

  it('reconciles all sample company balance sheets cleanly', () => {
    const samples = createSampleCompanies();
    for (const company of samples) {
      const checks = getBalanceSheetChecks(company.financials);
      for (const check of checks) {
        expect(check.isBalanced).toBe(true);
        expect(Math.abs(check.diff)).toBeLessThan(0.01);
      }
    }
  });

  it('handles D&A recognition both included in OPEX and separate without double counting', () => {
    const f = createEmptyFinancials(['2024']);
    f.netSales = [1000];
    f.cogs = [500];
    f.sga = [200];
    f.rd = [50];
    f.depreciationAmortization = [60];

    // DRE por função: D&A already inside COGS/SG&A
    f.daRecognition = 'included_in_opex';
    expect(getEBIT(f)[0]).toBe(250);
    expect(getEBITDA(f)[0]).toBe(310);

    // DRE por natureza: D&A reported separately
    f.daRecognition = 'separate';
    expect(getEBIT(f)[0]).toBe(190);
    expect(getEBITDA(f)[0]).toBe(250);
  });

  it('computes tax-adjusted ROA accurately (not adding gross interest)', () => {
    const f = createEmptyFinancials(['2024']);
    f.fixedAssets = [1000];
    f.netSales = [500];
    f.cogs = [200];
    f.interestExpense = [100];
    f.taxes = [50]; // EBT = 200, effective tax = 25%, Net Income = 150
    // Unlevered income = 150 + 100 * (1 - 0.25) = 225 => ROA = 22.5%
    expect(getNetIncome(f)[0]).toBe(150);
    expect(getROA(f)[0]).toBeCloseTo(22.5, 4);
  });

  it('verifies DuPont 3-step identity: NetMargin * AssetTurnover * EquityMultiplier === ROE', () => {
    const roe = getROE(alfa.financials);
    const dupont = getDuPontDecomposition(alfa.financials);
    dupont.forEach((d, i) => {
      expect(d.roe).toBeCloseTo(roe[i], 4);
    });
  });

  it('computes Invested Capital, NOPAT, ROIC, Historical FCF, and Shareholder Returns', () => {
    const ic = getInvestedCapital(alfa.financials, true);
    const nopat = getNOPAT(alfa.financials, 34);
    const roic = getROIC(alfa.financials, 34, true);
    const fcf = getHistoricalFCF(alfa.financials);
    const returns = getShareholderReturns(alfa);

    expect(ic[4]).toBeGreaterThan(0);
    expect(nopat[4]).toBeGreaterThan(0);
    expect(roic[4]).toBeGreaterThan(15);
    expect(fcf[4]).toBe(1720 - 545);
    expect(returns.payoutRatio).toBeGreaterThan(0);
    expect(returns.buybackYield).toBeGreaterThan(0);
    expect(returns.totalShareholderYield).toBeCloseTo(
      returns.dividendYield + returns.buybackYield,
      4
    );
  });

  it('computes Interest Coverage, Cash Conversion Cycle, and CAGR safely', () => {
    const icr = getInterestCoverage(alfa.financials);
    const ccc = getCashConversionCycle(alfa.financials);
    expect(icr[4]).toBeGreaterThan(10);
    expect(ccc[4]).toBeGreaterThan(0);
    expect(getCAGR([100, 121])).toBeCloseTo(21, 4);
    expect(getCAGR([100, 110, 121])).toBeCloseTo(10, 4);
    expect(getCAGR([-50, 100])).toBeNull();
  });
});
