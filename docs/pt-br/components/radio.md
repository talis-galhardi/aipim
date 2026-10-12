---
name: radio
description: Deixa a pessoa escolher uma opção de uma lista curta.
status: stable
html: input[type=radio], label, fieldset
class: aipim-radio
css: components/web/radio.css
figma: Aipim DS, página Átomos, Radio
tokens: [bg/surface, border/strong, text/secondary, text/primary, action/primary/bg, action/primary/hover, focus/ring, opacity/disabled, size/icon-md, space/12, radius/full, border/medium, border/thick, focus/offset, Aipim/body]
wcag: ["1.3.1 Informações e Relações", "1.4.3 Contraste (Mínimo)", "1.4.11 Contraste Não Textual", "2.4.7 Foco Visível", "2.5.8 Tamanho do Alvo (Mínimo)", "4.1.2 Nome, Função, Valor"]
related: [checkbox, switch]
---

# Radio

Deixa a pessoa escolher uma opção de uma lista curta.

## Quando usar

- Para uma escolha entre 2 e 6 opções visíveis.
- Quando as pessoas precisam comparar as opções lado a lado.

## Quando não usar

- Mais de 6 opções: use um select.
- Para sim ou não: use um [checkbox](checkbox.md) ou um [switch](switch.md).

## Variantes e props

| Classe ou estado | O que faz |
|---|---|
| `aipim-radio` | O label que envolve o input, o círculo e o texto. A linha inteira é a área de clique. |
| `aipim-radio__input` | O input de verdade. Todas as opções de um grupo dividem o mesmo `name`. |
| `aipim-radio__circle` | O círculo desenhado. Coloque `aria-hidden="true"` nele. |
| `aipim-radio__label` | O texto. |
| `:checked` | Selecionado: um ponto de 10px. |
| `aipim-choice-group` | Um fieldset para o grupo (vem de `checkbox.css`). `aipim-choice-group--horizontal` põe as opções em linha. |

Os grupos podem ser verticais ou horizontais.

## Estados

Padrão, hover, foco e desativado, para desligado e ligado. O hover escurece a borda (e a borda e o ponto, quando selecionado). O foco é um anel de 3px, a 3px do círculo. Desativado usa `opacity/disabled`.

## Tokens usados

| Onde | Estado | Token | Claro | Escuro |
|---|---|---|---|---|
| Preenchimento do círculo | Todos | `bg/surface` | #FDF9F6 | #302A25 |
| Borda do círculo | Desligado | `border/strong` | #837A73 | #A39992 |
| Borda do círculo | Desligado, hover | `text/secondary` | #4A423C | #ECE5DF |
| Borda do círculo e ponto | Ligado | `action/primary/bg` | #B43000 | #FF9275 |
| Borda do círculo e ponto | Ligado, hover | `action/primary/hover` | #892402 | #FEBBA9 |
| Rótulo | Todos | `text/primary` | #1A1511 | #FDF9F6 |
| Anel de foco | Foco | `focus/ring` | #0364C2 | #AED1FE |
| Radio inteiro | Desativado | `opacity/disabled` | 40% | 40% |

| Medida | Token | Valor |
|---|---|---|
| Tamanho do círculo | `size/icon-md` | 20 |
| Tamanho do ponto | sem token, metade do círculo | 10 |
| Espaço entre círculo e rótulo | `space/12` | 12 |
| Altura da linha | Altura da linha de `Aipim/body` | 24 |
| Raio dos cantos | `radius/full` | totalmente redondo |
| Largura da borda | `border/medium` | 2 |
| Tipografia do rótulo | `Aipim/body` | 16/24 Regular |

A linha tem 24px de altura: atende o alvo mínimo de 24px e fica abaixo do confortável, de 44px.

## Acessibilidade

- Use o `input type="radio"` nativo, com o mesmo `name` em todas as opções.
- Um grupo fica num `fieldset` com `legend`, ou com `role="radiogroup"`.
- Deixe uma opção selecionada quando houver um padrão que faça sentido.
- As setas mudam a escolha dentro do grupo. Tab entra e sai do grupo, e não passa por cada opção. Espaço seleciona a opção em foco.

## Exemplos de código

```html
<fieldset class="aipim-choice-group">
  <legend class="aipim-choice-group__legend">Plano</legend>
  <label class="aipim-radio">
    <input class="aipim-radio__input" type="radio" name="plan" checked>
    <span class="aipim-radio__circle" aria-hidden="true"></span>
    <span class="aipim-radio__label">Mensal</span>
  </label>
  <label class="aipim-radio">
    <input class="aipim-radio__input" type="radio" name="plan">
    <span class="aipim-radio__circle" aria-hidden="true"></span>
    <span class="aipim-radio__label">Anual</span>
  </label>
</fieldset>
```

## Faça e não faça

- Faça: um grupo com legenda e uma opção selecionada.
- Não faça: um radio sozinho, que depois de marcado não tem como desmarcar.

<!-- Translated from docs/en/components/radio.md, sha256 f0b36afd0013 -->
