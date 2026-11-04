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

What Figma has and the repository does not, on purpose: the brand masters (patterns, ornament, symbol, lockup), the documentation kit, and the drafts. The six Brazilian icons drawn in Figma (christ-the-redeemer, chinelos, toucan, pandeiro, football, brazil-map) are not in `icons/` yet; they belong to v1.2.

## Passes

Most recent first. Each entry says the commit, what changed in Figma and what is still known to be different.

### 2026-11-03 · The Cobogó in the system, and the Calçadão in the docs

Repository: the branch `maintenance-sweep-2026-10-30`, on top of `a074d24`, uncommitted. Talis decided: the Hydraulic tile is gone and the Calçadão takes its place, the family of patterns goes flat, and the walls with the full palette are brand applications. `docs/en/patterns-and-ornament.md` was rewritten to match the file, and the Calçadão's job and reference come from the Padronagens page.

Changed in Figma:

- Masters da marca: the set of 12 blocks moved here as Cobogó block (`1663:1528`, property Drawing). The drawing `Pattern=Cobogó` (`397:1212`) is now the Barro wall, 10 by 6 tiles of 160px, with one yellow accent. A new drawing, `Pattern=Cobogó Athos` (`1753:2887`), is the Athos wall, used by the new variant `Pattern=Cobogó, Palette=Aipim, Color=Azulejo` (`1753:3068`). The line is 1/24 of the tile (6.67), and the old Athos line of 10 is gone. The scaled uses of the old Cobogó follow by themselves.
- `Pattern=Calçadão` (`1068:2626`) had an opacity of 8% on the master, so a new instance came out almost invisible. It is 100%. The uses that override it stay as they were.
- Padronagens: a new band, "Doze blocos, duas paredes" (`1755:5337`). The texts about the four patterns, the palettes and the Component band follow the doc. Only Cacos has the Traditional variant, and the page now says so.
- Telas de exemplo: a new band, Hero (`1754:2360`), with Composição 1 (`1668:3036`). Its wall is now an instance of Pattern and its title uses `Aipim/display` (it was 96, outside the scale).
- Manual, section 07 Applications: Diagonal (`1668:3078`) and Mosaico (`1668:2994`), at `Aipim/display`.
- Status: Revisão became Beta on Visão geral dos componentes and on the legend of Comece aqui, because no page used it and seven use Beta. There are still five.
- Rascunhos now has the models of the blocks (`1668:3549`), the reference photos (`1668:3348`) and the Athos hero (`1689:4240`), which is a draft.

Checked: the Design tab of a story works with addon-designs 12. On the published Storybook, `atoms-button--default` builds the right embed (`embed.figma.com`, `node-id=52-1202`) and Talis saw it load in a normal browser. A headless browser gets a 403 from CloudFront in that frame, so an automatic check cannot cover this tab.

Still different, to decide or fix:

- The Cacos and the Petals keep the ink line until they are redrawn.
- "Telas de exemplo" and the Padronagens list say nothing about the Hero or the new band in their "Ir para" boxes.
- The pattern palette and the SVG files of the Cobogó are not in the repository yet: ROADMAP.md has them in v1.2.
- The Community page still says "17 components". Take the number out of the title when v1.1 is published.

### 2026-11-03 · Full check against the repository, and Rascunhos cleaned

Repository: the branch `maintenance-sweep-2026-10-30`, at `a074d24`. Nothing changed in the code. A search from the page does not reach text inside instances, so walk `children` by hand: the first scan missed every Masthead and the title of the overview page.

Checked and found equal: the 141 variables and the 15 text styles against `tokens/build/figma.json` (Figma cannot use a dot in a variable name, so `space-role/stack.tight` is `space-role/stack-tight`, and `opacity/*` holds 40 and 50 for 0.4 and 0.5), all the links, and the 24 nodes the stories point to. The inverse tag already sits on a dark surface in the Dark mode, as the spec says. No page cites the old tabs of the Storybook or its theme button.

Changed in Figma:

