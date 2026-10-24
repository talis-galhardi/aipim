# Figma sync log

How far the Figma file is from the repository, and what each check found. Read it before you touch the Figma file. Add an entry after every pass.

Figma file: `figma.com/design/iVcCVMsFIyb73AChmjlytU` (the Community copy is published from it). The rules for building a page are in [documentation-layout.md](documentation-layout.md).

## What the file has to match

The repository is the source. Figma follows it, never the other way around.

| In Figma | Source in the repository | How to check |
|---|---|---|
| Variables (Primitives, Semantic in Light and Dark, Space and shape) | `tokens/build/figma.json`, generated from `tokens/tokens.json` | Read every variable with the Plugin API and compare names and values. Pattern palette has no source in the repository. |
| Color and measurement tables of each component page | `docs/en/components/*.md`, sections "Tokens used" | Compare token and hex for color rows, token and numbers for measurements. Rows about the focus ring live in the prose of the spec, not in a table. |
| Anatomy and measurement drawings | The component itself | Each marker line meets the middle of its part, each text outline fits its glyphs, each measurement line is as long as its label and ends on an edge of the component. |
| Numbers and claims on the docs pages (components, icons, checks, versions, dates) | `README.md`, `ROADMAP.md`, `CHANGELOG.md`, `icons/icons.json` | Search the text for numbers, "tema", "em breve", "v1.1" and dates, and compare. |
| Links | GitHub, npm, Storybook | No link may point to a deleted page or through a redirect. |

What Figma has and the repository does not, on purpose: the brand masters (patterns, ornament, symbol, lockup), the documentation kit, and the drafts. The six Brazilian icons drawn in Figma (christ-the-redeemer, chinelos, toucan, pandeiro, football, brazil-map) are not in `icons/` yet; they belong to v1.1.

## Passes

Most recent first. Each entry says the commit, what changed in Figma and what is still known to be different.

### 2026-10-24 · Date picker

Repository: the branch `date-picker`.

Changed in Figma:

- Componentes: a section Date picker after Combobox, with three parts. Date picker day (`1411:1431`) has Default, Hover, Focus, Today, Chosen and Disabled, 40px and round, bound to `size/control-md` and `radius/full`; Today has a 1px `border/strong` ring and bold, Chosen is filled with `action/primary/bg`, Disabled is `text/muted` and struck through. Date picker calendar (`1411:1432`) is the open calendar on November 2026 with the limits of the gallery (1 disabled, 20 chosen): two 40px Icon buttons, the month, the week days in `body-sm` bold and five weeks of days, 298px wide, with `bg/surface`, `border/subtle`, `radius/md`, `space/8` and the overlay effect style. Date picker (`1411:24667`) is a clone of the 22 Combobox variants with the chevron replaced by a 32px Icon button with the calendar icon (`text/secondary`, the Disabled button on disabled fields), the Field gap and end padding bound to `space/4` (Medium) and `space/8` (Large), and, in State Open, the calendar 4px under the field in place of the list. A Weekday text layer (text property Weekday, "Sexta-feira, 20 de novembro") sits in the Helper, which wraps, so it takes a line of its own; it shows only in the Filled variants that are not Error, as the script shows it only for a valid date inside the limits. It is its own layer because texts bound to the same property (Helper text) keep in step across variants.
- Moléculas: the page Date picker (`1414:2694`), after Combobox, made from a copy of the Combobox page and written from `docs/pt-br/components/datepicker.md`. The Estados row adds a group Dia do calendário with the six day states. The Prev next bars now run Combobox, Date picker, Alert, and the sections after it moved right.

Still different, on purpose:

- The text of the Disabled day has no Day property: Figma carries a text decoration with the property to every variant, so the strikethrough only stays when the text stands alone. Override its text directly.
- No Anatomia row, as on Select and Combobox: the field, label and helper are the Text field's.

Still different, to fix:

- The overview pages still say 17 components while the repository has 21 (see the Select and Combobox entry).

### 2026-10-24 · Select and Combobox

Repository: the branch `select-combobox`.

Changed in Figma:

- Componentes: a section Select with the component set Select (`1400:2751`), and a section Combobox with the sets Combobox option (`1401:1388`) and Combobox (`1401:1621`), after Brazilian field. Select and Combobox are clones of the 20 Text field variants (Size by State by Content), so every binding stays the Text field's, with a Chevron instance (`size/icon-md`, `text/secondary`) at the end of the Field and the Field gap bound to its own inset. Their text properties (Label, Value, Helper text, Show helper) were made again on each set. Combobox names its contents Empty and Filled, as it has no placeholder, and adds State Open in Medium and Large: the chevron points up and an absolute Popup (`bg/surface`, `border/subtle`, `radius/md`, the Aipim/elevation/overlay style) sits 4px under the field, over the helper text, as in the code. Combobox option has Default, Hover and Active; Active has `bg/sunken` and a 3px `action/primary/bg` bar.
- Moléculas: the pages Select (`1404:2346`) and Combobox (`1405:2506`), after Brazilian field, made from a copy of the Text field page with its instances swapped and written from `docs/pt-br/components/select.md` and `combobox.md`. The Masthead says Beta and 1.1 (em breve). The Estados row of Combobox has an Aberto specimen. The Prev next bars now run Brazilian field, Select, Combobox, Alert, and the sections after them moved right.

