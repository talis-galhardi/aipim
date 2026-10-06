---
name: card
description: Groups related content on one surface. It can be a single link.
status: beta
html: article, h3, p, a
class: aipim-card
css: components/web/card.css
figma: Aipim DS, page Content and overlays, Card
tokens: [bg/surface, border/subtle, bg/sunken, text/muted, text/primary, text/secondary, link, focus/ring, space-role/inset-lg, space/12, size/icon-lg, radius/xl, border/thin, border/thick, focus/offset, Aipim/elevation/raised, Aipim/h4, Aipim/body, Aipim/label]
wcag: ["1.1.1 Non-text Content", "1.3.1 Info and Relationships", "2.4.4 Link Purpose (In Context)", "2.4.7 Focus Visible"]
related: [link, button]
---

# Card

Groups related content on one surface. It can be a single link.

## When to use

- To group related content on one surface.
- A clickable card when the whole block leads to one place.
- A card with an image to give the content a visual anchor.

## When not to use

- For everything: not every block needs a card.
- Cards inside cards: use spacing instead.
- Several links or buttons that compete: pick one clear action.

## Variants and props

| Class | What it does |
|---|---|
| `aipim-card` | A static card. |
| `aipim-card--interactive` | The whole card leads to one place. It gets a hover shadow and a focus ring on the card. |
| `aipim-card__media` | Optional image area across the top, 160px tall. Put an `img` inside, or an icon as a placeholder. |
| `aipim-card__body` | Holds the text parts. |
| `aipim-card__title` | `Aipim/h4`. |
| `aipim-card__text` | A short description in `Aipim/body`. |
| `aipim-card__action` | A link-style label, such as Learn more. It is a label only: the card is the link. |
| `aipim-card__link` | The one link, inside the title. Its `::after` covers the card, so the card is a single focus stop. |

## States

- **Static:** no states.
- **Interactive:** hover shows the `raised` shadow. Focus shows a 3px ring around the whole card, 3px away (`focus/ring`, `focus/offset`), for keyboard focus only.

## Tokens used

| Applies to | State | Token | Light | Dark |
|---|---|---|---|---|
| Surface fill | All | `bg/surface` | #FDF9F6 | #302A25 |
| Border | All | `border/subtle` | #DAD1CA | #4A423C |
| Media placeholder fill | All | `bg/sunken` | #ECE5DF | #0E0A07 |
| Media placeholder icon | All | `text/muted` | #665D56 | #DAD1CA |
| Title | All | `text/primary` | #1A1511 | #FDF9F6 |
| Text | All | `text/secondary` | #4A423C | #ECE5DF |
| Action label | Default | `link` | #014B95 | #8CBEFE |
| Focus ring | Focus | `focus/ring` | #0364C2 | #AED1FE |

| Measure | Token | Value |
|---|---|---|
| Padding, all sides | `space-role/inset-lg` | 24 |
| Gap between text parts | `space/12` | 12 |
| Media height | No token | 160 |
| Media icon size | `size/icon-lg` | 24 |
| Corner radius | `radius/xl` | 16 |
| Border width | `border/thin` | 1 |
| Title type | `Aipim/h4` | 24 SemiBold |
| Text type | `Aipim/body` | 16/24 Regular |
| Action label type | `Aipim/label` | 16/20 Bold, underlined |
| Shadow on hover (interactive) | `Aipim/elevation/raised` | 0 4 12 -2 at 12%, 0 2 4 -1 at 6% (light). 50% and 30% in dark. |

Sizes are measured from the outer edge: the 1px border comes out of the padding and the media height in code. The card fills the width of its container.

## Accessibility

- The title is a heading at the right level. Put the link inside the heading.
- The whole card is one link. Never nest buttons or links inside an interactive card.
- A clickable card is one focus stop, on the link in its title. Enter activates it.
- Images that only decorate have empty `alt` text.

## Code examples

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">

<!-- Static -->
<article class="aipim-card">
  <div class="aipim-card__body">
    <h3 class="aipim-card__title">Card title</h3>
    <p class="aipim-card__text">A short description of what is inside this card.</p>
  </div>
</article>

<!-- Interactive, with media -->
<article class="aipim-card aipim-card--interactive">
  <div class="aipim-card__media"><img src="cover.jpg" alt=""></div>
  <div class="aipim-card__body">
    <h3 class="aipim-card__title"><a class="aipim-card__link" href="/learn">Card title</a></h3>
    <p class="aipim-card__text">A short description of what is inside this card.</p>
    <span class="aipim-card__action">Learn more</span>
  </div>
</article>
```

## Do and don't

- Do: one clear action for the whole card.
- Don't: put a card inside a card. It adds noise: use spacing instead.
