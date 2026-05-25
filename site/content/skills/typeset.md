---
tagline: "Conserte tipografia que parece genérica, inconsistente ou acidental."
---

## Quando usar

Use `/impeccable typeset` quando o texto em uma página parece tipografia default em vez de tipografia desenhada. Hierarquia confusa, três tamanhos que parecem iguais, body copy a 14px, uma font display que na verdade é apenas Inter bold, headlines sem atenção ao kerning.

Gatilhos comuns: "hierarquia parece plana", "legibilidade está esquisita", "fonts parecem genéricas".

## Como funciona

A skill avalia tipografia em cinco dimensões:

1. **Escolhas de fontes**: você está usando defaults invisíveis (Inter, Roboto, Arial, Open Sans), a typeface combina com a marca, há mais de 2 a 3 famílias.
2. **Hierarquia**: heading, body e caption são claramente diferentes à primeira vista, o contraste de tamanho é pelo menos 1.25x entre passos, os contrastes de peso são legíveis.
3. **Dimensionamento e escala**: existe uma escala de tipos coerente, o body text atende ao mínimo de 16px, a escala é fixed-rem para app UIs ou fluid-clamp para páginas de marketing.
4. **Legibilidade**: comprimento de linha de 45 a 75 caracteres, line-height ajustado para a fonte e contexto, contraste.
5. **Consistência**: o mesmo elemento usa o mesmo tratamento em todo lugar, sem overrides de font-size isolados.

Ela então corrige o que encontra: escolhe typefaces distintas, constrói uma escala modular, amplia o contraste de hierarquia, define comprimento de linha e entrelinha adequados.

## Experimente

```
/impeccable typeset the article layout
```

Diff esperado:

- Font display trocada de Inter 700 para uma face display real
- Escala de tipos reconstruída: 3rem / 2rem / 1.25rem / 1rem / 0.875rem, razão 1.333
- Body text aumentado de 14px para 16px
- Comprimento de linha limitado a 68ch na coluna do artigo
- Line-height 1.6 para body, 1.1 para display
- Removidos quatro valores de `font-size` isolados espalhados nos estilos de componentes

## Armadilhas

- **Pedir uma nova fonte sem contexto.** Typeset vai escolher com base na voz da marca do `PRODUCT.md`. Se você não executou `/impeccable teach`, a sugestão será genérica.
- **Recorrer a typeset quando o problema é layout.** Se os parágrafos estão finos mas a página parece apertada, você quer `/impeccable layout`.
- **Esperar escalas fluid clamp em app UIs.** Typeset usa escalas fixas em rem para interfaces de app. Tipografia fluida é para páginas de marketing e conteúdo onde o comprimento de linha varia dramaticamente.
