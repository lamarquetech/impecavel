# Fluxo de Craft

Construa uma funcionalidade com qualidade impecável de UX e UI: molde o design, defina a direção visual, construa código de produção real, inspecione e melhore no navegador até atingir o padrão de um estúdio de alto nível.

Antes de escrever código, você precisa: PRODUCT.md carregado, registro identificado e a referência correspondente carregada, e uma direção de design confirmada para esta tarefa (seja de `shape` ou fornecida pelo usuário). PRODUCT.md é contexto de projeto, não um brief específico da tarefa.

Trate qualquer direção visual aprovada (mock gerado ou referência declarada) como um contrato concreto para composição, hierarquia, densidade, atmosfera, motivos marcantes e movimentos visuais distintivos. Não deixe que mocks substituam estrutura, copy, acessibilidade ou design de estados. Mas se o resultado ao vivo carece dos ingredientes principais da direção aprovada, a implementação está errada.

### Gates: não comprima

Craft tem **múltiplos gates do usuário**, não apenas um. Quando o harness tem geração de imagens nativa (Codex via `image_gen`), a sequência de gates antes do código é:

1. **Brief de shape confirmado** (Passo 1)
2. **Perguntas de direção respondidas** (codex.md Passo A)
3. **Paleta confirmada** (codex.md Passo B)
4. **Uma direção de mock aprovada ou delegada** (codex.md Passo D)

Você deve parar em cada gate. **Confirmação do shape sozinha NÃO é luz verde para começar a codificar.** É a luz verde para iniciar o codex.md Passo A. Comprimir os gates 2 a 4 porque o brief de shape pareceu completo é o modo de falha dominante deste fluxo.

Quando o harness não tem geração de imagens nativa, os gates 2-4 colapsam no próprio brief, e a confirmação do shape avança diretamente para o código.

## Passo 0: Fundação do Projeto

Antes do shape, antes do código: descubra em que tipo de projeto você está trabalhando.

Olhe para o diretório de trabalho. Execute `ls`. Verifique:

- Um framework existente: `astro.config.mjs/ts`, `next.config.js/ts`, `nuxt.config.ts`, `svelte.config.js`, `vite.config.js/ts`, `package.json` com deps de framework, `Cargo.toml` + Leptos/Yew, `Gemfile` + Rails. **Se encontrado, use-o.** Não inicie uma build paralela, não introduza um segundo framework, não escreva em `dist/` ou `build/` diretamente. Qualquer pipeline que o projeto tenha, respeite-o.
- Uma biblioteca de componentes ou design system existente: `src/components/`, `app/components/`, um `tokens.css` / `theme.ts`, um `astro.config` `integrations`. Leia o que está lá antes de adicionar a ele.
- Um conjunto de ícones existente: `lucide-react`, `@phosphor-icons/react`, `@iconify/*`, sprites SVG feitos à mão em `assets/icons/`. **Use o que já está no projeto**; não introduza um segundo conjunto.

Se o diretório está vazio (greenfield), não escolha um framework silenciosamente. Pergunte ao usuário via ferramenta AskUserQuestion, com padrões sensatos enquadrados pelo brief:

```text
No que isso deve ser construído?
  - Astro (padrão para sites de marca liderados por conteúdo, landing pages, superfícies de marketing)
  - SvelteKit / Next.js / Nuxt (quando o brief implica uma superfície de app ou interatividade significativa)
  - index.html único (demo de uso único, protótipo, ou um experimento deliberadamente sem framework)
```

Padrão: Astro para briefs de marca, o framework existente do projeto para briefs de produto. Pergunte uma vez; não pergunte de novo no meio da tarefa.

## Passo 1: Molde o Design

Execute {{command_prefix}}impeccable shape, passando adiante qualquer descrição de funcionalidade que o usuário forneceu. Shape é **obrigatório** para craft; é o que produz uma direção confirmada.

Apresente a saída do shape e pare. Espere o usuário confirmar, substituir ou corrigir o curso antes de escrever código.

Se o usuário já forneceu um brief confirmado ou executou shape separadamente, use-o e pule este passo.

Quando o prompt original + PRODUCT.md já respondem escopo, conteúdo e direção visual sem ambiguidade real, a saída do shape pode ser **compacta** (3-5 bullets declarando o que você está construindo e a faixa visual, terminando com uma ou duas perguntas específicas ou "confirme ou substitua"). O brief estruturado completo de 10 seções é reservado para tarefas genuinamente ambíguas, multi-tela ou com muitos stakeholders. Não aumente um brief claro para parecer completo; igualmente, não pule a pausa para parecer eficiente.

