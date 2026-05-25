---
tagline: "Desenhe experiências de first-run, empty states e caminhos para o valor."
---

## Quando usar

`/impeccable onboard` é para os momentos que decidem se um novo usuário fica ou vai: a primeira tela, o empty state, o fluxo de configuração, o tour do produto, o gap "o que eu faço agora". Use quando a ativação é fraca, quando novos usuários caem antes de alcançar o valor, ou quando seu produto tem empty states que dizem "nenhum item ainda" e param por aí.

## Como funciona

O comando parte de uma pergunta: qual é o momento aha, e quão rápido um novo usuário pode chegar lá. Toda decisão de design aponta para esse momento.

Ele trabalha nas superfícies que moldam primeiras impressões:

1. **Experiência de first-run**: os momentos imediatamente após o sign-up. O usuário deveria ver um tour, um canvas vazio, um exemplo preenchido, ou nada. Escolha a abordagem que combina com o produto.
2. **Empty states**: toda tela com zero dados é orientada. Onde estou, por que está vazio, o que faço agora, como vai parecer quando estiver cheio.
3. **Setup e instalação**: configuração obrigatória é minimizada, defaults são inteligentes, cada passo explica por que importa.
4. **Progressive disclosure**: funcionalidades avançadas ficam fora do caminho até serem merecidas.
5. **Eventos de ativação**: o momento em que um usuário experimenta o valor principal pela primeira vez é instrumentado e celebrado, discretamente.

O comando resiste a dois modos de falha comuns: onboarding super-tutorializado onde usuários clicam através de um carrossel antes de poder tocar em qualquer coisa, e zero-onboarding onde usuários são jogados em um app vazio e esperados que descubram sozinhos.

## Experimente

```
/impeccable onboard the editor
```

Saída típica:

- First-run: substitui editor vazio por um documento de exemplo preenchido que o usuário pode modificar. Botão Cancel descarta o exemplo, editar substitui o conteúdo pelo trabalho do usuário.
- Empty state na lista de documentos: "Nenhum documento ainda. Crie seu primeiro, ou importe do Notion, Google Docs, ou Markdown."
- Setup: reduzido de 6 campos obrigatórios para 1 (nome do workspace). Todo o resto tem um default inteligente e pode ser editado depois nas configurações.
- Ativação: a primeira vez que um usuário salva um documento, um toast discreto diz "Salvo. Seu trabalho está na nuvem agora." Único, não repetido.

## Armadilhas

- **Adicionar um tour do produto como resposta padrão.** A maioria dos produtos não precisa de um tour. Precisam de uma melhor primeira tela. Tours são muletas.
- **Desenhar onboarding sem definir o momento aha.** Se você não consegue dizer em uma frase o que o usuário deveria sentir nos primeiros 60 segundos, volte para `/impeccable shape` primeiro.
- **Executar onboard em um fluxo quebrado.** Conserte o fluxo primeiro. Onboarding não pode resgatar um produto onde a ação principal está quebrada.
