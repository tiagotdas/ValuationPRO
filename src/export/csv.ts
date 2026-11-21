import type { CompanyAnalysis, FinancialMetricKey } from '../types/valuation';
import { FINANCIAL_SECTIONS } from '../state/defaults';
import { parseNumberInput } from '../core/format';

export function exportCompanyFinancialsToCSV(company: CompanyAnalysis): void {
  const years = company.financials.years;
  const rows: string[] = [];

  rows.push(['Chave', 'Metrica', ...years].map((c) => `"${c}"`).join(','));

  for (const section of FINANCIAL_SECTIONS) {
    rows.push(`"","--- ${section.title} ---",${years.map(() => '""').join(',')}`);
    for (const item of section.items) {
      const vals = company.financials[item.key] ?? [];
      rows.push(
        `"${item.key}","${item.label}",${years.map((_, i) => vals[i] ?? 0).join(',')}`
      );
    }
  }

  const blob = new Blob(['\uFEFF' + rows.join('\n')], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const safeName = (company.companyTicker || company.companyName || 'empresa')
    .replace(/[^a-zA-Z0-9_-]/g, '_');
  link.href = url;
  link.download = `${safeName}_financials.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Imports CSV exported by ValuationPRO (matching key or label column) or tab/semicolon-separated paste.
 */
export function importFinancialsFromCSVText(
  company: CompanyAnalysis,
  csvText: string
): { updatedFields: number; yearsDetected: number } {
  const lines = csvText
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return { updatedFields: 0, yearsDetected: 0 };
  }

  const detectDelimiter = (header: string): string => {
    if (header.includes('\t')) return '\t';
    if (header.includes(';')) return ';';
    return ',';
  };

  const delimiter = detectDelimiter(lines[0]);
  const splitRow = (line: string): string[] => {
    const out: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === delimiter && !inQuotes) {
        out.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
    out.push(current.trim());
    return out;
  };

  const headerCols = splitRow(lines[0]);
  // Expect either [Key, Label, Y1, Y2, ...] or [Label, Y1, Y2, ...]
  const hasKeyCol = headerCols[0].toLowerCase() === 'chave' || headerCols[0].toLowerCase() === 'key';
  const startValIdx = hasKeyCol ? 2 : 1;
  const importedYears = headerCols.slice(startValIdx).filter(Boolean);

  if (importedYears.length >= 2 && importedYears.length <= 6) {
    company.financials.years = importedYears;
    for (const section of FINANCIAL_SECTIONS) {
      for (const item of section.items) {
        company.financials[item.key] = importedYears.map(
          (_, i) => company.financials[item.key][i] ?? 0
        );
      }
    }
  }

  const labelToKey = new Map<string, FinancialMetricKey>();
  const keySet = new Set<FinancialMetricKey>();
  for (const section of FINANCIAL_SECTIONS) {
    for (const item of section.items) {
      keySet.add(item.key);
      labelToKey.set(item.label.toLowerCase(), item.key);
    }
  }

  let updatedFields = 0;
  for (let r = 1; r < lines.length; r++) {
    const cols = splitRow(lines[r]);
    let matchedKey: FinancialMetricKey | undefined;
    if (hasKeyCol && keySet.has(cols[0] as FinancialMetricKey)) {
      matchedKey = cols[0] as FinancialMetricKey;
    } else {
      const labelCandidate = (hasKeyCol ? cols[1] : cols[0] ?? '').toLowerCase();
      matchedKey = labelToKey.get(labelCandidate);
    }
    if (!matchedKey) continue;

    const vals = cols.slice(startValIdx);
    const targetLen = company.financials.years.length;
    company.financials[matchedKey] = Array.from({ length: targetLen }, (_, idx) =>
      idx < vals.length ? parseNumberInput(vals[idx], 0) : 0
    );
    updatedFields++;
  }

  return {
    updatedFields,
    yearsDetected: company.financials.years.length,
  };
}
