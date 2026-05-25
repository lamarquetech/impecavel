Tipografia carrega a maior parte da informação na página. Substitua padrões genéricos (Inter, Roboto, fallback de sistema em escala plana) por tipo que reflete a marca e escala com contraste intencional.

---

## Registro

Brand: execute o procedimento de seleção de fontes em [brand.md](brand.md). O pairing segue a faixa da marca (serif display + sans body para editorial/luxo, uma sans comprometida para tech, etc.). Escala fluida com `clamp()`, razão ≥1.25 entre degraus.

Product: fontes de sistema e stacks sans familiares são legítimas aqui. Uma família bem ajustada tipicamente carrega toda a UI. Escala `rem` fixa, razão 1.125–1.2 entre degraus mais próximos.

---

## Avalie a Tipografia Atual

Analise o que está fraco ou genérico no tipo atual:

1. **Escolhas de fontes**:
   - Estamos usando padrões invisíveis? (Inter, Roboto, Arial, Open Sans, padrões do sistema)
   - A fonte corresponde à personalidade da marca? (Uma marca lúdica não deveria usar uma tipografia corporativa)
   - Há muitas famílias de fontes? (Mais que 2-3 é quase sempre uma bagunça)

2. **Hierarquia**:
   - Você consegue distinguir headings de body de captions de relance?
   - Os tamanhos de fonte estão muito próximos? (14px, 15px, 16px = hierarquia turva)
   - Os contrastes de peso são suficientemente fortes? (Medium vs Regular é quase imperceptível)

3. **Dimensionamento e escala**:
   - Existe uma escala de tipo consistente, ou os tamanhos são arbitrários?
   - O texto de corpo atende o mínimo de legibilidade? (16px+)
   - A estratégia de dimensionamento é apropriada para o contexto? (Escalas `rem` fixas para UIs de app; `clamp()` fluido para headings de páginas de marketing/conteúdo)

4. **Legibilidade**:
   - Os comprimentos de linha estão confortáveis? (45-75 caracteres ideal)
   - A line-height é apropriada para a fonte e contexto?
   - Há contraste suficiente entre texto e fundo?

5. **Consistência**:
   - Os mesmos elementos estão estilizados da mesma forma por toda a interface?
   - Os pesos de fonte são usados consistentemente? (Não bold em uma seção, semibold em outra para o mesmo papel)
   - O letter-spacing é intencional ou padrão em todo lugar?

**CRÍTICO**: O objetivo não é tornar o texto "mais chique." É torná-lo mais claro, mais legível, e mais intencional. Boa tipografia é invisível; tipografia ruim é distrativa.

## Planeje Melhorias de Tipografia

Consulte a [referência de tipografia](typography.md) para orientação detalhada sobre escalas, pairing, e estratégias de carregamento.

Crie um plano sistemático:

- **Seleção de fontes**: As fontes precisam ser substituídas? O que se adapta à marca/contexto?
- **Escala de tipo**: Estabeleça uma escala modular (ex.: razão 1.25) com hierarquia clara
- **Estratégia de peso**: Quais pesos servem a quais papéis? (Regular para corpo, Semibold para rótulos, Bold para headings, ou o que for adequado)
- **Espaçamento**: Line-heights, letter-spacing, e margens entre elementos tipográficos

## Melhore a Tipografia Sistematicamente

### Seleção de Fontes

Se as fontes precisam ser substituídas:
- Escolha fontes que reflitam a personalidade da marca
- Faça pairing com contraste genuíno (serif + sans, geométrica + humanista), ou use uma única família em múltiplos pesos
- Garanta que o carregamento de web fonts não cause layout shift (`font-display: swap`, fallbacks com métricas compatíveis)

### Estabeleça Hierarquia

Construa uma escala de tipo clara:
- **5 tamanhos cobrem a maioria das necessidades**: caption, secondary, body, subheading, heading
- **Use uma razão consistente** entre níveis (1.25, 1.333, ou 1.5)
- **Combine dimensões**: Tamanho + peso + cor + espaço para hierarquia forte. Não dependa apenas do tamanho
- **UIs de App**: Use uma escala de tipo fixa baseada em `rem`, opcionalmente ajustada em 1-2 breakpoints. Dimensionamento fluido mina a previsibilidade espacial que layouts densos baseados em container precisam
- **Páginas de marketing / conteúdo**: Use dimensionamento fluido via `clamp(min, preferred, max)` para headings e texto display. Mantenha texto de corpo fixo

### Corrija a Legibilidade

- Defina `max-width` em containers de texto usando unidades `ch` (`max-width: 65ch`)
- Ajuste line-height por contexto: mais justa para headings (1.1-1.2), mais frouxa para corpo (1.5-1.7)
- Aumente line-height ligeiramente para texto claro-sobre-escuro
- Garanta que o texto de corpo tenha pelo menos 16px / 1rem

### Refine Detalhes

- Use `tabular-nums` para tabelas de dados e números que devem se alinhar
- Aplique `letter-spacing` adequado: ligeiramente aberto para small caps e uppercase, padrão ou justo para texto display grande
- Use nomes de tokens semânticos (`--text-body`, `--text-heading`), não nomes de valor (`--font-16`)
- Defina `font-kerning: normal` e considere recursos OpenType quando apropriado

### Consistência de Peso

- Defina papéis claros para cada peso e siga-os
- Não use mais que 3-4 pesos (Regular, Medium, Semibold, Bold é suficiente)
- Carregue apenas os pesos que você realmente usa (cada peso adiciona ao carregamento da página)

**NUNCA**:
- Use mais que 2-3 famílias de fontes
- Escolha tamanhos arbitrariamente; comprometa-se com uma escala
- Defina texto de corpo abaixo de 16px
- Use fontes decorativas/display para texto de corpo
- Desabilite zoom do navegador (`user-scalable=no`)
- Use `px` para tamanhos de fonte; use `rem` para respeitar configurações do usuário
- Padronize para Inter/Roboto/Open Sans quando personalidade importa
- Faça pairing de fontes que são parecidas mas não idênticas (duas sans-serifs geométricas)

## Verifique Melhorias de Tipografia

- **Hierarquia**: Você consegue identificar heading vs body vs caption instantaneamente?
- **Legibilidade**: O texto de corpo é confortável de ler em passagens longas?
- **Consistência**: Elementos com o mesmo papel estão estilizados identicamente por toda a interface?
- **Personalidade**: A tipografia reflete a marca?
- **Performance**: As web fonts estão carregando eficientemente sem layout shift?
- **Acessibilidade**: O texto atende às razões de contraste WCAG? É zoomável até 200%?

Quando o tipo carrega a hierarquia por conta própria, passe para `{{command_prefix}}impeccable polish` para a passagem final.

## Parâmetros de assinatura do modo live

Cada variante DEVE declarar um parâmetro `scale` controlando a razão de hierarquia. Expresse todos os tamanhos de fonte no CSS escopo da variante através de `calc(var(--p-scale, 1) * <base>)` ou, melhor, escale a rampa de tipo via `clamp(min, calc(var(--p-scale, 1) * Npx), max)`. Os usuários deslizam de contido a imponente.

```json
{"id":"scale","kind":"range","min":0.85,"max":1.3,"step":0.05,"default":1,"label":"Scale"}
```

Onde a variante varia um pairing específico, exponha a escolha de pairing como um parâmetro `steps` (ex.: "serif display + sans body" vs. "mono display + sans body" vs. "all-sans"). Cada ramo roteia por seletores `:scope[data-p-pairing="X"]` no CSS escopo.

Consulte `reference/live.md` para o contrato completo de parâmetros.
