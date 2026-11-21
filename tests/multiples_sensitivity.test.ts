import { describe, expect, it } from 'vitest';
import { computeRelativeValuation, computeStatSummary } from '../src/core/multiples';
import {
  computeFootballField,
  computeScenarios,
  computeWaccGrowthMatrix,
} from '../src/core/sensitivity';
import { runValuationGuardrails } from '../src/core/validators';
import { migrateState } from '../src/state/store';
import { createSampleCompanies } from '../src/state/samples';

describe('Multiples, Sensitivity, Football Field, Guardrails & Legacy Migration', () => {
  const [alfa] = createSampleCompanies();

  it('computes peer quartiles, median, and EV-adjusted implied prices', () => {
    const stats = computeStatSummary([10, 12, 14, 16, null, -5]);
    expect(stats.count).toBe(4);
    expect(stats.median).toBe(13);
    expect(stats.q1).toBe(11.5);
    expect(stats.q3).toBe(14.5);

    const rel = computeRelativeValuation(alfa);
    const evEbitdaRow = rel.peerValuations.find((r) => r.metric === 'evToEbitda')!;
    expect(evEbitdaRow.impliedPriceMedian).toBeGreaterThan(0);
    expect(evEbitdaRow.impliedPriceLow!).toBeLessThanOrEqual(evEbitdaRow.impliedPriceMedian!);
    expect(evEbitdaRow.impliedPriceHigh!).toBeGreaterThanOrEqual(evEbitdaRow.impliedPriceMedian!);
    expect(rel.fundamentals.justifiedPE).toBeGreaterThan(0);
  });

  it('builds 5x5 WACC x g Sensitivity Matrix, Scenarios Expected Value, and Football Field', () => {
    const matrix = computeWaccGrowthMatrix(alfa);
    expect(matrix.cells).toHaveLength(5);
    expect(matrix.cells[0]).toHaveLength(5);
    // Lower WACC (row 0) must yield higher value per share than higher WACC (row 4) for same g
    expect(matrix.cells[0][2].valuePerShare).toBeGreaterThan(matrix.cells[4][2].valuePerShare);

    const scenarios = computeScenarios(alfa);
    expect(scenarios.totalProbability).toBe(100);
    expect(scenarios.expectedValuePerShare).toBeGreaterThan(0);

    const ff = computeFootballField(alfa);
    expect(ff.bars.length).toBeGreaterThanOrEqual(5);
    expect(ff.consensusMid).toBeGreaterThan(0);
  });

  it('triggers guardrails for Financial sector and Narrative-vs-Numbers conflict', () => {
    const bank = structuredClone(alfa);
    bank.sectorProfile = 'financial';
    for (const k of Object.keys(bank.qualitative)) {
      bank.qualitative[k] = { score: 2, note: '' };
    }
    bank.valuationAssumptions.ebitMarginTarget = 28;
    bank.valuationAssumptions.terminalROIC = 32;

    const alerts = runValuationGuardrails(bank);
    expect(alerts.some((a) => a.category === 'sector')).toBe(true);
    expect(alerts.some((a) => a.category === 'qualitative')).toBe(true);
  });

  it('migrates legacy v1 localStorage state losslessly to v2 schema', () => {
    const legacyState = {
      currentCompanyId: 'company_123',
      companies: {
        company_123: {
          id: 'company_123',
          companyName: 'Empresa Antiga',
          companyTicker: 'OLD3',
          sharesOutstanding: 100,
          marketCap: 2500,
          dividendPerShare: 1.5,
          financials: {
            fixedAssets: [500, 550, 600],
            intangiblesGoodwill: [50, 50, 50],
            inventories: [100, 110, 120],
            accountsReceivable: [80, 90, 100],
            cashAndEquivalents: [200, 220, 250],
            shareholdersEquity: [600, 650, 700],
            shortTermDebt: [50, 50, 50],
            longTermDebt: [200, 220, 250],
            provisions: [10, 10, 10],
            accountsPayable: [70, 90, 110],
            netSales: [1000, 1100, 1200],
            cogs: [600, 650, 700],
            sga: [150, 160, 170],
            depreciationAmortization: [40, 45, 50],
            rd: [20, 20, 25],
            interestExpense: [20, 22, 24],
            taxes: [50, 60, 70],
            cfo: [220, 250, 280],
            capex: [80, 90, 100],
            cfi: [-80, -90, -100],
            cff: [-50, -60, -70],
            dividendsPaid: [50, 60, 70],
            shareRepurchases: [0, 0, 0],
          },
          qualitative: { q1: true, q2: false },
          valuationAssumptions: {
            salesGrowth: [8, 7, 6, 5, 4],
            ebitMargin: 22,
            taxRate: 25,
            riskFreeRate: 10,
            equityRiskPremium: 5,
            terminalGrowthRate: 4,
          },
        },
      },
    };

    const migrated = migrateState(legacyState);
    const comp = migrated.companies.company_123;
    expect(comp.schemaVersion).toBe(2);
    expect(comp.companyName).toBe('Empresa Antiga');
    expect(comp.dilutedShares).toBe(100);
    expect(comp.sharePrice).toBeCloseTo(25, 4);
    expect(comp.qualitative.q1.score).toBe(4);
    expect(comp.qualitative.q2.score).toBe(2);
    expect(comp.valuationAssumptions.ebitMarginTarget).toBe(22);
    expect(comp.financials.netSales).toEqual([1000, 1100, 1200]);
  });
});
