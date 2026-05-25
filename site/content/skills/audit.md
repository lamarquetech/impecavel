---
tagline: "Verificação de qualidade técnica em cinco dimensões com severidade P0 a P3."
---

<div class="docs-viz-hero">
  <div class="docs-viz-report">
    <div class="docs-viz-report-head">
      <div>
        <div class="docs-viz-report-title">/impeccable audit the checkout flow</div>
        <div class="docs-viz-report-target">src/checkout/**</div>
      </div>
      <div class="docs-viz-report-score">
        <span class="docs-viz-report-score-num">2.6</span>
        <span class="docs-viz-report-score-out">/ 4</span>
      </div>
    </div>
    <div class="docs-viz-report-dims">
      <div class="docs-viz-report-dim">
        <span class="docs-viz-report-dim-name">Accessibility</span>
        <span class="docs-viz-report-dim-bar"><span class="docs-viz-report-dim-fill docs-viz-report-dim-fill--fail" style="width:50%"></span></span>
        <span class="docs-viz-report-dim-score">2 / 4</span>
      </div>
      <div class="docs-viz-report-dim">
        <span class="docs-viz-report-dim-name">Performance</span>
        <span class="docs-viz-report-dim-bar"><span class="docs-viz-report-dim-fill" style="width:75%"></span></span>
        <span class="docs-viz-report-dim-score">3 / 4</span>
      </div>
      <div class="docs-viz-report-dim">
        <span class="docs-viz-report-dim-name">Theming</span>
        <span class="docs-viz-report-dim-bar"><span class="docs-viz-report-dim-fill docs-viz-report-dim-fill--warn" style="width:62%"></span></span>
        <span class="docs-viz-report-dim-score">2.5 / 4</span>
      </div>
      <div class="docs-viz-report-dim">
        <span class="docs-viz-report-dim-name">Responsive</span>
        <span class="docs-viz-report-dim-bar"><span class="docs-viz-report-dim-fill" style="width:75%"></span></span>
        <span class="docs-viz-report-dim-score">3 / 4</span>
      </div>
      <div class="docs-viz-report-dim">
        <span class="docs-viz-report-dim-name">Anti-patterns</span>
        <span class="docs-viz-report-dim-bar"><span class="docs-viz-report-dim-fill docs-viz-report-dim-fill--warn" style="width:70%"></span></span>
        <span class="docs-viz-report-dim-score">2.8 / 4</span>
      </div>
    </div>
    <div class="docs-viz-report-issues">
      <span class="docs-viz-report-sev docs-viz-report-sev--p0">P0<span class="docs-viz-report-sev-n">2</span></span>
      <span class="docs-viz-report-sev docs-viz-report-sev--p1">P1<span class="docs-viz-report-sev-n">5</span></span>
      <span class="docs-viz-report-sev docs-viz-report-sev--p2">P2<span class="docs-viz-report-sev-n">8</span></span>
      <span class="docs-viz-report-sev docs-viz-report-sev--p3">P3<span class="docs-viz-report-sev-n">14</span></span>
    </div>
  </div>
  <p class="docs-viz-caption">Cinco dimensões pontuadas de 0 a 4, cada achado etiquetado de P0 (bloqueia release) a P3 (polish). Audit documenta; não conserta. Encaminhe os achados para <code>/impeccable harden</code>, <code>/impeccable polish</code>, ou <code>/impeccable optimize</code>.</p>
</div>

## Quando usar

`/impeccable audit` é o equivalente técnico de `/impeccable critique`. Onde `/impeccable critique` pergunta "isso parece certo", `/impeccable audit` pergunta "isso resiste". Ele executa verificações de acessibilidade, performance, theming, design responsivo e anti-patterns contra a implementação, pontua cada dimensão de 0 a 4, e produz um plano com classificações de severidade P0 a P3.

Use antes de fazer deploy, durante uma sprint de qualidade, ou quando um tech lead diz "devíamos realmente olhar a acessibilidade".

## Como funciona

A skill escaneia seu código em cinco dimensões:

1. **Accessibility**: contraste WCAG, ARIA, navegação por teclado, HTML semântico, labels de formulário.
2. **Performance**: layout thrashing, animações custosas, lazy loading ausente, peso do bundle.
3. **Theming**: cores hard-coded, cobertura de dark mode, consistência de tokens.
4. **Responsive**: comportamento em breakpoints, touch targets, tratamento de viewport mobile.
5. **Anti-patterns**: as mesmas 25 verificações determinísticas que o detector executa.

Cada dimensão recebe uma pontuação de 0 a 4. Cada achado recebe uma severidade: P0 bloqueia a release, P1 deve ser corrigido nesta sprint, P2 é para o próximo ciclo, P3 é polish. Você recebe um único documento que pode colar em um tracker de tickets.

Audit não conserta nada. Ele documenta. Encaminhe os achados para `/impeccable polish`, `/impeccable harden`, ou `/impeccable optimize` dependendo da categoria.

## Experimente

```
/impeccable audit the checkout flow
```

Saída esperada:

```
Accessibility: 2/4 (partial)
  P0: Missing form labels on 4 inputs
  P1: Contrast 3.1:1 on disabled button state
  P2: No visible focus indicator on custom dropdown

Performance: 3/4 (good)
  P1: Hero image not lazy-loaded (340KB)
  ...
```

Encaminhe os P0s para `/impeccable harden`, os P1s de theming e tipografia para `/impeccable typeset` e `/impeccable polish`, o resto para `/impeccable polish`.

## Armadilhas

- **Confundir com `/impeccable critique`.** Audit é qualidade de implementação. Critique é qualidade de design. Execute ambos para um quadro completo.
- **Corrigir P3s antes de P0s.** A escala de severidade existe por um motivo. Comece do topo.
- **Pular as dimensões que você acha que estão bem.** Theming e responsive são as que a maioria das pessoas assume que estão bem até descobrir que não estão.
