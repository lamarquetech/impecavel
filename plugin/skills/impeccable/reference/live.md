Modo interativo de variantes ao vivo: selecione elementos no navegador, escolha uma ação de design, e receba variantes HTML+CSS geradas por IA trocadas a quente via HMR do dev server.

## Pré-requisitos

Um dev server em execução com hot module replacement (Vite, Next.js, Bun, etc.), OU um arquivo HTML estático aberto no navegador.

## O contrato (leia uma vez)

Execute em ordem. Nenhum passo ignorado, nenhum passo reordenado.

1. `live.mjs`: inicialização.
2. Navegue até a URL que serve `pageFile` (infira a partir de `package.json`, docs, saída do terminal, ou uma aba aberta). Se não conseguir inferir com confiança, diga ao usuário uma vez para abrir sua URL de dev/preview. Nunca use `serverPort` como essa URL; é o helper, não a aplicação.
3. Loop de poll com o timeout longo padrão (600000 ms). Após cada evento ou `--reply`, execute `live-poll.mjs` novamente imediatamente. Nunca passe um `--timeout=` curto.
4. No `generate`: leia o screenshot se presente; carregue a referência da ação; planeje três direções distintas; escreva todas as variantes em uma única edição; `--reply done`; faça poll novamente.
5. No `accept` / `discard`: o script de poll executa `live-accept.mjs`, reconhece o evento entregue, e imprime `_completionAck`. Accepts/discards simples são terminais imediatamente; accepts com carbonize permanecem recuperáveis até você finalizar a limpeza, executar `live-complete.mjs --id EVENT_ID`, e só então fazer poll novamente.
6. Se interrompido, execute `live-status.mjs` ou `live-resume.mjs` antes de adivinhar. O journal durável reproduz trabalho não reconhecido após reinicialização do helper.
7. No `exit`: execute a limpeza no final.

Política de harness:
- **Claude Code**: execute o poll como uma **tarefa em background** (sem timeout curto). O harness notifica você quando ele completa, então a conversa principal fica livre. Não bloqueie o shell.
- **Cursor**: execute o poll em **primeiro plano** (shell bloqueante; não um terminal em background, não um subagente). Terminais em background e subagentes do Cursor não retomam de forma confiável o chat com o stdout do poll.
- **Codex**: execute o poll em **primeiro plano** (shell bloqueante; não uma tarefa em background, não um subagente). Sessões de execução em background do Codex não trazem de forma confiável o stdout do poll de volta para a conversa no momento em que os eventos chegam, então um poll em background "dispare-e-esqueça" vai travar o modo live.
- **Outros harnesses**: primeiro plano a menos que você saiba que o stdout retorna de forma confiável a esta sessão.

Chat é overhead. Sem recap, sem saída de tutorial, sem colar corpos de PRODUCT / DESIGN. Gaste tokens em ferramentas e edições; em caso de falha, uma ou duas frases curtas.

## Início

```bash
node {{scripts_path}}/live.mjs
```

Saída JSON: `{ ok, serverPort, serverToken, pageFiles, hasProduct, product, productPath, hasDesign, design, designPath, migrated }`. `pageFiles` é a lista de entradas HTML nas quais o script live foi injetado. Mantenha PRODUCT.md e DESIGN.md em mente para geração de variantes; **DESIGN.md prevalece em decisões visuais; PRODUCT.md prevalece em decisões estratégicas/de voz.** Quando DESIGN.md está ausente, a identidade **não** está ausente; extraia-a de variáveis CSS, estilos computados, e componentes irmãos na página (veja Passo 4 Fase A). Preservação de identidade é o padrão; afastamento da identidade existente requer um gatilho explícito de anti-referências do PRODUCT.md ou do prompt livre do usuário. Se `migrated: true`, o loader renomeou automaticamente o legado `.impeccable.md` para `PRODUCT.md`; mencione isso uma vez e sugira `/impeccable document` para o DESIGN.md correspondente.

`serverPort` e `serverToken` pertencem ao pequeno servidor HTTP **Impeccable live helper** (serve `/live.js`, SSE, e `/poll`). Essa porta **não** é seu dev server e geralmente não é a URL que você abre para visualizar a aplicação. A página do navegador é qualquer origem que serve uma das entradas de `pageFiles` (Vite / Next / Bun / tunnel / hostname LAN).

Se a saída for `{ ok: false, error: "config_missing" | "config_invalid", path }`, este projeto não foi configurado para o modo live (ou sua configuração está desatualizada). Veja **Configuração inicial** no final.

## Loop de poll

```
LOOP:
  node {{scripts_path}}/live-poll.mjs   # timeout longo padrão; sem --timeout=
  Leia JSON; despache com base no "type"

  "generate"  → Trate Generate; reply done; LOOP
  "accept"    → Trate Accept; complete limpeza de carbonize se necessário; LOOP
  "discard"   → Trate Discard; LOOP
  "prefetch"  → Trate Prefetch; LOOP
  "timeout"   → LOOP
  "exit"      → break → Limpeza
```

## Comandos de recuperação

O helper live persiste um journal append-only em `.impeccable/live/sessions/`. Checkpoints do navegador são consultivos mas duráveis; o journal é canônico. Este é estado local durável de recuperação, não fonte do projeto.

Use estes comandos quando o chat foi interrompido, o poll foi perdido, o helper reiniciou, ou o navegador recarregou:

```bash
node {{scripts_path}}/live-status.mjs
node {{scripts_path}}/live-resume.mjs --id SESSION_ID
node {{scripts_path}}/live-complete.mjs --id SESSION_ID
```

- `live-status.mjs` imprime o estado do helper conectado, sessões duráveis ativas, e eventos pendentes na fila. Funciona mesmo quando o helper está inativo lendo o journal diretamente.
- `live-resume.mjs` imprime o snapshot ativo, evento pendente, fase do checkpoint, variante visível, valores dos parâmetros, e a próxima ação segura do agente.
- `live-complete.mjs` é o reconhecimento final manual canônico. Use-o após a limpeza de carbonize/manual ser verificada e nenhum outro reconhecimento de poll acontecerá automaticamente.

Regra de reinicialização do servidor: inicie `live-server.mjs` novamente, depois faça poll. A inicialização reenfileira eventos pendentes não reconhecidos do journal, então não peça ao usuário para clicar Go novamente a menos que `live-resume.mjs` diga que não existe sessão ativa.

## Tratar `generate`

Evento: `{id, action, freeformPrompt?, count, pageUrl, element, screenshotPath?, comments?, strokes?}`.

Velocidade importa; o usuário está vendo um spinner. Minimize chamadas de ferramentas usando o helper `wrap` e escrevendo todas as variantes em uma única edição.

### 1. Leia o screenshot (se presente)

`event.screenshotPath` é **enviado apenas quando o usuário colocou pelo menos um comentário ou traço antes de Go.** Quando presente, é um caminho absoluto para um PNG do elemento renderizado com as anotações incorporadas. **Leia antes de planejar**: anotações codificam intenção do usuário não recuperável apenas de `element.outerHTML`.

