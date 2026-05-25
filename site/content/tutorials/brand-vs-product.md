---
title: Brand vs product, escolha um register
tagline: "Dois mundos, dois conjuntos de defaults. Escolha o certo e cada comando downstream se beneficia."
order: 3
description: "O Impeccable trata trabalho de brand (landing pages, campanhas, portfólios) e trabalho de product (app UI, dashboards, ferramentas) como mundos diferentes com defaults diferentes. Aprenda como escolher um register e como isso molda cada comando que o lê."
---

## Veja a divergência

Mesmo elemento, um register cada. Uma inscrição de newsletter, duas vezes.

<div class="docs-viz-hero docs-viz-hero--plain">
  <div class="docs-viz-register">
    <div class="docs-viz-register-side">
      <div class="docs-viz-register-label">
        <span class="docs-viz-register-name">Brand</span>
        <span class="docs-viz-register-lane">Editorial-magazine</span>
      </div>
      <div class="docs-viz-register-frame docs-viz-register-frame--brand">
        <span class="docs-viz-reg-kicker">No. 04 &nbsp;·&nbsp; Dispatch</span>
        <h3 class="docs-viz-reg-title">Letters, occasionally.</h3>
        <p class="docs-viz-reg-body">A postcard from the editor, once a month. No tracking pixels, no "just checking in."</p>
        <span class="docs-viz-reg-btn">Send me one</span>
      </div>
      <div class="docs-viz-register-notes">
        <span>Serif display, peso italic de display</span>
        <span>Imerso no hue primário</span>
        <span>Kicker monospaced, voz editorial</span>
      </div>
    </div>
    <div class="docs-viz-register-side">
      <div class="docs-viz-register-label">
        <span class="docs-viz-register-name">Product</span>
        <span class="docs-viz-register-lane">Utilidade / app shell</span>
      </div>
      <div class="docs-viz-register-frame docs-viz-register-frame--product">
        <span class="docs-viz-reg-kicker">Newsletter</span>
        <h3 class="docs-viz-reg-title">Subscribe to updates</h3>
        <p class="docs-viz-reg-body">Product changes and release notes, once a month. Unsubscribe at any time.</p>
        <span class="docs-viz-reg-btn">Subscribe</span>
      </div>
      <div class="docs-viz-register-notes">
        <span>Sans neutro, semibold para hierarquia</span>
        <span>Paleta contida, acento apenas em estado</span>
        <span>Copy curto, escaneável, legível no mobile</span>
      </div>
    </div>
  </div>
  <p class="docs-viz-caption">A tabela abaixo lista o que é diferente. É assim que parece no pixel.</p>
</div>

## Por que register importa

Cada tarefa de design pertence a um de dois mundos:

- **Brand** é onde o design É o produto. Sites de marketing, landing pages, portfólios, conteúdo de formato longo, superfícies de campanha. Distinção é a medida. Fontes, motion, densidade e cor todas empurram para "isso não parece com nada mais na categoria."
- **Product** é onde o design SERVE ao produto. App UI, admin, dashboards, ferramentas. Familiaridade conquistada é a medida. Usuários fluentes do Linear, Figma, Notion, Raycast ou Stripe devem confiar no output à primeira vista.

Se você pedir à mesma IA para desenhar um dashboard e uma página de campanha sem nomear qual mundo, você vai receber a média dos dois. Superfícies de brand vão parecer cuidadosas demais. Superfícies de product vão parecer preciosas demais. Register é como o Impeccable evita isso.

O Impeccable rastreia register como um único campo em `PRODUCT.md`:

```markdown
## Register

product
```

É isso: um valor simples, `brand` ou `product`. Cada comando que faz trabalho register-sensitivo (`typeset`, `animate`, `colorize`, `layout`, `bolder`, `quieter`, `delight`) carrega um arquivo de referência diferente baseado no que encontra aqui.

## Como os dois mundos divergem

Esta não é uma lista exaustiva, a divergência completa está nos arquivos de referência `brand.md` e `product.md`, mas o formato da diferença:

