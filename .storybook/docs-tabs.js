// Tabs and navigation for the docs pages. The tabs are the design system's own (.aipim-tabs, set up by
// components/web/aipim.js), so the docs use what they document: click, arrow keys, Home and End, aria-selected and the
// panels' `hidden` come from the component. React only renders the first state; the script owns it from then on, so a
// re-render does not undo a choice. Around the tabs: the tab and the section in the address, an "On this page" list, links to
// the heading of a section and the previous and next page.
import { Children, createElement as h, Fragment, useContext, useEffect, useId, useRef, useState } from 'react';
import { AnchorMdx, CodeOrSourceMdx, DocsContext, DocsStory, HeadersMdx, Markdown, useOf } from '@storybook/addon-docs/blocks';

// ---- Address -------------------------------------------------------------------------------------------------------
// The docs page is an iframe of the Storybook, and the address of the person is the one of the window above it. A tab is
// `#tab-tokens`, a section is its heading id (`#when-not-to-use`). Both are written with replaceState: the Back button
// is for pages, not for tabs.
const slugOf = (label) => `tab-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`;
const topWindow = () => {
  try { if (window.parent && window.parent !== window && window.parent.location.origin === window.location.origin) return window.parent; } catch (e) { /* cross-origin: use this window */ }
  return window;
};
const setHash = (hash) => {
  const w = topWindow();
  try { const u = new URL(w.location.href); u.hash = hash; w.history.replaceState(w.history.state, '', u); } catch (e) { /* no address to write */ }
};

// ---- Page header ---------------------------------------------------------------------------------------------------
// A small eyebrow, the title and a lead sentence, over a hairline. No band, no background.
export function DocHeader({ eyebrow, title, lead }) {
  return h('header', { className: 'aipim-doc-header' },
    eyebrow && h('p', { className: 'aipim-doc-eyebrow' }, eyebrow),
    h('h1', { className: 'aipim-doc-title' }, title),
    lead && h(Markdown, { className: 'aipim-doc-lead' }, lead));
}

