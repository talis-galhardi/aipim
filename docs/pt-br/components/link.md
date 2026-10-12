---
name: link
description: Leva quem lê a outra página ou seção.
status: stable
html: a
class: aipim-link
css: components/web/link.css
figma: Aipim DS, página Átomos, Link
tokens: [link, link/hover, link/visited, focus/ring, size/icon-sm, space/4, radius/sm, border/thick, focus/offset, Aipim/body, Aipim/label]
wcag: ["1.4.1 Uso de Cor", "1.4.3 Contraste (Mínimo)", "2.4.4 Finalidade do Link (Em Contexto)", "2.4.7 Foco Visível"]
related: [button]
---

# Link

Leva quem lê a outra página ou seção.

## Quando usar

- Para ir a outra página ou seção.
- No meio de um texto corrido.
- Para uma ação curta que só navega.

## Quando não usar

- Para executar uma ação, como salvar: use um [button](button.md).
- Para a ação principal de uma tela: use um botão primário.

## Variantes e props

| Classe | O que faz |
|---|---|
| `aipim-link` | No texto. Herda a tipografia do texto em volta. |
| `aipim-link aipim-link--standalone` | Sozinho, no estilo label (16/20 Bold), com um ícone opcional depois do texto. |

O sublinhado fica sempre ligado, então o link nunca depende só da cor. Num link standalone, um ícone opcional de 16px (`external-link`) pode vir depois do texto.

## Estados

Padrão, hover, foco e visitado. O hover escurece a cor (no tema escuro, clareia). Visitado usa `link/visited`. O foco é um anel de 3px, a 3px de distância, com cantos arredondados (`radius/sm`).

## Tokens usados

| Onde | Estado | Token | Claro | Escuro |
|---|---|---|---|---|
| Rótulo, sublinhado e ícone | Padrão | `link` | #014B95 | #8CBEFE |
| Rótulo, sublinhado e ícone | Hover, pressionado | `link/hover` | #00346B | #AED1FE |
| Rótulo, sublinhado e ícone | Visitado | `link/visited` | #892402 | #FEBBA9 |
| Anel de foco | Foco | `focus/ring` | #0364C2 | #AED1FE |

| Medida | Token | No texto | Standalone |
|---|---|---|---|
| Tipografia | `Aipim/body`, `Aipim/label` | 16/24 Regular | 16/20 Bold |
| Tamanho do ícone | `size/icon-sm` | nenhum | 16 |
| Espaço entre rótulo e ícone | `space/4` | nenhum | 4 |
| Raio dos cantos do anel de foco | `radius/sm` | 4 | 4 |
| Largura e distância do anel de foco | `border/thick`, `focus/offset` | 3 e 3 | 3 e 3 |

Um link standalone tem 20px de altura, abaixo do alvo mínimo de 24px (`size/touch-min`). Onde o toque importa, deixe espaço em volta ou coloque o link numa linha maior.

## Acessibilidade

- Use o elemento nativo `a` com `href`.
- Enter aciona o link. Tab move o foco, e o anel aparece sempre.
- Um link que abre outra aba diz isso no próprio texto.
- O texto do link faz sentido fora de contexto: evite "clique aqui".

## Exemplos de código

```html
<p>Leia as <a class="aipim-link" href="/acessibilidade">notas de acessibilidade</a> antes de publicar.</p>

<a class="aipim-link aipim-link--standalone" href="https://example.com">
  Link externo
  <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-external-link"></use></svg>
</a>
```

## Faça e não faça

- Faça: o texto do link diz aonde ele leva ("Leia as notas de acessibilidade").
- Não faça: "Clique aqui" não quer dizer nada fora de contexto.

<!-- Translated from docs/en/components/link.md, sha256 8c29613d1e36 -->
