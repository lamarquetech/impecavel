> **Contexto adicional necessário**: restrições de performance.

Adicione movimento que transmita estado, dê feedback e esclareça hierarquia. Corte movimento que exista apenas para decoração. Fadiga de animação é um custo real; gaste o orçamento nos momentos que precisam dele.

---

## Registro

Brand: sequências orquestradas de carregamento de página, revelações escalonadas, animação orientada por scroll. O movimento é parte da voz; uma entrada bem ensaiada supera micro-interações espalhadas.

Product: 150–250 ms na maioria das transições. O movimento transmite estado: feedback, revelação, carregamento, transições entre views. Sem coreografia de carregamento de página; os usuários estão em uma tarefa e não vão esperar por ela.

---

## Avalie as Oportunidades de Animação

Analise onde o movimento melhoraria a experiência:

1. **Identifique áreas estáticas**:
   - **Feedback ausente**: Ações sem confirmação visual (cliques em botões, envio de formulário, etc.)
   - **Transições abruptas**: Mudanças de estado instantâneas que parecem bruscas (show/hide, carregamentos de página, mudanças de rota)
   - **Relacionamentos obscuros**: Relacionamentos espaciais ou hierárquicos que não são óbvios
   - **Falta de encanto**: Interações funcionais, mas sem alegria
   - **Orientação perdida**: Oportunidades de direcionar a atenção ou explicar um comportamento

2. **Entenda o contexto**:
   - Qual é a personalidade? (Lúdica vs séria, enérgica vs calma)
   - Qual é o orçamento de performance? (Mobile-first? Página complexa?)
   - Quem é o público? (Usuários sensíveis a movimento? Power users que querem velocidade?)
   - O que mais importa? (Uma animação hero vs muitas micro-interações?)

Se algum desses itens não estiver claro no codebase, {{ask_instruction}}

**CRÍTICO**: Respeite `prefers-reduced-motion`. Sempre forneça alternativas não animadas para os usuários que precisam delas.

## Planeje a Estratégia de Animação

Crie um plano de animação com propósito:

- **Momento hero**: Qual é a ÚNICA animação signature? (Carregamento da página? Seção hero? Interação principal?)
- **Camada de feedback**: Quais interações precisam de confirmação?
- **Camada de transição**: Quais mudanças de estado precisam de suavização?
- **Camada de encanto**: Onde podemos surpreender e deleitar?

**IMPORTANTE**: Uma experiência bem orquestrada supera animações espalhadas por toda parte. Foque nos momentos de alto impacto.

## Implemente as Animações

Adicione movimento sistematicamente nestas categorias:

### Animações de Entrada
- **Coreografia de carregamento da página**: Revelações escalonadas de elementos (atrasos de 100-150ms), combinações de fade + slide
- **Seção hero**: Entrada dramática para conteúdo primário (scale, parallax ou efeitos criativos)
- **Revelações de conteúdo**: Animações acionadas por scroll usando intersection observer
- **Entrada de modal/drawer**: Slide + fade suave, fade do backdrop, gerenciamento de foco

### Micro-interações
- **Feedback de botões**:
  - Hover: Scale sutil (1.02-1.05), mudança de cor, aumento de sombra
  - Click: Scale rápido para baixo e depois para cima (0.95 → 1), efeito ripple
  - Loading: Spinner ou estado de pulse
- **Interações de formulário**:
  - Foco no input: Transição de cor da borda, scale ou glow sutil
  - Validação: Shake no erro, check mark no sucesso, transições de cor suaves
- **Toggle switches**: Slide suave + transição de cor (200-300ms)
- **Checkboxes/radio**: Animação do check mark, efeito ripple
- **Like/favorite**: Scale + rotação, efeitos de partículas, transição de cor

### Transições de Estado
- **Show/hide**: Fade + slide (não instantâneo), timing apropriado (200-300ms)
- **Expand/collapse**: Transição de altura com tratamento de overflow, rotação de ícone
- **Estados de carregamento**: Fade de skeleton screen, animações de spinner, barras de progresso
- **Sucesso/erro**: Transições de cor, animações de ícone, pulse de scale suave
- **Habilitar/desabilitar**: Transições de opacidade, mudanças de cursor

