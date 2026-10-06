---
name: toast
description: A quick confirmation that goes away on its own.
status: beta
html: div[role=status], button
css: components/web/toast.css
figma: Aipim DS, page Feedback, Toast
tokens: [bg/surface, border/subtle, text/primary, text/secondary, info/icon, success/icon, warning/icon, error/icon, action/secondary/bg, bg/sunken, focus/ring, space-role/inset-md, space-role/inset-sm, space/12, size/icon-md, size/icon-sm, size/control-sm, size/touch-min, radius/lg, border/thin, Aipim/elevation/overlay, duration/base, duration/fast, easing/enter, easing/exit, z/toast, Aipim/body]
wcag: ["1.4.1 Use of Color", "2.2.1 Timing Adjustable", "2.4.7 Focus Visible", "2.5.8 Target Size (Minimum)", "4.1.3 Status Messages"]
related: [alert, button]
---

# Toast

A quick confirmation that goes away on its own.

## When to use

- For a quick confirmation of an action, such as "Saved".
- When the person does not need to decide anything.
- With one action, such as Undo, when it helps.

## When not to use

- For an error that needs a decision: use an [alert](alert.md) or a [modal](modal.md).
- For essential information: use an alert, since a toast can disappear.

## Variants and props

| Class | What it does |
|---|---|
| `aipim-toast-region` | Fixed to the bottom of the screen, above everything (`z/toast`). Holds the toasts. It never blocks the page. |
| `aipim-toast` | Info. The default type. |
| `aipim-toast--success` / `--warning` / `--error` | Only the icon color changes. The surface is the same. |
| `aipim-toast__icon` | The type icon. Required. |
| `aipim-toast__message` | One short sentence. |
| `aipim-button aipim-button--ghost aipim-button--sm` | The optional action, such as Undo. |
| `aipim-dismiss` | Optional dismiss button, shared with the alert. |

## States

A toast has no hover or pressed state. It enters in 200ms (`duration/base`, `easing/enter`) and leaves in 100ms (`duration/fast`, `easing/exit`). With reduced motion on, the durations are 0ms.

To leave, set `data-state="closing"` and remove the toast when the animation ends. `aipim.js` does this for `data-aipim-dismiss` buttons.

## Tokens used

| Applies to | State | Token | Light | Dark |
|---|---|---|---|---|
| Container fill | All | `bg/surface` | #FDF9F6 | #302A25 |
| Container border | All | `border/subtle` | #DAD1CA | #4A423C |
| Type icon | Info | `info/icon` | #306E8B | #87BDD9 |
| Type icon | Success | `success/icon` | #3A9371 | #CBEADB |
| Type icon | Warning | `warning/icon` | #644702 | #E4CA9C |
| Type icon | Error | `error/icon` | #B22B48 | #FF8D99 |
| Message | All | `text/primary` | #1A1511 | #FDF9F6 |
| Dismiss icon | All | `text/secondary` | #4A423C | #ECE5DF |
| Action label (ghost button) | All | `action/secondary/bg` | #21536B | #AED4E9 |
| Action fill (ghost button) | Hover and pressed | `bg/sunken` | #ECE5DF | #0E0A07 |

| Measure | Token | Value |
|---|---|---|
| Padding, all sides | `space-role/inset-md` | 16 |
| Gap between items | `space/12` | 12 |
| Type icon size | `size/icon-md` | 20 |
| Action height | `size/control-sm` | 32 |
| Action horizontal padding | `space-role/inset-sm` | 12 |
| Dismiss button size | `size/touch-min` | 24 |
| Dismiss icon size | `size/icon-sm` | 16 |
| Corner radius | `radius/lg` | 12 |
| Border width | `border/thin` | 1 |
| Shadow | `Aipim/elevation/overlay` | 0 16 32 -8 at 24%, 0 8 16 -4 at 12% (light). 60% and 40% in dark. |
| Message type | `Aipim/body` | 16/24 Regular |
| Enter motion | `duration/base`, `easing/enter` | 200ms |
| Exit motion | `duration/fast`, `easing/exit` | 100ms |
| Stacking order | `z/toast` | 500 |

Width is 360px (no token) and shrinks to fit narrow screens. Sizes are measured from the outer edge. With an action and a dismiss button the toast is 64px high, message only 56px.

The dismiss button is 24px: it meets `size/touch-min` and is below `size/touch-comfortable` (44).

## Accessibility

- Put toasts in a region with `aria-live="polite"`, and give each toast `role="status"`. Use `role="alert"` only for urgent errors.
- Keep a toast on screen for at least 5 seconds, longer for longer text, and keep it while it has focus or the pointer is over it (WCAG 2.2.1: a time limit must be adjustable or long enough). The CSS does not time anything: the timer is yours.
- Never make a toast the only way to learn something important.
- A toast with an action is reachable with Tab. The action has a clear name, such as "Undo". Esc dismisses it when it can be dismissed.
- The type icon is decorative: `aria-hidden="true"`.

## Code examples

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">
<script src="aipim.js"></script>

<div class="aipim-toast-region" aria-live="polite">
  <div class="aipim-toast aipim-toast--success" role="status">
    <svg class="aipim-icon aipim-toast__icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-success"></use></svg>
    <p class="aipim-toast__message">Item deleted.</p>
    <button class="aipim-button aipim-button--ghost aipim-button--sm" type="button"><span>Undo</span></button>
    <button class="aipim-dismiss" type="button" aria-label="Dismiss" data-aipim-dismiss>
      <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-close"></use></svg>
    </button>
  </div>
</div>
```

## Do and don't

- Do: a quick confirmation with a way to undo ("Item deleted." Undo).
- Don't: put an error that needs a decision in a toast ("Payment failed. Check your card details."). It belongs in an alert.
