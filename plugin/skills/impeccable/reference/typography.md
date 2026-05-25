# Tipografia

## Princípios Clássicos de Tipografia

### Ritmo Vertical

Seu line-height deve ser a unidade base para TODOS os espaçamentos verticais. Se o texto do corpo tem `line-height: 1.5` em tipo de `16px` (= 24px), os valores de espaçamento devem ser múltiplos de 24px. Isso cria harmonia subconsciente; texto e espaço compartilham uma base matemática.

### Escala Modular e Hierarquia

O erro comum: muitos tamanhos de fonte que estão muito próximos (14px, 15px, 16px, 18px...). Isso cria uma hierarquia turva.

**Use menos tamanhos com mais contraste.** Um sistema de 5 tamanhos cobre a maioria das necessidades:

| Papel | Razão Típica | Caso de Uso |
|-------|--------------|-------------|
| xs | 0.75rem | Legendas, legal |
| sm | 0.875rem | UI secundária, metadados |
| base | 1rem | Texto do corpo |
| lg | 1.25-1.5rem | Subtítulos, texto de destaque |
| xl+ | 2-4rem | Manchetes, texto hero |

Razões populares: 1.25 (terça maior), 1.333 (quarta justa), 1.5 (quinta justa). Escolha uma e comprometa-se.

### Legibilidade e Medida

Use unidades `ch` para medida baseada em caracteres (`max-width: 65ch`). O line-height escala inversamente com o comprimento da linha: colunas estreitas precisam de entrelinha mais justa, colunas largas precisam de mais.

**Não-óbvio**: Texto claro em fundos escuros precisa de compensação em três eixos, não apenas um. Aumente o line-height em 0.05–0.1, adicione um toque de letter-spacing (0.01–0.02em) e, opcionalmente, suba o peso do corpo um degrau (regular → medium). O peso percebido cai nos três; corrija os três.

**Ritmo de parágrafo**: Escolha espaço entre parágrafos OU indentação de primeira linha. Nunca ambos. O digital geralmente quer espaço; editorial/formato longo pode justificar apenas indentação.

## Seleção e Combinacao de Fontes

O procedimento tático de seleção e a lista de reflexo-rejeição estão em [reference/brand.md](brand.md) sob **Procedimento de seleção de fontes** e **Lista de reflexo-rejeição** (carregados para tarefas de registro de marca). O resto desta seção cobre o conhecimento adjacente: correções anti-reflexo, uso de fontes do sistema e regras de combinação.

### Anti-reflexos que valem a pena defender

- Um brief técnico/utilitário NÃO precisa de uma serif "para aquecimento." A maioria das ferramentas tech deveria parecer ferramentas tech.
- Um brief editorial/premium NÃO precisa da mesma serif expressiva que todos estão usando agora. Premium pode ser suíço-moderno, pode ser neo-grotesque, pode ser uma monospace literal, pode ser uma sans humanista discreta.
- Um produto infantil NÃO precisa de uma fonte de display arredondada. Livros infantis usam tipo de verdade.
- Um brief "moderno" NÃO precisa de uma sans geométrica. A coisa mais moderna que você pode fazer é não usar a fonte que todos os outros estão usando.

**Fontes do sistema são subestimadas**: `-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui` tem aparência nativa, carrega instantaneamente e é altamente legível. Considere isso para apps onde desempenho > personalidade.

### Princípios de Combinacao

**A verdade não-óbvia**: Você frequentemente não precisa de uma segunda fonte. Uma família de fontes bem escolhida em múltiplos pesos cria uma hierarquia mais limpa do que duas tipografias competindo. Adicione uma segunda fonte apenas quando precisar de contraste genuíno (e.g., manchetes de display + corpo serif).

Ao combinar, contraste em múltiplos eixos:
- Serif + Sans (contraste de estrutura)
- Geométrica + Humanista (contraste de personalidade)
- Display condensada + Corpo larga (contraste de proporção)

**Nunca combine fontes que são parecidas mas não idênticas** (e.g., duas sans-serifs geométricas). Elas criam tensão visual sem hierarquia clara.

## Carregamento de Web Fonts

O problema de deslocamento de layout: fontes carregam tarde, o texto reflui e os usuários veem o conteúdo saltar. Aqui está a solução:

```css
/* 1. Use font-display: swap para visibilidade */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap;
}

/* 2. Combine as métricas de fallback para minimizar o deslocamento */
@font-face {
  font-family: 'CustomFont-Fallback';
  src: local('Arial');
  size-adjust: 105%;        /* Escala para combinar com x-height */
  ascent-override: 90%;     /* Combina altura de ascendente */
  descent-override: 20%;    /* Combina profundidade de descendente */
  line-gap-override: 10%;   /* Combina espaçamento de linha */
}

body {
  font-family: 'CustomFont', 'CustomFont-Fallback', sans-serif;
}
```

