---
tagline: "Reescreva UX copy confusa para que interfaces se expliquem sozinhas."
---

## Quando usar

`/impeccable clarify` é para texto de interface que faz as pessoas parar e pensar. Labels confusas, copy de botão ambígua, mensagens de erro que culpam o usuário, tooltips que repetem o label, empty states que não dizem nada útil. Use quando o problema não é o layout ou a cor, são as palavras.

Bons gatilhos: "usuários não entendem este campo", "a mensagem de erro não é útil", "não consigo escrever bom copy de botão", "este tooltip é desperdício".

## Como funciona

A skill reescreve texto nas superfícies onde a maioria dos problemas de UX copy mora:

1. **Labels e dicas de campo**: diretas, específicas, dizem o que é esperado.
2. **Copy de botão**: verbo primeiro, descreve o resultado, não a ação. "Salvar alterações" não "OK".
3. **Mensagens de erro**: explicam o que deu errado, de quem é a culpa, e o que fazer a seguir. Nunca culpe o usuário.
4. **Empty states**: orientam o usuário, explicam por que o estado está vazio, oferecem um próximo passo.
5. **Tooltips e texto de ajuda**: adicionam informação que o label não pode carregar, nunca o reafirmam.
6. **Diálogos de confirmação**: nomeiam as consequências, não a ação.

A skill usa o público e estado mental de `PRODUCT.md` para ajustar a voz. Público técnico recebe linguagem precisa. Público consumidor recebe fala simples. Usuários apressados recebem texto curto. Usuários ansiosos (pagamento, exclusão) recebem tranquilização.

## Experimente

```
/impeccable clarify the billing form
```

Antes e depois, típico:

- Label "Billing address" → "Endereço no seu cartão"
- Placeholder "Enter your VAT ID" → "VAT ID (opcional, para empresas)"
- Error "Invalid input" → "Este número de cartão tem 15 dígitos. Você digitou 14."
- Button "Submit" → "Cobrar $29 e assinar"
- Empty state "No transactions yet" → "Sua primeira cobrança aparecerá aqui após seu primeiro pedido."

## Armadilhas

- **Escrever de forma mais esperta, não mais clara.** Clarify não é para upgrades de voz. Se o copy já está claro, não use esta skill. Use `/impeccable delight` quando quiser personalidade.
- **Pular a pergunta sobre público.** Clarify precisa saber quem está lendo. Se `PRODUCT.md` não especifica o nível técnico do público, as reescritas serão genéricas.
- **Executar clarify em copy de marketing.** Clarify é para texto funcional de UX: labels, erros, instruções. Copy de marketing precisa de um conjunto diferente de movimentos e um escritor humano.
