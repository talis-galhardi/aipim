# Patterns and the florão

Aipim has four brand patterns and one small ornament, the florão, which is also the brand symbol. They come from things in the Brazilian home and are built the way the Bauhaus taught (basic shapes, flat color, modules that repeat). They are drawn in the same way (ink line, color printed a little off the line, shades of terracotta with a few accents) and they live in the Figma file as three components (Pattern, Ornament and Symbol), so a change is made once and every use follows. They decorate. They never carry information.

## The elements

| Element | Name | Job | Architectural reference | Aesthetic reference |
|---|---|---|---|---|
| Cacos | Cacos (piso de cacos) | Signature: hero areas, covers, social images | Broken ceramic laid like a mosaic on floors and walls of houses, begun in the 1940s and 1950s in São Caetano do Sul with the broken pieces of a ceramic factory, first in workers' houses and then in middle-class ones | Irregular red, yellow and black pieces held by joints; the mended pot, broken and whole again |
| Hydraulic tile | Ladrilho hidráulico | Surface: card headers, dividers, empty states | Cement tiles on the floors of hallways, kitchens and porches of Brazilian houses, from the end of the 19th century | Bold geometric motifs in a checkerboard; flat colors and a hand-pressed look; the modular geometry that the Bauhaus also taught |
| Cobogó | Cobogó | Structure: side panels, banners, frames around images | Hollow blocks stacked as walls that let air and light through, created in Pernambuco in 1929 and embraced by Brazilian modern architecture | Light and shadow through a repeated opening; rhythm and shade; one module that builds a whole wall, an idea close to the Bauhaus |
| Petals | Pétalas | Quiet: behind forms, empty states, long pages | Tile walls built by repeating one module, from the azulejo de padrão tradition, which in Brazil ended up mostly in kitchens and bathrooms | Rosettes made by overlapping circles; a quiet tone-on-tone rhythm |
| Ornament | Florão | The small signature and the brand symbol: markers, dividers, stamps on cards; on a solid tile, the avatar and the favicon | The florão: the flower-shaped ornament at the center of stucco ceilings, from baroque Minas to the palaces and manor houses of imperial Brazil | A small four-fold flower, like a printer's fleuron: a quiet mark that signs a place |

The historical statements are backed by references, which are also collected in the brand manual of the Figma file:

- **Cacos.** FRANCESCHINI, Rafael. *Mosaico cerâmico como signo da cidade de São Caetano do Sul: comunicação para preservação da memória*. 2025. Dissertação (Mestrado Profissional) – Universidade Municipal de São Caetano do Sul, 2025. CAMPOS, Mariani. A origem dos pisos de caquinhos de cerâmica de São Paulo. *Veja São Paulo*, 3 abr. 2020.
- **Cobogó.** ARAUJO, Adriana Castelo Branco Ponte de; ENGLER, Rita de Castro. Design e modernidade de cobogós na arquitetura do Nordeste: exemplares de um patrimônio construtivo regional. *Revista Arquitetura e Lugar*, Campina Grande, v. 3, n. 11, p. 19–35, 2025. DOI: 10.35572/arql.v3i11.6610.
- **Hydraulic tile.** ARAGÃO, Solange de; SOUZA, Thaís. Do palacete ao cortiço: o emprego do ladrilho nas construções paulistanas da passagem do século XIX para o século XX. *Antíteses*, Londrina, v. 7, n. 14, p. 348–372, 2014. DOI: 10.5433/1984-3356.2014v7n14p348. LAMAS, Márcia Lopes; LONGO, Orlando Celso; SOUZA, Vicente Custódio de. A produção de ladrilho e o ofício de ladrilhar: método de produção de ladrilhos do século XVIII aos nossos dias. *Anais do Museu Paulista: História e Cultura Material*, São Paulo, v. 26, e09, 2018. DOI: 10.1590/1982-02672018v26e09.
- **Petals.** WANDERLEY, Ingrid Moura. *Azulejo na arquitetura brasileira: os painéis de Athos Bulcão*. 2006. Dissertação (Mestrado) – Escola de Engenharia de São Carlos, Universidade de São Paulo, São Carlos, 2006. The source backs the azulejo de padrão (one module repeated to cover a wall) and the tile in kitchens and bathrooms; the petal drawing itself is Aipim's own.
- **Florão.** ÁVILA, Affonso; GONTIJO, João Marcos Machado; MACHADO, Reinaldo Guedes. *Barroco mineiro: glossário de arquitetura e ornamentação*. Belo Horizonte: Fundação João Pinheiro, Centro de Estudos Históricos e Culturais, 1996. FLORÃO. In: *Michaelis: dicionário brasileiro da língua portuguesa*. São Paulo: Melhoramentos. A CASA SENHORIAL: anatomia dos interiores. *Palácio Imperial* and *Palacete da Babilônia*, https://acasasenhorial.org.

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
