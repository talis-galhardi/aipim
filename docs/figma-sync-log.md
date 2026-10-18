# Figma sync log

How far the Figma file is from the repository, and what each check found. Read it before you touch the Figma file. Add an entry after every pass.

Figma file: `figma.com/design/iVcCVMsFIyb73AChmjlytU` (the Community copy is published from it). The rules for building a page are in [documentation-layout.md](documentation-layout.md).

## What the file has to match

The repository is the source. Figma follows it, never the other way around.

| In Figma | Source in the repository | How to check |
|---|---|---|
| Variables (Primitives, Semantic in Light and Dark, Space and shape) | `tokens/build/figma.json`, generated from `tokens/tokens.json` | Read every variable with the Plugin API and compare names and values. Pattern palette has no source in the repository. |
| Color and measurement tables of each component page | `docs/en/components/*.md`, sections "Tokens used" | Compare token and hex for color rows, token and numbers for measurements. Rows about the focus ring live in the prose of the spec, not in a table. |
| Anatomy and measurement drawings | The component itself | Each marker line meets the middle of its part, each text outline fits its glyphs, each measurement line is as long as its label and ends on an edge of the component. |
| Numbers and claims on the docs pages (components, icons, checks, versions, dates) | `README.md`, `ROADMAP.md`, `CHANGELOG.md`, `icons/icons.json` | Search the text for numbers, "tema", "em breve", "v1.1" and dates, and compare. |
| Links | GitHub, npm, Storybook | No link may point to a deleted page or through a redirect. |

What Figma has and the repository does not, on purpose: the brand masters (patterns, ornament, symbol, lockup), the documentation kit, and the drafts. The six Brazilian icons drawn in Figma (christ-the-redeemer, chinelos, toucan, pandeiro, football, brazil-map) are not in `icons/` yet; they belong to v1.1.

## Passes

Most recent first. Each entry says the commit, what changed in Figma and what is still known to be different.

### 2026-10-17 · full review after Talis aligned the component drawings

Repository: `e067247` on main, plus the branch `figma-file-cleanup`.

Checked and found equal: the 141 variables, and the color and measurement tables of the 17 components.

Changed in Figma:

- Anatomy: markers were off the middle of their part in Button, Checkbox, Radio and Switch (4.5px), Link (13.5px), Text field (1.5 to 3px), Alert and Toast (5 to 13px) and Top bar (7px), in light and in dark. The outlines of "Título" in Alert and Top bar and of the label and helper of the Text field were narrower than the text.
- Measurements: on every component page, the labels sat 1.5px off the middle of their line.
- Card: the focus ring was invisible, because the card clips its content. The focus variants no longer clip, and the media takes `radius/xl` on its top corners. With media, the body now starts 24px below it, as in `card.css`, so the card is 329px tall like its spec.
- Sections: 33 sections were shorter than their page and cut off the footer, by up to 2177px (Ilustrações).
- Text: Comece aqui and Sobre said 63 icons (there are 64). Sobre dated v1.0 on 12 October (the tag is from 13 October). Ilustrações said the scenes follow the theme colors and pointed to the old page "Padrões e telas". A reference link went through a Google search URL.

Still different, on purpose:

- The six Brazilian icons exist only in Figma (see above).
- The references of Ilustrações cite chapters and pages that were not checked against the books.
