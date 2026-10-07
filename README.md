# Aipim

A small, open, Brazilian design system with all the parts in place: foundations, 16 web components, icons, documentation and a token generator that enforces accessibility checks. Made to be customized, and to be used by people and by AI.

> **Status: v0.1.0, in construction.** Tokens, icons, 16 web components (HTML and CSS), the workflow guide and the AI package are ready. The documentation is a [Storybook](https://main--6ac4e6701012673291236e0b.chromatic.com/).
> Planned public release: 2026-10-12. See [Roadmap](#roadmap).

*Aipim* is the Brazilian Portuguese word for cassava, the root that is the base of so many meals. A design system is the base of many products.

## What is here today

| Path | What it is |
|---|---|
| `.storybook/`, `stories/`, `package.json` | The Storybook documentation: one entry per component with every state, the spec, a link to the same component in Figma, and the foundations and workflow guides. Run `npm install` and `npm run storybook`. The stories cut their markup from `components/web/examples/index.html`, so the gallery stays the single source. Storybook is for documentation only; it is not published as a package. |
| `tools/build_tokens.py` | The single source of the system. Color seeds + scales in, everything else out. Fails if accessibility checks fail. |
| `tokens/tokens.json` | All tokens in the [W3C Design Tokens](https://www.designtokens.org/) format (2025.10). |
| `tokens/build/css/aipim.css` | CSS custom properties (`--aipim-*`), light and dark. |
| `tokens/build/compose/AipimTokens.kt` | Jetpack Compose tokens and theme. *Generated, not yet compiled in an app.* |
| `tokens/build/swift/AipimTokens.swift` | SwiftUI tokens and theme. *Generated, not yet compiled in an app.* |
| `components/web/` | HTML and CSS components (button, icon button, link, text field, checkbox, radio, switch, alert, toast, empty state, tag, card, top bar, tab bar, tabs, modal): one CSS file each, `aipim-components.css` with all of them, `examples/index.html`, and the optional `aipim.js` (tabs keys, dismiss buttons, modal commands). |
| `docs/en/` | Generated documentation (`color.md`, `typography.md`, `space-shape-motion.md`), `workflow.md` (how stakeholders, designers and engineers work together with Aipim), `voice-and-microcopy.md` (how Aipim sounds and how to write interface text), `verification.md` (what was checked, when and the known limits), `documentation-layout.md` (how a component page is built in the Figma file) and one spec per component in `docs/en/components/`. |
| `AGENTS.md`, `llms.txt`, `llms-full.txt` | The package for AI agents: the rules for building with Aipim, an index of every doc, and everything in one file. |
| `tools/verify_web.py` | Checks the web components in Chromium, WebKit and Firefox (`--browser`), also in forced colors (`--forced-colors`): axe-core in both themes, keyboard, 200% zoom, 320px reflow and text spacing. Needs Playwright and `npm install`. |
| `CHANGELOG.md` | What changed in each version, how versions work, and the deprecation policy. |
| `tools/build_workflow.py` | Builds `docs/en/workflow.md` from `tools/workflow_content.py` (`--check` verifies it). |
| `tools/build_ai.py` | Builds `llms.txt`, `llms-full.txt` and the component table of `AGENTS.md` from the specs (`--check` verifies them). |
| `tools/build_web.py` | Joins the component CSS files into `components/web/aipim-components.css` (`--check` verifies it is up to date). |
| `icons/` | 63 line icons (Hugeicons Free, Stroke Rounded, MIT), five of them platform logos used next to links: `svg/`, `sprite.svg`, `icons.json`. Built by `tools/build_icons.py`. |

## Install with npm

```bash
npm install aipim-ds
```

```js
import 'aipim-ds/tokens.css';      // tokens (--aipim-*), light and dark
import 'aipim-ds/components.css';  // all components
import 'aipim-ds/aipim.js';        // optional: tabs keys, dismiss buttons, modal fallback
```

The package also has the icons (`aipim-ds/icons/sprite.svg`), the tokens as JSON, Compose and Swift, the specs (`aipim-ds/docs/`) and the AI files (`aipim-ds/AGENTS.md`, `aipim-ds/llms.txt`). Version 0.1.0 is a pre-release: until 1.0.0, a minor version may include breaking changes, listed in the [changelog](CHANGELOG.md).

## Use the tokens (web)

```html
<link rel="stylesheet" href="aipim.css">
<body style="background:var(--aipim-bg-canvas);color:var(--aipim-text-primary);font:var(--aipim-text-body-size) var(--aipim-font-body)">
```

Dark theme follows the system, or force it with `<html data-theme="dark">`.
Use the **semantic** variables (`--aipim-bg-canvas`, `--aipim-text-primary`, `--aipim-action-primary-bg`, ...) in components.
The primitives (`--aipim-color-primary-700`, ...) are there to generate the roles and to customize.

## Use the components (web)

Plain HTML and CSS. Only the tabs need a little script for the arrow keys (the optional `aipim.js`); the modal uses the native `dialog`. Load the tokens, then the components (all of them, or only the files you need):

```html
<link rel="stylesheet" href="aipim.css">
<link rel="stylesheet" href="aipim-components.css">

<button class="aipim-button" type="button">Save</button>
<a class="aipim-link" href="/docs">Read the docs</a>
```

Open `components/web/examples/index.html` in a browser to see every component, with a light and dark toggle. The specs in
`docs/en/components/` list the markup, states, tokens and accessibility notes of each one. Components use only the semantic
`--aipim-*` variables, so a custom theme reaches them with no changes.

## Customize

Open `tools/build_tokens.py`, change the seeds at the top (hue and chroma per color), and run:

```bash
python3 tools/build_tokens.py
```

It regenerates every ramp and every output, **and re-runs the accessibility checks** (WCAG 2.2 contrast and color-blindness
simulation). If your new colors fail, it tells you which pair and by how much. No dependencies, Python 3.8+.

## Accessibility

- Body text at AAA (7:1), supporting text at AA (4.5:1), components and icons at 3:1, in light and dark.
- Never state by color alone: every state carries an icon and text.
- Sizes in `rem`, 200% zoom and text-spacing safe, reduced motion respected.

## Roadmap

- **v0.1** tokens (this) and the Figma file structure
- **v1.0** Figma variables and 16 components, web components, Storybook documentation, AI package (`llms.txt`, `AGENTS.md`), workflow guide
- **v1.1** Brazil, with Brazilian Portuguese as the next priority: documentation and microcopy in Portuguese (`docs/pt-br`); fields for CPF, CNPJ, CEP and phone with masks and clear errors; dates as dd/mm/aaaa and amounts in reais; patterns for a Pix payment flow and a WhatsApp button; accessibility in the Brazilian context (LBI, eMAG, and Libras where it fits); Brazilian icons and illustrations
- **v1.5** theme builder, MCP server, agent usage tests
- **v2.0** native components (Compose, SwiftUI)

## License and credit

- Code: [MIT](LICENSE). Keep the copyright notice in copies.
- Design files and documentation: [CC BY 4.0](LICENSE-DESIGN.md). Please credit **Aipim by Talis Galhardi**.
- Fonts: Antonio and Karla, SIL Open Font License 1.1.
- Icons: derived from [Hugeicons Free](https://github.com/hugeicons/hugeicons), MIT. See [THIRD-PARTY.md](THIRD-PARTY.md).

Every generated file carries a header with the version and license, and the CSS exposes `--aipim-version`.