Quando `screenshotPath` está ausente, não peça um e não saia procurando a renderização atual. A omissão é deliberada: sem anotações, um screenshot ancoraria o modelo no design existente e lutaria contra o brief de três-direções-distintas. Trabalhe a partir de `element.outerHTML`, dos estilos computados em `event.element`, e do prompt livre se presente.

`event.comments` e `event.strokes` carregam metadados estruturados junto com o visual. Trate o screenshot como primário; use os dados estruturados para específicos que valem a pena citar (ex.: o texto exato de um comentário).

Lendo anotações com precisão:

- **A posição do comentário carrega significado.** Seu `{x, y}` está em CSS px local ao elemento (mesmo espaço de coordenadas que `element.boundingRect`). Encontre o filho sob aquele ponto e aplique o texto do comentário LOCALMENTE àquele sub-elemento. Um comentário perto do título é sobre o título, não uma descrição global.
- **Comentários e traços são anotações independentes** a menos que estejam claramente pareados por sobreposição ou proximidade estreita. Não deixe o peso visual de um traço proeminente sobrescrever a localização precisa de um comentário textualmente específico em outro lugar.
- **Traços são gestos; leia-os pela forma.** Loop fechado = "esta coisa" (ênfase / foco); seta = direção (mover / apontar para); cruz ou barra = excluir; rabisco livre = ênfase ou exclusão dependendo do contexto. Um loop ao redor da região X significa "preste atenção em X," não "mude apenas pixels dentro de X."
- **Quando a intenção de um traço é ambígua** (círculo ou seta? ênfase ou mover?), declare sua leitura em uma frase de justificativa em vez de adivinhar silenciosamente. Se a incerteza muda materialmente o brief, faça uma pergunta curta de esclarecimento antes de gerar.

### 2. Envolva o elemento

```bash
node {{scripts_path}}/live-wrap.mjs --id EVENT_ID --count EVENT_COUNT --element-id "ELEMENT_ID" --classes "class1,class2" --tag "div" --text "TEXT_SNIPPET"
```

Mapeamento de flags. Mantenha-os separados, não colapse em `--query`:

- `--element-id` ← `event.element.id`
- `--classes` ← `event.element.classes` unidos com vírgulas
- `--tag` ← `event.element.tagName`
- `--text` ← primeiros ~80 caracteres de `event.element.textContent` (trim, linha única). **Passe isto em toda chamada.** Quando o elemento selecionado compartilha classes + tag com componentes irmãos (uma lista de `<Card>`s, seções repetidas), isto é o que desambigua qual ramificação no fonte envolver. Sem isso, wrap silenciosamente pousa na primeira correspondência e pode reescrever o elemento errado.

O helper busca por ID primeiro, depois classes, depois combinação tag + classe. Se `event.pageUrl` implica o arquivo (ex.: `/` é geralmente `index.html`), passe `--file PATH` para pular a busca. `--query` é um fallback para busca de texto bruto apenas; não o use para buscas normais de elementos.

Se `--text` corresponde a múltiplos candidatos igualmente bem, wrap sai com `{ error: "element_ambiguous", candidates: [...] }` e `fallback: "agent-driven"`: leia os intervalos de linhas candidatos, decida qual corresponde ao elemento selecionado pelo contexto da página, e escreva o wrapper manualmente conforme o fluxo de fallback.

Saída em caso de sucesso: `{ file, insertLine, commentSyntax, styleMode, styleTag, cssSelectorPrefixExamples, cssAuthoring }`.

`styleMode` controla como o CSS de preview deve ser autorado. Trate-o como um modo de capacidade detectado, não um palpite de framework:

- `scoped`: use regras `@scope ([data-impeccable-variant="N"])`.
- `astro-global-prefixed`: use prefixos de seletor `[data-impeccable-variant="N"]` explícitos e a `styleTag` exata retornada pela ferramenta.

Use `cssAuthoring` como a fonte de verdade para o arquivo atual. Inclui a `styleTag` exata, estratégia de seletor, exemplos de seletor, requisitos, e padrões proibidos. Não aplique uma exceção específica de framework a menos que o `styleMode` / `cssAuthoring.mode` retornado diga para fazê-lo.

**Erros de fallback.** Wrap apenas escreve em arquivos que julga ser fonte (rastreados por git, não marcados como GENERATED, não listados no `generatedFiles` da configuração). Se não puder pousar em um arquivo fonte, ele erroa sem escrever; aceitar uma variante em um arquivo gerado é perda silenciosa de dados. Três formatos:

- `{ error: "file_is_generated", file, hint }`: `--file` fornecido pelo usuário aponta para um arquivo gerado.
- `{ error: "element_not_in_source", generatedMatch, hint }`: elemento existe apenas em um arquivo gerado (o próximo build apagaria quaisquer edições).
- `{ error: "element_not_found", hint }`: elemento não está em nenhum arquivo do projeto; provavelmente injetado em runtime (componente JS, render dinâmico a partir de dados).

Todos os três carregam `fallback: "agent-driven"`. Siga **Tratar fallback** abaixo.

### 3. Carregue a referência da ação

Se `event.action` é `impeccable` (a ação livre padrão), use as leis compartilhadas do SKILL.md mais a referência de registro carregada (`brand.md` ou `product.md`). Não carregue uma referência de sub-comando. **Freeform não é uma licença para pular parâmetros:** você ainda segue o orçamento de composição e o viés freeform no **§7 Parâmetros** abaixo. Arquivos de sub-comando listam knobs de assinatura OBRIGATÓRIOS; freeform não tem tal arquivo, então dimensionar knobs a partir do peso visual e eixos primários é inteiramente com você.

Qualquer outro `event.action` (`bolder`, `quieter`, `distill`, `polish`, `typeset`, `colorize`, `layout`, `adapt`, `animate`, `delight`, `overdrive`): Leia `reference/<action>.md` antes de planejar. Cada sub-comando codifica uma disciplina específica; pular sua referência produz saída genérica. Esses arquivos podem requerer parâmetros específicos; adicione-os sobre o orçamento do §7, não em vez dele.

### 4. Planeje três variantes: identidade primeiro, depois modo, depois eixos

O enquadramento errado para o modo live é "mostre três direções de design diferentes." Live roda em uma superfície existente; a marca já foi escolhida. O trabalho é variação **dentro da identidade**, não seleção entre identidades. Modo de falha: três variantes editorial-tipográficas em um brief que não era editorial. Modo de falha maior: três variantes fora da marca que o usuário não pode aceitar porque não parecem seu produto.

Quatro fases. Faça-as em ordem.

#### Fase A: Extraia a identidade (não-pulável)

A superfície existente já tem uma identidade. Leia-a antes de planejar qualquer coisa. Fontes, em ordem de prioridade:

1. **DESIGN.md** se carregado: leia os campos do sistema visual (palette, type pairing, motion, components). Esta é a resposta autoritativa.
2. **CSS custom properties** nas stylesheets da página (`:root { --color-...; --font-...; ... }`): estes são tokens de facto.
3. **Estilos computados** no elemento selecionado e seu pai: cores, fontes, escalas de espaçamento, raios de canto.
4. **Componentes irmãos na página**: que retórica visual os componentes existentes usam? (Assimétrico ou centralizado? Denso ou arejado? Ousado ou silencioso?)