Se o harness tem geração de imagens nativa (Codex), o "confirme ou substitua" de um shape compacto avança para o **Passo 3 e o fluxo codex.md**, não para o Passo 4. Formule a linha de encerramento de acordo: "Confirme ou substitua; assim que trancarmos a direção, vou fazer algumas perguntas de paleta e referência antes de gerar mocks." Isso impede o modelo de ler a confirmação do shape como luz verde para código.

## Passo 2: Carregue Referências

Com base na seção "Referências Recomendadas" do brief de design, consulte os arquivos de referência impecável relevantes. No mínimo, sempre consulte:

- [spatial-design.md](spatial-design.md) para layout e espaçamento
- [typography.md](typography.md) para hierarquia de tipos

Depois adicione referências com base nas necessidades do brief:
- Interações complexas ou formulários? Consulte [interaction-design.md](interaction-design.md)
- Animação ou transições? Consulte [motion-design.md](motion-design.md)
- Intenso em cores ou com temas? Consulte [color-and-contrast.md](color-and-contrast.md)
- Requisitos responsivos? Consulte [responsive-design.md](responsive-design.md)
- Rico em copy, rótulos ou erros? Consulte [ux-writing.md](ux-writing.md)

## Passo 3: Direção Visual e Assets (Controlado pelo Harness)

Se o harness tem **geração de imagens nativa** (atualmente Codex via `image_gen`), este passo é obrigatório. **Pare e carregue [codex.md](codex.md)**. Ele cobre geração de paleta, exploração de mocks, o loop de aprovação, inventário de fidelidade de mocks e corte de assets via o subagente `impeccable_asset_producer`. Siga os Passos A-F naquele arquivo, depois retorne aqui para o Passo 4.

Se o harness não tem geração de imagens nativa, **declare em uma linha que o passo de direção-visual-por-geração está sendo pulado porque o harness não tem geração de imagens nativa, depois prossiga**. O anúncio de uma linha é obrigatório; força uma decisão consciente em vez de deixar o passo evaporar silenciosamente. O brief é sua única referência visual. Implemente diretamente a partir dele, tratando quaisquer referências de âncora nomeadas e a "Direção de Design" do brief como o contrato.

Tenha ou não gerado mocks: não substitua imagens necessárias por cards genéricos, bullets, emoji, métricas falsas, painéis CSS decorativos ou copy de preenchimento. Briefs liderados por imagens (restaurantes, hotéis, revistas, fotografia, comunidades de hobby, comida, viagens, moda, produto) precisam de imagens reais ou obtidas de fontes na build, não cenário CSS.

## Passo 4: Construa com Qualidade de Produção

**Pré-condição.** Se o Passo 3 direcionou você ao codex.md (geração de imagens nativa disponível), os Passos A a D naquele arquivo devem estar completos antes de qualquer código: perguntas respondidas, paleta confirmada, mocks gerados, uma direção aprovada ou delegada. **Não mencione implementação, caminhos de arquivo ou planos de patch até que isso esteja feito.** Um brief de shape confirmado não é suficiente; o modelo que comprimiu esses gates é o modelo que já falhou neste fluxo.

Implemente a funcionalidade seguindo o brief de design. Construa em passagens para que estrutura, sistema visual, estados, movimento/mídia e comportamento responsivo cada um receba atenção deliberada. A lista abaixo é a definição de pronto, não inspiração.

### Barra de produção

