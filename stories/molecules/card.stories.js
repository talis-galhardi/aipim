import raw from '@docs/components/card.md?raw';
import { allStates, doDont, iconic, meta, section } from '../_stories.js';

export default {
  title: 'Card',
  id: 'molecules-card',
  tags: ['autodocs'],
  parameters: meta('card', '104:362', raw),
};

export const Default = iconic('card');
export const AllStates = allStates(() => section('h-card'));
export const DoAndDont = doDont('card', raw);
