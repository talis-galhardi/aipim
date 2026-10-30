---
name: datepicker
description: A Brazilian date field with a button that opens a calendar, for dates near today such as a delivery or an appointment.
status: beta
group: molecules
html: input, label, button, table
class: aipim-datepicker
css: components/web/datepicker.css
figma: Aipim DS, page Moléculas, Date picker
wcag: ["1.3.1 Info and Relationships", "1.4.1 Use of Color", "1.4.11 Non-text Contrast", "2.1.1 Keyboard", "2.1.2 No Keyboard Trap", "2.4.3 Focus Order", "2.4.7 Focus Visible", "3.3.1 Error Identification", "3.3.3 Error Suggestion", "4.1.2 Name, Role, Value"]
related: [brazilian-field, text-field, icon-button, modal]
---

# Date picker

A Brazilian date field with a button that opens a calendar, for dates near today such as a delivery or an appointment.

## When to use

- A date the person picks by looking at the week: a delivery, an appointment, the start of a booking.
- A date with limits, where the calendar shows at once which days are allowed.

## When not to use

- A date the person knows by heart, such as the date of birth: use the date of the [Brazilian field](brazilian-field.md). Typing eight digits is faster than going back forty years month by month.
- A range of two dates (check-in and check-out): not in this version. Use two date pickers.
- A date and a time together: not in this version.

## How it works

The field is the date of the [Brazilian field](brazilian-field.md): `data-aipim-format="date"`, with the mask `dd/mm/aaaa` while you type and the check when you leave. Next to it, an [icon button](icon-button.md) opens a calendar that `aipim.js` writes under the field.

- The **calendar button** opens the calendar on the date in the field. With the field empty, it opens on today; with limits, on the nearest day allowed. Focus goes to that day.
- The **arrows** move by day (left and right) and by week (up and down), across months.
- **Home** and **End** go to the Sunday and the Saturday of the week.
- **Page Up** and **Page Down** go to the month before and after, on the same day. With **Shift**, a year.
- **Enter**, **Space** or a **click** chooses the day: the date goes in the field, the calendar closes, focus goes back to the button and the field fires `change`.
- **Escape** closes the calendar without choosing, and focus goes back to the button.
- **Tab** goes round the two month buttons and the day, inside the calendar.
- A **click outside** closes the calendar.
- After a date is chosen or typed, the button says it: "Choose date, Friday, November 20, 2026".
- A valid date inside the limits shows its day of the week on a line of its own under the helper text: "Friday, November 20". It is part of the description of the field, so a screen reader reads it with the helper text. A person who meant Friday and typed the 21st sees it without opening the calendar.

The names of the months and the week days come from `Intl`, in the language of the page (`lang`). The week starts on Sunday, as in a Brazilian calendar.

Without the script the button stays hidden and the field is a plain text field: check the value on the server too.

## Decision: typing comes first

Most date pickers make the calendar the way in and the text field an afterthought. Aipim does the opposite. The field takes the eight digits with the mask, and the calendar is a second way in, for when the day of the week matters. A person who knows the date never has to open the calendar, and a screen reader user is not forced through a grid of 30 cells to type a date they already know.

## Decision: a calendar written by the script

The calendar is not in the HTML: `aipim.js` writes it the first time the page loads, inside the field. The markup a page writes stays small (a label, an input, a button and the helper text), and the calendar is the same in every framework. The native `input type="date"` was the obvious choice, and it was the wrong one: its look and its order of day and month change with the browser and the system, it cannot take the Brazilian mask, and some browsers show no calendar at all.

## Variants and props

| Class or attribute | What it does |
|---|---|
| `aipim-field aipim-datepicker` | The wrapper. It uses the parts of the text field. |
| `aipim-field--lg` | Large field, 48px. Default is medium, 40px. The calendar stays the same size. |
| `data-aipim-format="date"` on the input | The Brazilian date: mask, check and the value as `yyyy-mm-dd` from `Aipim.br.clean`. Add `inputmode="numeric"` and `autocomplete="off"`. |
| `aipim-icon-button aipim-datepicker__button` with `aria-label` | The calendar button, 32px, inside the field. Its `aria-label` gets the date chosen after a comma. Its icon is `calendar`; the calendar takes its month icons from the same sprite. |
| `data-aipim-min`, `data-aipim-max` on the input | Optional, as `yyyy-mm-dd`. The days outside are disabled in the calendar, and a typed date outside shows an error when the person leaves. |
| `data-aipim-error-range` on the input | Your own message for a date outside the limits, in place of the default. |
| `--aipim-datepicker-day` | The size of a day in the calendar. Default `size/control-md`, 40px. |

The script adds these parts, and a page does not write them:

| Class | What it is |
|---|---|
| `aipim-datepicker__popup` | The calendar, `role="dialog"` with `aria-modal="true"`, under the field. |
| `aipim-datepicker__header` | The month buttons and the name of the month. |
| `aipim-datepicker__month` | "November 2026", `aria-live="polite"`, the name of the grid. |
| `aipim-datepicker__grid` | A `table` with `role="grid"`, one row per week. |
| `aipim-datepicker__day` | One day: a `button` inside a `td` with `role="gridcell"`, with the full date as its `aria-label`. The button takes the focus. |
| `aipim-datepicker__weekday` | The day of the week of the date in the field, a `span` at the end of the helper text, hidden while the date is empty, not valid or outside the limits. |

## States

