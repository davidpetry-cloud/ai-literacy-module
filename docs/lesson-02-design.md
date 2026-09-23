# Lesson 2: Asking well (prompt structure). Design

**Status:** proposed 2026-09-23, awaiting David's approval. This is the
backward-design proposal (step 1 of `/build-lesson`). Nothing here is built.
Once it's approved, build exactly this. Any change goes back into this file
first.

**Model:** Opus. The lesson needs a new interactive tool (see CLAUDE.md's
model guidance).

**Objectives** (approved 2026-09-23, in `lessons/lesson-02.js`):

- 2.1 *(apply)*: Rewrite a vague request so it states the task, the context,
  the constraints and the format wanted.
- 2.2 *(analyze)*: Compare two outputs and attribute each difference to a
  specific change in the prompt.
- 2.3 *(create)*: Construct a prompt that includes an example of the output
  wanted.

**Timing:** 45 minutes, split the same way as Lesson 1:

| Warm-up | Concrete | Pictorial | Abstract | Check |
|---|---|---|---|---|
| 5 | 14 | 8 | 8 | 10 |

## Warm-up (pre-check)

| id | Objective | Question | What to expect |
|---|---|---|---|
| w1 | 2.1 | "A colleague asks you to 'write something about the meeting.' What would you need to know to do it well?" | Most people name one or two things (topic, length). Note which of the four parts nobody mentions unprompted. |
| w2 | 2.2 | "Two people ask a chatbot for the same thing and get very different answers. Why?" | "The AI is random" or "they're better at AI." The lesson replaces this with: the request is what differed. |
| w3 | 2.3 | "How would you get a chatbot to write exactly like a note you already have?" | Most describe the style in words. Few think to paste the note itself. |

## Check (post-check)

| id | Objective | Question | Reteach if… |
|---|---|---|---|
| p1 | 2.1 | Rewrite "Make a flyer for the event" so it names the task, context, constraints and format. | Context or constraints are missing (the usual gaps), or a part is vague ("make it good"). |
| p2 | 2.2 | Two short outputs whose prompts differ by one line ("…for a 10-year-old"). Which line caused each difference? | They put it down to chance or to the model "trying harder". |
| p3 | 2.3 | Write a prompt, with an example, for a task you'll actually do this week. | There's no actual example, or they ask the model to copy the example's *content* rather than its form. |

Exit ticket: the same two questions as Lesson 1.

## Concrete (14 min): a vague request and a structured one, per track

Learners mark which of the four parts (task, context, constraints, format) the
vague request is missing, rewrite it themselves, then compare with the
structured version's output.

In each vague output, the model makes up specifics. That's deliberate, and it
links back to Lesson 1: gaps in a request get filled with plausible
inventions.

- **Educators.** Vague request: "Write something about the field trip for
  parents." Structured request:
  - task: a reminder email;
  - context: Grade 3, zoo trip on Friday;
  - constraints: under 120 words, no jargon, must mention lunch and the
    Wednesday permission-slip deadline;
  - format: a subject line, then 3 short bullets, then a sign-off.

  The vague output invents a start time (such as "9 a.m.").
- **Professionals.** Vague request: "Write an update on the project for my
  manager." Structured request:
  - task: a status update email;
  - context: the reader is a VP who cares about budget and dates; a CRM
    migration is two weeks behind because of data clean-up;
  - constraints: 100 words or fewer, lead with the risk, no blame;
  - format: three labelled lines (Status / Risk / Ask).

  The vague output invents "on track".
- **Students.** Vague request: "Help me with my essay on climate change."
  Structured request:
  - task: **feedback on my thesis statement, not rewriting it**;
  - context: Grade 10, an argumentative essay, with the thesis included;
  - constraints: at most 3 suggestions, keep my voice, don't write sentences
    for me;
  - format: a numbered list with one question per point.

  The vague output writes a finished essay paragraph, which also makes this
  track a lesson in using AI responsibly for schoolwork.

Provenance: the prompts and outputs are `planted`, written by a model for this
lesson and labelled on the page as such. David may swap in real captured
outputs later.

## Pictorial (8 min): new tool, a prompt comparison

- **Layout:** the structured prompt is shown as four labelled parts (Task /
  Context / Constraints / Format) beside both outputs. The panels stack at
  narrow widths.
- **Controls:** one button per part ("Show what Format changed"), with
  `aria-pressed`. Pressing one:
  - outlines the output segments that part caused, each labelled
    "← Format";
  - states the change in words in a live region, e.g. "Format changed: three
    bullets and a subject line."
- **Invented details:** segments of the vague output that the model made up
  are labelled "Invented — the request didn't say."
- **Accessibility:** it's plain HTML rather than SVG, so every state is
  written in words and everything works by keyboard. Each part gets an
  existing pale surface plus its written label, so colour is never the only
  cue:

  | Part | Surface |
  |---|---|
  | Task | `--peri-pale` |
  | Context | `--amber-pale` |
  | Constraints | `--rose-pale` |
  | Format | `--teal-pale` |

  The only new colour pairing is `--text` on `--teal-pale`. Add it to `PAIRS`
  in `tests/ui.test.js` first. It must pass in both themes.
- **Tests to add:**
  - every request part changes at least one output segment;
  - every segment's `causedBy` names a real part;
  - the vague output contains at least one invented segment;
  - the render tests cover the toggling.

## Abstract (8 min): principles, as new claims

Four new `source: "model"` claims for `claims.js`, each with a rationale:

- **prompt-parts:** A clear request states four things: the task, the
  context, the constraints, and the format you want back.
- **gaps-get-filled:** When a request leaves out details the output needs, a
  model often fills the gap with plausible invented specifics.
- **example-steers-form:** Showing an example of the output you want is one of
  the most reliable ways to control its format and tone.
- **structure-not-truth:** A better-structured request makes an output more
  useful, not more accurate. The output still needs checking.

Each track's answer key is also a claim (`l2-key-educators`,
`l2-key-professionals`, `l2-key-students`), so there are **7 new claims** in
all, all awaiting David's attestation.

## Transfer: "Use it this week"

- **Educators:** write the request for your next class communication using the
  four parts, and keep it as a template.
- **Professionals:** turn one recurring request into a saved template.
- **Students:** next time you use AI for schoolwork, ask for feedback rather
  than writing, using the four parts.

## Structural changes this lesson needs

- **A second exercise type.** The alignment tests and `textRoles()` in
  `tests/lib/readability.js` assume every concrete stage is Lesson 1's
  "passage + answer key" shape. Add a "prompt pair" type with its own rules
  (provenance, parts, segments, answer-key claim) without loosening Lesson 1's
  rules.
- **The pictorial figure** is `prompt-compare`. Lesson 1's `confidence-grid`
  checks apply only when that figure is used.
- **Readability ceilings apply unchanged** (CLAUDE.md, "Readability rules").
  Example prompts and outputs count as `passage` text.
- **UI rules apply unchanged:**
  - type scale, spacing and radius tokens, heading order;
  - distinct control names ("Show what Task changed", and so on);
  - focus management, both themes, 375px.
