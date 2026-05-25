Molde a UX e a UI para uma funcionalidade antes de qualquer código ser escrito. Este comando produz um **brief de design**: um artefato estruturado que guia a implementação por meio de descoberta, não de suposições.

**Escopo**: Apenas planejamento de design. Este comando NÃO escreve código. Ele produz o raciocínio que torna o código bom.

**Saída**: Um brief de design que pode ser entregue a {{command_prefix}}impeccable craft, ou diretamente a {{command_prefix}}impeccable para implementação livre. Quando sondas de direção visual são usadas, as imagens são artefatos de apoio, não a saída principal.

## Filosofia

A maioria das UIs geradas por IA falha não por causa de código ruim, mas por raciocínio omitido. Elas pulam direto para "aqui está um grid de cards" sem perguntar "o que o usuário está tentando realizar?" Este comando inverte isso: entenda profundamente primeiro, para que a implementação seja precisa.

## Fase 1: Entrevista de Descoberta

**NÃO escreva nenhum código nem tome nenhuma decisão de design durante esta fase.** Seu único trabalho é entender a funcionalidade profundamente o suficiente para tomar excelentes decisões de design depois.

Esta é uma interação obrigatória, não uma orientação opcional. Faça estas perguntas em conversa, adaptando com base nas respostas. Não as despeje todas de uma vez; tenha um diálogo natural. {{ask_instruction}}

### Cadência da entrevista

A descoberta inclui pelo menos uma rodada de resposta do usuário, a menos que PRODUCT.md, DESIGN.md, ou um brief já confirmado respondam diretamente aos insumos necessários. Com um prompt esparso, **não** sintetize um brief completo para confirmação na primeira resposta.

- Use a ferramenta de perguntas estruturadas do harness quando ela existir. Caso contrário, pergunte diretamente no chat e pare.
- Faça **2-3 perguntas por rodada**, depois aguarde as respostas.
- Trate PRODUCT.md e DESIGN.md como âncoras; elas reduzem perguntas repetidas, mas **não** substituem shape para craft. Shape é específico da tarefa.
- Uma rodada é o padrão. Adicione uma segunda apenas se a primeira deixar lacunas materiais. Não execute uma segunda rodada só para parecer minucioso.
- A Rodada 1 deve esclarecer propósito, público/contexo, conteúdo/escopo e (para brand) direção visual.
- A Rodada 2, quando necessária, preenche o que ainda estiver genuinamente faltando.

**Afirme-então-confirme, não menu-com-escape.** Quando PRODUCT.md e o prompt do usuário tornam uma opção óbvia, nomeie-a e peça ao usuário para confirmar ou sobrescrever. Não enumere "Restrained / Committed / Ou algo mais?" como uma escolha real; "Isso parece Restrained, confirma?" é melhor que um menu de quatro opções quando a resposta já está clara.

### Propósito e Contexto
- Para que serve esta funcionalidade? Que problema ela resolve?
- Quem especificamente vai usá-la? (Não "usuários"; seja específico: cargo, contexto, frequência)
- Como é o sucesso? Como você saberá que esta funcionalidade está funcionando?
- Qual é o estado mental do usuário quando chega a esta funcionalidade? (Apressado? Explorando? Ansioso? Focado?)

### Conteúdo e Dados
- Que conteúdo ou dados esta funcionalidade exibe ou coleta?
- Quais são as faixas realistas? (Mínimo, típico, máximo, ex.: 0 itens, 5 itens, 500 itens)
- Quais são os casos extremos? (Estado vazio, estado de erro, primeiro uso, usuário avançado)
- Algum conteúdo é dinâmico? O que muda e com que frequência?
- Quais assets visuais são conteúdo real aqui? Anote imagens necessárias, fotos de produtos, ilustrações, mapas, texturas, diagramas, objetos gerados, ou assets existentes do projeto.

### Direção de Design

Force uma decisão visual em três frentes. Pule qualquer coisa que PRODUCT.md ou DESIGN.md já responda; pergunte apenas o que está faltando.

