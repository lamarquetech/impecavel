# Registro de marca

Quando o design É o produto: sites de marca, landing pages, superfícies de marketing, páginas de campanha, portfólios, conteúdo de formato longo, páginas sobre. A entrega é o design em si; a impressão do visitante é o que está sendo criado.

O registro abrange todos os gêneros. Uma marca de tecnologia (Stripe, Linear, Vercel). Uma marca de luxo (um hotel, uma grife). Um produto de consumo (um restaurante, um site de viagens, uma página de embalagem de CPG). Um estúdio criativo, um portfólio de agência, a página de um álbum de uma banda. Todos compartilham a postura (*comunicar, não transacionar*) e divergem radicalmente na estética. Não os colapse em uma única aparência.

## O teste de brand slop

Se alguém pudesse olhar para isso e dizer "IA fez isso" sem hesitação, falhou. A barra é a distintividade; um visitante deveria perguntar "como isso foi feito?", não "qual IA fez isso?"

Marca não é um registro neutro. Landing pages geradas por IA inundaram a internet, e a média já não é encontrável. Restrição sem intenção agora soa como medíocre, não refinado. Superfícies de marca precisam de um ponto de vista, um público específico, uma disposição para arriscar o estranhamento. Vá fundo ou vá embora.

**O segundo teste de slop: faixa estética.** Antes de se comprometer com movimentos, nomeie a referência. Uma página de espécime estilo Klim é uma faixa; Stripe-minimalista é outra; acid-maximalismo da Liquid Death é outra. Não derive para estéticas de revista editorial em um brief que não é editorial. Uma marca de trilhas com drop caps em Cormorant italic tem o registro errado dentro do registro.

Depois o teste inverso: em uma frase, descreva o que você está prestes a construir da forma como um concorrente descreveria o dele. Se essa frase serve para a landing page modal da categoria, recomece.

## Tipografia

### Procedimento de seleção de fontes

Todo projeto. Nunca pule.

1. Leia o brief. Escreva três palavras concretas de voz da marca. Não "moderno" ou "elegante," mas "quente e mecânico e opinativo" ou "calmo e clínico e cuidadoso." Palavras de objetos físicos.
2. Liste as três fontes que você alcançaria por reflexo. Se alguma aparecer na lista de reflexo-rejeição abaixo, rejeite-a; elas são padrões de dados de treinamento e criam monocultura.
3. Navegue em um catálogo real (Google Fonts, Pangram Pangram, Future Fonts, Adobe Fonts, ABC Dinamo, Klim, Velvetyne) com as três palavras em mente. Encontre a fonte para a marca como um *objeto físico*: uma legenda de museu, um manual de terminal dos anos 1970, uma etiqueta de tecido, um livro infantil em papel jornal barato, um pôster de concerto, um recibo de um diner do meado do século. Rejeite a primeira coisa que "parece designy."
4. Verificação cruzada. "Elegante" não é necessariamente serif. "Técnico" não é necessariamente sans. "Quente" não é Fraunces. Se a escolha final se alinha com o reflexo original, comece de novo.

### Lista de reflexo-rejeição

Padrões de dados de treinamento. Lista de banimento. Olhe além:

Fraunces · Newsreader · Lora · Crimson · Crimson Pro · Crimson Text · Playfair Display · Cormorant · Cormorant Garamond · Syne · IBM Plex Mono · IBM Plex Sans · IBM Plex Serif · Space Mono · Space Grotesk · Inter · DM Sans · DM Serif Display · DM Serif Text · Outfit · Plus Jakarta Sans · Instrument Sans · Instrument Serif

### Faixas estéticas de reflexo-rejeição

Paralela à lista de fontes. Famílias estéticas atualmente saturadas que inundaram superfícies de marca. Se um brief pousa em uma dessas faixas sem uma razão de registro que *exija* isso (uma revista literal, um terminal literal, um sistema de sinalização industrial literal), é o reflexo de treinamento de segunda ordem: a armadilha um nível mais profundo do que escolher uma fonte Fraunces. Olhe além.

- **Editorial-tipográfico.** Serif de display (frequentemente italic) + rótulos mono pequenos + separadores com linhas + restrição monocromática. Influência Klim, afetação de capa de revista. Em 2026, toda marca adjacente à Stripe e à Notion pousou aqui. A impressão digital: três colunas separadas por linhas, um título em Fraunces / Recoleta / Newsreader italic, metadados em minúsculas com tracking espaçado, sem imagens.

