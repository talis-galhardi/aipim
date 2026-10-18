---
name: icon-button
description: Um botão que mostra só um ícone.
status: stable
group: atoms
html: button, a
class: aipim-icon-button
css: components/web/icon-button.css
figma: Aipim DS, página Átomos, Icon button
wcag: ["1.4.11 Contraste Não Textual", "2.4.7 Foco Visível", "2.5.8 Tamanho do Alvo (Mínimo)", "4.1.2 Nome, Função, Valor"]
related: [button, top-bar, modal, toast]
---

# Icon button

Um botão que mostra só um ícone.

## Quando usar

- Para uma ação conhecida que dispensa rótulo, como fechar, voltar ou buscar.
- Em top bars, barras de ferramentas e outros lugares com pouco espaço.
- Sempre com um nome acessível, porque o ícone não tem texto.

## Quando não usar

- Para a ação principal de uma tela: use um [button](button.md) com rótulo.
- Para uma ação que as pessoas talvez não reconheçam só pelo ícone: coloque um rótulo.
- Para ir a outra página: use um [link](link.md).

## Variantes e props

| Classe | O que faz |
|---|---|
| `aipim-icon-button` | Médio: alvo de 44px com ícone de 24px. O padrão. |
| `aipim-icon-button--sm` | Pequeno: alvo de 24px com ícone de 16px. Só onde o espaço é apertado. |

Um estilo só: sem preenchimento, que aparece no hover. O ícone pode ser qualquer ícone de linha do [conjunto de ícones](../../../icons/).

Dois outros botões pequenos não são icon buttons de propósito. O botão de dispensar do Alert (`aipim-dismiss`) fica sobre uma superfície colorida, onde um hover cinza ficaria errado, e o botão de remover da Tag é redondo para acompanhar a tag.

## Estados

Padrão, hover, foco e desativado. Pressionado tem a mesma cara do hover.

- **Hover e pressionado:** um preenchimento `bg/sunken`.
- **Desativado:** o atributo nativo `disabled` (ou `aria-disabled="true"` num link). A opacidade é `opacity/disabled` (40%).
- **Foco:** um anel de 3px em `focus/ring`, a 3px de distância (`focus/offset`). Ele aparece só no foco por teclado (`:focus-visible`).

## Tokens usados

| Onde | Estado | Token | Claro | Escuro |
|---|---|---|---|---|
| Ícone | Todos | `text/primary` | #1A1511 | #FDF9F6 |
| Preenchimento do contêiner | Hover e pressionado | `bg/sunken` | #ECE5DF | #0E0A07 |
| Anel de foco | Foco | `focus/ring` | #0364C2 | #AED1FE |
| Botão inteiro | Desativado | `opacity/disabled` | 40% | 40% |

| Medida | Token | Pequeno | Médio |
|---|---|---|---|
| Tamanho (largura e altura) | `size/touch-min`, `size/touch-comfortable` | 24 | 44 |
| Tamanho do ícone | `size/icon-sm`, `size/icon-lg` | 16 | 24 |
| Padding, todos os lados | (tamanho − ícone) ÷ 2, sem token | 4 | 10 |
| Raio dos cantos | `radius/sm`, `radius/md` | 4 | 8 |
| Largura do anel de foco | `border/thick` | 3 | 3 |
| Distância do anel de foco | `focus/offset` | 3 | 3 |

O Pequeno atende o mínimo de 24px (`size/touch-min`) e fica abaixo do alvo confortável de 44px (`size/touch-comfortable`). O Médio atende os dois. Use o Médio onde o toque é a entrada principal.

## Acessibilidade

- Use o elemento nativo `button` (ou `a`, quando ele leva a algum lugar). Enter e Espaço acionam um botão.
- Dê sempre um `aria-label` com o nome da ação, como "Fechar". O ícone é decorativo: `aria-hidden="true"`.
- Um botão de alternar precisa de `aria-pressed`.
- Tab move o foco, e o anel aparece sempre. Um botão desativado sai da ordem de tabulação.

## Exemplos de código

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">

<button class="aipim-icon-button" type="button" aria-label="Fechar">
  <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-close"></use></svg>
</button>

<!-- Pequeno -->
<button class="aipim-icon-button aipim-icon-button--sm" type="button" aria-label="Dispensar">
  <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-close"></use></svg>
</button>
```

## Faça e não faça

- Faça: use um ícone conhecido e dê um nome a ele com `aria-label` (Fechar).
- Não faça: ícones pouco claros sem rótulo. A pessoa fica no chute; coloque um rótulo visível.

<!-- Translated from docs/en/components/icon-button.md, sha256 26588bcaba36 -->
