> **Contexto adicional necessário**: plataformas/dispositivos-alvo e contextos de uso.

Adapte um design existente para um contexto diferente: outro tamanho de tela, dispositivo, plataforma ou caso de uso. A armadilha é tratar a adaptação como simples escalamento. O trabalho é repensar a experiência para o novo contexto.


---

## Avalie o Desafio de Adaptação

Entenda o que precisa ser adaptado e por quê:

1. **Identifique o contexto de origem**:
   - Para que foi projetado originalmente? (Web desktop? App mobile?)
   - Quais premissas foram adotadas? (Tela grande? Entrada com mouse? Conexão rápida?)
   - O que funciona bem no contexto atual?

2. **Entenda o contexto-alvo**:
   - **Dispositivo**: Mobile, tablet, desktop, TV, relógio, impressão?
   - **Método de entrada**: Touch, mouse, teclado, voz, gamepad?
   - **Restrições de tela**: Tamanho, resolução, orientação?
   - **Conexão**: WiFi rápido, 3G lento, offline?
   - **Contexto de uso**: Em movimento vs no escritório, olhada rápida vs leitura focada?
   - **Expectativas dos usuários**: O que os usuários esperam nesta plataforma?

3. **Identifique os desafios de adaptação**:
   - O que não vai caber? (Conteúdo, navegação, funcionalidades)
   - O que não vai funcionar? (Estados de hover em touch, alvos de toque minúsculos)
   - O que é inapropriado? (Padrões de desktop no mobile, padrões de mobile no desktop)

**CRÍTICO**: Adaptação é repensar a experiência para o novo contexto, não escalar pixels.

## Planeje a Estratégia de Adaptação

Crie uma estratégia apropriada para o contexto:

### Adaptação Mobile (Desktop → Mobile)

**Estratégia de Layout**:
- Coluna única em vez de múltiplas colunas
- Empilhamento vertical em vez de lado a lado
- Components de largura total em vez de larguras fixas
- Navegação inferior em vez de navegação superior/lateral

**Estratégia de Interação**:
- Alvos de toque de 44x44px mínimo (não dependentes de hover)
- Gestos de swipe quando apropriado (listas, carrosséis)
- Bottom sheets em vez de dropdowns
- Design focado nos polegares (controles ao alcance do polegar)
- Áreas de toque maiores com mais espaçamento

**Estratégia de Conteúdo**:
- Revelação progressiva (não mostre tudo de uma vez)
- Priorize o conteúdo primário (conteúdo secundário em tabs/acordões)
- Textos mais curtos (mais concisos)
- Textos maiores (16px mínimo)

**Estratégia de Navegação**:
- Menu hamburger ou navegação inferior
- Reduza a complexidade da navegação
- Headers fixos para contexto
- Botão de voltar no fluxo de navegação

### Adaptação para Tablet (Abordagem Híbrida)

**Estratégia de Layout**:
- Layouts de duas colunas (não uma nem três colunas)
- Painéis laterais para conteúdo secundário
- Views master-detail (lista + detalhe)
- Adaptativo conforme a orientação (retrato vs paisagem)

**Estratégia de Interação**:
- Suporte tanto touch quanto ponteiro
- Alvos de toque de 44x44px, mas permita layouts mais densos que no celular
- Drawers de navegação lateral
- Formulários multi-coluna quando apropriado

### Adaptação para Desktop (Mobile → Desktop)

**Estratégia de Layout**:
- Layouts multi-coluna (use o espaço horizontal)
- Navegação lateral sempre visível
- Múltiplos painéis de informação simultaneamente
- Larguras fixas com restrições de max-width (não estique até 4K)

**Estratégia de Interação**:
- Estados de hover para informações adicionais
- Atalhos de teclado
- Menus de contexto com clique direito
- Drag and drop quando útil
- Multi-seleção com Shift/Cmd

**Estratégia de Conteúdo**:
- Mostre mais informações antecipadamente (menos revelação progressiva)
- Tabelas de dados com muitas colunas
- Visualizações mais ricas
- Descrições mais detalhadas

