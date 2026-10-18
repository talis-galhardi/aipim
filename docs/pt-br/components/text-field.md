---
name: text-field
description: Um campo de uma linha para textos curtos, com um rótulo visível acima dele.
status: stable
group: molecules
html: input, label
class: aipim-field
css: components/web/text-field.css
figma: Aipim DS, página Moléculas, Text field
wcag: ["1.3.1 Informações e Relações", "1.4.3 Contraste (Mínimo)", "1.4.11 Contraste Não Textual", "2.4.7 Foco Visível", "3.3.1 Identificação de Erro", "3.3.2 Rótulos ou Instruções", "4.1.2 Nome, Função, Valor"]
related: [checkbox, radio]
---

# Text field

Um campo de uma linha para textos curtos, com um rótulo visível acima dele.

## Quando usar

- Para textos curtos digitados: nomes, e-mails, buscas.
- Sempre com um rótulo visível acima do campo.
- Com texto de ajuda para o formato ou para os limites.

## Quando não usar

- Para escolher entre poucas opções: use [radio buttons](radio.md) ou um select.
- Para textos longos: uma área de texto (fora da v1.0).
- Um placeholder não é um rótulo.

## Decisão: o rótulo fica acima do campo

Consideramos o rótulo flutuante, que fica dentro do campo e sobe e diminui quando você digita, como no Material Design. Escolhemos o rótulo acima do campo por acessibilidade.

- O rótulo fica sempre visível e no tamanho cheio. Fica fácil de ler, inclusive com zoom ou com uma lupa de tela.
- Não há animação nem rótulo cortado, então não há nada para desligar para quem prefere menos movimento.
- O campo mantém as alturas de controle de 40px e 48px, sem precisar de um token de altura a mais.

Não crie uma variante com rótulo flutuante.

## Variantes e props

| Classe ou atributo | O que faz |
|---|---|
| `aipim-field` | O contêiner: rótulo, controle e texto de ajuda, empilhados. |
| `aipim-field--lg` | Campo grande, de 48px. O padrão é o médio, de 40px. |
| `aipim-field__label`, `aipim-field__control`, `aipim-field__helper` | As três partes. |
| `aipim-field__icon` | O ícone de erro dentro do texto de ajuda. Só aparece quando o input é inválido. |
| `aria-invalid="true"` no input | O estado de erro. |
| `disabled` no input | O estado desativado. Para navegadores sem `:has()`, coloque também `aipim-field--disabled` no contêiner. |

O conteúdo pode ser um placeholder ou um valor digitado. O texto de ajuda é opcional.

## Estados

Padrão, hover, foco, erro e desativado. O estado de erro acrescenta um ícone e uma mensagem.

- **Hover:** a borda passa de 1px para 2px, por dentro do campo, e o texto não sai do lugar.
- **Foco:** um anel de 3px em `focus/ring`, a 3px de distância (`focus/offset`), por cima da borda de 1px.
- **Erro:** a borda fica em `error/icon` com 2px, e o texto de ajuda passa para `error/text` e mostra o ícone de erro.
- **Desativado:** o preenchimento do campo vira `bg/sunken` e o campo inteiro recebe `opacity/disabled`.

## Tokens usados

| Onde | Estado | Token | Claro | Escuro |
|---|---|---|---|---|
| Rótulo | Todos | `text/primary` | #1A1511 | #FDF9F6 |
| Preenchimento do campo | Padrão, hover, foco, erro | `bg/surface` | #FDF9F6 | #302A25 |
| Preenchimento do campo | Desativado | `bg/sunken` | #ECE5DF | #0E0A07 |
| Borda do campo | Padrão, foco (1px), hover (2px) | `border/strong` | #837A73 | #A39992 |
| Borda do campo | Erro (2px) | `error/icon` | #DE316D | #FF5387 |
| Valor | Preenchido | `text/primary` | #1A1511 | #FDF9F6 |
| Valor | Placeholder | `text/muted` | #665D56 | #DAD1CA |
| Texto de ajuda | Padrão | `text/secondary` | #4A423C | #ECE5DF |
| Texto de ajuda | Erro | `error/text` | #8F083F | #FFD5DC |
| Ícone de erro | Erro | `error/icon` | #DE316D | #FF5387 |
| Anel de foco | Foco | `focus/ring` | #0364C2 | #AED1FE |
| Campo inteiro | Desativado | `opacity/disabled` | 40% | 40% |

| Medida | Token | Médio | Grande |
|---|---|---|---|
| Altura do campo | `size/control-md`, `size/control-lg` | 40 | 48 |
| Padding horizontal | `space-role/inset-sm`, `space-role/inset-md` | 12 | 16 |
| Espaço entre rótulo e campo | `space/8` | 8 | 8 |
| Espaço entre campo e texto de ajuda | `space/8` | 8 | 8 |
| Espaço entre ícone de erro e texto de ajuda | `space/4` | 4 | 4 |
| Tamanho do ícone de erro | `size/icon-sm` | 16 | 16 |
| Raio dos cantos | `radius/md` | 8 | 8 |
| Largura da borda, e no hover e no erro | `border/thin`, `border/medium` | 1, 2 | 1, 2 |
| Tipografia do rótulo, do valor e da ajuda | `Aipim/label`, `Aipim/body`, `Aipim/body-sm` | 16/20 Bold, 16/24, 14/21 | igual |

O campo de 40px fica abaixo do alvo de toque confortável de 44px (`size/touch-comfortable`) e atende o mínimo de 24px. Onde o toque é a entrada principal, use o Grande.

## Acessibilidade

- Um rótulo associado ao campo (`for` e `id`).
- Texto de ajuda e de erro ligados pelo `aria-describedby`.
- Um erro aparece com ícone e texto, nunca só com cor.
- Campos inválidos recebem `aria-invalid="true"`.
- Tab entra e sai do campo. Esc não apaga o que foi digitado. Enter dentro de um formulário envia o formulário.
- Contraste: um campo desativado é um componente inativo e fica isento da WCAG 1.4.3, então ferramentas automáticas podem apontar o texto de ajuda dele. Mantenha o rótulo visível.

## Exemplos de código

```html
<div class="aipim-field">
  <label class="aipim-field__label" for="email">E-mail</label>
  <input class="aipim-field__control" id="email" type="email" aria-describedby="email-help">
  <p class="aipim-field__helper" id="email-help"><span>Usado só para recibos</span></p>
</div>

<!-- Erro -->
<div class="aipim-field">
  <label class="aipim-field__label" for="email2">E-mail</label>
  <input class="aipim-field__control" id="email2" type="email" value="nome@" aria-invalid="true" aria-describedby="email2-help">
  <p class="aipim-field__helper" id="email2-help">
    <svg class="aipim-icon aipim-field__icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-error"></use></svg>
    <span>Digite um e-mail válido</span>
  </p>
</div>
```

## Faça e não faça

- Faça: o rótulo diz o que digitar, e o texto de ajuda mostra o formato.
- Não faça: um placeholder sozinho, que some enquanto a pessoa digita.

<!-- Translated from docs/en/components/text-field.md, sha256 49677ac5dd19 -->
