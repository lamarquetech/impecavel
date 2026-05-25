---
tagline: "A passada final meticulosa entre bom e ótimo."
---

## Quando usar

`/impeccable polish` é a última coisa que você executa antes de fazer deploy. Ele caça os pequenos detalhes que separam uma funcionalidade entregue de uma polida: desalinhamentos de meio pixel, espaçamento inconsistente, estados de foco esquecidos, transições de carregamento que piscam, copy que deriva em tom. Ele também alinha a funcionalidade com seu design system, substituindo valores hard-coded por tokens, trocando componentes customizados por compartilhados, e corrigindo qualquer deriva dos padrões estabelecidos.

Use quando a funcionalidade está funcionalmente completa, nada está quebrado, e algo ainda parece esquisito. Também use quando uma funcionalidade derivou do design system e precisa ser trazida de volta à linha.

## Como funciona

Polish começa descobrindo o design system (tokens, escala de espaçamento, componentes compartilhados), e então trabalha metodicamente em seis dimensões:

1. **Alinhamento visual e espaçamento**: aderência pixel-perfect ao grid, escala de espaçamento consistente, alinhamento óptico em ícones.
2. **Tipografia**: consistência de hierarquia, comprimento de linha, viúvas e órfãs, kerning em headlines.
3. **Cor e contraste**: uso de tokens, paridade de tema, razões WCAG, indicadores de foco.
4. **Estados de interação**: hover, focus, active, disabled, loading, error, success. Cada estado contabilizado.
5. **Transições e motion**: easing suave, sem layout jank, respeito a `prefers-reduced-motion`.
6. **Copy**: voz consistente, tempo verbal correto, sem strings placeholder, sem TODOs perdidos.

A skill é explícita sobre uma coisa: polish é o último passo, não o primeiro. Se a funcionalidade não está funcionalmente completa, polir é trabalho desperdiçado.

## Experimente

```
/impeccable polish the pricing page
```

Uma execução saudável se parece com:

```
Visual alignment: fixed 3 off-grid elements (8px baseline)
Typography: tightened h1 kerning, fixed widow on testimonial
Interaction: added hover state on FAQ items, focus ring on email input
Motion: softened modal entrance, added reduced-motion fallback
Copy: removed one "Lorem ipsum" stray, aligned button voice
```

Cinco pequenas correções, sem reescritas. Esse é o formato de uma boa passada de polish.

## Armadilhas

- **Polir trabalho que não está pronto.** Se há TODOs no código, você não está pronto. Execute `/impeccable polish` apenas em funcionalidades finalizadas.
- **Tratar polish como redesign.** Polish refine o que existe. Se você se pegar rearquitetando um layout, você precisava de `/impeccable critique` ou `/impeccable layout`.
- **Executar `/impeccable polish` sem `/impeccable audit` antes.** Polish captura problemas baseados em sensação. Audit captura os mensuráveis. Use ambos.
