#!/usr/bin/env python3
"""Smoke test of the Storybook, against a build (npm run build-storybook:all).

The structure of the Storybook of Aipim is changed only through Storybook's APIs, and the look of a docs page leans on a
few of its classes (see .storybook/README.md). This test opens a build in Chromium and checks what a reader would notice
if an upgrade or a change broke it: the chrome, the address, the component pages at three widths, the theme switch of a
stage, the copy buttons, the HTML to copy against the specs, a component on its page against the component alone, the
classes of Storybook the styles read, then axe on every docs page. The Portuguese build is at the root and the English
one in en/: when en/ is there, both are checked.

    python3 tools/verify_storybook.py [storybook-static]      # needs Playwright: pip install playwright && playwright install chromium

Exit code 0 when every check passes. No step waits a fixed time: each waits for what it needs, so the time limits only
run out when something is broken.
"""
import glob
from html.parser import HTMLParser
import json
import os
import re
import sys
import time
import urllib.request

from aipim_tools import ROOT, Checks, read, serve

check = Checks()
BUILD = ['']  # the build folder, set by main()
PAGE = {'width': 1280, 'height': 900}
SECTIONS = '.doc-nav a'
COPY = '.pg > .pg__code .pg__pre code'
# The page is done when nothing has changed in it for a moment and the fonts are in. The limit is for a page that never rests.
QUIET = """() => Promise.race([
    new Promise((done) => { let t; const go = () => { clearTimeout(t); t = setTimeout(done, 120); };
      new MutationObserver(go).observe(document.documentElement, { childList: true, subtree: true, attributes: true }); go(); }),
    new Promise((done) => setTimeout(done, 4000)),
  ]).then(() => document.fonts.ready).then(() => true)"""


def until(test, timeout=5000):
    """Asks until the answer is true, or the time is up. Returns the last answer."""
    end = time.monotonic() + timeout / 1000
    while True:
        answer = test()
        if answer or time.monotonic() > end:
            return answer
        time.sleep(0.05)


def visit(owner, url, wait_for=None, **page_options):
    """Opens a page from a browser or a context, and returns it when it is done."""
    pg = owner.new_page(**page_options)
    go(pg, url, wait_for)
    return pg


def go(pg, url, wait_for=None):
    pg.goto(url, wait_until='networkidle')
    if wait_for:
        pg.wait_for_selector(wait_for, timeout=30000)
    pg.evaluate(QUIET)


def preview_of(pg):
    """The frame of the docs page inside the Storybook, when it is done and listening."""
    docs = pg.frame_locator('#storybook-preview-iframe')
    docs.locator('.sbdocs-content').first.wait_for(timeout=30000)
    next(f for f in pg.frames if 'iframe.html' in f.url).evaluate(QUIET)
    return docs


class Site:
    """One build of the Storybook, in one language."""

    def __init__(self, browser, base, lang, label):
        self.browser, self.base, self.lang, self.label = browser, base, lang, label
        with urllib.request.urlopen(base + 'index.json') as answer:
            entries = json.load(answer)['entries']
        self.docs = [k for k, v in entries.items() if v['type'] == 'docs']
        self.stories = [k for k, v in entries.items() if v['type'] == 'story']
        self.components = [k for k in self.docs if k.split('-')[0] in ('atoms', 'molecules', 'organisms')]

    def docs_url(self, page='atoms-button', query=''):
        return f'{self.base}iframe.html?id={page}--docs&viewMode=docs{query}'

    def story_url(self, story):
        return f'{self.base}iframe.html?id={story}&viewMode=story'

    def in_storybook(self, page='atoms-button', hash_=''):
        return f'{self.base}?path=/docs/{page}--docs{hash_}'


