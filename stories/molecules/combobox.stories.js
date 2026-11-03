import raw from '@docs/components/combobox.md?raw';
import { fieldA11y, allStates, doDont, iconic, meta, section } from '../_stories.js';

export default {
  title: 'Combobox',
  id: 'molecules-combobox',
  tags: ['autodocs'],
  parameters: {
    ...meta('combobox', '1401:1621', raw),
    a11y: fieldA11y(),
  },
};

export const Default = iconic('combobox');
export const AllStates = allStates(() => section('h-combobox'));
export const DoAndDont = doDont('combobox', raw);
