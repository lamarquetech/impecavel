# Codex: Direção Visual e Produção de Assets

Este arquivo é carregado por `{{command_prefix}}impeccable craft` quando o harness possui geração nativa de imagens (atualmente Codex via `image_gen`). Outros harnesses o ignoram. Ele cobre as duas etapas de craft que dependem de geração real de imagens: definir a direção visual e produzir os assets raster que a implementação vai compor.

Leia isto *antes* de gerar qualquer imagem. A ordem importa, e as pausas para o usuário em cada etapa são o que impedem as imagens geradas de se afastarem do brief.

### Quatro pontos de parada antes do código

As etapas de A a D cada uma termina com o usuário. Não avance além de nenhuma delas por sua própria avaliação da situação.

1. **PARE após as perguntas da Etapa A.** Espere pelas respostas.
2. **PARE após a geração da paleta na Etapa B.** Espere por "confirmar paleta."
3. **PARE após os mocks da Etapa C.** Espere pela aprovação da direção ou delegação.
4. **Apenas após a Etapa D aprovar uma direção** você retorna ao craft.md Etapa 4 e escreve código.

A aprovação prévia do shape **não** satisfaz nenhum destes. O "confirmar ou sobrescrever" do shape avança você para a Etapa A; não é substituto para ela.

## Etapa A: Explore Direções com o Usuário

Antes de gerar qualquer coisa, conduza uma breve conversa sobre direção fundamentada no brief do shape.

**A Etapa A é obrigatória mesmo quando o shape acabou de produzir um brief confirmado.** As perguntas do shape e as perguntas da Etapa A cobrem terrenos diferentes: o shape fixa propósito, conteúdo e escopo; a Etapa A fixa paleta, atmosfera e referências visuais nomeadas para os comps que você vai gerar. A única vez que você pode pular a Etapa A é quando o usuário já respondeu a estas mesmas perguntas de paleta/atmosfera/referência na mesma sessão.

Faça **2-3 perguntas direcionadas** sobre faixa visual, estratégia de cor, atmosfera e referências âncora nomeadas. Não enumere menus genéricos; vincule cada pergunta às respostas do brief do shape. Exemplos de perguntas fundamentadas no shape:

- "O brief diz 'contenção editorial, adjacente a Klim.' Estamos mais próximos de uma página de espécime sóbria ou de uma sensação de spread de revista com imagem hero?"
- "A estratégia de paleta do shape era 'Comprometida.' Quer com base quente (oxblood profundo + creme) ou base fria (ardósia + branco papel)?"

**PARE e espere pelas respostas.** Estas fixam a paleta antes que qualquer pixel seja gerado. Não prossiga para a Etapa B até que o usuário tenha respondido.

## Etapa B: Gere a Paleta da Marca Primeiro

Gere **um** artefato de paleta antes de qualquer mock. Esta é uma imagem pequena e focada: pareamento tipográfico no fundo escolhido, amostras de cor primária + acento, um ornamento ou motivo signature. Imagem única, passagem única.

Por que paleta primeiro: mocks gerados contra uma sensação de cor vaga produzem ruído que afoga as decisões estruturais. Uma paleta confirmada é o primeiro contrato concreto para tudo que vem a seguir.

Mostre a paleta ao usuário. Faça uma pergunta: "Esta é a paleta que estou travando para os mocks. Confirme, ou aponte o que deve mudar?"

**PARE e espere pela confirmação.** Não gere mocks contra uma paleta não confirmada. "Provavelmente bom o suficiente" é a decisão errada aqui; a paleta é o contrato para tudo que vem a seguir.

## Etapa C: Gere 1-3 Mocks Visuais Contra a Paleta

Uma vez que a paleta esteja confirmada, gere **1 a 3** comps north-star de alta fidelidade. Cada mock deve usar a paleta e tipografia confirmadas. Os mocks diferem na direção *estrutural* (hierarquia, topologia, densidade, composição), não em cor ou motivo.

