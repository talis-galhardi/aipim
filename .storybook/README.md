# The Storybook of Aipim

The Storybook is Aipim's documentation site. Its structure is changed **only through Storybook's own APIs**: the theme,
the sidebar filter, a toolbar tool, the docs page template and the MDX blocks. The menu, the toolbar and the phone layout
are Storybook's own, as they ship, and nothing here touches them.

This was a choice. An earlier version restyled the menu (bigger arrows, a sliding animation, a drawer on a phone) by
reaching into Storybook's markup. It worked, but it was a contract with one version of Storybook. If the docs ever need
that much control, the way is a documentation site of our own, with Storybook kept as the workshop of the components.
For the same reason, these stay out: search over tokens and props, a bar above the menu or a redesigned menu, restyling
the Controls table, and a switch that reorders a page for developers or designers.

## What is not an API

Inside a docs page, the look does lean on Storybook's markup. This is the list to read on an upgrade:

| What | Where | If it changes |
|---|---|---|
| Classes in the docs content (`.sbdocs-*`, `.docblock-*`, `.docs-story`, `.sb-*`, and `.token` with the Prism types after it, which recolor the syntax that fails contrast) | `styles/` | `verify_storybook.py` reads them from the stylesheet and fails when one is gone from the pages |
| What is imported from `storybook/internal/components` (the language button) and `storybook/internal/core-events` (the events of the globals and of the address). Storybook does not promise these names | `manager.js`, `preview.js`, `docs-tabs.js` | The build fails, or the language button or the address stops working, which `verify_storybook.py` catches. `check_storybook.py` fails on a new one that is not listed here |
| `componentStories()` and `projectAnnotations` of the docs context, as Storybook's Stories block uses them | `pageStories` in `docs-tabs.js` | A script error or an empty page, which `verify_storybook.py` catches |
| The markup of the boolean switch in the Controls (`label` with a checkbox and two `span`s), whose side not chosen is recolored to pass contrast | `styles/` | Axe fails on the docs pages in `verify_storybook.py` |
| The address read from the window above the iframe, as Storybook's `DocsContainer` does | `topWindow` in `docs-tabs.js` | The address checks of `verify_storybook.py` fail |

`.sb-unstyled` is on the list only as a class: it is what Storybook's `Unstyled` block renders, and the page in one scroll sits inside that block so Storybook's docs typography and its reset of margins do not apply to it.

## What is ours

| What | Where | API |
|---|---|---|
| The theme of the chrome and the docs blocks, in light and dark | `theme.js`, `manager.js` | `addons.setConfig({ theme })`, `api.setOptions` |
| The theme of a component, on a switch with a moon and a sun in the top right corner of its stage: it changes the stage and nothing else, and the choice stays on the next pages. The page itself follows the system | `preview.js`, `stories/_stage.js` | our own button and CSS: the two blocks of `:root[data-theme]` are read from `tokens/build/css/aipim.css` and written again for `.pg__stage[data-theme]` |
| Two languages: a build in Portuguese (the default, at the root) and one in English (in `en/`), with the same page ids | `main.js` | `stories` with `titlePrefix`, `viteFinal` (the `@docs` alias), `managerHead` and `previewHead` (the language and `<html lang>`), `id` in each CSF and `Meta` |
| A language button that opens the same page in the other build | `manager.js` | `addons.add(..., { type: types.TOOL })` |
| The texts of the Storybook and the words inside the examples, in both languages | `i18n.js` | our module |
| A component is one page: its stories do not repeat in the sidebar | `manager.js` | `sidebar.filters` |
| A component page in one scroll, without tabs: the header, the facts and the import line, the Playground (the Default story on a component without one), every section of the spec in order, and an "On this page" list that marks the section being read. On a phone the facts and the import line come after the Playground | `docs-scroll.js`, `preview.js` | `parameters.docs.page`, the blocks of `@storybook/addon-docs` |
| The tabs of the Foundations pages are the Tabs of Aipim, run by `components/web/aipim.js` (the docs use what they document) | `docs-tabs.js` | our component |
| The spec Markdown split into sections by its `##` titles | `docs-scroll.js` | the sections of `docs/en/components/*.md` |
| The tab and the section in the address | `docs-tabs.js` | the `NAVIGATE_URL` event, with `replace` so the Back button is for pages |
| A Do and don't stacks when its two columns do not fit, and a wide component says so: `wide()` in `stories/_dodont.js` gives the class that makes the grid ask for a real column. Beside the stage, the code takes the height of the stage and scrolls | `styles/` | CSS only: `repeat(auto-fit, ...)` and a container query on the docs column |
| The styles, one file per subject, in the order of the cascade: the page, the stage, the facts, the component page, the foundations, the fixes over Storybook | `styles/` | `preview.js` imports them in order |
| The look of the docs content (the column, the rhythm, the tables, the previews of the foundations) | `styles/` | CSS on the docs content (`.sbdocs-content`) and our own classes |
| Table cells labeled for a phone | `preview.js` | our own tables, in the docs content |

