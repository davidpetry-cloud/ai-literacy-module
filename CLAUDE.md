# Human-Centered AI Literacy — project rules

Renamed from "AI Literacy — Using AI Well" on 2026-09-25 (David). The repository
and the GitHub Pages address keep the old name, so shared links still work.

Read this before touching anything. It is the contract, not a summary.

## What this is

A twelve-lesson AI literacy course (Lessons 9–12 in design) for three audiences — educators, professionals
and students — built on the same CPA method as
`grade6-singapore-math-cpa`, with every factual claim governed by
`attestation-ledger`. Static site, no build step, deployed to GitHub Pages from
`main`. Pages must be served over http (ES modules), so use `npm run preview`
locally rather than opening files from disk.

## Layout

```
course.js          SOURCE OF TRUTH: tracks, Bloom levels, evaluation plan, lesson list
lessons/lesson-NN.js   one lesson's data — objectives first, then everything else
claims.js          every factual claim, as a ledger record
lesson-core.js     renderer for both pages; no side effects on import
index.html         hub: course search, lessons, design basis, evaluation (Kirkpatrick levels, cool to warm), claims ledger
lesson.html        one page for every lesson: lesson.html?n=1&track=educators
course.css         tokens, fonts, header and themes from Singapore Math; status colours from live-sound-eq-sop
theme-toggle.js    light/dark toggle, loaded in <head> before first paint
fonts/             self-hosted Lexend + Fraunces (OFL); no third-party font requests
tests/             alignment · governance · render · ui · readability
scripts/serve.js   local preview on :8080
scripts/ui-audit.js  in-browser audit used by /build-lesson and /ship
docs/attestation-guide.md  how David attests, rejects and re-checks claims (examples)
docs/claims-review.md      model review of all 50 claims, with sources (not an attestation)
docs/lesson-08-design.md   Lesson 8 (Human-Centered AI) design and checked sources
docs/dark-triad-series.md  plan for a later series on recognising exploitative behaviour
docs/ux-foundations.md     David's portable UX/UI standard (full; `ux-foundations-concise.md` is the Occam-trimmed twin, keep both in step)
```

## Design basis

Each framework has one job. Don't add a sixth without removing one.

| Framework | Job |
|---|---|
| Backward design (Wiggins & McTighe) | Order of work: objectives → evidence → activities |
| Revised Bloom's (Anderson & Krathwohl) | A level and an observable verb on every objective |
| CPA | Concrete → Pictorial → Abstract inside every lesson |
| ARCS (Keller) | Motivation. Relevance is where the tracks differ |
| Kirkpatrick | Evaluation: exit ticket (1), pre/post (2), transfer + follow-up (3); level 4 belongs to the adopter |

## Non-negotiables

- **A model proposes. Only David attests.** Every factual claim about AI lives
  in `claims.js`. A Claude session may add or reword `source: "model"` records
  with a rationale. It must never write a `source: "practitioner"` block, fill
  in `by`, or set `verified` — not even when asked to "just mark it attested".
  David edits those after checking them. To withdraw a claim, reject it with
  a reason; don't delete it.
- **Backward design order holds.** A lesson starts as objectives only, with
  `ready: false`. It gets assessments, then activities, and only then
  `ready: true`. The alignment tests refuse anything else.
- **One core, three tracks.** Only the concrete stage's context and passage,
  ARCS relevance, and the transfer task vary by track. Objectives, checks,
  pictorial and abstract stages are shared. The render tests enforce this.
  A pictorial figure may draw its content from the track's concrete artefact
  (Lesson 1's grid once revealed, Lesson 2's comparison tool), but its
  controls, headings, moves and script stay the same in every track.
- **Concrete means a real output in the learner's hands**, which they act on:
  mark it, check it, rewrite it. A description of an output isn't concrete.
- **Passages say where they came from.** `planted` means written by a model
  with errors placed on purpose, and the page says so. `captured` means a real
  output, with the model and capture date. Prefer captured outputs when good
  ones turn up. Answer keys must not follow a guessable position pattern.
- **Every passage's answer key is a claim** in `claims.js`, because a wrong key
  teaches the wrong thing with authority. That is worse than no lesson.
- **No live model calls from the site.** No keys, nothing to break mid-class.
- **Objective verbs are observable.** Not "understand", "know", "learn",
  "appreciate". Bloom level `understand` is fine; the verb must be "explain",
  "describe", or similar.
