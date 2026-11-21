export type CurrencyCode = 'BRL' | 'USD' | 'EUR';

export type ScaleUnit = 'units' | 'thousands' | 'millions' | 'billions';

export type SectorProfile =
  | 'industrial'
  | 'tech'
  | 'consumer'
  | 'utilities'
  | 'financial'
  | 'real_estate';

export type ValuationBase = 'nominal_brl' | 'nominal_usd' | 'real';

export type DARecognition = 'included_in_opex' | 'separate';

export type TerminalMethod = 'value_driver' | 'gordon' | 'exit_multiple';

export type DDMModelType = 'gordon' | 'two_stage' | 'h_model';

export interface FinancialStatements {
  years: string[];
  daRecognition: DARecognition;

  // Balance Sheet - Assets
  fixedAssets: number[];
  intangiblesGoodwill: number[];
  rightOfUseAssets: number[];
  nonOperatingAssets: number[];
  inventories: number[];
  accountsReceivable: number[];
  otherCurrentAssets: number[];
  otherNonCurrentAssets: number[];
  cashAndEquivalents: number[];

  // Balance Sheet - Liabilities & Equity
  shareholdersEquity: number[];
  minorityInterest: number[];
  preferredStock: number[];
  shortTermDebt: number[];
  longTermDebt: number[];
  leaseLiabilities: number[];
  provisions: number[];
  accountsPayable: number[];
  otherCurrentLiabilities: number[];
  otherNonCurrentLiabilities: number[];

  // Income Statement
  netSales: number[];
  cogs: number[];
  sga: number[];
  depreciationAmortization: number[];
  rd: number[];
  financialIncome: number[];
  interestExpense: number[];
  taxes: number[];

  // Cash Flow Statement
  cfo: number[];
  capex: number[];
  cfi: number[];
  cff: number[];
  dividendsPaid: number[];
  shareRepurchases: number[];
}

export type FinancialMetricKey = Exclude<keyof FinancialStatements, 'years' | 'daRecognition'>;

export interface ScenarioAdjustment {
  label: string;
  probability: number; // % (sum should be 100)
  salesGrowthDelta: number; // percentage points
  ebitMarginDelta: number; // percentage points
  waccDelta: number; // percentage points
  terminalGrowthDelta: number; // percentage points
}

export interface ValuationAssumptions {
  // Capital Cost (CAPM & WACC)
  valuationBase: ValuationBase;
  riskFreeRate: number; // %
  equityRiskPremium: number; // %
  countryRiskPremium: number; // %
  sizePremium: number; // %
  betaMode: 'direct' | 'hamada';
  leveredBeta: number;
  unleveredBeta: number;
  costOfDebtMode: 'manual' | 'synthetic';
  costOfDebt: number; // %
  capitalStructureMode: 'current' | 'target';
  targetDebtToCapital: number; // %
  effectiveTaxRate: number; // %
  marginalTaxRate: number; // %

  // DCF Operational Projections
  projectionYears: number; // 5..10
  salesGrowth: number[]; // % per year
  ebitMarginStart: number; // %
  ebitMarginTarget: number; // %
  capexAsPercentOfSales: number; // %
  depAsPercentOfSales: number; // %
  nwcAsPercentOfSales: number; // %
  midYearConvention: boolean;
  fcfeTargetDebtRatio: number; // % of net reinvestment funded by debt
  includeProvisionsInBridge: boolean;
  includeLeasesInDebt: boolean;
  safetyMarginTarget: number; // %

  // Terminal Value
  terminalMethod: TerminalMethod;
  terminalGrowthRate: number; // %
  terminalROIC: number; // %
  exitEvEbitdaMultiple: number; // x

  // DDM
  ddmModel: DDMModelType;
  dividendGrowthRate: number; // % long-term g
  ddmHighGrowthRate: number; // % short-term g
  ddmHighGrowthYears: number; // years

  // Scenarios
  scenarios: {
    bear: ScenarioAdjustment;
    base: ScenarioAdjustment;
    bull: ScenarioAdjustment;
  };
}

export interface PeerCompany {
  id: string;
  name: string;
  ticker: string;
  evToEbitda: number | null;
  evToEbit: number | null;
  evToSales: number | null;
  pe: number | null;
  pb: number | null;
  peg: number | null;
  fcfYield: number | null; // %
}

export interface QualitativeEntry {
  score: number; // 1..5
  note: string;
}

export interface CompanyAnalysis {
  id: string;
  schemaVersion: number;
  updatedAt: string;
  companyName: string;
  companyTicker: string;
  sectorProfile: SectorProfile;
  currency: CurrencyCode;
  scale: ScaleUnit;

  // Market & Share data (shares in same scale as financials; sharePrice & dividendPerShare are per share)
  sharePrice: number;
  basicShares: number;
  dilutedShares: number;
  marketCap: number; // in financial scale units
  dividendPerShare: number;
  week52Low: number;
  week52High: number;

  investmentThesis: string;
  financials: FinancialStatements;
  qualitative: Record<string, QualitativeEntry>;
  valuationAssumptions: ValuationAssumptions;
  peers: PeerCompany[];
}

export interface AppState {
  schemaVersion: number;
  currentCompanyId: string | null;
  companies: Record<string, CompanyAnalysis>;
}

export interface ValidationAlert {
  severity: 'error' | 'warning' | 'info';
  category: 'dcf' | 'wacc' | 'accounting' | 'ddm' | 'qualitative' | 'sector';
  title: string;
  message: string;
}
