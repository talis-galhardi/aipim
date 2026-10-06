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

## [Unreleased] (planned as 1.0.0)

### Added
- 16 web components in HTML and CSS: button, icon button, link, text field, checkbox, radio, switch, alert, toast, empty state, tag, card, top bar, tab bar, tabs and modal. One CSS file each, joined in `aipim-components.css`, with an optional `aipim.js` for dismiss buttons, tabs and the modal fallback.
- `Aipim.init(container)` in `aipim.js`, to set up tabs in content added after the page loaded.
- 16 component specs in `docs/en/components/`: when to use, anatomy, variants, states, tokens, keyboard, ARIA and examples.
- 58 line icons from Hugeicons Free (MIT), with `icons.json`, an SVG sprite and the build script.
- Tokens: `focus/offset` (3px, the gap of the focus ring), `action/secondary/hover` and `bg/scrim`.
- Vivid card backgrounds: `tint/primary`, `tint/secondary`, `tint/tertiary`, `tint/success` and `tint/error`, with `tint/text` and `tint/text/muted` for the text on them. They alias tones that already exist (300 in light, 800 in dark), so there are no new primitives. 20 new contrast checks (text on every tint, AAA for text and AA for supporting text).
- Generated docs for space, shape and motion (`docs/en/space-shape-motion.md`).
- The package for AI agents: `AGENTS.md`, `llms.txt` and `llms-full.txt`, built from the specs by `tools/build_ai.py`.
- Guides: workflow for stakeholders, designers and engineers (`docs/en/workflow.md`), voice and microcopy, and the verification record.
- Storybook documentation, with every component state, the specs, links to the same components in Figma, and a light and dark toggle.
- `tools/verify_web.py`: axe-core, keyboard, 200% zoom, 320px reflow and text spacing in Chromium.
- Continuous integration on GitHub: the generator checks, the browser checks and the Storybook publish to Chromatic.

### Changed
- **A livelier palette.** Urucum (red-orange) is the primary, an azulejo blue is the secondary, cajá yellow is the accent, with a brighter leaf green and a cherry red. Buttons now use the vivid mid tones: the button label meets AA (4.5:1) instead of AAA, while body text and links stay at AAA (7:1). The 84 contrast checks and the color blindness checks all pass.
- The same blue is the link color: `#014B95` in light and `#8CBEFE` in dark, clearly apart from the body text. New token `link/hover`. The generator fails if a link is too close to the body text (color difference of at least 20).
- A smaller palette: five colors of nine tones (100 to 900) plus a neutral scale of twelve (50 to 950 and 1000), 57 primitives instead of 79. Tones 50 and 950 of the colors are removed because no role used them.
- Status icons use other tones so the success, error, info and primary colors stay distinguishable with color blindness.
- The tab bar label wraps onto a second line instead of being cut with an ellipsis, so no text is lost at large text sizes.
- Tabs have round top corners only, so the hover fill sits flush on the selected bar and the list border (the Figma tab changed the same way).
- Tabs scroll sideways inside the list when they do not fit, instead of running off the page; the focus ring is not clipped.

## [0.1.0] - 2026-10-05

### Added
- The token generator `tools/build_tokens.py`: color seeds and scales in, `tokens/tokens.json` (W3C Design Tokens 2025.10), CSS custom properties, Jetpack Compose and SwiftUI themes, a Figma variables file and the color and typography docs out. It fails if a contrast check fails (60 checks, plus color blindness simulation).
- Light and dark themes through `data-theme`.
- English documentation and the licenses: MIT for code, CC BY 4.0 for the design files.
