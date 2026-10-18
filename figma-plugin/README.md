# Aipim Theme, the Figma plugin

It applies a theme made in the [Aipim theme builder](https://talisgalhardi.com/aipim/theme-builder/) to the variables of an Aipim file. It changes the colors of the `Primitives` collection and where each role of the `Semantic` collection points, in `Light` and `Dark`. It only edits variables that already exist, so components, styles and the bindings in your screens stay as they are and take the new colors.

## Use it

1. In the theme builder, make your theme. When every check passes, click **Copy for Figma**.
2. Open your copy of the Aipim file (duplicated from the Figma Community). The plugin edits the file's own variables, so run it in the file that holds the library, not in a file that only uses it.
3. Run **Aipim Theme**, paste and click **Check**. It says how many colors and roles it found. Then click **Apply theme**.
4. Publish the library, so the files that use it get the new colors.

To go back, apply the default theme: open the builder, click **Back to the Aipim colors** and copy again.

## Install it before it is in the Community

In the Figma desktop app: **Plugins > Development > Import plugin from manifest** and pick `figma-plugin/manifest.json` from this repository. It then shows under **Plugins > Development**.

Publishing it to the Community gives it a real `id` in `manifest.json` (today a placeholder, `aipim-theme`). The icon, the cover and the text of the Community page are in [community/](community/listing.md).

## What it reads

The text the builder copies is JSON: `primitives` (the Figma name of each tone and its hex, like `"color/primary/700": "#b43000"`) and `semantic` (per mode, the Figma name of each role and the tone it points to, like `"action/primary/bg": "color/primary/700"`). A theme exported with accessibility problems also carries `failures`, the list of what does not pass; the plugin applies the theme the same way and does not read that list. The plugin needs no network access.