- **Conteúdo real.** Sem copy de placeholder, imagens de placeholder, links mortos, controles falsos ou scaffold não utilizado no momento da apresentação.
- **Preserve os ingredientes principais do mock aprovado.** Objetos hero ausentes, imagens de mundo/produto, estrutura de seção, tratamento de CTA/nav ou motivos distintivos são defeitos bloqueadores a menos que o usuário tenha aceitado a mudança.
- **Semântica primeiro.** Headings reais, landmarks, rótulos, associações de formulário, semântica de botão/link, nomes acessíveis, anúncios de estado quando necessário.
- **Espaçamento e alinhamento deliberados.** Sem gaps padrão, margens arbitrárias, whitespace desbalanceado ou desalinhamento ótico acidental.
- **Tipografia intencional.** Estratégia de carregamento escolhida, hierarquia clara, medida legível, quebras de linha estáveis, sem overflow em nenhuma largura.
- **Cobertura de estados realista.** Default, hover, focus-visible, active, disabled, loading, error, success, empty, overflow, texto longo/curto, primeira execução.
- **Qualidade de interação finalizada.** Caminhos de teclado, alvos de toque, timing de feedback, comportamento de scroll, transições de estado, sem funcionalidade apenas com hover.
- **Conjunto de ícones coerente.** Use o conjunto estabelecido do projeto; caso contrário, escolha uma biblioteca ou use texto acessível. Não misture.
- **Respeite o pipeline de build.** Edite arquivos fonte e execute a build do projeto (`npm run build` ou equivalente). Não escreva em `build/` / `dist/` / `.next/` com `cat`, heredoc ou redirects Bash; isso pula hash de assets, otimização de imagens, code splitting e extração de CSS, e produz saída que o dev server não vai servir.
- **Verifique URLs de imagens antes de referenciá-las.** Use MCP de busca de imagens ou web-fetch quando disponível; IDs de fotos adivinhados são entregues como placeholders de imagem quebrada. Sem verificação, prefira menos imagens das quais você tem confiança.
- **Imagens e mídia otimizadas.** Dimensões corretas, alt text útil, lazy loading abaixo da dobra, formatos modernos quando prático, `srcset`/`picture` responsivo para raster, nenhum asset referenciado pelo projeto deixado fora do workspace.
- **Movimento premium.** Use blur atmosférico, filter, mask, shadow, reveal quando melhoram a experiência. Evite animação casual de propriedades de layout, limite efeitos caros, verifique suavidade no navegador, respeite movimento reduzido e evite coreografia que bloqueie a conclusão da tarefa.
- **Sustentável.** Padrões locais reutilizáveis, limites claros de componentes, convenções do projeto. Sem texto UI rasterizado ou gambirras únicas quando um padrão local existe.
- **Tecnicamente limpo.** Build de produção passa, sem erros de console, sem layout shift evitável, sem dependências desnecessárias, sem caminhos de assets quebrados.
- **Pergunte quando incerto.** Se uma descoberta muda materialmente o brief ou direção aprovada, pare e pergunte. Não adivinhe.

## Passo 5: Itere Visualmente

Olhe para o que você construiu como um designer faria. Seus olhos são o que o harness lhe dá: um navegador conectado, uma ferramenta de captura de tela, Playwright, ou perguntar ao usuário. Use-os para testes responsivos (mobile, tablet, desktop no mínimo) e validação visual geral.

Se sua ferramenta retorna um caminho de arquivo, leia o PNG de volta para a conversa. Uma captura de tela que você não leu não conta.

Para superfícies de marca de formato longo, inspecione seções principais individualmente. Thumbnails escondem defeitos de espaçamento, recorte e cascata.

Após a primeira passagem, escreva uma crítica honesta contra o brief, os ingredientes principais do mock aprovado (silhueta do hero, motivos, imagens, nav/CTA, densidade) e os NÃO's do impeccable. Corrija defeitos materiais e reinspecione. **Não invente defeitos para demonstrar iteração.** Um "primeira passagem limpa, enviando" confiante é melhor que uma correção falsa.

Verifique ativamente: comportamento responsivo (compõe, não encolhe), cada estado (vazio / erro / carregamento / borda), detalhes de craft (espaçamento, alinhamento, hierarquia, contraste, timing de movimento, foco), básicos de desempenho. A barra de saída: defensável em uma revisão de estúdio de alto nível.

Saída de detector ou QA é apenas evidência de defeito; nunca prova de que o trabalho está concluído.

## Passo 6: Apresente

Apresente o resultado ao usuário:
- Mostre a funcionalidade em seu estado primário
- Resuma os navegadores/viewports verificados e as correções mais importantes feitas após inspeção
- Percorra os estados principais (vazio, erro, responsivo)
- Explique decisões de design que conectam de volta ao brief de design e, quando usado, ao mock north-star escolhido. Inclua quaisquer desvios aceitos do mock; não esconda ingredientes do mock não implementados.
- Note quaisquer limitações restantes ou riscos de follow-up honestamente
- Pergunte: "O que está funcionando? O que não está?"
