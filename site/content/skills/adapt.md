---
tagline: "Faça designs funcionarem em diferentes telas, dispositivos e contextos sem amputar funcionalidades."
---

## Quando usar

`/impeccable adapt` é para pegar um design construído para um contexto e fazê-lo funcionar em outro. Mobile a partir do desktop, tablet a partir do mobile, impressão a partir da web, embutido a partir de autônomo, email a partir de dashboard. Use quando o design original é sólido, mas se desmancha em outros breakpoints, em touch, ou em um container diferente.

Não é para construir responsivo do zero. Para isso, comece com `/impeccable` e molde o layout com abordagem responsiva primeiro. Adapt é para o "nunca pensamos em mobile" que precisa ser resolvido depois.

## Como funciona

A skill trabalha em quatro dimensões de adequação contextual:

1. **Breakpoints e layout fluido**: colapsar multi-coluna para coluna única, ajustar faixas de clamp, introduzir novos breakpoints onde o design genuinamente quebra.
2. **Touch targets**: áreas de toque mínimas de 44px, espaçamento suficiente entre targets adjacentes, zonas de toque maiores que os limites visuais quando necessário.
3. **Padrões de navegação**: sidebars de desktop viram navegação inferior ou slide-outs no mobile, toolbars densas colapsam em menus, estados de hover ganham equivalentes touch.
4. **Prioridade de conteúdo**: decidir o que deve ser visível, o que pode colapsar em disclosures, o que pode ser removido inteiramente para aquele contexto.

A regra inegociável: adapte, não ampute. Funcionalidade crítica não pode desaparecer no mobile só porque é inconveniente. Encontre uma forma de encaixá-la, redesenhe a interação, ou repense se ela era realmente crítica no desktop.

## Experimente

```
/impeccable adapt the settings page for mobile
```

Mudanças esperadas:

- Grid de três colunas vira coluna única com cabeçalhos de seção como divisores sticky
- Navegação da sidebar muda para um scroller horizontal acima do conteúdo
- Toggles ganham 8px de padding vertical para atingir touch targets de 44px
- Texto de ajuda inline muda para toque-para-revelar, em vez de hover
- A seção "Danger zone" expande completamente no mobile em vez de colapsar, porque contém ações irreversíveis e queremos que os usuários as vejam claramente

## Armadilhas

- **Amputar funcionalidades.** Se a versão mobile esconde coisas que a versão desktop pode fazer, isso é uma regressão, não uma adaptação. Lute pela funcionalidade.
- **Tratar mobile como "desktop menor".** Mobile é um contexto diferente: polegares, interrupções, sessões curtas. Adapte ao contexto, não à largura do viewport.
- **Pular `/impeccable harden` depois.** Layouts responsivos revelam edge cases. Execute hardening após adapt para pegar os que só aparecem a 320px.
