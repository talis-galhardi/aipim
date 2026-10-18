---
name: tag
description: Um rótulo curto para uma categoria, uma tecnologia ou um status.
status: stable
group: atoms
html: span, button, ul, li
class: aipim-tag
css: components/web/tag.css
figma: Aipim DS, página Átomos, Tag
wcag: ["1.4.1 Uso de Cor", "1.4.3 Contraste (Mínimo)", "2.4.7 Foco Visível", "2.5.8 Tamanho do Alvo (Mínimo)", "4.1.2 Nome, Função, Valor"]
related: [button, alert]
---

# Tag

Um rótulo curto para uma categoria, uma tecnologia ou um status.

## Quando usar

- Para um rótulo curto: uma categoria, uma tecnologia ou um status.
- Para mostrar os atributos de um item.
- Removível, quando a própria pessoa escolhe as tags.

## Quando não usar

- Para ações: use um [button](button.md).
- Para textos longos ou frases inteiras.
- Para um status que pede atenção: use um [alert](alert.md).

## Variantes e props

| Classe | O que faz |
|---|---|
| `aipim-tag` | Outline. Borda de 1px em `border/strong`. |
| `aipim-tag--accent` | Preenchida com a cor de acento, sem borda. |
| `aipim-tag--inverse` | Para uma superfície escura ou colorida, como um masthead. Sem preenchimento. Rótulo, ícone e borda seguem a cor do texto da superfície. |
| `aipim-tag--link` | Uma tag que leva a algum lugar: use um `a`. Rótulo na cor de link, sublinhado. Não tem botão de remover. |
| `aipim-tag > .aipim-icon` | Ícone opcional de 16px antes do rótulo. |
| `aipim-tag__remove` | Botão de remover opcional, só para tags que a pessoa pode tirar. |

## Estados

Uma tag que não é removível nem link não tem estados e não recebe foco. O botão de remover tem hover (preenchimento) e foco (anel de 3px, a 3px de distância). A tag link tem hover (o rótulo muda para `link/hover`), visitado (`link/visited`) e foco (um anel de 3px em volta da tag inteira, a 3px de distância).

## Tokens usados

| Onde | Estado | Token | Claro | Escuro |
|---|---|---|---|---|
| Borda do outline | Todos | `border/strong` | #837A73 | #A39992 |
| Rótulo, ícone e ícone de remover do outline | Todos | `text/primary` | #1A1511 | #FDF9F6 |
| Preenchimento do botão de remover do outline | Hover no remover | `bg/sunken` | #ECE5DF | #0E0A07 |
| Preenchimento do accent | Todos | `accent/bg` | #FFD337 | #FFD337 |
| Rótulo do accent | Todos | `accent/text` | #1A1511 | #1A1511 |
| Preenchimento do botão de remover do accent | Hover no remover | `bg/surface` | #FDF9F6 | #302A25 |
| Rótulo e ícone do link | Padrão | `link` | #014B95 | #8CBEFE |
| Rótulo do link | Hover | `link/hover` | #00346B | #AED1FE |
| Rótulo do link | Visitado | `link/visited` | #892402 | #FEBBA9 |
| Borda do link | Todos | `border/strong` | #837A73 | #A39992 |
| Rótulo, ícone e ícone de remover do inverse | Todos | Cor do texto da superfície | Herdada | Herdada |
| Borda do inverse | Todos | Cor do texto da superfície a 60% | Herdada | Herdada |
| Preenchimento do botão de remover do inverse | Hover no remover | Cor do texto da superfície a 16% | Herdada | Herdada |
| Anel de foco | Foco | `focus/ring` | #0364C2 | #AED1FE |

| Medida | Token | Valor |
|---|---|---|
| Padding vertical | `space/4` | 4 |
| Padding horizontal | `space/12` | 12 |
| Espaço entre os itens | `space/8` | 8 |
| Altura sem botão de remover | Altura da linha do rótulo mais o padding | 29 |
| Altura com botão de remover | Botão de remover mais o padding | 32 |
| Tamanho do ícone | `size/icon-sm` | 16 |
| Tamanho do botão de remover | `size/touch-min` | 24 |
| Raio dos cantos | `radius/full` | Totalmente redondo |
| Largura da borda do outline | `border/thin` | 1 |
| Tipografia do rótulo | `Aipim/body-sm` | 14/21 Regular |

As medidas valem a partir da borda externa. No código a borda tem sempre 1px (transparente na tag accent) e sai de dentro do padding, então os dois estilos têm o mesmo tamanho.

O botão de remover tem 24px: atende `size/touch-min` e fica abaixo de `size/touch-comfortable` (44).

## Acessibilidade

- O texto aparece sempre, nunca só um ícone.
- O botão de remover precisa de um `aria-label` com o nome da tag, como "Remover design". Enter e Espaço removem a tag; depois disso o `aipim.js` leva o foco para o próximo elemento focável.
- Um grupo de tags é uma lista (`ul` e `li`), assim o leitor de tela anuncia quantas são.
- O rótulo do accent tem contraste de 4,5:1 sobre o preenchimento do accent nos dois temas.
- Uma tag inverse não tem cores próprias. Confira se a cor do texto da superfície tem 4,5:1 contra a superfície. No arquivo do Figma, o estilo Inverse usa o modo Dark da coleção Semantic, então o lugar dele é em superfícies escuras.
- Uma tag link é um `a` com um `href` de verdade. O sublinhado fica sempre ligado, então o link não depende só da cor. Não coloque um botão de remover dentro dela.

## Exemplos de código

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">

<ul role="list" style="display:flex;gap:8px;list-style:none;padding:0">
  <li><span class="aipim-tag"><span>Design</span></span></li>
  <li>
    <span class="aipim-tag aipim-tag--accent">
      <span>Design</span>
      <button class="aipim-tag__remove" type="button" aria-label="Remover design" data-aipim-dismiss>
        <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-close"></use></svg>
      </button>
    </span>
  </li>
</ul>

<!-- Inverse, numa superfície escura -->
<div data-theme="dark" style="background:var(--aipim-bg-canvas);color:var(--aipim-text-primary);padding:16px">
  <span class="aipim-tag aipim-tag--inverse"><span>Design</span></span>
</div>

<!-- Link -->
<a class="aipim-tag aipim-tag--link" href="/tags/design"><span>Design</span></a>
```

## Faça e não faça

- Faça: um rótulo curto, de uma ou duas palavras ("Design").
- Não faça: usar uma frase como tag. Use texto comum.

<!-- Translated from docs/en/components/tag.md, sha256 a7025bce1ae0 -->
