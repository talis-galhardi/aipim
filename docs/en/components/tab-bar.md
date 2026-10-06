---
name: tab-bar
description: The main navigation on phones, with three to five destinations.
status: beta
html: nav, a
class: aipim-tab-bar
css: components/web/tab-bar.css
figma: Aipim DS, page Navigation, Tab bar
tokens: [bg/surface, border/subtle, action/primary/bg, text/secondary, bg/sunken, error/icon, focus/ring, space/4, space/8, space/12, size/icon-lg, radius/md, radius/full, border/thin, border/thick, focus/offset, Aipim/body-sm]
wcag: ["1.4.1 Use of Color", "1.4.11 Non-text Contrast", "2.4.7 Focus Visible", "2.5.8 Target Size (Minimum)", "4.1.2 Name, Role, Value"]
related: [top-bar, tabs]
---

# Tab bar

The main navigation on phones, with three to five destinations.

## When to use

- For the main navigation on phones, with 3 to 5 destinations.
- When people move between the same sections often.

## When not to use

- More than 5 destinations: use a menu.
- To switch views of the same content: use [tabs](tabs.md).

## Variants and props

| Class | What it does |
|---|---|
| `aipim-tab-bar` | The bar. Fixed to the bottom of the screen by your layout. |
| `aipim-tab-bar__item` | One destination: icon and label. The whole item is the target. `aria-current="page"` marks the current one. |
| `aipim-tab-bar__icon` | Wraps the 24px icon so a badge can sit on its corner. |
| `aipim-tab-bar__badge` | Optional 10px dot. Put hidden text inside it, such as "3 unread". |
| `aipim-tab-bar__label` | Always visible. `Aipim/body-sm`. |

## States

Default, hover (`bg/sunken` fill), focus (3px ring, 3px away) and current. The current destination turns `action/primary/bg` and shows a 24 by 3px bar above the icon. Pressed looks like hover.

## Tokens used

| Applies to | State | Token | Light | Dark |
|---|---|---|---|---|
| Bar fill | All | `bg/surface` | #FDF9F6 | #302A25 |
| Top border | All | `border/subtle` | #DAD1CA | #4A423C |
| Icon, label and indicator | Current | `action/primary/bg` | #B43000 | #FF9275 |
| Icon and label | Other destinations | `text/secondary` | #4A423C | #ECE5DF |
| Destination fill | Hover | `bg/sunken` | #ECE5DF | #0E0A07 |
| Badge dot | All | `error/icon` | #DE316D | #FF5387 |
| Badge dot outline | All | `bg/surface` | #FDF9F6 | #302A25 |
| Focus ring | Focus | `focus/ring` | #0364C2 | #AED1FE |

| Measure | Token | Value |
|---|---|---|
| Bar padding, all sides | `space/8` | 8 |
| Gap between destinations | `space/4` | 4 |
| Bar height | Padding plus the destination | 80 |
| Destination height | Indicator, icon, label and spacing | 64 |
| Destination horizontal padding | `space/12` | 12 |
| Destination bottom padding | `space/8` | 8 |
| Gap inside a destination | `space/4` | 4 |
| Destination corner radius | `radius/md` | 8 |
| Indicator size | `size/icon-lg` by `border/thick` | 24 by 3 |
| Indicator corner radius | `radius/full` | Fully round |
| Icon size | `size/icon-lg` | 24 |
| Badge dot size | No token | 10 |
| Label type | `Aipim/body-sm` | 14/21 Regular |
| Top border width | `border/thin` | 1 |

Destinations share the width of the bar equally. The top border is an inset shadow, so it does not add to the 80px height. Each destination is 64px high: it meets both `size/touch-min` and `size/touch-comfortable`.

## Accessibility

- Use a `nav` element with an `aria-label`, such as "Main".
- The current destination has `aria-current="page"`.
- An icon always comes with a visible label.
- A badge needs text for screen readers, such as "3 unread". Use `aipim-visually-hidden` inside it.
- Tab moves between destinations and Enter activates the focused one. The focus ring is always visible.
- Labels wrap onto a second line when they are long or the text is large. They are never cut with an ellipsis, so no text is lost at 200% text size.

## Code examples

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">

<nav class="aipim-tab-bar" aria-label="Main">
  <a class="aipim-tab-bar__item" href="/" aria-current="page">
    <span class="aipim-tab-bar__icon"><svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-home"></use></svg></span>
    <span class="aipim-tab-bar__label">Home</span>
  </a>
  <a class="aipim-tab-bar__item" href="/alerts">
    <span class="aipim-tab-bar__icon">
      <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-bell"></use></svg>
      <span class="aipim-tab-bar__badge"><span class="aipim-visually-hidden">3 unread</span></span>
    </span>
    <span class="aipim-tab-bar__label">Alerts</span>
  </a>
</nav>
```

## Do and don't

- Do: give every icon a visible label (Home, Search, Alerts, Messages).
- Don't: show icons alone. They are not clear: always show the label.
