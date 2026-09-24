# Lesson 4: Who signs off (human in the loop). Design

**Status:** approved 2026-09-24. Built on Opus. `lessons/lesson-04.js` is the
source of truth for wording.

**Timing:** warm-up 5, concrete 12, pictorial 10, abstract 8, check 10. The
builder needs more time than a figure, so two minutes moved from concrete.

**Objectives** (approved 2026-09-23): 4.1 understand, describe proposed vs
attested and why an attestation expires; 4.2 evaluate, determine who must
sign off and on what basis; 4.3 create, write an attestation (name, basis,
date) for an output they verified.

**The finding the lesson rests on.** `resolveStatus()` in attestation-ledger
checks only that the source isn't a model, that there is a name and a date,
and that the date is within 730 days. It never reads the basis, and it can't
tell a person's name from a tool's name typed into `by`. Software checks the
form of a sign-off; only a person can check its substance.

**Concrete, exercise `sign-offs`:** an AI-assisted document per track with
five fictional sign-offs, one of each key: *sound*, *not-a-person*,
*no-basis*, *wrong-signer*, *lapsed*. Each reveal shows what the real ledger
engine displays beside the answer: four of five show Attested. Order is
shuffled per track.

**Pictorial, figure `sign-off`:** a form (who is signing, name, role, basis,
date) that opens on the track's lapsed sign-off. A live badge from the real
`resolveStatus`, a status line read out through `aria-live`, and a timeline
(checked, today, lapses) drawn as SVG and as `table.grid-alt`. A note appears
when the ledger accepts an empty basis. Nothing is stored or sent.

**Abstract:** `attest-not-propose`, `attestation-lapses`, `signer-must-know`,
`form-not-substance`, and Lesson 3's `check-fits-stakes`.

**Decisions at approval:**
1. Example sign-offs are attestation-shaped but fictional, live in the lesson
   file only (never `claims.js`), and the page says they're fictional.
2. Sign-off dates are stored as `daysAgo`, so a *sound* key can't drift into
   *lapsed* as real time passes.
3. Five sign-offs per track, so *wrong signer* can carry objective 4.2.
4. Concrete 12 minutes, pictorial 10.
