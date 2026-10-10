---
name: link
description: Takes the reader to another page or section.
status: stable
html: a
class: aipim-link
css: components/web/link.css
figma: Aipim DS, page Atoms, Link
tokens: [link, link/hover, link/visited, focus/ring, size/icon-sm, space/4, radius/sm, border/thick, focus/offset, Aipim/body, Aipim/label]
wcag: ["1.4.1 Use of Color", "1.4.3 Contrast (Minimum)", "2.4.4 Link Purpose (In Context)", "2.4.7 Focus Visible"]
related: [button]
---

# Link

Takes the reader to another page or section.

## When to use

- To go to another page or section.
- Inside running text.
- For a short action that only navigates.

## When not to use

- To run an action, such as saving: use a [button](button.md).
- For the main action of a screen: use a primary button.

## Variants and props

| Class | What it does |
|---|---|
| `aipim-link` | Inline. Inherits the type of the surrounding text. |
| `aipim-link aipim-link--standalone` | Stands on its own, in the label style (16/20 Bold), with an optional icon after the text. |

The underline is always on, so the link never depends on color alone. An optional 16px icon (`external-link`) can follow the text in a standalone link.

## States

Default, hover, focus and visited. Hover darkens the color (lightens it in dark theme). Visited uses `link/visited`. Focus is a 3px ring, 3px away, with rounded corners (`radius/sm`).

## Tokens used

| Applies to | State | Token | Light | Dark |
|---|---|---|---|---|
| Label, underline and icon | Default | `link` | #014B95 | #8CBEFE |
| Label, underline and icon | Hover, pressed | `link/hover` | #00346B | #AED1FE |
| Label, underline and icon | Visited | `link/visited` | #892402 | #FEBBA9 |
| Focus ring | Focus | `focus/ring` | #0364C2 | #AED1FE |

| Measure | Token | Inline | Standalone |
|---|---|---|---|
| Type | `Aipim/body`, `Aipim/label` | 16/24 Regular | 16/20 Bold |
| Icon size | `size/icon-sm` | none | 16 |
| Gap between label and icon | `space/4` | none | 4 |
| Focus ring corner radius | `radius/sm` | 4 | 4 |
| Focus ring width and offset | `border/thick`, `focus/offset` | 3 and 3 | 3 and 3 |

A standalone link is 20px tall, which is below the 24px minimum target (`size/touch-min`). Give it space around it, or put it in a larger row, where touch matters.

## Accessibility

- Use the native `a` element with an `href`.
- Enter activates it. Tab moves focus, and the ring is always visible.
- A link that opens a new tab says so in its text.
- Link text makes sense out of context: avoid "click here".

## Code examples

```html
<p>Read the <a class="aipim-link" href="/accessibility">accessibility notes</a> before you ship.</p>

<a class="aipim-link aipim-link--standalone" href="https://example.com">
  External link
  <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-external-link"></use></svg>
</a>
```

## Do and don't

- Do: link text says where it goes ("Read the accessibility notes").
- Don't: "Click here" means nothing out of context.
