# The Storybook of Aipim

The Storybook is Aipim's documentation site. It is changed **only through Storybook's own APIs**: the theme, the sidebar
filter, a toolbar tool, the docs page template and the MDX blocks. The menu, the toolbar and the phone layout are
Storybook's own, as they ship. Nothing here reads or restyles markup that Storybook owns, so a Storybook upgrade does
not break the site in silence.

This was a choice. An earlier version restyled the menu (bigger arrows, a sliding animation, a drawer on a phone) by
reaching into Storybook's markup. It worked, but it was a contract with one version of Storybook. If the docs ever need
that much control, the way is a documentation site of our own, with Storybook kept as the workshop of the components.

## What is ours

| What | Where | API |
|---|---|---|
| The theme of the chrome and the docs blocks, in light and dark | `theme.js`, `manager.js` | `addons.setConfig({ theme })`, `api.setOptions` |
| One theme button in the toolbar | `manager.js` | `addons.add(..., { type: types.TOOL })` |
| A component is one page: its stories do not repeat in the sidebar | `manager.js` | `sidebar.filters` |
| A docs page: header, the Default story, and tabs (Overview, Examples, Code, Tokens, Accessibility) | `docs-tabs.js`, `preview.js` | `parameters.docs.page`, the blocks of `@storybook/addon-docs` |
| The tabs are the Tabs of Aipim, run by `components/web/aipim.js` (the docs use what they document) | `docs-tabs.js` | our component |
| The spec Markdown split into tabs by its `##` titles | `docs-tabs.js` | the sections of `docs/en/components/*.md` |
| The tab and the section in the address | `docs-tabs.js` | `history.replaceState` on the page that holds the Storybook |
| The look of the docs content (the column, the rhythm, the tables, the previews of the foundations) | `preview.css` | CSS on the docs content (`.sbdocs-content`) and our own classes |
| Table cells labeled for a phone | `preview.js` | our own tables, in the docs content |

## Checks

`npm run verify:storybook` builds the Storybook and runs `tools/verify_storybook.py` (CI job `storybook-smoke`): the
Storybook opens without a script error, the theme button is there, a component page has its five tabs and keeps its
place tab after tab, and a phone shows the page without sideways scroll.

## Upgrading Storybook

1. `npm run verify:storybook`.
2. `python3 tools/verify_web.py`: the components do not depend on Storybook.
