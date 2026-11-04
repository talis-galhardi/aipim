import raw from '@docs/components/badge.md?raw';
import { icon } from '../_dodont.js';
import { allStates, doDont, iconic, meta, playground, section } from '../_stories.js';

export default {
  title: 'Badge',
  id: 'atoms-badge',
  tags: ['autodocs'],
  parameters: meta('badge', '567:30581', raw),
};

export const Default = iconic('badge');
export const AllStates = allStates(() => section('h-badge'));
export const DoAndDont = doDont('badge', raw);

// Content (a numeral or an icon), style, shape and size. Always aria-hidden="true": the badge is decorative,
// and the meaning stays in the text next to it (AGENTS.md, "Patterns that are easy to get wrong").
export const Playground = playground({
  args: { content: 'numeral', value: '3', style: 'default', square: false, size: 'md' },
  argTypes: {
    content: { control: 'inline-radio', options: ['numeral', 'icon'] },
    value: { control: 'text', if: { arg: 'content', eq: 'numeral' } },
    style: { control: 'inline-radio', options: ['default', 'filled', 'tint'] },
    square: { control: 'boolean' },
    size: { control: 'inline-radio', options: ['md', 'sm'] },
  },
  renderMarkup: ({ content, value, style, square, size }) => {
    const cls = ['aipim-badge', style !== 'default' && `aipim-badge--${style}`, square && 'aipim-badge--square', size === 'sm' && 'aipim-badge--sm'].filter(Boolean).join(' ');
    const inner = content === 'icon' ? icon('bell') : (value || '1');
    return `<span class="${cls}" aria-hidden="true">${inner}</span>`;
  },
});
