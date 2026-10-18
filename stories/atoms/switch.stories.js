import raw from '@docs/components/switch.md?raw';
import { allStates, doDont, iconic, meta, parts } from '../_stories.js';

export default {
  title: 'Switch',
  id: 'atoms-switch',
  tags: ['autodocs'],
  parameters: meta('switch', '74:149', raw),
};

export const Default = iconic('switch');
export const AllStates = allStates(() => parts('h-choice', [3]));
export const DoAndDont = doDont('switch', raw);
