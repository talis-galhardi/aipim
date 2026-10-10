"""Content of the tutorials, written once. tools/build_tutorials.py turns it into three files:
docs/en/tutorials-designers.md, docs/en/tutorials-developers.md and docs/en/tutorials-ai.md.
The Figma page 'Tutorials' (one sheet for each) holds the same text: change it in both places."""

INTRO = ('Three short tutorials, one for each way of working with Aipim. Each one has six steps. '
         'Do the steps in order, and tick the final check before you move on.')

# (number, title, audience, where, file)
PATHS = [
    (1, 'Design a screen', 'Designers', 'In Figma', 'tutorials-designers'),
    (2, 'Build the frame', 'Developers', 'In HTML and CSS', 'tutorials-developers'),
    (3, 'Build with an agent', 'AI', 'With any coding agent', 'tutorials-ai'),
]
HEADINGS = {1: 'Tutorial for designers', 2: 'Tutorial for developers', 3: 'Tutorial for AI agents'}

CHOOSE_INTRO = 'Three tutorials, six steps each. Pick the one for how you work, and come back to the others when you need them.'
FIT_INTRO = ('The workflow has six stages. The designer tutorial covers the first four. '
             'The developer and AI tutorials cover the last two. The whole team joins the review and the release.')
FIT = {  # per tutorial: what the reader does in the stages, and the steps that cover each stage
    1: dict(lead='You lead stages 1, 2 and 4: frame the problem, design with the system and hand off. You join the review in stage 3.',
            steps={1: 'Step 2', 2: 'Steps 3 to 5', 4: 'Step 6'}),
    2: dict(lead='You lead stage 5, the build, and join the review in stage 3 and the release in stage 6.',
            steps={5: 'Steps 1 to 5', 6: 'Step 6'}),
    3: dict(lead='The agent works in stage 5, the build. You review its work and decide, and the team joins stage 6.',
            steps={5: 'Steps 1 to 4', 6: 'Steps 5 and 6'}),
}
STAGES = [  # (stage, name, where it is covered)
    (1, 'Frame', 'Tutorial 1, step 2'),
    (2, 'Design', 'Tutorial 1, steps 3 to 5'),
    (3, 'Review', 'The whole team'),
    (4, 'Hand off', 'Tutorial 1, step 6'),
    (5, 'Build', 'Tutorial 2 or 3'),
    (6, 'Verify and release', 'Tutorials 2 and 3, then the team'),
]
STAKEHOLDERS = ('If you are a stakeholder, you do not need a tutorial. You write the brief with the designer (stage 1), '
                'review in the Figma file, not in slides (stage 3), and accept the result against the brief (stage 6).')

