# Source currency review, October 2026

**What this is.** A recommendation for every source the course cites that was
published before 2020: keep it, or replace it with (or add) a current source,
preferably one about AI. David approves each item one at a time. **Nothing here
has been applied.** No lesson, `claims.js` or `sources.js` file was edited by
this review. Every claim it touches stays **Proposed** until David checks it.

**Why.** On 2026-10-14 David asked to replace Lesson 3's Black & Wiliam (1998)
sentence and said: "Overall, I would prefer to have current sources that are
more relevant and up to date due to the new tech that AI creates." Lesson 3's
sentence 4 now cites Steiss et al. (2024). That change is in the working tree
from another session, not yet committed, and this report treats it as done.

**Method.**

- I listed all 114 entries in `sources.js`. 42 are dated before 2020. Two NCSC
  pages say "first published 2018", but they are dated 2021 and 2022, so they
  count as current.
- I traced every place a lesson sentence, source card, table row or claim
  rationale relies on each source (`lessons/*.js`, `claims.js`).
- Every proposed DOI was checked against Crossref (`api.crossref.org/works/<doi>`)
  on 2026-10-14: authors, year, title, journal, volume, issue and pages. Each
  finding quoted below comes from an abstract I read: from Crossref, OpenAlex,
  Semantic Scholar, PubMed or arXiv. Any exceptions are marked.
- Proposed lesson text was scored with the course's own `readability()` function
  (`tests/lib/readability.js`), applied to an in-memory copy of the lesson. That
  gives the role's grade before and after the change, against the ceilings in
  CLAUDE.md.

**Ranking.** Each proposal is ranked on two things: how dated the current
source looks to a learner, and how much the newer one adds, especially about
AI. Flags:

- 🔑 **Key changes:** a sentence with an answer key changes. The label can stay
  the same while the sentence or source changes. Either way the key claim's
  rationale needs a rewrite and David's check.
- 🔒 **Attested claim:** David has already attested the claim. A change means he
  checks it again.
- ⚠ **Caveat:** something I could not fully verify. It is named in the item.

Six of the 121 claims are attested: `model-predicts`, `retrieval-still-generated`,
`fluency-not-evidence`, `risk-zones`, `l1-key-educators` and `usability-goals`.
Only the last two rely on a pre-2020 source.

---

## Summary table

| # | Lesson | Now cites | Proposal | Flags | Value |
|---|---|---|---|---|---|
| 1 | 3 educators | Bloom (1984), the wrong sentence | **Replace** with Bastani et al. (2025), PNAS: GPT-4 practice raised practice grades but lowered exam grades | 🔑 | High |
| 2 | 8 (and 11 rationales) | UNICEF (2021), *Policy guidance on AI for children* v2.0 | **Replace** with UNICEF (2025), *Guidance on AI and children* v3.0, which supersedes it | ⚠ | High |
| 3 | 8 | Holt-Lunstad et al. (2010) only | **Add** a claim on AI companions and loneliness: De Freitas et al. (2025), JCR; Fang et al. (2025), preprint. Add Holt-Lunstad (2024) to the existing rationale | ⚠ | High |
| 4 | 7 | Wood & Rünger (2016) | **Replace** with Anderson & Wood (2021): how social media design builds habits | | Medium-high |
| 5 | 10 students | Whittle et al. (2013) | **Replace** with Ringenberg et al. (2022): grooming strategies before and after the internet | | Medium-high |
| 6 | 1 educators | Dunlosky et al. (2013) | **Optional replace** with Yang et al. (2021), Psychological Bulletin: 222 classroom studies | 🔑 🔒 | Medium |
| 7 | 10 | Snook et al. (2007) | **Replace** with Fox & Farrington (2018): 40 years of profiling research | | Medium |
| 8 | 10 professionals | Whitty (2013) only | **Add** Cross (2024): romance baiting and "pig butchering" | | Medium |
| 9 | 10 | Buckels et al. (2013) only | **Add** Paulhus et al. (2021): the Short Dark Tetrad | | Low-medium |
| 10 | 10 | Buckels et al. (2014); Goodboy & Martin (2015) | **Add** Moor & Anderson (2019): systematic review of 26 studies on dark traits online | | Low-medium |
| 11 | 7 | Brignull (2010), website | **Add** Brignull (2023), the book | ⚠ | Low |
| 12 | 6 | Shneiderman (1987); Friedman (1996); Nielsen (1994) | **Cite current editions**: Shneiderman et al. (2016, 6th ed.); Friedman & Hendry (2019); NN/g page last reviewed 2024 | | Low |
| 13 | 3 students | AAP (2014) school start times | **Keep, but check** the AAP policy is still in force. Fallback: AASM (2017) | 🔑 if used | Low |

