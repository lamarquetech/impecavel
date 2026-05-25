Performance é uma funcionalidade. Identifique o gargalo real DESTA interface, corrija-o, e então meça. Não otimize o que não está lento.

## Avaliar Problemas de Performance

Entenda a performance atual e identifique problemas:

1. **Meça o estado atual**:
   - **Core Web Vitals**: pontuações LCP, FID/INP, CLS
   - **Tempo de carregamento**: Time to interactive, first contentful paint
   - **Tamanho do bundle**: JavaScript, CSS, tamanhos de imagens
   - **Performance em runtime**: Taxa de frames, uso de memória, uso de CPU
   - **Rede**: Contagem de requests, tamanhos de payload, waterfall

2. **Identifique gargalos**:
   - O que está lento? (Carregamento inicial? Interações? Animações?)
   - O que está causando? (Imagens grandes? JavaScript pesado? Layout thrashing?)
   - Quão ruim está? (Perceptível? Irritante? Bloqueante?)
   - Quem é afetado? (Todos os usuários? Apenas mobile? Conexões lentas?)

**CRÍTICO**: Meça antes e depois. Otimização prematura desperdiça tempo. Otimize o que realmente importa.

## Estratégia de Otimização

Crie um plano de melhoria sistemático:

### Performance de Carregamento

**Otimize Imagens**:
- Use formatos modernos (WebP, AVIF)
- Dimensionamento adequado (não carregue imagem de 3000px para exibição de 300px)
- Lazy loading para imagens abaixo da dobra
- Imagens responsivas (`srcset`, elemento `picture`)
- Comprima imagens (80-85% de qualidade é geralmente imperceptível)
- Use CDN para entrega mais rápida

```html
<img 
  src="hero.webp"
  srcset="hero-400.webp 400w, hero-800.webp 800w, hero-1200.webp 1200w"
  sizes="(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px"
  loading="lazy"
  alt="Hero image"
/>
```

**Reduza o Bundle JavaScript**:
- Code splitting (baseado em rotas, baseado em componentes)
- Tree shaking (remova código não utilizado)
- Remova dependências não utilizadas
- Lazy load de código não crítico
- Use imports dinâmicos para componentes grandes

```javascript
// Lazy load heavy component
const HeavyChart = lazy(() => import('./HeavyChart'));
```

**Otimize CSS**:
- Remova CSS não utilizado
- CSS crítico inline, resto assíncrono
- Minimize arquivos CSS
- Use CSS containment para regiões independentes

**Otimize Fontes**:
- Use `font-display: swap` ou `optional`
- Subconjunte fontes (apenas caracteres necessários)
- Preload de fontes críticas
- Use fontes de sistema quando apropriado
- Limite pesos de fonte carregados

```css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap; /* Show fallback immediately */
  unicode-range: U+0020-007F; /* Basic Latin only */
}
```

**Otimize a Estratégia de Carregamento**:
- Recursos críticos primeiro (async/defer não críticos)
- Preload de assets críticos
- Prefetch de próximas páginas prováveis
- Service worker para offline/caching
- HTTP/2 ou HTTP/3 para multiplexação

### Performance de Renderização

**Evite Layout Thrashing**:
```javascript
// ❌ Ruim: Alternância de leituras e escritas (causa reflows)
elements.forEach(el => {
  const height = el.offsetHeight; // Leitura (força layout)
  el.style.height = height * 2; // Escrita
});

// ✅ Bom: Leitura em lote, depois escrita em lote
const heights = elements.map(el => el.offsetHeight); // Todas as leituras
elements.forEach((el, i) => {
  el.style.height = heights[i] * 2; // Todas as escritas
});
```

**Otimize a Renderização**:
- Use a propriedade CSS `contain` para regiões independentes
- Minimize a profundidade do DOM (mais plano é mais rápido)
- Reduza o tamanho do DOM (menos elementos)
- Use `content-visibility: auto` para listas longas
- Virtual scrolling para listas muito longas (react-window, react-virtualized)

**Reduza Paint e Composite**:
- Use `transform` e `opacity` para movimento confiável, mas permita blur, filtros, máscaras, clip paths, sombras, e mudanças de cor quando criam polimento significativo
- Evite animação casual de propriedades que direcionam layout (`width`, `height`, `top`, `left`, margins)
- Use `will-change` com moderação para operações sabidamente pesadas
- Limite áreas de paint pesadas para efeitos de blur/filter/shadow (menor e isolado é mais rápido)

