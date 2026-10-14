#!/usr/bin/env python3
"""Aipim icon builder.

Source: Hugeicons Free (Stroke Rounded), MIT License, https://github.com/hugeicons/hugeicons
Only the FREE set (@hugeicons/core-free-icons) is used. Hugeicons Pro is a separate product and must never be mixed in.
The few icons Hugeicons does not have are drawn for Aipim on the same grid and stroke, and live in icons/custom/.

The version is pinned below, so the output is reproducible. The generated files are committed, so you only run this
script to add, rename or update icons:

    python3 tools/build_icons.py          # fetches the pinned package files (needs network) and writes icons/

Writes:
    icons/svg/<name>.svg     one clean SVG per icon: 24x24, stroke="currentColor", 1.5px, round caps and joins
    icons/sprite.svg         all icons as <symbol id="aipim-<name>"> for <use href="icons/sprite.svg#aipim-<name>">
    icons/icons.json         name, category, upstream name or "source": "Aipim" (for tooling and docs)

Rule: an icon is added only when a component or a documented pattern needs it. Names are English, lowercase, kebab-case.
"""
import json, os, re, sys, urllib.request

HUGEICONS_VERSION = '4.3.5'
BASE = f'https://cdn.jsdelivr.net/npm/@hugeicons/core-free-icons@{HUGEICONS_VERSION}/dist/esm/'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# category -> {aipim name: upstream Hugeicons name}
CATALOG = {
    'actions': {
        'add': 'Add01', 'edit': 'Edit02', 'delete': 'Delete02', 'search': 'Search01', 'copy': 'Copy01',
        'download': 'Download01', 'upload': 'Upload01', 'share': 'Share05', 'filter': 'Filter',
        'settings': 'Settings01', 'refresh': 'Refresh', 'loading': 'Loading03', 'log-in': 'Login01', 'log-out': 'Logout01',
    },
    'navigation': {
        'arrow-left': 'ArrowLeft02', 'arrow-right': 'ArrowRight02', 'arrow-up': 'ArrowUp02', 'arrow-down': 'ArrowDown02',
        'arrow-up-right': 'ArrowUpRight01', 'chevron-left': 'ArrowLeft01', 'chevron-right': 'ArrowRight01',
        'chevron-up': 'ArrowUp01', 'chevron-down': 'ArrowDown01', 'menu': 'Menu01', 'close': 'Cancel01', 'home': 'Home01',
        'external-link': 'LinkSquare02', 'more-horizontal': 'MoreHorizontal', 'more-vertical': 'MoreVertical',
    },
    'status': {
        'success': 'CheckmarkCircle01', 'warning': 'Alert01', 'error': 'CancelCircle', 'info': 'InformationCircle',
        'help': 'HelpCircle', 'check': 'Tick02', 'minus': 'MinusSign',
    },
    'objects': {
        'file': 'File02', 'image': 'Image01', 'user': 'User', 'user-circle': 'UserCircle', 'calendar': 'Calendar01',
        'mail': 'Mail01', 'lock': 'LockKeyhole', 'eye': 'View', 'eye-off': 'ViewOff', 'bell': 'Notification01',
        'star': 'Star', 'heart': 'Heart', 'link': 'Link02', 'bookmark': 'Bookmark01', 'clock': 'Clock01',
        'folder': 'Folder01', 'globe': 'Globe02', 'attachment': 'Attachment01', 'sun': 'Sun01', 'moon': 'Moon02',
        'tag': 'Tag01', 'chat': 'Chat',
    },
    # Logos of the platforms the documentation points to. They show other companies' products only to link to them.
    'platforms': {
        'github': 'Github01', 'figma': 'Figma', 'storybook': None, 'npm': 'Npm', 'claude': 'Claude', 'mcp-server': 'McpServer',
    },
}

# Icons with no Hugeicons upstream (None above): drawn for Aipim, read from icons/custom/<name>.svg.
CUSTOM_DIR = os.path.join('icons', 'custom')

HEADER = f'Aipim icon from Hugeicons Free v{HUGEICONS_VERSION} (MIT, Copyright (c) 2025 Hugeicons)'
CUSTOM_HEADER = 'Aipim icon drawn for Aipim (MIT)'
SPRITE_HEADER = f'Aipim icons: Hugeicons Free v{HUGEICONS_VERSION} (MIT, Copyright (c) 2025 Hugeicons), plus the ones in icons/custom/ drawn for Aipim (MIT)'


def fetch(upstream):
    with urllib.request.urlopen(f'{BASE}{upstream}Icon.js') as r:
        return r.read().decode()


def parse(js):
    body = js.split('=', 1)[1].split(';\n\nexport')[0].strip()
    body = re.sub(r'(\{|,)\s*([A-Za-z_]+)\s*:', r'\1"\2":', body)
    return json.loads(body)


def kebab(k):
    return re.sub(r'([A-Z])', lambda m: '-' + m.group(1).lower(), k)


def elements(items):
    out = []
    for tag, attrs in items:
        attrs = {k: v for k, v in attrs.items() if k != 'key'}
        out.append(f'<{tag} ' + ' '.join(f'{kebab(k)}="{v}"' for k, v in attrs.items()) + '/>')
    return out


def main():
    """Writes icons/; with --check, writes nothing and fails if icons/ differs from what Hugeicons gives (needs the network)."""
    check = '--check' in sys.argv
    out, manifest, symbols = {}, [], []
    for cat, icons in CATALOG.items():
        for name, upstream in icons.items():
            if upstream:
                els, header = elements(parse(fetch(upstream))), HEADER
                manifest.append({'name': name, 'category': cat, 'upstream': upstream})
            else:
                with open(os.path.join(ROOT, CUSTOM_DIR, f'{name}.svg')) as f:
                    els, header = re.findall(r'<path [^>]*/>', f.read()), CUSTOM_HEADER
                manifest.append({'name': name, 'category': cat, 'source': 'Aipim'})
            out[os.path.join('icons', 'svg', f'{name}.svg')] = (
                f'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">'
                f'<!-- {header} -->' + ''.join(els) + '</svg>\n')
            symbols.append(f'<symbol id="aipim-{name}" viewBox="0 0 24 24" fill="none">' + ''.join(els) + '</symbol>')
    out[os.path.join('icons', 'sprite.svg')] = (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute"><!-- {SPRITE_HEADER} -->'
        + ''.join(symbols) + '</svg>\n')
    out[os.path.join('icons', 'icons.json')] = json.dumps(
        {'source': 'Hugeicons Free', 'version': HUGEICONS_VERSION, 'license': 'MIT', 'icons': manifest}, indent=2)
    if check:
        stale = [p for p, text in out.items()
                 if not os.path.exists(os.path.join(ROOT, p)) or open(os.path.join(ROOT, p)).read() != text]
        if stale:
            print('Out of date: ' + ', '.join(stale[:5]) + (' and more' if len(stale) > 5 else '') + '. Run: python3 tools/build_icons.py')
            return 1
        print(f'OK: the {len(manifest)} icons are up to date')
        return 0
    os.makedirs(os.path.join(ROOT, 'icons', 'svg'), exist_ok=True)
    for p, text in out.items():
        open(os.path.join(ROOT, p), 'w').write(text)
    print(f'{len(manifest)} icons written to icons/')


if __name__ == '__main__':
    sys.exit(main())
