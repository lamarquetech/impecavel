# Referência de Capacidades de Skills dos Harnesses

Fonte de verdade sobre o que cada harness de codificação com IA suporta em termos de agent skills.
Usado para informar as configurações de provedor em `scripts/lib/transformers/providers.js`.

Última verificação: 2026-04-28

## Documentação Oficial

| Harness | URL da Documentação |
|---------|---------------------|
| Claude Code | https://code.claude.com/docs/en/skills |
| Cursor | https://cursor.com/docs/context/skills |
| Gemini CLI | https://geminicli.com/docs/cli/skills/ |
| Codex CLI | https://developers.openai.com/codex/skills |
| GitHub Copilot (Agents) | https://code.visualstudio.com/docs/copilot/customization/agent-skills |
| Kiro | https://kiro.dev/docs/skills/ |
| OpenCode | https://opencode.ai/docs/skills/ |
| Pi | https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/skills.md |
| Qoder | https://docs.qoder.com/extensions/skills |
| Trae | A definir (nenhuma documentação oficial de skills encontrada ainda) |
| Rovo Dev | https://support.atlassian.com/rovo/docs/extend-rovo-dev-cli-with-agent-skills |

## Conformidade com a Especificação

Todos os harnesses seguem a [especificação Agent Skills](https://agentskills.io/specification) em graus variados. A especificação define estes campos de frontmatter: `name`, `description`, `license`, `compatibility`, `metadata`, `allowed-tools`.

Extensões específicas de provedor além da especificação: `user-invocable`, `argument-hint`, `disable-model-invocation`, `allowed-tools` (sintaxe estendida), `model`, `effort`, `context`, `agent`, `hooks`, `subtask`, `mcp`.

## Suporte de Frontmatter

Campos marcados com * são padrão da especificação. Os demais são extensões de provedor.

| Campo | Claude Code | Cursor | Gemini | Codex | Copilot | Kiro | OpenCode | Pi | Qoder | Rovo Dev |
|-------|:-----------:|:------:|:------:|:-----:|:-------:|:----:|:--------:|:--:|:-----:|:--------:|
| `name`* | Sim | Sim | Sim | Sim | Sim | Sim | Sim | Sim | Sim | Sim |
| `description`* | Sim | Sim | Sim | Sim | Sim | Sim | Sim | Sim | Sim | Sim |
| `license`* | Sim | Sim | Ignorado | Não | Sim | Sim | Sim | Sim | Sim | Sim |
| `compatibility`* | Sim | Sim | Ignorado | Não | Sim | Sim | Sim | Sim | Sim | Sim |
| `metadata`* | Sim | Sim | Ignorado | Não | Sim | Sim | Sim | Sim | Sim | Sim |
| `allowed-tools`* | Sim | Não | Ignorado | Não | Não | Não | Sim | Sim | Sim | Sim |
| `user-invocable` | Sim | Não | Não | Não | Sim | Não | Sim | Não | Sim | Sim |
| `argument-hint` | Sim | Não | Não | Não | Sim | Não | Sim | Não | Sim | Sim |
| `disable-model-invocation` | Sim | Sim | Não | Não | Sim | Não | Sim | Sim | A definir | A definir |
| `model` | Sim | Não | Não | Não | Não | Não | Sim | Não | Não | Não |
| `effort` | Sim | Não | Não | Não | Não | Não | Não | Não | Não | Não |
| `context` | Sim | Não | Não | Não | Não | Não | Não | Não | Não | Não |
| `agent` | Sim | Não | Não | Não | Não | Não | Sim | Não | Não | Não |
| `hooks` | Sim | Não | Não | Não | Não | Não | Não | Não | Não | Não |

Notas:
- O Gemini CLI valida apenas `name` e `description`; outros campos da especificação são parseados mas ignorados.
- O Codex CLI usa um sidecar `agents/openai.yaml` separado para metadados de skill (ícones, branding, ferramentas MCP, controle de invocação). Agentes customizados nativos do Codex são arquivos TOML separados em `.codex/agents/` ou `~/.codex/agents/`.
- O Kiro reconhece `user-invocable` e `disable-model-invocation` conforme relatos da comunidade, mas não os documenta formalmente.
- Campos desconhecidos são silenciosamente ignorados por todos os harnesses.

## Estrutura de Diretório de Skills

| Harness | Diretório nativo | Também lê de |
|---------|-----------------|-------------|
| Claude Code | `.claude/skills/` | - |
| Cursor | `.cursor/skills/` | `.agents/skills/`, `.claude/skills/` |
| Gemini CLI | `.gemini/skills/` | `.agents/skills/` |
| Codex CLI | `.agents/skills/` (primário) | - |
| GitHub Copilot | `.github/skills/` | `.agents/skills/`, `.claude/skills/` |
| Kiro | `.kiro/skills/` | - |
| OpenCode | `.opencode/skills/` | `.agents/skills/`, `.claude/skills/` |
| Pi | `.pi/skills/` | `.agents/skills/` |
| Qoder | `.qoder/skills/` | `~/.qoder/skills/` (nível de usuário) |
| Trae China | `.trae-cn/skills/` | A definir |
| Trae International | `.trae/skills/` | A definir |
| Rovo Dev | `.rovodev/skills/` | `~/.rovodev/skills/` (nível de usuário) |

Todos os harnesses suportam a estrutura de diretório `{skill-name}/SKILL.md` com subdiretórios opcionais `reference/`, `scripts/` e `assets/`.

## Estrutura de Diretório de Subagentes Nativos

| Harness | Diretório nativo | Formato de arquivo |
|---------|------------------|--------------------|
| Claude Code | `.claude/agents/` | Markdown com frontmatter YAML |
| Codex CLI | `.codex/agents/` | TOML |

Impeccable mantém prompts canônicos de agentes em `skill/agents/` e emite arquivos nativos do provedor apenas para harnesses com formatos de subagente documentados.

## Substituição de Placeholders / Variáveis

O Claude Code suporta substituição de variáveis em tempo de execução diretamente nos corpos dos SKILL.md: `$ARGUMENTS`, `$0`-`$N`, `${CLAUDE_SKILL_DIR}`, `${CLAUDE_SESSION_ID}`. Nenhum outro harness suporta substituição em skills.

Alguns harnesses possuem sistemas separados de "comandos customizados" (distintos de skills) com suas próprias substituições:

| Harness | Sistema de comandos | Sintaxe de substituição |
|---------|---------------------|------------------------|
| Gemini CLI | `.gemini/commands/` (TOML) | `{{args}}`, `!{shell}`, `@{file}` |
| Codex CLI | `.codex/prompts/` | `$ARGNAME` |
| OpenCode | `.opencode/commands/` | `$ARGUMENTS`, `$1`-`$N`, `` !`shell` `` |

Nosso sistema de build gerencia placeholders entre provedores em tempo de compilação via `replacePlaceholders()` para `{{model}}`, `{{config_file}}`, `{{ask_instruction}}` e `{{available_commands}}`.