### Performance de Animação

**Aceleração por GPU**:
```css
/* ✅ Acelerada por GPU (rápido) */
.animated {
  transform: translateX(100px);
  opacity: 0.5;
}

/* ❌ Limitada à CPU (lento) */
.animated {
  left: 100px;
  width: 300px;
}
```

**60fps Suave**:
- Alveje 16ms por frame (60fps)
- Use `requestAnimationFrame` para animações JS
- Debounce/throttle de handlers de scroll
- Use animações CSS quando possível
- Evite JavaScript de longa duração durante animações

**Intersection Observer**:
```javascript
// Detecte eficientemente quando elementos entram no viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Elemento está visível, lazy load ou anime
    }
  });
});
```

### Otimização React/Framework

**Específico do React**:
- Use `memo()` para componentes pesados
- `useMemo()` e `useCallback()` para computações pesadas
- Virtualize listas longas
- Code split de rotas
- Evite criação de função inline no render
- Use React DevTools Profiler

**Agnóstico de framework**:
- Minimize re-renderizações
- Debounce de operações pesadas
- Memoize valores computados
- Lazy load de rotas e componentes

### Otimização de Rede

**Reduza Requests**:
- Combine arquivos pequenos
- Use SVG sprites para ícones
- Inline assets críticos pequenos
- Remova scripts de terceiros não utilizados

**Otimize APIs**:
- Use paginação (não carregue tudo)
- GraphQL para solicitar apenas campos necessários
- Compressão de resposta (gzip, brotli)
- Headers de cache HTTP
- CDN para assets estáticos

**Otimize para Conexões Lentas**:
- Carregamento adaptativo baseado na conexão (navigator.connection)
- Atualizações otimistas de UI
- Priorização de requests
- Progressive enhancement

## Otimização de Core Web Vitals

### Largest Contentful Paint (LCP < 2.5s)
- Otimize imagens hero
- Inline CSS crítico
- Preload de recursos-chave
- Use CDN
- Server-side rendering

### First Input Delay (FID < 100ms) / INP (< 200ms)
- Divida tarefas longas
- Defer JavaScript não crítico
- Use web workers para computação pesada
- Reduza tempo de execução JavaScript

### Cumulative Layout Shift (CLS < 0.1)
- Defina dimensões em imagens e vídeos
- Não injete conteúdo acima de conteúdo existente
- Use a propriedade CSS `aspect-ratio`
- Reserve espaço para anúncios/embeds
- Evite animações que causam layout shifts

```css
/* Reserve space for image */
.image-container {
  aspect-ratio: 16 / 9;
}
```

## Monitoramento de Performance

**Ferramentas para usar**:
- Chrome DevTools (Lighthouse, painel Performance)
- WebPageTest
- Core Web Vitals (Chrome UX Report)
- Analisadores de bundle (webpack-bundle-analyzer)
- Monitoramento de performance (Sentry, DataDog, New Relic)

**Métricas-chave**:
- LCP, FID/INP, CLS (Core Web Vitals)
- Time to Interactive (TTI)
- First Contentful Paint (FCP)
- Total Blocking Time (TBT)
- Tamanho do bundle
- Contagem de requests

**IMPORTANTE**: Meça em dispositivos reais com condições de rede reais. Chrome Desktop com conexão rápida não é representativo.

**NUNCA**:
- Otimize sem medir (otimização prematura)
- Sacrifique acessibilidade por performance
- Quebre funcionalidade durante otimização
- Use `will-change` em todo lugar (cria novas camadas, usa memória)
- Lazy load de conteúdo acima da dobra
- Otimize micro-otimizações ignorando problemas maiores (otimize o maior gargalo primeiro)
- Esqueça da performance mobile (frequentemente dispositivos mais lentos, conexões mais lentas)

## Verificar Melhorias

Teste que as otimizações funcionaram:

- **Métricas antes/depois**: Compare pontuações do Lighthouse
- **Monitoramento de usuários reais**: Rastreie melhorias para usuários reais
- **Dispositivos diferentes**: Teste em Android de baixo custo, não apenas iPhone topo de linha
- **Conexões lentas**: Throttle para 3G, teste a experiência
- **Sem regressões**: Garanta que funcionalidade ainda funciona
- **Percepção do usuário**: *Parece* mais rápido?

Quando os números voltados para o usuário melhoram, passe para `{{command_prefix}}impeccable polish` para a passagem final.
