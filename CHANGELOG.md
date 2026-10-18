# Changelog

All notable changes to Aipim are written here, newest first. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the versions follow [Semantic Versioning](https://semver.org/).

## How versions work

Aipim is the tokens (`tokens/`), the web components (`components/web/`), the icons (`icons/`) and the Figma file. They share one version number.

- **Patch** (1.0.1): fixes that change no name, token value or markup you depend on. Safe to take.
- **Minor** (1.1.0): new components, tokens, variants or icons. Nothing existing breaks.
- **Major** (2.0.0): anything that can break your screens. A renamed or removed class, token or icon, changed markup, or a color change large enough to alter contrast pairs.
- **Deprecation.** Before something is removed, it is marked deprecated in this file and in its spec for at least one minor version. The old name keeps working. The entry says what to use instead.
- **Migration notes.** Every major version has a "Migration" section here with before and after for each breaking change.
- Token **values** may change in a minor version when the change is a fix (for example, a color that failed a contrast check). The change is listed under "Changed".

Until 1.0.0, the minor version may include breaking changes, and they are listed under "Changed" or "Removed".

## [Unreleased]

### Added

- `tools/check.py` (also `npm run check`): every quick check in one command, and the only place that lists them. CI, AGENTS.md and CONTRIBUTING.md call it. `npm run check:browser` runs the ones that need a browser.
- `tools/check_facts.py`: counts the components, icons, illustrations, contrast checks and rules of AGENTS.md from the repository, and fails when a text says another number, in English or Portuguese, in digits or in words. It also checks the release date against CHANGELOG.md.
- `tools/build_specs.py`: writes the light and dark colors of the token tables of the 34 specs from the tokens, so a change in the palette reaches every spec. The translation stamp leaves hex colors out, so this needs no new translation.
- `tools/aipim_tools.py`: what the scripts share (reading the specs, writing or checking a generated file, a local server for the browser checks, the report of checks). `stories/_stories.js` does the same for the 17 story files, which now hold only what is their own.
- Theme builder (`theme-builder/`, online at https://talisgalhardi.com/aipim/theme-builder/): a page to make a theme from your own colors without code. One color per role, nine tones each, and every semantic role on the tone that passes the 84 contrast checks and the color-blindness ones, in light and dark. A tone can be picked by hand. When two colors look alike to someone with color blindness, the builder makes one of them lighter or darker (never a hue the person picked); when something still fails, it suggests a small change that keeps each status color in its family and stays as close as possible to the color picked. "See as" shows the preview through a simulation of protanopia, deuteranopia and tritanopia (the model of the checks, Machado et al. 2009), counts the problems per kind of vision and marks each one on the preview, numbered like the list of checks. A theme with problems can be exported after a confirmation that lists them, asked once per theme; the file carries them in a comment. It shows real components in a live preview, exports a CSS file to load after `aipim.css`, and keeps the theme in its link. With the default colors it gives exactly the colors of `tokens/tokens.json`, and `tools/verify_theme_builder.py` checks that.
- A "Theme builder" page in the Storybook (`stories/en/theme-builder.mdx` and its Portuguese translation), right after the Introduction: the basics in plain words (color, tone, use, check), then the steps for designers (to Figma) and for developers (to CSS), with a button that opens the builder, and a References tab with the tools and the research behind the builder. The Color page and the "Customizable" principle of the Introduction link to it.
- `DocAction` in `.storybook/docs-tabs.js`: the call to action of a docs page, an Aipim button that opens a new tab and says so to screen readers. The docs pages now get the icon sprite from the docs container, so an MDX page with no story can show icons.
- Theme builder in three panels across the whole width: the controls, the preview and the summary of the theme with the export. Each problem on the preview has a frame and a numbered spot whose tooltip (pointer or keyboard) says what fails and why, in the words of the checks; a problem in the checks takes the preview to its theme, kind of vision and mark, and a second click makes the mark blink.
- Theme builder laid out like a checkout. The controls sit on the page background, the preview on a recessed stage, and the summary of the theme in a raised card on the right: the six colors, one line per kind of check with its count, what does not pass, the fix that passes (each color from and to), the status and one main export button. Each color is one field (swatch and hex) next to its nine tones. "See as" and, right above the preview, light and dark are segmented controls, each option with its count of problems as a badge. The text under "See as" keeps one height for every kind of vision, so the preview never moves. Narrower than three panels, a bar at the bottom keeps the status in sight and leads to the summary.
- Theme builder: each row of "Your colors" is the picker of its color. It has the hex, the nine tones as one segmented piece (the kept tone wears a ring and its number), and a Hue and an Intensity bar drawn in the color they set, which change the seed of the scale. A typed hex moves the bars; moving a bar lets go of the kept hex. While a bar is dragged, the summary looks for a fix once the bar stops.
- Aipim Theme, a Figma plugin (`figma-plugin/`): it applies a theme from the builder to the variables of an Aipim file (the colors of Primitives, and where each Semantic role points in Light and Dark). It edits existing variables only.
- `storybook` icon in the Platforms group, the Storybook logo drawn for Aipim on the 24px grid with the 1.5px stroke (Hugeicons Free has no Storybook logo). Its source is `icons/custom/storybook.svg`, and `tools/build_icons.py` now reads the icons in `icons/custom/` next to the Hugeicons ones. A link to the Storybook uses it instead of `external-link`. There are 64 icons now.
- `docs/figma-sync-log.md`: what the Figma file has to match in the repository, how to check each part, and a log of every pass. `CLAUDE.md` points to it.

### Changed

- Each spec says its level in `group:`. The lists of components in AGENTS.md, `llms.txt`, `.storybook/i18n.js` and `stories/_gallery.js` are written from it by `tools/build_ai.py`, so a new component is added in one place. The `tokens:` field is gone: it was incomplete in 13 specs, and the token table of each spec already says it.
- The icons inline in the gallery and in the theme builder are copied from `icons/sprite.svg` by `tools/build_web.py`, and the description at the top of AGENTS.md and `llms.txt` comes from `package.json`.
- `docs/documentation-layout.md` (it was `docs/en/` and `docs/pt-br/`) keeps the rules of the Figma pages and why they exist, in English only: 1,537 words instead of 6,455 in each language. The pages themselves are the reference for their composition, and the Storybook part is in the code.
- The tutorials and the Introduction say that something is on the roadmap and link to ROADMAP.md, instead of naming the version, so a change of plan is written in one place.
- README: it opens with "Where to start" (Storybook, Figma, npm, theme builder, AI files) in place of the table of every folder, which moved to CONTRIBUTING.md as "Repository layout". The roadmap there is one line per version, and the detail stays in ROADMAP.md.
- `llms-full.txt` leaves out the documentation layout and the patterns, which are about the Figma file and the brand and not about building a screen. `llms.txt` still lists them, under Optional. The file is about a quarter shorter.
- The Storybook keeps what a person who uses Aipim needs. The Documentation layout page (how the Figma pages are built), the Patterns and the florão page (Figma drafts with no files for the web yet) and the Verification page left the Guides; the three Markdown files stay in `docs/`, and CONTRIBUTING.md points to the first and the last. The Introduction has a short "What is checked" section with the results and the known limits, and its About tab no longer repeats the README.
- The Figma file keeps only what a designer uses while designing. The roadmap and the 29 requirements moved to `ROADMAP.md`, and the history stays in `CHANGELOG.md`. The credits became a band of Sobre o Aipim: who made it, the illustrations, the fonts, how to credit Aipim and the systems it learned from. The file map of Comece aqui points to all three. The Roadmap e requisitos, Créditos e licenças and Changelog pages are gone, and so are the PADRÕES, PERSONALIZAÇÃO and PROJETO groups.
- Figma: Padrões e telas is now **Telas de exemplo**, under Componentes. It has the four screens to duplicate, and the flows and the microcopy now live in the voice guide only.
- Figma: Temas e personalização is now **Sua marca no Aipim**, under Começo, after the tutorials. It shows the four steps from the theme builder to the Aipim Theme plugin, in place of editing `tools/build_tokens.py`. Its three example themes are new and far apart from each other and from Aipim: Jabuticaba (purple, amber, rosy neutrals, rounder corners), Maresia (petrol, navy, coral, cool neutrals) and Grafite (graphite, electric blue, lime, cold neutrals, almost square corners). Their colors come from the theme builder's engine, so all three pass every check.

### Fixed

- The component pages of the Storybook showed 2026-10-06 as the last verification, and `verification.md` says 2026-10-07. The date is now read from `verification.md`.
- The list of checks in CONTRIBUTING.md had left out the Storybook check.
- README: the npm section still called the package a 0.1.0 pre-release.
- Figma: the page about themes and the Ilustrações page said the illustrations follow the theme colors. They do not yet: the ten illustrations have fixed colors, and following the theme is planned for v1.1.
- Figma: the focus ring of the Card was invisible, because the card clips its content and the ring sits outside it. The focus variants no longer clip, and the media keeps the card's top corners.
- Figma: the Card with media was 1px shorter than in code. The body now starts 24px below the media, as in `card.css`, so the card is 329px tall like its spec.
- Figma: the anatomy and measurement drawings of the component pages are aligned again. Each marker line meets the middle of its part, the outline of a text fits the text, and each measurement label sits in the middle of its line. The sections around the pages no longer cut off the footer.
- The package description, `AGENTS.md`, `llms.txt`, `llms-full.txt` and two pages of the Figma file still said 63 icons. There are 64.

## [1.0.0] - 2026-10-13

The first stable release: 17 components, the tokens, 63 icons, 10 illustrations, the Figma file in the Figma Community, the Storybook in Brazilian Portuguese and English, and the package for AI agents.

### Added

Components and tokens
- 17 web components in HTML and CSS: button, icon button, link, badge, tag, checkbox, radio, switch, text field, alert, toast, tabs, card, empty state, top bar, tab bar and modal. One CSS file each, joined in `aipim-components.css`, and an optional `aipim.js` (dismiss buttons, tabs, the modal fallback, and `Aipim.init(container)` for content added after the page loaded). Each has a spec in `docs/en/components/`: when to use, anatomy, variants, states, tokens, keyboard, ARIA and examples.
- **Badge** (`aipim-badge`): a small mark with a numeral or an icon next to text, for step numbers and icon chips. Decorative (`aria-hidden`). Outline, `--filled` and `--tint`, round and `--square`, sizes 48 and `--sm` (32).
- **Card** header (`aipim-card__header`, `__heading`, `__eyebrow`): a Badge before the title and an eyebrow above it. Card tones `--primary`, `--secondary`, `--tertiary` and `--success`, painted with the `tint/*` roles.
- **Tag** styles `--inverse` (for dark or colored surfaces, it follows the text color of the surface) and `--link` (an `a`, with no remove button).
- **Tabs** behavior in `aipim.js` and `tabs.css`: a panel starts at its top. When a tab is chosen and the top of the screen is below the top edge of the list, the page scrolls so the list is at the top of the screen, always at the same height (a sticky list is read where it sits in the page); when the top of the screen is above that edge, nothing moves. In the spec, with a do and a don't, and in `tools/verify_web.py`.
- Tokens: `focus/offset` (3px, the gap of the focus ring), `action/secondary/hover`, `bg/scrim`, `link/hover`, and the tint roles `tint/primary`, `tint/secondary`, `tint/tertiary`, `tint/success` and `tint/error` with `tint/text` and `tint/text/muted` (20 new contrast checks, AAA for text and AA for supporting text).
- Generated docs for color, typography, space, shape and motion, and the tokens in CSS, JSON, Compose and Swift.

Icons and illustrations
- 63 line icons from Hugeicons Free (MIT) with `icons.json`, an SVG sprite and the build script. Five are platform logos (GitHub, Figma, npm, Claude, MCP server) for links in the documentation.
- `illustrations/`: ten illustrations for the states of the interface (welcome, empty, loading, in progress, ready, success, error, no results, offline and contact), by [Luiz Fukumoto](https://www.instagram.com/lunattox/), as SVG (880 KB in all, 260 KB gzipped, optimized with `npm run illustrations:optimize`) with `illustrations.json` (name, use, description). In the package as `aipim-ds/illustrations/svg/*`.

The Figma file
- Published in the [Figma Community](https://www.figma.com/community/file/1691262071308377101/aipim-design-system-tokens-17-components-icons-light-and-dark), with variables in light and dark and the 17 components.
- A **Library** category with three pages: Components, **Documentation kit** (Masthead, Meta pair, Eyebrow, Band header, Step, Code block, Stat, Link row, Link row soon and Prev next, made from instances of the atoms; the guide `docs/en/documentation-layout.md` lists them) and **Brand masters** (Pattern, Ornament, Symbol, Lockup, Wordmark, Illustration and the 63 Icon masters). Everywhere else in the file the icons are instances.
- Brand patterns (cacos, hydraulic tile, cobogó and petals, each in the Aipim and Traditional palettes), the florão ornament (24, 32 and 48px) and the symbol, from the variable collections `Pattern palette` and `Pattern drawing`; a five-sheet brand manual; new covers for the eight families. The patterns are first drafts drawn in code, to be redrawn by hand. The guide `docs/en/patterns-and-ornament.md` is in the package.
- All the documentation pages are rebuilt from the kit on one layout, with a Masthead, a Prev next bar in the reading order of the sidebar and a footer. **Start here** is the front door (three steps, a map of every page, the links outside Figma); **About & brand** is one page with six sheets; **Tutorials** has one sheet for each audience.

Brazilian Portuguese
- The docs in Brazilian Portuguese, file for file, in `docs/pt-br/`: the 17 specs, the guides, the tutorials (built by `tools/build_tutorials.py` from `tools/tutorials_content_pt.py`) and the color, typography and space docs (built by `tools/build_tokens.py`, which now always writes both languages). The package carries them.
- The Storybook in two languages, two builds with the same page addresses: Portuguese at `/aipim/` (the default) and English at `/aipim/en/`, with a language button in the toolbar that opens the same page in the other language and `<html lang>` set for each. The texts of the Storybook and the words inside the examples (buttons, alerts, cards) are in `.storybook/i18n.js`; component, variant and token names stay in English.
- The Figma file in Portuguese: pages, rows, texts, examples and the descriptions of the components. Component, variant, property and variable names stay in English, as in the code. The brand patterns are called padronagens.
- `illustrations.json` gives each illustration its label, use and alt text in Portuguese too (`pt-BR`).
- `tools/check_translation.py` (CI): every Portuguese file ends with a stamp of the English file it was translated from, and the check fails when the English changes and the Portuguese does not, or when the two differ in shape. `tools/check_copy.py` (CI) checks the writing rules of the docs in both languages (CONTRIBUTING.md, "Writing").

Storybook and guides
- Foundations pages with real previews read from `tokens/tokens.json`: color swatches, the type scale set in itself, spacing, radius, border and shadow boxes, the stacking order, motion you can play, touch targets and a catalog of the 63 icons, and the ten illustrations with their uses.
- The 17 components are grouped by atomic design (Atoms, Molecules, Organisms), in Storybook and in the Figma page list. Each page has a header (group, name, lead sentence), the Default story, and tabs built with the Tabs of Aipim: Overview, Examples, Code, Tokens and Accessibility; the tab and the section are in the address, each tab has an "On this page" list, and every page ends with previous and next links.
- On a phone, table rows are two-column cards and the stages keep their room. One theme button, remembered for the next visit.
- Tutorials for designers, developers and AI agents (`docs/en/tutorials-*.md`, built by `tools/build_tutorials.py`), voice and microcopy, and the verification record.
- The Storybook is changed only through Storybook's own APIs (theme, sidebar filter, a toolbar tool, the docs page template): its menu, toolbar and phone layout are Storybook's own, so an upgrade does not break the site in silence. `.storybook/README.md` lists what is ours, and `tools/verify_storybook.py` (CI job `storybook-smoke`) checks a build.

Package and checks
- The npm package `aipim-ds`: the tokens, the components CSS and script, the icons, the illustrations, the docs and the AI files (`AGENTS.md`, `llms.txt`, `llms-full.txt`, built from the specs by `tools/build_ai.py`). 0.1.0 was published by hand on 2026-10-07 as a pre-release, without provenance; from 1.0.0 a release workflow publishes it with provenance when a version tag is pushed.
- `tools/verify_web.py`: axe-core, keyboard, 200% zoom, 320px reflow, text spacing and the tabs in Chromium, WebKit and Firefox, also in forced colors. Continuous integration on GitHub: the generator checks, the browser checks, the Storybook smoke test and the Storybook publish to Chromatic.

### Changed
- **A livelier palette.** Urucum (red-orange) is the primary, an azulejo blue the secondary, cajá yellow the accent, with a brighter leaf green and a cherry red. Buttons use the vivid mid tones: the button label meets AA (4.5:1) instead of AAA, while body text and links stay at AAA (7:1). The 84 contrast checks and the color blindness checks pass.
- The link color is the blue (`#014B95` in light, `#8CBEFE` in dark), clearly apart from the body text; the generator fails if a link is too close to the body text (color difference of at least 20).
- A smaller palette: five colors of nine tones (100 to 900) plus a neutral scale of twelve, 57 primitives instead of 79. Status icons use other tones so success, error, info and primary stay distinguishable with color blindness.
- Tabs have round top corners only, so the hover fill sits flush on the selected bar, and they scroll sideways inside the list when they do not fit (the focus ring is not clipped). The tab bar label wraps onto a second line instead of being cut.
- The Figma Card counts its 1px border in the layout, so the border shows around the media; it matches the CSS.
- Figma icons: the stroke scales with the icon like in the code (1.5px at 24, 1.25px at 20, 1px at 16), and the icon sizes follow the specs (16, 20 or 24 by component). The icon follows the color of its label (Button, Link, Tab, Tab bar, Tag), the type icon of the Alert and the Toast follows the status, and the Text field error icon is `error/icon`.
- The Illustration component in Figma has ten scenes in vector, scaling with the instance, instead of eight raster images.
- The docs follow the maintainer's copy guide: no em dash, none of the words that make a text sound generated, no lists of three, and a fact next to every claim. The English docs were revised against it.
- The component stories live in `stories/atoms`, `stories/molecules` and `stories/organisms`, with their ids pinned (`atoms-button`), and the MDX pages in `stories/en` and `stories/pt-br`.
- The Storybook docs pages open with a conventional header instead of a dark band, on a centered column of up to 1124px with a 12-column grid, body text in the `body-lg` step and a vertical rhythm of 24px between blocks and 80px between sections. The Default story shows the component at its real size. The Backgrounds and Grid tools are off: the stages paint their own background from the tokens.

### Fixed
- Storybook docs pass axe (WCAG 2.2 A and AA) on all 31 pages in light and dark, and `tools/verify_storybook.py` now checks it: the wrong example of a do and don't is a picture, hidden from screen readers and the keyboard (an icon button or a tab bar with no name was a real failure on the page), and two syntax colors of the code blocks that fell below 4.5:1 take text roles.
- The illustrations are optimized with two decimals: with one, large curves moved (the rim of the plate in `ready.svg` came out uneven).
- `tools/verify_web.py` waits for the color transitions before it measures the dark theme (WebKit was sometimes measured mid-way and failed at random). `tools/build_icons.py --check` checks the icons without writing them.
- Checkbox: the check mark and the dash of the mixed state have a 2px stroke (they were 1px, the icon grid stroke scaled down to the 16px mark). In Figma the mark is 2px, scaled to the 16px box and painted with `action/primary/text` (it was the ink color, dark on the red box).
- Storybook docs: a tab no longer keeps the scroll of the tab before; the list of sections appearing no longer moves the page by its height (scroll anchoring); the title of a page has room above it; section titles keep their rule and space when first in a tab.
- Storybook tables, stages and swatches: tables use the width of a phone, with the column name above each value, also the plain Markdown ones (Tokens used, Accessibility, Stacking order); inline `code` wraps; the stacking order and the color ramps fit a phone; every swatch of a ramp has the full height; stages have the same room on every side.

## [0.1.2] - 2026-10-07

### Changed
- The release workflow now waits for the maintainer's approval (a GitHub Environment named `npm`, also set on the npm Trusted Publisher) before it publishes, and the npm package lists the author's site. This version tests that approval step. No token, component or icon changed.

## [0.1.1] - 2026-10-07

### Changed
- The README has an "Install with npm" section.
- The package is published by the release workflow with npm trusted publishing (no token) and provenance. This version tests that path before 1.0.0. No token, component or icon changed.

## [0.1.0] - 2026-10-05

### Added
- The token generator `tools/build_tokens.py`: color seeds and scales in, `tokens/tokens.json` (W3C Design Tokens 2025.10), CSS custom properties, Jetpack Compose and SwiftUI themes, a Figma variables file and the color and typography docs out. It fails if a contrast check fails (60 checks, plus color blindness simulation).
- Light and dark themes through `data-theme`.
- English documentation and the licenses: MIT for code, CC BY 4.0 for the design files.
