---
name: combobox
description: Um campo de texto que filtra uma lista de opções enquanto você digita, para listas longas como os estados do Brasil ou os bancos.
status: beta
group: molecules
html: input, label, ul
class: aipim-combobox
css: components/web/combobox.css
figma: Aipim DS, página Moléculas, Combobox
wcag: ["1.3.1 Informações e Relações", "1.4.11 Contraste Não Textual", "2.1.1 Teclado", "2.4.7 Foco Visível", "3.3.1 Identificação de Erro", "3.3.3 Sugestão de Erro", "4.1.2 Nome, Função, Valor", "4.1.3 Mensagens de Status"]
related: [select, text-field, brazilian-field]
---

# Combobox

Um campo de texto que filtra uma lista de opções enquanto você digita, para listas longas como os estados do Brasil ou os bancos.

## Quando usar

- Uma escolha numa lista longa que a pessoa conhece pelo nome: o estado, o banco, a cidade.
- Quando digitar duas ou três letras é mais rápido que rolar: "ba" acha a Bahia, "sp" acha São Paulo.

## Quando não usar

- Uma lista curta: use um [select](select.md), ou [radio buttons](radio.md) para cinco opções ou menos.
- Texto livre com sugestões, em que qualquer valor vale (uma busca): este combobox só aceita uma das suas opções.
- Para escolher mais de uma opção: não nesta versão.

## Como funciona

O campo é um `input` com `role="combobox"`, e as opções são um `ul` com `role="listbox"` num popup logo abaixo. O `aipim.js` faz o resto.

- **Digitar** abre a lista e deixa só as opções que contêm o texto, sem ligar para acento nem maiúscula: "sao" acha "São Paulo". O texto também acha uma opção pelo `data-value` quando é o valor inteiro, então "sp" acha São Paulo.
- **Seta para baixo** ou **para cima** com a lista fechada abre a lista com todas as opções. **Alt+Seta para baixo** só abre.
- **Seta para baixo** e **para cima** mudam a opção sob as setas, e voltam da última para a primeira. O foco fica no campo e o `aria-activedescendant` aponta essa opção, para o leitor de tela ler.
- **Enter** ou um **clique** escolhem a opção: o nome vai para o campo e o `data-value` vai para o input oculto do campo, quando houver um. O campo dispara `change`.
- **Esc** fecha a lista. Com a lista fechada, Esc limpa o campo.
- **Tab** fecha a lista e segue, sem escolher.
- **Sair do campo** com um texto que não é opção mostra o erro. Um nome digitado inteiro, em qualquer caixa e sem acento, vira aquela opção.
- Sem nenhuma opção sobrando, o popup mostra a mensagem de vazio ("Nenhum estado com esse nome").
- O leitor de tela ouve quantas opções sobraram ("3 opções") depois de uma pausa na digitação, por um `role="status"` que o script acrescenta.

Sem o script o campo é um campo de texto comum e a lista fica escondida: cheque o valor no servidor também.

## Decisão: a lista escrita na página

As opções são elementos `li` no HTML, não um array em JavaScript. A página funciona igual com qualquer framework, quem lê o código vê as opções, e um servidor consegue renderizá-las. Para uma lista longa demais para a página (os 5.570 municípios do Brasil), filtre no servidor, escreva as opções que voltaram e chame `Aipim.init(campo)`.

## Decisão: escolha à mão, e só da lista

A lista filtra enquanto você digita mas nunca escolhe por você. Uma opção só é escolhida com Enter, com um clique ou digitando o nome inteiro. Escolher sozinho o primeiro resultado (a seleção automática, no padrão ARIA) surpreende quem digita rápido e aperta Tab. Aceitar texto livre mandaria valores que o servidor não conhece, então um texto que não é opção é um erro, com uma mensagem que diz como achar a opção certa.

## Variantes e props

| Classe ou atributo | O que faz |
|---|---|
| `aipim-field aipim-combobox` | O wrapper. Usa as partes do text field. |
| `aipim-field--lg` | Campo grande, 48px. O padrão é médio, 40px. As opções continuam com 40px. |
| `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded`, `aria-controls` no input | O campo. O `aria-controls` aponta o listbox. Acrescente `autocomplete="off"` para as sugestões do navegador não cobrirem a lista. |
| `aipim-combobox__chevron` | O chevron depois do campo, com `aria-hidden="true"`. Ele gira quando a lista está aberta. |
| `aipim-combobox__popup` com `hidden` | A caixa que abre sob o campo e rola. |
| `aipim-combobox__list`, `role="listbox"`, `aria-labelledby` | A lista, com o nome vindo do rótulo do campo. |
| `aipim-combobox__option`, `role="option"`, `data-value` | Uma opção. O texto é o nome que aparece; o `data-value` é o valor enviado (a UF, o código do banco). |
| `aipim-combobox__empty` com `hidden` | A mensagem para quando nenhuma opção sobra. |
| `input type="hidden"` no wrapper | Opcional. Recebe o `data-value` da opção escolhida, para o formulário. |
| `data-aipim-error-invalid` no input | Sua própria mensagem de erro, no lugar da padrão. |
| `--aipim-combobox-rows` | Quantas linhas o popup mostra antes de rolar. O padrão é 6,5: a meia linha mostra que tem mais. |

