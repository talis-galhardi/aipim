// A component page in one scroll, without tabs. Nothing is hidden, so Ctrl+F finds every section. The order is the
// Playground (or the Default story, on a component without one), when to use, API, states, tokens and accessibility, and
// it comes from the spec, so a heading and its text are the ones of the language of the build. The "On this page" list
// is one element: a rail beside the sections on a wide window and a bar stuck to the top on a narrow one (styles/component-page.css).
// The page sits in Storybook's Unstyled block, so its docs typography and its reset of margins stay out of the way.
import { createElement as h, Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Controls, DocsContext, DocsStory, Markdown, Story, Unstyled, useOf } from '@storybook/addon-docs/blocks';
import { ComponentHeader, copyLink, DocPager, goToSection, headingLink, pageStories, setHash, splitLead } from './docs-tabs.js';
import { SPEC_SECTIONS, T } from './i18n.js';

const section = (key, ...children) => h('section', { key, className: 'doc-page__section' }, ...children);
const md = (text) => h(Markdown, null, text);

// The stylesheets of a component, as the package exports them. The spec's `css` names the file of the component.
function ImportLine({ css }) {
  const code = ["import 'aipim-ds/tokens.css';", "import 'aipim-ds/components/aipim-base.css';", `import 'aipim-ds/components/${css.split('/').pop()}';`].join('\n');
  return h('div', { className: 'sb-unstyled pg__code' },
    h('div', { className: 'pg__head' },
      h('p', { className: 'pg__label' }, T.importCode),
      h('button', { className: 'aipim-icon-button aipim-icon-button--sm', type: 'button', 'data-pg-copy': '', 'aria-label': T.copyImport, title: T.copyImport },
        h('svg', { className: 'aipim-icon', 'aria-hidden': 'true' }, h('use', { href: '#aipim-copy' })))),
    h('pre', { className: 'pg__pre' }, h('code', null, code)));
}

// The facts and the import line open the page on a wide window, and on a phone they come after the Playground, so the
// component is the first thing on the screen. One or the other is rendered, never both, so the reading order and the Tab order
// are the order on the screen. 600 is breakpoint/tablet.
const PHONE = '(width < 600px)';
function usePhone() {
  const [phone, setPhone] = useState(() => window.matchMedia(PHONE).matches);
  useEffect(() => {
    const query = window.matchMedia(PHONE);
    const follow = () => setPhone(query.matches);
    query.addEventListener('change', follow);
    return () => query.removeEventListener('change', follow);
  }, []);
  return phone;
}

export function ComponentScroll() {
  const { preparedMeta } = useOf('meta', ['meta']);
  const context = useContext(DocsContext);
  const host = useRef(null);
  const nav = useRef(null);
  const [toc, setToc] = useState([]);
  const [active, setActive] = useState('');

  useEffect(() => {
    const el = host.current;
    const headings = () => [...el.querySelectorAll('.doc-page__section > h2[id], .doc-page__section > div > h2[id]')];
    // The section being read is the last heading above a line at a third of the window. The end of the page
    // counts as the last section, which may be too short to ever reach that line.
    const spy = () => {
      const list = headings();
      const line = window.innerHeight / 3;
      const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const current = atEnd ? list[list.length - 1] : list.filter((x) => x.getBoundingClientRect().top <= line).pop();
      setActive((current || list[0])?.id || '');
    };
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; spy(); });
    };
    // The link icon of a heading stays on the page: it goes to the section, writes the address and copies it.
    const onAnchor = (e) => {
      const id = headingLink(e);
      if (!id) return;
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
      setHash(id);
      copyLink(id);
    };
    setToc(headings().map((x) => ({ id: x.id, text: x.textContent.replace(/\s+/g, ' ').trim() })));
    spy();
    el.addEventListener('click', onAnchor, true);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('click', onAnchor, true);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // On the bar the current section may be out of sight, so the bar moves to show it. The rail has no overflow to move.
  useEffect(() => {
    const bar = nav.current;
    const link = bar?.querySelector('[aria-current]');
    if (link && bar.scrollWidth > bar.clientWidth) bar.scrollLeft = link.offsetLeft - (bar.clientWidth - link.offsetWidth) / 2;
  }, [active]);

  const parts = splitLead(preparedMeta?.parameters?.docs?.description?.component || '').rest.split(/^(?=## )/m);
  const facts = parts.filter((p) => !p.startsWith('## ')).join('\n');
  const specParts = parts.filter((p) => p.startsWith('## '));
  const heading = (p) => (p.match(/^## (.+)/) || [])[1] || '';
  const take = (key) => specParts.find((p) => SPEC_SECTIONS[key].test(heading(p)));
  const known = Object.keys(SPEC_SECTIONS).map(take);
  // A section this page has no place for (a decision, how it works) goes after the rules, so no text is lost.
  const others = specParts.filter((p) => !known.includes(p));
  const { primary, doDont, playground, examples } = pageStories(context);
  const phone = usePhone();
  const css = preparedMeta?.parameters?.spec?.css;
  const intro = (facts || css) && h('div', { className: 'doc-page__intro' }, facts && md(facts), css && h(ImportLine, { css }));
  return h(Fragment, null,
    h(ComponentHeader),
    h(Unstyled, null,
      !phone && intro,
      h('div', { className: 'doc-page', ref: host },
        toc.length > 0 && h('nav', { className: 'doc-nav', 'aria-label': T.onThisPage, ref: nav },
          h('p', null, T.onThisPage),
          h('ul', null, toc.map((t) => h('li', { key: t.id },
            h('a', { href: `#${t.id}`, onClick: (e) => goToSection(e, t.id), 'aria-current': active === t.id ? 'location' : undefined }, t.text))))),
        h('div', { className: 'doc-page__main' },
          playground ? section('playground',
            md(`## ${T.playground}`),
            // Live, not forced: the Controls table changes this same story's args. The bare Story block, because the
            // story already shows its markup and a "Show code" bar under it would say the same thing twice.
            h('div', { className: 'doc-page__hero' },
              h(Story, { of: playground.moduleExport }),
              h(Controls, { of: playground.moduleExport })))
            // No Playground yet: the component itself still opens the page, as the Default story, without a heading.
            : primary && h('div', { key: 'primary', className: 'doc-page__section' }, h(Story, { of: primary.moduleExport })),
          phone && intro,
          h('div', { className: 'doc-page__pair' },
            take('use') && section('use', md(take('use'))),
            take('avoid') && section('avoid', md(take('avoid')))),
          doDont && section('dodont', md(`## ${T.doDont}`), h(Story, { of: doDont.moduleExport })),
          others.map((p) => section(heading(p), md(p))),
          take('api') && section('api', md(take('api'))),
          take('code') && section('code', md(take('code'))),
          take('states') && section('states', md(take('states')), examples.map((s) => h(DocsStory, { key: s.id, of: s.moduleExport, expanded: false }))),
          take('tokens') && section('tokens', md(take('tokens'))),
          take('a11y') && section('a11y', md(take('a11y')))))),
    h(DocPager));
}
