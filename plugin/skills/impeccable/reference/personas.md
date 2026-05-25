# Teste de Design Baseado em Personas

Teste a interface pelos olhos de 5 arquétipos distintos de usuários. Cada persona expõe diferentes modos de falha que uma única perspectiva de "diretor de design" perderia.

**Como usar**: Selecione 2–3 personas mais relevantes para a interface sendo avaliada. Percorra a ação primária do usuário como cada persona. Reporte bandeiras vermelhas específicas, não preocupações genéricas.

---

## 1. Usuário Avançado Impaciente: "Alex"


**Perfil**: Especialista com produtos similares. Espera eficiência, odeia tutoriais. Vai encontrar atalhos ou sair.

**Comportamentos**:
- Pula todo onboarding e instruções
- Procura atalhos de teclado imediatamente
- Tenta selecionar em lote, editar em batch, e automatizar
- Fica frustrado com passos obrigatórios que parecem desnecessários
- Abandona se qualquer coisa parecer lenta ou condescendente

**Perguntas de Teste**:
- Alex consegue completar a tarefa central em menos de 60 segundos?
- Existem atalhos de teclado para ações comuns?
- O onboarding pode ser pulado inteiramente?
- Modais têm dismiss por teclado (Esc)?
- Existe um caminho de "usuário avançado" (atalhos, ações em lote)?

**Bandeiras Vermelhas** (reporte estas especificamente):
- Tutoriais forçados ou onboarding inpulável
- Sem navegação por teclado para ações primárias
- Animações lentas que não podem ser puladas
- Fluxos de trabalho item-por-item onde lote seria natural
- Passos de confirmação redundantes para ações de baixo risco

---

## 2. Iniciante Confuso: "Jordan"

**Perfil**: Nunca usou este tipo de produto. Precisa de orientação em cada passo. Vai abandonar em vez de tentar descobrir.

**Comportamentos**:
- Lê todas as instruções cuidadosamente
- Hesita antes de clicar em qualquer coisa desconhecida
- Procura ajuda ou suporte constantemente
- Interpreta mal jargão e abreviações
- Faz a interpretação mais literal de qualquer rótulo

**Perguntas de Teste**:
- A primeira ação está obviamente clara em 5 segundos?
- Todos os ícones estão rotulados com texto?
- Existe ajuda contextual nos pontos de decisão?
- A terminologia presume conhecimento prévio?
- Existe um "voltar" ou "desfazer" claro em cada passo?

**Bandeiras Vermelhas** (reporte estas especificamente):
- Navegação apenas com ícones sem rótulos
- Jargão técnico sem explicação
- Sem opção de ajuda ou orientação visível
- Próximos passos ambíguos após completar uma ação
- Sem confirmação de que uma ação teve sucesso

---

## 3. Usuário Dependente de Acessibilidade: "Sam"

**Perfil**: Usa leitor de tela (VoiceOver/NVDA), navegação apenas por teclado. Pode ter baixa visão, deficiência motora, ou diferenças cognitivas.

**Comportamentos**:
- Navega pela interface linearmente usando Tab
- Depende de rótulos ARIA e estrutura de headings
- Não consegue ver estados de hover ou indicadores apenas visuais
- Precisa de contraste de cor adequado (4.5:1 mínimo)
- Pode usar zoom do navegador até 200%

**Perguntas de Teste**:
- O fluxo primário inteiro pode ser completado apenas com teclado?
- Todos os elementos interativos são focáveis com indicadores de foco visíveis?
- As imagens têm texto alt significativo?
- O contraste de cor está em conformidade com WCAG AA (4.5:1 para texto)?
- O leitor de tela anuncia mudanças de estado (carregamento, sucesso, erros)?

**Bandeiras Vermelhas** (reporte estas especificamente):
- Interações apenas por clique sem alternativa de teclado
- Indicadores de foco ausentes ou invisíveis
- Significado transmitido apenas por cor (vermelho = erro, verde = sucesso)
- Campos de formulário ou botões sem rótulo
- Ações com limite de tempo sem opção de extensão
- Componentes customizados que quebram o fluxo do leitor de tela

---

## 4. Testador de Stress Deliberado: "Riley"

**Perfil**: Usuário metódico que empurra interfaces além do caminho feliz. Testa casos extremos, tenta entradas inesperadas, e investiga lacunas na experiência.

