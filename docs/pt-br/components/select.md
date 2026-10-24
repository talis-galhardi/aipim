---
name: select
description: Deixa a pessoa escolher uma opção numa lista que abre, quando as opções não cabem na tela como radio buttons.
status: beta
group: molecules
html: select, label
class: aipim-select
css: components/web/select.css
figma: Aipim DS, página Moléculas, Select
wcag: ["1.3.1 Informações e Relações", "1.4.11 Contraste Não Textual", "2.4.7 Foco Visível", "3.3.1 Identificação de Erro", "3.3.2 Rótulos ou Instruções", "4.1.2 Nome, Função, Valor"]
related: [combobox, radio, text-field]
---

# Select

Deixa a pessoa escolher uma opção numa lista que abre, quando as opções não cabem na tela como radio buttons.

## Quando usar

- Uma escolha entre cinco e umas quinze opções que a pessoa já conhece, como o tipo de chave Pix ou de conta bancária.
- Quando falta espaço e as opções não precisam ser comparadas lado a lado.

## Quando não usar

- Duas a cinco opções: use [radio buttons](radio.md), que mostram todas sem clique.
- Uma lista longa, ou que a pessoa prefere digitar a rolar, como os estados do Brasil ou os bancos: use o [combobox](combobox.md).
- Para escolher mais de uma opção: use [checkboxes](checkbox.md).
- Para disparar uma ação ou ir para outra página: um select só guarda um valor.

## Decisão: o select nativo

Estilizamos o `select` do próprio navegador e não construímos a lista. O campo fechado tem a cara do text field; a lista que abre é a do navegador.

- O teclado, os leitores de tela e os celulares já conhecem esse controle. No celular as opções abrem no seletor do sistema, mais fácil de usar com o polegar do que qualquer lista desenhada na página.
- Funciona sem script e envia o valor com o formulário.
- O custo é que a lista aberta não fica igual em todo navegador. Quando a lista precisa de filtro ou de visual próprio, use o combobox.

## Variantes e props

| Classe ou atributo | O que faz |
|---|---|
| `aipim-field aipim-select` | O wrapper: rótulo, select, chevron e texto de ajuda. Usa as partes do text field. |
| `aipim-field--lg` | Campo grande, 48px. O padrão é médio, 40px. |
| `aipim-field__control` no `select` | O campo fechado. |
| `aipim-select__chevron` | O ícone de chevron depois do select, com `aria-hidden="true"`. |
| `option value=""` primeiro | O convite ("Escolha uma"), em `text/muted` até alguém escolher um valor. Deixe de fora quando houver um padrão razoável. |
| `aria-invalid="true"` no select | O estado de erro. |
| `disabled` no select | O estado desativado. Acrescente `aipim-field--disabled` no wrapper para navegadores sem `:has()`. |

## Estados

Padrão, hover, foco, erro e desativado, iguais aos do [text field](text-field.md). O chevron não muda com o estado.

## Tokens usados

O campo, o rótulo e o texto de ajuda usam os tokens do [text field](text-field.md). O select acrescenta:

| Onde | Estado | Token | Claro | Escuro |
|---|---|---|---|---|
| Chevron | Todos | `text/secondary` | #4A423C | #ECE5DF |
| Opção de convite | Nada escolhido | `text/muted` | #665D56 | #DAD1CA |

| Medida | Token | Médio | Grande |
|---|---|---|---|
| Tamanho do chevron | `size/icon-md` | 20 | 20 |
| Espaço depois do chevron | `space-role/inset-sm`, `space-role/inset-md` | 12 | 16 |
| Espaço reservado ao chevron | margem, ícone, margem | 44 | 52 |

## Acessibilidade

- Um `label` associado ao select (`for` e `id`), e texto de ajuda e de erro ligados por `aria-describedby`.
- O teclado é o do navegador: Tab entra e sai; Espaço, Enter ou Alt+Seta para baixo abrem a lista; as setas andam; digitar uma letra pula para a primeira opção que começa com ela.
- Um erro mostra ícone e texto, nunca só cor, e o select recebe `aria-invalid="true"`.
- O chevron é decorativo (`aria-hidden="true"`): o papel do select já diz que ele abre uma lista.
- A opção de convite tem valor vazio, então um select `required` fica inválido até a pessoa escolher algo.

## Exemplos de código

```html
<div class="aipim-field aipim-select">
  <label class="aipim-field__label" for="pix-type">Tipo de chave Pix</label>
  <select class="aipim-field__control" id="pix-type" name="pix-type" aria-describedby="pix-type-help" required>
    <option value="">Escolha uma</option>
    <option value="cpf">CPF ou CNPJ</option>
    <option value="phone">Celular</option>
    <option value="email">E-mail</option>
    <option value="random">Chave aleatória</option>
  </select>
  <svg class="aipim-icon aipim-select__chevron" aria-hidden="true"><use href="icons/sprite.svg#aipim-chevron-down"></use></svg>
  <p class="aipim-field__helper" id="pix-type-help">
    <svg class="aipim-icon aipim-field__icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-error"></use></svg>
    <span>O tipo de chave que você cadastrou no banco</span>
  </p>
</div>
```

## Faça e não faça

- Faça: um select para uma lista curta de opções que a pessoa conhece pelo nome.
- Não faça: um select para os 27 estados, onde digitar "pa" é mais rápido que rolar.

<!-- Translated from docs/en/components/select.md, sha256 e5ba740c2a72 -->
