# Diretrizes do Repositório

## Bootstrap da skill: pule a etapa de post-update-cleanup

Se você carregar a skill Impeccable de `.agents/skills/impeccable/SKILL.md` (ou qualquer diretório de harness sibling neste repo), ela começa com um bloco `<post-update-cleanup>` que executa `scripts/cleanup-deprecated.mjs` e depois se auto-deleta. **Não o execute aqui, e não delete o bloco.** Este repo é a fonte de verdade da skill; cleanup-deprecated assume um projeto consumidor e tocaria em arquivos de origem legítimos. O bloco é regenerado a partir de `skill/SKILL.md` em cada `bun run build`, então qualquer exclusão volta a aparecer. Pule-o silenciosamente e prossiga com a tarefa.

## Estrutura do Projeto e Organização de Módulos

`source/` é a fonte de verdade. Autor skills em `skill/` e mantenha a saída de provedor em `dist/` gerada, não editada manualmente. A lógica de build está em `scripts/`, com configurações de provedor em `scripts/lib/transformers/`. Código de detecção em tempo de execução é distribuído a partir de `src/`. O site está em `public/`, API local/servidor de dev está em `server/`, e cobertura de regressão está em `tests/` com fixtures em `tests/fixtures/`.

## Comandos de Build, Teste e Desenvolvimento

- `bun run dev` - iniciar o servidor local Bun.
- `bun run build` - regenerar `dist/`, ativos derivados do site e saída de validação.
- `bun run rebuild` - limpar e reconstruir tudo do zero.
- `bun test tests/build.test.js` - executar um teste Bun focado.
- `bun run test` - executar a suite completa de testes Bun + Node.
- `bun run test:live-e2e` - E2E de live-mode opt-in contra fixtures de framework (~2 min; precisa de `npx playwright install chromium` uma vez).
- `bun run build:browser` / `bun run build:extension` - reconstruir bundles específicos de navegador.

Execute `bun run build` após alterar qualquer coisa em `source/`, código de transformer, ou contagens visíveis ao usuário.

## Pegadinhas do sandbox para agentes Codex

Alguns fluxos de trabalho do repo precisam ser executados fora do sandbox no app desktop:

- Operações SSH do GitHub que dependem do agente SSH 1Password, como `gh pr checkout`, podem falhar no sandbox com `sign_and_send_pubkey` ou sem prompt de aprovação do 1Password. Execute-as fora do sandbox em vez de recorrer a soluções alternativas não relacionadas.
- `bun run build` reescreve diretórios de harness comitados como `.agents/skills/`. No sandbox, o Bun pode encontrar erros de filesystem ao remover/recriar essas árvores (por exemplo `EFAULT` em `.agents/skills`). Execute o build fora do sandbox antes de tratar como uma falha real de build.
- Testes Puppeteer/headless-Chrome, especialmente `node --test tests/detect-antipatterns-browser.test.mjs` e a porção de navegador de `bun run test`, podem travar no sandbox ao iniciar o Chrome. Execute-os fora do sandbox para resultados definitivos.
- A suite de fixtures jsdom é intencionalmente executada com Node, não Bun: use `node --test tests/detect-antipatterns-fixtures.test.mjs` ou o script `bun run test`. Um `bun test tests/detect-antipatterns-fixtures.test.mjs` direto pode expirar e não é o sinal suportado.

## Estilo de Codificação e Convenções de Nomenclatura

Use ESM, ponto e vírgula, e o estilo de indentação de dois espaços existente em JS, HTML e CSS. Prefira módulos pequenos e de propósito único em vez de grandes abstrações. Mantenha nomes de arquivos descritivos e em minúsculas com hífens quando necessário; entrypoints de skills permanecem como `SKILL.md`, scripts auxiliares usam `.js` ou `.mjs`. No frontmatter de origem, use nomes claros em kebab-case e descrições concisas. Não há formatter ou linter dedicado configurado aqui, então corresponda de perto ao código circundante.

## Diretrizes de Teste

Os testes usam o runner de testes do Bun mais o `--test` nativo do Node. Nomeie testes como `*.test.js` ou `*.test.mjs` e coloque novos fixtures perto do comportamento que cobrem, geralmente em `tests/fixtures/`. Prefira execuções de teste direcionadas durante a iteração, depois finalize com `bun run test`. Se você alterar saídas geradas ou transforms de provedor, verifique tanto o parsing de origem quanto pelo menos um caminho de provedor afetado em `dist/`.

Para mudanças em `skill/scripts/live-*.{mjs,js}`, execute também `bun run test:live-e2e` (mantido fora da suite padrão porque faz `npm install` real por fixture e inicializa dev servers de framework). Limite a uma fixture com `IMPECCABLE_E2E_ONLY=<fixture-name>` durante a iteração; passe `IMPECCABLE_E2E_DEBUG=1` para dumps de page-DOM e dev-server-log em caso de falha. Schema e guia de autoria para novas fixtures estão em `tests/framework-fixtures/README.md`.

