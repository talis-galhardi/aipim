# Aipim

A small Brazilian design system, open source, with all the parts in place: foundations, 24 web components, icons, documentation and a token generator that refuses a palette that fails contrast. It is made to be customized, and to be read by people and by AI.

> **Status: v1.0.0, released 2026-10-13,** with tokens, icons, 17 stable web components (HTML and CSS), the tutorials and the AI package. Four more are in beta for v1.1 (the Brazilian field, the select, the combobox and the date picker) and three for v1.2 (the avatar, the list item and the accordion). The documentation is a [Storybook](https://talisgalhardi.com/aipim/) in Brazilian Portuguese and in [English](https://talisgalhardi.com/aipim/en/), and the Figma file, in Portuguese, is in the [Figma Community](https://www.figma.com/community/file/1691262071308377101/aipim-design-system-tokens-17-components-icons-light-and-dark).
> See [Roadmap](#roadmap).

*Aipim* is the Brazilian Portuguese word for cassava, the root that is the base of so many meals. A design system is the base of many products.

## Where to start

| You want to | Go to |
|---|---|
| See every component, its states and its rules | The [Storybook](https://talisgalhardi.com/aipim/), in Brazilian Portuguese and in [English](https://talisgalhardi.com/aipim/en/) |
| Design with Aipim | The [Figma file](https://www.figma.com/community/file/1691262071308377101/aipim-design-system-tokens-17-components-icons-light-and-dark) in the Figma Community |
| Use it in code | `npm install aipim-ds`, below, or copy the files from `components/web/` and `tokens/build/css/` |
| Use your own brand colors | The [theme builder](https://talisgalhardi.com/aipim/theme-builder/), which checks contrast and color blindness for you |
| Build with an AI agent | [AGENTS.md](AGENTS.md), [llms.txt](llms.txt) and [llms-full.txt](llms-full.txt) |

What you get: tokens in light and dark (CSS, plus Compose and Swift files not yet tested in an app), 24 HTML and CSS components, 64 line icons, ten illustrations for the states of the interface, and a spec per component in English and in Brazilian Portuguese. Contributing? The map of the repository is in [CONTRIBUTING.md](CONTRIBUTING.md#repository-layout).

## Install with npm

```bash
npm install aipim-ds
```

```js
import 'aipim-ds/tokens.css';      // tokens (--aipim-*), light and dark
import 'aipim-ds/components.css';  // all components
import 'aipim-ds/aipim.js';        // optional: tabs keys, dismiss buttons, modal fallback
```

The package also has the icons (`aipim-ds/icons/sprite.svg`), the tokens as JSON, Compose and Swift, the specs (`aipim-ds/docs/`) and the AI files (`aipim-ds/AGENTS.md`, `aipim-ds/llms.txt`). Versions follow semver: a major version breaks things, a minor one adds and a patch fixes, and every change is in the [changelog](CHANGELOG.md).

## Use the tokens (web)

```html
<link rel="stylesheet" href="aipim.css">
<body style="background:var(--aipim-bg-canvas);color:var(--aipim-text-primary);font:var(--aipim-text-body-size) var(--aipim-font-body)">
```

Dark theme follows the system, or force it with `<html data-theme="dark">`.
Use the **semantic** variables (`--aipim-bg-canvas`, `--aipim-text-primary`, `--aipim-action-primary-bg` and the rest) in components.
The primitives (`--aipim-color-primary-700` and the other steps of each ramp) are there to generate the roles and to customize.

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

**Without code.** Open the [theme builder](https://talisgalhardi.com/aipim/theme-builder/) (or `theme-builder/index.html` from
this repository). Pick one color for each role (primary, secondary, accent, success, error, neutral). The builder makes nine
tones of each and gives every component the tone that passes the checks below, and you can pick another tone for any use. The
preview shows real components in light and dark, and **See as** shows them through a simulation of protanopia, deuteranopia
and tritanopia, with every problem marked on the preview. When two colors look alike to someone with color blindness, the
builder makes one lighter or darker; when something still fails, it suggests a small change that keeps each status color in
its family. A theme with problems can still be exported, after a confirmation that lists them. Then:

- **Code:** download the CSS and load it after `aipim.css`. The components pick it up with no other change.
- **Figma:** copy the theme, open the [Aipim Theme plugin](figma-plugin/README.md) in your copy of the Aipim file and apply it.

**In code.** Open `tools/build_tokens.py`, change the seeds at the top (hue and chroma per color), and run:

```bash
python3 tools/build_tokens.py
```

It regenerates every ramp and every output, **and re-runs the accessibility checks** (WCAG 2.2 contrast and color-blindness
simulation). If your new colors fail, it tells you which pair and by how much. No dependencies, Python 3.8+.

## Accessibility

- Body text at AAA (7:1), supporting text at AA (4.5:1), components and icons at 3:1, in light and dark.
- Never state by color alone: every state carries an icon and text.
- Sizes in `rem`, 200% zoom and text-spacing safe, reduced motion respected.

## Contributing

Issues and pull requests are welcome: read [CONTRIBUTING.md](CONTRIBUTING.md) first (the rules, where each thing lives and the checks to run). Please follow the [code of conduct](CODE_OF_CONDUCT.md), and report a security problem privately as described in [SECURITY.md](SECURITY.md).

## Roadmap

Status as of 2026-10-17. The 29 requirements, their status and the open items are in [ROADMAP.md](ROADMAP.md).

- **v1.0** (released 2026-10-13): the tokens, the components in Figma and in code, the Storybook, the npm package, the AI files, the tutorials and the illustrations.
- **v1.1** Brazil: fields for CPF, CNPJ, CEP and phone, dates and amounts in reais, Pix and WhatsApp, Brazilian icons and more illustrations, and complete flow patterns.
- **v1.5** MCP server, agent usage tests, the Claude skill and starters for Vite and Next. The theme builder was planned here and is [online](https://talisgalhardi.com/aipim/theme-builder/) already.
- **v2.0** native components in Compose and SwiftUI.

## License and credit

- Code: [MIT](LICENSE). Keep the copyright notice in copies.
- Design files and documentation: [CC BY 4.0](LICENSE-DESIGN.md). Please credit **Aipim by Talis Galhardi**.
- Author: Talis Galhardi, Product Designer and UI Engineer ([talisgalhardi.com](https://talisgalhardi.com)).
- Fonts: Antonio and Karla, SIL Open Font License 1.1.
- Illustrations (in the Figma file and in `illustrations/`): by [Luiz Fukumoto](https://www.instagram.com/lunattox/).
- Icons: derived from [Hugeicons Free](https://github.com/hugeicons/hugeicons), MIT. See [THIRD-PARTY.md](THIRD-PARTY.md).
- Inspirations: Material Design (the layers and the color roles), shadcn/ui (the code belongs to the developer), Carbon (accessibility documented per component), Polaris and GOV.UK (voice and flow patterns), and the Padrão Digital de Governo (gov.br), the Brazilian reference.

Every generated file carries a header with the version and license, and the CSS exposes `--aipim-version`.