- **Estratégia de cor para esta superfície.** Escolha uma: Restrained / Committed / Full palette / Drenched. Pode sobrescrever o padrão do projeto se a superfície o merecer (ex.: um hero drenched dentro de um produto caso contrário Restrained).
- **Tema via frase de cena.** Escreva uma frase de contexto físico para esta superfície: quem usa, onde, sob que luz ambiente, em que humor. A frase força dark vs light. Se não forçar, adicione detalhe até forçar.
- **Duas ou três referências-âncora nomeadas.** Produtos, marcas ou objetos específicos. Não adjetivos como "moderno" ou "limpo."

### Escopo

Sempre pergunte. Qualidade de esboço e qualidade de entrega são saídas diferentes; não adivinhe entre elas.

- **Fidelidade.** Sketch / mid-fi / high-fi / production-ready?
- **Abrangência.** Uma tela / um fluxo / uma superfície inteira?
- **Interatividade.** Visual estático / protótipo interativo / componente de qualidade de entrega?
- **Intenção de tempo.** Exploração rápida, ou polir até entregar?

As respostas de escopo são específicas da tarefa. Não as escreva em PRODUCT.md ou DESIGN.md; carregue-as apenas através do brief de design.

### Restrições
- Há restrições técnicas? (Framework, orçamento de performance, suporte a navegadores)
- Há restrições de conteúdo? (Localização, comprimento dinâmico de texto, conteúdo gerado pelo usuário)
- Requisitos mobile/responsivos?
- Requisitos de acessibilidade além de WCAG AA?

### Anti-Objetivos
- O que isso NÃO deveria ser? Qual seria uma direção errada?
- Qual é o maior risco de errar isso?

## Fase 1.5: Sonda de Direção Visual (Condicionada a Capacidade)

Após a entrevista de descoberta, gere um pequeno conjunto de sondas de direção visual **antes** de escrever o brief final quando todas estas condições forem verdadeiras:

- O trabalho é **inteiramente novo** ou direcionalmente ambíguo o suficiente para que a exploração visual esclareça o brief.
- A fidelidade solicitada é **mid-fi, high-fi, ou production-ready**. Pule para planejamento apenas com sketch.
- O harness atual oferece geração nativa de imagens (`image_gen` do Codex, uma ferramenta MCP equivalente, ou similar). Não peça ao usuário para instalar APIs ou ferramentas.

Quando essas condições são atendidas, este passo é obrigatório. Se a geração de imagens não está nativamente disponível, não peça ao usuário para instalar APIs ou ferramentas. Declare em uma linha que o passo de imagem foi pulado porque o harness não possui geração nativa de imagens, depois prossiga. O anúncio de uma linha é obrigatório, não opcional; ele força uma decisão consciente em vez de deixar o passo silenciosamente evaporar.

Use as sondas para explorar caminhos visuais, não para substituir o brief.

Não pule as sondas porque a UI final será semântica, editável, nativa em código, responsiva ou acessível. Esses são requisitos de implementação, não razões para evitar exploração visual.

### O que gerar

Gere **2 a 4** sondas de direção distintas baseadas nas respostas da descoberta, especialmente:

- Estratégia de cor
- Frase de cena do tema
- Referências-âncora nomeadas
- Escopo e fidelidade

As sondas devem diferir na direção visual primária (hierarquia, topologia, densidade, voz tipográfica, ou estratégia de cor), não apenas em ajustes de paleta.

### Como usar as sondas

- Trate-as como **testes de direção**, não designs finais.
- Use-as para testar sob pressão se o brief está apontando para o caminho certo.
- Pergunte ao usuário qual direção parece mais próxima, o que parece errado, e o que deve ser mantido.
- Se as sondas revelarem um desalinhamento, revise os insumos do brief antes de finalizar o brief.

### Limites importantes

- **NÃO** pule a descoberta porque a geração de imagens está disponível.
- **NÃO** trate imagens geradas como especificação final de UX, copy final, ou comportamento final de acessibilidade.
- **NÃO** use este passo para refinamentos menores de trabalho existente. Ele é para moldar uma nova superfície ou esclarecer uma grande escolha direcional.

Se a geração de imagens não está nativamente disponível, anuncie a pulada em uma linha e prossiga para o brief de design.

## Fase 2: Brief de Design

Após a entrevista e quaisquer sondas necessárias, apresente um brief e **encerre sua resposta**. O usuário deve confirmar antes de qualquer implementação ser executada. Não apresente um brief e depois continue codificando na mesma resposta, mesmo que o brief pareça óbvio para você. A confirmação do usuário é o portão.

