# Design de Movimento

## Duração: A Regra 100/300/500

Timing importa mais que easing. Estas durações parecem certas para a maioria das UIs:

| Duração | Caso de Uso | Exemplos |
|---------|-------------|----------|
| **100-150ms** | Feedback instantâneo | Pressionar botão, toggle, mudança de cor |
| **200-300ms** | Mudanças de estado | Abrir menu, tooltip, estados de hover |
| **300-500ms** | Mudanças de layout | Acordeão, modal, drawer |
| **500-800ms** | Animações de entrada | Carregamento de página, revelações hero |

**Animações de saída são mais rápidas que entradas.** Use ~75% da duração de entrada.

## Easing: Escolha a Curva Certa

**Não use `ease`.** É um compromisso que raramente é o ideal. Em vez disso:

| Curva | Use Para | CSS |
|-------|----------|-----|
| **ease-out** | Elementos entrando | `cubic-bezier(0.16, 1, 0.3, 1)` |
| **ease-in** | Elementos saindo | `cubic-bezier(0.7, 0, 0.84, 0)` |
| **ease-in-out** | Alternâncias de estado (ida → volta) | `cubic-bezier(0.65, 0, 0.35, 1)` |

**Para micro-interações, use curvas exponenciais.** Elas parecem naturais porque imitam a física real (fricção, desaceleração):

```css
/* Quart out - suave, refinado (padrão recomendado) */
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);

/* Quint out - ligeiramente mais dramático */
--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);

/* Expo out - rápido, confiante */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
```

**Evite curvas bounce e elásticas.** Elas foram tendência em 2015 mas agora parecem de mau gosto e amadoras. Objetos reais não quicam quando param; eles desaceleram suavemente. Efeitos de overshoot chamam atenção para a animação em si em vez do conteúdo.

## Materiais de Movimento Premium

Transform e opacity são padrões confiáveis, não o catálogo inteiro. Interfaces premium frequentemente precisam de propriedades atmosféricas: revelações com blur, painéis com backdrop-filter, mudanças de saturação ou brilho, bloom de sombra, filtros SVG, máscaras, clip paths, movimento de posição de gradiente e efeitos com fontes variáveis ou shaders.

Use o material certo para o efeito:

- **Transform / opacity**: movimento, feedback de pressão, revelações simples, coreografia de lista.
- **Blur / filter / backdrop-filter**: mudanças de foco, profundidade, efeitos de vidro ou lente, entradas suavizadas, transições atmosféricas.
- **Clip path / masks**: wipes, revelações, recorte editorial, transições tipo produto.
- **Sombra / brilho / filtros de cor**: energia, affordance, foco, calor, estado ativo.
- **Grid-template rows ou transforms estilo FLIP**: expandir e refluir layout sem animar `height` diretamente.

A regra rígida não é "apenas transform e opacity." A regra rígida é: evite animar propriedades que direcionam layout de forma casual (`width`, `height`, `top`, `left`, margins), mantenha efeitos caros limitados a áreas pequenas ou isoladas, e verifique no navegador que o resultado é suave nos viewports alvo. Se blur/filter torna a interação significativamente mais premium e permanece suave, use-o.

## Animações Escalonadas

Use CSS custom properties para escalonamento mais limpo: `animation-delay: calc(var(--i, 0) * 50ms)` com `style="--i: 0"` em cada item. **Limite o tempo total de escalonamento**: 10 itens a 50ms = 500ms total. Para muitos itens, reduza o atraso por item ou limite a quantidade escalonada.

## Movimento Reduzido

Isso não é opcional. Distúrbios vestibulares afetam ~35% dos adultos acima de 40 anos.

```css
/* Defina animações normalmente */
.card {
  animation: slide-up 500ms ease-out;
}

/* Forneça alternativa para movimento reduzido */
@media (prefers-reduced-motion: reduce) {
  .card {
    animation: fade-in 200ms ease-out;  /* Crossfade em vez de movimento */
  }
}

/* Ou desative inteiramente */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**O que preservar**: Animações funcionais como barras de progresso, spinners de carregamento (desacelerados) e indicadores de foco ainda devem funcionar, apenas sem movimento espacial.

## Performance Percebida

**Ninguém se importa o quão rápido seu site é, apenas o quão rápido ele parece.** Percepção pode ser tão eficaz quanto o desempenho real.

**O limiar de 80ms**: Nosso cérebro armazena entrada sensorial por ~80ms para sincronizar a percepção. Qualquer coisa abaixo de 80ms parece instantânea e simultânea. Este é o alvo para micro-interações.

**Tempo ativo vs passivo**: Espera passiva (olhar para um spinner) parece mais longa que engajamento ativo. Estratégias para mudar o equilíbrio:

- **Início preventivo**: Comece transições imediatamente durante o carregamento (zoom de app iOS, skeleton UI). Usuários percebem trabalho acontecendo.
- **Conclusão antecipada**: Mostre conteúdo progressivamente, não espere por tudo. Buffering de vídeo, imagens progressivas, streaming HTML.
- **UI otimista**: Atualize a interface imediatamente, trate falhas graciosamente. Likes do Instagram funcionam offline; a UI atualiza instantaneamente, sincroniza depois. Use para ações de baixo risco; evite para pagamentos ou operações destrutivas.

**Easing afeta a duração percebida**: Ease-in (acelerando rumo à conclusão) faz tarefas parecerem mais curtas porque o efeito peak-end pondera fortemente os momentos finais. Ease-out parece satisfatório para entradas, mas ease-in rumo ao fim de uma tarefa comprime o tempo percebido.

**Cuidado**: Respostas rápidas demais podem diminuir o valor percebido. Usuários podem desconfiar de resultados instantâneos para operações complexas (busca, análise). Às vezes, um breve atraso sinaliza que "trabalho real" está acontecendo.

## Desempenho

Não use `will-change` preventivamente, apenas quando a animação é iminente (`:hover`, `.animating`). Para animações acionadas por scroll, use Intersection Observer em vez de eventos de scroll; faça unobserve após animar uma vez. Crie tokens de movimento para consistência (durações, easings, transições comuns).

---

**Evite**: Animar tudo (fadiga de animação é real). Usar >500ms para feedback de UI. Ignorar `prefers-reduced-motion`. Usar animação para esconder carregamento lento.
