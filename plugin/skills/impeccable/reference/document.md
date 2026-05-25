Gere um arquivo `DESIGN.md` na raiz do projeto que captura o sistema de design visual atual, para que agentes de IA gerando novas telas permaneçam on-brand.

DESIGN.md segue o [formato oficial Google Stitch DESIGN.md](https://stitch.withgoogle.com/docs/design-md/format/): frontmatter YAML carregando design tokens legíveis por máquina, seguido por um corpo markdown com exatamente seis seções em uma ordem fixa. **Tokens são normativos; a prosa fornece contexto sobre como aplicá-los.** Seções podem ser omitidas quando não relevantes, mas **não as reordene e não as renomeie**. Os cabeçalhos das seções devem corresponder à especificação caractere por caractere para que o arquivo permaneça parseável por outras ferramentas conscientes de DESIGN.md (Stitch propriamente dito, awesome-design-md, skill-rest, etc.).

## O frontmatter: schema de tokens

O frontmatter YAML é a camada legível por máquina. É o que o linter do Stitch valida e o que o painel live renderiza como tiles. Mantenha-o enxuto; cada entrada deve corresponder a um token que o projeto realmente usa.

```yaml
---
name: <project title>
description: <one-line tagline>
colors:
  primary: "#b8422e"
  neutral-bg: "#faf7f2"
  # ...one entry per extracted color; key = descriptive slug
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2.5rem, 7vw, 4.5rem)"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "normal"
  body:
    # ...
rounded:
  sm: "4px"
  md: "8px"
spacing:
  sm: "8px"
  md: "16px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.sm}"
    padding: "16px 48px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
---
```

Regras que importam:

- **Referências de tokens** usam `{path.to.token}` (ex.: `{colors.primary}`, `{rounded.md}`). Componentes podem referenciar primitivos; primitivos não podem referenciar uns aos outros.
- **O Stitch valida cores apenas como hex sRGB** (`#RGB` / `#RGBA` / `#RRGGBB` / `#RRGGBBAA`); OKLCH/HSL/P3 acionam um aviso do linter, não um erro fatal. O YAML aceita a string de qualquer forma e nosso próprio parser é agnóstico quanto ao formato. Escolha com base na postura do projeto: (a) se o projeto tem uma doutrina "apenas OKLCH" ou usa valores Display-P3 que não fazem round-trip por sRGB, coloque OKLCH diretamente no frontmatter e aceite o aviso do linter do Stitch; (b) se o projeto quer conformidade estrita com o Stitch ou planeja usar seu pipeline de exportação Tailwind/DTCG, coloque hex no frontmatter e mantenha OKLCH na prosa como referência canônica. Nunca divida a fonte da verdade sem motivo explícito.
- **Sub-tokens de componentes** estão limitados a 8 props: `backgroundColor`, `textColor`, `typography`, `rounded`, `padding`, `size`, `height`, `width`. Shadows, motion, focus rings, backdrop-filter: nenhum deles se encaixa. Carregue-os no sidecar (Passo 4b).
- **Chaves de escala são abertas.** Use quaisquer nomes que o projeto já usa (`warm-ash-cream`, `surface-container-low`). Não renomeie para padrões Material.
- **Variantes são convenção de nomenclatura, não schema.** `button-primary` / `button-primary-hover` / `button-primary-active` como chaves irmãs.

## O corpo markdown: seis seções (ordem exata)

1. `## Overview`
2. `## Colors`
3. `## Typography`
4. `## Elevation`
5. `## Components`
6. `## Do's and Don'ts`

Subtítulos evocativos opcionais são permitidos na forma `## 2. Colors: The [Name] Palette` (as saídas do próprio Stitch fazem isso), mas a palavra literal em cada cabeçalho (Overview, Colors, Typography, Elevation, Components, Do's and Don'ts) deve estar presente. NÃO adicione seções de nível superior extras (Layout Principles, Responsive Behavior, Motion, Agent Prompt Guide). Dobre esse conteúdo nas seis seções da especificação onde naturalmente pertence.

## Quando executar

- O usuário acabou de executar `/impeccable teach` e precisa do lado visual documentado.
- A skill percebeu que não existe `DESIGN.md` e sugeriu ao usuário criar um.
- Um `DESIGN.md` existente está desatualizado (o design divergiu).
- Antes de uma grande reformulação, para capturar o estado atual como referência.

Se um `DESIGN.md` já existe, **não o sobrescreva silenciosamente**. Mostre o arquivo existente ao usuário e {{ask_instruction}} se deseja atualizar, sobrescrever ou fazer merge.

## Dois caminhos

- **Modo scan** (padrão): o projeto tem design tokens, componentes ou saída renderizada. Extraia, depois confirme a linguagem descritiva. Use quando há código para analisar.
- **Modo seed**: o projeto está pré-implementação (teach recente, nada construído ainda). Entreviste para cinco respostas de alto nível, escreva um DESIGN.md mínimo marcado com `<!-- SEED -->`. Re-execute no modo scan quando houver código.

Decida escaneando primeiro (Modo scan Passo 1). Se o scan não encontra tokens, arquivos de componentes ou site renderizado, ofereça o modo seed; não mude silenciosamente. `/impeccable document --seed` força o modo seed independentemente da presença de código.

## Modo scan (abordagem C: auto-extração, depois confirmar linguagem descritiva)

### Passo 1: Encontrar os assets de design

Busque no codebase em ordem de prioridade:

1. **CSS custom properties**: grep por declarações `--color-`, `--font-`, `--spacing-`, `--radius-`, `--shadow-`, `--ease-`, `--duration-` em arquivos CSS (geralmente `src/styles/`, `public/css/`, `app/globals.css`, etc.). Registre nome, valor e o arquivo onde está definido.
2. **Tailwind config**: se `tailwind.config.{js,ts,mjs}` existe, leia o bloco `theme.extend` para colors, fontFamily, spacing, borderRadius, boxShadow.
3. **Arquivos de tema CSS-in-JS**: styled-components, emotion, vanilla-extract, stitches; procure por `theme.ts`, `tokens.ts`, ou equivalente.
4. **Arquivos de design tokens**: `tokens.json`, `design-tokens.json`, saída do Style Dictionary, formato W3C token community group.
5. **Biblioteca de componentes**: escaneie os componentes principais de button, card, input, navigation, dialog. Anote suas APIs de variantes e estilos padrão.
6. **Stylesheet global**: o arquivo CSS raiz geralmente tem a tipografia base e atribuições de cor.
7. **Saída renderizada visível**: se ferramentas de automação de navegador estão disponíveis, carregue o site ao vivo e amostre estilos computados de elementos-chave (body, h1, a, button, .card). Isso captura valores que os tokens perdem.

### Passo 2: Auto-extrair o que pode ser auto-extraído

Construa um rascunho estruturado a partir dos tokens descobertos. Para cada classe de token:

- **Cores**: Agrupe em Primary / Secondary / Tertiary / Neutral (os papéis derivados do Material que o Stitch usa). Se o projeto tem apenas um acento, expresse-o como Primary + Neutral; omita Secondary e Tertiary em vez de inventá-los.
- **Tipografia**: Mapeie tamanhos e pesos observados para a hierarquia Material (display / headline / title / body / label). Anote font-family stacks e a razão de escala.
- **Elevação**: Catalogue o vocabulário de sombras. Se o projeto é flat e usa camadas tonais em vez disso, essa é uma resposta válida; declare explicitamente.
- **Componentes**: Para cada componente comum (button, card, input, chip, list item, tooltip, nav), extraia forma (radius), atribuição de cor, tratamento hover/focus, padding interno.
- **Espaçamento + layout**: Dobre em Overview ou Componentes relevantes. A especificação NÃO tem uma seção de Layout.

### Passo 2b: Preparar o frontmatter

A partir dos tokens auto-extraídos, redija o frontmatter YAML agora (você o escreverá no topo do DESIGN.md no Passo 4). Esta é a camada legível por máquina: o que o painel live e o linter do Stitch consomem.

- **Cores**: uma entrada por cor extraída. Chave = slug descritivo (`warm-ash-cream`, `editorial-magenta`, não `blue-800`). Valor = o formato que o projeto trata como canônico (OKLCH ou hex; veja as regras do frontmatter acima). Não divida a fonte da verdade: um formato no frontmatter, não redefina o mesmo token na prosa com um valor diferente.
- **Tipografia**: uma entrada por papel (`display`, `headline`, `title`, `body`, `label`). Tipografia é um objeto; inclua apenas as props que são reais para o projeto (`fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`, `fontFeature`, `fontVariation`).
- **Rounded / Spacing**: quaisquer passos de escala que o projeto realmente usa, codificados por qualquer nome de escala que o projeto usa (`sm` / `md` / `lg`, ou `surface-sm`, ou passos numéricos).
- **Componentes**: uma entrada por variante (`button-primary`, `button-primary-hover`, `button-ghost`). Referencie primitivos via `{colors.X}`, `{rounded.Y}`. Se uma variante precisa de uma propriedade que o conjunto de 8 props do Stitch não cobre (shadow, focus ring, backdrop-filter), carregue o snippet completo no sidecar.

Pule qualquer coisa que o projeto não tenha. Chaves de escala vazias ou tokens fabricados poluem a especificação.

### Passo 3: Perguntar ao usuário pela linguagem qualitativa

Os itens a seguir requerem insumo criativo que não pode ser auto-extraído. Agrupe-os em uma interação `AskUserQuestion`:

- **North Star Criativo**: uma metáfora nomeada única para todo o sistema ("The Editorial Sanctuary", "The Golden State Curator", "The Lab Notebook"). Ofereça 2-3 opções que honrem a personalidade da marca do PRODUCT.md.
- **Voz do Overview**: adjetivos de humor, filosofia estética em 2-3 frases, anti-referências (o que o sistema não deve parecer).
- **Caráter da cor** (para cores auto-extraídas): nomes descritivos ("Deep Muted Teal-Navy", não "blue-800"). Sugira 2-3 opções por cor-chave com base em matiz/saturação.
- **Filosofia de elevação**: flat/layered/lifted. Se sombras existem, seu papel é ambiental ou estrutural?
- **Filosofia de componentes**: a sensação dos botões, cards e inputs em uma frase ("tátil e confiante" vs. "refinado e contido").

Cite uma linha de PRODUCT.md quando possível para que o usuário veja sua própria linguagem estratégica ser levada adiante.

### Passo 4: Escrever DESIGN.md

O arquivo abre com o frontmatter YAML preparado no Passo 2b (schema documentado no topo desta referência), depois o corpo markdown usando a estrutura abaixo. Os cabeçalhos devem corresponder caractere por caractere. Subtítulos evocativos opcionais (ex.: `## 2. Colors: The Coastal Palette`) são permitidos.

```markdown
---
name: [Project Title]
description: [one-line tagline]
colors:
  # ... staged frontmatter from Step 2b
---

# Design System: [Project Title]

## 1. Overview

**Creative North Star: "[Named metaphor in quotes]"**

[2-3 paragraph holistic description: personality, density, aesthetic philosophy. Start from the North Star and work outward. State what this system explicitly rejects (pulled from PRODUCT.md's anti-references). End with a short **Key Characteristics:** bullet list.]

## 2. Colors

[Describe the palette character in one sentence.]

### Primary
- **[Descriptive Name]** (#HEX / oklch(...)): [Where and why this color is used. Be specific about context, not just role.]

### Secondary (optional; omit if the project has only one accent)
- **[Descriptive Name]** (#HEX): [Role.]

### Tertiary (optional)
- **[Descriptive Name]** (#HEX): [Role.]

### Neutral
- **[Descriptive Name]** (#HEX): [Text / background / border / divider role.]
- [...]

### Named Rules (optional, powerful)
**The [Rule Name] Rule.** [Short, forceful prohibition or doctrine, e.g. "The One Voice Rule. The primary accent is used on ≤10% of any given screen. Its rarity is the point."]

## 3. Typography

**Display Font:** [Family] (with [fallback])
**Body Font:** [Family] (with [fallback])
**Label/Mono Font:** [Family, if distinct]

**Character:** [1-2 sentence personality description of the pairing.]

### Hierarchy
- **Display** ([weight], [size/clamp], [line-height]): [Purpose; where it appears.]
- **Headline** ([weight], [size], [line-height]): [Purpose.]
- **Title** ([weight], [size], [line-height]): [Purpose.]
- **Body** ([weight], [size], [line-height]): [Purpose. Include max line length like 65–75ch if relevant.]
- **Label** ([weight], [size], [letter-spacing], [case if uppercase]): [Purpose.]

### Named Rules (optional)
**The [Rule Name] Rule.** [Short doctrine about type use.]

## 4. Elevation

[One paragraph: does this system use shadows, tonal layering, or a hybrid? If "no shadows", say so explicitly and describe how depth is conveyed instead.]

### Shadow Vocabulary (if applicable)
- **[Role name]** (`box-shadow: [exact value]`): [When to use it.]
- [...]

### Named Rules (optional)
**The [Rule Name] Rule.** [e.g. "The Flat-By-Default Rule. Surfaces are flat at rest. Shadows appear only as a response to state (hover, elevation, focus)."]

## 5. Components

For each component, lead with a short character line, then specify shape, color assignment, states, and any distinctive behavior.

### Buttons
- **Shape:** [radius described, exact value in parens]
- **Primary:** [color assignment + padding, in semantic + exact terms]
- **Hover / Focus:** [transitions, treatments]
- **Secondary / Ghost / Tertiary (if applicable):** [brief description]

### Chips (if used)
- **Style:** [background, text color, border treatment]
- **State:** [selected / unselected, filter / action variants]

### Cards / Containers
- **Corner Style:** [radius]
- **Background:** [colors used]
- **Shadow Strategy:** [reference Elevation section]
- **Border:** [if any]
- **Internal Padding:** [scale]

### Inputs / Fields
- **Style:** [stroke, background, radius]
- **Focus:** [treatment, e.g. glow, border shift, etc.]
- **Error / Disabled:** [if applicable]

### Navigation
- **Style, typography, default/hover/active states, mobile treatment.**

### [Signature Component] (optional; if the project has a distinctive custom component worth documenting)
[Description.]

## 6. Do's and Don'ts

Concrete, forceful guardrails. Lead each with "Do" or "Don't". Be specific: include exact colors, pixel values, and named anti-patterns the user mentioned in PRODUCT.md. **Every anti-reference in PRODUCT.md should show up here as a "Don't" with the same language**, so the visual spec carries the strategic line through. Quote PRODUCT.md directly where possible: if PRODUCT.md says *"avoid dark mode with purple gradients, neon accents, glassmorphism"*, the Don'ts here should repeat that by name.

### Do:
- **Do** [specific prescription with exact values / named rule].
- **Do** [...]

### Don't:
- **Don't** [specific prohibition, e.g. "use border-left greater than 1px as a colored stripe"].
- **Don't** [...]
- **Don't** [...]
```

### Passo 4b: Escrever sidecar .impeccable/design.json (apenas extensões)

O frontmatter possui os primitivos de tokens (colors, typography, rounded, spacing, components). O sidecar em `.impeccable/design.json` carrega **o que o schema do Stitch não suporta**: ramps tonais por cor, tokens de shadow/elevação, tokens de motion, breakpoints, snippets HTML/CSS completos de componentes (o painel renderiza em um shadow DOM), e narrativa (north star, regras, do's/don'ts). Ele estende o frontmatter, não o duplica.

Regenere o sidecar sempre que regenerar o `DESIGN.md` raiz. Se o usuário apenas pediu para atualizar o sidecar (ex.: a partir da dica de desatualização do painel live), preserve `DESIGN.md` e escreva apenas `.impeccable/design.json`.

#### Schema

```json
{
  "schemaVersion": 2,
  "generatedAt": "ISO-8601 string",
  "title": "Design System: [Project Title]",
  "extensions": {
    "colorMeta": {
      "primary":        { "role": "primary",  "displayName": "Editorial Magenta", "canonical": "oklch(60% 0.25 350)", "tonalRamp": ["...", "...", "..."] },
      "warm-ash-cream": { "role": "neutral",  "displayName": "Warm Ash Cream",    "canonical": "oklch(96% 0.005 350)", "tonalRamp": ["...", "...", "..."] }
    },
    "typographyMeta": {
      "display": { "displayName": "Display", "purpose": "Hero headlines only." }
    },
    "shadows": [
      { "name": "ambient-low", "value": "0 4px 24px rgba(0,0,0,0.12)", "purpose": "Diffuse hover glow under accent elements." }
    ],
    "motion": [
      { "name": "ease-standard", "value": "cubic-bezier(0.4, 0, 0.2, 1)", "purpose": "Default easing for state transitions." }
    ],
    "breakpoints": [
      { "name": "sm", "value": "640px" }
    ]
  },
  "components": [
    {
      "name": "Primary Button",
      "kind": "button | input | nav | chip | card | custom",
      "refersTo": "button-primary",
      "description": "One-line what and when.",
      "html": "<button class=\"ds-btn-primary\">GET STARTED</button>",
      "css": ".ds-btn-primary { background: #191c1d; color: #fff; padding: 16px 48px; letter-spacing: 0.05em; text-transform: uppercase; font-weight: 500; border: none; border-radius: 0; transition: background 0.2s, transform 0.2s; } .ds-btn-primary:hover { background: oklch(60% 0.25 350); transform: translateY(-2px); }"
    }
  ],
  "narrative": {
    "northStar": "The Editorial Sanctuary",
    "overview": "2-3 paragraphs of the philosophy, pulled from DESIGN.md Overview section.",
    "keyCharacteristics": ["...", "..."],
    "rules": [{ "name": "The One Voice Rule", "body": "...", "section": "colors|typography|elevation" }],
    "dos":   ["Do use ..."],
    "donts": ["Don't use ..."]
  }
}
```

**O que mudou do schemaVersion 1.** O sidecar antigo carregava arrays de primitivos de tokens (`tokens.colors[]`, `tokens.typography[]`, etc.). Esses valores agora vivem no frontmatter. O sidecar carrega apenas metadados que não podem viver no frontmatter (ramps tonais, OKLCH canônico quando o hex é uma aproximação, nomes de exibição, dicas de papel), codificados pelo nome do token do frontmatter (`colorMeta.<token-name>`, `typographyMeta.<token-name>`). Componentes ainda carregam HTML/CSS completos porque o conjunto de 8 props do Stitch não suporta.

#### Regras de tradução de componentes

Os campos `html` e `css` devem ser **snippets autônomos e drop-in** que renderizam corretamente quando injetados em um shadow DOM. O painel os aplica diretamente: sem pós-processamento, sem runtime de framework.

1. **Expansão do Tailwind.** Se a fonte usa Tailwind (className="bg-primary text-white rounded-lg px-6 py-3"), expanda cada utilidade para propriedades CSS literais na string `css`. **Não** referencie classes Tailwind; **não** presuma que um bundle Tailwind CSS está carregado. Cada componente é autônomo.
2. **Resolução de tokens.** Se o projeto expõe tokens como CSS custom properties em `:root` (ex.: `--color-primary`, `--radius-md`), referencie-os via `var(--color-primary)`; eles herdam através do shadow DOM e permanecem live-bound. Se tokens vivem apenas em objetos de tema JS (styled-components, CSS-in-JS), resolva para valores literais no momento da geração.
3. **Ícones.** Inline como SVG. Não referencie pacotes Lucide/Heroicons, fontes de ícones, ou `<img src="...">`. Um ícone típico tem 16-24px; copie os dados do path SVG diretamente.
4. **Estados.** Inclua regras `:hover`, `:focus-visible` e (se relevante) `:active` inline. Um snapshot apenas padrão/estático faz o painel parecer morto. Regras de hover + focus no CSS fazem parecer vivo.
5. **Bloat de reset.** Extraia apenas o CSS *distintivo* do componente (background, color, padding, border-radius, typography, transition). Pule resets universais (`box-sizing: border-box`, `line-height: inherit`, `-webkit-font-smoothing`). O painel já tem uma tela neutra; não re-envie resets.
6. **Nomes de classes com escopo.** Prefixe toda classe com `ds-` (ex.: `ds-btn-primary`, `ds-input-search`) para que o CSS do componente não colida com o CSS de outros componentes no mesmo shadow DOM.

#### O que incluir

Mire em um conjunto enxuto de **5-10 componentes** que melhor representam o sistema visual:

- **Primitivos canônicos (sempre inclua se o projeto os tem):** button (cada variante como uma entrada de componente separada), input/text field, navegação, chip/tag, card.
- **Componentes signature (inclua se distintivo):** hero CTA, featured card, filter pill, qualquer padrão customizado que o usuário mencionou como importante em PRODUCT.md.
- **Pule o resto.** Componentes utilitários, blocos de construção de formulários, layouts wrapper: não vale documentar a menos que visualmente distintivos.

Se o projeto **ainda não tem biblioteca de componentes** (landing page simples, projeto novo), sintetize primitivos canônicos a partir dos tokens usando padrões de melhor prática consistentes com as regras do DESIGN.md. Todo `.impeccable/design.json` tem *algo* para renderizar, mesmo no dia zero.

#### Ramps tonais

Para cada token de cor, gere um array `tonalRamp` de 8 passos: escuro para claro, mesmo matiz e chroma, luminosidade escalonada de ~15% a ~95%. O painel renderiza isso como uma faixa sob a amostra. Se o projeto já define uma escala tonal (família `surface-container-low` do Material, estilo Tailwind `blue-50..blue-900`), use esses valores. Caso contrário, sintetize em OKLCH.

#### Mapeamento narrativo

Puxe diretamente do DESIGN.md que você acabou de escrever:

- `narrative.northStar` → a linha `**Creative North Star: "..."**` do Overview
- `narrative.overview` → os parágrafos de filosofia do Overview
- `narrative.keyCharacteristics` → a lista com bullets `**Key Characteristics:**`
- `narrative.rules` → cada `**The [Name] Rule.** [body]` em todas as seções, taggeado com `section`
- `narrative.dos` / `narrative.donts` → as listas com bullets de Do's and Don'ts verbatim

Não reescreva. O painel mostra esses como contexto colapsável secundário; a mesma voz que está no Markdown é levada adiante.

### Passo 5: Confirmar, refinar e atualizar cache da sessão

1. Mostre ao usuário o DESIGN.md completo que você escreveu. Destaque brevemente as escolhas criativas não óbvias (nomes descritivos de cores, linguagem de atmosfera, regras nomeadas).
2. Mencione que `.impeccable/design.json` também foi escrito junto; o painel live agora renderizará os primitivos reais de button/input/nav deste projeto em vez de aproximações genéricas.
3. Ofereça refinar qualquer seção: "Quer que eu revise uma seção, adicione padrões de componentes que perdi, ou ajuste a linguagem de atmosfera?"
4. **Atualize o cache da sessão.** Execute `node {{scripts_path}}/load-context.mjs` uma última vez para que o DESIGN.md recém-escrito pouse na conversa. Comandos subsequentes nesta sessão usarão a versão atualizada automaticamente sem reler.

## Modo seed

Para projetos sem sistema visual para extrair ainda. Produz um scaffold mínimo, não uma especificação completa.

### Passo 1: Confirmar modo seed

Antes de entrevistar: "Não há sistema visual existente para escanear. Vou fazer cinco perguntas rápidas para semear um DESIGN.md inicial. Você pode re-executar `/impeccable document` quando houver código, para capturar os tokens e componentes reais. OK?"

Se o usuário preferir pular, pare. Nenhum arquivo.

### Passo 2: Cinco perguntas

Agrupe em uma interação `AskUserQuestion`. Opções devem ser concretas.

1. **Estratégia de cor.** Escolha uma:
   - Restrained: neutros tonalizados + um acento ≤10%
   - Committed: uma cor saturada carrega 30–60% da superfície
   - Full palette: 3-4 papéis de cor nomeados, cada um deliberado
   - Drenched: a superfície É a cor
   
   Então: uma família de matiz ou referência-âncora ("deep teal", "mustard", "Klim #ff4500 orange").

2. **Direção tipográfica.** Escolha uma (fontes específicas vêm depois):
   - Serif display + sans body
   - Single sans (warm / technical / geometric / humanist; escolha uma sensação)
   - Display + mono
   - Mono-forward
   - Editorial script + sans

3. **Energia de movimento.** Escolha uma:
   - Restrained: apenas mudanças de estado
   - Responsive: feedback + transições, sem coreografia
   - Choreographed: entradas orquestradas, sequências scroll-driven

4. **Três referências nomeadas.** Marcas, produtos, objetos impressos. Não adjetivos.

5. **Uma anti-referência.** O que NÃO deveria parecer. Também nomeada.

### Passo 3: Escrever DESIGN.md seed

Use a especificação de seis seções do Modo scan. Popule o que as respostas da entrevista fornecem; deixe o resto como placeholders honestos. O seed é um scaffold, não uma especificação fabricada.

Lidere o arquivo com:

```markdown
<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->
```

Orientação por seção no modo seed:

- **Overview**: North Star Criativo e filosofia formulados a partir das respostas (estratégia de cor + energia de movimento + referências). Referencie a anti-referência do usuário diretamente.
- **Colors**: Estratégia de cor como uma Regra Nomeada (ex.: *"The Drenched Rule. A superfície É a cor."*). Família de matiz ou referência-âncora. Sem valores hex; marque como `[a ser resolvido durante implementação]`.
- **Typography**: a direção que o usuário escolheu (ex.: "Serif display + sans body"). Sem nomes de fontes ainda: `[pareamento de fontes a ser escolhido na implementação]`.
- **Elevation**: inferido a partir da energia de movimento. Restrained/Responsive → flat por padrão; Choreographed → em camadas. Uma frase.
- **Components**: omita inteiramente; nenhum componente existe ainda.
- **Do's and Don'ts**: traga as anti-referências do PRODUCT.md diretamente mais a anti-referência nomeada na Q5.

O modo seed escreve um frontmatter mínimo com apenas `name` e `description`; sem cores, tipografia, rounded, spacing ou componentes ainda. Tokens reais pousam na próxima execução no Modo scan. Pule o sidecar `.impeccable/design.json` no modo seed pelo mesmo motivo: nada para renderizar.

### Passo 4: Confirmar e atualizar cache da sessão

1. Mostre o DESIGN.md seed. Destaque que é um seed (o marcador é o compromisso literal).
2. Diga ao usuário: "Re-execute `/impeccable document` quando tiver algum código. Essa passagem vai extrair os tokens reais e gerar o sidecar."
3. Execute `node {{scripts_path}}/load-context.mjs` uma vez para que o seed pouse na conversa para o resto da sessão.

## Diretrizes de estilo

- **Frontmatter primeiro, prosa depois.** Tokens vão no frontmatter YAML; a prosa os contextualiza. Não redefina um valor de token em dois lugares; o frontmatter é normativo.
- **Cite anti-referências do PRODUCT.md pelo nome** na seção Do's and Don'ts. Se PRODUCT.md lista "clichês de landing page SaaS" ou "marketing genérico de ferramenta AI" como anti-referências, os Don'ts do DESIGN.md devem repetir essas frases verbatim para que a especificação visual aplique a linha estratégica.
- **Siga a especificação, não invente novas seções.** Os seis nomes de seção são fixos. Se você tem conteúdo de Layout/Motion/Responsive para documentar, dobre-o em Overview (regras de nível de filosofia) ou Components (comportamento por componente).
- **Descritivo > técnico**: "Bordas suavemente curvas (8px radius)" > "rounded-lg". Inclua o valor técnico entre parênteses, lidere com a descrição.
- **Funcional > decorativo**: para cada token, explique ONDE e POR QUE é usado, não apenas O QUE é.
- **Valores exatos entre parênteses**: hex codes, valores px/rem, font weights; sempre o número entre parênteses ao lado da descrição.
- **Use Regras Nomeadas**: `**The [Name] Rule.** [doutrina curta]**. Estas são memoráveis, citáveis e muito mais aderentes para consumidores de IA do que listas com bullets. As saídas do próprio Stitch as usam extensivamente ("The No-Line Rule", "The Ghost Border Fallback"). Mire em 1-3 por seção.
- **Seja incisivo**. A voz de um diretor de design. "Proibido", "proibido", "nunca", "sempre", não "considere", "talvez", "prefira". Combine o tom do PRODUCT.md.
- **Testes concretos de anti-padrões**. O Stitch escreve coisas como *"Se parece com um app de 2014, a sombra está escura demais e o blur está pequeno demais."* Um teste de auditoria de uma frase vale mais que um parágrafo de princípio.
- **Referencie PRODUCT.md**. A seção de anti-referências do PRODUCT.md deve informar diretamente a seção Do's and Don'ts aqui. Cite ou parafraseie.
- **Agrupe cores por papel**, não por ordem de hex ou ordem de matiz. Primary / Secondary / Tertiary / Neutral é a ordem da especificação.

## Armadilhas

- Não cole nomes de classes CSS brutos. Traduza para linguagem descritiva.
- Não extraia todo token. Pare no que é realmente reutilizado; casos únicos poluem o sistema.
- Não invente componentes que não existem. Se o projeto só tem botões e cards, documente apenas esses.
- Não sobrescreva um DESIGN.md existente sem perguntar.
- Não duplique conteúdo do PRODUCT.md. DESIGN.md é estritamente visual.
- Não adicione uma seção de nível superior "Layout Principles" ou "Motion" ou "Responsive Behavior". A especificação tem seis, não nove. Dobre esse conteúdo onde pertence.
- Não renomeie seções nem mesmo levemente. "Colors" não "Color Palette & Roles". "Typography" não "Typography Rules". Ferramentas de parsing dependem de cabeçalhos exatos.
- Não duplique valores de tokens entre frontmatter e prosa. Se uma cor está em `colors.primary` como hex, a prosa pode nomeá-la e descrever seu papel, mas não deve reafirmar um hex diferente. O frontmatter é normativo.
- Não invente grupos de tokens de frontmatter fora do schema do Stitch (sem `motion:`, `breakpoints:`, `shadows:` no nível superior). O schema Zod do Stitch aceita apenas `colors`, `typography`, `rounded`, `spacing`, `components`. Qualquer outra coisa pertence às `extensions` do sidecar.
