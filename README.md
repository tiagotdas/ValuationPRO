# ValuationPRO

Plataforma web de **Equity Valuation** construída em **Vite + TypeScript**, fundamentada nas melhores práticas internacionais de *Corporate Finance* e *Equity Research* (**Aswath Damodaran**, **McKinsey & Company — *Valuation***, **CFA Institute** e **Rosenbaum & Pearl — *Investment Banking***).

## Principais Recursos

### 1. Motor de Custo de Capital (CAPM, Hamada & WACC)
- **CAPM completo:** $K_e = R_f + \beta_L \cdot ERP + CRP + \text{Size Premium}$
- **Beta direto ou Equação de Hamada:** $\beta_L = \beta_U \cdot [1 + (1 - t_m)(D/E)]$
- **Rating Sintético de Crédito (Damodaran):** estimação automática do spread de crédito a partir do Índice de Cobertura de Juros ($EBIT / \text{Juros}$)
- **Alíquota Efetiva vs. Marginal:** benefício fiscal da dívida ($K_d(1 - t_m)$) e convergência na perpetuidade usando a alíquota estatutária marginal (padrão Brasil: 34%)
- **Multi-moeda com padrão brasileiro:** presets prontos para **Nominal BRL**, **Nominal USD** e **Base Real (IPCA+)**, com seletor de moeda (`BRL`, `USD`, `EUR`) e escala (`Unidades`, `Milhares`, `Milhões`, `Bilhões`).

### 2. DCF Transparente (FCFF, FCFE & Reverse DCF)
- **Separação rigorosa FCFF vs. FCFE:**
  - $FCFF_t = EBIT_t(1-t) + D\&A_t - CAPEX_t - \Delta NWC_t$ (descontado pelo WACC)
  - $FCFE_t = \text{Lucro Líquido}_t - (1 - \delta)(CAPEX_t - D\&A_t + \Delta NWC_t)$ com projeção explícita de juros e dívida (descontado pelo $K_e$)
- **Demonstrativo aberto ano a ano** (horizonte configurável de 5 a 10 anos, convergência linear de Margem EBIT e alíquota de imposto).
- **Valor Terminal com 3 métodos + Cross-Check automático:**
  - *Value Driver Formula* (McKinsey/Damodaran): $TV_N = \frac{NOPAT_{N+1}(1 - g / ROIC_{\text{term}})}{WACC - g}$
  - *Gordon Growth* tradicional
  - *Exit Multiple* (EV/EBITDA de saída), exibindo sempre múltiplo de saída implícito e $g$ implícito.
- **Mid-Year Convention** opcional (desconto em $t - 0{,}5$).
- **Ponte EV → Equity Value completa:** Dívida Bruta, Arrendamentos (IFRS 16), Caixa, Participação de Não Controladores, Ações Preferenciais, Provisões/Contingências e Ativos Não Operacionais, dividido por **Ações Diluídas**.
- **Reverse DCF:** solver numérico que encontra o CAGR de receita e a Margem EBIT implícitos no preço atual de mercado.

### 3. Sensibilidade, Cenários & Síntese Executiva
- **Gráfico *Football Field*** consolidando DCF FCFF, Exit Multiple, FCFE, DDM, Comparáveis (EV/EBITDA, P/L, EV/Receita) e faixa de 52 semanas frente ao Preço Atual.
- **3 Matrizes de Sensibilidade 2D (Heatmaps):** `WACC × g`, `WACC × Margem EBIT` e `WACC × EV/EBITDA de Saída`.
- **Cenários Bear / Base / Bull** com cálculo de **Valor Esperado Ponderado** e **Preço-Teto com Margem de Segurança**.

### 4. Múltiplos (*Trading Comps*), DDM Multi-Estágio & Análise Fundamentalista
- **Tabela de Empresas Comparáveis (Peer Group)** com Média, Mediana e Quartis (Q1–Q3) para `EV/EBITDA`, `EV/EBIT`, `EV/Receita`, `P/L`, `P/VP`, `PEG` e `FCF Yield`, além de **Múltiplos Justificados por Fundamentos**.
- **DDM em 3 variantes:** Gordon (1 Estágio), 2 Estágios e **Modelo H (Fuller-Hsia)**, integrados a Payout Ratio, Crescimento Sustentável ($ROE \times (1 - \text{Payout})$), Buyback Yield e **Total Shareholder Yield**.
- **Análise Fundamentalista (3–6 períodos + LTM):** ROIC vs. WACC (Spread de Valor), Decomposição **DuPont** em 3 etapas, ROA ajustado por imposto, FCF histórico, Conversão de Caixa, Ciclo de Conversão de Caixa (DSO/DIO/DPO) e conferência automática de fechamento do Balanço (`Ativo = Passivo + PL`).
- **Qualitativo *Narrative & Numbers*:** Scorecard 1–5 com evidências, Radar de Moat e guardrails automáticos que alertam incoerências entre tese qualitativa e premissas numéricas.
- **Relatório Executivo & Exportação:** geração de PDF e impressão limpa com gráficos renderizados em alta resolução, além de importação/exportação **CSV** e backup **JSON** (com migração automática de dados legados da v1).

---

## Como Executar

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev

# Executar suíte de testes unitários financeiros (Vitest)
npm test

# Gerar build de produção em docs/ (GitHub Pages)
npm run build
```

## Estrutura do Projeto

```text
├── index.html
├── src/
│   ├── core/              # Motor financeiro puro e testado (accounting, costOfCapital, dcf, ddm, multiples, sensitivity, validators)
│   ├── state/             # Defaults Brasil/Global, 3 empresas exemplo e store com auto-save + migração v1→v2
│   ├── export/            # Exportação/importação CSV, JSON e PDF paginado
│   ├── styles/            # Design system editorial em Vanilla CSS + regras @media print
│   └── ui/                # Páginas SPA, componentes seguros e gráficos Chart.js
└── tests/                 # Testes unitários Vitest cobrindo fórmulas e casos de borda
```
