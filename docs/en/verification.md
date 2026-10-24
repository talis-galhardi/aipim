# Verification

What has been checked on the web components, how, and when. Run `python3 tools/verify_web.py` to repeat it.

**Last verified: 2026-10-07**, in Chromium 148, WebKit 26.4 and Firefox 150 with axe-core 4.14.0, on `components/web/examples/index.html`.

## What passes

| Check | Result |
|---|---|
| Automatic accessibility (axe-core), light and dark theme, in Chromium, WebKit and Firefox | No violations |
| Forced colors (emulated: `forced-colors: active`) in the three engines | Same checks pass (without the contrast rule, which the system palette decides); every control and container keeps a visible edge, and the selected tab keeps its bar |
| Palette contrast (`tools/build_tokens.py`) | 84 checks, 0 failures, plus color blindness simulation. Links must also stand out from the body text (color difference of at least 20) |
| Theme builder (`tools/verify_theme_builder.py`) | With the default colors, the same 57 tones and 82 role colors as `tokens/tokens.json`. A brand color whose pairs fail for color blindness is fixed by tone alone, and suggestions on 200 random themes pass and keep the status colors in their family. The page has no axe violations in light and dark, nor with problems marked and the confirmation open; "See as" filters the preview and counts the problems per kind of vision; a problem in the list leads to its mark, whose tooltip (by pointer or keyboard, closed by Escape) says the same, and a second click makes it blink; exporting a theme with problems asks once and writes the problems into the file |
| Keyboard: tabs (arrows, Home, End), dismiss with Enter, modal open and Escape | Works |
| Brazilian field: the mask while typing and on a value that came with the page, Backspace on a dot or a dash, the check when leaving (CPF, CNPJ with letters, phone, date), the error cleared as soon as the value is valid, an error from the server kept when the person only passes by | Works |
| 200% browser zoom (640 CSS px wide) | No horizontal scroll, no text cut off |
| Reflow at 320 CSS px (400% zoom) | No horizontal scroll |
| Root font size at 200% (a large browser text setting) | No horizontal scroll, text wraps instead of being cut |
| Text spacing from WCAG 1.4.12 (line height 1.5, letter spacing 0.12em, word spacing 0.16em, paragraph spacing 2em) | No text cut off |

## Known limits

- **Touch targets.** The Button small and medium sizes, the standalone link, the small icon button, and the dismiss and remove buttons are smaller than 44px. They meet the WCAG 2.2 AA minimum of 24px (2.5.8), not the 44px comfortable size. Use the large Button and the medium icon button where touch matters.
- **Text fields.** A value longer than the field scrolls inside it, as any native input does.
- **Not tested yet.** Real screen readers (VoiceOver, NVDA, TalkBack), the Safari app itself (WebKit is tested through Playwright), and the real Windows high contrast mode (forced colors is only emulated). The components use native elements and ARIA as documented in each spec, but they have not been tried with these tools.

## How it is checked

`tools/verify_web.py` serves the gallery, loads it in a browser engine through Playwright (Chromium by default; `--browser webkit` or `--browser firefox` for the others, and `--forced-colors` for forced colors), runs axe-core in both themes, drives the keyboard checks, and loads the page at four sizes and settings, looking for horizontal page scroll and for text that escapes its own box. It exits with an error if any check fails. The CI workflow runs it on every push, in the three engines and in forced colors.

When you change a component, run it again and update the date above.
