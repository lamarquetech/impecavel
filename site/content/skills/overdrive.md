---
tagline: "Empurre uma interface além dos limites convencionais. Shaders, física, 60fps, transições cinematográficas."
---

## Quando usar

`/impeccable overdrive` é para os momentos em que você quer impressionar. Um hero que usa WebGL. Uma tabela que manipula um milhão de linhas. Um dialog que morfa a partir de seu elemento disparador. Um formulário que valida em tempo real com feedback em streaming. Uma transição de página que parece cinematográfica. Use quando o orçamento do projeto permite ambição técnica e o resultado precisa parecer extraordinário.

Não use em ferramentas de operação, dashboards, ou qualquer coisa onde confiabilidade supera espetáculo. Overdrive queima complexidade por efeito, e esse compromisso só vale a pena em momentos que importam.

## Como funciona

A skill escolhe um momento para tornar extraordinário e se compromete com ele, em vez de espalhar esforço por toda a interface. Ela então recorre a técnicas que a maioria das UIs geradas por IA nunca toca: WebGL shaders, spring physics, Scroll Timeline, View Transitions, canvas animation, filtros GPU-acelerados. Tudo é orçado, perfilado e testado a 60fps, com fallbacks de reduced-motion embutidos.

A saída do Overdrive é anunciada com `──── ⚡ OVERDRIVE ────` para que você saiba que está entrando em um modo mais ambicioso. Espere diffs maiores, novas dependências e profundidade de implementação além do que outras skills produzem.

## Experimente

```
/impeccable overdrive the landing hero
```

Uma execução concreta pode substituir um hero estático por um background com WebGL shader guiado pela posição do mouse, um headline display que se revela com uma máscara no scroll usando a Scroll Timeline API, e uma View Transition no CTA que morfa para a próxima página. Mais um fallback de reduced-motion que troca tudo por uma composição estática limpa.

## Armadilhas

- **Usar em todo lugar.** Overdrive funciona porque é raro. Se toda página tem momentos cinematográficos, nenhum deles é cinematográfico.
- **Fazer deploy sem fallbacks de reduced-motion.** Inegociável. Overdrive os adiciona automaticamente; não os remova.
- **Ignorar performance.** Momentos extraordinários ainda precisam atingir 60fps. Se o efeito perde frames, corte ou otimize. Espetáculo lento é pior que simples bem feito.
- **Executar overdrive antes que a interface base esteja sólida.** Espetáculo sobre uma fundação quebrada soa como distração, não como delight.
