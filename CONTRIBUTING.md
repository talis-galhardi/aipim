# Contributing to Aipim

Thank you for wanting to help. Aipim is small and has one maintainer, so a short conversation before a big change saves everyone time: open an issue first (there is a form for ideas and one for bugs).

By taking part you agree to the [code of conduct](CODE_OF_CONDUCT.md). By contributing you agree that your code is under the [MIT license](LICENSE) and your design files and documentation under [CC BY 4.0](LICENSE-DESIGN.md).

## What is welcome

- Bug and accessibility reports, with a link to the story or the smallest HTML that shows the problem.
- Fixes to the components, tokens, docs and tools.
- Documentation and microcopy in Brazilian Portuguese: it is the next priority on the [roadmap](README.md#roadmap).
- A new component or pattern, if it solves a real screen and keeps the rules below. Please discuss it in an issue before you build it.

## Before you start

Read [AGENTS.md](AGENTS.md) (it is written for AI agents, and it is also the shortest list of the rules) and the spec of any component you touch, in `docs/en/components/`. The rules that matter most:

1. Colors come from **semantic tokens** only (`--aipim-bg-surface`, `--aipim-text-primary`...). Never a hex value, never a primitive inside a component.
2. Spacing, radius, borders, sizes, durations and z-index come from tokens too.
3. **Native elements** (`button`, `a`, `dialog`, a real `label`). State is never shown by color alone.
4. Every interactive element keeps a visible focus ring. A button with only an icon has an `aria-label`.
5. No `!important`. Customize through the component's own variables or the semantic tokens.

## Where things live (edit the source, not the generated file)

| You want to change | Edit | Then run |
|---|---|---|
| A color, the type scale, spacing, motion | the seeds and scales in `tools/build_tokens.py` | `python3 tools/build_tokens.py` |
| A component | `components/web/<name>.css` and its spec `docs/en/components/<name>.md` | `python3 tools/build_web.py` and `python3 tools/build_ai.py` |
| The example gallery | `components/web/examples/index.html` (the stories cut their markup from it) | |
| A story | `stories/<name>.stories.js` | |
| Icons | `tools/build_icons.py` | |

These are generated: do not edit them by hand. `tokens/build/*`, `tokens/tokens.json`, `docs/en/color.md`, `docs/en/typography.md`, `docs/en/space-shape-motion.md`, `components/web/aipim-components.css`, `llms.txt`, `llms-full.txt` and the component table in `AGENTS.md`.

## Run the checks

```bash
python3 tools/build_tokens.py --check   # contrast and color blindness checks of the palette
python3 tools/build_web.py --check      # the CSS bundle is up to date
python3 tools/build_workflow.py --check # docs/en/workflow.md is up to date
python3 tools/build_ai.py --check       # llms.txt, llms-full.txt and the table in AGENTS.md are up to date
npm install && python3 tools/verify_web.py   # axe, keyboard, 200% zoom, 320px reflow, text spacing (needs Playwright)
```

The same checks run on every pull request. To see your change in the documentation, run `npm run storybook`.

## A new component, in short

1. The spec first: `docs/en/components/<name>.md` (when to use it, anatomy, variants, states, tokens, keyboard, ARIA, examples), following an existing one.
2. The CSS in `components/web/<name>.css` using only tokens, then the markup in the example gallery.
3. A story file with a "Default" story and a "Do and don't" story.
4. Run the checks above and describe what you tested (keyboard, screen reader, zoom, light and dark) in the pull request.

## Pull requests

- One change per pull request, with the reason in the description. The template has the checklist.
- Add a line to the "Unreleased" part of [CHANGELOG.md](CHANGELOG.md). Before 1.0.0 a minor version may break things, and it is listed under "Changed".
- Writing style for texts in the interface and the docs: warm, direct, specific, with verbs on buttons (see `docs/en/voice-and-microcopy.md`).
