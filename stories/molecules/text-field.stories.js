import raw from '@docs/components/text-field.md?raw';
import { icon } from '../_dodont.js';
import { fieldA11y, allStates, doDont, iconic, meta, playground, section } from '../_stories.js';

export default {
  title: 'Text field',
  id: 'molecules-text-field',
  tags: ['autodocs'],
  parameters: {
    ...meta('text-field', '73:308', raw),
    a11y: fieldA11y(),
  },
};

export const Default = iconic('text-field');
export const AllStates = allStates(() => section('h-field'));
export const DoAndDont = doDont('text-field', raw);

// Size, error (adds the icon and aria-invalid, as aipim.js does after a real check) and disabled. An empty
// value falls back to the placeholder, as a real field does.
export const Playground = playground({
  args: { label: 'Email', placeholder: 'name@example.com', value: '', helper: 'Used only for receipts', error: false, size: 'md', disabled: false },
  argTypes: {
    size: { control: 'inline-radio', options: ['md', 'lg'] },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  renderMarkup: ({ label, placeholder, value, helper, error, size, disabled }) => {
    const cls = ['aipim-field', size === 'lg' && 'aipim-field--lg', disabled && 'aipim-field--disabled'].filter(Boolean).join(' ');
    const valueAttr = value ? ` value="${value}"` : (placeholder ? ` placeholder="${placeholder}"` : '');
    const helperIcon = error ? icon('error', 'aipim-field__icon') : '';
    return `<div class="${cls}">\n  <label class="aipim-field__label" for="pg-field">${label}</label>\n  <input class="aipim-field__control" id="pg-field" type="text" aria-describedby="pg-field-help"${valueAttr}${error ? ' aria-invalid="true"' : ''}${disabled ? ' disabled' : ''}>\n  <p class="aipim-field__helper" aria-live="polite" id="pg-field-help">${helperIcon}<span>${helper}</span></p>\n</div>`;
  },
});
