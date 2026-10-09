#!/usr/bin/env python3
"""Aipim AI package builder.

Reads the component specs (docs/en/components/*.md, with a YAML-like frontmatter) and writes:
    llms.txt        an index for language models (https://llmstxt.org): links with one line each
    llms-full.txt   AGENTS.md, the foundations and every spec in one file
and fills the component table in AGENTS.md between the "components:start" and "components:end" markers.

Usage: python3 tools/build_ai.py            # write
       python3 tools/build_ai.py --check    # fail if something is out of date
No dependencies (Python 3.8+).

Aipim · Talis Galhardi · MIT
"""
import glob, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = 'https://raw.githubusercontent.com/talis-galhardi/aipim/main/'
FOUNDATIONS = [('docs/en/color.md', 'Color: ramps, semantic roles and the accessibility checks'),
               ('docs/en/typography.md', 'Typography: Antonio and Karla, ten styles and the rules'),
               ('docs/en/space-shape-motion.md', 'Space, radius, borders, sizes, elevation, z-index, motion and opacity')]
GUIDES = [('docs/en/tutorials-designers.md', 'Tutorial for designers: design a screen with Aipim in six steps, from the brief to the hand-off'),
          ('docs/en/tutorials-developers.md', 'Tutorial for developers: build a frame in HTML and CSS in six steps, plus how the system is built, the repository and versions'),
          ('docs/en/tutorials-ai.md', 'Tutorial for AI agents: brief an agent and review its work in six steps, plus the Markdown package, how to use it with Claude Code, Cursor and Copilot, and what comes next'),
          ('docs/en/voice-and-microcopy.md', 'Voice and microcopy: how Aipim sounds and how to write buttons, labels, errors, empty states and dialogs'),
          ('docs/en/verification.md', 'Verification: what has been checked on the web components, how, when, and the known limits'),
          ('docs/en/documentation-layout.md', 'Documentation layout: how a component page is built in the Figma file (masthead, nine rows, stages, drawings, tables)'),
          ('docs/en/patterns-and-ornament.md', 'Patterns and the florão: the four brand patterns and the small ornament, their names and references, palettes, rules and accessibility')]
GROUPS = [('Atoms', ['button', 'icon-button', 'link', 'badge', 'tag', 'checkbox', 'radio', 'switch']),
          ('Molecules', ['text-field', 'alert', 'toast', 'tabs', 'card', 'empty-state']),
          ('Organisms', ['top-bar', 'tab-bar', 'modal'])]


def read(path):
    with open(os.path.join(ROOT, path)) as f:
        return f.read()


def spec(path):
    text = read(path)
    m = re.match(r'---\n(.*?)\n---\n(.*)', text, re.S)
    meta = {}
    for line in m.group(1).split('\n'):
        k, _, v = line.partition(': ')
        meta[k] = v.strip()
    return meta, m.group(2).strip()


def specs():
    out = {}
    for p in sorted(glob.glob(os.path.join(ROOT, 'docs/en/components/*.md'))):
        rel = os.path.relpath(p, ROOT)
        meta, body = spec(rel)
        out[meta['name']] = (rel, meta, body)
    return out


def title(name):
    return name.replace('-', ' ').capitalize()


def component_table(S):
    rows = ['| Component | Root class | Use it for | Spec |', '|---|---|---|---|']
    for group, names in GROUPS:
        for n in names:
            rel, meta, _ = S[n]
            rows.append(f"| {title(n)} | `{meta['class']}` | {meta['description']} | `{rel}` |")
    return '\n'.join(rows)


def build_agents(S):
    text = read('AGENTS.md')
    return re.sub(r'(<!-- components:start -->\n).*?(<!-- components:end -->)', lambda m: m.group(1) + component_table(S) + '\n' + m.group(2), text, flags=re.S)


