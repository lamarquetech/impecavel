# Design Responsivo

## Mobile-First: Escreva Certo

Comece com estilos base para mobile, use queries `min-width` para adicionar complexidade em camadas. Desktop-first (`max-width`) significa que mobile carrega estilos desnecessários primeiro.

## Breakpoints: Orientados pelo Conteúdo

Não persiga tamanhos de dispositivos; deixe o conteúdo dizer onde quebrar. Comece estreito, estique até o design quebrar, adicione breakpoint ali. Três breakpoints geralmente bastam (640, 768, 1024px). Use `clamp()` para valores fluidos sem breakpoints.

## Detecte o Método de Entrada, Não Apenas o Tamanho da Tela

**Tamanho de tela não diz o método de entrada.** Um laptop com touchscreen, um tablet com teclado. Use queries de pointer e hover:

```css
/* Ponteiro fino (mouse, trackpad) */
@media (pointer: fine) {
  .button { padding: 8px 16px; }
}

/* Ponteiro grosso (toque, caneta) */
@media (pointer: coarse) {
  .button { padding: 12px 20px; }  /* Alvo de toque maior */
}

/* Dispositivo suporta hover */
@media (hover: hover) {
  .card:hover { transform: translateY(-2px); }
}

/* Dispositivo não suporta hover (toque) */
@media (hover: none) {
  .card { /* Sem estado de hover - use active em vez disso */ }
}
```

**Crítico**: Não dependa de hover para funcionalidade. Usuários de toque não podem fazer hover.

## Áreas Seguras: Lide com o Notch

Telefones modernos têm notches, cantos arredondados e indicadores de home. Use `env()`:

```css
body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

/* Com fallback */
.footer {
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
}
```

**Ative viewport-fit** na sua meta tag:
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

## Imagens Responsivas: Faça Certo

### srcset com Descritores de Largura

```html
<img
  src="hero-800.jpg"
  srcset="
    hero-400.jpg 400w,
    hero-800.jpg 800w,
    hero-1200.jpg 1200w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Imagem hero"
>
```

**Como funciona**:
- `srcset` lista imagens disponíveis com suas larguras reais (descritores `w`)
- `sizes` diz ao navegador quão larga a imagem será exibida
- O navegador escolhe o melhor arquivo com base na largura do viewport E na proporção de pixels do dispositivo

### Elemento Picture para Direção de Arte

Quando você precisa de recortes/composições diferentes (não apenas resoluções):

```html
<picture>
  <source media="(min-width: 768px)" srcset="wide.jpg">
  <source media="(max-width: 767px)" srcset="tall.jpg">
  <img src="fallback.jpg" alt="...">
</picture>
```

## Padrões de Adaptação de Layout

**Navegação**: Três estágios: hamburger + drawer no mobile, horizontal compacto no tablet, completa com rótulos no desktop. **Tabelas**: Transforme em cards no mobile usando `display: block` e atributos `data-label`. **Divulgação progressiva**: Use `<details>/<summary>` para conteúdo que pode colapsar no mobile.

## Testes: Não Confie Apenas no DevTools

A emulação de dispositivos do DevTools é útil para layout mas perde:

- Interações de toque reais
- Restrições reais de CPU/memória
- Padrões de latência de rede
- Diferenças de renderização de fontes
- Aparências de chrome do navegador/teclado

**Teste pelo menos em**: Um iPhone real, um Android real, um tablet se relevante. Androids baratos revelam problemas de desempenho que você nunca verá em simuladores.

---

**Evite**: Design desktop-first. Detecção de dispositivo em vez de detecção de funcionalidade. Codebases separados para mobile/desktop. Ignorar tablet e landscape. Assumir que todos os dispositivos mobile são potentes.
