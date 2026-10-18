#!/usr/bin/env python3
"""Aipim AI package builder.

Reads the component specs (docs/en/components/*.md, with a YAML-like frontmatter) and writes:
    llms.txt        an index for language models (https://llmstxt.org): links with one line each
    llms-full.txt   AGENTS.md, the foundations and every spec in one file
and fills the lists that name every component, between "components:start" and "components:end" markers: the table in
AGENTS.md, the pages of the sidebar in .storybook/i18n.js (PAGES) and the levels in stories/_gallery.js (LEVEL).
The opening sentence of AGENTS.md and llms.txt is the description in package.json, so it is written in one place.

Usage: python3 tools/build_ai.py            # write
       python3 tools/build_ai.py --check    # fail if something is out of date
No dependencies (Python 3.8+).

Aipim · Talis Galhardi · MIT
"""
import json, os, re, sys

from aipim_tools import GROUPS, read, replace_between, specs, sync

RAW = 'https://raw.githubusercontent.com/talis-galhardi/aipim/main/'
FOUNDATIONS = [('docs/en/color.md', 'Color: ramps, semantic roles and the accessibility checks'),
               ('docs/en/typography.md', 'Typography: Antonio and Karla, ten styles and the rules'),
               ('docs/en/space-shape-motion.md', 'Space, radius, borders, sizes, elevation, z-index, motion and opacity')]
GUIDES = [('docs/en/tutorials-designers.md', 'Tutorial for designers: design a screen with Aipim in six steps, from the brief to the hand-off'),
          ('docs/en/tutorials-developers.md', 'Tutorial for developers: build a frame in HTML and CSS in six steps, plus how the system is built, the repository and versions'),
          ('docs/en/tutorials-ai.md', 'Tutorial for AI agents: brief an agent and review its work in six steps, plus the Markdown package, how to use it with Claude Code, Cursor and Copilot, and what comes next'),
          ('docs/en/voice-and-microcopy.md', 'Voice and microcopy: how Aipim sounds and how to write buttons, labels, errors, empty states and dialogs'),
          ('docs/en/verification.md', 'Verification: what has been checked on the web components, how, when, and the known limits')]
# About the Figma file and the brand, not about building a screen: listed in llms.txt, left out of llms-full.txt.
MAINTAINERS = [('docs/documentation-layout.md', 'Documentation layout of the Figma file: the rules of every docs page (masthead, rows, stages, drawings, the documentation kit)'),
               ('docs/en/patterns-and-ornament.md', 'Patterns and the florão: the four brand patterns and the small ornament, their names and references, palettes, rules and accessibility')]


def title(name):
    return name.replace('-', ' ').capitalize()


DESCRIPTION = json.loads(read('package.json'))['description']


def component_table(S):
    rows = ['| Component | Root class | Use it for | Spec |', '|---|---|---|---|']
    for n, (rel, meta, _) in S.items():
        rows.append(f"| {title(n)} | `{meta['class']}` | {meta['description']} | `{rel}` |")
    return '\n'.join(rows)


def build_agents(S):
    text = replace_between(read('AGENTS.md'), '<!-- description:start -->', '<!-- description:end -->', 'Aipim is ' + DESCRIPTION[0].lower() + DESCRIPTION[1:])
    return replace_between(text, '<!-- components:start -->', '<!-- components:end -->', component_table(S))


def build_pages(S):
    """The component pages of the sidebar, for the previous and next links (.storybook/i18n.js)."""
    lines = [f"  ['{m['group']}-{n}--docs', '{title(n)}']," for n, (_, m, _) in S.items()]
    return replace_between(read('.storybook/i18n.js'), '  // components:start', '  // components:end', '\n'.join(lines))


def build_levels(S):
    """The level of each component (stories/_gallery.js)."""
    lines = [f"  {g}: [{', '.join(repr(n) for n, (_, m, _) in S.items() if m['group'] == g)}]," for g in GROUPS]
    return replace_between(read('stories/_gallery.js'), '  // components:start', '  // components:end', '\n'.join(lines))


def build_llms(S):
    o = ['# Aipim', '', f'> {DESCRIPTION}', '',
         'Aipim uses semantic tokens (`--aipim-*` CSS variables) in light and dark, plain HTML and CSS components (`aipim-<component>` classes), and line icons from Hugeicons Free. Colors come only from semantic roles; state is never shown by color alone; every interactive element has a visible focus ring.', '',
         '## Start here', '',
         f'- [AGENTS.md]({RAW}AGENTS.md): the rules for building with Aipim, setup, patterns and how to verify',
         f'- [README]({RAW}README.md): what Aipim is, how to use the tokens and the components, how to customize', '',
         '## Foundations', '']
    o += [f'- [{os.path.basename(p)}]({RAW}{p}): {d}' for p, d in FOUNDATIONS]
    o += ['', '## Guides', '']
    o += [f'- [{os.path.basename(p)}]({RAW}{p}): {d}' for p, d in GUIDES]
    for g in GROUPS:
        o += ['', f'## Components: {g.capitalize()}', '']
        o += [f"- [{title(n)}]({RAW}{rel}): {m['description']} Class `{m['class']}`." for n, (rel, m, _) in S.items() if m['group'] == g]
    o += ['', '## Code and tokens', '',
          f'- [tokens.json]({RAW}tokens/tokens.json): every token in the W3C Design Tokens format (the single source)',
          f'- [aipim.css]({RAW}tokens/build/css/aipim.css): the tokens as CSS custom properties, light and dark',
          f'- [aipim-components.css]({RAW}components/web/aipim-components.css): every component in one stylesheet',
          f'- [aipim.js]({RAW}components/web/aipim.js): optional script for tabs keys, dismiss buttons and dialog commands',
          f'- [icons.json]({RAW}icons/icons.json): the {len(json.loads(read("icons/icons.json"))["icons"])} icons, with their names and categories',
          f'- [sprite.svg]({RAW}icons/sprite.svg): the icons as an SVG sprite', '',
          '## Optional', '',
          *[f'- [{os.path.basename(p)}]({RAW}{p}): {d}' for p, d in MAINTAINERS],
          f'- [THIRD-PARTY.md]({RAW}THIRD-PARTY.md): third-party notices (Hugeicons Free, fonts)',
          f'- [LICENSE]({RAW}LICENSE): MIT, for the code',
          f'- [LICENSE-DESIGN.md]({RAW}LICENSE-DESIGN.md): CC BY 4.0, for the design files and the documentation']
    return '\n'.join(o) + '\n'


def build_full(S, agents):
    o = ['# Aipim: complete documentation for language models', '', 'Everything an agent needs in one file: the rules (AGENTS.md), the foundations and the spec of every component. Generated by tools/build_ai.py: do not edit by hand.', '', '---', '', agents.strip(), '']
    for p, _ in FOUNDATIONS + GUIDES:
        o += ['', '---', '', re.sub(r'^<!--.*?-->\n', '', read(p), flags=re.S).strip(), '']
    for n, (rel, meta, body) in S.items():
        o += ['', '---', '', f"<!-- {rel} · class {meta['class']} · WCAG {meta['wcag']} -->", body, '']
    return '\n'.join(o).rstrip() + '\n'


def main():
    S = specs()
    agents = build_agents(S)
    outputs = {'AGENTS.md': agents, 'llms.txt': build_llms(S), 'llms-full.txt': build_full(S, agents),
               '.storybook/i18n.js': build_pages(S), 'stories/_gallery.js': build_levels(S)}
    return sync(outputs, 'python3 tools/build_ai.py', f'the AI files and the lists of the {len(S)} components are')


if __name__ == '__main__':
    sys.exit(main())
