> **Contexto adicional necessário**: nível de qualidade (MVP vs flagship).

Realize uma passagem final meticulosa para capturar todos os pequenos detalhes que separam trabalho bom de trabalho ótimo. A diferença entre entregue e polido.

A saída do detector e do QA automatizado é apenas evidência de defeitos. Um resultado de script limpo nunca é prova de que o design é forte; colete evidência do navegador e inspecione o caminho real de interação.

## Descoberta do Design System

Alinhar a funcionalidade ao design system **não é opcional**. Polimento sem alinhamento é decoração sobre deriva, e torna o trabalho da próxima pessoa mais difícil. A descoberta vem antes de qualquer outro trabalho de polimento.

1. **Encontre o design system**: Busque por documentação de design system, bibliotecas de componentes, guias de estilo, ou definições de tokens. Estude os padrões centrais: princípios de design, público-alvo, tokens de cor, escala de espaçamento, estilos de tipografia, API de componentes, convenções de movimento.
2. **Anote as convenções**: Como componentes compartilhados são importados? Que escala de espaçamento é usada? Quais cores vêm de tokens vs valores fixos? Que padrões de movimento e interação estão estabelecidos? Que formatos de fluxo são usados para ações comparáveis (modal vs página inteira, inline vs rota, save-on-blur vs submit explícito)?
3. **Identifique a deriva, depois nomeie a causa raiz**: Para cada desvio, classifique-o como um **token faltante** (o valor deveria existir no sistema mas não existe), uma **implementação ad-hoc** (um componente compartilhado já existe mas não foi usado), ou um **desalinhamento conceitual** (o fluxo, IA, ou hierarquia da funcionalidade não corresponde às funcionalidades vizinhas). A correção difere por categoria:补 o valor, troque pelo componente compartilhado, ou retrabalhe o fluxo. Corrigir o sintoma sem nomear a causa é como a deriva se acumula.

Se um design system existe, o polimento **deve** alinhar a funcionalidade a ele. Se nenhum existe, polimento contra as convenções visíveis no codebase. **Se qualquer aspecto do sistema é ambíguo, pergunte. Nunca adivinhe princípios de design system.**

## Avaliação Pré-Polimento

Entenda o estado atual e os objetivos antes de tocar em qualquer coisa:

1. **Revise a completude**:
   - Está funcionalmente completo?
   - Existem problemas conhecidos a preservar (marque com TODOs)?
   - Qual é o nível de qualidade? (Funcionalidade MVP vs flagship?)
   - Quando vai ser lançado? (Quanto tempo para polimento?)

2. **Pense experiência primeiro**: Quem realmente usa isto, e qual é a melhor experiência possível para eles? Design eficaz vence polimento decorativo; uma funcionalidade que parece bonita mas combate o fluxo do usuário não está polida. Caminhe pelo caminho da perspectiva deles antes de abrir DevTools.

3. **Identifique áreas de polimento**:
   - Inconsistências visuais
   - Problemas de espaçamento e alinhamento
   - Lacunas em estados de interação
   - Inconsistências de copy
   - Casos extremos e estados de erro
   - Suavidade de carregamento e transição
   - Arquitetura de informação e deriva de fluxo (esta funcionalidade revela complexidade da mesma forma que funcionalidades vizinhas?)

4. **Incorpore qualquer crítica prévia** (sinal opcional): Se `{{command_prefix}}impeccable critique` foi executado no mesmo alvo, seus problemas prioritários são um prévio útil para o que abordar primeiro. Resolva o alvo para um caminho de arquivo ou URL, então:
   ```bash
   slug=$(node {{scripts_path}}/critique-storage.mjs slug "<resolved>")
   node {{scripts_path}}/critique-storage.mjs latest "$slug"
   ```
   Exit 0 com body = encontrado; incorpore os itens P0/P1 à sua lista de polimento e mencione o caminho do snapshot para que o usuário veja o que você leu. Exit 2 = sem snapshot, continue sem isso. A crítica é uma entrada entre muitas. Faça sua própria passagem de qualquer forma.

