---
name: accordion
description: A title that opens a panel of text, to hide what most people do not need to read.
status: beta
group: molecules
html: details, summary
class: aipim-accordion
css: components/web/accordion.css
figma: Aipim DS, page Moléculas, Accordion
wcag: ["1.3.1 Info and Relationships", "1.4.3 Contrast (Minimum)", "2.4.7 Focus Visible", "2.5.8 Target Size (Minimum)", "4.1.2 Name, Role, Value"]
related: [tabs, card]
---

# Accordion

A title that opens a panel of text. It hides what most people do not need to read and lets the rest find it in one line: frequent questions, rules, the details of an order.

## When to use

- Frequent questions and help texts, where each person wants to read one or two items.
- The details of an order or of a rule, which matter only to whoever opens them.

## When not to use

- Content that everyone needs to read to decide: leave it in view.
- To switch between sections of the same weight: use [tabs](tabs.md).
- Inside another accordion: one level only.

## Decision: a native element, no script

The item is a `details` with a `summary`. The browser opens and closes it, and the keyboard and the screen reader come for free. Aipim only styles it. To open one at a time, give the `details` of the group the same `name`; without it, each one opens on its own.

## Decision: the whole header is the target

The row of the title opens and closes the item, not only the chevron, and it is at least 44px high. The chevron points at what will happen (down opens, up closes), and the browser already tells a screen reader whether the item is open or closed.

## Variants and props

| Class or attribute | What it does |
|---|---|
| `aipim-accordion` on `details` | One item. It draws the divider under it, so items one after the other form the accordion. |
| `aipim-accordion__header` on `summary` | The header: the title and the chevron. |
| `aipim-accordion__title` | The title. |
| `aipim-accordion__chevron` | The chevron icon (`chevron-down`), `aria-hidden="true"`. It turns up when the item is open. |
| `aipim-accordion__panel` | The panel with the text, shown when the item is open. |
| `open` on the `details` | Starts the item open. |
| `name` on the `details` | The same value in a group: only one item stays open. |

## States

| State | What changes |
|---|---|
| Closed, open | The panel shows only when open, and the chevron turns up. |
| Hover | The header fills with `bg/sunken`. |
| Focus | A 3px ring drawn around the whole item, inside it. |

There is no disabled state. A `details` has none of its own, and an item that cannot be opened should not be on the page. If it must be there, say why in the title or in the text next to it.

## Tokens used

| Applies to | State | Token | Light | Dark |
|---|---|---|---|---|
| Title | All | `text/primary` | #1A1511 | #FDF9F6 |
| Panel and chevron | All | `text/secondary` | #4A423C | #ECE5DF |
| Header | Hover | `bg/sunken` | #ECE5DF | #0E0A07 |
| Divider | All | `border/subtle` | #DAD1CA | #4A423C |
| Focus ring | Focus | `focus/ring` | #0364C2 | #AED1FE |

| Measure | Token | Value |
|---|---|---|
| Minimum height of the header | `size/touch-comfortable` | 44 |
| Horizontal padding | `space/16` | 16 |
| Vertical padding of the header | `space/12` | 12 |
| Space between title and chevron | `space/12` | 12 |
| Chevron | `size/icon-md` | 20 |
| Padding under the panel | `space/16` | 16 |
| Divider | `border/thin` | 1, over the bottom edge, no extra height |
| Focus ring | `border/thick` | 3, inside the item |

## Accessibility

- It is `details` and `summary`: the browser says "collapsed" or "expanded" by itself.
- Tab and Shift+Tab go from header to header. An open panel is not a stop, only what is inside it.
- Enter and Space open or close the item in focus.
- The same `name` on the `details` of a group makes them open one at a time.
- The chevron is `aria-hidden="true"`.
- The panel is the text inside the `details`, read when it is open.

## Code examples

```html
<details class="aipim-accordion" name="pix" open>
  <summary class="aipim-accordion__header">
    <span class="aipim-accordion__title">When does Pix arrive?</span>
    <svg class="aipim-icon aipim-accordion__chevron" aria-hidden="true"><use href="icons/sprite.svg#aipim-chevron-down"></use></svg>
  </summary>
  <div class="aipim-accordion__panel">
    <p>Pix arrives in seconds, at any hour, including holidays.</p>
  </div>
</details>
<details class="aipim-accordion" name="pix">
  <summary class="aipim-accordion__header">
    <span class="aipim-accordion__title">Can I cancel a scheduled Pix?</span>
    <svg class="aipim-icon aipim-accordion__chevron" aria-hidden="true"><use href="icons/sprite.svg#aipim-chevron-down"></use></svg>
  </summary>
  <div class="aipim-accordion__panel">
    <p>Open the schedule in the app and choose cancel.</p>
  </div>
</details>
```

## Do and don't

- Do: short titles, the question or the subject, that fit on one line.
- Don't: titles that are whole sentences, where the row becomes a paragraph and cannot be read at a glance.
