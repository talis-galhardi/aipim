import { create } from 'storybook/theming';

// The Storybook chrome (sidebar, toolbar) in the Aipim palette. Values are the light roles of tokens/tokens.json:
// canvas neutral-100, surface neutral-50, text neutral-950, primary action primary-700, border neutral-300.
export default create({
  base: 'light',
  brandTitle: 'Aipim Design System',
  brandUrl: 'https://github.com/talis-galhardi/aipim',
  brandTarget: '_blank',
  fontBase: 'Karla, system-ui, sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  colorPrimary: '#b43000',
  colorSecondary: '#b43000',
  appBg: '#f7f1ed',
  appContentBg: '#fdf9f6',
  appPreviewBg: '#f7f1ed',
  appBorderColor: '#dad1ca',
  appBorderRadius: 12,
  textColor: '#1a1511',
  textMutedColor: '#665d56',
  barBg: '#fdf9f6',
  barTextColor: '#4a423c',
  barSelectedColor: '#b43000',
  inputBorderRadius: 8,
});
