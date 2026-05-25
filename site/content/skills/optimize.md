---
tagline: "Diagnostique e corrija performance de UI do LCP ao bundle size."
---

## Quando usar

`/impeccable optimize` é para interfaces que parecem lentas. First paint demora para sempre, scrolling engasga, imagens aparecem tarde, interações parecem laggy, o bundle envia 800KB de JavaScript. Use quando os Web Vitals estão ruins ou quando usuários estão reclamando que as coisas estão lentas.

Não use como otimização prematura. Se LCP é 1.1s e INP é 80ms, pare. O trabalho de design importa mais.

## Como funciona

A skill trabalha em cinco dimensões de performance:

1. **Carregamento e Web Vitals**: LCP, INP, CLS. Identificar o que está bloqueando o first paint, o que está atrasando a interação, o que está causando shift de layout.
2. **Renderização**: re-renders desnecessários, memoization ausente, reconciliation custosa, layout thrash em loops.
3. **Animações**: algo está animando propriedades de layout, transforms e opacity são as únicas coisas tocadas, `will-change` ajuda ou prejudica aqui.
4. **Imagens e assets**: lazy loading, imagens responsivas (`srcset`, `sizes`), formatos modernos (WebP, AVIF), dimensões definidas para prevenir CLS.
5. **Bundle size**: imports não utilizados, dependências superdimensionadas, code-splitting ausente, dead code.

A skill mede antes e depois. Cada correção é quantificada. Se uma mudança não move uma métrica, ela é revertida.

## Experimente

```
/impeccable optimize the homepage
```

Formato esperado:

```
LCP: 3.2s → 1.4s
  - Hero image preloaded (-800ms)
  - Removed render-blocking font stylesheet (-240ms)
  - Deferred analytics script (-180ms)

INP: 240ms → 90ms
  - Debounced scroll handler
  - Memoized expensive list render
  - Removed synchronous layout read in event loop

CLS: 0.18 → 0.02
  - Set dimensions on hero image and logo
  - Reserved space for async header badge

Bundle: 340KB → 180KB
  - Removed unused lodash import (52KB)
  - Code-split the playground route (78KB)
  - Dropped deprecated icon set (30KB)
```

## Armadilhas

- **Otimizar antes de medir.** Sem métricas baselines, você não pode dizer o que ajudou. Execute `/impeccable optimize` com números específicos de Web Vitals, não impressões.
- **Perseguir ganhos minúsculos.** Uma melhoria de 20ms no INP que toma uma semana raramente vale a pena. Optimize tem retornos decrescentes; saiba quando parar.
- **Esquecer de remedir após cada mudança.** O build pode ter piorado as coisas de uma forma que a skill não previu. Verifique.
