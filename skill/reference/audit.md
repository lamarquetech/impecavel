Execute verificações de qualidade **técnicas** sistemáticas e gere um relatório abrangente. Não corrija problemas; documente-os para que outros comandos os resolvam.

Esta é uma auditoria de nível de código, não uma crítica de design. Verifique o que é mensurável e verificável na implementação.

## Scan Diagnóstico

Execute verificações abrangentes em 5 dimensões. Pontue cada dimensão 0-4 usando os critérios abaixo.

### 1. Acessibilidade (A11y)

**Verifique**:
- **Problemas de contraste**: Taxas de contraste de texto < 4.5:1 (ou 7:1 para AAA)
- **ARIA ausente**: Elementos interativos sem roles, labels ou states adequados
- **Navegação por teclado**: Indicadores de foco ausentes, ordem de tab ilógica, armadilhas de teclado
- **HTML semântico**: Hierarquia de headings imprópria, landmarks ausentes, divs em vez de buttons
- **Alt text**: Descrições de imagem ausentes ou ruins
- **Problemas de formulário**: Inputs sem labels, mensagens de erro ruins, indicadores de obrigatório ausentes

**Pontuação 0-4**: 0=Inacessível (falha WCAG A), 1=Lacunas maiores (poucos labels ARIA, sem navegação por teclado), 2=Parcial (algum esforço a11y, lacunas significativas), 3=Bom (WCAG AA majoritariamente atendido, lacunas menores), 4=Excelente (WCAG AA totalmente atendido, aproxima-se de AAA)

### 2. Performance

**Verifique**:
- **Layout thrashing**: Leitura/escrita de propriedades de layout em loops
- **Animações custosas**: Animação casual de propriedades de layout, efeitos de blur/filter/shadow não limitados, ou efeitos que visivelmente perdem frames
- **Otimização ausente**: Imagens sem lazy loading, assets não otimizados, will-change ausente
- **Tamanho do bundle**: Imports desnecessários, dependências não utilizadas
- **Performance de renderização**: Re-renders desnecessários, memoização ausente

**Pontuação 0-4**: 0=Problemas severos (layout thrash, tudo não otimizado), 1=Problemas maiores (sem lazy loading, animações custosas), 2=Parcial (alguma otimização, lacunas permanecem), 3=Bom (majoritariamente otimizado, melhorias menores possíveis), 4=Excelente (rápido, enxuto, bem otimizado)

### 3. Theming

**Verifique**:
- **Cores hard-coded**: Cores não usando design tokens
- **Dark mode quebrado**: Variantes de dark mode ausentes, contraste ruim no tema escuro
- **Tokens inconsistentes**: Usando tokens errados, misturando tipos de tokens
- **Problemas de troca de tema**: Valores que não atualizam na mudança de tema

**Pontuação 0-4**: 0=Sem theming (tudo hard-coded), 1=Tokens mínimos (majoritariamente hard-coded), 2=Parcial (tokens existem mas usados inconsistentemente), 3=Bom (tokens usados, valores hard-coded menores), 4=Excelente (sistema completo de tokens, dark mode funciona perfeitamente)

### 4. Design Responsivo

**Verifique**:
- **Larguras fixas**: Larguras hard-coded que quebram no mobile
- **Touch targets**: Elementos interativos < 44x44px
- **Scroll horizontal**: Overflow de conteúdo em viewports estreitos
- **Escalonamento de texto**: Layouts que quebram quando o tamanho do texto aumenta
- **Breakpoints ausentes**: Sem variantes mobile/tablet

**Pontuação 0-4**: 0=Apenas desktop (quebra no mobile), 1=Problemas maiores (alguns breakpoints, muitas falhas), 2=Parcial (funciona no mobile, arestas grosseiras), 3=Bom (responsivo, problemas menores de touch target ou overflow), 4=Excelente (fluído, todos os viewports, touch targets adequados)

### 5. Anti-Padrões (CRÍTICO)

Verifique contra TODAS as diretrizes **DON'T** da skill pai impecable (já carregada neste contexto). Procure por sinais de AI slop (paleta de cores AI, texto com gradiente, glassmorphism, hero metrics, grids de cards, fontes genéricas) e anti-padrões gerais de design (cinza sobre cor, cards aninhados, easing bounce, copy redundante).