- Numbers: 17 components became 24 (17 stable and 7 in beta) on Comece aqui, Sobre (with the Community cover drawing), Telas de exemplo and Visão geral dos componentes; 84 contrast checks became 88 on Sobre and Cor.
- Visão geral dos componentes: 9 atoms and 12 molecules. The Moléculas card listed the eight atoms, so it now has the 12 molecules, each linked to its section, and the Átomos card gained Avatar. "Lista de seleção" and "Avatar" left the candidates for v2, because both exist. "O catálogo da v1" is "O catálogo".
- Cor, the contrast table: the two pairs it did not have, Texto invertido and Link visitado em card, so it has the 44 rows of `docs/en/color.md`. Ratios in the two tables of the page use a decimal comma.
- Movimento e toque: the focus ring ratios were old. They are 5,2 and 11,5 on the page, 5,6 and 9,0 on a card.
- Avatar, List item and Accordion: Version 1.2 (em breve) became 1.1 (em breve), as the README and ROADMAP.md say. This closes the question left in the Avatar entry below.
- Text field: the Prev next bar skipped Avatar. Sua marca no Aipim: the link "Temas de exemplo" went to a deleted layer and now goes to the band.
- Date picker: the calendar icon is 20px, from `datepicker.css` (`size/icon-md`), not 24. A nested instance cannot be resized, so the button has 6px of padding and the icon fills it. The Measurements drawings say 20.
- Sections: 12 were not the height of their page. Select, Combobox, Date picker, List item and Accordion cut off their footer by up to 4226px.
- Rascunhos: deleted the sections Section 1 (`1641:1325`), Cobogó · proposta (`1643:1175`), estudos de composição (`1684:2055`), rodada 2 (`1686:2429`) and estudos lapidados (`1689:4013`). Nothing outside the page used them. To get one back, use the version history of the file, from before this date. The page keeps what Talis chose (`1668:3583`: the set of 12 blocks and four compositions), the models of the blocks (`1668:3549`) and the reference photos (`1668:3348`). The LinkedIn covers of the 2026-10-23 entry were already gone.

Still different, to decide or fix:

- The Community page still has "17 components" in its title and address. It changes only when Talis publishes again.
- The Beta status, the labels in English in `docs/pt-br/color.md` and the Pattern component described by the doc were open here and are closed in the entry above. The entry above also has the state of the Figma tab of the stories.

### 2026-11-03 · Modal: when the page behind is locked

Repository: the branch `maintenance-sweep-2026-10-30`, on top of `bdf3418`, uncommitted. `modal.css` now locks the page for `:modal` only, not for any open `dialog`. Changed in Figma:

- On the Modal page, "Abrir e fechar" (`728:15824`): "A página atrás fica inerte e não rola" became two lines, one for a panel opened with `showModal()` and one for a `dialog` drawn open in a page, which is not modal and leaves the page free. It matches the Accessibility section of the spec.
- The Modal section (`5:944`) grew 24px, to 11626, so it still ends where its page ends.

Not checked in this pass, still open: the Figma tab with addon-designs 12, and whether a Figma page cites the Storybook's old tabs or theme button in the toolbar.

### 2026-10-25 · Figma matched to the code: Accordion, List item

Repository: the branch `date-picker`, uncommitted. Changed in Figma, after the review of the code against the file:

- Accordion item (`1434:1907`): the two Disabled variants are gone (6 left, Open by Default, Hover and Focus), because `details` has no disabled state. On its page: the two Disabled specimens of Estados, the Disabled row of the Cor table, and the text of Estados and the Disabled cell of Teclado e ARIA now say there is no such state and why.
- List item (`1434:1849`): the six variants of the None and Value rows in Hover, Focus and Disabled are gone (10 left: the four Default ones, and Chevron and Switch in the other three states). Nothing used them. The page already said a read-only row has no hover and no focus.
- List item, page Teclado e ARIA: the Linha and Switch cells say the name is the row's own content (WCAG 2.5.3) instead of `aria-labelledby` on the title, as the spec does.

Still different, on purpose:

- Accordion, Estados: with three specimens in a row the third (Foco) wraps to a second line, centered.
- The Switch row keeps Hover, Focus and Disabled in Figma. In the code the row has the hover fill and the switch draws its own focus ring and disabled look, so it matches.

### 2026-10-25 · Avatar, List item and Accordion in code

Repository: the branch `date-picker`, uncommitted. The specs, the CSS, the gallery sections, the stories and the browser checks now exist, so the links of the three Figma pages to `docs/en/components/avatar.md`, `list-item.md`, `accordion.md` and their CSS files work. Nothing changed in Figma in this pass.

