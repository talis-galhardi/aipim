---
name: switch
description: Turns a setting on or off, and the change applies right away.
status: beta
html: input[type=checkbox][role=switch], label
class: aipim-switch
css: components/web/switch.css
figma: Aipim DS, page Data entry, Switch
tokens: [border/strong, text/muted, bg/surface, action/primary/bg, action/primary/text, action/primary/hover, text/primary, focus/ring, opacity/disabled, size/touch-comfortable, size/touch-min, size/icon-sm, space/4, space/12, radius/full, border/thick, focus/offset, Aipim/body]
wcag: ["1.4.1 Use of Color", "1.4.11 Non-text Contrast", "2.4.7 Focus Visible", "2.5.8 Target Size (Minimum)", "4.1.2 Name, Role, Value"]
related: [checkbox, radio]
---

# Switch

Turns a setting on or off, and the change applies right away.

## When to use

- For a setting that takes effect immediately.
- For on or off preferences, such as notifications.

## When not to use

- When the choice needs a submit button: use a [checkbox](checkbox.md).
- For choosing between two named options: use [radio buttons](radio.md).

## Variants and props

| Class or state | What it does |
|---|---|
| `aipim-switch` | The label that wraps the input, the track and the text. The whole row is the click target. |
| `aipim-switch__input` | The real input: `type="checkbox"` with `role="switch"`. |
| `aipim-switch__track` | The drawn track and knob. Put `aria-hidden="true"` on it. |
| `aipim-switch__label` | The text, to the right of the track. |
| `:checked` | On: the track takes the primary color and the knob slides right. |

## States

Default, hover, focus and disabled, for off and on. Hover darkens the track. Focus is a 3px ring, 3px away from the track. Disabled uses `opacity/disabled`. The knob moves with `duration/fast` and `ease/standard`, and does not move with reduced motion.

## Tokens used

| Applies to | State | Token | Light | Dark |
|---|---|---|---|---|
| Track | Off | `border/strong` | #837A73 | #A39992 |
| Track | Off, hover | `text/muted` | #665D56 | #DAD1CA |
| Track | On | `action/primary/bg` | #763B01 | #F8C09B |
| Track | On, hover | `action/primary/hover` | #542801 | #FED9C0 |
| Knob | Off | `bg/surface` | #FDF9F6 | #302A25 |
| Knob | On | `action/primary/text` | #FDF9F6 | #1A1511 |
| Label | All | `text/primary` | #1A1511 | #FDF9F6 |
| Focus ring | Focus | `focus/ring` | #306E8B | #AED4E9 |
| Whole switch | Disabled | `opacity/disabled` | 40% | 40% |

| Measure | Token | Value |
|---|---|---|
| Track width | `size/touch-comfortable` | 44 |
| Track height | `size/touch-min` | 24 |
| Knob size | `size/icon-sm` | 16 |
| Space between track edge and knob | `space/4` | 4 |
| Gap between track and label | `space/12` | 12 |
| Track corner radius | `radius/full` | fully round |
| Label type | `Aipim/body` | 16/24 Regular |

The track is 24px tall: it meets the 24px minimum target and is below the 44px comfortable one.

## Accessibility

- Use `role="switch"` on a checkbox input (it carries `aria-checked` for you), or a button with `role="switch"` and `aria-checked`.
- The label names what it controls, such as "Notifications", not the state.
- The state also shows in the knob position, not only in color.
- Space toggles the switch. Tab moves focus, and the ring is always visible.

## Code examples

```html
<label class="aipim-switch">
  <input class="aipim-switch__input" type="checkbox" role="switch" checked>
  <span class="aipim-switch__track" aria-hidden="true"></span>
  <span class="aipim-switch__label">Notifications</span>
</label>
```

## Do and don't

- Do: the label names the setting ("Notifications").
- Don't: the label should not describe the action or state ("Turn notifications on").
