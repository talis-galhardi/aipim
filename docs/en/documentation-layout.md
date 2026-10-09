# Documentation layout

How a component page is built in the Aipim Figma file, so every page reads the same way and a new one can be made without guessing. The reference is the Button page on the Atoms page of the file; the other component pages follow it.

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

## Cards

Cards sit **two across**. Three across is for small information only: numbers, or an icon with a title of one or two words and a short description (the component catalog, the flow patterns, the example themes, the credits).

When a row would need three cards:

1. **Spread it over four** (two by two) when the information can be split without inventing anything: six cards in two rows of three become three rows of two.
2. **Fold two into one** when two cards belong together: one card with two sections, a thin line between them, each section keeping its own small label and title. Pick the two shortest, so the card next to it does not end up with a lot of empty space.
3. **If neither works**, put two on the first line and the third on the next line, **at the same width as the others**, aligned to the left. Never stretch the third one across the full row.

Cards that share a line share its height. Four across is always two by two, and one card alone in a row may take the full width.

## Links

A link on a documentation page starts with an icon, never with an arrow character. The icon says where the link goes:

| Goes to | Icon |
|---|---|
| Another page of the Figma file | Figma |
| A file or folder of the repository, or the repository | GitHub |
| The npm package | npm |
| A Claude skill | Claude |
| An MCP server | MCP server |
| Any other site (the Storybook, for example) | External link |

- The icon takes the color of the link text and sits at the start of the line (20px next to body text, 16px in the small buttons of the masthead). It replaces the "→" and "←" that used to come before the label, and the circle that marked a list of files.
- The icons come from Hugeicons Free (MIT), the same set as the Aipim icons, with the same 24px grid and 1.5px stroke. All six are in the icon catalog (External link in Navigation, the five platform logos in their own group, Platforms).
- A link that does not exist yet keeps its icon and says "(coming soon)" after the label.
- A range in a spec ("48 → 72px") is not a link and is written as it is.

## Foundation pages

The foundation pages (Color, Typography, Space, Layout, Shape, Elevation, Motion, Touch & focus, Icons, Illustrations, Patterns) use the same frame: the dark masthead (group: Foundations), rows with the title on the left and the content on the right, and the dark footer. They differ from a component page in the rows:

- The first row is always Overview, with the one-line lead of the page.
- After it comes one row per topic (for Color: How color works, Primitives, Semantic, In context, Color accessibility). The old blocks (tables, swatch ramps, token rows, cards) sit on the right, fitted to the 992px column.
- A page that grows past about 6,000px is split (the old Space, shape and motion page became six: Space, Layout, Shape, Elevation, Motion, Touch & focus).
- In the Figma file the pages are grouped in pairs, like the components: **Space & layout**, **Shape & elevation**, **Motion & touch** and **Icons & illustrations** (which also holds **Patterns**, as a third page frame) are one Figma page each with two or three page frames side by side and no header block of their own: the masthead of each page frame is the header. Color and Typography have a Figma page of their own.
- Cards follow the rule in "Cards" below.
- The overline of each row is the name of the page.

## Guide pages

The guide pages (Start here, About Aipim, Tutorials, Components overview, Patterns & screens, Themes & customization, Roadmap & requirements, Credits & licenses, Changelog) use the same frame as the others: the dark masthead, rows with the title on the left and the content on the right, the dark footer. They differ in a few things:

