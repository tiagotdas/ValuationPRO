import type {
  CompanyAnalysis,
  CurrencyCode,
  FinancialMetricKey,
  FinancialStatements,
  SectorProfile,
  ValuationAssumptions,
  ValuationBase,
} from '../types/valuation';
import { QUALITATIVE_PILLARS } from '../core/validators';

export const CURRENT_SCHEMA_VERSION = 2;

export const SECTOR_LABELS: Record<SectorProfile, string> = {
  industrial: 'Indústria / Bens de Capital / Serviços',
  consumer: 'Consumo / Varejo / Saúde',
  tech: 'Tecnologia / Software / Alto Crescimento',
  utilities: 'Utilities / Energia / Saneamento',
  financial: 'Financeiro (Bancos / Seguradoras)',
  real_estate: 'Imobiliário / Construção / FIIs',
};

export const VALUATION_BASE_PRESETS: Record<
  ValuationBase,
  {
    label: string;
    currency: CurrencyCode;
    riskFreeRate: number;
    equityRiskPremium: number;
    countryRiskPremium: number;
    costOfDebt: number;
    effectiveTaxRate: number;
    marginalTaxRate: number;
    terminalGrowthRate: number;
    dividendGrowthRate: number;
  }
> = {
  nominal_brl: {
    label: 'Nominal BRL (Brasil)',
    currency: 'BRL',
    riskFreeRate: 11.5,
    equityRiskPremium: 5.5,
    countryRiskPremium: 2.2,
    costOfDebt: 13.0,
    effectiveTaxRate: 25.0,
    marginalTaxRate: 34.0,
    terminalGrowthRate: 4.5,
    dividendGrowthRate: 4.5,
  },
  nominal_usd: {
    label: 'Nominal USD (Global / EUA)',
    currency: 'USD',
    riskFreeRate: 4.25,
    equityRiskPremium: 5.0,
    countryRiskPremium: 0.0,
    costOfDebt: 5.75,
    effectiveTaxRate: 20.0,
    marginalTaxRate: 21.0,
    terminalGrowthRate: 2.5,
    dividendGrowthRate: 2.5,
  },
  real: {
    label: 'Base Real (Acima da Inflação / IPCA+)',
    currency: 'BRL',
    riskFreeRate: 6.2,
    equityRiskPremium: 5.5,
    countryRiskPremium: 1.5,
    costOfDebt: 7.5,
    effectiveTaxRate: 25.0,
    marginalTaxRate: 34.0,
    terminalGrowthRate: 1.5,
    dividendGrowthRate: 1.5,
  },
};

export interface FinancialSectionDefinition {
  title: string;
  items: Array<{ key: FinancialMetricKey; label: string; hint?: string }>;
}

