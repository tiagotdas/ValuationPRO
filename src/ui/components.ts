import type { ValidationAlert } from '../types/valuation';
import { TOOLTIPS } from '../state/defaults';
import { escapeHtml, formatPercent } from '../core/format';

export function renderTooltip(label: string, tooltipKey?: string): string {
  const text = TOOLTIPS[tooltipKey ?? label];
  if (!text) return escapeHtml(label);
  return `<span class="tooltip">${escapeHtml(label)}<span class="tooltiptext">${escapeHtml(text)}</span></span>`;
}

export function renderUpsideBadge(upsidePercent: number | null): string {
  if (upsidePercent === null || !Number.isFinite(upsidePercent)) {
    return `<span class="badge badge-info">Sem preço atual</span>`;
  }
  if (upsidePercent >= 15) {
    return `<span class="badge badge-positive">Upside ${formatPercent(upsidePercent, 1, true)}</span>`;
  }
  if (upsidePercent >= -5) {
    return `<span class="badge badge-warning">Justo (${formatPercent(upsidePercent, 1, true)})</span>`;
  }
  return `<span class="badge badge-danger">Downside ${formatPercent(upsidePercent, 1, true)}</span>`;
}

export function renderAlertsBanner(alerts: ValidationAlert[]): string {
  if (alerts.length === 0) return '';
  return `
    <div class="alerts-stack">
      ${alerts
        .map(
          (a) => `
        <div class="alert-box ${a.severity}">
          <div>
            <div class="alert-title">${escapeHtml(a.title)}</div>
            <div>${escapeHtml(a.message)}</div>
          </div>
        </div>
      `
        )
        .join('')}
    </div>
  `;
}

export function showModal(options: {
  title?: string;
  message: string;
  confirmText?: string;
  danger?: boolean;
  onConfirm?: () => void;
}): void {
  const backdrop = document.getElementById('custom-modal');
  const titleEl = document.getElementById('modal-title');
  const msgEl = document.getElementById('modal-message');
  const actionsEl = document.getElementById('modal-actions');
  if (!backdrop || !titleEl || !msgEl || !actionsEl) return;

  titleEl.textContent = options.title ?? 'ValuationPRO';
  msgEl.textContent = options.message;
  actionsEl.innerHTML = '';

  const close = () => backdrop.classList.add('hidden');

  if (options.onConfirm) {
    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.textContent = 'Cancelar';
    cancelBtn.addEventListener('click', close);

    const confirmBtn = document.createElement('button');
    confirmBtn.type = 'button';
    confirmBtn.className = `btn ${options.danger ? 'btn-danger' : 'btn-primary'}`;
    confirmBtn.textContent = options.confirmText ?? 'Confirmar';
    confirmBtn.addEventListener('click', () => {
      close();
      options.onConfirm?.();
    });

    actionsEl.appendChild(cancelBtn);
    actionsEl.appendChild(confirmBtn);
  } else {
    const okBtn = document.createElement('button');
    okBtn.type = 'button';
    okBtn.className = 'btn btn-primary';
    okBtn.textContent = 'OK';
    okBtn.addEventListener('click', close);
    actionsEl.appendChild(okBtn);
  }

  backdrop.classList.remove('hidden');
}
