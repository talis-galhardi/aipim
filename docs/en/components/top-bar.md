---
name: top-bar
description: The title of a screen, with a back button and up to two actions.
status: beta
html: header, h1, a, button
class: aipim-top-bar
css: components/web/top-bar.css
figma: Aipim DS, page Navigation, Top bar
tokens: [bg/surface, border/subtle, text/primary, bg/sunken, focus/ring, space/8, space/16, size/touch-comfortable, size/icon-lg, radius/md, border/thin, border/thick, focus/offset, Aipim/elevation/raised, Aipim/h4]
wcag: ["1.3.1 Info and Relationships", "2.4.7 Focus Visible", "2.5.8 Target Size (Minimum)", "4.1.2 Name, Role, Value"]
related: [tab-bar, icon-button]
---

# Top bar

The title of a screen, with a back button and up to two actions.

## When to use

- For the title of a screen and its main actions.
- One top bar per screen.
- A back button when the screen sits inside a flow.

## When not to use

- To move between main sections: use the [tab bar](tab-bar.md).
- For long page titles: shorten the title and put the details in the page.

## Variants and props

| Class | What it does |
|---|---|
| `aipim-top-bar` | The bar: surface fill and a bottom border. |
| `aipim-top-bar--scrolled` | Adds the `raised` shadow. Set it while content scrolls under the bar. |
| `aipim-icon-button` | The back button and the actions: [icon buttons](icon-button.md), medium (44px). At most two actions. |
| `aipim-top-bar__title` | The screen title in `Aipim/h4`. Takes the free space. |

## States

The bar is default or scrolled. The buttons follow the [icon button](icon-button.md): a `bg/sunken` fill on hover and pressed, and the focus ring (3px, `focus/ring`, 3px away) for keyboard focus only.

## Tokens used

| Applies to | State | Token | Light | Dark |
|---|---|---|---|---|
| Bar fill | All | `bg/surface` | #FDF9F6 | #302A25 |
| Bottom border | All | `border/subtle` | #DAD1CA | #4A423C |
| Title | All | `text/primary` | #1A1511 | #FDF9F6 |
| Back button and action icons | All | `text/primary` | #1A1511 | #FDF9F6 |
| Back button and action fill | Hover and pressed | `bg/sunken` | #ECE5DF | #0E0A07 |
| Focus ring | Focus | `focus/ring` | #0364C2 | #AED1FE |

| Measure | Token | Value |
|---|---|---|
| Vertical padding | `space/8` | 8 |
| Horizontal padding | `space/16` | 16 |
| Gap between items | `space/8` | 8 |
| Bar height | Padding plus the 44px target | 60 |
| Button target size | `size/touch-comfortable` | 44 |
| Button corner radius | `radius/md` | 8 |
| Icon size | `size/icon-lg` | 24 |
| Title type | `Aipim/h4` | 24 SemiBold |
| Bottom border width | `border/thin` | 1 |
| Shadow when scrolled | `Aipim/elevation/raised` | 0 4 12 -2 at 12%, 0 2 4 -1 at 6% (light). 50% and 30% in dark. |

The bottom border is an inset shadow, so it does not add to the 60px height. The buttons are 44px, which meets both `size/touch-min` and `size/touch-comfortable`.

## Accessibility

- Use the `header` element, with the title as a heading.
- The back button has an `aria-label`, such as "Back". Each icon-only action has an `aria-label` that names what it does.
- Focus order: back button, then actions from left to right. The title is not focusable.
- Enter and Space activate the buttons. Use `a` for a button that goes to another page.

## Code examples

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">

<header class="aipim-top-bar">
  <a class="aipim-icon-button" href="/inbox" aria-label="Back">
    <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-arrow-left"></use></svg>
  </a>
  <h1 class="aipim-top-bar__title">Messages</h1>
  <button class="aipim-icon-button" type="button" aria-label="Search">
    <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-search"></use></svg>
  </button>
</header>
```

## Do and don't

- Do: a short title and at most two actions ("Messages").
- Don't: use a long title ("Quarterly report for the northern region"). It wraps and pushes the layout down.
