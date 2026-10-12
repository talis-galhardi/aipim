---
name: tab-bar
description: A navegação principal no celular, com três a cinco destinos.
status: stable
html: nav, a
class: aipim-tab-bar
css: components/web/tab-bar.css
figma: Aipim DS, página Organismos, Tab bar
tokens: [bg/surface, border/subtle, action/primary/bg, text/secondary, bg/sunken, error/icon, focus/ring, space/4, space/8, space/12, size/icon-lg, radius/md, radius/full, border/thin, border/thick, focus/offset, Aipim/body-sm]
wcag: ["1.4.1 Uso de Cor", "1.4.11 Contraste Não Textual", "2.4.7 Foco Visível", "2.5.8 Tamanho do Alvo (Mínimo)", "4.1.2 Nome, Função, Valor"]
related: [top-bar, tabs]
---

# Tab bar

A navegação principal no celular, com três a cinco destinos.

## Quando usar

- Para a navegação principal no celular, com 3 a 5 destinos.
- Quando as pessoas passam com frequência pelas mesmas seções.

## Quando não usar

- Mais de 5 destinos: use um menu.
- Para alternar visões do mesmo conteúdo: use [tabs](tabs.md).

## Variantes e props

| Classe | O que faz |
|---|---|
| `aipim-tab-bar` | A barra. O seu layout a fixa no pé da tela. |
| `aipim-tab-bar__item` | Um destino: ícone e rótulo. O item inteiro é o alvo. `aria-current="page"` marca o destino atual. |
| `aipim-tab-bar__icon` | Envolve o ícone de 24px, para um badge poder ficar no canto dele. |
| `aipim-tab-bar__badge` | Ponto opcional de 10px. Coloque um texto escondido dentro dele, como "3 não lidas". |
| `aipim-tab-bar__label` | Sempre visível. `Aipim/body-sm`. |

## Estados

Padrão, hover (preenchimento `bg/sunken`), foco (anel de 3px, a 3px de distância) e atual. O destino atual fica em `action/primary/bg` e mostra uma barra de 24 por 3px acima do ícone. Pressionado tem a mesma cara do hover.

## Tokens usados

| Onde | Estado | Token | Claro | Escuro |
|---|---|---|---|---|
| Preenchimento da barra | Todos | `bg/surface` | #FDF9F6 | #302A25 |
| Borda de cima | Todos | `border/subtle` | #DAD1CA | #4A423C |
| Ícone, rótulo e indicador | Atual | `action/primary/bg` | #B43000 | #FF9275 |
| Ícone e rótulo | Outros destinos | `text/secondary` | #4A423C | #ECE5DF |
| Preenchimento do destino | Hover | `bg/sunken` | #ECE5DF | #0E0A07 |
| Ponto do badge | Todos | `error/icon` | #DE316D | #FF5387 |
| Contorno do ponto do badge | Todos | `bg/surface` | #FDF9F6 | #302A25 |
| Anel de foco | Foco | `focus/ring` | #0364C2 | #AED1FE |

| Medida | Token | Valor |
|---|---|---|
| Padding da barra, todos os lados | `space/8` | 8 |
| Espaço entre destinos | `space/4` | 4 |
| Altura da barra | Padding mais o destino | 80 |
| Altura do destino | Indicador, ícone, rótulo e espaços | 64 |
| Padding horizontal do destino | `space/12` | 12 |
| Padding de baixo do destino | `space/8` | 8 |
| Espaço dentro de um destino | `space/4` | 4 |
| Raio dos cantos do destino | `radius/md` | 8 |
| Tamanho do indicador | `size/icon-lg` por `border/thick` | 24 por 3 |
| Raio dos cantos do indicador | `radius/full` | Totalmente redondo |
| Tamanho do ícone | `size/icon-lg` | 24 |
| Tamanho do ponto do badge | Sem token | 10 |
| Tipografia do rótulo | `Aipim/body-sm` | 14/21 Regular |
| Largura da borda de cima | `border/thin` | 1 |

Os destinos dividem a largura da barra em partes iguais. A borda de cima é uma sombra interna, então não soma nada aos 80px de altura. Cada destino tem 64px de altura e atende tanto `size/touch-min` quanto `size/touch-comfortable`.

## Acessibilidade

- Use um elemento `nav` com `aria-label`, como "Principal".
- O destino atual tem `aria-current="page"`.
- Um ícone sempre vem com um rótulo visível.
- Um badge precisa de texto para o leitor de tela, como "3 não lidas". Use `aipim-visually-hidden` dentro dele.
- Tab passa de um destino a outro, e Enter aciona o destino em foco. O anel de foco aparece sempre.
- Rótulos longos, ou com texto grande, quebram para uma segunda linha. Eles nunca são cortados com reticências, então nenhum texto se perde com o texto em 200%.

## Exemplos de código

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">

<nav class="aipim-tab-bar" aria-label="Principal">
  <a class="aipim-tab-bar__item" href="/" aria-current="page">
    <span class="aipim-tab-bar__icon"><svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-home"></use></svg></span>
    <span class="aipim-tab-bar__label">Início</span>
  </a>
  <a class="aipim-tab-bar__item" href="/alerts">
    <span class="aipim-tab-bar__icon">
      <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-bell"></use></svg>
      <span class="aipim-tab-bar__badge"><span class="aipim-visually-hidden">3 não lidas</span></span>
    </span>
    <span class="aipim-tab-bar__label">Alertas</span>
  </a>
</nav>
```

## Faça e não faça

- Faça: dê a cada ícone um rótulo visível (Início, Buscar, Alertas, Mensagens).
- Não faça: mostrar só ícones, que não são claros. Mostre sempre o rótulo.

<!-- Translated from docs/en/components/tab-bar.md, sha256 ae96b72dd340 -->
