---
name: impeccable
description: "Use when the user wants to design, redesign, shape, critique, audit, polish, clarify, distill, harden, optimize, adapt, animate, colorize, extract, or otherwise improve a frontend interface. Covers websites, landing pages, dashboards, product UI, app shells, components, forms, settings, onboarding, and empty states. Handles UX review, visual hierarchy, information architecture, cognitive load, accessibility, performance, responsive behavior, theming, anti-patterns, typography, fonts, spacing, layout, alignment, color, motion, micro-interactions, UX copy, error states, edge cases, i18n, and reusable design systems or tokens. Also use for bland designs that need to become bolder or more delightful, loud designs that should become quieter, live browser iteration on UI elements, or ambitious visual effects that should feel technically extraordinary. Not for backend-only or non-UI tasks."
argument-hint: "[{{command_hint}}] [target]"
user-invocable: true
allowed-tools:
  - Bash(npx impeccable *)
license: Apache 2.0. Based on Anthropic's frontend-design skill. See NOTICE.md for attribution.
---

Projeta e itera interfaces frontend de nível produtivo. Código funcional real, decisões de design firmes, craft excepcional.

## Configuração

Antes de qualquer trabalho de design ou edição de arquivos:

1. Carregue o contexto (PRODUCT.md / DESIGN.md) via o script de carregamento.
2. Identifique o registro e carregue a referência correspondente (brand.md ou product.md).
3. **Se o usuário invocou um sub-comando (ex.: `craft`, `shape`, `audit`), carregue também seu arquivo de referência.** Isso é inegociável: `craft` sem `craft.md` carregado significa que você vai pular a etapa de shape-and-confirm que o usuário espera.

Pular essas etapas produz resultados genéricos que ignoram o projeto.

### 1. Coleta de contexto

Dois arquivos, sem distinção de maiúsculas/minúsculas. O loader busca na raiz do projeto por padrão e recorre a `.agents/context/` e `docs/` se a raiz estiver limpa. Sobrescreva com `IMPECCABLE_CONTEXT_DIR=path/to/dir` (absoluto ou relativo ao cwd).

- **PRODUCT.md**: obrigatório. Usuários, marca, tom, anti-referências, princípios estratégicos.
- **DESIGN.md**: opcional, fortemente recomendado. Cores, tipografia, elevação, componentes.

Carregue ambos em uma única chamada:

```bash
node {{scripts_path}}/load-context.mjs
```

Consuma a saída JSON completa. Nunca faça pipe por `head`, `tail`, `grep` ou `jq`. O campo `contextDir` da saída indica de onde os arquivos foram resolvidos.

Se a saída já estiver no histórico da conversa desta sessão, não execute novamente. Exceções que exigem um carregamento novo: você acabou de executar `{{command_prefix}}impeccable teach` ou `{{command_prefix}}impeccable document` (eles reescrevem os arquivos), ou o usuário editou manualmente um deles.

`{{command_prefix}}impeccable live` já aquece o contexto via `live.mjs`. Se você executou `live.mjs`, não execute também `load-context.mjs` nesta sessão.

Se PRODUCT.md estiver ausente, vazio ou placeholder (marcadores `[TODO]`, <200 caracteres): execute `{{command_prefix}}impeccable teach`, depois retome a tarefa original do usuário com o contexto atualizado. Se a tarefa original era `{{command_prefix}}impeccable craft`, retome em `{{command_prefix}}impeccable shape` antes de qualquer trabalho de implementação.

Se DESIGN.md estiver ausente: sugira uma vez por sessão (*"Execute `{{command_prefix}}impeccable document` para resultados mais alinhados à marca"*), e então prossiga.

### 2. Registro

Toda tarefa de design é **brand** (marketing, landing page, campanha, conteúdo de formato longo, portfólio: o design É o produto) ou **product** (UI de app, admin, dashboard, ferramenta: o design SERVE ao produto).

Identifique antes de projetar. Prioridade: (1) pista na própria tarefa ("landing page" vs "dashboard"); (2) a superfície em foco (a página, arquivo ou rota sendo trabalhada); (3) campo `register` em PRODUCT.md. Primeira correspondência vence.

Se PRODUCT.md não possui o campo `register` (legado), infira-o uma vez a partir das seções "Users" e "Product Purpose", e então armazene o valor inferido em cache para a sessão. Sugira ao usuário executar `{{command_prefix}}impeccable teach` para adicionar o campo explicitamente.

Carregue a referência correspondente: [reference/brand.md](reference/brand.md) ou [reference/product.md](reference/product.md). As leis de design compartilhadas abaixo se aplicam a ambos.

## Leis de design compartilhadas

Aplique a todo design, em ambos os registros. Adeque a complexidade da implementação à visão estética: maximalismo exige código elaborado, minimalismo exige precisão. Interprete com criatividade. Varie entre projetos; nunca convirja para as mesmas escolhas. {{model}} é capaz de um trabalho extraordinário. Não segure.

