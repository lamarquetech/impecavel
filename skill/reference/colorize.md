> **Contexto adicional necessário**: cores de marca existentes.

Substitua designs cinza-tímidos ou de acento-único por uma paleta estratégica: escolha uma estratégia de cor, selecione uma família de tons que combine com a marca, e depois aplique cor com intenção. Mais cor ≠ melhor. Cor estratégica vence o vomido de arco-íris.

---

## Registro

Brand: a paleta É a voz. Escolha uma estratégia de cor primeiro conforme SKILL.md (Restrained / Committed / Full palette / Drenched) e siga sua dosagem. Committed, Full palette e Drenched deliberadamente excedem a regra de ≤10%; essa regra é apenas para Restrained. Combinações inesperadas são permitidas; uma cor dominante pode tomar a página quando a estratégia escolhida exige.

Product: semântica primeiro e quase sempre Restrained. A cor de acento é reservada para ação primária, seleção atual e indicadores de estado. Não decoração. Cada cor tem um significado consistente em cada tela.

---

## Avalie a Oportunidade de Cor

Analise o estado atual e identifique oportunidades:

1. **Entenda o estado atual**:
   - **Ausência de cor**: Escala de cinza pura? Neutros limitados? Um acento tímido?
   - **Oportunidades perdidas**: Onde a cor poderia adicionar significado, hierarquia ou encanto?
   - **Contexto**: O que é apropriado para este domínio e público?
   - **Marca**: Existem cores de marca que deveríamos usar?

2. **Identifique onde a cor adiciona valor**:
   - **Significado semântico**: Sucesso (verde), erro (vermelho), alerta (amarelo/laranja), informação (azul)
   - **Hierarquia**: Atraindo atenção para elementos importantes
   - **Categorização**: Seções, tipos ou estados diferentes
   - **Tom emocional**: Acolhimento, energia, confiança, criatividade
   - **Orientação**: Ajudando os usuários a navegar e entender a estrutura
   - **Encanto**: Momentos de interesse visual e personalidade

Se algum desses itens não estiver claro no codebase, {{ask_instruction}}

**CRÍTICO**: Mais cor ≠ melhor. Cor estratégica vence o vomido de arco-íris sempre. Cada cor deve ter um propósito.

## Planeje a Estratégia de Cor

Crie um plano de introdução de cor com propósito:

- **Paleta de cores**: Quais cores combinam com a marca/contexto? (Escolha 2-4 cores no máximo além dos neutros)
- **Cor dominante**: Qual cor domina 60% dos elementos coloridos?
- **Cores de acento**: Quais cores fornecem contraste e destaques? (30% e 10%)
- **Estratégia de aplicação**: Onde cada cor aparece e por quê?

**IMPORTANTE**: A cor deve melhorar a hierarquia e o significado, não criar caos. Menos é mais quando importa mais.

## Introduza Cor Estrategicamente

Adicione cor sistematicamente nestas dimensões:

### Cor Semântica
- **Indicadores de estado**:
  - Sucesso: Tons de verde (esmeralda, floresta, menta)
  - Erro: Tons de vermelho/rosa (rosa, carmesim, coral)
  - Alerta: Tons de laranja/âmbar
  - Informação: Tons de azul (celeste, oceano, índigo)
  - Neutro: Cinza/ardósia para estados inativos

- **Badges de status**: Fundos ou bordas coloridas para estados (ativo, pendente, concluído, etc.)
- **Indicadores de progresso**: Barras, anéis ou gráficos coloridos mostrando conclusão ou saúde

### Aplicação de Cor de Acento
- **Ações primárias**: Colora os botões/CTAs mais importantes
- **Links**: Adicione cor a texto clicável (mantenha acessibilidade)
- **Ícones**: Colora ícones-chave para reconhecimento e personalidade
- **Headers/títulos**: Adicione cor a headers de seção ou rótulos-chave
- **Estados de hover**: Introduza cor na interação

### Fundos e Superfícies
- **Fundos tingidos**: Substitua cinza puro (`#f5f5f5`) por neutros quentes (`oklch(97% 0.01 60)`) ou tons frios (`oklch(97% 0.01 250)`)
- **Seções coloridas**: Use cores de fundo sutis para separar áreas
- **Fundos com gradiente**: Adicione profundidade com gradientes sutis e intencionais (não roxo-azul genérico)
- **Cards e superfícies**: Tinja cards ou superfícies levemente para aquecimento

**Use OKLCH para cor**: É perceptualmente uniforme, o que significa passos iguais em luminosidade *parecem* iguais. Ótimo para gerar escalas harmoniosas.

### Visualização de Dados
- **Gráficos e charts**: Use cor para codificar categorias ou valores
- **Heatmaps**: Intensidade de cor mostra densidade ou importância
- **Comparação**: Codificação por cor para conjuntos de dados ou períodos diferentes