## Languages

`AIPIM_LOCALE=en` builds the English Storybook; without it the build is in Portuguese. `npm run build-storybook:all`
builds both, Portuguese in `storybook-static/` and English in `storybook-static/en/`, which is how the site is published.
`npm run storybook` and `npm run storybook:en` run each one locally. A page has the same id in both builds, so the
language button only changes the folder of the address. The sidebar order in `preview.js` names the groups in both
languages, because Storybook reads that list from the file without running it.

## Checks

Two checks keep the Storybook from going back to problems it already had.

`tools/check_storybook.py` reads the source and runs with the quick checks (`npm run check`). It fails when:

- A selector takes `html body` beyond the ones measured as needed, a color is written by hand, or a width on the spacing scale does not use its token.
- A docs class uses the `aipim-` prefix, which is for the classes of the product. A class in the styles is used by nothing, or a class on a docs page has no rule.
- An example has an inline style or `data-theme`. How one sits on a stage is a `demo-` class, so the HTML to copy stays clean, and the tokens only change on `:root` and on a stage.
- A rule of axe is turned off by an id, and not by what the element is.
- A word of the gallery has no Portuguese and is not listed in `GALLERY_SAME`, a text in `i18n.js` is used by nothing, or an export is imported by nothing.
- Something writes to the clipboard outside `copyText`, so a button would give other feedback or stay silent when it fails.
- Something new comes from `storybook/internal/` without a line in "What is not an API", or Storybook and its addons are on different versions.

`npm run verify:storybook` builds both languages and runs `tools/verify_storybook.py` (CI job `storybook-smoke`), for what only shows on a page. For each language:

- The chrome: the Storybook opens without a script error, the language button is there and the toolbar has no theme button.
- The address: a section or a tab goes in the address without a step on the Back button, and a link to a section opens at it.
- The theme switch of a stage changes that stage only, and the choice follows to the next page.
- The copy buttons: both give the same feedback, and when the browser refuses, the person is told.
- Every component page, at 1280, 800 and 390: the box of the code lines up with the stage and does not change its height, the wheel scrolls the page, no component is cut short or runs out of its stage, no stage of a Do and don't runs over the next one, and nothing scrolls sideways.
- The HTML to copy: no style, no class of the docs, no dialog left open, icons from the sprite file, and what the spec writes on each class is there. "On this page" has every section of the spec.
- A component on its docs page is the same as alone: size, line, weight and color of its text, in the stage, the states and the do and don't.
- The classes of Storybook that the styles read are all on the pages, and axe finds no violation on any docs page, light and dark.
- It also clicks the language button, and checks that the two builds have the same pages.

No step waits a fixed time. Each waits for what it needs, so the time limits only run out when something is broken. When a check of this kind is missing, a problem can stay on the pages for a long time with every check passing: the type of the docs made 11 of 24 components look wrong until a person looked. A new problem found by eye should leave a rule behind it.

## Upgrading Storybook

1. `npm run verify:storybook`.
2. `python3 tools/verify_web.py`: the components do not depend on Storybook.
