# Claims review, 2026-09-24

A model's review of all 50 course claims, to help with attestation. **Nothing
here is an attestation.** Every claim is still Proposed until David signs it
(see `docs/attestation-guide.md`).

**Method.** Each claim's text was read against its named sources and against the
lesson content it supports. Facts the reviewer was less sure of were checked on
the web. Planted names (made-up studies, firms, people and products) were
searched, to make sure none belongs to a real organisation or person.

**Verdicts**
- **Sound:** accurate as worded, and useful to learners.
- **Revised:** a problem was found and fixed on 2026-09-24. Each claim's
  rationale says what changed.
- **Your judgement:** rests on practice or a teaching choice more than a
  citable fact, so David's own view is the real basis.

## Fixes made in this review

| What | Where | Why |
|---|---|---|
| "Meridian Compliance Group" → "Tallowmere Compliance Group" | Lesson 3, professionals | Several real firms trade as "Meridian Compliance". The lesson says the report doesn't exist. |
| "Lakeside University" → "Brambleford University" | Lesson 3, students | Real institutions are named Lakeside University College (Ghana, Zambia, Benin). |
| "DraftBot", "Homework Helper AI" → "AI writing tool (verified)", "Study chatbot (self-check)" | Lesson 4 | Product-like names that may belong to real tools. The lesson's point still holds: a tool's name typed where a person's should be. |
| "Dr. Priya Nandakumar" → "Dr. Mara Linwood" | Lesson 5, educators | Too close to Priyamvada (Priya) Natarajan, a prominent Yale astronomer. |
| "Nimbus Host" removed; now "our cloud vendor" | Lesson 5, professionals | Nimbus Hosting is a real UK hosting company. |
| "Bring two sharpened pencils, because the SAT is taken on paper" → "The SAT is a paper test, filled in with answer bubbles" | Lesson 5, students | The College Board still asks students to bring a pencil or pen for scratch work, so the old sentence was only half outdated. |
| AAA "can't be required for a whole site" → "isn't recommended as a rule for a whole site" | Lesson 7, docs | The W3C says requiring AAA site-wide is *not recommended*, because some content can't meet it. |
| `design-principles`: "seven" → "eight" | claims.js | Lesson 7 teaches wellbeing as an eighth principle, so the claim contradicted the course. |
| `signer-must-know` reworded | claims.js | It read as if a senior person could never be the right signer. |

Checked and fine: "Journal of Feedback Studies", "Journal of Classroom
Practice" and "Journal of Applied Learning Research" don't exist, so they are
safe as made-up examples.

## All 50 claims

### Lesson 1: What a model actually does

| Claim | Verdict | Check against |
|---|---|---|
| `model-predicts` | Sound | Any standard account of autoregressive generation |
| `retrieval-still-generated` | Sound | Documentation for retrieval-augmented assistants |
| `fluency-not-evidence` | Sound | Worded as "not a reliable signal", not "no signal" |
| `risk-zones` | Sound | Commonly reported error types |
| `l1-key-educators` | Sound | Dunlosky et al. (2013), *PSPI* 14(1), practice testing rated high utility; Ebbinghaus (1885) |
| `l1-key-professionals` | Sound | GDPR Art. 3(2)(a); Art. 83(5), "whichever is higher" |
| `l1-key-students` | Sound | NASA: landing 20 July 1969; about 21.5 hours on the surface |

### Lesson 2: Asking well

| Claim | Verdict | Check against |
|---|---|---|
| `prompt-parts` | Sound | Model providers' prompting guides; hedged with "usually" |
| `gaps-get-filled` | Sound | Follows from `model-predicts` |
| `example-steers-form` | Sound | Few-shot prompting documentation; hedged with "often" |
| `structure-not-truth` | Sound | Follows from Lessons 1 and 2 |
| `l2-key-*` (3) | Sound | Each request read beside its output |

### Lesson 3: Checking what it says

| Claim | Verdict | Check against |
|---|---|---|
| `independent-source` | Sound | Source-evaluation practice |
| `citations-unreliable` | Sound | *Mata v. Avianca* (S.D.N.Y., sanctions June 2023) |
| `check-fits-stakes` | Sound | Proportionate verification practice |
| `l3-key-educators` | Sound, check the summary | Black and Wiliam (1998), *Phi Delta Kappan* 80(2); Bloom (1984), *Educational Researcher* 13(6), about 2 SD for one-to-one tutoring |
| `l3-key-professionals` | Revised | FTC CAN-SPAM guide: opt-outs within 10 business days; a valid physical postal address |
| `l3-key-students` | Revised | Paruthi et al. (2016), *J Clin Sleep Med* 12(6), 8–10 hours for ages 13–18; AAP (2014), *Pediatrics* 134(3), start at 8:30 a.m. or later |

