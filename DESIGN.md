---
name: Impeccable
description: Santuário editorial em papel quente — serifa display comprometida, um magenta decisivo, superfícies planas em repouso.

# As cores usam OKLCH conforme `The OKLCH-Only Rule` na §2. O linter do Stitch valida
# apenas hex sRGB, então emitirá alertas nestas entradas — compensação deliberada por uma
# única fonte de verdade e fidelidade completa de gamut amplo. Nosso próprio parser aceita strings.
colors:
  editorial-magenta: "oklch(60% 0.25 350)"
  editorial-magenta-deep: "oklch(52% 0.25 350)"
  warm-ash-cream: "oklch(96% 0.005 350)"
  crisp-paper-white: "oklch(98% 0 0)"
  deep-graphite: "oklch(10% 0 0)"
  soft-charcoal: "oklch(25% 0 0)"
  mid-ash: "oklch(55% 0 0)"
  paper-mist: "oklch(92% 0 0)"
  magenta-whisper: "oklch(60% 0.25 350 / 0.15)"
  magenta-veil: "oklch(60% 0.25 350 / 0.25)"

typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.5rem, 7vw, 4.5rem)"
    fontWeight: 300
    lineHeight: 1
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1.2
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(1.125rem, 2.5vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.3
  body:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-lead:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  supporting:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 500
    letterSpacing: "0.05em"
  micro-label:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    letterSpacing: "0.1em"
  mono:
    fontFamily: "Space Grotesk, monospace"
    fontSize: "0.75rem"
    fontWeight: 400

rounded:
  none: "0"
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"

spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  "2xl": "80px"
  "3xl": "120px"

components:
  button-primary:
    backgroundColor: "{colors.deep-graphite}"
    textColor: "{colors.crisp-paper-white}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "16px 48px"
  button-primary-hover:
    backgroundColor: "{colors.editorial-magenta}"
    textColor: "{colors.crisp-paper-white}"
  input-text:
    backgroundColor: "transparent"
    textColor: "{colors.deep-graphite}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  card:
    backgroundColor: "{colors.warm-ash-cream}"
    textColor: "{colors.deep-graphite}"
    rounded: "{rounded.md}"
    padding: "24px"
  card-feature:
    backgroundColor: "{colors.crisp-paper-white}"
    textColor: "{colors.deep-graphite}"
    rounded: "{rounded.lg}"
    padding: "48px"
  nav-link:
    textColor: "{colors.deep-graphite}"
    typography: "{typography.body}"
  nav-link-hover:
    textColor: "{colors.editorial-magenta}"
---

# Design System: Impeccable

## 1. Visão Geral: O Santuário Editorial

**Estrela Guia Criativa: "O Santuário Editorial"**

O site do Impeccable lê-se mais como uma publicação de design impressa do que como uma landing page SaaS. Tipografia comprometida, espaço generoso para respirar, e um único acento decisivo que corta o papel quente. A interface parece **considerada, sem pressa e especializada** — o trabalho de alguém que já tomou essas decisões mil vezes e não tem o menor interesse em perseguir a estética atual de ferramentas de IA.

A filosofia estética é **contenção a serviço do ofício**. Cada elemento justifica seu lugar. Nada é decorativo sem função. A paleta é dominada por tons de papel quente com uma voz vibrante. A tipologia combina uma serifa itálica imponente com uma sans neutra e limpa. O movimento é reservado para momentos que realmente comunicam estado. O site é a demo — ele deve passar no mesmo audit de anti-pattern que pede para seus usuários executarem em seus próprios trabalhos.

Este sistema rejeita explicitamente o vocabulário visual de ferramentas de IA que cerca o produto: modo escuro com gradientes roxos, acentos neon, glassmorphism, ciano brilhante sobre preto, layouts hero-métricos de SaaS, e grids de features com cards idênticos. Em caso de dúvida, faça menos do que um site de marketing faria, mais do que um portfólio faria.

**Características Principais:**
- Tons de papel off-white quente com uma tintura magenta quase imperceptível para coesão subliminar da paleta.
- Um único acento magenta decisivo usado em não mais que 10% de qualquer tela. Sua raridade é o ponto.
- Serifa itálica para tipo display; sans neutra e limpa para corpo com line-height de 1.6+.
- CTAs primários afiados, uppercase, com letter-spacing — sem padrões de retângulo-arredondado-com-sombra-projetada.
- Superfícies planas em repouso. Sombras aparecem apenas como resposta a estado (hover, elevação, foco).
- Espaçamento assimétrico em escala de revista; intencionalmente omite o passo de 4px.

## 2. Cores: A Paleta de Papel Quente

Uma paleta de dois acordes: neutros de papel quente carregando uma tintura magenta quase invisível, mais um acento decisivo na mesma família de tonalidade. Nenhum acento secundário ou terciário no sistema principal — a contenção é doutrinária.

### Primária
- **Editorial Magenta** (oklch(60% 0.25 350)): A única voz vibrante. CTAs primários, estados ativos de navegação, indicadores de estado ativo, rara ênfase editorial. Nunca usada como gradiente, nunca como lavagem de fundo, nunca como preenchimento de texto. Raridade é a escolha de design.

### Neutros
- **Warm Ash Cream** (oklch(96% 0.005 350)): Fundo primário da página. Quase branco com uma tintura magenta quase imperceptível que cria coesão subconsciente com o Editorial Magenta. Usado em `body` e superfícies padrão.
- **Crisp Paper White** (oklch(98% 0 0)): Fundo puro. Usado para momentos de texto invertido (CTAs branco-no-escuro) e superfícies que precisam de contraste máximo. Quase nunca como fundo da página — frio demais sozinho.
- **Deep Graphite** (oklch(10% 0 0)): Texto primário para cópia de corpo e manchetes. Mais suave que preto puro, lê-se como confiante-mas-não-agressivo no papel quente. Fundo do CTA primário.
- **Soft Charcoal** (oklch(25% 0 0)): Texto secundário — taglines, parágrafos de gancho, cópia de apoio. Claramente subordinado ao Deep Graphite sem estar desbotado.
- **Mid Ash** (oklch(55% 0 0)): Texto terciário — micro-rótulos, legendas, linhas de metadados, rótulos "compatível com". Em tamanhos pequenos lê-se como metadado intencionalmente recuado.
- **Paper Mist** (oklch(92% 0 0)): Bordas finíssimas, divisores de seção, as costuras estruturais quase invisíveis.

### Variantes Alpha de Acento
- **Editorial Magenta Deep** (oklch(52% 0.25 350)): Estado hover/ativo para Editorial Magenta. Leve escurecimento, confirma interação sem gritar.
- **Magenta Whisper** (oklch(60% 0.25 350 / 0.15)): Brilho de fundo sob elementos de acento no hover (apenas sombras difusas), destaques de seleção sutis.
- **Magenta Veil** (oklch(60% 0.25 350 / 0.25)): Tintura translúcida ligeiramente mais forte para anéis de foco e molduras de ênfase.

### Tinturas de Categoria de Comando (isoladas — não estender)
Um vocabulário separado de seis tinturas usado exclusivamente para codificar por cores a visualização de tabela periódica dos 23 comandos do impeccable. Essas tinturas são anteriores ao sistema OKLCH e existem em um único componente. **Não estenda este vocabulário para outros locais.**

- **Create** (bg `#fdf2f8` / borda `#ec4899` / texto `#be185d`)
- **Evaluate** (bg `#fdf4ff` / borda `#d946ef` / texto `#a21caf`)
- **Refine** (bg `#eff6ff` / borda `#3b82f6` / texto `#1d4ed8`)
- **Simplify** (bg `#fffbeb` / borda `#f59e0b` / texto `#b45309`)
- **Harden** (bg `#f0fdf4` / borda `#22c55e` / texto `#15803d`)
- **System** (bg `#f5f5f4` / borda `#78716c` / texto `#44403c`)

### Regras Nomeadas

**A Regra da Única Voz.** Editorial Magenta é a única cor vibrante no sistema. Nenhum acento de apoio é adicionado, jamais, não importa o quanto um layout "queira" uma segunda cor. Se um segundo ponto de ênfase for necessário, use escala ou peso, nunca uma segunda tonalidade.

**A Regra do Papel-Não-Branco.** O fundo da página é Warm Ash Cream, nunca Crisp Paper White. O branco puro é reservado para superfícies invertidas específicas. O calor é estrutural — sem ele, o site lê-se como genérico e o magenta decisivo lê-se como abrasivo em vez de decisivo.

**A Regra Apenas-OKLCH.** Todas as novas cores devem ser declaradas em OKLCH. Valores hex legados existem apenas nas Tinturas de Categoria de Comando isoladas. Não introduza novas cores declaradas em hex no sistema.

## 3. Tipografia: A Voz Itálica-e-Tinta

**Fonte de Display:** Cormorant Garamond (com fallback Georgia)
**Fonte de Corpo:** Instrument Sans (com fallback system-ui)
**Fonte de Rótulo/Mono:** Space Grotesk (usada como mono geométrica, não para blocos de código)

**Caráter:** A fonte de display é uma serifa transicional refinada usada em seu corte **itálico** — imponente sem ser afetada, inspirando-se nas tradições de manchetes editoriais de formato longo. A fonte de corpo é uma sans neutra e limpa com leve calor geométrico, escolhida para compor parágrafos longos sem sobrecarga visual. A "mono" é uma grotesca contemporânea reservada para rótulos pequenos e metadados onde uma sensação adjacente à máquina reforça a narrativa do produto de linha de comando.

### Hierarquia

- **Display** (família display, peso 300, itálico, clamp(2.5rem, 7vw, 4.5rem), line-height 1): Apenas título hero. O peso leve + itálico cursivo lê-se como assinatura de autor em vez de manchete de marketing.
- **Headline** (família display, peso 400, clamp(1.75rem, 4vw, 2.5rem), line-height 1.2): Títulos de seção. Momentos editoriais maiores.
- **Title** (família display, peso 400, itálico, clamp(1.125rem, 2.5vw, 1.75rem), line-height 1.3): Tagline hero / aberturas de seção. Uma segunda voz de display mais discreta.
- **Body** (família de corpo, peso 400, 1rem, line-height 1.6): Cópia de parágrafo. Limitado a 65–75ch para legibilidade.
- **Body Lead** (família de corpo, peso 400, 1rem–1.0625rem, line-height 1.6–1.65): Os um ou dois parágrafos de "abertura" em cada página. Leading ligeiramente mais relaxado.
- **Supporting** (família de corpo, peso 400, 0.875rem, line-height 1.6): Legendas, notas de rodapé, contexto de apoio.
- **Label** (família de corpo, peso 500, 0.9rem, `text-transform: uppercase`, `letter-spacing: 0.05em`): Rótulos de CTA. Curtos, declarativos.
- **Micro-Label** (família de corpo, peso 500, 0.625–0.6875rem, `text-transform: uppercase`, `letter-spacing: 0.1em`): "Compatível com", "O que está incluído", "v3.0 Changelog".
- **Monospace Meta** (família mono, peso 400–500, 0.6875–0.8125rem): Nomes de comandos em prosa inline, rótulos de tiles da tabela periódica.

### Regras Nomeadas

**A Regra do Itálico-como-Voz.** O itálico é usado como escolha de voz para tipo display, não como ênfase dentro da cópia de corpo. A ênfase no corpo é dada pelo peso ou pela troca para a família mono (veja `<em>` em menus de comandos). Tratar o itálico como ênfase dentro de parágrafos dilui a voz de display.

**A Regra do Leading 1.6.** O line-height do corpo é 1.6 em todo lugar. Não 1.5, não 1.7, não "relaxed". Esta é a decisão estrutural de legibilidade — quando o site parece calmo e editorial, é 1.6 fazendo o trabalho.

**A Regra Apenas-Manchetes-Fluidas.** Títulos usam dimensionamento fluido com `clamp()`. Cópia de corpo usa valores `rem` fixos. Tamanhos de corpo fluidos parecem espertos e sentem-se errados — fazem os comprimentos de linha desviarem das especificações.

## 4. Elevação

Plano por padrão. A profundidade é transmitida através de **resposta a estado**, não sombra estrutural. As superfícies repousam em uma única camada tonal (Warm Ash Cream); sombras aparecem apenas quando um elemento sofre hover, é deliberadamente elevado, ou requer separação ambiente de uma área ocupada.

### Vocabulário de Sombras

- **Soft Hover Lift** (`0 4px 24px -4px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.06)`): A resposta de hover padrão em cards e superfícies interativas. Difusa, deslocada para baixo.
- **Lifted Card** (`0 20px 40px rgba(0,0,0,0.08)`): Conteúdo deliberadamente elevado (cards em destaque, blocos de instalação). Alpha baixo — nunca lê-se como escuro.
- **Accent Glow** (`0 20px 60px var(--color-accent-dim)`): Sombra ambiente com tintura magenta sob os um ou dois momentos que devem parecer magnéticos. Usada com parcimônia — este é o "ingrediente raro" do vocabulário de sombras.
- **Tooltip / Popover** (`0 0 20px rgba(0,0,0,0.15)` ou `0 2px 8px rgba(0,0,0,0.1)`): Sombra compacta para pequenos UIs flutuantes.

### Regras Nomeadas

**A Regra do Plano-por-Padrão.** Superfícies são planas em repouso. Se você se pegar adicionando uma sombra a um elemento não interativo, não elevado, pare — você está recorrendo à memória muscular do Material Design. Use uma borda finíssima em Paper Mist, ou nenhuma articulação.

**A Regra do Alpha-Baixo.** Cada sombra no sistema usa ≤0.15 de alpha em seu blur mais forte. Alphas mais altos lembram drop shadows do Material Design de 2014 — um sinal imediato de que o design não foi considerado.

**A Regra da Sombra-Tintida-Apenas-Para-Acento.** Sombras neutras (alpha preto) para estrutura. Sombras coloridas (magenta-dim) apenas para os momentos deliberados de accent-glow. Nunca tinza sombras para efeito decorativo.

## 5. Componentes

### Botões

- **Forma:** Planos e quadrados por padrão (`border-radius: 0`). Cantos afiados são uma escolha editorial explícita — o site rejeita o padrão retângulo-arredondado-com-sombra-projetada que marca a maioria das páginas de marketing adjacentes à IA.
- **Primário (hero-cta-combined):** Fundo Deep Graphite, texto Crisp Paper White. Padding 16px / 48px (`--spacing-sm` / `--spacing-xl`). Uppercase, `letter-spacing: 0.05em`, peso 500. Sem borda, sem sombra em repouso.
- **Hover:** `transform: translateY(-2px)` e fundo muda para Editorial Magenta. Transição 200ms linear ease. Um pequeno passo confiante para cima, nunca um bounce.
- **Foco:** Anel de foco padrão do navegador combinado com o tratamento de hover. Foco visível por teclado é obrigatório.
- **Secundário:** Link de texto inline na cópia de corpo, peso 500, hover muda para Editorial Magenta. **Não existe botão secundário boxado no sistema** — o site evita o padrão "pilha de CTAs de peso igual" inteiramente.
- **Chip (seletor overlay):** Radius 3–5px, padding pequeno, rótulo família mono. Usado no seletor de ações do live-mode.

### Cards e Contêineres

- **Estilo de Canto:** Vocabulário controlado — 4px (chips / callouts inline), 8px (cards padrão e card-CTAs), 12px (cards de feature, blocos de instalação), 16px (frames de conteúdo grandes). Nenhum padrão único "rounded-lg". O radius é escolhido por peso do componente.
- **Fundo:** Warm Ash Cream ou Crisp Paper White dependendo do empilhamento. Superfícies aninhadas mais profundas podem elevar-se para Paper Mist como uma mudança de tom quase imperceptível.
- **Sombra:** Plano em repouso — veja Elevação para o vocabulário de sombras que se aplica em hover/elevação.
- **Borda:** Finíssima 1px em Paper Mist quando uma superfície precisa de articulação sem sombra.
- **Padding Interno:** 16–32px para cards típicos; frames editoriais grandes 48px+. O padding corresponde ao peso visual, não aplicado uniformemente.

### Inputs / Campos

O site é primariamente editorial, então os inputs são mínimos:

- **Campo de email / texto:** Radius 4–6px, borda finíssima Paper Mist, fundo transparente. Estado de foco muda a borda para Editorial Magenta com um brilho de fundo Magenta Whisper.
- **Combobox / select (controles de filtro):** Mesmo vocabulário de traço, padding menor, glifo chevron em Mid Ash.
- **Sem estilo customizado de checkbox/radio** além do que o seletor de comandos do live-mode precisa.

### Navegação

- **Cabeçalho do Site:** Barra compacta de 62px, lockup de marca alinhado à esquerda (marca monocromática + wordmark), cluster de links alinhado à direita.
- **Tipografia:** Família de corpo, peso 500, 0.9–1rem. Caixa normal — o cabeçalho é prosa legível, não um conjunto de sinais.
- **Estado Padrão:** Deep Graphite sobre Warm Ash Cream.
- **Hover / Ativo:** Transição suave de cor para Editorial Magenta, 200ms. Sem barra de underline em repouso; se um indicador ativo for necessário, aparece um underline fino com cor de acento.
- **Mobile:** Colapsa para uma gaveta acionada por ícone quando o espaço horizontal é insuficiente.

### Tabela Periódica de Comandos (componente assinatura)

Um elemento customizado distintivo que vale documentar: os 23 comandos são dispostos como um grid de tabela periódica de tiles de 56×64px, cada um com fundo de tintura de categoria, borda com cor de categoria, número atômico no canto superior esquerdo (família mono, 7px), um símbolo no centro (família display, peso 500, 20px), e um rótulo de comando em mono abaixo. Hover eleva o tile 2px com uma sombra com cor de categoria. Os tiles são o único lugar onde o vocabulário de Tinturas de Categoria (veja Cores) é usado em uma superfície colorida em vez de como acento de texto.

### Layout e Espaçamento (integrado da seção de Layout ausente na spec)

- **Largura máxima:** Blocos de conteúdo limitam-se a 900px (`--width-content`); contêineres de nível de página a 1400px (`--width-max`). Prosa ainda mais restrita a 65–75ch.
- **Escala de espaçamento:** 8 / 16 / 24 / 32 / 48 / 80 / 120px (`--spacing-xs` até `--spacing-3xl`). O passo de 4px é deliberadamente omitido — esta é uma escala editorial, não uma escala de UI de app.
- **Ritmo:** 80–120px entre seções de nível superior, 24–48px entre grupos de conteúdo dentro de uma seção, 6–16px dentro de clusters compactos.
- **Grid:** Sem grid de colunas tradicional. Layouts hero são divisões assimétricas de duas colunas. Seções de features usam `repeat(auto-fit, minmax(280px, 1fr))` em vez de colunas orientadas por breakpoints.
- **Movimento:** 150ms para cor/opacidade, 300–400ms para transformações, 600–1200ms para entradas orquestradas. Todos usam `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`) ou `--ease-out-quint`. `prefers-reduced-motion` colapsa cada transição não essencial.