export const FINANCIAL_SECTIONS: FinancialSectionDefinition[] = [
  {
    title: 'Balanço Patrimonial — Ativos',
    items: [
      { key: 'cashAndEquivalents', label: 'Caixa, Equivalentes e Aplicações' },
      { key: 'accountsReceivable', label: 'Contas a Receber' },
      { key: 'inventories', label: 'Estoques' },
      { key: 'otherCurrentAssets', label: 'Outros Ativos Circulantes' },
      { key: 'fixedAssets', label: 'Imobilizado (PP&E)' },
      { key: 'rightOfUseAssets', label: 'Ativo de Direito de Uso (IFRS 16)' },
      { key: 'intangiblesGoodwill', label: 'Intangíveis & Goodwill' },
      {
        key: 'nonOperatingAssets',
        label: 'Investimentos / Coligadas (Não Operacionais)',
        hint: 'Somado na ponte EV → Equity Value',
      },
      { key: 'otherNonCurrentAssets', label: 'Outros Ativos Não Circulantes' },
    ],
  },
  {
    title: 'Balanço Patrimonial — Passivos e Patrimônio Líquido',
    items: [
      { key: 'accountsPayable', label: 'Fornecedores (Contas a Pagar)' },
      { key: 'shortTermDebt', label: 'Dívida de Curto Prazo' },
      { key: 'otherCurrentLiabilities', label: 'Outros Passivos Circulantes' },
      { key: 'longTermDebt', label: 'Dívida de Longo Prazo' },
      { key: 'leaseLiabilities', label: 'Passivos de Arrendamento (IFRS 16)' },
      {
        key: 'provisions',
        label: 'Provisões / Passivos Contingentes',
        hint: 'Opcionalmente deduzido na ponte EV → Equity',
      },
      { key: 'otherNonCurrentLiabilities', label: 'Outros Passivos Não Circulantes' },
      { key: 'preferredStock', label: 'Ações Preferenciais (Debt-like)' },
      { key: 'minorityInterest', label: 'Participação de Não Controladores' },
      { key: 'shareholdersEquity', label: 'Patrimônio Líquido (Controladores)' },
    ],
  },
  {
    title: 'Demonstração do Resultado (DRE)',
    items: [
      { key: 'netSales', label: 'Receita Líquida' },
      { key: 'cogs', label: 'Custo dos Produtos/Serviços (CPV/CSP)' },
      { key: 'sga', label: 'Despesas Comerciais, Gerais e Adm. (SG&A)' },
      { key: 'rd', label: 'Pesquisa & Desenvolvimento (P&D)' },
      {
        key: 'depreciationAmortization',
        label: 'Depreciação e Amortização (D&A)',
        hint: 'Defina acima se D&A já está embutida no CPV/SG&A ou lançada separadamente',
      },
      { key: 'financialIncome', label: 'Receitas Financeiras (+)' },
      {
        key: 'interestExpense',
        label: 'Despesas Financeiras / Juros (valor positivo)',
      },
      { key: 'taxes', label: 'Imposto de Renda e CSLL' },
    ],
  },
  {
    title: 'Demonstração do Fluxo de Caixa (DFC)',
    items: [
      { key: 'cfo', label: 'Fluxo de Caixa Operacional (FCO)' },
      { key: 'capex', label: 'CAPEX — Investimentos em Ativos Fixos (valor positivo)' },
      { key: 'cfi', label: 'Fluxo de Caixa de Investimento (FCI)' },
      { key: 'cff', label: 'Fluxo de Caixa de Financiamento (FCF)' },
      { key: 'dividendsPaid', label: 'Dividendos & JCP Pagos (valor positivo)' },
      { key: 'shareRepurchases', label: 'Recompra de Ações (valor positivo)' },
    ],
  },
];

export const ALL_FINANCIAL_KEYS: FinancialMetricKey[] = FINANCIAL_SECTIONS.flatMap((s) =>
  s.items.map((item) => item.key)
);

