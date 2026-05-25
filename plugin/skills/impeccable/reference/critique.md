### Propósito

Resolver um alvo estável, executar duas avaliações independentes, sintetizar uma crítica de design, persistir um snapshot e perguntar ao usuário o que melhorar a seguir. A resposta no chat é a entregável principal; o snapshot é um arquivo/backlog para comandos futuros.

### Invariantes Rígidas

- A Avaliação A (revisão de design) e a Avaliação B (evidência de detector/navegador) são ambas obrigatórias.
- A Avaliação A deve terminar antes que os achados do detector entrem no contexto de síntese pai. A saída do detector é determinística, mas ainda assim ancora o julgamento.
- Se sub-agentes não estiverem disponíveis, fallback sequencial: termine e registre a Avaliação A primeiro, depois execute a Avaliação B, depois sintetize.
- Um detector pulado é uma execução de crítica falha, a menos que `detect.mjs` esteja ausente ou falhe após uma tentativa real.
- Alvos visualizáveis requerem inspeção de navegador quando disponível.
- Qualquer servidor local iniciado apenas para visualização de crítica deve rodar em background, ter um método de parada registrado, e ser parado antes do relatório final, a menos que o usuário peça para mantê-lo.
- Não afirme que um overlay visível ao usuário existe a menos que a injeção de script tenha sido bem-sucedida e o detector tenha rodado na página.

### Setup

1. **Resolva o alvo** para um caminho de arquivo concreto ou URL. Prefira um caminho de código-fonte a uma URL de dev-server quando ambos identificam a mesma superfície; portas mudam, caminhos não.
   - "a homepage" -> `site/pages/index.astro` ou `index.html`
   - "o modal de configurações" -> o arquivo de componente principal
   - "esta página" -> a URL atual ou arquivo fonte
2. **Compute o slug**:
   ```bash
   node {{scripts_path}}/critique-storage.mjs slug "<resolved-path-or-url>"
   ```
   Mantenha-o. Se o comando sair com código não-zero, pule persistência e trend para esta execução, mas continue a crítica.
3. **Leia `.impeccable/critique/ignore.md`** se existir. Descarte achados correspondentes silenciosamente; é o único insumo de execuções anteriores que a crítica consome.

### Orquestração das Avaliações

Delegue a Avaliação A e a Avaliação B para sub-agentes separados quando possível. Eles não devem ver a saída um do outro. Não mostre achados ao usuário até a síntese.

<codex>
Codex sub-agent gate:
- Se `spawn_agent` está exposto e o usuário explicitamente permitiu sub-agentes, delegação ou trabalho paralelo de agente, spawne A e B imediatamente.
- Se `spawn_agent` está exposto mas o usuário não permitiu explicitamente sub-agentes, pergunte exatamente uma vez: "Impeccable critique é projetado para rodar dois sub-agentes independentes para uma avaliação não ancorada. Posso usar sub-agentes para esta crítica?" Então pare até o usuário responder.
- Se permitido, spawne A e B. Se recusado, execute sequencialmente e reporte `Assessment independence: degraded (sub-agents declined by user)`.
- Se `spawn_agent` não está exposto, não pergunte; execute sequencialmente e reporte `Assessment independence: degraded (spawn_agent unavailable in this session)`.
- Se o spawn falhar após permissão, execute sequencialmente e reporte `Assessment independence: degraded (sub-agent spawn failed: <exact error>)`.
Prefira `fork_context: false` com prompts autônomos contendo cwd, alvo, URL live, referências, contexto de produto e contrato de saída. Se usar `fork_context: true`, omita `agent_type`, `model` e `reasoning_effort`.
</codex>

Se automação de navegador está disponível, cada avaliação cria sua própria nova aba. Nunca reutilize uma aba existente, mesmo que já esteja na URL certa.

### Avaliação A: Revisão de Design

Leia arquivos fonte relevantes e inspecione visualmente a página ao vivo quando automação de navegador está disponível. Pense como um diretor de design.

