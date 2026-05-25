---
title: Crítica com o overlay visual
tagline: "Use /impeccable critique mais o overlay do navegador para revisar uma página ao vivo com ground truth."
order: 4
description: "Execute uma crítica de design completa que combina avaliação por LLM, o detector automatizado e um overlay de navegador ao vivo para que você possa ver exatamente quais elementos disparam quais anti-patterns na página que está olhando."
---

## O que você vai construir

Você vai executar uma crítica de design completa contra uma página ao vivo no seu navegador, com cada anti-pattern sinalizado destacado diretamente no elemento que o causou. Sem screenshots, sem adivinhação, sem parágrafo de achados que você precisa mapear de volta ao código.

Tempo total: cerca de dez minutos.

## Pré-requisitos

- Impeccable instalado no seu projeto (veja [primeiros passos](/tutorials/getting-started) se ainda não instalou).
- Um harness com automação de navegador disponível (Claude Code com a extensão Chrome, ou similar).
- Uma página que você quer criticar, seja local (`localhost:3000/pricing`) ou publicada.

## Passo 1. Execute /impeccable critique

A partir do seu harness, execute:

```
/impeccable critique the pricing page at localhost:3000/pricing
```

A skill inicia duas avaliações independentes em paralelo. Elas rodam em sub-agentes separados para que uma não viése a outra.

### O que a avaliação por LLM faz

A primeira avaliação lê seu código-fonte e, se automação de navegador está disponível, abre a página ao vivo em uma nova aba. Ela percorre o catálogo completo de DO/DON'T da skill impeccable e pontua a página contra as 10 heurísticas de Nielsen, o checklist de carga cognitiva de 8 itens e a adequação à marca do seu `PRODUCT.md`.

Ela rotula a aba que abre com `[LLM]` no título para que você possa distinguir qual é qual.

### O que o detector automatizado faz

A segunda avaliação executa `npx impeccable detect` contra a página. Isso é determinístico: cerca de trinta verificações de padrão específico que disparam ou não disparam. Texto com gradiente, paletas roxas, bordas side-tab, cards aninhados, problemas de comprimento de linha, contraste baixo, body text minúsculo e o resto. O [catálogo completo](/anti-patterns) lista cada regra e qual camada (CLI, navegador ou apenas LLM) a captura.

Você recebe de volta uma lista JSON de cada achado com seu seletor de elemento, a regra que disparou e uma breve descrição.

## Passo 2. Abra o overlay visual

O Impeccable vem com um modo visual que destaca cada anti-pattern detectado diretamente na página. Aqui está como fica rodando em uma landing page synthwave deliberadamente ruim:

<div class="tutorial-embed">
  <div class="tutorial-embed-header">
    <span class="tutorial-embed-dot red"></span>
    <span class="tutorial-embed-dot yellow"></span>
    <span class="tutorial-embed-dot green"></span>
    <span class="tutorial-embed-title">Live detection overlay</span>
  </div>
  <iframe src="/antipattern-examples/visual-mode-demo.html" class="tutorial-embed-iframe" loading="lazy" title="Impeccable visual overlay rodando em uma página de demo"></iframe>
</div>

Cada elemento delineado tem um label flutuante nomeando a regra que disparou. Passe o mouse sobre um delineamento para ver o achado completo. Isso é exatamente o que você verá na sua própria página.

Você tem duas formas de abrir:

