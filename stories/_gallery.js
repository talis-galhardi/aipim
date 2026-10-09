// One source of markup: the gallery page. Stories cut their component out of it, so Storybook shows exactly what the browser tests check.
import galleryHtml from '../components/web/examples/index.html?raw';

const REPO = 'https://github.com/talis-galhardi/aipim';
// Update with docs/en/verification.md whenever tools/verify_web.py is run on purpose.
const VERIFIED = '2026-10-06';
// The level of each component in the sidebar (atomic design). Story ids are the lowercase level and the name.
export const LEVEL = {
  atoms: ['button', 'icon-button', 'link', 'badge', 'tag', 'checkbox', 'radio', 'switch'],
  molecules: ['text-field', 'alert', 'toast', 'tabs', 'card', 'empty-state'],
  organisms: ['top-bar', 'tab-bar', 'modal'],
};
const levelOf = (name) => Object.keys(LEVEL).find((k) => LEVEL[k].includes(name));
const FIGMA = 'https://www.figma.com/design/iVcCVMsFIyb73AChmjlytU/Aipim-DS';

const doc = new DOMParser().parseFromString(galleryHtml, 'text/html');

// The icon sprite the gallery uses. The decorator in preview.js puts it in front of every story.
export const sprite = doc.querySelector('body > svg').outerHTML;

const find = (id) => doc.querySelector(`section[aria-labelledby="${id}"]`);

// A whole section of the gallery, without its heading.
export function section(id) {
  const s = find(id).cloneNode(true);
  s.querySelector('h2').remove();
  return s.innerHTML;
}

// Some children of the section's first .grid (a section can hold several components). No indices = all of them.
export function parts(id, indices) {
  const grid = find(id).querySelector('.grid').cloneNode(true);
  const kids = Array.from(grid.children);
  if (indices) kids.forEach((k, i) => { if (!indices.includes(i)) k.remove(); });
  return grid.outerHTML;
}

export const figmaUrl = (node) => `${FIGMA}?node-id=${node.replace(':', '-')}`;

// Frontmatter facts as a small definition list (status, group, element, WCAG, related components).
function facts(raw) {
  const get = (k) => (raw.match(new RegExp(`^${k}:\\s*(.+)$`, 'm')) || [])[1] || '';
  const status = get('status');
  const group = (get('figma').match(/page ([^,]+)/) || [])[1];
  const wcag = (get('wcag').match(/\d\.\d\.\d+/g) || []).join(', ');
  const related = (get('related').match(/[a-z-]+/g) || [])
    .map((r) => `<a href="./?path=/docs/${levelOf(r)}-${r}--docs" target="_top">${r.replace(/-/g, ' ')}</a>`).join(', ');
  const items = [
    ['Status', status && status[0].toUpperCase() + status.slice(1)],
    ['Group', group],
    ['HTML', get('html') && `<code>${get('html')}</code>`],
    ['WCAG 2.2', wcag],
    ['Related', related],
  ].filter(([, v]) => v);
  return `<dl class="spec-facts">${items.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;
}

// Frontmatter and the first heading come out; the facts, links to the code, the spec and Figma go in.
// The "Do and don't" section comes out too: the Do and don't story shows it with real components.
export function specDoc(raw, name, node) {
  const css = (raw.match(/^css:\s*(.+)$/m) || [])[1];
  const body = raw.replace(/^---[\s\S]*?---\s*/, '').replace(/^# .*\n+/, '').replace(/^## Do and don't[\s\S]*?(?=^## |(?![\s\S]))/m, '');
  const links = [
    css && `[CSS](${REPO}/blob/main/${css})`,
    `[Spec](${REPO}/blob/main/docs/en/components/${name}.md)`,
    node && `[Figma](${figmaUrl(node)})`,
  ].filter(Boolean).join(' · ');
  return `${facts(raw)}\n\n${links} · Last verified ${VERIFIED} ([what was checked](${REPO}/blob/main/docs/en/verification.md)).\n\n${body}`;
}

// Markdown for the MDX pages: the generated files start with an HTML comment.
export const plain = (raw) => raw.replace(/<!--[\s\S]*?-->/g, '').trim();

// Storybook reads the default export statically, so each story file writes title and tags literally and calls this for the rest.
export function meta(name, node, raw) {
  return {
    docs: { description: { component: specDoc(raw, name, node) } },
    design: { type: 'figma', url: figmaUrl(node) },
  };
}

// Stories are fragments of a page, not pages: these page-level rules do not apply to them.
// A story that turns off more rules must list these too, because Storybook replaces arrays instead of merging them.
export const a11yRules = (...extra) => ({ rules: ['landmark-one-main', 'page-has-heading-one', 'region', ...extra].map((id) => ({ id, enabled: false })) });