Avalie:
- **AI slop**: Alguém acreditaria "IA fez isso" imediatamente? Verifique toda orientação DON'T da skill pai Impeccable.
- **Design holístico**: hierarquia, IA, ajuste emocional, descoberta, composição, tipografia, cor, acessibilidade, estados, copy e casos extremos.
- **Carga cognitiva**: consulte [cognitive-load](cognitive-load.md); reporte falhas de checklist e pontos de decisão com >4 opções visíveis.
- **Jornada emocional**: regra peak-end, vales emocionais, reasseguração em momentos de alto risco.
- **Heurísticas de Nielsen**: consulte [heuristics-scoring](heuristics-scoring.md); pontue todas as 10 heurísticas 0-4.

Retorne: veredito de AI slop, pontuações de heurísticas, carga cognitiva, jornada emocional, 2-3 pontos fortes, 3-5 problemas prioritários, red flags de personas, observações menores e perguntas provocativas.

### Avaliação B: Evidência de Detector + Navegador

Execute o detector empacotado e a evidência de visualização de navegador. A Avaliação B é obrigatória e deve permanecer isolada da Avaliação A até que ambas estejam completas.

Scan via CLI:
```bash
node {{scripts_path}}/detect.mjs --json [--fast] [target]
```

- Passe arquivos/diretórios de markup como `[target]`; não passe apenas arquivos CSS.
- Para URLs, pule o scan CLI e use visualização de navegador.
- Para 200+ arquivos escaneáveis, use `--fast`; para 500+, estreite o escopo ou pergunte.
- Código de saída 0 = limpo; 2 = achados.
- Se o entrypoint do detector está ausente ou falha ao carregar, reporte scan determinístico indisponível e continue com revisão de navegador/manual.

Visualização de navegador é necessária para um alvo visualizável quando automação de navegador está disponível. Use uma URL localhost dev/static para arquivos locais; evite `file://` a menos que o navegador disponível suporte explicitamente este fluxo. Fluxo de overlay:

1. Crie uma nova aba e navegue.
2. Preflight injeção mutável definindo `document.title` e anexando uma tag `<script>`. APIs de avaliação somente leitura não contam.
3. Se mutação não está disponível, pule servidor live, apresentação de navegador e injeção; reporte sinal de fallback.
4. Se mutação está disponível, inicie `node {{scripts_path}}/live-server.mjs --background`, apresente o navegador se suportado, rotule `[Human]`, role para o topo, injete `http://localhost:PORT/detect.js`, aguarde 2-3 segundos, leia mensagens de console `impeccable`, então pare o servidor live.
5. Para alvos multi-view, injete em 3-5 páginas representativas.

<codex>
Codex Browser note: Use a skill de Browser. Não gaste uma tentativa de Browser em `file://`. Apenas chame `visibility.set(true)` após injeção de script mutável ser confirmada para o caminho de overlay `[Human]`; verifique com `get()`. Use `tab.dev.logs({ filter: "impeccable" })` para resultados de console. Sua superfície Playwright `evaluate(...)` é somente leitura; não dependa dela para mutação.
</codex>

Retorne: JSON/contagens de achados CLI, achados de console do navegador se aplicável, falsos positivos e passos de navegador pulados/falhados com razões concretas.

Após a Avaliação B retornar achados CLI utilizáveis, reutilize-os. Não re-execute `detect.mjs` no pai a menos que a Avaliação B tenha falhado, sido truncada ou omitido contagem, nomes de regras ou localizações de arquivos.

<codex>
Codex failure accounting: as Run Notes finais devem incluir slug do alvo, lista de ignore, independência de avaliação, detector CLI, visibilidade de navegador, injeção de overlay, limpeza de live-server, limpeza de temp-file e qualquer sinal de fallback usado. Não execute verificações de status do repositório, investigação tardia de APIs ou verificação não relacionada após o relatório ser montado.
</codex>

### Gerar Relatório de Crítica Combinado

