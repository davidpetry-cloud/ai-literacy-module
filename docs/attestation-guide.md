# Attestation guide

How claims in this course move from **Proposed** to **Attested**, **Rejected**
or **Lapsed**, and how to record that in `claims.js`. It follows the practice of
organisations that sign off facts for a living: clinical guideline panels,
engineering firms and newsroom fact-check desks.

## The rule

**A model proposes. Only a named person attests.** A Claude session may add or
reword `source: "model"` proposals. It never writes a `source: "practitioner"`
block, fills in `by`, or sets `verified`, even when asked. The attesting person
writes those after checking the claim themselves. The governance tests and the
`/ship` check both enforce this.

Status is never stored. The page works it out from the attestation block
(`resolveStatus()` in attestation-ledger), so a sign-off lapses on its own when
its review date passes.

## Five practices, and where each goes

| Practice | What it means | Field |
|---|---|---|
| A named, accountable signer | One person signs, in a stated capacity. Anonymous sign-off is not sign-off. | `by`, `role` |
| A checkable basis | The exact source, where in it, and what you did. Another person could repeat the check. | `basis` |
| A date and a review cycle | Every sign-off has a date. Faster-changing facts get shorter cycles. | `verified`, `ttlDays` (default 730) |
| Reject with a reason, never delete | A claim that fails stays in the file, marked rejected, with who and why. | `rejection` |
| An audit trail | Each change is traceable: who, when, and what it replaced. | `supersedes`, and git history |

High-stakes claims can also have a **second reviewer** (the "four-eyes" rule).
The ledger records one signer, so name the second check in `basis`.

## Writing a good basis

A strong basis has three parts:

1. **The source**, cited in full.
2. **Where in it**: a chapter, section, article, paragraph or criterion number.
3. **What you did**: "checked against", "cross-checked with", "measured with".

| Weak | Strong |
|---|---|
| "Looks right." | "Checked against WCAG 2.2 (W3C, Oct 2023), 1.4.3 and 1.4.11." |
| "Nielsen." | "Nielsen (1993), *Usability Engineering*, ch. 2, 'What Is Usability?'" |
| "The AI said so." | Never a basis. That's a proposal, not a check. |

## Choosing a review cycle

| The claim rests on… | Suggested `ttlDays` |
|---|---|
| Law, regulation or policy that changes (data transfers, school rules, test formats) | 365 |
| Standards with a version number (WCAG, ISO) | 730 (the default) |
| Well-established research or definitions | 730 to 1095 |
| An answer key for a made-up passage, judged from the page itself | 730 |

## Example 1: attesting a claim

Replace the whole `attestation: proposedBy( … )` with a practitioner block.
**Don't change `text`.** If the wording is wrong, reject it instead (Example 3).

```js
  "usability-goals": {
    text: "Jakob Nielsen (1993) defines usability by five attributes: …",   // unchanged
    attestation: {
      source: "practitioner",
      by: "David Petry",
      role: "Course author and UX lead",
      basis: "Checked against Nielsen, J. (1993), Usability Engineering, Academic Press, ch. 2 'What Is Usability?': five attributes, with errors defined as few, easy to recover from and none catastrophic. Cross-checked with Nielsen Norman Group, 'Usability 101'.",
      verified: "2026-09-24",
      ttlDays: 730,
      supersedes: { source: "model", model: "claude-opus-5-5" }
    }
  },
```

`supersedes` records the model proposal this sign-off replaced, the same shape
the ledger's own `attest()` writes. The proposal's full text stays in git history.

## Example 2: a shorter review cycle

For a claim resting on rules that change, shorten the cycle so the page flags it
for a re-check sooner:

```js
    attestation: {
      source: "practitioner",
      by: "David Petry",
      role: "Course author",
      basis: "CJEU C-311/18 (Schrems II, 16 July 2020) invalidates Privacy Shield; European Commission adequacy decision for the EU–US Data Privacy Framework (10 July 2023); GDPR Art. 46(2)(c) confirmed as standard contractual clauses.",
      verified: "2026-09-24",
      ttlDays: 365,
      supersedes: { source: "model", model: "claude-sonnet-5" }
    }
```

## Example 3: rejecting a claim

Keep the proposal and add a `rejection`. The page shows the claim struck through,
marked **Rejected**, with your reason. A rejection doesn't lapse.

```js
    attestation: {
      ...proposedBy("…the original rationale, unchanged…"),
      rejection: {
        by: "David Petry",
        role: "Course author",
        reason: "The source card overstates Bloom (1984). The paper compares one-to-one tutoring with group instruction; the key needs rewording.",
        reviewed: "2026-09-24"
      }
    }
```

Then ask for a replacement wording as a new model proposal, and attest that one
when it's right.

## Example 4: re-checking a lapsed claim

When a claim shows **Lapsed**, check it again and write a fresh block. Record
the sign-off it replaces, so the file reads like a review log:

```js
    attestation: {
      source: "practitioner",
      by: "David Petry",
      role: "Course author",
      basis: "Re-checked against WCAG 2.2 (W3C Recommendation), 1.4.3, 1.4.6 and 1.4.11: thresholds unchanged.",
      verified: "2028-09-20",
      ttlDays: 730,
      supersedes: { source: "practitioner", by: "David Petry", verified: "2026-09-24" }
    }
```

## Example 5: a second reviewer

For an answer key, a colleague can read it against its source first. Name them
in the basis; you remain the signer.

```js
      basis: "Key read against IAU Resolution B5 (2006), Pluto's reclassification. Reviewed with J. Smith (Grade 5 teacher) on 2026-09-23; no changes.",
```

## The routine

1. **Work one lesson at a time.** Open the sources listed in each claim's
   rationale, and check each claim.
2. **Edit the attestation blocks** as in the examples above.
3. **Run `npm test`.** The governance suite checks that every practitioner block
   names who signed, on what basis, and on a readable date.
4. **Run `/ship`.** It checks the practitioner blocks came from you, then
   commits and publishes.
5. **Use the commit message as the audit log.** For example:
   `attest: usability-goals, context-principle (Nielsen 1993; NN/g heuristics)`.

## What the page shows

| Status | Badge | When |
|---|---|---|
| Proposed | Diamond, "Proposed" | A model's proposal, not yet checked |
| Attested | Tick, "Attested" | Signed by a named person, within its review cycle |
| Lapsed | Circle with a mark, "Lapsed" | Signed, but past `verified` + `ttlDays` |
| Rejected | Cross, "Rejected" | Turned down, with a reason; the text is struck through |

Each card's "Who says so" shows the signer, role, basis and date, or for a
proposal, the model and its reasoning.
