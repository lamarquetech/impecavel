> **Contexto adicional necessário**: o que é apropriado para o domínio (lúdico vs profissional vs peculiar vs elegante).

Encontre os momentos onde personalidade e polimento inesperado transformariam uma interface funcional em uma que os usuários lembram e contam para outras pessoas. Adicione apenas onde o momento merece; encanto em todo lugar soa como ruído.

---

## Registro

Brand: encanto pode ser distribuído pela voz do copy, transições de seção, recompensas de descoberta, toques sazonais, personalidade por toda a superfície.

Product: encanto em momentos específicos, não em páginas. Conclusão, ações pela primeira vez, recuperação de erro, marcos alcançados. Confiabilidade e consistência carregam o resto da experiência; encanto empurrado em todo lugar soa como ruído.

---

## Avalie as Oportunidades de Encanto

Identifique onde o encanto melhoraria (não distrairia da) experiência:

1. **Encontre momentos naturais de encanto**:
   - **Estados de sucesso**: Ações concluídas (salvar, enviar, publicar)
   - **Estados vazios**: Experiências pela primeira vez, onboarding
   - **Estados de carregamento**: Períodos de espera que poderiam ser entretenedores
   - **Conquistas**: Marcos, streaks, conclusões
   - **Interações**: Estados de hover, cliques, arrastar
   - **Erros**: Suavizando momentos frustrantes
   - **Easter eggs**: Descobertas ocultas para usuários curiosos

2. **Entenda o contexto**:
   - Qual é a personalidade da marca? (Lúdica? Profissional? Peculiar? Elegante?)
   - Quem é o público? (Fãs de tecnologia? Criativos? Corporativo?)
   - Qual é o contexto emocional? (Conquista? Exploração? Frustração?)
   - O que é apropriado? (App bancário ≠ app de games)

3. **Defina a estratégia de encanto**:
   - **Sofisticação sutil**: Micro-interações refinadas (marcas de luxo)
   - **Personalidade lúdica**: Ilustrações e copy divertidos (apps de consumo)
   - **Surpresas úteis**: Antecipando necessidades antes dos usuários pedirem (ferramentas de produtividade)
   - **Riqueza sensorial**: Sons satisfatórios, animações suaves (ferramentas criativas)

Se algum desses itens não estiver claro no codebase, {{ask_instruction}}

**CRÍTICO**: O encanto deve melhorar a usabilidade, nunca obscurecê-la. Se os usuários notam o encanto mais do que a realização do seu objetivo, você foi longe demais.

## Princípios de Encanto

Siga estas diretrizes:

### O Encanto Amplifica, Nunca Bloqueia
- Momentos de encanto devem ser rápidos (< 1 segundo)
- Nunca atrase funcionalidade principal por encanto
- Torne o encanto sutil ou ignorável
- Respeite o tempo e o foco na tarefa do usuário

### Surpresa e Descoberta
- Esconda detalhes encantadores para os usuários descobrirem
- Recompense exploração e curiosidade
- Não anuncie cada momento de encanto
- Deixe os usuários compartilhar descobertas com outros

### Apropriado ao Contexto
- Correspond o encanto ao momento emocional (celebre o sucesso, empatize com erros)
- Respeite o estado do usuário (não seja lúdico durante erros críticos)
- Correspond à personalidade da marca e expectativas do público
- Sensibilidade cultural (o que é encantador varia por cultura)

### Composto ao Longo do Tempo
- O encanto deve permanecer fresco com uso repetido
- Varie as respostas (não a mesma animação toda vez)
- Revele camadas mais profundas com uso continuado
- Construa antecipação através de padrões

## Técnicas de Encanto

Adicione personalidade e alegria através destes métodos:

### Micro-interações e Animação

