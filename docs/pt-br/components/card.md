---
name: card
description: Agrupa conteúdo relacionado numa superfície. Pode ser um link só.
status: stable
group: molecules
html: article, h3, p, a
class: aipim-card
css: components/web/card.css
figma: Aipim DS, página Moléculas, Card
wcag: ["1.1.1 Conteúdo Não Textual", "1.3.1 Informações e Relações", "2.4.4 Finalidade do Link (Em Contexto)", "2.4.7 Foco Visível"]
related: [badge, link, button]
---

# Card

Agrupa conteúdo relacionado numa superfície. Pode ser um link só.

## Quando usar

- Para agrupar conteúdo relacionado numa superfície.
- Um card clicável, quando o bloco inteiro leva a um lugar.
- Um card com imagem, para dar ao conteúdo uma âncora visual.

## Quando não usar

- Para tudo: nem todo bloco precisa de card.
- Card dentro de card: use espaço em vez disso.
- Vários links ou botões disputando a atenção: escolha uma ação clara.

## Variantes e props

| Classe | O que faz |
|---|---|
| `aipim-card` | Um card estático. |
| `aipim-card--primary`, `--secondary`, `--tertiary`, `--success` | Tom. Preenche o card com uma cor viva (urucum, azul azulejo, amarelo cajá, verde folha), sem borda visível. Sem tom, o card é uma superfície. Combina com `--interactive`. |
| `aipim-card--interactive` | O card inteiro leva a um lugar. Ele ganha sombra no hover e anel de foco no card. |
| `aipim-card__media` | Área de imagem opcional no topo, com 160px de altura. Coloque um `img` dentro, ou um ícone como placeholder. |
| `aipim-card__body` | Guarda as partes de texto. |
| `aipim-card__header` | Opcional. Uma linha com até dois extras em volta do título: um [badge](badge.md) antes dele e um sobretítulo acima. Ficam centralizados na vertical. |
| `aipim-card__heading` | Dentro do header, guarda o sobretítulo e o título. Ocupa o espaço livre, e o título quebra linha, para o badge manter o tamanho. |
| `aipim-card__eyebrow` | Rótulo pequeno opcional acima do título, em `Aipim/overline`. Uma categoria, um passo ou uma etapa. |
| `aipim-card__title` | `Aipim/h4`. |
| `aipim-card__text` | Uma descrição curta em `Aipim/body`. |
| `aipim-card__action` | Um rótulo com cara de link, como Saiba mais. É só um rótulo: o link é o card. |
| `aipim-card__link` | O único link, dentro do título. O `::after` dele cobre o card, então o card é uma parada de foco só. |

## Estados

- **Estático:** sem estados.
- **Interativo:** o hover mostra a sombra `raised`. O foco mostra um anel de 3px em volta do card inteiro, a 3px de distância (`focus/ring`, `focus/offset`), só no foco por teclado.

## Tokens usados

| Onde | Estado | Token | Claro | Escuro |
|---|---|---|---|---|
| Preenchimento da superfície | Todos | `bg/surface` | #FDF9F6 | #302A25 |
| Borda | Todos | `border/subtle` | #DAD1CA | #4A423C |
| Preenchimento do placeholder da mídia | Todos | `bg/sunken` | #ECE5DF | #0E0A07 |
| Ícone do placeholder da mídia | Todos | `text/muted` | #665D56 | #DAD1CA |
| Título | Todos | `text/primary` | #1A1511 | #FDF9F6 |
| Texto | Todos | `text/secondary` | #4A423C | #ECE5DF |
| Rótulo da ação | Padrão | `link` | #014B95 | #8CBEFE |
| Sobretítulo | Todos | `text/muted` | #665D56 | #DAD1CA |
| Sobretítulo num tom | Todos | `tint/text/muted` | #4A423C | #ECE5DF |
| Preenchimento do tom: primary, secondary, tertiary, success | Todos | `tint/primary`, `tint/secondary`, `tint/tertiary`, `tint/success` | #FEBBA9, #AED1FE, #FFD337, #A0DFB5 | #892402, #014B95, #5E4B03, #025D33 |
| Título e rótulo da ação num tom | Todos | `tint/text` | #1A1511 | #FDF9F6 |
| Texto num tom | Todos | `tint/text/muted` | #4A423C | #ECE5DF |
| Preenchimento do placeholder da mídia num tom | Todos | `tint/text` a 10% | #1A1511 a 10% | #FDF9F6 a 10% |
| Ícone do placeholder da mídia num tom | Todos | `tint/text/muted` | #4A423C | #ECE5DF |
| Anel de foco | Foco | `focus/ring` | #0364C2 | #AED1FE |

