---
name: checkbox
description: Lets a person pick any number of independent options.
status: beta
html: input[type=checkbox], label, fieldset
class: aipim-checkbox
css: components/web/checkbox.css
figma: Aipim DS, page Data entry, Checkbox
tokens: [bg/surface, border/strong, text/secondary, text/primary, action/primary/bg, action/primary/text, action/primary/hover, focus/ring, opacity/disabled, size/icon-md, size/icon-sm, space/12, radius/sm, border/medium, border/thick, focus/offset, Aipim/body]
wcag: ["1.3.1 Info and Relationships", "1.4.3 Contrast (Minimum)", "1.4.11 Non-text Contrast", "2.4.7 Focus Visible", "2.5.8 Target Size (Minimum)", "4.1.2 Name, Role, Value"]
related: [radio, switch]
---

# Checkbox

Lets a person pick any number of independent options.

## When to use

- For several independent choices.
- To accept terms.
- A parent checkbox can show a mixed (indeterminate) state.

## When not to use

- For a single choice among several: use [radio buttons](radio.md).
- For something that applies right away: use a [switch](switch.md).

## Variants and props

| Class or state | What it does |
|---|---|
| `aipim-checkbox` | The label that wraps the input, the box and the text. The whole row is the click target. |
| `aipim-checkbox__input` | The real input. It stays in the page, hidden visually. |
| `aipim-checkbox__box` | The drawn box. Put `aria-hidden="true"` on it. |
| `aipim-checkbox__label` | The text. |
| `:checked` | Checked: a check mark. |
| `input.indeterminate = true` | Indeterminate: a dash. It is set in code, there is no HTML attribute. |
| `aipim-choice-group` | A fieldset for a group. `aipim-choice-group--horizontal` lays it out in a row. Its legend is `aipim-choice-group__legend`. |

The label is part of the control: clicking it toggles the box.

## States

Default, hover, focus and disabled, for unchecked, checked and indeterminate. Hover darkens the border (and the fill when checked). Focus is a 3px ring, 3px away from the box. Disabled uses `opacity/disabled` on the box and the label.

## Tokens used

| Applies to | State | Token | Light | Dark |
|---|---|---|---|---|
| Box fill | Unchecked | `bg/surface` | #FDF9F6 | #302A25 |
| Box border | Unchecked | `border/strong` | #837A73 | #A39992 |
| Box border | Unchecked, hover | `text/secondary` | #4A423C | #ECE5DF |
| Box fill and border | Checked, indeterminate | `action/primary/bg` | #763B01 | #F8C09B |
| Box fill and border | Checked, indeterminate, hover | `action/primary/hover` | #542801 | #FED9C0 |
| Check mark | Checked, indeterminate | `action/primary/text` | #FDF9F6 | #1A1511 |
| Label | All | `text/primary` | #1A1511 | #FDF9F6 |
| Focus ring | Focus | `focus/ring` | #306E8B | #AED4E9 |
| Whole checkbox | Disabled | `opacity/disabled` | 40% | 40% |

| Measure | Token | Value |
|---|---|---|
| Box size | `size/icon-md` | 20 |
| Check mark size | `size/icon-sm` | 16 |
| Gap between box and label | `space/12` | 12 |
| Row height | `Aipim/body` line height | 24 |
| Corner radius | `radius/sm` | 4 |
| Border width | `border/medium` | 2 |
| Label type | `Aipim/body` | 16/24 Regular |

The row is 24px tall: it meets the 24px minimum target and is below the 44px comfortable one.

## Accessibility

- Use the native `input type="checkbox"` with a label.
- A group sits in a `fieldset` with a `legend`.
- The indeterminate state is set in code, with the `indeterminate` property.
- Space toggles the checkbox. Tab moves focus, and the ring is always visible.

## Code examples

```html
<fieldset class="aipim-choice-group">
  <legend class="aipim-choice-group__legend">Notifications</legend>
  <label class="aipim-checkbox">
    <input class="aipim-checkbox__input" type="checkbox" checked>
    <span class="aipim-checkbox__box" aria-hidden="true"></span>
    <span class="aipim-checkbox__label">Email</span>
  </label>
  <label class="aipim-checkbox">
    <input class="aipim-checkbox__input" type="checkbox">
    <span class="aipim-checkbox__box" aria-hidden="true"></span>
    <span class="aipim-checkbox__label">SMS</span>
  </label>
</fieldset>

<script>
  document.querySelector('#parent').indeterminate = true;
</script>
```

## Do and don't

- Do: independent choices, each can be on or off.
- Don't: one-of-many choices need radio buttons.