### Lesson 4: Who signs off

| Claim | Verdict | Check against |
|---|---|---|
| `attest-not-propose` | Sound | The course's rule, stated as a definition |
| `attestation-lapses` | Sound | Says the two-year window is the course's choice |
| `signer-must-know` | Revised | Accountability practice |
| `form-not-substance` | Sound | attestation-ledger 0.1.1 `resolveStatus()` never reads `basis` or `role` |
| `l4-key-educators` | Sound | The sign-offs as shown |
| `l4-key-professionals` | Revised; your judgement | Assumes legal and data protection own retention periods, not sales |
| `l4-key-students` | Revised | The sign-offs as shown; the plastic figure isn't what's keyed |

### Lesson 5: How it goes wrong

| Claim | Verdict | Check against |
|---|---|---|
| `error-kinds` | Sound | A teaching frame, and says so |
| `outdated-cutoff` | Sound | Model documentation on training cutoffs |
| `bias-inherited` | Sound | Published bias studies; hedged with "can" |
| `misread-instruction` | Sound | Instruction-following evaluations |
| `checklist-specific` | Sound; your judgement | Checklist practice in aviation and medicine; "works best" is a practice claim |
| `l5-key-educators` | Revised | IAU Resolution B5 (24 Aug 2006), Pluto |
| `l5-key-professionals` | Revised | CJEU C-311/18 *Schrems II* (16 July 2020); EU–US Data Privacy Framework adequacy decision (10 July 2023); GDPR Art. 46(2)(c) |
| `l5-key-students` | Revised | College Board: digital SAT in the US since spring 2024 |

### Lesson 6: UX/UI, judging what AI builds

| Claim | Verdict | Check against |
|---|---|---|
| `usability-goals` | Sound | Nielsen (1993), *Usability Engineering*, ch. 2 |
| `design-principles` | Revised (anchored) | One source per principle: Norman and Draper (1986); Shneiderman; Nielsen (1993, 1994); Wertheimer (1923); Norman (1988/2013); Principles of Universal Design (1997); WCAG 2.2; Friedman (1996) |
| `context-principle` | Sound | Nielsen: visibility of system status |
| `user-control-principle` | Sound | Nielsen: user control and freedom |
| `ai-ui-polish` | Your judgement | Rests on practice; hedged with "can" |
| `l6-key-*` (3) | Sound; your judgement on placings | Each screen used beside its key; harm and reach are judgements |

### Lesson 7: Accessible and mindful UX

| Claim | Verdict | Check against |
|---|---|---|
| `wcag-structure` | Sound (lesson wording revised) | W3C WCAG 2.2: Recommendation 5 Oct 2023, current edition 12 Dec 2024; conformance note on AAA |
| `contrast-thresholds` | Sound | WCAG 1.4.3, 1.4.6, 1.4.11; large text is 18 pt, or 14 pt bold |
| `mindful-ux` | Sound | Brignull (2010); FTC, *Bringing Dark Patterns to Light* (Sept 2022); DSA Art. 25 |
| `wellbeing-habits` | Sound | Wood and Rünger (2016), *Annual Review of Psychology* 67; hedged with "can support" |
| `l7-key-educators` | Sound | WCAG 2.2: 1.4.3 (AA), 4.1.2 (A), 2.2.1 (A) |
| `l7-key-professionals` | Sound | WCAG 2.2: 1.4.1 (A), 2.5.8 (AA; note the spacing exception), 3.3.3 (AA) |
| `l7-key-students` | Sound | WCAG 2.2: 2.2.2 (A), 1.4.10 (AA), 3.3.2 (A) |

## Suggested order for attesting

1. **Definitions and your own rules first:** quick, and you're the authority.
   `attest-not-propose`, `attestation-lapses`, `signer-must-know`,
   `design-principles`, `error-kinds`.
2. **Standards with numbers:** `wcag-structure`, `contrast-thresholds`, and the
   `l7-key-*` keys.
3. **Research-based:** `usability-goals` (you've said yes), `l1-key-educators`,
   `l3-key-educators`, `wellbeing-habits`.
4. **Law and policy (consider `ttlDays: 365`):** `l1-key-professionals`,
   `l3-key-professionals`, `l5-key-professionals`, `l5-key-students`.
5. **Your judgement last:** `ai-ui-polish`, `checklist-specific`, and the
   judgement-based keys.
