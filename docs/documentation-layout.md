# Documentation layout of the Figma file

The rules behind the documentation pages of the Aipim Figma file, for whoever builds or fixes one. The pages themselves are the reference: the Button section on the Átomos page for a component, Cor for a foundation, Comece aqui for a guide. This file keeps only what a page cannot show, the rules and why they exist. Before a change, read [figma-sync-log.md](figma-sync-log.md), and log the pass there after it.

The file is in Brazilian Portuguese. Pages, rows and texts are in Portuguese; component, variant, property and variable names stay in English, because they are the names in the code.

## Every page

- One frame, **1640px wide**, with auto layout in one column: the Masthead, the content, the Prev next bar and the footer. Each frame sits in a section named after it, and the section grows with the frame so nothing is cut off.
- The **Masthead and the footer are dark** through the Dark mode of the Semantic collection set on them, so there are no dark colors to maintain.
- **Only variables**, in light and dark: color, space, radius and text styles. No loose values. The one exception is the Masthead title at 150px, a size used nowhere else.
- **No paragraph is wider than 732px** (six columns of the grid). The parts of the kit enforce it; text written on a page outside a part gets the same maximum width.
- **The gap between cards is 32px**, across and down, and also between tiles of artwork. Open columns without a box keep 48px.
- The family of a page sets the color of its Masthead ribbon: Urucum for Começo, Azulejo for Fundamentos, Folha for Componentes and Biblioteca, Tinta for Arquivo.

## A component page

Nine rows, always in this order. A row that does not apply is left out, never left empty.

| Row | What goes in it |
|---|---|
| Visão geral (Overview) | When to use and when not to use, in two columns, with the one-line description under the title |
| Variantes (Variants) | The styles, sizes and options, each on a stage |
| Estados (States) | Default, hover, focus, disabled and the others. For behavior over time (toast, modal), the description of that behavior |
| Faça e não faça (Do and don't) | One right and one wrong example with a caption each; the wrong stage is tinted with `error/bg` |
| Decisão (Decision, optional) | Only when a choice needs explaining, such as why the label of the Text field sits above it |
| Anatomia (Anatomy) | A light and a dark drawing with numbered markers, and the table of parts |
| Medidas (Measurements) | Drawings with the dimensions, then the tables of values and tokens |
| Cor (Color) | Every color the component uses, with its value in both themes |
| Teclado e ARIA (Keyboard and ARIA) | The key or part, and what happens or what to do |
| Código e especificação (Code and specification) | Links to the Markdown spec, the web code and the example |

Every row has the same shape: a 1px line on top, 80px of padding above and below, the name in a 472px column on the left and the content in the 992px column on the right. The text comes from the spec in `docs/pt-br/components/`. When the spec changes, the page changes with it, and `figma-sync-log.md` says how to check that the color and measurement tables still match.

## Stages and drawings

- A stage is the box a component sits in: `bg/surface`, a 1px `border/subtle` line, `radius/lg`, 80px of padding above and below and the content centered both ways. The dark stage is the same stage with the Dark mode on it.
- Stages side by side share the height of the tallest one. Two that do not fit side by side stack, each at the full width.
- A stage holds **real instances** from the Library, never a drawing of the component, so it changes when the component changes.
- An anatomy or measurement drawing lives in one auto layout frame named "Component with annotations" that hugs the instance. The markers, outlines, padding areas and dimension lines are its children with absolute position, placed against the component, so the drawing never drifts when the stage changes width.
- A marker line meets the middle of its part. A dotted outline around a text fits the text, 3px out on each side. A measurement label sits in the middle of its line. The number of a marker is the row of the parts table.
- Dimensions use the error colors, so they stand out from the component.

## Tables, cards and links

- A table is a rounded card with a header on `bg/surface` and a line between rows. Split it before it gets crowded: Cor has one table per variant, and Medidas groups size and spacing, shape and type, and touch targets.
- **Cards sit two across.** Three across only for small items (a number, or an icon with a short title). When a row would need three, spread it over four, fold the two shortest into one card with two sections, or put the third on the next line at the same width, aligned to the left. Never stretch a card across a row to fill it.
- A link starts with an icon that says where it goes, never with an arrow character: Figma for another page of the file, GitHub for the repository, npm, Claude, MCP server, Storybook, and External link for any other site. A link to something that does not exist yet says "(em breve)" after the label.

## The documentation kit

The parts of a page are components on the page **Kit de documentação**, in the BIBLIOTECA group (the Library). A page is assembled from them, so a change in one part reaches every page.

| Part | What it is |
|---|---|
| Masthead | The dark top of a page: wordmark, overline, the title in Antonio, four metadata pairs, two link chips (Tag in the Link style) and the petals ribbon, whose Color property is the family |
| Opening | The first band of a guide or foundation page: Eyebrow, title, lead, two Buttons, three Tags, an "Ir para" card of Link rows, and four Cards in the four tones for the numbers |
| Band header | The left column of a band: Eyebrow, title and lead |
| Eyebrow | The florão before an overline |
| Step | A numbered step, with an optional link, code block and "Pronto quando" alert |
| Link row, Link row soon | An icon, a link and one line; the "soon" one has no link and ends in "(em breve)" |
| Code block | A command or a prompt on a dark block |
| Stat, Meta pair | A number with its label, and a label above a value |
| Prev next | The end of a page, following the reading order of the sidebar |

A guide or foundation page is the Masthead, the Opening, then bands that alternate `bg/surface` and `bg/canvas`, each with a Band header on the left and the content on the right. Sobre o Aipim and Identidade da marca may break that frame, because most of their content is artwork.

## The page list

- A group is a page named in capitals (`COMEÇO`, `FUNDAMENTOS`, `COMPONENTES`, `BIBLIOTECA`, `ARQUIVO`), with a `---` divider between groups and a group cover made from the kit.
- A page starts with one emoji and is indented with spaces, four per level. The component pages sit under `Visão geral dos componentes`, in Átomos, Moléculas and Organismos, the same groups as the Storybook sidebar and the `group:` of each spec.
- Names use "e", never "&".
- The BIBLIOTECA group (Componentes, Kit de documentação and Masters da marca) is outside the reading order, and the Prev next bars skip it.
- The roadmap, the credits and the changelog are not Figma pages: they live in `ROADMAP.md`, in a band of Sobre o Aipim and in `CHANGELOG.md`. A copy in Figma went out of date the first time nobody updated it by hand.

## Making a new component page

1. Duplicate the Button section, then set the Masthead (title, overline, the Grupo fact and the two links) and the Prev next bar.
2. Write the rows from the spec in `docs/pt-br/components/`, and remove a row that does not apply.
3. Build the stages with instances from the Library, and each drawing in its "Component with annotations" frame.
4. Check light and dark, that no stage or section cuts its content, and that the markers match the parts table.
5. Add an entry to `figma-sync-log.md`.

Two things that go wrong in Figma:

- A stroke bound to a variable also needs a real color as its fallback, or it renders in that fallback color.
- A frame copied from a row into a column keeps a fixed height unless it is set to hug its content, and the next block overlaps it.
