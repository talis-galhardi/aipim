#!/usr/bin/env python3
"""Keeps the Storybook from going back to problems it already had. Each rule here is one of them, and says why.

    python3 tools/check_storybook.py

It reads the source, so it needs no build and no browser, and it runs with the quick checks. What only shows on a page (a
component that looks different on its docs page, the HTML to copy against its spec, a stage that overflows) is in
tools/verify_storybook.py. No dependencies.
"""
import glob
import html
import json
import os
import re
import sys

from aipim_tools import Checks, ROOT, read

# The selectors that have to beat what Storybook injects after them, which comes later with the same weight. Measured against
# every docs page: without html body these change the page. Going up means a rule is fighting one of ours, not Storybook.
MAX_HTML_BODY = 25
MAX_IMPORTANT = 1
# The stories and helpers that write the examples of the components. _foundations.js is not here: its inline styles are the
# tokens on display, and they change per row.
EXAMPLES = ['stories/_iconic.js', 'stories/_dodont.js', 'stories/_stage.js']


def files(*patterns):
    found = []
    for pattern in patterns:
        found += glob.glob(os.path.join(ROOT, pattern))
    return sorted(os.path.relpath(f, ROOT) for f in found)


def no_comments(css):
    return re.sub(r'/\*.*?\*/', '', css, flags=re.S)


def js_object_keys(text, name):
    block = re.search(name + r'\s*=\s*\{(.*?)\n\};', text, re.S)
    return {k.replace("\\'", "'") for k in re.findall(r"^\s*'((?:[^'\\]|\\.)*)':", block.group(1), re.M)} | set(re.findall(r'^\s*(\w+):', block.group(1), re.M))


