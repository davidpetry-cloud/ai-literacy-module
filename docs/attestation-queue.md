# Attestation queue

A checklist of every claim in `claims.js` that is still a model proposal, for
David to attest a few at a time. Made on 2026-10-13 from the claims file on
`main`. It is a reading list, not a record: nothing here attests anything, and
it contains no practitioner block to paste. How to attest, reject or re-check is
in [the attestation guide](attestation-guide.md).

## Where things stand

- **121 claims** in total.
- **6 attested:** `model-predicts`, `retrieval-still-generated`, `fluency-not-evidence`, `risk-zones`, `l1-key-educators`, `usability-goals`.
- **115 waiting:** 72 fact claims and 43 answer keys.
- **0 rejected.**

| Lesson | Waiting | Fact claims | Answer keys |
|---|---|---|---|
| Lesson 1 | 2 | 0 | 2 |
| Lesson 2 | 7 | 4 | 3 |
| Lesson 3 | 6 | 3 | 3 |
| Lesson 4 | 7 | 4 | 3 |
| Lesson 5 | 8 | 5 | 3 |
| Lesson 6 | 7 | 4 | 3 |
| Lesson 7 | 7 | 4 | 3 |
| Lesson 8 | 10 | 7 | 3 |
| Lesson 9 | 10 | 7 | 3 |
| Lesson 10 | 12 | 9 | 3 |
| Lesson 11 | 6 | 3 | 3 |
| Lesson 12 | 8 | 5 | 3 |
| Essentials 1 | 14 | 10 | 4 |
| Essentials 2 | 11 | 7 | 4 |

## Suggested order

1. **The 13 flagged claims first.** Their source has moved, been
   archived, changed since the claim was written, or was only seen in search
   results. Each carries a ⚑ note below.
   - `ai-index-adoption` (Lesson 8)
   - `trait-not-diagnosis` (Lesson 9)
   - `ai-companion-farewells` (Lesson 11)
   - `child-helplines` (Lesson 12)
   - `ai-disclosure-laws` (Essentials 1)
   - `passkeys-phishing-resistant` (Essentials 1)
   - `updates-ncsc-cisa` (Essentials 2)
   - `fake-updates-cisa` (Essentials 2)
   - `fake-ai-extensions-example` (Essentials 2)
   - `identitytheft-gov` (Essentials 2)
   - `e2-key-educators` (Essentials 2)
   - `e2-key-professionals` (Essentials 2)
   - `e2-key-students` (Essentials 2)
2. **Then lesson by lesson, from Lesson 1.** Learners meet the early lessons
   most, so their claims show on the most pages. Within each lesson, fact claims
   come first, then answer keys.
3. **Shared claims are listed once,** under the first lesson that cites them,
   with the others named. `fbi-teens-online` appears in three places, and
   `check-fits-stakes` and `gut-feeling-evidence` in two each.

Two kinds of item:

- **Fact claim:** check it against the source. Where the rationale names no
  source, the item says so; attest on your own judgement and name it in the
  basis, or ask for a source first.
- **Answer key:** a judgement about a made-up passage, screen or situation.
  Check that it's reasonable from the page. Where a key quotes a real fact, the
  item names the source for that fact too.

## About the links

Links come from each claim's rationale, matched to the full reference in
`sources.js` (journal DOIs there were checked against Crossref on 2026-10-05).
"No link on file" means the work is a book, standard or paper with no URL in the
repo. † marks a link built from an identifier in the rationale (an arXiv number
or a statute) that isn't in `sources.js`.

**No link was opened for this list.** The session that wrote it couldn't reach
any outside site: its network policy blocked them all. Instead, the flagged
claims were re-checked by web search on 2026-10-13, and what that found is in
their notes. Treat every other link as unchecked until you open it. **Update 2026-10-13:** the main session opened the Essentials 2 sources that had only been searched (marked ✓ below); they match.

## Lesson 1 · What a Model Actually Does

Already attested: `l1-key-educators`, `model-predicts`, `retrieval-still-generated`, `fluency-not-evidence`, `risk-zones`.

### Answer keys