**Comportamentos**:
- Testa casos extremos intencionalmente (estados vazios, strings longas, caracteres especiais)
- Submete formulários com dados inesperados (emoji, texto RTL, valores muito longos)
- Tenta quebrar fluxos navegando para trás, atualizando no meio do fluxo, ou abrindo em múltiplas abas
- Procura inconsistências entre o que a UI promete e o que realmente acontece
- Documenta problemas metodicamente

**Perguntas de Teste**:
- O que acontece nos limites (0 itens, 1000 itens, texto muito longo)?
- Estados de erro se recuperam graciosamente ou deixam a UI em estado quebrado?
- O que acontece ao atualizar no meio do fluxo? O estado é preservado?
- Existem funcionalidades que parecem funcionar mas produzem resultados quebrados?
- Como a UI lida com entrada inesperada (emoji, caracteres especiais, colar do Excel)?

**Bandeiras Vermelhas** (reporte estas especificamente):
- Funcionalidades que parecem funcionar mas falham silenciosamente ou produzem resultados errados
- Tratamento de erro que expõe detalhes técnicos ou deixa a UI em estado quebrado
- Estados vazios que não mostram nada útil ("Sem resultados" sem orientação)
- Fluxos de trabalho que perdem dados do usuário ao atualizar ou navegar
- Comportamento inconsistente entre interações similares em diferentes partes da UI

---

## 5. Usuário Mobile Distráído: "Casey"

**Perfil**: Usando o celular com uma mão em movimento. Frequentemente interrompido. Possivelmente em conexão lenta.

**Comportamentos**:
- Usa apenas o polegar; prefere ações na parte inferior da tela
- É interrompido no meio do fluxo e retorna depois
- Troca entre apps frequentemente
- Tem atenção limitada e baixa paciência
- Digita o mínimo possível, prefere taps e seleções

**Perguntas de Teste**:
- As ações primárias estão na zona do polegar (metade inferior da tela)?
- O estado é preservado se o usuário sai e retorna?
- Funciona em conexões lentas (3G)?
- Formulários podem usar autocomplete e padrões inteligentes?
- Os alvos de toque têm pelo menos 44×44pt?

**Bandeiras Vermelhas** (reporte estas especificamente):
- Ações importantes posicionadas no topo da tela (inalcançáveis pelo polegar)
- Sem persistência de estado; progresso perdido ao trocar de aba ou interrupção
- Grandes entradas de texto necessárias onde seleção funcionaria
- Assets pesados carregando em cada página (sem lazy loading)
- Alvos de toque minúsculos ou alvos muito próximos uns dos outros

---

## Selecionando Personas

Escolha personas com base no tipo de interface:

| Tipo de Interface | Personas Primárias | Por Quê |
|---------------|-----------------|-----|
| Landing page / marketing | Jordan, Riley, Casey | Primeiras impressões, confiança, mobile |
| Dashboard / admin | Alex, Sam | Usuários avançados, acessibilidade |
| E-commerce / checkout | Casey, Riley, Jordan | Mobile, casos extremos, clareza |
| Fluxo de onboarding | Jordan, Casey | Confusão, interrupção |
| Pesada em dados / analytics | Alex, Sam | Eficiência, navegação por teclado |
| Pesada em formulários / wizard | Jordan, Sam, Casey | Clareza, acessibilidade, mobile |

---

## Personas Específicas do Projeto

Se `{{config_file}}` contém uma seção `## Design Context` (gerada por `impeccable teach`), derive 1–2 personas adicionais a partir das informações de público e marca:

1. Leia a descrição do público-alvo
2. Identifique o arquétipo de usuário primário não coberto pelas 5 personas predefinidas
3. Crie uma persona seguindo este template:

```
### [Papel]: "[Nome]"

**Perfil**: [2-3 características-chave derivadas do Design Context]

**Comportamentos**: [3-4 comportamentos específicos baseados no público descrito]

**Bandeiras Vermelhas**: [3-4 coisas que alienariam este tipo específico de usuário]
```

Gere personas específicas do projeto apenas quando dados reais de Design Context estiverem disponíveis. Não invente detalhes de público; use as 5 personas predefinidas quando não houver contexto.
