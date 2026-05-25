# Impeccable

O vocabulário que você não sabia que precisava. 1 skill, 23 comandos e anti-patterns curados para design frontend impecável.

> **Início rápido:** Acesse [impeccable.style](https://impeccable.style) para baixar pacotes prontos para uso.

## Por que Impeccable?

O [frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) da Anthropic foi a primeira skill de design amplamente utilizada para o Claude. Impeccable partiu dali.

Todo modelo treinado nos mesmos templates SaaS. Ignore as orientações e você obtém os mesmos sinais reveladores em todo projeto: Inter para tudo, gradientes roxo-para-azul, cards dentro de cards, texto cinza em fundos coloridos, o tile de ícone quadrado-arredondado acima de cada título.

Impeccable adiciona:
- **7 arquivos de referência por domínio** ([ver código-fonte](skill/)). Tipografia, cor, movimento, espacial, interação, responsivo, UX writing. Carregados em cada comando, junto com um registro marca-vs-produto que ajusta os padrões.
- **23 comandos.** Um vocabulário de design compartilhado com sua IA: `polish`, `audit`, `critique`, `distill`, `animate`, `bolder`, `quieter`, e mais.
- **27 regras determinísticas de anti-pattern** mais uma passagem de crítica LLM com 12 regras. O CLI e a extensão de navegador executam as regras determinísticas sem LLM e sem chave de API. Cada regra está vinculada a orientações de design específicas que a skill ensina a evitar.

## O que está incluído

### A Skill: impeccable

Uma skill de design abrangente com 7 referências por domínio ([ver skill](skill/SKILL.md)):

| Referência | Abrange |
|-----------|--------|
| [typography](skill/reference/typography.md) | Sistemas tipográficos, pareamento de fontes, escalas modulares, OpenType |
| [color-and-contrast](skill/reference/color-and-contrast.md) | OKLCH, neutros com tinta, modo escuro, acessibilidade |
| [spatial-design](skill/reference/spatial-design.md) | Sistemas de espaçamento, grids, hierarquia visual |
| [motion-design](skill/reference/motion-design.md) | Curvas de easing, staggering, movimento reduzido |
| [interaction-design](skill/reference/interaction-design.md) | Formulários, estados de foco, padrões de carregamento |
| [responsive-design](skill/reference/responsive-design.md) | Mobile-first, design fluido, container queries |
| [ux-writing](skill/reference/ux-writing.md) | Rótulos de botões, mensagens de erro, estados vazios |

### 23 Comandos

Todos os comandos são acessados através de `/impeccable`:

| Comando | O que faz |
|---------|-----------|
| `/impeccable craft` | Fluxo completo de shape-then-build com iteração visual |
| `/impeccable teach` | Configuração única: reunir contexto de design, escrever PRODUCT.md e DESIGN.md raiz |
| `/impeccable document` | Gerar DESIGN.md raiz a partir do código existente do projeto |
| `/impeccable extract` | Extrair componentes e tokens reutilizáveis para o design system |
| `/impeccable shape` | Planejar UX/UI antes de escrever código |
| `/impeccable critique` | Revisão de design UX: hierarquia, clareza, ressonância emocional |
| `/impeccable audit` | Executar verificações de qualidade técnica (a11y, performance, responsivo) |
| `/impeccable polish` | Passagem final, alinhamento com o design system e prontidão para entrega |
| `/impeccable bolder` | Amplificar designs sem graça |
| `/impeccable quieter` | Atenuar designs excessivamente ousados |
| `/impeccable distill` | Reduzir ao essencial |
| `/impeccable harden` | Tratamento de erros, i18n, overflow de texto, casos extremos |
| `/impeccable onboard` | Fluxos de primeira execução, estados vazios, caminhos de ativação |
| `/impeccable animate` | Adicionar movimento intencional |
| `/impeccable colorize` | Introduzir cor estratégica |
| `/impeccable typeset` | Corrigir escolhas de fontes, hierarquia, dimensionamento |
| `/impeccable layout` | Corrigir layout, espaçamento, ritmo visual |
| `/impeccable delight` | Adicionar momentos de alegria |
| `/impeccable overdrive` | Adicionar efeitos tecnicamente extraordinários |
| `/impeccable clarify` | Melhorar textos de UX pouco claros |
| `/impeccable adapt` | Adaptar para diferentes dispositivos |
| `/impeccable optimize` | Melhorias de performance |
| `/impeccable live` | Modo de variantes visuais: iterar elementos no navegador |

Use `/impeccable pin <comando>` para criar atalhos independentes (ex.: `pin audit` cria `/audit`).

#### Exemplos de Uso

```
/impeccable audit blog           # Auditar hub do blog + páginas de posts
/impeccable critique landing     # Revisão de design UX
/impeccable polish settings      # Passagem final antes da entrega
/impeccable harden checkout      # Adicionar tratamento de erros + casos extremos
```

Ou use `/impeccable` diretamente com uma descrição:
```
/impeccable refazer esta seção hero
```

### Anti-Patterns

A skill inclui orientações explícitas sobre o que evitar:

- Não use fontes superutilizadas (Arial, Inter, padrões do sistema)
- Não use texto cinza em fundos coloridos
- Não use preto/cinza puro (sempre com tinta)
- Não envolva tudo em cards ou aninhe cards dentro de cards
- Não use easing bounce/elástico (parece datado)

## Veja em Ação

Acesse [impeccable.style](https://impeccable.style#casestudies) para ver estudos de caso antes/depois de projetos reais transformados com comandos Impeccable.

## Instalação

### Opção 1: Baixar do Site (Recomendado)

Acesse [impeccable.style](https://impeccable.style), baixe o ZIP para sua ferramenta e extraia no seu projeto.

### Opção 2: Copiar do Repositório

**Cursor:**
```bash
cp -r dist/cursor/.cursor your-project/
```

> **Nota:** Skills do Cursor exigem configuração:
> 1. Alterne para o canal Nightly em Cursor Settings → Beta
> 2. Ative Agent Skills em Cursor Settings → Rules
>
> [Saiba mais sobre skills do Cursor](https://cursor.com/docs/context/skills)

**Claude Code:**
```bash
# Específico do projeto
cp -r dist/claude-code/.claude your-project/

# Ou global (aplica-se a todos os projetos)
cp -r dist/claude-code/.claude/* ~/.claude/
```

**OpenCode:**
```bash
cp -r dist/opencode/.opencode your-project/
```

**Pi:**
```bash
cp -r dist/pi/.pi your-project/
```

**Gemini CLI:**
```bash
cp -r dist/gemini/.gemini your-project/
```

> **Nota:** Skills do Gemini CLI exigem configuração:
> 1. Instale a versão preview: `npm i -g @google/gemini-cli@preview`
> 2. Execute `/settings` e ative "Skills"
> 3. Execute `/skills list` para verificar a instalação
>
> [Saiba mais sobre skills do Gemini CLI](https://geminicli.com/docs/cli/skills/)

**Codex CLI:**
```bash
# Local do projeto
cp -r dist/agents/.agents your-project/
mkdir -p your-project/.codex
cp -r dist/codex/.codex/agents your-project/.codex/

# Ou para todo o usuário
mkdir -p ~/.agents/skills
cp -r dist/agents/.agents/skills/* ~/.agents/skills/
mkdir -p ~/.codex
cp -r dist/codex/.codex/agents ~/.codex/
```

**GitHub Copilot:**
```bash
cp -r dist/github/.github your-project/
```

**Trae:**
```bash
# Trae China (versão doméstica)
cp -r dist/trae/.trae-cn/skills/* ~/.trae-cn/skills/

# Trae International
cp -r dist/trae/.trae/skills/* ~/.trae/skills/
```

> **Nota:** O Trae tem duas versões com diretórios de configuração diferentes:
> - **Trae China**: `~/.trae-cn/skills/`
> - **Trae International**: `~/.trae/skills/`
>
> Após copiar, reinicie o Trae IDE para ativar as skills.

**Rovo Dev:**
```bash
# Específico do projeto
cp -r dist/rovo-dev/.rovodev your-project/

# Ou global (aplica-se a todos os projetos)
cp -r dist/rovo-dev/.rovodev/skills/* ~/.rovodev/skills/
```

**Qoder:**
```bash
# Específico do projeto
cp -r dist/qoder/.qoder your-project/

# Ou global (aplica-se a todos os projetos)
cp -r dist/qoder/.qoder/skills/* ~/.qoder/skills/
```

## Uso

Após a instalação, use comandos no seu harness de IA:

```
/audit           # Encontrar problemas
/normalize       # Corrigir inconsistências
/polish          # Limpeza final
/distill         # Remover complexidade
```

A maioria dos comandos aceita um argumento opcional para focar em uma área específica:

```
/audit header
/polish checkout-form
```

**Nota:** O Codex usa skills aqui, não comandos `/prompts:`. Abra `/skills` ou digite `$impeccable`. Instalações locais do repositório ficam em `.agents/skills/`; instalações globais do usuário ficam em `~/.agents/skills/`. O GitHub Copilot usa `.github/skills/`. Reinicie a ferramenta se uma skill recém-instalada não aparecer.

## CLI

Impeccable inclui um CLI independente para detectar anti-patterns sem um harness de IA:

```bash
npx impeccable detect src/                   # escanear um diretório
npx impeccable detect index.html             # escanear um arquivo HTML
npx impeccable detect https://example.com    # escanear uma URL (Puppeteer)
npx impeccable detect --fast --json .        # apenas regex, saída JSON
```

O detector captura 24 problemas entre AI slop (bordas de abas laterais, gradientes roxos, easing bounce, brilhos escuros) e qualidade de design geral (comprimento de linha, espaçamento apertado, alvos de toque pequenos, headings pulados, e mais).

## Ferramentas Suportadas

- [Cursor](https://cursor.com)
- [Claude Code](https://claude.ai/code)
- [OpenCode](https://opencode.ai)
- [Pi](https://pi.dev)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [Codex CLI](https://github.com/openai/codex)
- [VS Code Copilot](https://code.visualstudio.com)
- [Kiro](https://kiro.dev)
- [Trae](https://trae.ai)
- [Rovo Dev](https://www.atlassian.com/software/rovo)
- [Qoder](https://qoder.com)

## Comunidade e Ecossistema

Participe das conversas da comunidade e ecossistema:

- GitHub Discussions: relate bugs, solicite funcionalidades e ajude novatos.
- [Impeccable no npm](https://www.npmjs.com/package/impeccable): obtenha o CLI, acompanhe releases e favorite o pacote.
- Siga @pbakaus no Twitter por notas de release, relatórios de lint de exemplo e destaques em vídeo de novas regras.

## Contribuindo

Veja [DEVELOP.md](DEVELOP.md) para diretrizes de contribuição e instruções de build.

## Licença

Apache 2.0. Veja [LICENSE](LICENSE).

A skill impeccable baseia-se na [skill original frontend-design da Anthropic](https://github.com/anthropics/skills/tree/main/skills/frontend-design). Veja [NOTICE.md](NOTICE.md) para atribuições.

---

Criado por [Paul Bakaus](https://www.paulbakaus.com)
