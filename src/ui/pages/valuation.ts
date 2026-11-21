import type {
  CompanyAnalysis,
  DDMModelType,
  TerminalMethod,
  ValuationBase,
} from '../../types/valuation';
import type { ValuationStore } from '../../state/store';
import { computeDCF_FCFE, computeDCF_FCFF, computeReverseDCF } from '../../core/dcf';
import { computeDDM } from '../../core/ddm';
import { computeRelativeValuation } from '../../core/multiples';
import {
  computeFootballField,
  computeScenarios,
  computeWaccExitMultipleMatrix,
  computeWaccGrowthMatrix,
  computeWaccMarginMatrix,
  type SensitivityMatrix,
} from '../../core/sensitivity';
import { runValuationGuardrails } from '../../core/validators';
import {
  escapeHtml,
  formatCurrency,
  formatMultiple,
  formatNumber,
  formatPercent,
  formatScaledCurrency,
  parseNumberInput,
} from '../../core/format';
import { VALUATION_BASE_PRESETS } from '../../state/defaults';
import { buildFootballFieldConfig, renderChart } from '../charts';
import {
  renderAlertsBanner,
  renderTooltip,
  renderUpsideBadge,
} from '../components';

export type ValuationSubTab =
  | 'synthesis'
  | 'dcf'
  | 'sensitivity'
  | 'multiples'
  | 'ddm';

let activeSubTab: ValuationSubTab = 'synthesis';

function heatmapCellClass(upside: number | null, isBase: boolean): string {
  const baseCls = isBase ? ' base-cell' : '';
  if (upside === null) return `heatmap-cell neutral${baseCls}`;
  if (upside >= 20) return `heatmap-cell strong-up${baseCls}`;
  if (upside >= 5) return `heatmap-cell mild-up${baseCls}`;
  if (upside >= -5) return `heatmap-cell neutral${baseCls}`;
  if (upside >= -20) return `heatmap-cell mild-down${baseCls}`;
  return `heatmap-cell strong-down${baseCls}`;
}