def build_llms(S):
    o = ['# Aipim', '', '> A small, open, Brazilian design system with all the parts in place: foundations, 17 HTML and CSS components, 63 line icons, one Markdown spec per component, documentation and a token generator that enforces accessibility checks. Made to be customized, and to be used by people and by AI agents.', '',
         'Aipim uses semantic tokens (`--aipim-*` CSS variables) in light and dark, plain HTML and CSS components (`aipim-<component>` classes), and line icons from Hugeicons Free. Colors come only from semantic roles; state is never shown by color alone; every interactive element has a visible focus ring.', '',
         '## Start here', '',
         f'- [AGENTS.md]({RAW}AGENTS.md): the rules for building with Aipim, setup, patterns and how to verify',
         f'- [README]({RAW}README.md): what Aipim is, how to use the tokens and the components, how to customize', '',
         '## Foundations', '']
    o += [f'- [{os.path.basename(p)}]({RAW}{p}): {d}' for p, d in FOUNDATIONS]
    o += ['', '## Guides', '']
    o += [f'- [{os.path.basename(p)}]({RAW}{p}): {d}' for p, d in GUIDES]
    for group, names in GROUPS:
        o += ['', f'## Components: {group}', '']
        o += [f"- [{title(n)}]({RAW}{S[n][0]}): {S[n][1]['description']} Class `{S[n][1]['class']}`." for n in names]
    o += ['', '## Code and tokens', '',
          f'- [tokens.json]({RAW}tokens/tokens.json): every token in the W3C Design Tokens format (the single source)',
          f'- [aipim.css]({RAW}tokens/build/css/aipim.css): the tokens as CSS custom properties, light and dark',
          f'- [aipim-components.css]({RAW}components/web/aipim-components.css): every component in one stylesheet',
          f'- [aipim.js]({RAW}components/web/aipim.js): optional script for tabs keys, dismiss buttons and dialog commands',
          f'- [icons.json]({RAW}icons/icons.json): the 63 icons, with their names and categories',
          f'- [sprite.svg]({RAW}icons/sprite.svg): the icons as an SVG sprite', '',
          '## Optional', '',
          f'- [THIRD-PARTY.md]({RAW}THIRD-PARTY.md): third-party notices (Hugeicons Free, fonts)',
          f'- [LICENSE]({RAW}LICENSE): MIT, for the code',
          f'- [LICENSE-DESIGN.md]({RAW}LICENSE-DESIGN.md): CC BY 4.0, for the design files and the documentation']
    return '\n'.join(o) + '\n'


def build_full(S, agents):
    o = ['# Aipim: complete documentation for language models', '', 'Everything an agent needs in one file: the rules (AGENTS.md), the foundations and the spec of every component. Generated by tools/build_ai.py: do not edit by hand.', '', '---', '', agents.strip(), '']
    for p, _ in FOUNDATIONS + GUIDES:
        o += ['', '---', '', re.sub(r'^<!--.*?-->\n', '', read(p), flags=re.S).strip(), '']
    for group, names in GROUPS:
        for n in names:
            rel, meta, body = S[n]
            o += ['', '---', '', f"<!-- {rel} · class {meta['class']} · tokens {meta['tokens']} · WCAG {meta['wcag']} -->", body, '']
    return '\n'.join(o).rstrip() + '\n'


def main():
    S = specs()
    missing = [n for _, names in GROUPS for n in names if n not in S]
    extra = [n for n in S if n not in [m for _, names in GROUPS for m in names]]
    if missing or extra:
        print('Spec list out of sync with GROUPS: missing', missing, 'extra', extra); sys.exit(1)
    agents = build_agents(S)
    outputs = {'AGENTS.md': agents, 'llms.txt': build_llms(S), 'llms-full.txt': build_full(S, agents)}
    stale = [p for p, t in outputs.items() if not os.path.exists(os.path.join(ROOT, p)) or read(p) != t]
    if '--check' in sys.argv:
        if stale: print('Out of date:', ', '.join(stale), '. Run: python3 tools/build_ai.py'); sys.exit(1)
        print('OK: AGENTS.md table, llms.txt and llms-full.txt are up to date'); return
    for p, t in outputs.items():
        with open(os.path.join(ROOT, p), 'w') as f: f.write(t)
    print(f"Written: {', '.join(outputs)} ({len(S)} specs)")


if __name__ == '__main__':
    main()
