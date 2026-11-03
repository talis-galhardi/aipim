#!/usr/bin/env python3
"""Smoke test of the Storybook, against a build (npm run build-storybook:all).

The structure of the Storybook of Aipim is changed only through Storybook's APIs, and the look of a docs page leans on a
few of its classes (see .storybook/README.md). This test opens a build in Chromium and checks what a reader would notice
if an upgrade broke it: a script error, the theme and language buttons, the language of the page, the page in one scroll
and the page with tabs (sections, controls, the address), both on a phone, and that every class preview.css reads is
still there, then runs axe on every docs page. The
Portuguese build is at the root and the English one in en/: when en/ is there, both are checked.

    python3 tools/verify_storybook.py [storybook-static]      # needs Playwright: pip install playwright && playwright install chromium

Exit code 0 when every check passes.
"""
import os
import re
import sys

from aipim_tools import ROOT, Checks, read, serve

check = Checks()
BUILD = ['']  # the build folder, set by main()


def check_build(browser, base, lang, label):
    page_path = '?path=/docs/atoms-button--docs'
    docs_iframe = base + 'iframe.html?id=atoms-button--docs&viewMode=docs'

    print(f'The Storybook ({label})')
    errors = []
    pg = browser.new_page(viewport={'width': 1280, 'height': 800})
    pg.on('pageerror', lambda e: errors.append(str(e)))
    pg.goto(base + page_path, wait_until='networkidle')
    pg.wait_for_selector('#storybook-explorer-tree', timeout=30000)
    pg.wait_for_timeout(500)
    check('no script error while the Storybook opens', not errors, '; '.join(errors[:3]))
    check('the theme button is in the toolbar', pg.locator('[aria-label^="Theme:"], [aria-label^="Tema:"]').count() > 0)
    other = 'Read this page in English' if lang == 'pt-BR' else 'Ler esta página em português'
    check('the language button is in the toolbar and names the other language', pg.locator(f'[aria-label="{other}"]').count() > 0)
    check(f'the page says its language ({lang})', pg.evaluate('document.documentElement.lang') == lang, pg.evaluate('document.documentElement.lang'))
    check('a component is one page: its stories are not listed in the sidebar',
          pg.locator('#storybook-explorer-tree [data-item-id="atoms-button--default"]').count() == 0)
    if lang == 'pt-BR' and os.path.exists(os.path.join(BUILD[0], 'en', 'index.html')):
        pg.locator(f'[aria-label="{other}"]').first.click()
        pg.wait_for_load_state('networkidle')
        pg.wait_for_selector('#storybook-explorer-tree', timeout=30000)
        url = pg.url
        check('the language button opens the same page in English', '/en/' in url and 'atoms-button--docs' in url and pg.evaluate('document.documentElement.lang') == 'en', url)
    pg.close()

    print(f'The address ({label})')
    context = browser.new_context(viewport={'width': 1280, 'height': 700}, permissions=['clipboard-read', 'clipboard-write'])
    pg = context.new_page()
    pg.goto(base + page_path, wait_until='networkidle')
    docs = pg.frame_locator('#storybook-preview-iframe')
    docs.locator('.aipim-docnav a').last.wait_for(timeout=30000)
    pg.wait_for_timeout(500)
    steps = pg.evaluate('history.length')
    docs.locator('.aipim-docnav a').last.click()
    pg.wait_for_timeout(500)
    last = docs.locator('.aipim-docnav a').last.get_attribute('href')
    check('a section goes in the address, and the page stays', pg.url.endswith(last) and 'atoms-button--docs' in pg.url, pg.url)
    check('it does not add a step to the Back button', pg.evaluate('history.length') == steps, f"{steps} to {pg.evaluate('history.length')}")
    first = docs.locator('.aipim-docnav a').first.get_attribute('href')
    docs.locator(f'{first} a').first.evaluate('a => a.click()')
    pg.wait_for_timeout(500)
    copied = pg.evaluate('navigator.clipboard.readText()')
    check('the link icon of a heading copies the link of that section', copied.endswith(first) and 'atoms-button--docs' in copied, copied)
    # A section in the middle: the stories above it render late and push it down.
    section = docs.locator('.aipim-docnav a').nth(6).get_attribute('href')
    pg.close()
    pg = context.new_page()
    pg.goto(base + page_path + section, wait_until='networkidle')
    docs = pg.frame_locator('#storybook-preview-iframe')
    docs.locator(section).wait_for(timeout=30000)
    pg.wait_for_timeout(1500)
    top = docs.locator(section).evaluate('e => Math.round(e.getBoundingClientRect().top)')
    check('a link to a section opens at that section', 0 <= top < 200, str(top))
    pg.close()
    pg = context.new_page()
    pg.goto(base + '?path=/docs/atoms-badge--docs', wait_until='networkidle')
    docs = pg.frame_locator('#storybook-preview-iframe')
    tab = docs.locator('.aipim-doctabs [role="tab"]').last
    tab.wait_for(timeout=30000)
    pg.wait_for_timeout(500)
    steps = pg.evaluate('history.length')
    tab.click()
    pg.wait_for_timeout(500)
    check('a tab goes in the address without a step on the Back button', f"#{tab.get_attribute('data-slug')}" in pg.url and pg.evaluate('history.length') == steps, pg.url)
    docs.locator('.aipim-doctabs [role="tab"]').first.click()
    pg.wait_for_timeout(500)
    check('the first tab clears the address', '#' not in pg.url.split('atoms-badge--docs')[-1] or pg.url.endswith('#'), pg.url)
    context.close()

    print(f'A page in one scroll ({label})')
    pg = browser.new_page(viewport={'width': 1280, 'height': 700})
    pg.goto(docs_iframe, wait_until='networkidle')
    pg.wait_for_selector('.aipim-docnav a', timeout=30000)
    pg.wait_for_timeout(500)
    check(f'the docs frame says its language ({lang})', pg.evaluate('document.documentElement.lang') == lang)
    check('nothing on the page is behind a tab', pg.locator('.sbdocs-content [role="tabpanel"]').count() == 0)
    first = pg.evaluate("document.querySelector('.aipim-docpage__section h2').id")
    check('the Playground is the first section', first == 'playground', first)
    links = pg.locator('.aipim-docnav a').count()
    check('"On this page" lists all nine sections of the spec and the stories', links == 9, str(links))
    code = lambda: pg.evaluate("document.querySelector('.pg .pg__pre code').textContent")
    before = code()
    pg.locator('.docblock-argstable input[type="radio"][value="ghost"]').first.click(force=True)
    pg.wait_for_timeout(500)
    check('a control changes the component and the markup under it', 'aipim-button--ghost' in code() and pg.locator('.pg__stage .aipim-button--ghost').count() == 1, code())
    check('the markup started from the default', 'aipim-button--ghost' not in before)
    last = pg.locator('.aipim-docnav a').last
    target = last.get_attribute('href')[1:]
    last.click()
    pg.wait_for_timeout(300)
    top = pg.evaluate(f"Math.round(document.getElementById('{target}').getBoundingClientRect().top)")
    check('a link of the list goes to its section', 0 <= top < 200 or pg.evaluate('window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2'), str(top))
    current = pg.evaluate("document.querySelector('.aipim-docnav [aria-current]')?.getAttribute('href')")
    check('the list marks the section being read', current == f'#{target}', str(current))
    pg.evaluate('window.scrollTo(0, 0)')
    pg.wait_for_timeout(200)
    current = pg.evaluate("document.querySelector('.aipim-docnav [aria-current]')?.getAttribute('href')")
    check('scrolling back moves the mark', current == '#playground', str(current))
    pg.close()

    print(f'A page with tabs ({label})')
    pg = browser.new_page(viewport={'width': 1280, 'height': 700})
    pg.goto(base + 'iframe.html?id=atoms-badge--docs&viewMode=docs', wait_until='networkidle')
    pg.wait_for_selector('.aipim-doctabs [role="tab"]', timeout=30000)
    pg.wait_for_timeout(500)
    tabs = '.aipim-doctabs [role="tab"]'
    n = pg.locator(tabs).count()
    check('the page has five tabs (overview, playground, examples, tokens, accessibility)', n == 5, str(n))
    ys = []
    pg.evaluate(f"document.querySelectorAll('{tabs}')[0].click()")
    pg.wait_for_timeout(250)
    for i in [1, 4, 0, 2, 0, 3, 1]:
        pg.evaluate("window.scrollTo(0, Math.min(2600, document.documentElement.scrollHeight))")
        pg.wait_for_timeout(100)
        pg.evaluate(f"document.querySelectorAll('{tabs}')[{i}].click()")
        pg.wait_for_timeout(300)
        ys.append(round(pg.evaluate("window.scrollY")))
    top = pg.evaluate("Math.round(document.querySelector('.aipim-doctabs').getBoundingClientRect().top)")
    check('tab after tab the page is at the same place and the tab list is stuck to the top', len(set(ys)) == 1 and top == 0, f'{ys}, top {top}')
    selected = pg.evaluate(f"[...document.querySelectorAll('{tabs}')].filter(t => t.getAttribute('aria-selected') === 'true').length")
    check('one tab is selected', selected == 1, str(selected))
    pg.close()

    print(f'A phone ({label})')
    pg = browser.new_page(viewport={'width': 390, 'height': 800})
    pg.goto(docs_iframe, wait_until='networkidle')
    pg.wait_for_selector('.aipim-docnav a', timeout=30000)
    pg.wait_for_timeout(500)
    wide = pg.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
    check('a docs page has no sideways scroll on a phone', wide <= 0, str(wide))
    labels = pg.evaluate("[...document.querySelectorAll('.sbdocs-content table td')].filter(td => td.hasAttribute('data-label')).length")
    check('table cells carry their column name for a phone', labels > 0, str(labels))
    pg.evaluate('window.scrollTo(0, 1500)')
    pg.wait_for_timeout(200)
    bar = pg.evaluate("Math.round(document.querySelector('.aipim-docnav').getBoundingClientRect().top)")
    check('the list of sections stays at the top of the window', bar == 0, str(bar))
    pg.close()
    pg = browser.new_page(viewport={'width': 390, 'height': 800})
    pg.goto(base + 'iframe.html?id=atoms-badge--docs&viewMode=docs', wait_until='networkidle')
    pg.wait_for_selector('.aipim-doctabs [role="tab"]', timeout=30000)
    pg.wait_for_timeout(500)
    wide = pg.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
    check('a page with tabs has no sideways scroll on a phone', wide <= 0, str(wide))
    pg.close()

    # The classes of Storybook that preview.css styles are not a promise of Storybook: an upgrade can rename one, and the
    # page would only look wrong. They are read from the stylesheet, so a new one is checked without being listed here.
    print(f'The classes of Storybook that preview.css reads ({label})')
    hooks = set(re.findall(r'\.(sb-[\w-]+|sbdocs[\w-]*|docblock-[\w-]+|docs-story|token(?![\w-]))', read(os.path.join('.storybook', 'preview.css'))))
    there = set()
    for url in (docs_iframe, base + 'iframe.html?id=atoms-badge--docs&viewMode=docs', base + 'iframe.html?id=atoms-button--default&viewMode=story'):
        pg = browser.new_page(viewport={'width': 1280, 'height': 900})
        pg.goto(url, wait_until='networkidle')
        pg.wait_for_timeout(500)
        there |= {x for x in hooks if pg.locator(f'.{x}').count() > 0}
        pg.close()
    check(f'all {len(hooks)} are still on the pages', hooks == there, ', '.join(sorted(hooks - there)))

    print(f'Every docs page, light and dark ({label}, axe, WCAG 2.2 A and AA)')
    import json as _json, urllib.request as _url
    index = _json.load(_url.urlopen(base + 'index.json'))
    docs = [k for k, v in index['entries'].items() if v['type'] == 'docs']
    axe = read(os.path.join('node_modules', 'axe-core', 'axe.min.js'))
    found = []
    for theme in ('light', 'dark'):
        for d in docs:
            pg = browser.new_page(viewport={'width': 1280, 'height': 900})
            pg.goto(f'{base}iframe.html?id={d}&viewMode=docs&globals=theme:{theme}', wait_until='networkidle')
            pg.wait_for_timeout(800)
            pg.add_script_tag(content=axe)
            v = pg.evaluate("""async () => { const r = await axe.run(document.querySelector('#storybook-docs'),
              { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] }); return r.violations.map(x => x.id + ' x' + x.nodes.length); }""")
            if v:
                found.append(f'{theme} {d}: {", ".join(v)}')
            pg.close()
    check(f'no axe violation on the {len(docs)} docs pages', not found, '; '.join(found[:4]))

    # Every story, alone, as Chromatic opens it: a story file that throws (a missing import, for example) fails here.
    stories = [k for k, v in index['entries'].items() if v['type'] == 'story']
    broken = []
    for st in stories:
        errs = []
        pg = browser.new_page(viewport={'width': 800, 'height': 600})
        pg.on('pageerror', lambda e, errs=errs: errs.append(str(e)))
        pg.goto(f'{base}iframe.html?id={st}&viewMode=story', wait_until='networkidle')
        pg.wait_for_timeout(200)
        shown = pg.evaluate("!!document.querySelector('#storybook-root .aipim-sb')")
        if errs or not shown:
            broken.append(f'{st}: {errs[0][:80] if errs else "nothing rendered"}')
        pg.close()
    check(f'every story ({len(stories)}) renders without a script error', not broken, '; '.join(broken[:4]))
    return set(docs)


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
