> **Contexto adicional necessário**: o "momento aha" que você quer que os usuários alcancem, e o nível de experiência dos usuários.

Leve os usuários ao primeiro valor o mais rápido possível. O trabalho do onboarding não é ensinar o produto. Seu trabalho é levar as pessoas ao momento que prova que o produto vale o tempo delas.

## Avaliar Necessidades de Onboarding

Entenda o que os usuários precisam aprender e por quê:

1. **Identifique o desafio**:
   - O que os usuários estão tentando realizar?
   - O que é confuso ou pouco claro na experiência atual?
   - Onde os usuários travam ou desistem?
   - Qual é o "momento aha" que queremos que os usuários alcancem?

2. **Entenda os usuários**:
   - Qual é o nível de experiência deles? (Iniciantes, usuários avançados, misto?)
   - Qual é a motivação deles? (Animados e explorando? Obrigatoriedade de trabalho?)
   - Qual é o compromisso de tempo deles? (5 minutos? 30 minutos?)
   - Quais alternativas eles conhecem? (Vindo de concorrente? Novos na categoria?)

3. **Defina o sucesso**:
   - Qual é o mínimo que os usuários precisam aprender para ter sucesso?
   - Qual é a ação-chave que queremos que eles realizem? (Primeiro projeto? Primeiro convite?)
   - Como sabemos que o onboarding funcionou? (Taxa de conclusão? Tempo até o valor?)

**CRÍTICO**: O onboarding deve levar os usuários ao valor o mais rapidamente possível, não ensinar tudo o que é possível.

## Princípios de Onboarding

Siga estes princípios centrais:

### Mostre, Não Conte
- Demonstre com exemplos funcionais, não apenas descrições
- Forneça funcionalidade real no onboarding, não modo tutorial separado
- Use disclosure progressivo, ensine uma coisa de cada vez

### Torne Opcional (Quando Possível)
- Deixe usuários experientes pularem o onboarding
- Não bloqueie acesso ao produto
- Forneça opções de "Pular" ou "Vou explorar por conta"

### Tempo Até o Valor
- Leve os usuários ao "momento aha" o mais rápido possível
- Priorize os conceitos mais importantes
- Ensine os 20% que entrega 80% do valor
- Guarde funcionalidades avançadas para descoberta contextual

### Contexto Acima de Cerimônia
- Ensine funcionalidades quando os usuários precisam delas, não antecipadamente
- Estados vazios são oportunidades de onboarding
- Tooltips e dicas no ponto de uso

### Respeite a Inteligência do Usuário
- Não seja condescendente nem superexplique
- Seja conciso e claro
- Presuma que os usuários conseguem descobrir padrões conhecidos

## Projetar Experiências de Onboarding

Crie onboarding apropriado para o contexto:

### Onboarding Inicial do Produto

**Tela de Boas-vindas**:
- Proposta de valor clara (o que é este produto?)
- O que os usuários vão aprender/realizar
- Estimativa de tempo (honesto sobre o compromisso)
- Opção de pular (para usuários experientes)

**Configuração de Conta**:
- Informação mínima necessária (colete mais depois)
- Explique por que está pedindo cada informação
- Padrões inteligentes quando possível
- Login social quando apropriado

**Introdução de Conceitos Centrais**:
- Introduza 1-3 conceitos centrais (não tudo)
- Use linguagem simples e exemplos
- Interativo quando possível (faça, não apenas leia)
- Indicação de progresso (passo 1 de 3)

**Primeiro Sucesso**:
- Guie os usuários a realizar algo real
- Exemplos ou templates pré-preenchidos
- Celebre a conclusão (mas não exagere)
- Próximos passos claros

### Descoberta e Adoção de Funcionalidades

**Estados Vazios**:
Em vez de espaço em branco, mostre:
- O que aparecerá aqui (descrição + screenshot/ilustração)
- Por que é valioso
- CTA claro para criar primeiro item
- Opção de exemplo ou template

Exemplo:
```
Nenhum projeto ainda
Projetos ajudam você a organizar seu trabalho e colaborar com sua equipe.
[Criar seu primeiro projeto] ou [Começar de um template]
```

**Tooltips Contextuais**:
- Aparecem no momento relevante (primeira vez que o usuário vê a funcionalidade)
- Apontam diretamente para o elemento de UI relevante
- Explicação breve + benefício
- Dispensáveis (com opção "Não mostrar novamente")
- Link opcional "Saiba mais"

**Anúncios de Funcionalidades**:
- Destaquem novas funcionalidades quando lançadas
- Mostrem o que há de novo e por que importa
- Deixem o usuário experimentar imediatamente
- Dispensáveis

**Onboarding Progressivo**:
- Ensine funcionalidades quando os usuários as encontram
- Badges ou indicadores em funcionalidades novas/não usadas
- Desbloqueie complexidade gradualmente (não mostre todas as opções imediatamente)

