---
tagline: "A inteligência de design por trás de cada comando."
---

## Quando usar

`/impeccable` é o comando principal. Chame diretamente quando quiser trabalho de design livre com o guia completo carregado, sem escolher um comando especializado. É o fallback para quando nenhum dos 23 especialistas (`audit`, `polish`, `critique` e o resto) mapeia claramente no que você está tentando fazer.

Use `/impeccable` diretamente quando:

- **Você não tem certeza de qual comando se encaixa.** Descreva o que quer em português simples e deixe a skill escolher a abordagem certa.
- **O trabalho abrange múltiplas disciplinas.** "Refazer esta seção hero" toca layout, tipo, cor e motion. Um comando não pode abraçar isso.
- **Você quer a inteligência de design completa sem restrições.** Todo arquivo de referência carregado, todo anti-pattern verificado, sem workflow pré-definido.

Para fluxos estruturados, use os comandos especializados na barra lateral. Execute `/impeccable teach` primeiro em qualquer projeto novo para estabelecer PRODUCT.md e DESIGN.md. `/impeccable craft` encadeia uma entrevista de discovery em um build completo com iteração visual ao vivo. `/impeccable shape` produz um brief de design sem tocar em código. `/impeccable live` dá a você um picker no navegador com três variantes por elemento. Os comandos de avaliação e refinamento (`audit`, `critique`, `polish`, `typeset`, `layout`, `colorize` e o resto) cada um cuida de uma fatia específica do trabalho.

## Como funciona

A maioria das UIs geradas por IA falha da mesma forma: fonts genéricas, gradientes roxos, grids de cards sobre grids de cards, glassmorphism por toda parte. `/impeccable` dá à sua IA um ponto de vista forte. Ele carrega um handbook de design opinativo mais uma longa lista de anti-patterns, e então empurra o modelo a se comprometer com uma direção estética específica antes de escrever uma única linha de código.

Dois arquivos na raiz do seu projeto moldam tudo o que a skill faz:

- **`PRODUCT.md`** carrega register (brand vs product), usuários-alvo, personalidade da marca, anti-referências, princípios de design. Responde "quem, o quê, por quê".
- **`DESIGN.md`** carrega cores, tipografia, elevação, componentes, do's e don'ts, no formato de seis seções do Google Stitch. Responde "como parece".

Cada comando lê ambos os arquivos antes de gerar. **Register** decide quais defaults carregar. Brand (marketing, landing, portfólio, onde o design É o produto) e product (app UI, dashboards, ferramentas, onde o design SERVE ao produto) têm defaults diferentes para tipo, motion, cor e densidade. Especificar isso uma vez no PRODUCT.md significa que `/impeccable typeset` não vai empurrar fonts de revista editorial em um dashboard, e não vai empurrar defaults product-fluent em uma página de campanha. Veja o [tutorial brand vs product](/tutorials/brand-vs-product) para como os dois divergem.

No primeiro uso em um projeto, a skill executa o fluxo `teach` automaticamente: uma breve entrevista que escreve PRODUCT.md e depois delega para `/impeccable document` para DESIGN.md. Comandos futuros leem os arquivos sem perguntar novamente.

## Experimente

```
/impeccable redo this hero section
```

```
/impeccable build me a pricing page for a developer tool
```

Ambos os prompts são vagos de propósito. `/impeccable` vai escolher uma direção estética forte consistente com seu register, comprometer-se com fonts não-padrão, evitar a paleta de cores da IA, e fazer o tipo de escolhas específicas que um designer faria. Sem nome de comando para escolher primeiro, sem workflow passo a passo para seguir.

Para iteração visual no navegador em vez de chat:

```
/impeccable live
```

Selecione qualquer elemento no seu dev server em execução. Deixe um comentário ou traço. Receba três variantes de qualidade de produção trocadas em tempo real via HMR. Aceite a que quiser e ela é escrita de volta no código-fonte.

## Fixe comandos de volta como atalhos

v3.0 consolidou 18 skills standalone em um único `/impeccable` com 23 sub-comandos. Se você sente falta da forma curta de um comando específico, fixe-o de volta:

```
/impeccable pin critique
```

A partir de agora, `/critique` invoca `/impeccable critique` diretamente. Ele escreve uma skill de redirecionamento leve que delega ao pai, então atualiza na skill fluem sem precisar re-fixar.

Pins úteis para experimentar:

- `/impeccable pin polish` para trabalho de passada final
- `/impeccable pin audit` para verificações determinísticas de a11y/perf
- `/impeccable pin live` para o fluxo de iteração no navegador
- `/impeccable pin critique` para review de design

Para remover: `/impeccable unpin critique`. Pins existem como diretórios prefixados com `i-` na pasta de skills do seu harness (`.claude/skills/i-critique/`, `.cursor/skills/i-critique/`, etc.), então você também pode deletá-los manualmente.

## Armadilhas

- **Tratar como style guide.** É um parceiro de design opinativo, não um linter. Os defaults existem para elevar o piso, não para sobrepor seu julgamento. Se você tem um motivo real para contestar (guideline de marca, restrição de acessibilidade, pesquisa de usuário), conteste e explique por quê. A skill vai trabalhar com você. O que produz resultados piores é ignorar a opinião sem um motivo.
- **Esperar que conserte código existente.** `/impeccable` é para criação. Para refinamento, use `/impeccable polish`, `/impeccable distill`, ou `/impeccable critique`.
- **Executar antes que `teach` tenha tido chance de salvar contexto.** Em um projeto novo ele vai te entrevistar no meio da execução, o que é aceitável mas mais lento. Executar `/impeccable teach` explicitamente como seu primeiro comando é um pouco mais suave.
- **Pular a pergunta de register.** Os defaults de brand e product divergem o suficiente que executar no register errado produz saída sutilmente inadequada. Se `PRODUCT.md` não tem o campo `## Register` (legado), execute `/impeccable teach` para adicioná-lo.
