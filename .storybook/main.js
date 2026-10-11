// Storybook for Aipim: plain HTML and CSS, no framework. Stories read the same markup as components/web/examples/index.html.
export default {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.js'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-designs'],
  framework: '@storybook/html-vite',
  // The first-visit checklist and the "what's new" notice are Storybook's own; this one is a design system's docs.
  core: { disableWhatsNewNotifications: true },
  // The toolbar keeps what works for this Storybook: the theme control, outline, measure and zoom. Backgrounds (and its grid)
  // are off: the stages paint their own background from the tokens, so picking one changed nothing, and it competed with the theme.
  features: { sidebarOnboardingChecklist: false, backgrounds: false },
};
