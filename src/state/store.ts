import type { AppState, CompanyAnalysis, FinancialMetricKey } from '../types/valuation';
import {
  ALL_FINANCIAL_KEYS,
  CURRENT_SCHEMA_VERSION,
  createDefaultAssumptions,
  createDefaultQualitative,
  createEmptyFinancials,
  createNewCompany,
} from './defaults';
import { createSampleCompanies } from './samples';

const STORAGE_KEY = 'valuationProState';

type Listener = (state: AppState) => void;

/**
 * Migrates legacy v1 company objects (from original index.html) into v2 CompanyAnalysis.
 */
export function migrateCompany(raw: Record<string, unknown>): CompanyAnalysis {
  const id = String(raw.id || `company_${Date.now()}`);
  const baseCompany = createNewCompany(id, 'nominal_brl');

  if (Number(raw.schemaVersion) >= CURRENT_SCHEMA_VERSION) {
    // Ensure all fields exist defensively
    const existing = raw as unknown as CompanyAnalysis;
    const years =
      Array.isArray(existing.financials?.years) && existing.financials.years.length > 0
        ? existing.financials.years
        : baseCompany.financials.years;
    const financials = createEmptyFinancials(years);
    financials.daRecognition = existing.financials?.daRecognition ?? 'included_in_opex';
    for (const key of ALL_FINANCIAL_KEYS) {
      const src = existing.financials?.[key];
      financials[key] = years.map((_, i) =>
        Array.isArray(src) && Number.isFinite(Number(src[i])) ? Number(src[i]) : 0
      );
    }

    return {
      ...baseCompany,
      ...existing,
      schemaVersion: CURRENT_SCHEMA_VERSION,
      financials,
      qualitative: { ...createDefaultQualitative(), ...(existing.qualitative ?? {}) },
      valuationAssumptions: {
        ...createDefaultAssumptions(existing.valuationAssumptions?.valuationBase ?? 'nominal_brl'),
        ...(existing.valuationAssumptions ?? {}),
        scenarios: {
          ...createDefaultAssumptions().scenarios,
          ...(existing.valuationAssumptions?.scenarios ?? {}),
        },
      },
      peers: Array.isArray(existing.peers) ? existing.peers : [],
    };
  }

  // Legacy v1 migration!
  const currentYear = new Date().getFullYear();
  const legacyYears = [
    String(currentYear - 3),
    String(currentYear - 2),
    String(currentYear - 1),
  ];
  const financials = createEmptyFinancials(legacyYears);
  const rawFin = (raw.financials ?? {}) as Record<string, unknown>;
  for (const key of ALL_FINANCIAL_KEYS) {
    const arr = rawFin[key as FinancialMetricKey];
    if (Array.isArray(arr)) {
      financials[key] = legacyYears.map((_, i) => {
        const num = Number(arr[i]);
        return Number.isFinite(num) ? num : 0;
      });
    }
  }

  const shares = Number(raw.sharesOutstanding) || 0;
  const marketCap = Number(raw.marketCap) || 0;
  const sharePrice = shares > 0 && marketCap > 0 ? marketCap / shares : 0;

  // Migrate boolean qualitative checkboxes (true -> 4, false -> 2)
  const qualitative = createDefaultQualitative();
  const rawQual = (raw.qualitative ?? {}) as Record<string, unknown>;
  for (const [k, v] of Object.entries(rawQual)) {
    if (typeof v === 'boolean') {
      qualitative[k] = { score: v ? 4 : 2, note: '' };
    } else if (v && typeof v === 'object' && 'score' in (v as Record<string, unknown>)) {
      const entry = v as { score: number; note?: string };
      qualitative[k] = {
        score: Number(entry.score) || 3,
        note: String(entry.note ?? ''),
      };
    }
  }

  const rawAssump = (raw.valuationAssumptions ?? {}) as Record<string, unknown>;
  const assumptions = createDefaultAssumptions('nominal_brl');
  if (Array.isArray(rawAssump.salesGrowth)) {
    assumptions.salesGrowth = rawAssump.salesGrowth.map((v) => Number(v) || 0);
  }
  if (Number.isFinite(Number(rawAssump.ebitMargin))) {
    assumptions.ebitMarginStart = Number(rawAssump.ebitMargin);
    assumptions.ebitMarginTarget = Number(rawAssump.ebitMargin);
  }
  if (Number.isFinite(Number(rawAssump.taxRate))) {
    assumptions.effectiveTaxRate = Number(rawAssump.taxRate);
  }
  if (Number.isFinite(Number(rawAssump.capexAsPercentOfSales))) {
    assumptions.capexAsPercentOfSales = Number(rawAssump.capexAsPercentOfSales);
  }
  if (Number.isFinite(Number(rawAssump.depAsPercentOfSales))) {
    assumptions.depAsPercentOfSales = Number(rawAssump.depAsPercentOfSales);
  }
  if (Number.isFinite(Number(rawAssump.nwcAsPercentOfSales))) {
    assumptions.nwcAsPercentOfSales = Number(rawAssump.nwcAsPercentOfSales);
  }
  if (Number.isFinite(Number(rawAssump.riskFreeRate))) {
    assumptions.riskFreeRate = Number(rawAssump.riskFreeRate);
  }
  if (Number.isFinite(Number(rawAssump.equityRiskPremium))) {
    assumptions.equityRiskPremium = Number(rawAssump.equityRiskPremium);
  }
  if (Number.isFinite(Number(rawAssump.terminalGrowthRate))) {
    assumptions.terminalGrowthRate = Number(rawAssump.terminalGrowthRate);
  }
  if (Number.isFinite(Number(rawAssump.costOfDebt))) {
    assumptions.costOfDebt = Number(rawAssump.costOfDebt);
  }
  if (Number.isFinite(Number(rawAssump.dividendGrowthRate))) {
    assumptions.dividendGrowthRate = Number(rawAssump.dividendGrowthRate);
  }

  return {
    ...baseCompany,
    id,
    schemaVersion: CURRENT_SCHEMA_VERSION,
    updatedAt: new Date().toISOString(),
    companyName: String(raw.companyName || 'Empresa Migrada'),
    companyTicker: String(raw.companyTicker || ''),
    basicShares: shares,
    dilutedShares: shares,
    marketCap,
    sharePrice,
    dividendPerShare: Number(raw.dividendPerShare) || 0,
    financials,
    qualitative,
    valuationAssumptions: assumptions,
  };
}

