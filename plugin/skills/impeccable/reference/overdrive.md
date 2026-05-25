Comece sua resposta com:

```
──────────── ⚡ OVERDRIVE ─────────────
》》》 Entrando em modo overdrive...
```

Empurre uma interface além dos limites convencionais. Não se trata apenas de efeitos visuais. Trata-se de usar todo o poder do navegador para fazer qualquer parte de uma interface parecer extraordinária: uma tabela que lidar com um milhão de linhas, um diálogo que se transforma a partir de seu gatilho, um formulário que valida em tempo real com feedback em streaming, uma transição de página que parece cinematográfica.

**EXTRA IMPORTANTE PARA ESTE COMANDO**: O contexto determina o que "extraordinário" significa. Um sistema de partículas em um portfólio criativo é impressionante. O mesmo sistema de partículas em uma página de configurações é constrangedor. Mas uma página de configurações com salvamentos otimistas instantâneos e transições de estado animadas? Isso também é extraordinário. Entenda a personalidade e os objetivos do projeto antes de decidir o que é apropriado.

### Proponha Antes de Construir

Este comando tem o maior potencial de falha. NÃO pule direto para a implementação. Você DEVE:

1. **Pense em 2-3 direções diferentes**: considere técnicas diferentes, níveis de ambição, e abordagens estéticas. Para cada direção, descreva brevemente como o resultado seria e se sentiria.
2. **{{ask_instruction}}** para apresentar essas direções e obter a escolha do usuário antes de escrever qualquer código. Explique trade-offs (suporte de navegador, custo de performance, complexidade).
3. Prossiga apenas com a direção que o usuário confirmar.

Pular este passo corre o risco de construir algo constrangedor que precise ser descartado.

### Itere com Automação de Navegador

Efeitos tecnicamente ambiciosos quase nunca funcionam na primeira tentativa. Você DEVE usar ativamente ferramentas de automação de navegador para visualizar seu trabalho, verificar visualmente o resultado, e iterar. Não assuma que o efeito parece certo, verifique. Espere múltiplas rodadas de refinamento. A lacuna entre "tecnicamente funciona" e "parece extraordinário" é fechada através de iteração visual, não apenas código.

---

## Avalie O Que "Extraordinário" Significa Aqui

O tipo certo de ambição técnica depende inteiramente do que você está trabalhando. Antes de escolher uma técnica, pergunte: **o que faria um usuário DESTA interface específica dizer "uau, que legal"?**

### Para superfícies visuais/marketing
Páginas, seções hero, landing pages, portfólios: o "uau" é frequentemente sensorial: uma revelação guiada por scroll, um background com shader, uma transição de página cinematográfica, arte generativa que responde ao cursor.

### Para UI funcional
Tabelas, formulários, diálogos, navegação: o "uau" está em como ela SE SENTE: um diálogo que se transforma a partir do botão que o acionou via View Transitions, uma tabela de dados que renderiza 100k linhas a 60fps via virtual scrolling, um formulário com validação em streaming que parece instantâneo, drag-and-drop com física de mola.

### Para UI crítica em performance
O "uau" é invisível mas sentido: uma busca que filtra 50k itens sem uma oscilação, um formulário complexo que nunca bloqueia a thread principal, um editor de imagens que processa em quase tempo real. A interface simplesmente nunca hesita.

### Para interfaces pesadas em dados
Gráficos e dashboards: o "uau" está na fluidez: renderização acelerada por GPU via Canvas/WebGL para conjuntos de dados massivos, transições animadas entre estados de dados, layouts de grafos force-directed que se acomodam naturalmente.

**O fio comum**: algo na implementação vai além do que os usuários esperam de uma interface web. A técnica serve à experiência, não o contrário.

## O Kit de Ferramentas

Organizado pelo que você está tentando alcançar, não pelo nome da tecnologia.

### Faça transições parecerem cinematográficas
- **View Transitions API** (mesmo documento: todos os navegadores; entre documentos: sem Firefox): morphing de elementos compartilhados entre estados. Um item de lista expandindo em uma página de detalhe. Um botão se transformando em um diálogo. Esta é a coisa mais próxima de animações FLIP nativas.
- **`@starting-style`** (todos os navegadores): anime elementos de `display: none` para visível apenas com CSS, incluindo keyframes de entrada
- **Física de mola**: movimento natural com massa, tensão, e amortecimento em vez de cubic-bezier. Bibliotecas: motion (anteriormente Framer Motion), GSAP, ou crie seu próprio solver de mola.

### Conecte animação à posição de scroll
- **Scroll-driven animations** (`animation-timeline: scroll()`): apenas CSS, sem JS. Parallax, barras de progresso, sequências de revelação todas guiadas pela posição de scroll. (Chrome/Edge/Safari; Firefox: apenas flag; sempre forneça fallback estático)