def check_chrome(site):
    print(f'The Storybook ({site.label})')
    errors = []
    pg = site.browser.new_page(viewport={'width': 1280, 'height': 800})
    pg.on('pageerror', lambda e: errors.append(str(e)))
    go(pg, site.in_storybook(), '#storybook-explorer-tree')
    check('no script error while the Storybook opens', not errors, '; '.join(errors[:3]))
    check('the toolbar has no theme button: the theme is chosen on the stage', pg.locator('[aria-label^="Theme:"], [aria-label^="Tema:"]').count() == 0)
    other = 'Read this page in English' if site.lang == 'pt-BR' else 'Ler esta página em português'
    check('the language button is in the toolbar and names the other language', pg.locator(f'[aria-label="{other}"]').count() > 0)
    check(f'the page says its language ({site.lang})', pg.evaluate('document.documentElement.lang') == site.lang, pg.evaluate('document.documentElement.lang'))
    check('a component is one page: its stories are not listed in the sidebar',
          pg.locator('#storybook-explorer-tree [data-item-id="atoms-button--default"]').count() == 0)
    if site.lang == 'pt-BR' and os.path.exists(os.path.join(BUILD[0], 'en', 'index.html')):
        pg.locator(f'[aria-label="{other}"]').first.click()
        pg.wait_for_url('**/en/**')
        pg.wait_for_selector('#storybook-explorer-tree', timeout=30000)
        check('the language button opens the same page in English', 'atoms-button--docs' in pg.url and pg.evaluate('document.documentElement.lang') == 'en', pg.url)
    pg.close()


def check_address(site):
    print(f'The address ({site.label})')
    context = site.browser.new_context(viewport={'width': 1280, 'height': 700}, permissions=['clipboard-read', 'clipboard-write'])
    pg = context.new_page()
    go(pg, site.in_storybook())
    docs = preview_of(pg)
    docs.locator(SECTIONS).last.wait_for(timeout=30000)
    steps = pg.evaluate('history.length')
    last = docs.locator(SECTIONS).last.get_attribute('href')
    docs.locator(SECTIONS).last.click()
    address = lambda: pg.evaluate('location.href')
    check('a section goes in the address, and the page stays', until(lambda: address().endswith(last)) and 'atoms-button--docs' in address(), address())
    check('it does not add a step to the Back button', pg.evaluate('history.length') == steps, f"{steps} to {pg.evaluate('history.length')}")
    first = docs.locator(SECTIONS).first.get_attribute('href')
    docs.locator(f'{first} a').first.evaluate('a => a.click()')
    copied = until(lambda: (lambda text: text if text.endswith(first) else '')(pg.evaluate('navigator.clipboard.readText()')))
    check('the link icon of a heading copies the link of that section', copied and 'atoms-button--docs' in copied, copied)
    # A section in the middle: the stories above it render late and push it down.
    section = docs.locator(SECTIONS).nth(6).get_attribute('href')
    pg.close()
    pg = context.new_page()
    go(pg, site.in_storybook(hash_=section))
    docs = preview_of(pg)
    docs.locator(section).wait_for(timeout=30000)
    top = lambda: docs.locator(section).evaluate('e => Math.round(e.getBoundingClientRect().top)')
    check('a link to a section opens at that section', until(lambda: 0 <= top() < 200), str(top()))
    pg.close()
    pg = context.new_page()
    go(pg, site.in_storybook('foundations-color'))
    docs = preview_of(pg)
    tab = docs.locator('.doc-tabs [role="tab"]').last
    tab.wait_for(timeout=30000)
    steps = pg.evaluate('history.length')
    slug = tab.get_attribute('data-slug')
    tab.click()
    check('a tab goes in the address without a step on the Back button', until(lambda: f'#{slug}' in pg.evaluate('location.href')) and pg.evaluate('history.length') == steps, pg.evaluate('location.href'))
    preview_of(pg)
    docs.locator('.doc-tabs [role="tab"]').first.click()
    check('the first tab clears the address', until(lambda: pg.evaluate("['', '#'].includes(location.hash)")), pg.evaluate('location.href'))
    context.close()