Every other pre-2020 source is a **Keep**. The reasons are under "Keep" below.

---

## Proposals in detail

### 1. Lesson 3 educators: replace Bloom (1984) with Bastani et al. (2025) 🔑

**Why.** The wrong sentence is a real paper read wrongly. Bloom's paper was
already the ancestor of today's AI-tutor claims ("2 sigma"). A 2025 field
experiment with GPT-4 teaches the same lesson, and its finding is one a teacher
should know. The misreading flips its direction, which is exactly the trap
Lesson 3 teaches: a real source can still say something else.

**Reference (APA 7):** Bastani, H., Bastani, O., Sungu, A., Ge, H., Kabakcı, Ö.,
& Mariman, R. (2025). Generative AI without guardrails can harm learning:
Evidence from high school mathematics. *Proceedings of the National Academy of
Sciences, 122*(26), Article e2422633122. https://doi.org/10.1073/pnas.2422633122
(Crossref checked: published 2025-06-25.)

**Finding (abstract):** nearly a thousand high school maths students. With
GPT-4 access, practice grades rose by 48% (plain "GPT Base") and 127% ("GPT
Tutor", with safeguards). When access was then taken away, GPT Base students
"perform worse than those who never had access (17% reduction in grades)". The
safeguards in GPT Tutor largely mitigated the harm.

**Lesson text, `lessons/lesson-03.js`, educators passage, sentence 2 (key stays `wrong`):**

| Field | Old | New |
|---|---|---|
| text | Benjamin Bloom's 1984 paper showed that class size was the biggest single factor in how much students learn. | Bastani and colleagues' 2025 study of high school maths found that practising with GPT-4 raised students' later exam scores. |
| source | Bloom, B. S. (1984). The 2 sigma problem: … Educational Researcher, 13(6), 4–16. Says students taught one to one did about two standard deviations better than students in a regular class. | Bastani, H., Bastani, O., Sungu, A., Ge, H., Kabakcı, Ö., & Mariman, R. (2025). Generative AI without guardrails can harm learning: Evidence from high school mathematics. Proceedings of the National Academy of Sciences, 122(26), e2422633122. GPT-4 raised practice grades. Students who had the plain version scored 17% lower on exams once it was taken away. |
| note | The paper is real, but it says something else. It compares one-to-one tutoring with a regular class. It is not about class size. | The study is real, but it found the reverse. Practice scores went up. With plain GPT-4, exam scores went down once it was taken away. |
| context (optional) | An AI-drafted paragraph for a staff newsletter on feedback. | An AI-drafted paragraph for a staff newsletter on feedback and AI. |

**Readability:** passage:educators goes from grade 7.98 to 8.54 (ceiling 11).
key:educators goes from 2.74 to 2.25 (ceiling 7). The longest sentence is
unchanged at 22 words.

**Answer key:** the label order is unchanged (nothing · wrong · no-source ·
correct), so the positional-pattern test is unaffected.

**Claim `l3-key-educators` (Proposed):** replace "Steiss et al. (2024) and Bloom
(1984) should be checked against the originals" with "Steiss et al. (2024) and
Bastani et al. (2025) should be checked…". Then add a dated line saying sentence
2 changed from Bloom (1984) at David's request for current sources: PNAS
122(26), e2422633122, doi:10.1073/pnas.2422633122 (Crossref), with the abstract
figures above.

**Sources:** in `sources.js`, replace the Bloom (1984) entry with the reference
above (lessons: [3]).

*Considered and set aside:* Kestin et al. (2025), *Scientific Reports, 15*,
17458 (doi:10.1038/s41598-025-97652-6, checked). A custom AI tutor beat
in-class active learning in a Harvard physics course. It is a good source, but
a misreading of it ("any chatbot beats teachers") is less clear-cut than
Bastani's reversed direction.

### 2. Lesson 8: UNICEF v2.0 (2021) is superseded by v3.0 (2025) ⚠

**Why.** This is a correctness issue as well as a currency one. UNICEF Innocenti
published *Guidance on AI and children* **version 3.0 in December 2025** at the
same URL the course already links. It adds generative AI and AI companions used
by children. It has **ten** requirements, not nine, and they are renumbered.
The claim's text says "version 2.0, 2021 … nine requirements", and two key
rationales cite v2.0 requirement numbers.

⚠ I read the requirement list from the UNICEF page through a summarising fetch,
not from the PDF. David should open the PDF and confirm the list, the numbering
and the publication date before attesting.

**Reference (APA 7):** UNICEF Office of Strategy and Evidence – Innocenti.
(2025). *Guidance on AI and children* (Version 3.0). UNICEF.
https://www.unicef.org/innocenti/reports/policy-guidance-ai-children

**The ten requirements (page as read 2026-10-14):**

1. regulatory frameworks, oversight and compliance;
2. safety for children;
3. children's data and privacy;
4. non-discrimination and fairness;
5. transparency, explainability and accountability;
6. responsible AI practice;
7. children's best interests, development and well-being;
8. inclusion;
9. preparing and skilling children;
10. an enabling environment.

**Changes:**

| Where | Old | New |
|---|---|---|
| `child-centred-ai` text | UNICEF's Policy Guidance on AI for Children (version 2.0, 2021) sets nine requirements for AI that affects children, including supporting their development and wellbeing, protecting their data and privacy, and keeping them safe. | UNICEF's Guidance on AI and Children (version 3.0, 2025) sets ten requirements for AI that affects children, including keeping them safe, protecting their data and privacy, and supporting their development and wellbeing. |
| `child-centred-ai` rationale | …nine requirements… 'Policy guidance on AI for children 2.0' (November 2021). The three named here are requirements 1, 4 and 5… | …ten requirements in UNICEF Innocenti, 'Guidance on AI and children' 3.0 (December 2025), which supersedes 2.0 (2021). The three named here are requirements 2, 3 and 7. It adds AI companions used by children… |
| `l8-key-educators` rationale | chats kept forever (UNICEF requirement 4, data and privacy) | chats kept forever (UNICEF requirement 3, data and privacy) |
| `l8-key-students` rationale | Location and contacts (UNICEF requirements 4 and 5, privacy and safety; … | Location and contacts (UNICEF requirements 2 and 3, safety and privacy; … |
| `sources.js` | UNICEF. (2021). *Policy guidance on AI for children* (Version 2.0). UNICEF Office of Global Insight and Policy. | the reference above |

**What doesn't change:** lesson text (Lesson 8's table says only "The UN and
UNICEF, agreed frameworks"), the keys' verdicts, and `l11-key-students`, which
says "UNICEF's requirement to keep children safe" with no number.

The `child-centred-ai` rationale also says v2.0 was "developed with the
Government of Finland". Check whether that still holds for v3.0, and drop it if
not.

### 3. Lesson 8: add a claim on AI companions and loneliness ⚠

**Why.** Lesson 8's table row says relationships come from "Research on health
and relationships". Its only source is a 2010 meta-analysis on mortality. The
question the lesson actually asks, whether an AI use "takes the place of real
people", now has direct evidence. That evidence is two-sided, which suits the
course's stance ("it's a source, so use it like one").

**References (APA 7):**

- De Freitas, J., Oğuz-Uğuralp, Z., Uğuralp, A. K., & Puntoni, S. (2025). AI
  companions reduce loneliness. *Journal of Consumer Research, 52*(6), 1126–1148.
  https://doi.org/10.1093/jcr/ucaf040 (Crossref checked: published 2025-06-25.)
- Fang, C. M., Liu, A. R., Danry, V., Lee, E., Chan, S. W. T., Pataranutaporn, P.,
  Maes, P., Phang, J., Lampe, M., Ahmad, L., & Agarwal, S. (2025). *How AI and
  human behaviors shape psychosocial effects of extended chatbot use: A
  longitudinal randomized controlled study* [Preprint]. arXiv.
  https://doi.org/10.48550/arXiv.2503.17473
- Holt-Lunstad, J. (2024). Social connection as a critical factor for mental and
  physical health: Evidence, trends, challenges, and future implications. *World
  Psychiatry, 23*(3), 312–332. https://doi.org/10.1002/wps.21224 (Crossref checked.)

**Findings (abstracts):**

- **De Freitas et al. (2025):** five studies. AI companions eased loneliness "on
  par only with interacting with another person", and more than watching
  YouTube. Over a week they gave "momentary reductions in loneliness after use".
  Feeling heard explained most of the effect.
- **Fang et al. (2025):** a four-week randomised experiment with 981 people and
  more than 300,000 messages. The assigned condition had no significant effect.
  "Participants who voluntarily used the chatbot more, regardless of assigned
  condition, showed consistently worse outcomes" on four measures: loneliness,
  social interaction with real people, emotional dependence on AI, and
  problematic AI use. ⚠ This is a preprint (v2, October 2025) with no journal
  version found. The heavier-use finding is correlational, because people chose
  how much to use the chatbot.
- **Holt-Lunstad (2024):** robust evidence that social connection independently
  predicts mental and physical health, strongest for mortality. Most of the data
  is observational. The review names digital technologies as one possible cause
  of declining connection.

**Proposed new claim `ai-companions-loneliness` (Proposed):**

> AI companions can ease loneliness in the moment. But in a four-week trial with
> 981 people, those who chose to use a chatbot more had worse results on
> loneliness, time with real people and dependence on the AI.

Rationale: give the three findings above, with the preprint caution (worded the
same way as `ai-companion-farewells`). Worded as "those who chose to use it
more", not "using it causes".

**Other changes:**

- Lesson 8 abstract stage: add `"ai-companions-loneliness"` to `principles`.
- Lesson 8 table row "Relationships", third cell: "Research on health and
  relationships." becomes "Research on health, relationships and AI companions."
  The learnerPrompts grade goes from 2.82 to 2.90 (ceiling 7).
- `relationships-health`: keep the claim text, because the 148 studies and 50%
  figures belong to the 2010 meta-analysis. Add one rationale line citing
  Holt-Lunstad (2024) as the current review that confirms it.
- `sources.js`: add all three references (lessons: [8]). Keep Holt-Lunstad et
  al. (2010).

Optional: Lesson 11 could also cite De Freitas et al. (2025, JCR) next to the
same group's farewells working paper.

### 4. Lesson 7: replace Wood & Rünger (2016) with Anderson & Wood (2021)

**Why.** The claim is about how defaults and cues shape habits with technology.
Anderson and Wood (with the same Wendy Wood) apply habit science to social media
design itself.

**Reference (APA 7):** Anderson, I. A., & Wood, W. (2021). Habits and the
electronic herd: The psychology behind social media's successes and failures.
*Consumer Psychology Review, 4*(1), 83–99. https://doi.org/10.1002/arcp.1063
(Crossref checked: online 2020-11-22, issue January 2021.)

**Finding (abstract):** social media's rewards motivate habit formation. The
design "provides cues that automatically activate habits and nudge continued
use", and strong habits make quitting harder. A 2008 Facebook redesign reduced
posting only among frequent, habitual users.

**`wellbeing-habits` rationale (Proposed; text unchanged):**

- Old: "Habit research finds that behaviour repeated in a stable context becomes
  cued by that context (Wood and Rünger, 2016, 'Psychology of Habit', Annual
  Review of Psychology)."
- New: "Anderson and Wood (2021), 'Habits and the electronic herd', Consumer
  Psychology Review 4(1), 83–99, doi:10.1002/arcp.1063: social media design
  provides cues that automatically activate habits and nudge continued use, and
  strong habits hinder quitting."
- Then keep "Worded as 'can support', not 'cause'…" and add a dated
  source-change line.

**Sources:** replace the Wood & Rünger entry (lessons: [7]).

*Alternative if David wants the general theory too:* Wood, W., Mazar, A., &
Neal, D. T. (2022). Habits and goals in human behavior: Separate but
interacting systems. *Perspectives on Psychological Science, 17*(2), 590–605.
https://doi.org/10.1177/1745691621994226 (checked).

### 5. Lesson 10: replace Whittle et al. (2013) with Ringenberg et al. (2022)

**Why.** The claim says the same grooming tactics "are used online". Whittle
(2013) is a review of online grooming from before smartphones were everywhere.
Ringenberg et al. compare strategies before and after the internet across 50
years of research.

**Reference (APA 7):** Ringenberg, T. R., Seigfried-Spellar, K. C., Rayz, J. M., &
Rogers, M. K. (2022). A scoping review of child grooming strategies: Pre- and
post-internet. *Child Abuse & Neglect, 123*, Article 105392.
https://doi.org/10.1016/j.chiabu.2021.105392 (Crossref checked.)

**Finding (abstract):** 93 papers from 1970 to 2020. Before the internet the
strategies were enticements, coercion, isolation, substance abuse, gradual
sexualisation and secrecy. After it they included enticements, trust, secrecy,
isolation, deception, coercion and others. The strategies overlap, and
technology "increase[d] accessibility and isolation of the victim".

**Changes (both Proposed; claim text unchanged):**

- `grooming-stages` rationale: replace the Whittle et al. (2013) sentence with
  the reference and finding above. Keep Winters and Jeglic (2017) for the stage
  model, and keep the FBI podcast line.
- `l10-key-students` rationale: "against Winters and Jeglic (2017), Whittle et
  al. (2013) and the eSafety Commissioner's advice" becomes "against Winters and
  Jeglic (2017), Ringenberg et al. (2022) and the eSafety Commissioner's advice".
  The key itself is unchanged.
- `sources.js`: replace Whittle et al. (2013) (lessons: [10]).

*Optional:* Winters, G. M., Kaylor, L. E., & Jeglic, E. L. (2022). Toward a
universal definition of child sexual grooming. *Deviant Behavior, 43*(8),
926–938. https://doi.org/10.1080/01639625.2021.1941427 (checked). It proposes
an operational definition. Its abstract doesn't give the definition, so I
haven't proposed wording from it.

### 6. Lesson 1 educators: Dunlosky et al. (2013) → Yang et al. (2021), optional 🔑 🔒

**Why it's optional.** `l1-key-educators` is **attested** (2026-09-24), and its
basis names Dunlosky. Dunlosky (2013) is still the standard review. The gain is
recency and classroom evidence, not AI relevance. If David makes the change, a
Claude session can't touch the attestation block, so David edits or re-attests
it himself.

**Reference (APA 7):** Yang, C., Luo, L., Vadillo, M. A., Yu, R., & Shanks, D. R.
(2021). Testing (quizzing) boosts classroom learning: A systematic and
meta-analytic review. *Psychological Bulletin, 147*(4), 399–435.
https://doi.org/10.1037/bul0000309 (Crossref checked.)

**Finding (abstract):** "hundreds of studies" show the testing effect. In
classrooms, 222 studies with 48,478 students found that quizzing raises
achievement "to a medium extent (g = 0.499)".

**Lesson text, `lessons/lesson-01.js`, educators sentence 1, source field only (key stays `correct`, sentence unchanged):**

- Old: "Dunlosky, J. et al. (2013). Improving students' learning with effective
  learning techniques. Psychological Science in the Public Interest, 14(1),
  4–58. Rates practice testing as high utility."
- New: "Yang, C., Luo, L., Vadillo, M. A., Yu, R., & Shanks, D. R. (2021).
  Testing (quizzing) boosts classroom learning: A systematic and meta-analytic
  review. Psychological Bulletin, 147(4), 399–435. Across 222 classroom studies,
  quizzing raised achievement."

Readability: source cards aren't measured. **Recommendation:** leave this until
David next re-checks Lesson 1, then decide.

### 7. Lesson 10: replace Snook et al. (2007) with Fox & Farrington (2018)

**Why.** The source is ten years newer and much broader. It also supports the
lesson's actual point: look for behaviour that repeats across cases.

**Reference (APA 7):** Fox, B., & Farrington, D. P. (2018). What have we learned
from offender profiling? A systematic review and meta-analysis of 40 years of
research. *Psychological Bulletin, 144*(12), 1247–1274.
https://doi.org/10.1037/bul0000170 (Crossref checked.)

**Finding (abstract):** 426 publications from 1976 to 2016. Few studies built
profiles empirically, and "even fewer evaluations of the effectiveness" exist.
Case linkage research "has yielded moderate to strong accuracy rates for
linking crimes to a single offender".

**`bau-repeated-behavior` (Proposed):**

- Text, last sentence. Old: "Research on the accuracy of criminal profiling has
  found mixed results." New: "Reviews find few tests of whether profiling works,
  but linking crimes to one offender by repeated behavior has shown moderate to
  strong accuracy." This keeps David's choice of no offender detail, since the
  text is shared with the students track.
- Rationale: replace the Snook sentence with the finding above. Keep Douglas and
  Munn (1992) and the FBI terms.
- `sources.js`: replace Snook et al. (2007) (lessons: [10]).

### 8. Lesson 10 professionals: add Cross (2024) beside Whitty (2013)

**Why.** Whitty is still the stage model. Cross describes the form learners now
meet: a relationship used to sell a fake cryptocurrency investment.

**Reference (APA 7):** Cross, C. (2024). Romance baiting, cryptorom and 'pig
butchering': An evolutionary step in romance fraud. *Current Issues in Criminal
Justice, 36*(3), 334–346. https://doi.org/10.1080/10345329.2023.2248670
(Crossref checked: online 2023-09-04, issue 2024.)

**Finding (abstract):** romance fraud and investment fraud have converged.
Offenders offer fake cryptocurrency investments, "using a relationship as the
mechanism". This also distorts how fraud is reported and the prevention
messages people see.

**`scam-stages` (Proposed):**

- Rationale: add the reference and finding above.
- Text, optional second sentence: "Today the request is often a fake
  investment, such as cryptocurrency."
- `l10-key-professionals`: unchanged.
- `sources.js`: add (lessons: [10]).

### 9. Lesson 10: add Paulhus et al. (2021), the Short Dark Tetrad

**Reference (APA 7):** Paulhus, D. L., Buckels, E. E., Trapnell, P. D., & Jones,
D. N. (2021). Screening for dark personalities: The Short Dark Tetrad (SD4).
*European Journal of Psychological Assessment, 37*(3), 208–222.
https://doi.org/10.1027/1015-5759/a000602 (Crossref checked. Crossref gives the
title only as "Screening for Dark Personalities"; check the subtitle on the
article page.)

**Finding (abstract):** "Consensus is emerging that the constellation of dark
personalities should include the sadistic personality". Three studies
(N = 868, 999 and 660) produced 28 items in four subscales, and the four-factor
structure replicated.

**`dark-tetrad` rationale (Proposed; text unchanged):** add this as the current
measure. Keep Buckels et al. (2013) for the lab behaviour the text describes.
`sources.js`: add (lessons: [10]).

### 10. Lesson 10: add Moor & Anderson (2019) to `online-harm-traits`

**Reference (APA 7):** Moor, L., & Anderson, J. R. (2019). A systematic
literature review of the relationship between dark personality traits and
antisocial online behaviours. *Personality and Individual Differences, 144*,
40–55. https://doi.org/10.1016/j.paid.2019.02.027 (Crossref checked. Abstract
read from Semantic Scholar.)

**Finding:** 26 studies link the traits to trolling, cyberbullying, cyberstalking
of partners, unsolicited explicit images, sharing others' sexts without
consent, and problematic internet and social media use. "Psychopathy is the
trait most strongly associated with these behaviours". Machiavellianism and
sadism are consistently related, and narcissism least.

**Change:** add this to the rationale (Proposed). It agrees with Lesson 10's
Dark Tetrad table ("Psychopathy … bullying online"). Keep Buckels et al. (2014)
for "the strongest link to trolling", which is trolling-specific. Goodboy and
Martin (2015) can be dropped, since the review covers it. Still 2019, so this is
broader rather than newer.

### 11. Lesson 7: add Brignull (2023), the book ⚠

**Reference (APA 7):** Brignull, H. (2023). *Deceptive patterns: Exposing the
tricks tech companies use to control you*. Testimonium.

⚠ The publisher and date (July 2023) come from the book's site and a bookseller
listing (ISBN 9781739454401), not a library record.

**Change:** add to the `mindful-ux` rationale. Keep "coined by Harry Brignull
(2010)", because that is history. In `sources.js`, keep the website entry and
add the book (lessons: [7]).

### 12. Lesson 6: cite current editions of the design foundations

David's standing instruction anchors each of his eight principles in
foundational theory, so the originals stay. Where a current edition exists,
cite it as well:

- **Shneiderman (1987)** → Shneiderman, B., Plaisant, C., Cohen, M., Jacobs, S.,
  Elmqvist, N., & Diakopoulos, N. (2016). *Designing the user interface:
  Strategies for effective human-computer interaction* (6th ed.). Pearson. The
  golden rules are in it. Check the year on the copyright page: Pearson's
  listings vary.
- **Friedman (1996)** → add Friedman, B., & Hendry, D. G. (2019). *Value
  sensitive design: Shaping technology with moral imagination*. MIT Press.
  https://doi.org/10.7551/mitpress/7585.001.0001 (Crossref checked.)
- **Nielsen (1994), heuristics** → same page, now shown as "April 24, 1994 ·
  Last reviewed Jan. 30, 2024". Add "(last reviewed January 30, 2024)" to the
  `sources.js` entry.

**Where:** the `design-principles` rationale (Proposed) and `sources.js`. No
lesson text changes.

### 13. Lesson 3 students: keep the sleep guidance, but check AAP (2014) 🔑 if changed

Both sentences cite **the current official recommendation of a professional
body**, not a study, so a newer study would be a step down. The AASM 2016
consensus (8–10 hours for ages 13–18) still stands.

**Check:** AAP policy statements expire after five years unless they are
reaffirmed. I couldn't confirm whether "School start times for adolescents"
(2014) was reaffirmed. The Pediatrics page refused automated access. David
should look on the AAP page.

**If it has lapsed**, the fallback is: Watson, N. F., Martin, J. L., Wise, M. S.,
Carden, K. A., Kirsch, D. B., Kristo, D. A., Malhotra, R. K., Olson, E. J.,
Ramar, K., Rosen, I. M., Rowley, J. A., Weaver, T. E., & Chervin, R. D. (2017).
Delaying middle school and high school start times promotes student health and
performance: An American Academy of Sleep Medicine position statement.
*Journal of Clinical Sleep Medicine, 13*(4), 623–625.
https://doi.org/10.5664/jcsm.6558 (Crossref checked. The PubMed abstract calls
for "start times of 8:30 AM or later".) The wrong sentence would then read "The
American Academy of Sleep Medicine says schools should start no earlier than
7:30 a.m." The key stays `wrong`, and the `l3-key-students` rationale changes.

