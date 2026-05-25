---
tagline: "Gere um DESIGN.md compatível com a spec que captura seu sistema visual para que cada AI agent permaneça on-brand."
---

<div class="docs-viz-hero">
  <div class="docs-viz-file">
    <div class="docs-viz-file-header">
      <span class="docs-viz-file-name">DESIGN.md</span>
      <span class="docs-viz-file-status">Formato Google Stitch</span>
    </div>
    <div class="docs-viz-designmd-section">
      <div class="docs-viz-designmd-head">
        <span class="docs-viz-designmd-num">01</span>
        <span class="docs-viz-designmd-title">Overview</span>
      </div>
      <p class="docs-viz-designmd-note">Creative North Star: <em>"O Santuário Editorial."</em> Tipo quieto, ar generoso, um acento comprometido.</p>
    </div>
    <div class="docs-viz-designmd-section">
      <div class="docs-viz-designmd-head">
        <span class="docs-viz-designmd-num">02</span>
        <span class="docs-viz-designmd-title">Colors</span>
      </div>
      <div class="docs-viz-designmd-swatches" aria-hidden="true">
        <span class="docs-viz-designmd-swatch" style="background:#1a1a1a"></span>
        <span class="docs-viz-designmd-swatch" style="background:#f5f3ef"></span>
        <span class="docs-viz-designmd-swatch" style="background:oklch(60% 0.22 30)"></span>
        <span class="docs-viz-designmd-swatch" style="background:oklch(90% 0.02 30)"></span>
      </div>
    </div>
    <div class="docs-viz-designmd-section">
      <div class="docs-viz-designmd-head">
        <span class="docs-viz-designmd-num">03</span>
        <span class="docs-viz-designmd-title">Typography</span>
      </div>
      <div class="docs-viz-designmd-type">
        <span class="docs-viz-designmd-type-display">Aa</span>
        <span class="docs-viz-designmd-type-body">Cormorant Garamond &middot; Instrument Sans</span>
      </div>
    </div>
    <div class="docs-viz-designmd-section">
      <div class="docs-viz-designmd-head">
        <span class="docs-viz-designmd-num">04</span>
        <span class="docs-viz-designmd-title">Elevation</span>
      </div>
      <p class="docs-viz-designmd-note">Flat por padrão. Sombras aparecem apenas como resposta a estado.</p>
    </div>
    <div class="docs-viz-designmd-section">
      <div class="docs-viz-designmd-head">
        <span class="docs-viz-designmd-num">05</span>
        <span class="docs-viz-designmd-title">Components</span>
      </div>
      <div class="docs-viz-designmd-comps" aria-hidden="true">
        <span class="docs-viz-designmd-btn">Subscribe</span>
        <span class="docs-viz-designmd-chip">filter</span>
        <span class="docs-viz-designmd-card">card</span>
      </div>
    </div>
    <div class="docs-viz-designmd-section">
      <div class="docs-viz-designmd-head">
        <span class="docs-viz-designmd-num">06</span>
        <span class="docs-viz-designmd-title">Do's and Don'ts</span>
      </div>
      <div class="docs-viz-designmd-rules">
        <span class="docs-viz-designmd-do">Tint neutros em direção ao hue do acento.</span>
        <span class="docs-viz-designmd-dont">Texto com gradiente para ênfase.</span>
      </div>
    </div>
  </div>
  <p class="docs-viz-caption">As seis seções são fixas, em uma ordem fixa, com nomes fixos. Junto, <code>DESIGN.json</code> é fornecido como sidecar legível por máquina para o painel de design do Live Mode.</p>
</div>

## Quando usar

Execute `/impeccable document` quando já tiver sistema visual suficiente para documentar: cores, tipografia, pelo menos um botão e um card. O comando escaneia seu codebase, extrai os tokens e padrões de componentes que encontra, e escreve um `DESIGN.md` na raiz do projeto que segue o [formato Google Stitch DESIGN.md](https://stitch.withgoogle.com/docs/design-md/format/), seis seções em ordem fixa, interoperável com toda outra ferramenta DESIGN.md-aware.

Use quando:

- **Você acabou de executar `/impeccable teach`** e `PRODUCT.md` agora existe. Document é o arquivo visual correspondente.
- **Um comando te encaminhou para cá.** Live, craft e polish leem DESIGN.md. Se está faltando, a skill sugere executar document primeiro.
- **O design derivou** de um DESIGN.md mais antigo e o arquivo já não descreve o sistema em produção.
- **Antes de um grande redesign**, para capturar o estado atual como referência para a próxima direção.

Para projetos sem código ainda (execução de `teach` recente, nada construído), há um modo seed: `/impeccable document --seed` faz cinco perguntas estratégicas rápidas (estratégia de cor, direção de tipo, energia de motion, referências, anti-referências) e escreve um scaffold. Re-execute em modo scan assim que houver código.

## Como funciona

A passagem de scan encontra assets de design em ordem de prioridade: CSS custom properties, configuração do Tailwind, temas CSS-in-JS, arquivos de design tokens, código-fonte de componentes, a stylesheet global, e finalmente estilos computados do output renderizado se um navegador estiver disponível. Ele auto-extrai tudo que pode, e então faz uma pergunta agrupada para as partes que precisam de input criativo: a **Creative North Star** (uma única metáfora nomeada para o sistema inteiro, como "O Santuário Editorial"), nomes descritivos de cores, a filosofia de elevação e o caráter dos componentes.

A saída é um DESIGN.md com exatamente seis seções: Overview, Colors, Typography, Elevation, Components, Do's and Don'ts. Os cabeçalhos são fixos caractere por caractere para que o arquivo seja parseável por outras ferramentas. Junto, `DESIGN.json` é escrito como sidecar legível por máquina. Esse sidecar é o que o painel de design do live-mode usa para renderizar os tiles reais de botão, input, nav e card *deste projeto* em vez de uma aproximação genérica.

Todo outro comando lê DESIGN.md na invocação. Variantes, polimentos, audits e novas funcionalidades herdam o sistema visual sem precisar ser instruídos.

## Experimente

```
/impeccable document
```

Em um projeto com tokens já definidos, isso leva cerca de dois minutos: o scan encontra sua paleta e pilha de tipos, você escolhe uma North Star entre 2 ou 3 opções, confirma nomes descritivos de cores ("Deep Muted Teal-Navy", não "blue-800"), e o arquivo pousa na raiz do projeto.

Em um projeto novo:

```
/impeccable document --seed
```

Cinco perguntas, cerca de cinco minutos. O arquivo é um scaffold, marcado com um comentário `<!-- SEED -->` para ser honesto sobre o que é. Re-execute sem a flag assim que tiver implementado os tokens.

## Armadilhas

- **Executar muito cedo.** Em um projeto sem tokens implementados, o modo seed é o correto. Não fabrique uma spec completa que o código não sustenta. Um DESIGN.md falso é pior que nenhum DESIGN.md.
- **Tratar DESIGN.md como documentação apenas para humanos.** É principalmente para a IA. Todo outro comando o lê. A força do formato ("never", "always", Named Rules) é intencional.
- **Adicionar uma seção de nível superior Layout / Motion / Responsive.** A spec tem seis seções, em ordem fixa, com nomes fixos. Dobre conteúdo de layout ou motion em Overview (regras de nível filosófico) ou Components (comportamento por componente).
- **Sobrescrever um DESIGN.md existente silenciosamente.** Document sempre confirma primeiro. Se você quer começar do zero, renomeie o arquivo existente ou diga explicitamente à skill para sobrescrever.
