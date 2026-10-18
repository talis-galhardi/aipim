#!/usr/bin/env python3
"""Smoke test of the Storybook, against a build (npm run build-storybook:all).

The Storybook of Aipim is changed only through Storybook's APIs (see .storybook/README.md). This test opens a build in
Chromium and checks what a reader would notice if an upgrade broke it: a script error, the theme and language buttons,
the language of the page, the tabs of a docs page and the page on a phone, then runs axe on every docs page. The
Portuguese build is at the root and the English one in en/: when en/ is there, both are checked.

    python3 tools/verify_storybook.py [storybook-static]      # needs Playwright: pip install playwright && playwright install chromium

Exit code 0 when every check passes.
"""
import os
import sys

from aipim_tools import ROOT, Checks, serve

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

    print(f'A docs page ({label})')
    pg = browser.new_page(viewport={'width': 1280, 'height': 700})
    pg.goto(docs_iframe, wait_until='networkidle')
    pg.wait_for_selector('.aipim-doctabs [role="tab"]', timeout=30000)
    pg.wait_for_timeout(500)
    check(f'the docs frame says its language ({lang})', pg.evaluate('document.documentElement.lang') == lang)
    tabs = '.aipim-doctabs [role="tab"]'
    n = pg.locator(tabs).count()
    check('the page has five tabs (overview, examples, code, tokens, accessibility)', n == 5, str(n))
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
    pg.wait_for_selector('.aipim-doctabs [role="tab"]', timeout=30000)
    pg.wait_for_timeout(500)
    wide = pg.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
    check('a docs page has no sideways scroll on a phone', wide <= 0, str(wide))
    labels = pg.evaluate("[...document.querySelectorAll('.sbdocs-content table td')].filter(td => td.hasAttribute('data-label')).length")
    check('table cells carry their column name for a phone', labels > 0, str(labels))
    pg.close()

    print(f'Every docs page, light and dark ({label}, axe, WCAG 2.2 A and AA)')
    import json as _json, urllib.request as _url
    index = _json.load(_url.urlopen(base + 'index.json'))
    docs = [k for k, v in index['entries'].items() if v['type'] == 'docs']
    axe = open(os.path.join(ROOT, 'node_modules', 'axe-core', 'axe.min.js')).read()
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
