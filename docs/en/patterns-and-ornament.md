# Patterns and the florão

Aipim has four brand patterns and one small ornament. They come from things in the Brazilian home, they are drawn in the same way (ink line, color printed a little off the line, shades of terracotta with a few accents) and they live in the Figma file as two components, so a change is made once and every use follows. They decorate. They never carry information.

## The elements

| Element | Name | Job | Architectural reference | Aesthetic reference |
|---|---|---|---|---|
| Cacos | Cacos (piso de cacos) | Signature: hero areas, covers, social images | Broken ceramic laid like a mosaic on floors and walls of houses in São Paulo, popular in the middle class from the 1970s to the 2000s | Irregular red, yellow and black pieces held by joints; the mended pot, broken and whole again |
| Hydraulic tile | Ladrilho hidráulico | Surface: card headers, dividers, empty states | Cement tiles on the floors of hallways, kitchens and porches of Brazilian houses, from the end of the 19th century | Bold geometric motifs in a checkerboard; flat colors and a hand-pressed look |
| Cobogó | Cobogó | Structure: side panels, banners, frames around images | Hollow blocks stacked as walls that let air and light through, created in Recife in the 1920s and embraced by Brazilian modernist architecture | Light and shadow through a repeated opening; rhythm and shade |
| Petals | Pétalas | Quiet: behind forms, empty states, long pages | Overlapping-petal lattices on kitchen and bathroom tile walls, from the azulejo tradition to cement tiles | Rosettes made by overlapping circles; a quiet tone-on-tone rhythm |
| Ornament | Florão | The small signature: markers, dividers, stamps on cards | The florão: the ornamental rosette at the center of the ceilings of colonial and imperial Brazilian houses | A small four-fold flower, like a printer's fleuron: a quiet mark that signs a place |

The historical statements are being backed by academic references, which are collected in the brand manual of the Figma file.

## Palettes

There are two palettes, set by the variable collection `Pattern palette` (two modes, nine variables):

- **Aipim**: terracotta shades and cream, with small accents of yellow, azulejo blue and folha green.
- **Traditional**: terracotta shades, pale yellow and a little black, the way the real floors look.

The Petals pattern is tone on tone and uses the accent as its background: azulejo blue in Aipim, charcoal in Traditional.

## In the Figma file

- **Pattern** is one component with two properties: Pattern (Cacos, Hydraulic tile, Cobogó, Petals) and Palette (Aipim, Traditional). Put the instance inside a frame that clips, with rounded corners, and scale it to choose the crop. The drawings are in the set Pattern drawing; the colors are the variables.
- **Ornament** is one component with Color (Terracotta, Azulejo) and Size (Large, Medium, Small). Use the Size variants instead of scaling, so the line keeps its weight.
- Detach an instance only when a context needs its own drawing, and say why in the layer name.

## Rules

- One pattern in each area. Two patterns in the same area compete.
- Text never sits straight on a pattern: it sits on a Card or on a panel with its own background, with at least 4.5:1 contrast against it.
- Switch the palette with the Palette property. Do not recolor shapes by hand or add colors outside the two palettes.
- One florão in each place (a marker, a divider or a stamp), never a row of them. Do not rotate it or recolor it by hand.

## Accessibility

Patterns and the florão are decorative. On the web they are background images, or images with empty alt text, or inline SVG with `aria-hidden="true"`. Nothing is written inside them, and they are never the only way to tell two areas apart. They do not move; if one ever does, it honors reduced motion.

## Status and delivery

Today the patterns and the florão exist as Figma components. They are first drafts drawn in code: the final art is redrawn by hand by a designer. SVG and CSS files for the web, with the same two palettes, come after the final art. No pattern of a specific people and no sacred symbol is used (see the Illustrations rules). Credit: Aipim design system by Talis Galhardi, CC BY 4.0.