Anote o que você vê em **uma frase**. A frase descreve a superfície que está realmente na tela; não é aspiracional, não é opinativa, não é editada em direção ao que a marca "deveria" ser. Capture, aproximadamente nesta ordem:

- A cor de superfície dominante e a cor de destaque, por hex ou nome de token (use os valores reais, não categorias como "quente" ou "neutro").
- O type pairing: os nomes reais das fontes carregadas, primária primeiro.
- A topologia de layout: como os elementos dominantes estão arranjados (empilhado / lado a lado / grid / assimétrico / overlay).
- O tratamento de superfície: cantos, bordas, sombras, densidade de decoração.
- O tom de voz que você lê do copy em si, não da sensação estética.

Seja específico. "Moderno" não é uma cor, "elegante" não é um type pairing, "limpo" não é um layout. Se você não consegue extrair um valor real para um eixo, pule-o em vez de fabricar. O ponto é registrar o que é, não descrever o que você gostaria que fosse.

Não inclua adjetivos que nomeiam uma família estética ("tendência-editorial", "sabor-terminal", "brutalista"); estes são conclusões, não dados. Pertencem à seleção de faixa na Fase C em modo departure, não à descrição de identidade. Deixá-los se esgueirar na Fase A é como o bloqueio de identidade colapsa em uma profecia auto-realizável.

Esta frase é o **bloqueio de identidade**. Toda variante deve ser legível como a mesma marca se renderizada lado a lado. Pular esta fase é a causa principal de variantes fora da marca. Ausência de DESIGN.md nunca é uma desculpa; extraia de CSS e estilos computados em vez disso.

#### Fase B: Escolha o modo (padrão vs departure)

**Modo padrão**: a identidade existente é preservada. Variantes variam eixos de expressão dentro dela. *Este é o modo certo para ~90% das sessões live.* O usuário selecionou um elemento em um produto real que está lançando; espera variantes do *seu* hero, não heros de três marcas diferentes.

**Modo departure**: a identidade existente é rejeitada. Variantes propõem alternativas consistentes com a voz do PRODUCT.md. Acione apenas quando pelo menos um for verdadeiro:

- Anti-referências do PRODUCT.md explicitamente chamam a superfície atual ("o `index.html` atual é em si um exemplo"; "difunda-se disto"; "a página na tela é o fracasso"). Anti-referências genéricas que descrevem o que evitar em geral **não** acionam modo departure; apenas aquelas que apontam para *esta* superfície especificamente.
- O prompt livre do usuário pede explicitamente departure ("reconstrua do zero", "e se não fosse editorial de jeito nenhum", "mostre-me algo completamente diferente").

Se você está em dúvida, está em modo padrão. O custo de errar sobre o padrão é "três variantes na marca com sensação similar": recuperável, o usuário não escolhe nenhuma. O custo de errar sobre departure é "três variantes fora da marca": irrecuperável, o usuário fica irritado.

#### Fase C: Planeje três variantes

**Modo padrão.** Cada variante se compromete com um **eixo primário** de diferença diferente, enquanto preserva a frase de identidade. Os seis eixos:

1. **Hierarquia**: qual elemento comanda o olhar?
2. **Topologia de layout**: empilhado / lado a lado / grid / assimétrico / overlay
3. **Sistema tipográfico**: lógica de pairing, razão de escala, estratégia de caixa/peso *dentro das fontes disponíveis*
4. **Estratégia de cor**: qual papel da palette existente carrega a superfície (Contida / Comprometida / Palette completa / Encharcada). Use os tokens de palette existentes da marca, não cores novas.
5. **Densidade**: mínima / confortável / densa
6. **Decomposição estrutural**: mesclar, dividir, disclosure progressivo

Três variantes → três eixos DIFERENTES. O trio lê como *a mesma marca em três ângulos*. Não introduza fontes novas, matizes de palette novas, ou sinais de família estética nova; esses pertencem ao modo departure.

**Ao planejar cada variante, também nomeie seus 2–3 knobs de parâmetro** (conforme a tabela de orçamento do §7). Parâmetros são parte do design, não uma decoração adicionada depois. Se a variante explora densidade, exponha um knob de densidade. Se explora comprometimento de cor, exponha um range de color-amount. Decidir "o que é ajustável" durante o planejamento produz knobs melhores do que retroajustá-los no HTML finalizado.

**Modo departure.** Cada variante ancora em uma **direção estética** diferente, derivada da voz e registro declarados da marca no PRODUCT.md. NÃO escolha de um catálogo fixo de categorias de faixa. As três direções certas para esta marca não são as mesmas que as três certas para outra marca, e escolher de uma lista é em si o reflexo de dados de treinamento (o modelo seleciona "Swiss-grid, Terminal, Industrial-signage" toda vez porque são os itens mais distantes de editorial em qualquer lista enumerada).

Em vez disso, trabalhe a partir da marca:

1. Leia as palavras de Brand Personality do PRODUCT.md. Que experiências físicas, espaciais ou materiais encarnariam essas palavras se design não estivesse envolvido? (Uma personalidade descrita como "específica, conquistada, inconfundível" evoca uma carta carimbada à mão, uma impressão numerada, uma lupa de relojoeiro. Uma personalidade descrita como "inquieta, barulhenta, sem filtro" evoca um poster de show, uma parede pixada, um megafone.)
2. A partir dessas experiências físicas, derive três direções visuais genuinamente diferentes entre si E da superfície atual da qual você está se afastando.
3. Evite as **faixas de reflexo-rejeição** em [brand.md](brand.md). Não troque uma monocultura por outra. Se você se pegar alcançando "Swiss-grid" ou "Terminal" ou "Industrial-signage" por reflexo, você está correspondendo padrões de um catálogo em seus dados de treinamento, não lendo a marca. Comece de novo pelas palavras de personalidade.
4. Cada direção deve ser expressável em uma frase concreta que nomeie um referente do mundo real ("um sistema de rótulos de exposição de museu para uma galeria de arte contemporânea" não "limpo e minimal"). Se sua frase contém apenas adjetivos, não é concreta o suficiente.
5. **Ao planejar cada direção, também nomeie seus 2–3 knobs de parâmetro** (conforme a tabela de orçamento do §7). O mesmo princípio do modo padrão: decida "o que é ajustável" durante o planejamento, não depois de escrever o HTML. Um hero em modo departure com 0 parâmetros não é "visão criativa ousada," é uma oportunidade perdida para o usuário ajustar a direção que escolher.

#### Fase D: Teste do olho semicerrado

**Squint do modo padrão.** Leia a frase de identidade de cada variante e compare com a identidade bloqueada da Fase A. Se qualquer variante derivou para uma palette diferente, voz tipográfica, ou retórica visual, ela cruzou para o modo departure acidentalmente; retrabalhe. Depois verifique se cada variante se compromete com um eixo primário diferente. Três variantes de "densidade mais justa" é falha.