export const TOOLTIPS: Record<string, string> = {
  ROE: 'Return on Equity = Lucro Líquido / Patrimônio Líquido Médio. Mede o retorno gerado sobre o capital dos acionistas.',
  ROIC: 'Return on Invested Capital = NOPAT / Capital Investido Médio. Pilar central de criação de valor: a empresa cria valor quando ROIC > WACC.',
  ROA: 'ROA ajustado por impostos = [Lucro Líquido + Juros × (1 − t)] / Ativo Total Médio. Mede a eficiência operacional independente da alavancagem.',
  ROCE: 'Return on Capital Employed = EBIT / (Ativo Total − Passivo Circulante) Médio.',
  'Margem Bruta': '(Receita Líquida − CPV) / Receita Líquida. Reflete poder de precificação e eficiência produtiva.',
  'Margem EBIT': 'EBIT / Receita Líquida. Lucratividade operacional antes de juros e tributos.',
  'Margem EBITDA': 'EBITDA / Receita Líquida. Proxy operacional de geração bruta de caixa.',
  'Margem Líquida': 'Lucro Líquido / Receita Líquida.',
  'Margem FCF': 'Fluxo de Caixa Livre (FCO − CAPEX) / Receita Líquida.',
  'Conversão FCF / LL': 'Fluxo de Caixa Livre / Lucro Líquido. Valores próximos ou acima de 80–100% indicam alta qualidade dos lucros.',
  'Cobertura de Juros': 'EBIT / Despesas Financeiras. Base para estimar o Rating Sintético e o risco de crédito (Damodaran).',
  'Dívida Líquida / EBITDA': '(Dívida Bruta + Leasing − Caixa) / EBITDA. Mede em anos a capacidade operacional de desalavancagem.',
  'Ciclo de Conversão de Caixa': 'DSO + DIO − DPO (em dias). Quanto menor (ou negativo), menos capital de giro a empresa imobiliza para crescer.',
  'Taxa Livre de Risco':
    'Use um título soberano de LONGO PRAZO (10 anos) compatível com a moeda do valuation (ex.: NTN-B longa + inflação implícita / DI longo em BRL, ou US Treasury 10Y em USD). Nunca use Selic/T-Bill de curtíssimo prazo.',
  'Prêmio de Risco (ERP)':
    'Retorno excedente exigido para investir em ações maduras sobre a taxa livre de risco (historicamente 4,5% a 6,0%).',
  'Prêmio de Risco-País (CRP)':
    'Adicional de risco soberano/mercado emergente (ex.: Damodaran CRP / EMBI+ ajustado). Em valuation nominal BRL já embutindo risco soberano na taxa livre de risco local, evite dupla contagem.',
  'Beta (CAPM / Hamada)':
    'Sensibilidade do ativo ao risco sistemático de mercado. No modo Hamada, βL = βU × [1 + (1 − t_m) × (D/E)].',
  'Rating Sintético (Kd)':
    'Estima o spread de crédito da dívida a partir do Índice de Cobertura de Juros (EBIT / Juros), metodologia Damodaran.',
  'Value Driver (ROIC Terminal)':
    'Fórmula McKinsey/Damodaran: TV = NOPAT_(N+1) × (1 − g / ROIC_term) / (WACC − g). Garante coerência econômica entre crescimento perpétuo e reinvestimento.',
  'Mid-Year Convention':
    'Assume que os fluxos de caixa são gerados continuamente ao longo do ano (desconto em t − 0,5 em vez de t), padrão em Investment Banking.',
  'Ponte EV → Equity':
    'Equity Value = EV − Dívida Bruta − Leasing (IFRS 16) + Caixa − Não Controladores − Preferenciais − Provisões + Ativos Não Operacionais.',
  'Reverse DCF':
    'Calcula qual CAGR de receita (ou margem EBIT) está implícito no preço atual de mercado, permitindo confrontar expectativas do mercado com sua tese.',
  'Modelo H (DDM)':
    'Modelo Fuller-Hsia onde o crescimento dos dividendos desacelera linearmente de g_S até g_L ao longo de 2H anos.',
  'Total Shareholder Yield':
    '(Dividendos Pagos + Recompra de Ações) / Valor de Mercado. Mede o retorno total em caixa devolvido ao acionista.',
};

export function createEmptyFinancials(years = ['2021', '2022', '2023', '2024', 'LTM']): FinancialStatements {
  const zeros = () => years.map(() => 0);
  return {
    years: [...years],
    daRecognition: 'included_in_opex',
    fixedAssets: zeros(),
    intangiblesGoodwill: zeros(),
    rightOfUseAssets: zeros(),
    nonOperatingAssets: zeros(),
    inventories: zeros(),
    accountsReceivable: zeros(),
    otherCurrentAssets: zeros(),
    otherNonCurrentAssets: zeros(),
    cashAndEquivalents: zeros(),
    shareholdersEquity: zeros(),
    minorityInterest: zeros(),
    preferredStock: zeros(),
    shortTermDebt: zeros(),
    longTermDebt: zeros(),
    leaseLiabilities: zeros(),
    provisions: zeros(),
    accountsPayable: zeros(),
    otherCurrentLiabilities: zeros(),
    otherNonCurrentLiabilities: zeros(),
    netSales: zeros(),
    cogs: zeros(),
    sga: zeros(),
    depreciationAmortization: zeros(),
    rd: zeros(),
    financialIncome: zeros(),
    interestExpense: zeros(),
    taxes: zeros(),
    cfo: zeros(),
    capex: zeros(),
    cfi: zeros(),
    cff: zeros(),
    dividendsPaid: zeros(),
    shareRepurchases: zeros(),
  };
}

