#!/usr/bin/env python3
"""Writes the light and dark colors in the "Tokens used" tables of the component specs, from the tokens.

A spec names its tokens by hand (`action/primary/bg`); the hex values next to them come from tokens/build/figma.json,
in English and in Portuguese, so a change in the palette reaches every spec on its own. A row with several color tokens
lists their values in the same order. A row whose token is not a color (an opacity, a shadow) is left as it is.

    python3 tools/build_specs.py           # writes docs/en/components/*.md and docs/pt-br/components/*.md
    python3 tools/build_specs.py --check   # exits 1 if a value is out of date

No dependencies (Python 3.8+).
"""
import glob
import json
import os
import re
import sys

from aipim_tools import ROOT, read, sync

HEX = re.compile(r'#[0-9A-Fa-f]{6}')


def palette():
    tokens = json.loads(read('tokens/build/figma.json'))
    prim = tokens['primitives']
    return {mode: {role: prim[ref].upper() for role, ref in roles.items()} for mode, roles in tokens['semantic'].items()}


def fill(cell, values):
    """Puts the values, in order, in place of the hex codes of a cell (text around them, like "at 10%", stays)."""
    it = iter(values)
    return HEX.sub(lambda m: next(it), cell)


def build(text, colors):
    out, head = [], None
    for line in text.split('\n'):
        if not line.startswith('|'):
            head = None
            out.append(line)
            continue
        cells = line.split('|')
        if head is None:
            head = [c.strip().lower() for c in cells]
        light = next((i for i, c in enumerate(head) if c in ('light', 'claro')), None)
        dark = next((i for i, c in enumerate(head) if c in ('dark', 'escuro')), None)
        if light is not None and dark is not None and len(cells) == len(head) and not set(line) <= set('|-: '):
            names = [t for t in re.findall(r'`([a-z][a-z0-9/-]*)`', '|'.join(cells[:light])) if t in colors['light']]
            if names and len(HEX.findall(cells[light])) == len(names) == len(HEX.findall(cells[dark])):
                cells[light] = fill(cells[light], [colors['light'][n] for n in names])
                cells[dark] = fill(cells[dark], [colors['dark'][n] for n in names])
                line = '|'.join(cells)
        out.append(line)
    return '\n'.join(out)


def main():
    colors = palette()
    files = sorted(glob.glob(os.path.join(ROOT, 'docs', '*', 'components', '*.md')))
    outputs = {}
    for p in files:
        rel = os.path.relpath(p, ROOT)
        outputs[rel] = build(read(rel), colors)
    return sync(outputs, 'python3 tools/build_specs.py', f'the colors of the {len(files)} specs are')


if __name__ == '__main__':
    sys.exit(main())