def main():
    check = Checks()
    styles = {f: read(f) for f in files('.storybook/styles/*.css')}
    css = no_comments('\n'.join(styles.values()))
    scripts = {f: read(f) for f in files('.storybook/*.js', 'stories/*.js', 'stories/*/*.js', 'stories/*/*.mdx')}
    code = '\n'.join(scripts.values())
    gallery = read('components/web/examples/index.html')
    product = no_comments('\n'.join(read(f) for f in files('components/web/*.css') if not f.endswith('aipim-components.css')))
    i18n = read('.storybook/i18n.js')
    readme = read('.storybook/README.md')

    print('The styles')
    count = css.count('html body')
    check(f'html body is only where Storybook has to be beaten (at most {MAX_HTML_BODY}, there are {count})', count <= MAX_HTML_BODY)
    check(f'!important stays rare (at most {MAX_IMPORTANT})', css.count('!important') <= MAX_IMPORTANT, str(css.count('!important')))
    colors = re.findall(r':[^;{}]*#[0-9a-fA-F]{3,8}\b', css)
    check('no color is written by hand: a color comes from a token', not colors, '; '.join(colors[:4]))
    scale = {int(v) for v in re.findall(r'--aipim-space-(\d+):', read('tokens/build/css/aipim.css'))} - {0}
    onscale = [m for m in re.findall(r'[\w-]+:[^;{}]*?\b(\d+)px', css) if int(m) in scale and int(m) > 2]
    check('a width or a space that is on the scale uses its token', not onscale, ', '.join(f'{x}px' for x in sorted(set(onscale), key=int)))
    # Whether the type of the docs reaches inside a story shows on a page: verify_storybook.py compares each component with itself alone.

    print('The classes')
    theirs = set(re.findall(r'\.(aipim-[\w-]+)', css))
    known = set(re.findall(r'\.(aipim-[\w-]+)', product))
    check('aipim- is for the classes of the product: the docs use doc-, demo-, pg, dd, fd', theirs <= known, ', '.join(sorted(theirs - known)[:6]))
    own = set(re.findall(r'\.((?:doc|demo|pg|dd|fd|spec)(?:[-_][\w-]+)?)\b', css))
    def used(name):
        base = name.split('--')[0]
        return name in code or name in gallery or ('--' in name and re.search(re.escape(base) + r'--\$\{', code)) or (name.startswith('fd') and 'fd' in code and re.sub(r'^fd', '', name) in code)
    check('every class of the docs in the styles is used', all(used(c) for c in own), ', '.join(sorted(c for c in own if not used(c))[:6]))
    written = set()
    for value in re.findall(r"className: ['`]([^'`$]+)['`]", code):
        written |= set(value.split())
    defined = set(re.findall(r'\.([\w-]+)', css)) | known
    missing = {c for c in written if c not in defined and not c.startswith('sb-')}
    check('every class the docs pages write has a rule', not missing, ', '.join(sorted(missing)[:6]))

    print('The examples')
    inline = [f for f in EXAMPLES if re.search(r'\bstyle="', read(f))] + [f for f in files('stories/atoms/*.js', 'stories/molecules/*.js', 'stories/organisms/*.js') if re.search(r'\bstyle="', read(f))]
    check('the examples have no inline style: how one sits on a stage is a demo- class, and the HTML to copy stays clean', not inline, ', '.join(inline[:4]))
    themed = [f for f in EXAMPLES + files('stories/atoms/*.js', 'stories/molecules/*.js', 'stories/organisms/*.js') + ['components/web/examples/index.html'] if f != 'stories/_stage.js' and re.search(r'data-theme="', read(f))]
    check('no example has data-theme on an element: the tokens only change on :root and on a stage', not themed, ', '.join(themed[:4]))
    ids = re.findall(r"exclude: \[\['(#[\w-]+)", code)
    check('a rule of axe is turned off by what the element is, not by an id', not ids, ', '.join(ids[:4]))

    print('The words')
    body = re.sub(r'<script[\s\S]*?</script>|<style[\s\S]*?</style>|<svg[^>]*>[\s\S]*?</svg>', '', gallery[gallery.index('<body'):])
    words = {re.sub(r'\s+', ' ', html.unescape(t)).strip() for t in re.findall(r'>([^<>]+)<', body)} | {html.unescape(v) for v in re.findall(r'(?:aria-label|placeholder|title|data-aipim-help)="([^"]+)"', body)}
    same = set(re.findall(r"'((?:[^'\\]|\\.)*)'", i18n[i18n.index('GALLERY_SAME'):]))
    untranslated = sorted(w for w in words if re.search(r'[A-Za-zÀ-ú]{2}', w) and w not in js_object_keys(i18n, 'GALLERY_PT') and w not in same)
    check('every word of the gallery has its Portuguese, or is listed as staying the same', not untranslated, ', '.join(untranslated[:8]))
    keys = js_object_keys(i18n, r'export const T')
    others = '\n'.join(v for k, v in scripts.items() if not k.endswith('i18n.js'))
    unused = sorted(k for k in keys if not re.search(r'\bT\.' + k + r'\b', others))
    check('every text of the Storybook is used', not unused, ', '.join(unused[:6]))

    print('The code')
    clipboard = code.count('navigator.clipboard')
    check('there is one way to copy, so every button gives the same feedback and says when it failed', clipboard <= 2 and code.count('copyText = ') == 1 and '.writeText(' in scripts['.storybook/docs-tabs.js'] and all('navigator.clipboard' not in v for k, v in scripts.items() if not k.endswith('docs-tabs.js')), str(clipboard))
    internals = sorted(set(re.findall(r"from 'storybook/internal/([\w/-]+)'", code)))
    listed = [i for i in internals if f'storybook/internal/{i}' in readme]
    check('what is imported from Storybook\'s internals is in "What is not an API"', internals == listed, ', '.join(sorted(set(internals) - set(listed))))
    # Storybook calls the first ones by name, and this script reads the last one.
    api = {'globalTypes', 'initialGlobals', 'decorators', 'parameters', 'default', 'GALLERY_SAME'}
    orphans = []
    for f, text in scripts.items():
        if not f.endswith('.js') or '.stories.' in f or f.endswith('main.js') or f.endswith('manager.js') or f.endswith('theme.js'):
            continue
        rest = '\n'.join(v for k, v in scripts.items() if k != f)
        orphans += [f'{os.path.basename(f)}: {n}' for n in re.findall(r'^export (?:const|function) (\w+)', text, re.M) if n not in api and not re.search(r'\b' + n + r'\b', rest)]
    check('nothing is exported that nothing imports', not orphans, ', '.join(orphans[:6]))

    print('The versions')
    lock = json.loads(read('package-lock.json'))['packages']
    versions = {n: lock[f'node_modules/{n}']['version'] for n in ('storybook', '@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/html-vite')}
    check('Storybook and its addons are on the same version', len(set(versions.values())) == 1, str(versions))
    return check.finish()


if __name__ == '__main__':
    sys.exit(main())
