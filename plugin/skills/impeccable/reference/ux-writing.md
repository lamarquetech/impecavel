# Redação de UX

## O Problema dos Rótulos de Botão

**Nunca use "OK", "Submit" ou "Sim/Não".** Estes são preguiçosos e ambíguos. Use padrões de verbo + objeto específicos:

| Ruim | Bom | Por Que |
|------|-----|---------|
| OK | Salvar alterações | Diz o que vai acontecer |
| Submit | Criar conta | Focado no resultado |
| Sim | Excluir mensagem | Confirma a ação |
| Cancelar | Continuar editando | Esclarece o que "cancelar" significa |
| Clique aqui | Baixar PDF | Descreve o destino |

**Para ações destrutivas**, nomeie a destruição:
- "Excluir" não "Remover" (excluir é permanente, remover implica recuperável)
- "Excluir 5 itens" não "Excluir selecionados" (mostre a contagem)

## Mensagens de Erro: A Fórmula

Toda mensagem de erro deve responder: (1) O que aconteceu? (2) Por quê? (3) Como corrigir? Exemplo: "O endereço de e-mail não é válido. Por favor, inclua um símbolo @." não "Entrada inválida".

### Templates de Mensagem de Erro

| Situação | Template |
|----------|----------|
| **Erro de formato** | "[Campo] precisa estar em [formato]. Exemplo: [exemplo]" |
| **Campo obrigatório ausente** | "Por favor, insira [o que está faltando]" |
| **Permissão negada** | "Você não tem acesso a [coisa]. [O que fazer em vez disso]" |
| **Erro de rede** | "Não conseguimos alcançar [coisa]. Verifique sua conexão e [ação]." |
| **Erro no servidor** | "Algo deu errado do nosso lado. Estamos investigando. [Ação alternativa]" |

### Não Culpe o Usuário

Reformule erros: "Por favor, insira uma data no formato DD/MM/AAAA" não "Você inseriu uma data inválida".

## Estados Vazios São Oportunidades

Estados vazios são momentos de onboarding: (1) Reconheça brevemente, (2) Explique o valor de preencher, (3) Forneça uma ação clara. "Nenhum projeto ainda. Crie o seu primeiro para começar." não apenas "Nenhum item".

## Voz vs Tom

**Voz** é a personalidade da sua marca, consistente em todo lugar.
**Tom** se adapta ao momento.

| Momento | Mudança de Tom |
|---------|----------------|
| Sucesso | Comemorativo, breve: "Pronto! Suas alterações estão no ar." |
| Erro | Empático, útil: "Isso não funcionou. Aqui está o que tentar..." |
| Carregamento | Tranquilizador: "Salvando seu trabalho..." |
| Confirmação destrutiva | Sério, claro: "Excluir este projeto? Isso não pode ser desfeito." |

**Nunca use humor para erros.** Usuários já estão frustrados. Seja útil, não engraçado.

## Redação para Acessibilidade

**Texto de link** deve ter significado autônomo: "Ver planos de preços" não "Clique aqui". **Alt text** descreve informação, não a imagem: "Receita aumentou 40% no Q4" não "Gráfico". Use `alt=""` para imagens decorativas. **Botões com ícone** precisam de `aria-label` para contexto de leitor de tela.

## Redação para Tradução

### Planeje para Expansão

Texto em alemão é ~30% mais longo que em inglês. Aloque espaço:

| Idioma | Expansão |
|--------|----------|
| Alemão | +30% |
| Francês | +20% |
| Finlandês | +30-40% |
| Chinês | -30% (menos caracteres, mas mesma largura) |

### Padrões Amigáveis para Tradução

Mantenha números separados ("Novas mensagens: 3" não "Você tem 3 novas mensagens"). Use frases completas como strings únicas (ordem das palavras varia por idioma). Evite abreviações ("5 minutos atrás" não "5 mins atrás"). Dê aos tradutores contexto sobre onde as strings aparecem.

## Consistência: O Problema da Terminologia

Escolha um termo e mantenha-o:

| Inconsistente | Consistente |
|---------------|-------------|
| Excluir / Remover / Lixeira | Excluir |
| Configurações / Preferências / Opções | Configurações |
| Entrar / Log in / Acessar | Entrar |
| Criar / Adicionar / Novo | Criar |

Construa um glossário de terminologia e o impeça. Variedade cria confusão.

## Evite Copy Redundante

Se o título explica, a introdução é redundante. Se o botão está claro, não explique novamente. Diga uma vez, diga bem.

## Estados de Carregamento

Seja específico: "Salvando seu rascunho..." não "Carregando...". Para esperas longas, defina expectativas ("Isso geralmente leva 30 segundos") ou mostre progresso.

## Diálogos de Confirmação: Use com Moderação

A maioria dos diálogos de confirmação são falhas de design; considere desfazer em vez disso. Quando precisar confirmar: nomeie a ação, explique consequências, use rótulos de botão específicos ("Excluir projeto" / "Manter projeto", não "Sim" / "Não").

## Instruções de Formulário

Mostre formato com placeholders, não instruções. Para campos não-óbvios, explique por que você está perguntando.

---

**Evite**: Jargão sem explicação. Culpar usuários ("Você cometeu um erro" → "Este campo é obrigatório"). Erros vagos ("Algo deu errado"). Variar terminologia por variedade. Humor para erros.
