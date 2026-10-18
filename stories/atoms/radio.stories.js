import raw from '@docs/components/radio.md?raw';
import { allStates, doDont, iconic, meta, parts } from '../_stories.js';

export default {
  title: 'Radio',
  id: 'atoms-radio',
  tags: ['autodocs'],
  parameters: meta('radio', '74:114', raw),
};

export const Default = iconic('radio');
export const AllStates = allStates(() => parts('h-choice', [1, 2]));
export const DoAndDont = doDont('radio', raw);
