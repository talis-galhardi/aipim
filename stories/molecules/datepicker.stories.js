import raw from '@docs/components/datepicker.md?raw';
import { fieldA11y, allStates, doDont, iconic, meta, section } from '../_stories.js';

export default {
  title: 'Date picker',
  id: 'molecules-datepicker',
  tags: ['autodocs'],
  parameters: {
    ...meta('datepicker', '1411:24667', raw),
    a11y: fieldA11y(),
  },
};

export const Default = iconic('datepicker');
export const AllStates = allStates(() => section('h-datepicker'));
export const DoAndDont = doDont('datepicker', raw);
