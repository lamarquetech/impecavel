// ============================================
// DATA: Skill focus areas, command processes, relationships
// ============================================

// Items that are fully complete and ready for public use
// All others will show "Coming Soon"
export const readySkills = [
  'impeccable'  // Consolidated skill with all design domains
];

export const readyCommands = [
  'layout'  // First command to be fully completed
];

// Commands marked as alpha — shown with a badge in the UI
export const alphaCommands = [
  'live'
];

// Consolidated impeccable skill with reference domains
export const skillFocusAreas = {
  'impeccable': [
    { area: 'Tipografia', detail: 'Escala, ritmo, hierarquia, expressão' },
    { area: 'Cor & Contraste', detail: 'Acessibilidade, sistemas, temas' },
    { area: 'Design Espacial', detail: 'Layout, espaçamento, composição' },
    { area: 'Responsivo', detail: 'Layouts fluidos, alvos de toque' },
    { area: 'Interação', detail: 'Estados, feedback, affordances' },
    { area: 'Movimento', detail: 'Micro-interações, transições' },
    { area: 'UX Writing', detail: 'Clareza, voz, mensagens de erro' }
  ]
};

// Guideline counts per dimension (verified from reference files)
export const dimensionGuidelineCounts = {
  'Typography': 33,
  'Color & Contrast': 29,
  'Spatial Design': 27,
  'Motion': 32,
  'Interaction': 36,
  'Responsive': 23,
  'UX Writing': 32
};

// Reference domains within the impeccable skill
export const skillReferenceDomains = [
  'typography',
  'color-and-contrast',
  'spatial-design',
  'responsive-design',
  'interaction-design',
  'motion-design',
  'ux-writing'
];

export const commandProcessSteps = {
  'impeccable': ['Direto', 'Design', 'Construir', 'Refinar'],
  'craft': ['Estruturar', 'Referência', 'Construir', 'Iterar'],
  'shape': ['Entrevistar', 'Sintetizar', 'Brief', 'Confirmar'],
  'overdrive': ['Avaliar', 'Escolher', 'Construir', 'Polir'],
  'critique': ['Avaliar', 'Criticar', 'Priorizar', 'Sugerir'],
  'audit': ['Escanear', 'Documentar', 'Priorizar', 'Recomendar'],
  'typeset': ['Avaliar', 'Selecionar', 'Escalar', 'Refinar'],
  'layout': ['Avaliar', 'Grid', 'Ritmo', 'Equilíbrio'],
  'colorize': ['Analisar', 'Estratégia', 'Aplicar', 'Equilibrar'],
  'animate': ['Identificar', 'Design', 'Implementar', 'Polir'],
  'delight': ['Identificar', 'Design', 'Implementar'],
  'bolder': ['Analisar', 'Amplificar', 'Impacto'],
  'quieter': ['Analisar', 'Reduzir', 'Refinar'],
  'distill': ['Auditar', 'Remover', 'Esclarecer'],
  'clarify': ['Ler', 'Simplificar', 'Melhorar', 'Testar'],
  'adapt': ['Analisar', 'Ajustar', 'Otimizar'],
  'polish': ['Descobrir', 'Revisar', 'Refinar', 'Verificar'],
  'optimize': ['Perfil', 'Identificar', 'Melhorar', 'Medir'],
  'harden': ['Avaliar', 'Implementar', 'Testar', 'Verificar'],
  'onboard': ['Identificar', 'Design', 'Guiar', 'Medir'],
  'teach': ['Explorar', 'Entrevistar', 'Sintetizar', 'Salvar'],
  'document': ['Escanear', 'Extrair', 'Descrever', 'Escrever'],
  'extract': ['Identificar', 'Abstrair', 'Migrar', 'Documentar'],
  'live': ['Iniciar', 'Selecionar', 'Gerar', 'Aceitar']
};

