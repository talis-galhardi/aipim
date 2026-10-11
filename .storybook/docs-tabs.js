// Tabs for the tall docs pages. They are the design system's own tabs (.aipim-tabs, set up by components/web/aipim.js),
// so the docs use what they document: click, arrow keys, Home and End, aria-selected and the panels' `hidden` come from
// the component. React only renders the first state; the script owns it from then on, so a re-render does not undo a choice.
import { Children, createElement as h, Fragment, useEffect, useId, useRef } from 'react';
import { Markdown, Stories, useOf } from '@storybook/addon-docs/blocks';

// The page header: a small eyebrow, the title and a lead sentence, over a hairline. No band, no background.
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

// The data form: tabs: [{ label, panel(props) }]; `props` carries the id, role, aria-labelledby and hidden the panel must render with.
export function TabSet({ label = 'Sections', tabs }) {
  const uid = useId().replace(/[^a-z0-9]/gi, '');
  const host = useRef(null);
  useEffect(() => {
    if (host.current && !host.current.dataset.ready) {
      host.current.dataset.ready = 'true';
      window.Aipim?.init(host.current);
    }
  }, []);
  const live = tabs.filter(Boolean);
  if (live.length < 2) return live.length ? live[0].panel({ key: 'only' }) : null;
  const id = (i) => `doctab-${uid}-${i}`;
  return h(Fragment, null,
    h('div', { className: 'aipim-doctabs', ref: host },
      h('div', { className: 'aipim-tabs', role: 'tablist', 'aria-label': label },
        live.map((t, i) => h('button', {
          key: id(i), className: 'aipim-tab', role: 'tab', type: 'button', id: `${id(i)}-tab`,
          'aria-controls': id(i), 'aria-selected': i === 0 ? 'true' : 'false', tabIndex: i === 0 ? 0 : -1,
        }, h('span', null, t.label))))),
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
  return h(TabSet, { label, tabs });
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
  return h(Fragment, null, title && h(DocHeader, { title, lead: intro }), h(TabSet, { label, tabs }));
}

// A component page: facts and "When to use" first, then the stories, the code, the tokens and the accessibility notes.
const SECTION_TAB = [[/^code examples/i, 'code'], [/^tokens used/i, 'tokens'], [/^accessibility/i, 'a11y']];

export function ComponentTabs() {
  const { preparedMeta } = useOf('meta', ['meta']);
  const text = preparedMeta?.parameters?.docs?.description?.component || '';
  const parts = splitLead(text).rest.split(/^(?=## )/m);
  const group = { overview: [], code: [], tokens: [], a11y: [] };
  for (const p of parts) {
    const heading = (p.match(/^## (.+)/) || [])[1] || '';
    const hit = SECTION_TAB.find(([re]) => re.test(heading));
    group[hit ? hit[1] : 'overview'].push(p);
  }
  const md = (key) => group[key].length && ((props) => h(Markdown, props, group[key].join('\n')));
  const entry = (label, panel) => panel && { label, panel };
  return h(TabSet, {
    label: 'Sections of this page',
    tabs: [
      entry('Overview', md('overview')),
      entry('Examples', (props) => h('div', props, h(Stories, { includePrimary: false, title: null }))),
      entry('Code', md('code')),
      entry('Tokens', md('tokens')),
      entry('Accessibility', md('a11y')),
    ],
  });
}