def check_page_in_one_scroll(site):
    print(f'A page in one scroll ({site.label})')
    pg = visit(site.browser, site.docs_url(), SECTIONS, viewport={'width': 1280, 'height': 700})
    check(f'the docs frame says its language ({site.lang})', pg.evaluate('document.documentElement.lang') == site.lang)
    check('nothing on the page is behind a tab', pg.locator('.sbdocs-content [role="tabpanel"]').count() == 0)
    first = pg.evaluate("document.querySelector('.doc-page__section h2').id")
    check('the Playground is the first section', first == 'playground', first)
    code = lambda: pg.evaluate(f"document.querySelector('{COPY}').textContent")
    before = code()
    pg.locator('.docblock-argstable input[type="radio"][value="ghost"]').first.click(force=True)
    check('a control changes the component and the HTML beside it', until(lambda: 'aipim-button--ghost' in code()) and pg.locator('.pg__stage .aipim-button--ghost').count() == 1, code())
    check('the HTML started from the default', 'aipim-button--ghost' not in before)
    last = pg.locator(SECTIONS).last
    target = last.get_attribute('href')[1:]
    last.click()
    mark = lambda: pg.evaluate("document.querySelector('.doc-nav [aria-current]')?.getAttribute('href')")
    check('the list marks the section being read', until(lambda: mark() == f'#{target}'), str(mark()))
    top = pg.evaluate(f"Math.round(document.getElementById('{target}').getBoundingClientRect().top)")
    check('a link of the list goes to its section', 0 <= top < 200 or pg.evaluate('window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2'), str(top))
    check('the focus goes with it', pg.evaluate('document.activeElement.id') == target, pg.evaluate('document.activeElement.id'))
    pg.evaluate('window.scrollTo(0, 0)')
    check('scrolling back moves the mark', until(lambda: mark() == '#playground'), str(mark()))
    pg.close()


def check_stage_theme(site):
    print(f'The theme of a stage ({site.label})')
    context = site.browser.new_context(viewport=PAGE, color_scheme='light')
    pg = visit(context, site.docs_url(), '.pg__stage [data-pg-theme]')
    look = lambda: pg.evaluate("""(() => {
        const s = document.querySelector('.pg__stage'), c = document.querySelector('.pg > .pg__code');
        return { stage: getComputedStyle(s).backgroundColor, code: getComputedStyle(c).backgroundColor, page: document.documentElement.getAttribute('data-theme'),
                 own: s.getAttribute('data-theme'), mode: s.querySelector('[data-pg-theme]').dataset.mode };
      })()""")
    before = look()
    check('the stage follows the page until a person chooses', before['own'] is None and until(lambda: look()['mode'] == before['page']), str(look()))
    corner = pg.evaluate("""(() => { const s = document.querySelector('.pg__stage').getBoundingClientRect(), b = document.querySelector('[data-pg-theme]').getBoundingClientRect();
        return [Math.round(s.right - b.right), Math.round(b.top - s.top)]; })()""")
    check('the theme switch is in the top right corner of the stage', corner[0] < 24 and corner[1] < 24, str(corner))
    pg.locator('[data-pg-theme]').first.click()
    until(lambda: look()['own'] == 'dark')
    after = look()
    check('the stage changes theme and the rest of the page does not', after['own'] == 'dark' and after['stage'] != before['stage']
          and after['code'] == before['code'] and after['page'] == before['page'], f'{before} / {after}')
    sw = pg.locator('[data-pg-theme]').first
    check('it is a switch with a fixed name, and it says it is on', sw.get_attribute('role') == 'switch' and until(lambda: sw.get_attribute('aria-checked') == 'true')
          and sw.get_attribute('aria-label') == ('Dark theme' if site.lang == 'en' else 'Tema escuro'), f"{sw.get_attribute('role')} {sw.get_attribute('aria-checked')} {sw.get_attribute('aria-label')}")
    pg.locator('.docblock-argstable input[type="radio"][value="ghost"]').first.click(force=True)
    pg.wait_for_selector('.pg__stage .aipim-button--ghost')
    check('a control that redraws the component keeps the stage theme', look()['own'] == 'dark', str(look()))
    go(pg, site.docs_url('atoms-checkbox'), '.pg__stage [data-pg-theme]')
    other = look()
    check('the choice follows to the next page', other['own'] == 'dark' and other['stage'] == after['stage'] and other['page'] == 'light', str(other))
    check('a component with no Playground has a stage and its HTML', 'aipim-checkbox' in pg.evaluate(f"document.querySelector('{COPY}').textContent"))
    pg.locator('[data-pg-theme]').first.click()
    check('and it can go back to light there', until(lambda: look()['own'] == 'light') and look()['stage'] == before['stage'], str(look()))
    pg.close()
    pg = visit(context, site.docs_url(query='&globals=theme:dark'), '.pg__stage [data-pg-theme]')
    check('on a dark page a stage chosen light stays light', until(lambda: look()['page'] == 'dark') and look()['own'] == 'light' and look()['stage'] == before['stage'], str(look()))
    context.close()