**Encanto em botões**:
```css
/* Pressionar de botão satisfatório */
.button {
  transition: transform 0.1s, box-shadow 0.1s;
}
.button:active {
  transform: translateY(2px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* Efeito ripple ao clicar */
/* Elevação suave ao passar o mouse */
.button:hover {
  transform: translateY(-2px);
  transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1); /* ease-out-quart */
}
```

**Encanto no carregamento**:
- Animações de carregamento lúdicas (não apenas spinners)
- Personalidade nas mensagens de carregamento (escreva mensagens específicas do produto, não genéricas de IA)
- Indicação de progresso com mensagens encorajadoras
- Skeleton screens com animações sutis

**Animações de sucesso**:
- Animação de desenho de checkmark
- Explosão de confetti para conquistas importantes
- Scale + fade suave para confirmação
- Efeitos sonoros satisfatórios (sutis)

**Surpresas no hover**:
- Ícones que animam ao passar o mouse
- Mudanças de cor ou efeitos de glow
- Revelações de tooltip com personalidade
- Mudanças de cursor (cursores personalizados para experiências de marca)

### Personalidade no Copy

**Mensagens de erro divertidas**:
```
"Erro 404"
"Esta página está brincando de esconde-esconde. (E ganhando)"

"Conexão falhou"
"Parece que a internet foi tomar um café. Quer tentar de novo?"
```

**Estados vazios encorajadores**:
```
"Nenhum projeto"
"Sua tela aguarda. Crie algo incrível."

"Nenhuma mensagem"
"Inbox zero! Você está arrasando hoje."
```

**Rótulos e tooltips divertidos**:
```
"Excluir"
"Enviar para o vazio" (para marca lúdica)

"Ajuda"
"Me salva" (tooltip)
```

**IMPORTANTE**: Correspond a personalidade do copy à marca. Bancos não devem ser malucos, mas podem ser acolhedores.

### Ilustrações e Personalidade Visual

**Ilustrações customizadas**:
- Ilustrações de estado vazio (não ícones de stock)
- Ilustrações de estado de erro (monstros amigáveis, personagens peculiares)
- Ilustrações de estado de carregamento (personagens animados)
- Ilustrações de estado de sucesso (celebrações)

**Personalidade dos ícones**:
- Conjunto de ícones customizado correspondendo à personalidade da marca
- Ícones animados (movimento sutil em hover/clique)
- Ícones ilustrativos (mais detalhados que os genéricos)
- Estilo consistente em todos os ícones

**Efeitos de fundo**:
- Efeitos de partículas sutis
- Fundos com gradiente mesh
- Padrões geométricos
- Profundidade parallax
- Temas por horário (manhã vs noite)

### Interações Satisfatórias

**Encanto no drag and drop**:
- Efeito de elevação ao arrastar (sombra, scale)
- Animação de snap ao soltar
- Som de posicionamento satisfatório
- Toast de desfazer ("Soltou no lugar errado? [Desfazer]")

**Toggle switches**:
- Slide suave com física de mola
- Transição de cor
- Feedback háptico no mobile
- Efeito sonoro opcional

**Progresso e conquistas**:
- Contadores de streak com marcos celebrativos
- Barras de progresso que "celebram" aos 100%
- Desbloqueio de badges com animação
- Stats divertidas ("Você está on fire! 5 dias seguidos")

**Interações de formulário**:
- Campos de input que animam ao receber foco
- Checkboxes com um pulse de scale satisfatório ao marcar
- Estado de sucesso que celebra input válido
- Textareas com auto-grow

### Design de Som

**Pistas sonoras sutis** (quando apropriado):
- Sons de notificação (distintos, mas não irritantes)
- Sons de sucesso (um "ding" satisfatório)
- Sons de erro (empáticos, não ásperos)
- Sons de digitação para chat/mensagens
- Áudio ambiente de fundo (muito sutil)

**IMPORTANTE**:
- Respeite as configurações de som do sistema
- Forneça opção de mudo
- Mantenha volumes baixos (pistas sutis, não alarmes)
- Não reproduza em toda interação (fadiga sonora é real)