The field has the states of the [text field](text-field.md): default, hover, focus, error and disabled. A disabled field has a disabled button. Each day in the calendar has these:

- **Default:** the number in `text/primary`.
- **Hover:** a `bg/sunken` circle.
- **Focus:** a 3px ring in `focus/ring`, inside the circle.
- **Today:** a 1px ring in `border/strong` and the number in bold.
- **Chosen:** a circle filled with `action/primary/bg`, the number in bold. Today and the chosen day are told apart by shape and weight, never by color alone.
- **Disabled** (outside the limits): the number in `text/muted`, struck through.

## Tokens used

The field, the label and the helper text use the tokens of the [text field](text-field.md). The month buttons are [icon buttons](icon-button.md). The date picker adds:

| Applies to | State | Token | Light | Dark |
|---|---|---|---|---|
| Calendar button icon | All | `text/secondary` | #4A423C | #ECE5DF |
| Calendar fill | Open | `bg/surface` | #FDF9F6 | #302A25 |
| Calendar border | Open | `border/subtle` | #DAD1CA | #4A423C |
| Calendar shadow | Open | `elevation/overlay` | | |
| Month name, day | All | `text/primary` | #1A1511 | #FDF9F6 |
| Week day | All | `text/secondary` | #4A423C | #ECE5DF |
| Day fill | Hover | `bg/sunken` | #ECE5DF | #0E0A07 |
| Day ring | Today | `border/strong` | #837A73 | #A39992 |
| Day fill | Chosen | `action/primary/bg` | #B43000 | #FF9275 |
| Day number | Chosen | `action/primary/text` | #FDF9F6 | #1A1511 |
| Day number | Disabled | `text/muted` | #665D56 | #DAD1CA |
| Focus ring | Focus | `focus/ring` | #0364C2 | #AED1FE |

| Measure | Token | Value |
|---|---|---|
| Calendar button | `size/control-sm` | 32 |
| Calendar button icon | `size/icon-md` | 20 |
| Day | `size/control-md` | 40 |
| Week day row height | `size/control-sm` | 32 |
| Month buttons | `size/control-md` | 40 |
| Gap between field and calendar | `space/4` | 4 |
| Calendar padding | `space/8` | 8 |
| Calendar width | day × 7 + `space/8` × 2 + border | 298 |
| Calendar corner | `radius/md` | 8 |
| Day corner | `radius/full` | Fully round |
| Today ring | `border/thin` | 1 |
| Focus ring | `border/thick` | 3 |
| Calendar layer | `z/dropdown` | |

## Accessibility

- It follows the [ARIA date picker dialog example](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/): a button opens a modal dialog with a grid, and focus goes back to the button when it closes.
- The grid is named by the name of the month, which is a live region: moving to another month reads the new one.
- Each day has the full date as its name ("Friday, November 20, 2026"), so the month and the week day are read with it. The day is a button inside its cell, and it is the button that takes the focus, so a screen reader says the name each time. The chosen day has `aria-selected="true"` on its cell and "selected" at the end of its name, today has `aria-current="date"`, and a day outside the limits has `aria-disabled="true"`.
- No day is in the tab order (every one keeps `tabindex="-1"`) and the script moves the focus. A roving `tabindex`, which the ARIA pattern suggests, made VoiceOver in Safari say nothing on most arrow presses, because the attribute changed on the very element being focused. Tab stays inside the dialog and goes round the two month buttons and the day, and Escape always leaves it (WCAG 2.1.2).
- Escape inside a [modal](modal.md) closes the calendar first, and only the next one closes the modal.
- The week day headers are short ("Mon") with the full name in `abbr`.
- A date outside the limits shows an error with an icon and text that says the limits, never color alone.

### Screen readers

Checked by hand with each pair below. The browser checks cover the keyboard and the ARIA attributes; only a person can confirm what is read aloud.

| Screen reader | Browser | Status |
|---|---|---|
| VoiceOver (macOS) | Safari | Passed, 2026-10-30 |
| NVDA (Windows) | Firefox, Chrome | To check |
| TalkBack (Android) | Chrome | To check |

What to listen for: on the button, "Choose date" and, once there is a date, the date; on opening, "Choose date, dialog" and the day with the focus; on the arrows, each full date; on Page Down, the new month; on Enter, focus back on the button with the date chosen.

On a keyboard without the Page keys (a MacBook, most compact keyboards), Page Down is Fn and the down arrow, and Shift+Page Down is Fn, Shift and the down arrow. Both were checked. The month also changes without those keys at all: Tab reaches the two month buttons inside the calendar.

## Code examples

```html
<div class="aipim-field aipim-datepicker">
  <label class="aipim-field__label" for="delivery">Delivery date</label>
  <input class="aipim-field__control" id="delivery" type="text" inputmode="numeric" autocomplete="off" data-aipim-format="date" data-aipim-min="2026-11-02" data-aipim-max="2026-12-18" aria-describedby="delivery-help">
  <button class="aipim-icon-button aipim-datepicker__button" type="button" aria-label="Choose date">
    <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-calendar"></use></svg>
  </button>
  <p class="aipim-field__helper" aria-live="polite" id="delivery-help">
    <svg class="aipim-icon aipim-field__icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-error"></use></svg>
    <span>From 02/11 to 18/12</span>
  </p>
</div>
```

## Do and don't

- Do: say the limits in the helper text, so the person knows them before opening the calendar.
- Don't: a date picker for the date of birth, where the person has to go back decades month by month.
