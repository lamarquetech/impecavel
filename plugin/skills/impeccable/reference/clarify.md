> **Contexto adicional necessário**: nível técnico do público e estado mental dos usuários no contexto.

Encontre o texto de interface confuso, ambíguo ou mal escrito e reescreva-o. Texto vago gera tickets de suporte e abandono; texto específico conduz os usuários pela tarefa.


---

## Avalie o Texto Atual

Identifique o que torna o texto confuso ou ineficaz:

1. **Encontre problemas de clareza**:
   - **Jargão**: Termos técnicos que os usuários não vão entender
   - **Ambiguidade**: Múltiplas interpretações possíveis
   - **Voz passiva**: "Seu arquivo foi enviado" vs "Enviamos seu arquivo"
   - **Extensão**: Texto longo demais ou curto demais
   - **Presunções**: Assumir conhecimento que o usuário não tem
   - **Contexto ausente**: Usuários não sabem o que fazer ou por quê
   - **Descasamento de tom**: Formal demais, casual demais ou inapropriado para a situação

2. **Entenda o contexto**:
   - Quem é o público? (Técnico? Geral? Usuários iniciantes?)
   - Qual é o estado mental do usuário? (Estressado durante um erro? Confiante durante um sucesso?)
   - Qual é a ação? (O que queremos que os usuários façam?)
   - Qual é a restrição? (Limites de caracteres? Limitações de espaço?)

**CRÍTICO**: Texto claro ajuda os usuários a ter sucesso. Texto confuso cria frustração, erros e tickets de suporte.

## Planeje as Melhorias de Texto

Crie uma estratégia para comunicação mais clara:

- **Mensagem principal**: Qual é a ÚNICA coisa que os usuários precisam saber?
- **Ação necessária**: O que os usuários devem fazer a seguir (se houver algo)?
- **Tom**: Como isso deve parecer? (Prestativo? ComDesculpas? Encorajador?)
- **Restrições**: Limites de extensão, voz da marca, considerações de localização

**IMPORTANTE**: Bom UX writing é invisível. Os usuários devem entender imediatamente sem notar as palavras.

## Melhore o Texto Sistematicamente

Refine o texto nestas áreas comuns:

### Mensagens de Erro
**Ruim**: "Erro 403: Proibido"
**Bom**: "Você não tem permissão para ver esta página. Contate seu administrador para obter acesso."

**Ruim**: "Entrada inválida"
**Bom**: "Endereços de email precisam de um símbolo @. Tente: nome@exemplo.com"

**Princípios**:
- Explique o que deu errado em linguagem simples
- Sugira como corrigir
- Não culpe o usuário
- Inclua exemplos quando útil
- Link para ajuda/suporte se aplicável

### Rótulos e Instruções de Formulário
**Ruim**: "Data de nasc. (DD/MM/AAAA)"
**Bom**: "Data de nascimento" (com placeholder mostrando o formato)

**Ruim**: "Digite o valor aqui"
**Bom**: "Seu endereço de email" ou "Nome da empresa"

**Princípios**:
- Use rótulos claros e específicos (não placeholders genéricos)
- Mostre expectativas de formato com exemplos
- Explique por que está perguntando (quando não for óbvio)
- Coloque instruções antes do campo, não depois
- Mantenha indicadores de campo obrigatório claros

### Texto de Botões e CTAs
**Ruim**: "Clique aqui" | "Enviar" | "OK"
**Bom**: "Criar conta" | "Salvar alterações" | "Entendi, obrigado"

**Princípios**:
- Descreva a ação especificamente
- Use voz ativa (verbo + substantivo)
- Correspond ao modelo mental do usuário
- Seja específico ("Salvar" é melhor que "OK")

### Texto de Ajuda e Tooltips
**Ruim**: "Este é o campo de nome de usuário"
**Bom**: "Escolha um nome de usuário. Você pode alterar isso depois em Configurações."

