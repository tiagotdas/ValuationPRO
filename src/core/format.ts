import type { CurrencyCode, ScaleUnit } from '../types/valuation';

export const CURRENCY_CONFIG: Record<
  CurrencyCode,
  { symbol: string; locale: string; label: string }
> = {
  BRL: { symbol: 'R$', locale: 'pt-BR', label: 'Real Brasileiro (BRL)' },
  USD: { symbol: 'US$', locale: 'en-US', label: 'Dólar Americano (USD)' },
  EUR: { symbol: '€', locale: 'de-DE', label: 'Euro (EUR)' },
};

export const SCALE_CONFIG: Record<
  ScaleUnit,
  { factor: number; label: string; shortLabel: string }
> = {
  units: { factor: 1, label: 'Unidades (1x)', shortLabel: '' },
  thousands: { factor: 1e3, label: 'Milhares (mil)', shortLabel: 'mil' },
  millions: { factor: 1e6, label: 'Milhões (M)', shortLabel: 'M' },
  billions: { factor: 1e9, label: 'Bilhões (Bi)', shortLabel: 'Bi' },
};

export function safeDiv(num: number, den: number): number {
  if (!Number.isFinite(num) || !Number.isFinite(den) || Math.abs(den) < 1e-12) {
    return 0;
  }
  return num / den;
}

export function safeAvg(a: number, b: number): number {
  return (a + b) / 2;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function formatCurrency(
  value: number,
  currency: CurrencyCode = 'BRL',
  decimals = 2,
  suffix = ''
): string {
  if (!Number.isFinite(value)) return '—';
  const cfg = CURRENCY_CONFIG[currency];
  const sign = value < 0 ? '-' : '';
  const absFormatted = Math.abs(value).toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${sign}${cfg.symbol} ${absFormatted}${suffix ? ' ' + suffix : ''}`;
}

export function formatScaledCurrency(
  value: number,
  currency: CurrencyCode = 'BRL',
  scale: ScaleUnit = 'millions',
  decimals = 1
): string {
  return formatCurrency(value, currency, decimals, SCALE_CONFIG[scale].shortLabel);
}

export function formatNumber(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return '—';
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatPercent(value: number, decimals = 2, showSign = false): string {
  if (!Number.isFinite(value)) return '—';
  const prefix = showSign && value > 0 ? '+' : '';
  return `${prefix}${formatNumber(value, decimals)}%`;
}

export function formatMultiple(value: number | null | undefined, decimals = 2): string {
  if (value === null || value === undefined || !Number.isFinite(value) || value === 0) {
    return '—';
  }
  return `${formatNumber(value, decimals)}x`;
}

export function escapeHtml(raw: string): string {
  return String(raw ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function parseNumberInput(value: string | number, fallback = 0): number {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : fallback;
  }
  const normalized = value.trim().replace(/\s/g, '').replace(',', '.');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : fallback;
}
