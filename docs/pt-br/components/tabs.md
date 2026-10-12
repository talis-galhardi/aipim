---
name: tabs
description: Alterna entre visões do mesmo conteúdo.
status: stable
html: div[role=tablist], button[role=tab], div[role=tabpanel]
class: aipim-tabs
css: components/web/tabs.css
figma: Aipim DS, página Moléculas, Tabs
tokens: [text/secondary, text/primary, bg/sunken, action/primary/bg, border/subtle, focus/ring, opacity/disabled, size/touch-comfortable, size/icon-md, space/8, space/16, radius/sm, border/thin, border/thick, focus/offset, Aipim/label]
wcag: ["1.4.11 Contraste Não Textual", "2.1.1 Teclado", "2.4.7 Foco Visível", "2.5.8 Tamanho do Alvo (Mínimo)", "4.1.2 Nome, Função, Valor"]
related: [tab-bar, link]
---

# Tabs

Alterna entre visões do mesmo conteúdo.

## Quando usar

- Para alternar entre visões do mesmo conteúdo.
- Quando as visões são curtas e ficam lado a lado.
- Até cinco ou seis abas.

## Quando não usar

- Para ir de uma página a outra: use [links](link.md) ou a [tab bar](tab-bar.md).
- Para as etapas de um fluxo: use um stepper.

## Variantes e props

| Classe ou atributo | O que faz |
|---|---|
| `aipim-tabs` com `role="tablist"` | A fileira de abas, com uma borda embaixo. |
| `aipim-tab` com `role="tab"` | Uma aba. Alvo de 44px, com rótulo e um ícone opcional de 20px antes dele. |
| `aria-selected="true"` | A aba selecionada. Ela mostra a barra de 3px. Sempre há uma aba selecionada. |
| `disabled` | Uma aba que não pode ser usada. |
| `role="tabpanel"` | O conteúdo de uma aba, escondido enquanto a aba dele não está selecionada. |

## Estados

Padrão, hover (preenchimento `bg/sunken` e rótulo em `text/primary`), foco (anel de 3px, a 3px de distância), selecionado (barra de 3px embaixo da aba) e desativado (`opacity/disabled`, 40%). Pressionado tem a mesma cara do hover.

## Tokens usados

| Onde | Estado | Token | Claro | Escuro |
|---|---|---|---|---|
| Rótulo da aba | Padrão | `text/secondary` | #4A423C | #ECE5DF |
| Rótulo da aba | Hover e selecionado | `text/primary` | #1A1511 | #FDF9F6 |
| Ícone da aba | Todos | `text/secondary` | #4A423C | #ECE5DF |
| Preenchimento da aba | Hover | `bg/sunken` | #ECE5DF | #0E0A07 |
| Barra de seleção | Selecionado | `action/primary/bg` | #B43000 | #FF9275 |
| Borda da lista | Todos | `border/subtle` | #DAD1CA | #4A423C |
| Anel de foco | Foco | `focus/ring` | #0364C2 | #AED1FE |
| Aba inteira | Desativado | `opacity/disabled` | 40% | 40% |

| Medida | Token | Valor |
|---|---|---|
| Altura da aba | `size/touch-comfortable` | 44 |
| Padding horizontal da aba | `space/16` | 16 |
| Espaço entre abas | `space/8` | 8 |
| Espaço entre ícone e rótulo | `space/8` | 8 |
| Tamanho do ícone | `size/icon-md` | 20 |
| Espessura da barra de seleção | `border/thick` | 3 |
| Largura da borda da lista | `border/thin` | 1 |
| Raio dos cantos da aba (cantos de cima) | `radius/sm` | 4 |
| Tipografia do rótulo | `Aipim/label` | 16/20 Bold |

A barra de seleção e a borda da lista dividem a mesma linha, então a lista continua com 44px de altura. Os cantos de baixo da aba são retos, para o preenchimento do hover encostar na barra e na linha. Cada aba tem 44px: atende tanto `size/touch-min` quanto `size/touch-comfortable`.

## Acessibilidade

- `role="tablist"`, `"tab"` e `"tabpanel"`. Use `aria-selected` na aba ativa, `aria-controls` apontando para o painel dela e `aria-labelledby` no painel.
- Só a aba selecionada fica na ordem de tabulação (`tabindex="0"`); as outras ficam com `-1`. As setas para a esquerda e para a direita passam de uma aba a outra, Home e End vão para a primeira e a última, e Tab sai da lista. O CSS não faz isso: use o `aipim.js`, que é opcional, ou siga o [padrão de abas da ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) no seu código.
- Os rótulos das abas são curtos: uma ou duas palavras.
- O anel de foco aparece sempre. A aba selecionada aparece por uma barra (uma forma), não só pela cor.
- Quando as abas não cabem, por exemplo com texto grande ou numa tela estreita, a lista rola para o lado dentro da própria caixa, e a página não. Com o `aipim.js`, a aba selecionada ou em foco rola até ficar à vista.
- Um painel começa do topo. Quando a pessoa escolhe uma aba e o topo da tela está abaixo da borda de cima da lista (a página foi rolada para dentro de um painel longo, com a lista fora de vista ou presa no topo), o `aipim.js` rola a página até a lista ficar no topo da tela. A altura é sempre a mesma, e o novo painel é lido desde o começo, sem herdar a rolagem da aba anterior. Uma lista sticky é medida onde fica na página, então trocar de aba várias vezes não desloca a página um pouco mais a cada troca. Quando o topo da tela está acima da borda de cima da lista, nada se move. Sem o `aipim.js`, faça o mesmo no seu código depois que a aba muda.

## Exemplos de código

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">
<script src="aipim.js"></script>

<div class="aipim-tabs" role="tablist" aria-label="Projeto">
  <button class="aipim-tab" role="tab" id="tab-overview" aria-selected="true" aria-controls="panel-overview" type="button"><span>Visão geral</span></button>
  <button class="aipim-tab" role="tab" id="tab-details" aria-selected="false" aria-controls="panel-details" type="button"><span>Detalhes</span></button>
</div>
<div role="tabpanel" id="panel-overview" aria-labelledby="tab-overview" tabindex="0">Conteúdo da visão geral.</div>
<div role="tabpanel" id="panel-details" aria-labelledby="tab-details" tabindex="0" hidden>Conteúdo de detalhes.</div>
```

## Faça e não faça

- Faça: rótulos curtos para visões do mesmo conteúdo (Visão geral, Detalhes, Atividade).
- Não faça: uma aba sozinha. Uma aba só não oferece escolha; mostre o conteúdo direto.
- Faça: deixe cada painel começar do topo quando a aba muda, inclusive quando a página foi rolada bem para baixo.
- Não faça: manter a rolagem da aba anterior. Um painel curto abre no fim, e a pessoa não sabe onde o conteúdo começa.

<!-- Translated from docs/en/components/tabs.md, sha256 24c6ce5db137 -->
