---
tagline: "Itere na UI no navegador. Selecione um elemento, deixe um comentário, receba três variantes. Aceite uma e ela é escrita no código-fonte."
---

<div class="docs-live-callout">
  <span class="docs-live-callout-icon" aria-hidden="true">▸</span>
  <span class="docs-live-callout-text">Veja em ação, com a demonstração animada, em <a href="/live-mode">/live-mode</a>. Esta página é a referência do que o seu AI harness lê quando o comando é executado.</span>
</div>

<div class="docs-live-callout">
  <span class="docs-live-callout-icon" aria-hidden="true">▸</span>
  <span class="docs-live-callout-text"><strong>Status: alpha.</strong> O Live Mode funciona de ponta a ponta e está pronto para testar, mas ainda precisa de mais testes com repositórios reais e configurações de frameworks. Espere arestas ásperas em configurações incomuns, e por favor relate o que quebrar.</span>
</div>

<div class="docs-viz-hero docs-viz-hero--plain">
  <div class="docs-viz-live-frame">
    <div class="docs-viz-live-chrome">
      <span class="docs-viz-live-dot"></span>
      <span class="docs-viz-live-dot"></span>
      <span class="docs-viz-live-dot"></span>
      <span class="docs-viz-live-url">localhost:3000</span>
    </div>
    <div class="docs-viz-live-stage docs-viz-live-stage--tall">
      <div class="docs-viz-live-target">
        <span class="docs-viz-live-kicker">No. 04</span>
        <h3 class="docs-viz-live-title">Letters, <em>occasionally</em>.</h3>
        <p class="docs-viz-live-body">A postcard from the editor, about once a month. No tracking pixels, no "just checking in."</p>
        <button class="docs-viz-live-btn" type="button">Send me one</button>
      </div>
      <div class="docs-viz-live-outline" aria-hidden="true"></div>
      <div class="docs-viz-live-ctx" aria-hidden="true">
        <button class="docs-viz-live-ctx-nav" type="button" aria-label="Previous">‹</button>
        <span class="docs-viz-live-ctx-counter">2 / 3</span>
        <button class="docs-viz-live-ctx-nav" type="button" aria-label="Next">›</button>
        <span class="docs-viz-live-ctx-divider"></span>
        <button class="docs-viz-live-ctx-accept" type="button">Accept</button>
      </div>
      <div class="docs-viz-live-gbar" aria-hidden="true">
        <span class="docs-viz-live-gbar-brand">/</span>
        <span class="docs-viz-live-gbar-btn is-active">Pick</span>
        <span class="docs-viz-live-gbar-divider"></span>
        <span class="docs-viz-live-gbar-x">✕</span>
      </div>
    </div>
  </div>
  <p class="docs-viz-caption">Live Mode no meio de um ciclo: o picker destaca o elemento escolhido, a barra de contexto mostra em qual variante você está, e a barra global fica fixada na parte inferior. Aceitar esta escreve a Variante 2 de volta no código-fonte.</p>
</div>

## Quando usar

Use `/impeccable live` quando quiser iterar em algo visualmente da mesma forma que faria em uma ferramenta de design, mas mantendo o código de produção como saída. O fluxo tipo canvas do Figma sem o vaivém até uma etapa de implementação.

Use para:

- **Explorar direções em um elemento real.** Uma seção hero, um card de newsletter, um tier de preços. Três propostas genuinamente diferentes, lado a lado, na página real com o contexto real.
- **Polir uma peça de UI que está quase certa.** Você sabe o que parece errado, mas não consegue explicar exatamente. Selecione o elemento, escreva "mais lúdico" ou risque a parte que incomoda, e clique em Go.
- **Um teste A/B rápido entre duas direções que sua equipe está debatendo.** Gere variantes, não aceite nenhuma, e siga em frente. O ponto era a comparação.

NÃO é para novos recursos greenfield (use `/impeccable craft`) ou redesejos de página inteira (use `/impeccable` ou um comando de refinamento especializado).

## Como funciona

Um comando abre um overlay de seleção sobre o seu dev server em execução. Você seleciona qualquer elemento. Uma pequena barra de contexto aparece ao lado dele. Digite uma descrição livre ou selecione um dos chips de ação (`bolder`, `quieter`, `distill`, `polish`, `typeset`, `colorize`, `layout`, `animate`, `delight`, `overdrive`). Opcionalmente, fixe comentários ou desenhe traços diretamente no elemento primeiro, e a skill interpreta isso como intenção.

Clique em Go. Três **variantes de qualidade de produção** são geradas, cada uma ancorada em um arquétipo de design genuinamente diferente (não três variações de cor) e trocadas em tempo real na página via HMR do seu framework. Navegue entre elas com as teclas de seta. Aceite uma e a variante é escrita de volta no código-fonte. Descarte as três e o original permanece.

Suporta Vite, Next.js (incluindo monorepos), SvelteKit, Astro, Nuxt e HTML estático simples. Se o seu dev server tem uma Content Security Policy restrita, a configuração inicial detecta e oferece um patch único, apenas para desenvolvimento, para que o picker possa carregar. `DESIGN.md` prevalece em decisões visuais, `PRODUCT.md` prevalece em tom de voz: se você tem ambos, as variantes permanecem on-brand sem precisar ser instruídas.

## Experimente

```
/impeccable live
```

Abra a URL do seu dev server, selecione o card de inscrição da newsletter, clique no chip `delight`, e aperte Go. Você receberá três variantes que variam em dimensões de personalidade (uma sensação de carimbo e cartão-postal, uma versão de surpresa tipográfica, uma com acento ilustrado), não três variações do mesmo tratamento.

Ou selecione um hero, digite "mais editorial, menos SaaS", e aperte Go. As três variantes se ancoram em diferentes arquétipos editoriais (cabeçalho de jornal broadsheet, linhas de especificação estilo catálogo, pôster com glifos oversized) em vez de três tons da mesma ideia.

Pare o live mode quando terminar: diga "stop live mode", feche a aba, ou clique no botão de sair na barra do picker.

## Armadilhas

- **Executar em uma página que ainda está pela metade.** A geração de variantes do live precisa de contexto. Se o elemento tem texto placeholder, Lorem ipsum genérico, ou formatação padrão sem stylesheet, as variantes refletirão isso. Preencha o conteúdo primeiro.
- **Esperar que ele tome decisões macro.** O live mode itera em um único elemento selecionado. Para "refazer a página de preços inteira", use `/impeccable` ou `/impeccable craft`.
- **Ignorar as mensagens de fallback.** Se o elemento está em um arquivo gerado (um template compilado, um output de build), o picker diz isso explicitamente e oferece rotear o accept para o código-fonte real. Não force o accept no arquivo gerado: o próximo build vai apagá-lo.
- **Executar sem PRODUCT.md ou DESIGN.md quando a adequação à marca importa.** O live ainda vai gerar, mas as variantes tenderão para defaults genéricos. Execute `/impeccable teach` e `/impeccable document` primeiro se o resultado precisa soar como o seu produto.
