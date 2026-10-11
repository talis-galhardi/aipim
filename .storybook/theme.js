import { create } from 'storybook/theming';

// The Storybook chrome (sidebar, toolbar) and the docs blocks in the Aipim palette. Values are the roles of
// tokens/tokens.json, light and dark: canvas = bg/canvas, content = bg/surface, text = text/primary,
// muted = text/muted, border = border/subtle, selected row = a primary dark enough for white text.
const common = {
  brandTitle: 'Aipim Design System',
  brandUrl: 'https://github.com/talis-galhardi/aipim',
  brandTarget: '_blank',
  fontBase: 'Karla, system-ui, sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  appBorderRadius: 12,
  inputBorderRadius: 8,
};

export const light = create({
  ...common,
  base: 'light',
  colorPrimary: '#b43000',
  colorSecondary: '#b43000',
  appBg: '#f7f1ed',
  appContentBg: '#fdf9f6',
  appPreviewBg: '#f7f1ed',
  appBorderColor: '#dad1ca',
  textColor: '#1a1511',
  textMutedColor: '#665d56',
  barBg: '#fdf9f6',
  barTextColor: '#4a423c',
  barSelectedColor: '#b43000',
});

export const dark = create({
  ...common,
  base: 'dark',
  colorPrimary: '#ff9275',
  colorSecondary: '#ff9275',
  appBg: '#1a1511',
  appContentBg: '#302a25',
  appPreviewBg: '#1a1511',
  appBorderColor: '#4a423c',
  textColor: '#fdf9f6',
  textInverseColor: '#1a1511',
  textMutedColor: '#dad1ca',
  barBg: '#302a25',
  barTextColor: '#ece5df',
  barSelectedColor: '#ff9275',
  inputBg: '#1a1511',
  inputBorder: '#665d56',
  inputTextColor: '#fdf9f6',
});

export default light;
