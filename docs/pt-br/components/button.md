---
name: button
description: A ação principal de uma tela ou de um bloco.
status: stable
html: button, a
class: aipim-button
css: components/web/button.css
figma: Aipim DS, página Átomos, Button
tokens: [action/primary/bg, action/primary/text, action/primary/hover, action/secondary/bg, action/secondary/text, action/secondary/hover, bg/sunken, focus/ring, opacity/disabled, size/control-sm, size/control-md, size/control-lg, size/icon-sm, size/icon-md, space-role/inset-sm, space-role/inset-md, space-role/inset-lg, space/8, radius/md, border/medium, border/thick, focus/offset, Aipim/label]
wcag: ["1.4.3 Contraste (Mínimo)", "1.4.11 Contraste Não Textual", "2.4.7 Foco Visível", "2.5.8 Tamanho do Alvo (Mínimo)", "4.1.2 Nome, Função, Valor"]
related: [link]
---

# Button

A ação principal de uma tela ou de um bloco.

## Quando usar

- Para a ação principal de uma tela ou de um bloco.
- Um botão primário por tela.
- Para as outras ações, use secondary, outline ou ghost.

## Quando não usar

- Para ir a outra página: use um [link](link.md).
- Várias ações com o mesmo peso lado a lado: deixe uma primária e torne as outras mais discretas.
- Ações destrutivas: fora da v1.0.

## Variantes e props

| Classe | O que faz |
|---|---|
| `aipim-button` | Primário. A ação principal. |
| `aipim-button--secondary` | Preenchimento na cor secundária. |
| `aipim-button--outline` | Transparente, com borda de 2px. |
| `aipim-button--ghost` | Transparente, sem borda. |
| `aipim-button--sm` / padrão / `aipim-button--lg` | Alturas de 32, 40 e 48px. |
| `aipim-button__icon-leading` | Vai num ícone antes do rótulo. Durante o carregamento, o spinner toma o lugar dele. |
| `aipim-button__spinner` | Um ícone `loading`, que só aparece com `aria-busy="true"`. |

Um rótulo, com um ícone opcional antes ou depois dele. Botões só com ícone não fazem parte da v1.0.

## Estados

Padrão, hover, foco, desativado e carregando. Pressionado tem a mesma cara do hover.

- **Desativado:** o atributo nativo `disabled` (ou `aria-disabled="true"` num link com estilo de botão). A opacidade é `opacity/disabled` (40%).
- **Carregando:** coloque `aria-busy="true"` e mostre o spinner. O rótulo continua lá. Enquanto estiver ocupado, ignore o acionamento no seu código; o CSS também bloqueia o ponteiro.
- **Foco:** um anel de 3px em `focus/ring`, a 3px do botão (`focus/offset`). Ele aparece só no foco por teclado (`:focus-visible`).

## Tokens usados

| Onde | Estado | Token | Claro | Escuro |
|---|---|---|---|---|
| Preenchimento primário | Padrão | `action/primary/bg` | #B43000 | #FF9275 |
| Preenchimento primário | Hover, pressionado | `action/primary/hover` | #892402 | #FEBBA9 |
| Rótulo e ícones do primário | Todos | `action/primary/text` | #FDF9F6 | #1A1511 |
| Preenchimento secundário | Padrão | `action/secondary/bg` | #0364C2 | #8CBEFE |
| Preenchimento secundário | Hover, pressionado | `action/secondary/hover` | #014B95 | #AED1FE |
| Rótulo e ícones do secundário | Todos | `action/secondary/text` | #FDF9F6 | #1A1511 |
| Borda do outline, rótulo do outline e do ghost | Todos | `action/secondary/bg` | #0364C2 | #8CBEFE |
| Preenchimento do outline e do ghost | Hover, pressionado | `bg/sunken` | #ECE5DF | #0E0A07 |
| Anel de foco | Foco | `focus/ring` | #0364C2 | #AED1FE |
| Botão inteiro | Desativado | `opacity/disabled` | 40% | 40% |

| Medida | Token | Pequeno | Médio | Grande |
|---|---|---|---|---|
| Altura | `size/control-sm`, `-md`, `-lg` | 32 | 40 | 48 |
| Padding horizontal | `space-role/inset-sm`, `-md`, `-lg` | 12 | 16 | 24 |
| Espaço entre ícone e rótulo | `space/8` | 8 | 8 | 8 |
| Tamanho do ícone | `size/icon-sm`, `size/icon-md` | 16 | 20 | 20 |
| Raio dos cantos | `radius/md` | 8 | 8 | 8 |
| Largura da borda (outline) | `border/medium` | 2 | 2 | 2 |
| Texto do rótulo | `Aipim/label` | 16/20 Bold | 16/20 Bold | 16/20 Bold |

As medidas valem a partir da borda externa. No código a borda tem sempre 2px (transparente nos botões preenchidos e no ghost), então toda variante tem o mesmo tamanho e o rótulo nunca sai do lugar.

As alturas 32 e 40 ficam abaixo do alvo de toque confortável de 44px (`size/touch-comfortable`) e atendem o mínimo de 24px (`size/touch-min`). Onde o toque é a entrada principal, use o Grande.

## Acessibilidade

- Use o elemento nativo `button`. Enter e Espaço acionam o botão.
- Tab move o foco, e o anel aparece sempre.
- Um botão desativado sai da ordem de tabulação (`disabled` nativo).
- Carregando: `aria-busy="true"`, e o texto do rótulo continua.
- Um botão que só mostra um ícone precisa de `aria-label`.
- Um botão de alternar precisa de `aria-pressed`.

## Exemplos de código

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="button.css">
<link rel="stylesheet" href="aipim-base.css"> <!-- para .aipim-icon -->

<button class="aipim-button" type="button">Salvar</button>
<button class="aipim-button aipim-button--outline" type="button">Cancelar</button>

<!-- Ícone antes do rótulo -->
<button class="aipim-button" type="button">
  <svg class="aipim-icon aipim-button__icon-leading" aria-hidden="true"><use href="icons/sprite.svg#aipim-add"></use></svg>
  <span>Adicionar</span>
</button>

<!-- Carregando -->
<button class="aipim-button" type="button" aria-busy="true">
  <svg class="aipim-icon aipim-button__spinner" aria-hidden="true"><use href="icons/sprite.svg#aipim-loading"></use></svg>
  <span>Salvando</span>
</button>
```

## Faça e não faça

- Faça: uma ação primária, e a outra mais discreta (Salvar primário, Cancelar outline).
- Não faça: dois botões primários lado a lado, porque eles disputam a atenção.

<!-- Translated from docs/en/components/button.md, sha256 eaf370f08a61 -->
