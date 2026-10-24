---
name: select
description: Lets a person pick one option from a list that opens, when the options do not fit on screen as radio buttons.
status: beta
group: molecules
html: select, label
class: aipim-select
css: components/web/select.css
figma: Aipim DS, page Moléculas, Select
wcag: ["1.3.1 Info and Relationships", "1.4.11 Non-text Contrast", "2.4.7 Focus Visible", "3.3.1 Error Identification", "3.3.2 Labels or Instructions", "4.1.2 Name, Role, Value"]
related: [combobox, radio, text-field]
---

# Select

Lets a person pick one option from a list that opens, when the options do not fit on screen as radio buttons.

## When to use

- One choice from five to about fifteen options the person already knows, such as the type of a Pix key or of a bank account.
- When the space is short and the options do not need to be compared side by side.

## When not to use

- Two to five options: use [radio buttons](radio.md), which show every option without a click.
- A long list, or one the person would rather type than scroll, such as the states of Brazil or the banks: use the [combobox](combobox.md).
- To pick more than one option: use [checkboxes](checkbox.md).
- To run an action or to move to another page: a select only holds a value.

## Decision: the native select

We styled the browser's own `select` and did not build the list. The closed field has the look of the text field; the list that opens is the browser's.

- The keyboard, the screen readers and the phones already know it. On a phone the options open in the system picker, which is easier to use with a thumb than any list drawn on the page.
- It works without a script and sends its value with the form.
- The cost is that the open list cannot be styled the same way in every browser. When the list needs a filter or its own look, use the combobox.

## Variants and props

| Class or attribute | What it does |
|---|---|
| `aipim-field aipim-select` | The wrapper: label, select, chevron and helper text. It uses the parts of the text field. |
| `aipim-field--lg` | Large field, 48px. Default is medium, 40px. |
| `aipim-field__control` on the `select` | The closed field. |
| `aipim-select__chevron` | The chevron icon after the select, `aria-hidden="true"`. |
| `option value=""` first | The prompt ("Choose one"), shown in `text/muted` until a value is picked. Leave it out when there is a sensible default. |
| `aria-invalid="true"` on the select | The error state. |
| `disabled` on the select | The disabled state. Add `aipim-field--disabled` on the wrapper for browsers without `:has()`. |

## States

Default, hover, focus, error and disabled, the same as the [text field](text-field.md). The chevron does not change with the state.

## Tokens used

The field, the label and the helper text use the tokens of the [text field](text-field.md). The select adds:

| Applies to | State | Token | Light | Dark |
|---|---|---|---|---|
| Chevron | All | `text/secondary` | #4A423C | #ECE5DF |
| Prompt option | Nothing picked | `text/muted` | #665D56 | #DAD1CA |

| Measure | Token | Medium | Large |
|---|---|---|---|
| Chevron size | `size/icon-md` | 20 | 20 |
| Space after the chevron | `space-role/inset-sm`, `space-role/inset-md` | 12 | 16 |
| Room kept for the chevron | inset, icon, inset | 44 | 52 |

## Accessibility

- A `label` associated with the select (`for` and `id`), and helper and error text linked with `aria-describedby`.
- The keyboard is the browser's: Tab enters and leaves; Space, Enter or Alt+Down opens the list; the arrows move; typing a letter jumps to the first option that starts with it.
- An error shows an icon and text, never color alone, and the select gets `aria-invalid="true"`.
- The chevron is decorative (`aria-hidden="true"`): the role of the select already says it opens a list.
- The prompt option has an empty value, so a `required` select is invalid until a person picks something.

## Code examples

```html
<div class="aipim-field aipim-select">
  <label class="aipim-field__label" for="pix-type">Pix key type</label>
  <select class="aipim-field__control" id="pix-type" name="pix-type" aria-describedby="pix-type-help" required>
    <option value="">Choose one</option>
    <option value="cpf">CPF or CNPJ</option>
    <option value="phone">Mobile phone</option>
    <option value="email">Email</option>
    <option value="random">Random key</option>
  </select>
  <svg class="aipim-icon aipim-select__chevron" aria-hidden="true"><use href="icons/sprite.svg#aipim-chevron-down"></use></svg>
  <p class="aipim-field__helper" id="pix-type-help">
    <svg class="aipim-icon aipim-field__icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-error"></use></svg>
    <span>The kind of key you registered at your bank</span>
  </p>
</div>
```

## Do and don't

- Do: a select for a short list of options the person knows by name.
- Don't: a select for the 27 states, where typing "pa" is faster than scrolling.
