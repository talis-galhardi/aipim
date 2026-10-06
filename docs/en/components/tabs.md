---
name: tabs
description: Switches between views of the same content.
status: beta
html: div[role=tablist], button[role=tab], div[role=tabpanel]
class: aipim-tabs
css: components/web/tabs.css
figma: Aipim DS, page Navigation, Tabs
tokens: [text/secondary, text/primary, bg/sunken, action/primary/bg, border/subtle, focus/ring, opacity/disabled, size/touch-comfortable, size/icon-md, space/8, space/16, radius/sm, border/thin, border/thick, focus/offset, Aipim/label]
wcag: ["1.4.11 Non-text Contrast", "2.1.1 Keyboard", "2.4.7 Focus Visible", "2.5.8 Target Size (Minimum)", "4.1.2 Name, Role, Value"]
related: [tab-bar, link]
---

# Tabs

Switches between views of the same content.

## When to use

- To switch between views of the same content.
- When the views are short and sit side by side.
- Up to five or six tabs.

## When not to use

- To move between pages: use [links](link.md) or the [tab bar](tab-bar.md).
- For steps in a flow: use a stepper.

## Variants and props

| Class or attribute | What it does |
|---|---|
| `aipim-tabs` with `role="tablist"` | The row of tabs, with a border along the bottom. |
| `aipim-tab` with `role="tab"` | One tab. A 44px target with a label and an optional 20px icon before it. |
| `aria-selected="true"` | The selected tab. It shows the 3px bar. One tab is always selected. |
| `disabled` | A tab that cannot be used. |
| `role="tabpanel"` | The content of a tab, hidden while its tab is not selected. |

## States

Default, hover (`bg/sunken` fill and `text/primary` label), focus (3px ring, 3px away), selected (3px bar under the tab) and disabled (`opacity/disabled`, 40%). Pressed looks like hover.

## Tokens used

| Applies to | State | Token | Light | Dark |
|---|---|---|---|---|
| Tab label | Default | `text/secondary` | #4A423C | #ECE5DF |
| Tab label | Hover and selected | `text/primary` | #1A1511 | #FDF9F6 |
| Tab icon | All | `text/secondary` | #4A423C | #ECE5DF |
| Tab fill | Hover | `bg/sunken` | #ECE5DF | #0E0A07 |
| Selected bar | Selected | `action/primary/bg` | #B43000 | #FF9275 |
| List border | All | `border/subtle` | #DAD1CA | #4A423C |
| Focus ring | Focus | `focus/ring` | #0364C2 | #AED1FE |
| Whole tab | Disabled | `opacity/disabled` | 40% | 40% |

| Measure | Token | Value |
|---|---|---|
| Tab height | `size/touch-comfortable` | 44 |
| Tab horizontal padding | `space/16` | 16 |
| Gap between tabs | `space/8` | 8 |
| Gap between icon and label | `space/8` | 8 |
| Icon size | `size/icon-md` | 20 |
| Selected bar thickness | `border/thick` | 3 |
| List border width | `border/thin` | 1 |
| Tab corner radius (top corners) | `radius/sm` | 4 |
| Label type | `Aipim/label` | 16/20 Bold |

The selected bar and the list border share the same line, so the list stays 44px high. The bottom corners of a tab are square, so the hover fill sits flush on the bar and the line. Each tab is 44px: it meets both `size/touch-min` and `size/touch-comfortable`.

## Accessibility

- `role="tablist"`, `"tab"` and `"tabpanel"`. Use `aria-selected` on the active tab, `aria-controls` pointing to its panel and `aria-labelledby` on the panel.
- Only the selected tab is in the tab order (`tabindex="0"`); the others are `-1`. Left and right arrows move between tabs, Home and End go to the first and last, and Tab leaves the list. CSS cannot do this: use the optional `aipim.js`, or follow the [ARIA tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) in your own code.
- Tab labels are short: one or two words.
- The focus ring is always visible. The selected tab is shown by a bar (a shape), not by color alone.
- When the tabs do not fit, for example at large text sizes or on a narrow screen, the list scrolls sideways inside its own box and the page does not. With `aipim.js`, the selected or focused tab is scrolled into view.

## Code examples

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">
<script src="aipim.js"></script>

<div class="aipim-tabs" role="tablist" aria-label="Project">
  <button class="aipim-tab" role="tab" id="tab-overview" aria-selected="true" aria-controls="panel-overview" type="button"><span>Overview</span></button>
  <button class="aipim-tab" role="tab" id="tab-details" aria-selected="false" aria-controls="panel-details" type="button"><span>Details</span></button>
</div>
<div role="tabpanel" id="panel-overview" aria-labelledby="tab-overview" tabindex="0">Overview content.</div>
<div role="tabpanel" id="panel-details" aria-labelledby="tab-details" tabindex="0" hidden>Details content.</div>
```

## Do and don't

- Do: short labels for views of the same content (Overview, Details, Activity).
- Don't: use a single tab. One tab offers no choice: show the content directly.