**Pontuação 0-4**: 0=Galeria de AI slop (5+ sinais), 1=Estética AI pesada (3-4 sinais), 2=Alguns sinais (1-2 perceptíveis), 3=Majoritariamente limpo (apenas problemas sutis), 4=Nenhum sinal de AI (design distintivo e intencional)

## Gerar Relatório

### Audit Health Score

| # | Dimensão | Pontuação | Achado-Chave |
|---|----------|-----------|-------------|
| 1 | Acessibilidade | ? | [problema a11y mais crítico ou "--"] |
| 2 | Performance | ? | |
| 3 | Design Responsivo | ? | |
| 4 | Theming | ? | |
| 5 | Anti-Padrões | ? | |
| **Total** | | **??/20** | **[Faixa de classificação]** |

**Faixas de classificação**: 18-20 Excelente (polimento menor), 14-17 Bom (abordar dimensões fracas), 10-13 Aceitável (trabalho significativo necessário), 6-9 Ruim (overhaul maior), 0-5 Crítico (problemas fundamentais)

### Veredito de Anti-Padrões
**Comece aqui.** Aprovação/reprovação: Isso parece gerado por IA? Liste sinais específicos. Seja brutalmente honesto.

### Resumo Executivo
- Audit Health Score: **??/20** ([faixa de classificação])
- Total de problemas encontrados (contagem por severidade: P0/P1/P2/P3)
- 3-5 problemas críticos principais
- Próximos passos recomendados

### Achados Detalhados por Severidade

Tagueie cada problema com **severidade P0-P3**:
- **P0 Bloqueante**: Impede conclusão da tarefa. Corrija imediatamente
- **P1 Maior**: Dificuldade significativa ou violação WCAG AA. Corrija antes do release
- **P2 Menor**: Incômodo, alternativa existe. Corrija na próxima passagem
- **P3 Polimento**: Bom de corrigir, sem impacto real no usuário. Corrija se houver tempo

Para cada problema, documente:
- **[P?] Nome do problema**
- **Localização**: Componente, arquivo, linha
- **Categoria**: Acessibilidade / Performance / Theming / Responsivo / Anti-Padrão
- **Impacto**: Como afeta os usuários
- **WCAG/Padrão**: Qual padrão viola (se aplicável)
- **Recomendação**: Como corrigir
- **Comando sugerido**: Qual comando usar (prefira: {{available_commands}})

### Padrões e Problemas Sistêmicos

Identifique problemas recorrentes que indicam lacunas sistêmicas em vez de erros pontuais:
- "Cores hard-coded aparecem em 15+ componentes, deveriam usar design tokens"
- "Touch targets consistentemente pequenos demais (<44px) por toda a experiência mobile"

### Achados Positivos

Anote o que está funcionando bem: boas práticas para manter e replicar.

## Ações Recomendadas

Liste comandos recomendados em ordem de prioridade (P0 primeiro, depois P1, depois P2):

1. **[P?] `{{command_prefix}}command-name`**: Breve descrição (contexto específico dos achados da auditoria)
2. **[P?] `{{command_prefix}}command-name`**: Breve descrição (contexto específico)

**Regras**: Apenas recomende comandos de: {{available_commands}}. Mapeie achados para o comando mais apropriado. Termine com `{{command_prefix}}impeccable polish` como passo final se alguma correção foi recomendada.

Após apresentar o resumo, diga ao usuário:

> Você pode me pedir para executar estes um de cada vez, todos de uma vez, ou em qualquer ordem que preferir.
>
> Re-execute `{{command_prefix}}impeccable audit` após as correções para ver sua pontuação melhorar.

**IMPORTANTE**: Seja minucioso mas acionável. Muitos problemas P3 criam ruído. Foque no que realmente importa.

**NUNCA**:
- Reporte problemas sem explicar o impacto (por que isso importa?)
- Forneça recomendações genéricas (seja específico e acionável)
- Pule achados positivos (celebre o que funciona)
- Esqueça de priorizar (tudo não pode ser P0)
- Reporte falsos positivos sem verificação
