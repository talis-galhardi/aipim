// One source of markup: the gallery page. Stories cut their component out of it, so Storybook shows exactly what the browser tests check.
import galleryHtml from '../components/web/examples/index.html?raw';
import verificationMd from '@docs/verification.md?raw';
import { GALLERY_PT, PT, SPEC_DO_DONT, T } from '../.storybook/i18n.js';

const REPO = 'https://github.com/talis-galhardi/aipim';
// The docs folder of the language of this build, for the links to the files on GitHub.
const DOCS = PT ? 'docs/pt-br' : 'docs/en';
// The date of the last run of tools/verify_web.py, read from the verification record so it is written in one place.
const VERIFIED = (verificationMd.match(/\d{4}-\d{2}-\d{2}/) || [''])[0];
// The level of each component in the sidebar (atomic design), from the "group:" of each spec. Story ids are the level
// and the name. Written by tools/build_ai.py between the markers.
export const LEVEL = {
  // components:start
  atoms: ['avatar', 'badge', 'button', 'checkbox', 'icon-button', 'link', 'radio', 'switch', 'tag'],
  molecules: ['accordion', 'alert', 'brazilian-field', 'card', 'combobox', 'datepicker', 'empty-state', 'list-item', 'select', 'tabs', 'text-field', 'toast'],
  organisms: ['modal', 'tab-bar', 'top-bar'],
  // components:end
};
const levelOf = (name) => Object.keys(LEVEL).find((k) => LEVEL[k].includes(name));
const FIGMA = 'https://www.figma.com/design/iVcCVMsFIyb73AChmjlytU/Aipim-DS';

const doc = new DOMParser().parseFromString(galleryHtml, 'text/html');

// In the Portuguese build the words of the examples are in Portuguese: the text and the names (aria-label, placeholder, data-aipim-help,
// title) that have a translation in GALLERY_PT. The gallery file itself stays as it is: the browser tests read it.
if (PT) {
  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const key = n.nodeValue.trim().replace(/\s+/g, ' ');
    if (GALLERY_PT[key]) n.nodeValue = n.nodeValue.replace(n.nodeValue.trim(), GALLERY_PT[key]);
  }
  doc.querySelectorAll('[aria-label], [placeholder], [title], [data-aipim-help]').forEach((el) => {
    ['aria-label', 'placeholder', 'title', 'data-aipim-help'].forEach((a) => { const v = el.getAttribute(a); if (v && GALLERY_PT[v]) el.setAttribute(a, GALLERY_PT[v]); });
  });
}

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
  // The group is the level in the sidebar, in the language of the build (the Figma page names are in Portuguese).
  const group = T.level[levelOf(get('name'))];
  const wcag = (get('wcag').match(/\d\.\d\.\d+/g) || []).join(', ');
  const related = (get('related').match(/[a-z-]+/g) || [])
    .map((r) => `<a href="./?path=/docs/${levelOf(r)}-${r}--docs" target="_top">${r.replace(/-/g, ' ')}</a>`).join(', ');
  const items = [
    [T.status, status && (T.statusValue[status] || status)],
    [T.group, group],
    ['HTML', get('html') && `<code>${get('html')}</code>`],
    ['WCAG 2.2', wcag],
    [T.related, related],
  ].filter(([, v]) => v);
  return `<dl class="spec-facts">${items.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;
}

// Frontmatter and the first heading come out; the facts, links to the code, the spec and Figma go in.
// The "Do and don't" section comes out too: the Do and don't story shows it with real components.
export function specDoc(raw, name, node, { playground = false } = {}) {
  const css = (raw.match(/^css:\s*(.+)$/m) || [])[1];
  // Links between specs (button.md) and to the repository folders become Storybook pages and GitHub links: the docs page
  // lives in an iframe whose base is the Storybook root, so a relative file name would end in a 404.
  const body = raw.replace(/<!--[\s\S]*?-->/g, '').replace(/^---[\s\S]*?---\s*/, '').replace(/^# .*\n+/, '').replace(SPEC_DO_DONT, '')
    .replace(/\]\(([a-z-]+)\.md(#[^)]*)?\)/g, (m, n, hash) => (levelOf(n)
      ? `](./?path=/docs/${levelOf(n)}-${n}--docs)`
      : `](${REPO}/blob/main/${DOCS}/components/${n}.md${hash || ''})`))
    .replace(/\]\(\.\.\/\.\.\/\.\.\/icons\/\)/g, `](${REPO}/tree/main/icons/)`);
  const links = [
    css && `[CSS](${REPO}/blob/main/${css})`,
    `[${T.spec}](${REPO}/blob/main/${DOCS}/components/${name}.md)`,
    node && `[Figma](${figmaUrl(node)})`,
    // The playground has controls, so it opens in the Storybook canvas; it is not in the sidebar, the component page is.
    playground && `[Playground](./?path=/story/${levelOf(name)}-${name}--playground)`,
  ].filter(Boolean).join(' · ');
  // The lead sentence (what the component is) comes first: the page header shows it, and the facts and links follow.
  const at = body.search(/^## /m);
  const lead = at > 0 ? body.slice(0, at).trim() : '';
  const rest = at > 0 ? body.slice(at) : body;
  return `${lead ? `${lead}\n\n` : ''}${facts(raw)}\n\n${links} · ${T.lastVerified} ${VERIFIED} ([${T.whatWasChecked}](${REPO}/blob/main/${DOCS}/verification.md)).\n\n${rest}`;
}

// Markdown for the MDX pages: the generated files start with an HTML comment.
export const plain = (raw) => raw.replace(/<!--[\s\S]*?-->/g, '').trim();

// Storybook reads the default export statically, so each story file writes title and tags literally and calls this for the rest.
// `node` is the component in the Figma file; null while the component has no Figma page yet.
export function meta(name, node, raw, options = {}) {
  return {
    docs: { description: { component: specDoc(raw, name, node, options) } },
    ...(node && { design: { type: 'figma', url: figmaUrl(node) } }),
  };
}

// Stories are fragments of a page, not pages: these page-level rules do not apply to them.
// A story that turns off more rules must list these too, because Storybook replaces arrays instead of merging them.
export const a11yRules = (...extra) => ({ rules: ['landmark-one-main', 'page-has-heading-one', 'region', ...extra].map((id) => ({ id, enabled: false })) });