- The masthead keeps the facts of the old page header (for example Status, Source of truth, Version, Owner) in the four slots, and the **link pills** (the file map, the files outside Figma) sit under them, still on the dark masthead.
- The lead sentence of the page is the first row, Overview.
- The masthead shows a **short name** when the page name is too long for the 270px title on one line: Components, Patterns, Themes, Developers, Roadmap and Credits. The Figma page keeps its full name in the page list.
- Cards follow the rule in "Cards" below. The phone screens of Patterns wrap two per line.
- Links that point to another guide page point to its section, so they keep working when a page is rebuilt.
- **Start here** is built from the documentation kit, on the same grid as the other pages: the Masthead (family Start, ribbon in urucum), then bands with the **Band header** (eyebrow, title and lead) in the 472px column and the content in the 992px column, with no line between bands: the bands alternate `bg/surface` and `bg/canvas` (the first band is always the lightest, `bg/surface`), because the florão in the Eyebrow already marks where a band starts. On a surface band the group cards and the status legend use `bg/canvas`, and on a canvas band they use `bg/surface`, so they stay visible; the Cards keep their own surface and are told apart by their border. The first band is three **Steps** (a Badge with the number, a title, a text and a link). The map groups the pages by what the reader wants to do, not by how the file is built: a group is a surface card with a Badge as an icon chip, an overline, a title and **Link rows** (the Figma icon, the page name as a Link and one line that says what is there; a page is never listed twice), two groups across and the group with the most links full width. The files outside Figma use the same groups, with the GitHub, npm and external-link icons, and a **Link row soon** for what does not exist yet. The reading notes are Cards (Surface tone), and the status legend is a surface card with Tags. It ends with the Prev next bar (only Next, because it is the first page) and the dark footer.
- **About Aipim** is a landing page and has no masthead: a hero in urucum with the cacos pattern, the numbers, for whom, what is inside, why it exists, the six principles, the name, how it was born, Made in Brazil, open and free, take part, and where to start, ending in the dark footer. Bands alternate the two surface colors and use the tint colors for the cards that matter.
- **Tutorials** is one Figma page with three sheets side by side, one for each audience: Designers, Developers and AI. Each sheet is built from the documentation kit: the Masthead (the audience is the title; two Tag Link chips, the file map and the tutorial in Markdown), then bands that alternate `bg/surface` (the first) and `bg/canvas`, each with a Band header in the 472px column and the content in the 992px column. The bands are: choose the tutorial (three Cards, the current one in the Primary tone and marked "You are here", the others interactive and linking to their sheet); where this fits (the six stages as Cards, the ones this tutorial covers in the Primary tone, and for the designers an Alert for the stakeholder); the tutorial itself, with the lead, a Card for what you need and a Primary Card for what you will have in the left column, and in the right column the six Steps (a Badge with the number, a title, a text, a Code block when there is a command or a prompt, and the Success Alert "Done when") closed by a Success Card for the final check; the reference bands of the Developers and AI sheets (Cards two across, an odd card left aligned at the same width); and, for Designers and Developers, "Keep these close" (a table of the same names in Figma and in code, and the order to ask for something new). Each sheet ends with the Prev next bar (Brand identity before the first, Color after the last) and the dark footer. Each sheet is built from one Markdown file in `docs/en/` (`tutorials-designers.md`, `tutorials-developers.md` and `tutorials-ai.md`), written once in `tools/tutorials_content.py`.

## The documentation kit

The parts of a documentation page are components in the Library page of the Figma file, in the section **Documentation kit**, made from instances of the atoms. A page is assembled from them, so one change reaches every page.

| Part | What it is | Made from |
|---|---|---|
| **Masthead** | The dark top of a page: wordmark, overline, title in Antonio (150px, uppercase), four metadata pairs and two links, then the petals ribbon. It is one component: the ribbon is an exposed Pattern (Petals), and its Color property sets the color of the family: Urucum for Start, Azulejo for Foundations, Folha for Components, Cajá for Patterns and Customization, Tinta for Project. The frame uses the Dark mode of the Semantic collection. | Wordmark, Pattern, Meta pair, Tag (Link) |
| **Meta pair** | A small label above a value, such as Status and Stable. | `Aipim/overline`, `Aipim/label` |
| **Eyebrow** | The florão before an overline in urucum. | Ornament (Small, Terracotta) |
| **Band header** | The left column of a band, 472px: eyebrow, title (`Aipim/h2`) and lead (`Aipim/body-lg`). | Eyebrow |
| **Step** | A number, a title and a text, with an optional link (Show link) and an optional "Done when" line (Show alert). | Badge, Link, Alert (Success) |
| **Prev next** | The end of a sheet: Previous on the left (Outline) and Next on the right (Primary), each with an arrow icon. | Button |
| **Code block** | A command, a snippet or a prompt on a dark block (the Dark mode of the Semantic collection), with a small label above. Used inside a Step (Show code). | Aipim/label |
| **Link row** | An icon, a Link and a one-line description. The icon says where the link goes (see Links above). | Icon, Link |
| **Link row soon** | The same for something that does not exist yet: a muted label that ends in "(coming soon)", no link. | Icon |

