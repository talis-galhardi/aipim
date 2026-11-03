import raw from '@docs/components/button.md?raw';
import { icon } from '../_dodont.js';
import { allStates, doDont, iconic, meta, playground, section } from '../_stories.js';

export default {
  title: 'Button',
  id: 'atoms-button',
  tags: ['autodocs'],
  parameters: { ...meta('button', '52:1202', raw), singleScroll: true },
};

export const Default = iconic('button');
export const AllStates = allStates(() => section('h-button'));
export const DoAndDont = doDont('button', raw);

// The one with controls: change the label, variant, size, state and icon, and see the markup they build.
export const Playground = playground({
  args: { label: 'Button', variant: 'primary', size: 'md', state: 'default', icon: 'none' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'outline', 'ghost'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    state: { control: 'inline-radio', options: ['default', 'disabled', 'loading'] },
    icon: { control: 'inline-radio', options: ['none', 'leading', 'trailing'] },
  },
  renderMarkup: ({ label, variant, size, state, icon: pos }) => {
    const cls = ['aipim-button', variant !== 'primary' && `aipim-button--${variant}`, size !== 'md' && `aipim-button--${size}`].filter(Boolean).join(' ');
    const spinner = state === 'loading' ? icon('loading', 'aipim-button__spinner') : '';
    const lead = pos === 'leading' ? icon('add', 'aipim-button__icon-leading') : '';
    const trail = pos === 'trailing' ? icon('arrow-right') : '';
    const attrs = { default: '', disabled: ' disabled', loading: ' aria-busy="true"' }[state];
    return `<button class="${cls}" type="button"${attrs}>${spinner}${lead}<span>${label}</span>${trail}</button>`;
  },
});
