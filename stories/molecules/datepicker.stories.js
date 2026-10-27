import raw from '@docs/components/datepicker.md?raw';
import { a11yRules, allStates, doDont, iconic, meta, section } from '../_stories.js';

export default {
  title: 'Date picker',
  id: 'molecules-datepicker',
  tags: ['autodocs'],
  parameters: {
    ...meta('datepicker', '1411:24667', raw),
    // The helper of the disabled field is dimmed on purpose: a disabled control is exempt from WCAG 1.4.3 (see docs/en/verification.md).
    a11y: { config: a11yRules(), context: { include: ['#storybook-root'], exclude: [['#d4-help']] } },
  },
};

export const Default = iconic('datepicker');
export const AllStates = allStates(() => section('h-datepicker'));
export const DoAndDont = doDont('datepicker', raw);
