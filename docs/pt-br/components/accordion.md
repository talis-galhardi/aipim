---
name: accordion
description: Um título que abre um painel de texto, para esconder o que a maioria não precisa ler.
status: beta
group: molecules
html: details, summary
class: aipim-accordion
css: components/web/accordion.css
figma: Aipim DS, página Moléculas, Accordion
wcag: ["1.3.1 Informações e Relações", "1.4.3 Contraste (Mínimo)", "2.4.7 Foco Visível", "2.5.8 Tamanho do Alvo (Mínimo)", "4.1.2 Nome, Função, Valor"]
related: [tabs, card]
---

# Accordion

Um título que abre um painel de texto. Esconde o que a maioria não precisa ler e deixa achar o resto numa linha: perguntas frequentes, regras, detalhes de um pedido.

## Quando usar

- Perguntas frequentes e textos de ajuda, em que cada pessoa quer ler um ou dois itens.
- Detalhes de um pedido ou de uma regra, que só interessam a quem abre.

## Quando não usar

- Conteúdo que todo mundo precisa ler para decidir: deixe à mostra.
- Para trocar entre seções de mesmo peso: use as [abas](tabs.md).
- Dentro de outro accordion: um nível só.

## Decisão: um elemento nativo, sem script

O item é um `details` com um `summary`, que o navegador abre e fecha, com teclado e leitor de tela de graça. O Aipim só estiliza. Para abrir um por vez, os `details` do grupo levam o mesmo atributo `name`; sem ele, cada um abre sozinho.

## Decisão: o cabeçalho inteiro é o alvo

A linha do título, e não só o chevron, abre e fecha o item, com pelo menos 44px de altura. O chevron aponta o que vai acontecer (para baixo abre, para cima fecha), e o estado aberto ou fechado já chega ao leitor de tela pelo próprio navegador.

## Variantes e props

| Classe ou atributo | O que faz |
|---|---|
| `aipim-accordion` no `details` | Um item. Desenha o divisor embaixo, então itens um depois do outro formam o accordion. |
| `aipim-accordion__header` no `summary` | O cabeçalho: o título e o chevron. |
| `aipim-accordion__title` | O título. |
| `aipim-accordion__chevron` | O ícone de chevron (`chevron-down`), com `aria-hidden="true"`. Aponta para cima quando o item está aberto. |
| `aipim-accordion__panel` | O painel com o texto, que aparece quando o item está aberto. |
| `open` no `details` | Começa o item aberto. |
| `name` no `details` | O mesmo valor num grupo: só um item fica aberto. |

## Estados

| Estado | O que muda |
|---|---|
| Fechado, aberto | O painel só aparece aberto, e o chevron aponta para cima. |
| Hover | O cabeçalho se preenche com `bg/sunken`. |
| Foco | Um anel de 3px desenhado em volta do item inteiro, por dentro dele. |

Não há estado desativado. Um `details` não tem o seu, e um item que não pode ser aberto não deveria estar na página. Se precisar estar, explique o motivo no título ou no texto ao lado.

## Tokens usados

| Onde | Estado | Token | Claro | Escuro |
|---|---|---|---|---|
| Título | Todos | `text/primary` | #1A1511 | #FDF9F6 |
| Painel e chevron | Todos | `text/secondary` | #4A423C | #ECE5DF |
| Cabeçalho | Hover | `bg/sunken` | #ECE5DF | #0E0A07 |
| Divisor | Todos | `border/subtle` | #DAD1CA | #4A423C |
| Anel de foco | Foco | `focus/ring` | #0364C2 | #AED1FE |

| Medida | Token | Valor |
|---|---|---|
| Altura mínima do cabeçalho | `size/touch-comfortable` | 44 |
| Respiro horizontal | `space/16` | 16 |
| Respiro vertical do cabeçalho | `space/12` | 12 |
| Espaço entre título e chevron | `space/12` | 12 |
| Chevron | `size/icon-md` | 20 |
| Respiro de baixo do painel | `space/16` | 16 |
| Divisor | `border/thin` | 1, sobre a borda de baixo, sem altura extra |
| Anel de foco | `border/thick` | 3, por dentro do item |

## Acessibilidade

- É `details` e `summary`: o navegador diz "recolhido" ou "expandido" sozinho.
- Tab e Shift+Tab vão de cabeçalho em cabeçalho. Um painel aberto não é uma parada, só o que houver dentro dele.
- Enter e Espaço abrem ou fecham o item em foco.
- O mesmo `name` nos `details` de um grupo faz abrir um de cada vez.
- O chevron leva `aria-hidden="true"`.
- O painel é o texto dentro do `details`, lido quando está aberto.

## Exemplos de código

```html
<details class="aipim-accordion" name="pix" open>
  <summary class="aipim-accordion__header">
    <span class="aipim-accordion__title">Quando o Pix cai na conta?</span>
    <svg class="aipim-icon aipim-accordion__chevron" aria-hidden="true"><use href="icons/sprite.svg#aipim-chevron-down"></use></svg>
  </summary>
  <div class="aipim-accordion__panel">
    <p>O Pix cai em segundos, a qualquer hora, inclusive em feriados.</p>
  </div>
</details>
<details class="aipim-accordion" name="pix">
  <summary class="aipim-accordion__header">
    <span class="aipim-accordion__title">Posso cancelar um Pix agendado?</span>
    <svg class="aipim-icon aipim-accordion__chevron" aria-hidden="true"><use href="icons/sprite.svg#aipim-chevron-down"></use></svg>
  </summary>
  <div class="aipim-accordion__panel">
    <p>Abra o agendamento no aplicativo e escolha cancelar.</p>
  </div>
</details>
```

## Faça e não faça

- Faça: títulos curtos, a pergunta ou o assunto, que cabem em uma linha.
- Não faça: títulos que são frases inteiras, em que a linha vira um parágrafo e não se lê de relance.

<!-- Translated from docs/en/components/accordion.md, sha256 fd97b4f7595d -->