5. **Triagem cosmético vs funcional**: Classifique cada problema como **cosmético** (parece estranho, não impede o usuário) ou **funcional** (quebra, bloqueia, ou confunde a experiência). Quando o tempo de polimento é curto, problemas funcionais são entregues primeiro; cosméticos podem vir em um follow-up. A qualidade deve ser consistente; nunca aperfeiçoe um canto enquanto deixa outro áspero.

**CRÍTICO**: Polimento é o último passo, não o primeiro. Não pola trabalho que não está funcionalmente completo.

## Pola Sistematicamente

Trabalhe por estas dimensões metodicamente:

### Alinhamento Visual e Espaçamento

- **Alinhamento pixel-perfect**: Tudo se alinha ao grid
- **Espaçamento consistente**: Todos os gaps usam a escala de espaçamento (sem gaps aleatórios de 13px)
- **Alinhamento óptico**: Ajuste para peso visual (ícones podem precisar de offset para centralização óptica)
- **Consistência responsiva**: Espaçamento e alinhamento funcionam em todos os breakpoints
- **Adesão ao grid**: Elementos se encaixam ao grid de baseline

**Verifique**:
- Ative overlay de grid e verifique alinhamento
- Verifique espaçamento com o inspetor do navegador
- Teste em múltiplos tamanhos de viewport
- Procure elementos que "parecem" desalinhados

### Arquitetura de Informação e Fluxo

Polimento visual em um fluxo malformado é trabalho desperdiçado. Corresponda a *forma* da experiência ao sistema, não apenas a superfície.

- **Disclosure progressivo**: Corresponda quanto é revelado e quando, comparado a funcionalidades vizinhas. Uma página de configurações expondo 40 campos quando o resto do app revela 5 de cada vez é deriva, mesmo que cada campo esteja perfeitamente estilizado.
- **Fluxos de usuário estabelecidos**: Ações de múltiplas etapas seguem o mesmo formato que fluxos comparáveis em outro lugar: modal vs página inteira, edição inline vs rota separada, save-on-blur vs submit explícito, atualizações otimistas vs pessimistas.
- **Hierarquia e complexidade**: O mesmo peso conceitual recebe o mesmo peso visual por toda a interface. Ações primárias não se tornam terciárias em um canto do produto, e ações terciárias não gritam.
- **Transições de chegada, carregamento e partida vazias**: Como conteúdo chega, atualiza, e parte corresponde a como faz em funcionalidades adjacentes.
- **Nomeação e modelo mental**: A funcionalidade usa os mesmos substantivos e verbos que o resto do sistema. Um "Workspace" aqui não deveria ser um "Project" três telas adiante.

### Refinamento de Tipografia

- **Consistência de hierarquia**: Mesmos elementos usam mesmos tamanhos/pesos por toda a interface
- **Comprimento de linha**: 45-75 caracteres para texto de corpo
- **Altura de linha**: Apropriada para tamanho de fonte e contexto
- **Viúvas e órfãs**: Sem palavras isoladas na última linha
- **Hifenação**: Apropriada para idioma e largura de coluna
- **Kerning**: Ajuste de letter-spacing onde necessário (especialmente manchetes)
- **Carregamento de fontes**: Sem flashes FOUT/FOIT

### Cor e Contraste

- **Razões de contraste**: Todo texto atende aos padrões WCAG
- **Uso consistente de tokens**: Sem cores fixas, todas usam design tokens
- **Consistência de tema**: Funciona em todas as variantes de tema
- **Significado de cor**: Mesmas cores significam mesmas coisas por toda a interface
- **Foco acessível**: Indicadores de foco visíveis com contraste suficiente
- **Neutros tingidos**: Sem cinza puro ou preto puro; adicione tingimento de cor sutil (0.01 chroma)
- **Cinza sobre cor**: Nunca coloque texto cinza em fundos coloridos; use um tom daquela cor ou transparência

