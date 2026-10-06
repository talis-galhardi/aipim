import raw from '../docs/en/components/button.md?raw';
import { meta, section } from './_gallery.js';

export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  parameters: meta('button', '52:1202', raw),
};

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => section('h-button') };

// The one with controls: change the label, variant and size and see the real component.
export const Playground = {
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