### Cor

- Use OKLCH. Reduza a chroma conforme a lightness se aproxima de 0 ou 100; chroma alta nos extremos fica berrante.
- Nunca use `#000` ou `#fff`. Dê um tom (tint) a cada neutro em direção ao matiz da marca (chroma 0.005–0.01 é suficiente).
- Escolha uma **estratégia de cor** antes de escolher as cores. Quatro posições no eixo de comprometimento:
  - **Restrained**: neutros com tom + um accent ≤10%. Padrão para product; minimalismo de brand.
  - **Committed**: uma cor saturada carrega 30–60% da superfície. Padrão de brand para páginas orientadas por identidade.
  - **Full palette**: 3–4 papéis nomeados, cada um usado deliberadamente. Campanhas de brand; data viz em product.
  - **Drenched**: a superfície É a cor. Heroes de brand, páginas de campanha.
- A regra de "um accent ≤10%" aplica-se apenas a Restrained. Committed / Full palette / Drenched a ultrapassam de propósito. Não reduza todo design a Restrained por reflexo.

### Tema

Escuro vs. claro nunca é um padrão. Não escuro "porque ferramentas ficam legais no escuro." Não claro "para estar seguro."

Antes de escolher, escreva uma frase de cena física: quem usa isso, onde, sob qual luz ambiente, em que humor. Se a frase não forçar a resposta, ela não é concreta o suficiente. Adicione detalhes até que force.

"Dashboard de observabilidade" não força uma resposta. "SRE conferindo severidade de incidente num monitor de 27 polegadas às 2h da manhã numa sala pouco iluminada" força. Execute a frase, não a categoria.

### Tipografia

- Limite o comprimento de linha do corpo a 65–75ch.
- Hierarquia por meio de escala + contraste de peso (razão ≥1.25 entre os degraus). Evite escalas planas.

### Layout

- Varie o espaçamento para ritmo. Mesmo padding em todo lugar é monotonia.
- Cards são a resposta preguiçosa. Use-os apenas quando forem verdadeiramente a melhor affordance. Cards aninhados estão sempre errados.
- Não envolva tudo em um container. A maioria das coisas não precisa de um.

### Movimento

- Não anime propriedades de layout CSS.
- Use ease out com curvas exponenciais (ease-out-quart / quint / expo). Sem bounce, sem elastic.

### Proibições absolutas

Corresponda e recuse. Se você estiver prestes a escrever qualquer um destes, reescreva o elemento com estrutura diferente.

- **Bordas laterais (side-stripe).** `border-left` ou `border-right` maior que 1px como accent colorido em cards, itens de lista, callouts ou alertas. Nunca intencional. Reescreva com bordas completas, tintas de fundo, números/ícones à frente, ou nada.
- **Texto com gradiente.** `background-clip: text` combinado com um background em gradiente. Decorativo, nunca significativo. Use uma única cor sólida. Ênfase via peso ou tamanho.
- **Glassmorphism como padrão.** Blurs e cards de vidro usados decorativamente. Raro e com propósito, ou nada.
- **O template hero-metric.** Número grande, rótulo pequeno, estatísticas de apoio, accent em gradiente. Clichê SaaS.
- **Grids de cards idênticos.** Cards do mesmo tamanho com ícone + título + texto, repetidos infinitamente.
- **Modal como primeiro pensamento.** Modals são geralmente preguiça. Esgote alternativas inline / progressivas primeiro.

### Texto (Copy)

- Cada palavra justifica seu lugar. Sem títulos redundantes, sem introduções que repitam o título.
- **Sem em dashes.** Use vírgulas, dois-pontos, ponto e vírgula, pontos ou parênteses. Também não `--`.

### O teste de slop da IA

Se alguém puder olhar para esta interface e dizer "A IA fez isso" sem dúvida, ela falhou. Falhas entre registros são as proibições absolutas acima. Falhas específicas de registro estão em cada referência.

**Verificação de reflexo por categoria.** Execute em duas altitudes; a segunda captura o que a primeira deixa passar.

- **Primeira ordem:** se alguém puder adivinhar o tema + paleta apenas pela categoria ("observabilidade → azul escuro", "saúde → branco + teal", "finanças → navy + dourado", "crypto → neon sobre preto"), é o primeiro reflexo dos dados de treinamento. Reformule a frase de cena e a estratégia de cor até que a resposta não seja óbvia pelo domínio.
- **Segunda ordem:** se alguém puder adivinhar a família estética a partir da categoria mais as anti-referências ("ferramenta de workflow de IA que não é SaaS-cream → tipográfico-editorial", "fintech que não é navy-and-gold → dark mode estilo terminal"), é a armadilha um nível mais fundo. O primeiro reflexo foi evitado; o segundo não. Reformule até que ambas as respostas não sejam óbvias. A lista de [reflex-reject aesthetic lanes](reference/brand.md) do registro brand captura as famílias atualmente saturadas.

