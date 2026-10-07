---
name: tag
description: A short label for a category, a technology or a status.
status: beta
html: span, button, ul, li
class: aipim-tag
css: components/web/tag.css
figma: Aipim DS, page Atoms, Tag
tokens: [border/strong, text/primary, bg/sunken, accent/bg, accent/text, bg/surface, focus/ring, space/4, space/8, space/12, size/icon-sm, size/touch-min, radius/full, border/thin, border/thick, focus/offset, Aipim/body-sm]
wcag: ["1.4.1 Use of Color", "1.4.3 Contrast (Minimum)", "2.4.7 Focus Visible", "2.5.8 Target Size (Minimum)", "4.1.2 Name, Role, Value"]
related: [button, alert]
---

# Tag

A short label for a category, a technology or a status.

## When to use

- For a short label: a category, a technology or a status.
- To show attributes of an item.
- Removable, when people choose the tags themselves.

## When not to use

- For actions: use a [button](button.md).
- For long text or whole sentences.
- For a status that needs attention: use an [alert](alert.md).

## Variants and props

| Class | What it does |
|---|---|
| `aipim-tag` | Outline. A 1px border in `border/strong`. |
| `aipim-tag--accent` | Filled with the accent color, no border. |
| `aipim-tag > .aipim-icon` | Optional 16px icon before the label. |
| `aipim-tag__remove` | Optional remove button, only for tags the user can take away. |

## States

A tag that is not removable has no states and is not focusable. The remove button has hover (fill) and focus (3px ring, 3px away).

## Tokens used

| Applies to | State | Token | Light | Dark |
|---|---|---|---|---|
| Outline border | All | `border/strong` | #837A73 | #A39992 |
| Outline label, icon and remove icon | All | `text/primary` | #1A1511 | #FDF9F6 |
| Outline remove button fill | Remove hover | `bg/sunken` | #ECE5DF | #0E0A07 |
| Accent fill | All | `accent/bg` | #FFD337 | #FFD337 |
| Accent label | All | `accent/text` | #1A1511 | #1A1511 |
| Accent remove button fill | Remove hover | `bg/surface` | #FDF9F6 | #302A25 |
| Focus ring | Focus | `focus/ring` | #0364C2 | #AED1FE |

| Measure | Token | Value |
|---|---|---|
| Vertical padding | `space/4` | 4 |
| Horizontal padding | `space/12` | 12 |
| Gap between items | `space/8` | 8 |
| Height without remove button | Label line height plus padding | 29 |
| Height with remove button | Remove button plus padding | 32 |
| Icon size | `size/icon-sm` | 16 |
| Remove button size | `size/touch-min` | 24 |
| Corner radius | `radius/full` | Fully round |
| Outline border width | `border/thin` | 1 |
| Label type | `Aipim/body-sm` | 14/21 Regular |

Sizes are measured from the outer edge. In code the border is always 1px (transparent on the accent tag) and it comes out of the padding, so both styles are the same size.

The remove button is 24px: it meets `size/touch-min` and is below `size/touch-comfortable` (44).

## Accessibility

- The text is always visible, never an icon alone.
- A remove button needs an `aria-label` that names the tag, such as "Remove design". Enter and Space remove the tag; `aipim.js` then moves focus to the next focusable element.
- A group of tags is a list (`ul` and `li`), so screen readers announce how many there are.
- The accent label meets 4.5:1 contrast on the accent fill in both themes.

## Code examples

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">

<ul role="list" style="display:flex;gap:8px;list-style:none;padding:0">
  <li><span class="aipim-tag"><span>Design</span></span></li>
  <li>
    <span class="aipim-tag aipim-tag--accent">
      <span>Design</span>
      <button class="aipim-tag__remove" type="button" aria-label="Remove design" data-aipim-dismiss>
        <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-close"></use></svg>
      </button>
    </span>
  </li>
</ul>
```

## Do and don't

- Do: a short label of one or two words ("Design").
- Don't: use a sentence as a tag. Use plain text.
