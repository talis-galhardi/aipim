import raw from '@docs/components/tabs.md?raw';
import { allStates, doDont, iconic, meta, parts } from '../_stories.js';

export default {
  title: 'Tabs',
  id: 'molecules-tabs',
  tags: ['autodocs'],
  parameters: meta('tabs', '92:398', raw),
};

export const Default = iconic('tabs');
export const AllStates = allStates(() => parts('h-nav', [3]));
export const DoAndDont = doDont('tabs', raw);
