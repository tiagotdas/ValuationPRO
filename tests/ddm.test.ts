import { describe, expect, it } from 'vitest';
import { computeDDM } from '../src/core/ddm';
import { createSampleCompanies } from '../src/state/samples';

describe('DDM Engine (Gordon, 2-Stage & Fuller-Hsia H-Model)', () => {
  const [, thor, cloud] = createSampleCompanies();

  it('computes Gordon 1-stage DDM exact textbook value', () => {
    const c = structuredClone(thor);
    c.dividendPerShare = 2.0;
    c.valuationAssumptions.ddmModel = 'gordon';
    c.valuationAssumptions.betaMode = 'direct';
    c.valuationAssumptions.leveredBeta = 1.0;
    c.valuationAssumptions.riskFreeRate = 5.0;
    c.valuationAssumptions.equityRiskPremium = 5.0;
    c.valuationAssumptions.countryRiskPremium = 0;
    c.valuationAssumptions.sizePremium = 0;
    c.valuationAssumptions.dividendGrowthRate = 5.0;
    // Ke = 10%, g = 5%, D0 = 2.0 => D1 = 2.10 => V0 = 2.10 / 0.05 = 42.00
    const res = computeDDM(c);
    expect(res.valid).toBe(true);
    expect(res.valuePerShare).toBeCloseTo(42.0, 4);
  });

  it('computes H-Model exact Fuller-Hsia textbook formula', () => {
    const c = structuredClone(thor);
    c.dividendPerShare = 2.0;
    c.valuationAssumptions.ddmModel = 'h_model';
    c.valuationAssumptions.betaMode = 'direct';
    c.valuationAssumptions.leveredBeta = 1.0;
    c.valuationAssumptions.riskFreeRate = 5.0;
    c.valuationAssumptions.equityRiskPremium = 5.0;
    c.valuationAssumptions.countryRiskPremium = 0;
    c.valuationAssumptions.sizePremium = 0;
    c.valuationAssumptions.dividendGrowthRate = 4.0; // g_L
    c.valuationAssumptions.ddmHighGrowthRate = 10.0; // g_S
    c.valuationAssumptions.ddmHighGrowthYears = 6; // 2H = 6 => H = 3
    // V0 = [2 * (1.04) + 2 * 3 * (0.10 - 0.04)] / (0.10 - 0.04) = (2.08 + 0.36) / 0.06 = 40.6667
    const res = computeDDM(c);
    expect(res.valid).toBe(true);
    expect(res.valuePerShare).toBeCloseTo(40.6667, 3);
  });

  it('computes Two-Stage DDM and handles non-dividend payers gracefully', () => {
    const c = structuredClone(thor);
    c.valuationAssumptions.ddmModel = 'two_stage';
    const res = computeDDM(c);
    expect(res.valid).toBe(true);
    expect(res.valuePerShare).toBeGreaterThan(0);

    const noDiv = computeDDM(cloud);
    expect(noDiv.valid).toBe(false);
    expect(noDiv.valuePerShare).toBe(0);
  });
});
