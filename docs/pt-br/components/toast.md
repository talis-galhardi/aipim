---
name: toast
description: Uma confirmação rápida que some sozinha.
status: stable
html: div[role=status], button
class: aipim-toast
css: components/web/toast.css
figma: Aipim DS, página Moléculas, Toast
tokens: [bg/surface, border/subtle, text/primary, info/icon, success/icon, warning/icon, error/icon, action/secondary/bg, bg/sunken, focus/ring, space-role/inset-md, space-role/inset-sm, space/12, size/icon-md, size/icon-sm, size/control-sm, size/touch-min, radius/lg, border/thin, Aipim/elevation/overlay, duration/base, duration/fast, easing/enter, easing/exit, z/toast, Aipim/body]
wcag: ["1.4.1 Uso de Cor", "2.2.1 Tempo Ajustável", "2.4.7 Foco Visível", "2.5.8 Tamanho do Alvo (Mínimo)", "4.1.3 Mensagens de Status"]
related: [alert, button, icon-button]
---

# Toast

Uma confirmação rápida que some sozinha.

## Quando usar

- Para confirmar rápido uma ação, como "Salvo".
- Quando a pessoa não precisa decidir nada.
- Com uma ação, como Desfazer, quando ela ajuda.

## Quando não usar

- Para um erro que pede uma decisão: use um [alert](alert.md) ou um [modal](modal.md).
- Para uma informação essencial: use um alert, porque o toast pode sumir.

## Variantes e props

| Classe | O que faz |
|---|---|
| `aipim-toast-region` | Fixa no pé da tela, acima de tudo (`z/toast`). Guarda os toasts. Nunca bloqueia a página. |
| `aipim-toast` | Info. O tipo padrão. |
| `aipim-toast--success` / `--warning` / `--error` | Só a cor do ícone muda. A superfície é a mesma. |
| `aipim-toast__icon` | O ícone do tipo. Obrigatório. |
| `aipim-toast__message` | Uma frase curta. |
| `aipim-button aipim-button--ghost aipim-button--sm` | A ação opcional, como Desfazer. |
| `aipim-icon-button aipim-icon-button--sm` | Botão de dispensar opcional: um [icon button](icon-button.md) pequeno, de 24px. |

## Estados

O toast em si não tem hover nem pressionado; o botão de dispensar segue o [icon button](icon-button.md). Ele entra em 200ms (`duration/base`, `easing/enter`) e sai em 100ms (`duration/fast`, `easing/exit`). Com movimento reduzido, as durações ficam em 0ms.

Para sair, coloque `data-state="closing"` e remova o toast quando a animação terminar. O `aipim.js` faz isso nos botões com `data-aipim-dismiss`.

## Tokens usados

| Onde | Estado | Token | Claro | Escuro |
|---|---|---|---|---|
| Preenchimento do contêiner | Todos | `bg/surface` | #FDF9F6 | #302A25 |
| Borda do contêiner | Todos | `border/subtle` | #DAD1CA | #4A423C |
| Ícone do tipo | Info | `info/icon` | #047DF1 | #8CBEFE |
| Ícone do tipo | Success | `success/icon` | #007A44 | #C4EDD1 |
| Ícone do tipo | Warning | `warning/icon` | #5E4B03 | #FFD337 |
| Ícone do tipo | Error | `error/icon` | #DE316D | #FF5387 |
| Mensagem | Todos | `text/primary` | #1A1511 | #FDF9F6 |
| Ícone de dispensar | Todos | `text/primary` | #1A1511 | #FDF9F6 |
| Preenchimento do botão de dispensar | Hover e pressionado | `bg/sunken` | #ECE5DF | #0E0A07 |
| Rótulo da ação (botão ghost) | Todos | `action/secondary/bg` | #0364C2 | #8CBEFE |
| Preenchimento da ação (botão ghost) | Hover e pressionado | `bg/sunken` | #ECE5DF | #0E0A07 |

| Medida | Token | Valor |
|---|---|---|
| Padding, todos os lados | `space-role/inset-md` | 16 |
| Espaço entre os itens | `space/12` | 12 |
| Tamanho do ícone do tipo | `size/icon-md` | 20 |
| Altura da ação | `size/control-sm` | 32 |
| Padding horizontal da ação | `space-role/inset-sm` | 12 |
| Tamanho do botão de dispensar | `size/touch-min` | 24 |
| Tamanho do ícone de dispensar | `size/icon-sm` | 16 |
| Raio dos cantos | `radius/lg` | 12 |
| Largura da borda | `border/thin` | 1 |
| Sombra | `Aipim/elevation/overlay` | 0 16 32 -8 a 24%, 0 8 16 -4 a 12% (claro). 60% e 40% no escuro. |
| Tipografia da mensagem | `Aipim/body` | 16/24 Regular |
| Movimento de entrada | `duration/base`, `easing/enter` | 200ms |
| Movimento de saída | `duration/fast`, `easing/exit` | 100ms |
| Ordem de empilhamento | `z/toast` | 500 |

A largura é de 360px (sem token) e encolhe para caber em telas estreitas. As medidas valem a partir da borda externa. Com ação e botão de dispensar, o toast tem 64px de altura. Só com a mensagem, 56px.

O botão de dispensar tem 24px: atende `size/touch-min` e fica abaixo de `size/touch-comfortable` (44).

## Acessibilidade

- Coloque os toasts numa região com `aria-live="polite"` e dê `role="status"` a cada um. Use `role="alert"` só para erros urgentes.
- Deixe o toast na tela por pelo menos 5 segundos, mais tempo para textos mais longos, e mantenha o toast enquanto ele tiver o foco ou o ponteiro em cima (WCAG 2.2.1: um limite de tempo precisa ser ajustável ou longo o bastante). O CSS não conta tempo nenhum: o timer é seu.
- Nunca faça do toast a única forma de saber algo importante.
- Um toast com ação é alcançável pelo Tab. A ação tem um nome claro, como "Desfazer". Esc dispensa o toast quando ele pode ser dispensado.
- O ícone do tipo é decorativo: `aria-hidden="true"`.

## Exemplos de código

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">
<script src="aipim.js"></script>

<div class="aipim-toast-region" aria-live="polite">
  <div class="aipim-toast aipim-toast--success" role="status">
    <svg class="aipim-icon aipim-toast__icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-success"></use></svg>
    <p class="aipim-toast__message">Item excluído.</p>
    <button class="aipim-button aipim-button--ghost aipim-button--sm" type="button"><span>Desfazer</span></button>
    <button class="aipim-icon-button aipim-icon-button--sm" type="button" aria-label="Dispensar" data-aipim-dismiss>
      <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-close"></use></svg>
    </button>
  </div>
</div>
```

## Faça e não faça

- Faça: uma confirmação rápida, com um jeito de desfazer ("Item excluído." Desfazer).
- Não faça: colocar num toast um erro que pede decisão ("O pagamento falhou. Confira os dados do cartão."). O lugar dele é num alert.

<!-- Translated from docs/en/components/toast.md, sha256 b4da3d13c770 -->
