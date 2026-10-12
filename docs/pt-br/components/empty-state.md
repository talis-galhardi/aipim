---
name: empty-state
description: O que uma lista, uma busca ou uma área mostra quando ainda não há nada para mostrar.
status: stable
html: div, h2, p, a, button
class: aipim-empty-state
css: components/web/empty-state.css
figma: Aipim DS, página Moléculas, Empty state
tokens: [text/primary, text/secondary, action/primary/bg, action/primary/text, border/strong, space/16, space/32, radius/lg, radius/md, size/control-md, space-role/inset-md, Aipim/h4, Aipim/body]
wcag: ["1.1.1 Conteúdo Não Textual", "1.3.1 Informações e Relações", "1.4.3 Contraste (Mínimo)"]
related: [button, alert]
---

# Empty state

O que uma lista, uma busca ou uma área mostra quando ainda não há nada para mostrar.

## Quando usar

- Uma lista ou uma busca sem nada para mostrar.
- A primeira vez que alguém abre uma área.

## Quando não usar

- Para erros: use uma mensagem de erro com um jeito de tentar de novo.
- Para uma espera curta enquanto o conteúdo carrega: use um indicador de carregamento.

## Variantes e props

| Classe | O que faz |
|---|---|
| `aipim-empty-state` | Uma coluna centralizada, com até 400px de largura. |
| `aipim-empty-state__art` | Espaço opcional de 160 por 120px para uma ilustração. A arte se ajusta ao espaço. As do próprio sistema estão em `illustrations/svg/` (`empty.svg`, `no-results.svg`, `error.svg`). |
| `aipim-empty-state__title` | Diz o que está vazio. `Aipim/h4`. |
| `aipim-empty-state__description` | Explica o porquê e o que fazer em seguida. `Aipim/body`. |
| `aipim-button` | Ação primária opcional, que começa o próximo passo. |

## Estados

O empty state não tem estados próprios. A ação segue o [button](button.md).

## Tokens usados

| Onde | Estado | Token | Claro | Escuro |
|---|---|---|---|---|
| Título | Todos | `text/primary` | #1A1511 | #FDF9F6 |
| Descrição | Todos | `text/secondary` | #4A423C | #ECE5DF |
| Preenchimento da ação | Padrão | `action/primary/bg` | #B43000 | #FF9275 |
| Rótulo da ação | Todos | `action/primary/text` | #FDF9F6 | #1A1511 |
| Contorno do espaço da ilustração (só no placeholder) | Todos | `border/strong` | #837A73 | #A39992 |

| Medida | Token | Valor |
|---|---|---|
| Padding, todos os lados | `space/32` | 32 |
| Espaço entre as partes | `space/16` | 16 |
| Tamanho do espaço da ilustração | Sem token | 160 por 120 |
| Raio dos cantos do espaço da ilustração | `radius/lg` | 12 |
| Altura da ação | `size/control-md` | 40 |
| Padding horizontal da ação | `space-role/inset-md` | 16 |
| Raio dos cantos da ação | `radius/md` | 8 |
| Tipografia do título | `Aipim/h4` | 24 SemiBold |
| Tipografia da descrição | `Aipim/body` | 16/24 Regular |

A largura vai até 400px (sem token). O tamanho do espaço da ilustração não tem token de propósito: é uma medida para arte, não um valor de espaço ou de forma.

## Acessibilidade

- A ilustração é decorativa: `alt` vazio numa imagem, ou `aria-hidden="true"` num SVG no código. Ela não recebe foco.
- O título é um cabeçalho no nível certo para a página.
- A descrição diz o que fazer em seguida, em texto simples.
- A ação é o primeiro elemento focável da área e deve receber o foco primeiro quando a área abre.

## Exemplos de código

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">

<div class="aipim-empty-state">
  <div class="aipim-empty-state__art"><img src="no-projects.svg" alt=""></div>
  <h2 class="aipim-empty-state__title">Nenhum projeto ainda</h2>
  <p class="aipim-empty-state__description">Crie seu primeiro projeto para começar.</p>
  <button class="aipim-button" type="button"><span>Criar projeto</span></button>
</div>
```

## Faça e não faça

- Faça: mostre um próximo passo claro ("Nenhum projeto ainda", "Crie seu primeiro projeto para começar", Criar projeto).
- Não faça: um beco sem saída ("Nada aqui" e nenhuma ação).

<!-- Translated from docs/en/components/empty-state.md, sha256 03de1f67e4f9 -->
