const ANTIPATTERNS = [
  // ── AI slop: tells that something was AI-generated ──
  {
    id: 'side-tab',
    category: 'slop',
    name: 'Borda lateral de destaque',
    description:
      'Borda colorida espessa em um lado de um card — o indicador mais reconhecível de UIs geradas por IA. Use um destaque mais sutil ou remova-o completamente.',
    skillSection: 'Visual Details',
    skillGuideline: 'colored accent stripe',
  },
  {
    id: 'border-accent-on-rounded',
    category: 'slop',
    name: 'Borda de destaque em elemento arredondado',
    description:
      'Borda de destaque espessa em um card arredondado — a borda entra em conflito com os cantos arredondados. Remova a borda ou o border-radius.',
    skillSection: 'Visual Details',
    skillGuideline: 'colored accent stripe',
  },
  {
    id: 'overused-font',
    category: 'slop',
    name: 'Fonte superutilizada',
    description:
      'Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans e Space Grotesk são usadas em tantos sites que já não parecem distintas. Cada nova onda de UIs geradas por IA converge nas mesmas poucas fontes. Escolha uma fonte que dê personalidade à sua interface.',
    skillSection: 'Typography',
    skillGuideline: 'overused fonts like Inter',
  },
  {
    id: 'single-font',
    category: 'slop',
    name: 'Fonte única para tudo',
    description:
      'Apenas uma família de fontes é usada para a página inteira. Combine uma fonte display marcante com uma fonte de corpo refinada para criar hierarquia tipográfica.',
    skillSection: 'Typography',
    skillGuideline: 'only one font family for the entire page',
  },
  {
    id: 'flat-type-hierarchy',
    category: 'slop',
    name: 'Hierarquia tipográfica plana',
    description:
      'Os tamanhos de fonte estão muito próximos — sem hierarquia visual clara. Use menos tamanhos com mais contraste (mire em pelo menos uma proporção de 1.25 entre os degraus).',
    skillSection: 'Typography',
    skillGuideline: 'flat type hierarchy',
  },
  {
    id: 'gradient-text',
    category: 'slop',
    name: 'Texto com gradiente',
    description:
      'Texto com gradiente é decorativo em vez de significativo — um indicador comum de IA, especialmente em títulos e métricas. Use cores sólidas para texto.',
    skillSection: 'Color & Contrast',
    skillGuideline: 'gradient text for',
  },
  {
    id: 'ai-color-palette',
    category: 'slop',
    name: 'Paleta de cores de IA',
    description:
      'Gradientes roxo/violeta e ciano sobre fundo escuro são os indicadores mais reconhecíveis de UIs geradas por IA. Escolha uma paleta distinta e intencional.',
    skillSection: 'Color & Contrast',
    skillGuideline: 'AI color palette',
  },
  {
    id: 'nested-cards',
    category: 'slop',
    name: 'Cards aninhados',
    description:
      'Cards dentro de cards criam ruído visual e profundidade excessiva. Achate a hierarquia — use espaçamento, tipografia e divisores em vez de aninhar contêineres.',
    skillSection: 'Layout & Space',
    skillGuideline: 'Nest cards inside cards',
  },
  {
    id: 'monotonous-spacing',
    category: 'slop',
    name: 'Espaçamento monótono',
    description:
      'O mesmo valor de espaçamento usado em todo lugar — sem ritmo, sem variação. Use agrupamentos mais ajustados para itens relacionados e separações generosas entre seções.',
    skillSection: 'Layout & Space',
    skillGuideline: 'same spacing everywhere',
  },
  {
    id: 'everything-centered',
    category: 'slop',
    name: 'Tudo centralizado',
    description:
      'Todos os elementos de texto estão alinhados ao centro. Texto alinhado à esquerda com layouts assimétricos parece mais elaborado. Centralize apenas seções hero e CTAs.',
    skillSection: 'Layout & Space',
    skillGuideline: 'Center everything',
  },
  {
    id: 'bounce-easing',
    category: 'slop',
    name: 'Easing bounce ou elástico',
    description:
      'Easing bounce e elástico parecem datados e bregas. Objetos reais desaceleram suavemente — use easing exponencial (ease-out-quart/quint/expo) em vez disso.',
    skillSection: 'Motion',
    skillGuideline: 'bounce or elastic easing',
  },
  {
    id: 'dark-glow',
    category: 'slop',
    name: 'Modo escuro com destaques brilhantes',
    description:
      'Fundos escuros com brilhos coloridos de box-shadow são o visual "descolado" padrão de UIs geradas por IA. Use iluminação sutil e proposital em vez disso — ou simplesmente não use o tema escuro.',
    skillSection: 'Color & Contrast',
    skillGuideline: 'dark mode with glowing accents',
  },
  {
    id: 'icon-tile-stack',
    category: 'slop',
    name: 'Ícone empilhado acima do título',
    description:
      'Um pequeno contêiner de ícone quadrado-arredondado acima de um título é o template universal de feature-cards de IA — todo gerador produz esse exato formato. Experimente ícone e título lado a lado, ou deixe o ícone no fluxo sem seu próprio contêiner.',
    skillSection: 'Typography',
    skillGuideline: 'large icons with rounded corners above every heading',
  },
  {
    id: 'italic-serif-display',
    category: 'slop',
    name: 'Título principal em serif itálico',
    description:
      'Serif itálico oversize (Fraunces, Recoleta, Playfair, Newsreader-italic) como título hero principal soa como bom gosto isoladamente, mas tornou-se o hero universal de landing pages de startups de IA. Use romano, ou mude para uma fonte display não-serif. Contextos editoriais/revisteiros podem legitimamente querer isso — julgue pelo contexto.',
    skillSection: 'Typography',
    skillGuideline: 'oversized italic serif as the hero headline',
  },
  {
    id: 'hero-eyebrow-chip',
    category: 'slop',
    name: 'Eyebrow hero / pill chip',
    description:
      'Um rótulo minúsculo em maiúsculas com letter-spacing posicionado imediatamente acima de um título hero oversize — ou o mesmo formato renderizado como pill chip — é agora o hero padrão de SaaS de IA. Remova o eyebrow, integre o kicker ao título, ou use-o como breadcrumb de navegação.',
    skillSection: 'Typography',
    skillGuideline: 'tiny uppercase tracked label above the hero headline',
  },
  {
    id: 'repeated-section-kickers',
    category: 'slop',
    severity: 'advisory',
    name: 'Rótulos kicker de seção repetidos',
    description:
      'Repetir rótulos minúsculos em maiúsculas com tracking acima dos títulos de seções transforma uma página de marca em andaime editorial de IA. Substitua-os por estrutura mais forte, artefatos, imagens ou um sistema de marca deliberado.',
    skillSection: 'Typography',
    skillGuideline: 'repeated eyebrow or kicker labels as section scaffolding',
  },

  // ── Quality: general design and accessibility issues ──
  {
    id: 'pure-black-white',
    category: 'quality',
    name: 'Fundo preto puro',
    description:
      'Preto puro #000000 como cor de fundo parece agressivo e artificial. Adicione um leve tom em direção à sua cor de marca (ex: oklch(12% 0.01 250)) para um visual mais refinado.',
    skillSection: 'Color & Contrast',
    skillGuideline: 'pure black (#000)',
  },
  {
    id: 'gray-on-color',
    category: 'quality',
    name: 'Texto cinza em fundo colorido',
    description:
      'Texto cinza parece desbotado em fundos coloridos. Use um tom mais escuro da cor de fundo em vez disso, ou branco/quase-branco para contraste.',
    skillSection: 'Color & Contrast',
    skillGuideline: 'gray text on colored backgrounds',
  },
  {
    id: 'low-contrast',
    category: 'quality',
    name: 'Texto com baixo contraste',
    description:
      'O texto não atende aos requisitos de contraste WCAG AA (4.5:1 para corpo, 3:1 para texto grande). Aumente o contraste entre o texto e o fundo.',
  },
  {
    id: 'layout-transition',
    category: 'quality',
    name: 'Animação de propriedades de layout',
    description:
      'Animar width, height, padding ou margin causa layout thrash e performance ruim. Use transform e opacity em vez disso, ou grid-template-rows para animações de altura.',
    skillSection: 'Motion',
    skillGuideline: 'Animate layout properties',
  },
  {
    id: 'line-length',
    category: 'quality',
    name: 'Linha muito longa',
    description:
      'Linhas de texto com mais de ~80 caracteres são difíceis de ler. O olho perde o ponto de referência ao voltar ao início da próxima linha. Adicione max-width (65ch a 75ch) aos contêineres de texto.',
    skillSection: 'Layout & Space',
    skillGuideline: 'wrap beyond ~80 characters',
  },
  {
    id: 'cramped-padding',
    category: 'quality',
    name: 'Padding apertado',
    description:
      'O texto está muito perto da borda de seu contêiner. Adicione pelo menos 8px (idealmente 12-16px) de padding dentro de contêineres com borda ou cor.',
  },
  {
    id: 'body-text-viewport-edge',
    category: 'quality',
    name: 'Texto do corpo colado na borda do viewport',
    description:
      'Parágrafos do corpo são renderizados colados na borda esquerda ou direita do viewport sem nenhum contêiner fornecendo padding horizontal. Envolva o conteúdo em um contêiner com pelo menos 16px (idealmente 24-32px) de padding horizontal, ou aplique max-width com mx-auto.',
  },
  {
    id: 'tight-leading',
    category: 'quality',
    name: 'Altura de linha apertada',
    description:
      'Altura de linha abaixo de 1.3x o tamanho da fonte dificulta a leitura de texto com múltiplas linhas. Use 1.5 a 1.7 para texto de corpo para que as linhas tenham espaço para respirar.',
  },
  {
    id: 'skipped-heading',
    category: 'quality',
    name: 'Nível de heading pulado',
    description:
      'Níveis de heading não devem ser pulados (ex: h1 seguido de h3 sem h2). Leitores de tela usam a hierarquia de headings para navegação. Pular níveis quebra a estrutura do documento.',
  },
  {
    id: 'justified-text',
    category: 'quality',
    name: 'Texto justificado',
    description:
      'Texto justificado sem hifenização cria espaçamento irregular entre palavras ("rios de espaço"). Use text-align: left para texto de corpo, ou ative hyphens: auto se precisar justificar.',
  },
  {
    id: 'tiny-text',
    category: 'quality',
    name: 'Texto de corpo minúsculo',
    description:
      'Texto de corpo abaixo de 12px é difícil de ler, especialmente em telas de alto DPI. Use pelo menos 14px para conteúdo de corpo; 16px é o ideal.',
  },
  {
    id: 'all-caps-body',
    category: 'quality',
    name: 'Texto de corpo em maiúsculas',
    description:
      'Longos trechos em maiúsculas são difíceis de ler. Reconhecemos palavras pela forma (ascenders e descenders), que as maiúsculas removem. Reserve maiúsculas para rótulos curtos e títulos.',
    skillSection: 'Typography',
    skillGuideline: 'long body passages in uppercase',
  },
  {
    id: 'wide-tracking',
    category: 'quality',
    name: 'Letter-spacing amplo no texto de corpo',
    description:
      'Letter-spacing acima de 0.05em no texto de corpo prejudica os agrupamentos naturais de caracteres e desacelera a leitura. Reserve tracking amplo apenas para rótulos curtos em maiúsculas.',
  },
];

const RULE_ENGINE_SUPPORT = {
  regex: new Set(['source', 'page-analyzer']),
  'static-html': new Set(['element', 'page']),
  browser: new Set(['element', 'page', 'layout']),
  visual: new Set(['visual-contrast']),
};

function getAntipattern(id) {
  return ANTIPATTERNS.find(rule => rule.id === id);
}

function getRulesForCategory(category) {
  return ANTIPATTERNS.filter(rule => rule.category === category);
}

function getRuleEngineSupport(engine) {
  return RULE_ENGINE_SUPPORT[engine] || new Set();
}

export {
  ANTIPATTERNS,
  RULE_ENGINE_SUPPORT,
  getAntipattern,
  getRulesForCategory,
  getRuleEngineSupport,
};