# code = (label, language, text)
TUTORIALS = [
 dict(n=1, audience='Designers', title='Design a screen',
  lead='You will turn a short brief into a screen made only from Aipim parts, and hand it to a developer who has no basic questions left.',
  need=['The Aipim DS file in Figma', 'An idea of who the screen is for', 'A developer or an AI agent who will build it'],
  have=['A one-page brief', 'A screen in light and dark, with every state', 'A frame marked Ready for dev'],
  steps=[
   ('Open the file and find your parts',
    'Open Aipim DS in Figma. The Components overview page lists every part, grouped as Atoms, Molecules and Organisms. The Patterns & screens page shows whole screens you can start from.',
    None, 'you can name two components you will use.'),
   ('Write the brief',
    'Four lines, in your own words. Who is it for? What changes for them? How will you know it worked? What limits you: platform, deadline, accessibility. Agree on it with the stakeholder before you draw.',
    None, 'the stakeholder says the brief is right.'),
   ('Start from what already exists',
    'Ask first: does a component or a pattern already solve this? Use it. Would a small change solve it, like a new variant? Propose it. Ask for a new component only when you need it in more than one place.',
    None, 'you have a list of parts and no custom drawings.'),
   ('Build with instances and variables',
    'Drag components from the Library (page Components) into your frame and keep them as instances: never detach. For color, space, radius and text, pick variables and text styles. Never type a hex value or a loose number.',
    None, 'every layer comes from the system.'),
   ('Design every state, in light and dark',
    'Show the screen empty, loading, with an error and with success, and add a long-text case. Then set the frame to the Dark mode and look again. Write like a person: warm, direct, specific. An error says what happened and what to do. A button starts with a verb.',
    None, 'both themes look right and no text is cut.'),
   ('Hand it off',
    'Mark the frame Ready for dev and link it in the ticket. List the components you used: the Figma name is the class name, so Button is aipim-button. Flag what is custom, and note the behavior, the focus order and the labels.',
    None, 'a developer can start without asking basic questions.'),
  ],
  check=['Only Library components, no detached instances', 'Only variables, no loose colors or sizes', 'Light and dark checked',
         'Every state and a long-text case designed', 'Copy follows the voice: warm, direct and specific', 'Focus order and labels noted']),

 dict(n=2, audience='Developers', title='Build the frame',
  lead='You will take a frame marked Ready for dev and build it in HTML and CSS, using Aipim as it is.',
  need=['A frame marked Ready for dev', 'A web project, in any stack', 'Aipim, from npm or from GitHub'],
  have=['A pull request that matches the frame', 'A screen that works in light and dark, with the keyboard and at 200% zoom'],
  steps=[
   ('Get Aipim into your project',
    'Install the package from npm, or copy the folder from GitHub. Everything you need is then inside node_modules/aipim-ds.',
    ('Terminal', 'bash', 'npm install aipim-ds'),
    'the folders tokens/build/css and components/web exist in the package.'),
   ('Load the fonts, the tokens and the components',
    'Add these lines to the head of your page, in this order. The components read the tokens, so the tokens come first. The script is optional: it adds tab keys, dismiss buttons and dialog commands. Then set the page colors: the background with --aipim-bg-canvas and the text with --aipim-text-primary.',
    ('In the head of your page', 'html',
     '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Antonio:wght@600;700&family=Karla:wght@400;700&display=swap">\n'
     '<link rel="stylesheet" href="node_modules/aipim-ds/tokens/build/css/aipim.css">\n'
     '<link rel="stylesheet" href="node_modules/aipim-ds/components/web/aipim-components.css">\n'
     '<script src="node_modules/aipim-ds/components/web/aipim.js"></script>'),
    'the page has the Aipim background and Karla text.'),
   ('Read the frame and the specs',
    'Open the frame and read the hand-off note. For each component on the list, open its spec in docs/en/components, like button.md. The spec has the markup, the states and the accessibility notes.',
    None, 'you know every component and its states.'),
   ('Copy the markup and use only tokens',
    'Copy the markup from the spec. Use native elements: button for actions, a for links, input with a real label. For color and space use --aipim-* variables. Never write a hex value.',
    ('Markup from the spec', 'html', '<button class="aipim-button" type="button">Save changes</button>'),
    'nothing in your code is a hex value.'),
   ('Customize through variables',
    'Need another size or color? Set the component’s own variables, such as --aipim-button-height. Never use !important and never rewrite the component’s CSS.',
    ('In your CSS', 'css', '.toolbar .aipim-button { --aipim-button-height: var(--aipim-size-control-lg); }'),
    'the change lives in variables and the component CSS is untouched.'),
   ('Test it and open the pull request',
    'Test light and dark: add data-theme="dark" to the html element. Then use only the keyboard: every control must be reachable and show a focus ring. Zoom to 200%. Run an automated check such as axe. Open the pull request and link the Figma frame.',
    ('Dark theme', 'html', '<html data-theme="dark">'),
    'the checks pass and the pull request links the frame.'),
  ],
  check=['Only --aipim-* variables, no hex', 'Native elements, a visible focus ring and a label on every control',
         'Keyboard only works, and 200% zoom does not break the layout', 'Light, dark and reduced motion checked', 'The pull request links the Figma frame']),

 dict(n=3, audience='AI', title='Build with an agent',
  lead='You will brief an AI coding agent so it builds with Aipim, and then review its work before it ships. The agent builds. People decide and review.',
  need=['An AI coding agent that can read the files of your project', 'Aipim in your project (tutorial 2, step 1)', 'The brief and the Figma link (tutorial 1)'],
  have=['A screen built only from Aipim parts', 'A reviewed change you can trust'],
  steps=[
   ('Put Aipim within the agent’s reach',
    'Install Aipim in the project. The package carries AGENTS.md, the file that tells an agent how to build with Aipim. Many agents read it on their own. If yours does not, copy it to the root of your project.',
    ('Terminal', 'bash', 'cp node_modules/aipim-ds/AGENTS.md .'), 'the agent can open AGENTS.md.'),
   ('Give it three things',
    'The brief, the Figma link and AGENTS.md. If your agent works better with one file, give it llms-full.txt: the whole system in one place. llms.txt is the short index.',
    None, 'all three are in the project or in the conversation.'),
   ('Ask for a plan first',
    'Do not let it write code yet. A plan costs a minute and catches wrong turns early.',
    ('Prompt', 'text', 'Read AGENTS.md. Here is the brief and the Figma frame: [paste both]. Before you write code, list the Aipim components you will use and anything that does not fit the system.'),
    'you read the plan and agree with it.'),
   ('Ask it to build, with the rules',
    'Say the rules out loud, even though AGENTS.md has them. Short and specific beats long and vague.',
    ('Prompt', 'text', 'Build the screen with Aipim components and --aipim-* tokens only. Read the spec of every component you use. No hex values, no !important, native elements, a visible focus ring. Then run the checks in AGENTS.md, under Verify, and tell me what they showed.'),
    'the agent says which checks it ran and what they showed.'),
   ('Review it like a pull request',
    'Do not trust it blindly. Open the diff and the screen. Search for hex values and !important. Look for a label on every field and an aria-label on every button that has only an icon. Test with the keyboard, in light and dark.',
    None, 'you could explain every change in the diff.'),
   ('Correct with specific feedback',
    'Name the file, the line and the rule, then ask the agent to run the checks again. When it passes your review, open the pull request and link the Figma frame.',
    ('Prompt', 'text', 'Line 24 of card.html uses #ffffff. Use var(--aipim-bg-surface) instead, then run the checks again.'),
    'a person approved the pull request.'),
  ],
  check=['The agent had the brief, the Figma link and AGENTS.md', 'It listed its components before it wrote code',
         'No hex, no !important, no custom copy of a component', 'Every control works with the keyboard, in light and dark',
         'You read the diff, and a person approved the pull request']),
]