function renderSensitivityTable(
  matrix: SensitivityMatrix,
  company: CompanyAnalysis
): string {
  return `
    <div class="card">
      <div class="card-header">
        <div>
          <h3 class="card-title">${escapeHtml(matrix.title)}</h3>
          <p class="card-subtitle">Linha: ${escapeHtml(matrix.rowLabel)} | Coluna: ${escapeHtml(matrix.colLabel)} (célula destacada = caso base)</p>
        </div>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>${escapeHtml(matrix.rowLabel)} \\ ${escapeHtml(matrix.colLabel)}</th>
              ${matrix.colValues
                .map((cv) => `<th style="text-align:center;">${formatNumber(cv, matrix.colUnit === 'x' ? 1 : 2)}${matrix.colUnit}</th>`)
                .join('')}
            </tr>
          </thead>
          <tbody>
            ${matrix.rowValues
              .map(
                (rv, rIdx) => `
              <tr>
                <td class="mono" style="font-weight:700;">${formatNumber(rv, 2)}${matrix.rowUnit}</td>
                ${matrix.cells[rIdx]
                  .map((cell, cIdx) => {
                    const isBase = rIdx === 2 && cIdx === 2;
                    if (!cell.valid) {
                      return `<td class="heatmap-cell neutral${isBase ? ' base-cell' : ''}">N/A</td>`;
                    }
                    return `
                      <td class="${heatmapCellClass(cell.upsidePercent, isBase)}">
                        <div>${formatCurrency(cell.valuePerShare, company.currency)}</div>
                        ${
                          cell.upsidePercent !== null
                            ? `<div style="font-size:10.5px; opacity:0.85;">${formatPercent(cell.upsidePercent, 1, true)}</div>`
                            : ''
                        }
                      </td>
                    `;
                  })
                  .join('')}
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function renderValuationPage(
  container: HTMLElement,
  store: ValuationStore
): void {
  const company = store.getCurrentCompany();
  if (!company) return;

  const alerts = runValuationGuardrails(company);
  const fcff = computeDCF_FCFF(company);
  const fcfe = computeDCF_FCFE(company);
  const ddm = computeDDM(company);
  const rel = computeRelativeValuation(company);
  const revDcf = computeReverseDCF(company);
  const scenarios = computeScenarios(company);
  const footballField = computeFootballField(company);

  const subtabs: Array<{ id: ValuationSubTab; label: string }> = [
    { id: 'synthesis', label: 'Síntese & Football Field' },
    { id: 'dcf', label: 'DCF (FCFF, FCFE & Reverse)' },
    { id: 'sensitivity', label: 'Sensibilidade & Cenários' },
    { id: 'multiples', label: 'Múltiplos & Comparáveis' },
    { id: 'ddm', label: 'DDM (Dividendos)' },
  ];

  let bodyHTML = '';

  if (activeSubTab === 'synthesis') {
    const consensusUpside =
      footballField.consensusMid !== null && footballField.currentSharePrice > 0
        ? ((footballField.consensusMid - footballField.currentSharePrice) /
            footballField.currentSharePrice) *
          100
        : null;

    bodyHTML = `
      <div class="grid-4" style="margin-bottom: 18px;">
        <div class="kpi-tile">
          <span class="kpi-label">Preço Atual de Mercado</span>
          <span class="kpi-value">${footballField.currentSharePrice > 0 ? formatCurrency(footballField.currentSharePrice, company.currency) : '—'}</span>
          <span class="kpi-sub">Market Cap: ${formatScaledCurrency(company.marketCap, company.currency, company.scale)}</span>
        </div>
        <div class="kpi-tile primary">
          <span class="kpi-label">DCF FCFF (Caso Base)</span>
          <span class="kpi-value brand">${fcff.valid ? formatCurrency(fcff.valuePerShare, company.currency) : '—'}</span>
          <span class="kpi-sub">${fcff.valid ? renderUpsideBadge(fcff.upsidePercent) : 'Revise premissas'}</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-label">Valor Esperado (Cenários)</span>
          <span class="kpi-value">${scenarios.expectedValuePerShare > 0 ? formatCurrency(scenarios.expectedValuePerShare, company.currency) : '—'}</span>
          <span class="kpi-sub">${renderUpsideBadge(scenarios.expectedUpsidePercent)}</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-label">Preço-Teto (Margem Seg. ${company.valuationAssumptions.safetyMarginTarget}%)</span>
          <span class="kpi-value ${fcff.valid && footballField.currentSharePrice > 0 && footballField.currentSharePrice <= fcff.safetyMarginPrice ? 'positive' : ''}">${fcff.valid ? formatCurrency(fcff.safetyMarginPrice, company.currency) : '—'}</span>
          <span class="kpi-sub">Média dos métodos: ${footballField.consensusMid !== null ? formatCurrency(footballField.consensusMid, company.currency) : '—'} ${consensusUpside !== null ? `(${formatPercent(consensusUpside, 1, true)})` : ''}</span>
        </div>
      </div>

      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Football Field — Síntese Comparativa de Valuation</h2>
            <p class="card-subtitle">Faixas de valor justo por metodologia (azul: intrínseco | verde-petróleo: múltiplos comparáveis | cinza: 52 semanas) vs. linha vermelha do Preço Atual.</p>
          </div>
        </div>
        ${
          footballField.bars.length > 0
            ? `<div class="chart-box tall"><canvas id="football-field-chart"></canvas></div>`
            : `<p style="color:var(--text-muted);">Preencha os demonstrativos financeiros e quantidade de ações para gerar o gráfico Football Field.</p>`
        }
      </section>

      <section class="card">
        <div class="card-header">
          <h2 class="card-title">Quadro Resumo por Metodologia</h2>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Metodologia</th>
                <th>Detalhe / Base</th>
                <th>Mínimo</th>
                <th>Valor Base / Mediana</th>
                <th>Máximo</th>
                <th>Upside (Base)</th>
              </tr>
            </thead>
            <tbody>
              ${footballField.bars
                .map((b) => {
                  const up =
                    footballField.currentSharePrice > 0 && b.category !== 'market'
                      ? ((b.mid - footballField.currentSharePrice) /
                          footballField.currentSharePrice) *
                        100
                      : null;
                  return `
                  <tr>
                    <td>${escapeHtml(b.label)}</td>
                    <td style="font-family:var(--font-sans); text-align:left; color:var(--text-secondary);">${escapeHtml(b.subtitle)}</td>
                    <td>${formatCurrency(b.low, company.currency)}</td>
                    <td style="font-weight:700;">${formatCurrency(b.mid, company.currency)}</td>
                    <td>${formatCurrency(b.high, company.currency)}</td>
                    <td>${b.category === 'market' ? 'Referência' : renderUpsideBadge(up)}</td>
                  </tr>
                `;
                })
                .join('')}
            </tbody>
          </table>
        </div>
      </section>
    `;
  } else if (activeSubTab === 'dcf') {
    const a = company.valuationAssumptions;
    const coc = fcff.costOfCapital;
    const bridge = fcff.bridge;

    bodyHTML = `
      <!-- Top Results Strip -->
      <div class="grid-4" style="margin-bottom: 18px;">
        <div class="kpi-tile primary">
          <span class="kpi-label">DCF FCFF / Ação</span>
          <span class="kpi-value brand">${fcff.valid ? formatCurrency(fcff.valuePerShare, company.currency) : '—'}</span>
          <span class="kpi-sub">WACC: ${formatPercent(coc.wacc, 2)} | ${fcff.valid ? renderUpsideBadge(fcff.upsidePercent) : ''}</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-label">DCF FCFE / Ação</span>
          <span class="kpi-value">${fcfe.valid ? formatCurrency(fcfe.valuePerShare, company.currency) : '—'}</span>
          <span class="kpi-sub">Ke: ${formatPercent(fcfe.costOfEquity, 2)} | ${fcfe.valid ? renderUpsideBadge(fcfe.upsidePercent) : ''}</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-label">${renderTooltip('Reverse DCF (CAGR Implícito)', 'Reverse DCF')}</span>
          <span class="kpi-value">${revDcf.impliedSalesCAGR !== null ? formatPercent(revDcf.impliedSalesCAGR, 1) : '—'}</span>
          <span class="kpi-sub">Seu CAGR base: ${formatPercent(revDcf.baseProjectedCAGR, 1)} | Margem impl.: ${revDcf.impliedEbitMargin !== null ? formatPercent(revDcf.impliedEbitMargin, 1) : '—'}</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-label">Peso do Valor Terminal</span>
          <span class="kpi-value ${fcff.terminalValueShareOfEV > 75 ? 'negative' : ''}">${fcff.valid ? formatPercent(fcff.terminalValueShareOfEV, 1) : '—'}</span>
          <span class="kpi-sub">EV/EBITDA impl.: ${formatMultiple(fcff.impliedExitMultiple, 1)} | g impl.: ${formatPercent(fcff.impliedTerminalGrowth, 2)}</span>
        </div>
      </div>

      <!-- WACC & CAPM + Operational Assumptions -->
      <div class="grid-2">
        <section class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">Custo de Capital (CAPM, Hamada & WACC)</h2>
              <p class="card-subtitle">Ke = Rf + βL × ERP + CRP + Size | Tax Shield com alíquota marginal</p>
            </div>
          </div>

          <div class="field" style="margin-bottom: 12px;">
            <label>Base de Moeda / Inflação (aplica preset de mercado)</label>
            <select class="select" id="valuation-base-select">
              ${Object.entries(VALUATION_BASE_PRESETS)
                .map(
                  ([k, p]) =>
                    `<option value="${k}" ${a.valuationBase === k ? 'selected' : ''}>${escapeHtml(p.label)}</option>`
                )
                .join('')}
            </select>
          </div>

          <div class="grid-2" style="gap:10px; margin-bottom:12px;">
            <div class="field">
              <label>${renderTooltip('Taxa Livre de Risco (%)', 'Taxa Livre de Risco')}</label>
              <input class="input num-input" type="number" step="0.1" data-assump="riskFreeRate" value="${a.riskFreeRate}" />
            </div>
            <div class="field">
              <label>${renderTooltip('Prêmio de Risco ERP (%)', 'Prêmio de Risco (ERP)')}</label>
              <input class="input num-input" type="number" step="0.1" data-assump="equityRiskPremium" value="${a.equityRiskPremium}" />
            </div>
            <div class="field">
              <label>${renderTooltip('Risco-País CRP (%)', 'Prêmio de Risco-País (CRP)')}</label>
              <input class="input num-input" type="number" step="0.1" data-assump="countryRiskPremium" value="${a.countryRiskPremium}" />
            </div>
            <div class="field">
              <label>Prêmio Tamanho / Específico (%)</label>
              <input class="input num-input" type="number" step="0.1" data-assump="sizePremium" value="${a.sizePremium}" />
            </div>
          </div>

          <div class="grid-2" style="gap:10px; margin-bottom:12px;">
            <div class="field">
              <label>${renderTooltip('Modo do Beta', 'Beta (CAPM / Hamada)')}</label>
              <select class="select" data-assump-str="betaMode">
                <option value="direct" ${a.betaMode === 'direct' ? 'selected' : ''}>Beta Alavancado Direto (βL)</option>
                <option value="hamada" ${a.betaMode === 'hamada' ? 'selected' : ''}>Hamada (Desalavancado βU → βL)</option>
              </select>
            </div>
            <div class="field">
              <label>${a.betaMode === 'hamada' ? 'Beta Desalavancado Setorial (βU)' : 'Beta Alavancado (βL)'}</label>
              <input class="input num-input" type="number" step="0.02" data-assump="${a.betaMode === 'hamada' ? 'unleveredBeta' : 'leveredBeta'}" value="${a.betaMode === 'hamada' ? a.unleveredBeta : a.leveredBeta}" />
              <span class="field-hint">Efetivo: βL = ${formatNumber(coc.leveredBeta, 2)} | βU = ${formatNumber(coc.unleveredBeta, 2)}</span>
            </div>
          </div>

          <div class="grid-2" style="gap:10px; margin-bottom:12px;">
            <div class="field">
              <label>${renderTooltip('Modo do Custo da Dívida', 'Rating Sintético (Kd)')}</label>
              <select class="select" data-assump-str="costOfDebtMode">
                <option value="manual" ${a.costOfDebtMode === 'manual' ? 'selected' : ''}>Manual (Kd pré-IR)</option>
                <option value="synthetic" ${a.costOfDebtMode === 'synthetic' ? 'selected' : ''}>Rating Sintético Damodaran (${coc.syntheticRating.rating})</option>
              </select>
            </div>
            <div class="field">
              <label>Custo da Dívida Pré-IR (%)</label>
              <input class="input num-input" type="number" step="0.1" data-assump="costOfDebt" value="${a.costOfDebtMode === 'synthetic' ? Number(coc.preTaxCostOfDebt.toFixed(2)) : a.costOfDebt}" ${a.costOfDebtMode === 'synthetic' ? 'disabled' : ''} />
              <span class="field-hint">ICR ${formatNumber(coc.syntheticRating.interestCoverage, 1)}x → Spread +${formatPercent(coc.syntheticRating.spread, 2)} | Kd pós-IR: ${formatPercent(coc.afterTaxCostOfDebt, 2)}</span>
            </div>
          </div>

          <div class="grid-2" style="gap:10px; margin-bottom:12px;">
            <div class="field">
              <label>Estrutura de Capital (Pesos WACC)</label>
              <select class="select" data-assump-str="capitalStructureMode">
                <option value="current" ${a.capitalStructureMode === 'current' ? 'selected' : ''}>Atual (Market Cap + Dívida)</option>
                <option value="target" ${a.capitalStructureMode === 'target' ? 'selected' : ''}>Estrutura Alvo (D/V fixo)</option>
              </select>
            </div>
            <div class="field">
              <label>Peso Dívida D/V Alvo (%)</label>
              <input class="input num-input" type="number" step="1" data-assump="targetDebtToCapital" value="${a.capitalStructureMode === 'target' ? a.targetDebtToCapital : Number(coc.debtWeight.toFixed(1))}" ${a.capitalStructureMode !== 'target' ? 'disabled' : ''} />
              <span class="field-hint">Pesos: E/V ${formatPercent(coc.equityWeight, 1)} | D/V ${formatPercent(coc.debtWeight, 1)}</span>
            </div>
            <div class="field">
              <label>Alíquota Efetiva Inicial (%)</label>
              <input class="input num-input" type="number" step="0.5" data-assump="effectiveTaxRate" value="${a.effectiveTaxRate}" />
            </div>
            <div class="field">
              <label>Alíquota Marginal / Perpetuidade (%)</label>
              <input class="input num-input" type="number" step="0.5" data-assump="marginalTaxRate" value="${a.marginalTaxRate}" />
            </div>
          </div>

          <div class="kpi-tile primary" style="flex-direction:row; justify-content:space-between; align-items:center;">
            <div>
              <div class="kpi-label">Resumo do Custo de Capital</div>
              <div class="kpi-sub">Ke = ${formatPercent(coc.costOfEquity, 2)} | Kd(1−t) = ${formatPercent(coc.afterTaxCostOfDebt, 2)}</div>
            </div>
            <div class="kpi-value brand">WACC ${formatPercent(coc.wacc, 2)}</div>
          </div>
        </section>

        <!-- Operational & Terminal Assumptions -->
        <section class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">Projeções Operacionais & Valor Terminal</h2>
              <p class="card-subtitle">Horizonte configurável (5–10 anos), convergência de margem e método de perpetuidade.</p>
            </div>
          </div>

          <div class="grid-2" style="gap:10px; margin-bottom:12px;">
            <div class="field">
              <label>Horizonte Explícito (Anos)</label>
              <select class="select" data-assump-num-select="projectionYears">
                ${[5, 6, 7, 8, 9, 10]
                  .map((n) => `<option value="${n}" ${a.projectionYears === n ? 'selected' : ''}>${n} anos</option>`)
                  .join('')}
              </select>
            </div>
            <div class="field">
              <label>Margem de Segurança Alvo (%)</label>
              <input class="input num-input" type="number" step="1" data-assump="safetyMarginTarget" value="${a.safetyMarginTarget}" />
            </div>
          </div>

          <div class="field" style="margin-bottom:12px;">
            <label>Crescimento de Receita Anual (%, separado por vírgula — ${a.projectionYears} anos)</label>
            <input class="input mono" type="text" id="sales-growth-input" value="${a.salesGrowth.slice(0, a.projectionYears).join(', ')}" />
          </div>

          <div class="grid-2" style="gap:10px; margin-bottom:12px;">
            <div class="field">
              <label>Margem EBIT Ano 1 (%)</label>
              <input class="input num-input" type="number" step="0.2" data-assump="ebitMarginStart" value="${a.ebitMarginStart}" />
            </div>
            <div class="field">
              <label>Margem EBIT Ano ${a.projectionYears} — Alvo (%)</label>
              <input class="input num-input" type="number" step="0.2" data-assump="ebitMarginTarget" value="${a.ebitMarginTarget}" />
            </div>
            <div class="field">
              <label>CAPEX (% Receita)</label>
              <input class="input num-input" type="number" step="0.2" data-assump="capexAsPercentOfSales" value="${a.capexAsPercentOfSales}" />
            </div>
            <div class="field">
              <label>Depreciação & Amort. (% Receita)</label>
              <input class="input num-input" type="number" step="0.2" data-assump="depAsPercentOfSales" value="${a.depAsPercentOfSales}" />
            </div>
            <div class="field">
              <label>Capital de Giro NWC (% Receita)</label>
              <input class="input num-input" type="number" step="0.5" data-assump="nwcAsPercentOfSales" value="${a.nwcAsPercentOfSales}" />
            </div>
            <div class="field">
              <label>Financ. Reinvestimento via Dívida — FCFE (%)</label>
              <input class="input num-input" type="number" step="1" data-assump="fcfeTargetDebtRatio" value="${a.fcfeTargetDebtRatio}" />
            </div>
          </div>

          <div style="border-top:1px solid var(--border-subtle); padding-top:12px; margin-bottom:12px;">
            <div class="grid-2" style="gap:10px;">
              <div class="field">
                <label>${renderTooltip('Método do Valor Terminal', 'Value Driver (ROIC Terminal)')}</label>
                <select class="select" data-assump-str="terminalMethod">
                  <option value="value_driver" ${a.terminalMethod === 'value_driver' ? 'selected' : ''}>Value Driver (ROIC Terminal — Recomendado)</option>
                  <option value="gordon" ${a.terminalMethod === 'gordon' ? 'selected' : ''}>Gordon Growth (sobre último FCFF)</option>
                  <option value="exit_multiple" ${a.terminalMethod === 'exit_multiple' ? 'selected' : ''}>Múltiplo de Saída (EV / EBITDA)</option>
                </select>
              </div>
              <div class="field">
                <label>Crescimento Perpétuo g (%)</label>
                <input class="input num-input" type="number" step="0.1" data-assump="terminalGrowthRate" value="${a.terminalGrowthRate}" />
              </div>
              <div class="field">
                <label>ROIC na Perpetuidade (%)</label>
                <input class="input num-input" type="number" step="0.5" data-assump="terminalROIC" value="${a.terminalROIC}" />
                <span class="field-hint">Reinvestimento terminal = g / ROIC = ${formatPercent(fcff.impliedReinvestmentRate, 1)}</span>
              </div>
              <div class="field">
                <label>Múltiplo de Saída EV/EBITDA (x)</label>
                <input class="input num-input" type="number" step="0.5" data-assump="exitEvEbitdaMultiple" value="${a.exitEvEbitdaMultiple}" />
              </div>
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:8px;">
            <label class="checkbox-row">
              <input type="checkbox" data-assump-bool="midYearConvention" ${a.midYearConvention ? 'checked' : ''} />
              <span>${renderTooltip('Usar Mid-Year Convention (desconto em t − 0,5)', 'Mid-Year Convention')}</span>
            </label>
            <label class="checkbox-row">
              <input type="checkbox" data-assump-bool="includeLeasesInDebt" ${a.includeLeasesInDebt ? 'checked' : ''} />
              <span>Incluir Arrendamentos (IFRS 16) na Dívida Bruta e Ponte EV → Equity</span>
            </label>
            <label class="checkbox-row">
              <input type="checkbox" data-assump-bool="includeProvisionsInBridge" ${a.includeProvisionsInBridge ? 'checked' : ''} />
              <span>Deduzir Provisões / Contingências na Ponte EV → Equity</span>
            </label>
          </div>
        </section>
      </div>

      <!-- Transparent FCFF Year-by-Year Table -->
      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Demonstrativo Aberto — DCF Fluxo de Caixa da Firma (FCFF)</h2>
            <p class="card-subtitle">Projeção linha a linha auditável (${escapeHtml(company.currency)}, mesma escala dos demonstrativos) descontada ao WACC de ${formatPercent(coc.wacc, 2)}.</p>
          </div>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Linha do Fluxo</th>
                ${fcff.projections.map((p) => `<th>${escapeHtml(p.yearLabel)}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Receita Líquida</td>
                ${fcff.projections.map((p) => `<td>${formatNumber(p.sales, 1)}</td>`).join('')}
              </tr>
              <tr>
                <td style="color:var(--text-muted);">Crescimento YoY (%)</td>
                ${fcff.projections.map((p) => `<td style="color:var(--text-muted);">${formatPercent(p.salesGrowth, 1)}</td>`).join('')}
              </tr>
              <tr>
                <td>EBIT</td>
                ${fcff.projections.map((p) => `<td>${formatNumber(p.ebit, 1)}</td>`).join('')}
              </tr>
              <tr>
                <td style="color:var(--text-muted);">Margem EBIT (%)</td>
                ${fcff.projections.map((p) => `<td style="color:var(--text-muted);">${formatPercent(p.ebitMargin, 1)}</td>`).join('')}
              </tr>
              <tr>
                <td>(−) Impostos sobre EBIT</td>
                ${fcff.projections.map((p) => `<td>(${formatNumber(p.taxes, 1)})</td>`).join('')}
              </tr>
              <tr class="row-total">
                <td>NOPAT (Lucro Operacional Pós-IR)</td>
                ${fcff.projections.map((p) => `<td>${formatNumber(p.nopat, 1)}</td>`).join('')}
              </tr>
              <tr>
                <td>(+) Depreciação & Amortização</td>
                ${fcff.projections.map((p) => `<td>${formatNumber(p.da, 1)}</td>`).join('')}
              </tr>
              <tr>
                <td>(−) CAPEX</td>
                ${fcff.projections.map((p) => `<td>(${formatNumber(p.capex, 1)})</td>`).join('')}
              </tr>
              <tr>
                <td>(−) Variação Capital de Giro (ΔNWC)</td>
                ${fcff.projections.map((p) => `<td>${formatNumber(-p.deltaNWC, 1)}</td>`).join('')}
              </tr>
              <tr class="row-total">
                <td>FCFF (Fluxo de Caixa Livre da Firma)</td>
                ${fcff.projections.map((p) => `<td>${formatNumber(p.fcff, 1)}</td>`).join('')}
              </tr>
              <tr>
                <td style="color:var(--text-muted);">Fator de Desconto (${a.midYearConvention ? 'Mid-Year' : 'Fim Ano'})</td>
                ${fcff.projections.map((p) => `<td style="color:var(--text-muted);">${formatNumber(p.discountFactor, 4)}</td>`).join('')}
              </tr>
              <tr class="row-highlight">
                <td>Valor Presente do FCFF</td>
                ${fcff.projections.map((p) => `<td>${formatNumber(p.pvFcff, 1)}</td>`).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- EV -> Equity Bridge & Terminal Value Cross-Check -->
      <div class="grid-2">
        <section class="card">
          <div class="card-header">
            <h2 class="card-title">${renderTooltip('Ponte Enterprise Value → Equity Value', 'Ponte EV → Equity')}</h2>
          </div>
          <div class="table-wrap">
            <table class="data-table">
              <tbody>
                <tr><td>(+) VP dos FCFFs Explícitos</td><td>${formatScaledCurrency(fcff.pvOfExplicitFcff, company.currency, company.scale)}</td></tr>
                <tr><td>(+) VP do Valor Terminal (${formatPercent(fcff.terminalValueShareOfEV, 1)} do EV)</td><td>${formatScaledCurrency(fcff.pvOfTerminalValue, company.currency, company.scale)}</td></tr>
                <tr class="row-total"><td>Enterprise Value (EV)</td><td>${formatScaledCurrency(fcff.enterpriseValue, company.currency, company.scale)}</td></tr>
                <tr><td>(−) Dívida Bruta (CP + LP)</td><td>(${formatScaledCurrency(bridge.shortAndLongTermDebt, company.currency, company.scale)})</td></tr>
                <tr><td>(−) Arrendamentos IFRS 16 ${a.includeLeasesInDebt ? '' : '(desabilitado)'}</td><td>(${formatScaledCurrency(a.includeLeasesInDebt ? bridge.leaseLiabilities : 0, company.currency, company.scale)})</td></tr>
                <tr><td>(+) Caixa e Equivalentes</td><td>${formatScaledCurrency(bridge.cashAndEquivalents, company.currency, company.scale)}</td></tr>
                <tr><td>(−) Participação de Não Controladores</td><td>(${formatScaledCurrency(bridge.minorityInterest, company.currency, company.scale)})</td></tr>
                <tr><td>(−) Ações Preferenciais / Provisões</td><td>(${formatScaledCurrency(bridge.preferredStock + bridge.provisionsAdjustment, company.currency, company.scale)})</td></tr>
                <tr><td>(+) Ativos Não Operacionais / Coligadas</td><td>${formatScaledCurrency(bridge.nonOperatingAssets, company.currency, company.scale)}</td></tr>
                <tr class="row-total"><td>Equity Value (Valor Justo do PL)</td><td>${formatScaledCurrency(fcff.equityValue, company.currency, company.scale)}</td></tr>
                <tr><td>(÷) Ações Diluídas</td><td>${formatNumber(fcff.sharesUsed, 2)}</td></tr>
                <tr class="row-highlight"><td>Valor Intrínseco por Ação (FCFF)</td><td>${formatCurrency(fcff.valuePerShare, company.currency)}</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Transparent FCFE Summary & Table -->
        <section class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">DCF — Fluxo de Caixa do Acionista (FCFE)</h2>
              <p class="card-subtitle">FCFE = Lucro Líquido − (1 − δ)(CAPEX − D&A + ΔNWC), descontado ao Ke (${formatPercent(fcfe.costOfEquity, 2)}).</p>
            </div>
          </div>
          <div class="table-wrap" style="margin-bottom:14px;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Linha FCFE</th>
                  ${fcfe.projections.slice(0, 6).map((p) => `<th>${escapeHtml(p.yearLabel)}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                <tr><td>EBIT</td>${fcfe.projections.slice(0, 6).map((p) => `<td>${formatNumber(p.ebit, 1)}</td>`).join('')}</tr>
                <tr><td>(−) Juros sobre Dívida</td>${fcfe.projections.slice(0, 6).map((p) => `<td>(${formatNumber(p.interestExpense, 1)})</td>`).join('')}</tr>
                <tr><td>Lucro Líquido</td>${fcfe.projections.slice(0, 6).map((p) => `<td>${formatNumber(p.netIncome, 1)}</td>`).join('')}</tr>
                <tr><td>(+) Emissão Líq. Dívida</td>${fcfe.projections.slice(0, 6).map((p) => `<td>${formatNumber(p.netDebtIssuance, 1)}</td>`).join('')}</tr>
                <tr class="row-total"><td>FCFE</td>${fcfe.projections.slice(0, 6).map((p) => `<td>${formatNumber(p.fcfe, 1)}</td>`).join('')}</tr>
                <tr class="row-highlight"><td>VP do FCFE</td>${fcfe.projections.slice(0, 6).map((p) => `<td>${formatNumber(p.pvFcfe, 1)}</td>`).join('')}</tr>
              </tbody>
            </table>
          </div>
          <div class="grid-2">
            <div class="kpi-tile">
              <span class="kpi-label">VP Explícito + VP Terminal</span>
              <span class="kpi-value" style="font-size:16px;">${formatScaledCurrency(fcfe.pvOfExplicitFcfe + fcfe.pvOfTerminalValue, company.currency, company.scale)}</span>
              <span class="kpi-sub">+ Caixa/Não-Op: ${formatScaledCurrency(fcfe.cashAndNonOperatingAdded, company.currency, company.scale)}</span>
            </div>
            <div class="kpi-tile primary">
              <span class="kpi-label">Valor Intrínseco (FCFE)</span>
              <span class="kpi-value brand" style="font-size:18px;">${fcfe.valid ? formatCurrency(fcfe.valuePerShare, company.currency) : '—'}</span>
              <span class="kpi-sub">${fcfe.valid ? renderUpsideBadge(fcfe.upsidePercent) : ''}</span>
            </div>
          </div>
        </section>
      </div>
    `;
  } else if (activeSubTab === 'sensitivity') {
    const mWaccG = computeWaccGrowthMatrix(company);
    const mWaccMargin = computeWaccMarginMatrix(company);
    const mWaccExit = computeWaccExitMultipleMatrix(company);
    const sc = company.valuationAssumptions.scenarios;

    bodyHTML = `
      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Análise de Cenários (Bear / Base / Bull)</h2>
            <p class="card-subtitle">Ajuste probabilidades e desvios (em p.p.) sobre o caso base para calcular o Valor Esperado Ponderado.</p>
          </div>
          <div style="text-align:right;">
            <div class="kpi-label">Valor Esperado Ponderado</div>
            <div class="kpi-value brand" style="font-size:20px;">${formatCurrency(scenarios.expectedValuePerShare, company.currency)} ${renderUpsideBadge(scenarios.expectedUpsidePercent)}</div>
          </div>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Cenário</th>
                <th>Prob. (%)</th>
                <th>Δ Cresc. Vendas (p.p.)</th>
                <th>Δ Margem EBIT (p.p.)</th>
                <th>Δ WACC (p.p.)</th>
                <th>Δ g Perpétuo (p.p.)</th>
                <th>Valor / Ação</th>
                <th>Upside</th>
              </tr>
            </thead>
            <tbody>
              ${(['bear', 'base', 'bull'] as const)
                .map((k) => {
                  const cfg = sc[k];
                  const out = scenarios.outcomes.find((o) => o.key === k)!;
                  return `
                  <tr class="${k === 'base' ? 'row-highlight' : ''}">
                    <td>${escapeHtml(cfg.label)}</td>
                    <td><input class="table-cell-input" type="number" step="5" data-scenario="${k}" data-sfield="probability" value="${cfg.probability}" /></td>
                    <td><input class="table-cell-input" type="number" step="0.5" data-scenario="${k}" data-sfield="salesGrowthDelta" value="${cfg.salesGrowthDelta}" /></td>
                    <td><input class="table-cell-input" type="number" step="0.5" data-scenario="${k}" data-sfield="ebitMarginDelta" value="${cfg.ebitMarginDelta}" /></td>
                    <td><input class="table-cell-input" type="number" step="0.25" data-scenario="${k}" data-sfield="waccDelta" value="${cfg.waccDelta}" /></td>
                    <td><input class="table-cell-input" type="number" step="0.25" data-scenario="${k}" data-sfield="terminalGrowthDelta" value="${cfg.terminalGrowthDelta}" /></td>
                    <td style="font-weight:700;">${formatCurrency(out.valuePerShare, company.currency)}</td>
                    <td>${renderUpsideBadge(out.upsidePercent)}</td>
                  </tr>
                `;
                })
                .join('')}
            </tbody>
          </table>
        </div>
      </section>

      ${renderSensitivityTable(mWaccG, company)}
      <div class="grid-2">
        ${renderSensitivityTable(mWaccMargin, company)}
        ${renderSensitivityTable(mWaccExit, company)}
      </div>
    `;
  } else if (activeSubTab === 'multiples') {
    const fund = rel.fundamentals;
    bodyHTML = `
      <!-- Justified Multiples -->
      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Múltiplos Atuais vs. Múltiplos Justificados por Fundamentos</h2>
            <p class="card-subtitle">Base teórica (CFA/Damodaran): P/L Justificado = Payout × (1+g) / (Ke − g) | P/VP Justificado = (ROE − g) / (Ke − g).</p>
          </div>
        </div>
        <div class="grid-4">
          <div class="kpi-tile">
            <span class="kpi-label">EV / EBITDA Atual</span>
            <span class="kpi-value">${formatMultiple(fund.companyCurrent.evToEbitda)}</span>
            <span class="kpi-sub">Justificado (DCF): ${formatMultiple(fund.justifiedEvEbitda)}</span>
          </div>
          <div class="kpi-tile">
            <span class="kpi-label">P / L Atual</span>
            <span class="kpi-value">${formatMultiple(fund.companyCurrent.pe)}</span>
            <span class="kpi-sub">Justificado: ${formatMultiple(fund.justifiedPE)} (${fund.impliedPriceJustifiedPE ? formatCurrency(fund.impliedPriceJustifiedPE, company.currency) : '—'})</span>
          </div>
          <div class="kpi-tile">
            <span class="kpi-label">P / VP Atual</span>
            <span class="kpi-value">${formatMultiple(fund.companyCurrent.pb)}</span>
            <span class="kpi-sub">Justificado: ${formatMultiple(fund.justifiedPB)} (${fund.impliedPriceJustifiedPB ? formatCurrency(fund.impliedPriceJustifiedPB, company.currency) : '—'})</span>
          </div>
          <div class="kpi-tile">
            <span class="kpi-label">EV / Receita & FCF Yield</span>
            <span class="kpi-value">${formatMultiple(fund.companyCurrent.evToSales)}</span>
            <span class="kpi-sub">FCF Yield: ${fund.companyCurrent.fcfYield !== null ? formatPercent(fund.companyCurrent.fcfYield, 2) : '—'}</span>
          </div>
        </div>
      </section>

      <!-- Peer Group Implied Valuation -->
      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Valuation Implícito por Comparáveis (Peer Group)</h2>
            <p class="card-subtitle">Aplica Mediana e Faixa Interquartil (Q1–Q3) dos pares com ponte completa EV → Equity para múltiplos de EV.</p>
          </div>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Múltiplo</th>
                <th>Empresa Atual</th>
                <th>Média Pares</th>
                <th>Mediana Pares</th>
                <th>Faixa Q1 – Q3</th>
                <th>Preço Implícito (Mediana)</th>
                <th>Faixa Preço (Q1–Q3)</th>
                <th>Upside</th>
              </tr>
            </thead>
            <tbody>
              ${rel.peerValuations
                .map((row) => {
                  const isPct = row.metric === 'fcfYield';
                  const fmt = (v: number | null) =>
                    v === null ? '—' : isPct ? formatPercent(v, 1) : formatMultiple(v, 2);
                  return `
                  <tr>
                    <td>${escapeHtml(row.label)}</td>
                    <td>${fmt(row.companyCurrentMultiple)}</td>
                    <td>${fmt(row.peerStats.mean)}</td>
                    <td style="font-weight:700;">${fmt(row.peerStats.median)}</td>
                    <td>${fmt(row.peerStats.q1)} – ${fmt(row.peerStats.q3)}</td>
                    <td style="font-weight:700; color:var(--brand-700);">${row.impliedPriceMedian !== null ? formatCurrency(row.impliedPriceMedian, company.currency) : '—'}</td>
                    <td>${row.impliedPriceLow !== null && row.impliedPriceHigh !== null ? `${formatCurrency(row.impliedPriceLow, company.currency)} – ${formatCurrency(row.impliedPriceHigh, company.currency)}` : '—'}</td>
                    <td>${renderUpsideBadge(row.upsideAtMedian)}</td>
                  </tr>
                `;
                })
                .join('')}
            </tbody>
          </table>
        </div>
      </section>

      <!-- Editable Peer Table -->
      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Tabela de Empresas Comparáveis (Trading Comps)</h2>
            <p class="card-subtitle">Cadastre pares do mesmo setor/porte para alimentar automaticamente a avaliação relativa e o Football Field.</p>
          </div>
          <button id="add-peer-btn" class="btn btn-primary btn-sm" type="button">
            <i data-lucide="plus"></i> Adicionar Par
          </button>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Empresa</th>
                <th>Ticker</th>
                <th>EV/EBITDA</th>
                <th>EV/EBIT</th>
                <th>EV/Sales</th>
                <th>P/L</th>
                <th>P/VP</th>
                <th>PEG</th>
                <th>FCF Yield %</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${
                company.peers.length === 0
                  ? `<tr><td colspan="10" style="text-align:center; color:var(--text-muted); padding:20px;">Nenhum par cadastrado. Clique em "Adicionar Par" para começar.</td></tr>`
                  : company.peers
                      .map(
                        (p) => `
                <tr>
                  <td><input class="table-cell-input" style="text-align:left; min-width:140px;" data-peer-id="${escapeHtml(p.id)}" data-pfield="name" value="${escapeHtml(p.name)}" /></td>
                  <td><input class="table-cell-input" style="text-align:left; min-width:70px;" data-peer-id="${escapeHtml(p.id)}" data-pfield="ticker" value="${escapeHtml(p.ticker)}" /></td>
                  <td><input class="table-cell-input" type="number" step="0.1" data-peer-id="${escapeHtml(p.id)}" data-pfield="evToEbitda" value="${p.evToEbitda ?? ''}" /></td>
                  <td><input class="table-cell-input" type="number" step="0.1" data-peer-id="${escapeHtml(p.id)}" data-pfield="evToEbit" value="${p.evToEbit ?? ''}" /></td>
                  <td><input class="table-cell-input" type="number" step="0.1" data-peer-id="${escapeHtml(p.id)}" data-pfield="evToSales" value="${p.evToSales ?? ''}" /></td>
                  <td><input class="table-cell-input" type="number" step="0.1" data-peer-id="${escapeHtml(p.id)}" data-pfield="pe" value="${p.pe ?? ''}" /></td>
                  <td><input class="table-cell-input" type="number" step="0.1" data-peer-id="${escapeHtml(p.id)}" data-pfield="pb" value="${p.pb ?? ''}" /></td>
                  <td><input class="table-cell-input" type="number" step="0.1" data-peer-id="${escapeHtml(p.id)}" data-pfield="peg" value="${p.peg ?? ''}" /></td>
                  <td><input class="table-cell-input" type="number" step="0.1" data-peer-id="${escapeHtml(p.id)}" data-pfield="fcfYield" value="${p.fcfYield ?? ''}" /></td>
                  <td><button class="btn btn-ghost btn-sm" type="button" data-remove-peer="${escapeHtml(p.id)}" style="color:var(--danger-text);">✕</button></td>
                </tr>
              `
                      )
                      .join('')
              }
            </tbody>
          </table>
        </div>
      </section>
    `;
  } else {
    // DDM Sub-Tab
    const a = company.valuationAssumptions;
    const sr = ddm.shareholderReturns;
    bodyHTML = `
      <div class="grid-4" style="margin-bottom: 18px;">
        <div class="kpi-tile primary">
          <span class="kpi-label">Valor Intrínseco (DDM)</span>
          <span class="kpi-value brand">${ddm.valid ? formatCurrency(ddm.valuePerShare, company.currency) : '—'}</span>
          <span class="kpi-sub">${ddm.valid ? renderUpsideBadge(ddm.upsidePercent) : escapeHtml(ddm.errorMessage ?? '')}</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-label">Dividendo D0 / D1</span>
          <span class="kpi-value">${formatCurrency(ddm.d0, company.currency)}</span>
          <span class="kpi-sub">D1 projetado: ${formatCurrency(ddm.d1, company.currency)} | Ke: ${formatPercent(ddm.costOfEquity, 2)}</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-label">Payout & g Sustentável</span>
          <span class="kpi-value">${formatPercent(sr.payoutRatio, 1)}</span>
          <span class="kpi-sub">g sust. ROE×(1−Payout): ${formatPercent(sr.sustainableGrowthRate, 1)}</span>
        </div>
        <div class="kpi-tile">
          <span class="kpi-label">${renderTooltip('Total Shareholder Yield', 'Total Shareholder Yield')}</span>
          <span class="kpi-value">${formatPercent(sr.totalShareholderYield, 2)}</span>
          <span class="kpi-sub">DY ${formatPercent(sr.dividendYield, 2)} + Buyback ${formatPercent(sr.buybackYield, 2)}</span>
        </div>
      </div>

      <div class="grid-2">
        <section class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">${renderTooltip('Premissas do Modelo de Dividendos (DDM)', 'Modelo H (DDM)')}</h2>
              <p class="card-subtitle">Suporta Gordon (1 Estágio), DDM em 2 Estágios e Modelo H (Fuller-Hsia).</p>
            </div>
          </div>
          <div class="field" style="margin-bottom: 12px;">
            <label>Variante do DDM</label>
            <select class="select" data-assump-str="ddmModel">
              <option value="gordon" ${a.ddmModel === 'gordon' ? 'selected' : ''}>Gordon Growth (1 Estágio)</option>
              <option value="two_stage" ${a.ddmModel === 'two_stage' ? 'selected' : ''}>2 Estágios (Alto Crescimento + Perpetuidade)</option>
              <option value="h_model" ${a.ddmModel === 'h_model' ? 'selected' : ''}>Modelo H — Fuller-Hsia (Fade Linear)</option>
            </select>
          </div>
          <div class="grid-2" style="gap:10px;">
            <div class="field">
              <label>Dividendo por Ação D0 (${company.currency})</label>
              <input class="input num-input" type="number" step="0.01" id="ddm-d0-input" value="${company.dividendPerShare}" />
            </div>
            <div class="field">
              <label>Crescimento Perpétuo g_L (%)</label>
              <input class="input num-input" type="number" step="0.1" data-assump="dividendGrowthRate" value="${a.dividendGrowthRate}" />
            </div>
            ${
              a.ddmModel !== 'gordon'
                ? `
              <div class="field">
                <label>Crescimento Inicial g_S (%)</label>
                <input class="input num-input" type="number" step="0.2" data-assump="ddmHighGrowthRate" value="${a.ddmHighGrowthRate}" />
              </div>
              <div class="field">
                <label>${a.ddmModel === 'h_model' ? 'Período de Fade 2H (anos)' : 'Duração Fase 1 (anos)'}</label>
                <input class="input num-input" type="number" step="1" min="1" max="15" data-assump="ddmHighGrowthYears" value="${a.ddmHighGrowthYears}" />
              </div>
            `
                : ''
            }
          </div>
        </section>

        <section class="card">
          <div class="card-header">
            <h2 class="card-title">Fluxo Projetado de Dividendos</h2>
          </div>
          ${
            ddm.valid
              ? `
            <div class="table-wrap">
              <table class="data-table">
                <thead>
                  <tr><th>Ano</th><th>Crescimento</th><th>Dividendo / Ação</th><th>Valor Presente</th></tr>
                </thead>
                <tbody>
                  ${ddm.projections
                    .map(
                      (row) => `
                    <tr>
                      <td>Ano ${row.year}</td>
                      <td>${formatPercent(row.growthRate, 2)}</td>
                      <td>${formatCurrency(row.dividend, company.currency)}</td>
                      <td>${formatCurrency(row.pvDividend, company.currency)}</td>
                    </tr>
                  `
                    )
                    .join('')}
                  <tr class="row-highlight">
                    <td colspan="3">Valor Intrínseco Total (incl. Perpetuidade)</td>
                    <td>${formatCurrency(ddm.valuePerShare, company.currency)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          `
              : `<p style="color:var(--text-muted);">${escapeHtml(ddm.errorMessage ?? 'Insira D0 > 0 para visualizar a projeção.')}</p>`
          }
        </section>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Motor de Valuation</h1>
        <p class="page-subtitle">Avaliação intrínseca (DCF FCFF/FCFE, Reverse DCF, DDM), análise de sensibilidade e avaliação relativa por pares.</p>
      </div>
    </div>

    ${renderAlertsBanner(alerts)}

    <div class="subtabs" role="tablist">
      ${subtabs
        .map(
          (t) =>
            `<button type="button" class="subtab-btn ${activeSubTab === t.id ? 'active' : ''}" data-subtab="${t.id}">${t.label}</button>`
        )
        .join('')}
    </div>

    <div id="valuation-subtab-body">${bodyHTML}</div>
  `;

  // Render Football Field chart if on synthesis tab
  if (activeSubTab === 'synthesis' && footballField.bars.length > 0) {
    renderChart(
      'football-field-chart',
      buildFootballFieldConfig(footballField, company.currency)
    );
  }

  // Bind Subtab switching
  container.querySelectorAll<HTMLButtonElement>('[data-subtab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeSubTab = btn.dataset.subtab as ValuationSubTab;
      renderValuationPage(container, store);
    });
  });

  // Bind Valuation Base Preset switch
  container.querySelector('#valuation-base-select')?.addEventListener('change', (e) => {
    const base = (e.target as HTMLSelectElement).value as ValuationBase;
    const preset = VALUATION_BASE_PRESETS[base];
    store.updateCurrentCompany((c) => {
      c.valuationAssumptions.valuationBase = base;
      c.currency = preset.currency;
      c.valuationAssumptions.riskFreeRate = preset.riskFreeRate;
      c.valuationAssumptions.equityRiskPremium = preset.equityRiskPremium;
      c.valuationAssumptions.countryRiskPremium = preset.countryRiskPremium;
      c.valuationAssumptions.costOfDebt = preset.costOfDebt;
      c.valuationAssumptions.effectiveTaxRate = preset.effectiveTaxRate;
      c.valuationAssumptions.marginalTaxRate = preset.marginalTaxRate;
      c.valuationAssumptions.terminalGrowthRate = preset.terminalGrowthRate;
      c.valuationAssumptions.dividendGrowthRate = preset.dividendGrowthRate;
    });
  });

  // Bind numeric assumption inputs
  container.querySelectorAll<HTMLInputElement>('[data-assump]').forEach((inp) => {
    inp.addEventListener('change', () => {
      const key = inp.dataset.assump!;
      const val = parseNumberInput(inp.value, 0);
      store.updateCurrentCompany((c) => {
        (c.valuationAssumptions as unknown as Record<string, unknown>)[key] = val;
      });
    });
  });

  container.querySelectorAll<HTMLSelectElement>('[data-assump-str]').forEach((sel) => {
    sel.addEventListener('change', () => {
      const key = sel.dataset.assumpStr!;
      store.updateCurrentCompany((c) => {
        (c.valuationAssumptions as unknown as Record<string, unknown>)[key] = sel.value as
          | TerminalMethod
          | DDMModelType
          | string;
      });
    });
  });

  container.querySelectorAll<HTMLSelectElement>('[data-assump-num-select]').forEach((sel) => {
    sel.addEventListener('change', () => {
      const key = sel.dataset.assumpNumSelect!;
      const val = Number(sel.value);
      store.updateCurrentCompany((c) => {
        (c.valuationAssumptions as unknown as Record<string, unknown>)[key] = val;
      });
    });
  });

  container.querySelectorAll<HTMLInputElement>('[data-assump-bool]').forEach((chk) => {
    chk.addEventListener('change', () => {
      const key = chk.dataset.assumpBool!;
      store.updateCurrentCompany((c) => {
        (c.valuationAssumptions as unknown as Record<string, unknown>)[key] = chk.checked;
      });
    });
  });

  container.querySelector('#sales-growth-input')?.addEventListener('change', (e) => {
    const raw = (e.target as HTMLInputElement).value;
    const parsed = raw
      .split(',')
      .map((s) => parseNumberInput(s, NaN))
      .filter((n) => Number.isFinite(n));
    if (parsed.length > 0) {
      store.updateCurrentCompany((c) => {
        c.valuationAssumptions.salesGrowth = parsed;
      });
    }
  });

  container.querySelector('#ddm-d0-input')?.addEventListener('change', (e) => {
    const val = parseNumberInput((e.target as HTMLInputElement).value, 0);
    store.updateCurrentCompany((c) => {
      c.dividendPerShare = val;
    });
  });

  // Bind Scenarios inputs
  container.querySelectorAll<HTMLInputElement>('[data-scenario]').forEach((inp) => {
    inp.addEventListener('change', () => {
      const key = inp.dataset.scenario as 'bear' | 'base' | 'bull';
      const field = inp.dataset.sfield!;
      const val = parseNumberInput(inp.value, 0);
      store.updateCurrentCompany((c) => {
        (c.valuationAssumptions.scenarios[key] as unknown as Record<string, number>)[field] = val;
      });
    });
  });

  // Bind Peer Group actions
  container.querySelector('#add-peer-btn')?.addEventListener('click', () => {
    store.updateCurrentCompany((c) => {
      c.peers.push({
        id: `peer_${Date.now()}`,
        name: `Par ${c.peers.length + 1}`,
        ticker: `PAR${c.peers.length + 1}`,
        evToEbitda: null,
        evToEbit: null,
        evToSales: null,
        pe: null,
        pb: null,
        peg: null,
        fcfYield: null,
      });
    });
  });

  container.querySelectorAll<HTMLButtonElement>('[data-remove-peer]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const peerId = btn.dataset.removePeer!;
      store.updateCurrentCompany((c) => {
        c.peers = c.peers.filter((p) => p.id !== peerId);
      });
    });
  });

  container.querySelectorAll<HTMLInputElement>('[data-peer-id]').forEach((inp) => {
    inp.addEventListener('change', () => {
      const peerId = inp.dataset.peerId!;
      const field = inp.dataset.pfield!;
      store.updateCurrentCompany((c) => {
        const peer = c.peers.find((p) => p.id === peerId);
        if (!peer) return;
        if (field === 'name' || field === 'ticker') {
          peer[field] = field === 'ticker' ? inp.value.toUpperCase() : inp.value;
        } else {
          const trimmed = inp.value.trim();
          (peer as unknown as Record<string, number | null>)[field] =
            trimmed === '' ? null : parseNumberInput(trimmed, 0);
        }
      });
    });
  });
}
