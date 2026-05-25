---
tagline: "Ensine ao Impeccable para quem é seu produto, uma vez por projeto."
---

<div class="docs-viz-hero">
  <div class="docs-viz-file">
    <div class="docs-viz-file-header">
      <span class="docs-viz-file-name">PRODUCT.md</span>
      <span class="docs-viz-file-status">Carregado em cada comando</span>
    </div>
    <div class="docs-viz-file-body">
      <div class="docs-viz-file-row">
        <span class="docs-viz-file-k">Register</span>
        <span class="docs-viz-file-v">Product. Design serve à tarefa.</span>
      </div>
      <div class="docs-viz-file-row">
        <span class="docs-viz-file-k">Users</span>
        <span class="docs-viz-file-v">SREs em plantão, lendo rápido, frequentemente no escuro.</span>
      </div>
      <div class="docs-viz-file-row">
        <span class="docs-viz-file-k">Brand voice</span>
        <span class="docs-viz-file-v">Calmo, clínico, sem hype.</span>
      </div>
      <div class="docs-viz-file-row">
        <span class="docs-viz-file-k">Anti-references</span>
        <span class="docs-viz-file-v">Gradientes roxos. Glassmorphism. "Boost your productivity."</span>
      </div>
    </div>
    <div class="docs-viz-file-footer">Cada comando lê isto antes de escrever uma linha de código.</div>
  </div>
  <p class="docs-viz-caption">Um PRODUCT.md finalizado. Apenas estratégia: quem, o quê, por quê. Sem cores, sem fontes, sem valores em pixels, esses ficam no DESIGN.md.</p>
</div>

## Quando usar

Execute `/impeccable teach` uma vez no início de um projeto. É a rampa de entrada. Sem ele, todo outro comando vai produzir design tecnicamente competente mas com tom genérico: voz SaaS padrão, fonts safe-default, a paleta de cores da IA. Com ele, todo comando lê suas respostas antes de gerar.

Use quando:

- **Você acabou de instalar o Impeccable em um novo projeto.** Primeira coisa a executar. Outros comandos vão te encaminhar para cá se você pular.
- **A direção de marca do projeto mudou.** Novo posicionamento, novo público, nova voz. Re-execute `teach` e o contexto atualizado flui por cada comando.
- **Outro comando disse "no design context found"** e parou. Esse é o sinal: execute teach, depois retome.

## Como funciona

Teach escreve dois arquivos complementares na raiz do projeto:

- **`PRODUCT.md`** é o arquivo estratégico. Register (marca ou produto), usuários-alvo, propósito do produto, personalidade da marca, anti-referências, princípios de design, necessidades de acessibilidade. Responde "quem, o quê, por quê".
- **`DESIGN.md`** é o arquivo visual. Cores, tipografia, elevação, componentes, do's e don'ts. Responde "como parece". Escrito pelo comando delegado `/impeccable document`, que teach invoca no final.

O fluxo escaneia o codebase primeiro (README, package.json, componentes, tokens, brand assets) e forma uma **hipótese de register**: brand (landing, marketing, portfólio, onde o design É o produto) ou product (app UI, dashboards, ferramentas, onde o design SERVE ao produto). Register é a primeira pergunta, porque molda cada resposta subsequente: defaults de tipografia, energia de motion, estratégia de cor, o conjunto de referências que comandos como `/impeccable typeset` utilizam. Após o register, teach pergunta apenas o que não pôde inferir: usuários, personalidade em três palavras reais, referências e anti-referências, requisitos de acessibilidade.

PRODUCT.md é apenas estratégico. Sem cores, sem fontes, sem valores em pixels. Esses ficam no DESIGN.md. Manter os dois arquivos separados é deliberado: a estratégia pode permanecer estável enquanto o sistema visual evolui.

## Experimente

```
/impeccable teach
```

Espere uma entrevista de 5 a 8 minutos. A primeira pergunta geralmente é sobre register; o resto é curto. Teach vai citar de volta o que inferiu do seu código ("pelas rotas, isso parece uma superfície de produto, correto?") para que você esteja confirmando, não começando do zero.

No final, teach oferece executar `/impeccable document` para você. Diga sim a menos que tenha um motivo específico para esperar. Um DESIGN.md real é o que mantém variantes, polimentos e audits on-brand.

## Armadilhas

- **Pular para "testar um comando rapidamente".** Todo outro comando vai te entrevistar no meio da execução. Executar teach primeiro é mais rápido, não mais lento.
- **Dar respostas genéricas.** "Moderno e limpo" não é útil. "Acolhedor, mecânico, opinativo" é. Seja específico. Esteja disposto a discordar dos defaults seguros.
- **Tratar PRODUCT.md como imutável.** O arquivo é seu. Se teach colocou algo que não está totalmente certo, edite. Cada comando lê o arquivo atual.
- **Listar apenas adjetivos para referências.** Marcas, produtos, objetos impressos: nomeados, não descritos. "Páginas de espécime do Klim Type Foundry", não "técnico e limpo". Anti-referências devem ser igualmente específicas.