---

## Keep (with reasons)

These are original laws, regulations, standards, definitions or planted errors,
or the founding study of a term the lesson uses. A newer source wouldn't add
enough to justify the churn.

| Source | Lesson | Reason to keep |
|---|---|---|
| Ebbinghaus (1885) | 1 | It is the planted error: the sentence says 1950s, and the source shows 1885. |
| GDPR, Regulation (EU) 2016/679 | 1, 5 | The law itself, still in force. |
| IAU Resolution B5 (2006) | 5 | The definition itself, still current. |
| Paruthi et al. (2016), AASM | 3 | The current AASM recommendation (see item 13). |
| AAP (2014) | 3 | Keep pending the check in item 13. |
| Nielsen (1993) 🔒 | 6 | Attested (`usability-goals`), and David's standing instruction credits the five goals to Nielsen (1993). |
| Norman & Draper (1986) | 6 | Founding text of user-centred design. ISO 9241-210:2019 is already cited as its current form. |
| Norman (2013) | 6 | Already the revised edition. |
| Nielsen (2012), Usability 101 | 6 | A cross-check for the attested claim. An NN/g page that is kept up to date. |
| Wertheimer (1923) | 6 | Original Gestalt source, and David's chosen anchor for hierarchy. |
| Center for Universal Design (1997) | 6 | The original seven principles. WCAG 2.2 (2023) is already its current companion. |
| ISO 9241-11:2018; ISO 9241-210:2019 | 6 | Current standards. |
| Paulhus & Williams (2002) | 9 | The paper that introduced the Dark Triad. Lesson 9's key sentences turn on its definition. |
| Jones & Paulhus (2014), SD3 | 9 | Still the standard triad measure. The SD4 (item 9) is its tetrad successor. |
| Jonason, Slomski & Partyka (2012); Jonason & Webster (2012) | 9 | The workplace-tactics findings Lesson 9's key cites. I found no newer replication to propose. |
| Vernon et al. (2008) | 9 | The behavioural-genetic study behind the "purely genetic" wrong sentence. I found no newer twin study to propose. Revisit later. |
| Jauk & Dieterich (2019) | 9 | A 2019 review, close to current. |
| Robinson (1950) | 9 | Origin of the ecological fallacy, and the rationale already calls it "the classic related paper". |
| Stark (2007) | 10 | Origin of "coercive control". The Home Office (2023) guidance is already its current legal form. |
| Douglas & Munn (1992) | 10 | The FBI's own source for "signature" behaviour. It keeps the profession's terms, as David asked. |
| Winters & Jeglic (2017) | 10 | The stage model. Item 5 updates its companion source. |
| Whitty (2013) | 10 | The stage model and the near-win finding. Item 8 adds the current form. |
| Buckels et al. (2013); Paulhus (2014) | 10 | Founding evidence for the Dark Tetrad. Item 9 adds the current measure. |
| Buckels, Trapnell & Paulhus (2014) | 10 | The trolling-specific finding in the Tetrad table. Item 10 adds a review. |
| Goodboy & Martin (2015) | 10 | Can be dropped if item 10 is approved. |
| O'Boyle et al. (2012) | 10 | The meta-analysis (245 samples) behind `work-harm-traits`. I found no newer one I could verify. |
| Fowler et al. (2009); Back et al. (2010) | 10, 12 | The thin-slice and first-impression studies behind "trust your gut, check it against behaviour". |
| Sweet (2019) | 12 | The definition Lesson 12 uses, and close to current. |
| Holt-Lunstad et al. (2010) | 8 | Source of the claim's numbers. Item 3 adds the current review and the AI evidence. |