Still different, on purpose:

- No Anatomia row on either page, and Medidas and Cor keep only the tables of what each component adds: the field, label and helper are the Text field's, and the specs say so.

Still different, to fix:

- The overview pages say 17 components (Visão geral dos componentes and Comece aqui, six texts) while the repository has 20 with the three in beta. This was already so after the Brazilian field pass.

### 2026-10-24 · Brazilian field

Repository: the branch `brazilian-fields`.

Changed in Figma:

- Componentes: a component set Brazilian field (`1382:1470`), in its own section after Badge. Format (CPF, CNPJ, CEP, Phone, Date, Money) by Example (Empty, Filled, Error), 17 variants: Money has no Error, as in the code. Each variant is an exposed instance of Text field with the label, the mask, the value and the helper text of its format, so size and state stay those of the Text field.
- Moléculas: a page Brazilian field (`1387:2152`), between Text field and Alert, made from a copy of the Text field page and written from `docs/pt-br/components/brazilian-field.md`. Rows: Visão geral, Variantes (the six formats), Estados (empty, typing without an error, valid, incomplete, invalid), Faça e não faça, three Decisão rows (the mask while typing, the CNPJ with letters, a typed date), Teclado e ARIA, Código e especificação. The Masthead says Beta and version 1.1 (em breve), and its spec link goes to `brazilian-field.md`. The Prev next bars of Text field and Alert now go through Brazilian field.

Still different, on purpose:

- No Anatomia, Medidas or Cor rows: they are the Text field's, and the Variantes heading says so.

### 2026-10-18 · example themes with their own fonts

Repository: `b6da3d2` on main.

Changed in Figma:

- Sua marca no Aipim, band "Três temas de exemplo" (the layout Talis rearranged): each theme sets its own fonts in its
  two example screens, Antonio becoming the heading font and Karla the body font. Jabuticaba uses Fraunces and Nunito,
  Maresia Bricolage Grotesque and DM Sans, Grafite IBM Plex Mono and IBM Plex Sans. Each theme has a tag with its pair,
  and the band says that fonts are outside the theme builder: two CSS variables in code (every component reads only
  `--aipim-font-heading` and `--aipim-font-body`), the text styles in Figma.
- Tutoriais, developer sheet, step 5: the same sentence as `tools/tutorials_content_pt.py`, on using the brand's fonts
  through those two variables.

Still different, on purpose:

- The fonts of the six example screens are overrides on the instances, not text styles, so they do not follow a
  change to the Aipim text styles. They are examples of another brand.

### 2026-10-18 · sweep after the repository started writing each fact once

Repository: the branch `storybook-trim` (PR #18).

Checked every page for links into the repository, links to nodes that no longer exist, and numbers and versions against the repository: the 17 components, 64 icons and 84 contrast checks agree everywhere.

Changed in Figma:

- Kit de documentação: the Masthead linked `docs/en/documentation-layout.md`, which moved to `docs/documentation-layout.md`.
- Tutoriais: the sheets named v1.1 and v1.5 where the tutorials now say "no roadmap" and link to ROADMAP.md (the starters, the Claude skill, the flow patterns, the band "O que vem a seguir" and the native components card), and the frontmatter list of a spec has `group`, `wcag` and `related`.
- Ícones e ilustrações: the "Crédito e licença" link of the Ilustrações opening went to a layer that no longer exists. It goes to the References and credit band.
- Espaço e layout: said a compact density mode was a candidate for v1.5, which ROADMAP.md does not list. It says it is an idea for later.

Still different, on purpose:

- Sua marca no Aipim and Ilustrações say that following the theme colors is planned for v1.1, as ROADMAP.md does (R10).
- Rascunhos is a draft page and was not checked.

### 2026-10-17 · full review after Talis aligned the component drawings

Repository: `e067247` on main, plus the branch `figma-file-cleanup`.

Checked and found equal: the 141 variables, and the color and measurement tables of the 17 components.

Changed in Figma:

- Anatomy: markers were off the middle of their part in Button, Checkbox, Radio and Switch (4.5px), Link (13.5px), Text field (1.5 to 3px), Alert and Toast (5 to 13px) and Top bar (7px), in light and in dark. The outlines of "Título" in Alert and Top bar and of the label and helper of the Text field were narrower than the text.
- Measurements: on every component page, the labels sat 1.5px off the middle of their line.
- Card: the focus ring was invisible, because the card clips its content. The focus variants no longer clip, and the media takes `radius/xl` on its top corners. With media, the body now starts 24px below it, as in `card.css`, so the card is 329px tall like its spec.
- Sections: 33 sections were shorter than their page and cut off the footer, by up to 2177px (Ilustrações).
- Text: Comece aqui and Sobre said 63 icons (there are 64). Sobre dated v1.0 on 12 October (the tag is from 13 October). Ilustrações said the scenes follow the theme colors and pointed to the old page "Padrões e telas". A reference link went through a Google search URL.

Still different, on purpose:

- The six Brazilian icons exist only in Figma (see above).
- The references of Ilustrações cite chapters and pages that were not checked against the books.
