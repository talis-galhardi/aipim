---
name: text-field
description: A single-line field for short typed text, with a visible label above it.
status: beta
html: input, label
class: aipim-field
css: components/web/text-field.css
figma: Aipim DS, page Data entry, Text field
tokens: [bg/surface, bg/sunken, border/strong, text/primary, text/secondary, text/muted, error/icon, error/text, focus/ring, opacity/disabled, size/control-md, size/control-lg, size/icon-sm, space-role/inset-sm, space-role/inset-md, space/8, space/4, radius/md, border/thin, border/medium, border/thick, focus/offset, Aipim/label, Aipim/body, Aipim/body-sm]
wcag: ["1.3.1 Info and Relationships", "1.4.3 Contrast (Minimum)", "1.4.11 Non-text Contrast", "2.4.7 Focus Visible", "3.3.1 Error Identification", "3.3.2 Labels or Instructions", "4.1.2 Name, Role, Value"]
related: [checkbox, radio]
---

# Text field

A single-line field for short typed text, with a visible label above it.

## When to use

- For short typed text: names, emails, search.
- Always with a visible label above the field.
- Helper text for the format or the limits.

## When not to use

- To choose from a few options: use [radio buttons](radio.md) or a select.
- For long text: a text area (not in v1.0).
- A placeholder is not a label.

## Decision: label above the field

We considered a floating label, which sits inside the field and moves up and shrinks when you type, as in Material Design. We chose a label above the field for accessibility.

- The label stays at full size and always visible, so it is easy to read, including with zoom or a screen magnifier.
- No animation, no truncated labels, and nothing to reduce for people who prefer less motion.
- The field keeps the 40px and 48px control heights, so no extra height token is needed.

Do not add a floating-label variant.

## Variants and props

| Class or attribute | What it does |
|---|---|
| `aipim-field` | The wrapper: label, control and helper text, stacked. |
| `aipim-field--lg` | Large field, 48px. Default is medium, 40px. |
| `aipim-field__label`, `aipim-field__control`, `aipim-field__helper` | The three parts. |
| `aipim-field__icon` | The error icon inside the helper. It only shows when the input is invalid. |
| `aria-invalid="true"` on the input | The error state. |
| `disabled` on the input | The disabled state. Add `aipim-field--disabled` on the wrapper for browsers without `:has()`. |

Content can be a placeholder or a typed value. The helper text is optional.

## States

Default, hover, focus, error and disabled. The error state adds an icon and a message.

- **Hover:** the border grows from 1px to 2px, inside the field, so the text does not move.
- **Focus:** a 3px ring in `focus/ring`, 3px away (`focus/offset`), on top of the 1px border.
- **Error:** the border is `error/icon` at 2px, the helper becomes `error/text` and shows the error icon.
- **Disabled:** the field fill becomes `bg/sunken` and the whole field has `opacity/disabled`.

## Tokens used

| Applies to | State | Token | Light | Dark |
|---|---|---|---|---|
| Label | All | `text/primary` | #1A1511 | #FDF9F6 |
| Field fill | Default, hover, focus, error | `bg/surface` | #FDF9F6 | #302A25 |
| Field fill | Disabled | `bg/sunken` | #ECE5DF | #0E0A07 |
| Field border | Default, focus (1px), hover (2px) | `border/strong` | #837A73 | #A39992 |
| Field border | Error (2px) | `error/icon` | #B22B48 | #FF8D99 |
| Value | Filled | `text/primary` | #1A1511 | #FDF9F6 |
| Value | Placeholder | `text/muted` | #665D56 | #DAD1CA |
| Helper text | Default | `text/secondary` | #4A423C | #ECE5DF |
| Helper text | Error | `error/text` | #8A1C34 | #FFD5D8 |
| Error icon | Error | `error/icon` | #B22B48 | #FF8D99 |
| Focus ring | Focus | `focus/ring` | #306E8B | #AED4E9 |
| Whole field | Disabled | `opacity/disabled` | 40% | 40% |

| Measure | Token | Medium | Large |
|---|---|---|---|
| Field height | `size/control-md`, `size/control-lg` | 40 | 48 |
| Horizontal padding | `space-role/inset-sm`, `space-role/inset-md` | 12 | 16 |
| Gap between label and field | `space/8` | 8 | 8 |
| Gap between field and helper text | `space/8` | 8 | 8 |
| Gap between error icon and helper text | `space/4` | 4 | 4 |
| Error icon size | `size/icon-sm` | 16 | 16 |
| Corner radius | `radius/md` | 8 | 8 |
| Border width, and on hover and error | `border/thin`, `border/medium` | 1, 2 | 1, 2 |
| Label, value and helper type | `Aipim/label`, `Aipim/body`, `Aipim/body-sm` | 16/20 Bold, 16/24, 14/21 | same |

The 40px field is below the 44px comfortable touch target (`size/touch-comfortable`) and meets the 24px minimum. Use Large where touch is the main input.

## Accessibility

- A label associated with the field (`for` and `id`).
- Helper and error text linked with `aria-describedby`.
- An error shows an icon and text, never color alone.
- Invalid fields get `aria-invalid="true"`.
- Tab enters and leaves the field. Esc does not clear what was typed. Enter inside a form submits it.
- Contrast: a disabled field is an inactive component and is exempt from WCAG 1.4.3, so automated tools may flag its helper text. Keep the label visible.

## Code examples

```html
<div class="aipim-field">
  <label class="aipim-field__label" for="email">Email</label>
  <input class="aipim-field__control" id="email" type="email" aria-describedby="email-help">
  <p class="aipim-field__helper" id="email-help"><span>Used only for receipts</span></p>
</div>

<!-- Error -->
<div class="aipim-field">
  <label class="aipim-field__label" for="email2">Email</label>
  <input class="aipim-field__control" id="email2" type="email" value="name@" aria-invalid="true" aria-describedby="email2-help">
  <p class="aipim-field__helper" id="email2-help">
    <svg class="aipim-icon aipim-field__icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-error"></use></svg>
    <span>Enter a valid email</span>
  </p>
</div>
```

## Do and don't

- Do: the label says what to type, helper text sets the format.
- Don't: a placeholder alone disappears while typing.
