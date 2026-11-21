import type { ValuationStore } from '../../state/store';
import {
  getEBITDA,
  getEBITMargin,
  getHistoricalFCF,
  getNetIncome,
  getROE,
  getROIC,
} from '../../core/accounting';
import { computeDCF_FCFE, computeDCF_FCFF, computeReverseDCF } from '../../core/dcf';
import { computeDDM } from '../../core/ddm';
import { computeRelativeValuation } from '../../core/multiples';
import {
  computeFootballField,
  computeScenarios,
  computeWaccGrowthMatrix,
} from '../../core/sensitivity';
import {
  QUALITATIVE_PILLARS,
  computeQualitativeSummary,
  runValuationGuardrails,
} from '../../core/validators';
import {
  SCALE_CONFIG,
  escapeHtml,
  formatCurrency,
  formatMultiple,
  formatNumber,
  formatPercent,
  formatScaledCurrency,
} from '../../core/format';
import { SECTOR_LABELS } from '../../state/defaults';
import { exportCompanyFinancialsToCSV } from '../../export/csv';
import { downloadJSONFile, exportElementToPDF } from '../../export/pdf';
import {
  buildFootballFieldConfig,
  buildQualitativeRadarConfig,
  renderChartToDataURL,
} from '../charts';
import { renderAlertsBanner, renderUpsideBadge, showModal } from '../components';

