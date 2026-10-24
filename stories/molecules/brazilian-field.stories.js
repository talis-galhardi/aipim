import raw from '@docs/components/brazilian-field.md?raw';
import { a11yRules, allStates, doDont, iconic, meta, section } from '../_stories.js';

export default {
  title: 'Brazilian field',
  id: 'molecules-brazilian-field',
  tags: ['autodocs'],
  parameters: {
    ...meta('brazilian-field', '1382:1470', raw),
    a11y: { config: a11yRules(), context: { include: ['#storybook-root'] } },
  },
};

export const Default = iconic('brazilian-field');
export const AllStates = allStates(() => section('h-brfield'));
export const DoAndDont = doDont('brazilian-field', raw);