- Trabalho de brand: empurre identidade visual, composição, clima e motivos signature.
- Trabalho de produto: empurre hierarquia, topologia, densidade, tom, fundamentado em estrutura de produto realista.
- Landing pages e superfícies de marca de formato longo: mostre o suficiente da segunda dobra para estabelecer o sistema além do hero.

Use a ferramenta `image_gen` diretamente (ou via a skill imagegen quando disponível). Não peça ao usuário para instalar nada.

## Etapa D: Loop de Aprovação

Mostre os comps. Pergunte o que segue adiante. Itere até que **uma direção seja aprovada** ou o usuário delegue explicitamente.

**PARE e espere pela aprovação ou pela delegação.** Não comece a Etapa E nem retorne ao craft.md Etapa 4 até que uma única direção seja nomeada. Se o usuário delegar, escolha a direção mais forte e explique-a a partir do brief, não do gosto pessoal.

Antes de passar para assets, resuma o que levar para o código e o que *não* deve ser literalizado a partir do mock. Esta é a transição entre exploração visual e implementação semântica.

## Etapa E: Inventário de Fidelidade do Mock

Faça o inventário dos principais ingredientes visíveis do mock aprovado. Para cada um, decida a implementação: HTML/CSS/SVG semântico, raster gerado, raster de fonte externa, biblioteca de ícones, canvas/WebGL, ou omissão aceita.

Ingredientes comuns para inventariar:

- Silhueta hero e composição dominante
- Motivos signature (planetas, dispositivos, retratos, gráficos, linhas de rota, insets, badges, etc.)
- Tratamento da navegação e CTA primário
- Sequência de seções, especialmente a segunda dobra
- Conteúdo nativo de imagem do qual o conceito depende
- Tipografia, densidade, tratamento de cor/material, indicações de movimento

Trate o mock como uma estrela-guia, não como um screenshot para rastrear. Não rasterize texto de UI principal. Mas se o resultado ao vivo carecer dos principais ingredientes do mock, a implementação está errada.

Se um mock fotográfico, arquitetônico, de produto ou baseado em lugar se torna cenário genérico de CSS, diagramas decorativos, bullets ou copy, pare e corrija. Isso é uma implementação quebrada, não uma interpretação inofensiva.

Não substitua uma composição hero ou driver visual diferente após a aprovação sem o aval do usuário.

## Etapa F: Corte de Assets via o Asset Producer

Ingredientes raster identificados na Etapa E precisam de assets de produção limpos. Use o subagente `impeccable_asset_producer` incluído em vez de produzir inline.

Invoque-o como um subagente com escopo. Se você não tem permissão explícita para usar agents, pare e pergunte:

```text
A produção de assets funcionará melhor como um job de subagente com escopo. Devo invocar o subagente Impeccable asset producer para esta etapa?
```

Passe ao agente:

- Caminho do mock aprovado ou referência de screenshot
- Caminhos de corte ou uma contact sheet com IDs de corte
- Diretório de saída
- Dimensões necessárias, formato, necessidades de transparência
- Lista de exclusão
- Notas sobre o que deve permanecer como HTML/CSS/SVG semântico em vez de raster

Anexe a capacidade de geração de imagem ao agente invocado quando o harness suportar. **Não** carregue material de referência de geração de imagem na thread pai.

Produção de assets inline é permitida apenas se o usuário recusar subagentes, o harness não puder invocar o agente autorizado, ou o usuário pedir explicitamente pelo modo single-thread.

Prefira HTML/CSS/SVG/canvas quando puderem reproduzir crivelmente um ingrediente; recorra a imagens reais, geradas ou de stock quando o mock ou o assunto exigir conteúdo visual de verdade.

## Após Este Arquivo

Uma vez que as Etapas A a F estejam completas, retorne ao `craft.md` Etapa 5 (Construa com Qualidade de Produção). A implementação é construída contra a paleta confirmada, o mock aprovado e os assets que o producer escreveu.
