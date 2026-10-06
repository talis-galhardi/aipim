# Voice and microcopy

How the words in an Aipim interface sound, and how to write the small texts: buttons, labels, helper text, errors, empty states and dialogs. The components do not set any text for you, so this is the part that is up to the person writing the screen.

## Voice

Aipim talks like a helpful person who respects your time.

- **Warm.** Talk to one person. Say "you". Be kind without being cute.
- **Direct.** Say the most important thing first. Short sentences. One idea per message.
- **Plain.** Use the words people use. If a word needs explaining, pick a different word.
- **Honest.** Say what happened and what is not possible. Do not hide a limit behind a cheerful tone.

What it is not: playful at the wrong moment, formal ("Kindly be advised"), or full of exclamation marks. Save celebration for moments that earn it, like finishing something hard.

## Rules that apply everywhere

1. **Sentence case.** "Save changes", not "Save Changes". Product and proper names keep their capitals.
2. **Start with the verb on actions.** "Add member", "Download report". The label says what will happen.
3. **Never "OK", "Yes" or "Submit" alone.** Say the action: "Delete project", "Send message". The same label should make sense without the text around it, because screen reader users often hear buttons and links on their own.
4. **Say what to do, not what went wrong with the person.** "Enter an email like name@example.com", not "Invalid input".
5. **No blame.** "We could not save your changes", not "You made a mistake". Do not say "sorry" unless something on our side failed.
6. **Do not say "please" before every instruction.** Use it once if it softens a real request.
7. **Numbers and dates the way people say them.** "3 unread", "Today, 14:30". Use numerals for counts.
8. **No jargon and no internal names.** "Your session ended", not "Error 401".
9. **Do not build sentences from pieces.** Whole sentences translate and read aloud better than a label glued to a number.
10. **Keep it short, but not cryptic.** Cut a word only if the meaning stays.

## By component

| Component | Write it like this | Example |
|---|---|---|
| **Button** | Verb, then object. Two or three words. | "Add member" |
| **Icon button** | No visible text, so the `aria-label` names the action. | `aria-label="Close"` |
| **Link** | Say where it goes. Never "click here" or "read more" alone. | "Read the accessibility notes" |
| **Text field label** | Say what to enter. Keep it above the field, always visible. | "Email" |
| **Helper text** | The format or the reason, not a repeat of the label. | "Used only for receipts" |
| **Error text** | What is wrong and how to fix it, in one sentence. | "Enter a valid email" |
| **Checkbox, radio, switch** | The option itself, positive and specific. For a switch, say what turns on. | "Email notifications" |
| **Alert** | Optional title (two to five words) and one or two sentences. | "Check your card and try again." |
| **Toast** | One short sentence about what just happened. Past tense. | "Item saved." |
| **Empty state** | A title that says what is empty, one sentence about what to do. | "Nothing here yet" |
| **Modal** | The title names the action or asks the question. The buttons repeat the action. | "Delete project?" with "Cancel" and "Delete project" |
| **Tabs and tab bar** | One or two words. Nouns. | "Overview", "Messages" |
| **Tag** | One or two words. | "Design" |
| **Top bar** | The name of where you are. | "Settings" |

## Four kinds of message

**Error.** What happened, then what to do. If you cannot say how to fix it, say what you will do about it.
- Do: "We could not save your changes. Check your connection and try again."
- Don't: "Error: operation failed."

**Success.** Confirm what was done, briefly. A toast is enough. Do not celebrate routine actions.
- Do: "Item saved."
- Don't: "Awesome! Your item has been successfully saved!"

**Empty.** Say why it is empty and give the next step. Do not apologize for being empty.
- Do: "No projects yet. Create your first project to see it here."
- Don't: "Oops! Nothing to see."

**Confirmation.** Say what will happen and, when it cannot be undone, say so.
- Do: "Delete project? This cannot be undone. All files in the project will be removed."
- Don't: "Are you sure?"

## Accessible text

- Every icon-only control has an `aria-label` that names the action, in the same words you would put on a visible button.
- Links and buttons make sense out of context (see rule 3).
- Do not use color words or position alone: "the red button" and "the field on the right" do not work for everyone. Name the control.
- Status messages go in an element with `role="status"` (or `role="alert"` for errors), so assistive technology reads them. See the Alert and Toast specs.
- Write plain language. A reading level most adults handle easily is a good target for anything people must act on.

## Words to avoid

| Instead of | Write |
|---|---|
| Utilize | Use |
| Click here | A link that says where it goes |
| Invalid, illegal | What is expected: "Enter a date like 12/05/2026" |
| Failed | What did not happen: "We could not send your message" |
| Whoops, oops | Say what happened |
| Are you sure? | State the consequence |

## Translation

Aipim's own texts are in English today. When you translate a product:
- Keep strings whole, with no sentence assembled from parts, because word order changes.
- Leave room: many languages are 30% longer. Components wrap long text instead of cutting it, so labels can grow.
- Plurals and numbers follow the language's rules. Use your i18n library's plural support, not "item(s)".
