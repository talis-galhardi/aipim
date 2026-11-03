import raw from '@docs/components/avatar.md?raw';
import { icon } from '../_dodont.js';
import { allStates, doDont, iconic, meta, playground, section } from '../_stories.js';

export default {
  title: 'Avatar',
  id: 'atoms-avatar',
  tags: ['autodocs'],
  parameters: meta('avatar', '1433:1723', raw),
};

export const Default = iconic('avatar');
export const AllStates = allStates(() => section('h-avatar'));
export const DoAndDont = doDont('avatar', raw);

// The same placeholder photo the gallery uses (components/web/examples/index.html, h-avatar), so Photo in the
// playground matches Photo in All states.
const PHOTO = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23AED1FE'/%3E%3Ccircle cx='24' cy='19' r='8' fill='%23FDF9F6'/%3E%3Cpath d='M8 48c0-9 7-15 16-15s16 6 16 15z' fill='%23FDF9F6'/%3E%3C/svg%3E";

export const Playground = playground({
  args: { content: 'initials', initials: 'TG', name: 'Talis Galhardi', tone: 'primary', size: 'md', count: 3 },
  argTypes: {
    content: { control: 'inline-radio', options: ['initials', 'icon', 'photo', 'count'] },
    initials: { control: 'text', if: { arg: 'content', eq: 'initials' } },
    name: { control: 'text', if: { arg: 'content', neq: 'count' } },
    tone: { control: 'inline-radio', options: ['primary', 'secondary', 'tertiary', 'success'], if: { arg: 'content', eq: 'initials' } },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    count: { control: 'number', if: { arg: 'content', eq: 'count' } },
  },
  renderMarkup: ({ content, initials, name, tone, size, count }) => {
    const cls = size !== 'md' ? ` aipim-avatar--${size}` : '';
    if (content === 'icon') return `<span class="aipim-avatar${cls}" aria-hidden="true">${icon('user')}</span>`;
    if (content === 'photo') return `<span class="aipim-avatar${cls}"><img src="${PHOTO}" alt="${name}"></span>`;
    if (content === 'count') return `<span class="aipim-avatar${cls}">+${count}<span class="aipim-visually-hidden"> more people</span></span>`;
    return `<span class="aipim-avatar${cls} aipim-avatar--${tone}" role="img" aria-label="${name}">${initials}</span>`;
  },
});