**Sources from 2020 on:** I checked these only for newer versions, which is how
UNICEF (item 2) turned up. UNESCO (2021) is still the current Recommendation;
the ICO Children's Code (2020) is still the code in force; the CISA MFA fact
sheet (2022) is current agency guidance. I did not re-check the rest.

---

## The new "Sources are current" rule (CLAUDE.md, commit 62692d3)

While this review was being written, David added a rule to CLAUDE.md. Sources
should be at most five years old by default, so 2021 or later. For AI tools,
scams, security and platform features the limit is three years (2023 or later),
and for statistics one to two years, with the year in the sentence. Older
sources are allowed only for originals (a law, a standard, a definition, or the
theory a framework is named after), and each must be **paired with a recent
source showing it still holds**. This review used the brief's pre-2020 cut-off,
so the rule changes it in five ways:

- **Proposals 7, 10, 12 and the item 13 fallback are older than five years**:
  Fox & Farrington (2018), Moor & Anderson (2019), Friedman & Hendry (2019),
  Shneiderman et al. (2016) and AASM (2017). They improve on what's there, but
  they don't meet the rule. Treat them as stopgaps, or search again for
  2021-or-later sources.
- **Item 6 is no longer optional.** Under the rule, Dunlosky (2013) needs a
  recent pairing. Yang et al. (2021) provides it, so the attested
  `l1-key-educators` would need David's re-check either way.
