/**
 * Manual metadata for the /anti-patterns page.
 *
 * The detection rules themselves live in cli/engine/registry/antipatterns.mjs.
 * This file adds three pieces of content that
 * can't be automated:
 *
 *  1. DETECTION_LAYERS: which layer (cli, browser, or llm) catches the
 *     rule. Manually classified by reading the detector source and the
 *     browser-only test file.
 *
 *  2. VISUAL_EXAMPLES: a tiny inline HTML snippet showing what the
 *     bad pattern actually looks like. Rendered inside each rule card.
 *     Snippets should be self-contained with inline styles, use the
 *     cream/paper/ink palette when possible, and sit naturally at
 *     ~100% width by ~120px height.
 *
 *  3. LLM_ONLY_RULES: DON'T lines from skill/SKILL.md
 *     that do not map to any detection rule. These can only be caught by
 *     the /critique skill's LLM pass. They appear on the /anti-patterns
 *     page alongside detected rules with an 'llm' layer badge.
 */

// ─── Detection layers ────────────────────────────────────────────────

/**
 * Which layer catches each rule.
 *
 *  'cli':     static analysis or jsdom (works with `npx impeccable detect`
 *             on files, no browser required)
 *  'browser': requires real browser layout (getBoundingClientRect with
 *             actual dimensions). Works via Puppeteer or the browser
 *             extension, NOT via the CLI on raw HTML.
 *  'llm':     no deterministic detector; only caught by /critique's LLM
 *             assessment pass.
 *
 * Per tests/detect-antipatterns-browser.test.mjs: only two rules genuinely
 * need real browser layout. Everything else is 'cli'.
 */
export const DETECTION_LAYERS = {
  'side-tab': 'cli',
  'border-accent-on-rounded': 'cli',
  'overused-font': 'cli',
  'single-font': 'cli',
  'flat-type-hierarchy': 'cli',
  'icon-tile-stack': 'cli',
  'gradient-text': 'cli',
  'ai-color-palette': 'cli',
  'dark-glow': 'cli',
  'nested-cards': 'cli',
  'monotonous-spacing': 'cli',
  'everything-centered': 'cli',
  'bounce-easing': 'cli',
  'all-caps-body': 'cli',
  'pure-black-white': 'cli',
  'gray-on-color': 'cli',
  'low-contrast': 'cli',
  'layout-transition': 'cli',
  'tight-leading': 'cli',
  'skipped-heading': 'cli',
  'justified-text': 'cli',
  'tiny-text': 'cli',
  'wide-tracking': 'cli',
  // Browser-only: need real layout measurements.
  'cramped-padding': 'browser',
  'line-length': 'browser',
};

export const LAYER_LABELS = {
  cli: 'CLI',
  browser: 'Navegador',
  llm: 'Somente LLM',
};

export const LAYER_DESCRIPTIONS = {
  cli: 'Determinístico. Executa via `npx impeccable detect` em arquivos, sem necessidade de navegador.',
  browser: 'Determinístico, mas precisa de layout real no navegador. Executa via extensão de navegador ou Puppeteer, não pelo CLI puro.',
  llm: 'Não detectado por nenhum detector determinístico. Sinalizado por /impeccable critique durante sua revisão de design por LLM.',
};

// ─── Visual examples ─────────────────────────────────────────────────

/**
 * One tiny inline HTML snippet per rule showing what the bad pattern
 * looks like. Snippets use inline styles only and are sized to fit the
 * rule card preview area (~100% wide, ~120px tall).
 */
