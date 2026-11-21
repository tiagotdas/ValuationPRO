import type { CompanyAnalysis, ValidationAlert } from '../types/valuation';
import {
  getBalanceSheetChecks,
  getEffectiveShares,
  getLastIndex,
  getEBITMargin,
} from './accounting';
import { computeDCF_FCFF } from './dcf';
import { computeDDM } from './ddm';

export interface QualitativeSummary {
  overallScore: number; // 1..5
  pillarScores: Record<string, number>;
  answeredCount: number;
  totalCount: number;
}

export const QUALITATIVE_PILLARS: Record<
  string,
  { title: string; questions: Array<{ key: string; text: string }> }
> = {
  competence: {
    title: 'Círculo de Competência',
    questions: [
      { key: 'q1', text: 'Compreendo claramente como a empresa gera receita, margem e caixa?' },
      { key: 'q2', text: 'O modelo de negócio é simples, transparente e consistente ao longo do tempo?' },
      { key: 'q3', text: 'A previsibilidade dos fluxos de caixa nos próximos 5–10 anos é elevada?' },
    ],
  },
  moat: {
    title: 'Vantagem Competitiva (Moat)',
    questions: [
      { key: 'q4', text: 'A empresa possui poder de precificação comprovado (repassa inflação sem perder volume)?' },
      { key: 'q5', text: 'Existem altos custos de troca (switching costs) ou efeito de rede?' },
      { key: 'q6', text: 'A escala, ativos intangíveis ou marca conferem retorno sobre capital (ROIC) estruturalmente superior?' },
      { key: 'q7', text: 'O modelo possui boa escalabilidade operacional (baixo custo marginal)?' },
    ],
  },
  porter: {
    title: '5 Forças de Porter (Setor)',
    questions: [
      { key: 'q8', text: 'A rivalidade entre concorrentes estabelecidos é moderada/racional?' },
      { key: 'q9', text: 'Existem barreiras significativas à entrada de novos competidores?' },
      { key: 'q10', text: 'O poder de barganha dos fornecedores é baixo/diversificado?' },
      { key: 'q11', text: 'O poder de barganha dos clientes é baixo (base pulverizada)?' },
      { key: 'q12', text: 'A ameaça de produtos substitutos ou disrupção tecnológica é reduzida?' },
    ],
  },
  governance: {
    title: 'Gestão & Alocação de Capital',
    questions: [
      { key: 'q13', text: 'A gestão demonstra histórico disciplinado de alocação de capital (M&A, CAPEX, recompras, dividendos)?' },
      { key: 'q14', text: 'A remuneração dos executivos e estrutura societária estão alinhadas ao acionista minoritário?' },
      { key: 'q15', text: 'A governança, transparência contábil e comunicação com o mercado são de alto padrão?' },
    ],
  },
};

export function computeQualitativeSummary(company: CompanyAnalysis): QualitativeSummary {
  const pillarScores: Record<string, number> = {};
  let sumAll = 0;
  let countAll = 0;
  let totalCount = 0;

  for (const [pillarKey, pillar] of Object.entries(QUALITATIVE_PILLARS)) {
    let pSum = 0;
    let pCount = 0;
    for (const q of pillar.questions) {
      totalCount++;
      const entry = company.qualitative[q.key];
      if (entry && entry.score >= 1 && entry.score <= 5) {
        pSum += entry.score;
        pCount++;
        sumAll += entry.score;
        countAll++;
      }
    }
    pillarScores[pillarKey] = pCount > 0 ? pSum / pCount : 0;
  }

  return {
    overallScore: countAll > 0 ? sumAll / countAll : 0,
    pillarScores,
    answeredCount: countAll,
    totalCount,
  };
}

