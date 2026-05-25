---
tagline: "Uma review de design com pontuação, testes de persona e detecção automatizada."
---

<div class="docs-viz-hero">
  <div class="docs-viz-critique">
    <div class="docs-viz-critique-head">
      <div class="docs-viz-critique-verdict">
        <span class="docs-viz-critique-verdict-label">AI slop verdict</span>
        <span class="docs-viz-critique-verdict-value">FAIL</span>
      </div>
      <span class="docs-viz-report-target">gradient-text &middot; ai-color-palette &middot; nested-cards</span>
    </div>
    <div class="docs-viz-critique-cols">
      <div>
        <div class="docs-viz-critique-col-title">Heurísticas (Nielsen)</div>
        <div class="docs-viz-critique-heuristics">
          <div class="docs-viz-critique-heur">
            <span>Visibility of status</span>
            <span class="docs-viz-critique-heur-score docs-viz-critique-heur-score--good">3</span>
          </div>
          <div class="docs-viz-critique-heur">
            <span>Match with real world</span>
            <span class="docs-viz-critique-heur-score docs-viz-critique-heur-score--ok">2</span>
          </div>
          <div class="docs-viz-critique-heur">
            <span>Consistency & standards</span>
            <span class="docs-viz-critique-heur-score docs-viz-critique-heur-score--ok">2</span>
          </div>
          <div class="docs-viz-critique-heur">
            <span>Error prevention</span>
            <span class="docs-viz-critique-heur-score docs-viz-critique-heur-score--good">3</span>
          </div>
          <div class="docs-viz-critique-heur">
            <span>Recognition over recall</span>
            <span class="docs-viz-critique-heur-score docs-viz-critique-heur-score--bad">1</span>
          </div>
        </div>
      </div>
      <div>
        <div class="docs-viz-critique-col-title">Personas</div>
        <div class="docs-viz-critique-personas">
          <div class="docs-viz-critique-persona">
            <div>
              <span class="docs-viz-critique-persona-name">O avaliador</span>
              <span class="docs-viz-critique-persona-note">Comparando-nos com duas alternativas numa terça à noite.</span>
            </div>
            <span class="docs-viz-critique-persona-score">2 / 4</span>
          </div>
          <div class="docs-viz-critique-persona">
            <div>
              <span class="docs-viz-critique-persona-name">O usuário recorrente</span>
              <span class="docs-viz-critique-persona-note">Conhece o produto, no mobile, com pressa.</span>
            </div>
            <span class="docs-viz-critique-persona-score">3 / 4</span>
          </div>
          <div class="docs-viz-critique-persona">
            <div>
              <span class="docs-viz-critique-persona-name">O cético</span>
              <span class="docs-viz-critique-persona-note">Já viu todo SaaS landing e está entediado.</span>
            </div>
            <span class="docs-viz-critique-persona-score">1 / 4</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p class="docs-viz-caption">As duas passadas (review de design por LLM mais o detector determinístico) se fundem em uma lista priorizada. O que está funcionando, o que consertar, e as perguntas provocativas que valem a pena responder antes de fazer deploy.</p>
</div>

## Quando usar

Use `/impeccable critique` quando quiser uma segunda opinião honesta sobre algo que já construiu. Não "funciona" mas "é bom de verdade". A skill pontua sua interface contra as 10 heurísticas de Nielsen, executa verificações de carga cognitiva, testa através de lentes de persona, e referência-cruzada um detector automatizado para 25 anti-patterns concretos.

Use quando uma página está funcionalmente pronta e você quer saber se ela parece intencional ou AI slop.

## Como funciona

`/impeccable critique` executa duas avaliações independentes em paralelo para que uma não viése a outra.

A primeira é uma **review de design por LLM**: o modelo lê seu código-fonte, inspeciona visualmente a página ao vivo se automação de navegador está disponível, e percorre o catálogo completo de DO/DON'T da skill impeccable. Pontua as heurísticas de Nielsen, conta falhas de carga cognitiva, traça a jornada emocional através do fluxo, e sinaliza AI slop.

A segunda é um **detector automatizado** (`npx impeccable detect`) que deterministicamente encontra texto com gradiente, paletas roxas, bordas side-tab, cards aninhados, problemas de comprimento de linha e as outras impressões digitais visíveis de output genérico de IA.

Os dois relatórios se fundem em uma lista priorizada: o que está funcionando, as três a cinco coisas que precisam de correção, e as perguntas provocativas que valem a pena responder antes de fazer deploy.

## Experimente

Aponte para uma página:

```
/impeccable critique the homepage hero
```

Você recebe um relatório pontuado. Formato típico:

- **AI slop verdict**: pass / fail com as marcas específicas
- **Pontuações heurísticas**: 10 números, 0 a 4
- **Carga cognitiva**: contagem de falhas de 8
- **Problemas prioritários**: três a cinco itens, cada um com o quê, por quê e correção
- **Perguntas a responder**: as que a interface por si só não pode decidir por você

A partir daí, combine com `/impeccable polish` ou `/impeccable distill` para agir nas correções.

## Armadilhas

- **Executar em trabalho incompleto.** Critique é para páginas finalizadas. Um empty state com três TODOs vai pontuar mal porque não está pronto, não porque é ruim.
- **Ignorar as perguntas no final.** Elas geralmente são as correções que mais mudam o design.
- **Tratar as pontuações heurísticas como nota.** São diagnósticas, não avaliativas. Um 3/4 numa heurística que importa menos para seu contexto está bem.
