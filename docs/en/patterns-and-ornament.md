# Patterns and the florão

Aipim has four brand patterns and one small ornament, the florão, which is also the brand symbol. They come from things in the Brazilian home and are built the way the Bauhaus taught (basic shapes, flat color, modules that repeat). They are drawn in the same way (ink line, color printed a little off the line, shades of terracotta with a few accents) and they live in the Figma file as three components (Pattern, Ornament and Symbol), so a change is made once and every use follows. They decorate. They never carry information.

## The elements

| Element | Name | Job | Architectural reference | Aesthetic reference |
|---|---|---|---|---|
| Cacos | Cacos (piso de cacos) | Signature: hero areas, covers, social images | Broken ceramic laid like a mosaic on floors and walls of houses in São Paulo, popular in the middle class from the 1970s to the 2000s | Irregular red, yellow and black pieces held by joints; the mended pot, broken and whole again |
| Hydraulic tile | Ladrilho hidráulico | Surface: card headers, dividers, empty states | Cement tiles on the floors of hallways, kitchens and porches of Brazilian houses, from the end of the 19th century | Bold geometric motifs in a checkerboard; flat colors and a hand-pressed look; the modular geometry that the Bauhaus also taught |
| Cobogó | Cobogó | Structure: side panels, banners, frames around images | Hollow blocks stacked as walls that let air and light through, created in Recife in the 1920s and embraced by Brazilian modernist architecture | Light and shadow through a repeated opening; rhythm and shade; one module that builds a whole wall, an idea close to the Bauhaus |
| Petals | Pétalas | Quiet: behind forms, empty states, long pages | Overlapping-petal lattices on kitchen and bathroom tile walls, from the azulejo tradition to cement tiles | Rosettes made by overlapping circles; a quiet tone-on-tone rhythm |
| Ornament | Florão | The small signature and the brand symbol: markers, dividers, stamps on cards; on a solid tile, the avatar and the favicon | The florão: the ornamental rosette at the center of the ceilings of colonial and imperial Brazilian houses | A small four-fold flower, like a printer's fleuron: a quiet mark that signs a place |

The historical statements are being backed by academic references, which are collected in the brand manual of the Figma file.

## Palettes

There are two palettes, set by the variable collection `Pattern palette` (two modes, nine variables):

- **Aipim**: terracotta shades and cream, with small accents of yellow, azulejo blue and folha green.
- **Traditional**: terracotta shades, pale yellow and a little black, the way the real floors look.

The Petals pattern is tone on tone and uses the accent as its background: azulejo blue in Aipim, charcoal in Traditional. It is the one pattern with a choice of ground, the Color property: Azulejo (the default), Urucum, Folha, Cajá (with the petals in soft ink, because cream petals disappear on yellow) and Tinta. The documentation pages use it for the ribbon under the masthead, one color for each family of pages.

## In the Figma file

- **Pattern** is one component with three properties: Pattern (Cacos, Hydraulic tile, Cobogó, Petals), Palette (Aipim, Traditional) and Color (the ground: Default for the Cacos, the Hydraulic tile and the Cobogó; Azulejo, Urucum, Folha, Cajá or Tinta for the Petals). Put the instance inside a frame that clips, with rounded corners, and scale it to choose the crop. The drawings are in the set Pattern drawing; the colors are the variables.
- **Ornament** is one component with Color (Terracotta, Azulejo) and Size: Small is 24px, Medium 32px and Large 48px. Use these three sizes. The parts of the florão scale with the frame, so a larger display never crops it, but the line only keeps its weight at the three sizes.
- **Symbol** is the florão on a solid tile, in one color: Color (Terracotta, Azulejo, Ink) and Shape (Square for icons and favicons, Circle for avatars). It is only fills, so it scales without changing weight. It reads whole from 24 px; at 16 px only the four drops show. The same mark is the Ornament: as the symbol it is solid and alone, as the ornament it is small and repeats.
- Detach an instance only when a context needs its own drawing, and say why in the layer name.

## Rules

- One pattern in each area. Two patterns in the same area compete.
- Text never sits straight on a pattern: it sits on a Card or on a panel with its own background, with at least 4.5:1 contrast against it.
- Switch the palette with the Palette property and the ground of the Petals with the Color property. Do not recolor shapes by hand or add colors outside the two palettes.
- One florão in each place (a marker, a divider or a stamp), never a row of them. Do not rotate it or recolor it by hand. As the symbol it is always cream on a solid tile (never on a photo or a pattern, never with an outline or a shadow).

## Accessibility

Patterns and the florão are decorative. On the web they are background images, or images with empty alt text, or inline SVG with `aria-hidden="true"`. Nothing is written inside them, and they are never the only way to tell two areas apart. They do not move; if one ever does, it honors reduced motion.

## Status and delivery

Today the patterns and the florão exist as Figma components. They are first drafts drawn in code: the final art is redrawn by hand by a designer. SVG and CSS files for the web, with the same two palettes, come after the final art. No pattern of a specific people and no sacred symbol is used (see the Illustrations rules). Credit: Aipim design system by Talis Galhardi, CC BY 4.0.