### Easter Eggs e Encantos Ocultos

**Recompensas de descoberta**:
- Konami code desbloqueia tema especial
- Atalhos de teclado ocultos (Cmd+K para funcionalidades especiais)
- Revelações de hover em logos ou ilustrações
- Piadas no alt text de imagens (para usuários de screen reader também!)
- Mensagens no console para desenvolvedores ("Gostou do que viu? Estamos contratando!")

**Toques sazonais**:
- Temas de feriados (sutis, de bom gosto)
- Mudanças de cor sazonais
- Variações baseadas no clima
- Mudanças baseadas no horário (escuro à noite, claro durante o dia)

**Personalidade contextual**:
- Mensagens diferentes baseadas no horário do dia
- Respostas a ações específicas do usuário
- Variações aleatórias (não a mesma toda vez)
- Revelações progressivas com uso continuado

### Estados de Carregamento e Espera

**Torne a espera envolvente**:
- Mensagens de carregamento interessantes que rotacionam
- Barras de progresso com personalidade
- Mini-games durante carregamentos longos
- Curiosidades ou dicas enquanto espera
- Contagem regressiva com mensagens encorajadoras

```
Mensagens de carregamento: escreva mensagens específicas do seu produto, não genéricas de IA:
- "Processando seus números mais recentes..."
- "Sincronizando com as alterações da sua equipe..."
- "Preparando seu dashboard..."
- "Verificando atualizações desde ontem..."
```

**AVISO**: Evite mensagens de carregamento clichês como "Reunindo pixels", "Ensinando robôs a dançar", "Consultando a bola de cristal", "Contando de trás para frente até o infinito". Essas são copy de AI slop, instantaneamente reconhecíveis como geradas por máquina. Escreva mensagens que são específicas ao que seu produto realmente faz.

### Momentos de Celebração

**Celebrações de sucesso**:
- Confetti para marcos importantes
- Checkmarks animados para conclusões
- Celebrações da barra de progresso aos 100%
- Notificações no estilo "Conquista desbloqueada"
- Mensagens personalizadas ("Você publicou seu 10º artigo!")

**Reconhecimento de marcos**:
- Ações pela primeira vez recebem tratamento especial
- Tracking e celebração de streaks
- Progresso em direção a metas
- Celebrações de aniversário

## Padrões de Implementação

**Bibliotecas de animação**:
- Framer Motion (React)
- GSAP (universal)
- Lottie (animações do After Effects)
- Canvas confetti (efeitos de festa)

**Bibliotecas de som**:
- Howler.js (gerenciamento de áudio)
- Use-sound (React hook)

**Bibliotecas de física**:
- React Spring (física de mola)
- Popmotion (primitivos de animação)

**IMPORTANTE**: Tamanho de arquivo importa. Comprima imagens, otimize animações, faça lazy load de funcionalidades de encanto.

**NUNCA**:
- Atrase funcionalidade principal por encanto
- Force os usuários por momentos encantadores (torne ignoráveis)
- Use encanto para esconder UX ruim
- Exagere (menos é mais)
- Ignore acessibilidade (anime com responsabilidade, forneça alternativas)
- Faça toda interação encantadora (momentos especiais devem ser especiais)
- Sacrifique performance por encanto
- Seja inapropriado para o contexto (leia a situação)

## Verifique a Qualidade do Encanto

Teste se o encanto realmente encanta:

- **Reações dos usuários**: Os usuários sorriem? Compartilham screenshots?
- **Não irrita**: Ainda é agradável na 100ª vez?
- **Não bloqueia**: Os usuários podem optar por pular?
- **Performático**: Sem engasgos, sem lentidão
- **Apropriado**: Correspond à marca e ao contexto
- **Acessível**: Funciona com movimento reduzido, screen readers

Quando os momentos parecerem merecidos, passe para `{{command_prefix}}impeccable polish` para a revisão final.