export const VISUAL_EXAMPLES = {
  'side-tab': `<div style="background: #fff; border: 1px solid #e8e4df; border-left: 4px solid oklch(60% 0.22 265); border-radius: 6px; padding: 14px 16px; width: 220px; font-family: system-ui, sans-serif; font-size: 13px; color: #111;"><div style="font-weight: 600; margin-bottom: 4px;">Título de alerta</div><div style="color: #666; font-size: 12px;">Faixa colorida espessa em um lado.</div></div>`,

  'border-accent-on-rounded': `<div style="background: #fff; border: 2px solid oklch(60% 0.22 290); border-radius: 16px; padding: 14px 18px; width: 220px; font-family: system-ui, sans-serif; font-size: 13px; color: #111;"><div style="font-weight: 600;">Card arredondado</div><div style="color: #666; font-size: 12px;">Borda colorida espessa conflita com o raio.</div></div>`,

  'overused-font': `<div style="font-family: Inter, system-ui, sans-serif; font-size: 15px; color: #111; line-height: 1.4;"><div style="font-weight: 600; margin-bottom: 4px;">Mais um título em Inter</div><div style="color: #555; font-size: 13px;">Toda homepage de SaaS parece com isso.</div></div>`,

  'single-font': `<div style="font-family: system-ui, sans-serif; font-size: 14px; color: #111;"><div style="font-size: 19px; font-weight: 600; margin-bottom: 6px;">Título na fonte do corpo</div><div style="color: #555;">Corpo na mesma fonte. Sem contraste. Plano.</div></div>`,

  'flat-type-hierarchy': `<div style="font-family: system-ui, sans-serif; color: #111; line-height: 1.3;"><div style="font-size: 17px; font-weight: 600;">Título</div><div style="font-size: 16px; font-weight: 500; margin: 2px 0;">Subtítulo</div><div style="font-size: 15px; color: #555;">Texto do corpo quase no mesmo tamanho.</div></div>`,

  'icon-tile-stack': `<div style="font-family: system-ui, sans-serif; color: #111;"><div style="width: 44px; height: 44px; border-radius: 10px; background: linear-gradient(135deg, oklch(62% 0.22 265), oklch(70% 0.20 320)); display: flex; align-items: center; justify-content: center; font-size: 20px; color: #fff; margin-bottom: 10px;">✦</div><div style="font-size: 14px; font-weight: 600; margin-bottom: 2px;">Nome da funcionalidade</div><div style="font-size: 12px; color: #666;">Bloco de ícone arredondado acima do título.</div></div>`,

  'gradient-text': `<div style="font-family: system-ui, sans-serif;"><div style="font-size: 28px; font-weight: 700; background: linear-gradient(135deg, oklch(65% 0.25 320), oklch(60% 0.25 265)); -webkit-background-clip: text; background-clip: text; color: transparent; line-height: 1.1;">Construa o Futuro</div><div style="font-size: 12px; color: #888; margin-top: 4px;">Texto em gradiente mata a escaneabilidade.</div></div>`,

  'ai-color-palette': `<div style="display: flex; gap: 6px;"><div style="width: 44px; height: 44px; border-radius: 6px; background: oklch(60% 0.22 265);"></div><div style="width: 44px; height: 44px; border-radius: 6px; background: oklch(62% 0.25 300);"></div><div style="width: 44px; height: 44px; border-radius: 6px; background: oklch(64% 0.25 340);"></div><div style="width: 44px; height: 44px; border-radius: 6px; background: oklch(70% 0.20 200);"></div></div>`,

  'dark-glow': `<div style="background: #0a0b14; padding: 18px 20px; border-radius: 10px; font-family: system-ui, sans-serif;"><div style="color: oklch(78% 0.22 280); text-shadow: 0 0 12px oklch(78% 0.22 280 / 0.7); font-size: 16px; font-weight: 600;">Neon no escuro</div><div style="color: oklch(60% 0.12 260); font-size: 12px; margin-top: 4px;">Slop cyberpunk por padrão.</div></div>`,

  'nested-cards': `<div style="background: #f5f3ef; border: 1px solid #e0dcd4; border-radius: 10px; padding: 10px;"><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 8px; padding: 10px;"><div style="background: #f5f3ef; border: 1px solid #e8e4df; border-radius: 6px; padding: 8px; font-size: 12px; font-family: system-ui, sans-serif; color: #555;">Card dentro de card dentro de card.</div></div></div>`,

  'monotonous-spacing': `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;"><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 6px; height: 48px;"></div><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 6px; height: 48px;"></div><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 6px; height: 48px;"></div><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 6px; height: 48px;"></div><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 6px; height: 48px;"></div><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 6px; height: 48px;"></div></div>`,

  'everything-centered': `<div style="font-family: system-ui, sans-serif; text-align: center; color: #111;"><div style="font-size: 16px; font-weight: 600; margin-bottom: 6px;">Título centralizado</div><div style="font-size: 12px; color: #555; margin-bottom: 10px;">Tudo centralizado por padrão.</div><div style="display: inline-block; background: #111; color: #fff; padding: 6px 14px; border-radius: 6px; font-size: 12px;">Chamada para ação</div></div>`,

  'bounce-easing': `<div style="font-family: system-ui, sans-serif; color: #111; display: flex; align-items: center; gap: 10px;"><div style="width: 36px; height: 36px; border-radius: 50%; background: oklch(65% 0.22 265); animation: bouncey 0.9s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;"></div><div style="font-size: 12px; color: #555;">Bounce + elastic easing parece ultrapassado.</div><style>@keyframes bouncey { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }</style></div>`,

  'all-caps-body': `<div style="font-family: system-ui, sans-serif; color: #111; font-size: 12px; text-transform: uppercase; letter-spacing: 0.03em; line-height: 1.5;">Passagens longas em maiúsculas são difíceis de ler. Reconhecemos palavras pela forma, que as maiúsculas removem.</div>`,

  'pure-black-white': `<div style="background: #ffffff; padding: 16px 18px; color: #000000; font-family: system-ui, sans-serif; font-size: 14px;"><div style="font-weight: 600; margin-bottom: 4px;">Preto puro sobre branco puro</div><div style="font-size: 12px; color: #000;">Nenhum dos dois existe na natureza. Sempre matize.</div></div>`,

  'gray-on-color': `<div style="background: oklch(60% 0.20 265); padding: 16px 18px; border-radius: 6px; font-family: system-ui, sans-serif;"><div style="color: #9ca3af; font-size: 13px;">Texto cinza em fundo colorido. Desbotado e difícil de ler.</div></div>`,

  'low-contrast': `<div style="background: #fff; padding: 16px 18px; font-family: system-ui, sans-serif;"><div style="color: #d4d4d4; font-size: 13px;">Texto cinza claro em fundo branco. Contraste 1.6:1, falha na WCAG.</div></div>`,

  'layout-transition': `<div style="font-family: system-ui, sans-serif; color: #111; display: flex; align-items: center; gap: 10px;"><div style="background: oklch(65% 0.22 265); border-radius: 6px; animation: janky 1.2s ease-in-out infinite; width: 60px; height: 30px;"></div><div style="font-size: 12px; color: #555;">Animar width/height causa layout jank.</div><style>@keyframes janky { 0%,100% { width: 60px; } 50% { width: 120px; } }</style></div>`,

  'cramped-padding': `<div style="font-family: system-ui, sans-serif;"><button style="background: #111; color: #fff; border: none; border-radius: 4px; padding: 2px 6px; font-size: 13px; font-weight: 500;">Comprar agora</button> <span style="color: #555; font-size: 12px; margin-left: 8px;">2px de padding vertical.</span></div>`,

  'tight-leading': `<div style="font-family: system-ui, sans-serif; font-size: 13px; color: #111; line-height: 1.0; max-width: 220px;">Entrelinha apertada faz o texto de corpo multilinha parecer espremido e difícil para o olho acompanhar entre as linhas.</div>`,

  'skipped-heading': `<div style="font-family: system-ui, sans-serif; color: #111;"><h1 style="font-size: 20px; font-weight: 700; margin: 0 0 4px;">Título da página (h1)</h1><h3 style="font-size: 13px; font-weight: 600; margin: 0; color: #555;">Subseção (h3), h2 pulado</h3></div>`,

  'justified-text': `<div style="font-family: system-ui, sans-serif; font-size: 12px; color: #111; text-align: justify; max-width: 230px; line-height: 1.5;">Texto justificado em telas cria rios de espaços em branco porque navegadores não hifenizam bem. Deixe isso para impressão.</div>`,

  'tiny-text': `<div style="font-family: system-ui, sans-serif; color: #111;"><div style="font-size: 15px; margin-bottom: 6px;">Texto de corpo regular</div><div style="font-size: 9px; color: #555;">E então letras miúdas a 9 pixels que ninguém jamais vai ler.</div></div>`,

  'wide-tracking': `<div style="font-family: system-ui, sans-serif; font-size: 13px; color: #111; letter-spacing: 0.22em; max-width: 230px; line-height: 1.6;">Tracking largo no texto do corpo desacelera a leitura ao quebrar agrupamentos naturais de caracteres.</div>`,

  'line-length': `<div style="font-family: system-ui, sans-serif; font-size: 13px; color: #111; line-height: 1.55; max-width: 100%;">Parágrafos mais largos que aproximadamente 75 caracteres por linha tornam-se cansativos porque o olho precisa percorrer uma distância excessiva de volta ao início da próxima linha, perdendo o lugar.</div>`,

  // ── LLM-only rule visuals ─────────────────────────────────────────

  'monospace-as-technical': `<div style="font-family: 'Courier New', monospace; color: #111;"><div style="font-size: 18px; font-weight: 700; margin-bottom: 6px;">TECHNICAL_TOOL</div><div style="font-size: 11px; color: #555;">Mono para vibes de "desenvolvedor". Preguiçoso.</div></div>`,

  'dark-mode-default': `<div style="background: #0f1117; padding: 18px; border-radius: 8px; font-family: system-ui, sans-serif;"><div style="color: #e5e7eb; font-size: 14px; font-weight: 600; margin-bottom: 4px;">Escuro por padrão</div><div style="color: #9ca3af; font-size: 11px;">Usar escuro por padrão é uma fuga de uma decisão.</div></div>`,

  'everything-in-cards': `<div style="background: #fff; border: 1px solid #e8e4df; border-radius: 8px; padding: 10px;"><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 6px; padding: 8px; font-family: system-ui, sans-serif; font-size: 12px; color: #111;"><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 4px; padding: 6px;">Título</div></div><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 6px; padding: 8px; margin-top: 6px; font-family: system-ui, sans-serif; font-size: 11px; color: #555;">Card em cada coisinha.</div></div>`,

  'identical-card-grids': `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; font-family: system-ui, sans-serif;">${'<div style="background: #fff; border: 1px solid #e8e4df; border-radius: 6px; padding: 10px; display: flex; flex-direction: column; align-items: flex-start; gap: 4px;"><div style="width: 18px; height: 18px; background: oklch(62% 0.20 265); border-radius: 4px;"></div><div style="font-size: 10px; font-weight: 600; color: #111;">Funcionalidade</div><div style="font-size: 9px; color: #888;">Cópia curta.</div></div>'.repeat(6)}</div>`,

  'hero-metric-layout': `<div style="font-family: system-ui, sans-serif; text-align: left;"><div style="font-size: 42px; font-weight: 800; background: linear-gradient(135deg, oklch(65% 0.25 265), oklch(65% 0.25 340)); -webkit-background-clip: text; background-clip: text; color: transparent; line-height: 1;">10M+</div><div style="font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 2px;">Usuários ativos</div><div style="display: flex; gap: 14px; margin-top: 10px; font-size: 10px; color: #555;"><span><strong>99.9%</strong> uptime</span><span><strong>200ms</strong> p50</span></div></div>`,

  'glassmorphism': `<div style="position: relative; width: 100%; height: 100%; background: linear-gradient(135deg, oklch(70% 0.22 265), oklch(70% 0.25 340)); border-radius: 10px; overflow: hidden; display: flex; align-items: center; justify-content: center;"><div style="background: rgba(255,255,255,0.25); -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.4); border-radius: 10px; padding: 14px 18px; color: #fff; font-family: system-ui, sans-serif; font-size: 12px; font-weight: 600; box-shadow: 0 8px 30px rgba(0,0,0,0.12);">Card de vidro fosco</div></div>`,

  'sparkline-decoration': `<div style="background: #fff; border: 1px solid #e8e4df; border-radius: 8px; padding: 14px 16px; width: 220px; font-family: system-ui, sans-serif;"><div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;"><div><div style="font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 0.08em;">Receita</div><div style="font-size: 20px; font-weight: 700; color: #111;">$42.1k</div></div><svg width="60" height="28" viewBox="0 0 60 28" style="flex-shrink: 0;"><polyline points="0,20 10,18 20,22 30,10 40,14 50,6 60,12" stroke="oklch(62% 0.22 265)" stroke-width="2" fill="none"/></svg></div><div style="font-size: 10px; color: #888;">Mini gráfico, sem informação real.</div></div>`,

  'generic-drop-shadows': `<div style="display: flex; gap: 10px;"><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 10px; width: 70px; height: 70px; box-shadow: 0 10px 30px rgba(0,0,0,0.08);"></div><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 10px; width: 70px; height: 70px; box-shadow: 0 10px 30px rgba(0,0,0,0.08);"></div><div style="background: #fff; border: 1px solid #e8e4df; border-radius: 10px; width: 70px; height: 70px; box-shadow: 0 10px 30px rgba(0,0,0,0.08);"></div></div>`,

  'modal-reflex': `<div style="position: relative; width: 100%; height: 100%; background: #f5f3ef; border-radius: 8px; overflow: hidden;"><div style="position: absolute; inset: 0; background: rgba(0,0,0,0.35);"></div><div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #fff; border-radius: 8px; padding: 14px 18px; width: 200px; font-family: system-ui, sans-serif; box-shadow: 0 20px 60px rgba(0,0,0,0.2);"><div style="font-size: 13px; font-weight: 600; color: #111; margin-bottom: 4px;">Tem certeza?</div><div style="font-size: 11px; color: #666; margin-bottom: 8px;">Realmente, verdadeiramente certo disso?</div><div style="display: flex; gap: 6px; justify-content: flex-end;"><div style="background: #eee; color: #555; padding: 4px 8px; border-radius: 4px; font-size: 10px;">Cancelar</div><div style="background: oklch(60% 0.22 265); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 10px;">OK</div></div></div></div>`,

  'every-button-primary': `<div style="display: flex; flex-direction: column; gap: 6px; font-family: system-ui, sans-serif;"><div style="display: flex; gap: 6px;"><button style="background: oklch(60% 0.22 265); color: #fff; border: none; border-radius: 5px; padding: 6px 12px; font-size: 11px; font-weight: 600;">Salvar</button><button style="background: oklch(60% 0.22 265); color: #fff; border: none; border-radius: 5px; padding: 6px 12px; font-size: 11px; font-weight: 600;">Cancelar</button><button style="background: oklch(60% 0.22 265); color: #fff; border: none; border-radius: 5px; padding: 6px 12px; font-size: 11px; font-weight: 600;">Excluir</button></div><div style="font-size: 10px; color: #888;">Toda ação grita igual.</div></div>`,

  'redundant-headers': `<div style="font-family: system-ui, sans-serif; color: #111; max-width: 230px;"><div style="font-size: 14px; font-weight: 600; margin-bottom: 4px;">Visão geral</div><div style="font-size: 11px; color: #555; line-height: 1.5;">Esta é a seção de visão geral, que fornece uma visão geral da visão geral.</div></div>`,

  'mobile-amputation': `<div style="font-family: system-ui, sans-serif;"><div style="display: flex; align-items: center; gap: 8px; padding: 8px 10px; background: #fff; border: 1px solid #e8e4df; border-radius: 6px; margin-bottom: 4px; font-size: 12px; color: #999; text-decoration: line-through;"><span>Exportar para CSV</span></div><div style="font-size: 10px; color: #888; margin-top: 4px;">"Não disponível no mobile."</div></div>`,
};

