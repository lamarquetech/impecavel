# Fluxo Extract

Identifique padrões reutilizáveis, componentes e design tokens, depois extraia e consolide-os no sistema de design para reuso sistemático.

## Passo 1: Descobrir o Sistema de Design

Encontre o sistema de design, a biblioteca de componentes ou o diretório de UI compartilhado. Entenda sua estrutura: organização de componentes, convenções de nomenclatura, estrutura de design tokens, convenções de import/export.

**CRÍTICO**: Se nenhum sistema de design existe, {{ask_instruction}} antes de criar um. Entenda a localização e estrutura preferidas primeiro.

## Passo 2: Identificar Padrões

Procure oportunidades de extração na área alvo:

- **Componentes repetidos**: Padrões de UI similares usados 3+ vezes (botões, cards, inputs)
- **Valores hard-coded**: Cores, espaçamento, tipografia, sombras que deveriam ser tokens
- **Variações inconsistentes**: Múltiplas implementações do mesmo conceito
- **Padrões de composição**: Padrões de layout ou interação que se repetem (linhas de formulário, grupos de toolbar, estados vazios)
- **Estilos de tipo**: Combinações repetidas de font-size + weight + line-height
- **Padrões de animação**: Combinações repetidas de easing, duration ou keyframes

Avalie o valor: extraia apenas coisas usadas 3+ vezes com o mesmo propósito. Abstração prematura é pior que duplicação.

## Passo 3: Planejar a Extração

Crie um plano sistemático:

- **Componentes para extrair**: Quais elementos de UI se tornam componentes reutilizáveis?
- **Tokens para criar**: Quais valores hard-coded se tornam design tokens?
- **Variantes para suportar**: Que variações cada componente precisa?
- **Convenções de nomenclatura**: Nomes de componentes, nomes de tokens, nomes de props que correspondam aos padrões existentes
- **Caminho de migração**: Como refatorar os usos existentes para consumir as novas versões compartilhadas

**IMPORTANTE**: Sistemas de design crescem incrementalmente. Extraia o que é claramente reutilizável agora, não tudo que possa ser reutilizável algum dia.

## Passo 4: Extrair e Enriquecer

Construa versões melhoradas e reutilizáveis:

- **Componentes**: API de props clara com padrões sensatos, variantes adequadas para diferentes casos de uso, acessibilidade embutida (ARIA, navegação por teclado, gerenciamento de foco), documentação e exemplos de uso
- **Design tokens**: Nomenclatura clara (primitivo vs semântico), hierarquia e organização adequadas, documentação de quando usar cada token
- **Padrões**: Quando usar este padrão, exemplos de código, variações e combinações

## Passo 5: Migrar

Substitua os usos existentes pelas novas versões compartilhadas:

- **Encontre todas as instâncias**: Busque os padrões que você extraiu
- **Substitua sistematicamente**: Atualize cada uso para consumir a versão compartilhada
- **Teste minuciosamente**: Garanta paridade visual e funcional
- **Delete código morto**: Remova as implementações antigas

## Passo 6: Documentar

Atualize a documentação do sistema de design:

- Adicione novos componentes à biblioteca de componentes
- Documente uso e valores dos tokens
- Adicione exemplos e diretrizes
- Atualize qualquer Storybook ou catálogo de componentes

**NUNCA**:
- Extraia implementações únicas e específicas de contexto sem generalização
- Crie componentes tão genéricos que se tornem inúteis
- Extraia sem considerar as convenções existentes do sistema de design
- Pule tipos TypeScript adequados ou documentação de props
- Crie tokens para cada valor individual (tokens devem ter significado semântico)
- Extraia coisas que diferem em propósito (dois botões que parecem similares mas servem propósitos diferentes devem permanecer separados)
