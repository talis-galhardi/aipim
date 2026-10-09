# AGENTS.md: building with Aipim

Aipim is a small, open, Brazilian design system with all the parts in place: foundations (tokens), 17 HTML and CSS components, 63 line icons, one Markdown spec per component and a token generator that enforces accessibility checks.
This file tells an AI agent how to build interfaces with it. Read it first, then read the spec of every component you use.

- Repository: https://github.com/talis-galhardi/aipim
- Index for agents: `llms.txt` (links) and `llms-full.txt` (everything in one file)
- Specs: `docs/en/components/<name>.md`. Step-by-step tutorials for designers, developers and AI agents: `docs/en/tutorials-designers.md`, `docs/en/tutorials-developers.md` and `docs/en/tutorials-ai.md`. Words in the interface: `docs/en/voice-and-microcopy.md`. What was verified: `docs/en/verification.md`. How a component page is laid out in Figma: `docs/en/documentation-layout.md`. Brand patterns and the ornament: `docs/en/patterns-and-ornament.md`. Foundations: `docs/en/color.md`, `docs/en/typography.md`, `docs/en/space-shape-motion.md`

## The rules

1. **Colors come from semantic tokens only.** Use `var(--aipim-bg-surface)`, `var(--aipim-text-primary)`, `var(--aipim-action-primary-bg)` and the other roles in `docs/en/color.md`. Never write a hex value. Never use a primitive (`--aipim-color-primary-700`) inside a component: primitives exist to generate the roles and to customize.
2. **Spacing, radius, borders, sizes, durations and z-index come from tokens.** `var(--aipim-space-16)`, `var(--aipim-radius-md)`, `var(--aipim-border-thin)`, `var(--aipim-size-control-md)`, `var(--aipim-duration-base)`. If a value has no token, the spec of that component says so.
3. **State is never shown by color alone.** Every state carries an icon and text (an error has an icon and a message, a selected tab has a bar).
4. **Use native elements.** `button` for actions, `a` for navigation, `input` with a real `label`, `dialog` for modals, `nav` and `header` for landmarks.
5. **Every interactive element has a visible focus ring**: `outline: var(--aipim-border-thick) solid var(--aipim-focus-ring); outline-offset: var(--aipim-focus-offset)` on `:focus-visible`. The components already do this. Do not remove it.
6. **A button with only an icon needs an `aria-label`.** The icon itself is `aria-hidden="true"`. Use the Icon button component for that.
7. **Disabled** means the native `disabled` attribute (or `aria-disabled="true"` on a link). The look comes from `--aipim-opacity-disabled`.
8. **Headings use Antonio, text uses Karla**, through the text tokens (`--aipim-text-h2-size`, `--aipim-text-body-size` and so on). Body text is at least 16px.
9. **Dark theme is an attribute**: `<html data-theme="dark">`, or it follows the system. Never hard-code a color for one theme.
10. **No `!important`.** To customize a component, set its own variables (`--aipim-button-bg`, `--aipim-button-height`...) or override the semantic tokens.
11. **Do not edit generated files**: `tokens/build/*`, `tokens/tokens.json`, `docs/en/color.md`, `docs/en/typography.md`, `docs/en/space-shape-motion.md`, `components/web/aipim-components.css`, `llms.txt`, `llms-full.txt`. Change the source and rebuild (see "Verify").
12. **Text follows the voice**: warm, direct, specific. An error says what happened and what to do, without blaming ("Check your card details and try again", not "Something went wrong"). Buttons use verbs.

## Set up

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Antonio:wght@600;700&family=Karla:wght@400;700&display=swap">
<link rel="stylesheet" href="tokens/build/css/aipim.css">      <!-- tokens (--aipim-*), light and dark -->
<link rel="stylesheet" href="components/web/aipim-components.css"> <!-- all components; or load only the files you need -->
<script src="components/web/aipim.js"></script>                 <!-- optional: tabs keys, dismiss buttons, dialog commands -->

<body style="background:var(--aipim-bg-canvas);color:var(--aipim-text-primary);font:var(--aipim-text-body-size) var(--aipim-font-body)">
```

Icons: `<svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-close"></use></svg>`. The 63 names are in `icons/icons.json`.

## Components

Class names are `aipim-<component>`, parts are `aipim-<component>__<part>`, variants are `aipim-<component>--<variant>`.

