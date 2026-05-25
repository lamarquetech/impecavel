---
tagline: "Adicione cor estratégica a interfaces monocromáticas sem ficar berrante."
---

## Quando usar

`/impeccable colorize` é o contrapeso para "tudo é cinza". Dashboards que leem como uma parede bege, formulários sem acento, páginas de conteúdo que poderiam ser de qualquer produto SaaS. Use quando a interface é funcional mas emocionalmente plana, e você quer calor sem cair na paleta de cores da IA (roxo-para-rosa, neon ciano, glow no dark mode).

## Como funciona

A skill começa lendo sua cor de marca se existir uma, e então decide onde a cor ganha seu lugar:

1. **Ação primária** ganha a expressão mais forte do hue da marca.
2. **Acentos secundários** ganham variantes abafadas ou tinted, não uma segunda cor cheia.
3. **Neutros** são tinted em direção ao hue da marca em chroma baixo (cerca de 0.005 a 0.01), que é quase invisível por pixel mas cria coesão subconsciente.
4. **Categorias de conteúdo** ganham um sistema de acentos limitado e intencional, não um arco-íris.

Importante, ela usa OKLCH em vez de HSL para que passos de lightness iguais pareçam iguais. Conforme a lightness se move para os extremos, a chroma cai automaticamente. É assim que você obtém cor que parece considerada em vez de computada.

## Experimente

```
/impeccable colorize the dashboard
```

Diff esperado:

- Cor de marca movida de um hex hardcoded para `--color-accent: oklch(62% 0.18 240)`
- Neutros tinted com 0.007 chroma em direção ao hue da marca
- Botão primário recebe o acento cheio, botões secundários recebem ink/mist
- Série do chart usa 3 hues distintos, todos em lightness equiparada para que nenhuma série domine visualmente
- Ilustração do empty state recebe um lavado suave de acento

## Armadilhas

- **Executar sem um hue de marca.** Colorize precisa de um ponto de partida. Se `PRODUCT.md` não especifica um, ele vai perguntar. Não deixe escolher dos defaults da paleta de cores da IA.
- **Esperar que resolva o problema da paleta de cores da IA.** Se seu design já tem gradientes roxos e neon ciano, você precisa de `/impeccable quieter` primeiro, depois colorize pode reconstruir.
- **Usar em interfaces já coloridas.** Isso é trabalho para `/impeccable quieter`. Colorize adiciona, não subtrai.