export const commandCategories = {
  // CREATE - build something new
  'impeccable': 'create',
  'craft': 'create',
  'shape': 'create',
  // EVALUATE - review and assess
  'critique': 'evaluate',
  'audit': 'evaluate',
  // REFINE - improve existing design
  'typeset': 'refine',
  'layout': 'refine',
  'colorize': 'refine',
  'animate': 'refine',
  'delight': 'refine',
  'bolder': 'refine',
  'quieter': 'refine',
  'overdrive': 'refine',
  // SIMPLIFY - reduce and clarify
  'distill': 'simplify',
  'clarify': 'simplify',
  'adapt': 'simplify',
  // HARDEN - production-ready
  'polish': 'harden',
  'optimize': 'harden',
  'harden': 'harden',
  'onboard': 'harden',
  // SYSTEM - setup and tooling
  'teach': 'system',
  'document': 'system',
  'extract': 'system',
  'live': 'system'
};

// Skill relationships - now consolidated into impeccable skill
// The impeccable skill contains all domains as reference files
export const skillRelationships = {
  'impeccable': {
    description: 'Inteligência de design abrangente com carregamento progressivo de referências',
    referenceDomains: ['typography', 'color-and-contrast', 'spatial-design', 'responsive-design', 'interaction-design', 'motion-design', 'ux-writing']
  }
};

export const commandRelationships = {
  'impeccable': { flow: 'Criar: Design livre com inteligência de design completa' },
  'craft': { flow: 'Criar: Fluxo completo de estruturar-e-construir com iteração visual' },
  'shape': { flow: 'Criar: Planejar UX e UI através de descoberta estruturada' },
  'critique': { leadsTo: ['polish', 'distill', 'bolder', 'quieter', 'typeset', 'layout'], flow: 'Avaliar: Revisão de UX e design com pontuação' },
  'audit': { leadsTo: ['harden', 'optimize', 'adapt', 'clarify'], flow: 'Avaliar: Auditoria de qualidade técnica' },
  'typeset': { combinesWith: ['bolder', 'polish'], flow: 'Refinar: Corrigir tipografia e hierarquia de tipos' },
  'layout': { combinesWith: ['distill', 'adapt'], flow: 'Refinar: Corrigir layout e espaçamento' },
  'colorize': { combinesWith: ['bolder', 'delight'], flow: 'Refinar: Adicionar cor estratégica' },
  'animate': { combinesWith: ['delight'], flow: 'Refinar: Adicionar movimento proposital' },
  'delight': { combinesWith: ['bolder', 'animate'], flow: 'Refinar: Adicionar personalidade e alegria' },
  'bolder': { pairs: 'quieter', flow: 'Refinar: Amplificar designs tímidos' },
  'quieter': { pairs: 'bolder', flow: 'Refinar: Suavizar designs agressivos' },
  'overdrive': { combinesWith: ['animate', 'delight'], flow: 'Refinar: Efeitos tecnicamente extraordinários' },
  'distill': { combinesWith: ['quieter', 'polish'], flow: 'Simplificar: Reduzir à essência' },
  'clarify': { combinesWith: ['polish', 'adapt'], flow: 'Simplificar: Melhorar cópia de UX' },
  'adapt': { combinesWith: ['polish', 'clarify'], flow: 'Simplificar: Adaptar para diferentes contextos' },
  'polish': { flow: 'Reforçar: Passada final e alinhamento com design system' },
  'optimize': { flow: 'Reforçar: Melhorias de performance' },
  'harden': { combinesWith: ['optimize'], flow: 'Reforçar: Casos extremos, tratamento de erros e i18n' },
  'onboard': { combinesWith: ['clarify', 'delight'], flow: 'Reforçar: Experiências iniciais e estados vazios' },
  'teach': { flow: 'Sistema: Configuração de contexto de design do projeto' },
  'extract': { flow: 'Sistema: Extrair componentes e tokens do design system' },
  'live': { flow: 'Sistema: Modo de variante visual no navegador' }
};