Sintetize ambas as avaliações em um único relatório. NÃO simplesmente concatene. Entrelace os achados, observando onde a revisão LLM e o detector concordam, onde o detector capturou problemas que o LLM perdeu, e onde os achados do detector são falsos positivos.

A resposta no chat é a entregável principal voltada ao usuário. Apresente a crítica estruturada completa abaixo no chat; não a substitua por um resumo e um link. O snapshot persistido é apenas um arquivo/backlog para comandos posteriores.

<codex>
Codex final-answer note: `$impeccable critique` produz um artefato de relatório, então a resposta final no chat deve intencionalmente exceder o estilo conciso usual de encerramento. Não intitule a resposta final "Critique Summary" a menos que o usuário tenha pedido explicitamente um resumo.
</codex>

Estruture seu feedback como um diretor de design faria:

#### Design Health Score
> *Consulte [heuristics-scoring](heuristics-scoring.md)*

Apresente as pontuações das 10 heurísticas de Nielsen como uma tabela:

| # | Heurística | Pontuação | Problema-Chave |
|---|------------|-----------|---------------|
| 1 | Visibility of System Status | ? | [achado específico ou "n/a" se sólido] |
| 2 | Match System / Real World | ? | |
| 3 | User Control and Freedom | ? | |
| 4 | Consistency and Standards | ? | |
| 5 | Error Prevention | ? | |
| 6 | Recognition Rather Than Recall | ? | |
| 7 | Flexibility and Efficiency | ? | |
| 8 | Aesthetic and Minimalist Design | ? | |
| 9 | Error Recovery | ? | |
| 10 | Help and Documentation | ? | |
| **Total** | | **??/40** | **[Faixa de classificação]** |

Seja honesto com as pontuações. Um 4 significa genuinamente excelente. A maioria das interfaces reais pontua 20-32.

#### Veredito de Anti-Padrões

**Comece aqui.** Isso parece gerado por IA?

**Avaliação LLM**: Sua própria avaliação de AI slop fala por si. Cubra sensação estética geral, similaridade de layout, composição genérica, oportunidades perdidas de personalidade.

**Scan determinístico**: Resuma o que o detector automatizado encontrou, com contagens e localizações de arquivos. Anote quaisquer problemas adicionais que o detector capturou e que você perdeu, e sinalize falsos positivos.

**Overlays visuais** (se injeção foi bem-sucedida): Diga ao usuário que overlays agora estão visíveis na aba **[Human]** no navegador, destacando os problemas detectados. Resuma o que a saída do console reportou. Se visualização de navegador foi tentada mas a injeção falhou, diga que nenhum overlay visível ao usuário está disponível e reporte o sinal de fallback.

#### Impressão Geral
Uma reação visceral breve: o que funciona, o que não funciona, e a maior oportunidade única.

#### O Que Está Funcionando
Destaque 2-3 coisas bem feitas. Seja específico sobre por que funcionam.

#### Problemas Prioritários
Os 3-5 problemas de design mais impactantes, ordenados por importância.

Para cada problema, tagueie com **severidade P0-P3** (consulte [heuristics-scoring](heuristics-scoring.md) para definições de severidade):
- **[P?] O quê**: Nomeie o problema claramente
- **Por que importa**: Como isso prejudica usuários ou mina objetivos
- **Correção**: O que fazer a respeito (seja concreto)
- **Comando sugerido**: Qual comando poderia resolver isso (de: {{available_commands}})

#### Red Flags de Personas
> *Consulte [personas](personas.md)*

Auto-selecione 2-3 personas mais relevantes para este tipo de interface (use a tabela de seleção na referência). Se `{{config_file}}` contém uma seção `## Design Context` do `impeccable teach`, gere também 1-2 personas específicas do projeto a partir das informações de público/marca.

Para cada persona selecionada, percorra a ação primária do usuário e liste red flags específicas encontradas:

**Alex (Power User)**: Nenhum atalho de teclado detectado. Formulário requer 8 cliques para ação primária. Onboarding forçado em modal. Alto risco de abandono.

