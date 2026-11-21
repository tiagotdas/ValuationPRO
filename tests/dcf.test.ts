import { describe, expect, it } from 'vitest';
import {
  computeDCF_FCFE,
  computeDCF_FCFF,
  computeEVBridge,
  computeReverseDCF,
} from '../src/core/dcf';
import { createSampleCompanies } from '../src/state/samples';

describe('DCF FCFF, FCFE, EV->Equity Bridge & Reverse DCF Engine', () => {
  const [alfa, thor, cloud] = createSampleCompanies();

  it('computes full EV -> Equity bridge including IFRS 16 leases, minority interest, and non-operating assets', () => {
    const bridge = computeEVBridge(alfa);
    // ALFA LTM: ST 400 + LT 910 + Leases 260 = 1570; Cash = 2980 => Net Debt = -1410
    // + MI 110 + Pref 0 + Prov 0 (disabled) - NonOp 170 => netDeduction = -1470
    expect(bridge.totalDebtUsed).toBe(1570);
    expect(bridge.netDebt).toBe(-1410);
    expect(bridge.netDeductionFromEV).toBe(-1470);
  });

  it('computes valid FCFF DCF with Value Driver Formula, Gordon, and Exit Multiple', () => {
    const vd = computeDCF_FCFF(alfa, { terminalMethodOverride: 'value_driver' });
    const gordon = computeDCF_FCFF(alfa, { terminalMethodOverride: 'gordon' });
    const exit = computeDCF_FCFF(alfa, { terminalMethodOverride: 'exit_multiple' });

    expect(vd.valid).toBe(true);
    expect(vd.projections).toHaveLength(7);
    expect(vd.valuePerShare).toBeGreaterThan(0);
    expect(vd.impliedReinvestmentRate).toBeCloseTo((5 / 20) * 100, 2); // g/ROIC = 25%
    expect(vd.safetyMarginPrice).toBeCloseTo(vd.valuePerShare * 0.75, 4);

    expect(gordon.valid).toBe(true);
    expect(exit.valid).toBe(true);
    expect(exit.impliedExitMultiple).toBeCloseTo(
      alfa.valuationAssumptions.exitEvEbitdaMultiple,
      4
    );
  });

  it('properly distinguishes FCFE from FCFF (interest expense & net debt issuance)', () => {
    const fcff = computeDCF_FCFF(thor);
    const fcfe = computeDCF_FCFE(thor);

    expect(fcff.valid).toBe(true);
    expect(fcfe.valid).toBe(true);
    // For a leveraged utility, FCFE projections deduct interest expense and reflect debt flows
    expect(fcfe.projections[0].interestExpense).toBeGreaterThan(500);
    expect(fcfe.projections[0].fcfe).not.toBeCloseTo(fcff.projections[0].fcff, 1);
    expect(fcfe.costOfEquity).toBeGreaterThan(fcff.costOfCapital.wacc);
  });

  it('handles Mid-Year Convention vs End-of-Year Convention accurately', () => {
    const mid = structuredClone(alfa);
    mid.valuationAssumptions.midYearConvention = true;
    const eoy = structuredClone(alfa);
    eoy.valuationAssumptions.midYearConvention = false;

    const resMid = computeDCF_FCFF(mid);
    const resEoy = computeDCF_FCFF(eoy);
    // Mid-year explicit PV must be strictly greater than end-of-year PV by ~(1+WACC)^0.5
    const ratio = resMid.pvOfExplicitFcff / resEoy.pvOfExplicitFcff;
    const expectedFactor = Math.pow(1 + resMid.costOfCapital.wacc / 100, 0.5);
    expect(ratio).toBeCloseTo(expectedFactor, 4);
  });

  it('rejects invalid WACC <= g cleanly without NaN or Infinity', () => {
    const broken = structuredClone(alfa);
    broken.valuationAssumptions.terminalGrowthRate = 25;
    const res = computeDCF_FCFF(broken);
    expect(res.valid).toBe(false);
    expect(res.valuePerShare).toBe(0);
    expect(Number.isFinite(res.enterpriseValue)).toBe(true);
  });

  it('converges Reverse DCF implied CAGR back to current Market Cap', () => {
    const rev = computeReverseDCF(cloud);
    expect(rev.valid).toBe(true);
    expect(rev.impliedSalesCAGR).not.toBeNull();

    // Plugging the solved implied CAGR back into DCF_FCFF must reproduce Market Cap
    const check = computeDCF_FCFF(cloud, {
      uniformSalesGrowth: rev.impliedSalesCAGR!,
    });
    expect(check.equityValue).toBeCloseTo(rev.currentMarketCap, 0);
  });
});