Ferramentas como [Fontaine](https://github.com/unjs/fontaine) calculam essas substituições automaticamente.

**`swap` vs `optional`**: `swap` mostra o texto de fallback imediatamente e faz FOUT-swap quando a web font chega. `optional` usa o fallback se a web font não conseguir dentro de um orçamento pequeno de carga (~100ms) e evita o deslocamento inteiramente. Escolha `optional` quando zero deslocamento de layout importa mais do que ver a fonte de marca em redes lentas.

**Pré-carregue apenas o peso crítico**: tipicamente a fonte de corpo de peso regular usada acima da dobra. Pré-carregar todos os pesos custa mais banda do que economiza.

**Fontes variáveis para 3+ pesos ou estilos**: um único arquivo de fonte variável é geralmente menor que três arquivos de pesos estáticos, oferece controle fracionário de peso e combina bem com `font-optical-sizing: auto`. Para 1–2 pesos, estático é aceitável.

## Tipografia Web Moderna

### Tipo Fluido

Tipografia fluida via `clamp(min, preferred, max)` escala o texto suavemente com o viewport. O valor do meio (e.g., `5vw + 1rem`) controla a taxa de escala (vw maior = escala mais rápida). Adicione um offset em rem para que não colapse a 0 em telas pequenas.

**Use tipo fluido para**: Títulos e texto de display em páginas de marketing/conteúdo onde o texto domina o layout e precisa respirar entre diferentes tamanhos de viewport.

**Use escalas `rem` fixas para**: UIs de apps, painéis e interfaces densas em dados. Nenhum grande design system de app (Material, Polaris, Primer, Carbon) usa tipo fluido em UI de produto; escalas fixas com ajustes opcionais de breakpoint oferecem a previsibilidade espacial que layouts baseados em contêiner precisam. O texto do corpo também deve ser fixo mesmo em páginas de marketing, já que a diferença de tamanho entre viewports é pequena demais para justificar.

**Limite seu clamp()**: mantenha `max-size ≤ ~2.5 × min-size`. Razões mais amplas quebram o comportamento de zoom e reflow do navegador e fazem viewports grandes parecerem que a página está gritando.

**Escale a largura do contêiner e o font-size juntos** para que a medida efetiva de caracteres permaneça na faixa de 45–75ch em cada viewport. Um título que se alarga mais rápido que seu contêiner sai da medida confortável no extremo superior.

### Recursos OpenType

A maioria dos desenvolvedores não sabe que estes existem. Use-os para polimento:

```css
/* Números tabulares para alinhamento de dados */
.data-table { font-variant-numeric: tabular-nums; }

/* Frações próprias */
.recipe-amount { font-variant-numeric: diagonal-fractions; }

/* Small caps para abreviações */
abbr { font-variant-caps: all-small-caps; }

/* Desativar ligaduras em código */
code { font-variant-ligatures: none; }

/* Ativar kerning (geralmente ativado por padrão, mas seja explícito) */
body { font-kerning: normal; }
```

Verifique quais recursos sua fonte suporta em [Wakamai Fondue](https://wakamaifondue.com/).

### Polimento de renderização

```css
/* Equalizar comprimentos de linha de títulos (o navegador escolhe melhores pontos de quebra) */
h1, h2, h3 { text-wrap: balance; }

/* Reduzir órfãs e finais irregulares em prosa longa */
article p { text-wrap: pretty; }

/* Fontes variáveis: seleciona o master de tamanho ótico correto automaticamente */
body { font-optical-sizing: auto; }
```

**Tracking em CAIXA ALTA**: capitais ficam muito próximas no espaçamento padrão. Adicione 5–12% de letter-spacing (`letter-spacing: 0.05em` a `0.12em`) em rótulos curtos em caixa alta, eyebrows e títulos pequenos. Small caps reais (via `font-variant-caps`) precisam do mesmo tratamento, ligeiramente mais suave.

## Arquitetura de Sistema Tipográfico

Nomeie tokens semanticamente (`--text-body`, `--text-heading`), não por valor (`--font-size-16`). Inclua font stacks, escala de tamanhos, pesos, line-heights e letter-spacing no seu sistema de tokens.

## Considerações de Acessibilidade

Além das razões de contraste (que são bem documentadas), considere:

- **Nunca desative o zoom**: `user-scalable=no` quebra a acessibilidade. Se seu layout quebra a 200% de zoom, corrija o layout.
- **Use rem/em para tamanhos de fonte**: Isso respeita as configurações do navegador do usuário. Nunca `px` para texto de corpo.
- **Mínimo de 16px para texto de corpo**: Menor que isso esforça os olhos e falha na WCAG em mobile.
- **Alvos de toque adequados**: Links de texto precisam de padding ou line-height que crie alvos de toque de 44px+.

---

**Evite**: Mais de 2-3 famílias de fontes por projeto. Pular definições de fontes de fallback. Ignorar desempenho de carregamento de fontes (FOUT/FOIT). Usar fontes decorativas para texto de corpo.