**Princípios**:
- Adicione valor (não apenas repita o rótulo)
- Responda à pergunta implícita ("O que é isso?" ou "Por que você precisa disso?")
- Mantenha breve, mas completo
- Link para documentação detalhada se necessário

### Estados Vazios
**Ruim**: "Nenhum item"
**Bom**: "Nenhum projeto ainda. Crie seu primeiro projeto para começar."

**Princípios**:
- Explique por que está vazio (se não for óbvio)
- Mostre claramente a próxima ação
- Torne acolhedor, não um beco sem saída

### Mensagens de Sucesso
**Ruim**: "Sucesso"
**Bom**: "Configurações salvas! Suas alterações entrarão em vigor imediatamente."

**Princípios**:
- Confirme o que aconteceu
- Explique o que acontece a seguir (se relevante)
- Seja breve, mas completo
- Correspond ao momento emocional do usuário (celebre grandes conquistas)

### Estados de Carregamento
**Ruim**: "Carregando..." (por 30+ segundos)
**Bom**: "Analisando seus dados... isso geralmente leva de 30 a 60 segundos"

**Princípios**:
- Defina expectativas (quanto tempo?)
- Explique o que está acontecendo (quando não for óbvio)
- Mostre progresso quando possível
- Ofereça saída se apropriado ("Cancelar")

### Diálogos de Confirmação
**Ruim**: "Tem certeza?"
**Bom**: "Excluir 'Projeto Alpha'? Isso não pode ser desfeito."

**Princípios**:
- Declare a ação específica
- Explique as consequências (especialmente para ações destrutivas)
- Use rótulos de botão claros ("Excluir projeto" não "Sim")
- Não exagere nas confirmações (apenas para ações arriscadas)

### Navegação e Orientação
**Ruim**: Rótulos genéricos como "Itens" | "Coisas" | "Treco"
**Bom**: Rótulos específicos como "Seus projetos" | "Membros da equipe" | "Configurações"

**Princípios**:
- Seja específico e descritivo
- Use linguagem que os usuários entendem (não jargão interno)
- Torne a hierarquia clara
- Considere a trilha de informação (breadcrumbs, localização atual)

## Aplique os Princípios de Clareza

Cada trecho de texto deve seguir estas regras:

1. **Seja específico**: "Digite o email" não "Digite o valor"
2. **Seja conciso**: Corte palavras desnecessárias (mas não sacrifique a clareza)
3. **Seja ativo**: "Salvar alterações" não "Alterações serão salvas"
4. **Seja humano**: "Ops, algo deu errado" não "Erro de sistema encontrado"
5. **Diga aos usuários o que fazer**, não apenas o que aconteceu
6. **Seja consistente**: Use os mesmos termos ao longo (não varie por variedade)

**NUNCA**:
- Use jargão sem explicação
- Culpe os usuários ("Você cometeu um erro" → "Este campo é obrigatório")
- Seja vago ("Algo deu errado" sem explicação)
- Use voz passiva desnecessariamente
- Escreva explicações excessivamente longas (seja conciso)
- Use humor para erros (seja empático em vez disso)
- Presuma conhecimento técnico
- Varie a terminologia (escolha um termo e mantenha-o)
- Repita informação (headers reafirmando introduções, explicações redundantes)
- Use placeholders como únicos rótulos (eles desaparecem quando os usuários digitam)

## Verifique as Melhorias

Teste se as melhorias de texto funcionam:

- **Compreensão**: Os usuários conseguem entender sem contexto?
- **Acionabilidade**: Os usuários sabem o que fazer a seguir?
- **Concisão**: Está o mais curto possível mantendo a clareza?
- **Consistência**: Correspond à terminologia usada em outros lugares?
- **Tom**: É apropriado para a situação?

Quando o texto fluir de forma limpa, passe para `{{command_prefix}}impeccable polish` para a revisão final.
