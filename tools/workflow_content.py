"""Content of the workflow guide, written once. tools/build_workflow.py turns it into docs/en/workflow.md.
The Figma page 'Workflow' was built from the same text."""

TITLE = 'Workflow'
INTRO = ('A recommended way for stakeholders, designers and engineers to work together with Aipim, from the first idea to the release. '
         'Use it as it is, or adapt it to your team.')

FLOW = [  # (stage, who leads, what comes out)
    ('Frame', 'Stakeholders and designer', 'A one-page brief'),
    ('Design', 'Designer', 'Screens made from the system'),
    ('Review', 'Everyone', 'A decision: approve, change or drop'),
    ('Hand off', 'Designer to engineer', 'A frame ready for dev and a checklist'),
    ('Build', 'Engineer', 'A pull request that matches the frame'),
    ('Verify and release', 'Everyone', 'Shipped, measured and fed back into Frame'),
]

# sections: (title, intro, [blocks]) ; block = (overline, title, [bullets])
SECTIONS = [
 ('Who does what', 'Four roles. In a small team one person can wear more than one hat; the decisions stay the same.', [
  ('Business and product', 'Stakeholder', [
    'Brings: the goal, the audience, the constraints and how success will be measured',
    'Decides: what to build, in what order and when it is good enough',
    'Uses Aipim by: reading the Patterns page to see what is possible, and reviewing in the Figma file, not in slides',
    'Does not: pick colors, components or code']),
  ('Design', 'Designer', [
    'Brings: the solution, composed from Aipim components and patterns',
    'Decides: layout, flow, copy and which component fits',
    'Uses Aipim by: working only with Library components and semantic variables, and testing light and dark',
    'Hands over: a frame marked ready for dev, with the handoff checklist']),
  ('Engineering', 'Engineer', [
    'Brings: feasibility, effort and what is already built',
    'Decides: how to build it, using the components and tokens as they are',
    'Uses Aipim by: copying markup from the specs and using only --aipim-* variables',
    'Raises: anything that does not fit the system, before building a custom version']),
  ('System', 'System owner', [
    'Keeps Aipim healthy: tokens, Library, specs and Changelog in sync',
    'Decides: what joins the system, and when something is deprecated',
    'Runs: the request queue and the system sync',
    'Protects: accessibility and consistency, with the right to say no. In a small team a designer or an engineer wears this hat']),
 ]),
 ('Stage by stage', 'Each stage says who leads, what to do with Aipim and when it is done.', [
  ('Stage 1 · Stakeholders and designer', 'Frame the problem', [
    'Goal: agree on who it is for, what changes for them and how you will know it worked',
    'With Aipim: check the Patterns page and the component catalog to see what already exists',
    'Write a one-page brief: audience, goal, success measure and constraints (platform, deadline, accessibility)',
    'Done when: the stakeholder and the designer agree on the brief']),
  ('Stage 2 · Designer', 'Design with the system', [
    'Start from Library components and the Patterns page. Use instances, never detached copies',
    'Use only variables: colors, space, radius and type come from Aipim, never loose values',
    'Design every state: empty, loading, error and success, in light and dark',
    'Done when: the screens pass the designer checklist']),
  ('Stage 3 · Everyone', 'Review', [
    'Stakeholders check the brief: does this solve the problem?',
    'The designer checks the system: components, variables, accessibility and copy',
    'The engineer checks feasibility now, not after the design is final',
    'Done when: the decision is recorded: approve, change or drop']),
  ('Stage 4 · Designer to engineer', 'Hand off', [
    'Mark the frame Ready for dev and link it in the ticket',
    'List the components used. The Figma name is the class name: Button is aipim-button',
    'Flag what is custom, and note behavior, states, long text and the focus order',
    'Done when: the engineer can start without asking basic questions']),
  ('Stage 5 · Engineer', 'Build', [
    'Copy the markup from the spec of each component and load the Aipim stylesheets',
    'Use only --aipim-* variables and native elements, and never !important',
    'Customize through the component variables, not by overriding its CSS',
    'Done when: it matches the frame in light and dark and passes the engineer checklist']),
  ('Stage 6 · Everyone', 'Verify and release', [
    'Design QA: compare with the frame at three widths, in light and dark',
    'Accessibility: keyboard only, 200% zoom and an automated check such as axe',
    'Stakeholders accept it against the success measure of the brief',
    'After release: measure, then bring what you learn back to Frame']),
 ]),
 ('Need something new?', 'Most needs are already solved. Ask in this order before asking for a new component.', [
  ('Decision', 'Ask in this order', [
    '1. Does a component or a pattern already solve it? Use it',
    '2. Does a small change solve it, such as a variant or a prop? Propose it',
    '3. Is it needed in more than one place? Request a new component',
    '4. Only needed here? Build it in your product with Aipim tokens, and keep it out of the system']),
  ('Bar to join', 'Criteria to join the system', [
    'Needed in at least two places',
    'Meets WCAG 2.2 AA and works with the keyboard',
    'Works in light and dark and uses only semantic tokens',
    'Has a spec: when to use, states, tokens and accessibility']),
  ('Template', 'Request template', [
    'Problem: what people cannot do today',
    'Where: the screens that need it',
    'Why the existing components do not fit',
    'Sketch and behavior, including keyboard and states']),
 ]),
 ('How the system changes', 'The tokens lead, and Figma follows. Every change leaves a trace in the Changelog.', [
  ('Tokens', 'Changing a token', [
    '1. Edit tokens.json, or the seeds in tools/build_tokens.py',
    '2. Run the generator: it checks contrast and color blindness',
    '3. Update the Figma variables, then the docs',
    '4. Add a Changelog entry and bump the version']),
  ('Components', 'Changing a component', [
    '1. Design the change in the Library and test light and dark',
    '2. Update the CSS and the spec in the repository',
    '3. Run build_web.py and build_ai.py',
    '4. Update the Figma doc page and the Changelog in the same change']),
  ('Versions', 'Versions and deprecation', [
    'Semver: patch fixes, minor adds, major breaks',
    'Announce a deprecation one minor version before removing',
    'Write a migration note for every breaking change',
    'Tokens first: tokens.json rules and Figma follows']),
 ]),
 ('Checklists', 'Short on purpose. Copy them into your tickets.', [
  ('Designer', 'Before the handoff', [
    'Only Library components, no detached instances',
    'Only variables, no loose colors or sizes',
    'Light and dark checked',
    'Every state and a long-text case designed',
    'Copy follows the voice: warm, direct and specific',
    'Focus order and labels noted']),
  ('Engineer', 'Before the pull request', [
    'Only --aipim-* variables, no hex',
    'Native elements, a visible focus ring and a label on every control',
    'Keyboard only works, and 200% zoom does not break the layout',
    'Light, dark and reduced motion checked',
    'The pull request links the Figma frame']),
  ('Everyone', 'Before the release', [
    'The success measure of the brief can be measured',
    'Design QA done by the designer',
    'Stakeholder accepted it',
    'System changes are in the Changelog',
    'Known gaps are written down']),
 ]),
 ('Names and AI agents', 'Design and code speak the same language, and so can an agent.', [
  ('Hand-off language', 'Same names everywhere', [
    'Figma component Button is the class aipim-button and the spec docs/en/components/button.md',
    'Figma variable bg/surface is --aipim-bg-surface',
    'Figma text style Aipim/h4 is --aipim-text-h4-*',
    'Figma icon close is #aipim-close in icons/sprite.svg']),
  ('AI agents', 'Working with AI agents', [
    'Give the agent the brief, the Figma link and AGENTS.md (or llms-full.txt)',
    'Ask it to use Aipim components and tokens only',
    'Review its work like a pull request: the engineer checklist applies',
    'The agent builds; people still decide and review']),
 ]),
 ('Team sizes', 'The stages stay. What changes is how much ceremony they need.', [
  ('Solo', 'Working alone', [
    'You wear every hat. Keep the stages and the checklists, skip the meetings',
    'Write the brief for yourself: it takes ten minutes',
    'Review your own work after a night of sleep, in light and dark']),
  ('Small team', 'A small team', [
    'A designer, an engineer and a product owner, and one of them also owns the system',
    'One review per feature with all three; the engineer joins at stage 2',
    'A short system sync every two weeks']),
  ('Organization', 'A larger organization', [
    'A system owner with a request queue and a monthly sync',
    'Contributions follow the criteria and the template',
    'Releases and deprecations are announced in the Changelog']),
 ]),
]
