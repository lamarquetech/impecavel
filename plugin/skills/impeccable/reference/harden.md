Designs que só funcionam com dados perfeitos não estão prontos para produção. Endureça a interface contra as entradas, erros, idiomas e condições de rede que usuários reais vão lhe jogar.

## Avalie as Necessidades de Hardening

Identifique fragilidades e casos extremos:

1. **Teste com entradas extremas**:
   - Texto muito longo (nomes, descrições, títulos)
   - Texto muito curto (vazio, caractere único)
   - Caracteres especiais (emoji, texto RTL, acentos)
   - Números grandes (milhões, bilhões)
   - Muitos itens (1000+ itens em lista, 50+ opções)
   - Nenhum dado (estados vazios)

2. **Teste cenários de erro**:
   - Falhas de rede (offline, lento, timeout)
   - Erros de API (400, 401, 403, 404, 500)
   - Erros de validação
   - Erros de permissão
   - Rate limiting
   - Operações concorrentes

3. **Teste internacionalização**:
   - Traduções longas (Alemão costuma ser 30% mais longo que Inglês)
   - Idiomas RTL (Árabe, Hebraico)
   - Conjuntos de caracteres (Chinês, Japonês, Coreano, emoji)
   - Formatos de data/hora
   - Formatos numéricos (1,000 vs 1.000)
   - Símbolos de moeda

**CRÍTICO**: Designs que só funcionam com dados perfeitos não estão prontos para produção. Endureça contra a realidade.

## Dimensões de Hardening

Melhore a resiliência sistematicamente:

### Overflow e Quebra de Texto

**Tratamento de texto longo**:
```css
/* Linha única com reticências */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Múltiplas linhas com clamp */
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Permitir quebra */
.wrap {
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}
```

**Overflow em Flex/Grid**:
```css
/* Prevenir que itens flex transbordem */
.flex-item {
  min-width: 0; /* Permite encolher abaixo do tamanho do conteúdo */
  overflow: hidden;
}

/* Prevenir que itens grid transbordem */
.grid-item {
  min-width: 0;
  min-height: 0;
}
```

**Dimensionamento responsivo de texto**:
- Use `clamp()` para tipografia fluida
- Defina tamanhos mínimos legíveis (14px no mobile)
- Teste escalamento de texto (zoom para 200%)
- Garanta que containers expandam com o texto

### Internacionalização (i18n)

**Expansão de texto**:
- Adicione orçamento de espaço de 30-40% para traduções
- Use flexbox/grid que se adapta ao conteúdo
- Teste com o idioma mais longo (geralmente Alemão)
- Evite larguras fixas em containers de texto

```jsx
// ❌ Ruim: Presume texto curto em Inglês
<button className="w-24">Submit</button>

// ✅ Bom: Adapta ao conteúdo
<button className="px-4 py-2">Submit</button>
```

**Suporte a RTL (Right-to-Left)**:
```css
/* Use propriedades lógicas */
margin-inline-start: 1rem; /* Não margin-left */
padding-inline: 1rem; /* Não padding-left/right */
border-inline-end: 1px solid; /* Não border-right */

/* Ou use atributo dir */
[dir="rtl"] .arrow { transform: scaleX(-1); }
```

**Suporte a conjuntos de caracteres**:
- Use codificação UTF-8 em todo lugar
- Teste com caracteres Chinês/Japonês/Coreano (CJK)
- Teste com emoji (podem ter 2-4 bytes)
- Trate scripts diferentes (Latim, Cirílico, Árabe, etc.)

**Formatação de Data/Hora**:
```javascript
// ✅ Use Intl API para formatação adequada
new Intl.DateTimeFormat('en-US').format(date); // 1/15/2024
new Intl.DateTimeFormat('de-DE').format(date); // 15.1.2024

new Intl.NumberFormat('en-US', { 
  style: 'currency', 
  currency: 'USD' 
}).format(1234.56); // $1,234.56
```

**Pluralização**:
```javascript
// ❌ Ruim: Presume pluralização em Inglês
`${count} item${count !== 1 ? 's' : ''}`

// ✅ Bom: Use biblioteca de i18n adequada
t('items', { count }) // Trata regras complexas de plural
```

### Tratamento de Erros

**Erros de rede**:
- Mostre mensagens de erro claras
- Forneça botão de tentar novamente
- Explique o que aconteceu
- Ofereça modo offline (se aplicável)
- Trate cenários de timeout

```jsx
// Estados de erro com recuperação
{error && (
  <ErrorMessage>
    <p>Falha ao carregar dados. {error.message}</p>
    <button onClick={retry}>Tentar novamente</button>
  </ErrorMessage>
)}
```

**Erros de validação de formulário**:
- Erros inline próximos aos campos
- Mensagens claras e específicas
- Sugira correções
- Não bloqueie envio desnecessariamente
- Preserve o input do usuário em caso de erro

**Erros de API**:
- Trate cada código de status apropriadamente
  - 400: Mostre erros de validação
  - 401: Redirecione para login
  - 403: Mostre erro de permissão
  - 404: Mostre estado de não encontrado
  - 429: Mostre mensagem de rate limit
  - 500: Mostre erro genérico, ofereça suporte

