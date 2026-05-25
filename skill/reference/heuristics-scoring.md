# Guia de Pontuação por Heurísticas

Pontue cada uma das 10 Heurísticas de Usabilidade de Nielsen em uma escala de 0–4. Seja honesto: um 4 significa genuinamente excelente, não "bom o suficiente."

## 10 Heurísticas de Nielsen

### 1. Visibilidade do Status do Sistema

Mantenha os usuários informados sobre o que está acontecimento através de feedback oportuno e apropriado.

**Verificar**:
- Indicadores de carregamento durante operações assíncronas
- Confirmação de ações do usuário (salvar, enviar, excluir)
- Indicadores de progresso para processos de múltiplas etapas
- Localização atual na navegação (breadcrumbs, estados ativos)
- Feedback de validação de formulários (inline, não apenas ao enviar)

**Pontuação**:
| Pontuação | Critério |
|-------|----------|
| 0 | Sem feedback; o usuário adivinha o que aconteceu |
| 1 | Feedback raro; a maioria das ações não produz resposta visível |
| 2 | Parcial; alguns estados comunicados, lacunas importantes permanecem |
| 3 | Bom; a maioria das operações oferece feedback claro, lacunas menores |
| 4 | Excelente; toda ação é confirmada, o progresso está sempre visível |

### 2. Correspondência entre o Sistema e o Mundo Real

Fale a linguagem do usuário. Siga convenções do mundo real. A informação aparece em ordem natural e lógica.

**Verificar**:
- Terminologia familiar (sem jargão inexplicado)
- Ordem lógica das informações correspondendo às expectativas do usuário
- Ícones e metáforas reconhecíveis
- Linguagem adequada ao domínio para o público-alvo
- Fluxo de leitura natural (prioridade da esquerda para a direita, de cima para baixo)

**Pontuação**:
| Pontuação | Critério |
|-------|----------|
| 0 | Jargão técnico puro, alienígena para os usuários |
| 1 | Na maior parte confuso; requer conhecimento do domínio para navegar |
| 2 | Misto; alguma linguagem simples, algum jargão vaza |
| 3 | Na maior parte natural; termo ocasional precisa de contexto |
| 4 | Fala a linguagem do usuário fluentemente por toda a interface |

### 3. Controle e Liberdade do Usuário

Os usuários precisam de uma "saída de emergência" clara de estados indesejados sem diálogo prolongado.

**Verificar**:
- Funcionalidade de desfazer/refazer
- Botões de cancelamento em formulários e modais
- Navegação clara de volta à segurança (início, anterior)
- Forma fácil de limpar filtros, busca, seleções
- Saída de processos longos ou de múltiplas etapas

**Pontuação**:
| Pontuação | Critério |
|-------|----------|
| 0 | Usuários ficam presos; sem saída sem atualizar a página |
| 1 | Saídas difíceis; é preciso encontrar caminhos obscuros para escapar |
| 2 | Algumas saídas; fluxos principais têm escapatória, casos extremos não |
| 3 | Bom controle; os usuários podem sair e desfazer a maioria das ações |
| 4 | Controle total; desfazer, cancelar, voltar e escapar em todos os lugares |

### 4. Consistência e Padrões

Os usuários não deveriam ter que se perguntar se palavras, situações ou ações diferentes significam a mesma coisa.

**Verificar**:
- Terminologia consistente por toda a interface
- Mesmas ações produzem mesmos resultados em todos os lugares
- Convenções da plataforma seguidas (padrões de UI padrão)
- Consistência visual (cores, tipografia, espaçamento, componentes)
- Padrões de interação consistentes (mesmo gesto = mesmo comportamento)

**Pontuação**:
| Pontuação | Critério |
|-------|----------|
| 0 | Inconsistente em todos os lugares; parece produtos diferentes costurados |
| 1 | Muitas inconsistências; coisas parecidas têm aparência/comportamento diferente |
| 2 | Parcialmente consistente; fluxos principais coincidem, detalhes divergem |
| 3 | Na maior parte consistente; desvio ocasional, nada confuso |
| 4 | Totalmente consistente; sistema coeso, comportamento previsível |

### 5. Prevenção de Erros

Melhor do que boas mensagens de erro é um design que previne problemas em primeiro lugar.

**Verificar**:
- Confirmação antes de ações destrutivas (excluir, sobrescrever)
- Restrições que previnem entrada inválida (seletores de data, dropdowns)
- Padrões inteligentes que reduzem erros
- Rótulos claros que previnem mal-entendidos
- Salvamento automático e recuperação de rascunho

**Pontuação**:
| Pontuação | Critério |
|-------|----------|
| 0 | Erros fáceis de cometer; sem proteções em nenhum lugar |
| 1 | Poucas salvaguardas; algumas entradas validadas, a maioria não |
| 2 | Prevenção parcial; erros comuns capturados, casos extremos escapam |
| 3 | Boa prevenção; a maioria dos caminhos de erro bloqueada proativamente |
| 4 | Excelente; erros quase impossíveis através de restrições inteligentes |

### 6. Reconhecimento em Vez de Memorização

Minimize a carga de memória. Torne objetos, ações e opções visíveis ou facilmente recuperáveis.

**Verificar**:
- Opções visíveis (não enterradas em menus ocultos)
- Ajuda contextual quando necessário (tooltips, dicas inline)
- Itens recentes e histórico
- Autocomplete e sugestões
- Rótulos nos ícones (não navegação apenas com ícones)

