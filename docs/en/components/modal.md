---
name: modal
description: A decision or short task that needs attention, on top of the page.
status: beta
html: dialog, h2, p, button
class: aipim-modal
css: components/web/modal.css
figma: Aipim DS, page Content and overlays, Modal
tokens: [bg/surface, bg/scrim, text/primary, text/secondary, bg/sunken, action/secondary/bg, action/primary/bg, action/primary/text, focus/ring, opacity/scrim, space-role/inset-xl, space-role/inset-lg, space/12, space/16, size/touch-comfortable, size/icon-lg, size/control-md, radius/2xl, radius/md, border/thick, focus/offset, Aipim/elevation/overlay, z/modal, Aipim/h3, Aipim/body]
wcag: ["1.4.11 Non-text Contrast", "2.1.2 No Keyboard Trap", "2.4.3 Focus Order", "2.4.7 Focus Visible", "4.1.2 Name, Role, Value"]
related: [button, icon-button, alert]
---

# Modal

A decision or short task that needs attention, on top of the page.

## When to use

- For a decision or a short task that needs attention.
- Confirmations, short forms and choices with consequences.
- Full screen on phones.

## When not to use

- For information that can stay on the page: use an [alert](alert.md) or plain content.
- For long tasks or forms: use a page.
- Opening a modal from another modal.

## Variants and props

| Class | What it does |
|---|---|
| `aipim-modal` | The panel, on the native `dialog` element. The browser draws the scrim (`::backdrop`). |
| `aipim-modal__header` | Holds the title and the close button. |
| `aipim-modal__title` | Names the decision or task. `Aipim/h3`. Link it with `aria-labelledby`. |
| `aipim-icon-button` | The close button: a medium [icon button](icon-button.md), 44px. Required. |
| `aipim-modal__body` | The message or the content of the task. `Aipim/body`. |
| `aipim-modal__actions` | Cancel as an outline [button](button.md) and the main action as a primary button. |

On a screen narrower than 600px (`breakpoint/tablet`) the panel fills the screen, the padding is 24 and the actions stack at full width.

## States

Closed or open. Open it with `showModal()`, or with no script using an invoker command:

```html
<button command="show-modal" commandfor="my-modal">Open</button>
<button command="close" commandfor="my-modal">Close</button>
```

The optional `aipim.js` adds the same commands for browsers that do not support them yet. Esc closes the modal and focus returns to the control that opened it.

## Tokens used

| Applies to | State | Token | Light | Dark |
|---|---|---|---|---|
| Panel fill | All | `bg/surface` | #FDF9F6 | #302A25 |
| Scrim (shown at `opacity/scrim`, 50%) | All | `bg/scrim` | #0E0A07 | #0E0A07 |
| Title | All | `text/primary` | #1A1511 | #FDF9F6 |
| Body | All | `text/secondary` | #4A423C | #ECE5DF |
| Close icon | All | `text/primary` | #1A1511 | #FDF9F6 |
| Close button fill | Hover and pressed | `bg/sunken` | #ECE5DF | #0E0A07 |
| Cancel button border and label | All | `action/secondary/bg` | #21536B | #AED4E9 |
| Confirm button fill | All | `action/primary/bg` | #763B01 | #F8C09B |
| Confirm button label | All | `action/primary/text` | #FDF9F6 | #1A1511 |
| Focus ring | Focus | `focus/ring` | #306E8B | #AED4E9 |

| Measure | Token | Value |
|---|---|---|
| Panel padding, desktop | `space-role/inset-xl` | 32 |
| Panel padding, mobile | `space-role/inset-lg` | 24 |
| Gap between header, body and actions | `space/16` | 16 |
| Gap between actions | `space/12` | 12 |
| Panel width, desktop | No token | 480 |
| Panel corner radius | `radius/2xl` | 24 |
| Close button size | `size/touch-comfortable` | 44 |
| Close button corner radius | `radius/md` | 8 |
| Close icon size | `size/icon-lg` | 24 |
| Action height | `size/control-md` | 40 |
| Title type | `Aipim/h3` | 32 Bold |
| Body type | `Aipim/body` | 16/24 Regular |
| Shadow | `Aipim/elevation/overlay` | 0 16 32 -8 at 24%, 0 8 16 -4 at 12% (light). 60% and 40% in dark. |
| Scrim opacity | `opacity/scrim` | 50% |
| Stacking order | `z/modal` | 400 |

`z/modal` is for layouts that do not use the native `dialog`: a `dialog` opened with `showModal()` is in the top layer and ignores `z-index`.

## Accessibility

- The native `dialog` opened with `showModal()` gives you the rest: focus moves in, Tab and Shift+Tab stay inside, the page behind is inert and Esc closes it.
- Link the title with `aria-labelledby`. Use `role="alertdialog"` for a confirmation that interrupts the person.
- The close button has an `aria-label`, such as "Close", and is 44px.
- Do not close on a click on the scrim for a modal that needs a decision.
- Text and the focus ring meet contrast on the panel in both themes.

## Code examples

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">

<button class="aipim-button" type="button" command="show-modal" commandfor="delete-modal"><span>Delete project</span></button>

<dialog class="aipim-modal" id="delete-modal" aria-labelledby="delete-title">
  <div class="aipim-modal__header">
    <h2 class="aipim-modal__title" id="delete-title">Delete project?</h2>
    <button class="aipim-icon-button" type="button" aria-label="Close" command="close" commandfor="delete-modal">
      <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-close"></use></svg>
    </button>
  </div>
  <p class="aipim-modal__body">This cannot be undone. All files in the project will be removed.</p>
  <div class="aipim-modal__actions">
    <button class="aipim-button aipim-button--outline" type="button" command="close" commandfor="delete-modal"><span>Cancel</span></button>
    <button class="aipim-button" type="button"><span>Delete</span></button>
  </div>
</dialog>
```

## Do and don't

- Do: use it for a decision that needs attention, with clear actions ("Delete project?", Cancel, Confirm).
- Don't: interrupt with information that can stay on the page ("Welcome back! Here is a tip...").
