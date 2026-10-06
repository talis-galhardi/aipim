---
name: empty-state
description: What a list, search or area shows when there is nothing to show yet.
status: beta
html: div, h2, p, a, button
class: aipim-empty-state
css: components/web/empty-state.css
figma: Aipim DS, page Feedback, Empty state
tokens: [text/primary, text/secondary, action/primary/bg, action/primary/text, border/strong, space/16, space/32, radius/lg, radius/md, size/control-md, space-role/inset-md, Aipim/h4, Aipim/body]
wcag: ["1.1.1 Non-text Content", "1.3.1 Info and Relationships", "1.4.3 Contrast (Minimum)"]
related: [button, alert]
---

# Empty state

What a list, search or area shows when there is nothing to show yet.

## When to use

- A list or search with nothing to show.
- The first time someone opens an area.

## When not to use

- For errors: use an error message with a way to retry.
- For a short wait while content loads: use a loading indicator.

## Variants and props

| Class | What it does |
|---|---|
| `aipim-empty-state` | One centered column, up to 400px wide. |
| `aipim-empty-state__art` | Optional 160 by 120px slot for an illustration. The artwork scales to fit. |
| `aipim-empty-state__title` | Says what is empty. `Aipim/h4`. |
| `aipim-empty-state__description` | Explains why and what to do next. `Aipim/body`. |
| `aipim-button` | Optional primary action that starts the next step. |

## States

An empty state has no states of its own. The action follows the [button](button.md).

## Tokens used

| Applies to | State | Token | Light | Dark |
|---|---|---|---|---|
| Title | All | `text/primary` | #1A1511 | #FDF9F6 |
| Description | All | `text/secondary` | #4A423C | #ECE5DF |
| Action fill | Default | `action/primary/bg` | #B43000 | #FF9275 |
| Action label | All | `action/primary/text` | #FDF9F6 | #1A1511 |
| Illustration slot outline (placeholder only) | All | `border/strong` | #837A73 | #A39992 |

| Measure | Token | Value |
|---|---|---|
| Padding, all sides | `space/32` | 32 |
| Gap between parts | `space/16` | 16 |
| Illustration slot size | No token | 160 by 120 |
| Illustration slot corner radius | `radius/lg` | 12 |
| Action height | `size/control-md` | 40 |
| Action horizontal padding | `space-role/inset-md` | 16 |
| Action corner radius | `radius/md` | 8 |
| Title type | `Aipim/h4` | 24 SemiBold |
| Description type | `Aipim/body` | 16/24 Regular |

Width is limited to 400px (no token). The slot size has no token on purpose: it is a size for artwork, not a spacing or shape value.

## Accessibility

- The illustration is decorative: empty `alt` text on an image, or `aria-hidden="true"` on an inline SVG. It is not focusable.
- The title is a heading at the right level for the page.
- The description says what to do next, in plain text.
- The action is the first focusable element in the area and should receive focus first when the area opens.

## Code examples

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">

<div class="aipim-empty-state">
  <div class="aipim-empty-state__art"><img src="no-projects.svg" alt=""></div>
  <h2 class="aipim-empty-state__title">No projects yet</h2>
  <p class="aipim-empty-state__description">Create your first project to get started.</p>
  <button class="aipim-button" type="button"><span>Create project</span></button>
</div>
```

## Do and don't

- Do: give a clear next step ("No projects yet", "Create your first project to get started", Create project).
- Don't: leave a dead end ("Nothing here" and no action).
