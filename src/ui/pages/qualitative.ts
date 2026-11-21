import type { ValuationStore } from '../../state/store';
import {
  QUALITATIVE_PILLARS,
  computeQualitativeSummary,
  runValuationGuardrails,
} from '../../core/validators';
import { escapeHtml, formatNumber } from '../../core/format';
import { buildQualitativeRadarConfig, renderChart } from '../charts';
import { renderAlertsBanner } from '../components';

function getQualityVerdict(score: number): { label: string; badgeClass: string } {
  if (score >= 4.2) return { label: 'Qualidade Excepcional (Wide Moat)', badgeClass: 'badge-positive' };
  if (score >= 3.5) return { label: 'Boa Qualidade (Narrow Moat)', badgeClass: 'badge-info' };
  if (score >= 2.6) return { label: 'Qualidade Moderada / Neutra', badgeClass: 'badge-warning' };
  return { label: 'Frágil / Sem Moat Evidente', badgeClass: 'badge-danger' };
}

export function renderQualitativePage(
  container: HTMLElement,
  store: ValuationStore
): void {
  const company = store.getCurrentCompany();
  if (!company) return;

  const summary = computeQualitativeSummary(company);
  const verdict = getQualityVerdict(summary.overallScore);
  const narrativeAlerts = runValuationGuardrails(company).filter(
    (a) => a.category === 'qualitative' || a.category === 'sector'
  );

  const pillarEntries = Object.entries(QUALITATIVE_PILLARS);

  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Análise Qualitativa (Narrative & Numbers)</h1>
        <p class="page-subtitle">Avalie cada critério de 1 (muito fraco) a 5 (excelente) com evidências. O sistema verifica a coerência entre sua tese qualitativa e as premissas do DCF.</p>
      </div>
    </div>

    ${renderAlertsBanner(narrativeAlerts)}

    <div class="grid-2" style="margin-bottom: 18px;">
      <section class="card" style="margin-bottom: 0;">
        <div class="card-header">
          <div>
            <h2 class="card-title">Scorecard Consolidado</h2>
            <p class="card-subtitle">Média ponderada igualitária entre os 4 pilares estratégicos</p>
          </div>
          <span class="badge ${verdict.badgeClass}">${verdict.label}</span>
        </div>
        <div style="display:flex; align-items:baseline; gap:12px; margin-bottom:16px;">
          <span class="kpi-value brand" style="font-size:36px;">${formatNumber(summary.overallScore, 2)}</span>
          <span style="color:var(--text-muted); font-weight:600;">/ 5,00 (${summary.answeredCount}/${summary.totalCount} critérios)</span>
        </div>
        <div class="grid-2">
          ${pillarEntries
            .map(([key, pillar]) => {
              const s = summary.pillarScores[key] ?? 0;
              return `
              <div class="kpi-tile">
                <span class="kpi-label">${escapeHtml(pillar.title)}</span>
                <span class="kpi-value" style="font-size:18px;">${formatNumber(s, 2)} <span style="font-size:12px; color:var(--text-muted);">/ 5</span></span>
              </div>
            `;
            })
            .join('')}
        </div>
      </section>

      <section class="card" style="margin-bottom: 0;">
        <div class="card-header">
          <h2 class="card-title">Radar Estratégico & Moat</h2>
        </div>
        <div class="chart-box">
          <canvas id="qualitative-radar-chart"></canvas>
        </div>
      </section>
    </div>

    ${pillarEntries
      .map(
        ([, pillar]) => `
      <section class="card">
        <div class="card-header">
          <h2 class="card-title">${escapeHtml(pillar.title)}</h2>
        </div>
        <div style="display:flex; flex-direction:column; gap:14px;">
          ${pillar.questions
            .map((q) => {
              const entry = company.qualitative[q.key] ?? { score: 3, note: '' };
              return `
              <div style="padding-bottom:14px; border-bottom:1px solid var(--border-subtle); display:grid; grid-template-columns: minmax(260px, 1.4fr) auto minmax(220px, 1fr); gap:14px; align-items:center;">
                <div style="font-weight:500; font-size:13px;">${escapeHtml(q.text)}</div>
                <div class="score-group" data-score-group="${q.key}">
                  ${[1, 2, 3, 4, 5]
                    .map(
                      (n) => `
                    <button
                      type="button"
                      class="score-pill ${entry.score === n ? 'selected' : ''}"
                      data-qual-key="${q.key}"
                      data-score-val="${n}"
                    >${n}</button>
                  `
                    )
                    .join('')}
                </div>
                <input
                  class="input"
                  type="text"
                  data-qual-note="${q.key}"
                  value="${escapeHtml(entry.note)}"
                  placeholder="Evidência / justificativa..."
                />
              </div>
            `;
            })
            .join('')}
        </div>
      </section>
    `
      )
      .join('')}
  `;

  // Render Radar Chart
  renderChart(
    'qualitative-radar-chart',
    buildQualitativeRadarConfig(
      pillarEntries.map(([, p]) => p.title),
      pillarEntries.map(([k]) => Number((summary.pillarScores[k] ?? 0).toFixed(2)))
    )
  );

  // Bind score pill clicks
  container.querySelectorAll<HTMLButtonElement>('[data-qual-key]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.qualKey!;
      const score = Number(btn.dataset.scoreVal);
      store.updateCurrentCompany((c) => {
        const prev = c.qualitative[key] ?? { score: 3, note: '' };
        c.qualitative[key] = { ...prev, score };
      });
    });
  });

  // Bind note inputs
  container.querySelectorAll<HTMLInputElement>('[data-qual-note]').forEach((inp) => {
    inp.addEventListener('input', () => {
      const key = inp.dataset.qualNote!;
      store.updateCurrentCompany((c) => {
        const prev = c.qualitative[key] ?? { score: 3, note: '' };
        c.qualitative[key] = { ...prev, note: inp.value };
      }, true);
    });
  });
}