**Jordan (First-Timer)**: Navegação apenas com ícones na sidebar. Jargão técnico em mensagens de erro ("404 Not Found"). Nenhuma ajuda visível. Vai abandonar no passo 2.

Seja específico. Nomeie os elementos e interações exatos que falham para cada persona. Não escreva descrições genéricas de personas; escreva o que quebrou para elas.

#### Observações Menores
Notas rápidas sobre problemas menores que valem a pena abordar.

#### Questões a Considerar
Perguntas provocativas que podem desbloquear melhores soluções:
- "E se a ação primária fosse mais proeminente?"
- "Isso precisa parecer tão complexo?"
- "Como seria uma versão confiante disso?"

<codex>
#### Run Notes
Mantenha compacto. Inclua status para slug do alvo, lista de ignore, independência de avaliação, detector CLI, visibilidade de navegador, injeção de overlay, limpeza de live-server e limpeza de temp-file. Para passos falhos ou pulados, forneça a razão concreta observada e o sinal de fallback usado. Na resposta final no chat, inclua também status de escrita do snapshot e leitura do trend após a persistência ter rodado.

Run Notes do Codex são apenas para final-chat. Não inclua esta seção no corpo do snapshot persistido, porque persistência, leitura de trend e limpeza de temp acontecem após a escrita do snapshot e de outra forma arquivariam status desatualizado como "pending after persistence."
</codex>

**Lembre-se**:
- Seja direto. Feedback vago desperdiça o tempo de todos.
- Seja específico. "O botão de enviar," não "alguns elementos."
- Diga o que está errado E por que importa para os usuários.
- Dê sugestões concretas. Corte "considere explorar..." inteiramente.
- Priorize sem piedade. Se tudo é importante, nada é.
- Não suavize a crítica. Desenvolvedores precisam de feedback honesto para entregar ótimo design.

### Persistir o Snapshot

Uma vez que o relatório acima esteja finalizado, escreva-o em `.impeccable/critique/` para que o usuário possa consultar depois, e para que `{{command_prefix}}impeccable polish` possa retomar os problemas prioritários sem copiar e colar.

Pule este passo se o slug do Setup for nulo (alvo vago ou de nível raiz).

1. **Escreva o corpo em um arquivo temp** para que você possa encaminhá-lo ao helper. Use o relatório de crítica completo (tabela de heurísticas, veredito de anti-padrões, problemas prioritários, red flags de personas, observações menores e perguntas), mas pare antes das seções "Perguntar ao Usuário" / "Ações Recomendadas" que vêm depois.

   <codex>
   Codex: exclua Run Notes do arquivo de corpo temp; Run Notes são apenas para final-chat porque persistência, leitura de trend e limpeza de temp acontecem após a escrita do snapshot.
   </codex>

2. **Passe os metadados estruturados** através de `IMPECCABLE_CRITIQUE_META` (JSON), depois execute o comando de escrita:
   ```bash
   IMPECCABLE_CRITIQUE_META='{"target":"<user phrasing>","total_score":<n>,"p0_count":<n>,"p1_count":<n>}' \
     node {{scripts_path}}/critique-storage.mjs write <slug> <body-file>
   ```
   O helper imprime o caminho absoluto que escreveu.

3. **Delete o arquivo temp de corpo** após a tentativa de escrita completar, tenha ela sido bem-sucedida ou falha. Se a deleção falhar, mencione `temp-file cleanup failed: <reason>` brevemente na saída final, mas não bloqueie a crítica.

4. **Leia o trend** para contexto:
   ```bash
   node {{scripts_path}}/critique-storage.mjs trend <slug> 5
   ```
   Isso retorna um array JSON das últimas 5 entradas de frontmatter (incluindo a que você acabou de escrever).

5. **Anexe uma única linha à saída visível ao usuário**, após o relatório e antes das perguntas:

   > **Trend para `<slug>` (últimas 5 execuções): 24 → 28 → 32 → 29 → 32**
   > Escreveu `.impeccable/critique/<filename>`.

   Se esta é a primeira execução para o slug, o trend é apenas uma pontuação; diga assim: "Primeira execução para este alvo, sem trend ainda."

