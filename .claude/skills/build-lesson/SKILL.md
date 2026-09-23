---
name: build-lesson
description: Build one lesson of the AI literacy course from its approved objectives, following backward design, CPA, the three tracks and the UI rules in CLAUDE.md. Use when David runs /build-lesson N.
argument-hint: <lesson number 2-5>
disable-model-invocation: true
---

# Build lesson $ARGUMENTS

Build `lessons/lesson-0$ARGUMENTS.js` from objectives to `ready: true`. CLAUDE.md
is the contract. Read it in full before anything else, along with
`lessons/lesson-01.js` (the finished pattern) and the target lesson file.

## 0. Preflight: stop if any of these fail

- `$ARGUMENTS` is a lesson number, the lesson exists, and it is still `ready: false`.
- CLAUDE.md's Status section records its objectives as approved. If not, show
  the objectives and stop.
- `git status` is clean. If not, say what's uncommitted and ask before going on.
- `npm test` passes before you touch anything.
- **Model check.** Look up this lesson in CLAUDE.md's model-guidance table.
  If it says Opus and you are not Opus, say so and ask whether to continue or
  switch first. If it says Sonnet and you are Opus, mention that Sonnet would
  do. Either way, one line, then carry on once answered.

## 1. Propose the evidence, then wait (backward design gate)

**If `docs/lesson-0$ARGUMENTS-design.md` exists, start from it.** It's a
design already proposed in an earlier session. Summarise it in chat, point
out anything that conflicts with the current CLAUDE.md or code, and ask David
to approve it or say what to change. Update the file with any changes. Once
approved, set its Status line to "approved <date>" and build exactly what it
says. Don't draft a new design over it.

Otherwise, before writing any code, show David in chat:

- one warm-up (pre) item and one check (post) item for **every** objective,
  each with its `expected` or `crit` text;
- the exit ticket;
- a one-paragraph sketch of each CPA stage and what the concrete artefact is
  for each track;
- any new factual claims the lesson will rest on.

If the lesson needs a new interactive tool (CLAUDE.md names one for lessons 2
and 4), describe it here too: what the learner does, what it shows, and how its
`aria-label` carries the same information.

**Stop and wait for approval.** Changes go back into this step.

## 2. Build it

1. `warmup` and `check`, as approved.
2. `stages` in CPA order. Concrete gets a context and artefact for all three
   tracks, with `provenance` set honestly, `planted` unless it was really
   captured. Answer keys must not follow a guessable position pattern.
3. New claims go into `claims.js` as `source: "model"` records, each with a
   rationale. **Never write a practitioner attestation.** Each track's answer
   key is a claim too.
4. `arcs` (with relevance for every track), `transfer` per track, and `access`
   notes that name their channel.
5. A new tool goes in `lesson-core.js` and uses existing tokens and classes.
   Any new colour pairing is added to `PAIRS` in `tests/ui.test.js` first,
   and must pass in both themes. Add render tests for anything the tool
   computes or displays.
6. Set `ready: true`.

## 3. Verify

- `npm test`. Every suite passes. Fix the cause; never loosen a test to pass.
  `readability` failing means the writing is too dense for its reader: shorten
  sentences and use plainer words. Never raise a ceiling.
- `npm run preview` (in the background), then in the browser pane, for **each
  track**, at desktop width and at 375px:
  `const { audit } = await import("/scripts/ui-audit.js"); await audit();`
  It must return `pass: true`. That covers contrast in both themes, the type
  floor, tap targets, heading order, unique control names and line length.
  Also use the reveal controls, the track switcher and the keyboard yourself.
- Stop the preview server.

## 4. Hand over

Update the Status section and the lesson's row in the model table in
CLAUDE.md. Then report briefly:

- what was built;
- which claims now await attestation, with the source to check each against;
- anything you were unsure of.

Do not commit. Tell David to run `/ship` once the lesson has been reviewed.
