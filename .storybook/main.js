// Storybook for Aipim: plain HTML and CSS, no framework. Stories read the same markup as components/web/examples/index.html.
export default {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.js'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-designs'],
  framework: '@storybook/html-vite',
  // The first-visit checklist and the "what's new" notice are Storybook's own; this one is a design system's docs.
  core: { disableWhatsNewNotifications: true },
  features: { sidebarOnboardingChecklist: false },
};