**Squint do modo departure.** Duas passagens, família antes de frase:

1. **Passagem de família.** Rotule cada variante com uma palavra de família de design de sua própria escolha (qualquer substantivo concreto: *exhibition, storefront, cockpit, recipe-card, playbill, field-manual*). Se quaisquer duas variantes compartilham um rótulo, ou se o rótulo poderia se aplicar igualmente bem às outras variantes, retrabalhe. Não use uma lista de vocabulário fixa para os rótulos. *Esta passagem é inegociável no modo departure e captura a falha de monocultura que a passagem de frase perde.*
2. **Passagem de frase.** Escreva três descrições de uma frase lado a lado. Se duas delas rimam ("ambas têm tipo grande" / "ambas são pilhas de seções" / "ambas centralizam o CTA"), retrabalhe a ofensora.

**Quando o eixo primário é cor ou tema, proíba o trio de compartilhar tema + matiz dominante.** Dois escuros-mais-um-escuro não é distinto. Mire em três mundos de cor, não três tons do mesmo.

**Para invocações específicas de ação**, cada variante deve variar ao longo da dimensão que a ação nomeia:

- `bolder`: amplifique uma dimensão diferente por variante (escala / saturação / mudança estrutural). Não três variantes de "ligeiramente maior".
- `quieter`: recue uma dimensão diferente (cor / ornamento / espaçamento).
- `distill`: remova uma classe diferente de excesso (ruído visual / conteúdo redundante / estrutura aninhada).
- `polish`: direcione um eixo de refinamento diferente (ritmo / hierarquia / micro-detalhes como raios de canto, estados de foco, kerning óptico).
- `typeset`: type pairing diferente E razão de escala diferente cada. Não três variações sobre um pairing.
- `colorize`: família de matiz diferente cada (não tons de um matiz). Varie chroma e estratégia de contraste.
- `layout**: arranjo estrutural diferente (empilhado / lado a lado / grid / assimétrico). Não ajustes de espaçamento.
- `adapt`: contexto alvo diferente por variante (mobile-first / tablet / desktop / print ou low-data). Não faça três layouts mobile.
- `animate**: vocabulário de movimento diferente (cascade stagger / clip wipe / scale-and-focus / morph / parallax). Não três fades escalonados.
- `delight`: sabor diferente de personalidade (micro-interação inesperada / surpresa tipográfica / acento ilustrado / momento sônico-ou-háptico / interação easter-egg).
- `overdrive`: convenção diferente quebrada (escala / estrutura / movimento / modelo de input / transições de estado). Pule o passo "proponha e pergunte" do `overdrive.md`; modo live é não-interativo.

### 5. Aplique o prompt livre (se presente)

`event.freeformPrompt` é o teto do usuário sobre direção (todas as variantes devem honrá-lo), mas ainda explore *interpretações* significativamente diferentes. As interpretações permanecem dentro de qualquer modo que você escolheu na Fase B.

No **modo padrão**, o prompt estreita os eixos que você escolhe, não a identidade. *"Faça parecer mais confiante"* → variante 1 amplifica hierarquia (um elemento comanda o olhar), variante 2 compromete a cor de destaque existente (estratégia Comprometida no matiz da marca), variante 3 aperta a densidade e remove folga decorativa. Três eixos diferentes, mesma marca.

No **modo departure**, o prompt estreita as faixas de onde você tira, não as famílias. *"Faça parecer como a primeira página de um jornal"* seria em si um prompt de modo departure; honre-o mas escolha três faixas adjacentes a jornais significativamente diferentes (broadsheet vs. tabloid vs. trade journal), e execute a passagem de família para confirmar que não colapsam em uma.

Quando o prompt e anti-referências do PRODUCT.md conflitam (o prompt pede X, as anti-referências banem X), as anti-referências vencem; elas descrevem a posição estabelecida da marca, o prompt é um momento.

### 6. Escreva todas as variantes em uma única edição

Substituição HTML completa do elemento original para cada variante, não um patch apenas de CSS. Considere o contexto do elemento (estilos computados, estrutura pai, variáveis CSS de `event.element`).

Escreva CSS + todas as variantes em UMA edição na `insertLine` reportada por `wrap`. Coloque o CSS junto como uma tag `<style>` dentro do wrapper de variantes; `<style>` funciona em qualquer lugar em navegadores modernos e isto garante que CSS e HTML cheguem atomicamente (sem FOUC).

Use o objeto `cssAuthoring` retornado por `live-wrap.mjs` para autorar o CSS de preview temporário. A tag de abertura de estilo mostrada abaixo é o caso comum; substitua-a por `cssAuthoring.styleTag` quando a ferramenta retornar uma diferente. A forma da marcação da variante é de resto estável:

```html
<!-- Variants: insert below this line -->
<style data-impeccable-css="SESSION_ID">
  /* rules matching cssAuthoring.rulePattern */
</style>
<div data-impeccable-variant="1">
  <!-- variant 1: full element replacement (single top-level element) -->
</div>
<div data-impeccable-variant="2" style="display: none">
  <!-- variant 2: full element replacement -->
</div>
<div data-impeccable-variant="3" style="display: none">
  <!-- variant 3: full element replacement -->
</div>
```

**Cada div de variante contém exatamente um elemento de nível superior: a substituição completa do original.** Use a mesma tag do original (ex.: `<section>` se o usuário selecionou uma `<section>`). Irmãos soltos (heading + paragraph + div como filhos diretos da div de variante) quebram o rastreamento de outline e o fluxo de accept, que ambos assumem um filho.

A primeira variante não tem `display: none` (visível por padrão). Todas as outras têm. Se variantes usam apenas estilos inline e nenhum CSS de preview, omita a tag `<style>` inteiramente.

Uma edição, todas as variantes; o MutationObserver do navegador capta tudo em uma passagem.

Para `styleMode: "scoped"`, autore toda regra `:scope` com um combinador descendente. O limite do `@scope` é o **wrapper de variante `<div data-impeccable-variant="N">`**, não o elemento que você está projetando. Um `:scope { background: cream; }` simples estiliza o wrapper, não a substituição interna, então o cream pousa em uma shell com `display: contents` enquanto o elemento real mantém os padrões da página. Sempre entre um nível: `:scope > .card`, `:scope > section`, `:scope .hero-title`, etc. O CSS do agente de teste falso em `tests/live-e2e/agent.mjs` é um template fiel; toda regra scoped começa com `:scope > ...`.

**Arquivos alvo JSX / TSX.** Envolva o conteúdo de `<style>` em uma template literal para que as `{` / `}` do CSS não sejam parseadas como expressões JSX, e use `className=` / `style={{…}}` em cada elemento de variante. Mantenha os atributos `data-impeccable-*` como estão; são strings simples:

```tsx
<style data-impeccable-css="SESSION_ID">{`
  @scope ([data-impeccable-variant="1"]) { ... }
  @scope ([data-impeccable-variant="2"]) { ... }
