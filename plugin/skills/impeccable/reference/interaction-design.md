# Design de Interação

## Os Oito Estados Interativos

Todo elemento interativo precisa destes estados desenhados:

| Estado | Quando | Tratamento Visual |
|--------|--------|-------------------|
| **Default** | Em repouso | Estilo base |
| **Hover** | Ponteiro sobre (não toque) | Elevação sutil, mudança de cor |
| **Focus** | Foco por teclado/programático | Anel visível (veja abaixo) |
| **Active** | Sendo pressionado | Pressionado, mais escuro |
| **Disabled** | Não interativo | Opacidade reduzida, sem ponteiro |
| **Loading** | Processando | Spinner, skeleton |
| **Error** | Estado inválido | Borda vermelha, ícone, mensagem |
| **Success** | Concluído | Check verde, confirmação |

**O erro comum**: Desenhar hover sem focus, ou vice-versa. Eles são diferentes. Usuários de teclado nunca veem estados de hover.

## Anéis de Foco: Faça Certo

**Nunca `outline: none` sem substituição.** É uma violação de acessibilidade. Em vez disso, use `:focus-visible` para mostrar foco apenas para usuários de teclado:

```css
/* Esconde anel de foco para mouse/toque */
button:focus {
  outline: none;
}

/* Mostra anel de foco para teclado */
button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

**Design do anel de foco**:
- Alto contraste (mínimo 3:1 contra cores adjacentes)
- 2-3px de espessura
- Offset do elemento (não dentro dele)
- Consistente em todos os elementos interativos

## Design de Formulários: O Não-Óbvio

**Placeholders não são rótulos.** Eles desaparecem na entrada. Sempre use elementos `<label>` visíveis. **Valide no blur**, não em cada tecla (exceção: força da senha). Coloque erros **abaixo** dos campos com `aria-describedby` conectando-os.

## Estados de Carregamento

**Atualizações otimistas**: Mostre sucesso imediatamente, reverta em caso de falha. Use para ações de baixo risco (likes, follows), não para pagamentos ou ações destrutivas. **Skeleton screens > spinners**: eles preveem a forma do conteúdo e parecem mais rápidos que spinners genéricos.

## Modais: A Abordagem Inert

O trapping de foco em modais costumava exigir JavaScript complexo. Agora use o atributo `inert`:

```html
<!-- Quando o modal está aberto -->
<main inert>
  <!-- Conteúdo atrás do modal não pode ser focado ou clicado -->
</main>
<dialog open>
  <h2>Título do Modal</h2>
  <!-- Foco permanece dentro do modal -->
</dialog>
```

Ou use o elemento `<dialog>` nativo:

```javascript
const dialog = document.querySelector('dialog');
dialog.showModal();  // Abre com trap de foco, fecha com Escape
```

## A Popover API

Para tooltips, dropdowns e overlays não-modais, use popovers nativos:

```html
<button popovertarget="menu">Abrir menu</button>
<div id="menu" popover>
  <button>Opção 1</button>
  <button>Opção 2</button>
</div>
```

**Benefícios**: Light-dismiss (clicar fora fecha), empilhamento adequado, sem guerras de z-index, acessível por padrão.

## Posicionamento de Dropdown e Overlay

Dropdowns renderizados com `position: absolute` dentro de um contêiner que tem `overflow: hidden` ou `overflow: auto` serão cortados. Este é o bug de dropdown mais comum em código gerado.

### CSS Anchor Positioning

A solução moderna usa a CSS Anchor Positioning API para ancorar um overlay ao seu trigger sem JavaScript:

```css
.trigger {
  anchor-name: --menu-trigger;
}

.dropdown {
  position: fixed;
  position-anchor: --menu-trigger;
  position-area: block-end span-inline-end;
  margin-top: 4px;
}

