---
name: checkbox
description: Deixa a pessoa marcar quantas opções independentes quiser.
status: stable
group: atoms
html: input[type=checkbox], label, fieldset
class: aipim-checkbox
css: components/web/checkbox.css
figma: Aipim DS, página Átomos, Checkbox
wcag: ["1.3.1 Informações e Relações", "1.4.3 Contraste (Mínimo)", "1.4.11 Contraste Não Textual", "2.4.7 Foco Visível", "2.5.8 Tamanho do Alvo (Mínimo)", "4.1.2 Nome, Função, Valor"]
related: [radio, switch]
---

# Checkbox

Deixa a pessoa marcar quantas opções independentes quiser.

## Quando usar

- Para várias escolhas independentes.
- Para aceitar termos.
- Um checkbox pai pode mostrar um estado misto (indeterminado).

## Quando não usar

- Para uma escolha só entre várias: use [radio buttons](radio.md).
- Para algo que vale na hora: use um [switch](switch.md).

## Variantes e props

| Classe ou estado | O que faz |
|---|---|
| `aipim-checkbox` | O label que envolve o input, a caixa e o texto. A linha inteira é a área de clique. |
| `aipim-checkbox__input` | O input de verdade. Ele continua na página, escondido só visualmente. |
| `aipim-checkbox__box` | A caixa desenhada. Coloque `aria-hidden="true"` nela. |
| `aipim-checkbox__label` | O texto. |
| `:checked` | Marcado: um sinal de visto. |
| `input.indeterminate = true` | Indeterminado: um traço. É definido no código, porque não existe atributo HTML para isso. |
| `aipim-choice-group` | Um fieldset para um grupo. `aipim-choice-group--horizontal` põe as opções em linha. A legenda dele é `aipim-choice-group__legend`. |

O rótulo faz parte do controle: clicar nele marca e desmarca a caixa.

## Estados

Padrão, hover, foco e desativado, para desmarcado, marcado e indeterminado. O hover escurece a borda (e o preenchimento, quando marcado). O foco é um anel de 3px, a 3px da caixa. Desativado usa `opacity/disabled` na caixa e no rótulo.

## Tokens usados

| Onde | Estado | Token | Claro | Escuro |
|---|---|---|---|---|
| Preenchimento da caixa | Desmarcado | `bg/surface` | #FDF9F6 | #302A25 |
| Borda da caixa | Desmarcado | `border/strong` | #837A73 | #A39992 |
| Borda da caixa | Desmarcado, hover | `text/secondary` | #4A423C | #ECE5DF |
| Preenchimento e borda da caixa | Marcado, indeterminado | `action/primary/bg` | #B43000 | #FF9275 |
| Preenchimento e borda da caixa | Marcado, indeterminado, hover | `action/primary/hover` | #892402 | #FEBBA9 |
| Sinal de visto | Marcado, indeterminado | `action/primary/text` | #FDF9F6 | #1A1511 |
| Rótulo | Todos | `text/primary` | #1A1511 | #FDF9F6 |
| Anel de foco | Foco | `focus/ring` | #0364C2 | #AED1FE |
| Checkbox inteiro | Desativado | `opacity/disabled` | 40% | 40% |

| Medida | Token | Valor |
|---|---|---|
| Tamanho da caixa | `size/icon-md` | 20 |
| Tamanho do sinal de visto | `size/icon-sm` | 16 |
| Traço do sinal de visto | Sem token | 2 |
| Espaço entre caixa e rótulo | `space/12` | 12 |
| Altura da linha | Altura da linha de `Aipim/body` | 24 |
| Raio dos cantos | `radius/sm` | 4 |
| Largura da borda | `border/medium` | 2 |
| Tipografia do rótulo | `Aipim/body` | 16/24 Regular |

A linha tem 24px de altura: atende o alvo mínimo de 24px e fica abaixo do confortável, de 44px.

## Acessibilidade

- Use o `input type="checkbox"` nativo, com label.
- Um grupo fica num `fieldset` com `legend`.
- O estado indeterminado é definido no código, pela propriedade `indeterminate`.
- Espaço marca e desmarca. Tab move o foco, e o anel aparece sempre.

## Exemplos de código

```html
<fieldset class="aipim-choice-group">
  <legend class="aipim-choice-group__legend">Notificações</legend>
  <label class="aipim-checkbox">
    <input class="aipim-checkbox__input" type="checkbox" checked>
    <span class="aipim-checkbox__box" aria-hidden="true"></span>
    <span class="aipim-checkbox__label">E-mail</span>
  </label>
  <label class="aipim-checkbox">
    <input class="aipim-checkbox__input" type="checkbox">
    <span class="aipim-checkbox__box" aria-hidden="true"></span>
    <span class="aipim-checkbox__label">SMS</span>
  </label>
</fieldset>

<script>
  document.querySelector('#parent').indeterminate = true;
</script>
```

## Faça e não faça

- Faça: escolhas independentes, em que cada uma pode estar ligada ou desligada.
- Não faça: quando só uma opção vale, o certo são radio buttons.

<!-- Translated from docs/en/components/checkbox.md, sha256 2fee8531cca3 -->