### Estados de Interação

Todo elemento interativo precisa de todos os estados:

- **Default**: Estado de repouso
- **Hover**: Feedback sutil (cor, escala, sombra)
- **Focus**: Indicador de foco por teclado (nunca remova sem substituição)
- **Active**: Feedback de clique/toque
- **Disabled**: Claramente não interativo
- **Loading**: Feedback de ação assíncrona
- **Error**: Estado de validação ou erro
- **Success**: Conclusão bem-sucedida

**Estados faltantes criam confusão e experiências quebradas**.

### Micro-interações e Transições

- **Transições suaves**: Todas as mudanças de estado animadas apropriadamente (150-300ms)
- **Easing consistente**: Use ease-out-quart/quint/expo para desaceleração natural. Nunca bounce ou elastic; parecem datados.
- **Sem jank**: Animações suaves; use efeitos atmosféricos de blur/filtro/máscara/sombra quando adicionam polimento, mas limite áreas de paint pesadas e evite animação casual de propriedades de layout
- **Movimento apropriado**: Movimento serve propósito, não decoração
- **Movimento reduzido**: Respeita `prefers-reduced-motion`

### Conteúdo e Copy

- **Terminologia consistente**: Mesmas coisas chamadas pelos mesmos nomes por toda a interface
- **Capitalização consistente**: Title Case vs Sentence case aplicada consistentemente
- **Gramática e ortografia**: Sem erros de digitação
- **Comprimento apropriado**: Nem prolixo, nem lacônico
- **Consistência de pontuação**: Pontos em frases, não em rótulos (a menos que todos os rótulos tenham)

### Ícones e Imagens

- **Estilo consistente**: Todos os ícones da mesma família ou estilo compatível
- **Dimensionamento adequado**: Ícones dimensionados consistentemente para o contexto
- **Alinhamento adequado**: Ícones se alinham com texto adjacente opticamnte
- **Texto alt**: Todas as imagens têm texto alt descritivo
- **Estados de carregamento**: Imagens não causam layout shift, aspect ratios adequados
- **Suporte Retina**: Assets 2x para telas de alto DPI

### Formulários e Inputs

- **Consistência de rótulos**: Todos os inputs propriamente rotulados
- **Indicadores de obrigatório**: Claros e consistentes
- **Mensagens de erro**: Úteis e consistentes
- **Ordem de tabulação**: Navegação por teclado lógica
- **Auto-foco**: Apropriado (não exagere)
- **Timing de validação**: Consistente (on blur vs on submit)

### Casos Extremos e Estados de Erro

- **Estados de carregamento**: Todas as ações assíncronas têm feedback de carregamento
- **Estados vazios**: Estados vazios úteis, não apenas espaço em branco
- **Estados de erro**: Mensagens de erro claras com caminhos de recuperação
- **Estados de sucesso**: Confirmação de ações bem-sucedidas
- **Conteúdo longo**: Lida com nomes, descrições, etc. muito longos
- **Sem conteúdo**: Lida com dados ausentes graciosamente
- **Offline**: Tratamento offline apropriado (se aplicável)

### Responsividade

- **Todos os breakpoints**: Teste mobile, tablet, desktop
- **Alvos de toque**: 44x44px mínimo em dispositivos touch
- **Texto legível**: Nenhum texto menor que 14px em mobile
- **Sem scroll horizontal**: Conteúdo cabe no viewport
- **Refluxo apropriado**: Conteúdo se adapta logicamente

### Performance

- **Carregamento inicial rápido**: Otimize caminho crítico
- **Sem layout shift**: Elementos não pulam após carregar (CLS)
- **Interações suaves**: Sem lag ou jank
- **Imagens otimizadas**: Formatos e tamanhos apropriados
- **Lazy loading**: Conteúdo fora da tela carrega sob demanda