<!-- components:start -->
| Component | Root class | Use it for | Spec |
|---|---|---|---|
| Button | `aipim-button` | The main action of a screen or block. | `docs/en/components/button.md` |
| Icon button | `aipim-icon-button` | A button that shows only an icon. | `docs/en/components/icon-button.md` |
| Link | `aipim-link` | Takes the reader to another page or section. | `docs/en/components/link.md` |
| Badge | `aipim-badge` | A small mark with a numeral or an icon, next to text. Decorative. | `docs/en/components/badge.md` |
| Tag | `aipim-tag` | A short label for a category, a technology or a status. | `docs/en/components/tag.md` |
| Checkbox | `aipim-checkbox` | Lets a person pick any number of independent options. | `docs/en/components/checkbox.md` |
| Radio | `aipim-radio` | Lets a person pick one option from a short list. | `docs/en/components/radio.md` |
| Switch | `aipim-switch` | Turns a setting on or off, and the change applies right away. | `docs/en/components/switch.md` |
| Text field | `aipim-field` | A single-line field for short typed text, with a visible label above it. | `docs/en/components/text-field.md` |
| Alert | `aipim-alert` | An important message that stays visible on the page. | `docs/en/components/alert.md` |
| Toast | `aipim-toast` | A quick confirmation that goes away on its own. | `docs/en/components/toast.md` |
| Tabs | `aipim-tabs` | Switches between views of the same content. | `docs/en/components/tabs.md` |
| Card | `aipim-card` | Groups related content on one surface. It can be a single link. | `docs/en/components/card.md` |
| Empty state | `aipim-empty-state` | What a list, search or area shows when there is nothing to show yet. | `docs/en/components/empty-state.md` |
| Top bar | `aipim-top-bar` | The title of a screen, with a back button and up to two actions. | `docs/en/components/top-bar.md` |
| Tab bar | `aipim-tab-bar` | The main navigation on phones, with three to five destinations. | `docs/en/components/tab-bar.md` |
| Modal | `aipim-modal` | A decision or short task that needs attention, on top of the page. | `docs/en/components/modal.md` |
<!-- components:end -->

## Patterns that are easy to get wrong

- **A form field has its label above it**, always visible; the placeholder never replaces it. Helper and error text are linked with `aria-describedby`, and an invalid field has `aria-invalid="true"`.
- **A badge is decorative**: it has `aria-hidden="true"` and the meaning stays in the text next to it. Never use one alone to show information.
- **One primary button per screen.** The other actions are secondary, outline or ghost.
- **Errors that stay on the page are an Alert** (`role="alert"` for errors, `role="status"` for the rest). A passing confirmation is a Toast. A decision that needs attention is a Modal.
- **A clickable card is one link**: the link is inside the title and covers the card. Do not put buttons or links inside an interactive card.
- **Tabs switch views of the same content; the Tab bar moves between the main sections of an app.** Do not use one for the other.
- **A modal is a `dialog` opened with `showModal()`** (or `command="show-modal"`), with a title linked by `aria-labelledby` and a close button.
- **Do not nest components that compete** (a card in a card, two primary buttons side by side).

## Verify

```bash
python3 tools/build_tokens.py --check   # accessibility checks of the palette (contrast and color blindness)
python3 tools/build_tokens.py           # regenerate tokens, the color, type and space docs
python3 tools/build_web.py --check      # components/web/aipim-components.css is up to date
python3 tools/build_tutorials.py --check # the three tutorials in docs/en are up to date
python3 tools/build_ai.py --check       # llms.txt, llms-full.txt and the table above are up to date
python3 tools/verify_web.py            # axe, keyboard, 200% zoom, 320px reflow and text spacing in Chromium (needs Playwright and `npm install`)
```

Open `components/web/examples/index.html` to see every component with a light and dark toggle.

Before you finish a screen, check:

- [ ] Only `--aipim-*` variables for color and size, no hex
- [ ] Every control reachable and visible by keyboard
- [ ] Every icon-only button has an `aria-label`
- [ ] Every field has a visible label
- [ ] No state conveyed by color alone
- [ ] It works in light and dark, and at 200% zoom

## Customize

The palette is generated. Open `tools/build_tokens.py`, change the seeds at the top (hue and chroma per color) and run `python3 tools/build_tokens.py`. It rebuilds every scale and output and fails if a pair no longer meets contrast.

## Licenses

Code: MIT. Design files and docs: CC BY 4.0 (credit "Aipim design system by Talis Galhardi"). Fonts: SIL Open Font License 1.1. Icons: Hugeicons Free, MIT (see `THIRD-PARTY.md`).