### Bordas e Acentos
- **Bordas hairline**: Bordas coloridas de 1px no perímetro completo (não side-stripes; veja a proibição absoluta de `border-left/right > 1px`)
- **Underlines**: Underlines coloridos para ênfase ou estados ativos
- **Divisores**: Divisores coloridos sutis em vez de linhas cinza
- **Focus rings**: Indicadores de foco coloridos correspondentes à marca
- **Tinturas de superfície**: Uma lavagem de fundo de 4-8% da cor de acento em vez de uma faixa

**NUNCA**: `border-left` ou `border-right` maior que 1px como faixa de acento colorida. Esta é uma das três proibições absolutas do skill pai. Se você quer marcar um card como "ativo" ou "alerta", use uma borda hairline completa, uma tintura de fundo, um glifo inicial ou um prefixo numerado. Não uma faixa lateral.

### Cor na Tipografia
- **Títulos coloridos**: Use cores da marca para títulos de seção (mantenha contraste)
- **Texto destacado**: Cor para ênfase ou categorias
- **Rótulos e tags**: Pequenos rótulos coloridos para metadados ou categorias

### Elementos Decorativos
- **Ilustrações**: Adicione ilustrações ou ícones coloridos
- **Formas**: Formas geométricas nas cores da marca como elementos de fundo
- **Gradientes**: Sobreposições de gradiente coloridas ou fundos mesh
- **Blobs/formas orgânicas**: Formas suaves e coloridas para interesse visual

## Equilíbrio e Refinamento

Garanta que a adição de cor melhore em vez de sobrecarregar:

### Mantenha a Hierarquia
- **Cor dominante** (60%): Cor primária da marca ou acento mais usado
- **Cor secundária** (30%): Cor de suporte para variedade
- **Cor de acento** (10%): Alto contraste para momentos-chave
- **Neutros** (restante): Cinza/preto/branco para estrutura

### Acessibilidade
- **Taxas de contraste**: Garanta conformidade WCAG (4.5:1 para texto, 3:1 para componentes de UI)
- **Não dependa apenas de cor**: Use ícones, rótulos ou padrões junto com a cor
- **Teste para daltonismo**: Verifique se combinações vermelho/verde funcionam para todos os usuários

### Coesão
- **Paleta consistente**: Use cores da paleta definida, não escolhas arbitrárias
- **Aplicação sistemática**: Mesmos significados de cor ao longo (verde sempre = sucesso)
- **Consistência de temperatura**: Paleta quente permanece quente, fria permanece fria

**NUNCA**:
- Use todas as cores do arco-íris (escolha 2-4 cores além dos neutros)
- Aplique cor aleatoriamente sem significado semântico
- Coloque texto cinza sobre fundos coloridos. Fica desbotado; use um tom mais escuro da cor de fundo ou transparência
- Use cinza puro para neutros. Adicione tinta de cor sutil (quente ou fria) para profundidade
- Use preto puro (`#000`) ou branco puro (`#fff`) para grandes áreas
- Violar os requisitos de contraste WCAG
- Use cor como único indicador (problema de acessibilidade)
- Faça tudo colorido (derrota o propósito)
- Use gradientes roxo-azul por padrão (estética de AI slop)

## Verifique a Adição de Cor

Teste se a colorização melhora a experiência:

- **Hierarquia melhor**: A cor guia a atenção apropriadamente?
- **Significado mais claro**: A cor ajuda os usuários a entender estados/categorias?
- **Mais envolvente**: A interface parece mais acolhedora e convidativa?
- **Ainda acessível**: Todas as combinações de cor atendem aos padrões WCAG?
- **Não esmagadora**: A cor está equilibrada e com propósito?

Quando a paleta merece seu lugar, passe para `{{command_prefix}}impeccable polish` para a revisão final.

## Parâmetros signature do modo live

Quando invocada a partir do modo live, cada variante DEVE declarar um parâmetro `color-amount` para que o usuário possa ajustar entre um acento contido e uma superfície imersiva sem regeneração. Autor o CSS da variante contra `var(--p-color-amount, 0.5)`, tipicamente como o multiplicador de alpha em fundos, ou como fator de escala no eixo chroma em uma expressão OKLCH. 0 = neutro/monocromático, 1 = saturação total / cobertura dominante.

```json
{"id":"color-amount","kind":"range","min":0,"max":1,"step":0.05,"default":0.5,"label":"Color amount"}
```

Sobreponha 1-2 parâmetros específicos da variante: seleção de paleta (`steps` com opções nomeadas), quentura da temperatura, ou tint vs. cor verdadeira. Veja `reference/live.md` para o contrato completo de parâmetros.
