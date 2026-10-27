---
name: avatar
description: A person or a thing inside a circle: a photo, the initials on a tone, or an icon.
status: beta
group: atoms
html: span, img
class: aipim-avatar
css: components/web/avatar.css
figma: Aipim DS, page Átomos, Avatar
wcag: ["1.1.1 Non-text Content", "1.3.1 Info and Relationships", "1.4.3 Contrast (Minimum)", "1.4.11 Non-text Contrast"]
related: [list-item, badge, tag]
---

# Avatar

A person or a thing inside a circle: a photo, the initials on a tone, or an icon. It gives a face to a list, a comment or a group.

## When to use

- To show who a person is, or what an item is, in a list, a comment or a card.
- To show how many people take part, with the group and its count ("+3").

## When not to use

- Only to decorate. If the avatar does not say who it is, leave it out.
- For the icon of an action: use the [icon button](icon-button.md).
- For a number or a status on top of an icon: use the [badge](badge.md).

## Decision: photo, initials or icon

The avatar draws what it receives. Whoever builds the screen chooses: the photo when there is one, the initials when there is only a name, the icon when there is neither. Aipim does not make that choice for you.

## Decision: four tones, with the text of the tone

The initials sit on one of the four tones of the system (salmon, blue, yellow and green), always with the text of the tone (`tint/text`), which the token generator checks. Aipim does not pick the tone: use the same one for the same person on every screen, and a long list gets color without looking random.

## Variants and props

| Class or attribute | What it does |
|---|---|
| `aipim-avatar` | The circle, 40px. Without a tone it is `bg/sunken`, for the icon, the photo space and the count. |
| `aipim-avatar--sm`, `aipim-avatar--lg` | 32px and 48px. The small one writes the initials in the overline style and draws a 16px icon. |
| `aipim-avatar--primary`, `--secondary`, `--tertiary`, `--success` | The tone behind the initials. |
| `img` inside | The photo. It fills the circle. |
| `svg.aipim-icon` inside | The icon, `aria-hidden="true"`. |
| `aipim-avatar-group` | A row of avatars that overlap, each one with a 3px ring in the color of the page. Put `role="group"` and an `aria-label` on it. |
| `aipim-avatar-group--sm`, `--lg` | Sizes the avatars inside and sets the overlap: 6, 8 (default) and 12px. |

## States

The avatar only shows. It has no hover, focus or disabled state. When it sits inside a link or a button, the state belongs to that link or button.

## Tokens used

| Applies to | State | Token | Light | Dark |
|---|---|---|---|---|
| Initials background | Primary | `tint/primary` | #FEBBA9 | #892402 |
| Initials background | Secondary | `tint/secondary` | #AED1FE | #014B95 |
| Initials background | Tertiary | `tint/tertiary` | #FFD337 | #5E4B03 |
| Initials background | Success | `tint/success` | #A0DFB5 | #025D33 |
| Initials text | All four | `tint/text` | #1A1511 | #FDF9F6 |
| Background | Icon, photo, count | `bg/sunken` | #ECE5DF | #0E0A07 |
| Icon | Icon | `text/secondary` | #4A423C | #ECE5DF |
| Count text | Count | `text/primary` | #1A1511 | #FDF9F6 |
| Group ring | Group | `bg/surface` | #FDF9F6 | #302A25 |

| Measure | Token | Small | Medium | Large |
|---|---|---|---|---|
| Diameter | `size/control-sm`, `size/control-md`, `size/control-lg` | 32 | 40 | 48 |
| Icon | `size/icon-sm`, `size/icon-md` | 16 | 20 | 20 |
| Initials | `text/overline`, `text/label` | Overline | Label | Label |
| Overlap in a group | `space/8`, `space/12` | 6 (no token) | 8 | 12 |

| Measure | Token | Value |
|---|---|---|
| Corner | `radius/full` | Always a circle |
| Group ring | `border/thick` | 3 |

The overlap is a negative margin, since a token cannot be negative. The ring is drawn outside the circle and takes no room: a group of four medium avatars is 136px wide.

## Accessibility

- Tab does not stop on an avatar. Inside a link or a button, the focus goes to the link or the button.
- A photo is an `img` whose `alt` is the name of the person. When the name is written next to it, use an empty `alt`.
- Initials have `aria-hidden="true"` when the name is next to them. Alone, they take `role="img"` and an `aria-label` with the name.
- An icon is `aria-hidden="true"`: it is only decoration.
- A group has `role="group"` and an `aria-label` ("Participants"). The count carries a hidden text (`aipim-visually-hidden`) that completes it: "+3 more people".
- The initials use `tint/text` on each tone, a pair the token generator checks in light and dark.

## Code examples

```html
<span class="aipim-avatar aipim-avatar--primary" role="img" aria-label="Talis Galhardi">TG</span>

<span class="aipim-avatar"><img src="ana.jpg" alt="Ana Vieira"></span>

<span class="aipim-avatar" aria-hidden="true">
  <svg class="aipim-icon" aria-hidden="true"><use href="icons/sprite.svg#aipim-user"></use></svg>
</span>

<div class="aipim-avatar-group" role="group" aria-label="Participants">
  <span class="aipim-avatar aipim-avatar--primary" role="img" aria-label="Talis Galhardi">TG</span>
  <span class="aipim-avatar aipim-avatar--secondary" role="img" aria-label="Ana Vieira">AV</span>
  <span class="aipim-avatar aipim-avatar--success" role="img" aria-label="Lucas Ueda">LU</span>
  <span class="aipim-avatar">+3<span class="aipim-visually-hidden"> more people</span></span>
</div>
```

## Do and don't

- Do: show up to four avatars and sum up the rest in the count (+3).
- Don't: stack eight avatars, which turns the group into an unreadable strip.
