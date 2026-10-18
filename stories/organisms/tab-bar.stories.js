import raw from '@docs/components/tab-bar.md?raw';
import { allStates, doDont, iconic, meta, parts } from '../_stories.js';

export default {
  title: 'Tab bar',
  id: 'organisms-tab-bar',
  tags: ['autodocs'],
  parameters: meta('tab-bar', '92:354', raw),
};

export const Default = iconic('tab-bar');
export const AllStates = allStates(() => parts('h-nav', [2]));
export const DoAndDont = doDont('tab-bar', raw);