Written from the Figma pages (decisions, keyboard and ARIA, measures, colors): `avatar.css`, `list-item.css`, `accordion.css`, the specs in English and Portuguese, the gallery sections `h-avatar`, `h-listitem` and `h-accordion`, the stories (linked to the sets `1433:1723`, `1434:1849` and `1434:1907`), the Do and don't drawings and `verify_web.py`. The counts went from 21 to 24 (17 stable, 7 in beta).

Still different, on purpose:

- Avatar group: the code gives the group three modifiers (`--sm`, default, `--lg`) that size the avatars inside and set the overlap, where Figma has one set with the Size property.
- List item: the switch row is a `label`, so the whole row toggles the switch. Figma shows only the track and does not say it.
- The avatar does not clip its initials, so at a 200% root font they grow past the circle instead of being cut off (a check in `verify_web.py` caught the clipping). Figma has no such case.
- Divider of List item and Accordion: in Figma it sits inside the height (69px row, 44px closed item), so the code draws it as a 1px line over the bottom edge and adds no height. The Avatar group has no padding for the ring, as in Figma (110, 136 and 156px wide).
- Overlap of the Avatar group: 8 and 12px are the tokens `space/8` and `space/12` in the CSS; only the 6px of the small group has no token.
- The Version of the three pages says "1.2 (em breve)"; the repository says it only in the README, the CHANGELOG and the ROADMAP. Talis has not confirmed the number.

### 2026-10-25 · Measurement drawings of Date picker and Combobox

Repository: nothing changed. Only the Measurements drawings in Figma, which looked incomplete next to the tables.

Changed in Figma (Moléculas, pages Date picker and Combobox, section Measurements):

- Date picker, Medium and Large: the gap between the typed value and the calendar button (`space/4`, `space/8`), the 32px button and the 24px icon are tinted and measured. The 32 used to float under the helper, away from the button; it now sits in the top row, next to the paddings.
- Date picker, open calendar: width 298, side and bottom padding 8, the 280 inside width, header buttons 40, the 4 between header and grid, week days row 32, bottom padding 8 and the day width 40. The stage grew from 534 to 560px.
- Date picker, new drawing "Dia, ampliado 4×": the Today ring (1) and the focus ring (3), with the 40px diameter, from the real Date picker day variants scaled 4×.
- Combobox, Medium and Large: the gap between value and chevron (12, 16) and the 20px chevron box.
- Combobox, open list: popup width 320, bottom padding 4, the 3px bar under the arrows, and the padding of an option (8 above and below, 12 on the sides). The stage grew from 450 to 484px.

Still different, on purpose:

- The Date picker table says the icon is `size/icon-md` (20), but the layer in the button is a 24px frame with an 18 by 20 glyph. The drawing shows 24. Decide which one is right and fix the other.
- Corner radius (8) is not drawn in any of these drawings; it stays in the tables only.

### 2026-10-25 · Avatar, List item and Accordion (Figma first)

Repository: nothing yet. This pass goes the other way round, on purpose: Talis asked for the design first, so the Figma file is ahead of the repository until the specs, the CSS and the stories of these three components are written to match it. Do not read the differences below as drift to fix in Figma.

Changed in Figma (Componentes, after Date picker):

- Avatar (`1433:1674`): the set Avatar (`1433:1723`), Size (Small 32, Medium 40, Large 48, from `size/control`) by Style (Primary, Secondary, Tertiary, Success as initials on `tint/*`, Icon, Photo, Count), 21 variants, with the text property Initials. Photo is a slot (an image icon on `bg/sunken`): replace the fill with a photo. The set Avatar group (`1433:1751`), three sizes, four avatars with a 3px `bg/surface` ring; the overlap is 6, 8 and 12px, hard-coded because a negative spacing cannot be bound to a variable.
- List item (`1434:1692`): the set List item (`1434:1849`), Trailing (None, Chevron, Value, Switch) by State (Default, Hover, Focus, Disabled), 16 variants, with the properties Title, Description, Value, Show description, Show leading, Divider and Leading (instance swap of an Avatar). The switch shows only its track (label hidden). Padding `space/16` and `space/12`, minimum height `size/touch-comfortable` (44).
- Accordion (`1434:1850`): the set Accordion item (`1434:1907`), Open (Closed, Open) by State (Default, Hover, Focus, Disabled), 8 variants, with Title, Content and Divider. The chevron points up when open.

