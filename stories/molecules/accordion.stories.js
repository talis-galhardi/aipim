import raw from '@docs/components/accordion.md?raw';
import { allStates, doDont, iconic, meta, section } from '../_stories.js';

export default {
  title: 'Accordion',
  id: 'molecules-accordion',
  tags: ['autodocs'],
  parameters: meta('accordion', '1434:1907', raw),
};

export const Default = iconic('accordion');
export const AllStates = allStates(() => section('h-accordion'));
export const DoAndDont = doDont('accordion', raw);
