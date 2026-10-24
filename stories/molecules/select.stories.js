import raw from '@docs/components/select.md?raw';
import { a11yRules, allStates, doDont, iconic, meta, section } from '../_stories.js';

export default {
  title: 'Select',
  id: 'molecules-select',
  tags: ['autodocs'],
  parameters: {
    ...meta('select', '1400:2751', raw),
    // The helper of the disabled field is dimmed on purpose: a disabled control is exempt from WCAG 1.4.3 (see docs/en/verification.md).
    a11y: { config: a11yRules(), context: { include: ['#storybook-root'], exclude: [['#s5-help']] } },
  },
};

export const Default = iconic('select');
export const AllStates = allStates(() => section('h-select'));
export const DoAndDont = doDont('select', raw);
