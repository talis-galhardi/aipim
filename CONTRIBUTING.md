# Contributing to Aipim

Thank you for wanting to help. Aipim is small and has one maintainer, so a short conversation before a big change saves everyone time: open an issue first (there is a form for ideas and one for bugs).

By taking part you agree to the [code of conduct](CODE_OF_CONDUCT.md). By contributing you agree that your code is under the [MIT license](LICENSE) and your design files and documentation under [CC BY 4.0](LICENSE-DESIGN.md).

## What is welcome

- Bug and accessibility reports, with a link to the story or the smallest HTML that shows the problem.
- Fixes to the components, tokens, docs and tools.
- Reviews of the Brazilian Portuguese docs and of the English ones: a word that sounds translated, a sentence that could be plainer.
- A new component or pattern, if it solves a real screen and keeps the rules below. Please discuss it in an issue before you build it.

## Before you start

Read [AGENTS.md](AGENTS.md) (it is written for AI agents, and it is also the shortest list of the rules) and the spec of any component you touch, in `docs/en/components/` (the same specs in Portuguese are in `docs/pt-br/components/`). The rules that matter most:

1. Colors come from **semantic tokens** only (`--aipim-bg-surface`, `--aipim-text-primary` and the rest). Never a hex value, never a primitive inside a component.
2. Spacing, radius, borders, sizes, durations and z-index come from tokens too.
3. **Native elements** (`button`, `a`, `dialog`, a real `label`). State is never shown by color alone.
4. Every interactive element keeps a visible focus ring. A button with only an icon has an `aria-label`.
5. No `!important`. Customize through the component's own variables or the semantic tokens.

## Repository layout

| Folder | What it is |
|---|---|
| `tokens/` | `tokens.json` in the W3C Design Tokens format, written by `tools/build_tokens.py`, and `build/` with the CSS, the Compose and Swift files (generated, not yet compiled in an app) and the Figma variables |
| `components/web/` | One CSS file per component, `aipim-components.css` with all of them, the optional `aipim.js`, and `examples/index.html`, the gallery that the stories and the browser checks read |
| `icons/`, `illustrations/` | The 64 line icons (`svg/`, `sprite.svg`, `icons.json`) and the ten illustrations (`svg/`, `illustrations.json`) |
| `docs/en/`, `docs/pt-br/` | The spec of each component (`components/`), the foundations and the tutorials (generated), voice and microcopy, the verification record and the brand patterns, in both languages |
| `stories/`, `.storybook/` | The Storybook, in two languages. It is documentation only, not a package |
| `theme-builder/`, `figma-plugin/` | The theme builder page and the Aipim Theme plugin for Figma |
| `tools/` | The generators (`build_*`), the checks (`check_*`, `verify_*`), `check.py`, which runs the quick ones, and `aipim_tools.py`, which they share |
| The root | README, AGENTS.md and the AI files, CHANGELOG, ROADMAP, the licenses and the project files |

## Where things live (edit the source, not the generated file)

| You want to change | Edit | Then run |
|---|---|---|
| A color, the type scale, spacing, motion | the seeds and scales in `tools/build_tokens.py`. The theme builder takes the seeds, scales, semantic tones and checks from there (`python3 tools/build_web.py`); a change to how they are computed goes into `theme-builder/theme.js` too | `python3 tools/build_tokens.py`, `python3 tools/build_web.py` and `python3 tools/verify_theme_builder.py` |
| A breakpoint, or any media query | the scale is `BREAKPOINT` in `tools/build_tokens.py`. CSS cannot read a token in a media query, so the width is written as a number; one outside the scale needs a `breakpoint: <width>` comment above the rule saying what it answers to instead | `python3 tools/check_breakpoints.py` |
| The theme builder or the Figma plugin | `theme-builder/` and `figma-plugin/` | `python3 tools/verify_theme_builder.py --browser` |
| A component | `components/web/<name>.css` and its spec in both languages, `docs/en/components/<name>.md` and `docs/pt-br/components/<name>.md` | `python3 tools/build_web.py`, `python3 tools/build_ai.py` and `python3 tools/check_translation.py` |
| A mask or a check of the Brazilian field | `components/web/aipim-br.js`, the module a server or a test imports. `tools/build_web.py` copies it into `components/web/aipim.js` between the `br:` markers, so never edit that copy | `python3 tools/build_web.py` |
| The example gallery | `components/web/examples/index.html` (the stories cut their markup from it) | |
| A story | `stories/<level>/<name>.stories.js`, and the words of the examples in both languages in `.storybook/i18n.js` | |
| A docs page of the Storybook | `stories/en/<name>.mdx` and `stories/pt-br/<name>.mdx` | `python3 tools/check_translation.py` |
| A release, or a change of plan | `CHANGELOG.md` and the version table of `ROADMAP.md`, then the summary in `stories/en/whats-new.mdx` and `stories/en/roadmap.mdx` and their Portuguese pages | `python3 tools/check_releases.py`, `python3 tools/check_translation.py` |
| A tutorial | `tools/tutorials_content.py` and `tools/tutorials_content_pt.py` | `python3 tools/build_tutorials.py` |
| Icons | `tools/build_icons.py` | |
| A page of the Figma file | the file itself, following `docs/documentation-layout.md` (the rules of every docs page, from the masthead to the drawings) | log the pass in `docs/figma-sync-log.md` |
| The verification record | `docs/en/verification.md` and `docs/pt-br/verification.md`, after a run of `tools/verify_web.py` on purpose | `python3 tools/check_translation.py` |

