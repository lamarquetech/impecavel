# Impeccable CLI

Detecte anti-patterns de UI e problemas de qualidade de design pela linha de comando. Escaneia arquivos HTML, CSS, JSX, TSX, Vue e Svelte em busca de 27 padrões específicos, incluindo sinais de UI gerada por IA, violações de acessibilidade e problemas gerais de qualidade de design.

## Início Rápido

```bash
# Instalar skills no seu harness de IA (Claude, Cursor, Gemini, etc.)
npx impeccable skills install

# Atualizar skills para a versão mais recente
npx impeccable skills update

# Listar todos os comandos disponíveis
npx impeccable skills help

# Escanear arquivos ou diretórios em busca de anti-patterns
npx impeccable detect src/

# Escanear uma URL ao vivo (requer Puppeteer)
npx impeccable detect https://example.com

# Saída JSON para CI/ferramentas
npx impeccable detect --json src/

# Modo apenas regex (mais rápido, sem jsdom)
npx impeccable detect --fast src/
```

## O Que Ele Detecta

**Sinais de Slop de IA**: padrões que gritam "IA gerou isso":
- Bordas laterais de destaque, texto com gradiente em títulos
- Gradientes roxo/violeta e paletas ciano-em-fundo-escuro
- Modo escuro com destaques brilhantes, conflitos de border + border-radius

**Problemas de Tipografia**: fontes superutilizadas (Inter, Roboto), hierarquia de tipo plana, famílias de fonte únicas

**Cor e Contraste**: violações WCAG AA, texto cinza em fundos coloridos, preto/branco puro

**Layout e Composição**: cards aninhados, espaçamento monótono, layouts todo-centralizado

**Movimento**: easing bounce/elastic, transições de propriedades de layout

**Qualidade**: texto de corpo minúsculo, padding espremido, comprimentos de linha longos, alvos de toque pequenos

25 detecções no total. Veja a lista completa em [impeccable.style](https://impeccable.style).

## Códigos de Saída

- `0`: nenhum problema encontrado
- `2`: anti-patterns detectados

## Opções

```
impeccable detect [opções] [arquivo-ou-diretorio-ou-url...]

  --fast    Modo apenas regex (pula jsdom, mais rápido mas menos preciso)
  --json    Saída dos resultados como JSON
  --help    Mostrar ajuda
```

## Requisitos

- Node.js 18+
- `jsdom` (incluído como dependência, usado para escaneamento HTML)
- `puppeteer` (opcional, necessário apenas para escaneamento de URLs)

## Parte do Impeccable

Este CLI é parte do [Impeccable](https://impeccable.style), um pacote de skills de design multi-provider para ferramentas de desenvolvimento com IA. O conjunto completo inclui 22 comandos de direcionamento para Claude, Cursor, Gemini, Codex e mais.

## Licença

[Apache 2.0](https://github.com/pbakaus/impeccable/blob/main/LICENSE)
