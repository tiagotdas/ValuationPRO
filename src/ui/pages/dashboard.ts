import type { ValuationStore } from '../../state/store';
import { getLastIndex, getROE, getROIC } from '../../core/accounting';
import { computeDCF_FCFF } from '../../core/dcf';
import {
  escapeHtml,
  formatCurrency,
  formatPercent,
} from '../../core/format';
import { SECTOR_LABELS } from '../../state/defaults';
import { downloadJSONFile } from '../../export/pdf';
import { renderUpsideBadge, showModal } from '../components';

export function renderDashboardPage(
  container: HTMLElement,
  store: ValuationStore,
  onNavigate: (pageId: string) => void
): void {
  const companies = Object.values(store.getState().companies);

  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Painel de Análises</h1>
        <p class="page-subtitle">Gerencie seus modelos de valuation, carregue empresas de exemplo ou importe backups JSON.</p>
      </div>
      <div class="btn-group">
        <button id="dash-new-btn" class="btn btn-primary" type="button">
          <i data-lucide="plus-circle"></i> Nova Análise
        </button>
        <button id="dash-samples-btn" class="btn btn-secondary" type="button">
          <i data-lucide="sparkles"></i> Carregar Exemplos
        </button>
        <button id="dash-import-json-btn" class="btn btn-secondary" type="button">
          <i data-lucide="upload"></i> Importar JSON
        </button>
        ${
          companies.length > 0
            ? `<button id="dash-export-json-btn" class="btn btn-secondary" type="button">
                <i data-lucide="download"></i> Backup JSON
               </button>
               <button id="dash-delete-all-btn" class="btn btn-ghost" type="button" style="color: var(--danger-text);">
                <i data-lucide="trash-2"></i> Limpar Tudo
               </button>`
            : ''
        }
        <input id="dash-json-file-input" type="file" accept=".json,application/json" style="display:none;" />
      </div>
    </div>

    ${
      companies.length === 0
        ? `
      <div class="card" style="text-align: center; padding: 48px 24px;">
        <h2 style="margin: 0 0 8px; font-size: 18px;">Nenhuma análise cadastrada ainda</h2>
        <p style="color: var(--text-secondary); max-width: 540px; margin: 0 auto 22px;">
          Inicie uma nova análise do zero com premissas padrão do mercado brasileiro (BRL) ou carregue 3 empresas de exemplo (Indústria BR, Utilities BR e SaaS USD) para explorar todos os modelos imediatamente.
        </p>
        <div class="btn-group" style="justify-content: center;">
          <button id="dash-empty-samples-btn" class="btn btn-primary" type="button">
            <i data-lucide="sparkles"></i> Carregar 3 Empresas de Exemplo
          </button>
          <button id="dash-empty-new-btn" class="btn btn-secondary" type="button">
            <i data-lucide="plus"></i> Criar Empresa em Branco
          </button>
        </div>
      </div>
    `
        : `
      <div class="grid-3" id="company-cards-grid">
        ${companies
          .map((c) => {
            const idx = getLastIndex(c.financials);
            const roic = getROIC(
              c.financials,
              c.valuationAssumptions.marginalTaxRate,
              c.valuationAssumptions.includeLeasesInDebt
            )[idx] ?? 0;
            const roe = getROE(c.financials)[idx] ?? 0;
            const dcf = computeDCF_FCFF(c);
            const fairText = dcf.valid
              ? formatCurrency(dcf.valuePerShare, c.currency)
              : '—';
            const badge = dcf.valid ? renderUpsideBadge(dcf.upsidePercent) : '';

            return `
            <article class="company-card" data-company-id="${escapeHtml(c.id)}">
              <div class="company-card-top">
                <div>
                  <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                    <span class="ticker-badge">${escapeHtml(c.companyTicker || 'N/A')}</span>
                    <span style="font-size:11.5px; color:var(--text-muted);">${escapeHtml(c.currency)}</span>
                  </div>
                  <h3 style="margin:0; font-size:15.5px; font-weight:700;">${escapeHtml(c.companyName)}</h3>
                  <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">${escapeHtml(SECTOR_LABELS[c.sectorProfile])}</div>
                </div>
                <button class="btn btn-ghost btn-sm" data-action="delete" type="button" title="Excluir análise" style="color: var(--text-muted);">
                  <i data-lucide="trash-2"></i>
                </button>
              </div>
              <div>${badge}</div>
              <div class="company-card-metrics">
                <div>
                  <div class="mini-stat-label">DCF Justo</div>
                  <div class="mini-stat-val" style="color:var(--brand-700);">${fairText}</div>
                </div>
                <div>
                  <div class="mini-stat-label">ROIC</div>
                  <div class="mini-stat-val" style="color:${roic >= 15 ? 'var(--positive-text)' : 'var(--text-primary)'};">${formatPercent(roic, 1)}</div>
                </div>
                <div>
                  <div class="mini-stat-label">ROE</div>
                  <div class="mini-stat-val">${formatPercent(roe, 1)}</div>
                </div>
              </div>
            </article>
          `;
          })
          .join('')}
      </div>
    `
    }
  `;

  // Event bindings
  const createNew = () => {
    store.createCompany();
    onNavigate('data-input');
  };
  const loadSamples = () => {
    const count = store.loadSampleCompanies();
    showModal({
      title: 'Exemplos carregados',
      message: `${count} empresas de exemplo (ALFA3, THOR11 e CLPS) foram carregadas. Clique em qualquer card para explorar todos os modelos.`,
    });
  };

  container.querySelector('#dash-new-btn')?.addEventListener('click', createNew);
  container.querySelector('#dash-empty-new-btn')?.addEventListener('click', createNew);
  container.querySelector('#dash-samples-btn')?.addEventListener('click', loadSamples);
  container.querySelector('#dash-empty-samples-btn')?.addEventListener('click', loadSamples);

  const fileInput = container.querySelector('#dash-json-file-input') as HTMLInputElement | null;
  container.querySelector('#dash-import-json-btn')?.addEventListener('click', () => {
    fileInput?.click();
  });
  fileInput?.addEventListener('change', async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const count = store.importJSON(text);
      showModal({
        title: 'Importação concluída',
        message: `${count} análise(s) importada(s) com sucesso.`,
      });
    } catch {
      showModal({
        title: 'Erro na importação',
        message: 'O arquivo selecionado não é um backup JSON válido do ValuationPRO.',
      });
    }
  });

  container.querySelector('#dash-export-json-btn')?.addEventListener('click', () => {
    const json = store.exportJSON(false);
    downloadJSONFile(json, `ValuationPRO_backup_${new Date().toISOString().slice(0, 10)}.json`);
  });

  container.querySelector('#dash-delete-all-btn')?.addEventListener('click', () => {
    showModal({
      title: 'Excluir todas as análises',
      message: 'Tem certeza que deseja excluir todas as análises salvas localmente? Esta ação não pode ser desfeita.',
      confirmText: 'Excluir tudo',
      danger: true,
      onConfirm: () => store.deleteAllCompanies(),
    });
  });

  container.querySelector('#company-cards-grid')?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const card = target.closest<HTMLElement>('[data-company-id]');
    if (!card) return;
    const id = card.dataset.companyId!;
    if (target.closest('[data-action="delete"]')) {
      showModal({
        title: 'Excluir análise',
        message: 'Deseja remover permanentemente esta análise?',
        confirmText: 'Excluir',
        danger: true,
        onConfirm: () => store.deleteCompany(id),
      });
      return;
    }
    store.setCurrentCompany(id);
    onNavigate('valuation');
  });
}
