---
title: Primeiros passos
tagline: "Do zero à sua primeira passada de polish em cinco minutos."
order: 1
description: "Instale o Impeccable, execute /impeccable teach uma vez para estabelecer o contexto do projeto, e execute /impeccable polish em algo que já existe. O caminho mais rápido para ver o que o Impeccable muda sobre design gerado por IA."
---

## O que você vai construir

Você vai terminar este tutorial com o Impeccable instalado no seu projeto, um par `PRODUCT.md` + `DESIGN.md` que captura sua marca, público e sistema visual, e uma página polida manualmente que passou por uma passada de polish. Tempo total: cerca de dez minutos.

## Pré-requisitos

- Um harness de codificação por IA: Claude Code, Cursor, Gemini CLI, Codex CLI, ou qualquer outra ferramenta suportada.
- Um projeto com pelo menos um arquivo HTML ou componente que você quer melhorar. Uma landing page recém-criada via scaffold funciona bem.

## Como o Impeccable funciona

O Impeccable instala como uma única agent skill chamada `impeccable`. Você acessa todos os 23 sub-comandos através dela:

```
/impeccable <command> <target>
```

Por exemplo: `/impeccable polish the pricing page`, ou `/impeccable audit the checkout`. Digite `/impeccable` sozinho para ver a lista completa.

Se você usa um comando com frequência, fixe-o com `/impeccable pin <command>` para criar um atalho standalone (por exemplo, `/impeccable pin audit` dá a você `/audit` diretamente).

## Passo 1. Instale

A partir da raiz do seu projeto, execute:

```
npx skills add pbakaus/impeccable
```

Isso auto-detecta seu harness e escreve os arquivos da skill no local correto (ex.: `.claude/skills/`, `.cursor/skills/`). Recarregue seu harness e digite `/`. Você deverá ver `/impeccable` no autocomplete. Digite-o e a dica de argumentos da skill vai mostrar todos os comandos disponíveis.

## Passo 2. Ensine o Impeccable sobre seu projeto

Este é o passo mais importante. Design sem contexto produz saída genérica. O comando `/impeccable teach` executa uma breve entrevista de discovery e escreve um arquivo `PRODUCT.md` na raiz do seu projeto.

Execute:

```
/impeccable teach
```

A primeira pergunta é sobre **register**: esta é uma superfície de brand (site de marketing, landing page, portfólio, onde o design É o produto) ou uma superfície de product (app UI, dashboard, ferramentas, onde o design SERVE ao produto)? Register molda cada default subsequente, de pistas tipográficas a energia de motion. Veja [brand vs product](/tutorials/brand-vs-product) para como os dois divergem. Teach vai formar uma hipótese a partir do seu codebase e pedir confirmação, em vez de começar do zero.

Depois um punhado de perguntas mais curtas:

- **Para quem é este produto?** Seja específico. Não "usuários" mas "founders solo avaliando uma nova ferramenta no celular entre reuniões".
- **Qual é a voz da marca em três palavras?** Escolha palavras reais. "Acolhedor e mecânico e opinativo" é melhor que "moderno e limpo".
- **Algumas referências visuais?** Marcas nomeadas, produtos ou objetos impressos, não adjetivos. "Páginas de espécime do Klim Type Foundry", não "técnico e limpo".
- **Anti-referências?** Coisas que o produto explicitamente não deve parecer, igualmente nomeadas.

Responda com suas próprias palavras. A skill escreve `PRODUCT.md` com as respostas. Cada execução futura de comando o lê automaticamente.

Abra `PRODUCT.md` e leia o que foi escrito. Edite qualquer coisa que não pareça certa. O arquivo é seu.

## Passo 2.5. Capture o sistema visual

No final de `/impeccable teach`, a skill oferece executar `/impeccable document` para você. Diga sim. Ele escaneia seus tokens (CSS custom properties, configuração Tailwind, temas CSS-in-JS), extrai cores e tipografia, faz uma pergunta agrupada para as partes que precisam de input criativo (uma Creative North Star, nomes descritivos de cores), e escreve um `DESIGN.md` que segue o [formato Google Stitch DESIGN.md](https://stitch.withgoogle.com/docs/design-md/format/).

Em um projeto novo sem tokens ainda, document roda em modo seed: cinco perguntas rápidas sobre estratégia de cor, direção de tipo e energia de motion, e escreve um scaffold que você pode atualizar assim que houver código.

`PRODUCT.md` carrega estratégia (quem, o quê, por quê). `DESIGN.md` carrega visuais (cores, tipografia, componentes). Cada comando lê ambos antes de gerar.

## Passo 3. Polir algo

Escolha uma página que já existe. Uma página sobre, uma tela de configurações, uma tabela de preços, qualquer coisa. Execute:

```
/impeccable polish the pricing page
```

A skill vai percorrer alinhamento, espaçamento, tipografia, cor, estados de interação, transições e copy. Ela faz correções direcionadas, não uma reescrita. Espere um punhado de diffs pequenos que juntos elevam a página de "pronta" para "bem feita".

Uma passada de polish típica se parece com:

```
Visual alignment: fixed 3 off-grid elements
Typography: tightened h1 kerning, fixed widow on feature list
Color: replaced one hardcoded hex with --color-accent token
Interaction: added missing hover state on FAQ items
Motion: softened modal entrance to 220ms ease-out-quart
Copy: removed stray 'Lorem' placeholder
```

Revise o diff. Se algo não parece certo, peça ao modelo para explicar a mudança. Se ainda não parece certo, reverta. O Impeccable é opinativo mas não infalível.

## O que tentar a seguir

- [Itere visualmente com Live Mode](/tutorials/iterate-live) abre um picker no navegador no seu dev server, gera três variantes de qualidade de produção por elemento, e escreve a aceita de volta no código-fonte.
- `/impeccable critique the landing page` executa uma review de design completa com pontuação, testes de persona e detecção automatizada. É a melhor forma de encontrar o que corrigir a seguir.
- `/impeccable audit the checkout` executa verificações de acessibilidade, performance, theming, responsivo e anti-patterns contra a implementação. Útil antes de fazer deploy.
- `/impeccable craft a pricing page for enterprise customers` executa o fluxo completo de shape-then-build em uma funcionalidade nova.
- **Fixe seus favoritos.** Se você recorre constantemente a um comando, `/impeccable pin audit` faz `/audit` funcionar como atalho standalone sem reverter a consolidação.
- `/impeccable redo this hero section` também funciona. Qualquer descrição após `/impeccable` aplica os princípios de design à tarefa.

## Problemas comuns

- **A skill diz "no design context found"**. Você pulou o passo 2. Execute `/impeccable teach` primeiro.
- **Comandos não aparecem no harness**. Recarregue o harness após instalar. Se ainda não aparecem, verifique se o instalador escreveu arquivos no local esperado (`.claude/skills/`, `.cursor/skills/`, etc.) e se seu harness está lendo aquele diretório.
- **A passada de polish reescreveu algo que você gostava**. Diga isso. Reverta a mudança, diga ao modelo qual edição específica desfazer, e continue a partir daí.