/**
 * Anti-patterns that live in the /impeccable skill's DON'T list but
 * don't have a deterministic detector. These can only be caught by
 * /critique running an LLM assessment pass.
 *
 * Each entry looks like a detection rule: id, category, name,
 * description, skillSection. The generator merges these into the
 * grouped sections alongside detected rules with an 'llm' layer badge.
 */
// ─── Gallery: real examples in the wild ──────────────────────────────

/**
 * Curated real-world examples of anti-patterns caught in the wild.
 * Each entry maps to:
 *   - public/antipattern-images/{id}.png  (preview thumbnail)
 *   - public/antipattern-examples/{id}.html  (standalone live example)
 * Rendered as a dedicated section on the /anti-patterns page, replacing
 * the old /gallery route which was confusingly labeled in the top nav.
 */
export const GALLERY_ITEMS = [
  {
    id: 'purple-gradients',
    title: 'Gradientes Roxos por Toda Parte',
    desc:
      'A paleta de cores da IA: gradientes roxo-para-azul em tudo. Botões, textos, fundos, orbes. O novo "dar um toque especial".',
  },
  {
    id: 'lazy-cool',
    title: '"Cool" Preguiçoso',
    desc:
      'Glassmorphism, brilhos neon, orbes borrados, monospace em tudo. Parece um projeto de hackathon, não um produto.',
  },
  {
    id: 'lazy-impact',
    title: '"Impacto" Preguiçoso',
    desc:
      'Na dúvida, anime tudo. Botões pulando, ícones balançando, texto em gradiente, badges flutuantes. Movimento sem significado.',
  },
  {
    id: 'thick-border-cards',
    title: 'Cards com Aba Lateral',
    desc:
      'Uma borda colorida espessa em um lado de um card arredondado. O indicador mais reconhecível de UI gerada por IA.',
  },
  {
    id: 'cardocalypse',
    title: 'Cardocalipse',
    desc:
      'Cards dentro de cards dentro de cards. Cinco níveis de aninhamento, cada um com seu próprio padding e sombra.',
  },
  {
    id: 'layout-templates',
    title: 'Layouts Copiados e Colados',
    desc:
      'O mesmo template hero-métrica-features repetido com cores diferentes. Quando cada seção parece igual, nada se destaca.',
  },
  {
    id: 'inter-everywhere',
    title: 'Inter por Toda Parte',
    desc:
      'Uma fonte para tudo. Títulos, corpo, rótulos, botões. Sem hierarquia tipográfica, sem personalidade, sem design.',
  },
  {
    id: 'massive-icons',
    title: 'Ícones Gigantes',
    desc:
      'Contêineres de ícones maiores que o conteúdo que introduzem. Quando a decoração é maior que a mensagem, as prioridades estão invertidas.',
  },
  {
    id: 'bad-contrast',
    title: 'Más Escolhas de Contraste',
    desc:
      'Texto cinza em fundos coloridos, rótulos de baixo contraste, combinações ilegíveis. Ter boa aparência e ser legível não deveria conflitar.',
  },
  {
    id: 'redundant-ux-writing',
    title: 'UX Writing Redundante',
    desc:
      'Rótulo, subrótulo, texto auxiliar e texto de dica dizendo a mesma coisa em palavras ligeiramente diferentes. Diga uma vez, diga bem.',
  },
  {
    id: 'modal-abuse',
    title: 'Abuso de Modais',
    desc:
      'Configurações complexas espremidas em um modal. Se precisa de barra de rolagem e três colunas, merece sua própria página.',
  },
];