## 6. O que Fazer e o que Não Fazer

### Faça:

- **Faça** tratar Warm Ash Cream (não Crisp Paper White) como fundo padrão da página. O calor é estrutural — veja A Regra do Papel-Não-Branco.
- **Faça** usar Editorial Magenta em ≤10% de qualquer tela. Escassez é o que faz com que ele pareça decisivo em vez de barulhento — veja A Regra da Única Voz.
- **Faça** definir todas as novas cores em OKLCH. Hex é apenas para as Tinturas de Categoria de Comando isoladas.
- **Faça** usar tipo display itálico como voz, não como ênfase dentro de parágrafos. A ênfase no corpo é dada pelo peso.
- **Faça** usar dimensionamento fluido com `clamp()` para títulos; usar `rem` fixo para corpo — veja A Regra Apenas-Manchetes-Fluidas.
- **Faça** manter o CTA primário afiado e quadrado. `border-radius: 0`, uppercase, com letter-spacing. Esta é a assinatura editorial.
- **Faça** usar `--ease-out` (`cubic-bezier(0.16, 1, 0.3, 1)`) ou `--ease-out-quint` em transições. Apenas expo-out.
- **Faça** deixar superfícies planas em repouso. Recorra a sombras apenas em hover ou para elevação deliberada — veja A Regra do Plano-por-Padrão.
- **Faça** respeitar `prefers-reduced-motion` em cada animação.
- **Faça** limitar o comprimento de linha do corpo a 65–75ch via `max-width`.