export function createDefaultAssumptions(base: ValuationBase = 'nominal_brl'): ValuationAssumptions {
  const preset = VALUATION_BASE_PRESETS[base];
  return {
    valuationBase: base,
    riskFreeRate: preset.riskFreeRate,
    equityRiskPremium: preset.equityRiskPremium,
    countryRiskPremium: preset.countryRiskPremium,
    sizePremium: 0,
    betaMode: 'direct',
    leveredBeta: 1.0,
    unleveredBeta: 0.85,
    costOfDebtMode: 'manual',
    costOfDebt: preset.costOfDebt,
    capitalStructureMode: 'current',
    targetDebtToCapital: 25,
    effectiveTaxRate: preset.effectiveTaxRate,
    marginalTaxRate: preset.marginalTaxRate,

    projectionYears: 5,
    salesGrowth: [9, 8, 7, 6, 5, 5, 4.5, 4.5, 4.5, 4.5],
    ebitMarginStart: 16,
    ebitMarginTarget: 16,
    capexAsPercentOfSales: 5,
    depAsPercentOfSales: 3.5,
    nwcAsPercentOfSales: 12,
    midYearConvention: true,
    fcfeTargetDebtRatio: 20,
    includeProvisionsInBridge: false,
    includeLeasesInDebt: true,
    safetyMarginTarget: 25,

    terminalMethod: 'value_driver',
    terminalGrowthRate: preset.terminalGrowthRate,
    terminalROIC: 16,
    exitEvEbitdaMultiple: 9.0,

    ddmModel: 'two_stage',
    dividendGrowthRate: preset.dividendGrowthRate,
    ddmHighGrowthRate: 9.0,
    ddmHighGrowthYears: 5,

    scenarios: {
      bear: {
        label: 'Pessimista (Bear)',
        probability: 25,
        salesGrowthDelta: -3.0,
        ebitMarginDelta: -2.5,
        waccDelta: 1.5,
        terminalGrowthDelta: -1.0,
      },
      base: {
        label: 'Base',
        probability: 50,
        salesGrowthDelta: 0,
        ebitMarginDelta: 0,
        waccDelta: 0,
        terminalGrowthDelta: 0,
      },
      bull: {
        label: 'Otimista (Bull)',
        probability: 25,
        salesGrowthDelta: 3.0,
        ebitMarginDelta: 2.0,
        waccDelta: -1.0,
        terminalGrowthDelta: 0.5,
      },
    },
  };
}

export function createDefaultQualitative(): Record<string, { score: number; note: string }> {
  const result: Record<string, { score: number; note: string }> = {};
  for (const pillar of Object.values(QUALITATIVE_PILLARS)) {
    for (const q of pillar.questions) {
      result[q.key] = { score: 3, note: '' };
    }
  }
  return result;
}

export function createNewCompany(
  id: string,
  base: ValuationBase = 'nominal_brl'
): CompanyAnalysis {
  const preset = VALUATION_BASE_PRESETS[base];
  return {
    id,
    schemaVersion: CURRENT_SCHEMA_VERSION,
    updatedAt: new Date().toISOString(),
    companyName: 'Nova Empresa',
    companyTicker: '',
    sectorProfile: 'industrial',
    currency: preset.currency,
    scale: 'millions',
    sharePrice: 0,
    basicShares: 0,
    dilutedShares: 0,
    marketCap: 0,
    dividendPerShare: 0,
    week52Low: 0,
    week52High: 0,
    investmentThesis: '',
    financials: createEmptyFinancials(),
    qualitative: createDefaultQualitative(),
    valuationAssumptions: createDefaultAssumptions(base),
    peers: [],
  };
}
