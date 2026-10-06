---
name: alert
description: An important message that stays visible on the page.
status: beta
html: div[role=status|alert], button
css: components/web/alert.css
figma: Aipim DS, page Feedback, Alert
tokens: [info/bg, info/text, info/icon, success/bg, success/text, success/icon, warning/bg, warning/text, warning/icon, error/bg, error/text, error/icon, focus/ring, space-role/inset-md, space/4, space/12, size/icon-md, size/icon-sm, size/touch-min, radius/md, radius/sm, border/thin, border/thick, focus/offset, Aipim/label, Aipim/body]
wcag: ["1.4.1 Use of Color", "1.4.3 Contrast (Minimum)", "2.4.7 Focus Visible", "2.5.8 Target Size (Minimum)", "4.1.2 Name, Role, Value", "4.1.3 Status Messages"]
related: [toast, text-field]
---

# Alert

An important message that stays visible on the page.

## When to use

- For an important message that must stay visible on the page.
- For form-level errors, warnings and notices about the current state.
- With a title when the message needs a heading.

## When not to use

- For a passing confirmation, such as "Saved": use a [toast](toast.md).
- For an error on a single field: use the helper text of the [text field](text-field.md).

## Variants and props

| Class | What it does |
|---|---|
| `aipim-alert` | Info. The default type. |
| `aipim-alert--success` / `--warning` / `--error` | The other three types. |
| `aipim-alert__icon` | The type icon. Required, so color is never the only cue. |
| `aipim-alert__content` | Wraps the title and the message. |
| `aipim-alert__title` | Optional short summary in `Aipim/label`. |
| `aipim-alert__message` | What happened and what to do next. |
| `aipim-dismiss` | Optional dismiss button, shared with the toast. |

## States

An alert has no hover or pressed state. The dismiss button shows the focus ring (3px, `focus/ring`, 3px away) for keyboard focus only.

## Tokens used

| Applies to | Type | Token | Light | Dark |
|---|---|---|---|---|
| Surface fill | Info | `info/bg` | #E4F1F8 | #143A4C |
| Border and type icon | Info | `info/icon` | #306E8B | #87BDD9 |
| Title, message and dismiss icon | Info | `info/text` | #21536B | #CDE6F3 |
| Surface fill | Success | `success/bg` | #E3F3EB | #0C3F2D |
| Border and type icon | Success | `success/icon` | #3A9371 | #CBEADB |
| Title, message and dismiss icon | Success | `success/text` | #165A42 | #CBEADB |
| Surface fill | Warning | `warning/bg` | #F6EDDE | #463101 |
| Border and type icon | Warning | `warning/icon` | #644702 | #E4CA9C |
| Title, message and dismiss icon | Warning | `warning/text` | #463101 | #F0DFC1 |
| Surface fill | Error | `error/bg` | #FFE8E9 | #631023 |
| Border and type icon | Error | `error/icon` | #B22B48 | #FF8D99 |
| Title, message and dismiss icon | Error | `error/text` | #8A1C34 | #FFD5D8 |

| Measure | Token | Value |
|---|---|---|
| Padding, all sides | `space-role/inset-md` | 16 |
| Gap between icon and text | `space/12` | 12 |
| Gap between title and message | `space/4` | 4 |
| Type icon size | `size/icon-md` | 20 |
| Dismiss button size | `size/touch-min` | 24 |
| Dismiss icon size | `size/icon-sm` | 16 |
| Dismiss button corner radius | `radius/sm` | 4 |
| Corner radius | `radius/md` | 8 |
| Border width | `border/thin` | 1 |
| Title type | `Aipim/label` | 16/20 Bold |
| Message type | `Aipim/body` | 16/24 Regular |

Sizes are measured from the outer edge: the 1px border comes out of the padding in code. With a title and a dismiss button the alert is 80px high, with a message only 56px.

The dismiss button is 24px, so it meets the 24px minimum (`size/touch-min`) and is below the 44px comfortable target (`size/touch-comfortable`).

## Accessibility

- `role="alert"` for errors and `role="status"` for information, warnings and successes. Put the role on the alert when it is added to the page, so screen readers announce it.
- Icon plus text, never color alone. The type icon is decorative: `aria-hidden="true"`.
- The dismiss button needs an accessible name, such as "Dismiss". Enter and Space activate it.
- After dismissing, move focus to a sensible place, such as the next element. `aipim.js` does this for `data-aipim-dismiss` buttons.
- The text colors have at least 4.5:1 contrast on their surface in both themes (WCAG 1.4.3).

## Code examples

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">

<div class="aipim-alert aipim-alert--error" role="alert">
  <svg class="aipim-icon aipim-alert__icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-error"></use></svg>
  <div class="aipim-alert__content">
    <p class="aipim-alert__title">Payment failed</p>
    <p class="aipim-alert__message">Check your card details and try again.</p>
  </div>
  <button class="aipim-dismiss" type="button" aria-label="Dismiss" data-aipim-dismiss>
    <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-close"></use></svg>
  </button>
</div>
```

`data-aipim-dismiss` needs the optional `aipim.js`. Without it, remove the alert in your own handler.

## Do and don't

- Do: say what happened and what to do next ("Check your card details and try again").
- Don't: write a vague message ("Something went wrong"). It gives no way forward.