KEEP_INTRO = ('Two short lists that help in every tutorial: the same names in Figma and in code, '
              'and what to do when the system has no part for what you need.')
NAMES = [  # (in Figma, in code)
    ('Component Button', 'Class aipim-button, and the spec docs/en/components/button.md'),
    ('Variable bg/surface', '--aipim-bg-surface'),
    ('Text style Aipim/h4', '--aipim-text-h4-*'),
    ('Icon close', '#aipim-close in icons/sprite.svg'),
]
ASK = [
    'Does a component or a pattern already solve it? Use it.',
    'Does a small change solve it, such as a variant? Propose it.',
    'Is it needed in more than one place? Request a new component.',
    'Only needed here? Build it in your product with Aipim tokens, and keep it out of the system.',
]
STUCK = 'Stuck? Raise it before you build a custom version.'

# What the old "For developers" and "For AI" pages said, now at the end of the tutorial they belong to.
# Each entry: (title, lead, [(overline, title, [items])])
REFERENCE = {
 2: [
  ('How the system is built', 'Why Aipim works the way it does, and how it checks itself.', [
    ('Decided', 'Copy the code or install a package', ['Components: copied into the project, so the developer owns the code', 'Tokens: the CSS files, and the npm package aipim-ds', 'No hidden tracking: the licenses ask for credit and nothing more']),
    ('One source, many destinations', 'tokens.json generates everything', ['CSS variables, Jetpack Compose, SwiftUI, an import bundle for Figma and the color, type and space docs', 'Tool: tools/build_tokens.py, which writes tokens.json in the W3C 2025.10 format']),
    ('Check', 'Automatic verification', ['tools/build_tokens.py: contrast and color blindness checks, and it fails if a pair fails', 'tools/build_web.py --check: the component stylesheet is up to date', 'tools/build_ai.py --check: llms.txt, llms-full.txt and AGENTS.md are up to date', 'tools/build_tutorials.py --check: the tutorials are up to date']),
    ('Shortcuts', 'Try it now', ['Open components/web/examples/index.html: every component, with a light and dark toggle', 'Copy a snippet from the spec of each component', 'Starters for Vite and Next come in v1.5'])]),
  ('Web components and the repository', 'The conventions every component follows, and where everything lives.', [
    ('Conventions', 'Not tied to a framework', ['HTML and CSS', 'Only semantic tokens, never loose values', '--aipim-* variables per component as an escape hatch', 'No !important']),
    ('Variants and states', 'By classes and ARIA attributes', ['By classes and ARIA attributes', 'Usage and customization example per component']),
    ('Folders', 'Repository structure', ['docs/ and docs/en/components/', 'tokens/ (tokens.json and build/)', 'components/web/ and icons/', 'tools/ (generators and checks)', 'AGENTS.md, llms.txt and llms-full.txt'])]),
  ('Versions and platforms', 'How updates reach you, and what comes after the web.', [
    ('Versions', 'Versioning and updating', ['Semver: major breaks, minor adds, patch fixes', 'Changelog in each version']),
    ('Breaking changes', 'Deprecation and migration', ['Deprecation notice before removing', 'Step-by-step migration notes']),
    ('v1', 'Native tokens', ['Theme for Compose and SwiftUI generated from the tokens, not yet tested in an app']),
    ('v2', 'Native components', ['Compose and SwiftUI, if v1 gets traction'])]),
 ],
 3: [
  ('How the docs are written', 'The goal is an agent that gets it right the first time.', [
    ('Goal', 'An agent that gets it right the first time', ['The agent reads Aipim and generates correct, accessible screens without human help', 'Aipim\u2019s third audience, next to designers and developers']),
    ('Principles', 'How the docs are written', ['One source of truth: tokens.json', 'Explicit rules, with concrete values', 'One fact in one place', 'Tested examples', 'Short files, with frontmatter'])]),
  ('The Markdown package', 'The files an agent reads, and how a spec is shaped.', [
    ('Indexes for LLMs', 'llms.txt and llms-full.txt', ['llms.txt: a short index, with one link and one line per document', 'llms-full.txt: all documents together, to paste whole into the context', 'Generated by tools/build_ai.py from the specs']),
    ('Rules for agents', 'AGENTS.md', ['What Aipim is, the 12 rules, setup, the patterns that are easy to get wrong and how to verify', 'A Claude skill that says when and how to apply Aipim comes in v1.5']),
    ('Base documents', 'Foundations and specs', ['Color, typography, and space, shape and motion: generated from tokens.json', 'One spec per component, with the same sections', 'Flow patterns come in v1.1']),
    ('Template', 'Component spec in Markdown', ['Frontmatter: name, description, status, html, class, css, figma', 'Tokens used, WCAG criteria, related components', 'Fixed sections, always in the same order: when to use, when not to use, variants and props, states, tokens used, accessibility, code examples, do and don\u2019t', 'See docs/en/components/button.md for a real example'])]),
  ('Use it with your agent', 'Where to put the files in the tools people use most.', [
    ('Claude Code', 'Import AGENTS.md', ['Copy AGENTS.md into the project and import it from CLAUDE.md with @AGENTS.md', 'Point the agent to llms-full.txt when it needs the specs']),
    ('Cursor and Copilot', 'Read it from the root', ['Most agent tools read AGENTS.md from the root of the project', 'If yours does not, point an editor rule to the file']),
    ('Example prompts', 'Things to ask', ['\u201cBuild a login screen with Aipim\u201d', '\u201cChange the brand color and validate the contrast\u201d', '\u201cAdd an empty state to this list\u201d'])]),
  ('What comes next, and a caveat', 'Planned for v1.5, and what is still not guaranteed.', [
    ('Future \u00b7 v1.5', 'MCP server', ['Tools: get_tokens, get_component(name), check_contrast(fg, bg)', 'The agent queries instead of guessing']),
    ('Differentiator \u00b7 v1.5', 'Test suite (evals)', ['Test requests and automatic checks: uses only tokens? passes contrast? has visible focus?', 'Publishes the result: how well agents use Aipim']),
    ('Caveat', 'What is still not guaranteed', ['llms.txt is not read by every tool', 'The real value is in the whole: structured docs, AGENTS.md, the skill, MCP and tests'])]),
 ],
}
KEEP_IN = (1, 2)  # the tutorials that close with "Keep these close"
