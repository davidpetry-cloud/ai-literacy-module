# AI Literacy — Using AI Well — project rules

Read this before touching anything. It is the contract, not a summary.

## What this is

A five-lesson AI literacy course for three audiences — educators, professionals
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
index.html         hub: lessons, design basis, evaluation, claims ledger
lesson.html        one page for every lesson: lesson.html?n=1&track=educators
course.css         tokens forked from Singapore Math; status colours from live-sound-eq-sop
tests/             alignment · governance · render
scripts/serve.js   local preview on :8080
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
  David edits those himself after checking. To withdraw a claim, reject it with
  a reason; don't delete it.
- **Backward design order holds.** A lesson starts as objectives only, with
  `ready: false`. It gets assessments, then activities, and only then
  `ready: true`. The alignment tests refuse anything else.
- **One core, three tracks.** Only the concrete stage's context and passage,
  ARCS relevance, and the transfer task vary by track. Objectives, checks,
  pictorial and abstract stages are shared. The render tests enforce this.
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
7. `npm run preview`. Check every track, the reveal controls, and 375px width.

## Model guidance

Lessons that need a new interactive tool are worth Opus. Lessons that reuse
the passage-and-grid pattern are template work, and Sonnet handles them well.
Singapore Math found that designing the tool on Opus and writing the lessons on
Sonnet worked well.

| lesson | model | why |
|---|---|---|
| 01 | done | pilot, built on Opus |
| 02 | Opus for the tool | needs a prompt-comparison tool: same task, two prompts, differences attributed |
| 03 | Sonnet | reuses the passage pattern, with source cards doing more of the work |
| 04 | Opus | the attestation exercise is new, and it's the course's centrepiece |
| 05 | Sonnet | checklist builder is simple; classification reuses the passage pattern |

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
  it should, grid aria-labels before and after reveal, badges keep their text.

When bumping `attestation-ledger`, change the version in `package.json` and in
the import map in **both** HTML pages. The governance test fails until all
three agree.

## Commits

One commit per lesson, message `lesson NN: <topic>`. Tool, claim and design
changes get their own commits, so `git log --oneline` reads as a build history.

## Status

Lesson 1 is built as the pilot. Lessons 2–5 have objectives only, awaiting
David's review. All 7 claims are proposed and none are attested.
