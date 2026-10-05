# Aipim

A free, open design system for designers **and** developers, with a Brazilian identity, accessible by construction,
customizable with a handful of knobs, and readable by AI agents.

> **Status: v0.1.0, in construction.** Tokens are ready. Components, documentation site and the AI package are next.
> Planned public release: 2026-10-12. See [Roadmap](#roadmap).

*Aipim* is the Tupi word for "house".

## What is here today

| Path | What it is |
|---|---|
| `tools/build_tokens.py` | The single source of the system. Color seeds + scales in, everything else out. Fails if accessibility checks fail. |
| `tokens/tokens.json` | All tokens in the [W3C Design Tokens](https://www.designtokens.org/) format (2025.10). |
| `tokens/build/css/aipim.css` | CSS custom properties (`--aipim-*`), light and dark. |
| `tokens/build/compose/AipimTokens.kt` | Jetpack Compose tokens and theme. *Generated, not yet compiled in an app.* |
| `tokens/build/swift/AipimTokens.swift` | SwiftUI tokens and theme. *Generated, not yet compiled in an app.* |
| `docs/en/` | Generated documentation: `color.md`, `typography.md`. |
| `icons/` | 58 line icons (Hugeicons Free, Stroke Rounded, MIT): `svg/`, `sprite.svg`, `icons.json`. Built by `tools/build_icons.py`. |

## Use the tokens (web)

```html
<link rel="stylesheet" href="aipim.css">
<body style="background:var(--aipim-bg-canvas);color:var(--aipim-text-primary);font:var(--aipim-text-body-size) var(--aipim-font-body)">
```

Dark theme follows the system, or force it with `<html data-theme="dark">`.
Use the **semantic** variables (`--aipim-bg-canvas`, `--aipim-text-primary`, `--aipim-action-primary-bg`, ...) in components.
The primitives (`--aipim-color-primary-700`, ...) are there to generate the roles and to customize.

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
- **v1.0** Figma variables and 15 components, web components, documentation site, AI package (`llms.txt`, `AGENTS.md`)
- **v1.5** theme builder, MCP server, agent usage tests
- **v2.0** native components (Compose, SwiftUI)

## License and credit

- Code: [MIT](LICENSE). Keep the copyright notice in copies.
- Design files and documentation: [CC BY 4.0](LICENSE-DESIGN.md). Please credit **Aipim by Talis Galhardi**.
- Fonts: Antonio and Karla, SIL Open Font License 1.1.
- Icons: derived from [Hugeicons Free](https://github.com/hugeicons/hugeicons), MIT. See [THIRD-PARTY.md](THIRD-PARTY.md).

Every generated file carries a header with the version and license, and the CSS exposes `--aipim-version`.