### Qualidade do Código

- **Remova console logs**: Sem log de debug em produção
- **Remova código comentado**: Limpe código morto
- **Remova imports não utilizados**: Limpe dependências não usadas
- **Nomenclatura consistente**: Variáveis e funções seguem convenções
- **Segurança de tipos**: Sem `any` do TypeScript ou erros ignorados
- **Acessibilidade**: Rótulos ARIA adequados e HTML semântico

## Checklist de Polimento

Passe sistematicamente:

- [ ] Alinhado ao design system (deriva nomeada e resolvida por causa raiz)
- [ ] Arquitetura de informação e formato de fluxo correspondem a funcionalidades vizinhas
- [ ] Alinhamento visual perfeito em todos os breakpoints
- [ ] Espaçamento usa design tokens consistentemente
- [ ] Hierarquia tipográfica consistente
- [ ] Todos os estados interativos implementados
- [ ] Todas as transições suaves (60fps)
- [ ] Copy é consistente e polido
- [ ] Ícones são consistentes e propriamente dimensionados
- [ ] Todos os formulários propriamente rotulados e validados
- [ ] Estados de erro são úteis
- [ ] Estados de carregamento são claros
- [ ] Estados vazios são acolhedores
- [ ] Alvos de toque são 44x44px mínimo
- [ ] Razões de contraste atendem WCAG AA
- [ ] Navegação por teclado funciona
- [ ] Indicadores de foco visíveis
- [ ] Sem erros ou avisos no console
- [ ] Sem layout shift ao carregar
- [ ] Funciona em todos os navegadores suportados
- [ ] Respeita preferência de movimento reduzido
- [ ] Código está limpo (sem TODOs, console.logs, código comentado)

**IMPORTANTE**: Polimento é sobre detalhes. Amplie. Cerre os olhos. Use você mesmo. As pequenas coisas se somam.

Transpire os detalhes. Amplie até o alinhamento estar certo e o espaçamento ler como deliberado. Então entregue.

**NUNCA**:
- Pola antes de estar funcionalmente completo
- Pola sem alinhar ao design system; isso é decoração sobre deriva
- Adivinhe princípios de design system em vez de perguntar quando algo é ambíguo
- Gaste horas em polimento se lança em 30 minutos (faça triagem)
- Introduza bugs enquanto pola (teste minuciosamente)
- Ignore problemas sistemáticos (se espaçamento está errado em todo lugar, corrija o sistema, não apenas uma tela)
- Aperfeiçoe uma coisa enquanto deixa outras ásperas (nível de qualidade consistente)
- Crie novos componentes ad-hoc quando equivalentes do design system existem
- Fixe valores que deveriam usar design tokens
- Introduza novos padrões ou fluxos que divergem dos estabelecidos

## Verificação Final

Antes de marcar como concluído:

- **Use você mesmo**: Interaja realmente com a funcionalidade.
- **Teste em dispositivos reais**: Não apenas DevTools do navegador.
- **Peça para alguém mais revisar**: Olhos frescos capturam coisas.
- **Compare com o design**: Corresponda ao design pretendido.
- **Verifique todos os estados**: Não teste apenas o caminho feliz.
- **Trate automação com cuidado**: Execute comandos de detector ou QA quando estiverem disponíveis e relevantes, corrija seus defeitos, mas nunca cite um resultado limpo como prova de que o trabalho está polido.

## Limpeza

Após polir, garanta qualidade de código:

- **Substitua implementações customizadas**: Se o design system fornece um componente que você reimplementou, troque para a versão compartilhada.
- **Remova código órfão**: Delete estilos, componentes, ou arquivos obsoletos pelo polimento.
- **Consolide tokens**: Se introduziu novos valores, verifique se deveriam ser tokens.
- **Verifique DRYness**: Procure duplicação introduzida durante o polimento e consolide.