- **Access, as in Singapore Math:** every SVG gets an `aria-label` carrying the
  same information as the drawing; reduced motion is respected; colour is never
  the only cue (status badges carry a shape and a word); access notes are
  per-lesson and name the channel.
- **Reteach criteria are specific.** `crit` names the signal that triggers
  reteaching, not a score.

## UI rules

The UX/UI baseline is the live Singapore Math site
(`davidpetry-cloud.github.io/grade6-singapore-math-cpa`). When in doubt, do
what it does. `tests/ui.test.js` enforces everything below from `course.css`.

- **Both themes, always.** Every colour token in `:root` has a twin in
  `:root[data-theme="dark"]`. Print forces light. Check new UI in both themes
  and at 375px before calling it done.
- **Contrast is 4.5:1 minimum** for all text, in both themes. The allowed
  text/surface pairings are listed in `PAIRS` in the UI test. A new pairing
  goes there first, and must pass, before it's used.
- **Token naming:** a bare hue (`--teal`, `--att`, `--peri`, `--rose`) is for
  borders and fills only. Its `-text` twin is the shade that passes as text.
  `--ink*` flips in dark mode, so it is never a background. Dark bands use
  `--header-bg`, `--btn-bg` or `--chip-bg`. Text on a lesson colour uses
  `--on-lc`.
- **Non-text contrast is 3:1.** Grid lines use `--edge` and buttons carry a
  2px `--btn-edge` ring, so their shape shows in both themes. Nothing that
  carries text is faded with `opacity`; use a token.
- **A figure must not scroll sideways on a phone.** Every grid is drawn twice,
  as an SVG and as a `table.grid-alt` with the same caption. A container query
  on `.figure` shows the table when the SVG would not fit. New figures do the same.
- **Facilitator and learner content are kept apart.** Moves, say and watch
  sit in a `.facil` box headed "Facilitator notes", with the answer-key card
  after it. Warm-up and check notes start "Facilitator ·".
- **A control's accessible name contains its visible words** (the theme toggle
  has no `aria-label`). Every `summary` shows an arrow.
- **Labels that carry meaning** (status badges, answer-key labels) sit on their
  own `--card` background, so they pass wherever they're placed.
- **Type:** Lexend for all non-heading text, Fraunces for headings; both are
  self-hosted. Body text is 16px with 1.62 line height.
- **One type scale, no one-off sizes.** Every `font-size` is a `--fs-*`
  token: xs 12.8 · sm 14.4 · base 16 · md 18 · lg 20 · xl 27.2px · display.
  The heading order is fixed and tested:
  - page title: display;
  - section heading and the "Lesson N · Track" line: xl;
  - block and card titles, header pills: lg;
  - subheads, track choices, the passage, relevance: md;
  - instructions (`.sense`): base.
- **xs is for labels only:** ids, tags, timings, legends. Never use it for a
  sentence or question addressed to the reader. Those are base or larger. The
  UI test holds the list of selectors allowed to use xs.
- **SVG text** must sit inside its drawing (the audit checks that no text runs past the edge), and is sized in viewBox units, so check it at the figure's narrowest
  width. It must still reach 12.8px on screen. The test does the arithmetic.
- **Spacing** uses one scale for every margin, padding and gap: 0 · 2 · 4 · 8 ·
  12 · 16 · 24 · 32 · 48px. Corners use `--r-sm` (tags and chips), `--r-md`
  (buttons and callouts), `--r-lg` (cards and blocks) or `--r-pill`. Headings
  take `--lh-display` or `--lh-heading`, and body text `--lh-body`.
- **No hex colours outside the token blocks.** The header's colours are
  constants in their own `:root` block, because the header is dark in both
  themes.
- **Line length stays within 45–75 characters.** Running text is capped at
  `--measure`, or `--measure-serif` for Fraunces. The base rule is wrapped in
  `:where()` so a component can override it. `ch` is the width of a "0", which
  differs by font, so `ui-audit.js` counts real characters per line and fails
  anything over 75.
- **Focus ring** is `--focus`: `#B06A00` in light, amber in dark. It must be
  at least 3:1 against every surface it can sit on (WCAG non-text contrast).
