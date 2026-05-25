---
tagline: "Reduza o tom de designs que estão gritando sem perder sua intenção."
---

## Quando usar

`/impeccable quieter` é o contrapeso de `/impeccable bolder`. Use quando uma interface está visualmente agressiva, superestimulante, ou tentando fazer muitas coisas em volume máximo. Neon no dark, texto com gradiente por toda parte, 6 cores de destaque, tudo animado, sombras de 20px. Use quieter quando o design precisa respirar e você quer refinamento sem perder o ponto de vista.

Também útil depois que `/impeccable bolder` foi um pouco longe demais.

## Como funciona

A skill trabalha por redução em quatro eixos:

1. **Cor**: dessaturar, reduzir chroma no OKLCH, recuar os acentos para um primário único mais suportes abafados. No máximo duas cores intencionais.
2. **Contraste**: suavizar escuros e claros extremos, recuar a faixa. Fundos passam de branco puro e preto puro para papel e tinta.
3. **Decoração**: remover sombras que não estão fazendo trabalho, descartar bordas que não carregam estrutura, aposentar gradientes que existem por energia em vez de hierarquia.
4. **Motion e efeito**: desacelerar animações, remover qualquer coisa que auto-play, descartar parallax e blur a menos que sirvam à legibilidade.

A skill preserva a intenção do design. Se o original tinha um ponto de vista, a versão quieter tem o mesmo ponto de vista com mais confiança. Refinamento, não neutralização.

## Experimente

```
/impeccable quieter the pricing page
```

Diff típico:

- Texto com gradiente no preço removido, substituído por tinta sólida um peso mais pesado
- Três cores de destaque reduzidas a uma (magenta), as outras duas viram variantes neutras
- Sombras dos cards reduzidas de `0 20px 40px rgba(0,0,0,0.2)` para `0 1px 0 var(--color-mist)` (uma hairline)
- Fundo muda de gradiente escuro para papel com um leve lavado cremoso no topo
- Animação do hero de 1.2s easeOut com 3 elementos escalonados para um único fade-in de 260ms

## Armadilhas

- **Aplicar em excesso.** Quieter pode retirar personalidade se você rodar em algo que já era medido. Use quando o design está alto demais, não quando está corretamente assertivo.
- **Confundir quieter com distill.** Quieter reduz intensidade. Distill remove elementos. São movimentos diferentes.
- **Executar em resposta a uma crítica que diz "muito ocupado".** Ocupado geralmente significa muitas coisas, não muito alto. Tente `/impeccable distill` primeiro.