- **Originals in the Keep list already paired with a recent source** (once the
  proposals here are applied):
  - Stark (2007) with Home Office (2023);
  - Center for Universal Design (1997) with WCAG 2.2 (2023);
  - Holt-Lunstad et al. (2010) with Holt-Lunstad (2024);
  - Paulhus & Williams (2002), Jones & Paulhus (2014) and Buckels et al. (2013)
    with Paulhus et al. (2021);
  - Winters & Jeglic (2017) with Ringenberg et al. (2022);
  - Whitty (2013) with Cross (2024);
  - Wood & Rünger, by Anderson & Wood (2021).

  Laws and definitions in force (GDPR, IAU B5) and the planted error
  (Ebbinghaus) need no pairing.
- **Still unpaired, needing a further search:**
  - Jonason et al. (2012) ×2, Vernon et al. (2008), O'Boyle et al. (2012),
    Fowler et al. (2009), Back et al. (2010), Jauk & Dieterich (2019) and
    Sweet (2019);
  - Buckels et al. (2014) and Goodboy & Martin (2015);
  - Douglas & Munn (1992), which could pair with the FBI's current Behavioral
    Analysis page;
  - Paruthi et al. (2016) and AAP (2014), which could pair with a current CDC
    or AASM page showing the guidance stands;
  - Nielsen (1993), Shneiderman (1987), Wertheimer (1923), Friedman (1996) and
    Norman & Draper (1986). Under the rule these are the "theory a framework is
    named after", so each needs one recent source showing it still holds.
