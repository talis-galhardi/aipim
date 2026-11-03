import raw from '@docs/components/tag.md?raw';
import { icon } from '../_dodont.js';
import { allStates, doDont, iconic, meta, playground, section } from '../_stories.js';

export default {
  title: 'Tag',
  id: 'atoms-tag',
  tags: ['autodocs'],
  parameters: meta('tag', '104:431', raw),
};

export const Default = iconic('tag');
export const AllStates = allStates(() => section('h-tag'));
export const DoAndDont = doDont('tag', raw);

// Style, an optional leading icon and the remove button. Style "link" makes the tag an <a> with no remove
// button (tag.css: "A --link tag is an a.aipim-tag ... no remove button"), and "inverse" needs a dark tile to
// mean anything (it reads its color from currentColor), so only the stage, not the markup shown, gets one.
export const Playground = playground({
  args: { label: 'Design', style: 'outline', icon: false, dismissible: false },
  argTypes: {
    style: { control: 'inline-radio', options: ['outline', 'accent', 'inverse', 'link'] },
    icon: { control: 'boolean' },
    dismissible: { control: 'boolean', if: { arg: 'style', neq: 'link' } },
  },
  renderMarkup: ({ label, style, icon: hasIcon, dismissible }) => {
    const isLink = style === 'link';
    const el = isLink ? 'a' : 'span';
    const cls = ['aipim-tag', style !== 'outline' && `aipim-tag--${style}`].filter(Boolean).join(' ');
    const lead = hasIcon ? icon('image') : '';
    const remove = !isLink && dismissible ? `<button class="aipim-tag__remove" type="button" aria-label="Remove ${label}" data-aipim-dismiss>${icon('close')}</button>` : '';
    return `<${el} class="${cls}"${isLink ? ' href="#"' : ''}>${lead}<span>${label}</span>${remove}</${el}>`;
  },
  wrapStage: (markup, { style }) => (style === 'inverse'
    ? `<span style="display:inline-flex;padding:var(--aipim-space-16);border-radius:var(--aipim-radius-md);background:var(--aipim-bg-canvas);color:var(--aipim-text-primary)" data-theme="dark">${markup}</span>`
    : markup),
});
