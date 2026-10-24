---
name: combobox
description: A text field that filters a list of options while you type, for long lists such as the states of Brazil or the banks.
status: beta
group: molecules
html: input, label, ul
class: aipim-combobox
css: components/web/combobox.css
figma: Aipim DS, page Moléculas, Combobox
wcag: ["1.3.1 Info and Relationships", "1.4.11 Non-text Contrast", "2.1.1 Keyboard", "2.4.7 Focus Visible", "3.3.1 Error Identification", "3.3.3 Error Suggestion", "4.1.2 Name, Role, Value", "4.1.3 Status Messages"]
related: [select, text-field, brazilian-field]
---

# Combobox

A text field that filters a list of options while you type, for long lists such as the states of Brazil or the banks.

## When to use

- One choice from a long list the person knows by name: the state, the bank, the city.
- When typing two or three letters is faster than scrolling: "ba" finds Bahia, "sp" finds São Paulo.

## When not to use

- A short list: use a [select](select.md), or [radio buttons](radio.md) for five options or fewer.
- Free text with suggestions, where any value is accepted (a search box): this combobox only accepts one of its options.
- To pick more than one option: not in this version.

## How it works

The field is an `input` with `role="combobox"`, and the options are a `ul` with `role="listbox"` in a popup under it. `aipim.js` does the rest.

- **Typing** opens the list and keeps only the options that contain the text, without caring for accents or capitals: "sao" finds "São Paulo". The text also finds an option by its `data-value` when it is the whole value, so "sp" finds São Paulo.
- **Down** or **Up** on a closed list opens it with every option. **Alt+Down** only opens it.
- **Down** and **Up** move the option under the arrows, and wrap from the last to the first. Focus stays in the field and `aria-activedescendant` names that option, so a screen reader reads it.
- **Enter** or a **click** chooses the option: its name goes in the field and its `data-value` in the hidden input of the field, when there is one. The field fires `change`.
- **Escape** closes the list. With the list closed, Escape clears the field.
- **Tab** closes the list and moves on, without choosing.
- **Leaving the field** with a text that is not an option shows the error. A name typed in full, in any case and without accents, becomes that option.
- With no option left, the popup shows the empty message ("No state with that name").
- A screen reader hears the count of options found ("3 options") after a pause in the typing, from a `role="status"` the script adds.

Without the script the field is a plain text field and the list stays hidden: check the value on the server too.

## Decision: a list written in the page

The options are `li` elements in the HTML, not a JavaScript array. The page works the same with any framework, a reader of the code sees the options, and a server can render them. For a list too long for the page (the 5,570 Brazilian municipalities), filter on the server, write the options that came back and call `Aipim.init(field)`.

## Decision: chosen by hand, and only from the list

The list filters while you type but never picks for you. An option is chosen only by Enter, by a click, or by typing its whole name. Picking the first match on its own (automatic selection, in the ARIA pattern) surprises people who type fast and then press Tab. Accepting free text would send values the server does not know, so a text that is not an option is an error, with a message that says how to find it.

## Variants and props

| Class or attribute | What it does |
|---|---|
| `aipim-field aipim-combobox` | The wrapper. It uses the parts of the text field. |
| `aipim-field--lg` | Large field, 48px. Default is medium, 40px. The options stay 40px. |
| `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded`, `aria-controls` on the input | The field. `aria-controls` names the listbox. Add `autocomplete="off"` so the browser's own suggestions do not cover the list. |
| `aipim-combobox__chevron` | The chevron after the field, `aria-hidden="true"`. It turns when the list is open. |
| `aipim-combobox__popup` with `hidden` | The box that opens under the field and scrolls. |
| `aipim-combobox__list`, `role="listbox"`, `aria-labelledby` | The list, named by the label of the field. |
| `aipim-combobox__option`, `role="option"`, `data-value` | One option. Its text is the name shown; `data-value` is the value sent (the UF, the bank code). |
| `aipim-combobox__empty` with `hidden` | The message for no option found. |
| `input type="hidden"` in the wrapper | Optional. Gets the `data-value` of the option chosen, for a form. |
| `data-aipim-error-invalid` on the input | Your own error message, in place of the default. |
| `--aipim-combobox-rows` | How many rows the popup shows before it scrolls. Default 6.5: the half row shows there is more. |

## States