### Navegação e Fluxo
- **Transições de página**: Crossfade entre rotas, transições de elementos compartilhados
- **Troca de tabs**: Indicator deslizante, fade/slide do conteúdo
- **Carrossel/slider**: Transforms suaves, snap points, momentum
- **Efeitos de scroll**: Camadas de parallax, headers fixos com mudanças de estado, indicadores de progresso de scroll

### Feedback e Orientação
- **Dicas de hover**: Fade-in de tooltips, mudanças de cursor, highlights de elementos
- **Drag & drop**: Efeito de elevação (sombra + scale), highlights de drop zone, reposicionamento suave
- **Copiar/colar**: Flash breve de highlight ao colar, confirmação de "copiado"
- **Fluxo de foco**: Destaque do caminho pelo formulário ou workflow

### Momentos de Encanto
- **Estados vazios**: Animações flutuantes sutis em ilustrações
- **Ações concluídas**: Confetti, flourish de check mark, celebrações de sucesso
- **Easter eggs**: Interações ocultas para descoberta
- **Animação contextual**: Efeitos climáticos, temas por horário, toques sazonais

## Implementação Técnica

Use técnicas apropriadas para cada animação:

### Timing e Easing

**Durações por propósito:**
- **100-150ms**: Feedback instantâneo (pressionar botão, toggle)
- **200-300ms**: Mudanças de estado (hover, abrir menu)
- **300-500ms**: Mudanças de layout (acordeão, modal)
- **500-800ms**: Animações de entrada (carregamento da página)

**Curvas de easing (use estas, não os padrões CSS):**
```css
/* Recomendado: desaceleração natural */
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);    /* Suave */
--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);   /* Ligeiramente mais rápido */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);     /* Confiante, decisivo */

/* EVITE: parecem datadas e bregas */
/* bounce: cubic-bezier(0.34, 1.56, 0.64, 1); */
/* elastic: cubic-bezier(0.68, -0.6, 0.32, 1.6); */
```

**Animações de saída são mais rápidas que as de entrada.** Use ~75% da duração de entrada.

### Animações CSS
```css
/* Prefira para animações simples e declarativas */
- transitions para mudanças de estado
- @keyframes para sequências complexas
- transform e opacity para movimento confiável
- blur, filters, masks, clip paths, shadows e mudanças de cor para efeitos atmosféricos premium quando verificado que são suaves
```

### Animações com JavaScript
```javascript
/* Use para animações complexas e interativas */
- Web Animations API para controle programático
- Framer Motion para React
- GSAP para sequências complexas
```

### Performance
- **Materiais de movimento**: Use transform/opacity para movimento confiável, mas use blur, filters, masks, shadows e mudanças de cor quando melhorarem materialmente o efeito
- **Segurança de layout**: Evite animar casualmente propriedades que afetam o layout (`width`, `height`, `top`, `left`, margens)
- **will-change**: Adicione com moderação para animações conhecidas como custosas
- **Limite efeitos custosos**: Mantenha áreas de blur/filter/shadow pequenas ou isoladas, use `contain` quando apropriado
- **Monitore o FPS**: Garanta 60fps nos dispositivos-alvo

### Acessibilidade
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**NUNCA**:
- Use curvas de easing bounce ou elastic; elas parecem datadas e chamam atenção para a animação em si
- Anime propriedades de layout casualmente (`width`, `height`, `top`, `left`, margens) quando técnicas com transform, FLIP ou baseadas em grid funcionariam
- Use durações acima de 500ms para feedback (parece lento)
- Anime sem propósito (toda animação precisa de um motivo)
- Ignore `prefers-reduced-motion` (isto é uma violação de acessibilidade)
- Anime tudo (fadiga de animação torna as interfaces exaustivas)
- Bloqueie interação durante animações, a menos que seja intencional

## Verifique a Qualidade

Teste as animações minuciosamente:

- **Suave a 60fps**: Sem engasgos nos dispositivos-alvo
- **Parece natural**: Curvas de easing parecem orgânicas, não robóticas
- **Timing apropriado**: Nem muito rápido (brusco) nem muito lento (lerdo)
- **Movimento reduzido funciona**: Animações desabilitadas ou simplificadas apropriadamente
- **Não bloqueia**: Usuários podem interagir durante/após animações
- **Adiciona valor**: Torna a interface mais clara ou mais encantadora

Quando o movimento esclarece o estado em vez de apenas decorá-lo, passe para `{{command_prefix}}impeccable polish` para a revisão final.
