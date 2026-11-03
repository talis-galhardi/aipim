import raw from '@docs/components/select.md?raw';
import { fieldA11y, allStates, doDont, iconic, meta, section } from '../_stories.js';

export default {
  title: 'Select',
  id: 'molecules-select',
  tags: ['autodocs'],
  parameters: {
    ...meta('select', '1400:2751', raw),
    a11y: fieldA11y(),
  },
};

export const Default = iconic('select');
export const AllStates = allStates(() => section('h-select'));
export const DoAndDont = doDont('select', raw);
