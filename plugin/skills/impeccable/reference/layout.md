Espaço é a ferramenta de design mais subutilizada. Encontre o problema real do layout (espaçamento monótono, hierarquia fraca, grids de cards idênticos, o padrão de pilha centralizada) e corrija a estrutura, não a superfície.

---

## Registro

Brand: composições assimétricas, espaçamento fluido com `clamp()`, quebra de grid intencional para ênfase. Ritmo através do contraste: agrupamentos compactos pareados com separações generosas.

Product: grids previsíveis, densidades consistentes, padrões de navegação familiares. Comportamento responsivo é estrutural (colapsar sidebar, tabela responsiva), não tipografia fluida. Consistência É uma affordance.

---

## Avaliar o Layout Atual

Analise o que está fraco no design espacial atual:

1. **Espaçamento**:
   - O espaçamento é consistente ou arbitrário? (Valores de padding/margin aleatórios)
   - Todo o espaçamento é igual? (Padding igual em todo lugar = sem ritmo)
   - Elementos relacionados estão agrupados de forma compacta, com espaço generoso entre grupos?

2. **Hierarquia visual**:
   - Aplique o teste do olho semicerrado: borre seus olhos (metaforicamente). Você ainda consegue identificar o elemento mais importante, o segundo mais importante, e os agrupamentos claros?
   - A hierarquia é alcançada de forma eficaz? (Espaço e peso sozinhos podem ser suficientes; a abordagem atual está funcionando?)
   - O whitespace guia o olhar para o que importa?

3. **Grid e estrutura**:
   - Existe uma estrutura subjacente clara, ou o layout parece aleatório?
   - Grids de cards idênticos são usados em todo lugar? (Ícone + título + texto, repetido infinitamente)
   - Está tudo centralizado? (Alinhado à esquerda com layouts assimétricos parece mais projetado, mas não é uma regra absoluta)

4. **Ritmo e variedade**:
   - O layout tem ritmo visual? (Alternância de espaçamento compacto/generoso)
   - Cada seção está estruturada da mesma forma? (Repetição monótona)
   - Existem momentos intencionais de surpresa ou ênfase?

5. **Densidade**:
   - O layout está demasiado comprimido? (Sem espaço para respirar)
   - O layout está demasiado esparso? (Whitespace excessivo sem propósito)
   - A densidade corresponde ao tipo de conteúdo? (UIs densas em dados precisam de espaçamento mais justo; páginas de marketing precisam de mais respiro)

**CRÍTICO**: Problemas de layout são frequentemente a causa raiz de interfaces parecerem "estranhas" mesmo quando cores e fontes estão boas. Espaço é um material de design; use-o com intenção.

## Planejar Melhorias de Layout

Consulte a [referência de design espacial](spatial-design.md) para orientação detalhada sobre grids, ritmo e container queries.

Crie um plano sistemático:

- **Sistema de espaçamento**: Use uma escala consistente (escala integrada do framework como a do Tailwind, tokens baseados em rem, ou um sistema personalizado). Os valores específicos importam menos que a consistência.
- **Estratégia de hierarquia**: Como o espaço vai comunicar importância?
- **Abordagem de layout**: Qual estrutura se adapta ao conteúdo? Flex para 1D, Grid para 2D, áreas nomeadas para layouts de página complexos.
- **Ritmo**: Onde o espaçamento deve ser compacto versus generoso?

## Melhorar o Layout Sistematicamente

### Estabeleça um Sistema de Espaçamento

- Use uma escala de espaçamento consistente (escalas de framework como Tailwind, tokens baseados em rem, ou uma escala personalizada todas funcionam). O que importa é que os valores venham de um conjunto definido, não números arbitrários.
- Nomeie tokens semanticamente se usar custom properties: `--space-xs` até `--space-xl`, não `--spacing-8`
- Use `gap` para espaçamento entre irmãos em vez de margins; elimina hacks de margin collapse
- Aplique `clamp()` para espaçamento fluido que respira em telas maiores

### Crie Ritmo Visual

- **Agrupamento compacto** para elementos relacionados (8-12px entre irmãos)
- **Separação generosa** entre seções distintas (48-96px)
- **Espaçamento variado** dentro das seções (nem toda linha precisa do mesmo gap)
- **Composições assimétricas**: quebre o padrão previsível de conteúdo centralizado quando fizer sentido

### Escolha a Ferramenta de Layout Certa

