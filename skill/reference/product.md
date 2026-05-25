# Registro de produto

Quando o design SERVE ao produto: UIs de apps, painéis administrativos, painéis de configurações, tabelas de dados, ferramentas, superfícies autenticadas, qualquer coisa onde o usuário está em uma tarefa.

## O teste de product slop

Não é "alguém diria que IA fez isso." Familiaridade frequentemente é uma funcionalidade aqui. O teste é: um usuário fluente nas melhores ferramentas da categoria (Linear, Figma, Notion, Raycast, Stripe vêm à mente) sentaria e confiaria nesta interface, ou pausaria em cada componente sutilmente errado?

O modo de falha da UI de produto não é a planicidade, é a estranheza sem propósito: botões excessivamente decorados, controles de formulário incompatíveis, movimento gratuito, fontes de display onde deveriam haver rótulos, affordances inventadas para tarefas padrão. A barra é familiaridade conquistada. A ferramenta deve desaparecer na tarefa.

## Tipografia

- **Fontes do sistema são legítimas.** `-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif` oferece sensação nativa em cada plataforma. Inter é o padrão multiplataforma comum por uma razão.
- **Uma família frequentemente é a certa.** UIs de produto não precisam de combinação display/corpo. Uma sans bem ajustada carrega títulos, botões, rótulos, corpo, dados.
- **Escala fixa em rem, não fluida.** Títulos com clamp não servem à UI de produto. Usuários visualizam em DPI consistente, e um h1 fluido que encolhe em uma sidebar fica pior, não melhor.
- **Razão de escala mais justa.** 1.125–1.2 entre degraus é típico. Mais elementos tipográficos aqui do que em superfícies de marca; contraste exagerado cria ruído.
- **Comprimento de linha ainda se aplica para prosa** (65–75ch). Dados e UI compacta podem ser mais densos; tabelas a 120ch+ são aceitáveis.

## Cor

Produto padroniza para Contida. Uma única superfície pode conquistar Comprometida (um painel onde uma cor de categoria carrega um relatório, um fluxo de onboarding com uma tela de boas-vindas encharcada), mas Contida é o piso.

- Vocabulário semântico rico em estados: hover, focus, active, disabled, selected, loading, error, warning, success, info. Padronize estes.
- Cor de destaque usada apenas para ações primárias, seleção atual e indicadores de estado, não decoração.
- Uma segunda camada neutra para sidebars, barras de ferramentas e painéis (levemente mais fria ou mais quente que a superfície de conteúdo).

## Layout

- Grids previsíveis. Consistência É uma affordance; usuários navegam mais rápido quando a estrutura é esperada.
- Padrões familiares são funcionalidades. Navegação padrão (barra superior, nav lateral), breadcrumbs, tabs e layouts de formulário têm expectativas estabelecidas pelo usuário. Não reinvente por sabor.
- Comportamento responsivo é estrutural (colapsar sidebar, tabela responsiva, colunas orientadas por breakpoint), não tipografia fluida.

## Componentes

Todo componente interativo tem: default, hover, focus, active, disabled, loading, error. Não entregue com apenas a metade destes.

- Estados skeleton para carregamento, não spinners no meio do conteúdo.
- Estados vazios que ensinam a interface, não "nada aqui."
- Affordances consistentes pela superfície. Mesmo formato de botão. Mesmo vocabulário de controles de formulário. Mesmo estilo de ícones.

## Movimento

- 150–250 ms na maioria das transições. Usuários estão em fluxo; não os faça esperar por coreografia.
- Movimento transmite estado, não decoração. Mudança de estado, feedback, carregamento, revelação: nada mais.
- Sem sequências orquestradas de carregamento de página. Produto carrega em uma tarefa; usuários não querem assistir ao carregamento.

## Banimentos de produto (além dos banimentos absolutos compartilhados)

- Movimento decorativo que não transmite estado.
- Vocabulário de componente inconsistente entre telas. Se o botão "salvar" parece diferente em dois lugares, um está errado.
- Fontes de display em rótulos de UI, botões, dados.
- Reinventar affordances padrão por sabor (scrollbars personalizadas, controles de formulário estranhos, modais não-padão).
- Cor pesada ou acentos de saturação total em estados inativos.

## Permissões de produto

Produto pode custear coisas que superfícies de marca não podem.

- Fontes do sistema e padrões sans familiares (Inter, SF Pro, stacks system-ui).
- Padrões de navegação padrão: barra superior + nav lateral, breadcrumbs, tabs, paletas de comandos.
- Densidade. Tabelas com muitas linhas, painéis com muitos rótulos, informação densa quando os usuários precisam.
- Consistência sobre surpresa. O mesmo vocabulário visual de tela para tela é uma virtude; deleite é reservado para momentos, não páginas.
