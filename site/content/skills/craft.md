---
tagline: "Molde o design e depois construa, tudo em um único fluxo."
---

<div class="docs-viz-hero">
  <div class="docs-viz-flow">
    <div class="docs-viz-flow-step">
      <span class="docs-viz-flow-num">01</span>
      <span class="docs-viz-flow-name">Shape</span>
      <span class="docs-viz-flow-hint">Entrevista de discovery. Propósito, usuários, restrições, direção.</span>
    </div>
    <div class="docs-viz-flow-step">
      <span class="docs-viz-flow-num">02</span>
      <span class="docs-viz-flow-name">Load references</span>
      <span class="docs-viz-flow-hint">Espacial, tipografia, motion, cor, interação.</span>
    </div>
    <div class="docs-viz-flow-step">
      <span class="docs-viz-flow-num">03</span>
      <span class="docs-viz-flow-name">Build</span>
      <span class="docs-viz-flow-hint">Estrutura, hierarquia, tipo, cor, estados, motion, responsivo.</span>
    </div>
    <div class="docs-viz-flow-step docs-viz-flow-step--accent">
      <span class="docs-viz-flow-num">04</span>
      <span class="docs-viz-flow-name">Iterate visually</span>
      <span class="docs-viz-flow-hint">Verifique no navegador, refine até combinar com o brief.</span>
    </div>
  </div>
  <p class="docs-viz-caption">Cada fase é obrigatória. A etapa de discovery é onde a maioria das saídas de IA falha: quando o código existe, o pensamento já está travado.</p>
</div>

## Quando usar

`/impeccable craft` é o comando de build de ponta a ponta. Dê uma descrição de funcionalidade e ele executa o pipeline inteiro: discovery estruturado, carregamento de referências, implementação, iteração visual. Use quando está começando uma nova funcionalidade do zero e quer o fluxo completo em uma única invocação.

Use quando:

- **Você está construindo uma nova funcionalidade e quer o fluxo completo.** Você não quer gerenciar os passos manualmente.
- **Você sabe o que está construindo, mas não como deve parecer.** A fase de discovery força o pensamento de design antes que a implementação o trave.
- **Você quer iteração visual por padrão.** `craft` verifica o resultado em um navegador e refina até que o polimento seja alto, em vez de entregar a primeira versão funcional.

Se você quer apenas o pensamento sem o código, use `/impeccable shape` standalone. Se você já tem uma visão clara e quer apenas construir, chame `/impeccable` diretamente com sua descrição de funcionalidade. `craft` fica no meio: estruturado, completo, opinativo.

## Como funciona

`craft` executa quatro fases em ordem:

1. **Molde o design.** Executa `/impeccable shape` internamente: uma breve conversa de discovery sobre propósito, usuários, conteúdo, restrições e objetivos. A saída é um brief de design que você pode ler e questionar.
2. **Carregue referências.** Com base no brief, puxa os arquivos de referência corretos (espacial, tipografia, motion, cor, interação, responsivo, UX writing) para que o modelo tenha os princípios relevantes carregados antes de começar a codificar.
3. **Construa.** Implementa a funcionalidade em uma ordem deliberada: estrutura primeiro, depois espaçamento e hierarquia, depois tipo e cor, depois estados, depois motion, depois responsivo. Cada decisão remete ao brief.
4. **Iteração visual.** Abre o resultado em um navegador, verifica contra o brief e o catálogo de anti-patterns, e refine até que corresponda à intenção. Esta etapa é crítica. A primeira versão funcional nunca é a versão entregue.

A fase de discovery é obrigatória e esse é o ponto. A maioria das UIs geradas por IA falha porque ninguém perguntou o que o usuário estava tentando realizar antes que o modelo começasse a escrever JSX. `craft` inverte isso.

## Experimente

```
/impeccable craft a pricing page for a developer tool
```

Espere uma entrevista de discovery de 5 a 10 perguntas primeiro. Perguntas sobre seu público, a personalidade do produto, o tom emocional desejado, anti-referências e restrições. Depois um brief de design. Depois implementação, com o navegador verificado em cada etapa. Espere múltiplas rodadas de iteração na fase de polimento visual.

A execução inteira é mais longa que um comando típico porque inclui o pensamento, a construção e o refinamento. Esse é o compromisso: mais estrutura upfront, menos retrabalho depois.

## Armadilhas

- **Usar para mudanças pequenas.** `craft` é para novas funcionalidades, não retoques. Para código existente, use `/impeccable polish`, `/impeccable critique`, ou um comando de refinamento específico.
- **Apressar a fase de discovery.** A entrevista parece lenta comparada com "começar a codificar logo". Não é. Responder as perguntas com cuidado produz um brief mais afiado, que produz um build mais afiado, que produz menos reescritas.
- **Pular a iteração visual.** A fase existe por um motivo. A distância entre "tecnicamente funciona" e "parece certo" é fechada com polimento visual, não com code review. Deixe rodar.
