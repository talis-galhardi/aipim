import raw from '@docs/components/checkbox.md?raw';
import { allStates, doDont, iconic, meta, parts } from '../_stories.js';

export default {
  title: 'Checkbox',
  id: 'atoms-checkbox',
  tags: ['autodocs'],
  parameters: meta('checkbox', '74:83', raw),
};

export const Default = iconic('checkbox');
export const AllStates = allStates(() => parts('h-choice', [0]));
export const DoAndDont = doDont('checkbox', raw);
