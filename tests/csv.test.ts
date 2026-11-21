import { describe, expect, it } from 'vitest';
import { importFinancialsFromCSVText } from '../src/export/csv';
import { createNewCompany } from '../src/state/defaults';

describe('CSV Financial Statements Import', () => {
  it('imports key-based CSV exported by ValuationPRO across multiple periods', () => {
    const company = createNewCompany('csv_test', 'nominal_brl');
    const csv = [
      '"Chave","Metrica","2022","2023","2024"',
      '"","--- Demonstração do Resultado (DRE) ---","","",""',
      '"netSales","Receita Líquida",1000,1250,1500',
      '"cogs","Custo dos Produtos/Serviços (CPV/CSP)",600,720,850',
      '"cashAndEquivalents","Caixa, Equivalentes e Aplicações",200,260,340',
    ].join('\n');

    const result = importFinancialsFromCSVText(company, csv);
    expect(result.updatedFields).toBe(3);
    expect(result.yearsDetected).toBe(3);
    expect(company.financials.years).toEqual(['2022', '2023', '2024']);
    expect(company.financials.netSales).toEqual([1000, 1250, 1500]);
    expect(company.financials.cogs).toEqual([600, 720, 850]);
    expect(company.financials.cashAndEquivalents).toEqual([200, 260, 340]);
  });

  it('supports semicolon-delimited PT-BR decimal commas', () => {
    const company = createNewCompany('csv_br', 'nominal_brl');
    const csv = [
      'Chave;Metrica;2023;2024',
      'netSales;Receita Líquida;1250,5;1400,25',
    ].join('\n');

    const result = importFinancialsFromCSVText(company, csv);
    expect(result.updatedFields).toBe(1);
    expect(company.financials.netSales).toEqual([1250.5, 1400.25]);
  });
});