(Mais entradas pousam aqui no mesmo ritmo em que a lista de fontes é atualizada. Brutalista-utilitário e acid-maximalismo podem se juntar quando saturarem. Remover entradas quando caírem abaixo da saturação também é aceitável.)

As listas de reflexo-rejeição se aplicam a **novas escolhas de design**. Quando a marca existente já se comprometeu com uma fonte ou faixa como parte de sua identidade, a preservação da identidade vence; variantes em uma superfície existente não questionam o que já está em produção. As listas de reflexo-rejeição são para decisões de greenfield e para variantes em modo de partida em [live.md](live.md).

### Combinacao e voz

Distintivo + refinado é o objetivo. A forma específica depende da marca:

- **Editorial / formato longo / luxo**: serif de display + corpo sans (um formato de revista).
- **Tech / ferramentas de dev / fintech**: uma sans comprometida, geralmente; tracking personalizado e justo, forte contraste de peso dentro de uma única família.
- **Consumo / comida / viagens**: combinações mais quentes, frequentemente uma sans humanista mais uma script ou serif de display.
- **Estúdios criativos / agências**: quebra de regras bem-vinda. Apenas mono, ou apenas display, ou tipo desenhado sob medida como voz.

Duas famílias no mínimo é a regra *apenas* quando a voz precisa. Uma única família bem escolhida com contraste comprometido de peso/tamanho é mais forte que um par tímido de display+corpo.

Varie entre projetos. Se o último brief era uma landing page com serif de display, este não é.

### Escala

Escala modular, `clamp()` fluido para títulos, razão ≥1.25 entre degraus. Escalas planas (1.1× de diferença) soam como sem compromisso.

Texto claro em fundos escuros: adicione 0.05–0.1 ao line-height. Tipo claro parece ter peso menor e precisa de mais espaço para respirar.

## Cor

Superfícies de marca têm permissão para estratégias Comprometida, Paleta completa e Encharcada. Use-as. Uma única cor saturada espalhada por um hero não é excesso; é voz. Uma landing page em bege e ardósia suave ignora o registro.

- Nomeie uma referência real antes de escolher uma estratégia. "Klim Type Foundry laranja #ff4500 encharcada", "Stripe roxo-sobre-branco restrição", "Liquid Death verde-ácido paleta completa", "Mailchimp amarelo paleta completa", "Condé Nast Traveler azul-marinho suave restrição", "Vercel preto puro monocromático". Ambição sem nome vira bege.
- Paleta É voz. Uma marca calma e uma marca inquieta não devem compartilhar mecânicas de paleta.
- Quando a estratégia é Comprometida ou Encharcada, a cor carrega a marca. Não se proteja com neutros nas bordas. Comprometa-se.
- Não convirja entre projetos. Se a última superfície de marca era contida-em-creme, esta não é.
- Quando uma paleta de símbolo cultural é o atrativo óbvio, vá além. Deixe a leitura cultural vir da tipografia, imagens e copy, não da paleta.

## Layout

- Composições assimétricas são uma opção. Quebre o grid intencionalmente para ênfase.
- Espaçamento fluido com `clamp()` que respira em viewports maiores. Varie para ritmo: separações generosas, agrupamentos justos.
- Alternativa: um grid estrito e visível como voz (estéticas brutalistas / suíças / tech-spec). Tanto assimétrico quanto rigorosamente gradeado pode ser "desenhado"; o modo de falha é dividir a diferença em uma pilha centrada genérica.
- Não padronize o centralização de tudo. Alinhado à esquerda com layouts assimétricos parece mais desenhado; um grid estrito soa como estrutura confiante. Um hero em pilha centralizada com cartões de ícone-título-subtítulo soa como template.
- Quando cartões SÃO a affordance certa, use `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` para responsividade sem breakpoint.

## Imagens

Superfícies de marca dependem de imagens. Um restaurante, hotel, revista ou landing page de produto sem nenhuma imagem soa como incompleto, não como contido. Um retângulo de cor sólida onde uma imagem hero deveria estar é pior que uma foto stock representativa.

