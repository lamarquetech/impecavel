---
tagline: "Motion com propósito que comunica estado, não decoração."
---

## Quando usar

`/impeccable animate` é para interfaces que parecem sem vida, onde mudanças de estado são instantâneas e bruscas, onde o carregamento simplesmente aparece, onde o usuário nunca confia plenamente que seu clique foi registrado. Use para adicionar os pequenos movimentos que comunicam o que está acontecendo: entradas, saídas, feedback, transições entre estados.

Não use para adicionar bounces ou elastic springs por causa de energia. Isso é decoração, e esta skill não vai te dar isso.

## Como funciona

A skill identifica momentos estáticos que se beneficiariam de motion, e então os aplica com disciplina rigorosa:

1. **Entradas e saídas**: elementos aparecem e saem com fades de 200 a 300ms mais subtle Y ou scale, nunca propriedades de layout.
2. **Feedback de estado**: hover, active, focus, loading, success comunicam via motion em vez de trocas súbitas.
3. **Transições entre views**: shared-element transitions onde faz sentido, fade-through caso contrário.
4. **Progresso e carregamento**: skeleton screens, barras determinadas, motion que diz "ainda trabalhando".
5. **Motion reduzida**: toda animação tem um fallback `prefers-reduced-motion`.

Easing é sempre exponencial (ease-out-quart, quint, ou expo) porque objetos reais desaceleram suavemente. Sem bounce, sem elastic, sem linear para nada exceto indicadores de progresso.

A skill anima apenas `transform` e `opacity`. Se você se encontrar animando `width`, `height`, `top`, ou `left`, está fazendo a coisa errada. Use `grid-template-rows` para transições de altura.

## Experimente

```
/impeccable animate the sign-up flow
```

Adições típicas:

- Input de email ganha um glow de foco em focus-visible (opacity + shadow, 180ms)
- Botão de submit mostra um spinner dentro de si no estado de loading, não um spinner separado ao lado
- Tela de sucesso entra com opacity + translateY(8px), 260ms, ease-out-quart
- Mensagem de erro desliza para baixo com grid-template-rows (não height), 220ms
- `@media (prefers-reduced-motion: reduce)` fallback para toda transição

## Armadilhas

- **Pedir "mais animação".** Animate não é um dial. Ele adiciona onde o motion comunica, não em todo lugar.
- **Remover os fallbacks de reduced-motion.** A skill os adiciona automaticamente. Inegociável para acessibilidade.
