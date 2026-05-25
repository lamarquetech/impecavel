# Fluxo Teach

Coleta contexto de design para um projeto e escreve dois arquivos complementares na raiz do projeto:

- **PRODUCT.md** (estratégico): arquivo raiz do projeto para registro, usuários-alvo, propósito do produto, personalidade da marca, anti-referências, princípios de design estratégicos. Responde "quem/o quê/por quê".
- **DESIGN.md** (visual): arquivo raiz do projeto para tema visual, paleta de cores, tipografia, componentes, layout. Segue o [formato Google Stitch DESIGN.md](https://stitch.withgoogle.com/docs/design-md/format/). Responde "como fica".

Todos os outros comandos impecables leem esses arquivos antes de fazer qualquer trabalho.

## Passo 1: Carregar estado atual

Execute o loader compartilhado primeiro para saber o que já existe:

```bash
node {{scripts_path}}/load-context.mjs
```

A saída informa se PRODUCT.md e/ou DESIGN.md já existem. Se `migrated: true`, o legado `.impeccable.md` foi automaticamente renomeado para `PRODUCT.md`. Mencione isso ao usuário uma vez.

Árvore de decisão:
- **Nenhum arquivo existe (projeto vazio ou sem contexto ainda)**: execute os Passos 2-4 (escreva PRODUCT.md), depois decida sobre DESIGN.md com base em se há código para analisar.
- **PRODUCT.md existe, DESIGN.md ausente**: pule para o Passo 5 e ofereça executar `/impeccable document` para DESIGN.md.
- **PRODUCT.md existe mas não tem a seção `## Register` (legado)**: adicione-a. Infira uma hipótese do codebase (veja Passo 2), confirme com o usuário, escreva o campo.
- **Ambos existem**: {{ask_instruction}} Pergunte qual arquivo atualizar. Pule o que o usuário não quer alterado.
- **Apenas DESIGN.md existe (incomum)**: execute os Passos 2-4 para produzir PRODUCT.md.

Nunca sobrescreva silenciosamente um arquivo existente. Sempre confirme primeiro.

Se teach foi invocado como bloqueador de setup por outro comando, como `{{command_prefix}}impeccable craft landing page`, pause aquele comando aqui. Complete teach, re-execute o loader, então retome o comando original com o contexto recém-carregado. Para craft, retome em shape a seguir; teach cria contexto de projeto, mas não é substituto da entrevista de shape específica da tarefa e do brief de design confirmado.

## Passo 2: Explorar o codebase

Antes de fazer perguntas, escaneie minuciosamente o projeto para descobrir o que você puder:

- **README e docs**: Propósito do projeto, público-alvo, quaisquer objetivos declarados
- **Package.json / arquivos de configuração**: Tech stack, dependências, bibliotecas de design existentes
- **Componentes existentes**: Padrões de design atuais, espaçamento, tipografia em uso
- **Assets de marca**: Logos, favicons, valores de cor já definidos
- **Design tokens / variáveis CSS**: Paletas de cores existentes, font stacks, escalas de espaçamento
- **Quaisquer guias de estilo ou documentação de marca**

Também forme uma **hipótese de registro** a partir do que encontrar:

- Sinais de brand: `/`, `/about`, `/pricing`, `/blog/*`, `/docs/*`, hero sections, tipografia grande, seções scroll-driven, conteúdo com formato de landing page.
- Sinais de product: `/app/*`, `/dashboard`, `/settings`, `/(auth)`, formulários, tabelas de dados, navegação lateral/superior, componentes de app-shell.

O registro é uma hipótese neste ponto, não uma decisão; o Passo 3 a confirma.

Anote o que você aprendeu e o que permanece incerto. Esta exploração alimenta tanto PRODUCT.md quanto DESIGN.md.

## Passo 3: Fazer perguntas estratégicas (para PRODUCT.md)

{{ask_instruction}} Pergunte apenas sobre o que não pôde inferir do codebase.

### Modo entrevista, não modo confirmação

Se o repositório está vazio ou o brief do usuário é esparso, execute uma breve entrevista antes de propor PRODUCT.md. **NÃO** transforme uma solicitação de uma frase em um PRODUCT.md inferido completo e peça confirmação genérica.

- Use a ferramenta de perguntas estruturadas do harness quando ela existir. Caso contrário, pergunte diretamente no chat e pare.
- Faça **2-3 perguntas por rodada**, depois aguarde as respostas.
- Use respostas inferidas como hipóteses ou opções, não como fatos consumados.
- Complete pelo menos uma rodada real de resposta do usuário antes de redigir PRODUCT.md, a menos que cada resposta necessária seja diretamente descoberta na documentação do repositório.
- A Rodada 1 deve estabelecer registro, usuários/propósito e resultado desejado.
- A Rodada 2 deve estabelecer personalidade da marca ou referências, anti-referências e necessidades de acessibilidade.

### Entrevista mínima viável

Pergunte o suficiente para completar PRODUCT.md. No mínimo, cubra confirmação de registro, usuários e propósito, personalidade da marca, anti-referências e necessidades de acessibilidade, a menos que cada resposta seja diretamente descoberta no contexto do repositório. Após pelo menos uma rodada de entrevista, você pode propor respostas inferidas, mas o usuário deve confirmá-las antes que você escreva PRODUCT.md. Nunca sintetize PRODUCT.md apenas a partir do prompt da tarefa original.

### Registro (pergunte primeiro; molda tudo abaixo)

Toda tarefa de design é **brand** (marketing, landing, campanha, conteúdo de formato longo, portfólio: o design É o produto) ou **product** (UI de app, admin, dashboards, ferramentas: o design SERVE ao produto).

Se o Passo 2 produziu uma hipótese clara, lidere com ela: *"Pelo codebase, isso parece uma superfície de [brand / product]. Isso corresponde à sua intenção, ou devemos tratar diferentemente?"*

Se o sinal é genuinamente dividido (ex.: um produto com uma grande landing de marketing), {{ask_instruction}} Pergunte qual registro descreve a superfície **primária**. O registro pode ser sobrescrito por tarefa depois, mas PRODUCT.md carrega um padrão.

### Usuários e Propósito
- Quem usa isso? Qual é o contexto ao usar?
- Que tarefa estão tentando realizar?
- Para brand: que emoções a interface deve evocar? (confiança, deleite, calma, urgência)
- Para product: em que fluxo de trabalho estão? Qual é a tarefa primária em qualquer tela?

### Marca e Personalidade
- Como você descreveria a personalidade da marca em 3 palavras?
- Sites ou apps de referência que capturam a sensação certa? O que especificamente sobre eles?
  - Para brand, busque referências do mundo real no caminho certo (tech-minimal, editorial-magazine, consumer-warm, brutalist-grid, etc.), não adjetivos genéricos como "moderno".
  - Para product, busque referências de melhor-ferramenta-da-categoria (Linear, Figma, Notion, Raycast, Stripe).
- O que isso explicitamente NÃO deveria parecer? Alguma anti-referência?

### Acessibilidade e Inclusão
- Requisitos específicos de acessibilidade? (nível WCAG, necessidades conhecidas dos usuários)
- Considerações para movimento reduzido, daltonismo ou outras acomodações?

Pule perguntas cuja resposta já está clara. **NÃO pergunte sobre cores, fontes, raios ou estilo visual aqui.** Esses pertencem ao DESIGN.md, não ao PRODUCT.md.

## Passo 4: Escrever PRODUCT.md

Escreva PRODUCT.md apenas após o usuário ter confirmado as respostas estratégicas do Passo 3. Se uma resposta inferida é incerta ou não confirmada, pergunte antes de escrever.

Sintetize em um documento estratégico:

```markdown
# Product

## Register

product

## Users
[Quem são, seu contexto, a tarefa a ser realizada]

## Product Purpose
[O que este produto faz, por que existe, como é o sucesso]

## Brand Personality
[Voz, tom, personalidade em 3 palavras, objetivos emocionais]

## Anti-references
[O que isso NÃO deveria parecer. Sites ou padrões de mau exemplo específicos a evitar.]

## Design Principles
[3-5 princípios estratégicos derivados da conversa. Princípios como "pratique o que prega", "mostre, não conte", "confiança de especialista". NÃO regras visuais como "use OKLCH" ou "accent magenta".]

## Accessibility & Inclusion
[Nível WCAG, necessidades conhecidas dos usuários, considerações]
```

O registro é `brand` ou `product` como um valor isolado. Sem prosa, sem comentários.

Escreva em `PROJECT_ROOT/PRODUCT.md`. Se `.impeccable.md` existia, o loader já o renomeou; faça merge com aquele conteúdo em vez de começar do zero.

## Passo 5: Decidir sobre DESIGN.md

Ofereça `/impeccable document` de qualquer forma. Dois caminhos:

- **Código existe** (tokens CSS, componentes, um site rodando): "Posso gerar um DESIGN.md que captura seu sistema visual (cores, tipografia, componentes) para que variantes permaneçam on-brand. Quer fazer isso agora?"
- **Pré-implementação** (projeto vazio): "Posso semear um DESIGN.md inicial com cinco perguntas rápidas sobre estratégia de cor, direção tipográfica, energia de movimento e referências. Você pode re-executar quando houver código, para capturar os tokens reais. Quer fazer isso agora?"

Se o usuário concordar, delegue para `/impeccable document` (ele auto-detecta scan vs seed). Carregue sua referência e siga aquele fluxo.

Se o usuário preferir pular, mencione que pode executar `/impeccable document` a qualquer momento depois.

## Passo 6: Confirmar e finalizar

Resuma:
- Registro capturado (brand / product)
- O que foi escrito (PRODUCT.md, DESIGN.md, ou ambos)
- Os 3-5 princípios estratégicos de PRODUCT.md que guiarão trabalhos futuros
- Se DESIGN.md está pendente, lembre o usuário como gerá-lo depois

**Crítico: re-execute o loader para atualizar o contexto da sessão.** Após escrever PRODUCT.md, execute `node {{scripts_path}}/load-context.mjs` uma última vez e deixe sua saída JSON completa pousar na conversa. Isso garante que comandos subsequentes nesta sessão usem o PRODUCT.md recém-escrito, não uma versão anterior desatualizada.

Se teach foi invocado como bloqueador por outro comando impecable (ex.: o usuário executou `/impeccable polish` sem PRODUCT.md), retome aquela tarefa original agora com o contexto atualizado.

Opcionalmente {{ask_instruction}} Pergunte se gostariam de um breve resumo de PRODUCT.md anexado a {{config_file}} para referência mais fácil do agente. Se sim, anexe uma seção curta de ponteiro **Design Context** lá.