1. **[Extensão Chrome](https://chromewebstore.google.com/detail/impeccable/bdkgmiklpdmaojlpflclinlofgjfpabf)**: ativação com um clique em qualquer página. Clique no ícone do Impeccable na toolbar e cada anti-pattern é destacado instantaneamente.
2. **Dentro de `/impeccable critique`**: a skill abre uma aba de navegador rotulada `[Human]` com o detector ativo durante a parte de navegador da avaliação. Você não precisa fazer nada extra.

Para este tutorial, a opção mais fácil é a extensão Chrome. Instale, navegue até sua página de preços e clique no ícone do Impeccable. Você verá o overlay aparecer imediatamente na página ao vivo.

## Passo 3. Mescle as duas avaliações

De volta ao seu harness, `/impeccable critique` terminou e produziu um relatório combinado. Ele se parece com algo assim:

```
AI slop verdict: FAIL
  Detected tells: gradient-text (2), ai-color-palette (1),
                  nested-cards (1), side-tab (3)

Heuristic scores (avg 2.8/4):
  Visibility of status: 3 (good)
  Match between system and real world: 2 (partial)
  Consistency and standards: 2 (partial)
  ...

Cognitive load: 3/8 failures (moderate)
  Visible options at primary decision: 6 (flag)
  Decision points stacked at top: yes (flag)
  Progressive disclosure: absent on advanced pricing toggles

What's working:
  - Clear price hierarchy
  - Strong headline

Priority issues:
  1. Hero uses gradient text on the main price
     Why: AI tell, reduces contrast, hurts scannability
     Fix: solid ink color at one weight heavier
  2. Feature comparison table has 4 nested card levels
     Why: visual noise, unclear hierarchy
     Fix: flatten to a table with zebra striping

Questions to answer:
  - Is the free tier a real product or a funnel?
  - What does a user feel when they land here from an ad vs from search?
```

## Passo 4. Corrija os achados

O relatório dá a você uma lista de prioridades. Você pode trabalhar nelas uma de cada vez, pedir ao modelo para corrigir tudo de uma vez, ou qualquer coisa entre os dois. O que importa é usar o overlay para verificar:

1. Mantenha o overlay aberto em uma aba.
2. Faça correções no código (ou peça ao modelo para corrigir tudo).
3. Recarregue. O overlay re-escaneia e achados resolvidos desaparecem.

Este loop de feedback é a razão pela qual o overlay importa. Você vê correções acontecerem em tempo real, e nunca faz deploy de uma "correção" que não satisfez a regra de verdade.

## Passo 5. Re-execute quando terminar

Depois de trabalhar pela lista de prioridades, execute `/impeccable critique` novamente. O objetivo é um AI slop verdict limpo e pelo menos uma média de 3.5 nas heurísticas. Carga cognitiva deve estar abaixo de 2 falhas.

Se algo ainda dispara, corrija ou escreva um comentário de supressão explicando por que a regra não se aplica ao seu contexto (o detector respeita um pequeno conjunto de pragmas de opt-out, mas use-os com moderação).

## O que tentar a seguir

- [Itere nos achados da crítica com Live Mode](/tutorials/iterate-live). Selecione o elemento que critique sinalizou, deixe um comentário, receba três redireções trocadas em tempo real, e escreva a aceita de volta no código-fonte.
- `/impeccable audit the same page` para capturar os problemas de implementação que critique não cobre (acessibilidade, performance, theming).
- `/impeccable polish` se o relatório de critique está limpo e você quer a passada de refinamento final.
- `/impeccable distill` se critique sinalizou "muito ocupado" ou "carga cognitiva". Distill remove o que não deveria estar lá.

## Problemas comuns

- **O overlay mostra nenhum achado mas critique diz que há problemas**. O detector captura padrões determinísticos. Critique captura julgamentos. São complementares, não redundantes.
- **A avaliação por LLM e o detector discordam**. Isso é normal. O LLM é subjetivo. O detector é determinístico. Quando discordam, olhe ambos e tome uma decisão.
- **O overlay quebra o layout da página**. Raro, mas algum CSS pode interagir com os estilos do overlay injetado. Use a [extensão Chrome](https://chromewebstore.google.com/detail/impeccable/bdkgmiklpdmaojlpflclinlofgjfpabf) para a experiência mais confiável, ou execute `npx impeccable detect` via CLI e aplique os achados manualmente.
