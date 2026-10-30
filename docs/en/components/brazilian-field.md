---
name: brazilian-field
description: A text field for Brazilian data (CPF, CNPJ, CEP, phone, date and reais), with its mask and its check.
status: beta
group: molecules
html: input, label
class: aipim-field
css: components/web/text-field.css
figma: Aipim DS, page Moléculas, Brazilian field
wcag: ["1.3.1 Info and Relationships", "1.3.5 Identify Input Purpose", "3.3.1 Error Identification", "3.3.2 Labels or Instructions", "3.3.3 Error Suggestion", "4.1.2 Name, Role, Value"]
related: [text-field]
---

# Brazilian field

A text field for Brazilian data (CPF, CNPJ, CEP, phone, date and reais), with its mask and its check.

## When to use

- For the documents and formats every Brazilian form asks for: CPF, CNPJ, CEP, a phone with area code, a date as dd/mm/aaaa and an amount in reais.
- When the person types the value. A value picked from a list is a select.

## When not to use

- For a phone outside Brazil: use a [text field](text-field.md) with `type="tel"`.
- For a date picked on a calendar: a date picker (not in this version).
- For any other format. The six formats are the ones with a Brazilian rule behind them; a generic mask is not part of Aipim.

## How it works

It is a [text field](text-field.md) with `data-aipim-format` on the input. The look, the sizes, the states and the tokens are the ones of the text field. What changes comes from `components/web/aipim.js`:

- **While you type**, the mask goes in (dots, dashes, slash, parentheses) and the caret stays after the character you typed. Pasting works with or without the mask.
- **Backspace on a dot or a dash** deletes the digit before it. Without this, the mask would put the dot back and the caret would not move.
- **When you leave the field**, the value is checked. An error sets `aria-invalid="true"` and writes the message in the helper text.
- **As soon as the value is valid again**, the error goes away and the helper text comes back. The error never shows up while the person is still typing.

Without the script the field is a plain text field: the person can type the value with or without the mask. Check the value on the server in any case.

| Format | `data-aipim-format` | Mask | Checked |
|---|---|---|---|
| CPF | `cpf` | 000.000.000-00 | 11 digits, both check digits, not all the same digit |
| CNPJ | `cnpj` | AA.AAA.AAA/AAAA-00 (A is a letter or a digit) | 14 characters, letters only in the first 12, both check digits |
| CEP | `cep` | 00000-000 | 8 digits |
| Phone | `phone` | (00) 00000-0000 or (00) 0000-0000 | an area code that exists; a mobile number has 11 digits and starts with 9, a landline has 10 and starts with 2 to 5 |
| Date | `date` | dd/mm/aaaa | a date that exists, leap years included |
| Reais | `money` | R$ 1.234,56 | nothing: any amount is valid. Leaving the field writes the two decimals |

## Decision: the mask while typing, the check when leaving

A field that turns red at the first digit tells off the person for something they have not finished. A field that only formats when you leave it hides the format while you type, and the person counts digits on the screen. The mask while typing shows how much is left; the check when leaving says what is wrong only once there is something to say.

## Decision: a CNPJ with letters

Since July 2026 the Receita Federal gives out CNPJs with letters in the first 12 characters (Instrução Normativa RFB 2.229/2024). The two check digits stay numbers. So the CNPJ field has no `inputmode="numeric"`: a numeric keyboard would block the letters. Letters become capitals as you type, and the old CNPJs, all digits, still work.

## Decision: a typed date, not `type="date"`

The native date input shows the order of the browser's language, not the page's: a Brazilian on a computer in English sees mm/dd/yyyy. And for a date of birth, eight digits are faster than a calendar that opens on today. The date field is a text field with the dd/mm/aaaa mask.

## Variants and props

| Attribute | What it does |
|---|---|
| `data-aipim-format` | The format: `cpf`, `cnpj`, `cep`, `phone`, `date` or `money`. |
| `data-aipim-error-incomplete`, `data-aipim-error-invalid` | Your own error messages, instead of the ones in the script. |
| `data-aipim-help` on the helper's `span` | The helper text to bring back when an error rendered on the server is fixed. |

Put these on the input too, for the right keyboard on phones and for autofill:

| Format | Attributes |
|---|---|
| CPF | `inputmode="numeric"` |
| CNPJ | `autocapitalize="characters"`, `spellcheck="false"` |
| CEP | `inputmode="numeric"`, `autocomplete="postal-code"` |
| Phone | `type="tel"`, `autocomplete="tel-national"` |
| Date | `inputmode="numeric"`; for a date of birth, `autocomplete="bday"` |
| Reais | `inputmode="decimal"` |

Do not set `maxlength`: a pasted value with its mask or with +55 is longer than the value, and the script cuts the extra characters itself.

The messages are in Brazilian Portuguese when the nearest `lang` starts with `pt`, and in English otherwise.

## In code: `Aipim.br`

The same rules as plain functions, for a React or Vue app that controls its own value, and for the server. In a browser the script puts them on `Aipim.br`. Where there is no page, import the same three from the module: it touches no DOM, so it runs in Node, in a route handler and in a test.

```js
import { format, check, clean } from 'aipim-ds/br.js';

check('cpf', '390.533.447-05');  // ''
clean('date', '20/11/2026');     // '2026-11-20'
```


| Function | Returns |
|---|---|
| `Aipim.br.format(type, value, done)` | The value with its mask. `done` adds the two decimals of an amount. |
| `Aipim.br.check(type, value)` | `''` when valid or empty, `'incomplete'` or `'invalid'`. |
| `Aipim.br.clean(type, value)` | The value to store: the digits (a CNPJ in capitals), a date as `yyyy-mm-dd`, an amount as `1234.56`. `''` when the value is not valid. |

## Accessibility

- Everything in the [text field](text-field.md): a label above the field, helper and error text linked with `aria-describedby`, an error with an icon and text.
- The helper text says the format before anyone gets it wrong ("Type only the numbers", "With the area code").
- The error says what is wrong and what to check ("A CPF has 11 digits. Check if one is missing."), in line with 3.3.3 Error Suggestion.
- The message is not announced while focus is elsewhere. Screen readers read it when the person comes back to the field. When a form is sent with errors, move focus to the first invalid field.
- The `autocomplete` values let browsers fill the CEP, the phone and the date of birth (1.3.5 Identify Input Purpose).

## Code examples

```html
<div class="aipim-field">
  <label class="aipim-field__label" for="cpf">CPF</label>
  <input class="aipim-field__control" id="cpf" name="cpf" type="text" inputmode="numeric" data-aipim-format="cpf" aria-describedby="cpf-help">
  <p class="aipim-field__helper" aria-live="polite" id="cpf-help">
    <svg class="aipim-icon aipim-field__icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-error"></use></svg>
    <span>Type only the numbers</span>
  </p>
</div>
```

```js
// React: format in onChange, check in onBlur.
const [cpf, setCpf] = useState('');
<input value={cpf} onChange={(e) => setCpf(Aipim.br.format('cpf', e.target.value))}
  onBlur={() => setError(Aipim.br.check('cpf', cpf))} />
```

## Do and don't

- Do: the helper text says the format, and the mask shows how much is left.
- Don't: a placeholder with the mask as the only hint, gone at the first digit.
