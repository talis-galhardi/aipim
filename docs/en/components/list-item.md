---
name: list-item
description: One row of a list, with a start, a title and a description, and an end that is a chevron, a value or a switch.
status: beta
group: molecules
html: ul, li, a, button, label
class: aipim-list-item
css: components/web/list-item.css
figma: Aipim DS, page Moléculas, List item
wcag: ["1.3.1 Info and Relationships", "1.4.3 Contrast (Minimum)", "2.4.7 Focus Visible", "2.5.3 Label in Name", "2.5.8 Target Size (Minimum)", "4.1.2 Name, Role, Value"]
related: [avatar, switch, card]
---

# List item

One row of a list: a start with an avatar or an icon, a title and a description, and at the end a chevron, a value or a switch. It is the base of almost every app screen: settings, statement, contacts, notifications.

## When to use

- Lists of similar items: settings, contacts, transactions, notifications.
- Rows that open another screen (with a chevron) or turn something on (with a switch).

## When not to use

- Content with a large image and several texts: use the [card](card.md).
- To pick between options of a form: use [radio buttons](radio.md), [checkboxes](checkbox.md) or a [select](select.md).
- A table with several columns: not in this version.

## Decision: the row acts or only shows

A row with a chevron is a whole link or button: a touch target of at least 44px and one stop of Tab, and a screen reader reads the title and the description together. A row with a value, or with nothing at the end, only shows: it has no hover and no focus. A row with a switch is not a link: the switch is the control and the title is its label.

## Decision: the start is an avatar you swap

The start is not an empty space. It is a 40px [avatar](avatar.md) that you swap for the icon, the photo or the initials. That way every row of a list aligns its text at the same point, with or without an image, and the product does not invent a second kind of icon.

## Variants and props

| Class or attribute | What it does |
|---|---|
| `aipim-list` on `ul` | The list: no bullets, no margin. |
| `aipim-list-item` on `li` | One item. It draws the divider under it, and the last item of the list has none. |
| `aipim-list-item--plain` | No divider, for an item that is not the last. |
| `aipim-list-item__row` | The row: padding, gap and minimum height. A `div` when it only shows, an `a` or a `button` when it leads somewhere, a `label` when it holds a switch. |
| `aipim-list-item__leading` | The start, usually an [avatar](avatar.md). |
| `aipim-list-item__text` with `__title` and `__description` | The title, and the description under it when there is one. |
| `aipim-list-item__trailing` | The end: a chevron icon, a value as text, or a switch. |
| `aria-disabled="true"` on a link, `disabled` on a button | The disabled state. |

## States

| State | What changes |
|---|---|
| Default | The row as it is. |
| Hover | The row fills with `bg/sunken`. Only on rows that act. |
| Focus | A 3px ring drawn inside the row. A row with a switch has none: the switch draws its own ring. |
| Disabled | The texts and the end go to `text/muted` and the start is dimmed. |

A row that only shows has neither hover nor focus.

## Tokens used

| Applies to | State | Token | Light | Dark |
|---|---|---|---|---|
| Title | All | `text/primary` | #1A1511 | #FDF9F6 |
| Description, value and chevron | All | `text/secondary` | #4A423C | #ECE5DF |
| Background | Hover | `bg/sunken` | #ECE5DF | #0E0A07 |
| Divider | All | `border/subtle` | #DAD1CA | #4A423C |
| Focus ring | Focus | `focus/ring` | #0364C2 | #AED1FE |
| Text | Disabled | `text/muted` | #665D56 | #DAD1CA |

The start uses the colors of the [avatar](avatar.md).

| Measure | Token | Value |
|---|---|---|
| Minimum height | `size/touch-comfortable` | 44 |
| Horizontal padding | `space/16` | 16 |
| Vertical padding | `space/12` | 12 |
| Space between the parts | `space/12` | 12 |
| Start (avatar) | `size/control-md` | 40 |
| Chevron | `size/icon-md` | 20 |
| Divider | `border/thin` | 1, over the bottom edge |
| Focus ring | `border/thick` | 3, inside the row |

The divider is drawn over the bottom edge of the item and adds no height. With a title and a description the row is 69px high: 45 of text and 12 of padding above and below. Without a start and a description it is 48.

## Accessibility

- The list is a `ul` with `li`, so a screen reader says how many items there are.
- A row that leads somewhere is an `a` or a `button` whose name is its own content, so a screen reader reads the title and the description together. Do not name it with `aria-labelledby` on the title alone: the name must hold all the text that is visible (WCAG 2.5.3).
- Tab and Shift+Tab stop on the rows that act and on switches. A row that only shows is not a stop.
- Enter opens the destination of a row with a chevron. Space turns the switch on or off when the focus is on it.
- A switch has `role="switch"`. The whole row is its `label`, so the title and the description are its name, and a click anywhere on the row changes the switch.
- The chevron is `aria-hidden="true"`. The start is `aria-hidden="true"` when the text already says who it is.
- A disabled link has `aria-disabled="true"`, takes no focus (`tabindex="-1"`) and ignores clicks.

## Code examples

```html
<ul class="aipim-list">
  <li class="aipim-list-item">
    <a class="aipim-list-item__row" href="pix-keys.html">
      <span class="aipim-list-item__leading">
        <span class="aipim-avatar" aria-hidden="true"><svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-user"></use></svg></span>
      </span>
      <span class="aipim-list-item__text">
        <span class="aipim-list-item__title">Pix key</span>
        <span class="aipim-list-item__description">CPF or email</span>
      </span>
      <span class="aipim-list-item__trailing"><svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-chevron-right"></use></svg></span>
    </a>
  </li>
  <li class="aipim-list-item">
    <label class="aipim-list-item__row">
      <span class="aipim-list-item__text"><span class="aipim-list-item__title">Notifications</span></span>
      <span class="aipim-list-item__trailing">
        <span class="aipim-switch">
          <input class="aipim-switch__input" type="checkbox" role="switch">
          <span class="aipim-switch__track" aria-hidden="true"></span>
        </span>
      </span>
    </label>
  </li>
</ul>
```

## Do and don't

- Do: give every row a start, even if it is only an icon, so the text stays aligned.
- Don't: leave one row without a start in the middle of a list, where the text jumps to another place.
