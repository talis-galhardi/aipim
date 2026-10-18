import raw from '@docs/components/top-bar.md?raw';
import { a11yRules, allStates, doDont, iconic, meta, parts } from '../_stories.js';

export default {
  title: 'Top bar',
  id: 'organisms-top-bar',
  tags: ['autodocs'],
  parameters: { ...meta('top-bar', '93:314', raw), a11y: { config: a11yRules('landmark-unique', 'landmark-no-duplicate-banner') } },
};

export const Default = iconic('top-bar');
export const AllStates = allStates(() => parts('h-nav', [0, 1]));
export const DoAndDont = doDont('top-bar', raw);