- **Use Flexbox para layouts 1D**: Fileiras de itens, barras de navegação, grupos de botões, conteúdos de cards, maioria dos interiores de componentes. Flex é mais simples e mais apropriado para a maioria das tarefas de layout.
- **Use Grid para layouts 2D**: Estrutura de nível de página, dashboards, interfaces densas em dados, qualquer situação onde linhas E colunas precisam de controle coordenado.
- **Não use Grid por padrão** quando Flexbox com `flex-wrap` seria mais simples e flexível.
- Use `repeat(auto-fit, minmax(280px, 1fr))` para grids responsivos sem breakpoints.
- Use áreas de grid nomeadas (`grid-template-areas`) para layouts de página complexos; redefina nos breakpoints.

### Quebre a Monotonia do Grid de Cards

- Não use grids de cards por padrão para tudo; espaçamento e alinhamento criam agrupamento visual naturalmente
- Use cards apenas quando o conteúdo é verdadeiramente distinto e acionável. Nunca aninhe cards dentro de cards
- Varie os tamanhos dos cards, faça span de colunas, ou misture cards com conteúdo não-card para quebrar a repetição

### Fortaleça a Hierarquia Visual

- Use as menores dimensões necessárias para uma hierarquia clara. Espaço sozinho pode ser suficiente; whitespace generoso ao redor de um elemento atrai o olhar. Alguns dos designs mais polidos alcançam ritmo apenas com espaço e peso. Adicione contraste de cor ou tamanho apenas quando meios mais simples não forem suficientes.
- Esteja ciente do fluxo de leitura: em idiomas LTR, o olhar escaneia naturalmente do canto superior esquerdo para o inferior direito, mas o posicionamento da ação primária depende do contexto (ex.: inferior direito em diálogos, topo na navegação).
- Crie agrupamentos claros de conteúdo através de proximidade e separação.

### Gerencie Profundidade e Elevação

- Crie uma escala semântica de z-index (dropdown → sticky → modal-backdrop → modal → toast → tooltip)
- Construa uma escala de sombras consistente (sm → md → lg → xl); sombras devem ser sutis
- Use elevação para reforçar hierarquia, não como decoração

### Ajustes Ópticos

- Se um ícone parece visualmente descentralizado apesar de estar geometricamente centralizado, ajuste-o. Mas apenas se você tiver confiança de que realmente parece errado. Não ajuste especulativamente.

**NUNCA**:
- Use valores de espaçamento arbitrários fora da sua escala
- Faça todo espaçamento igual (variedade cria hierarquia)
- Envolva tudo em cards (nem tudo precisa de um container)
- Aninhe cards dentro de cards (use espaçamento e divisores para hierarquia interna)
- Use grids de cards idênticos em todo lugar (ícone + título + texto, repetido)
- Centralize tudo (alinhado à esquerda com assimetria parece mais projetado)
- Use o layout de métrica hero por padrão (número grande, rótulo pequeno, stats, gradiente) como template. Se estiver mostrando dados reais do usuário, uma métrica proeminente pode funcionar, mas deve exibir dados reais, não números decorativos.
- Use CSS Grid por padrão quando Flexbox seria mais simples; use a ferramenta mais simples para o trabalho
- Use valores arbitrários de z-index (999, 9999); construa uma escala semântica

## Verificar Melhorias de Layout

- **Teste do olho semicerrado**: Você consegue identificar primário, secundário e agrupamentos com visão borrada?
- **Ritmo**: A página tem uma cadência satisfatória de espaçamento compacto e generoso?
- **Hierarquia**: O conteúdo mais importante é óbvio em 2 segundos?
- **Espaço para respirar**: O layout parece confortável, não comprimido ou desperdiçado?
- **Consistência**: O sistema de espaçamento é aplicado uniformemente?
- **Responsividade**: O layout se adapta graciosamente entre tamanhos de tela?

Quando o ritmo e a hierarquia estiverem corretos, passe para `{{command_prefix}}impeccable polish` para a passagem final.

## Parâmetros de assinatura do modo live

Cada variante DEVE declarar um parâmetro `density`. Direcione todos os tokens de espaçamento no CSS escopo da variante através de `calc(var(--p-density, 1) * <base>)`: paddings, gaps, larguras de coluna. Os usuários deslizam de arejado para compacto e veem o layout respirar novamente sem regeneração.

```json
{"id":"density","kind":"range","min":0.6,"max":1.4,"step":0.05,"default":1,"label":"Density"}
```

Para variantes cuja topologia muda genuinamente (empilhado vs. lado a lado, grid vs. bento), use um parâmetro `steps` cujo CSS escopo ramifica via `:scope[data-p-structure="X"]`. Um parâmetro de estrutura + um parâmetro de densidade é uma combinação poderosa; resista a adicionar um terceiro.

```json
{"id":"structure","kind":"steps","default":"grid","label":"Structure","options":[
  {"value":"stacked","label":"Stacked"},
  {"value":"grid","label":"Grid"},
  {"value":"bento","label":"Bento"}
]}
```

Consulte `reference/live.md` para o contrato completo de parâmetros.