### Tours Guiados e Walkthroughs

**Quando usar**:
- Interfaces complexas com muitas funcionalidades
- Mudanças significativas em produto existente
- Ferramentas específicas de indústria que precisam de conhecimento do domínio

**Como projetar**:
- Destaque elementos específicos de UI (escureça o resto da página)
- Mantenha os passos curtos (3-7 passos no máximo por tour)
- Permita que os usuários cliquem pelo tour livremente
- Inclua opção "Pular tour"
- Torne reproduzível (menu de ajuda)

**Melhores práticas**:
- Interativo acima de passivo (deixe os usuários clicar em botões reais)
- Foque no fluxo de trabalho, não em funcionalidades ("Criar um projeto" não "Este é o botão de projeto")
- Forneça dados de exemplo para que as ações funcionem

### Tutoriais Interativos

**Quando usar**:
- Usuários precisam de prática prática
- Conceitos são complexos ou desconhecidos
- Alto risco (melhor praticar em ambiente seguro)

**Como projetar**:
- Ambiente sandbox com dados de exemplo
- Objetivos claros ("Criar um gráfico mostrando vendas por região")
- Orientação passo a passo
- Validação (confirme que fizeram certo)
- Momento de formatura (você está pronto!)

### Documentação e Ajuda

**Ajuda no produto**:
- Links de ajuda contextual por toda a interface
- Referência de atalhos de teclado
- Central de ajuda pesquisável
- Tutoriais em vídeo para fluxos de trabalho complexos

**Padrões de ajuda**:
- Ícone `?` perto de funcionalidades complexas
- Links "Saiba mais" nos tooltips
- Dicas de atalhos de teclado (`⌘K` exibido na caixa de busca)

## Design de Estado Vazio

Todo estado vazio precisa de:

### O Que Estará Aqui
"Seus projetos recentes aparecerão aqui"

### Por Que Importa
"Projetos ajudam você a organizar seu trabalho e colaborar com sua equipe"

### Como Começar
[Criar projeto] ou [Importar de template]

### Interesse Visual
Ilustração ou ícone (não apenas texto em página em branco)

### Ajuda Contextual
"Precisa de ajuda para começar? [Assista tutorial de 2 min]"

**Tipos de estado vazio**:
- **Primeiro uso**: Nunca usou esta funcionalidade (enfatize valor, forneça template)
- **Usuário limpou**: Excluiu tudo intencionalmente (toque leve, fácil recriar)
- **Sem resultados**: Busca ou filtro não retornou nada (sugira consulta diferente, limpe filtros)
- **Sem permissão**: Não pode acessar (explique por quê, como obter acesso)
- **Estado de erro**: Falha ao carregar (explique o que aconteceu, opção de retry)

## Padrões de Implementação

### Abordagens técnicas:

**Bibliotecas de tooltip**: Tippy.js, Popper.js
**Bibliotecas de tour**: Intro.js, Shepherd.js, React Joyride
**Padrões de modal**: Focus trap, backdrop, ESC para fechar
**Rastreamento de progresso**: LocalStorage para estados "vistos"
**Analytics**: Rastreie conclusão, pontos de desistência

**Padrões de armazenamento**:
```javascript
// Track which onboarding steps user has seen
localStorage.setItem('onboarding-completed', 'true');
localStorage.setItem('feature-tooltip-seen-reports', 'true');
```

**IMPORTANTE**: Não mostre o mesmo onboarding duas vezes (irritante). Rastreie conclusão e respeite descartes.

**NUNCA**:
- Force usuários por um onboarding longo antes que possam usar o produto
- Seja condescendente com usuários com explicações óbvias
- Mostre o mesmo tooltip repetidamente (respeite descartes)
- Bloqueie toda a UI durante o tour (deixe os usuários explorar)
- Crie modo tutorial separado desconectado do produto real
- Esmague com informações antecipadamente (disclosure progressivo!)
- Esconda "Pular" ou torne difícil de encontrar
- Esqueça de usuários que retornam (não mostre onboarding inicial novamente)

## Verificar Qualidade do Onboarding

Teste com usuários reais:

- **Tempo até conclusão**: Os usuários conseguem completar o onboarding rapidamente?
- **Compreensão**: Os usuários entendem após completar?
- **Ação**: Os usuários realizam o próximo passo desejado?
- **Taxa de pulo**: Muitos usuários estão pulando? (Talvez seja longo ou sem valor)
- **Taxa de conclusão**: Os usuários estão completando? (Se baixa, simplifique)
- **Tempo até o valor**: Quanto tempo até os usuários obterem o primeiro valor?

Quando os usuários alcançam o momento aha rápido e não desistem, passe para `{{command_prefix}}impeccable polish` para a passagem final.