**Degradação graceful**:
- Funcionalidade principal funciona sem JavaScript
- Imagens têm texto alt
- Melhoria progressiva
- Fallbacks para funcionalidades não suportadas

### Casos Extremos e Condições de Contorno

**Estados vazios**:
- Nenhum item na lista
- Nenhum resultado de busca
- Nenhuma notificação
- Nenhum dado para exibir
- Forneça uma próxima ação clara

**Estados de carregamento**:
- Carregamento inicial
- Carregamento de paginação
- Atualização
- Mostre o que está carregando ("Carregando seus projetos...")
- Estimativas de tempo para operações longas

**Grandes conjuntos de dados**:
- Paginação ou scroll virtual
- Capacidades de busca/filtro
- Otimização de performance
- Não carregue todos os 10.000 itens de uma vez

**Operações concorrentes**:
- Previna duplo envio (desabilite botão enquanto carrega)
- Trate condições de corrida
- Atualizações otimistas com rollback
- Resolução de conflitos

**Estados de permissão**:
- Sem permissão para visualizar
- Sem permissão para editar
- Modo somente leitura
- Explicação clara do motivo

**Compatibilidade de navegadores**:
- Polyfills para funcionalidades modernas
- Fallbacks para CSS não suportado
- Detecção de funcionalidades (não detecção de navegador)
- Teste nos navegadores-alvo

### Validação e Sanitização de Entrada

**Validação client-side**:
- Campos obrigatórios
- Validação de formato (email, telefone, URL)
- Limites de comprimento
- Pattern matching
- Regras de validação customizadas

**Validação server-side** (sempre):
- Nunca confie apenas no client-side
- Valide e sanitize todas as entradas
- Proteja contra ataques de injeção
- Rate limiting

**Tratamento de restrições**:
```html
<!-- Defina restrições claras -->
<input 
  type="text"
  maxlength="100"
  pattern="[A-Za-z0-9]+"
  required
  aria-describedby="username-hint"
/>
<small id="username-hint">
  Apenas letras e números, até 100 caracteres
</small>
```

### Resiliência de Acessibilidade

**Navegação por teclado**:
- Toda funcionalidade acessível via teclado
- Ordem lógica de tab
- Gerenciamento de foco em modais
- Skip links para conteúdo longo

**Suporte a screen reader**:
- Rótulos ARIA adequados
- Anuncie mudanças dinâmicas (live regions)
- Texto alt descritivo
- HTML semântico

**Sensibilidade a movimento**:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Modo de alto contraste**:
- Teste no modo de alto contraste do Windows
- Não dependa apenas de cor
- Forneça pistas visuais alternativas

### Resiliência de Performance

**Conexões lentas**:
- Carregamento progressivo de imagens
- Skeleton screens
- Atualizações otimistas de UI
- Suporte offline (service workers)

**Vazamentos de memória**:
- Limpe event listeners
- Cancele subscriptions
- Limpe timers/intervals
- Aborte requisições pendentes no unmount

**Throttling e Debouncing**:
```javascript
// Debounce na busca
const debouncedSearch = debounce(handleSearch, 300);

// Throttle no handler de scroll
const throttledScroll = throttle(handleScroll, 100);
```

## Estratégias de Teste

**Teste manual**:
- Teste com dados extremos (muito longo, muito curto, vazio)
- Teste em diferentes idiomas
- Teste offline
- Teste conexão lenta (throttle para 3G)
- Teste com screen reader
- Teste navegação apenas por teclado
- Teste em navegadores antigos

**Teste automatizado**:
- Testes unitários para casos extremos
- Testes de integração para cenários de erro
- Testes E2E para caminhos críticos
- Testes de regressão visual
- Testes de acessibilidade (axe, WAVE)

**IMPORTANTE**: Hardening é sobre esperar o inesperado. Usuários reais vão fazer coisas que você nunca imaginou.

**NUNCA**:
- Presuma entrada perfeita (valide tudo)
- Ignore internacionalização (design para o global)
- Deixe mensagens de erro genéricas ("Ocorreu um erro")
- Esqueça cenários offline
- Confie apenas na validação client-side
- Use larguras fixas para texto
- Presuma texto com comprimento em Inglês
- Bloqueie toda a interface quando um componente apresenta erro

## Verifique o Hardening

Teste minuciosamente com casos extremos:

- **Texto longo**: Tente nomes com 100+ caracteres
- **Emoji**: Use emoji em todos os campos de texto
- **RTL**: Teste com Árabe ou Hebraico
- **CJK**: Teste com Chinês/Japonês/Coreano
- **Problemas de rede**: Desabilite internet, faça throttle da conexão
- **Grandes conjuntos de dados**: Teste com 1000+ itens
- **Ações concorrentes**: Clique em enviar 10 vezes rapidamente
- **Erros**: Force erros de API, teste todos os estados de erro
- **Vazio**: Remova todos os dados, teste estados vazios

Quando os casos extremos estiverem cobertos, passe para `{{command_prefix}}impeccable polish` para a revisão final.
