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

## Where things live (edit the source, not the generated file)

| You want to change | Edit | Then run |
|---|---|---|
| A color, the type scale, spacing, motion | the seeds and scales in `tools/build_tokens.py` | `python3 tools/build_tokens.py` |
| A component | `components/web/<name>.css` and its spec in both languages, `docs/en/components/<name>.md` and `docs/pt-br/components/<name>.md` | `python3 tools/build_web.py`, `python3 tools/build_ai.py` and `python3 tools/check_translation.py` |
| The example gallery | `components/web/examples/index.html` (the stories cut their markup from it) | |
| A story | `stories/<level>/<name>.stories.js`, and the words of the examples in both languages in `.storybook/i18n.js` | |
| A docs page of the Storybook | `stories/en/<name>.mdx` and `stories/pt-br/<name>.mdx` | `python3 tools/check_translation.py` |
| A tutorial | `tools/tutorials_content.py` and `tools/tutorials_content_pt.py` | `python3 tools/build_tutorials.py` |
| Icons | `tools/build_icons.py` | |

These are generated: do not edit them by hand. `tokens/build/*`, `tokens/tokens.json`, `docs/{en,pt-br}/color.md`, `docs/{en,pt-br}/typography.md`, `docs/{en,pt-br}/space-shape-motion.md`, the tutorials in `docs/{en,pt-br}/`, `components/web/aipim-components.css`, `llms.txt`, `llms-full.txt` and the component table in `AGENTS.md`.

## Run the checks

```bash
python3 tools/build_tokens.py --check   # contrast and color blindness checks of the palette
python3 tools/build_web.py --check      # the CSS bundle is up to date
python3 tools/build_tutorials.py --check # the six tutorials, in docs/en and docs/pt-br, are up to date
python3 tools/check_copy.py             # the writing rules below, in English and in Portuguese
python3 tools/check_translation.py      # the Portuguese docs are in step with the English ones
python3 tools/build_ai.py --check       # llms.txt, llms-full.txt and the table in AGENTS.md are up to date
npm install && python3 tools/verify_web.py   # axe, keyboard, 200% zoom, 320px reflow, text spacing (needs Playwright)
```

The same checks run on every pull request. To see your change in the documentation, run `npm run storybook` (Portuguese) or `npm run storybook:en` (English).

## A new component, in short

1. The spec first: `docs/en/components/<name>.md` (when to use it, anatomy, variants, states, tokens, keyboard, ARIA, examples), following an existing one, and its translation in `docs/pt-br/components/<name>.md`.
2. The CSS in `components/web/<name>.css` using only tokens, then the markup in the example gallery.
3. A story file with a "Default" story and a "Do and don't" story.
4. Run the checks above and describe what you tested (keyboard, screen reader, zoom, light and dark) in the pull request.

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
