---
name: icon-button
description: A button that shows only an icon.
status: beta
html: button, a
css: components/web/icon-button.css
figma: Aipim DS, page Actions, Icon button
tokens: [text/primary, bg/sunken, focus/ring, opacity/disabled, size/touch-comfortable, size/touch-min, size/icon-lg, size/icon-sm, radius/md, radius/sm, border/thick, focus/offset]
wcag: ["1.4.11 Non-text Contrast", "2.4.7 Focus Visible", "2.5.8 Target Size (Minimum)", "4.1.2 Name, Role, Value"]
related: [button, top-bar, modal, toast]
---

# Icon button

A button that shows only an icon.

## When to use

- For a familiar action that needs no label, such as close, back or search.
- In top bars, toolbars and other places where space is short.
- Always with an accessible name, because the icon has no text.

## When not to use

- For the main action of a screen: use a [button](button.md) with a label.
- For an action people may not recognize from the icon alone: add a label.
- To go to another page: use a [link](link.md).

## Variants and props

| Class | What it does |
|---|---|
| `aipim-icon-button` | Medium: a 44px target with a 24px icon. The default. |
| `aipim-icon-button--sm` | Small: a 24px target with a 16px icon. Only where space is tight. |

One style: no fill, and the fill shows on hover. The icon is any line icon from the [icon set](../../../icons/).

Two other small buttons are not icon buttons on purpose: the Alert dismiss button (`aipim-dismiss`) sits on a tinted surface where a gray hover fill would look wrong, and the Tag remove button is round to follow the tag.

## States

Default, hover, focus and disabled. Pressed looks like hover.

- **Hover and pressed:** a `bg/sunken` fill.
- **Disabled:** the native `disabled` attribute (or `aria-disabled="true"` on a link). Opacity is `opacity/disabled` (40%).
- **Focus:** a 3px ring in `focus/ring`, 3px away (`focus/offset`). It shows for keyboard focus only (`:focus-visible`).

## Tokens used

| Applies to | State | Token | Light | Dark |
|---|---|---|---|---|
| Icon | All | `text/primary` | #1A1511 | #FDF9F6 |
| Container fill | Hover and pressed | `bg/sunken` | #ECE5DF | #0E0A07 |
| Focus ring | Focus | `focus/ring` | #306E8B | #AED4E9 |
| Whole button | Disabled | `opacity/disabled` | 40% | 40% |

| Measure | Token | Small | Medium |
|---|---|---|---|
| Size (width and height) | `size/touch-min`, `size/touch-comfortable` | 24 | 44 |
| Icon size | `size/icon-sm`, `size/icon-lg` | 16 | 24 |
| Padding, all sides | (size − icon) ÷ 2, no token | 4 | 10 |
| Corner radius | `radius/sm`, `radius/md` | 4 | 8 |
| Focus ring width | `border/thick` | 3 | 3 |
| Focus ring offset | `focus/offset` | 3 | 3 |

Small meets the 24px minimum (`size/touch-min`) and is below the 44px comfortable target (`size/touch-comfortable`). Medium meets both. Use Medium wherever touch is the main input.

## Accessibility

- Use the native `button` element (or `a` when it goes somewhere). Enter and Space activate a button.
- Always give it an `aria-label` that names the action, such as "Close". The icon is decorative: `aria-hidden="true"`.
- A toggle needs `aria-pressed`.
- Tab moves focus, and the ring is always visible. A disabled button leaves the tab order.

## Code examples

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">

<button class="aipim-icon-button" type="button" aria-label="Close">
  <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-close"></use></svg>
</button>

<!-- Small -->
<button class="aipim-icon-button aipim-icon-button--sm" type="button" aria-label="Dismiss">
  <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-close"></use></svg>
</button>
```

## Do and don't

- Do: use a familiar icon and name it with an `aria-label` (Close).
- Don't: use unclear icons with no label. They are guesswork: add a visible label.