`}</style>
<div data-impeccable-variant="1">
  {/* variant 1 */}
</div>
<div data-impeccable-variant="2" style={{ display: 'none' }}>
  {/* variant 2 */}
</div>
```

O script wrap já dá a você um wrapper JSX de raiz única: um elemento externo `<div data-impeccable-variants="…">` com os comentários de marcação enfiados dentro. Solte o bloco de variantes acima no comentário "Variants: insert below this line" e o fonte permanece TSX válido.

### 7. Parâmetros (tamanho de composição, 0–4 por variante)

Cada variante pode expor knobs **grossos** junto com a substituição HTML/CSS completa. O navegador ancora um pequeno painel à direita do outline com um controle por parâmetro. O usuário arrasta/clica e vê feedback instantâneo: não há custo de regeneração porque o knob alterna uma variável CSS ou atributo de dados contra o qual o CSS escopo da variante já foi autorado.

**O que "opcional" não significa.** Parâmetros não são decoração nice-to-have em trabalho grande. A palavra significava "omita controles que são redundantes ou cosméticos," não "use zero por padrão porque três variantes já foram trabalho suficiente."

**Quando adicionar.** Assim que o CSS escopo da variante tem um eixo contínuo ou escalonado significativo: densidade, quantidade de cor, escala de tipo, intensidade de movimento, peso de coluna, e assim por diante. Se você consegue imaginar o usuário murmurando "um pouco mais justo" ou "um toque mais de destaque" **sem** querer uma regeneração completa, conecte aquele eixo. **Não** micro-margens ou empurrões pontuais; esses não são parâmetros.

**Viés freeform (`action` é `impeccable`).** Você não carregou uma referência de sub-comando, então deve **escolher** eixos de assinatura você mesmo. Corresponda à tabela de orçamento: para um hero ou composição grande, isso significa **2–3 eixos por variante**, não 1. Prefira knobs que se situam nas dimensões onde suas três variantes realmente diferem (se densidade varia, exponha como knob `steps`; se comprometimento de cor varia, exponha como `range`). Um hero que sai com **0** params é quase sempre um erro, não uma decisão. Um hero com exatamente **1** param está abaixo do peso a menos que o design seja genuinamente uma comparação de ponto fixo. Comece da tabela de orçamento, não do zero.

**O orçamento escala com o peso visual do elemento, não com o orçamento de tokens.** Knobs precisam de espaço para lerem como ajustáveis; três sliders em um controle único são ruído.

- **Folha / minúsculo**: um único botão, ícone, input, heading puro, parágrafo solitário: **0 params.**
- **Composição pequena**: input com rótulo, card simples, callout curto (≤ ~5 filhos visuais): **0–1** params quando um eixo dominante é óbvio; caso contrário **0.**
- **Composição média**: componente de seção, cluster de navegação, card denso, bloco de feature curto (6–15 filhos visuais): **meta 2**; **1** é aceitável se o bloco é simples; **0** apenas quando variantes são genuinamente pontos fixos.
- **Composição grande**: seção hero, região de página inteira, layout spread, forte estrutura interna (16+ filhos visuais ou múltiplas sub-seções): **meta 2–3**; **até 4** quando vários eixos independentes (ex.: structure `steps` + `density` + um destaque) estão todos autorados no CSS escopo.

**Na dúvida, pergunte se um dial existe antes de padronizar para zero.** O usuário sempre pode pedir mais variantes, mas o ponto do modo live é ajuste instantâneo sem outro Go. Lotar o painel é ruim; **sub-entregar** knobs em uma composição densa é a falha mais comum para freeform. Conte por filhos **visuais**, não profundidade DOM; um hero raso-mas-largo ainda é grande.

**Limite máximo por variante**: no máximo **quatro** parâmetros para o painel permanecer legível; raro quinto apenas se a referência permite explicitamente.

**Como declarar.** Coloque um manifesto JSON no wrapper da variante:

```html
<div data-impeccable-variant="1" data-impeccable-params='[
  {"id":"color-amount","kind":"range","min":0,"max":1,"step":0.05,"default":0.5,"label":"Color amount"},
  {"id":"density","kind":"steps","default":"snug","label":"Density","options":[
    {"value":"airy","label":"Airy"},
    {"value":"snug","label":"Snug"},
    {"value":"packed","label":"Packed"}
  ]},
  {"id":"serif","kind":"toggle","default":false,"label":"Serif display"}
]'>
  ...conteúdo da variante...
</div>
```

**Três tipos:**

- `range`: slider suave. Direciona uma custom property CSS `--p-<id>` no wrapper da variante. Autore CSS com `var(--p-color-amount, 0.5)`. Campos: `min`, `max`, `step`, `default` (número), `label`.
- `steps`: radio segmentado. Direciona um atributo de dados `data-p-<id>` no wrapper da variante. Autore CSS com `:scope[data-p-density="airy"] .grid { ... }`. Campos: `options` (array de `{value, label}`), `default` (string), `label`.
- `toggle`: interruptor liga/desliga. Direciona AMBOS uma var CSS (`--p-<id>: 0|1`) e um atributo de dados (presente quando ligado, ausente quando desligado). Use o que for mais conveniente. Campos: `default` (booleano), `label`.

**Parâmetros de assinatura por ação.** Para sub-comandos nomeados, leia o `reference/<action>.md` daquela ação para um ou dois parâmetros **OBRIGATÓRIOS** (ex.: `layout` → `density`). Esses são inegociáveis quando o design pode expressá-los. **Freeform não tem OBRIGATÓRIO em nível de arquivo**; o **Viés Freeform (`impeccable`)** nesta seção é o substituto. Se a ação do usuário é tanto estilizada quanto sub-comando (ex.: `colorize`), a lista OBRIGATÓRIA do sub-comando tem precedência para seus eixos; ainda respeite o **Limite máximo** e não adicione knobs duplicados redundantes.

**Reset na troca de variante.** Usuário ajusta densidade na v1, troca para v2, v2 começa nos defaults declarados de v2. Limitação conhecida; preservação entre variantes pode chegar depois.

**No accept**, o navegador envia os valores atuais do usuário no evento de accept. `live-accept.mjs` os escreve como um comentário irmão:

```html
<!-- impeccable-param-values SESSION_ID: {"color-amount":0.7,"density":"packed"} -->
```

O passo de limpeza de carbonize (veja abaixo) lê aquele comentário e incorpora os valores escolhidos no CSS final. Para seletores de atributo `steps`/`toggle`: mantenha apenas o ramo correspondendo ao valor escolhido, descarte os outros, colapse `:scope[data-p-density="packed"] .grid` para uma regra de classe semântica. Para vars `range`: substitua o literal ou mantenha a var com o valor escolhido como seu novo default.

### 8. Sinalize conclusão

```bash
node {{scripts_path}}/live-poll.mjs --reply EVENT_ID done --file RELATIVE_PATH
```

`RELATIVE_PATH` é relativo à raiz do projeto (`public/index.html`, `src/App.tsx`, etc.); o navegador busca o fonte diretamente se o dev server não tem HMR.

