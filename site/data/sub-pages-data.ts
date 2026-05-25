/**
 * Command category and relationship data for docs pages.
 * Extracted from scripts/lib/sub-pages-data.js for use in Astro templates.
 */

export const SKILL_CATEGORIES: Record<string, string> = {
  impeccable: 'create',
  craft: 'create',
  shape: 'create',
  critique: 'evaluate',
  audit: 'evaluate',
  typeset: 'refine',
  layout: 'refine',
  colorize: 'refine',
  animate: 'refine',
  delight: 'refine',
  bolder: 'refine',
  quieter: 'refine',
  overdrive: 'refine',
  distill: 'simplify',
  clarify: 'simplify',
  adapt: 'simplify',
  polish: 'harden',
  optimize: 'harden',
  harden: 'harden',
  onboard: 'harden',
  teach: 'system',
  document: 'system',
  extract: 'system',
  live: 'system',
};

export const CATEGORY_ORDER = ['create', 'evaluate', 'refine', 'simplify', 'harden', 'system'];

export const CATEGORY_LABELS: Record<string, string> = {
  create: 'Criar',
  evaluate: 'Avaliar',
  refine: 'Refinar',
  simplify: 'Simplificar',
  harden: 'Reforçar',
  system: 'Sistema',
};

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  create: 'Construa algo novo, de uma página em branco a uma funcionalidade pronta.',
  evaluate: 'Revise o que você tem. Avalie, critique, encontre o que corrigir.',
  refine: 'Melhore uma dimensão por vez: tipo, layout, cor, movimento.',
  simplify: 'Elimine complexidade. Remova o que não conquista seu lugar.',
  harden: 'Torne pronto para produção. Casos extremos, performance, polimento.',
  system: 'Configuração e ferramentas. Trabalho de design system, extração, organização.',
};

export const COMMAND_RELATIONSHIPS: Record<string, {
  leadsTo?: string[];
  pairs?: string;
  combinesWith?: string[];
}> = {
  craft: { combinesWith: ['shape'] },
  shape: { combinesWith: ['craft'] },
  audit: { leadsTo: ['harden', 'optimize', 'adapt', 'clarify'] },
  critique: { leadsTo: ['polish', 'distill', 'bolder', 'quieter', 'typeset', 'layout'] },
  typeset: { combinesWith: ['bolder', 'polish'] },
  layout: { combinesWith: ['distill', 'adapt'] },
  colorize: { combinesWith: ['bolder', 'delight'] },
  animate: { combinesWith: ['delight'] },
  delight: { combinesWith: ['bolder', 'animate'] },
  bolder: { pairs: 'quieter' },
  quieter: { pairs: 'bolder' },
  overdrive: { combinesWith: ['animate', 'delight'] },
  distill: { combinesWith: ['quieter', 'polish'] },
  clarify: { combinesWith: ['polish', 'adapt'] },
  adapt: { combinesWith: ['polish', 'clarify'] },
  polish: {},
  optimize: {},
  harden: { combinesWith: ['optimize'] },
  onboard: { combinesWith: ['clarify', 'delight'] },
  teach: { combinesWith: ['document'] },
  document: { combinesWith: ['teach', 'extract'] },
  extract: { combinesWith: ['document'] },
  live: {},
};
