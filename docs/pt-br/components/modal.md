---
name: modal
description: Uma decisão ou uma tarefa curta que pede atenção, por cima da página.
status: stable
group: organisms
html: dialog, h2, p, button
class: aipim-modal
css: components/web/modal.css
figma: Aipim DS, página Organismos, Modal
wcag: ["1.4.11 Contraste Não Textual", "2.1.2 Sem Bloqueio do Teclado", "2.4.3 Ordem do Foco", "2.4.7 Foco Visível", "4.1.2 Nome, Função, Valor"]
related: [button, icon-button, alert]
---

# Modal

Uma decisão ou uma tarefa curta que pede atenção, por cima da página.

## Quando usar

- Para uma decisão ou uma tarefa curta que pede atenção.
- Confirmações, formulários curtos e escolhas com consequências.
- Em tela cheia no celular.

## Quando não usar

- Para uma informação que pode ficar na página: use um [alert](alert.md) ou conteúdo comum.
- Para tarefas ou formulários longos: use uma página.
- Para abrir um modal a partir de outro modal.

## Variantes e props

| Classe | O que faz |
|---|---|
| `aipim-modal` | O painel, no elemento nativo `dialog`. O navegador desenha o fundo escurecido (`::backdrop`). |
| `aipim-modal__header` | Guarda o título e o botão de fechar. |
| `aipim-modal__title` | Dá nome à decisão ou à tarefa. `Aipim/h3`. Ligue-o com `aria-labelledby`. |
| `aipim-icon-button` | O botão de fechar: um [icon button](icon-button.md) médio, de 44px. Obrigatório. |
| `aipim-modal__body` | A mensagem ou o conteúdo da tarefa. `Aipim/body`. |
| `aipim-modal__actions` | Cancelar como [button](button.md) outline e a ação principal como botão primário. |

Numa tela com menos de 600px (`breakpoint/tablet`), o painel ocupa a tela inteira, o padding passa a 24 e as ações se empilham na largura toda.

## Estados

Fechado ou aberto. Abra com `showModal()`, ou sem script, com um comando de invocação:

```html
<button command="show-modal" commandfor="my-modal">Abrir</button>
<button command="close" commandfor="my-modal">Fechar</button>
```

O `aipim.js`, que é opcional, acrescenta os mesmos comandos nos navegadores que ainda não têm esse recurso. Esc fecha o modal, e o foco volta para o controle que o abriu.

## Tokens usados

| Onde | Estado | Token | Claro | Escuro |
|---|---|---|---|---|
| Preenchimento do painel | Todos | `bg/surface` | #FDF9F6 | #302A25 |
| Fundo escurecido (com `opacity/scrim`, 50%) | Todos | `bg/scrim` | #0E0A07 | #0E0A07 |
| Título | Todos | `text/primary` | #1A1511 | #FDF9F6 |
| Corpo | Todos | `text/secondary` | #4A423C | #ECE5DF |
| Ícone de fechar | Todos | `text/primary` | #1A1511 | #FDF9F6 |
| Preenchimento do botão de fechar | Hover e pressionado | `bg/sunken` | #ECE5DF | #0E0A07 |
| Borda e rótulo do botão Cancelar | Todos | `action/secondary/bg` | #0364C2 | #8CBEFE |
| Preenchimento do botão de confirmar | Todos | `action/primary/bg` | #B43000 | #FF9275 |
| Rótulo do botão de confirmar | Todos | `action/primary/text` | #FDF9F6 | #1A1511 |
| Anel de foco | Foco | `focus/ring` | #0364C2 | #AED1FE |

| Medida | Token | Valor |
|---|---|---|
| Padding do painel, desktop | `space-role/inset-xl` | 32 |
| Padding do painel, celular | `space-role/inset-lg` | 24 |
| Espaço entre header, corpo e ações | `space/16` | 16 |
| Espaço entre as ações | `space/12` | 12 |
| Largura do painel, desktop | Sem token | 480 |
| Raio dos cantos do painel | `radius/2xl` | 24 |
| Tamanho do botão de fechar | `size/touch-comfortable` | 44 |
| Raio dos cantos do botão de fechar | `radius/md` | 8 |
| Tamanho do ícone de fechar | `size/icon-lg` | 24 |
| Altura das ações | `size/control-md` | 40 |
| Tipografia do título | `Aipim/h3` | 32 Bold |
| Tipografia do corpo | `Aipim/body` | 16/24 Regular |
| Sombra | `Aipim/elevation/overlay` | 0 16 32 -8 a 24%, 0 8 16 -4 a 12% (claro). 60% e 40% no escuro. |
| Opacidade do fundo escurecido | `opacity/scrim` | 50% |
| Ordem de empilhamento | `z/modal` | 400 |

O `z/modal` serve para layouts que não usam o `dialog` nativo: um `dialog` aberto com `showModal()` fica na top layer e ignora o `z-index`.

## Acessibilidade

- O `dialog` nativo aberto com `showModal()` resolve o resto: o foco entra, Tab e Shift+Tab ficam dentro, a página atrás fica inerte e Esc fecha.
- Ligue o título com `aria-labelledby`. Use `role="alertdialog"` para uma confirmação que interrompe a pessoa.
- O botão de fechar tem um `aria-label`, como "Fechar", e tem 44px.
- Num modal que pede uma decisão, não feche com um clique no fundo escurecido.
- O texto e o anel de foco atendem o contraste sobre o painel nos dois temas.

## Exemplos de código

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">

<button class="aipim-button" type="button" command="show-modal" commandfor="delete-modal"><span>Excluir projeto</span></button>

<dialog class="aipim-modal" id="delete-modal" aria-labelledby="delete-title">
  <div class="aipim-modal__header">
    <h2 class="aipim-modal__title" id="delete-title">Excluir o projeto?</h2>
    <button class="aipim-icon-button" type="button" aria-label="Fechar" command="close" commandfor="delete-modal">
      <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-close"></use></svg>
    </button>
  </div>
  <p class="aipim-modal__body">Não dá para desfazer. Todos os arquivos do projeto serão apagados.</p>
  <div class="aipim-modal__actions">
    <button class="aipim-button aipim-button--outline" type="button" command="close" commandfor="delete-modal"><span>Cancelar</span></button>
    <button class="aipim-button" type="button"><span>Excluir</span></button>
  </div>
</dialog>
```

## Faça e não faça

- Faça: use para uma decisão que pede atenção, com ações claras ("Excluir o projeto?", Cancelar, Confirmar).
- Não faça: interromper com uma informação que pode ficar na página ("Que bom ver você de novo! Uma dica...").

<!-- Translated from docs/en/components/modal.md, sha256 ffcd03cbb413 -->
