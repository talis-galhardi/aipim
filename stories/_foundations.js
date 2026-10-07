// Helpers for the Foundations pages. Everything is read from the generated files, so the pages cannot drift from the tokens:
// the tables come from docs/en/*.md, the swatches from tokens/tokens.json and the icons from icons/icons.json.
// The previews use the real CSS variables, so they follow the light and dark toolbar.
import { createElement as h } from 'react';
import tokens from '../tokens/tokens.json';
import iconList from '../icons/icons.json';
import spriteSvg from '../icons/sprite.svg?raw';
import { plain } from './_gallery.js';

// Raw HTML inside an MDX page.
export const Html = ({ html }) => h('div', { className: 'fd', dangerouslySetInnerHTML: { __html: html } });

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

// The text of one "## Heading" section of a generated file, without the heading.
export function mdSection(raw, heading) {
  const re = new RegExp(`^## ${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\n+([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, 'm');
  return (plain(raw).match(re) || [])[1]?.trim() || '';
}

// The intro of a generated file: the text before its first table or "##", without the "Generated from" note.
export const mdIntro = (raw) => plain(raw).replace(/^# .*\n+/, '').split(/^(?:\||## )/m)[0].replace(/^Generated from `[^`]*`\.\s*/, '').trim();

// A section's text without its table (what the file says before and after it).
export const mdText = (raw, heading) => mdSection(raw, heading).split('\n').filter((l) => !l.trim().startsWith('|')).join('\n').trim();

// A Markdown table as { headers, rows }.
function parseTable(section) {
  const lines = section.split('\n').filter((l) => l.trim().startsWith('|'));
  const cells = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
  return { headers: cells(lines[0]), rows: lines.slice(2).map(cells) };
}

// The same table, with a Preview column made from the CSS variable or the value in each row.
// `preview(row)` gets { cells, text, cssVar, px } and returns HTML.
export function previewTable(raw, heading, preview, label = 'Preview', omit = []) {
  const table = parseTable(mdSection(raw, heading));
  const keep = table.headers.map((c) => !omit.includes(c));
  const headers = table.headers.filter((_, i) => keep[i]);
  const head = [label, ...headers].map((c) => `<th scope="col">${esc(c)}</th>`).join('');
  const body = table.rows.map((all) => {
    const text = all.join(' ');
    const cells = all.filter((_, i) => keep[i]);
    const cssVar = (text.match(/--aipim-[a-z0-9-]+/) || [])[0];
    const px = parseFloat((text.match(/(\d+(?:\.\d+)?)px/) || [])[1]);
    return `<tr><td class="fd-pv">${preview({ cells: all, text, cssVar, px })}</td>${cells.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`;
  }).join('');
  return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

// ---- Color ----------------------------------------------------------------------------------

// Black or white text, whichever has the better contrast on the swatch.
function onColor(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  // Pure black or white: they are the only pair that reaches 4.5:1 on every tone of a ramp, mid tones included.
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.179 ? '#000' : '#fff';
}

// Every ramp as a strip of swatches. The color is the CSS variable, the label is the step and the hex.
export function ramps(raw) {
  const origin = Object.fromEntries(parseTable(mdSection(raw, 'Ramps (primitives)')).rows.map((r) => [r[0].replace(/`/g, ''), r[1]]));
  return Object.entries(tokens.color).map(([ramp, steps]) => {
    const sw = Object.entries(steps).map(([step, t]) => {
      const hex = t.$value.hex;
      return `<li style="background:var(--aipim-color-${ramp}-${step});color:${onColor(hex)}"><b>${step}</b><span>${hex}</span></li>`;
    }).join('');
    return `<figure class="fd-ramp"><figcaption><strong>${ramp}</strong> <span>${inline(origin[ramp] || '')}</span></figcaption><ul>${sw}</ul></figure>`;
  }).join('');
}

// The semantic roles table, with the light and dark colors side by side (the hex is in the cells).
export function roles(raw) {
  const swatch = (cell) => {
    const hex = (cell.match(/#[0-9a-f]{6}/i) || [])[0];
    return hex ? `<span class="fd-sw" style="background:${hex}" title="${hex}"></span>` : '';
  };
  return previewTable(raw, 'Semantic roles', ({ cells }) => `${swatch(cells[1])}${swatch(cells[2])}`, 'Light · Dark');
}

// ---- Typography -----------------------------------------------------------------------------

export function families() {
  const card = (name, varName, weights, note) =>
    `<div class="fd-family"><span class="fd-aa" style="font-family:var(${varName})">Aa</span><strong>${name}</strong><span>${note}</span><span>Weights ${weights}</span></div>`;
  return `<div class="fd-families">${card('Antonio', '--aipim-font-heading', '600, 700', 'Headings, uppercase')}${card('Karla', '--aipim-font-body', '400, 700', 'Body, labels and interface text')}</div>`;
}

// The type scale: the table at the top of typography.md, with each style set in itself.
export function typeTable(raw) {
  const { headers, rows } = parseTable(plain(raw).split(/^## /m)[0].split('\n').filter((l) => l.startsWith('|')).join('\n'));
  const head = ['Specimen', ...headers].map((c) => `<th scope="col">${esc(c)}</th>`).join('');
  const body = rows.map((cells) => {
    const name = cells[0].replace(/`/g, '');
    const family = tokens.text[name].family.includes('heading') ? '--aipim-font-heading' : '--aipim-font-body';
    const sample = parseFloat(tokens.text[name]['size-desktop'].value) >= 2.5 ? 'Aipim' : 'The base of many products';
    const style = `font:var(--aipim-text-${name}-weight) var(--aipim-text-${name}-size)/var(--aipim-text-${name}-line) var(${family});letter-spacing:var(--aipim-text-${name}-tracking);text-transform:var(--aipim-text-${name}-transform)`;
    return `<tr><td class="fd-pv fd-type"><span style="${style}">${sample}</span></td>${cells.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`;
  }).join('');
  return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

// ---- Space, shape, motion -------------------------------------------------------------------

export const spaceBar = ({ cssVar }) => `<span class="fd-bar" style="inline-size:var(${cssVar})"></span>`;
export const pxBar = ({ px }) => `<span class="fd-bar" style="inline-size:${px}px"></span>`;
export const radiusBox = ({ cssVar }) => `<span class="fd-box" style="border-radius:var(${cssVar})"></span>`;

export function borderPreview({ cssVar }) {
  if (cssVar === '--aipim-focus-offset') return `<span class="fd-box fd-ring" style="outline-offset:var(${cssVar})"></span>`;
  return `<span class="fd-line" style="border-block-start:var(${cssVar}) solid var(--aipim-border-strong)"></span>`;
}

export function sizePreview({ cssVar }) {
  if (cssVar.includes('-icon-')) return `<svg class="aipim-icon" aria-hidden="true" style="inline-size:var(${cssVar});block-size:var(${cssVar})"><use href="#aipim-star"></use></svg>`;
  if (cssVar.includes('-control-')) return `<span class="fd-box fd-control" style="block-size:var(${cssVar})"></span>`;
  return `<span class="fd-box" style="inline-size:var(${cssVar});block-size:var(${cssVar})"></span>`;
}

export const shadowBox = ({ cssVar }) => `<span class="fd-box fd-card" style="box-shadow:var(${cssVar})"></span>`;

export const opacityBox = ({ cssVar }) => `<span class="fd-box fd-solid" style="opacity:var(${cssVar})"></span>`;

export const breakpointBar = ({ px }) => `<span class="fd-bar" style="inline-size:${(px / 1440) * 100}%"></span>`;

// A dot that moves on "Play", with the duration or the easing of the row. Reduced motion zeroes the durations, as in real components.
export function motionPreview({ cssVar }) {
  const isEase = cssVar.includes('-ease-');
  const style = isEase ? `transition-duration:var(--aipim-duration-slow);transition-timing-function:var(${cssVar})` : `transition-duration:var(${cssVar})`;
  return `<button type="button" class="fd-play" onclick="this.closest('tr').classList.toggle('on')">Play</button><span class="fd-track" aria-hidden="true"><span class="fd-dot" style="${style}"></span></span>`;
}

// The stacking order as cards that overlap, the highest on top.
export function zStack(raw) {
  const { rows } = parseTable(mdSection(raw, 'Stacking order'));
  const layers = rows.map((r, i) => `<li style="inset-block-start:${i * 40}px;inset-inline-start:${i * 28}px;z-index:${i}"><code>${esc(r[0].replace(/`/g, ''))}</code> ${esc(r[2])}</li>`).join('');
  return `<ol class="fd-z" style="block-size:${(rows.length - 1) * 40 + 72}px" aria-label="Stacking order, lowest first">${layers}</ol>`;
}

// ---- Icons ----------------------------------------------------------------------------------

const GROUPS = ['actions', 'navigation', 'objects', 'status', 'platforms'];

export function iconCatalog() {
  const groups = GROUPS.map((g) => {
    const items = iconList.icons.filter((i) => i.category === g).map((i) =>
      `<li><svg class="aipim-icon" aria-hidden="true"><use href="#aipim-${i.name}"></use></svg><code>${i.name}</code></li>`).join('');
    return `<section class="fd-icon-group"><h3>${g[0].toUpperCase()}${g.slice(1)} <span>${iconList.icons.filter((i) => i.category === g).length}</span></h3><ul class="fd-icons">${items}</ul></section>`;
  }).join('');
  return `${spriteSvg}${groups}`;
}

export const iconSprite = spriteSvg;
export const iconCount = iconList.icons.length;
