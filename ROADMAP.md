# Roadmap

What goes into each version of Aipim, the 29 requirements with the status of each one, and what is still open. Use it as the checklist before a release. The short version is in the [README](README.md#roadmap); the history of what already shipped is in the [CHANGELOG](CHANGELOG.md).

Status as of 2026-10-24. This file used to be a page of the Figma file. It moved here so it has one source of truth, next to the code it describes.

## Versions

| Version | Status | What it brings |
|---|---|---|
| v0.1 | Done | The Figma file structure, the palette, the type and the generated tokens |
| v1.0 | Done, released 2026-10-13 | Figma variables in light and dark and the components; tokens in CSS (the Compose and Swift files are generated, not yet tested in an app); the HTML and CSS components, checked in three browsers; the Storybook in Brazilian Portuguese and English; the npm package `aipim-ds`; the AI files (`llms.txt`, `llms-full.txt`, `AGENTS.md`); tutorials for designers, developers and AI agents; illustrations for the states of the interface, by Luiz Fukumoto; the project files (licenses, security policy, contributing guide, code of conduct) |
| v1.1 | In progress | The Brazilian field is done, in beta, in code and in Figma: CPF, CNPJ (with letters too), CEP, phone, dates as dd/mm/aaaa and amounts in reais, with masks and clear errors. Still to come: a Pix payment flow and a WhatsApp button; accessibility in the Brazilian context (LBI, eMAG, and Libras where it fits); Brazilian icons and more illustrations; work with Brazilian designers to replace the fonts and icons with theirs; complete flow patterns (moved from v1.0); illustrations that follow the theme colors |
| v1.5 | Later | MCP server, agent usage tests, the Claude skill (moved from v1.0), starters for Vite and Next (moved from v1.0). The theme builder was planned here and shipped early: it is online and goes into the next release. |
| v2.0 | If it gains traction | Native components (Compose and SwiftUI), more components and patterns |

## Requirements

The priority is Must (v1), Should (v1 or v1.5) or Could (v2). The status is Done, Partial (what is missing is written in the note) or Later (moved to a next version).

Of the 29, 19 are done, 6 are partial and 4 are later.

### Use and integration

| # | Priority | Requirement | Status | Note |
|---|---|---|---|---|
| R1 | Must | Start in 5 minutes, with starters | Partial | The install guide and the npm package are ready; the starters come in v1.5 |
| R2 | Must | No tie to a framework | Done | |
| R3 | Must | Copied code, and tokens as a package | Done | `aipim-ds` on npm |
| R4 | Should | Install with one command | Done | `npm install aipim-ds` |

### Customization

| # | Priority | Requirement | Status | Note |
|---|---|---|---|---|
| R5 | Must | A theme in a small file | Done | The seeds at the top of `tools/build_tokens.py`, or one CSS file from the theme builder |
| R6 | Must | Contrast and color blindness checked when customizing | Done | 84 contrast checks and the color-blindness pairs, in the generator and in the theme builder |
| R7 | Must | Light and dark by an attribute | Done | |
| R8 | Must | Only semantic tokens, no `!important` | Done | |
| R9 | Should | A visual theme builder | Done | Online at https://talisgalhardi.com/aipim/theme-builder/, with the Aipim Theme plugin for Figma |
| R10 | Should | Illustrations in the theme colors | Later | Planned for v1.1: today the ten illustrations have fixed colors |

### Design and code

| # | Priority | Requirement | Status | Note |
|---|---|---|---|---|
| R11 | Must | `tokens.json` generates CSS, native, Figma and Markdown | Done | The native files are not yet tested in an app |
| R12 | Must | A check against drift in CI | Done | |
| R13 | Must | Semver, a changelog and migration notes | Done | |

### Accessibility

| # | Priority | Requirement | Status | Note |
|---|---|---|---|---|
| R14 | Must | WCAG 2.2 AA, AAA for body text, visible focus, never state by color alone | Done | Automatic checks in three browsers |
| R15 | Must | Keyboard, ARIA and screen readers documented per component | Partial | Keyboard and ARIA are documented; the manual test with screen readers is still missing |
| R16 | Must | 200% zoom, rem, reduced motion | Done | |

### Documentation

| # | Priority | Requirement | Status | Note |
|---|---|---|---|---|
| R17 | Must | Usage guidance written by hand | Done | |
| R18 | Must | Examples that work, with a copy button | Done | The Storybook |
| R19 | Must | Foundations with voice and microcopy | Done | |
| R20 | Must | Complete flow patterns | Later | v1.1 (moved from v1.0). The Figma file has four example screens in the meantime |
| R21 | Must | Brazilian Portuguese and English in v1.0 | Done | The Storybook in both languages, the Figma file in Portuguese, GitHub in English |
| R22 | Should | Explain why each decision was made | Partial | Written on some pages (the Text field spec, the theme builder page) |
| R29 | Must | Tutorials for designers, developers and AI agents | Done | |

### LLMs

| # | Priority | Requirement | Status | Note |
|---|---|---|---|---|
| R23 | Must | Structured Markdown, `llms.txt`, `AGENTS.md` and a skill | Partial | The files are ready; the Claude skill comes later (v1.5) |
| R24 | Should | MCP server | Later | v1.5 |
| R25 | Should | Tests that measure how agents use it | Later | v1.5 |

### Identity and licenses

| # | Priority | Requirement | Status | Note |
|---|---|---|---|---|
| R26 | Must | A Brazilian identity, with respect, and OFL fonts hosted in the package | Partial | The fonts are OFL; hosting the font files in the package is the next step |
| R27 | Must | Open and explicit licenses, nothing taken from proprietary work | Done | |

### Platforms

| # | Priority | Requirement | Status | Note |
|---|---|---|---|---|
| R28 | Must (v1), Could (v2) | Web and native tokens in v1; Compose and SwiftUI components in v2 | Partial | Done for the web; the Compose and Swift files are generated, not yet tested in an app. Native components: v2.0 |

## Open items

**Distribution.** The Storybook is published in Portuguese and English, `aipim-ds` 1.0.0 is on npm, the file is on the Figma Community, and the AI files are done. If the project grows, it moves to a GitHub organization.

**To review in accessibility.**

- Touch targets under 44px: the small and medium Button, the standalone link and the small icon button.
- Color pairs outside the 84 checks, as the components grow.

**Planned for identity and credits.** The Brazilian icon set (v1.1), and the font files hosted in the package (R26).

## Research and decisions

Two rounds of research shaped Aipim. The first one asked what hurts the people who use design systems. The answers were adoption, drift between Figma and code, customizing and overriding, updates that break, and docs that go out of date. The second asked what makes a system loved. The answers were code that belongs to the developer, accessibility from the start, a simple install and docs written by hand.

What is already decided:

- **Name:** Aipim.
- **Fonts:** Antonio and Karla.
- **Licenses:** MIT for the code, CC BY 4.0 for the design files and the docs.
- **Language:** Brazilian Portuguese and English in the Storybook, Portuguese in Figma and English on GitHub.
