import type {
  CurrencyCode,
  DARecognition,
  FinancialMetricKey,
  ScaleUnit,
  SectorProfile,
} from '../../types/valuation';
import type { ValuationStore } from '../../state/store';
import {
  getBalanceSheetChecks,
  getHistoricalAverages,
} from '../../core/accounting';
import {
  CURRENCY_CONFIG,
  SCALE_CONFIG,
  escapeHtml,
  formatNumber,
  parseNumberInput,
} from '../../core/format';
import {
  ALL_FINANCIAL_KEYS,
  FINANCIAL_SECTIONS,
  SECTOR_LABELS,
} from '../../state/defaults';
import {
  exportCompanyFinancialsToCSV,
  importFinancialsFromCSVText,
} from '../../export/csv';
import { renderTooltip, showModal } from '../components';

export function renderDataInputPage(
  container: HTMLElement,
  store: ValuationStore
): void {
  const company = store.getCurrentCompany();
  if (!company) return;

  const f = company.financials;
  const bsChecks = getBalanceSheetChecks(f);
  const scaleShort = SCALE_CONFIG[company.scale].shortLabel || 'unid.';
  const currSym = CURRENCY_CONFIG[company.currency].symbol;

  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Dados Financeiros & Mercado</h1>
        <p class="page-subtitle">Configure moeda, escala (${escapeHtml(SCALE_CONFIG[company.scale].label)}) e demonstrativos históricos (3 a 6 períodos).</p>
      </div>
      <div class="btn-group">
        <button id="sync-dcf-btn" class="btn btn-primary" type="button" title="Preenche margem EBIT, alíquota efetiva, CAPEX %, D&A % e NWC % no DCF com as médias históricas desta empresa">
          <i data-lucide="refresh-cw"></i> Sincronizar Premissas DCF
        </button>
        <button id="import-csv-btn" class="btn btn-secondary" type="button">
          <i data-lucide="file-up"></i> Importar CSV
        </button>
        <button id="export-csv-inline-btn" class="btn btn-secondary" type="button">
          <i data-lucide="file-spreadsheet"></i> Exportar CSV
        </button>
        <input id="csv-file-input" type="file" accept=".csv,.txt,text/csv" style="display:none;" />
      </div>
    </div>

    <!-- General & Market Info -->
    <section class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Informações Gerais, Escala & Mercado</h2>
          <p class="card-subtitle">Ações e demonstrativos devem estar na mesma escala (${escapeHtml(SCALE_CONFIG[company.scale].label)}). Preço e Dividendo são por ação.</p>
        </div>
      </div>

      <div class="grid-4" style="margin-bottom: 14px;">
        <div class="field">
          <label>Nome da Empresa</label>
          <input class="input" type="text" data-general="companyName" value="${escapeHtml(company.companyName)}" />
        </div>
        <div class="field">
          <label>Ticker</label>
          <input class="input mono" type="text" data-general="companyTicker" value="${escapeHtml(company.companyTicker)}" placeholder="Ex: WEGE3, AAPL" />
        </div>
        <div class="field">
          <label>Perfil Setorial</label>
          <select class="select" data-general="sectorProfile">
            ${Object.entries(SECTOR_LABELS)
              .map(
                ([k, label]) =>
                  `<option value="${k}" ${company.sectorProfile === k ? 'selected' : ''}>${escapeHtml(label)}</option>`
              )
              .join('')}
          </select>
        </div>
        <div class="field">
          <label>Moeda & Escala</label>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
            <select class="select" data-general="currency">
              ${Object.entries(CURRENCY_CONFIG)
                .map(
                  ([k, cfg]) =>
                    `<option value="${k}" ${company.currency === k ? 'selected' : ''}>${k} (${cfg.symbol})</option>`
                )
                .join('')}
            </select>
            <select class="select" data-general="scale">
              ${Object.entries(SCALE_CONFIG)
                .map(
                  ([k, cfg]) =>
                    `<option value="${k}" ${company.scale === k ? 'selected' : ''}>${escapeHtml(cfg.label)}</option>`
                )
                .join('')}
            </select>
          </div>
        </div>
      </div>

      <div class="grid-4" style="margin-bottom: 14px;">
        <div class="field">
          <label>Preço Atual da Ação (${currSym})</label>
          <input class="input num-input" type="number" step="0.01" data-general="sharePrice" value="${company.sharePrice}" />
        </div>
        <div class="field">
          <label>Ações Básicas (${scaleShort})</label>
          <input class="input num-input" type="number" step="0.01" data-general="basicShares" value="${company.basicShares}" />
        </div>
        <div class="field">
          <label>Ações Diluídas (${scaleShort})</label>
          <input class="input num-input" type="number" step="0.01" data-general="dilutedShares" value="${company.dilutedShares}" />
          <span class="field-hint">Usado no preço justo (inclui opções/RSUs)</span>
        </div>
        <div class="field">
          <label>Valor de Mercado (${currSym} ${scaleShort})</label>
          <input class="input num-input" type="number" step="0.01" data-general="marketCap" value="${Number(company.marketCap.toFixed(2))}" />
          <span class="field-hint">Sincronizado com Preço × Ações Diluídas</span>
        </div>
      </div>

      <div class="grid-4" style="margin-bottom: 14px;">
        <div class="field">
          <label>Dividendo por Ação D0 (${currSym})</label>
          <input class="input num-input" type="number" step="0.01" data-general="dividendPerShare" value="${company.dividendPerShare}" />
        </div>
        <div class="field">
          <label>Mínima 52 Semanas (${currSym})</label>
          <input class="input num-input" type="number" step="0.01" data-general="week52Low" value="${company.week52Low}" />
        </div>
        <div class="field">
          <label>Máxima 52 Semanas (${currSym})</label>
          <input class="input num-input" type="number" step="0.01" data-general="week52High" value="${company.week52High}" />
        </div>
        <div class="field">
          <label>Tratamento de D&A na DRE</label>
          <select class="select" id="da-recognition-select">
            <option value="included_in_opex" ${f.daRecognition === 'included_in_opex' ? 'selected' : ''}>Embutida no CPV/SG&A (DRE por Função)</option>
            <option value="separate" ${f.daRecognition === 'separate' ? 'selected' : ''}>Lançada Separadamente (DRE por Natureza)</option>
          </select>
        </div>
      </div>

      <div class="field">
        <label>Tese de Investimento (Resumo Executivo)</label>
        <textarea class="textarea" data-general="investmentThesis" placeholder="Descreva os principais drivers de valor, vantagens competitivas e riscos-chave da empresa...">${escapeHtml(company.investmentThesis)}</textarea>
      </div>
    </section>

    <!-- Period Control + Balance Sheet Check -->
    <section class="card">
      <div class="card-header">
        <div>
          <h2 class="card-title">Períodos Históricos & Conferência Contábil</h2>
          <p class="card-subtitle">Verificação automática de fechamento: Ativo Total = Passivo + Patrimônio Líquido.</p>
        </div>
        <div class="btn-group">
          <button id="add-period-btn" class="btn btn-secondary btn-sm" type="button" ${f.years.length >= 6 ? 'disabled' : ''}>
            <i data-lucide="plus"></i> Adicionar Período
          </button>
          <button id="remove-period-btn" class="btn btn-secondary btn-sm" type="button" ${f.years.length <= 3 ? 'disabled' : ''}>
            <i data-lucide="minus"></i> Remover Primeiro
          </button>
        </div>
      </div>

      <div class="grid-auto" id="bs-check-strip">
        ${bsChecks
          .map(
            (chk) => `
          <div class="kpi-tile" style="padding:10px 12px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="kpi-label">${escapeHtml(chk.year)}</span>
              <span class="badge ${chk.isBalanced ? 'badge-positive' : 'badge-warning'}">${chk.isBalanced ? 'Fechado' : `Dif: ${formatNumber(chk.diff, 1)}`}</span>
            </div>
            <div style="font-size:11.5px; color:var(--text-secondary); margin-top:4px;" class="mono">
              Ativo: ${formatNumber(chk.totalAssets, 1)} | P+PL: ${formatNumber(chk.totalLiabilitiesAndEquity, 1)}
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </section>

    <!-- Financial Tables -->
    ${FINANCIAL_SECTIONS.map(
      (section) => `
      <section class="card">
        <div class="card-header">
          <h2 class="card-title">${escapeHtml(section.title)} <span style="font-size:12px; font-weight:500; color:var(--text-muted);">(${currSym} ${scaleShort})</span></h2>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th style="min-width: 260px;">Conta / Métrica</th>
                ${f.years
                  .map(
                    (yr, i) => `
                  <th>
                    <input class="table-cell-input" data-year-label="${i}" value="${escapeHtml(yr)}" style="font-weight:700; text-transform:uppercase; min-width:70px;" />
                  </th>
                `
                  )
                  .join('')}
              </tr>
            </thead>
            <tbody>
              ${section.items
                .map(
                  (item) => `
                <tr>
                  <td>
                    <div>${item.hint ? renderTooltip(item.label) : escapeHtml(item.label)}</div>
                    ${item.hint ? `<div style="font-size:11px; color:var(--text-muted); font-weight:400;">${escapeHtml(item.hint)}</div>` : ''}
                  </td>
                  ${f.years
                    .map(
                      (_, i) => `
                    <td>
                      <input
                        class="table-cell-input"
                        type="number"
                        step="0.01"
                        data-metric="${item.key}"
                        data-period="${i}"
                        value="${f[item.key]?.[i] ?? 0}"
                      />
                    </td>
                  `
                    )
                    .join('')}
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </section>
    `
    ).join('')}
  `;

  // Bind General Info Inputs
  container.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[data-general]').forEach((el) => {
    const field = el.dataset.general!;
    const eventName = el.tagName === 'SELECT' ? 'change' : 'input';
    el.addEventListener(eventName, () => {
      store.updateCurrentCompany((c) => {
        if (field === 'companyName') c.companyName = el.value;
        else if (field === 'companyTicker') c.companyTicker = el.value.toUpperCase();
        else if (field === 'sectorProfile') c.sectorProfile = el.value as SectorProfile;
        else if (field === 'currency') c.currency = el.value as CurrencyCode;
        else if (field === 'scale') c.scale = el.value as ScaleUnit;
        else if (field === 'investmentThesis') c.investmentThesis = el.value;
        else if (field === 'sharePrice') {
          c.sharePrice = parseNumberInput(el.value, 0);
          const shares = c.dilutedShares > 0 ? c.dilutedShares : c.basicShares;
          if (shares > 0) {
            c.marketCap = c.sharePrice * shares;
            const mcInput = container.querySelector<HTMLInputElement>('[data-general="marketCap"]');
            if (mcInput) mcInput.value = String(Number(c.marketCap.toFixed(2)));
          }
        } else if (field === 'basicShares') {
          c.basicShares = parseNumberInput(el.value, 0);
          if (c.dilutedShares === 0) {
            c.dilutedShares = c.basicShares;
            const dilInput = container.querySelector<HTMLInputElement>('[data-general="dilutedShares"]');
            if (dilInput) dilInput.value = String(c.dilutedShares);
          }
        } else if (field === 'dilutedShares') {
          c.dilutedShares = parseNumberInput(el.value, 0);
          if (c.sharePrice > 0 && c.dilutedShares > 0) {
            c.marketCap = c.sharePrice * c.dilutedShares;
            const mcInput = container.querySelector<HTMLInputElement>('[data-general="marketCap"]');
            if (mcInput) mcInput.value = String(Number(c.marketCap.toFixed(2)));
          }
        } else if (field === 'marketCap') {
          c.marketCap = parseNumberInput(el.value, 0);
          const shares = c.dilutedShares > 0 ? c.dilutedShares : c.basicShares;
          if (shares > 0) {
            c.sharePrice = c.marketCap / shares;
            const spInput = container.querySelector<HTMLInputElement>('[data-general="sharePrice"]');
            if (spInput) spInput.value = String(Number(c.sharePrice.toFixed(2)));
          }
        } else if (field === 'dividendPerShare') {
          c.dividendPerShare = parseNumberInput(el.value, 0);
        } else if (field === 'week52Low') {
          c.week52Low = parseNumberInput(el.value, 0);
        } else if (field === 'week52High') {
          c.week52High = parseNumberInput(el.value, 0);
        }
      }, el.tagName !== 'SELECT');
    });
  });

  // D&A Recognition
  container.querySelector('#da-recognition-select')?.addEventListener('change', (e) => {
    const val = (e.target as HTMLSelectElement).value as DARecognition;
    store.updateCurrentCompany((c) => {
      c.financials.daRecognition = val;
    });
  });

  // Year headers
  container.querySelectorAll<HTMLInputElement>('[data-year-label]').forEach((inp) => {
    inp.addEventListener('change', () => {
      const idx = Number(inp.dataset.yearLabel);
      store.updateCurrentCompany((c) => {
        c.financials.years[idx] = inp.value.trim() || `Ano ${idx + 1}`;
      });
    });
  });

  // Financial table inputs (silent update + refresh Balance Sheet check strip smoothly)
  const refreshBSStrip = () => {
    const c = store.getCurrentCompany();
    const strip = container.querySelector('#bs-check-strip');
    if (!c || !strip) return;
    const checks = getBalanceSheetChecks(c.financials);
    strip.innerHTML = checks
      .map(
        (chk) => `
      <div class="kpi-tile" style="padding:10px 12px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="kpi-label">${escapeHtml(chk.year)}</span>
          <span class="badge ${chk.isBalanced ? 'badge-positive' : 'badge-warning'}">${chk.isBalanced ? 'Fechado' : `Dif: ${formatNumber(chk.diff, 1)}`}</span>
        </div>
        <div style="font-size:11.5px; color:var(--text-secondary); margin-top:4px;" class="mono">
          Ativo: ${formatNumber(chk.totalAssets, 1)} | P+PL: ${formatNumber(chk.totalLiabilitiesAndEquity, 1)}
        </div>
      </div>
    `
      )
      .join('');
  };

  container.querySelectorAll<HTMLInputElement>('[data-metric]').forEach((inp) => {
    inp.addEventListener('input', () => {
      const key = inp.dataset.metric as FinancialMetricKey;
      const period = Number(inp.dataset.period);
      const val = parseNumberInput(inp.value, 0);
      store.updateCurrentCompany((c) => {
        c.financials[key][period] = val;
      }, true);
      refreshBSStrip();
    });
  });

  // Add / Remove historical period
  container.querySelector('#add-period-btn')?.addEventListener('click', () => {
    store.updateCurrentCompany((c) => {
      if (c.financials.years.length >= 6) return;
      const last = c.financials.years[c.financials.years.length - 1];
      const nextLabel = last === 'LTM' ? 'LTM+1' : String((Number.parseInt(last, 10) || 2024) + 1);
      c.financials.years.push(nextLabel);
      for (const key of ALL_FINANCIAL_KEYS) {
        const arr = c.financials[key];
        arr.push(arr[arr.length - 1] ?? 0);
      }
    });
  });

  container.querySelector('#remove-period-btn')?.addEventListener('click', () => {
    store.updateCurrentCompany((c) => {
      if (c.financials.years.length <= 3) return;
      c.financials.years.shift();
      for (const key of ALL_FINANCIAL_KEYS) {
        c.financials[key].shift();
      }
    });
  });

  // Sync DCF assumptions with historical averages (fixes Year-1 NWC jump!)
  container.querySelector('#sync-dcf-btn')?.addEventListener('click', () => {
    store.updateCurrentCompany((c) => {
      const avg = getHistoricalAverages(
        c.financials,
        c.valuationAssumptions.marginalTaxRate,
        c.valuationAssumptions.includeLeasesInDebt
      );
      c.valuationAssumptions.ebitMarginStart = avg.ebitMargin;
      c.valuationAssumptions.ebitMarginTarget = avg.ebitMargin;
      c.valuationAssumptions.effectiveTaxRate = avg.effectiveTaxRate;
      c.valuationAssumptions.capexAsPercentOfSales = avg.capexPercentSales;
      c.valuationAssumptions.depAsPercentOfSales = avg.depPercentSales;
      c.valuationAssumptions.nwcAsPercentOfSales = avg.nwcPercentSales;
      if (avg.roic > 5 && avg.roic < 35) {
        c.valuationAssumptions.terminalROIC = avg.roic;
      }
    });
    showModal({
      title: 'Premissas DCF sincronizadas',
      message:
        'Margem EBIT, alíquota efetiva, CAPEX (% vendas), D&A (% vendas), Capital de Giro (% vendas) e ROIC terminal foram atualizados com as médias históricas reais da empresa.',
    });
  });

  // CSV Export / Import
  container.querySelector('#export-csv-inline-btn')?.addEventListener('click', () => {
    const current = store.getCurrentCompany();
    if (current) exportCompanyFinancialsToCSV(current);
  });

  const csvInput = container.querySelector('#csv-file-input') as HTMLInputElement | null;
  container.querySelector('#import-csv-btn')?.addEventListener('click', () => csvInput?.click());
  csvInput?.addEventListener('change', async () => {
    const file = csvInput.files?.[0];
    if (!file) return;
    const text = await file.text();
    let result = { updatedFields: 0, yearsDetected: 0 };
    store.updateCurrentCompany((c) => {
      result = importFinancialsFromCSVText(c, text);
    });
    showModal({
      title: 'Importação CSV',
      message:
        result.updatedFields > 0
          ? `${result.updatedFields} linha(s) contábil(is) importada(s) ao longo de ${result.yearsDetected} período(s).`
          : 'Nenhuma conta reconhecida no CSV. Exporte um CSV modelo primeiro para ver o formato esperado.',
    });
  });
}
