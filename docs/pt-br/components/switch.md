---
name: switch
description: Liga ou desliga uma configuração, e a mudança vale na hora.
status: stable
group: atoms
html: input[type=checkbox][role=switch], label
class: aipim-switch
css: components/web/switch.css
figma: Aipim DS, página Átomos, Switch
wcag: ["1.4.1 Uso de Cor", "1.4.11 Contraste Não Textual", "2.4.7 Foco Visível", "2.5.8 Tamanho do Alvo (Mínimo)", "4.1.2 Nome, Função, Valor"]
related: [checkbox, radio]
---

# Switch

Liga ou desliga uma configuração, e a mudança vale na hora.

## Quando usar

- Para uma configuração que tem efeito imediato.
- Para preferências de ligar e desligar, como as notificações.

## Quando não usar

- Quando a escolha depende de um botão de enviar: use um [checkbox](checkbox.md).
- Para escolher entre duas opções com nome: use [radio buttons](radio.md).

## Variantes e props

| Classe ou estado | O que faz |
|---|---|
| `aipim-switch` | O label que envolve o input, o trilho e o texto. A linha inteira é a área de clique. |
| `aipim-switch__input` | O input de verdade: `type="checkbox"` com `role="switch"`. |
| `aipim-switch__track` | O trilho e o botão deslizante desenhados. Coloque `aria-hidden="true"` neles. |
| `aipim-switch__label` | O texto, à direita do trilho. |
| `:checked` | Ligado: o trilho fica na cor primária e o botão desliza para a direita. |

## Estados

Padrão, hover, foco e desativado, para desligado e ligado. O hover escurece o trilho. O foco é um anel de 3px, a 3px do trilho. Desativado usa `opacity/disabled`. O botão deslizante se move com `duration/fast` e `ease/standard`, e fica parado com movimento reduzido.

## Tokens usados

| Onde | Estado | Token | Claro | Escuro |
|---|---|---|---|---|
| Trilho | Desligado | `border/strong` | #837A73 | #A39992 |
| Trilho | Desligado, hover | `text/muted` | #665D56 | #DAD1CA |
| Trilho | Ligado | `action/primary/bg` | #B43000 | #FF9275 |
| Trilho | Ligado, hover | `action/primary/hover` | #892402 | #FEBBA9 |
| Botão deslizante | Desligado | `bg/surface` | #FDF9F6 | #302A25 |
| Botão deslizante | Ligado | `action/primary/text` | #FDF9F6 | #1A1511 |
| Rótulo | Todos | `text/primary` | #1A1511 | #FDF9F6 |
| Anel de foco | Foco | `focus/ring` | #0364C2 | #AED1FE |
| Switch inteiro | Desativado | `opacity/disabled` | 40% | 40% |

| Medida | Token | Valor |
|---|---|---|
| Largura do trilho | `size/touch-comfortable` | 44 |
| Altura do trilho | `size/touch-min` | 24 |
| Tamanho do botão deslizante | `size/icon-sm` | 16 |
| Espaço entre a borda do trilho e o botão | `space/4` | 4 |
| Espaço entre trilho e rótulo | `space/12` | 12 |
| Raio dos cantos do trilho | `radius/full` | totalmente redondo |
| Tipografia do rótulo | `Aipim/body` | 16/24 Regular |

O trilho tem 24px de altura: atende o alvo mínimo de 24px e fica abaixo do confortável, de 44px.

## Acessibilidade

- Use `role="switch"` num input checkbox (ele já traz o `aria-checked`), ou um botão com `role="switch"` e `aria-checked`.
- O rótulo diz o que o switch controla, como "Notificações", e não o estado.
- O estado também aparece na posição do botão deslizante, não só na cor.
- Espaço liga e desliga. Tab move o foco, e o anel aparece sempre.

## Exemplos de código

```html
<label class="aipim-switch">
  <input class="aipim-switch__input" type="checkbox" role="switch" checked>
  <span class="aipim-switch__track" aria-hidden="true"></span>
  <span class="aipim-switch__label">Notificações</span>
</label>
```

## Faça e não faça

- Faça: o rótulo dá o nome da configuração ("Notificações").
- Não faça: um rótulo que descreve a ação ou o estado ("Ligar as notificações").

<!-- Translated from docs/en/components/switch.md, sha256 7b5738792b17 -->