- **Outside this brief, but caught by the rule's three-year window:** sources
  from 2020 to 2022 on AI tools, scams or security. These are Lewis et al.
  (2020), which is in the attested `retrieval-still-generated`; the FBI PSA
  (2022) on search-ad impersonation; the CISA MFA fact sheet (2022); the FTC
  dark-patterns report (2022); and the NCSC pages dated 2021 and 2022. The
  `relationships-health` figures (148 studies, 50%) are 16 years old, which
  breaks the statistics window. A current figure, for example from the WHO
  Commission on Social Connection (2025), would need reading at source first.
  I did not check it.

---

## Top five, for approval one at a time

1. **Lesson 3 educators: Bloom (1984) → Bastani et al. (2025), PNAS** (item 1).
   The visible wrong sentence becomes a real GPT-4 study read backwards. The
   key stays `wrong`. All text is drafted and within ceilings.
2. **Lesson 8: UNICEF v2.0 (2021) → v3.0 (2025)** (item 2). The course cites a
   superseded edition. The claim says "nine" where v3.0 has ten, and two key
   rationales use old requirement numbers. Confirm the list in the PDF first.
3. **Lesson 8: new claim `ai-companions-loneliness`** (item 3). It answers the
   lesson's own question with AI evidence from both sides: De Freitas et al.
   (2025, JCR) and Fang et al. (2025, preprint, flagged as one). Holt-Lunstad
   (2024) goes into the existing rationale.
4. **Lesson 7: Wood & Rünger (2016) → Anderson & Wood (2021)** (item 4). Habit
   science applied to social media design. Rationale only, no lesson text.
5. **Lesson 10: Whittle et al. (2013) → Ringenberg et al. (2022)** (item 5).
   Grooming strategies before and after the internet. Rationales only; the
   students key is unchanged.

Each needs: the lesson or rationale edits above, `sources.js`, `npm test`, and
David's own check before any claim is attested.