Depois execute `live-poll.mjs` novamente imediatamente.

### Abortando uma sessão em andamento

Se wrap ou geração falhar após o navegador ter mudado para GENERATING (ex.: wrap pousou na ramificação fonte errada e você já reverteu, ou a geração atingiu um erro irrecuperável), diga ao **navegador** para que sua barra resete para PICKING:

```bash
node {{scripts_path}}/live-poll.mjs --reply EVENT_ID error "Short reason"
```

Não execute `live-accept --discard` para isso; isso é um mutador de arquivo puro, o navegador não vê, e a barra fica presa nos pontos de GENERATING para sempre (o usuário precisa atualizar). `--discard` é correto apenas quando o **navegador** iniciou o descarte (usuário clicou ✕ durante CYCLING) e o agente está apenas executando limpeza do lado do fonte que o navegador já acionou.

## Tratar fallback

Quando wrap retorna `fallback: "agent-driven"`, o fluxo determinístico não se aplica. Continue aqui.

O objetivo é o mesmo: dar ao usuário três variantes para escolher E persistir a aceita em um lugar que o próximo build não vai apagar. A diferença é que você tem que escolher o arquivo fonte certo você mesmo.

### Passo 1: Identifique onde o elemento realmente vive

Use a carga do erro:

- `element_not_in_source` com `generatedMatch: "public/docs/foo.html"`: o HTML servido é gerado. Encontre o gerador (grep por escritores daquele caminho, ex.: `scripts/build-sub-pages.js`, um template Astro/Next) e localize o template ou partial que emite este elemento.
- `element_not_found`: o elemento é injetado em runtime. Procure o componente que o renderiza (React/Vue/Svelte), o JS que o monta, ou a fonte de dados que o alimenta.
- `file_is_generated` com `file: "..."`: usuário apontou para um arquivo gerado explicitamente. Mesma resolução que `element_not_in_source`.

Leia o fonte candidato até ter confiança de onde uma mudança ao elemento pertenceria. Se a mudança é puramente visual, aquele fonte pode ser uma stylesheet compartilhada, não o template.

### Passo 2: Mostre três variantes no DOM para preview

A barra do navegador está esperando por variantes. Mesmo sem um wrapper no fonte, você ainda precisa mostrar algo:

1. Escreva manualmente o scaffold do wrapper no arquivo **servido** (aquele que o navegador realmente carregou). Use a mesma estrutura que `live-wrap.mjs` produz; `<!-- impeccable-variants-start ID --><div data-impeccable-variants="ID" data-impeccable-variant-count="3" style="display: contents">…</div><!-- end -->`.
2. Insira suas três divs de variante dentro dele, mesma forma do caminho determinístico.
3. Sinalize conclusão com `--reply EVENT_ID done --file <arquivo servido>`. O fallback sem HMR do navegador vai buscar e injetar.

Esta edição no arquivo servido é **temporária**: a próxima regeneração a apaga, e isso é aceitável. O trabalho real acontece no accept.

### Passo 3: No accept, escreva no fonte verdadeiro

Quando o evento de accept chegar (`_acceptResult.handled` será geralmente `false` aqui porque accept também se recusa a persistir em arquivos gerados; veja Tratar accept para o ramo carbonize), extraia o conteúdo da variante aceita e escreva-o no fonte que você identificou no Passo 1:

- Mudança estrutural → edite o template / fonte do componente.
- Mudança apenas visual → adicione ou atualize regras na stylesheet apropriada; remova o escopo `<style>` inline.
- Dinâmico a partir de dados → atualize a fonte de dados ou a lógica de render.

Depois remova o wrapper temporário do arquivo servido se ainda estiver lá.

### Passo 4: No discard, limpe o arquivo servido

Remova o wrapper que você inseriu no Passo 2. Nada mais a fazer.

## Tratar `accept`

Evento: `{id, variantId, _acceptResult, _completionAck}`. O script de poll já executou `live-accept.mjs` para lidar com a operação de arquivo deterministicamente, depois reconheceu a entrega do evento ao helper. O DOM do navegador já está atualizado.

- `_completionAck.ok !== true`: não faça poll ainda. Execute `live-status.mjs` / `live-resume.mjs`, complete a limpeza manualmente se necessário, depois execute `live-complete.mjs --id EVENT_ID`.
- `_acceptResult.handled: true` e `carbonize: false`: nada a fazer. Faça poll novamente.
- `_acceptResult.handled: true` e `carbonize: true`: **limpeza pós-accept é necessária antes do próximo poll.** Veja a seção "Obrigatório após accept (carbonize)" abaixo. O campo `event._acceptResult.todo`, `_completionAck.requiresComplete`, e um banner stderr todos apontam para este acompanhamento necessário; nenhum é decorativo. Após a limpeza, execute `live-complete.mjs --id EVENT_ID`, depois faça poll novamente.
- `_acceptResult.handled: false, mode: "fallback"`: a sessão vivia em um arquivo gerado e o script se recusou a persistir lá. Você já escreveu a variante aceita no fonte verdadeiro durante Tratar fallback Passo 3; apenas limpe o wrapper temporário no arquivo servido se houver, e faça poll novamente.
- `_acceptResult.handled: false` sem `mode`: limpeza manual: leia o arquivo, encontre marcadores, edite.

### Obrigatório após accept (carbonize)

Quando `_acceptResult.carbonize === true`, a variante aceita foi costurada no fonte com marcadores do helper e CSS inline para que o navegador possa renderizá-la imediatamente sem gap visual. Aquela costura é **temporária**. O agente deve reescrevê-la em forma permanente antes de fazer qualquer outra coisa. Pular isso deixa regras `@scope` mortas para variantes não aceitas, um wrapper `data-impeccable-variant` sem propósito, e ruído de comentários `impeccable-carbonize-start/end` no arquivo fonte; todos os quais se acumulam entre sessões.

Faça estes cinco passos na thread atual, sincronamente, antes do próximo poll. Não faça poll novamente até o arquivo estar limpo.

1. **Localize o bloco carbonize** no arquivo fonte (`_acceptResult.file`). Ele está delimitado por `<!-- impeccable-carbonize-start SESSION_ID -->` e `<!-- impeccable-carbonize-end SESSION_ID -->` e contém um elemento `<style data-impeccable-css="SESSION_ID">`. Se a variante declarou parâmetros, um comentário `<!-- impeccable-param-values SESSION_ID: {...} -->` fica ao lado da tag style com os valores escolhidos pelo usuário; leia-o primeiro; ele orienta os passos 3 e 4 abaixo.
2. **Mova as regras CSS** para a stylesheet real do projeto. Qual stylesheet depende do projeto (ex.: `site/styles/workflow.css` para um projeto Astro, ou o arquivo CSS co-localizado do componente para um projeto Vite/Next; escolha aquele que já é dono do estilo do elemento circundante).
3. **Incorpore os valores dos parâmetros ao reescrever seletores.** Para wrappers `@scope ([data-impeccable-variant="N"])`: redirecione para classes semânticas reais no HTML aceito (`.why-visual--v2 .v2-label { … }`). Para seletores `:scope[data-p-<id>="VALUE"]`: mantenha apenas o ramo correspondendo ao valor escolhido do comentário param-values; descarte os outros (estão mortos após o accept). Para `var(--p-<id>, DEFAULT)` no CSS: substitua o valor literal, ou se o param ainda é útil como knob adiante, deixe a var e atualize sua declaração inicial para o valor escolhido.
4. **Desembrulhe o conteúdo aceito.** Delete o `<div data-impeccable-variant="N" style="display: contents">` que o envolve. Remova `data-impeccable-params` e quaisquer atributos `data-p-*` dele; esses são infraestrutura do modo live, não fonte.
5. **Delete o bloco `<style>` inline, o comentário `<!-- impeccable-param-values -->` se presente, e ambos os marcadores `<!-- impeccable-carbonize-start/end -->`.** Também descarte quaisquer regras `@scope` para variantes que não a aceita; essas são código morto agora.