Defina `IMPECCABLE_E2E_AGENT=llm` para trocar o agente fake determinístico por um com API (`tests/live-e2e/agents/llm-agent.mjs`). Claude Haiku 4.5 é o caminho primário sempre que `ANTHROPIC_API_KEY` está definido. DeepSeek V4 Flash é o fallback barato secundário quando apenas `DEEPSEEK_API_KEY` está definido, e pode ser forçado com `IMPECCABLE_E2E_LLM_PROVIDER=deepseek` ou `bun run test:live-e2e -- --llm-provider=deepseek`; sobrescreva qualquer modelo via `IMPECCABLE_E2E_LLM_MODEL` ou `--llm-model=<model>`. Os testes pulam de forma limpa quando a chave do provedor selecionado não está definida. Este caminho acessa a API — use para verificação, não para CI.

## Regras de detecção de anti-patterns

`cli/engine/detect-antipatterns.mjs` é a fonte de verdade para o motor de regras. Ele alimenta o CLI, o overlay do site (`cli/engine/detect-antipatterns-browser.js`, regenerado por `bun run build:browser`), a extensão Chrome (`extension/detector/`, regenerada por `bun run build:extension`), e o `DETECTION_COUNT` da homepage em `site/public/js/generated/counts.js` (regenerado por `bun run build`). Após qualquer mudança de regra, execute os três builds mais `bun run test` para que nada se desvie.

A ordem TDD é innegociável:

1. Adicione uma fixture em `tests/fixtures/antipatterns/{rule-id}.html` com duas colunas (should-flag / should-pass), cada caso identificado por um heading único. ≥4 casos flag e ≥5 formas de falso-positivo. **Use dimensões de pixel explícitas no CSS** — jsdom não faz layout.
2. Adicione um teste falhando em `tests/detect-antipatterns-fixtures.test.mjs` usando o padrão snippet-substring (regex `/"([^"]+)"/` contra listas `SHOULD_FLAG` / `SHOULD_PASS`).
3. Adicione a entrada da regra ao array `ANTIPATTERNS` (`id`, `category` = `slop` ou `quality`, `name`, `description`, `skillSection` / `skillGuideline` opcional).
4. Implemente uma `checkXxx(opts)` pura retornando `[{ id, snippet }]` — sem acesso a DOM dentro.
5. Adicione dois adaptadores que envolvem a verificação pura: `checkElementXxxDOM(el)` para o navegador (`getComputedStyle` + `getBoundingClientRect`) e `checkElementXxx(el, tag, window)` para jsdom (`parseFloat(style.width)` em vez de layout). Conecte **ambos** os adaptadores em **ambos** os loops de elementos em `cli/engine/detect-antipatterns.mjs` (loop do navegador ~linha 1837, loop jsdom em `detectHtml` ~linha 2058). Esquecer um é o erro mais comum.
6. Verifique em uma página ao vivo em `http://localhost:3000/fixtures/antipatterns/{rule-id}.html` e na homepage. Os dois caminhos de adaptador podem discordar.

Convenções: envolva o texto de heading identificador em aspas duplas retas dentro de snippets para que o teste de fixture possa extraí-lo. Helpers específicos do jsdom `resolveBackground()`, `resolveGradientStops()` e `parseGradientColors()` existem porque `background:` shorthand não é decomposto e cores computadas não são normalizadas no jsdom — use-os. Regras de referência para copiar: `side-tab` (borda), `low-contrast` (cor+gradiente), `icon-tile-stack` (relação entre siblings), `flat-type-hierarchy` (nível de página).

## Diretrizes de Commit e Pull Request

O histórico recente favorece subjects curtos e imperativos como `Fix: ...`, `Add ...`, `Improve ...`, ou `Bump ...`. Mantenha commits focados e explique o impacto visível ao usuário quando não for óbvio. PRs devem resumir o que mudou, listar a validação realizada e destacar artefatos regenerados como `dist/` ou `build/`. Inclua screenshots para mudanças visíveis em `site/` e mencione provedores afetados quando o comportamento de transform mudar.

## Releases

As tags são por componente porque os três componentes são distribuídos independentemente: `skill-v` (`.claude-plugin/plugin.json` + `.claude-plugin/marketplace.json`), `cli-v` (`package.json`), `ext-v` (`extension/manifest.json`). Fluxo: bump o manifesto relevante, adicione uma entrada de changelog a `site/pages/index.astro` (skill = `vX.Y.Z` simples; CLI = `CLI vX.Y.Z`; extensão = `Extension vX.Y.Z` — o prefixo é como `scripts/release.mjs` encontra o bloco correto), commit, push, depois `bun run release:<skill|cli|ext>` (ou `--dry-run` primeiro). O script recusa em árvore suja, HEAD não enviado, entrada de changelog faltando, ou saídas de build desatualizadas; reexecuções de `bun run build` / `bun run build:extension` de skill e extensão devem produzir diff zero. Releases de skill anexam `dist/universal.zip`; releases de extensão anexam `dist/extension.zip`. O CLI é distribuído para npm via `npm publish` separado, e o zip da extensão é enviado ao Chrome Web Store manualmente — ambos lembrados no final do script. Corrija notas já distribuídas com `gh release edit <tag> --notes-file <md>`.

## Notas para Contribuidores

Não edite arquivos de provedor gerados diretamente, a menos que esteja intencionalmente corrigindo saída gerada como parte de uma mudança no sistema de build. Prefira corrigir a fonte original em `skill/`, `scripts/` ou `cli/`, depois regenerar os artefatos.
