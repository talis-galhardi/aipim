---
name: button
description: The main action of a screen or block.
status: beta
html: button, a
class: aipim-button
css: components/web/button.css
figma: Aipim DS, page Actions, Button
tokens: [action/primary/bg, action/primary/text, action/primary/hover, action/secondary/bg, action/secondary/text, action/secondary/hover, bg/sunken, focus/ring, opacity/disabled, size/control-sm, size/control-md, size/control-lg, size/icon-sm, size/icon-md, space-role/inset-sm, space-role/inset-md, space-role/inset-lg, space/8, radius/md, border/medium, border/thick, focus/offset, Aipim/label]
wcag: ["1.4.3 Contrast (Minimum)", "1.4.11 Non-text Contrast", "2.4.7 Focus Visible", "2.5.8 Target Size (Minimum)", "4.1.2 Name, Role, Value"]
related: [link]
---

# Button

The main action of a screen or block.

## When to use

- For the main action of a screen or block.
- One primary button per screen.
- Use secondary, outline or ghost for the other actions.

## When not to use

- To go to another page: use a [link](link.md).
- Several actions of equal weight side by side: keep one primary and make the rest quieter.
- Destructive actions: not covered in v1.0.

## Variants and props

| Class | What it does |
|---|---|
| `aipim-button` | Primary. The main action. |
| `aipim-button--secondary` | Secondary color fill. |
| `aipim-button--outline` | Transparent with a 2px border. |
| `aipim-button--ghost` | Transparent, no border. |
| `aipim-button--sm` / default / `aipim-button--lg` | Heights 32, 40 and 48px. |
| `aipim-button__icon-leading` | Put on an icon before the label. It is replaced by the spinner while loading. |
| `aipim-button__spinner` | A `loading` icon, shown only while `aria-busy="true"`. |

A label, optionally with one icon before or after it. Icon-only buttons are not part of v1.0.

## States

Default, hover, focus, disabled and loading. Pressed looks like hover.

- **Disabled:** the native `disabled` attribute (or `aria-disabled="true"` on a link styled as a button). Opacity is `opacity/disabled` (40%).
- **Loading:** set `aria-busy="true"` and show the spinner. The label stays. Ignore activation in your code while it is busy: the CSS also blocks the pointer.
- **Focus:** a 3px ring in `focus/ring`, 3px away from the button (`focus/offset`). It shows for keyboard focus only (`:focus-visible`).

## Tokens used

| Applies to | State | Token | Light | Dark |
|---|---|---|---|---|
| Primary fill | Default | `action/primary/bg` | #B43000 | #FF9275 |
| Primary fill | Hover, pressed | `action/primary/hover` | #892402 | #FEBBA9 |
| Primary label and icons | All | `action/primary/text` | #FDF9F6 | #1A1511 |
| Secondary fill | Default | `action/secondary/bg` | #0364C2 | #8CBEFE |
| Secondary fill | Hover, pressed | `action/secondary/hover` | #014B95 | #AED1FE |
| Secondary label and icons | All | `action/secondary/text` | #FDF9F6 | #1A1511 |
| Outline border, outline and ghost label | All | `action/secondary/bg` | #0364C2 | #8CBEFE |
| Outline and ghost fill | Hover, pressed | `bg/sunken` | #ECE5DF | #0E0A07 |
| Focus ring | Focus | `focus/ring` | #0364C2 | #AED1FE |
| Whole button | Disabled | `opacity/disabled` | 40% | 40% |

| Measure | Token | Small | Medium | Large |
|---|---|---|---|---|
| Height | `size/control-sm`, `-md`, `-lg` | 32 | 40 | 48 |
| Horizontal padding | `space-role/inset-sm`, `-md`, `-lg` | 12 | 16 | 24 |
| Gap between icon and label | `space/8` | 8 | 8 | 8 |
| Icon size | `size/icon-sm`, `size/icon-md` | 16 | 20 | 20 |
| Corner radius | `radius/md` | 8 | 8 | 8 |
| Border width (outline) | `border/medium` | 2 | 2 | 2 |
| Label type | `Aipim/label` | 16/20 Bold | 16/20 Bold | 16/20 Bold |

Sizes are measured from the outer edge. In code the border is always 2px (transparent on filled and ghost buttons), so every variant has the same size and the label never moves.

Heights 32 and 40 are below the 44px comfortable touch target (`size/touch-comfortable`) and meet the 24px minimum (`size/touch-min`). Use Large where touch is the main input.

## Accessibility

- Use the native `button` element. Enter and Space activate it.
- Tab moves focus, and the ring is always visible.
- A disabled button leaves the tab order (native `disabled`).
- Loading: `aria-busy="true"` and keep the label text.
- A button that only shows an icon needs an `aria-label`.
- A toggle button needs `aria-pressed`.

## Code examples

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="button.css">
<link rel="stylesheet" href="aipim-base.css"> <!-- for .aipim-icon -->

<button class="aipim-button" type="button">Save</button>
<button class="aipim-button aipim-button--outline" type="button">Cancel</button>

<!-- Icon before the label -->
<button class="aipim-button" type="button">
  <svg class="aipim-icon aipim-button__icon-leading" aria-hidden="true"><use href="icons/sprite.svg#aipim-add"></use></svg>
  <span>Add</span>
</button>

<!-- Loading -->
<button class="aipim-button" type="button" aria-busy="true">
  <svg class="aipim-icon aipim-button__spinner" aria-hidden="true"><use href="icons/sprite.svg#aipim-loading"></use></svg>
  <span>Saving</span>
</button>
```

## Do and don't

- Do: one primary action, the other is quieter (Save primary, Cancel outline).
- Don't: two primary buttons side by side, they compete for attention.
