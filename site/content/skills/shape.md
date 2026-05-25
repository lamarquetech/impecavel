---
tagline: "Pense antes de construir. Produza um brief de design através de discovery, não adivinhação."
---

<div class="docs-viz-hero">
  <div class="docs-viz-file">
    <div class="docs-viz-file-header">
      <span class="docs-viz-file-name">brief.md</span>
      <span class="docs-viz-file-status">Saída de /impeccable shape</span>
    </div>
    <div class="docs-viz-file-body">
      <div class="docs-viz-file-row">
        <span class="docs-viz-file-k">Purpose</span>
        <span class="docs-viz-file-v">Permitir que assinantes comprometidos mudem o que recebem sem perdê-los para o unsubscribe.</span>
      </div>
      <div class="docs-viz-file-row">
        <span class="docs-viz-file-k">User</span>
        <span class="docs-viz-file-v">Apressado, no mobile, no meio de uma reunião. Lendo rápido, pouca paciência.</span>
      </div>
      <div class="docs-viz-file-row">
        <span class="docs-viz-file-k">Content</span>
        <span class="docs-viz-file-v">4 tipos de digest, 2 cadências, um opt-out-total no final.</span>
      </div>
      <div class="docs-viz-file-row">
        <span class="docs-viz-file-k">Feeling</span>
        <span class="docs-viz-file-v">Calmo, confiável, sem dark patterns.</span>
      </div>
      <div class="docs-viz-file-row">
        <span class="docs-viz-file-k">Constraints</span>
        <span class="docs-viz-file-v">Mobile-first. Contraste WCAG AA. Uma coluna, sem modals.</span>
      </div>
    </div>
    <div class="docs-viz-file-footer">Entregue para <code>/impeccable</code>, <code>/impeccable craft</code>, ou qualquer fluxo de implementação.</div>
  </div>
  <p class="docs-viz-caption">Um brief do shape é uma bússola, não uma especificação. Ele captura intenção, não UI. Skills de implementação o leem antes de escrever uma linha de código.</p>
</div>

## Quando usar

`/impeccable shape` é onde uma funcionalidade começa. Antes de alguém escrever código, antes de alguém discutir o tratamento do hero, antes de alguém escolher uma fonte. Use para forçar uma conversa de discovery sobre propósito, usuários, conteúdo e restrições, e então capturar as respostas como um brief de design que as skills de implementação podem usar.

Use sempre que uma funcionalidade está prestes a começar, um ticket é vago, ou você se pegar escrevendo JSX para descobrir o que o produto deveria ser.

## Como funciona

A maioria das UIs geradas por IA falha não por código ruim, mas por pensamento pulado. O modelo pula para "aqui está um grid de cards" sem perguntar "o que o usuário está tentando realizar". `/impeccable shape` inverte essa ordem.

A skill executa uma entrevista de discovery estruturada em conversa. Ela não vai escrever código durante esta fase. As perguntas cobrem:

- **Propósito e contexto**: para que é a funcionalidade, quem usa, em que estado mental estão
- **Conteúdo e dados**: o que é exibido, faixas realistas, edge cases, o que é dinâmico
- **Objetivos de design**: a coisa mais importante, o sentimento pretendido, exemplos de referência
- **Restrições**: técnicas, de conteúdo, de acessibilidade, de localização

Você responde naturalmente. A skill faz follow-ups, não é um formulário. No final ela produz um brief de design: um artefato estruturado que você pode entregar a `/impeccable` ou qualquer outra skill de implementação.

Nota: se você quer o fluxo completo (entrevista de discovery, e depois direto para a construção), use `/impeccable craft`. Ele executa `/impeccable shape` internamente, e depois continua para implementação com iteração visual. `/impeccable shape` standalone é para quando você quer apenas o brief, para levá-lo à abordagem de implementação que preferir.

## Experimente

```
/impeccable shape a daily digest email preferences page
```

Espere uma conversa de 5 a 10 perguntas. A skill pergunta coisas como "quem é a pessoa abrindo isso, e ela já está comprometida ou ainda curiosa" e "o que acontece quando o usuário desinscreveu de tudo, escondemos a funcionalidade ou mostramos algo". Você responde, e um brief se materializa.

De lá você pode entregar o brief a `/impeccable`, `/impeccable polish`, ou qualquer outra skill. Ou apenas usá-lo como referência enquanto constrói manualmente.

## Armadilhas

- **Pular porque parece lento.** A entrevista são talvez 5 minutos. As reescritas que você evita são medidas em horas.
- **Tratar o brief como especificação.** É uma bússola, não um checklist. Captura intenção, não UI.
- **Responder com "padrão" ou "normal".** Especificidade é o ponto inteiro. Se um usuário está "apressado, no mobile, entre reuniões", diga isso. Isso muda tudo downstream.
