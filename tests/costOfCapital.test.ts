import { describe, expect, it } from 'vitest';
import {
  computeCostOfCapital,
  computeLeveredBeta,
  computeUnleveredBeta,
  getSyntheticCreditSpread,
} from '../src/core/costOfCapital';
import { createSampleCompanies } from '../src/state/samples';

describe('CAPM, Hamada Beta, Synthetic Rating & WACC Engine', () => {
  it('relevers and unlevers Beta consistently via Hamada equation', () => {
    // Beta_U = 0.85, D/E = 0.5, Marginal Tax = 34%
    // Beta_L = 0.85 * [1 + (1 - 0.34) * 0.5] = 0.85 * 1.33 = 1.1305
    const betaL = computeLeveredBeta(0.85, 0.5, 34);
    expect(betaL).toBeCloseTo(1.1305, 4);
    const betaU = computeUnleveredBeta(betaL, 0.5, 34);
    expect(betaU).toBeCloseTo(0.85, 4);
  });

  it('maps Interest Coverage Ratio to Damodaran Synthetic Rating table', () => {
    expect(getSyntheticCreditSpread(10.0).rating).toBe('AAA');
    expect(getSyntheticCreditSpread(3.5).rating).toBe('A-');
    expect(getSyntheticCreditSpread(2.1).rating).toBe('BB');
    expect(getSyntheticCreditSpread(0.1).rating).toBe('D');
  });

  it('computes WACC using CAPM (with Beta + CRP), marginal tax shield, and target capital structure', () => {
    const [alfa] = createSampleCompanies();
    const company = structuredClone(alfa);
    company.valuationAssumptions.betaMode = 'direct';
    company.valuationAssumptions.leveredBeta = 1.1;
    company.valuationAssumptions.riskFreeRate = 11.0;
    company.valuationAssumptions.equityRiskPremium = 5.5;
    company.valuationAssumptions.countryRiskPremium = 2.0;
    company.valuationAssumptions.sizePremium = 0.5;
    company.valuationAssumptions.costOfDebtMode = 'manual';
    company.valuationAssumptions.costOfDebt = 13.0;
    company.valuationAssumptions.marginalTaxRate = 34.0;
    company.valuationAssumptions.capitalStructureMode = 'target';
    company.valuationAssumptions.targetDebtToCapital = 30.0;

    // Ke = 11.0 + 1.1 * 5.5 + 2.0 + 0.5 = 19.55%
    // After-tax Kd = 13.0 * (1 - 0.34) = 8.58%
    // WACC = 0.70 * 19.55 + 0.30 * 8.58 = 13.685 + 2.574 = 16.259%
    const coc = computeCostOfCapital(company);
    expect(coc.costOfEquity).toBeCloseTo(19.55, 4);
    expect(coc.afterTaxCostOfDebt).toBeCloseTo(8.58, 4);
    expect(coc.wacc).toBeCloseTo(16.259, 4);
  });
});
