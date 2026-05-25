# Design Espacial

## Sistemas de Espaçamento

### Use Base de 4pt, Não 8pt

Sistemas de 8pt são grosseiros demais; você frequentemente precisará de 12px (entre 8 e 16). Use 4pt para granularidade: 4, 8, 12, 16, 24, 32, 48, 64, 96px.

### Nomeie Tokens Semanticamente

Nomeie por relacionamento (`--space-sm`, `--space-lg`), não por valor (`--spacing-8`). Use `gap` em vez de margins para espaçamento entre irmãos; elimina colapso de margem e gambiarras de limpeza.

## Sistemas de Grid

### O Grid Autoajustável

Use `repeat(auto-fit, minmax(280px, 1fr))` para grids responsivos sem breakpoints. Colunas têm pelo menos 280px, tantas quanto couberem por linha, sobras se esticam. Para layouts complexos, use named grid areas (`grid-template-areas`) e redefina-as em breakpoints.

## Hierarquia Visual

### O Teste do Olho Semifechado

Borre os olhos (ou capture a tela e desfoque). Você ainda consegue identificar:
- O elemento mais importante?
- O segundo mais importante?
- Agrupamentos claros?

Se tudo parece ter o mesmo peso desfocado, você tem um problema de hierarquia.

### Hierarquia Através de Múltiplas Dimensões

Não dependa apenas do tamanho. Combine:

| Ferramenta | Hierarquia Forte | Hierarquia Fraca |
|------------|------------------|------------------|
| **Tamanho** | Razão 3:1 ou mais | Razão <2:1 |
| **Peso** | Bold vs Regular | Medium vs Regular |
| **Cor** | Alto contraste | Tons similares |
| **Posição** | Topo/esquerda (primário) | Embaixo/direita |
| **Espaço** | Cercado por espaço em branco | Lotado |

**A melhor hierarquia usa 2-3 dimensões de uma vez**: Um título que é maior, mais pesado E tem mais espaço acima dele.

### Cards Não São Obrigatórios

Cards são usados em excesso. Espaçamento e alinhamento criam agrupamento visual naturalmente. Use cards apenas quando o conteúdo é verdadeiramente distinto e acionável, itens precisam de comparação visual em um grid, ou o conteúdo precisa de limites claros de interação. **Nunca aninhe cards dentro de cards.** Use espaçamento, tipografia e divisores sutis para hierarquia dentro de um card.

## Container Queries

Queries de viewport são para layouts de página. **Container queries são para componentes**:

```css
.card-container {
  container-type: inline-size;
}

.card {
  display: grid;
  gap: var(--space-md);
}

/* Layout do card muda com base em seu contêiner, não no viewport */
@container (min-width: 400px) {
  .card {
    grid-template-columns: 120px 1fr;
  }
}
```

**Por que isso importa**: Um card em uma sidebar estreita permanece compacto, enquanto o mesmo card em uma área de conteúdo principal se expande automaticamente, sem gambiarras de viewport.

## Ajustes Óticos

Texto com `margin-left: 0` parece indentado devido ao espaço em branco das formas das letras; use margem negativa (`-0.05em`) para alinhamento ótico. Ícones geometricamente centralizados frequentemente parecem descentralizados; ícones de play precisam ser deslocados para a direita, setas se deslocam em sua direção.

### Alvos de Toque vs Tamanho Visual

Botões podem parecer pequenos mas precisam de grandes alvos de toque (44px mínimo). Use padding ou pseudo-elementos:

```css
.icon-button {
  width: 24px;  /* Tamanho visual */
  height: 24px;
  position: relative;
}

.icon-button::before {
  content: '';
  position: absolute;
  inset: -10px;  /* Expande alvo de toque para 44px */
}
```

## Profundidade e Elevação

Crie escalas semânticas de z-index (dropdown → sticky → modal-backdrop → modal → toast → tooltip) em vez de números arbitrários. Para sombras, crie uma escala de elevação consistente (sm → md → lg → xl). **Insight-chave**: Sombras devem ser sutis. Se você consegue vê-la claramente, provavelmente está forte demais.

---

**Evite**: Valores de espaçamento arbitrários fora da sua escala. Tornar todo espaçamento igual (variedade cria hierarquia). Criar hierarquia apenas pelo tamanho - combine tamanho, peso, cor e espaço.
