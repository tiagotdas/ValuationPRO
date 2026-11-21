import {
  createIcons,
  BarChart2,
  LayoutDashboard,
  FileSpreadsheet,
  PieChart,
  ClipboardCheck,
  Calculator,
  FileText,
  PlusCircle,
  Plus,
  Minus,
  Sparkles,
  Upload,
  Download,
  Trash2,
  RefreshCw,
  FileUp,
  Printer,
  CheckCircle2,
  ArrowLeft,
} from 'lucide';
import { ValuationStore } from '../state/store';
import {
  SCALE_CONFIG,
  escapeHtml,
  formatCurrency,
  formatScaledCurrency,
} from '../core/format';
import { getEffectiveMarketCap, getEffectiveSharePrice } from '../core/accounting';
import { destroyAllCharts } from './charts';
import { showModal } from './components';
import { renderDashboardPage } from './pages/dashboard';
import { renderDataInputPage } from './pages/dataInput';
import { renderRatiosPage } from './pages/ratios';
import { renderQualitativePage } from './pages/qualitative';
import { renderValuationPage } from './pages/valuation';
import { renderReportPage } from './pages/report';

const ICON_SET = {
  BarChart2,
  LayoutDashboard,
  FileSpreadsheet,
  PieChart,
  ClipboardCheck,
  Calculator,
  FileText,
  PlusCircle,
  Plus,
  Minus,
  Sparkles,
  Upload,
  Download,
  Trash2,
  RefreshCw,
  FileUp,
  Printer,
  CheckCircle2,
  ArrowLeft,
};

type PageId =
  | 'dashboard'
  | 'data-input'
  | 'ratios'
  | 'qualitative'
  | 'valuation'
  | 'report';

export class ValuationApp {
  private store: ValuationStore;
  private currentPage: PageId = 'dashboard';

  constructor() {
    this.store = new ValuationStore();
  }

  init(): void {
    this.bindNavigation();
    this.store.subscribe(() => {
      this.renderCompanyBanner();
      this.renderCurrentPage();
    });
    this.renderCompanyBanner();
    this.navigateTo('dashboard');
  }

  private renderIcons(): void {
    createIcons({ icons: ICON_SET });
  }

  private bindNavigation(): void {
    document.querySelectorAll<HTMLAnchorElement>('.nav-link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.dataset.page as PageId;
        if (!pageId) return;
        if (pageId !== 'dashboard' && !this.store.getCurrentCompany()) {
          showModal({
            title: 'Nenhuma empresa selecionada',
            message: 'Inicie uma nova análise, carregue os exemplos ou selecione uma empresa no Painel primeiro.',
          });
          return;
        }
        this.navigateTo(pageId);
      });
    });

    document.getElementById('banner-switch-btn')?.addEventListener('click', () => {
      this.navigateTo('dashboard');
    });
  }

  navigateTo(pageId: PageId): void {
    if (pageId !== 'dashboard' && !this.store.getCurrentCompany()) {
      pageId = 'dashboard';
    }
    this.currentPage = pageId;

    document.querySelectorAll<HTMLElement>('.page').forEach((p) => {
      p.classList.toggle('active', p.id === pageId);
    });
    document.querySelectorAll<HTMLAnchorElement>('.nav-link').forEach((l) => {
      l.classList.toggle('active', l.dataset.page === pageId);
    });

    this.renderCompanyBanner();
    this.renderCurrentPage();
  }

  private renderCompanyBanner(): void {
    const banner = document.getElementById('company-banner');
    const company = this.store.getCurrentCompany();
    if (!banner) return;

    if (!company || this.currentPage === 'dashboard') {
      banner.classList.add('hidden');
      return;
    }

    banner.classList.remove('hidden');
    const tickerEl = document.getElementById('banner-ticker');
    const nameEl = document.getElementById('banner-name');
    const metaEl = document.getElementById('banner-meta');

    const price = getEffectiveSharePrice(company);
    const mcap = getEffectiveMarketCap(company);

    if (tickerEl) tickerEl.textContent = company.companyTicker || 'SEM TICKER';
    if (nameEl) nameEl.textContent = company.companyName || 'Nova Empresa';
    if (metaEl) {
      metaEl.innerHTML = `
        <span>Moeda: <strong>${escapeHtml(company.currency)}</strong> (${escapeHtml(SCALE_CONFIG[company.scale].label)})</span>
        <span>Preço: <strong class="mono">${price > 0 ? formatCurrency(price, company.currency) : '—'}</strong></span>
        <span>Market Cap: <strong class="mono">${mcap > 0 ? formatScaledCurrency(mcap, company.currency, company.scale) : '—'}</strong></span>
      `;
    }
  }

  private renderCurrentPage(): void {
    destroyAllCharts();
    const pageEl = document.getElementById(this.currentPage);
    if (!pageEl) return;

    const nav = (id: string) => this.navigateTo(id as PageId);

    switch (this.currentPage) {
      case 'dashboard':
        renderDashboardPage(pageEl, this.store, nav);
        break;
      case 'data-input':
        renderDataInputPage(pageEl, this.store);
        break;
      case 'ratios':
        renderRatiosPage(pageEl, this.store);
        break;
      case 'qualitative':
        renderQualitativePage(pageEl, this.store);
        break;
      case 'valuation':
        renderValuationPage(pageEl, this.store);
        break;
      case 'report':
        renderReportPage(pageEl, this.store);
        break;
    }

    this.renderIcons();
  }
}