export function renderReportPage(
  container: HTMLElement,
  store: ValuationStore
): void {
  const company = store.getCurrentCompany();
  if (!company) return;

  const f = company.financials;
  const a = company.valuationAssumptions;
  const fcff = computeDCF_FCFF(company);
  const fcfe = computeDCF_FCFE(company);
  const ddm = computeDDM(company);
  const rel = computeRelativeValuation(company);
  const revDcf = computeReverseDCF(company);
  const scenarios = computeScenarios(company);
  const ff = computeFootballField(company);
  const qual = computeQualitativeSummary(company);
  const alerts = runValuationGuardrails(company);
  const matrix = computeWaccGrowthMatrix(company);

  const roicSeries = getROIC(f, a.marginalTaxRate, a.includeLeasesInDebt);
  const roeSeries = getROE(f);
  const ebitdaSeries = getEBITDA(f);
  const niSeries = getNetIncome(f);
  const fcfSeries = getHistoricalFCF(f);

  // Render crisp static PNG snapshots of charts so PDF & Print NEVER have blank canvases!
  const ffImg =
    ff.bars.length > 0
      ? renderChartToDataURL(buildFootballFieldConfig(ff, company.currency), 840, 320)
      : '';

  const profImg = renderChartToDataURL(
    {
      type: 'line',
      data: {
        labels: f.years,
        datasets: [
          { label: 'ROIC (%)', data: roicSeries, borderColor: '#0284c7', borderWidth: 2.5, tension: 0.25 },
          { label: 'ROE (%)', data: roeSeries, borderColor: '#059669', borderWidth: 2, tension: 0.25 },
          { label: 'Margem EBIT (%)', data: getEBITMargin(f), borderColor: '#d97706', borderWidth: 2, tension: 0.25 },
          { label: 'WACC (%)', data: f.years.map(() => fcff.costOfCapital.wacc), borderColor: '#dc2626', borderDash: [5, 4], pointRadius: 0, borderWidth: 1.8 },
        ],
      },
      options: {
        plugins: { legend: { position: 'bottom' } },
        scales: { y: { ticks: { callback: (v) => `${v}%` } } },
      },
    },
    760,
    300
  );

  const pillarEntries = Object.entries(QUALITATIVE_PILLARS);
  const radarImg = renderChartToDataURL(
    buildQualitativeRadarConfig(
      pillarEntries.map(([, p]) => p.title),
      pillarEntries.map(([k]) => Number((qual.pillarScores[k] ?? 0).toFixed(2)))
    ),
    460,
    300
  );

  container.innerHTML = `
    <div class="page-header no-print">
      <div>
        <h1 class="page-title">Relatório Executivo & Exportação</h1>
        <p class="page-subtitle">Relatório institucional completo com gráficos renderizados em alta resolução para PDF e impressão.</p>
      </div>
      <div class="btn-group">
        <button id="rep-pdf-btn" class="btn btn-danger" type="button">
          <i data-lucide="file-text"></i> Baixar Relatório PDF
        </button>
        <button id="rep-print-btn" class="btn btn-primary" type="button">
          <i data-lucide="printer"></i> Imprimir / PDF Nativo
        </button>
        <button id="rep-csv-btn" class="btn btn-success" type="button">
          <i data-lucide="file-spreadsheet"></i> Exportar CSV
        </button>
        <button id="rep-json-btn" class="btn btn-secondary" type="button">
          <i data-lucide="download"></i> Exportar JSON
        </button>
      </div>
    </div>

    <div id="executive-report-sheet" class="report-sheet">
      <!-- Report Header -->
      <header class="report-header">
        <div>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
            <span class="ticker-badge">${escapeHtml(company.companyTicker || 'N/A')}</span>
            <span style="font-size:12px; color:var(--text-muted);">${escapeHtml(SECTOR_LABELS[company.sectorProfile])} • ${escapeHtml(company.currency)} (${escapeHtml(SCALE_CONFIG[company.scale].label)})</span>
          </div>
          <h2 style="margin:0; font-size:26px; font-weight:800;">${escapeHtml(company.companyName)}</h2>
        </div>
        <div style="text-align:right;">
          <div style="font-size:12px; color:var(--text-muted);">Relatório de Equity Valuation — ValuationPRO</div>
          <div style="font-size:12.5px; font-weight:600;">Gerado em ${new Date().toLocaleDateString('pt-BR')}</div>
        </div>
      </header>

      <!-- 1. Executive Summary -->
      <section class="report-section">
        <h3 class="report-section-title">1. Sumário Executivo & Veredito</h3>
        ${
          company.investmentThesis
            ? `<p style="margin:0 0 16px; color:var(--text-primary); font-size:13.5px; line-height:1.6;">${escapeHtml(company.investmentThesis)}</p>`
            : ''
        }
        <div class="grid-4" style="margin-bottom: 16px;">
          <div class="kpi-tile">
            <span class="kpi-label">Preço Atual</span>
            <span class="kpi-value">${ff.currentSharePrice > 0 ? formatCurrency(ff.currentSharePrice, company.currency) : '—'}</span>
          </div>
          <div class="kpi-tile primary">
            <span class="kpi-label">Valor Justo (DCF FCFF)</span>
            <span class="kpi-value brand">${fcff.valid ? formatCurrency(fcff.valuePerShare, company.currency) : '—'}</span>
            <span class="kpi-sub">${fcff.valid ? renderUpsideBadge(fcff.upsidePercent) : ''}</span>
          </div>
          <div class="kpi-tile">
            <span class="kpi-label">Esperado (Bear/Base/Bull)</span>
            <span class="kpi-value">${scenarios.expectedValuePerShare > 0 ? formatCurrency(scenarios.expectedValuePerShare, company.currency) : '—'}</span>
            <span class="kpi-sub">${renderUpsideBadge(scenarios.expectedUpsidePercent)}</span>
          </div>
          <div class="kpi-tile">
            <span class="kpi-label">Reverse DCF (CAGR Impl.)</span>
            <span class="kpi-value">${revDcf.impliedSalesCAGR !== null ? formatPercent(revDcf.impliedSalesCAGR, 1) : '—'}</span>
            <span class="kpi-sub">Score Qualitativo: ${formatNumber(qual.overallScore, 2)} / 5</span>
          </div>
        </div>
        ${ffImg ? `<img class="report-chart-img" src="${ffImg}" alt="Gráfico Football Field de Valuation" />` : ''}
      </section>

      ${alerts.length > 0 ? `<section class="report-section"><h3 class="report-section-title">Alertas & Guardrails do Modelo</h3>${renderAlertsBanner(alerts)}</section>` : ''}

      <!-- 2. Historical Financials & Ratios -->
      <section class="report-section">
        <h3 class="report-section-title">2. Desempenho Histórico & Criação de Valor</h3>
        <div class="table-wrap" style="margin-bottom:14px;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Métrica (${escapeHtml(company.currency)} ${escapeHtml(SCALE_CONFIG[company.scale].shortLabel)})</th>
                ${f.years.map((y) => `<th>${escapeHtml(y)}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr><td>Receita Líquida</td>${f.netSales.map((v) => `<td>${formatNumber(v, 1)}</td>`).join('')}</tr>
              <tr><td>EBITDA</td>${ebitdaSeries.map((v) => `<td>${formatNumber(v, 1)}</td>`).join('')}</tr>
              <tr><td>Lucro Líquido</td>${niSeries.map((v) => `<td>${formatNumber(v, 1)}</td>`).join('')}</tr>
              <tr><td>Fluxo de Caixa Livre (FCF)</td>${fcfSeries.map((v) => `<td>${formatNumber(v, 1)}</td>`).join('')}</tr>
              <tr class="row-total"><td>ROIC (%)</td>${roicSeries.map((v) => `<td>${formatPercent(v, 1)}</td>`).join('')}</tr>
              <tr><td>ROE (%)</td>${roeSeries.map((v) => `<td>${formatPercent(v, 1)}</td>`).join('')}</tr>
            </tbody>
          </table>
        </div>
        ${profImg ? `<img class="report-chart-img" src="${profImg}" alt="Evolução ROIC vs WACC e Margens" />` : ''}
      </section>

      <!-- 3. Qualitative Analysis -->
      <section class="report-section">
        <h3 class="report-section-title">3. Análise Qualitativa & Vantagens Competitivas</h3>
        <div class="grid-2" style="align-items:center;">
          <div>
            <div class="table-wrap">
              <table class="data-table">
                <thead><tr><th>Pilar Estratégico</th><th>Nota Média (1–5)</th></tr></thead>
                <tbody>
                  ${pillarEntries
                    .map(
                      ([k, p]) =>
                        `<tr><td>${escapeHtml(p.title)}</td><td style="font-weight:700;">${formatNumber(qual.pillarScores[k] ?? 0, 2)} / 5,00</td></tr>`
                    )
                    .join('')}
                  <tr class="row-highlight"><td>Score Consolidado</td><td>${formatNumber(qual.overallScore, 2)} / 5,00</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style="text-align:center;">
            ${radarImg ? `<img class="report-chart-img" style="max-height:260px;" src="${radarImg}" alt="Radar Qualitativo" />` : ''}
          </div>
        </div>
      </section>

      <!-- 4. DCF Projection & Bridge -->
      <section class="report-section">
        <h3 class="report-section-title">4. Modelo DCF (FCFF & FCFE) e Ponte EV → Equity</h3>
        <p style="font-size:12.5px; color:var(--text-secondary); margin:0 0 12px;">
          WACC: <strong>${formatPercent(fcff.costOfCapital.wacc, 2)}</strong> (Ke ${formatPercent(fcff.costOfCapital.costOfEquity, 2)} | βL ${formatNumber(fcff.costOfCapital.leveredBeta, 2)} | Kd pós-IR ${formatPercent(fcff.costOfCapital.afterTaxCostOfDebt, 2)}) •
          Valor Terminal: <strong>${escapeHtml(a.terminalMethod)}</strong> (g = ${formatPercent(a.terminalGrowthRate, 2)}, ROIC term. = ${formatPercent(a.terminalROIC, 1)}, ${formatPercent(fcff.terminalValueShareOfEV, 1)} do EV) •
          DCF FCFE: <strong>${fcfe.valid ? formatCurrency(fcfe.valuePerShare, company.currency) : '—'}</strong>.
        </p>
        <div class="table-wrap" style="margin-bottom:14px;">
          <table class="data-table">
            <thead>
              <tr>
                <th>Projeção FCFF</th>
                ${fcff.projections.map((p) => `<th>${escapeHtml(p.yearLabel)}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr><td>Receita Líquida</td>${fcff.projections.map((p) => `<td>${formatNumber(p.sales, 1)}</td>`).join('')}</tr>
              <tr><td>EBIT</td>${fcff.projections.map((p) => `<td>${formatNumber(p.ebit, 1)}</td>`).join('')}</tr>
              <tr><td>NOPAT</td>${fcff.projections.map((p) => `<td>${formatNumber(p.nopat, 1)}</td>`).join('')}</tr>
              <tr class="row-total"><td>FCFF</td>${fcff.projections.map((p) => `<td>${formatNumber(p.fcff, 1)}</td>`).join('')}</tr>
              <tr class="row-highlight"><td>VP do FCFF</td>${fcff.projections.map((p) => `<td>${formatNumber(p.pvFcff, 1)}</td>`).join('')}</tr>
            </tbody>
          </table>
        </div>
        <div class="grid-4">
          <div class="kpi-tile"><span class="kpi-label">Enterprise Value</span><span class="kpi-value" style="font-size:16px;">${formatScaledCurrency(fcff.enterpriseValue, company.currency, company.scale)}</span></div>
          <div class="kpi-tile"><span class="kpi-label">Ajuste Ponte EV→Eq</span><span class="kpi-value" style="font-size:16px;">${formatScaledCurrency(-fcff.bridge.netDeductionFromEV, company.currency, company.scale)}</span></div>
          <div class="kpi-tile"><span class="kpi-label">Equity Value</span><span class="kpi-value" style="font-size:16px;">${formatScaledCurrency(fcff.equityValue, company.currency, company.scale)}</span></div>
          <div class="kpi-tile primary"><span class="kpi-label">Valor / Ação (FCFF)</span><span class="kpi-value brand" style="font-size:18px;">${formatCurrency(fcff.valuePerShare, company.currency)}</span></div>
        </div>
      </section>

      <!-- 5. Sensitivity, Comps & DDM -->
      <section class="report-section">
        <h3 class="report-section-title">5. Sensibilidade (WACC × g), Comparáveis & DDM</h3>
        <div class="grid-2">
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>WACC \\ g</th>
                  ${matrix.colValues.map((c) => `<th style="text-align:center;">${formatPercent(c, 2)}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${matrix.rowValues
                  .map(
                    (r, rIdx) => `
                  <tr>
                    <td style="font-weight:700;">${formatPercent(r, 2)}</td>
                    ${matrix.cells[rIdx]
                      .map(
                        (cell, cIdx) =>
                          `<td style="text-align:center; ${rIdx === 2 && cIdx === 2 ? 'font-weight:800; background:var(--brand-50);' : ''}">${cell.valid ? formatCurrency(cell.valuePerShare, company.currency) : '—'}</td>`
                      )
                      .join('')}
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
          </div>
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr><th>Método Relativo / DDM</th><th>Múltiplo Mediana</th><th>Preço Implícito</th></tr>
              </thead>
              <tbody>
                ${rel.peerValuations
                  .filter((r) => ['evToEbitda', 'evToEbit', 'pe', 'pb'].includes(r.metric))
                  .map(
                    (r) => `
                  <tr>
                    <td>Comps ${escapeHtml(r.label)}</td>
                    <td>${formatMultiple(r.peerStats.median)}</td>
                    <td style="font-weight:700;">${r.impliedPriceMedian !== null ? formatCurrency(r.impliedPriceMedian, company.currency) : '—'}</td>
                  </tr>
                `
                  )
                  .join('')}
                <tr>
                  <td>DDM (${escapeHtml(ddm.model)})</td>
                  <td>g = ${formatPercent(ddm.longTermGrowth, 1)}</td>
                  <td style="font-weight:700;">${ddm.valid ? formatCurrency(ddm.valuePerShare, company.currency) : '—'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  `;

  // Actions
  container.querySelector('#rep-pdf-btn')?.addEventListener('click', async () => {
    const sheet = container.querySelector('#executive-report-sheet') as HTMLElement | null;
    if (!sheet) return;
    try {
      await exportElementToPDF(sheet, company.companyTicker || company.companyName);
    } catch {
      showModal({
        title: 'Erro ao gerar PDF',
        message: 'Não foi possível gerar o PDF via canvas. Utilize o botão "Imprimir / PDF Nativo" como alternativa.',
      });
    }
  });

  container.querySelector('#rep-print-btn')?.addEventListener('click', () => {
    window.print();
  });

  container.querySelector('#rep-csv-btn')?.addEventListener('click', () => {
    exportCompanyFinancialsToCSV(company);
  });

  container.querySelector('#rep-json-btn')?.addEventListener('click', () => {
    const json = store.exportJSON(true);
    const safe = (company.companyTicker || company.companyName || 'empresa').replace(/[^a-zA-Z0-9_-]/g, '_');
    downloadJSONFile(json, `${safe}_valuation.json`);
  });
}