/* Inverte para cima se não houver espaço abaixo */
@position-try --flip-above {
  position-area: block-start span-inline-end;
  margin-bottom: 4px;
}
```

Como o dropdown usa `position: fixed`, ele escapa de qualquer recorte de `overflow` em elementos ancestrais. O bloco `@position-try` cuida das bordas do viewport automaticamente. **Suporte de navegadores**: Chrome 125+, Edge 125+. Ainda não no Firefox ou Safari - use fallback para esses navegadores.

### Combinação Popover + Anchor

Combinar a Popover API com anchor positioning oferece empilhamento, light-dismiss, acessibilidade e posicionamento correto em um único padrão:

```html
<button popovertarget="menu" class="trigger">Abrir</button>
<div id="menu" popover class="dropdown">
  <button>Opção 1</button>
  <button>Opção 2</button>
</div>
```

O atributo `popover` coloca o elemento na **top layer**, que fica acima de todo o outro conteúdo independentemente de z-index ou overflow. Sem portal necessário.

### Padrão Portal / Teleport

Em frameworks de componentes, renderize o dropdown na raiz do documento e posicione-o com JavaScript:

- **React**: `createPortal(dropdown, document.body)`
- **Vue**: `<Teleport to="body">`
- **Svelte**: Use uma biblioteca de portal ou monte em `document.body`

Calcule a posição a partir do `getBoundingClientRect()` do trigger, depois aplique `position: fixed` com valores de `top` e `left`. Recalcule em scroll e resize.

### Fallback com Position Fixed

Para navegadores sem suporte a anchor positioning, `position: fixed` com coordenadas manuais evita recorte de overflow:

```css
.dropdown {
  position: fixed;
  /* top/left definidos via JS a partir de getBoundingClientRect() do trigger */
}
```

Verifique limites do viewport antes de renderizar. Se o dropdown ultrapassasse a borda inferior, inverta-o acima do trigger. Se ultrapassasse a borda direita, alinhe-o ao lado direito do trigger.

### Anti-Padrões

- **`position: absolute` dentro de `overflow: hidden`** - O dropdown será cortado. Use `position: fixed` ou a top layer em vez disso.
- **Valores arbitrários de z-index** como `z-index: 9999` - Use uma escala semântica de z-index: `dropdown (100) -> sticky (200) -> modal-backdrop (300) -> modal (400) -> toast (500) -> tooltip (600)`.
- **Renderizar markup do dropdown inline** sem uma saída de escape do stacking context do pai. Use `popover` (top layer), um portal, ou `position: fixed`.

## Ações Destrutivas: Desfazer > Confirmar

**Desfazer é melhor que diálogos de confirmação.** Usuários clicam em confirmações sem pensar. Remova da UI imediatamente, mostre toast de desfazer, delete de fato após o toast expirar. Use confirmação apenas para ações verdadeiramente irreversíveis (exclusão de conta), ações de alto custo ou operações em lote.

## Padrões de Navegação por Teclado

### Roving Tabindex

Para grupos de componentes (tabs, itens de menu, grupos de radio), um item é tabbable; teclas de seta movem dentro:

```html
<div role="tablist">
  <button role="tab" tabindex="0">Tab 1</button>
  <button role="tab" tabindex="-1">Tab 2</button>
  <button role="tab" tabindex="-1">Tab 3</button>
</div>
```

Teclas de seta movem `tabindex="0"` entre itens. Tab move para o próximo componente inteiramente.

### Skip Links

Forneça skip links (`<a href="#main-content">Pular para o conteúdo principal</a>`) para usuários de teclado pularem a navegação. Esconda fora da tela, mostre no foco.

## Descobribilidade de Gestos

Deslizar para deletar e gestos similares são invisíveis. Dê dicas de sua existência:

- **Revelação parcial**: Mostre botão de delete espreitando da borda
- **Onboarding**: Coach marks no primeiro uso
- **Alternativa**: Sempre forneça uma alternativa visível (menu com "Delete")

Não dependa de gestos como a única forma de executar ações.

---

**Evite**: Remover indicadores de foco sem alternativas. Usar texto de placeholder como rótulos. Alvos de toque <44x44px. Mensagens de erro genéricas. Controles personalizados sem suporte a ARIA/teclado.