export function migrateState(raw: unknown): AppState {
  if (!raw || typeof raw !== 'object') {
    return {
      schemaVersion: CURRENT_SCHEMA_VERSION,
      currentCompanyId: null,
      companies: {},
    };
  }
  const obj = raw as Record<string, unknown>;
  const rawCompanies = (obj.companies ?? {}) as Record<string, Record<string, unknown>>;
  const companies: Record<string, CompanyAnalysis> = {};
  for (const [id, comp] of Object.entries(rawCompanies)) {
    if (comp && typeof comp === 'object') {
      companies[id] = migrateCompany({ ...comp, id });
    }
  }
  const currentId =
    typeof obj.currentCompanyId === 'string' && companies[obj.currentCompanyId]
      ? obj.currentCompanyId
      : null;

  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    currentCompanyId: currentId,
    companies,
  };
}

export class ValuationStore {
  private state: AppState;
  private listeners: Set<Listener> = new Set();
  private lastSavedAt: string | null = null;

  constructor() {
    this.state = this.loadFromStorage();
  }

  private loadFromStorage(): AppState {
    try {
      const saved = globalThis.localStorage?.getItem(STORAGE_KEY);
      if (saved) {
        return migrateState(JSON.parse(saved));
      }
    } catch {
      // Fallback to fresh state if storage is corrupted
    }
    return {
      schemaVersion: CURRENT_SCHEMA_VERSION,
      currentCompanyId: null,
      companies: {},
    };
  }

  private persist(): void {
    try {
      globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(this.state));
      this.lastSavedAt = new Date().toISOString();
    } catch {
      // Ignore storage quota errors gracefully
    }
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit(): void {
    this.persist();
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  getState(): AppState {
    return this.state;
  }

  getLastSavedAt(): string | null {
    return this.lastSavedAt;
  }

  getCurrentCompany(): CompanyAnalysis | null {
    if (!this.state.currentCompanyId) return null;
    return this.state.companies[this.state.currentCompanyId] ?? null;
  }

  setCurrentCompany(id: string | null): void {
    this.state.currentCompanyId = id && this.state.companies[id] ? id : null;
    this.emit();
  }

  createCompany(): CompanyAnalysis {
    const id = `company_${Date.now()}`;
    const company = createNewCompany(id, 'nominal_brl');
    this.state.companies[id] = company;
    this.state.currentCompanyId = id;
    this.emit();
    return company;
  }

  updateCurrentCompany(updater: (company: CompanyAnalysis) => void, silent = false): void {
    const current = this.getCurrentCompany();
    if (!current) return;
    updater(current);
    current.updatedAt = new Date().toISOString();
    if (silent) {
      this.persist();
    } else {
      this.emit();
    }
  }

  deleteCompany(id: string): void {
    delete this.state.companies[id];
    if (this.state.currentCompanyId === id) {
      this.state.currentCompanyId = null;
    }
    this.emit();
  }

  deleteAllCompanies(): void {
    this.state.companies = {};
    this.state.currentCompanyId = null;
    this.emit();
  }

  loadSampleCompanies(): number {
    const samples = createSampleCompanies();
    for (const s of samples) {
      this.state.companies[s.id] = s;
    }
    if (!this.state.currentCompanyId && samples.length > 0) {
      this.state.currentCompanyId = samples[0].id;
    }
    this.emit();
    return samples.length;
  }

  exportJSON(onlyCurrent = false): string {
    if (onlyCurrent) {
      const current = this.getCurrentCompany();
      return JSON.stringify(
        {
          schemaVersion: CURRENT_SCHEMA_VERSION,
          exportedAt: new Date().toISOString(),
          companies: current ? { [current.id]: current } : {},
        },
        null,
        2
      );
    }
    return JSON.stringify(
      {
        schemaVersion: CURRENT_SCHEMA_VERSION,
        exportedAt: new Date().toISOString(),
        companies: this.state.companies,
      },
      null,
      2
    );
  }

  importJSON(jsonText: string): number {
    const parsed = JSON.parse(jsonText) as Record<string, unknown>;
    let importedCount = 0;

    if (parsed.companies && typeof parsed.companies === 'object') {
      const migrated = migrateState(parsed);
      for (const [id, comp] of Object.entries(migrated.companies)) {
        this.state.companies[id] = comp;
        importedCount++;
      }
    } else if (parsed.companyName || parsed.financials) {
      const comp = migrateCompany(parsed);
      this.state.companies[comp.id] = comp;
      importedCount = 1;
    }

    if (importedCount > 0) {
      this.emit();
    }
    return importedCount;
  }
}