The field has the states of the [text field](text-field.md): default, hover, focus, error and disabled. The list adds:

- **Option under the arrows:** a `bg/sunken` fill and a 3px bar in `action/primary/bg` on its start edge, so it is never shown by color alone.
- **Option under the pointer:** the `bg/sunken` fill.
- **Open:** the chevron points up.

## Tokens used

The field, the label and the helper text use the tokens of the [text field](text-field.md). The combobox adds:

| Applies to | State | Token | Light | Dark |
|---|---|---|---|---|
| Chevron | All | `text/secondary` | #4A423C | #ECE5DF |
| Popup fill | Open | `bg/surface` | #FDF9F6 | #302A25 |
| Popup border | Open | `border/subtle` | #DAD1CA | #4A423C |
| Popup shadow | Open | `elevation/overlay` | | |
| Option text | All | `text/primary` | #1A1511 | #FDF9F6 |
| Option fill | Under the arrows, hover | `bg/sunken` | #ECE5DF | #0E0A07 |
| Option bar | Under the arrows | `action/primary/bg` | #B43000 | #FF9275 |
| Empty message | No option found | `text/secondary` | #4A423C | #ECE5DF |

| Measure | Token | Value |
|---|---|---|
| Option height | `size/control-md` | 40 |
| Option padding | `space/8`, `space-role/inset-sm` | 8, 12 |
| Gap between field and popup | `space/4` | 4 |
| Popup padding | `space/4` | 4 |
| Popup height before it scrolls | `size/control-md` × 6.5 + `space/8` | 268 |
| Bar of the option under the arrows | `border/thick` | 3 |
| Popup layer | `z/dropdown` | |
| Chevron turn | `duration/fast`, `easing/standard` | 100ms, 0ms with reduced motion |

## Accessibility

- It follows the [ARIA 1.2 combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/), with list autocomplete and manual selection.
- A `label` associated with the input, and the listbox named by the same label (`aria-labelledby`).
- Focus never leaves the field while the list is open: the option under the arrows is named by `aria-activedescendant` and marked with `aria-selected="true"`.
- The count of options found is a status message (WCAG 4.1.3), read after a pause so it does not talk over the typing.
- An error shows an icon and text, never color alone, and says how to fix it.
- The popup scrolls inside its own box, so the page does not move under the arrows.
- Escape inside a [modal](modal.md) closes the list first; a second Escape clears the field, and only then does the next one close the modal.

### Screen readers

Checked by hand with each pair below. The browser checks cover the keyboard and the ARIA attributes; only a person can confirm what is read aloud.

| Screen reader | Browser | Status |
|---|---|---|
| VoiceOver (macOS) | Safari | To check |
| NVDA (Windows) | Firefox, Chrome | To check |
| TalkBack (Android) | Chrome | To check |

What to listen for: on focus, the label, "combo box" (or "text field, pop-up") and the helper text; after typing, the count of options; on Down, the name of the option; after Enter, the name chosen in the field; on leaving with a wrong text, the error message.

## Code examples

```html
<div class="aipim-field aipim-combobox">
  <label class="aipim-field__label" for="state" id="state-label">State</label>
  <input class="aipim-field__control" id="state" type="text" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="state-list" aria-describedby="state-help" autocomplete="off">
  <input type="hidden" name="uf">
  <svg class="aipim-icon aipim-combobox__chevron" aria-hidden="true"><use href="icons/sprite.svg#aipim-chevron-down"></use></svg>
  <div class="aipim-combobox__popup" hidden>
    <ul class="aipim-combobox__list" id="state-list" role="listbox" aria-labelledby="state-label">
      <li class="aipim-combobox__option" role="option" id="state-ac" data-value="AC">Acre</li>
      <li class="aipim-combobox__option" role="option" id="state-al" data-value="AL">Alagoas</li>
      <!-- … the other 25 states -->
    </ul>
    <p class="aipim-combobox__empty" hidden>No state with that name</p>
  </div>
  <p class="aipim-field__helper" id="state-help">
    <svg class="aipim-icon aipim-field__icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-error"></use></svg>
    <span>Type part of the name</span>
  </p>
</div>
```

## Do and don't

- Do: the state as a combobox, so "ba" is enough to find Bahia.
- Don't: a combobox for four options, where a person has to type to find out what the options are.
