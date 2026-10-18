---
name: top-bar
description: O título de uma tela, com um botão de voltar e até duas ações.
status: stable
group: organisms
html: header, h1, a, button
class: aipim-top-bar
css: components/web/top-bar.css
figma: Aipim DS, página Organismos, Top bar
wcag: ["1.3.1 Informações e Relações", "2.4.7 Foco Visível", "2.5.8 Tamanho do Alvo (Mínimo)", "4.1.2 Nome, Função, Valor"]
related: [tab-bar, icon-button]
---

# Top bar

O título de uma tela, com um botão de voltar e até duas ações.

## Quando usar

- Para o título de uma tela e as ações principais dela.
- Uma top bar por tela.
- Um botão de voltar quando a tela faz parte de um fluxo.

## Quando não usar

- Para ir de uma seção principal a outra: use a [tab bar](tab-bar.md).
- Para títulos de página longos: encurte o título e ponha os detalhes na página.

## Variantes e props

| Classe | O que faz |
|---|---|
| `aipim-top-bar` | A barra: preenchimento de superfície e uma borda embaixo. |
| `aipim-top-bar--scrolled` | Acrescenta a sombra `raised`. Use enquanto o conteúdo rola por baixo da barra. |
| `aipim-icon-button` | O botão de voltar e as ações: [icon buttons](icon-button.md) médios (44px). No máximo duas ações. |
| `aipim-top-bar__title` | O título da tela em `Aipim/h4`. Ocupa o espaço livre. |

## Estados

A barra fica no estado padrão ou com rolagem. Os botões seguem o [icon button](icon-button.md): preenchimento `bg/sunken` no hover e no pressionado, e o anel de foco (3px, `focus/ring`, a 3px de distância) só no foco por teclado.

## Tokens usados

| Onde | Estado | Token | Claro | Escuro |
|---|---|---|---|---|
| Preenchimento da barra | Todos | `bg/surface` | #FDF9F6 | #302A25 |
| Borda de baixo | Todos | `border/subtle` | #DAD1CA | #4A423C |
| Título | Todos | `text/primary` | #1A1511 | #FDF9F6 |
| Ícones do botão de voltar e das ações | Todos | `text/primary` | #1A1511 | #FDF9F6 |
| Preenchimento do botão de voltar e das ações | Hover e pressionado | `bg/sunken` | #ECE5DF | #0E0A07 |
| Anel de foco | Foco | `focus/ring` | #0364C2 | #AED1FE |

| Medida | Token | Valor |
|---|---|---|
| Padding vertical | `space/8` | 8 |
| Padding horizontal | `space/16` | 16 |
| Espaço entre os itens | `space/8` | 8 |
| Altura da barra | Padding mais o alvo de 44px | 60 |
| Tamanho do alvo dos botões | `size/touch-comfortable` | 44 |
| Raio dos cantos dos botões | `radius/md` | 8 |
| Tamanho do ícone | `size/icon-lg` | 24 |
| Tipografia do título | `Aipim/h4` | 24 SemiBold |
| Largura da borda de baixo | `border/thin` | 1 |
| Sombra com rolagem | `Aipim/elevation/raised` | 0 4 12 -2 a 12%, 0 2 4 -1 a 6% (claro). 50% e 30% no escuro. |

A borda de baixo é uma sombra interna, então não soma nada aos 60px de altura. Os botões têm 44px e atendem tanto `size/touch-min` quanto `size/touch-comfortable`.

## Acessibilidade

- Use o elemento `header`, com o título como cabeçalho.
- O botão de voltar tem um `aria-label`, como "Voltar". Cada ação só com ícone tem um `aria-label` que diz o que ela faz.
- Ordem de foco: o botão de voltar, depois as ações da esquerda para a direita. O título não recebe foco.
- Enter e Espaço acionam os botões. Use `a` para um botão que leva a outra página.

## Exemplos de código

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">

<header class="aipim-top-bar">
  <a class="aipim-icon-button" href="/inbox" aria-label="Voltar">
    <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-arrow-left"></use></svg>
  </a>
  <h1 class="aipim-top-bar__title">Mensagens</h1>
  <button class="aipim-icon-button" type="button" aria-label="Buscar">
    <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-search"></use></svg>
  </button>
</header>
```

## Faça e não faça

- Faça: um título curto e no máximo duas ações ("Mensagens").
- Não faça: um título longo ("Relatório trimestral da região Norte"), que quebra linha e empurra o layout para baixo.

<!-- Translated from docs/en/components/top-bar.md, sha256 690fe7c66398 -->