export function runValuationGuardrails(company: CompanyAnalysis): ValidationAlert[] {
  const alerts: ValidationAlert[] = [];
  const a = company.valuationAssumptions;
  const f = company.financials;
  const lastIdx = getLastIndex(f);

  // 1. Sector applicability alerts
  if (company.sectorProfile === 'financial') {
    alerts.push({
      severity: 'warning',
      category: 'sector',
      title: 'Setor Financeiro (Bancos / Seguradoras)',
      message:
        'Para instituições financeiras, dívida é matéria-prima operacional. Priorize FCFE, DDM e P/VP vs. ROE em vez de FCFF/WACC ou EV/EBITDA.',
    });
  } else if (company.sectorProfile === 'real_estate') {
    alerts.push({
      severity: 'info',
      category: 'sector',
      title: 'Setor Imobiliário / FII / REIT',
      message:
        'Considere avaliar também por FFO/AFFO, P/VP (NAV) e DDM, pois a depreciação contábil nem sempre reflete o CAPEX de manutenção real.',
    });
  }

  // 2. Balance Sheet reconciliation check
  const bsChecks = getBalanceSheetChecks(f);
  const unbalanced = bsChecks.filter((c) => !c.isBalanced && (c.totalAssets > 0 || c.totalLiabilitiesAndEquity > 0));
  if (unbalanced.length > 0) {
    alerts.push({
      severity: 'warning',
      category: 'accounting',
      title: 'Balanço Patrimonial sem fechamento exato',
      message: `Diferença entre Ativo Total e Passivo + PL em ${unbalanced.map((u) => u.year).join(', ')}. Utilize "Outros Ativos" ou "Outros Passivos" para fechar o balanço e garantir ROA/ROIC precisos.`,
    });
  }

  // 3. Shares check
  if (getEffectiveShares(company) <= 0) {
    alerts.push({
      severity: 'error',
      category: 'accounting',
      title: 'Quantidade de ações não informada',
      message:
        'Informe o número de Ações Diluídas (ou Básicas) na mesma escala dos demonstrativos para calcular o Valor Intrínseco por Ação.',
    });
  }

  // 4. DCF & Terminal Value checks
  const fcff = computeDCF_FCFF(company);
  if (!fcff.valid && fcff.errorMessage) {
    alerts.push({
      severity: 'error',
      category: 'dcf',
      title: 'DCF FCFF inválido',
      message: fcff.errorMessage,
    });
  } else if (fcff.valid) {
    // Growth ceiling guardrail (nominal BRL vs USD/Real)
    const maxRecommendedG = a.valuationBase === 'nominal_brl' ? 6.5 : 4.0;
    if (a.terminalGrowthRate > maxRecommendedG) {
      alerts.push({
        severity: 'warning',
        category: 'dcf',
        title: `Crescimento perpétuo (${a.terminalGrowthRate.toFixed(1)}%) elevado`,
        message: `Na base ${a.valuationBase === 'nominal_brl' ? 'Nominal BRL' : a.valuationBase === 'nominal_usd' ? 'Nominal USD' : 'Real'}, g na perpetuidade não deve superar o crescimento nominal de longo prazo da economia (~${maxRecommendedG}%).`,
      });
    }

    if (fcff.terminalValueShareOfEV > 75) {
      alerts.push({
        severity: 'warning',
        category: 'dcf',
        title: `Valor Terminal concentra ${fcff.terminalValueShareOfEV.toFixed(1)}% do EV`,
        message:
          'Mais de 75% do Enterprise Value depende da perpetuidade. Considere ampliar o horizonte explícito de projeção para 7–10 anos para aumentar a robustez do modelo.',
      });
    }

    if (a.terminalMethod === 'value_driver' && a.terminalROIC > 30) {
      alerts.push({
        severity: 'info',
        category: 'dcf',
        title: `ROIC terminal muito alto (${a.terminalROIC.toFixed(1)}%)`,
        message:
          'Pela teoria de competição (McKinsey/Damodaran), na perpetuidade o ROIC incremental tende a convergir em direção ao WACC, exceto em empresas com Moat excepcional.',
      });
    }

    if (
      a.terminalMethod === 'gordon' &&
      fcff.impliedTerminalROIC !== null &&
      fcff.impliedTerminalROIC > 50
    ) {
      alerts.push({
        severity: 'warning',
        category: 'dcf',
        title: `Reinvestimento insuficiente na perpetuidade (ROIC implícito ${fcff.impliedTerminalROIC.toFixed(0)}%)`,
        message:
          'O método Gordon puro sobre o último FCFF implica retorno quase infinito sobre capital reinvestido. Prefira o método "Value Driver (ROIC Terminal)".',
      });
    }
  }

  // 5. DDM sustainability guardrail
  const ddm = computeDDM(company);
  if (ddm.valid) {
    if (ddm.shareholderReturns.payoutRatio > 100) {
      alerts.push({
        severity: 'warning',
        category: 'ddm',
        title: `Payout acima de 100% (${ddm.shareholderReturns.payoutRatio.toFixed(0)}%)`,
        message:
          'A empresa distribuiu mais dividendos do que o Lucro Líquido recente. Verifique se os dividendos são sustentáveis pelo Fluxo de Caixa Livre.',
      });
    }
    if (
      ddm.shareholderReturns.sustainableGrowthRate > 0 &&
      a.dividendGrowthRate > ddm.shareholderReturns.sustainableGrowthRate + 2
    ) {
      alerts.push({
        severity: 'warning',
        category: 'ddm',
        title: 'Crescimento de dividendos acima do sustentável',
        message: `g perpétuo (${a.dividendGrowthRate.toFixed(1)}%) supera a taxa sustentável histórica ROE × (1 - Payout) = ${ddm.shareholderReturns.sustainableGrowthRate.toFixed(1)}%.`,
      });
    }
  }

  // 6. Narrative vs. Numbers coherence (Damodaran)
  const qual = computeQualitativeSummary(company);
  const moatAndPorter =
    ((qual.pillarScores.moat || 0) + (qual.pillarScores.porter || 0)) / 2;
  const lastEbitMargin = getEBITMargin(f)[lastIdx] ?? 0;

  if (qual.answeredCount >= 8 && moatAndPorter > 0 && moatAndPorter < 2.8) {
    if (a.ebitMarginTarget > lastEbitMargin + 3) {
      alerts.push({
        severity: 'warning',
        category: 'qualitative',
        title: 'Conflito Narrativa × Números (Expansão de Margem)',
        message: `A pontuação de Moat/Porter é baixa (${moatAndPorter.toFixed(1)}/5), mas o DCF projeta expansão relevante de Margem EBIT (de ${lastEbitMargin.toFixed(1)}% para ${a.ebitMarginTarget.toFixed(1)}%). Revise a coerência da tese.`,
      });
    }
    if (fcff.valid && a.terminalROIC > fcff.costOfCapital.wacc + 8) {
      alerts.push({
        severity: 'warning',
        category: 'qualitative',
        title: 'Conflito Narrativa × Números (ROIC Terminal)',
        message: `Moat/Porter avaliado em ${moatAndPorter.toFixed(1)}/5, mas o ROIC terminal (${a.terminalROIC.toFixed(1)}%) mantém spread elevado sobre o WACC (${fcff.costOfCapital.wacc.toFixed(1)}%) na perpetuidade.`,
      });
    }
  }

  // 7. Scenario probability sum check
  const probSum =
    a.scenarios.bear.probability +
    a.scenarios.base.probability +
    a.scenarios.bull.probability;
  if (Math.abs(probSum - 100) > 0.1) {
    alerts.push({
      severity: 'info',
      category: 'dcf',
      title: `Soma das probabilidades dos cenários é ${probSum.toFixed(0)}%`,
      message: 'Ajuste os pesos Bear/Base/Bull para totalizar 100% (atualmente o valor esperado é normalizado automaticamente).',
    });
  }

  return alerts;
}