### Adaptação para Impressão (Tela → Impressão)

**Estratégia de Layout**:
- Quebras de página em pontos lógicos
- Remova navegação, footer, elementos interativos
- Preto e branco (ou cores limitadas)
- Margens adequadas para encadernação

**Estratégia de Conteúdo**:
- Expanda conteúdo encurtado (mostre URLs completas, seções ocultas)
- Adicione números de página, headers, footers
- Inclua metadados (data de impressão, título da página)
- Converta gráficos para versões amigáveis para impressão

### Adaptação para Email (Web → Email)

**Estratégia de Layout**:
- Largura estreita (600px máximo)
- Apenas coluna única
- CSS inline (sem folhas de estilo externas)
- Layouts baseados em tabelas (para compatibilidade com clientes de email)

**Estratégia de Interação**:
- CTAs grandes e óbvios (botões, não links de texto)
- Sem estados de hover (não confiáveis)
- Deep links para o web app para interações complexas

## Implemente as Adaptações

Aplique as mudanças sistematicamente:

### Breakpoints Responsivos

Escolha breakpoints apropriados:
- Mobile: 320px-767px
- Tablet: 768px-1023px
- Desktop: 1024px+
- Ou breakpoints baseados em conteúdo (onde o design quebra)

### Técnicas de Adaptação de Layout

- **CSS Grid/Flexbox**: Reflua layouts automaticamente
- **Container Queries**: Adapte com base no container, não no viewport
- **`clamp()`**: Dimensionamento fluido entre mínimo e máximo
- **Media queries**: Estilos diferentes para contextos diferentes
- **Propriedades de display**: Mostre/oculte elementos por contexto

### Adaptação para Touch

- Aumente o tamanho dos alvos de toque (44x44px mínimo)
- Adicione mais espaçamento entre elementos interativos
- Remova interações dependentes de hover
- Adicione feedback tátil (ripples, highlights)
- Considere as zonas do polegar (mais fácil alcançar a parte inferior que a superior)

### Adaptação de Conteúdo

- Use `display: none` com moderação (ainda faz download)
- Melhoria progressiva (conteúdo principal primeiro, melhorias em telas maiores)
- Lazy loading para conteúdo fora da tela
- Imagens responsivas (`srcset`, elemento `picture`)

### Adaptação de Navegação

- Transforme navegação complexa em hamburger/drawer no mobile
- Barra de navegação inferior para apps mobile
- Navegação lateral persistente no desktop
- Breadcrumbs em telas menores para contexto

**IMPORTANTE**: Teste em dispositivos reais. A emulação de dispositivos no DevTools é útil, mas não perfeita.

**NUNCA**:
- Oculte funcionalidades essenciais no mobile (se importa, faça funcionar)
- Presuma que desktop = dispositivo potente (considere acessibilidade, máquinas antigas)
- Use arquitetura de informação diferente entre contextos (confuso)
- Quebre as expectativas do usuário para a plataforma (usuários mobile esperam padrões mobile)
- Esqueça a orientação paisagem no mobile/tablet
- Use breakpoints genéricos às cegas (use breakpoints baseados em conteúdo)
- Ignore touch no desktop (muitos dispositivos desktop têm touch)

## Verifique as Adaptações

Teste minuciosamente entre contextos:

- **Dispositivos reais**: Teste em celulares, tablets e desktops reais
- **Diferentes orientações**: Retrato e paisagem
- **Diferentes navegadores**: Safari, Chrome, Firefox, Edge
- **Diferentes SOs**: iOS, Android, Windows, macOS
- **Diferentes métodos de entrada**: Touch, mouse, teclado
- **Casos extremos**: Telas muito pequenas (320px), telas muito grandes (4K)
- **Conexões lentas**: Teste em rede com throttle

Quando a adaptação parecer nativa em cada contexto, passe para `{{command_prefix}}impeccable polish` para a revisão final.
