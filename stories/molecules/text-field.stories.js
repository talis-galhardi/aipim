import raw from '@docs/components/text-field.md?raw';
import { a11yRules, allStates, doDont, iconic, meta, section } from '../_stories.js';

export default {
  title: 'Text field',
  id: 'molecules-text-field',
  tags: ['autodocs'],
  parameters: {
    ...meta('text-field', '73:308', raw),
    // The helper of the disabled field is dimmed on purpose: a disabled control is exempt from WCAG 1.4.3 (see docs/en/verification.md).
    a11y: { config: a11yRules(), context: { include: ['#storybook-root'], exclude: [['#f5-help']] } },
  },
};

export const Default = iconic('text-field');
export const AllStates = allStates(() => section('h-field'));
export const DoAndDont = doDont('text-field', raw);