### Não faça:

- **Não** use preto puro (#000) ou branco puro (#fff). Sempre os neutros tintados (Deep Graphite / Warm Ash Cream / Crisp Paper White).
- **Não** use `border-left` ou `border-right` maior que 1px como faixa colorida em cards, itens de lista, callouts ou alertas. Nunca. Este é o sinal mais reconhecível de dashboard de IA.
- **Não** use `background-clip: text` com gradiente. Texto com gradiente é proibido no site inteiro. Se você quer ênfase, use peso ou tamanho, nunca preenchimento com gradiente.
- **Não** use modo escuro por padrão. O site é modo claro porque leitura editorial é uma atividade de modo claro. Modo escuro com acentos brilhantes é a estética de ferramenta de IA que Impeccable existe para substituir.
- **Não** use glassmorphism (cards translúcidos borrados, bordas de vidro, fundos brilhantes como decoração). Está na lista de anti-referências explícita do PRODUCT.md.
- **Não** adicione uma segunda cor de acento. Se um layout "precisa" de um segundo ponto de ênfase, use escala ou peso, não tonalidade.
- **Não** use retângulos arredondados com sombras projetadas genéricas. Essa é a impressão digital de "poderia ser qualquer saída de IA".
- **Não** use easing bounce ou elástico. Objetos reais desaceleram suavemente — expo-out é a assinatura.
- **Não** anime propriedades de layout (`width`, `height`, `padding`, `margin`). Use apenas `transform` e `opacity`.
- **Não** aninhe cards dentro de cards. Aplane a hierarquia.
- **Não** use grids de cards idênticos (cards do mesmo tamanho com ícone + título + texto, repetidos infinitamente).
- **Não** use o template de layout hero-métrico (número grande + rótulo pequeno + estatísticas de apoio + acento gradiente). Clichê de SaaS.
- **Não** estenda o vocabulário de Tinturas de Categoria de Comando. Aquelas tinturas hex são escopadas para a visualização da tabela periódica.
- **Não** hesite na cópia de UI. "Talvez considere" e "poderia ser útil" são proibidos no produto — corresponda à voz especialista-decisiva do PRODUCT.md.
- **Não** introduza um novo token de espaçamento fora da escala 8/16/24/32/48/80/120. Se você precisa de um gap específico em pixels, use um valor literal em vez de poluir a escala de tokens.
