#!/usr/bin/env python3
"""Smoke test of the Storybook customizations, against a build (npx storybook build -o storybook-static).

The Storybook of Aipim changes parts of Storybook that have no API for it (the arrows and the groups of the menu, the
bar of a phone, the tabs of a docs page). They depend on markup that Storybook owns, so a new version of Storybook can
break them without a word. This test is what says so. It starts a local server for the build, opens it in Chromium and
checks what a person would notice. See .storybook/README.md for the list of what is changed and which markup it needs.

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

        print('The menu (desktop)')
        errors = []
        pg = browser.new_page(viewport={'width': 1280, 'height': 800})
        pg.on('pageerror', lambda e: errors.append(str(e)))
        pg.goto(base + page_path, wait_until='networkidle')
        pg.wait_for_selector('#storybook-explorer-tree [data-nodetype="document"]', timeout=30000)
        pg.wait_for_timeout(500)
        check('no script error while the Storybook opens', not errors, '; '.join(errors[:3]))
        check('the "expand all" button of a group header is not shown',
              not any(pg.locator('button[data-action="expand-all"]').nth(i).is_visible() for i in range(pg.locator('button[data-action="expand-all"]').count())))
        arrow = pg.evaluate("""(() => {
          const b = document.querySelector('button[data-action="collapse-root"]');
          const s = b && b.querySelector('svg');
          if (!s) return null;
          const r = s.getBoundingClientRect(), box = s.parentElement.getBoundingClientRect();
          return { w: r.width, cx: r.x + r.width / 2, bx: box.x + box.width / 2, cy: r.y + r.height / 2, by: box.y + box.height / 2 };
        })()""")
        check('the arrow of a group is 12px and centered in its box',
              arrow is not None and abs(arrow['w'] - 12) < 0.6 and abs(arrow['cx'] - arrow['bx']) < 0.6 and abs(arrow['cy'] - arrow['by']) < 0.6, str(arrow))
        nested = pg.evaluate("""(() => {
          const s = document.querySelector('#storybook-explorer-tree [data-nodetype="group"] button svg:not([viewBox])');
          return s ? s.getBoundingClientRect().width : null;
        })()""")
        check('the arrow of a group inside a group is 12px too (or there is none)', nested is None or abs(nested - 12) < 0.6, str(nested))

        # A group closes and opens: the rows go away after the slide and come back.
        header = pg.locator('button[data-action="collapse-root"]').first
        rows_before = pg.locator('#storybook-explorer-tree [data-nodetype="document"]').count()
        header.click()
        pg.wait_for_timeout(120)
        rows_mid = pg.locator('#storybook-explorer-tree [data-nodetype="document"]').count()
        pg.wait_for_timeout(500)
        rows_closed = pg.locator('#storybook-explorer-tree [data-nodetype="document"]').count()
        check('a group slides closed: its rows are still there for the slide, then they are gone',
              rows_mid == rows_before and rows_closed < rows_before, f'{rows_before} / {rows_mid} / {rows_closed}')
        header.click()
        pg.wait_for_timeout(600)
        rows_open = pg.locator('#storybook-explorer-tree [data-nodetype="document"]').count()
        check('a group opens again with all its rows', rows_open == rows_before, f'{rows_before} / {rows_open}')
        check('the theme button is in the toolbar', pg.get_by_role('button', name='Aipim theme').count() > 0 or pg.locator('[aria-label*="theme" i]').count() > 0)
        check('the browser tab is named "Button · Aipim Design System"', pg.title() == 'Button · Aipim Design System', pg.title())
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
        pg.goto(base + page_path, wait_until='networkidle')
        pg.wait_for_selector('button[aria-label="Open navigation menu"]', timeout=30000)
        pg.wait_for_timeout(500)
        burger = pg.evaluate("document.querySelector('button[aria-label=\"Open navigation menu\"] svg').getBoundingClientRect().width")
        check('the menu icon in the bar is 20px', abs(burger - 20) < 0.6, str(burger))
        pg.get_by_role('button', name='Open navigation menu').click()
        pg.wait_for_timeout(900)
        drawer = pg.evaluate("""(() => { const d = document.querySelector('#storybook-mobile-menu'); if (!d) return null;
          const r = d.getBoundingClientRect(); return { left: r.left, w: r.width, h: r.height }; })()""")
        check('the menu is a drawer on the left, full height, at most 360px wide',
              drawer is not None and drawer['left'] <= 1 and drawer['w'] <= 361 and drawer['h'] >= 790, str(drawer))
        arrow = pg.evaluate("document.querySelector('#storybook-mobile-menu button[data-action=\"collapse-root\"] svg').getBoundingClientRect().width")
        check('the arrow of a group is 12px on a phone', abs(arrow - 12) < 0.6, str(arrow))
        pg.close()

        browser.close()
    server.shutdown()
    print()
    print('All checks passed.' if not failures else f'{len(failures)} check(s) failed.')
    sys.exit(1 if failures else 0)


if __name__ == '__main__':
    main()