Após o arquivo estar limpo, execute `live-complete.mjs --id SESSION_ID`, verifique se reporta `phase: "completed"`, depois faça poll novamente.

Um agente em background pode ser usado para a reescrita, mas a thread atual é responsável por verificar se os cinco passos estão completos antes de emitir o próximo poll. Na prática, inline é geralmente mais rápido e menos propenso a erros.

## Tratar `discard`

Evento: `{id, _acceptResult, _completionAck}`. O script de poll já restaurou o original, removeu todos os marcadores de variante, e reconheceu a conclusão durável `discarded`. Nada a fazer a menos que `_completionAck.ok !== true`; nesse caso execute `live-complete.mjs --id EVENT_ID --discarded`, depois faça poll novamente.

## Tratar `prefetch`

Evento: `{pageUrl}`. O navegador dispara isto na primeira vez que o usuário seleciona um elemento em uma dada rota, como atalho de latência; sinaliza que o usuário provavelmente vai Go em uma página que você ainda não leu.

Resolva `pageUrl` para o arquivo subjacente:

- Raiz `/` → o `pageFile` retornado por `live.mjs` (geralmente `public/index.html` ou equivalente).
- Sub-rotas (ex.: `/docs`, `/docs/live`) → o arquivo gerado ou fonte para aquela rota. Use seu conhecimento do layout do projeto (sites estáticos multi-página frequentemente resolvem `/foo` → `public/foo/index.html`; SPAs podem mapear todas as rotas para uma única entrada).

Leia o arquivo para o contexto, depois faça poll novamente. Sem `--reply`: este é pré-trabalho especulativo; Go virá depois. Se não conseguir resolver com confiança a rota para um arquivo, pule e faça poll novamente.

Dedupe é trabalho do navegador (um prefetch por pathname único por sessão); confie nele. Se o mesmo arquivo aparece duas vezes de rotas diferentes mapeando para o mesmo arquivo, o segundo Read está em cache de qualquer forma.

## Saída

O usuário pode parar o modo live:
- Dizendo "stop live mode" / "exit live" no chat
- Fechando a aba do navegador (SSE cai, poll retorna `exit` após 8s)
- O botão de saída do navegador

Quando o poll retorna `exit`, prossiga para limpeza. Se o poll ainda está rodando como tarefa em background, mate-o primeiro.

## Limpeza

```bash
node {{scripts_path}}/live-server.mjs stop
```

Para o servidor HTTP e executa `live-inject.mjs --remove` para remover `localhost:…/live.js` da entrada HTML. Para parar o servidor mas manter a tag de injeção (para um reinício rápido), use `stop --keep-inject`. `.impeccable/live/config.json` persiste como configuração do projeto para sessões futuras.

Depois:
- Remova quaisquer wrappers de variante restantes (busque por marcadores `impeccable-variants-start`).
- Remova quaisquer blocos carbonize restantes (busque por marcadores `impeccable-carbonize-start`).

## Configuração inicial (config ausente ou inválida)

Se `live.mjs` exibe `{ ok: false, error: "config_missing" | "config_invalid", path }`, escreva a configuração live no caminho reportado. Por padrão este é `.impeccable/live/config.json`.

Schema:

```json
{
  "files": ["<path-or-glob>", "<path-or-glob>", ...],
  "exclude": ["<optional-glob>", ...],
  "insertBefore": "</body>",
  "commentSyntax": "html",
  "cspChecked": true
}
```

`files` é o alvo de injeção; **os arquivos HTML que o navegador realmente carrega**, não necessariamente o fonte. Cada entrada é um caminho literal (`"public/index.html"`) ou um padrão glob (`"public/**/*.html"`). Rastreado ou gerado não importa aqui; wrap tem sua própria guarda de arquivo gerado e rotas aceita através do fluxo de fallback.

`exclude` (opcional) é uma lista de padrões glob correspondendo a arquivos para pular, mesmo se um glob de `files` os teria incluído. Use para templates de email, fixtures de demo, ou qualquer HTML que não é uma página live.

`cspChecked` rastreia se o passo de detecção CSP abaixo já foi executado. Ausente na primeira configuração; defina como `true` após CSP ser verificado (seja corrigido, recusado, ou não necessário).

**Caminhos hard-excluded (não podem ser sobrescritos).** `**/node_modules/**` e `**/.git/**` nunca são correspondidos independentemente do que o usuário escrever. Estes são diretórios de vendor/metadata e injetar neles seria instrumentar código de terceiros silenciosamente.

**Sintaxe de glob.** `**` corresponde a qualquer número de segmentos de caminho (incluindo zero), `*` corresponde a quaisquer caracteres exceto `/`, `?` corresponde a um único caractere exceto `/`. Caminhos são sempre relativos à raiz do projeto com barras invertidas.

| Framework | `files` | `insertBefore` | `commentSyntax` |
|-----------|---------|----------------|-----------------|
| SPA com shell único (Vite / React / Plain HTML) | `["index.html"]` | `</body>` | `html` |
| Next.js (App Router) | `["app/layout.tsx"]` | `</body>` | `jsx` |
| Next.js (Pages) | `["pages/_document.tsx"]` | `</body>` | `jsx` |
| Nuxt | `["app.vue"]` | `</body>` | `html` |
| Svelte / SvelteKit | `["src/app.html"]` | `</body>` | `html` |
| Astro | `[" <root layout .astro>"]` | `</body>` | `html` |
| Multi-página (HTML separado por rota) | `["public/**/*.html"]`: um glob cobrindo o diretório servido | `</body>` | `html` |

Escolha uma âncora que exista em todo arquivo (`</body>` quase sempre funciona). Use `insertAfter` se a âncora deve corresponder **após** uma linha específica.

Para sites multi-página, **prefira um glob a uma lista literal de arquivos**. Novas páginas adicionadas depois são captadas automaticamente na próxima execução de `live-inject.mjs`; sem manutenção de config.

Para sites multi-página cujas páginas são *reconstruídas* por um gerador (Astro, static-site generators, scripts customizados como `build-sub-pages.js`), a injeção sobrevive apenas até a próxima regeneração. Re-execute `live.mjs` após cada build. Accept não é afetado; escreve no fonte verdadeiro via fluxo de fallback.

