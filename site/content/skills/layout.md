---
tagline: "Conserte layout, espaçamento e ritmo visual."
---

## Quando usar

`/impeccable layout` é para páginas onde nada está tecnicamente errado, mas nada está respirando também. Padding igual em todo lugar, grids de cards monótonos, conteúdo que vai de borda a borda, hierarquia que depende apenas de tamanho. Use quando um layout "parece esquisito" e você não consegue articular o porquê.

Bons gatilhos: "tudo parece apertado", "lê como um bloco de texto", "não sei onde olhar primeiro".

## Como funciona

A skill percorre cinco dimensões de layout:

1. **Espaçamento**: a escala de espaçamento é consistente ou há gaps aleatórios de 13px, elementos relacionados estão agrupados com espaçamento generoso entre grupos, existe algum ritmo.
2. **Hierarquia visual**: o olho pousa na ação primária em 2 segundos, a hierarquia está fazendo trabalho real ou tudo está gritando.
3. **Grid e estrutura**: existe um grid subjacente ou o layout é aleatório, os elementos estão alinhados a baselines.
4. **Ritmo**: a página alterna entre espaçamento apertado e generoso, ou tudo é uniforme.
5. **Densidade**: o layout está comprimido ou desperdiçado, a densidade corresponde ao tipo de conteúdo.

Correções geralmente envolvem reconstruir a escala de espaçamento, introduzir assimetria, colapsar grids monótonos em um layout misto com hero e elementos de suporte, e dar espaço real à ação primária.

## Experimente

```
/impeccable layout the settings page
```

Mudanças típicas:

- Escala de espaçamento unificada para 8 / 16 / 24 / 48 / 96px
- Quebras de seção a 48px, gaps de linhas a 16px, grupos de campos de formulário a 8px
- Ações primárias removidas do fluxo do formulário com buffer de 32px
- Bordas decorativas removidas, substituídas por agrupamento baseado em espaçamento
- Proporções da sidebar e coluna principal rebalanceadas (280 / flex vs 25 / 75)

## Armadilhas

- **Confundir arrange com distill.** Se o problema é coisas demais, execute `/impeccable distill` primeiro. Layout é para arranjar o que já é o conjunto certo.
- **Esperar que resgate um grid quebrado.** Se a página não tem grid nenhum, arrange vai construir um. Apenas saiba que o diff vai ser maior do que você espera.
- **Ignorar o veredito de hierarquia.** Se arrange diz "nada é primário", nenhum trabalho de espaçamento conserta isso. Você precisa de uma decisão de conteúdo, não de um ajuste de layout.