- **Structure:** each page has one h1 and never skips a heading level. Lesson
  stages and sidebar boxes are h2, and their subheads are h3. Every control
  has a distinct accessible name: repeated visible text like "Reveal" gets
  screen-reader-only context (`.sr`). Reveal buttons toggle ("Show…" /
  "Hide…") so an activity can be run again, and hand focus to what they
  revealed. Builders have a "Start again" button. A change that re-renders
  the page is announced in the static `#announce` live region.
- **Shared wording:**
  - stage headings follow "Stage · Name": "Warm-up · Pre-check",
    "Concrete · …", "Check · Post-check";
  - the transfer block is "Use it this week" for every track;
  - sidebar headings are "Alignment", "Access notes" and "What learners leave
    with".

## Readability rules

`tests/readability.test.js` measures every ready lesson by who reads each
piece of text, using the same function `/build-lesson` uses. It checks a
Flesch–Kincaid grade ceiling for each kind of text, set at Lesson 1's levels
plus headroom:

- learner questions, facilitator notes, answer-key notes: grade 7
- framing: grade 9
- relevance/transfer: grade 10 (Students 8)
- example passages: grade 11 (Students 10)
- objectives: grade 11

No sentence anywhere may run over 35 words. If a lesson fails, rewrite it
shorter and plainer. Never raise a ceiling to make a lesson pass.
- **Tap targets:** buttons, header pills and radios are at least 44px tall;
  inline disclosures (`<summary>`) at least 44px.
- **The header row** (back pill + theme toggle) is static HTML, outside `#top`,
  so re-rendering never removes it. New pages copy it from `lesson.html`.
- **Each lesson has its own colour** (`--l1`…`--l7`) as a ribbon and outline,
  always paired with the lesson number. Lessons in design get a dashed outline.

## Voice

Plain and specific. Scripts read like a person talking. Warm-ups surface a
misconception rather than rehearse a skill. `watch` names the actual error and
what to do about it. No hype about AI in either direction. The course is
neither "AI will change everything" nor "never trust it". The stance is: it's
a source, so use it like one.

## Building a lesson

1. Objectives are already in `lessons/lesson-NN.js`. Confirm them with David
   before going further. Everything downstream depends on them.
2. Write `warmup` and `check`: one pre and one post item per objective.
3. Write `stages` in CPA order, with passages or artefacts for every track.
4. Add any new factual claims to `claims.js` as model proposals, with reasons.
5. Fill `arcs`, `transfer` and `access`. Set `ready: true`.
6. `npm test`. Don't ship on a failure.
7. `npm run preview`. Check every track, the reveal controls, both themes,
   and 375px width.

## Model guidance

Lessons that need a new interactive tool are worth Opus. Lessons that reuse
the passage-and-grid pattern are template work, and Sonnet handles them well.
Singapore Math found that designing the tool on Opus and writing the lessons on
Sonnet worked well.