- The chips of the masthead are the Tag in the Link style (they navigate). The Tag in the Inverse style is for a chip that does not navigate on a dark or colored surface.
- A card with a list ("You need", "You will have") is the Card, static, in the Surface tone. A card that matters uses a tone.
- The masthead title is the one text in the kit without a text style: no style exists for 150px, and the masthead is the only place that size is used.
- Pages built before the kit still have hand-made versions of these parts and move to the kit one page at a time.

## The page list in Figma

The page list reads like an indented outline:

- A category is a page named in capitals (`FOUNDATIONS`, `COMPONENTS`). A page named `---` between categories is a Figma divider.
- A page starts with one emoji for its subject and is indented with spaces, four per level (the way code is indented). The documentation pages of the components sit one level under `Components overview`, grouped by atomic design the same way as the Storybook sidebar: `Atoms` (button, icon button, link, badge, tag, checkbox, radio, switch), `Molecules` (text field, alert, toast, tabs, card, empty state) and `Organisms` (top bar, tab bar, modal), each page holding one section per component, and `About Aipim`, `Brand identity` and `Tutorials` sit under `Start here`.
- Each category page holds one **category cover**, in the same family as the Figma Community cover: a frame of 1600 by 900px, the same size on every category, with one of the brand patterns across the whole frame and a cream panel on top (960px wide, 48px corners, a 3px ink line and a dark urucum copy of the panel offset by 16px). The panel holds the wordmark and a "Page group" pill at the top, the category name in Antonio at one size on every cover (132px, uppercase) with a one-sentence description, the pages of the group as outlined pills that link to them, and at the bottom a dark "File map" pill with the Figma icon that takes the reader to the file map, and the florão. The pills carry only the page name: what each page holds is said in the file map of Start here. The covers use the `Pattern palette` variables, so the colors follow the pattern and no loose color is used. Each category has its own pattern, and the pairs are fixed: Start the cacos, Foundations the hydraulic tile, Components the cobogó, Patterns the cacos in the Traditional palette, Customization the hydraulic tile in the Traditional palette, Project the cobogó in the Traditional palette and Archive the petals.
- Names use `&`, not "and" (`Space & layout`, `Shape & elevation`, `Motion & touch`).

## In Storybook

The Storybook docs pages follow the same layout, made with CSS only (`.storybook/preview.css`): the component name in a dark masthead, then each heading of the spec on the left (up to 472px) with its content on the right, tables as cards and story previews as stages. On narrow screens the rows become one column. Each component page opens with its most recognizable variation (the "Default" story: one button, one field, one card, a little larger, and also the first thumbnail in Chromatic), then "All states" and the rest below the spec. The page continues with a line of facts from the spec (status, group, HTML element, WCAG criteria, related components), then the spec rows. The "Do and don't" story draws the right and the wrong example with the real components; its captions come from the spec. The foundations, the guides and the introduction use the same masthead and rows. The foundations show each token next to a preview made with the real CSS variable (a bar for a space, a box with the radius, a card with the shadow, a dot that moves with the duration), and the colors as swatches; the tables and the swatches are read from `docs/en/*.md` and `tokens/tokens.json` by `stories/_foundations.js`, so they cannot drift. The sidebar follows atomic design: Foundations, Atoms, Molecules, Organisms, Guides. Every story is centered on a full-window stage, so the Chromatic snapshots read as thumbnails, and is captured in light and dark. The look follows the light and dark toolbar because it uses only semantic tokens.

## Making a new component page

1. Duplicate the Button page and rename the masthead (name, group, owner).
2. Write the nine rows from the component spec. Remove a row that does not apply.
3. Build the stages with real instances of the component from the Library page, never drawings of it.
4. Put each drawing in its "Component with annotations" frame and check that the numbers match the parts table.
5. Check light and dark, and that no stage clips its content.

Two things that go wrong in Figma and are worth knowing:

- A stroke bound to a variable also needs a real color as its fallback. A stroke created with a black fallback renders black even though the variable is `border/subtle`.
- A frame copied from a horizontal row into a column keeps a fixed height unless it is set to hug its content. Set it, or the next block will overlap it.
