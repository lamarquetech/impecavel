Reduza um design à sua essência. Remova tudo que não merece seu lugar: elementos redundantes, informação repetida, ruído decorativo, complexidade cosmética.


---

## Avalie o Estado Atual

Analise o que torna o design complexo ou poluído:

1. **Identifique as fontes de complexidade**:
   - **Muitos elementos**: Botões competindo, informação redundante, desordem visual
   - **Variação excessiva**: Cores, fontes, tamanhos, estilos demais sem propósito
   - **Sobrecarga de informação**: Tudo visível de uma vez, sem revelação progressiva
   - **Ruído visual**: Bordas, sombras, fundos, decorações desnecessárias
   - **Hierarquia confusa**: Incerto o que mais importa
   - **Creep de funcionalidades**: Opções, ações ou caminhos em excesso

2. **Encontre a essência**:
   - Qual é o objetivo principal do usuário? (Deve ser UM)
   - O que é realmente necessário vs bom-ter?
   - O que pode ser removido, ocultado ou combinado?
   - Quais são os 20% que entregam 80% do valor?

Se algum desses itens não estiver claro no codebase, {{ask_instruction}}

**CRÍTICO**: Simplicidade não é sobre remover funcionalidades. É sobre remover obstáculos entre os usuários e seus objetivos. Cada elemento deve justificar sua existência.

## Planeje a Simplificação

Crie uma estratégia de edição implacável:

- **Propósito central**: Qual é a ÚNICA coisa que isso deve realizar?
- **Elementos essenciais**: O que é verdadeiramente necessário para alcançar esse propósito?
- **Revelação progressiva**: O que pode ser ocultado até ser necessário?
- **Oportunidades de consolidação**: O que pode ser combinado ou integrado?

**IMPORTANTE**: Simplificação é difícil. Exige dizer não a boas ideias para abrir espaço para uma execução excelente. Seja implacável.

## Simplifique o Design

Remova complexidade sistematicamente nestas dimensões:

### Arquitetura de Informação
- **Reduza o escopo**: Remova ações secundárias, funcionalidades opcionais, informação redundante
- **Revelação progressiva**: Oculte complexidade atrás de pontos de entrada claros (acordões, modais, fluxos passo-a-passo)
- **Combine ações relacionadas**: Mescle botões similares, consolide formulários, agrupe conteúdo relacionado
- **Hierarquia clara**: UMA ação primária, poucas ações secundárias, todo o resto terciário ou oculto
- **Remova redundância**: Se já foi dito em outro lugar, não repita aqui

### Simplificação Visual
- **Reduza a paleta de cores**: Use 1-2 cores mais neutros, não 5-7 cores
- **Limite a tipografia**: Uma família de fontes, 3-4 tamanhos no máximo, 2-3 pesos
- **Remova decorações**: Elimine bordas, sombras, fundos que não servem à hierarquia ou função
- **Achate a estrutura**: Reduza aninhamento, remova containers desnecessários; nunca aninhe cards dentro de cards
- **Remova cards desnecessários**: Cards não são necessários para layout básico; use espaçamento e alinhamento
- **Espaçamento consistente**: Use uma escala de espaçamento, remova gaps arbitrários

### Simplificação de Layout
- **Fluxo linear**: Substitua grids complexos por fluxo vertical simples quando possível
- **Remova sidebars**: Mova conteúdo secundário inline ou oculte-o
- **Largura total**: Use o espaço disponível generosamente em vez de layouts multi-coluna complexos
- **Alinhamento consistente**: Escolha esquerda ou centro, mantenha-se firme
- **White space generoso**: Deixe o conteúdo respirar, não empacote tudo apertado

### Simplificação de Interação
- **Reduza escolhas**: Menos botões, menos opções, caminho mais claro para frente (o paradoxo da escolha é real)
- **Padrões inteligentes**: Faça escolhas comuns automáticas, pergunte apenas quando necessário
- **Ações inline**: Substitua fluxos modais por edição inline quando possível
- **Remova etapas**: O cadastro pode ser uma etapa em vez de três? O checkout pode ser simplificado?
- **CTAs claros**: UM próximo passo óbvio, não cinco ações competindo

### Simplificação de Conteúdo
- **Copy mais curta**: Corte cada frase pela metade, depois faça de novo
- **Voz ativa**: "Salvar alterações" não "Alterações serão salvas"
- **Remova jargão**: Linguagem simples sempre vence
- **Estrutura escaneável**: Parágrafos curtos, bullet points, títulos claros
- **Apenas informação essencial**: Remova fluff de marketing, juridiquês, hedging
- **Remova copy redundante**: Sem headers reafirmando introduções, sem explicações repetidas, diga uma vez

### Simplificação de Código
- **Remova código não utilizado**: CSS morto, componentes sem uso, arquivos órfãos
- **Achate árvores de componentes**: Reduza profundidade de aninhamento
- **Consolide estilos**: Mescle estilos similares, use utilities consistentemente
- **Reduza variantes**: Aquele componente precisa de 12 variações, ou 3 cobrem 90% dos casos?

**NUNCA**:
- Remova funcionalidade necessária (simplicidade ≠ sem funcionalidades)
- Sacrifique acessibilidade por simplicidade (rótulos claros e ARIA ainda são necessários)
- Torne as coisas tão simples que fiquem obscuras (mistério ≠ minimalismo)
- Remova informação que os usuários precisam para tomar decisões
- Elimine hierarquia completamente (algumas coisas devem se destacar)
- Simplifique demais domínios complexos (correspond a complexidade à complexidade real da tarefa)

## Verifique a Simplificação

Garanta que a simplificação melhora a usabilidade:

- **Conclusão de tarefa mais rápida**: Os usuários conseguem realizar objetivos mais rapidamente?
- **Carga cognitiva reduzida**: É mais fácil entender o que fazer?
- **Ainda completo**: Todas as funcionalidades necessárias ainda estão acessíveis?
- **Hierarquia mais clara**: Está óbvio o que mais importa?
- **Performance melhor**: O design mais simples carrega mais rápido?

## Documente a Complexidade Removida

Se você removeu funcionalidades ou opções:
- Documente por que foram removidas
- Considere se precisam de pontos de acesso alternativos
- Anote feedback de usuários para monitorar

Quando os cortes parecerem certos, passe para `{{command_prefix}}impeccable polish` para a revisão final. Como colocou Antoine de Saint-Exupéry: "A perfeição é alcançada não quando não há mais nada a adicionar, mas quando não há mais nada a tirar."
