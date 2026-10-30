#!/usr/bin/env python3
"""Checks that every width in a media query comes from the breakpoint scale.

The scale is breakpoint/tablet, /desktop and /wide in tools/build_tokens.py, and it reaches tokens.json, figma.json
and the docs. CSS has no way to read it: a custom property cannot be used in a media query, so each width is written
as a number and nothing stops the numbers from drifting apart. This reads them back.

    python3 tools/check_breakpoints.py

A width outside the scale is allowed when the rule carries a reason, as a comment right above it:

    /* breakpoint: 900, outside the token scale. Two panes only fit from here. */
    @media (width >= 900px){

The number in the comment has to be the one in the query, so a value that moves without its reason fails. Ranges
(`width < 600px`) and the old pair (`min-width`, `max-width`) are both read; a `max-width:599.98px` fails on its own,
since the scale has no 599.98 and a range needs no decimal. Generated files are skipped: their source is checked.
No dependencies.
"""
import re
import subprocess
import sys

from aipim_tools import Checks, ROOT, read
import build_tokens as bt

# Written by a generator from one of the files above, so a width here is already checked at its source.
GENERATED = ('components/web/aipim-components.css', 'tokens/build/css/aipim.css', 'llms-full.txt')
WIDTH = re.compile(r'\((?:min-width|max-width|width)\s*[:<>=]*\s*(\d+(?:\.\d+)?)px\)')
# The comment that ends just before an @media, with the width it argues for.
REASON = re.compile(r'/\*(?:[^*]|\*(?!/))*?breakpoint:\s*(\d+(?:\.\d+)?)(?:[^*]|\*(?!/))*?\*/\s*\Z', re.S)


def files():
    out = subprocess.run(['git', 'ls-files', '*.css', '*.js', '*.html', '*.mdx'],
                         cwd=ROOT, capture_output=True, text=True).stdout.split()
    return [f for f in out if f not in GENERATED]


def main():
    scale = sorted(bt.BREAKPOINT.values())
    check = Checks()
    print(f"The breakpoint scale is {', '.join(f'{k} {v}' for k, v in bt.BREAKPOINT.items())}.")
    seen = 0
    for rel in files():
        text = read(rel)
        for m in WIDTH.finditer(text):
            seen += 1
            width = float(m.group(1))
            if width in scale:
                continue
            # Outside the scale: the comment that ends right before this @media has to name the same number.
            start = text.rfind('@media', 0, m.start())
            reason = REASON.search(text[:start if start >= 0 else m.start()])
            where = f'{rel}:{text.count(chr(10), 0, m.start()) + 1}'
            check(f'{where} uses {m.group(1)}px',
                  bool(reason) and float(reason.group(1)) == width,
                  f'not in the scale and no comment above it says "breakpoint: {m.group(1)}"' if not reason
                  else f'the comment above it argues for {reason.group(1)}, not {m.group(1)}')
    print(f'\n{seen} width(s) in a media query, in {len(files())} files.')
    return check.finish()


if __name__ == '__main__':
    sys.exit(main())