| Dimensão | Brand | Product |
|---|---|---|
| **Pistas tipográficas** | Editorial-magazine, luxury, brutalist, consumer-warm, tech-minimal, todas disponíveis. Varie. | Conjunto mais restrito: sans neutro + mono opcional, dimensionado para leitura densa, tipo fluido reservado para superfícies de marketing. |
| **Motion** | Entradas coreografadas, sequências scroll-driven, momentos decorativos ganham seu lugar. | Contido. Apenas mudanças de estado. Animação serve feedback, não atmosfera. |
| **Cor** | Paleta completa, Committed ou Drenched estão na mesa. | Contido por padrão. Acentos carregam significado; cor não é decoração. |
| **Densidade** | O que a narrativa quiser. Espaço em branco generoso ou colunas divididas por linhas densas, ambos válidos. | Confortável a denso. Cada pixel ganha seu lugar. |
| **Referências** | Do mundo real, da pista certa. *Páginas de espécime do Klim* ou *Cabeçalho broadsheet*, não "SaaS moderno". | Melhor-ferramenta da categoria. *Linear*, *Figma*, *Notion*, *Raycast*, *Stripe*. |

O mesmo comando, `/impeccable typeset`, puxa de fonts diferentes nos dois mundos. O mesmo comando, `/impeccable animate`, escolhe vocabulários de motion diferentes. O mesmo comando, `/impeccable layout`, assume defaults de densidade diferentes. Você não reaprende o comando: responde a pergunta de register uma vez, e o comando se adapta.

## Passo 1. Decida ou herde

Se você ainda não executou `/impeccable teach`, execute agora. A primeira pergunta é sobre register:

```
/impeccable teach
```

Teach escaneia seu codebase primeiro e forma uma hipótese: rotas como `/`, `/pricing`, `/blog`, seções hero, conteúdo scroll-driven apontam para brand. Rotas como `/app`, `/dashboard`, `/settings`, formulários e tabelas apontam para product. Ele começa com a hipótese em vez de começar do zero:

> Pelo codebase, isso parece uma superfície de produto, isso corresponde à sua intenção, ou devemos tratar de forma diferente?

Se o projeto genuinamente abrange ambos (um produto com uma grande landing de marketing), teach pergunta qual register descreve a **superfície primária**. Register é por projeto, não por página, mas você pode sobrescrever por tarefa quando necessário.

## Passo 2. Verifique se o register foi registrado

Abra `PRODUCT.md` e procure pela seção `## Register`. Ela deve conter um valor simples, não prosa:

```markdown
## Register

brand
```

Se a seção está faltando (você está num `PRODUCT.md` mais antigo, pré-v3.0), re-execute `/impeccable teach`. Ele vai detectar a lacuna e adicionar o campo sem te re-entrevistar sobre todo o resto.

## Passo 3. Sobrescreva por tarefa quando precisar

Na maioria das vezes, register é definido uma vez e esquecido. Mas um projeto de product pode ocasionalmente precisar de uma única superfície de brand (uma landing de lançamento, um one-pager para investidores) sem virar o projeto inteiro.

Você tem duas opções:

- **Nomeie no brief.** "`/impeccable craft a launch landing for v2, brand register for this one page.`" A skill honra a sobrescrita apenas para aquela tarefa.
- **Defina um register por superfície.** Se a sobrescrita é duradoura, adicione uma nota curta em `PRODUCT.md` sob uma seção explícita: `## Register overrides: /launch is brand.` Comandos que leem PRODUCT.md vão respeitar.

## O que tentar a seguir

- Execute um comando que é register-sensitivo e observe a divergência: `/impeccable typeset the pricing page` em um projeto de product vs. um projeto de brand vai escolher famílias de tipos diferentes, razões de escala diferentes e pairings diferentes.
- Combine com [primeiros passos](/tutorials/getting-started) se você ainda não instalou o Impeccable.
- Use `/impeccable document` após teach para capturar o lado visual (cores, componentes) no DESIGN.md.

## Problemas comuns

- **Register continua escorregando para o lado errado.** Se você definiu `product` mas comandos continuam produzindo output com sensação de brand, verifique se `PRODUCT.md` está na raiz do projeto e a seção `## Register` tem um valor simples (sem prosa, sem explicação, apenas a palavra). Comandos só podem ler o que está lá.
- **A hipótese que teach formou está errada.** Discorda na resposta. Teach está perguntando, não afirmando.
- **Um projeto é genuinamente 50/50.** Escolha a superfície primária, depois use sobrescritas por tarefa para a minoritária. Tentar fazer a média dos dois no PRODUCT.md produz resultados piores do que se comprometer com um.