### Aviso de drift-heal

A cada inicialização de `live.mjs`, após injeção, o projeto é escaneado por arquivos HTML sob raízes comuns de fonte de páginas (`public/`, `src/`, `app/`, `pages/`). Se algum existir que não está coberto pela lista `files` resolvida, a saída inclui um campo `configDrift`:

```json
{
  "ok": true,
  "serverPort": 8400,
  "pageFiles": [ "..." ],
  "configDrift": {
    "orphans": ["public/new-section/index.html", "public/docs/new-command.html"],
    "orphanCount": 2,
    "hint": "2 HTML file(s) exist but aren't in config.files. Consider adding them, or use a glob pattern like \"public/**/*.html\"."
  }
}
```

Quando `configDrift` está presente, apresente-o ao usuário uma vez por sessão antes de entrar no loop de poll:

> Notei N arquivo(s) HTML no projeto que não estão em `config.files`:
>
> - `public/new-section/index.html`
> - `public/docs/new-command.html`
>
> Adicione-os, ou mude `files` para um glob como `["public/**/*.html"]` e deixe rastrear novas páginas automaticamente?

Não atualize a config automaticamente; deixe o usuário decidir. `configDrift` é `null` quando não há drift.

### Detecção de CSP (apenas na primeira vez)

Se `config.cspChecked === true`, pule esta seção inteira. Você já perguntou a este usuário uma vez; a resposta permanece.

Caso contrário, execute o helper de detecção:

```bash
node {{scripts_path}}/detect-csp.mjs
```

Saída: `{ shape, signals }` onde `shape` é um de `append-arrays`, `append-string`, `middleware`, `meta-tag`, ou `null`. O shape é nomeado pelo *mecanismo de patch*, então um template cobre muitos frameworks.

- **`null`**: sem CSP; pule para escrever `.impeccable/live/config.json` com `cspChecked: true`.
- **`append-arrays`**: CSP definida como arrays de diretivas estruturadas. Auto-patcheável. Veja *append-arrays* abaixo. Cobre:
  - Helpers de monorepo com opções `additionalScriptSrc` / `additionalConnectSrc` (Next.js + pacote de config compartilhado)
  - `kit.csp.directives` do SvelteKit
  - Módulo `nuxt-security` do Nuxt com `contentSecurityPolicy`
- **`append-string`**: CSP escrita como string de valor literal. Auto-patcheável. Veja *append-string* abaixo. Cobre:
  - `headers()` inline em `next.config.*` com um literal CSP
  - Headers de `routeRules` / `nitro.routeRules` do Nuxt
- **`middleware`** ou **`meta-tag`**: mais raros. Detectados mas não auto-patcheados na v1. Mostre ao usuário os arquivos detectados e peça para adicionar `http://localhost:8400` a `script-src` e `connect-src` manualmente, depois marque `cspChecked: true` e prossiga.

#### Template de prompt de consentimento

Use esta formulação para que a experiência seja consistente entre agentes:

> **Patch de CSP necessário.** Detectei uma Content Security Policy no seu projeto que bloqueia `http://localhost:8400`: o seletor live não carrega sem uma permissão. Aqui está a mudança que eu faria:
>
> ```diff
> [file: <patchTarget>]
> [diff exato, 2–5 linhas]
> ```
>
> Está protegido por `NODE_ENV === "development"` então a entrada extra aparece apenas em dev e nunca chega à produção. Você pode removê-la a qualquer momento revertendo este arquivo. Aplicar? [s/n]

Em "não": pule o patch, mencione que live não vai funcionar até o usuário adicionar a permissão manualmente, ainda escreva `cspChecked: true` (a pergunta já foi feita).

Em "sim": aplique o patch específico do Shape abaixo, depois escreva `cspChecked: true`.

#### append-arrays

CSP expressa como arrays de diretivas estruturadas. Mecanismo de patch: declare um array apenas de dev, espalhe-o nos arrays de script-src e connect-src.

**Declare perto do topo do arquivo que contém os arrays de CSP:**

```ts
// Dev-only allowance so impeccable live mode can load. Guarded by NODE_ENV.
const __impeccableLiveDev =
  process.env.NODE_ENV === "development" ? ["http://localhost:8400"] : [];
```

**Acrescente `...__impeccableLiveDev` aos arrays de diretivas script-src e connect-src.** Especificidades por framework:

- **Next.js + helper de monorepo**: edite o `next.config.*` do *app* (não o helper compartilhado), acrescentando a `additionalScriptSrc` e `additionalConnectSrc` passados para `createBaseNextConfig` (ou equivalente). Mantém o pacote compartilhado limpo.
- **SvelteKit**: edite `svelte.config.js`, acrescentando a `kit.csp.directives['script-src']` e `kit.csp.directives['connect-src']`.
- **Nuxt + nuxt-security**: edite `nuxt.config.*`, acrescentando a `security.headers.contentSecurityPolicy['script-src']` e `['connect-src']`.

Saídas de referência:
- `tests/framework-fixtures/nextjs-turborepo/expected-after-patch.ts` (Next.js)
- `tests/framework-fixtures/sveltekit-csp/expected-after-patch.js` (SvelteKit)

Idempotência: se `__impeccableLiveDev` já existe no arquivo, o patch já foi aplicado; pule a pergunta e apenas marque `cspChecked: true`.

#### append-string

CSP construída como string de valor literal. Patch de dois pontos: declare uma string apenas de dev perto do topo, interpole-a na CSP nas diretivas `script-src` e `connect-src`.

```ts
// Dev-only allowance so impeccable live mode can load.
const __impeccableLiveDev =
  process.env.NODE_ENV === "development" ? " http://localhost:8400" : "";
```

Depois na string de valor CSP:
- `script-src 'self' 'unsafe-inline'` → `` `script-src 'self' 'unsafe-inline'${__impeccableLiveDev}` ``
- `connect-src 'self'` → `` `connect-src 'self'${__impeccableLiveDev}` ``

(Espaço inicial na string dev para concatenar de forma limpa no valor existente. Converta as diretivas CSP literais em template strings como parte da edição se ainda não forem.)

Especificidades por framework:
- **Next.js inline `headers()`**: edite `next.config.*`, inserindo a variável no valor CSP.
- **Nuxt `routeRules`**: edite `nuxt.config.*`, inserindo na CSP em `routeRules['/**'].headers['Content-Security-Policy']`.

Saídas de referência:
- `tests/framework-fixtures/nextjs-inline-csp/expected-after-patch.js` (Next.js)
- `tests/framework-fixtures/nuxt-csp/expected-after-patch.ts` (Nuxt)

### Solução de problemas

Se um usuário diz "não" ao patch de CSP na configuração e depois reclama que live não funciona: o CSP de dev bloqueia `http://localhost:8400`. Correção: delete `cspChecked` de `.impeccable/live/config.json` e re-execute `live.mjs`: a configuração vai perguntar novamente.

Depois re-execute `live.mjs`.