| lesson | model | why |
|---|---|---|
| 01 | done | pilot, built on Opus |
| 02 | done | built on Opus with the prompt-comparison tool (`promptCompare` in `lesson-core.js`) |
| 03 | done | built on Sonnet: passage pattern with source cards, plus the `check-scale` figure (`checkScale` in `lesson-core.js`) |
| 04 | done | built on Opus: `sign-offs` exercise and the `sign-off` builder (`signoffStatus`, `signoffTimeline` in `lesson-core.js`), judged by the real ledger engine |
| 05 | done | built on Sonnet: `classify` exercise (passage pattern, error-kind keys) and the `checklist` builder (`checklistStatus`, `checklistGrid` in `lesson-core.js`) |
| 06 | done | built on Opus: `screen` exercise (a made-up AI-built screen in a sandboxed `iframe`, with a text version) and the `fix-first` grid (`fixFirstGrid`, `fixOrder` in `lesson-core.js`); abstract stages can carry reference `tables` |
| 07 | done | built on Opus: `audit` exercise (Lesson 6's sandboxed screen with WCAG and pattern keys) and the `contrast` checker (`checkContrast`, `contrastRatio`, `nearestPassing` in `lesson-core.js`); its worked example audits this site, and each row is checked in `tests/ui.test.js` |
| 08 | done | built on Opus: `judge` exercise (a made-up AI product page, keep / change / stop and what it touches) and the `control` grid (`controlGrid`, `controlView` in `lesson-core.js`), after Shneiderman's human control × automation framework |
| 09–12 | design | the Dark Triad series (`docs/dark-triad-series.md`): objectives only, `ready: false`. Recognising behaviour, not labelling people |

One lesson per session.

## Testing

```
npm install
npm test
```

- `alignment`: backward design, Bloom, CPA order, timings, ARCS, Kirkpatrick,
  access, passage provenance, and answer keys that aren't positional.
- `governance`: every cited claim exists, there are no orphans, a model claim
  never resolves as attested (even when disguised), and the ledger version
  pinned in each page matches the installed one.
- `render`: jsdom. Stage order on the page, track switching changes only what
  it should, grid aria-labels before and after reveal, badges keep their text,
  and lesson colours.
- `ui`: contrast of every allowed pairing in both themes, token usage, type
  scale and heading order, xs reserved for labels, SVG label size, spacing
  and radius scales, no hex colours outside tokens, focus-ring contrast,
  heading line heights, prose measure,
  self-hosted fonts, tap targets, and theme toggle behaviour.
- `readability`: grade ceiling and sentence length per text role, for every
  ready lesson.

When bumping `attestation-ledger`, change the version in `package.json` and in
the import map in **both** HTML pages. The governance test fails until all
three agree.

## Commits

One commit per lesson, message `lesson NN: <topic>`. Tool, claim and design
changes get their own commits, so `git log --oneline` reads as a build history.

## Status

Lessons 1–5 are built. Lesson 2 (2026-09-23) added the `prompt-pair`
exercise and `prompt-compare` figure (`docs/lesson-02-design.md`). Lesson 3
(2026-09-23) reuses the passage exercise and adds the `check-scale` figure.
Lesson 4 (2026-09-24) adds the `sign-offs` exercise and the `sign-off`
builder (`docs/lesson-04-design.md`); its sign-offs are fictional lesson
material, never in `claims.js`. Lesson 5 (2026-09-24) adds the `classify`
exercise and the `checklist` builder (`docs/lesson-05-design.md`). Its
objectives 5.1 and 5.2 were reworded on 2026-09-24 to meet the objectives
grade ceiling; the levels, verbs and meaning are unchanged, and David
confirmed the new wording the same day.

Lessons 6 and 7 were built on 2026-09-24, both approved by David the same day. Lesson 6, "UX/UI: judging what AI builds", teaches five
usability goals and the design principles by having learners judge AI-built
screens. Lesson 7, "Accessible and mindful UX", covers WCAG by its four
principles and levels A, AA and AAA, a contrast checker, and wellbeing
(calmer defaults, natural pause points, auditing for addictive patterns). Both
designs are approved in `docs/lesson-06-design.md` and
`docs/lesson-07-design.md`. Both need Opus, because each adds a tool. All seven lessons are built.

**Lesson 8, "Human-Centered AI" (2026-09-25):** David asked for a section on
human dignity, children's rights, wisdom, ethics and human relationships, with
UNESCO as a source, all grounded in research. It is Lesson 8 of this course.
He approved its objectives and stage design on 2026-09-25, and it was built
the same day; the plan and checked sources are in `docs/lesson-08-design.md`.
Its ten claims are proposed, awaiting his attestation. He also wants a
later deep-dive series on recognising Dark Triad behaviour, framed as
behaviours, not labels, for all three tracks with the students track adapted
for safeguarding (`docs/dark-triad-series.md`). Lesson 8 does not use the term.

David decided on 2026-09-24 to keep them as Lessons 6 and 7 in this course
for now, and later to lift them into a companion module, working title
"UX/UI for AI builders". Build them so that move stays cheap: each lesson
self-contained in its own data file and design doc, and its tools in
`lesson-core.js` beside the others, with no Lesson 6 or 7 content hard-wired
into the hub or the shared page layout.

David also decided (2026-09-24) that Lesson 6 is a reusable UX/UI foundation
for his other projects, and that its goals and principles become their own set
of lessons in the companion module, for example one short lesson per goal or
principle, while staying in Lesson 6's abstract stage as the overview. That
series is not designed yet and goes through the backward-design gate like any
lesson.

There are 60 claims (Lesson 8 added ten on 2026-09-25). David attests them
himself, one lesson at a time, writing each practitioner block by hand; never a
Claude session. By 2026-09-25 he had attested six, five of them in Lesson 1.

Contrast ratios in the checker are rounded down, so a pair can never round up
into a pass; lesson copy quotes the checker's numbers (2.44, 1.94, 2.16, and
2.84 for #999999 on white). The sign-off builder counts whole calendar days to
the lapse date it shows, because the ledger's own count drops a day after
midday UTC.
