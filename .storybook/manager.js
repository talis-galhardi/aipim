import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Aipim Design System',
    brandUrl: 'https://github.com/talis-galhardi/aipim',
    brandTarget: '_blank',
    fontBase: 'Karla, system-ui, sans-serif',
  }),
});
