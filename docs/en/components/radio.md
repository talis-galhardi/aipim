---
name: radio
description: Lets a person pick one option from a short list.
status: beta
html: input[type=radio], label, fieldset
css: components/web/radio.css
figma: Aipim DS, page Data entry, Radio
tokens: [bg/surface, border/strong, text/secondary, text/primary, action/primary/bg, action/primary/hover, focus/ring, opacity/disabled, size/icon-md, space/12, radius/full, border/medium, border/thick, focus/offset, Aipim/body]
wcag: ["1.3.1 Info and Relationships", "1.4.3 Contrast (Minimum)", "1.4.11 Non-text Contrast", "2.4.7 Focus Visible", "2.5.8 Target Size (Minimum)", "4.1.2 Name, Role, Value"]
related: [checkbox, switch]
---

# Radio

Lets a person pick one option from a short list.

## When to use

- For one choice among 2 to 6 visible options.
- When people should compare the options side by side.

## When not to use

- More than 6 options: use a select.
- For yes or no: use a [checkbox](checkbox.md) or a [switch](switch.md).

## Variants and props

| Class or state | What it does |
|---|---|
| `aipim-radio` | The label that wraps the input, the circle and the text. The whole row is the click target. |
| `aipim-radio__input` | The real input. All options of a group share one `name`. |
| `aipim-radio__circle` | The drawn circle. Put `aria-hidden="true"` on it. |
| `aipim-radio__label` | The text. |
| `:checked` | Selected: a 10px dot. |
| `aipim-choice-group` | A fieldset for the group (from `checkbox.css`). `aipim-choice-group--horizontal` lays it out in a row. |

Groups can be vertical or horizontal.

## States

Default, hover, focus and disabled, for off and on. Hover darkens the border (and the border and dot when selected). Focus is a 3px ring, 3px away from the circle. Disabled uses `opacity/disabled`.

## Tokens used

| Applies to | State | Token | Light | Dark |
|---|---|---|---|---|
| Circle fill | All | `bg/surface` | #FDF9F6 | #302A25 |
| Circle border | Off | `border/strong` | #837A73 | #A39992 |
| Circle border | Off, hover | `text/secondary` | #4A423C | #ECE5DF |
| Circle border and dot | On | `action/primary/bg` | #763B01 | #F8C09B |
| Circle border and dot | On, hover | `action/primary/hover` | #542801 | #FED9C0 |
| Label | All | `text/primary` | #1A1511 | #FDF9F6 |
| Focus ring | Focus | `focus/ring` | #306E8B | #AED4E9 |
| Whole radio | Disabled | `opacity/disabled` | 40% | 40% |

| Measure | Token | Value |
|---|---|---|
| Circle size | `size/icon-md` | 20 |
| Dot size | no token, half the circle | 10 |
| Gap between circle and label | `space/12` | 12 |
| Row height | `Aipim/body` line height | 24 |
| Corner radius | `radius/full` | fully round |
| Border width | `border/medium` | 2 |
| Label type | `Aipim/body` | 16/24 Regular |

The row is 24px tall: it meets the 24px minimum target and is below the 44px comfortable one.

## Accessibility

- Use the native `input type="radio"` sharing one `name`.
- A group sits in a `fieldset` with a `legend`, or `role="radiogroup"`.
- Preselect an option when there is a sensible default.
- Arrow keys move the choice inside the group. Tab enters and leaves the group, not each option. Space selects the focused option.

## Code examples

```html
<fieldset class="aipim-choice-group">
  <legend class="aipim-choice-group__legend">Plan</legend>
  <label class="aipim-radio">
    <input class="aipim-radio__input" type="radio" name="plan" checked>
    <span class="aipim-radio__circle" aria-hidden="true"></span>
    <span class="aipim-radio__label">Monthly</span>
  </label>
  <label class="aipim-radio">
    <input class="aipim-radio__input" type="radio" name="plan">
    <span class="aipim-radio__circle" aria-hidden="true"></span>
    <span class="aipim-radio__label">Yearly</span>
  </label>
</fieldset>
```

## Do and don't

- Do: a group with a legend, one option selected.
- Don't: a single radio cannot be turned off.