// specDoc() writes the lead sentence first; the header shows it and the overview tab does not repeat it.
const splitLead = (text) => {
  const i = text.search(/^(<|## )/m);
  return i <= 0 ? { lead: '', rest: text } : { lead: text.slice(0, i).trim(), rest: text.slice(i) };
};

// The header of a component page: the group the page sits in, the name and the lead.
export function ComponentHeader() {
  const { preparedMeta } = useOf('meta', ['meta']);
  const path = String(preparedMeta?.title || '').split('/');
  const name = path.pop();
  const text = preparedMeta?.parameters?.docs?.description?.component || '';
  return h(DocHeader, { eyebrow: path.join(' / '), title: name, lead: splitLead(text).lead });
}

// ---- Previous and next ---------------------------------------------------------------------------------------------
// The order of the sidebar. Reading the page of a family one after the other should not need the menu.
const PAGES = [
  ['introduction--docs', 'Introduction'],
  ['foundations-color--docs', 'Color'], ['foundations-typography--docs', 'Typography'], ['foundations-space-layout--docs', 'Space & layout'],
  ['foundations-shape-elevation--docs', 'Shape & elevation'], ['foundations-motion-touch--docs', 'Motion & touch'], ['foundations-icons-illustrations--docs', 'Icons & illustrations'],
  ['atoms-badge--docs', 'Badge'], ['atoms-button--docs', 'Button'], ['atoms-checkbox--docs', 'Checkbox'], ['atoms-icon-button--docs', 'Icon button'],
  ['atoms-link--docs', 'Link'], ['atoms-radio--docs', 'Radio'], ['atoms-switch--docs', 'Switch'], ['atoms-tag--docs', 'Tag'],
  ['molecules-alert--docs', 'Alert'], ['molecules-card--docs', 'Card'], ['molecules-empty-state--docs', 'Empty state'], ['molecules-tabs--docs', 'Tabs'],
  ['molecules-text-field--docs', 'Text field'], ['molecules-toast--docs', 'Toast'],
  ['organisms-modal--docs', 'Modal'], ['organisms-tab-bar--docs', 'Tab bar'], ['organisms-top-bar--docs', 'Top bar'],
  ['guides-documentation-layout--docs', 'Documentation layout'], ['guides-patterns-and-the-florão--docs', 'Patterns and the florão'],
  ['guides-tutorials-ai-agents--docs', 'Tutorial: AI agents'], ['guides-tutorials-designers--docs', 'Tutorial: Designers'], ['guides-tutorials-developers--docs', 'Tutorial: Developers'],
  ['guides-verification--docs', 'Verification'], ['guides-voice-and-microcopy--docs', 'Voice and microcopy'],
];

export function DocPager() {
  const id = new URLSearchParams(window.location.search).get('id');
  const i = PAGES.findIndex(([pid]) => pid === id);
  if (i < 0) return null;
  const link = ([pid, label], dir) => h('a', { className: `aipim-doc-pager__link aipim-doc-pager__link--${dir}`, href: `./?path=/docs/${pid}`, target: '_top' },
    h('span', null, dir === 'prev' ? 'Previous' : 'Next'), h('strong', null, label));
  return h('nav', { className: 'aipim-doc-pager', 'aria-label': 'Previous and next page' },
    i > 0 ? link(PAGES[i - 1], 'prev') : h('span'), i < PAGES.length - 1 ? link(PAGES[i + 1], 'next') : h('span'));
}

// ---- Tabs ----------------------------------------------------------------------------------------------------------
// The data form: tabs: [{ label, panel(props) }]; `props` carries the id, role, aria-labelledby and hidden the panel must render with.
export function TabSet({ label = 'Sections', tabs }) {
  const uid = useId().replace(/[^a-z0-9]/gi, '');
  const host = useRef(null);
  const [toc, setToc] = useState([]);
  const live = tabs.filter(Boolean);

  useEffect(() => {
    const el = host.current;
    if (!el) return undefined;
    if (!el.dataset.ready) { el.dataset.ready = 'true'; window.Aipim?.init(el); }
    const content = el.parentElement;
    const tabEls = [...el.querySelectorAll('[role="tab"]')];
    const panelOf = (tab) => document.getElementById(tab.getAttribute('aria-controls'));
    const current = () => tabEls.find((t) => t.getAttribute('aria-selected') === 'true');
    const choose = (tab) => { if (tab && tab.getAttribute('aria-selected') !== 'true') tab.click(); };
    // The "On this page" list is read from the panel that shows, so it is the list of what is there.
    const refresh = () => {
      const panel = current() && panelOf(current());
      const items = panel ? [...panel.querySelectorAll('h2[id], .sb-anchor > h3[id]')]
        .map((x) => ({ id: x.id, text: x.textContent.replace(/\s+/g, ' ').trim() })).filter((x) => x.text) : [];
      setToc(items);
    };
    // Go to a section: open the tab that holds it, then scroll to it.
    const go = (id, { write = true, copy = false } = {}) => {
      const target = document.getElementById(id);
      if (!target) return false;
      const panel = target.closest('[role="tabpanel"]');
      choose(tabEls.find((t) => t.getAttribute('aria-controls') === (panel && panel.id)));
      refresh();
      if (write) setHash(id);
      if (copy) { try { navigator.clipboard?.writeText(topWindow().location.href).catch(() => {}); } catch (e) { /* the address is there to copy */ } }
      requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
      return true;
    };
    const fromAddress = () => {
      const hash = decodeURIComponent(topWindow().location.hash.slice(1));
      if (!hash) return;
      const tab = tabEls.find((t) => t.dataset.slug === hash);
      if (tab) { choose(tab); refresh(); return; }
      go(hash, { write: false });
    };
    const onTab = (e) => {
      const tab = e.target.closest('[role="tab"]');
      if (!tab) return;
      setHash(tabEls.indexOf(tab) === 0 ? '' : tab.dataset.slug);
      refresh();
      // The list sticks to the top: what follows it ("On this page", then the panel) starts right under it, not the
      // panel alone (aipim.js puts the panel there; the list of sections goes above it).
      requestAnimationFrame(() => {
        const next = el.nextElementSibling;
        if (!next) return;
        const edge = el.getBoundingClientRect().bottom + 16;
        const top = next.getBoundingClientRect().top;
        if (top < edge - 1) window.scrollBy({ top: top - edge });
      });
    };
    // The link icon of a heading keeps the person on the page: it opens the section, writes the address and copies it.
    const onAnchor = (e) => {
      const a = e.target instanceof Element ? e.target.closest('a[href^="#"]') : null;
      if (!a || !a.closest('h2, h3') || !a.closest('.sbdocs-content')) return;
      e.preventDefault();
      e.stopPropagation();
      go(a.getAttribute('href').slice(1), { copy: true });
    };
    el.addEventListener('click', onTab);
    content.addEventListener('click', onAnchor, true);
    const w = topWindow();
    w.addEventListener('hashchange', fromAddress);
    refresh();
    fromAddress();
    return () => {
      el.removeEventListener('click', onTab);
      content.removeEventListener('click', onAnchor, true);
      w.removeEventListener('hashchange', fromAddress);
    };
  }, []);

  if (live.length < 2) return live.length ? live[0].panel({ key: 'only' }) : null;
  const id = (i) => `doctab-${uid}-${i}`;
  const goTo = (e, target) => {
    e.preventDefault();
    const a = document.getElementById(target);
    if (a) { setHash(target); a.scrollIntoView({ block: 'start' }); }
  };
  return h(Fragment, null,
    h('div', { className: 'aipim-doctabs', ref: host },
      h('div', { className: 'aipim-tabs', role: 'tablist', 'aria-label': label },
        live.map((t, i) => h('button', {
          key: id(i), className: 'aipim-tab', role: 'tab', type: 'button', id: `${id(i)}-tab`, 'data-slug': slugOf(t.label),
          'aria-controls': id(i), 'aria-selected': i === 0 ? 'true' : 'false', tabIndex: i === 0 ? 0 : -1,
        }, h('span', null, t.label))))),
    toc.length >= 3 && h('nav', { className: 'aipim-doc-toc', 'aria-label': 'On this page' },
      h('p', null, 'On this page'),
      h('ul', null, toc.map((t) => h('li', { key: t.id }, h('a', { href: `#${t.id}`, onClick: (e) => goTo(e, t.id) }, t.text))))),
    live.map((t, i) => t.panel({ key: id(i), id: id(i), role: 'tabpanel', 'aria-labelledby': `${id(i)}-tab`, hidden: i !== 0, tabIndex: 0 })));
}

// MDX: <DocTabs><DocTab label="...">content</DocTab>...</DocTabs>. The children of a tab become the direct children of its
// panel, so the grid of the page (see preview.css) applies to every panel.
export const DocTab = () => null;
export function DocTabs({ label, children }) {
  const tabs = Children.toArray(children).map((c) => ({
    label: c.props.label,
    panel: (props) => h('div', props, c.props.children),
  }));
  return h(Fragment, null, h(TabSet, { label, tabs }), h(DocPager));
}

// The "## " sections of a Markdown text, with what comes before the first one.
function split(text) {
  const parts = text.split(/^(?=## )/m);
  const intro = parts[0].startsWith('## ') ? '' : parts.shift();
  return { intro: intro.trim(), sections: parts.map((p) => ({ heading: (p.match(/^## (.+)/) || [])[1] || '', text: p })) };
}

// A Markdown spec as tabs. `groups` is [[label, [heading prefixes]]]; a section that matches none goes to the first tab.
// The title and the intro stay above the tabs.
export function MarkdownTabs({ md, groups, label }) {
  const title = (md.match(/^# (.+)$/m) || [])[1];
  const { intro, sections } = split(md.replace(/^# .+\n+/, ''));
  const bucket = groups.map(() => []);
  for (const s of sections) {
    const i = groups.findIndex(([, heads]) => heads.some((p) => s.heading.startsWith(p)));
    bucket[i < 0 ? 0 : i].push(s.text);
  }
  const tabs = groups.map(([name], i) => bucket[i].length && { label: name, panel: (props) => h(Markdown, props, bucket[i].join('\n')) });
  return h(Fragment, null, title && h(DocHeader, { title, lead: intro }), h(TabSet, { label, tabs }), h(DocPager));
}

// ---- A component page ----------------------------------------------------------------------------------------------
// Overview (facts, when to use, variants, states and the do and don't), Examples (the other stories), Code, Tokens and
// Accessibility.
const SECTION_TAB = [[/^code examples/i, 'code'], [/^tokens used/i, 'tokens'], [/^accessibility/i, 'a11y']];

export function ComponentTabs() {
  const { preparedMeta } = useOf('meta', ['meta']);
  const context = useContext(DocsContext);
  const text = preparedMeta?.parameters?.docs?.description?.component || '';
  const parts = splitLead(text).rest.split(/^(?=## )/m);
  const group = { overview: [], code: [], tokens: [], a11y: [] };
  for (const p of parts) {
    const heading = (p.match(/^## (.+)/) || [])[1] || '';
    const hit = SECTION_TAB.find(([re]) => re.test(heading));
    group[hit ? hit[1] : 'overview'].push(p);
  }

  // The stories: the first is the preview at the top. The do and don't belongs with the rules, in the overview; the rest
  // (all states, playground) are the examples. The same filter Storybook's own Stories block uses.
  let stories = context.componentStories();
  const only = context.projectAnnotations?.parameters?.docs?.stories?.filter;
  if (only) stories = stories.filter((s) => only(s, context.getStoryContext(s)));
  if (stories.some((s) => s.tags?.includes('autodocs'))) stories = stories.filter((s) => s.tags?.includes('autodocs') && !s.usesMount);
  stories = stories.slice(1);
  const doDont = stories.find((s) => /do-and-dont$/.test(s.id));
  const examples = stories.filter((s) => s !== doDont);
  const story = (s) => h(DocsStory, { key: s.id, of: s.moduleExport, expanded: true, __forceInitialArgs: true });

  if (doDont) group.overview.push("## Do and don't\n\n<AipimDoDont />\n");
  const overview = (props) => h(Markdown, {
    ...props,
    // `overrides` replaces the block's own (code, links, heading anchors), so they are listed again here.
    options: { overrides: { code: CodeOrSourceMdx, a: AnchorMdx, ...HeadersMdx, AipimDoDont: () => h(DocsStory, { of: doDont.moduleExport, expanded: false, __forceInitialArgs: true }) } },
  }, group.overview.join('\n'));
  const md = (key) => group[key].length && ((props) => h(Markdown, props, group[key].join('\n')));
  const entry = (label, panel) => panel && { label, panel };
  return h(Fragment, null,
    h(TabSet, {
      label: 'Sections of this page',
      tabs: [
        entry('Overview', group.overview.length && overview),
        entry('Examples', examples.length && ((props) => h('div', props, examples.map(story)))),
        entry('Code', md('code')),
        entry('Tokens', md('tokens')),
        entry('Accessibility', md('a11y')),
      ],
    }),
    h(DocPager));
}