def check_copy_buttons(site):
    print(f'The copy buttons ({site.label})')
    # Both code boxes of a page, as a browser that allows it and as one that refuses.
    allow = "() => { navigator.clipboard.writeText = (text) => { window.__copied = text; return Promise.resolve(); }; }"
    refuse = "() => { navigator.clipboard.writeText = () => Promise.reject(new Error('refused')); }"
    context = site.browser.new_context(viewport=PAGE, permissions=['clipboard-write'])
    pg = visit(context, site.docs_url(), '[data-pg-copy]')
    buttons = pg.locator('[data-pg-copy]')
    check('there are two, the import line and the HTML, and they are the same button', buttons.count() == 2, str(buttons.count()))
    for i, what, needle in ((0, 'the import line', 'aipim-ds/components/button.css'), (1, 'the HTML', 'aipim-button')):
        button = buttons.nth(i)
        label = button.get_attribute('aria-label')
        pg.evaluate(allow)
        button.click()
        check(f'{what}: it copies, and the icon says so', until(lambda: button.locator('use').get_attribute('href') == '#aipim-check') and needle in (pg.evaluate('window.__copied') or ''), str(pg.evaluate('window.__copied'))[:80])
        check(f'{what}: the button goes back to what it was', until(lambda: button.get_attribute('aria-label') == label and button.locator('use').get_attribute('href') == '#aipim-copy'), button.get_attribute('aria-label'))
    pg.evaluate(refuse)
    buttons.nth(1).click()
    told = pg.locator('.aipim-toast--error[role="alert"]', has_text=re.compile('copiar|copy', re.I))
    check('when the browser refuses, the person is told, as an error', until(lambda: told.count() > 0))
    pg.close()
    context.close()


def check_tabs(site):
    print(f'A Foundations page with tabs ({site.label})')
    pg = visit(site.browser, site.docs_url('foundations-color'), '.doc-tabs [role="tab"]', viewport={'width': 1280, 'height': 700})
    tabs = '.doc-tabs [role="tab"]'
    n = pg.locator(tabs).count()
    check('the page has its tabs', n >= 3, str(n))
    ys = []
    pg.evaluate(f"document.querySelectorAll('{tabs}')[0].click()")
    for i in [x % n for x in (1, 4, 0, 2, 0, 3, 1)]:
        pg.evaluate('window.scrollTo(0, Math.min(2600, document.documentElement.scrollHeight))')
        pg.evaluate(f"document.querySelectorAll('{tabs}')[{i}].click()")
        pg.evaluate(QUIET)
        ys.append(round(pg.evaluate('window.scrollY')))
    top = pg.evaluate("Math.round(document.querySelector('.doc-tabs').getBoundingClientRect().top)")
    check('tab after tab the page is at the same place and the tab list is stuck to the top', len(set(ys)) == 1 and top == 0, f'{ys}, top {top}')
    selected = pg.evaluate(f"[...document.querySelectorAll('{tabs}')].filter(t => t.getAttribute('aria-selected') === 'true').length")
    check('one tab is selected', selected == 1, str(selected))
    pg.close()


