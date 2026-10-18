# Aipim Theme in the Figma Community

What to paste in the Figma publish form. `icon.png` (128×128) and `cover.png` (1920×1080) sit next to this file.

## Name

Aipim Theme

## Tagline

Apply a theme from the Aipim theme builder to the variables of your Aipim file.

## Description

Aipim Theme brings your brand colors into your copy of the Aipim design system file.

1. Make a theme in the Aipim theme builder: https://talisgalhardi.com/aipim/theme-builder/. It checks contrast and color blindness while you pick the colors.
2. Click "Copy for Figma".
3. Open your copy of the Aipim file, run the plugin and paste. "Check" says what it found; "Apply theme" changes the file.

The plugin changes the color primitives and where each semantic role points, in light and dark. It only edits variables that already exist. Components, styles and the bindings in your screens keep working and take the new colors. A theme with a broken color is refused before anything changes.

To go back to the Aipim colors, click "Back to the Aipim colors" in the builder and apply again.

No network access, no data collected. Open source under the MIT license: https://github.com/talis-galhardi/aipim

## Tags

design system, theme, variables, color, accessibility, tokens

## Support contact

https://github.com/talis-galhardi/aipim/issues

## Data and security questions

The plugin makes no network requests (`networkAccess` is `none` in the manifest) and stores or sends no data. It reads and edits only the local color variables of the open file.
