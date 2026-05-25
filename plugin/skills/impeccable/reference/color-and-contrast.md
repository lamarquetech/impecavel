# Cor e Contraste

## Espaços de Cor: Use OKLCH

**Pare de usar HSL.** Use OKLCH (ou LCH) em vez disso. É perceptualmente uniforme, o que significa que passos iguais de luminosidade *parecem* iguais, diferente do HSL onde 50% de luminosidade no amarelo parece brilhante enquanto 50% no azul parece escuro.

A função OKLCH recebe três componentes: `oklch(lightness chroma hue)` onde lightness é 0-100%, chroma é aproximadamente 0-0.4 e hue é 0-360. Para construir uma cor primária e suas variantes mais claras / mais escuras, mantenha o chroma+hue aproximadamente constante e varie a lightness, mas **reduza o chroma ao se aproximar do branco ou preto**, porque chroma alto em luminosidade extrema parece berrante.

O hue que você escolhe é uma decisão de marca e não deve vir de um padrão. Não alcance o azul (hue 250) ou laranja quente (hue 60) por reflexo; esses são os padrões dominantes de design de IA, não a resposta certa para nenhuma marca específica.

## Construindo Paletas Funcionais

### Neutros Tingidos

**Cinza puro está morto.** Um neutro com chroma zero parece sem vida ao lado de uma marca colorida. Adicione um pequeno valor de chroma (0.005-0.015) a todos os seus neutros, com hue direcionado para a cor da sua marca. O chroma é pequeno o suficiente para não ser percebido conscientemente como "tingido", mas cria coesão subconsciente entre a cor da marca e as superfícies da UI.

O hue para o qual você tingi deve vir da marca DESTE projeto, não de uma fórmula "quente = amigável, frio = tech". Se a cor da sua marca é teal, seus neutros puxam para teal. Se a cor da sua marca é amber, eles puxam para amber. O ponto é coesão com a marca ESPECÍFICA, não uma paleta de prateleira.

**Evite** a armadilha de sempre tingir para laranja quente ou sempre tingir para azul frio. Esses são os dois padrões mais preguiçosos e criam sua própria monocultura entre projetos.

### Estrutura de Paleta

Um sistema completo precisa:

| Papel | Propósito | Exemplo |
|-------|-----------|---------|
| **Primária** | Marca, CTAs, ações principais | 1 cor, 3-5 tons |
| **Neutra** | Texto, fundos, bordas | Escala de 9-11 tons |
| **Semântica** | Sucesso, erro, alerta, informação | 4 cores, 2-3 tons cada |
| **Superfície** | Cards, modais, overlays | 2-3 níveis de elevação |

**Pule secundária/terciária a menos que precise delas.** A maioria dos apps funciona bem com uma cor de destaque. Adicionar mais cria fadiga de decisão e ruído visual.

### A Regra 60-30-10 (Aplicada Corretamente)

Esta regra é sobre **peso visual**, não contagem de pixels:

- **60%**: Fundos neutros, espaço em branco, superfícies base
- **30%**: Cores secundárias: texto, bordas, estados inativos
- **10%**: Destaque: CTAs, destaques, estados de foco

O erro comum: usar a cor de destaque em todo lugar porque é "a cor da marca." Cores de destaque funcionam *porque* são raras. Uso excessivo mata seu poder.

## Contraste e Acessibilidade

### Requisitos WCAG

| Tipo de Conteúdo | Mínimo AA | Alvo AAA |
|------------------|-----------|----------|
| Texto de corpo | 4.5:1 | 7:1 |
| Texto grande (18px+ ou 14px bold) | 3:1 | 4.5:1 |
| Componentes de UI, ícones | 3:1 | 4.5:1 |
| Decorações não essenciais | Nenhum | Nenhum |

**A pegadinha**: Texto de placeholder ainda precisa de 4.5:1. Aquele placeholder cinza claro que você vê em todo lugar? Geralmente falha na WCAG.

### Combinações de Cores Perigosas

Estas comumente falham em contraste ou causam problemas de legibilidade:

- Texto cinza claro sobre fundo branco (a falha de acessibilidade nº 1)
- **Texto cinza sobre qualquer fundo colorido**: cinza parece lavado e morto sobre cor. Use um tom mais escuro da cor do fundo, ou transparência
- Texto vermelho sobre fundo verde (ou vice-versa): 8% dos homens não conseguem distinguir estes
- Texto azul sobre fundo vermelho (vibra visualmente)
- Texto amarelo sobre fundo branco (quase sempre falha)
- Texto claro e fino sobre imagens (contraste imprevisível)

### Nunca Use Cinza Puro ou Preto Puro

Cinza puro (`oklch(50% 0 0)`) e preto puro (`#000`) não existem na natureza; sombras e superfícies reais sempre têm uma tonalidade de cor. Mesmo um chroma de 0.005-0.01 é suficiente para parecer natural sem ser obviamente tingido. (Veja exemplo de neutros tingidos acima.)

### Testes

Não confie nos seus olhos. Use ferramentas:

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Browser DevTools → Rendering → Emulate vision deficiencies
- [Polypane](https://polypane.app/) para testes em tempo real

## Temas: Modo Claro e Escuro

### Modo Escuro Não É Modo Claro Invertido

Você não pode simplesmente trocar as cores. O modo escuro requer decisões de design diferentes:

| Modo Claro | Modo Escuro |
|------------|-------------|
| Sombras para profundidade | Superfícies mais claras para profundidade (sem sombras) |
| Texto escuro sobre claro | Texto claro sobre escuro (reduza o font-weight) |
| Acentos vibrantes | Dessature os acentos levemente |
| Fundos brancos | Nunca preto puro; use cinza escuro (oklch 12-18%) |

No modo escuro, a profundidade vem da luminosidade da superfície, não da sombra. Construa uma escala de superfície em 3 degraus onde elevações maiores são mais claras (e.g. 15% / 20% / 25% de lightness). Use o MESMO hue e chroma da cor da sua marca (seja qual for para ESTE projeto; não alcance o azul) e varie apenas a lightness. Reduza o peso do texto do corpo levemente (e.g. 350 em vez de 400) porque texto claro sobre escuro parece mais pesado que texto escuro sobre claro.

### Hierarquia de Tokens

Use duas camadas: tokens primitivos (`--blue-500`) e tokens semânticos (`--color-primary: var(--blue-500)`). Para o modo escuro, redefina apenas a camada semântica; os primitivos permanecem os mesmos.

## Alfa É Um Mal Cheiro de Design

Uso pesado de transparência (rgba, hsla) geralmente significa uma paleta incompleta. Alfa cria contraste imprevisível, custo de desempenho e inconsistência. Defina cores de overlay explícitas para cada contexto em vez disso. Exceção: anéis de foco e estados interativos onde transparência é necessária.

---

**Evite**: Confiar apenas na cor para transmitir informação. Criar paletas sem papéis claros para cada cor. Usar preto puro (#000) em grandes áreas. Pular testes de daltonismo (8% dos homens afetados).
