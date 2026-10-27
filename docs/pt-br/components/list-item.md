---
name: list-item
description: Uma linha de uma lista, com início, título e descrição, e um fim que é um chevron, um valor ou um switch.
status: beta
group: molecules
html: ul, li, a, button, label
class: aipim-list-item
css: components/web/list-item.css
figma: Aipim DS, página Moléculas, List item
wcag: ["1.3.1 Informações e Relações", "1.4.3 Contraste (Mínimo)", "2.4.7 Foco Visível", "2.5.3 Rótulo no Nome", "2.5.8 Tamanho do Alvo (Mínimo)", "4.1.2 Nome, Função, Valor"]
related: [avatar, switch, card]
---

# List item

Uma linha de uma lista: no início um avatar ou um ícone, depois o título e a descrição, e no fim um chevron, um valor ou um switch. É a base de quase toda tela de aplicativo: configurações, extrato, contatos, notificações.

## Quando usar

- Listas de itens parecidos: configurações, contatos, transações, notificações.
- Linhas que abrem outra tela (com chevron) ou ligam algo (com switch).

## Quando não usar

- Conteúdo com imagem grande e vários textos: use o [card](card.md).
- Para escolher entre opções de um formulário: use [radio](radio.md), [checkbox](checkbox.md) ou [select](select.md).
- Uma tabela com várias colunas: não nesta versão.

## Decisão: a linha age ou só mostra

A linha com chevron é um link ou botão inteiro: um alvo de toque de pelo menos 44px e uma parada do Tab, e o leitor de tela lê o título e a descrição juntos. A linha com valor, ou sem nada no fim, só mostra: não tem hover nem foco. A linha com switch não é um link: o switch é o controle, e o título é o rótulo dele.

## Decisão: o início é um avatar que se troca

O início não é um espaço vazio. É um [avatar](avatar.md) de 40px que você troca pelo ícone, pela foto ou pelas iniciais. Assim todas as linhas de uma lista alinham o texto no mesmo ponto, com ou sem imagem, e o produto não inventa um segundo tipo de ícone.

## Variantes e props

| Classe ou atributo | O que faz |
|---|---|
| `aipim-list` no `ul` | A lista: sem marcadores e sem margem. |
| `aipim-list-item` no `li` | Um item. Desenha o divisor embaixo, e o último item da lista não tem. |
| `aipim-list-item--plain` | Sem divisor, para um item que não é o último. |
| `aipim-list-item__row` | A linha: respiro, espaço entre as partes e altura mínima. Um `div` quando só mostra, um `a` ou um `button` quando leva a algum lugar, um `label` quando tem um switch. |
| `aipim-list-item__leading` | O início, em geral um [avatar](avatar.md). |
| `aipim-list-item__text` com `__title` e `__description` | O título, e a descrição embaixo quando houver. |
| `aipim-list-item__trailing` | O fim: um ícone de chevron, um valor em texto ou um switch. |
| `aria-disabled="true"` no link, `disabled` no botão | O estado desativado. |

## Estados

| Estado | O que muda |
|---|---|
| Padrão | A linha como ela é. |
| Hover | A linha se preenche com `bg/sunken`. Só nas linhas que agem. |
| Foco | Um anel de 3px desenhado por dentro da linha. A linha com switch não tem: o switch desenha o próprio anel. |
| Desativado | Os textos e o fim vão para `text/muted` e o início fica apagado. |

Uma linha que só mostra não tem hover nem foco.

## Tokens usados

| Onde | Estado | Token | Claro | Escuro |
|---|---|---|---|---|
| Título | Todos | `text/primary` | #1A1511 | #FDF9F6 |
| Descrição, valor e chevron | Todos | `text/secondary` | #4A423C | #ECE5DF |
| Fundo | Hover | `bg/sunken` | #ECE5DF | #0E0A07 |
| Divisor | Todos | `border/subtle` | #DAD1CA | #4A423C |
| Anel de foco | Foco | `focus/ring` | #0364C2 | #AED1FE |
| Texto | Desativado | `text/muted` | #665D56 | #DAD1CA |

O início usa as cores do [avatar](avatar.md).

| Medida | Token | Valor |
|---|---|---|
| Altura mínima | `size/touch-comfortable` | 44 |
| Respiro horizontal | `space/16` | 16 |
| Respiro vertical | `space/12` | 12 |
| Espaço entre as partes | `space/12` | 12 |
| Início (avatar) | `size/control-md` | 40 |
| Chevron | `size/icon-md` | 20 |
| Divisor | `border/thin` | 1, sobre a borda de baixo |
| Anel de foco | `border/thick` | 3, por dentro da linha |

O divisor é desenhado sobre a borda de baixo do item e não soma altura. Com título e descrição, a linha tem 69px de altura: 45 de texto e 12 de respiro em cima e embaixo. Sem início e sem descrição, tem 48.

## Acessibilidade

- A lista é um `ul` com `li`, então o leitor de tela diz quantos itens há.
- Uma linha que leva a algum lugar é um `a` ou um `button` cujo nome é o próprio conteúdo, então o leitor de tela lê o título e a descrição juntos. Não nomeie com `aria-labelledby` só no título: o nome precisa conter todo o texto visível (WCAG 2.5.3).
- Tab e Shift+Tab param nas linhas que agem e nos switches. Uma linha que só mostra não é uma parada.
- Enter abre o destino de uma linha com chevron. Espaço liga ou desliga o switch quando o foco está nele.
- O switch tem `role="switch"`. A linha inteira é o `label` dele, então o título e a descrição são o nome, e um clique em qualquer ponto da linha troca o switch.
- O chevron leva `aria-hidden="true"`. O início leva `aria-hidden="true"` quando o texto já diz quem é.
- Um link desativado leva `aria-disabled="true"`, não recebe foco (`tabindex="-1"`) e ignora cliques.

## Exemplos de código

```html
<ul class="aipim-list">
  <li class="aipim-list-item">
    <a class="aipim-list-item__row" href="chaves-pix.html">
      <span class="aipim-list-item__leading">
        <span class="aipim-avatar" aria-hidden="true"><svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-user"></use></svg></span>
      </span>
      <span class="aipim-list-item__text">
        <span class="aipim-list-item__title">Chave Pix</span>
        <span class="aipim-list-item__description">CPF ou e-mail</span>
      </span>
      <span class="aipim-list-item__trailing"><svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-chevron-right"></use></svg></span>
    </a>
  </li>
  <li class="aipim-list-item">
    <label class="aipim-list-item__row">
      <span class="aipim-list-item__text"><span class="aipim-list-item__title">Notificações</span></span>
      <span class="aipim-list-item__trailing">
        <span class="aipim-switch">
          <input class="aipim-switch__input" type="checkbox" role="switch">
          <span class="aipim-switch__track" aria-hidden="true"></span>
        </span>
      </span>
    </label>
  </li>
</ul>
```

## Faça e não faça

- Faça: dê um início a todas as linhas, mesmo que seja só o ícone, para o texto ficar alinhado.
- Não faça: deixar uma linha sem início no meio da lista, onde o texto pula de lugar.

<!-- Translated from docs/en/components/list-item.md, sha256 85a83726e499 -->
