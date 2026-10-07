import raw from '../docs/en/components/text-field.md?raw';
import { doDont } from './_dodont.js';
import { iconic } from './_iconic.js';
import { a11yRules, meta, section } from './_gallery.js';

export default {
  title: 'Molecules/Text field',
  tags: ['autodocs'],
  parameters: {
    ...meta('text-field', '73:308', raw),
    // The helper of the disabled field is dimmed on purpose: a disabled control is exempt from WCAG 1.4.3 (see docs/en/verification.md).
    a11y: { config: a11yRules(), context: { include: ['#storybook-root'], exclude: [['#f5-help']] } },
  },
};

// The most recognizable variation: the first story, so it is on top of the page and in the thumbnail.
export const Default = iconic('text-field');

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => section('h-field') };

// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('text-field', raw);
