import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  RadarController,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend,
  type ChartConfiguration,
} from 'chart.js';
import type { CurrencyCode } from '../types/valuation';
import type { FootballFieldSummary } from '../core/sensitivity';
import { formatCurrency } from '../core/format';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  RadarController,
  RadialLinearScale,
  Filler,
  Tooltip,
  Legend
);

const registry = new Map<string, Chart>();

export function destroyChart(canvasId: string): void {
  const existing = registry.get(canvasId);
  if (existing) {
    existing.destroy();
    registry.delete(canvasId);
  }
}

export function destroyAllCharts(): void {
  for (const chart of registry.values()) {
    chart.destroy();
  }
  registry.clear();
}

export function renderChart(
  canvasId: string,
  config: ChartConfiguration
): Chart | null {
  destroyChart(canvasId);
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const chart = new Chart(ctx, config);
  registry.set(canvasId, chart);
  return chart;
}

/**
 * Generates an offscreen Chart.js PNG data URL (used in Report / PDF so charts are never blank!).
 */
export function renderChartToDataURL(
  config: ChartConfiguration,
  width = 800,
  height = 360
): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const staticConfig: ChartConfiguration = {
    ...config,
    options: {
      ...(config.options ?? {}),
      responsive: false,
      animation: false,
    },
  };
  const chart = new Chart(ctx, staticConfig);
  const dataUrl = chart.toBase64Image('image/png', 1.0);
  chart.destroy();
  return dataUrl;
}

export function buildFootballFieldConfig(
  summary: FootballFieldSummary,
  currency: CurrencyCode
): ChartConfiguration {
  const labels = summary.bars.map((b) => b.label);
  const rangeData = summary.bars.map((b) => [
    Number(b.low.toFixed(2)),
    Number(b.high.toFixed(2)),
  ]);
  const bgColors = summary.bars.map((b) =>
    b.category === 'intrinsic'
      ? 'rgba(2, 132, 199, 0.78)'
      : b.category === 'relative'
        ? 'rgba(13, 148, 136, 0.75)'
        : 'rgba(100, 116, 139, 0.45)'
  );
  const borderColors = summary.bars.map((b) =>
    b.category === 'intrinsic'
      ? 'rgb(3, 105, 161)'
      : b.category === 'relative'
        ? 'rgb(15, 118, 110)'
        : 'rgb(71, 85, 105)'
  );

  const currentPricePlugin = {
    id: 'currentPriceLine',
    afterDatasetsDraw(chart: Chart) {
      if (summary.currentSharePrice <= 0) return;
      const { ctx, chartArea, scales } = chart;
      const xScale = scales.x;
      if (!xScale || !chartArea) return;
      const xPos = xScale.getPixelForValue(summary.currentSharePrice);
      if (xPos < chartArea.left || xPos > chartArea.right) return;

      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 2;
      ctx.moveTo(xPos, chartArea.top);
      ctx.lineTo(xPos, chartArea.bottom);
      ctx.stroke();

      ctx.setLineDash([]);
      ctx.fillStyle = '#dc2626';
      ctx.font = '600 11px Inter, sans-serif';
      const label = `Atual: ${formatCurrency(summary.currentSharePrice, currency)}`;
      const textWidth = ctx.measureText(label).width;
      const boxX = Math.min(
        Math.max(xPos - textWidth / 2 - 5, chartArea.left),
        chartArea.right - textWidth - 10
      );
      ctx.fillStyle = '#fef2f2';
      ctx.fillRect(boxX, chartArea.top - 20, textWidth + 10, 18);
      ctx.strokeStyle = '#fca5a5';
      ctx.lineWidth = 1;
      ctx.strokeRect(boxX, chartArea.top - 20, textWidth + 10, 18);
      ctx.fillStyle = '#b91c1c';
      ctx.fillText(label, boxX + 5, chartArea.top - 7);
      ctx.restore();
    },
  };

  return {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Faixa de Valuation (Mín – Máx)',
          data: rangeData as unknown as number[],
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: 1.5,
          borderRadius: 4,
          borderSkipped: false,
          barPercentage: 0.62,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 24, right: 16 } },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const bar = summary.bars[ctx.dataIndex];
              if (!bar) return '';
              return `${bar.subtitle}: ${formatCurrency(bar.low, currency)} – ${formatCurrency(bar.high, currency)} (Base: ${formatCurrency(bar.mid, currency)})`;
            },
          },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: '#e2e8f0' },
          ticks: {
            callback: (val) => formatCurrency(Number(val), currency, 0),
            font: { family: 'JetBrains Mono, monospace', size: 11 },
          },
        },
        y: {
          grid: { display: false },
          ticks: {
            font: { family: 'Inter, sans-serif', size: 12, weight: 500 },
            color: '#1e293b',
          },
        },
      },
    },
    plugins: [currentPricePlugin],
  };
}

export function buildQualitativeRadarConfig(
  labels: string[],
  scores: number[]
): ChartConfiguration {
  return {
    type: 'radar',
    data: {
      labels,
      datasets: [
        {
          label: 'Score Qualitativo (1–5)',
          data: scores,
          fill: true,
          backgroundColor: 'rgba(2, 132, 199, 0.18)',
          borderColor: 'rgb(2, 132, 199)',
          pointBackgroundColor: 'rgb(2, 132, 199)',
          pointBorderColor: '#ffffff',
          pointRadius: 4,
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0,
          max: 5,
          ticks: { stepSize: 1, backdropColor: 'transparent' },
          grid: { color: '#e2e8f0' },
          angleLines: { color: '#cbd5e1' },
          pointLabels: {
            font: { family: 'Inter, sans-serif', size: 12, weight: 600 },
            color: '#1e293b',
          },
        },
      },
      plugins: { legend: { display: false } },
    },
  };
}
