import raw from '@docs/components/combobox.md?raw';
import { a11yRules, allStates, doDont, iconic, meta, section } from '../_stories.js';

export default {
  title: 'Combobox',
  id: 'molecules-combobox',
  tags: ['autodocs'],
  parameters: {
    ...meta('combobox', '1401:1621', raw),
    // The helper of the disabled field is dimmed on purpose: a disabled control is exempt from WCAG 1.4.3 (see docs/en/verification.md).
    a11y: { config: a11yRules(), context: { include: ['#storybook-root'], exclude: [['#c4-help']] } },
  },
};

export const Default = iconic('combobox');
export const AllStates = allStates(() => section('h-combobox'));
export const DoAndDont = doDont('combobox', raw);