// ─── LLM-only rules ──────────────────────────────────────────────────

export const LLM_ONLY_RULES = [
  {
    id: 'monospace-as-technical',
    category: 'slop',
    name: 'Monospace como atalho para "técnico"',
    description:
      'Usar uma fonte monospace para sinalizar vibes de "desenvolvedor / técnico". Opte por escolhas tipográficas reais em vez de um estereótipo preguiçoso.',
    skillSection: 'Typography',
  },
  {
    id: 'dark-mode-default',
    category: 'slop',
    name: 'Padrão para modo escuro por "segurança"',
    description:
      'Usar modo claro por padrão para estar seguro é o inverso de usar modo escuro por padrão para parecer legal. De qualquer forma, você está fugindo de uma decisão.',
    skillSection: 'Color & Contrast',
  },
  {
    id: 'everything-in-cards',
    category: 'slop',
    name: 'Envolvendo tudo em cards',
    description:
      'Nem todo conteúdo precisa de um contêiner com borda. Espaçamento e alinhamento criam agrupamento visual sem o overhead de um card.',
    skillSection: 'Layout & Space',
  },
  {
    id: 'identical-card-grids',
    category: 'slop',
    name: 'Grids de cards idênticos',
    description:
      'Cards de mesmo tamanho com ícone + título + texto repetidos infinitamente. O layout padrão de homepage de IA.',
    skillSection: 'Layout & Space',
  },
  {
    id: 'hero-metric-layout',
    category: 'slop',
    name: 'Layout de métrica hero',
    description:
      'Número grande, rótulo pequeno, três estatísticas de apoio, acento em gradiente. Usado em todo lugar, confiável em nenhum.',
    skillSection: 'Layout & Space',
  },
  {
    id: 'glassmorphism',
    category: 'slop',
    name: 'Glassmorphism por toda parte',
    description:
      'Efeitos de blur, cards de vidro e bordas brilhantes usados como decoração em vez de resolver um real problema de camadas.',
    skillSection: 'Visual Details',
  },
  {
    id: 'sparkline-decoration',
    category: 'slop',
    name: 'Sparklines como decoração',
    description:
      'Mini gráficos que parecem sofisticados mas não transmitem informação significativa. Se os dados importam, dê-lhes espaço.',
    skillSection: 'Visual Details',
  },
  {
    id: 'generic-drop-shadows',
    category: 'slop',
    name: 'Retângulos arredondados com sombras genéricas',
    description:
      'A forma mais segura e mais esquecível da web. Pode ser a saída de qualquer IA. Comprometa-se com um tratamento visual mais forte.',
    skillSection: 'Visual Details',
  },
  {
    id: 'modal-reflex',
    category: 'slop',
    name: 'Recorrendo a modais por reflexo',
    description:
      'Modais interrompem o usuário e são preguiçosos como padrão de design. Use-os apenas quando não há realmente um lugar melhor para a interação.',
    skillSection: 'Visual Details',
  },
  {
    id: 'every-button-primary',
    category: 'quality',
    name: 'Todo botão é um botão primário',
    description:
      'Quando todo botão parece igualmente importante, nada se destaca como ação primária. Use ghost buttons, links de texto e estilos secundários para construir hierarquia.',
    skillSection: 'Interaction',
  },
  {
    id: 'redundant-headers',
    category: 'quality',
    name: 'Informação redundante',
    description:
      'Introduções que reafirmam o título. Rótulos de seção que repetem o título da página. Cards que ecoam sua própria legenda. Faça cada palavra conquistar seu lugar.',
    skillSection: 'Interaction',
  },
  {
    id: 'mobile-amputation',
    category: 'quality',
    name: 'Amputando funcionalidades no mobile',
    description:
      'Ocultar funcionalidades críticas no mobile por ser inconveniente. Adapte a interface ao contexto, não a esvazie.',
    skillSection: 'Responsive',
  },
];
