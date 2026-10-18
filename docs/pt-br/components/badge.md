---
name: badge
description: Uma marca pequena, com um numeral ou um ícone, ao lado de um texto. Decorativa.
status: stable
group: atoms
html: span
class: aipim-badge
css: components/web/badge.css
figma: Aipim DS, página Átomos, Badge
wcag: ["1.1.1 Conteúdo Não Textual", "1.3.1 Informações e Relações", "1.4.3 Contraste (Mínimo)"]
related: [tag, card]
---

# Badge

Uma marca pequena, com um numeral ou um ícone, ao lado de um texto. Decorativa.

## Quando usar

- O número de um passo, ao lado do passo que ele nomeia ("1", "2", "3").
- Um ícone em destaque que dá a um bloco uma pequena âncora visual.
- Ao lado de um texto que já diz tudo o que o badge mostra.

## Quando não usar

- Para levar uma informação sozinho, como a contagem de não lidas: escreva em texto.
- Como botão ou link, porque ele não é interativo. Use um [button](button.md) ou um [link](link.md).
- Para uma categoria ou um status: use uma [tag](tag.md).

## Variantes e props

| Classe | O que faz |
|---|---|
| `aipim-badge` | Outline, redondo, 48. Borda de 2px e o numeral ou ícone em `action/primary/bg`. |
| `aipim-badge--filled` | Preenchido com `action/primary/bg`, conteúdo em `action/primary/text`. |
| `aipim-badge--tint` | Preenchido com `tint/primary`, conteúdo em `tint/text`. |
| `aipim-badge--square` | Quadrado com cantos arredondados (`radius/md`) em vez de círculo. |
| `aipim-badge--sm` | 32 em vez de 48. |
| `aipim-badge > .aipim-icon` | Um ícone em vez do numeral: 24px, ou 16px no tamanho pequeno. |

## Estados

Nenhum. O badge não é interativo e não recebe foco.

## Tokens usados

| Onde | Estilo | Token | Claro | Escuro |
|---|---|---|---|---|
| Borda, numeral e ícone | Outline | `action/primary/bg` | #B43000 | #FF9275 |
| Preenchimento | Filled | `action/primary/bg` | #B43000 | #FF9275 |
| Numeral e ícone | Filled | `action/primary/text` | #FDF9F6 | #1A1511 |
| Preenchimento | Tint | `tint/primary` | #FEBBA9 | #892402 |
| Numeral e ícone | Tint | `tint/text` | #1A1511 | #FDF9F6 |

| Medida | Token | Valor |
|---|---|---|
| Tamanho, padrão | `size/control-lg` | 48 |
| Tamanho, pequeno | `size/control-sm` | 32 |
| Tamanho do ícone, padrão | `size/icon-lg` | 24 |
| Tamanho do ícone, pequeno | `size/icon-sm` | 16 |
| Raio dos cantos, redondo | `radius/full` | Totalmente redondo |
| Raio dos cantos, quadrado | `radius/md` | 8 |
| Largura da borda (outline) | `border/medium` | 2 |
| Tipografia do numeral | `Aipim/label` | 16/20 Bold |

As medidas valem a partir da borda externa. No código a borda tem 2px no estilo outline e é transparente nos outros, então os três estilos têm o mesmo tamanho.

## Acessibilidade

- O badge é decorativo: coloque `aria-hidden="true"` nele. O texto ao lado leva o sentido, então o leitor de tela lê "Crie o arquivo", e não "1 Crie o arquivo".
- Nunca use um badge como a única forma de dar uma informação. Um numeral sem texto, como a contagem de não lidas, também precisa estar escrito.
- Contraste do numeral ou do ícone com o badge, no claro e no escuro: outline 5,58:1 sobre o fundo da página (8,30:1 no escuro), filled 5,96:1 (8,30:1 no escuro), tint 11,12:1 (8,66:1 no escuro). O formato de um badge tint é decoração, não informação, então ele dispensa contraste com a página.
- O numeral usa `Aipim/label`, de 16px, e atende o tamanho mínimo do corpo de texto.

## Exemplos de código

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">

<!-- O número de um passo ao lado do texto -->
<div style="display:flex;align-items:center;gap:12px">
  <span class="aipim-badge" aria-hidden="true">1</span>
  <span>Crie o arquivo</span>
</div>

<!-- Preenchido, quadrado, pequeno, com ícone -->
<span class="aipim-badge aipim-badge--filled aipim-badge--square aipim-badge--sm" aria-hidden="true">
  <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-search"></use></svg>
</span>
```

## Faça e não faça

- Faça: coloque o badge ao lado de um texto que diz a mesma coisa, com `aria-hidden="true"`.
- Não faça: um badge sozinho mostrando uma informação, como uma contagem que ninguém consegue ouvir.

<!-- Translated from docs/en/components/badge.md, sha256 2cbbe7e2c144 -->
