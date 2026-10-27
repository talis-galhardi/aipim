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

// What a link preview reads (LinkedIn, Slack, WhatsApp): they fetch the page without running scripts, so the tags have to be in the
// served HTML. Only the manager (index.html) needs them. The image is a file in .storybook/public, copied to the root of the build.
const SITE = 'https://talisgalhardi.com/aipim/';
const SHARE = PT
  ? {
      title: 'Aipim Design System: um design system brasileiro e aberto',
      text: '24 componentes em HTML/CSS, tokens, tema claro e escuro, 88 checagens WCAG 2.2 e pronto para LLMs. Código aberto, MIT e CC BY 4.0.',
      url: SITE,
      locale: 'pt_BR',
      alt: 'Aipim: um design system brasileiro e aberto',
    }
  : {
      title: 'Aipim Design System: a Brazilian, open design system',
      text: '24 HTML/CSS components, tokens, light and dark themes, 88 WCAG 2.2 checks and ready for LLMs. Open source, MIT and CC BY 4.0.',
      url: `${SITE}en/`,
      locale: 'en_US',
      alt: 'Aipim: a Brazilian, open design system',
    };
const social = `
<meta name="description" content="${SHARE.text}">
<link rel="canonical" href="${SHARE.url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Aipim Design System">
<meta property="og:title" content="${SHARE.title}">
<meta property="og:description" content="${SHARE.text}">
<meta property="og:url" content="${SHARE.url}">
<meta property="og:locale" content="${SHARE.locale}">
<meta property="og:image" content="${SITE}og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${SHARE.alt}">
<meta name="twitter:card" content="summary_large_image">
`;

export default {
  stories: [
    { directory: '../stories/atoms', files: '*.stories.js', titlePrefix: PT ? 'Átomos' : 'Atoms' },
    { directory: '../stories/molecules', files: '*.stories.js', titlePrefix: PT ? 'Moléculas' : 'Molecules' },
    { directory: '../stories/organisms', files: '*.stories.js', titlePrefix: PT ? 'Organismos' : 'Organisms' },
    { directory: `../stories/${DIR}`, files: '*.mdx' },
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-designs'],
  framework: '@storybook/html-vite',
  // The page title (otherwise Storybook falls back to the package name) and the folder of static files for the build.
  title: 'Aipim Design System',
  staticDirs: ['./public'],
  // The first-visit checklist and the "what's new" notice are Storybook's own; this one is a design system's docs.
  core: { disableWhatsNewNotifications: true },
  // The toolbar keeps what works for this Storybook: the theme control, outline, measure and zoom. Backgrounds (and its grid)
  // are off: the stages paint their own background from the tokens, so picking one changed nothing, and it competed with the theme.
  features: { sidebarOnboardingChecklist: false, backgrounds: false },
  managerHead: (before) => head(before) + social,
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