Isso é fire-and-forget. Não mostre ao usuário a saída JSON do helper; apenas a linha de trend legível e o caminho escrito. Falhas aqui não devem bloquear o resto do fluxo; imprima o erro e continue.

### Perguntar ao Usuário

**Após apresentar os achados**, use perguntas direcionadas baseadas no que foi realmente encontrado. {{ask_instruction}} Estas respostas moldarão o plano de ação.

Faça perguntas nestas linhas (adapte aos achados específicos; NÃO faça perguntas genéricas):

1. **Direção prioritária**: Com base nos problemas encontrados, pergunte qual categoria importa mais para o usuário agora. Por exemplo: "Encontrei problemas com hierarquia visual, uso de cor e sobrecarga de informação. Qual área devemos atacar primeiro?" Ofereça as 2-3 principais categorias de problemas como opções.

2. **Intenção de design**: Se a crítica encontrou um desalinhamento tonal, pergunte se foi intencional. Por exemplo: "A interface parece clínica e corporativa. Esse é o tom pretendido, ou deveria parecer mais acolhedor/ousado/lúdico?" Ofereça 2-3 direções tonais como opções baseadas no que resolveria os problemas encontrados.

3. **Escopo**: Pergunte quanto o usuário quer assumir. Por exemplo: "Encontrei N problemas. Quer resolver tudo, ou focar nos 3 principais?" Ofereça opções de escopo como "Apenas os 3 principais", "Todos os problemas", "Apenas problemas críticos".

4. **Restrições** (opcional; apenas pergunte se relevante): Se os achados tocam muitas áreas, pergunte se algo está fora dos limites. Por exemplo: "Alguma seção deve permanecer como está?" Isso impede que o plano toque coisas que o usuário considera concluídas.

**Regras para perguntas**:
- Toda pergunta deve referenciar achados específicos do relatório. Nunca faça perguntas genéricas como "quem é seu público?"
- Limite a 2-4 perguntas no máximo. Respeite o tempo do usuário.
- Ofereça opções concretas, não prompts abertos.
- Se os achados são diretos (ex.: apenas 1-2 problemas claros), pule perguntas e vá direto para Ações Recomendadas.

<codex>
Codex final-question gate: A resposta visível ao usuário deve incluir as perguntas direcionadas ou dizer explicitamente `Questions skipped: <reason>` porque os achados eram diretos. Cada pergunta deve incluir 2-3 opções concretas de resposta vinculadas aos achados reais da crítica. Não termine apenas com perguntas abertas.
</codex>

### Ações Recomendadas

**Após receber as respostas do usuário**, apresente um resumo de ações priorizado refletindo as prioridades e escopo do usuário de Perguntar ao Usuário.

#### Resumo de Ações

Liste comandos recomendados em ordem de prioridade, baseado nas respostas do usuário:

1. **`{{command_prefix}}command-name`**: Breve descrição do que corrigir (contexto específico dos achados da crítica)
2. **`{{command_prefix}}command-name`**: Breve descrição (contexto específico)
...

**Regras para recomendações**:
- Apenas recomende comandos de: {{available_commands}}
- Ordene pelas prioridades declaradas pelo usuário primeiro, depois por impacto
- A descrição de cada item deve carregar contexto suficiente para que o comando saiba no que focar
- Mapeie cada Problema Prioritário para o comando apropriado
- Pule comandos que resolveriam zero problemas
- Se o usuário escolheu um escopo limitado, inclua apenas itens dentro desse escopo
- Se o usuário marcou áreas como fora dos limites, exclua comandos que tocarão nessas áreas
- Termine com `{{command_prefix}}impeccable polish` como passo final se alguma correção foi recomendada

Após apresentar o resumo, diga ao usuário:

> Você pode me pedir para executar estes um de cada vez, todos de uma vez, ou em qualquer ordem que preferir.
>
> Re-execute `{{command_prefix}}impeccable critique` após as correções para ver sua pontuação melhorar.