- Átomos: the page Avatar (`1439:3116`), after Badge. Moléculas: the pages List item (`1439:4399`) and Accordion (`1439:5629`), after Date picker; Alert and the sections after it moved right. All three are copies of the Date picker page, written in Portuguese: Visão geral, Variantes, Estados (not on Avatar: it only shows), Faça e não faça, two Decisão rows, Medidas, Cor (hex read from the variables in Light and Dark, swatches bound), Teclado e ARIA and Código e especificação. The Prev next bars now run Badge, Avatar, Text field on Átomos, and Date picker, List item, Accordion, Alert on Moléculas. The links to `docs/en/components/avatar.md`, `list-item.md`, `accordion.md` and their CSS point to files that do not exist yet.

- The three pages also have the Anatomia row (numbered parts in Light and Dark, with the table of parts) and, inside Medidas, the pixel drawings (Avatar 32, 40, 48 and the group overlap of 8; List item with and without leading and description; Accordion closed and open). The drawings use the Measure area overlays and the pink dimension style of the Button page (the Badge style, with black numbers, only fits a circle with no padding); the numbers are read from the boxes of the components, not typed. While drawing them, two real defects of the components showed up and were fixed: the Avatar group variants were 100px high (now hug: 32, 40, 48) and the List item variants were fixed at 64px. A List item with title and description is 69px high (45 of text plus 12 and 12), and 48px without leading and description; the table of measures says so.

- The pages Select, Combobox and Date picker (made earlier from the Text field page, without them) now have the Anatomia row and the Medidas drawings too, copied from the Text field: Médio and Grande with the Measure area overlays, plus "Lista aberta" (Combobox) and "Calendário aberto" (Date picker). The anatomy of the two open ones is drawn with the popup open, and the drawing frame takes the popup into account. The Avatar group measure shows the 3px white ring (an outside stroke, so it is not part of the 8px overlap) as its own area.

Still to do for these three: the spec in English and Portuguese, the CSS, the script (accordion needs none: it is `details`), the stories and the browser checks. The pages say what the code has to do (decisions, keyboard, ARIA, measures): write the specs from them and fix whichever side turns out wrong.

Still different, on purpose:

- The Count style does not use the Initials property: its text ("+3") is its own, so it can be edited on the instance.

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

- (Done on 2026-10-25: the Anatomia rows and the Medidas drawings of Select and Combobox, see the entry above.) Medidas and Cor keep only the tables of what each component adds: the field, label and helper are the Text field's, and the specs say so.

Still different, to fix:

- The overview pages say 17 components (Visão geral dos componentes and Comece aqui, six texts) while the repository has 20 with the three in beta. This was already so after the Brazilian field pass.

### 2026-10-24 · Brazilian field

Repository: the branch `brazilian-fields`.

Changed in Figma:

- Componentes: a component set Brazilian field (`1382:1470`), in its own section after Badge. Format (CPF, CNPJ, CEP, Phone, Date, Money) by Example (Empty, Filled, Error), 17 variants: Money has no Error, as in the code. Each variant is an exposed instance of Text field with the label, the mask, the value and the helper text of its format, so size and state stay those of the Text field.
- Moléculas: a page Brazilian field (`1387:2152`), between Text field and Alert, made from a copy of the Text field page and written from `docs/pt-br/components/brazilian-field.md`. Rows: Visão geral, Variantes (the six formats), Estados (empty, typing without an error, valid, incomplete, invalid), Faça e não faça, three Decisão rows (the mask while typing, the CNPJ with letters, a typed date), Teclado e ARIA, Código e especificação. The Masthead says Beta and version 1.1 (em breve), and its spec link goes to `brazilian-field.md`. The Prev next bars of Text field and Alert now go through Brazilian field.

Still different, on purpose:

- No Anatomia, Medidas or Cor rows: they are the Text field's, and the Variantes heading says so.

### 2026-10-23 · LinkedIn cover drafts

Repository: `e9ffdb4` on main, no repository change.

Changed in Figma:

- Rascunhos: a Section "Capas do LinkedIn (1584×396)" with three 1584×396 frames, A Azulejo, B Cacos and C Ilustrações, built from the brand masters (patterns, lockup, wordmark, illustrations), the Aipim text styles and the Primitives variables. Each frame has hidden guides for the 1350×220 safe area and the profile photo zone, and a PNG 1x export setting.

Still different, on purpose:

- The drafts are not part of the documentation and were not checked against the repository. The copy on them ("17 componentes e 64 ícones") has to follow the numbers in README.md if they change.

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
