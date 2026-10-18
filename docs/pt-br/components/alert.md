---
name: alert
description: Uma mensagem importante que continua visível na página.
status: stable
group: molecules
html: div[role=status|alert], button
class: aipim-alert
css: components/web/alert.css
figma: Aipim DS, página Moléculas, Alert
wcag: ["1.4.1 Uso de Cor", "1.4.3 Contraste (Mínimo)", "2.4.7 Foco Visível", "2.5.8 Tamanho do Alvo (Mínimo)", "4.1.2 Nome, Função, Valor", "4.1.3 Mensagens de Status"]
related: [toast, text-field]
---

# Alert

Uma mensagem importante que continua visível na página.

## Quando usar

- Para uma mensagem importante que precisa ficar visível na página.
- Para erros do formulário inteiro, avisos e informações sobre o estado atual.
- Com título, quando a mensagem pede um cabeçalho.

## Quando não usar

- Para uma confirmação passageira, como "Salvo": use um [toast](toast.md).
- Para o erro de um campo só: use o texto de ajuda do [text field](text-field.md).

## Variantes e props

| Classe | O que faz |
|---|---|
| `aipim-alert` | Info. O tipo padrão. |
| `aipim-alert--success` / `--warning` / `--error` | Os outros três tipos. |
| `aipim-alert__icon` | O ícone do tipo. Obrigatório, para que a cor nunca seja a única pista. |
| `aipim-alert__content` | Envolve o título e a mensagem. |
| `aipim-alert__title` | Um resumo curto opcional, em `Aipim/label`. |
| `aipim-alert__message` | O que aconteceu e o que fazer em seguida. |
| `aipim-dismiss` | Botão de dispensar opcional. Ele não é um [icon button](icon-button.md) de propósito: a superfície do alert é colorida, e um hover cinza ficaria errado. |

## Estados

O alert não tem hover nem pressionado. O botão de dispensar mostra o anel de foco (3px, `focus/ring`, a 3px de distância) só no foco por teclado.

## Tokens usados

| Onde | Tipo | Token | Claro | Escuro |
|---|---|---|---|---|
| Preenchimento da superfície | Info | `info/bg` | #E4F0FF | #00346B |
| Borda e ícone do tipo | Info | `info/icon` | #047DF1 | #8CBEFE |
| Título, mensagem e ícone de dispensar | Info | `info/text` | #014B95 | #CEE3FF |
| Preenchimento da superfície | Success | `success/bg` | #E0F5E6 | #014122 |
| Borda e ícone do tipo | Success | `success/icon` | #007A44 | #C4EDD1 |
| Título, mensagem e ícone de dispensar | Success | `success/text` | #025D33 | #C4EDD1 |
| Preenchimento da superfície | Warning | `warning/bg` | #F6EED5 | #423400 |
| Borda e ícone do tipo | Warning | `warning/icon` | #5E4B03 | #FFD337 |
| Título, mensagem e ícone de dispensar | Warning | `warning/text` | #423400 | #F1E1B1 |
| Preenchimento da superfície | Error | `error/bg` | #FEE8EC | #66022B |
| Borda e ícone do tipo | Error | `error/icon` | #DE316D | #FF5387 |
| Título, mensagem e ícone de dispensar | Error | `error/text` | #8F083F | #FFD5DC |

| Medida | Token | Valor |
|---|---|---|
| Padding, todos os lados | `space-role/inset-md` | 16 |
| Espaço entre ícone e texto | `space/12` | 12 |
| Espaço entre título e mensagem | `space/4` | 4 |
| Tamanho do ícone do tipo | `size/icon-md` | 20 |
| Tamanho do botão de dispensar | `size/touch-min` | 24 |
| Tamanho do ícone de dispensar | `size/icon-sm` | 16 |
| Raio dos cantos do botão de dispensar | `radius/sm` | 4 |
| Raio dos cantos | `radius/md` | 8 |
| Largura da borda | `border/thin` | 1 |
| Tipografia do título | `Aipim/label` | 16/20 Bold |
| Tipografia da mensagem | `Aipim/body` | 16/24 Regular |

As medidas valem a partir da borda externa: no código, a borda de 1px sai de dentro do padding. Com título e botão de dispensar, o alert tem 80px de altura. Só com a mensagem, 56px.

O botão de dispensar tem 24px, então atende o mínimo de 24px (`size/touch-min`) e fica abaixo do alvo confortável de 44px (`size/touch-comfortable`).

## Acessibilidade

- `role="alert"` para erros e `role="status"` para informações, avisos e sucessos. Coloque a função no alert quando ele entra na página, para o leitor de tela anunciar.
- Ícone mais texto, nunca só a cor. O ícone do tipo é decorativo: `aria-hidden="true"`.
- O botão de dispensar precisa de um nome acessível, como "Dispensar". Enter e Espaço acionam o botão.
- Depois de dispensar, leve o foco para um lugar que faça sentido, como o próximo elemento. O `aipim.js` faz isso nos botões com `data-aipim-dismiss`.
- As cores de texto têm pelo menos 4,5:1 de contraste sobre a superfície nos dois temas (WCAG 1.4.3).

## Exemplos de código

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">

<div class="aipim-alert aipim-alert--error" role="alert">
  <svg class="aipim-icon aipim-alert__icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-error"></use></svg>
  <div class="aipim-alert__content">
    <p class="aipim-alert__title">O pagamento falhou</p>
    <p class="aipim-alert__message">Confira os dados do cartão e tente de novo.</p>
  </div>
  <button class="aipim-dismiss" type="button" aria-label="Dispensar" data-aipim-dismiss>
    <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-close"></use></svg>
  </button>
</div>
```

O `data-aipim-dismiss` precisa do `aipim.js`, que é opcional. Sem ele, remova o alert com o seu próprio código.

## Faça e não faça

- Faça: diga o que aconteceu e o que fazer em seguida ("Confira os dados do cartão e tente de novo").
- Não faça: uma mensagem vaga ("Algo deu errado"), que não mostra nenhum caminho.

<!-- Translated from docs/en/components/alert.md, sha256 62a454617b31 -->