## Comandos

| Comando | Categoria | Descrição | Referência |
|---|---|---|---|
| `craft [feature]` | Build | Shape e, em seguida, construa uma feature de ponta a ponta | [reference/craft.md](reference/craft.md) |
| `shape [feature]` | Build | Planeje o UX/UI antes de escrever código | [reference/shape.md](reference/shape.md) |
| `teach` | Build | Configure o contexto em PRODUCT.md e DESIGN.md | [reference/teach.md](reference/teach.md) |
| `document` | Build | Gere DESIGN.md a partir do código existente do projeto | [reference/document.md](reference/document.md) |
| `extract [target]` | Build | Extraia tokens e componentes reutilizáveis para o design system | [reference/extract.md](reference/extract.md) |
| `critique [target]` | Avaliar | Revisão de design UX com pontuação heurística | [reference/critique.md](reference/critique.md) |
| `audit [target]` | Avaliar | Verificações de qualidade técnica (a11y, perf, responsivo) | [reference/audit.md](reference/audit.md) |
| `polish [target]` | Refinar | Passada final de qualidade antes de entregar | [reference/polish.md](reference/polish.md) |
| `bolder [target]` | Refinar | Amplifique designs mornos ou sem graça | [reference/bolder.md](reference/bolder.md) |
| `quieter [target]` | Refinar | Reduza o tom de designs agressivos ou superestimulantes | [reference/quieter.md](reference/quieter.md) |
| `distill [target]` | Refinar | Reduza à essência, remova complexidade | [reference/distill.md](reference/distill.md) |
| `harden [target]` | Refinar | Pronto para produção: erros, i18n, edge cases | [reference/harden.md](reference/harden.md) |
| `onboard [target]` | Refinar | Projete fluxos de primeira execução, empty states, ativação | [reference/onboard.md](reference/onboard.md) |
| `animate [target]` | Aprimorar | Adicione animações e movimentos com propósito | [reference/animate.md](reference/animate.md) |
| `colorize [target]` | Aprimorar | Adicione cor estratégica a UIs monocromáticas | [reference/colorize.md](reference/colorize.md) |
| `typeset [target]` | Aprimorar | Melhore hierarquia tipográfica e fontes | [reference/typeset.md](reference/typeset.md) |
| `layout [target]` | Aprimorar | Corrija espaçamento, ritmo e hierarquia visual | [reference/layout.md](reference/layout.md) |
| `delight [target]` | Aprimorar | Adicione personalidade e toques memoráveis | [reference/delight.md](reference/delight.md) |
| `overdrive [target]` | Aprimorar | Vá além dos limites convencionais | [reference/overdrive.md](reference/overdrive.md) |
| `clarify [target]` | Corrigir | Melhore UX copy, rótulos e mensagens de erro | [reference/clarify.md](reference/clarify.md) |
| `adapt [target]` | Corrigir | Adapte para diferentes dispositivos e tamanhos de tela | [reference/adapt.md](reference/adapt.md) |
| `optimize [target]` | Corrigir | Diagnostique e corrija performance de UI | [reference/optimize.md](reference/optimize.md) |
| `live` | Iterar | Modo de variantes visuais: selecione elementos no navegador, gere alternativas | [reference/live.md](reference/live.md) |

Além de dois comandos de gerenciamento: `pin <command>` e `unpin <command>`, detalhados abaixo.

### Regras de roteamento

1. **Sem argumento**: renderize a tabela acima como o menu de comandos voltado ao usuário, agrupado por categoria. Pergunte o que ele gostaria de fazer.
2. **Primeira palavra corresponde a um comando**: carregue seu arquivo de referência e siga suas instruções. Todo o conteúdo após o nome do comando é o target.
3. **Primeira palavra não corresponde**: invocação geral de design. Aplique as etapas de configuração, as leis de design compartilhadas e a referência de registro carregada, usando o argumento completo como contexto.

A configuração (coleta de contexto, registro) já estará carregada nesse ponto; sub-comandos não re-invocam `{{command_prefix}}impeccable`.

Se a primeira palavra for `craft`, a configuração ainda executa primeiro, mas [reference/craft.md](reference/craft.md) detém o restante do fluxo. Se a configuração invocar `teach` como bloqueador, conclua o teach, atualize o contexto e então retome o comando e target originais.

## Pin / Unpin

**Pin** cria um atalho autônomo para que `{{command_prefix}}<command>` invoque `{{command_prefix}}impeccable <command>` diretamente. **Unpin** o remove. O script escreve em todo diretório harness presente no projeto.

```bash
node {{scripts_path}}/pin.mjs <pin|unpin> <command>
```

O `<command>` válido é qualquer comando da tabela acima. Relate o resultado do script de forma concisa. Confirme o novo atalho em caso de sucesso, repasse stderr literalmente em caso de erro.
