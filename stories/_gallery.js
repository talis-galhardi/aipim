// One source of markup: the gallery page. Stories cut their component out of it, so Storybook shows exactly what the browser tests check.
import galleryHtml from '../components/web/examples/index.html?raw';

const REPO = 'https://github.com/talis-galhardi/aipim';
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

// Frontmatter and the first heading come out; links to the code, the spec and Figma go in.
export function specDoc(raw, name, node) {
  const css = (raw.match(/^css:\s*(.+)$/m) || [])[1];
  const body = raw.replace(/^---[\s\S]*?---\s*/, '').replace(/^# .*\n+/, '');
  const links = [
    css && `[CSS](${REPO}/blob/main/${css})`,
    `[Spec](${REPO}/blob/main/docs/en/components/${name}.md)`,
    node && `[Figma](${figmaUrl(node)})`,
  ].filter(Boolean).join(' · ');
  return `${links}\n\n${body}`;
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
