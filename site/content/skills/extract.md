---
tagline: "Extraia componentes, tokens e padrões reutilizáveis para o design system."
---

<div class="docs-viz-hero">
  <div class="docs-viz-flow">
    <div class="docs-viz-flow-step">
      <span class="docs-viz-flow-num">01</span>
      <span class="docs-viz-flow-name">Discover drift</span>
      <span class="docs-viz-flow-hint">Valores hex repetidos, variantes de botão, escalas de espaçamento, estilos de texto.</span>
    </div>
    <div class="docs-viz-flow-step">
      <span class="docs-viz-flow-num">02</span>
      <span class="docs-viz-flow-name">Propose primitives</span>
      <span class="docs-viz-flow-hint">Nomes de tokens, APIs de componentes com variant + size, estilos de texto.</span>
    </div>
    <div class="docs-viz-flow-step docs-viz-flow-step--accent">
      <span class="docs-viz-flow-num">03</span>
      <span class="docs-viz-flow-name">Migrate call sites</span>
      <span class="docs-viz-flow-hint">Substituir CSS duplicado com as novas primitivas. Sem código órfão deixado para trás.</span>
    </div>
  </div>
  <p class="docs-viz-caption">A skill só extrai o que é usado três ou mais vezes com a mesma intenção. Dois usos não são um padrão, e a migração sempre acontece na mesma passada.</p>
</div>

## Quando usar

`/impeccable extract` é para o momento em que seu codebase acidentalmente se tornou um design system. Estilos de botão repetidos em 12 lugares. Três variantes do mesmo card. Cores hex espalhadas por todo lado. Espaçamento feito à mão que acidentalmente coincide com uma escala. Use quando quiser consolidar essa deriva em primitivas reutilizáveis.

Use depois que um produto já foi publicado com funcionalidades suficientes para revelar os padrões. Extração prematura cria abstrações que não correspondem à realidade.

## Como funciona

A skill descobre a estrutura do design system primeiro, e então identifica oportunidades de extração:

1. **Tokens**: encontrar valores literais repetidos (cores, espaçamento, radii, sombras, font sizes). Propor nomes de tokens, adicionar ao sistema de tokens, substituir usos.
2. **Componentes**: encontrar padrões de UI que se repetem com variação menor (botões, cards, inputs, modals). Extrair em um único componente com variantes, migrar callers.
3. **Padrões de composição**: encontrar padrões de layout ou interação que se repetem (fileiras de formulário, grupos de toolbar, empty states). Extrair em primitivas de composição.
4. **Estilos de texto**: encontrar combinações repetidas de font-size + weight + line-height. Extrair em estilos de texto.
5. **Padrões de animação**: encontrar combinações repetidas de easing, duration ou keyframes. Extrair em motion tokens.

A skill é cautelosa. Ela só extrai coisas usadas três ou mais vezes, com a mesma intenção. Nunca extrai "porque pode ser reutilizado depois". Abstração prematura é pior que duplicação.

## Experimente

```
/impeccable extract the button styles
```

Saída esperada:

- Encontradas 14 instâncias de botão em 8 arquivos
- 4 variantes distintas: primary (filled accent), secondary (bordered), ghost (text-only), destructive (filled red)
- Todas as 4 variantes usam a mesma escala de tamanho (small, default, large)
- Extraído em `<Button variant="primary" size="default">` com estilos baseados em tokens
- Migrados 14 call sites, removidas ~180 linhas de CSS duplicado
- Adicionados 3 tokens faltantes: `--button-radius`, `--button-padding-y`, `--button-padding-x`

## Armadilhas

- **Extrair muito cedo.** Dois usos não são um padrão. Três podem ser. Espere até que o padrão seja óbvio.
- **Generalizar demais.** O componente extraído deve corresponder de perto aos casos de uso atuais, não antecipar todos os possíveis futuros. Você sempre pode adicionar variantes depois.
- **Esquecer a migração.** Extração sem migração deixa o código duplicado antigo por aí e cria uma terceira forma de fazer a mesma coisa. Sempre migre na mesma passada.
- **Extrair coisas que diferem em intenção.** Dois botões que parecem similares mas servem propósitos diferentes (ação primária vs link estilizado como botão) provavelmente devem permanecer separados.
