# Documentation layout

How a component page is built in the Aipim Figma file, so every page reads the same way and a new one can be made without guessing. The reference is the Button page on the Actions page of the file; the other component pages follow it.

## The page

- One frame, **1640px wide**, with auto layout in a single column: masthead, nine rows, footer.
- The **masthead and the footer are dark**. They use the normal semantic variables, with the Dark mode of the Semantic collection set on the frame, so there are no dark colors to maintain.
- Everything else uses the semantic variables only (light and dark). No loose values.
- Each component is one section of the file page, named after the component. Sections sit side by side with 96px between them.

## The masthead

- A small overline on the left (`Components · <group>`) and `Aipim design system` on the right.
- The component name in Antonio, uppercase, 270px, on one line, the same size on every page. 270px is the largest size at which the longest name ("Touch & focus") fits the 1512px width. It is the one loud thing on the page. If a longer name ever appears, lower the size on every page, not on that page only.
- Under it, four facts: Status, Version, Group and Owner.

## The rows

Nine rows, always in this order, plus one optional row (Decision). A row that does not apply is left out, never left empty.

| Row | What goes in it |
|---|---|
| Overview | When to use and when not to use, in two columns. The one-line description of the component sits under the title. |
| Variants | The styles, sizes and options, each on a stage. A short bullet list under the title says what varies. |
| States | Default, hover, focus, disabled and the others, on stages. For a component with behavior over time (toast, modal), the row is the description of that behavior. |
| Do and don't | One do and one don't, each with its caption and an icon. The don't stage is tinted with `error/bg`. |
| Decision (optional) | Only when a design choice needs explaining (the Text field explains why its label sits above the field). Sits after Do and don't, with the same title-left, text-right shape. |
| Anatomy | A light and a dark drawing with numbered markers, and the table of parts. |
| Measurements | Drawings with the dimensions, then the tables of values and tokens. |
| Color | Every color the component uses, with its value in both themes. |
| Keyboard and ARIA | Two tables: the key or part on the left, what happens or what to do on the right. |
| Code and specification | A table of Content and Link: the Markdown spec, the web code and the example. |

Every row has the same shape:

- A 1px line on top (`border/strong`), 80px of padding above and below, 64px at the sides.
- The **name on the left, in a 472px column** (overline, then the title in the h3 style). Under the title, a short description in the `body-sm` style (bullets) or, for Overview, a lead sentence.
- The **content on the right**, filling the rest (992px). A 48px gap between the two.

The text comes from the component spec in `docs/en/components/`. If the spec changes, the page changes with it.

## Stages

A stage is the box a component sits in.

- Fill `bg/surface`, a 1px `border/subtle` line, the `radius/lg` corners.
- **80px of padding above and below**, 48px at the sides, and the content **centered both ways**.
- Stages side by side **share the height of the tallest one**: the shorter ones grow, they do not stay small.
- The dark stage is the same stage with the Dark mode set on it.
- If two stages do not fit side by side (a wide alert, a modal), they stack, each one the full width. If one stage still does not fit, its content wraps to the next line.

## Drawings: anatomy and measurements

The markers, dotted outlines, tinted padding areas and dimension lines belong to the component, not to the stage.

- The component and its annotations live in **one auto layout frame** that hugs the component, called "Component with annotations". Its padding leaves room for the annotations.
- The annotations are children of that frame that **ignore the layout** (absolute position) and are placed relative to the component. The stage only centers the frame.
- Because of this, a drawing never drifts when the stage gets wider or narrower.
- Markers are numbered pills; dimensions use the error colors so they stand out from the component. The number of a marker matches the row of the parts table.

## Tables

- A rounded table with a header on `bg/surface` and a 1px line between rows. Text wraps inside the cell.
- **Split a table before it gets crowded.** Color is one table per variant. Measurements are grouped (size and spacing, shape and type, touch targets). Keyboard and ARIA are two tables.
- The columns keep the proportions of the spec; the last one takes the remaining width.

## Foundation pages

The foundation pages (Color, Typography, Space, Layout, Shape, Elevation, Motion, Touch & focus, Icons, Illustrations) use the same frame: the dark masthead (group: Foundations), rows with the title on the left and the content on the right, and the dark footer. They differ from a component page in the rows:

- The first row is always Overview, with the one-line lead of the page.
- After it comes one row per topic (for Color: How color works, Primitives, Semantic, In context, Color accessibility). The old blocks (tables, swatch ramps, token rows, cards) sit on the right, fitted to the 992px column.
- A page that grows past about 6,000px is split (the old Space, shape and motion page became six: Space, Layout, Shape, Elevation, Motion, Touch & focus).
- In the Figma file the pages are grouped in pairs, like the components: **Space & layout**, **Shape & elevation**, **Motion & touch** and **Icons & illustrations** are one Figma page each with two page frames side by side and no header block of their own: the masthead of each page frame is the header. Color and Typography have a Figma page of their own.
- Cards sit two across, never three: a row of three becomes four cards (with extra context) or two (merging cards without dropping information).
- The overline of each row is the name of the page.

## The page list in Figma

The page list reads like an indented outline:

- A category is a page named in capitals (`FOUNDATIONS`, `COMPONENTS`). A page named `---` between categories is a Figma divider.
- A page starts with one emoji for its subject and is indented with spaces, four per level (the way code is indented). The documentation pages of the components sit one level under `Components overview`, and `About Aipim` and `Workflow` sit under `Start here`.
- Each category page holds one **category cover** in the style of the project cover: urucum background, the fiber pattern, the Aipim logo, the category name in Antonio at one size on every cover, and the pages of the group as pills with a short description. A cream pill takes the reader back to the file map.
- Names use `&`, not "and" (`Space & layout`, `Content & overlays`).

## In Storybook

The Storybook docs pages follow the same layout, made with CSS only (`.storybook/preview.css`): the component name in a dark masthead, then each heading of the spec on the left (up to 472px) with its content on the right, tables as cards and story previews as stages. On narrow screens the rows become one column. The foundations, the guides and the introduction use the same masthead and rows. The look follows the light and dark toolbar because it uses only semantic tokens.

## Making a new component page

1. Duplicate the Button page and rename the masthead (name, group, owner).
2. Write the nine rows from the component spec. Remove a row that does not apply.
3. Build the stages with real instances of the component from the Library page, never drawings of it.
4. Put each drawing in its "Component with annotations" frame and check that the numbers match the parts table.
5. Check light and dark, and that no stage clips its content.

Two things that go wrong in Figma and are worth knowing:

- A stroke bound to a variable also needs a real color as its fallback. A stroke created with a black fallback renders black even though the variable is `border/subtle`.
- A frame copied from a horizontal row into a column keeps a fixed height unless it is set to hug its content. Set it, or the next block will overlap it.
