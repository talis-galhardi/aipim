import raw from '@docs/components/button.md?raw';
import { allStates, doDont, iconic, meta, section } from '../_stories.js';

export default {
  title: 'Button',
  id: 'atoms-button',
  tags: ['autodocs'],
  parameters: meta('button', '52:1202', raw, { playground: true }),
};

export const Default = iconic('button');
export const AllStates = allStates(() => section('h-button'));
export const DoAndDont = doDont('button', raw);

// The one with controls: change the label, variant and size and see the real component.
export const Playground = {
  tags: ['!dev'],
  args: { label: 'Button', variant: 'primary', size: 'md', disabled: false, icon: 'none' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'outline', 'ghost'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    icon: { control: 'inline-radio', options: ['none', 'leading', 'trailing'] },
  },
  render: ({ label, variant, size, disabled, icon }) => {
    const cls = ['aipim-button', variant !== 'primary' && `aipim-button--${variant}`, size !== 'md' && `aipim-button--${size}`].filter(Boolean).join(' ');
    const lead = icon === 'leading' ? '<svg class="aipim-icon aipim-button__icon-leading" aria-hidden="true"><use href="#aipim-add"></use></svg>' : '';
    const trail = icon === 'trailing' ? '<svg class="aipim-icon" aria-hidden="true"><use href="#aipim-arrow-right"></use></svg>' : '';
    return `<button class="${cls}" type="button"${disabled ? ' disabled' : ''}>${lead}<span>${label}</span>${trail}</button>`;
  },
};
