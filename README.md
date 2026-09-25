# Human-Centered AI Literacy

Using AI well, and protecting the people it touches.

Twelve lessons on working with AI the way a careful professional works with any
source: knowing what it is, asking it well, checking what it says, deciding who
signs off, judging the screens it builds, keeping people at the center, and
recognizing manipulation, from people and from AI. Lessons 9–12 are the Dark Triad
series. There are three audience tracks: educators,
professionals and students.

Designed by David Petry.

## The idea

A course on checking AI output should show which of its own claims are checked.

Every factual claim this course makes about AI is a record in
[`attestation-ledger`](https://www.npmjs.com/package/attestation-ledger), the
same engine behind the [Live Sound EQ SOP](https://github.com/davidpetry-cloud/live-sound-eq-sop).
A claim written by a model shows as **Proposed** until a named person attests
it. An attestation states who signed, on what basis, and when. Attestations
**lapse** after two years unless someone re-checks them. This matters here more
than most places, because claims about how AI tools behave go out of date fast.
A stale claim shows as Lapsed on the page instead of quietly going wrong.

> A model can propose. Only a named human can attest.

Lesson 4 teaches that rule. The rest of the course follows it.

## One core, three tracks

The objectives, assessments, diagrams and principles are the same for everyone.
What changes by track is the hands-on example, why it matters, and what to
practise afterwards. Educators mark up an AI-drafted staff newsletter,
professionals an AI-drafted email to a manager, and students an AI-written
essay paragraph. Each passage contains the same kinds of error.

## How it's built

| Framework | Its job here |
|---|---|
| Backward design (Wiggins & McTighe) | Objectives first, then the evidence each was met, then the activities |
| Revised Bloom's taxonomy | Every objective names a level and an observable verb |
| Concrete → Pictorial → Abstract | A real output in the learner's hands, then a picture, then the principle |
| ARCS motivation (Keller) | Why this matters, said differently for each track |
| Kirkpatrick evaluation | Exit ticket, pre/post checks per objective, a transfer task with two-week follow-up |

The test suite enforces all of it. A lesson can't be marked ready until every
objective has a matched pre-check, an activity, and a post-check, and the stage
timings add up to 45 minutes.

## Lessons

| # | Lesson | Status |
|---|---|---|
| 1 | What a model actually does | Built |
| 2 | Asking well: prompt structure | Built |
| 3 | Checking what it says | Objectives drafted |
| 4 | Who signs off: human in the loop | Objectives drafted |
| 5 | How it goes wrong, and a checklist that holds | Objectives drafted |

## Running it

```bash
npm install
npm run preview     # http://localhost:8080
npm test
```

No build step. The pages are plain HTML and ES modules. They need to be served
over http rather than opened from disk, and they need a network connection to
load the ledger from jsDelivr.

## Attesting a claim

Claims live in [`claims.js`](claims.js). After checking one, replace its
attestation block with your own:

```js
attestation: {
  source: "practitioner",
  by: "Your Name",
  role: "Your role",
  basis: "What you checked it against",
  verified: "2026-09-23"
}
```

The model's original proposal stays in git history. If the wording is wrong,
don't edit it while attesting. Reject it with a reason and propose a
replacement.

## Related

- **[Grade 6 Singapore Math (CPA)](https://github.com/davidpetry-cloud/grade6-singapore-math-cpa)**:
  the curriculum this one's method and styling come from.
- **[attestation-ledger](https://www.npmjs.com/package/attestation-ledger)**:
  the claims engine.
- **[Live Sound EQ SOP](https://github.com/davidpetry-cloud/live-sound-eq-sop)**:
  the same rule applied to console EQ values.

## License

- **Code** (renderer, styles, pages, tests, scripts): MIT — see
  [LICENSE](LICENSE).
- **Course content** (lessons, claims, course text, lesson designs):
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — see
  [LICENSE-CONTENT.md](LICENSE-CONTENT.md) for exactly what's covered and how
  to credit it.
- **Fonts** (Lexend, Fraunces): SIL Open Font License — see `fonts/OFL-*.txt`.
