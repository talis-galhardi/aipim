# The Storybook of Aipim: what is changed, and what each change needs

The Storybook is Aipim's documentation site. Most of it is plain configuration (the theme, the page layout of a docs
page, the stories). A few things are changed in places Storybook has **no API for**: they read or restyle markup that
Storybook owns. That is fragile: a new Storybook can rename a part and the change silently stops working. Two rules keep this honest:

1. every such change is listed here, with the markup it depends on;
2. `python3 tools/verify_storybook.py storybook-static` (run in CI, job `storybook-smoke`) opens a build in Chromium and
   checks each one. A Storybook upgrade that breaks one fails there, not in front of a reader.

When a change here can be done with a Storybook API instead, do it that way and delete the entry.

## What is changed

| Change | Where | Markup of Storybook it needs | Without it |
|---|---|---|---|
| The arrows of the menu groups are 12px, centered, and turn | `manager-head.html` | `#storybook-explorer-tree`, a `button` with a `div` that holds an `svg` with no `viewBox` | The arrows are 8px and sit in a corner |
| The "expand all" button of a group header is hidden | `manager-head.html` | `.sidebar-subheading-action` | A button that does nothing is shown |
| Groups of the menu slide open and closed | `manager.js` | `button[data-action="collapse-root"]`, `[data-nodetype]` on the rows | Groups open and close at once |
| The menu of a phone is a drawer from the left, with a 20px menu icon, the bar on top and 44px rows | `manager-head.html` | `#storybook-mobile-menu`, `header[role="banner"]`, `section:has(> header)`, `[data-testid="sb-preview-toolbar"]` | Storybook's own bottom sheet, with 28px targets |
| One theme button, with the mode it is in | `manager.js` | the `types.TOOL` addon API (public) | (not fragile) |
| The browser tab and the bar of a phone read "Button · Aipim Design System", not "Atoms / Button - Docs ⋅ Storybook" | `manager.js` | `document.title`, the first `button` of `header[role="banner"]` | The long default titles |
| The dark theme paints the selected page with a darker orange | `manager-head.html` | `.sidebar-item[data-selected]` | White text on a bright orange (low contrast) |
| A docs page is a header, the first story and tabs (spec, examples, code, tokens, accessibility) | `docs-tabs.js`, `preview.js` | the `parameters.docs.page` API and the blocks of `@storybook/addon-docs` (public) | (not fragile) |
| The spec Markdown is split into tabs by its `##` titles | `docs-tabs.js` | the order and names of the sections in `docs/en/components/*.md` (checked by the spec generators) | One long page |
| The tab and the section are written in the address; Back is not filled with them | `docs-tabs.js` | `window.parent.location` and `history.replaceState` | The address does not say which tab is open |
| Tables of a docs page are labeled cell by cell for a phone | `preview.js` | `.sbdocs-content table` | Stacked rows with no labels |
| A tab list that is sticky and the page does not move on its own when a section appears | `preview.css` | `.sbdocs-content`, `overflow-anchor` | The page moves further with each tab |

## The tabs of a docs page are the Tabs of Aipim

`docs-tabs.js` builds the markup of the [Tabs component](../docs/en/components/tabs.md) and `components/web/aipim.js`
runs it, so the docs use what they document. The scroll rule (the list goes to the top of the screen, always at the
same height) is the component's, not the docs': see the spec and the checks in `tools/verify_web.py`.

## Upgrading Storybook

1. `npm run verify:storybook` (builds, then runs the smoke test).
2. If a check fails, open the build and look at the part it names. Change the selector here and in the table above, or,
   if the new Storybook has an API for it, use that and delete the entry.
3. `python3 tools/verify_web.py` still has to pass: the components do not depend on Storybook.
