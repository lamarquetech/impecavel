---
title: Itere na UI com Live Mode
tagline: "Selecione um elemento, gere três variantes, aceite uma. Iteração tipo canvas sem sair do seu código."
order: 2
description: "Use /impeccable live para iterar visualmente em um elemento real no seu dev server: selecione, anote, gere três variantes, aceite a que quiser, e tenha-a escrita de volta no código-fonte."
---

## O que você vai construir

Você vai usar `/impeccable live` no seu dev server para iterar em uma única peça de UI (um hero, um card, uma seção) e terminar com uma de três variantes geradas por IA escrita de volta no código-fonte como código real. Você vai ver o fluxo de seleção estilo canvas, anotação e ciclagem entre três opções.

Tempo total: cerca de dez minutos. A maior parte é escolhendo o que iterar.

## Pré-requisitos

- Impeccable instalado (veja [primeiros passos](/tutorials/getting-started) se ainda não instalou). Execute `/impeccable teach` primeiro se ainda não fez: variantes dependem de `PRODUCT.md` e `DESIGN.md` para adequação à marca.
- Um dev server em execução com HMR (Vite, Next.js, SvelteKit, Astro, Nuxt, Bun) OU um arquivo HTML estático aberto em um navegador.
- Uma página com pelo menos uma peça de UI que você gostaria de iterar. Um card de newsletter, um hero, um tier de preços, algo pequeno o suficiente para manter na cabeça.

## Passo 1. Inicie o live mode

A partir do seu harness, execute:

```
/impeccable live
```

A skill inicia um pequeno servidor helper local na porta 8400 e injeta uma tag `<script>` no seu arquivo de entrada do dev que carrega o picker. Se seu projeto tem uma Content Security Policy restrita, a primeira execução detecta e oferece um patch único, apenas para desenvolvimento, para `script-src` e `connect-src`. Aceite o patch: ele é protegido por `NODE_ENV === "development"` e você pode reverter a qualquer momento.

Abra a URL do seu dev server (não a porta 8400, que é o servidor helper, não o app). Você verá uma pill escura na parte inferior da página com **Pick** destacado.

## Passo 2. Selecione um elemento

<div class="docs-viz-step">
  <div class="docs-viz-picker-row">
    <div class="docs-viz-picker-target">
      <span class="docs-viz-picker-pin">1</span>
      Newsletter signup
      <span class="docs-viz-picker-note">mais lúdico</span>
    </div>
  </div>
</div>

Clique no elemento que você quer iterar. Um contorno de seleção aparece ao redor dele, e uma barra de contexto leve surge ao lado da seleção com um chip de comando à esquerda e um campo de texto livre.

Algumas coisas que você pode fazer antes de apertar Go:

- **Clique no chip de comando** (o default é `impeccable`, a ação livre). Escolha uma ação específica como `bolder`, `delight`, `layout`, ou `typeset` para restringir as variantes a uma dimensão.
- **Digite no campo livre.** "Mais lúdico." "Menos SaaS." "Parecer uma newsletter de uma revista."
- **Fixe um comentário** clicando em qualquer lugar do elemento selecionado. A posição do pino importa: um comentário perto do título é sobre o título, não sobre o elemento inteiro.
- **Desenhe um traço** arrastando sobre o elemento. Loop fechado = "esta parte importa." Seta = direção. X = "delete isto." A skill lê traços pela forma, não pelo conteúdo de pixels.

Quando o brief parecer claro, aperte **Go**.

## Passo 3. Navegue pelas três variantes

<div class="docs-viz-step">
  <div class="docs-viz-variants">
    <div class="docs-viz-variant docs-viz-variant--v1">
      <span class="docs-viz-variant-badge">1 / 3</span>
      <span class="docs-viz-variant-kicker">No. 04</span>
      <p class="docs-viz-variant-title">Letters, <em>occasionally</em>.</p>
      <span class="docs-viz-variant-btn">Send me one</span>
    </div>
    <div class="docs-viz-variant docs-viz-variant--v2 is-active">
      <span class="docs-viz-variant-badge">2 / 3</span>
      <span class="docs-viz-variant-kicker">Dispatch</span>
      <p class="docs-viz-variant-title">Design notes, <br>every other<br>Thursday.</p>
      <span class="docs-viz-variant-btn">Join →</span>
    </div>
    <div class="docs-viz-variant docs-viz-variant--v3">
      <span class="docs-viz-variant-badge">3 / 3</span>
      <span class="docs-viz-variant-kicker">Field Notes</span>
      <p class="docs-viz-variant-title">A monthly letter, for people who still read email.</p>
      <span class="docs-viz-variant-btn">Receive ✺</span>
    </div>
  </div>