| Medida | Token | Valor |
|---|---|---|
| Padding, todos os lados | `space-role/inset-lg` | 24 |
| Espaço entre as partes de texto | `space/12` | 12 |
| Espaço entre badge e texto (header) | `space/16` | 16 |
| Espaço entre sobretítulo e título | `space/4` | 4 |
| Altura da mídia | Sem token | 160 |
| Tamanho do ícone da mídia | `size/icon-lg` | 24 |
| Raio dos cantos | `radius/xl` | 16 |
| Largura da borda | `border/thin` | 1 |
| Tipografia do título | `Aipim/h4` | 24 SemiBold |
| Tipografia do texto | `Aipim/body` | 16/24 Regular |
| Tipografia do sobretítulo | `Aipim/overline` | 12/18 Bold, caixa-alta |
| Tipografia do rótulo da ação | `Aipim/label` | 16/20 Bold, sublinhado |
| Sombra no hover (interativo) | `Aipim/elevation/raised` | 0 4 12 -2 a 12%, 0 2 4 -1 a 6% (claro). 50% e 30% no escuro. |

As medidas valem a partir da borda externa: no código, a borda de 1px sai de dentro do padding e da altura da mídia. O card ocupa a largura do contêiner.

## Acessibilidade

- O título é um cabeçalho no nível certo. Coloque o link dentro do cabeçalho.
- O card inteiro é um link. Nunca coloque botões ou links dentro de um card interativo.
- Um card clicável é uma parada de foco só, no link do título. Enter aciona o card.
- Imagens só decorativas têm `alt` vazio.
- Um badge no header é decorativo: `aria-hidden="true"`, e o título diz o que é o card. Num tom, use o badge filled, porque o badge tint some sobre uma cor viva.
- O sobretítulo é um `p` antes do cabeçalho, não um cabeçalho.
- Badge e sobretítulo funcionam juntos. Mantenha o título curto, porque ele quebra linha quando o badge ocupa o espaço dele.
- O card tem badge ou não tem; tag no card não existe. Para um status, escreva a palavra no texto ou use o tom.
- Num tom, o título atende contraste AAA e o texto atende AA sobre a cor viva, nos dois temas (veja os pares na página de cor). O rótulo da ação segue a cor do título, e não a cor de link, que não é testada sobre cores vivas.
- Um tom é decoração e ênfase, nunca a única forma de distinguir os cards: o título e o texto dizem o que é cada um.

## Exemplos de código

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">

<!-- Estático -->
<article class="aipim-card">
  <div class="aipim-card__body">
    <h3 class="aipim-card__title">Título do card</h3>
    <p class="aipim-card__text">Uma descrição curta do que tem neste card.</p>
  </div>
</article>

<!-- Interativo, com mídia -->
<article class="aipim-card aipim-card--interactive">
  <div class="aipim-card__media"><img src="cover.jpg" alt=""></div>
  <div class="aipim-card__body">
    <h3 class="aipim-card__title"><a class="aipim-card__link" href="/saiba-mais">Título do card</a></h3>
    <p class="aipim-card__text">Uma descrição curta do que tem neste card.</p>
    <span class="aipim-card__action">Saiba mais</span>
  </div>
</article>

<!-- Header com badge e sobretítulo -->
<article class="aipim-card">
  <div class="aipim-card__body">
    <div class="aipim-card__header">
      <span class="aipim-badge aipim-badge--tint aipim-badge--square" aria-hidden="true">
        <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-info"></use></svg>
      </span>
      <div class="aipim-card__heading">
        <p class="aipim-card__eyebrow">Começo</p>
        <h3 class="aipim-card__title">Título do card</h3>
      </div>
    </div>
    <p class="aipim-card__text">Uma descrição curta do que tem neste card.</p>
  </div>
</article>

<!-- Tom -->
<article class="aipim-card aipim-card--tertiary">
  <div class="aipim-card__body">
    <h3 class="aipim-card__title">Título do card</h3>
    <p class="aipim-card__text">Uma descrição curta do que tem neste card.</p>
  </div>
</article>
```

## Faça e não faça

- Faça: uma ação clara para o card inteiro.
- Não faça: card dentro de card. Só aumenta o ruído; use espaço em vez disso.

<!-- Translated from docs/en/components/card.md, sha256 bb712886e0de -->