def check_phone(site):
    print(f'A phone ({site.label})')
    sideways = 'document.documentElement.scrollWidth - document.documentElement.clientWidth'
    phone = {'width': 390, 'height': 800}
    pg = visit(site.browser, site.docs_url(), SECTIONS, viewport=phone)
    check('a docs page has no sideways scroll on a phone', pg.evaluate(sideways) <= 0, str(pg.evaluate(sideways)))
    labels = pg.evaluate("[...document.querySelectorAll('.sbdocs-content table td')].filter(td => td.hasAttribute('data-label')).length")
    check('table cells carry their column name for a phone', labels > 0, str(labels))
    pg.evaluate('window.scrollTo(0, 1500)')
    bar = lambda: pg.evaluate("Math.round(document.querySelector('.doc-nav').getBoundingClientRect().top)")
    check('the list of sections stays at the top of the window', until(lambda: bar() == 0), str(bar()))
    pg.close()
    # The facts and the import line open the page on a wide window and come after the Playground on a phone.
    for viewport, what in (({'width': 1280, 'height': 800}, 'before'), (phone, 'after')):
        pg = visit(site.browser, site.docs_url(), SECTIONS, viewport=viewport)
        intro, playground, count = pg.evaluate("""(() => { const top = (s) => document.querySelector(s)?.getBoundingClientRect().top ?? null;
            return [top('.doc-page__intro'), top('#playground'), document.querySelectorAll('.doc-page__intro').length]; })()""")
        check(f"the import line is {what} the Playground at {viewport['width']}px, and in the page once", intro is not None and playground is not None and (intro < playground) == (what == 'before') and count == 1, f'{intro} / {playground} / {count}')
        pg.close()
    pg = visit(site.browser, site.docs_url('foundations-color'), '.doc-tabs [role="tab"]', viewport=phone)
    check('a Foundations page with tabs has no sideways scroll on a phone', pg.evaluate(sideways) <= 0, str(pg.evaluate(sideways)))
    pg.close()