</div>

Você verá um spinner ("Generating variants...") e em poucos segundos, três variantes são trocadas em tempo real na página no lugar. Não é uma preview, é o DOM real renderizado no seu dev server real com seu contexto real.

Use as teclas de seta (ou os botões anterior / próximo na barra de contexto) para navegar entre elas. Um contador no canto superior direito mostra `1 / 3`, `2 / 3`, `3 / 3`.

As três variantes são desenhadas para serem **genuinamente diferentes**, não três variações de uma ideia. Variantes livres se ancoram em três arquétipos de design diferentes (cabeçalho broadsheet, pôster com glifos oversized, linhas de spec estilo catálogo, etc.). Variantes de ação específica variam na dimensão que a ação nomeia: `colorize` dá três famílias de hue, `animate` dá três vocabulários de motion, `layout` dá três arranjos estruturais.

Se duas variantes parecem que rimam, esse é o modo de falha do "squint test" da skill. Você pode dizer ao picker "tente de novo, as três pareceram parecidas demais" e receber um novo conjunto.

## Passo 4. Aceite uma

<div class="docs-viz-step" style="text-align:center">
  <span class="docs-viz-accept-pill">Variant 2 written to source</span>
</div>

Quando encontrar a que você gosta, clique em **Accept** na barra de contexto (ou pressione Enter). Três coisas acontecem:

1. O elemento selecionado é substituído pela variante aceita na página.
2. A variante é escrita de volta no código-fonte: o mesmo arquivo em que o picker foi injetado, ou o código-fonte do componente se o live detectou um arquivo gerado durante o passo 1.
3. Se o accept tocou CSS, as regras relevantes são consolidadas na stylesheet real do seu projeto, não deixadas inline.

Descarte as três (pressione Escape) e o original permanece. Sem rastros, sem leftovers comentados.

## Passo 5. Pare o live mode

Quando terminar de iterar, pare o helper:

- Diga **"stop live mode"** no chat do seu harness, ou
- Clique no **×** na pill do picker, ou
- Feche a aba do navegador: o helper detecta a conexão encerrada após oito segundos e sai limpo.

O stop também remove a tag `<script>` do seu arquivo de entrada do dev e para o servidor helper na porta 8400.

## O que tentar a seguir

- Execute `/impeccable live` em uma página diferente após uma passada de `/impeccable polish` para fazer A/B da versão polida contra duas direções adicionais.
- Combine com [crítica com o overlay](/tutorials/critique-with-overlay): execute critique primeiro, corrija problemas prioritários, depois use live para explorar redireções no elemento que critique sinalizou.
- Use `/impeccable craft` quando quiser o fluxo de shape-then-build (uma funcionalidade nova de ponta a ponta, não um único elemento).

## Problemas comuns

- **O picker nunca aparece na página.** Ou o helper não iniciou (procure erros no terminal) ou CSP está bloqueando a injeção. Re-execute `/impeccable live` e deixe re-verificar o CSP. Se você recusou o patch na primeira execução, delete a linha `cspChecked` em `.impeccable/live/config.json` e re-execute.
- **"element lives in a generated file"** ao apertar Go. O live detectou que o elemento selecionado está em um output compilado, não em um arquivo fonte. Ele roteia o accept por um caminho de fallback para que a variante ainda chegue ao código-fonte real. Siga a dica; não force o accept no arquivo gerado.
- **Variantes não parecem alinhadas com a marca.** Verifique se `PRODUCT.md` e `DESIGN.md` existem na raiz do projeto. Sem eles, o live tende para defaults genéricos. Execute `/impeccable teach` e `/impeccable document` primeiro.
- **A porta do helper está em uso.** Outra sessão de live deixou seu servidor rodando. `npx impeccable live stop` libera a porta.