**Escolha o formato do brief com base na clareza das respostas:**

- **Formato compacto (3-5 bullets)** quando a descoberta foi rápida e o prompt original + PRODUCT.md já definiram escopo, conteúdo e direção. Declare o que você está construindo, o caminho visual, e termine com uma ou duas perguntas específicas ou um claro "confirma ou sobrescreve?" prompt. Este é o padrão para solicitações típicas de craft com um prompt claro.
- **Formato estruturado completo (seções abaixo)** quando a tarefa é genuinamente ambígua, multi-tela, ou quando o usuário pediu shape como um passo autônomo. Use isso quando a disciplina da estrutura justifica seu peso.

Não enfie um brief claro em um longo para parecer minucioso. Um brief de 70 linhas reafirmando respostas que o usuário acabou de dar é ruído, não rigor. Igualmente, não pule a pausa de confirmação para parecer eficiente: a pausa é o ponto.

Apresente o brief, depois **pare e aguarde confirmação explícita**. Você não é o juiz de se o usuário já aprovou. Mesmo quando o brief parece obviamente correto, pergunte uma vez e aguarde. A pausa é o que separa shape de implementação prematura.

### Estrutura do Brief

**1. Resumo da Funcionalidade** (2-3 frases)
O que é isto, para quem é, o que precisa realizar.

**2. Ação Primária do Usuário**
A única coisa mais importante que um usuário deve fazer ou entender aqui.

**3. Direção de Design**
Estratégia de cor (Restrained / Committed / Full palette / Drenched) + a frase de cena do tema + 2-3 referências-âncora nomeadas. Referencie PRODUCT.md e DESIGN.md onde já respondem, e anote quaisquer sobrescrições por superfície.

Se você executou o passo de Sonda de Direção Visual, nomeie qual direção de sonda venceu e o que mudou no brief por causa disso.

**4. Escopo**
Fidelidade, abrangência, interatividade e intenção de tempo da seção Escopo da entrevista. Específico da tarefa; estes não persistem além do brief.

**5. Estratégia de Layout**
Abordagem espacial de alto nível: o que recebe ênfase, o que é secundário, como a informação flui. Descreva a hierarquia visual e o ritmo, não CSS específico.

**6. Estados-Chave**
Liste todos os estados que a funcionalidade precisa: padrão, vazio, carregando, erro, sucesso, casos extremos. Para cada um, anote o que o usuário precisa ver e sentir.

**7. Modelo de Interação**
Como os usuários interagem com esta funcionalidade. O que acontece ao clicar, passar o mouse, rolar? Que feedback recebem? Qual é o fluxo da entrada até a conclusão?

**8. Requisitos de Conteúdo**
Que copy, labels, mensagens de estado vazio, mensagens de erro e microcopy são necessários. Anote qualquer conteúdo dinâmico e suas faixas realistas. Para superfícies lideradas por imagem, liste também os papéis de imagem/mídia necessários e sua fonte provável (asset do projeto, raster gerado, SVG/CSS semântico, canvas/WebGL, biblioteca de ícones, ou omissão aceita).

**9. Referências Recomendadas**
Com base no brief, liste quais arquivos de referência impecáveis seriam mais valiosos durante a implementação (ex.: spatial-design.md para layouts complexos, motion-design.md para funcionalidades animadas, interaction-design.md para funcionalidades com muitos formulários).

**10. Questões em Aberto**
Qualquer coisa genuinamente não resolvida. Não liste "questões em aberto" para as quais você já recomendou um padrão; afirme o padrão e siga em frente. Se você escreveria `Recomendação: X` ao lado de uma pergunta, simplesmente decida X.

---

{{ask_instruction}} Peça confirmação explícita do brief antes de finalizar.

Se o usuário discordar de qualquer parte, revise as perguntas de descoberta relevantes. Uma execução de shape está incompleta até que o usuário confirme a direção.

Uma vez confirmado, o brief está completo. O usuário pode agora entregá-lo a {{command_prefix}}impeccable, ou usá-lo para guiar qualquer outra abordagem de implementação. (Se o usuário quer o fluxo completo de descoberta-e-construção em um passo, ele deve usar {{command_prefix}}impeccable craft, que executa este comando internamente.)
