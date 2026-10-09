---
name: badge
description: A small mark with a numeral or an icon, next to text. Decorative.
status: beta
html: span
class: aipim-badge
css: components/web/badge.css
figma: Aipim DS, page Atoms, Badge
tokens: [action/primary/bg, action/primary/text, tint/primary, tint/text, size/control-lg, size/control-sm, size/icon-lg, size/icon-sm, radius/full, radius/md, border/medium, Aipim/label]
wcag: ["1.1.1 Non-text Content", "1.3.1 Info and Relationships", "1.4.3 Contrast (Minimum)"]
related: [tag, card]
---

# Badge

A small mark with a numeral or an icon, next to text. Decorative.

## When to use

- A step number next to the step it names ("1", "2", "3").
- An icon chip that gives a block a small visual anchor.
- Next to text that already says everything the badge shows.

## When not to use

- To carry information on its own, such as an unread count: write it as text.
- As a button or a link: it is not interactive. Use a [button](button.md) or a [link](link.md).
- For a category or a status: use a [tag](tag.md).

## Variants and props

| Class | What it does |
|---|---|
| `aipim-badge` | Outline, round, 48. A 2px border and the numeral or icon in `action/primary/bg`. |
| `aipim-badge--filled` | Filled with `action/primary/bg`, content in `action/primary/text`. |
| `aipim-badge--tint` | Filled with `tint/primary`, content in `tint/text`. |
| `aipim-badge--square` | Rounded square (`radius/md`) instead of a circle. |
| `aipim-badge--sm` | 32 instead of 48. |
| `aipim-badge > .aipim-icon` | An icon instead of a numeral: 24px, or 16px in the small size. |

## States

None. The badge is not interactive and cannot be focused.

## Tokens used

| Applies to | Style | Token | Light | Dark |
|---|---|---|---|---|
| Border, numeral and icon | Outline | `action/primary/bg` | #B43000 | #FF9275 |
| Fill | Filled | `action/primary/bg` | #B43000 | #FF9275 |
| Numeral and icon | Filled | `action/primary/text` | #FDF9F6 | #1A1511 |
| Fill | Tint | `tint/primary` | #FEBBA9 | #892402 |
| Numeral and icon | Tint | `tint/text` | #1A1511 | #FDF9F6 |

| Measure | Token | Value |
|---|---|---|
| Size, default | `size/control-lg` | 48 |
| Size, small | `size/control-sm` | 32 |
| Icon size, default | `size/icon-lg` | 24 |
| Icon size, small | `size/icon-sm` | 16 |
| Corner radius, round | `radius/full` | Fully round |
| Corner radius, square | `radius/md` | 8 |
| Border width (outline) | `border/medium` | 2 |
| Numeral type | `Aipim/label` | 16/20 Bold |

Sizes are measured from the outer edge. In code the border is 2px on the outline style and transparent on the others, so all three styles are the same size.

## Accessibility

- A badge is decorative: put `aria-hidden="true"` on it. The text next to it carries the meaning, so a screen reader reads "Create the file", not "1 Create the file".
- Never use a badge as the only way to give information. A numeral without text, such as an unread count, must also be written as text.
- Contrast of the numeral or icon against the badge, light and dark: outline 5.58:1 on the page background (8.30:1 in dark), filled 5.96:1 (8.30:1 in dark), tint 11.12:1 (8.66:1 in dark). The shape of a tint badge is decoration, not information, so it needs no contrast against the page.
- The numeral uses `Aipim/label`, 16px, so it meets the minimum body size.

## Code examples

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">

<!-- A step number next to its text -->
<div style="display:flex;align-items:center;gap:12px">
  <span class="aipim-badge" aria-hidden="true">1</span>
  <span>Create the file</span>
</div>

<!-- Filled, square, small, with an icon -->
<span class="aipim-badge aipim-badge--filled aipim-badge--square aipim-badge--sm" aria-hidden="true">
  <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-search"></use></svg>
</span>
```

## Do and don't

- Do: put a badge next to text that says the same thing, with `aria-hidden="true"`.
- Don't: use a badge alone to show information, such as a count nobody can read out.