**Pontuação**:
| Pontuação | Critério |
|-------|----------|
| 0 | Memorização pesada; usuários devem lembrar caminhos e comandos |
| 1 | Na maior parte memorização; muitos recursos ocultos, poucas pistas visíveis |
| 2 | Algumas ajudas; ações principais visíveis, recursos secundários ocultos |
| 3 | Bom reconhecimento; a maioria das coisas é descobrível, poucas exigências de memória |
| 4 | Tudo descobrível; os usuários nunca precisam memorizar |

### 7. Flexibilidade e Eficiência de Uso

Aceleradores, invisíveis para novatos, aceleram a interação de especialistas.

**Verificar**:
- Atalhos de teclado para ações comuns
- Elementos de interface customizáveis
- Itens recentes e favoritos
- Ações em lote/batch
- Recursos para usuários avançados que não complicam o básico

**Pontuação**:
| Pontuação | Critério |
|-------|----------|
| 0 | Um caminho rígido; sem atalhos ou alternativas |
| 1 | Flexibilidade limitada; poucas alternativas ao caminho principal |
| 2 | Alguns atalhos; suporte básico de teclado, ações em lote limitadas |
| 3 | Bons aceleradores; navegação por teclado, alguma customização |
| 4 | Altamente flexível; múltiplos caminhos, recursos avançados, customizável |

### 8. Estética e Design Minimalista

Interfaces não devem conter informações irrelevantes ou raramente necessárias. Cada elemento deve ter um propósito.

**Verificar**:
- Apenas informações necessárias visíveis em cada etapa
- Hierarquia visual clara direcionando a atenção
- Uso intencional de cor e ênfase
- Sem desordem decorativa competindo por atenção
- Layouts focados e sem desordem

**Pontuação**:
| Pontuação | Critério |
|-------|----------|
| 0 | Esmagador; tudo compete por atenção igualmente |
| 1 | Desordenado; muito ruído, difícil encontrar o que importa |
| 2 | Alguma desordem; conteúdo principal claro, periferia barulhenta |
| 3 | Na maior parte limpo; design focado, ruído visual menor |
| 4 | Perfeitamente minimal; cada elemento justifica seu pixel |

### 9. Ajudar Usuários a Reconhecer, Diagnosticar e Recuperar-se de Erros

Mensagens de erro devem usar linguagem simples, indicar precisamente o problema e sugerir construtivamente uma solução.

**Verificar**:
- Mensagens de erro em linguagem simples (sem códigos de erro para usuários)
- Identificação específica do problema ("Email está sem @" não "Entrada inválida")
- Sugestões de recuperação acionáveis
- Erros exibidos próximos à fonte do problema
- Tratamento de erro não-bloqueante (não apagar o formulário)

**Pontuação**:
| Pontuação | Critério |
|-------|----------|
| 0 | Erros crípticos; códigos, jargão, ou nenhuma mensagem |
| 1 | Erros vagos; "Algo deu errado" sem orientação |
| 2 | Claro mas inútil; nomeia o problema mas não a solução |
| 3 | Claro com sugestões; identifica o problema e oferece próximos passos |
| 4 | Recuperação perfeita; localiza o problema, sugere a correção, preserva o trabalho do usuário |

### 10. Ajuda e Documentação

Mesmo que o sistema seja utilizável sem documentação, a ajuda deve ser fácil de encontrar, focada em tarefas e concisa.

**Verificar**:
- Ajuda ou documentação pesquisável
- Ajuda contextual (tooltips, dicas inline, tours guiados)
- Organização focada em tarefas (não organizada por funcionalidades)
- Conteúdo conciso e escaneável
- Acesso fácil sem sair do contexto atual

**Pontuação**:
| Pontuação | Critério |
|-------|----------|
| 0 | Nenhuma ajuda disponível em nenhum lugar |
| 1 | Ajuda existe mas é difícil de encontrar ou irrelevante |
| 2 | Ajuda básica; FAQ ou documentação existe, não contextual |
| 3 | Boa documentação; pesquisável, na maior parte focada em tarefas |
| 4 | Ajuda contextual excelente; informação certa no momento certo |

---

## Resumo da Pontuação

**Total possível**: 40 pontos (10 heurísticas × 4 máximo)

| Faixa de Pontuação | Classificação | O Que Significa |
|-------------|--------|---------------|
| 36–40 | Excelente | Apenas polimento menor; pode lançar |
| 28–35 | Bom | Trate as áreas fracas, base sólida |
| 20–27 | Aceitável | Melhorias significativas necessárias antes que os usuários fiquem satisfeitos |
| 12–19 | Ruim | Requer grande reformulação de UX; experiência fundamental comprometida |
| 0–11 | Crítico | Redesign necessário; inutilizável no estado atual |

---

## Severidade de Problemas (P0–P3)

Marque cada problema individual encontrado durante a pontuação com um nível de prioridade:

| Prioridade | Nome | Descrição | Ação |
|----------|------|-------------|--------|
| **P0** | Bloqueante | Impede a conclusão da tarefa inteiramente | Corrigir imediatamente; este é um showstopper |
| **P1** | Maior | Causa dificuldade ou confusão significativa | Corrigir antes do lançamento |
| **P2** | Menor | Incômodo, mas existe alternativa | Corrigir na próxima passagem |
| **P3** | Polimento | Bom de corrigir, sem impacto real no usuário | Corrigir se houver tempo |

**Dica**: Se você está em dúvida entre dois níveis, pergunte: "Um usuário entraria em contato com o suporte por causa disso?" Se sim, é pelo menos P1.
