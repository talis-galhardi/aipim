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
| Classes in the docs content (`.sbdocs-*`, `.docblock-*`, `.docs-story`, `.sb-*`, and `.token` with the Prism types after it, which recolor the syntax that fails contrast) | `preview.css` | `verify_storybook.py` reads them from the stylesheet and fails when one is gone from the pages |
| `componentStories()` and `projectAnnotations` of the docs context, as Storybook's Stories block uses them | `pageStories` in `docs-tabs.js` | A script error or an empty page, which `verify_storybook.py` catches |
| `__forceInitialArgs` of `DocsStory`, on the pages with tabs | `docs-tabs.js` | It goes away with those pages |
| The address read from the window above the iframe, as Storybook's `DocsContainer` does | `topWindow` in `docs-tabs.js` | The address checks of `verify_storybook.py` fail |

`.sb-unstyled` is on the list only as a class: it is what Storybook's `Unstyled` block renders, and the page in one scroll sits inside that block so Storybook's docs typography and its reset of margins do not apply to it.

## What is ours

| What | Where | API |
|---|---|---|
| The theme of the chrome and the docs blocks, in light and dark | `theme.js`, `manager.js` | `addons.setConfig({ theme })`, `api.setOptions` |
| One theme button in the toolbar | `manager.js` | `addons.add(..., { type: types.TOOL })` |
| Two languages: a build in Portuguese (the default, at the root) and one in English (in `en/`), with the same page ids | `main.js` | `stories` with `titlePrefix`, `viteFinal` (the `@docs` alias), `managerHead` and `previewHead` (the language and `<html lang>`), `id` in each CSF and `Meta` |
| A language button that opens the same page in the other build | `manager.js` | `addons.add(..., { type: types.TOOL })` |
| The texts of the Storybook and the words inside the examples, in both languages | `i18n.js` | our module |
| A component is one page: its stories do not repeat in the sidebar | `manager.js` | `sidebar.filters` |
| A docs page: header, the Default story, and tabs (Overview, Playground, Examples, Tokens, Accessibility) | `docs-tabs.js`, `preview.js` | `parameters.docs.page`, the blocks of `@storybook/addon-docs` |
| The pilot of a component page in one scroll, without tabs, on Button (`singleScroll` in its meta): Playground first, every section visible, an "On this page" list that marks the section being read | `docs-scroll.js`, `preview.js` | `parameters.docs.page`, the blocks of `@storybook/addon-docs` |
| The tabs are the Tabs of Aipim, run by `components/web/aipim.js` (the docs use what they document) | `docs-tabs.js` | our component |
| The spec Markdown split into tabs by its `##` titles | `docs-tabs.js` | the sections of `docs/en/components/*.md` |
| The tab and the section in the address | `docs-tabs.js` | the `NAVIGATE_URL` event, with `replace` so the Back button is for pages |
| The look of the docs content (the column, the rhythm, the tables, the previews of the foundations) | `preview.css` | CSS on the docs content (`.sbdocs-content`) and our own classes |
| Table cells labeled for a phone | `preview.js` | our own tables, in the docs content |

## Languages

`AIPIM_LOCALE=en` builds the English Storybook; without it the build is in Portuguese. `npm run build-storybook:all`
builds both, Portuguese in `storybook-static/` and English in `storybook-static/en/`, which is how the site is published.
`npm run storybook` and `npm run storybook:en` run each one locally. A page has the same id in both builds, so the
language button only changes the folder of the address. The sidebar order in `preview.js` names the groups in both
languages, because Storybook reads that list from the file without running it.

## Checks

`npm run verify:storybook` builds both languages and runs `tools/verify_storybook.py` (CI job `storybook-smoke`). For each
language, the Storybook opens without a script error, the theme and language buttons are there, the page says its
language, the page in one scroll has its sections, live controls and a list that follows the reading, a component page
with tabs has its five tabs and keeps its place tab after tab, a section or a tab goes in the address without a step on
the Back button, a link to a section opens at it, a phone shows both pages without sideways scroll, the classes of
Storybook that `preview.css` styles are all on the pages, and axe finds no violation on any docs page, light and dark. It also clicks the language button, and
checks that the two builds have the same pages.

## Upgrading Storybook

1. `npm run verify:storybook`.
2. `python3 tools/verify_web.py`: the components do not depend on Storybook.