**Quando o brief implica imagens (restaurantes, hotéis, revistas, fotografia, comunidades de hobby, comida, viagens, moda, produto), você deve entregar imagens.** Zero imagens é um bug, não uma escolha de design. "Restrição" não é desculpa. Se o comp aprovado ou brief é liderado por imagens, entregue assets reais do projeto, assets raster gerados, ou uma cena canvas/SVG/WebGL crível. Não substitua imagens fotográficas, arquitetônicas, de produto ou de lugar por painéis CSS genéricos, diagramas decorativos, cartões, bullets ou copy.

- **Para trabalhos de greenfield sem assets locais, use imagens stock.** Unsplash é o padrão. O formato da URL é `https://images.unsplash.com/photo-{id}?auto=format&fit=crop&w=1600&q=80`. **Verifique as URLs antes de referenciá-las.** Se você tem um MCP de busca de imagens, ferramenta de web-fetch ou acesso a navegador, use-o para encontrar IDs de fotos reais e confirmar que elas resolvem. IDs adivinhados (mesmo os que parecem reais) frequentemente dão 404 e são entregues como placeholders de imagem quebrada. Sem um caminho de verificação, escolha menos fotos das quais você tem confiança de que existem em vez de mais que você adivinhou; nunca substitua por placeholders de `<div>` coloridos.
- **Busque pelo objeto físico da marca**, não pela categoria genérica: "massa caseira em uma mesa de madeira arranhada" é melhor que "comida italiana"; "ciprestes acima de uma fachada de hotel em calcário ao anoitecer" é melhor que "hotel de luxo".
- **Uma foto decisiva é melhor que cinco medíocres.** Imagens hero devem se comprometer com um clima; preencher com mais stock não salva uma hero indecisa.
- **Alt text é parte da voz.** "Fettuccine costeiro, cortado à mão, servido no terraço" é melhor que "prato de massa".

"Imagens" aqui é mais amplo que fotografia stock: capturas de tela de produto, visualizações de dados personalizadas, SVG gerado, e cenas canvas/WebGL são todas imagens. Páginas apenas com texto onde a tipografia sozinha carrega todo o peso visual são o modo de falha.

## Movimento

- Uma carga de página bem orquestrada com revelações escalonadas é melhor que micro-interações espalhadas, quando a marca convida. Marcas tech-minimalistas frequentemente pulam animação de entrada inteiramente; a restrição é a voz.
- Para seções que colapsam/expandem, transitione `grid-template-rows` em vez de `height`.

## Banimentos de marca (além dos banimentos absolutos compartilhados)

- Monospace como atalho preguiçoso para "técnico / desenvolvedor." Se a marca não é técnica, mono soa como fantasia.
- Ícones grandes com cantos arredondados acima de cada título. Grita template.
- Páginas de família única que escolheram a família por reflexo, não por voz. (Uma família única escolhida deliberadamente é aceitável.)
- Copy de corpo em caixa alta. Reserve caixa alta para rótulos curtos e títulos.
- Paletas tímidas e layouts medianos. Seguro = invisível.
- Zero imagens em um brief que implica imagens (restaurante, hotel, comida, viagens, moda, fotografia, hobby). Blocos coloridos onde uma foto hero pertence.
- Padronizar estéticas de revista editorial (serif de display + italic + drop caps + grid de jornal) em briefs que não têm formato de revista. Editorial é UMA faixa estética, não a estética de marca padrão.
- Rótulos tiny uppercase com tracking repetidos acima de cada título de seção. Um kicker forte e único pode ser voz; repeti-lo como gramática de seção é scaffolding de IA a menos que seja um sistema de marca deliberado e nomeado.

## Permissões de marca

Marca pode custear coisas que produto não pode. Aproveite-as.

- Movimento ambicioso na primeira carga. Revelações, transições acionadas por scroll, coreografia tipográfica.
- Viewports de propósito único. Uma ideia dominante por dobra, scroll longo, ritmo deliberado.
- Risco tipográfico. Tipo de display enorme, cortes italic inesperados, casos mistos, manchetes desenhadas à mão, uma única palavra oversized como hero.
- Estratégias de cor inesperadas. Paleta É voz; uma marca calma e uma marca inquieta não devem compartilhar mecânicas de paleta.
- Direção de arte por seção. Seções diferentes podem ter mundos visuais diferentes se a narrativa exigir. Consistência de voz vence consistência de tratamento.