Some files, and some parts of files, are generated: the list is rule 11 of [AGENTS.md](AGENTS.md). Edit the source and run the script.

## Run the checks

```bash
python3 tools/check.py      # every quick check (or npm run check); the list is in that file
npm run check:browser       # the components, the theme builder and the Storybook in a browser (needs Playwright and npm install)
```

The same checks run on every pull request. To see your change in the documentation, run `npm run storybook` (Portuguese) or `npm run storybook:en` (English).

## A new component, in short

1. The spec first: `docs/en/components/<name>.md`, following an existing one. Its `group:` (atoms, molecules or organisms) puts it in the sidebar, the AI files and the lists of components. In the token table, write the token names and any hex: `tools/build_specs.py` fills in the colors. Then its translation in `docs/pt-br/components/<name>.md`.
2. The CSS in `components/web/<name>.css` using only tokens, added to `FILES` in `tools/build_web.py` (the order is the cascade order), then the markup in the example gallery.
3. A story file in `stories/<group>/<name>.stories.js`, copied from another one: the three stories come from `stories/_stories.js`. Add its Default to `stories/_iconic.js` and its do and don't to `stories/_dodont.js`.
4. Run `python3 tools/build_specs.py`, `python3 tools/build_web.py` and `python3 tools/build_ai.py`, then the checks above, and describe what you tested (keyboard, screen reader, zoom, light and dark) in the pull request.

## Pull requests

- One change per pull request, with the reason in the description. The template has the checklist.
- Add a line to the "Unreleased" part of [CHANGELOG.md](CHANGELOG.md). Before 1.0.0 a minor version may break things, and it is listed under "Changed".
- Interface text follows the voice guide (`docs/en/voice-and-microcopy.md`): warm and to the point, with a verb on every button. The docs follow the writing rules below.

## Writing

The docs are written in two languages. English is the source (`docs/en`, `stories/en`, the README and `AGENTS.md`) and Brazilian Portuguese is its translation (`docs/pt-br`, `stories/pt-br`). The Storybook has both, Portuguese first; the Figma file is in Portuguese. Component, variant, property and token names stay in English everywhere, because they are the names in the code.

The writing rules come from the maintainer's copy guide. `tools/check_copy.py` checks the ones a script can see:

- No em dash (the long dash, U+2014). Use a period, a comma, a colon or parentheses.
- None of the words and phrases that make a text sound generated, in either language (for example "leverage", "seamless", "robust", "crucial"; "robusto", "abrangente", "alavancar", "vale ressaltar", "nesse sentido"). The full lists are in the script.
- No gerund or participle tacked on to the end of a sentence (", ensuring...", ", garantindo..."). Write a new sentence.
- No exclamation mark and no ellipsis in the prose. Interface text in quotes may keep them ("Saved!", "Sending...").

And the ones a reviewer checks:

- No list of three matching items, of adjectives above all. Use two, four or more, or break the pattern of the third.
- Vary the length of the sentences: a short one next to a long one, never three of the same size in a row.
- Every claim has its fact next to it: a number, a token, a rule. No "world-class", no "cutting-edge".
- A technical term gets a short explanation the first time it appears on a page.
- In Portuguese, use the words Brazilians use at work: "você", "especificação", "rótulo", "anel de foco", "leitor de tela", "padronagem" for a brand pattern, "faça e não faça". Keep code and product terms as they are (hover, toast, pull request).

## Translation

Every Portuguese file ends with a stamp of the English file it was translated from. When you change an English doc, carry the change over to the Portuguese one and stamp it again:

```bash
python3 tools/check_translation.py                                    # lists what is missing or out of step
python3 tools/check_translation.py --stamp docs/pt-br/components/button.md   # after you update the translation
```

The check also compares the shape of the two files (frontmatter, sections, tables, rows and code blocks), so a section left out in one language fails. The generated docs (color, typography, space and the tutorials) are written in both languages by their generators: change the text in `tools/build_tokens.py` or in `tools/tutorials_content*.py`.
