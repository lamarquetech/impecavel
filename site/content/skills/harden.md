---
tagline: "Torne interfaces prontas para produção. Edge cases, i18n, estados de erro, overflow."
---

## Quando usar

`/impeccable harden` é para o dia em que sua interface encontra a realidade. Dados reais de usuários são bagunçados: nomes com 60 caracteres, títulos de produtos em alemão, preços na casa dos bilhões, erros 500, modos offline, texto right-to-left. Designs que só funcionam com dados perfeitos não estão prontos para produção.

Use antes do lançamento, antes de abrir para um novo mercado, ou qualquer hora que um bug report comece com "nosso usuário tinha um nome muito longo e". Para fluxos de first-run, ativação de empty-state e design de onboarding, use `/impeccable onboard`.

## Como funciona

A skill trabalha em quatro dimensões de resiliência no mundo real:

1. **Extremos de texto e dados**. Texto longo, texto curto, caracteres especiais, emoji, RTL, números na casa dos bilhões, listas com 1000 itens.
2. **Cenários de erro**. Falhas de rede, API 4xx/5xx, erros de validação, erros de permissão, rate limits, operações concorrentes.
3. **Internacionalização**. Traduções longas (alemão é frequentemente 30% mais longo que inglês), idiomas RTL, formatos de data e número, símbolos de moeda, conjuntos de caracteres.
4. **Dispositivo e contexto**. Touch targets, comportamento offline, conexões lentas, modo de baixo consumo.

Para cada dimensão, ela identifica o modo de falha e então aplica a correção concreta: tratamento de overflow, UI de erro informativa, layouts seguros para i18n, pluralização, fallbacks sensatos.

## Experimente

Comece com uma página e uma dimensão:

```
/impeccable harden the user profile page for long names
```

Saída esperada:

- `.user-name` agora tem `text-overflow: ellipsis` com um tooltip para o valor completo
- `.bio` trocou de altura fixa para `max-height` com disclosure "mostrar mais"
- Adicionado empty state para usuários sem bio
- Adicionado skeleton loader para o fetch assíncrono do avatar
- Testado em comprimentos de nome de 1, 20, 60, 200 caracteres

Execute por página, não tudo de uma vez. A primeira execução é a maior; execuções subsequentes encontram menos problemas à medida que padrões se solidificam.

## Armadilhas

- **Esperar por um bug report.** Harden é preventivo. Se você se pegar corrigindo a mesma classe de bug duas vezes, execute `/impeccable harden` na funcionalidade.
- **Tratar estados de erro e empty states como afterthought.** A maioria do trabalho de hardening é UI de erro e empty state. Reserve tempo para isso, não apenas um bloco `catch`.
- **Pular i18n porque "somos apenas em inglês por enquanto".** Layouts seguros para i18n ainda são layouts melhores. Containers flexíveis, quebra de texto adequada, line-height generoso. Nada disso prejudica o inglês.
