# Avaliação de Carga Cognitiva

Carga cognitiva é o esforço mental total necessário para usar uma interface. Usuários sobrecarregados cometem erros, ficam frustrados e abandonam. Esta referência ajuda a identificar e corrigir a sobrecarga cognitiva.

---

## Três Tipos de Carga Cognitiva

### Carga Intrínseca: A Tarefa em Si
Complexidade inerente ao que o usuário está tentando fazer. Você não pode eliminá-la, mas pode estruturá-la.

**Gerencie-a**:
- Dividindo tarefas complexas em etapas discretas
- Fornecendo scaffolding (templates, padrões, exemplos)
- Revelação progressiva: mostre o que é necessário agora, oculte o resto
- Agrupando decisões relacionadas

### Carga Extrínseca: Design Ruim
Esforço mental causado por escolhas ruins de design. **Elimine-a implacavelmente.** É puro desperdício.

**Fontes comuns**:
- Navegação confusa que exige mapeamento mental
- Rótulos obscuros que forçam os usuários a adivinhar o significado
- Desordem visual competindo por atenção
- Padrões inconsistentes que impedem o aprendizado
- Etapas desnecessárias entre a intenção do usuário e o resultado

### Carga Germinal: Esforço de Aprendizado
Esforço mental gasto na construção de compreensão. Esta é uma carga cognitiva *boa*; leva à maestria.

**Apoie-a**:
- Revelação progressiva que revela complexidade gradualmente
- Padrões consistentes que recompensam o aprendizado
- Feedback que confirma a compreensão correta
- Onboarding que ensina pela ação, não por muros de texto

---

## Checklist de Carga Cognitiva

Avalie a interface contra estes 8 itens:

- [ ] **Foco único**: O usuário consegue completar sua tarefa primária sem distração de elementos competidores?
- [ ] **Agrupamento**: A informação é apresentada em grupos digestíveis (≤4 itens por grupo)?
- [ ] **Agrupamento visual**: Itens relacionados estão agrupados visualmente (proximidade, bordas, fundo compartilhado)?
- [ ] **Hierarquia visual**: Está imediatamente claro o que é mais importante na tela?
- [ ] **Uma coisa de cada vez**: O usuário consegue focar em uma única decisão antes de passar para a próxima?
- [ ] **Escolhas mínimas**: As decisões estão simplificadas (≤4 opções visíveis em qualquer ponto de decisão)?
- [ ] **Memória de trabalho**: O usuário precisa lembrar informação de uma tela anterior para agir na atual?
- [ ] **Revelação progressiva**: A complexidade é revelada apenas quando o usuário precisa?

**Pontuação**: Conte os itens falhos. 0–1 falhas = carga cognitiva baixa (bom). 2–3 = moderada (resolva em breve). 4+ = carga cognitiva alta (correção crítica necessária).

---

## A Regra da Memória de Trabalho

**Humanos conseguem manter ≤4 itens na memória de trabalho ao mesmo tempo** (Lei de Miller revisada por Cowan, 2001).

Em qualquer ponto de decisão, conte o número de opções, ações ou informações distintas que um usuário deve considerar simultaneamente:
- **≤4 itens**: Dentro dos limites da memória de trabalho, gerenciável
- **5–7 itens**: No limite; considere agrupamento ou revelação progressiva
- **8+ itens**: Sobrecarregado; os usuários vão pular, clicar errado ou abandonar

**Aplicações práticas**:
- Menus de navegação: ≤5 itens de nível superior (agrupe o resto sob categorias claras)
- Seções de formulário: ≤4 campos visíveis por grupo antes de uma pausa visual
- Botões de ação: 1 primário, 1–2 secundários, agrupe o resto em um menu
- Widgets de dashboard: ≤4 métricas-chave visíveis sem scroll
- Faixas de preço: ≤3 opções (mais causa paralisia de análise)

---

## Violações Comuns de Carga Cognitiva

### 1. O Muro de Opções
**Problema**: Apresentar 10+ opções de uma vez sem hierarquia.
**Solução**: Agrupe em categorias, destaque a recomendada, use revelação progressiva.

### 2. A Ponte de Memória
**Problema**: O usuário precisa lembrar informação da etapa 1 para completar a etapa 3.
**Solução**: Mantenha o contexto relevante visível, ou repita-o onde for necessário.

### 3. A Navegação Oculta
**Problema**: O usuário precisa construir um mapa mental de onde as coisas estão.
**Solução**: Sempre mostre a localização atual (breadcrumbs, estados ativos, indicadores de progresso).

### 4. A Barreira do Jargão
**Problema**: Linguagem técnica ou de domínio força esforço de tradução.
**Solução**: Use linguagem simples. Se termos de domínio são inevitáveis, defina-os inline.

### 5. O Ruído Visual de Fundo
**Problema**: Todo elemento tem o mesmo peso visual; nada se destaca.
**Solução**: Estabeleça hierarquia clara: um elemento primário, 2–3 secundários, todo o resto atenuado.

### 6. O Padrão Inconsistente
**Problema**: Ações similares funcionam de formas diferentes em lugares diferentes.
**Solução**: Padronize padrões de interação. Mesmo tipo de ação = mesmo tipo de UI.

### 7. A Exigência de Multitarefa
**Problema**: A interface exige processamento de múltiplas entradas simultâneas (ler + decidir + navegar).
**Solução**: Sequencie as etapas. Deixe o usuário fazer uma coisa de cada vez.

### 8. A Troca de Contexto
**Problema**: O usuário precisa saltar entre telas/tabs/modais para reunir informação para uma única decisão.
**Solução**: Co-localize a informação necessária para cada decisão. Reduza o vai-e-vem.