### Renderize além do CSS
- **WebGL** (todos os navegadores): efeitos de shader, pós-processamento, sistemas de partículas. Bibliotecas: Three.js, OGL (leve), regl. Use para efeitos que CSS não consegue expressar.
- **WebGPU** (Chrome/Edge; Safari parcial; Firefox: apenas flag): compute GPU de próxima geração. Mais poderoso que WebGL mas suporte de navegador limitado. Sempre faça fallback para WebGL2.
- **Canvas 2D / OffscreenCanvas**: renderização customizada, manipulação de pixels, ou mover renderização pesada inteiramente para fora da thread principal via Web Workers + OffscreenCanvas.
- **Cadeias de filtro SVG**: mapas de deslocamento, turbulência, morfologia para efeitos de distorção orgânicos. Animáveis via CSS.

### Faça dados parecerem vivos
- **Virtual scrolling**: renderize apenas as linhas visíveis para tabelas/listas com dezenas de milhares de itens. Sem biblioteca necessária para casos simples; TanStack Virtual para casos complexos.
- **Gráficos acelerados por GPU**: visualização de dados renderizada via Canvas ou WebGL para conjuntos de dados grandes demais para SVG/DOM. Bibliotecas: deck.gl, renderizadores customizados baseados em regl.
- **Transições animadas de dados**: morph entre estados de gráficos em vez de substituir. `transition()` do D3 ou View Transitions para gráficos baseados em DOM.

### Anime propriedades complexas
- **`@property`** (todos os navegadores): registre custom properties CSS com tipos, habilitando animação de gradientes, cores, e valores complexos que CSS normalmente não consegue interpolar.
- **Web Animations API** (todos os navegadores): animações dirigidas por JavaScript com a performance do CSS. Componíveis, canceláveis, reversíveis. A fundação para coreografia complexa.

### Empurre os limites de performance
- **Web Workers**: mova computação para fora da thread principal. Processamento pesado de dados, manipulação de imagens, indexação de busca: qualquer coisa que causaria jank.
- **OffscreenCanvas**: renderize em uma thread Worker. A thread principal fica livre enquanto visuais complexos renderizam em background.
- **WASM**: performance quase nativa para funcionalidades pesadas em computação. Processamento de imagens, simulações de física, codecs.

### Interaja com o dispositivo
- **Web Audio API**: áudio espacial, visualizações reativas a áudio, feedback sônico. Requer gesto do usuário para iniciar.
- **Device APIs**: orientação, luz ambiente, geolocalização. Use com moderação e sempre com permissão do usuário.

**NOTA**: Este comando é sobre melhorar como uma interface SE SENTE, não mudar o que um produto FAZ. Adicionar colaboração em tempo real, suporte offline, ou novas capacidades de backend são decisões de produto, não melhorias de UI. Foque em fazer funcionalidades existentes parecerem extraordinárias.

## Implemente com Disciplina

### Progressive enhancement é inegociável

Toda técnica deve degradar graciosamente. A experiência sem o aprimoramento ainda deve ser boa.

```css
@supports (animation-timeline: scroll()) {
  .hero { animation-timeline: scroll(); }
}
```

```javascript
if ('gpu' in navigator) { /* WebGPU */ }
else if (canvas.getContext('webgl2')) { /* WebGL2 fallback */ }
/* CSS-only fallback must still look good */
```

### Regras de performance

- Alveje 60fps. Se cair abaixo de 50, simplifique.
- Respeite `prefers-reduced-motion`, sempre. Forneça uma alternativa estática bonita.
- Inicialize pesadamente sob demanda (contextos WebGL, módulos WASM) apenas quando próximo ao viewport.
- Pause renderização fora da tela. Elimine o que não pode ver.
- Teste em dispositivos reais de faixa média, não apenas sua máquina de desenvolvimento.

### Polimento é a diferença

A lacuna entre "legal" e "extraordinário" está nos últimos 20% de refinamento: a curva de easing em uma animação de mola, o offset de timing em uma revelação escalonada, o movimento secundário sutil que faz uma transição parecer física. Não envie a primeira versão que funciona; envie a versão que parece inevitável.

**NUNCA**:
- Ignore `prefers-reduced-motion`. Isso é um requisito de acessibilidade, não uma sugestão
- Envie efeitos que causam jank em dispositivos de faixa média
- Use APIs de ponta sem fallback funcional
- Adicione som sem opt-in explícito do usuário
- Use ambição técnica para mascarar fundamentos de design fracos; corrija-os primeiro com outros comandos
- Sobreponha múltiplos momentos extraordinários competindo. Foco cria impacto, excesso cria ruído

## Verifique o Resultado

- **O teste do uau**: Mostre para alguém que não viu. Elas reagem?
- **O teste da remoção**: Tire. A experiência parece diminuída, ou ninguém nota?
- **O teste do dispositivo**: Rode em um celular, um tablet, um Chromebook. Ainda suave?
- **O teste de acessibilidade**: Ative reduced motion. Ainda bonito?
- **O teste de contexto**: Faz sentido para ESTA marca e público?

"Tecnicamente extraordinário" não é sobre usar a API mais nova. É sobre fazer uma interface fazer algo que os usuários não achavam que um site pudesse fazer.