class Tags(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.by_class = {}
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for name in (attrs.get('class') or '').split():
            self.by_class.setdefault(name, []).append((tag, attrs))


# What changes from one example to the next, so a spec can write it without the HTML to copy having to.
PER_EXAMPLE = {'class', 'id', 'for', 'href', 'src', 'alt', 'value', 'name', 'placeholder', 'title', 'aria-label', 'aria-controls', 'aria-labelledby', 'aria-describedby',
               'commandfor', 'data-value', 'checked', 'disabled', 'required', 'open', 'hidden', 'tabindex', 'aria-selected', 'aria-invalid', 'aria-current', 'aria-disabled', 'aria-pressed', 'aria-busy', 'aria-activedescendant'}


def against_spec(component, copied):
    """What the HTML to copy leaves out of what every example of the spec writes on the same class. It is written by hand in
    the stories, apart from the specs, and this is what keeps the two together: it once dropped aria-live on five fields."""
    name = re.sub(r'^(atoms|molecules|organisms)-|--docs$', '', component)
    spec = Tags('\n'.join(re.findall(r'```html\n(.*?)```', read(os.path.join('docs', 'en', 'components', f'{name}.md')), re.S))).by_class
    found = []
    for cls, items in Tags(copied).by_class.items():
        if cls not in spec:
            if not re.match(r'aipim-(icon|visually-hidden|choice-group)', cls):
                found.append(f'{cls} is not in the spec')
            continue
        asked = set.intersection(*[set(a) - PER_EXAMPLE for _, a in spec[cls]])
        for tag, attrs in items:
            found += [f'{cls} has no {a}' for a in sorted(asked - set(attrs))]
            if tag not in {t for t, _ in spec[cls]}:
                found.append(f'{cls} is a {tag}')
    return sorted(set(found))


MEASURE = """(() => {
    const s = document.querySelector('.pg__stage'), c = document.querySelector('.pg > .pg__code'), p = c.querySelector('.pg__pre');
    const a = s.getBoundingClientRect(), k = c.getBoundingClientRect(), r = p.getBoundingClientRect();
    c.style.display = 'none';
    const alone = s.getBoundingClientRect().height;
    c.style.display = '';
    const inside = (stage) => { const b = stage.getBoundingClientRect(); return [...(stage.querySelector(':scope > .pg__view') || stage).children].map((e) => e.getBoundingClientRect())
      .some((q) => q.width > 0 && (q.left < b.left - 1 || q.right > b.right + 1)); };
    const t = [...document.querySelectorAll('.dd__stage')].map((e) => e.getBoundingClientRect());
    const text = p.textContent;
    const classes = [...text.matchAll(/class="([^"]*)"/g)].map((x) => x[1]);
    const dirty = [/\\bstyle="/.test(text) && 'style', /<dialog[^>]*\\bopen\\b/.test(text) && 'dialog open', /href="#aipim-/.test(text) && 'an icon with no sprite file',
      ...classes.filter((x) => x !== x.trim() || x.split(/\\s+/).some((n) => !n.startsWith('aipim-'))).map((x) => `class "${x}"`)].filter(Boolean);
    const labels = [s, c].map((box) => box.querySelector('.pg__label').getBoundingClientRect().top);
    const contents = [s.querySelector('.pg__view'), p].map((e) => e.getBoundingClientRect().top);
    return { dirty, copied: text, nav: [...document.querySelectorAll('.doc-nav a')].map((x) => x.textContent.trim().toLowerCase()),
      side: Math.abs(a.top - k.top) < 1 && Math.abs(a.bottom - k.bottom) < 1 && k.left >= a.right && Math.abs(labels[0] - labels[1]) < 1 && Math.abs(contents[0] - contents[1]) < 1,
      stage: a.height, alone, codeH: r.height, bottom: a.bottom - r.bottom,
      spill: [...document.querySelectorAll('.pg__stage, .dd__stage')].some(inside),
      overlap: t.length > 1 && Math.abs(t[0].top - t[1].top) < 4 && t[0].right > t[1].left,
      cut: [...document.querySelectorAll('.pg__stage *, .dd__stage *')].filter((e) => e.getClientRects().length && /auto|scroll/.test(getComputedStyle(e).overflowY) && e.scrollHeight > e.clientHeight + 1).map((e) => e.className || e.tagName),
      sideways: document.documentElement.scrollWidth - document.documentElement.clientWidth };
  })()"""


def spec_headings(site, component):
    """The ## titles of the spec in the language of the build. The Do and don't section is written by the story."""
    name = re.sub(r'^(atoms|molecules|organisms)-|--docs$', '', component)
    text = read(os.path.join('docs', 'en' if site.lang == 'en' else 'pt-br', 'components', f'{name}.md'))
    titles = re.findall(r'^## (.+)$', re.sub(r'```.*?```', '', text, flags=re.S), re.M)
    return [re.sub(r'[`*]', '', t).strip().lower() for t in titles]


def check_component_pages(site):
    # Every component page at three widths: the stage sets the height and the code fits it, a wide component in a Do and
    # don't stacks instead of running over the next stage, and nothing makes the page scroll sideways.
    print(f"Every component page: the stage, its HTML and the Do and don't ({site.label})")
    tall, short, spilled, over, sideways, stuck, cut, dirty, off_spec, lost = ([] for _ in range(10))
    pg = site.browser.new_page(viewport=PAGE)
    for c in site.components:
        short_name = c.replace('--docs', '')
        pg.set_viewport_size(PAGE)
        go(pg, site.docs_url(short_name), '.pg__stage')
        # With the mouse on the margin, so no block inside the page takes the wheel for itself.
        pg.mouse.move(4, 450)
        pg.mouse.wheel(0, 400)
        if not until(lambda: pg.evaluate('window.scrollY') > 0, 2000):
            stuck.append(short_name)
        pg.evaluate('window.scrollTo(0, 0)')
        for width in (1280, 800, 390):
            pg.set_viewport_size({'width': width, 'height': 900})
            pg.evaluate(QUIET)
            m = pg.evaluate(MEASURE)
            name = f'{short_name} at {width}'
            if width == 1280:
                if m['dirty']:
                    dirty.append(f"{name}: {', '.join(m['dirty'][:3])}")
                off_spec += [f'{short_name}: {x}' for x in against_spec(c, m['copied'])]
                lost += [f'{short_name}: {t}' for t in spec_headings(site, c) if not any(t in n or n in t for n in m['nav'])]
                if not m['side'] or abs(m['stage'] - m['alone']) > 1:
                    tall.append(f"{name}: {round(m['stage'])}px, {round(m['alone'])}px without its code, lined up {m['side']}")
                if m['codeH'] < 40 or m['bottom'] < -1:
                    short.append(f"{name}: code {round(m['codeH'])}px, {round(m['bottom'])}px from the bottom of the stage")
            if m['spill']:
                spilled.append(name)
            if m['overlap']:
                over.append(name)
            if m['cut']:
                cut.append(f"{name}: {', '.join(m['cut'][:2])}")
            if m['sideways'] > 0:
                sideways.append(f"{name}: {m['sideways']}px")
    pg.close()
    check(f'on the {len(site.components)} pages the box of the code lines up with the stage, label and content too, and does not change its height', not tall, '; '.join(tall[:4]))
    check('the code is visible and no taller than the stage', not short, '; '.join(short[:4]))
    check('the HTML to copy is the component: no style, no class of the docs, no dialog left open, icons from the sprite file', not dirty, '; '.join(dirty[:6]))
    check('the HTML to copy writes what the spec of the component writes', not off_spec, '; '.join(off_spec[:6]))
    check('"On this page" has every section of the spec', not lost, '; '.join(lost[:6]))
    check('the wheel scrolls every component page', not stuck, ', '.join(stuck[:6]))
    check('no component in a stage is cut short, with a scroll of its own', not cut, '; '.join(cut[:6]))
    check('no component runs out of its stage', not spilled, ', '.join(spilled[:6]))
    check("no stage of a Do and don't runs over the next one", not over, ', '.join(over[:6]))
    check('no component page scrolls sideways at 1280, 800 or 390', not sideways, ', '.join(sideways[:6]))


def check_same_as_alone(site):
    # The type of the docs must not reach a component: on a docs page it has to look as it does alone. A rule of the page once
    # made the helper text of every field 18px where the component says 14px, and nothing noticed.
    print(f'A component on its docs page is the same as alone ({site.label})')
    styles = """() => [...document.querySelectorAll('.pg__view, .dd__stage, .dd__caption, .doc-story__content')].filter((b) => !b.querySelector('.pg__view, .dd__stage'))
        .flatMap((b) => [...b.querySelectorAll('*')]).filter((e) => e.getClientRects().length && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()))
        .map((e) => { const c = getComputedStyle(e); return { tag: e.tagName, text: e.textContent.trim().slice(0, 24), look: [c.fontSize, c.lineHeight, c.fontWeight, c.color].join(' ') }; })"""
    context = site.browser.new_context(viewport=PAGE, color_scheme='light')
    pg = context.new_page()
    differ = []
    for c in site.components:
        go(pg, site.docs_url(c.replace('--docs', '')), '.pg__view')
        inside = pg.evaluate(styles)
        alone = {}
        for story in ('default', 'all-states', 'do-and-dont', 'playground'):
            story = c.replace('--docs', f'--{story}')
            if story not in site.stories:
                continue
            go(pg, site.story_url(story), '.doc-story__content')
            for x in pg.evaluate(styles):
                alone.setdefault((x['tag'], x['text']), set()).add(x['look'])
        differ += [f"{c.replace('--docs', '')}, {x['text']}: {x['look']} where it is {sorted(alone[(x['tag'], x['text'])])[0]}"
                   for x in inside if (x['tag'], x['text']) in alone and x['look'] not in alone[(x['tag'], x['text'])]]
    context.close()
    check('size, line, weight and color of its text match, in the stage, the states and the do and don\'t', not differ, '; '.join(differ[:4]))


def check_storybook_classes(site):
    # The classes of Storybook that the styles read are not a promise of Storybook: an upgrade can rename one, and the page
    # would only look wrong. They are read from the stylesheets, so a new one is checked without being listed here.
    print(f'The classes of Storybook that the styles read ({site.label})')
    styles = ''.join(read(f) for f in sorted(glob.glob(os.path.join(ROOT, '.storybook', 'styles', '*.css'))))
    hooks = set(re.findall(r'\.(sb-[\w-]+|sbdocs[\w-]*|docblock-[\w-]+|docs-story|token(?![\w-]))', styles))
    there = set()
    for url in (site.docs_url(), site.docs_url('atoms-badge'), site.story_url('atoms-button--default')):
        pg = visit(site.browser, url, viewport=PAGE)
        there |= {x for x in hooks if pg.locator(f'.{x}').count() > 0}
        pg.close()
    check(f'all {len(hooks)} are still on the pages', hooks == there, ', '.join(sorted(hooks - there)))


def check_axe(site):
    print(f'Every docs page, light and dark ({site.label}, axe, WCAG 2.2 A and AA)')
    axe = read(os.path.join('node_modules', 'axe-core', 'axe.min.js'))
    found = []
    for theme in ('light', 'dark'):
        pg = site.browser.new_page(viewport=PAGE)
        for d in site.docs:
            go(pg, site.docs_url(d.replace('--docs', ''), f'&globals=theme:{theme}'), '.sbdocs-content')
            pg.add_script_tag(content=axe)
            # The helper of a disabled field is dimmed on purpose: a disabled control is exempt from WCAG 1.4.3 (the stories exempt it too).
            v = pg.evaluate("""async () => { const r = await axe.run({ include: [['#storybook-docs']], exclude: [...document.querySelectorAll('.aipim-field__control:disabled ~ .aipim-field__helper')].map((e) => ['#' + e.id]) },
              { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] }); return r.violations.map(x => x.id + ' x' + x.nodes.length); }""")
            if v:
                found.append(f'{theme} {d}: {", ".join(v)}')
        pg.close()
    check(f'no axe violation on the {len(site.docs)} docs pages', not found, '; '.join(found[:4]))


def check_stories(site):
    # Every story, alone, as Chromatic opens it: a story file that throws (a missing import, for example) fails here.
    broken = []
    pg = site.browser.new_page(viewport={'width': 800, 'height': 600})
    errors = []
    pg.on('pageerror', lambda e: errors.append(str(e)))
    for story in site.stories:
        errors.clear()
        go(pg, site.story_url(story))
        if errors or not pg.evaluate("!!document.querySelector('#storybook-root .doc-story')"):
            broken.append(f'{story}: {errors[0][:80] if errors else "nothing rendered"}')
    pg.close()
    check(f'every story ({len(site.stories)}) renders without a script error', not broken, '; '.join(broken[:4]))


def check_build(browser, base, lang, label):
    site = Site(browser, base, lang, label)
    for section in (check_chrome, check_address, check_page_in_one_scroll, check_stage_theme, check_copy_buttons, check_tabs, check_phone,
                    check_component_pages, check_same_as_alone, check_storybook_classes, check_axe, check_stories):
        section(site)
    return set(site.docs)


def main():
    build = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith('-') else os.path.join(ROOT, 'storybook-static'))
    if not os.path.exists(os.path.join(build, 'index.html')):
        print(f'No Storybook build in {build}. Run: npm run build-storybook:all')
        sys.exit(2)
    from playwright.sync_api import sync_playwright

    BUILD[0] = build
    with serve(build) as root, sync_playwright() as p:
        base = root + '/'
        browser = p.chromium.launch()
        pt = check_build(browser, base, 'pt-BR', 'Portuguese')
        if os.path.exists(os.path.join(build, 'en', 'index.html')):
            print()
            en = check_build(browser, base + 'en/', 'en', 'English')
            print('Both languages')
            check('the two builds have the same pages, so the language button keeps the page', pt == en, f'{sorted(pt ^ en)[:4]}')
        browser.close()
    sys.exit(check.finish())


if __name__ == '__main__':
    main()
