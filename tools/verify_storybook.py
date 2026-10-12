#!/usr/bin/env python3
"""Smoke test of the Storybook, against a build (npx storybook build -o storybook-static).

The Storybook of Aipim is changed only through Storybook's APIs (see .storybook/README.md). This test opens a build in
Chromium and checks what a reader would notice if an upgrade broke it: a script error, the theme button, the tabs of a
docs page and the page on a phone.

    python3 tools/verify_storybook.py [storybook-static]      # needs Playwright: pip install playwright && playwright install chromium

Exit code 0 when every check passes.
"""
import functools
import http.server
import os
import sys
import threading

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
failures = []


def check(name, ok, detail=''):
    print(('  ok   ' if ok else '  FAIL ') + name + ('' if ok else (': ' + detail if detail else '')))
    if not ok:
        failures.append(name)


def serve(directory):
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *args):
            pass

    server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(Quiet, directory=directory))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server


def main():
    build = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith('-') else os.path.join(ROOT, 'storybook-static'))
    if not os.path.exists(os.path.join(build, 'index.html')):
        print(f'No Storybook build in {build}. Run: npx storybook build -o storybook-static')
        sys.exit(2)
    from playwright.sync_api import sync_playwright

    server = serve(build)
    base = f'http://127.0.0.1:{server.server_address[1]}/'
    page_path = '?path=/docs/atoms-button--docs'
    docs_iframe = base + 'iframe.html?id=atoms-button--docs&viewMode=docs'

    with sync_playwright() as p:
        browser = p.chromium.launch()

        print('The Storybook')
        errors = []
        pg = browser.new_page(viewport={'width': 1280, 'height': 800})
        pg.on('pageerror', lambda e: errors.append(str(e)))
        pg.goto(base + page_path, wait_until='networkidle')
        pg.wait_for_selector('#storybook-explorer-tree', timeout=30000)
        pg.wait_for_timeout(500)
        check('no script error while the Storybook opens', not errors, '; '.join(errors[:3]))
        check('the theme button is in the toolbar', pg.locator('[aria-label^="Theme:"]').count() > 0)
        check('a component is one page: its stories are not listed in the sidebar',
              pg.locator('#storybook-explorer-tree [data-item-id="atoms-button--default"]').count() == 0)
        pg.close()

        print('A docs page')
        pg = browser.new_page(viewport={'width': 1280, 'height': 700})
        pg.goto(docs_iframe, wait_until='networkidle')
        pg.wait_for_selector('.aipim-doctabs [role="tab"]', timeout=30000)
        pg.wait_for_timeout(500)
        tabs = '.aipim-doctabs [role="tab"]'
        n = pg.locator(tabs).count()
        check('the page has tabs (Overview, Examples, Code, Tokens, Accessibility)', n == 5, str(n))
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

        print('A phone')
        pg = browser.new_page(viewport={'width': 390, 'height': 800})
        pg.goto(docs_iframe, wait_until='networkidle')
        pg.wait_for_selector('.aipim-doctabs [role="tab"]', timeout=30000)
        pg.wait_for_timeout(500)
        wide = pg.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
        check('a docs page has no sideways scroll on a phone', wide <= 0, str(wide))
        labels = pg.evaluate("[...document.querySelectorAll('.sbdocs-content table td')].filter(td => td.hasAttribute('data-label')).length")
        check('table cells carry their column name for a phone', labels > 0, str(labels))
        pg.close()

        print('Every docs page, light and dark (axe, WCAG 2.2 A and AA)')
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

        browser.close()
    server.shutdown()
    print()
    print('All checks passed.' if not failures else f'{len(failures)} check(s) failed.')
    sys.exit(1 if failures else 0)


if __name__ == '__main__':
    main()
