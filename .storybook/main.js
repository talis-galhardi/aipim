// Storybook for Aipim: plain HTML and CSS, no framework. Stories read the same markup as components/web/examples/index.html.
// Two languages, two builds: AIPIM_LOCALE=pt-BR (the default) reads docs/pt-br and stories/pt-br, AIPIM_LOCALE=en reads
// docs/en and stories/en. The component stories are shared; their text comes from the spec of the language (@docs).
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOCALE = process.env.AIPIM_LOCALE === 'en' ? 'en' : 'pt-BR';
const DIR = LOCALE === 'en' ? 'en' : 'pt-br';
const PT = LOCALE === 'pt-BR';

// The language reaches the page before any script runs: the manager and the preview read window.AIPIM_LOCALE
// (.storybook/i18n.js), and <html lang> tells screen readers and translators which language the text is in.
const head = (before) => `${before || ''}<script>window.AIPIM_LOCALE=${JSON.stringify(LOCALE)};document.documentElement.lang=${JSON.stringify(LOCALE)};</script>`;

export default {
  stories: [
    { directory: '../stories/atoms', files: '*.stories.js', titlePrefix: PT ? 'Átomos' : 'Atoms' },
    { directory: '../stories/molecules', files: '*.stories.js', titlePrefix: PT ? 'Moléculas' : 'Molecules' },
    { directory: '../stories/organisms', files: '*.stories.js', titlePrefix: PT ? 'Organismos' : 'Organisms' },
    { directory: `../stories/${DIR}`, files: '*.mdx' },
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-designs'],
  framework: '@storybook/html-vite',
  // The first-visit checklist and the "what's new" notice are Storybook's own; this one is a design system's docs.
  core: { disableWhatsNewNotifications: true },
  // The toolbar keeps what works for this Storybook: the theme control, outline, measure and zoom. Backgrounds (and its grid)
  // are off: the stages paint their own background from the tokens, so picking one changed nothing, and it competed with the theme.
  features: { sidebarOnboardingChecklist: false, backgrounds: false },
  managerHead: head,
  previewHead: head,
  // `@docs/...` is the docs folder of the language of this build.
  viteFinal: (config) => {
    config.resolve = config.resolve || {};
    const alias = { '@docs': path.join(ROOT, 'docs', DIR) };
    config.resolve.alias = Array.isArray(config.resolve.alias)
      ? [...config.resolve.alias, { find: '@docs', replacement: alias['@docs'] }]
      : { ...(config.resolve.alias || {}), ...alias };
    return config;
  },
};