## Estados

O campo tem os estados do [text field](text-field.md): padrão, hover, foco, erro e desativado. A lista acrescenta:

- **Opção sob as setas:** preenchimento `bg/sunken` e uma barra de 3px em `action/primary/bg` na borda inicial, para nunca depender só de cor.
- **Opção sob o ponteiro:** o preenchimento `bg/sunken`.
- **Aberto:** o chevron aponta para cima.

## Tokens usados

O campo, o rótulo e o texto de ajuda usam os tokens do [text field](text-field.md). O combobox acrescenta:

| Onde | Estado | Token | Claro | Escuro |
|---|---|---|---|---|
| Chevron | Todos | `text/secondary` | #4A423C | #ECE5DF |
| Preenchimento do popup | Aberto | `bg/surface` | #FDF9F6 | #302A25 |
| Borda do popup | Aberto | `border/subtle` | #DAD1CA | #4A423C |
| Sombra do popup | Aberto | `elevation/overlay` | | |
| Texto da opção | Todos | `text/primary` | #1A1511 | #FDF9F6 |
| Preenchimento da opção | Sob as setas, hover | `bg/sunken` | #ECE5DF | #0E0A07 |
| Barra da opção | Sob as setas | `action/primary/bg` | #B43000 | #FF9275 |
| Mensagem de vazio | Nenhuma opção | `text/secondary` | #4A423C | #ECE5DF |

| Medida | Token | Valor |
|---|---|---|
| Altura da opção | `size/control-md` | 40 |
| Respiro da opção | `space/8`, `space-role/inset-sm` | 8, 12 |
| Distância entre campo e popup | `space/4` | 4 |
| Respiro do popup | `space/4` | 4 |
| Altura do popup antes de rolar | `size/control-md` × 6,5 + `space/8` | 268 |
| Barra da opção sob as setas | `border/thick` | 3 |
| Camada do popup | `z/dropdown` | |
| Giro do chevron | `duration/fast`, `easing/standard` | 100ms, 0ms com movimento reduzido |

## Acessibilidade

- Segue o [padrão combobox do ARIA 1.2](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/), com autocomplete de lista e seleção manual.
- Um `label` associado ao input, e o listbox com o nome do mesmo rótulo (`aria-labelledby`).
- O foco nunca sai do campo com a lista aberta: a opção sob as setas é apontada por `aria-activedescendant` e marcada com `aria-selected="true"`.
- A quantidade de opções encontradas é uma mensagem de status (WCAG 4.1.3), lida depois de uma pausa para não atropelar a digitação.
- Um erro mostra ícone e texto, nunca só cor, e diz como corrigir.
- O popup rola dentro da própria caixa, então a página não se mexe com as setas.
- Esc dentro de um [modal](modal.md) fecha a lista primeiro; o segundo Esc limpa o campo, e só o próximo fecha o modal.

### Leitores de tela

Conferido à mão com cada par abaixo. As checagens no navegador cobrem o teclado e os atributos ARIA; só uma pessoa confirma o que é lido em voz alta.

| Leitor de tela | Navegador | Situação |
|---|---|---|
| VoiceOver (macOS) | Safari | A conferir |
| NVDA (Windows) | Firefox, Chrome | A conferir |
| TalkBack (Android) | Chrome | A conferir |

O que escutar: no foco, o rótulo, "caixa de combinação" (ou "campo de texto, pop-up") e o texto de ajuda; depois de digitar, a quantidade de opções; na seta para baixo, o nome da opção; depois do Enter, o nome escolhido no campo; ao sair com um texto errado, a mensagem de erro.

## Exemplos de código

```html
<div class="aipim-field aipim-combobox">
  <label class="aipim-field__label" for="state" id="state-label">Estado</label>
  <input class="aipim-field__control" id="state" type="text" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="state-list" aria-describedby="state-help" autocomplete="off">
  <input type="hidden" name="uf">
  <svg class="aipim-icon aipim-combobox__chevron" aria-hidden="true"><use href="icons/sprite.svg#aipim-chevron-down"></use></svg>
  <div class="aipim-combobox__popup" hidden>
    <ul class="aipim-combobox__list" id="state-list" role="listbox" aria-labelledby="state-label">
      <li class="aipim-combobox__option" role="option" id="state-ac" data-value="AC">Acre</li>
      <li class="aipim-combobox__option" role="option" id="state-al" data-value="AL">Alagoas</li>
      <!-- … os outros 25 estados -->
    </ul>
    <p class="aipim-combobox__empty" hidden>Nenhum estado com esse nome</p>
  </div>
  <p class="aipim-field__helper" aria-live="polite" id="state-help">
    <svg class="aipim-icon aipim-field__icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-error"></use></svg>
    <span>Digite parte do nome</span>
  </p>
</div>
```

## Faça e não faça

- Faça: o estado como combobox, para "ba" bastar para achar a Bahia.
- Não faça: um combobox para quatro opções, em que a pessoa precisa digitar para descobrir quais são as opções.

<!-- Translated from docs/en/components/combobox.md, sha256 8c10d2a2e329 -->
