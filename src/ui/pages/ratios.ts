import type { ValuationStore } from '../../state/store';
import {
  getCAGR,
  getCapexToCFO,
  getCashConversionCycle,
  getCashConversionFCFToNI,
  getCFOToEBITDA,
  getCurrentRatio,
  getDIO,
  getDPO,
  getDSO,
  getDuPontDecomposition,
  getEBIT,
  getEBITDA,
  getEBITDAMargin,
  getEBITMargin,
  getEquityRatio,
  getFCFMargin,
  getGearingRatio,
  getGrossMargin,
  getHistoricalFCF,
  getInterestCoverage,
  getLastIndex,
  getNetDebtToEBITDA,
  getNetIncome,
  getNetProfitMargin,
  getOperatingCashFlowMargin,
  getQuickRatio,
  getROA,
  getROCE,
  getROE,
  getROIC,
  getShareholderReturns,
} from '../../core/accounting';
import { computeCostOfCapital } from '../../core/costOfCapital';
import { escapeHtml, formatNumber, formatPercent } from '../../core/format';
import { renderChart } from '../charts';
import { renderTooltip } from '../components';

interface RatioRow {
  label: string;
  tooltipKey?: string;
  values: number[];
  unit: string;
}

export function renderRatiosPage(
  container: HTMLElement,
  store: ValuationStore
): void {
  const company = store.getCurrentCompany();
  if (!company) return;

  const f = company.financials;
  const a = company.valuationAssumptions;
  const years = f.years;
  const lastIdx = getLastIndex(f);

  const coc = computeCostOfCapital(company);
  const roicSeries = getROIC(f, a.marginalTaxRate, a.includeLeasesInDebt);
  const roeSeries = getROE(f);
  const fcfMarginSeries = getFCFMargin(f);
  const cashConvSeries = getCashConversionFCFToNI(f);
  const dupont = getDuPontDecomposition(f);
  const shareholder = getShareholderReturns(company);

  const lastRoic = roicSeries[lastIdx] ?? 0;
  const valueSpread = lastRoic - coc.wacc;
  const salesCagr = getCAGR(f.netSales);
  const ebitdaCagr = getCAGR(getEBITDA(f));
  const niCagr = getCAGR(getNetIncome(f));
  const fcfCagr = getCAGR(getHistoricalFCF(f));

  const sections: Array<{ id: string; title: string; rows: RatioRow[] }> = [
    {
      id: 'profitability',
      title: 'Rentabilidade & Criação de Valor',
      rows: [
        { label: 'ROIC', tooltipKey: 'ROIC', values: roicSeries, unit: '%' },
        { label: 'ROE', tooltipKey: 'ROE', values: roeSeries, unit: '%' },
        { label: 'ROA (Ajustado por IR)', tooltipKey: 'ROA', values: getROA(f, a.marginalTaxRate), unit: '%' },
        { label: 'ROCE', tooltipKey: 'ROCE', values: getROCE(f), unit: '%' },
        { label: 'Margem Bruta', tooltipKey: 'Margem Bruta', values: getGrossMargin(f), unit: '%' },
        { label: 'Margem EBITDA', tooltipKey: 'Margem EBITDA', values: getEBITDAMargin(f), unit: '%' },
        { label: 'Margem EBIT', tooltipKey: 'Margem EBIT', values: getEBITMargin(f), unit: '%' },
        { label: 'Margem Líquida', tooltipKey: 'Margem Líquida', values: getNetProfitMargin(f), unit: '%' },
        { label: 'Margem FCO', values: getOperatingCashFlowMargin(f), unit: '%' },
        { label: 'Margem FCF', tooltipKey: 'Margem FCF', values: fcfMarginSeries, unit: '%' },
      ],
    },
    {
      id: 'stability',
      title: 'Estrutura de Capital, Crédito & Liquidez',
      rows: [
        { label: 'Índice de Capital Próprio', values: getEquityRatio(f), unit: '%' },
        { label: 'Alavancagem (Dív. Líq. / PL)', values: getGearingRatio(f, a.includeLeasesInDebt), unit: 'x' },
        { label: 'Dívida Líquida / EBITDA', tooltipKey: 'Dívida Líquida / EBITDA', values: getNetDebtToEBITDA(f, a.includeLeasesInDebt), unit: 'x' },
        { label: 'Cobertura de Juros (EBIT / Juros)', tooltipKey: 'Cobertura de Juros', values: getInterestCoverage(f), unit: 'x' },
        { label: 'Liquidez Corrente', values: getCurrentRatio(f), unit: 'x' },
        { label: 'Liquidez Seca', values: getQuickRatio(f), unit: 'x' },
        { label: 'CAPEX / FCO', values: getCapexToCFO(f), unit: '%' },
      ],
    },
    {
      id: 'working-capital',
      title: 'Capital de Giro & Qualidade dos Lucros',
      rows: [
        { label: 'Prazo Médio Recebimento (DSO)', values: getDSO(f), unit: ' d' },
        { label: 'Prazo Médio Estoque (DIO)', values: getDIO(f), unit: ' d' },
        { label: 'Prazo Médio Pagamento (DPO)', values: getDPO(f), unit: ' d' },
        { label: 'Ciclo de Conversão de Caixa (CCC)', tooltipKey: 'Ciclo de Conversão de Caixa', values: getCashConversionCycle(f), unit: ' d' },
        { label: 'FCO / EBITDA', values: getCFOToEBITDA(f), unit: '%' },
        { label: 'Conversão FCF / Lucro Líquido', tooltipKey: 'Conversão FCF / LL', values: cashConvSeries, unit: '%' },
      ],
    },
  ];

  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Análise Fundamentalista & Índices Chave</h1>
        <p class="page-subtitle">Criação de valor (ROIC vs. WACC), decomposição DuPont, qualidade dos lucros, ciclo de caixa e retorno ao acionista.</p>
      </div>
    </div>

    <!-- Executive KPI Strip -->
    <div class="grid-4" style="margin-bottom: 20px;">
      <div class="kpi-tile primary">
        <span class="kpi-label">${renderTooltip('ROIC vs. WACC (Spread)', 'ROIC')}</span>
        <span class="kpi-value ${valueSpread >= 0 ? 'positive' : 'negative'}">${formatPercent(valueSpread, 1, true)}</span>
        <span class="kpi-sub">ROIC ${formatPercent(lastRoic, 1)} | WACC ${formatPercent(coc.wacc, 1)}</span>
      </div>
      <div class="kpi-tile">
        <span class="kpi-label">CAGR Receita / EBITDA</span>
        <span class="kpi-value">${salesCagr !== null ? formatPercent(salesCagr, 1) : '—'}</span>
        <span class="kpi-sub">EBITDA: ${ebitdaCagr !== null ? formatPercent(ebitdaCagr, 1) : '—'} | LL: ${niCagr !== null ? formatPercent(niCagr, 1) : '—'}</span>
      </div>
      <div class="kpi-tile">
        <span class="kpi-label">${renderTooltip('Conversão FCF / LL', 'Conversão FCF / LL')}</span>
        <span class="kpi-value">${formatPercent(cashConvSeries[lastIdx] ?? 0, 1)}</span>
        <span class="kpi-sub">Margem FCF: ${formatPercent(fcfMarginSeries[lastIdx] ?? 0, 1)} | CAGR FCF: ${fcfCagr !== null ? formatPercent(fcfCagr, 1) : '—'}</span>
      </div>
      <div class="kpi-tile">
        <span class="kpi-label">${renderTooltip('Total Shareholder Yield', 'Total Shareholder Yield')}</span>
        <span class="kpi-value brand">${formatPercent(shareholder.totalShareholderYield, 2)}</span>
        <span class="kpi-sub">DY ${formatPercent(shareholder.dividendYield, 1)} + Buyback ${formatPercent(shareholder.buybackYield, 1)} | g sust. ${formatPercent(shareholder.sustainableGrowthRate, 1)}</span>
      </div>
    </div>

    <!-- Main Ratio Sections -->
    ${sections
      .map(
        (sec) => `
      <section class="card">
        <div class="card-header">
          <h2 class="card-title">${escapeHtml(sec.title)}</h2>
        </div>
        <div class="grid-2" style="align-items: start;">
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Indicador</th>
                  ${years.map((y) => `<th>${escapeHtml(y)}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${sec.rows
                  .map(
                    (row) => `
                  <tr>
                    <td>${row.tooltipKey ? renderTooltip(row.label, row.tooltipKey) : escapeHtml(row.label)}</td>
                    ${row.values
                      .map(
                        (v) =>
                          `<td>${Number.isFinite(v) ? `${formatNumber(v, 2)}${row.unit}` : '—'}</td>`
                      )
                      .join('')}
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
          </div>
          <div class="chart-box">
            <canvas id="ratios-chart-${sec.id}"></canvas>
          </div>
        </div>
      </section>
    `
      )
      .join('')}

    <!-- DuPont & Shareholder Returns -->
    <div class="grid-2">
      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Decomposição DuPont do ROE (3 Etapas)</h2>
            <p class="card-subtitle">ROE = Margem Líquida × Giro do Ativo × Alavancagem Financeira</p>
          </div>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Componente</th>
                ${years.map((y) => `<th>${escapeHtml(y)}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Margem Líquida (%)</td>
                ${dupont.map((d) => `<td>${formatPercent(d.netMargin, 2)}</td>`).join('')}
              </tr>
              <tr>
                <td>Giro do Ativo (x)</td>
                ${dupont.map((d) => `<td>${formatNumber(d.assetTurnover, 2)}x</td>`).join('')}
              </tr>
              <tr>
                <td>Multiplicador de Alavancagem (x)</td>
                ${dupont.map((d) => `<td>${formatNumber(d.equityMultiplier, 2)}x</td>`).join('')}
              </tr>
              <tr class="row-highlight">
                <td>ROE Resultante (%)</td>
                ${dupont.map((d) => `<td>${formatPercent(d.roe, 2)}</td>`).join('')}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="card">
        <div class="card-header">
          <div>
            <h2 class="card-title">Alocação de Capital & Retorno ao Acionista</h2>
            <p class="card-subtitle">Análise de Payout, Recompras e Crescimento Sustentável (último período)</p>
          </div>
        </div>
        <div class="grid-2">
          <div class="kpi-tile">
            <span class="kpi-label">Payout (% Lucro Líquido)</span>
            <span class="kpi-value">${formatPercent(shareholder.payoutRatio, 1)}</span>
            <span class="kpi-sub">Payout (% FCF): ${formatPercent(shareholder.fcfPayoutRatio, 1)}</span>
          </div>
          <div class="kpi-tile">
            <span class="kpi-label">Cresc. Sustentável (g)</span>
            <span class="kpi-value">${formatPercent(shareholder.sustainableGrowthRate, 1)}</span>
            <span class="kpi-sub">ROE × (1 − Payout)</span>
          </div>
          <div class="kpi-tile">
            <span class="kpi-label">Dividend Yield</span>
            <span class="kpi-value">${formatPercent(shareholder.dividendYield, 2)}</span>
          </div>
          <div class="kpi-tile">
            <span class="kpi-label">Buyback Yield</span>
            <span class="kpi-value">${formatPercent(shareholder.buybackYield, 2)}</span>
          </div>
        </div>
      </section>
    </div>
  `;

  // Render Charts
  renderChart('ratios-chart-profitability', {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: 'ROIC (%)',
          data: roicSeries,
          borderColor: '#0284c7',
          backgroundColor: 'rgba(2, 132, 199, 0.12)',
          tension: 0.25,
          borderWidth: 2.5,
        },
        {
          label: 'ROE (%)',
          data: roeSeries,
          borderColor: '#059669',
          tension: 0.25,
          borderWidth: 2,
        },
        {
          label: 'Margem EBIT (%)',
          data: getEBITMargin(f),
          borderColor: '#d97706',
          tension: 0.25,
          borderWidth: 2,
        },
        {
          label: 'WACC (%)',
          data: years.map(() => coc.wacc),
          borderColor: '#dc2626',
          borderDash: [5, 4],
          pointRadius: 0,
          borderWidth: 1.8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } },
      scales: { y: { ticks: { callback: (v) => `${v}%` } } },
    },
  });

  renderChart('ratios-chart-stability', {
    type: 'bar',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Dívida Líq. / EBITDA (x)',
          data: getNetDebtToEBITDA(f, a.includeLeasesInDebt),
          backgroundColor: 'rgba(2, 132, 199, 0.75)',
          borderRadius: 4,
        },
        {
          label: 'Liquidez Corrente (x)',
          data: getCurrentRatio(f),
          backgroundColor: 'rgba(13, 148, 136, 0.72)',
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } },
    },
  });

  const ebitSeries = getEBIT(f);
  const fcfSeries = getHistoricalFCF(f);
  renderChart('ratios-chart-working-capital', {
    type: 'bar',
    data: {
      labels: years,
      datasets: [
        {
          label: 'Receita Líquida',
          data: f.netSales,
          backgroundColor: 'rgba(148, 163, 184, 0.55)',
          borderRadius: 4,
        },
        {
          label: 'EBIT',
          data: ebitSeries,
          backgroundColor: 'rgba(2, 132, 199, 0.8)',
          borderRadius: 4,
        },
        {
          label: 'FCF (FCO − CAPEX)',
          data: fcfSeries,
          backgroundColor: 'rgba(5, 150, 105, 0.8)',
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } },
    },
  });
}