- [ ] **`l1-key-professionals`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 1 professionals passage is correct: each sentence's label matches its cited source, and the no-source sentence has no real survey behind it.

  - **Open:** [GDPR, Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
  - **Check** that GDPR Articles 3(2)(a) and 83(5) say what the passage's sourced sentences say. Then read the rest of the key against the passage, and confirm the survey sentence has nothing real behind it.

- [ ] **`l1-key-students`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 1 students passage is correct: each sentence's label matches its cited source, and the quoted engineer is invented.

  - **Open:** [NASA, Apollo 11](https://www.nasa.gov/mission/apollo-11/)
  - **Check** the landing date and the time on the surface against NASA's Apollo 11 page. Confirm the quoted engineer is invented and the other labels match the passage.

## Lesson 2 · Asking Well: Prompt Structure

### Fact claims

- [ ] **`prompt-parts`** · Fact claim: check it against the source

  > A clear request to an AI tool usually states four things: the task, the context, the constraints, and the format you want back.

  - **Open:** None named: the rationale points to model providers' prompting guides in general.
  - **Check:** Open one or two providers' published prompting guides and see that task, context, constraints and format are all covered. 'Usually' keeps it from being a rule; if you attest, name the guide you used in the basis.

- [ ] **`gaps-get-filled`** · Fact claim: check it against the source

  > When a request leaves out details the output needs, a model often fills the gaps with plausible invented specifics, such as times, dates or how a project is going.

  - **Open:** None named: it follows from `model-predicts`, which you attested.
  - **Check** the reasoning holds, then read the three vague outputs in Lesson 2 and see that each one fills a gap with an invented detail.

- [ ] **`example-steers-form`** · Fact claim: check it against the source

  > Showing an example of the output you want is an effective way to steer its format and tone, often more effective than describing them.

  - **Open:** None named: the rationale cites few-shot prompting as widely documented.
  - **Check:** Judge 'often more effective than describing them' against your own practice or a provider guide. If you use a source, name it in the basis.

- [ ] **`structure-not-truth`** · Fact claim: check it against the source

  > A better-structured request makes an output more likely to fit what you need. It doesn't make the output reliable: any fact you didn't supply still needs checking.

  - **Open:** None named: it links Lesson 2 back to Lesson 1.
  - **Check** it doesn't overclaim either way: structure helps fit, not truth. It rests on `model-predicts`.

### Answer keys

- [ ] **`l2-key-educators`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 2 educators prompt pair is correct: each part of the vague request is labelled as the request shows it, each line of the structured output is traced to the parts that caused it, and each line marked invented has no basis in the request.

  - **Open:** nothing outside the lesson; the key is judged from the page.
  - **Check:** Read the vague request beside its output, then the structured one. Each label should show in the text, and each line marked invented should have nothing in the request behind it.

- [ ] **`l2-key-professionals`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 2 professionals prompt pair is correct: each part of the vague request is labelled as the request shows it, each line of the structured output is traced to the parts that caused it, and each line marked invented has no basis in the request.

  - **Open:** nothing outside the lesson; the key is judged from the page.
  - **Check:** Same check as the educators pair: request beside output, line by line.

- [ ] **`l2-key-students`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 2 students prompt pair is correct: each part of the vague request is labelled as the request shows it, each line of the structured output is traced to the parts that caused it, and each line marked invented has no basis in the request.

  - **Open:** nothing outside the lesson; the key is judged from the page.
  - **Check:** Same check as the educators pair: request beside output, line by line.

## Lesson 3 · Checking What It Says

### Fact claims

- [ ] **`independent-source`** · Fact claim: check it against the source

  > Checking a claim means comparing it with a source that doesn't depend on the AI's answer: the original study, law, dataset or organisation. Another chatbot, or a page that repeats the claim, isn't independent.

  - **Open:** None named in the rationale.
  - **Check:** A definition from source-evaluation practice. Check that the examples (another chatbot, a page that repeats the claim) are right to count as not independent.

- [ ] **`citations-unreliable`** · Fact claim: check it against the source

  > AI tools can produce citations that look real but point to nothing. A citation that does exist can also fail to say what it's cited for.

  - **Open:** Mata v. Avianca, 678 F. Supp. 3d 443 (S.D.N.Y. 2023) (no link on file)
  - **Check** the case: lawyers sanctioned in 2023 for filing cases a chatbot invented. The second sentence (a real citation that doesn't say what it's cited for) is the case Lesson 3 teaches.

- [ ] **`check-fits-stakes`** · Fact claim: check it against the source

  > How much checking an output needs depends on what happens if it's wrong and how hard that is to undo, not on how the output sounds.

  - **Open:** None named: proportionate checking as standard risk practice.
  - **Check** that it rules out both 'check everything' and 'trust what sounds fluent'. Your own judgement is the basis here.
  - **Also cited in:** Lesson 4.

### Answer keys

- [ ] **`l3-key-educators`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 3 educators passage is correct: each sentence's label matches its cited source, the no-source sentence has no real review behind it, and each use is given a fitting level of checking.

  - **Open:** Black & Wiliam (1998), Phi Delta Kappan 80(2) (no link on file) · [Bloom (1984)](https://doi.org/10.3102/0013189X013006004)
  - **Check** the two sourced sentences against Black & Wiliam (1998) and Bloom (1984). The checking level for each use is a judgement about consequences: is it reasonable?

- [ ] **`l3-key-professionals`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 3 professionals passage is correct: each sentence's label matches its cited source, the no-source sentence has no real report behind it, and each use is given a fitting level of checking.

  - **Open:** [FTC, CAN-SPAM Act compliance guide](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business)
  - **Check** the FTC guide says 10 business days for opt-outs and a valid physical postal address. The checking levels are a judgement.

- [ ] **`l3-key-students`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 3 students passage is correct: each sentence's label matches its cited source, the no-source sentence has no real study behind it, and each use is given a fitting level of checking.

  - **Open:** [Paruthi et al. (2016)](https://doi.org/10.5664/jcsm.5866) · [AAP school start times statement (2014)](https://doi.org/10.1542/peds.2014-1697)
  - **Check** 8 to 10 hours for ages 13 to 18 (Paruthi) and 8:30 a.m. or later (AAP, 2014). The checking levels are a judgement.

## Lesson 4 · Who Signs Off: Human in the Loop

Also cites, listed earlier: `check-fits-stakes` (Lesson 3).

### Fact claims

- [ ] **`attest-not-propose`** · Fact claim: check it against the source

  > A model can propose a value but can't attest it. Attesting means a named person takes responsibility for having checked it, on a stated basis, on a date.

  - **Open:** [docs/attestation-guide.md](attestation-guide.md)
  - **Check:** This is the course's own rule, stated as a definition. Check the wording matches how you attest in the guide.

- [ ] **`attestation-lapses`** · Fact claim: check it against the source

  > A sign-off records a check at one point in time. Sources and rules change, so a sign-off should be treated as lapsed after a set period unless someone checks it again. The two-year window used here is this course's choice, not a standard.

  - **Open:** [docs/attestation-guide.md](attestation-guide.md)
  - **Check** the last sentence keeps the two-year window as the course's choice (the ledger's 730-day default), not a standard.

- [ ] **`signer-must-know`** · Fact claim: check it against the source

  > The right person to sign off is someone who did the check and answers for the result. Being the most senior person, or the one who asked for the output, isn't enough on its own.

  - **Open:** None named in the rationale.
  - **Check** the wording allows a senior person who did the check, and rules out signing only because you're senior or asked for it.

- [ ] **`form-not-substance`** · Fact claim: check it against the source

  > Software can check that a sign-off has a name and a date and hasn't lapsed. Only a person can judge whether its basis is real and whether the signer could have made the check.

  - **Open:** [attestation-ledger 0.1.1, `resolveStatus()`](../vendor/attestation-ledger@0.1.1/src/index.js)
  - **Check** in the hosted engine that `resolveStatus()` reads source, by, verified and ttlDays, and never basis or role. Lesson 4's reveal shows it working.

### Answer keys

- [ ] **`l4-key-educators`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 4 educators sign-offs is correct: each sign-off's label matches what it shows, and exactly one of the five is sound.

  - **Open:** nothing outside the lesson; the key is judged from the page.
  - **Check:** The sign-offs are fictional. Check each label against the sign-off as shown, that exactly one is sound, and that the lapsed one is over two years old.

- [ ] **`l4-key-professionals`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 4 professionals sign-offs is correct: each sign-off's label matches what it shows, and exactly one of the five is sound.

  - **Open:** nothing outside the lesson; the key is judged from the page.
  - **Check:** Fictional. Check each label against the sign-off. The wrong-signer label assumes legal and data protection own retention periods: is that typical where you've worked?

- [ ] **`l4-key-students`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 4 students sign-offs is correct: each sign-off's label matches what it shows, and exactly one of the five is sound.

  - **Open:** nothing outside the lesson; the key is judged from the page.
  - **Check:** Fictional. Check each label against the sign-off. The plastic-bottle figure is unsourced on purpose; the key is about who signed, not whether the figure is true.

## Lesson 5 · How It Goes Wrong, and a Checklist That Holds

### Fact claims

- [ ] **`error-kinds`** · Fact claim: check it against the source

  > Most AI output errors fall into four kinds: fabrication (an invented detail), outdated information (once true, no longer), bias (an assumption that favours or leaves out a group), and a misread instruction (ignoring or skipping something the request said). The four are a teaching frame, not a full list.

  - **Open:** None named: a teaching frame drawn from common failure analyses.
  - **Check** that 'most' and 'a teaching frame, not a full list' keep it honest, and that each kind is defined clearly enough to sort with.

- [ ] **`outdated-cutoff`** · Fact claim: check it against the source

  > A model's knowledge stops at a training cutoff, so it can state something as current that has since changed, even when it was once correct.

  - **Open:** IAU Resolution B5 (2006) (no link on file) · CJEU Case C-311/18 (Schrems II, 2020) (no link on file) · Commission decision on the EU–US Data Privacy Framework, C(2023) 4745 (no link on file) · [College Board, SAT Suite](https://satsuite.collegeboard.org/)
  - **Check:** The general point rests on `model-predicts`. Check the three dated examples the keys use: Pluto (2006), Privacy Shield (2020 and 2023) and the digital SAT (2024).

- [ ] **`bias-inherited`** · Fact claim: check it against the source

  > Models can reproduce stereotypes and one-sided assumptions from their training data, in wording that reads as neutral.

  - **Open:** None named: 'widely documented in studies of language models'.
  - **Check** that 'can reproduce' isn't overclaiming. If you want a source in the basis, add one you've read.

- [ ] **`misread-instruction`** · Fact claim: check it against the source

  > A model can skip or contradict a constraint in a request while the rest of the output reads well, so compare the output with the request line by line.

  - **Open:** None named: instruction-following failures as a standard evaluation category.
  - **Check** that each misread sentence in Lesson 5 breaks one line of its request, so the line-by-line check works from the page.

- [ ] **`checklist-specific`** · Fact claim: check it against the source

  > A checklist works best when it is short and each check is a specific action aimed at one kind of error. A general check such as 'does it sound right' catches none of the four kinds.

  - **Open:** None named: checklist practice in aviation and medicine.
  - **Check** that 'works best' reads as practice, not a measured threshold. The five-check limit is the course's choice.

### Answer keys

- [ ] **`l5-key-educators`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 5 educators answer is correct: each sentence's label matches what it shows, the outdated sentence's source says what the note says, and exactly one sentence has no error.

  - **Open:** IAU Resolution B5 (2006) (no link on file)
  - **Check** Pluto's reclassification against IAU Resolution B5 (2006). The request and answer are made up, so check the other labels against the sentences, and that exactly one sentence has no error.

- [ ] **`l5-key-professionals`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 5 professionals answer is correct: each sentence's label matches what it shows, the outdated sentence's source says what the note says, and exactly one sentence has no error.

  - **Open:** CJEU Case C-311/18 (Schrems II, 2020) (no link on file) · Commission decision on the EU–US Data Privacy Framework, C(2023) 4745 (no link on file) · [GDPR, Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj)
  - **Check** Privacy Shield's end (C-311/18, 2020) and the Data Privacy Framework (2023), and that GDPR Article 46(2)(c) covers standard contractual clauses. The vendor and audit are made up.

- [ ] **`l5-key-students`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 5 students answer is correct: each sentence's label matches what it shows, the outdated sentence's source says what the note says, and exactly one sentence has no error.

  - **Open:** [College Board, SAT Suite](https://satsuite.collegeboard.org/)
  - **Check** that US students have taken the digital SAT since spring 2024. The workshop and its score gains are made up; check the other labels against the sentences.

## Lesson 6 · UX/UI: Judging What AI Builds

Already attested: `usability-goals`.

### Fact claims

- [ ] **`design-principles`** · Fact claim: check it against the source

  > Each of the course's eight design principles rests on established theory. User-centricity: user-centred design (Norman and Draper, 1986). Consistency: Shneiderman's golden rules and Nielsen's heuristics. Hierarchy: the Gestalt principles of perception. Context: feedback and visibility of system status (Norman; Nielsen). User control: easy reversal and user control (Shneiderman; Nielsen). Accessibility: universal design and WCAG. Usability: Nielsen (1993). Wellbeing: value sensitive design (Friedman, 1996). Grouping them as these eight is the course's own teaching choice.

  - **Open:** Norman & Draper (1986), User Centered System Design (no link on file) · ISO 9241-210:2019 (no link on file) · Shneiderman (1987), Designing the User Interface (no link on file) · [Nielsen (1994), 10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) · [Wertheimer (1923)](https://doi.org/10.1007/BF00410640) · Norman (2013), The Design of Everyday Things (no link on file) · Center for Universal Design (1997), Principles of Universal Design (no link on file) · [WCAG 2.2](https://www.w3.org/TR/WCAG22/) · Nielsen (1993), Usability Engineering (no link on file) · ISO 9241-11:2018 (no link on file) · [Friedman (1996), Value-sensitive design](https://doi.org/10.1145/242485.242493)
  - **Check** that each of the eight principles has the anchor the text names. The grouping into eight is the course's own, and the text says so.

- [ ] **`context-principle`** · Fact claim: check it against the source

  > A screen should always show people where they are and what just happened, for example with a message that confirms an action worked.

  - **Open:** [Nielsen (1994), 10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)
  - **Check** it against Nielsen's first heuristic, 'visibility of system status'.

- [ ] **`user-control-principle`** · Fact claim: check it against the source

  > People should be able to go back, undo and cancel, so that one mistake doesn't cost them their work.

  - **Open:** [Nielsen (1994), 10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)
  - **Check** it against Nielsen's heuristic 'user control and freedom'.

- [ ] **`ai-ui-polish`** · Fact claim: check it against the source

  > A screen built by an AI tool can look finished while missing things people need, such as confirmation messages, clear labels, undo and accessible error messages, unless the request asks for them.

  - **Open:** None named: the rationale says it rests on practice and needs your own judgement.
  - **Check:** Judge 'can look finished while missing' from your own experience of AI-built screens. Name that experience in the basis.

### Answer keys

- [ ] **`l6-key-educators`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 6 educators screen is correct: each part's principle, goal and harm-and-reach placing matches what the screen does, and exactly one part has no problem.

  - **Open:** nothing outside the lesson; the key is judged from the page.
  - **Check:** The screen is made up: use it beside the key. The goal for each problem and its place on the grid are judgements; the reveal names a main goal and allows a second.

- [ ] **`l6-key-professionals`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 6 professionals screen is correct: each part's principle, goal and harm-and-reach placing matches what the screen does, and exactly one part has no problem.

  - **Open:** nothing outside the lesson; the key is judged from the page.
  - **Check:** Use the screen beside the key. The red-only required labels are placed as reaching 'few' users with high harm: is that placing reasonable?

- [ ] **`l6-key-students`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 6 students screen is correct: each part's principle, goal and harm-and-reach placing matches what the screen does, and exactly one part has no problem.

  - **Open:** nothing outside the lesson; the key is judged from the page.
  - **Check:** Use the screen beside the key. Twelve required fields is filed under usability rather than user-centricity: either is defensible; check the note explains it.

## Lesson 7 · Accessible and Mindful UX

### Fact claims

- [ ] **`wcag-structure`** · Fact claim: check it against the source

  > WCAG 2.2 organises accessibility under four principles: perceivable, operable, understandable and robust. Its testable success criteria sit at three levels: A (the minimum), AA (the usual target) and AAA (the highest).

  - **Open:** [WCAG 2.2](https://www.w3.org/TR/WCAG22/) · [WCAG 2.2, Conformance](https://www.w3.org/TR/WCAG22/#conformance)
  - **Check** the four principles and three levels, and that the Conformance section supports AA as the usual target and AAA as not a site-wide policy. The current edition is dated 12 December 2024.

- [ ] **`contrast-thresholds`** · Fact claim: check it against the source

  > WCAG sets contrast minimums: 4.5:1 for normal text and 3:1 for large text at level AA, 7:1 and 4.5:1 at AAA, and 3:1 for the parts of a screen you need to see to use it, such as input borders and icons.

  - **Open:** [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
  - **Check** 1.4.3, 1.4.6 and 1.4.11 for the ratios, and the large-text definition (18 point, or 14 point bold). Try a few pairs in another contrast checker.

- [ ] **`mindful-ux`** · Fact claim: check it against the source

  > Interfaces can steer people against their own interests through deceptive design, often called dark patterns. A design that respects time, attention and choice avoids them, and uses calmer defaults and natural pause points.

  - **Open:** [Brignull, deceptive.design](https://www.deceptive.design/) · [FTC (2022), Bringing Dark Patterns to Light](https://www.ftc.gov/reports/bringing-dark-patterns-light) · [Digital Services Act, Regulation (EU) 2022/2065 (Art. 25)](https://eur-lex.europa.eu/eli/reg/2022/2065/oj)
  - **Check** that Brignull coined 'dark patterns' (2010), the FTC report, and DSA Article 25. 'Calmer defaults' and 'natural pause points' are the course's terms.

- [ ] **`wellbeing-habits`** · Fact claim: check it against the source

  > Small, repeated cues and defaults shape habits, so calmer defaults and natural pause points can support healthier use of technology.

  - **Open:** [Wood & Rünger (2016)](https://doi.org/10.1146/annurev-psych-122414-033417)
  - **Check** that Wood & Rünger describe behaviour repeated in a stable context becoming cued by it. 'Can support' is the claim, not 'causes'.

### Answer keys

- [ ] **`l7-key-educators`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 7 educators screen is correct: each part's kind, WCAG criterion and level, or pattern and calmer fix matches what the screen does, and exactly one part has no problem.

  - **Open:** [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
  - **Check:** Use the made-up screen beside the key and WCAG 2.2: 1.4.3 (AA), 4.1.2 (A), 2.2.1 (A). The instructions' contrast was measured at 2.44:1.

- [ ] **`l7-key-professionals`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 7 professionals screen is correct: each part's kind, WCAG criterion and level, or pattern and calmer fix matches what the screen does, and exactly one part has no problem.

  - **Open:** [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
  - **Check** 1.4.1 (A), 2.5.8 (AA, 24 by 24 CSS pixels unless spacing exceptions apply) and 3.3.3 (AA). The red border was measured at 1.94:1 on white.

- [ ] **`l7-key-students`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 7 students screen is correct: each part's kind, WCAG criterion and level, or pattern and calmer fix matches what the screen does, and exactly one part has no problem.

  - **Open:** [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
  - **Check** 2.2.2 (A; the carousel runs past 5 seconds with no pause), 1.4.10 (AA) and 3.3.2 (A). The placeholder was measured at 2.16:1.

## Lesson 8 · Human-Centered AI

### Fact claims

- [ ] **`human-dignity-unesco`** · Fact claim: check it against the source

  > UNESCO's Recommendation on the Ethics of Artificial Intelligence, adopted by its 193 member states in November 2021, puts respect for human rights and human dignity at its core, with human oversight of AI systems.

  - **Open:** [UNESCO (2021), Recommendation on the Ethics of AI](https://www.unesco.org/en/artificial-intelligence/recommendation-ethics)
  - **Check** that the values section puts human rights and human dignity first, that human oversight and determination is a principle, and the adoption date (November 2021, 193 member states).

- [ ] **`children-digital-rights`** · Fact claim: check it against the source

  > The UN Committee on the Rights of the Child's General Comment No. 25 (2021) says children's rights apply in the digital environment, and sets out what states should do to respect, protect and fulfil them there.

  - **Open:** [CRC General Comment No. 25 (2021)](https://www.ohchr.org/en/documents/general-comments-and-recommendations/general-comment-no-25-2021-childrens-rights-relation)
  - **Check** that General Comment No. 25 says children's rights apply in the digital environment and sets out states' duties there.

- [ ] **`child-centred-ai`** · Fact claim: check it against the source

  > UNICEF's Policy Guidance on AI for Children (version 2.0, 2021) sets nine requirements for AI that affects children, including supporting their development and wellbeing, protecting their data and privacy, and keeping them safe.

  - **Open:** [UNICEF (2021), Policy guidance on AI for children 2.0](https://www.unicef.org/innocenti/reports/policy-guidance-ai-children)
  - **Check** there are nine requirements, and that development and wellbeing, data and privacy, and safety are numbers 1, 4 and 5.

- [ ] **`hcai-framework`** · Fact claim: check it against the source

  > Ben Shneiderman's Human-Centered AI framework treats human control and computer automation as two separate scales, and argues for designs with high levels of both, avoiding too much of either.

  - **Open:** [Shneiderman (2020), IJHCI 36(6)](https://doi.org/10.1080/10447318.2020.1741118) · [arXiv:2002.04087 †](https://arxiv.org/abs/2002.04087)
  - **Check** that human control and automation are two separate axes, with the aim of high levels of both. The lesson's three-by-three grid is a simplification.

- [ ] **`relationships-health`** · Fact claim: check it against the source

  > Across 148 studies of 308,849 people, those with stronger social relationships had about 50% higher odds of survival over the study periods, an effect comparable to well-known risk factors such as smoking.

  - **Open:** [Holt-Lunstad et al. (2010)](https://doi.org/10.1371/journal.pmed.1000316)
  - **Check** 148 studies, 308,849 people, and an odds ratio of 1.50 (about 50% higher odds of survival). The wording says 'had higher odds', not 'caused'.

- [ ] **`wisdom-model`** · Fact claim: check it against the source

  > Research on wisdom converges on a common model: balancing viewpoints, humility about what you know, adapting to context, and taking several perspectives, applied with a moral aim.

  - **Open:** [Grossmann et al. (2020)](https://doi.org/10.1080/1047840X.2020.1750917)
  - **Check** the 'common wisdom model' (perspectival metacognition with a moral aim) against the four parts the claim lists.

- [ ] **`ai-index-adoption`** · Fact claim: check it against the source

  > Stanford HAI's AI Index 2026 reports that about 4 in 5 university students use generative AI, and that globally 59% of people say AI products offer more benefits than drawbacks, while 52% say AI products make them nervous.

  - ⚑ **Do first.** Figures change every edition. A web search on 2026-10-13 found 59% and 52% in the public opinion chapter (2025 survey data), but not the 'about 4 in 5 university students' figure: find that one in the education chapter.
  - **Open:** [Stanford HAI, AI Index 2026](https://hai.stanford.edu/ai-index/2026-ai-index-report) · [AI Index 2026, Public opinion chapter (found by search)](https://hai.stanford.edu/ai-index/2026-ai-index-report/public-opinion)
  - **Check** all three figures in the 2026 report. The 59% and 52% are global shares of all respondents.
  - **Review cycle:** the rationale suggests `ttlDays: 365`.

### Answer keys

- [ ] **`l8-key-educators`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 8 educators product page is reasonable: each feature's verdict (keep, change or stop), what it touches most, and where it sits on the control grid follow from the lesson's questions.

  - **Open:** [UNICEF (2021), Policy guidance on AI for children 2.0](https://www.unicef.org/innocenti/reports/policy-guidance-ai-children)
  - **Check:** The product is made up. Check the verdicts are reasonable: marks sent home with no teacher check, chats kept forever (UNICEF requirement 4), and a 'buddy' that discourages asking the teacher.

- [ ] **`l8-key-professionals`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 8 professionals product page is reasonable: each feature's verdict (keep, change or stop), what it touches most, and where it sits on the control grid follow from the lesson's questions.

  - **Open:** [UNESCO (2021), Recommendation on the Ethics of AI](https://www.unesco.org/en/artificial-intelligence/recommendation-ethics) · [EU AI Act, Regulation (EU) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
  - **Check:** 'Stop' for scoring faces and voices rests on dignity and on people being unable to challenge the score; 'change' for auto-reject follows UNESCO's human oversight. The rationale suggests also checking the AI Act's ban on emotion recognition at work.

- [ ] **`l8-key-students`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 8 students product page is reasonable: each feature's verdict (keep, change or stop), what it touches most, and where it sits on the control grid follow from the lesson's questions.

  - **Open:** [UNICEF (2021), Policy guidance on AI for children 2.0](https://www.unicef.org/innocenti/reports/policy-guidance-ai-children) · [CRC General Comment No. 25 (2021)](https://www.ohchr.org/en/documents/general-comments-and-recommendations/general-comment-no-25-2021-childrens-rights-relation) · [ICO, Age appropriate design code](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/)
  - **Check** location and contacts against UNICEF requirements 4 and 5 and the ICO code (geolocation off by default for children). Check the key speaks to the student about their own choices.

## Lesson 9 · What the Dark Triad Is, and Isn't

### Fact claims

- [ ] **`dark-triad-construct`** · Fact claim: check it against the source

  > The Dark Triad is a research idea, introduced in 2002, for three overlapping traits: narcissism, Machiavellianism and psychopathy. They are studied as subclinical traits in ordinary people, not as illnesses.

  - **Open:** [Paulhus & Williams (2002)](https://doi.org/10.1016/S0092-6566(02)00505-6)
  - **Check** 2002, the three traits, and that Paulhus & Williams describe them as subclinical and overlapping but distinct.

- [ ] **`dark-triad-measure`** · Fact claim: check it against the source

  > Researchers usually measure the three traits with questionnaires, such as the 27-item Short Dark Triad, which gives each person a score on each trait rather than a yes-or-no answer.

  - **Open:** [Jones & Paulhus (2014), SD3](https://doi.org/10.1177/1073191113514105)
  - **Check** 27 items, three subscales of nine, and that scores are on scales rather than yes or no.

- [ ] **`dark-triad-tactics`** · Fact claim: check it against the source

  > At work, people higher in psychopathy and Machiavellianism are more likely to use hard tactics such as threats, and people higher in Machiavellianism and narcissism are more likely to use soft tactics such as compliments.

  - **Open:** [Jonason, Slomski & Partyka (2012)](https://doi.org/10.1016/j.paid.2011.11.008) · [Jonason & Webster (2012)](https://doi.org/10.1016/j.paid.2011.11.023)
  - **Check** which traits go with hard tactics (psychopathy, Machiavellianism) and which with soft ones (Machiavellianism, narcissism). These are group correlations.

- [ ] **`trait-not-diagnosis`** · Fact claim: check it against the source

  > Dark Triad scores are not diagnoses. Personality disorders, such as narcissistic or antisocial personality disorder, are diagnosed by trained clinicians using clinical criteria.

  - ⚑ **Do first.** The DSM-5-TR criteria were checked through secondary clinical sources, not the manual. Open the manual if you can.
  - **Open:** [Paulhus & Williams (2002)](https://doi.org/10.1016/S0092-6566(02)00505-6) · [APA, DSM-5-TR (2022)](https://doi.org/10.1176/appi.books.9780890425787)
  - **Check** that Dark Triad scores are not diagnoses, and that personality disorders are diagnosed by clinicians using clinical criteria.

- [ ] **`dark-triad-origins`** · Fact claim: check it against the source

  > A twin study found that genes and environment both shape the three traits, and that Machiavellianism is the most shaped by environment.

  - **Open:** [Vernon et al. (2008)](https://doi.org/10.1016/j.paid.2007.09.007)
  - **Check** 278 adult twins, genes and environment both playing a part, and Machiavellianism alone showing shared-environment effects.

- [ ] **`dark-triad-addiction`** · Fact claim: check it against the source

  > Research links the Dark Triad traits to addictive behavior, both with substances and with activities such as gambling. It is a link, not proof that one causes the other.

  - **Open:** [Jauk & Dieterich (2019)](https://doi.org/10.3389/fpsyt.2019.00662)
  - **Check** that the review covers substance and non-substance addictions, and that the claim stays at 'a link'.

- [ ] **`group-not-individual`** · Fact claim: check it against the source

  > A finding about a group's average can't tell you what one person in that group is like or does. Two groups can differ on average while most of their members overlap.

  - **Open:** [Robinson (1950)](https://doi.org/10.2307/2087176)
  - **Check:** A point of statistical reasoning, not a finding. Check it reads correctly; Robinson (1950) is the classic paper behind it.

### Answer keys

- [ ] **`l9-key-educators`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 9 educators article is correct: each sentence's label matches its cited source, and the survey figure has no real source behind it.

  - **Open:** [Paulhus & Williams (2002)](https://doi.org/10.1016/S0092-6566(02)00505-6) · [Jones & Paulhus (2014), SD3](https://doi.org/10.1177/1073191113514105)
  - **Check:** The article is made up. Check sentence 2 against Paulhus & Williams (2002) and sentence 3 against Jones & Paulhus (2014). The 2022 survey is planted.

- [ ] **`l9-key-professionals`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 9 professionals article is correct: each sentence's label matches its cited source, and the report figure has no real source behind it.

  - **Open:** [Jonason, Slomski & Partyka (2012)](https://doi.org/10.1016/j.paid.2011.11.008) · [Vernon et al. (2008)](https://doi.org/10.1016/j.paid.2007.09.007)
  - **Check:** The article is made up. Check sentence 1 against Jonason, Slomski & Partyka (2012) and sentence 4 against Vernon et al. (2008). The 2023 report is planted.

- [ ] **`l9-key-students`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 9 students post is correct: each sentence's label matches its cited source, and the 'one in three' figure has no real source behind it.

  - **Open:** [Paulhus & Williams (2002)](https://doi.org/10.1016/S0092-6566(02)00505-6)
  - **Check:** The post is made up. Check sentence 2 against Paulhus & Williams (2002), and that sentence 3 is wrong twice: the traits are subclinical, and diagnosis is by clinicians.

## Lesson 10 · Spot the Pattern, in Person and Online

### Fact claims

- [ ] **`coercive-control-pattern`** · Fact claim: check it against the source

  > Controlling abuse is best understood as a pattern of behavior over time, such as isolating someone, monitoring them, controlling their money or independence, threats and humiliation, rather than as single incidents. The law in England defines the offence by behavior that is repeated or continuous.

  - **Open:** [Home Office (2023), Controlling or coercive behaviour guidance (PDF)](https://assets.publishing.service.gov.uk/media/642d3f9e7de82b001231364d/Controlling_or_Coercive_Behaviour_Statutory_Guidance_-_final.pdf) · [Serious Crime Act 2015, s. 76 †](https://www.legislation.gov.uk/ukpga/2015/9/section/76) · Stark (2007), Coercive Control (no link on file)
  - **Check** the behaviours the Home Office guidance lists, and 'repeatedly or continuously' in section 76.

- [ ] **`grooming-stages`** · Fact claim: check it against the source

  > Grooming tends to follow stages: choosing a target, gaining access and isolating them, building trust with attention, gifts and secrets, then pushing boundaries step by step. Early steps can look innocent, and the same tactics, including flattery, bribes and threats, are used online.

  - **Open:** [Winters & Jeglic (2017)](https://doi.org/10.1080/01639625.2016.1197656) · [Whittle et al. (2013)](https://doi.org/10.1016/j.avb.2012.09.003) · [FBI, Inside the FBI: Keeping Teens Safe on the Web (4 Sept 2026)](https://www.fbi.gov/news/podcasts/inside-the-fbi-podcast-keeping-teens-safe-on-the-web)
  - **Check** the stages in Winters & Jeglic, that Whittle et al. describe the same tactics online, and the FBI's 'builds rapport, then pushes past the comfort zone'.

- [ ] **`scam-stages`** · Fact claim: check it against the source

  > Romance and trust scammers usually build a relationship and trust before they ask for money, and a small early 'win' can keep people in the scam.

  - **Open:** [Whitty (2013)](https://doi.org/10.1093/bjc/azt009)
  - **Check** that trust is built before any request for money, and the near-win effect.

- [ ] **`dark-tetrad`** · Fact claim: check it against the source

  > Some researchers add a fourth trait, everyday sadism (enjoying others' pain), to the Dark Triad, making the Dark Tetrad. In lab studies, people higher in it chose to hurt others more, even when it took effort.

  - **Open:** [Buckels, Jones & Paulhus (2013)](https://doi.org/10.1177/0956797613490749) · [Paulhus (2014)](https://doi.org/10.1177/0963721414547737)
  - **Check** everyday sadism as the fourth trait, and the lab tasks (people chose to hurt others, even when it took effort).

- [ ] **`online-harm-traits`** · Fact claim: check it against the source

  > The dark traits show up online too: trolling is linked to sadism, psychopathy and Machiavellianism, with sadism the strongest predictor, and cyberbullying is linked to all three Dark Triad traits, with psychopathy the strongest.

  - **Open:** [Buckels, Trapnell & Paulhus (2014)](https://doi.org/10.1016/j.paid.2014.01.016) · [Goodboy & Martin (2015)](https://doi.org/10.1016/j.chb.2015.02.052)
  - **Check** sadism as the strongest predictor of trolling, and psychopathy as the strongest for cyberbullying. Both studies are correlational and self-report.

- [ ] **`work-harm-traits`** · Fact claim: check it against the source

  > Across 245 samples, harmful behavior at work (counterproductive work behavior) rose with all three Dark Triad traits.

  - **Open:** [O'Boyle et al. (2012)](https://doi.org/10.1037/a0025679)
  - **Check** 245 samples and that counterproductive work behaviour rose with all three traits.

- [ ] **`gut-feeling-evidence`** · Fact claim: check it against the source

  > People can pick up some signs of dark traits quickly: untrained raters detected features of psychopathy from clips of a few seconds. But first impressions can mislead, because people high in narcissism tend to be liked more at first meeting.

  - **Open:** [Fowler, Lilienfeld & Patrick (2009)](https://doi.org/10.1037/a0014938) · [Back, Schmukle & Egloff (2010)](https://doi.org/10.1037/a0016338)
  - **Check** that thin slices of a few seconds gave moderate accuracy (an inmate sample), and that narcissists are liked more at first meeting.
  - **Also cited in:** Lesson 12.

- [ ] **`fbi-teens-online`** · Fact claim: check it against the source

  > The FBI advises teens to trust their gut and stop any online conversation that feels odd, keep personal details off their profiles, set accounts to private, turn off location sharing, including the location saved in photos, and check friend requests with a friend or trusted adult. Criminals have used AI to put a teen's face on a fake image and then demand money.

  - **Open:** [FBI, Inside the FBI: Keeping Teens Safe on the Web (4 Sept 2026)](https://www.fbi.gov/news/podcasts/inside-the-fbi-podcast-keeping-teens-safe-on-the-web)
  - **Check:** Listen to the episode or read the transcript. Check each piece of advice in the claim, and the AI face-swap sextortion example.
  - **Also cited in:** Lesson 12, Essentials 1.

- [ ] **`bau-repeated-behavior`** · Fact claim: check it against the source

  > The FBI's Behavioral Analysis Unit (BAU), part of the National Center for the Analysis of Violent Crime within the Critical Incident Response Group, gives behavior-based support to investigations. In what the FBI calls criminal investigative analysis, investigators look for behavior that repeats across cases rather than a single act. Research on the accuracy of criminal profiling has found mixed results.

  - **Open:** [FBI, Behavioral Analysis](https://www.fbi.gov/how-we-investigate/behavioral-analysis) · Douglas & Munn (1992), FBI Law Enforcement Bulletin 61(2) (no link on file) · [Snook et al. (2007)](https://doi.org/10.1177/0093854806296925)
  - **Check** where the BAU sits (NCAVC, Critical Incident Response Group), the term 'criminal investigative analysis', and that Snook et al. found mixed results for profiling.

### Answer keys

- [ ] **`l10-key-educators`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 10 educators thread is reasonable: each moment's label (ordinary or warning sign) and pattern follow from the research on controlling behavior.

  - **Open:** [Home Office (2023), Controlling or coercive behaviour guidance (PDF)](https://assets.publishing.service.gov.uk/media/642d3f9e7de82b001231364d/Controlling_or_Coercive_Behaviour_Statutory_Guidance_-_final.pdf)
  - **Check:** The thread is made up. Check weeks 4 to 6 against the Home Office guidance (isolating, checking, threats) and week 2 against the flattery-then-request pattern.

- [ ] **`l10-key-professionals`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 10 professionals thread is reasonable: each moment's label (ordinary or warning sign) and pattern follow from the research on trust scams and controlling behavior.

  - **Open:** [Whitty (2013)](https://doi.org/10.1093/bjc/azt009)
  - **Check:** The thread is made up. Check the order (secrecy, access to money, trust then a request, a deadline) against Whitty (2013).

- [ ] **`l10-key-students`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 10 students thread is reasonable: each moment's label (ordinary or warning sign) and pattern follow from the research on grooming, and the last moment directs the learner to a trusted adult.

  - **Open:** [Winters & Jeglic (2017)](https://doi.org/10.1080/01639625.2016.1197656) · [Whittle et al. (2013)](https://doi.org/10.1016/j.avb.2012.09.003) · [eSafety Commissioner, Unsafe contact and grooming](https://www.esafety.gov.au/young-people/unsafe-contact)
  - **Check:** The thread is made up and stops before any abuse. Check the steps against the three sources, and that the last moment sends the learner to a trusted adult.

## Lesson 11 · When AI Manipulates

### Fact claims

- [ ] **`ai-companion-farewells`** · Fact claim: check it against the source

  > In a study of AI companion apps, 37% of 1,200 real goodbyes met a manipulative reply, such as guilt, fear of missing out, or not letting the person leave. In experiments, such replies raised engagement after the goodbye by up to 14 times, driven by irritation and curiosity rather than enjoyment.

  - ⚑ **Do first.** Still a working paper: a web search on 2026-10-13 found no published version. Coverage differs on the share (37% here; The Register reported about 43%), so check the figure in the latest arXiv version.
  - **Open:** [De Freitas et al. (2025), arXiv:2508.19258](https://doi.org/10.48550/arXiv.2508.19258)
  - **Check** 37% of 1,200 goodbyes, and engagement up to 14 times, driven by irritation and curiosity.

- [ ] **`sycophancy-preference`** · Fact claim: check it against the source

  > AI assistants trained partly on human ratings tend to tell people what they want to hear, and people's own preference ratings play a part in that.

  - **Open:** [Sharma et al. (2023), arXiv:2310.13548](https://doi.org/10.48550/arXiv.2310.13548)
  - **Check** five assistants and four tasks, and that preference judgments sometimes favoured sycophantic answers. 'Play a part' is the claim.

- [ ] **`darkbench-patterns`** · Fact claim: check it against the source

  > Researchers test AI chatbots for manipulative design patterns, including flattery (sycophancy), keeping users engaged, favoring their maker's products, and acting human. In one benchmark, such patterns appeared in 48% of test cases on average.

  - **Open:** [Kran et al. (2025), DarkBench](https://doi.org/10.48550/arXiv.2503.10728)
  - **Check** the six categories and that 48% is the average across categories.

### Answer keys

- [ ] **`l11-key-educators`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 11 educators chat is reasonable: each reply's label (helpful, or the move it makes) and what it trades follow from the research on manipulative AI design.

  - **Open:** [Kran et al. (2025), DarkBench](https://doi.org/10.48550/arXiv.2503.10728) · [De Freitas et al. (2025), arXiv:2508.19258](https://doi.org/10.48550/arXiv.2508.19258)
  - **Check:** The chat is made up. Check the moves against DarkBench's categories (sycophancy, brand bias, user retention) and the farewell tactics in De Freitas et al.

- [ ] **`l11-key-professionals`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 11 professionals chat is reasonable: each reply's label (helpful, or the move it makes) and what it trades follow from the research on manipulative AI design.

  - **Open:** [Sharma et al. (2023), arXiv:2310.13548](https://doi.org/10.48550/arXiv.2310.13548) · [Kran et al. (2025), DarkBench](https://doi.org/10.48550/arXiv.2503.10728)
  - **Check** reply 1 against Sharma et al. (sycophancy), reply 2 against DarkBench's brand bias, and reply 4 against its anthropomorphism category.

- [ ] **`l11-key-students`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 11 students chat is reasonable: each reply's label (helpful, or the move it makes) and what it trades follow from the research, and the notes tell students that leaving is always fine and to tell an adult about requests for money.

  - **Open:** [De Freitas et al. (2025), arXiv:2508.19258](https://doi.org/10.48550/arXiv.2508.19258) · [UNICEF (2021), Policy guidance on AI for children 2.0](https://www.unicef.org/innocenti/reports/policy-guidance-ai-children) · [EU AI Act, Regulation (EU) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
  - **Check** replies 3 and 4 against the farewell tactics, and reply 5 (a parent's card) against UNICEF's safety requirement. The AI Act's Article 5(1)(b) has applied since 2 February 2025.

## Lesson 12 · Protect Yourself and Your Gifts

Also cites, listed earlier: `gut-feeling-evidence` (Lesson 10), `fbi-teens-online` (Lesson 10).

### Fact claims

- [ ] **`gaslighting-defined`** · Fact claim: check it against the source

  > Gaslighting is a form of psychological abuse that tries to make a person seem, or feel, 'crazy', so they doubt their own memory and judgement. It often draws on stereotypes and unequal power.

  - **Open:** [Sweet (2019)](https://doi.org/10.1177/0003122419874843)
  - **Check** Sweet's definition, and the link to stereotypes and unequal power. The lesson's advice follows from it; it isn't a finding of the paper.

- [ ] **`never-promise-secrecy`** · Fact claim: check it against the source

  > Statutory guidance for schools in England says staff should never promise a child that they will not tell anyone about a report of abuse, and should involve the designated safeguarding lead.

  - **Open:** [DfE, Keeping Children Safe in Education 2026](https://www.gov.uk/government/publications/keeping-children-safe-in-education--2)
  - **Check** Part one, paragraph 14 of the 2026 edition: never promise a child you won't tell anyone, and involve the designated safeguarding lead.
  - **Review cycle:** the rationale suggests `ttlDays: 365`.

- [ ] **`mandated-reporting-us`** · Fact claim: check it against the source

  > Every US state and territory has laws that require certain people, including teachers, to report suspected child abuse or neglect. The procedures vary by state.

  - **Open:** [Child Welfare Information Gateway, Mandatory reporting (PDF)](https://cwig-prod-prod-drupal-s3fs-us-east-1.s3.amazonaws.com/public/documents/manda.pdf)
  - **Check** that every state and territory requires certain people, including teachers, to report, and that procedures vary. The PDF link is a storage address and may move; the topic page is on childwelfare.gov.
  - **Review cycle:** the rationale suggests `ttlDays: 365`.

- [ ] **`sextortion-advice`** · Fact claim: check it against the source

  > For financially motivated sextortion, the FBI advises people not to pay, to block the person but save the profile and messages, to ask a trusted adult or law enforcement for help, and to report it to a local FBI field office, 1-800-CALL-FBI, tips.fbi.gov or local law enforcement. It says this is not the victim's fault. Criminals also use AI to put a person's face on a fake image and threaten to share it; the same advice applies. For people under 18, NCMEC's Take It Down service can help remove images.

  - **Open:** [FBI, Financially motivated sextortion](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/sextortion/financially-motivated-sextortion) · [FBI, Sextortion](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/sextortion) · [NCMEC, Take It Down](https://takeitdown.ncmec.org/) · [FBI, Inside the FBI: Keeping Teens Safe on the Web (4 Sept 2026)](https://www.fbi.gov/news/podcasts/inside-the-fbi-podcast-keeping-teens-safe-on-the-web) · [FBI IC3 PSA I-120324-PSA (3 Dec 2024)](https://www.ic3.gov/PSA/2024/PSA241203)
  - **Check** each step of the FBI's advice, the reporting routes, 'not your fault', and that Take It Down is for people under 18.
  - **Review cycle:** the rationale suggests `ttlDays: 365`.

- [ ] **`child-helplines`** · Fact claim: check it against the source

  > Child Helpline International is a global network of 155 child helplines in 133 countries, and its website lists how to reach them.

  - ⚑ **Do first.** The number may have changed. A web search on 2026-10-13 found the home page reporting 156 helplines in 133 countries; the claim says 155. If the page you open says 156, reject this wording and ask for a new proposal.
  - **Open:** [Child Helpline International, helplines](https://childhelplineinternational.org/helplines/) · [Child Helpline International, home page](https://childhelplineinternational.org/)
  - **Check** the number of helplines and countries on the site, and that it lists how to reach them.
  - **Review cycle:** the rationale suggests `ttlDays: 365`.

### Answer keys

- [ ] **`l12-key-educators`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 12 educators situations is reasonable: each response's label (safe or risky) follows from the lesson's guidance, and the disclosure situation follows Keeping Children Safe in Education.

  - **Open:** [DfE, Keeping Children Safe in Education 2026](https://www.gov.uk/government/publications/keeping-children-safe-in-education--2)
  - **Check:** The situations are made up. Situation 3 must match KCSIE 2026 paragraph 14. The rest are judgements: is each label reasonable?

- [ ] **`l12-key-professionals`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 12 professionals situations is reasonable: each response's label (safe or risky) follows from the lesson's guidance on records, support and boundaries.

  - **Open:** nothing outside the lesson; the key is judged from the page.
  - **Check:** The situations are made up. Check that each safe response gives a record, support or a boundary, and that no safe response labels anyone.

- [ ] **`l12-key-students`** · Answer key: check that it's reasonable

  > The answer key for the Lesson 12 students situations is reasonable: the threat situation follows the FBI's advice (don't pay; block but don't delete; tell a trusted adult), and every situation points to a trusted adult.

  - **Open:** [FBI, Financially motivated sextortion](https://www.fbi.gov/how-we-can-help-you/scams-and-safety/common-frauds-and-scams/sextortion/financially-motivated-sextortion) · [NCMEC, Take It Down](https://takeitdown.ncmec.org/) · [FBI, Inside the FBI: Keeping Teens Safe on the Web (4 Sept 2026)](https://www.fbi.gov/news/podcasts/inside-the-fbi-podcast-keeping-teens-safe-on-the-web)
  - **Check** situation 1 against the FBI's sextortion advice (don't pay; block but don't delete; tell a trusted adult) and Take It Down. Every situation should point to a trusted adult.

## Essentials 1 · Staying Secure in the Age of AI

Also cites, listed earlier: `fbi-teens-online` (Lesson 10).

### Fact claims

- [ ] **`ai-fraud-fbi`** · Fact claim: check it against the source

  > Criminals use generative AI to make fraud more believable and to commit it on a larger scale: written messages, fake images, copied voices and fake video. The FBI advises agreeing a secret word with family, and checking a caller by hanging up and calling back on a number you already know.

  - **Open:** [FBI IC3 PSA I-120324-PSA (3 Dec 2024)](https://www.ic3.gov/PSA/2024/PSA241203)
  - **Check** the uses listed (text, images, voice, video) and the two tips: a family secret word, and hang up and call back on a number you know.

- [ ] **`ai-voice-calls`** · Fact claim: check it against the source

  > AI can make a caller's voice sound human, copy a real person's voice, and carry on a conversation, so a voice alone doesn't prove who, or what, is calling.

  - **Open:** [FCC 24-17 Declaratory Ruling (PDF)](https://docs.fcc.gov/public/attachments/FCC-24-17A1.pdf) · [FBI IC3 PSA I-051525-PSA (15 May 2025)](https://www.ic3.gov/PSA/2025/PSA250515) · [FTC alert, Puig (20 March 2023)](https://consumer.ftc.gov/consumer-alerts/2023/03/scammers-use-ai-enhance-their-family-emergency-schemes)
  - **Check** FCC 24-17 paragraphs 4 and 5, the IC3 PSA on AI voices, and the FTC's 'Don't trust the voice'. The claim says 'can', not 'most'.

- [ ] **`answering-bot-calls`** · Fact claim: check it against the source

  > You don't have to answer a number you don't know. If a recording or a computer voice starts talking, hang up without pressing any numbers. Caller ID can be faked, so call back on the number on your card or statement, or on the official website. Hang up right away if a caller asks for money, a code or personal details.

  - **Open:** [FTC, Robocalls](https://consumer.ftc.gov/articles/robocalls) · [FCC, Stop unwanted robocalls and texts](https://www.fcc.gov/consumers/guides/stop-unwanted-robocalls-and-texts) · [FTC alert, Miller (8 July 2024)](https://consumer.ftc.gov/consumer-alerts/2024/06/got-call-about-fraud-activity-your-bank-account-it-could-be-scammer)
  - **Check** each piece of advice against the FTC and FCC pages: don't answer unknown numbers, hang up, don't press numbers, caller ID can be faked, call back on an official number.

- [ ] **`ai-disclosure-laws`** · Fact claim: check it against the source

  > Some places require a business's AI to say it's an AI: the EU from 2 August 2026, and Utah when a customer clearly asks. US federal rules require a recorded or AI-voice call to say who is calling, but not that it uses AI. Scammers ignore these rules, so what a caller says about itself proves nothing.

  - ⚑ **Do first.** Law that has recently changed: the Utah section was renumbered (from 13-75-103), and the EU date was checked against the Digital Omnibus. Check both are current when you attest.
  - **Open:** [EU AI Act, Regulation (EU) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) · [Utah Code § 13-77-103](https://le.utah.gov/xcode/Title13/Chapter77/13-77-S103.html) · [FCC 24-17 Declaratory Ruling (PDF)](https://docs.fcc.gov/public/attachments/FCC-24-17A1.pdf)
  - **Check** AI Act Article 50 and its 2 August 2026 date, the Utah section, and that US federal rules (FCC 24-17 para. 9; 47 CFR § 64.1200(b)) require caller identity but no AI disclosure.
  - **Review cycle:** the rationale suggests `ttlDays: 365`.

- [ ] **`scam-signs-ncsc`** · Fact claim: check it against the source

  > The UK's National Cyber Security Centre names five signs of a scam message: authority, urgency, emotion, scarcity and current events.

  - **Open:** [NCSC, How to spot a scam](https://www.ncsc.gov.uk/collection/phishing-scams/spot-scams)
  - **Check** the five signs: authority, urgency, emotion, scarcity and current events.

- [ ] **`ai-tools-confidential`** · Fact claim: check it against the source

  > Don't put sensitive or private information into a public AI tool: what you type is visible to the company that runs it, and may be stored and used to develop the tool.

  - **Open:** [NCSC blog, ChatGPT and LLMs: what's the risk? (2023)](https://www.ncsc.gov.uk/blog-post/chatgpt-and-large-language-models-whats-the-risk)
  - **Check** that queries are visible to the provider, may be stored and used to develop the service, and the advice not to include sensitive information.

- [ ] **`passwords-nist`** · Fact claim: check it against the source

  > US digital identity guidelines say a password used on its own should be at least 15 characters long. Sites shouldn't demand a mix of character types, or make people change passwords on a schedule, only when there is evidence a password was compromised.

  - **Open:** [NIST SP 800-63B-4](https://doi.org/10.6028/NIST.SP.800-63B-4)
  - **Check** the password section: 15 characters for single-factor use, no composition rules, no scheduled changes, a change on evidence of compromise.

- [ ] **`passkeys-phishing-resistant`** · Fact claim: check it against the source

  > Passkeys, built on the FIDO standard, resist phishing: a passkey only works on the site it was made for, so a fake site can't use it. CISA calls FIDO the only widely available phishing-resistant sign-in, and says any two-step sign-in is better than none.

  - ⚑ **Do first.** Re-sourced: CISA's 'More than a Password' page, which first carried this, is now marked Archived Content. Check that the four replacement CISA pages carry no archive banner.
  - **Open:** [CISA, Implementing phishing-resistant MFA (PDF)](https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf) · [CISA, CPG 2.0](https://www.cisa.gov/cybersecurity-performance-goals-2-0-cpg-2-0) · [CISA, Require multifactor authentication](https://www.cisa.gov/audiences/small-and-medium-businesses/secure-your-business/require-multifactor-authentication) · [CISA, Mobile communications best practice (PDF)](https://www.cisa.gov/sites/default/files/2025-12/guidance-mobile-communications-best-practices_508c.pdf) · [FIDO Alliance, Passkeys](https://fidoalliance.org/passkeys/)
  - **Check** 'the only widely available phishing-resistant authentication is FIDO/WebAuthn', 'any MFA is better than none', and that a passkey is bound to the site it was made for.

- [ ] **`report-scams`** · Fact claim: check it against the source

  > In the UK, scam emails can be forwarded to report@phishing.gov.uk and scam texts to 7726. In the US, scams can be reported to the FBI's Internet Crime Complaint Center at ic3.gov, and to the Federal Trade Commission at ReportFraud.ftc.gov.

  - **Open:** [NCSC, Report a scam email](https://www.ncsc.gov.uk/collection/phishing-scams/report-scam-email) · [NCSC, Report a scam text](https://www.ncsc.gov.uk/collection/phishing-scams/report-scam-text-message) · [FBI IC3](https://www.ic3.gov/) · [FTC, ReportFraud.ftc.gov](https://reportfraud.ftc.gov/)
  - **Check** report@phishing.gov.uk, 7726, ic3.gov and ReportFraud.ftc.gov. Reporting routes change; the rationale suggests a yearly re-check.
  - **Review cycle:** the rationale suggests `ttlDays: 365`.

- [ ] **`uk-159`** · Fact claim: check it against the source

  > In the UK, calling 159 connects you safely to your bank: it reaches most banks, and scammers can't fake the number.

  - **Open:** [Stop Scams UK, 159](https://stopscamsuk.org.uk/159)
  - **Check** that 159 reaches customers of over 99% of UK retail bank current accounts and can't be spoofed. Stop Scams UK is an industry body, not a government agency.

### Answer keys

- [ ] **`e1-key-educators`** · Answer key: check that it's reasonable

  > The answer key for the Essentials 1 educators inbox is reasonable: each message's label (genuine or scam), its signs and how to check follow from the NCSC's five signs and the FBI's advice.

  - **Open:** [FBI IC3 PSA I-120324-PSA (3 Dec 2024)](https://www.ic3.gov/PSA/2024/PSA241203) · [NCSC, How to spot a scam](https://www.ncsc.gov.uk/collection/phishing-scams/spot-scams) · [EU AI Act, Regulation (EU) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)
  - **Check:** The messages are made up. Check the AI booking call with changed bank details and the gift-card voice message against the FBI PSA and the NCSC's signs, and that both genuine messages ask for nothing.

- [ ] **`e1-key-professionals`** · Answer key: check that it's reasonable

  > The answer key for the Essentials 1 professionals inbox is reasonable: each message's label (genuine or scam), its signs and how to check follow from the NCSC's five signs and the FBI's advice.

  - **Open:** [FBI IC3 PSA I-120324-PSA (3 Dec 2024)](https://www.ic3.gov/PSA/2024/PSA241203) · [FTC alert, Miller (8 July 2024)](https://consumer.ftc.gov/consumer-alerts/2024/06/got-call-about-fraud-activity-your-bank-account-it-could-be-scammer) · [Stop Scams UK, 159](https://stopscamsuk.org.uk/159) · [FCC 24-17 Declaratory Ruling (PDF)](https://docs.fcc.gov/public/attachments/FCC-24-17A1.pdf)
  - **Check** the look-alike supplier address, the fake video call from a finance director, and the 'bank fraud team' bot call against the FTC alert (no bank asks for a code), 159 and FCC 24-17 para. 4.

- [ ] **`e1-key-students`** · Answer key: check that it's reasonable

  > The answer key for the Essentials 1 students inbox is reasonable: each message's label (genuine or scam), its signs and how to check follow from the NCSC's five signs and the FBI's advice, and every scam points to a trusted adult.

  - **Open:** [FBI IC3 PSA I-120324-PSA (3 Dec 2024)](https://www.ic3.gov/PSA/2024/PSA241203) · [FBI IC3 PSA I-051525-PSA (15 May 2025)](https://www.ic3.gov/PSA/2025/PSA250515) · [FTC alert, Miller (8 July 2024)](https://consumer.ftc.gov/consumer-alerts/2024/06/got-call-about-fraud-activity-your-bank-account-it-could-be-scammer)
  - **Check** the copied voice asking for a code (secret word, call back) and the 'game support' call asking for a code. Every scam should point to a trusted adult.

- [ ] **`e1-key-share`** · Answer key: check that it's reasonable

  > The answer key for the Essentials 1 sorter is reasonable: passwords, other people's messages, health details and addresses, photos of your face, and photos with location stay out of a public AI tool; general questions and public information are fine.

  - **Open:** [NCSC blog, ChatGPT and LLMs: what's the risk? (2023)](https://www.ncsc.gov.uk/blog-post/chatgpt-and-large-language-models-whats-the-risk) · [FBI IC3 PSA I-120324-PSA (3 Dec 2024)](https://www.ic3.gov/PSA/2024/PSA241203) · [FBI, Inside the FBI: Keeping Teens Safe on the Web (4 Sept 2026)](https://www.fbi.gov/news/podcasts/inside-the-fbi-podcast-keeping-teens-safe-on-the-web)
  - **Check** that what stays out of a public AI tool follows the NCSC's advice and the FBI's advice on images and location. 'Other people's information isn't yours to share' is a judgement.

## Essentials 2 · Keeping Your Devices and Accounts Safe

### Fact claims

- [ ] **`updates-ncsc-cisa`** · Fact claim: check it against the source

  > Software updates fix security flaws that criminals use. Install them soon, turn on automatic updates, and get updates from your device's own settings or the official app store. Older devices eventually stop getting updates.

  - ✓ **Opened 2026-10-13** (main session): the CISA training page is live, has no archive banner, and its words match the rationale. Re-sourced after CISA's Secure Our World 'Update Software' page was archived.
  - **Open:** [NCSC, Install the latest software and app updates](https://www.ncsc.gov.uk/collection/top-tips-for-staying-secure-online/install-the-latest-software-and-app-updates) · [CISA training, Keep your device's OS and applications up to date](https://www.cisa.gov/resources-tools/training/keep-your-devices-operating-system-and-applications-date)
  - **Check** four things: install updates soon, turn on automatic updates, get them from the device's own settings or the official store, and older devices stop getting them.

- [ ] **`fake-updates-cisa`** · Fact claim: check it against the source

  > An update offered in a pop-up on a web page, or in an email, may be a trick. Criminals have spread harmful software disguised as browser updates.

  - ✓ **Opened 2026-10-13** (main session): both CISA pages are live and not archived; the quoted words match. The Interlock advisory says the fake browser updates were used 'previously', and the group has since shifted to fake security-software updates.
  - **Open:** [CISA training, Keep your device's OS and applications up to date](https://www.cisa.gov/resources-tools/training/keep-your-devices-operating-system-and-applications-date) · [CISA et al., #StopRansomware: Interlock (AA25-203A)](https://www.cisa.gov/news-events/cybersecurity-advisories/aa25-203a)
  - **Check** CISA's caution about updates offered in a pop-up or email, and that the Interlock advisory describes payloads disguised as Chrome or Edge updates.

- [ ] **`fake-downloads-fbi`** · Fact claim: check it against the source

  > Criminals pay for search ads that look like real companies and lead to fake sites, where a download named after the program you wanted is really harmful software. Type the company's address yourself, or use the official app store.

  - **Open:** [FBI IC3 PSA I-122122-PSA (21 Dec 2022)](https://www.ic3.gov/PSA/2022/PSA221221)
  - **Check** that search ads imitate real brands and lead to sites offering malware downloads. 'Or use the official app store' is the course's addition, not from the PSA.

- [ ] **`fake-ai-extensions-example`** · Fact claim: check it against the source

  > A security company reported two fake AI browser extensions, with about 900,000 users between them, that sent users' AI chats to criminals. One had a "Featured" badge.

  - ⚑ **Do first.** The situation has changed since the report: The Hacker News reported that the 'Featured' badge was later removed, and reports differ on whether the extensions are still listed. The claim's past tense ('had') still fits.
  - **Open:** [OX Security, 900K users compromised (30 Dec 2025)](https://www.ox.security/blog/malicious-chrome-extensions-steal-chatgpt-deepseek-conversations/) · [The Hacker News, January 2026 (found by search)](https://thehackernews.com/2026/01/two-chrome-extensions-caught-stealing.html)
  - **Check** two extensions, about 900,000 users between them (over 600,000 and 300,000), AI chats sent to a server, and one with a 'Featured' badge.

- [ ] **`consent-phishing-fbi`** · Fact claim: check it against the source

  > Saying yes to an app that asks to "connect" to your account can give a criminal access without your password, even with two-step sign-in. Changing your password doesn't remove that access: you have to remove the app in your account's security settings.

  - **Open:** [FBI IC3 PSA I-090126-PSA (1 Sept 2026)](https://www.ic3.gov/PSA/2026/PSA260901)
  - **Check** that the permission screen is real, that it bypasses the password and two-step sign-in, and that access goes only when you remove the app, not by changing the password.

- [ ] **`recover-hacked-account`** · Fact claim: check it against the source

  > To recover a hacked account: use the provider's own recovery page, check for forwarding rules, change the password and any you reused, sign out of all devices, remove apps you didn't add, turn on two-step sign-in, and warn your contacts.

  - **Open:** [NCSC, Recovering a hacked account](https://www.ncsc.gov.uk/guidance/recovering-a-hacked-account) · [FTC, How to recover your hacked email or social media account](https://consumer.ftc.gov/articles/how-recover-your-hacked-email-or-social-media-account) · [FBI IC3 PSA I-090126-PSA (1 Sept 2026)](https://www.ic3.gov/PSA/2026/PSA260901)
  - **Check** each step against the NCSC and FTC pages. 'Remove apps you didn't add' comes from the FBI PSA, not those two pages.

- [ ] **`identitytheft-gov`** · Fact claim: check it against the source

  > In the US, if someone stole your personal information, IdentityTheft.gov, run by the Federal Trade Commission, helps you report it and gives you a recovery plan.

  - ✓ **Opened 2026-10-13** (main session): IdentityTheft.gov and the FTC alert (A. Puig, 29 October 2024) both support the claim. The rationale's earlier quote from search results wasn't on the page, so it was replaced with the page's own words.
  - **Open:** [FTC, IdentityTheft.gov](https://www.identitytheft.gov/) · [FTC alert, Email or social media hacked? (Oct 2024)](https://consumer.ftc.gov/consumer-alerts/2024/10/email-or-social-media-hacked-heres-what-do)
  - **Check** that IdentityTheft.gov is run by the FTC and creates a report and a recovery plan.

### Answer keys

- [ ] **`e2-key-educators`** · Answer key: check that it's reasonable

  > The answer key for the Essentials 2 educators requests is reasonable: each request's answer (say yes, say no or check first), what to look at and how to check follow from CISA's, the NCSC's and the FBI's advice on updates, downloads and connected apps.

  - ✓ Its sources (the CISA training page and the Interlock advisory) were opened 2026-10-13 and match.
  - **Open:** [NCSC, Install the latest software and app updates](https://www.ncsc.gov.uk/collection/top-tips-for-staying-secure-online/install-the-latest-software-and-app-updates) · [CISA training, Keep your device's OS and applications up to date](https://www.cisa.gov/resources-tools/training/keep-your-devices-operating-system-and-applications-date) · [CISA et al., #StopRansomware: Interlock (AA25-203A)](https://www.cisa.gov/news-events/cybersecurity-advisories/aa25-203a) · [OX Security, 900K users compromised (30 Dec 2025)](https://www.ox.security/blog/malicious-chrome-extensions-steal-chatgpt-deepseek-conversations/) · [FBI IC3 PSA I-090126-PSA (1 Sept 2026)](https://www.ic3.gov/PSA/2026/PSA260901)
  - **Check:** The requests are made up. Check: the laptop's update (yes), the 'Featured' grading extension (check first), the browser-update pop-up (no), and the quiz maker asking to send email and read files (no).

- [ ] **`e2-key-professionals`** · Answer key: check that it's reasonable

  > The answer key for the Essentials 2 professionals requests is reasonable: each request's answer (say yes, say no or check first), what to look at and how to check follow from CISA's, the NCSC's and the FBI's advice on updates, downloads and connected apps.

  - ✓ Its source (the Interlock advisory) was opened 2026-10-13 and matches.
  - **Open:** [FBI IC3 PSA I-090126-PSA (1 Sept 2026)](https://www.ic3.gov/PSA/2026/PSA260901) · [CISA et al., #StopRansomware: Interlock (AA25-203A)](https://www.cisa.gov/news-events/cybersecurity-advisories/aa25-203a) · [FBI IC3 PSA I-122122-PSA (21 Dec 2022)](https://www.ic3.gov/PSA/2022/PSA221221) · [OX Security, 900K users compromised (30 Dec 2025)](https://www.ox.security/blog/malicious-chrome-extensions-steal-chatgpt-deepseek-conversations/)
  - **Check** each answer: the work laptop's update (yes), the notes app asking to send email (check first), the 'urgent' pop-up (no), the AI sidebar from a search ad (check first), and the approved tool asking for the microphone (yes).

- [ ] **`e2-key-students`** · Answer key: check that it's reasonable

  > The answer key for the Essentials 2 students requests is reasonable: each request's answer (say yes, say no or check first), what to look at and how to check follow from CISA's, the NCSC's and the FBI's advice, and every "no" and "check first" names a trusted adult.

  - ✓ Its source (the CISA training page) was opened 2026-10-13 and matches.
  - **Open:** [FBI IC3 PSA I-090126-PSA (1 Sept 2026)](https://www.ic3.gov/PSA/2026/PSA260901) · [CISA training, Keep your device's OS and applications up to date](https://www.cisa.gov/resources-tools/training/keep-your-devices-operating-system-and-applications-date)
  - **Check** each answer: the homework app from an ad (check first), the free-coins site (no), the phone and reading-app updates from the store (yes), the browser pop-up (no). Every 'no' and 'check first' names a trusted adult.

- [ ] **`e2-key-recover`** · Answer key: check that it's reasonable

  > The order in the Essentials 2 recovery builder is reasonable: it follows the NCSC's steps, adds the FBI's step of removing apps you didn't add, and accepts a range of places where the NCSC's and the FTC's orders differ.

  - **Open:** [NCSC, Recovering a hacked account](https://www.ncsc.gov.uk/guidance/recovering-a-hacked-account) · [FTC, How to recover your hacked email or social media account](https://consumer.ftc.gov/articles/how-recover-your-hacked-email-or-social-media-account) · [FBI IC3 PSA I-090126-PSA (1 Sept 2026)](https://www.ic3.gov/PSA/2026/PSA260901)
  - **Check** that both the NCSC's order and the FTC's (with 'remove apps' added) score every step right, and that the ranges where they differ are fair.
