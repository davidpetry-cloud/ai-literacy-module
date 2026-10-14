# Source currency review, October 2026

**What this is.** A recommendation, for every source the course cites, to keep
it, replace it, or pair it with a current source, preferably one about AI.
David approves each item one at a time. **Nothing here has been applied.** No
lesson, `claims.js` or `sources.js` file was edited by this review. Every claim
it touches stays **Proposed** until David checks it.

**Why.** On 2026-10-14 David asked to replace Lesson 3's Black & Wiliam (1998)
sentence, which is now Steiss et al. (2024), commit ff612e8. He said: "Overall,
I would prefer to have current sources that are more relevant and up to date
due to the new tech that AI creates." The same day he approved these age
ranges, now in CLAUDE.md under Non-negotiables, "Sources are current":

| Kind of source | Current means |
|---|---|
| Default | Five years or less: **2021 or later** |
| About AI tools, scams, security or platform features | Three years or less: **2023 or later** |
| A statistic | One to two years (**2025 or later**), **with the year in the sentence** |
| Older | Only for originals: a law, a standard, a definition, or the theory a framework is named after. Each is then **paired with a recent source showing it still holds** |

This review applies those ranges to all 114 entries in `sources.js`, and to the
statistics quoted in claim texts.

## Method

- **Inventory.** I listed every entry with its year. 42 are dated before 2020,
  and about a dozen more from 2020 to 2022 fall outside a window. For each one, I traced
  every place a lesson sentence, source card, table row or claim rationale
  relies on it (`lessons/*.js`, `claims.js`).
- **Verification.** Every proposed DOI was checked against Crossref
  (`api.crossref.org/works/<doi>`) on 2026-10-14: authors, year, title, venue,
  volume, issue and pages. Each finding quoted below comes from an abstract I
  read, from Crossref, OpenAlex, Semantic Scholar, PubMed or arXiv. Agency
  figures come from the agency's own page. The exceptions are marked ⚠.
- **Readability.** Proposed lesson text was scored with the course's own
  `readability()` (`tests/lib/readability.js`), applied to an in-memory copy of
  the lesson. That gives the role's grade before and after, against the
  CLAUDE.md ceilings.
- **APA year.** For articles published online before their issue, the year
  given is the issue year, and the online date is noted.

**Flags:**

- 🔑 **Key changes:** a sentence with an answer key changes. The label can stay
  the same while the sentence or source changes. Either way the key claim's
  rationale needs a rewrite and David's check.
- 🔒 **Attested claim:** David has already attested it. A Claude session can't
  touch the attestation block, so David makes that edit and re-checks.
- ⚠ **Caveat:** something I could not fully verify. It is named in the item.
- ✏️ **Correction:** the newer source shows that current course text is wrong
  or overstated, not just old.

Six of the 121 claims are attested. Three are touched here: `l1-key-educators`
(Dunlosky 2013), `usability-goals` (Nielsen 1993) and
`retrieval-still-generated` (Lewis et al. 2020).

---

## Ranked proposals

The ranking weighs three things: whether the course is now wrong (✏️), how
dated the source looks to a learner, and how much the newer source adds,
especially about AI.

| # | Lesson | Now cites | Proposal | Flags |
|---|---|---|---|---|
| 1 | 3 educators | Bloom (1984), the wrong sentence | **Replace** with Bastani et al. (2025), PNAS | 🔑 |
| 2 | 8 | UNICEF (2021) v2.0 | **Replace** with UNICEF (2025) v3.0, which supersedes it: ten requirements, renumbered | ✏️ ⚠ |
| 3 | 9, 10 | Jonason et al. (2012) | **Pair** with Jensen et al. (2022), a direct replication. It did *not* find Machiavellianism linked to soft tactics | ✏️ |
| 4 | 8 | Holt-Lunstad et al. (2010), a 16-year-old statistic | **Replace the statistic** with WHO (2025). **Add** a claim on AI companions and loneliness. **Pair** with Holt-Lunstad (2024) | ⚠ |
| 5 | 1 | Lewis et al. (2020), RAG | **Pair** with Magesh et al. (2025): retrieval-based legal AI tools still hallucinate 17–33% of the time | 🔒 |
| 6 | 8 | Grossmann et al. (2020), wisdom | **Pair** with Smith et al. (2025) and Johnson et al. (2026), "wise machines" | |
| 7 | 7 | Wood & Rünger (2016) | **Replace** with Anderson & Wood (2021), on social media habits | |
| 8 | 10 students | Whittle et al. (2013) | **Replace** with Ringenberg et al. (2022), on grooming before and after the internet | |
| 9 | 7 | FTC (2022), dark patterns | **Pair** with FTC, ICPEN & GPEN (2024): possible dark patterns on 76% of 642 subscription sites and apps | |
| 10 | E2 | FBI PSA (2022), search ads | **Pair** with FBI PSA I-072026-PSA (2026), on "sponsored" imitators | |
| 11 | 10 | O'Boyle et al. (2012), "245 samples" | **Replace the statistic** with Duradoni et al. (2025), a review of 21 papers | |
| 12 | 10 | Buckels et al. (2014); Goodboy & Martin (2015) | **Pair** with Volkmer et al. (2023), a pre-registered trolling replication | ⚠ |
| 13 | 12 | Sweet (2019), gaslighting | **Pair** with March et al. (2025) | |
| 14 | 9 | Jauk & Dieterich (2019), addiction | **Pair** with Refaie et al. (2024), on gambling | |
| 15 | 1 educators | Dunlosky et al. (2013) | **Replace** with Yang et al. (2021), 222 classroom studies | 🔑 🔒 |
| 16 | 10 professionals | Whitty (2013) | **Pair** with Cross (2024), on "pig butchering" | |
| 17 | 10 | Buckels et al. (2013); SD3 (2014) | **Pair** with Paulhus et al. (2021), the Short Dark Tetrad | |
| 18 | 6 | Friedman (1996); Nielsen (1993, 1994); Shneiderman (1987) | **Pair** with Umbrello & van de Poel (2021) for value sensitive design and AI; update the NN/g pages to their review dates (2026, 2024) | |
| 19 | 7 | Brignull (2010), website | **Add** Brignull (2023), the book | ⚠ |
| 20 | various | statistics with no year | **Add the year** to the claim text | |
| 21 | 10 | Snook et al. (2007) | **Interim:** Fox & Farrington (2018). No 2021+ review found | |
| 22 | 3 students | AAP (2014) | **Check** the policy is still in force. Fallback: AASM (2017) | 🔑 if used |

After those, the remaining sources fall into three groups:

- **already paired** with a recent source;
- **exempt**: laws, definitions, and planted errors;
- **unpaired**: older empirical findings for which no 2021-or-later
  replacement turned up in this search.

All three are listed under "Sources not changed".

---

## Proposals in detail

### 1. Lesson 3 educators: replace Bloom (1984) with Bastani et al. (2025) 🔑

**Why.** The wrong sentence is a real paper read wrongly. Bloom's 1984 paper is
the ancestor of today's AI-tutor claims ("2 sigma"). A 2025 field experiment
with GPT-4 teaches the same lesson and gives teachers a finding they need. The
misreading flips the study's direction, which is exactly Lesson 3's trap: a
real source can still say something else.

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
Bastani et al. (2025) should be checked…". Then add a dated line on the change:
the DOI, Crossref, and the abstract figures above.

**Sources:** replace the Bloom (1984) entry (lessons: [3]).

*Considered and set aside:* Kestin et al. (2025), *Scientific Reports, 15*,
17458 (doi:10.1038/s41598-025-97652-6, checked). A custom AI tutor beat
in-class active learning in a physics course. It is a good source, but a
misreading of it is less clear-cut than Bastani's reversed direction.

### 2. Lesson 8: UNICEF v2.0 (2021) is superseded by v3.0 (2025) ✏️ ⚠

**Why.** This is a correctness issue as well as a currency one. UNICEF Innocenti
published *Guidance on AI and children* **version 3.0 in December 2025** at the
same URL the course links. It adds generative AI and AI companions used by
children. It has **ten** requirements, not nine, and they are renumbered.

⚠ I read the list from the UNICEF page through a summarising fetch, not from
the PDF. David should open the PDF and confirm the list, the numbering and the
date before attesting.

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

| Where | Old | New |
|---|---|---|
| `child-centred-ai` text | UNICEF's Policy Guidance on AI for Children (version 2.0, 2021) sets nine requirements for AI that affects children, including supporting their development and wellbeing, protecting their data and privacy, and keeping them safe. | UNICEF's Guidance on AI and Children (version 3.0, 2025) sets ten requirements for AI that affects children, including keeping them safe, protecting their data and privacy, and supporting their development and wellbeing. |
| `child-centred-ai` rationale | …nine requirements… 'Policy guidance on AI for children 2.0' (November 2021). The three named here are requirements 1, 4 and 5… | …ten requirements in UNICEF Innocenti, 'Guidance on AI and children' 3.0 (December 2025), which supersedes 2.0 (2021). The three named here are requirements 2, 3 and 7. It adds AI companions used by children… |
| `l8-key-educators` rationale | chats kept forever (UNICEF requirement 4, data and privacy) | chats kept forever (UNICEF requirement 3, data and privacy) |
| `l8-key-students` rationale | Location and contacts (UNICEF requirements 4 and 5, privacy and safety; … | Location and contacts (UNICEF requirements 2 and 3, safety and privacy; … |
| `sources.js` | UNICEF. (2021). *Policy guidance on AI for children* (Version 2.0). UNICEF Office of Global Insight and Policy. | the reference above |

**What doesn't change:** Lesson 8's table ("The UN and UNICEF, agreed
frameworks"), the keys' verdicts, and `l11-key-students`, which gives no
requirement number. Check whether "developed with the Government of Finland"
still holds for v3.0.

### 3. Lessons 9 and 10: Jonason et al. (2012) and its 2022 replication ✏️

**Why.** The course's claim that Machiavellianism goes with soft tactics rests
on one 2012 study. A 2022 direct replication didn't find that link. It found
Machiavellianism linked to hard tactics only.

**Reference (APA 7):** Jensen, L. D., Patryluk, C., Vinoo, P., & Campbell, L.
(2022). How dark personalities gain workplace influence: A replication and
extension. *Personality and Individual Differences, 190*, Article 111515.
https://doi.org/10.1016/j.paid.2022.111515 (Crossref checked.)

⚠ The abstract was read through the ISB repository page
(eprints.exchange.isb.edu/id/eprint/1675) via a summarising fetch. Two excerpts
were quoted exactly:

- "Machiavellianism was associated with hard tactics, but not soft tactics."
- "Narcissism was associated with both soft and hard tactics."

The study replicates Jonason, Slomski and Partyka (2012), adds the Short Dark
Triad, and finds that psychopathy relies more on threats and punishment, and
less on charm, than Machiavellianism. David should read the abstract on
ScienceDirect (pii S0191886922000186) before attesting.

**Changes (all Proposed):**

| Where | Old | New |
|---|---|---|
| `dark-triad-tactics` text | At work, people higher in psychopathy and Machiavellianism are more likely to use hard tactics such as threats, and people higher in Machiavellianism and narcissism are more likely to use soft tactics such as compliments. | At work, people higher in psychopathy and Machiavellianism are more likely to use hard tactics such as threats, and people higher in narcissism use both hard tactics and soft ones such as compliments. |
| `dark-triad-tactics` rationale | Jonason, Slomski and Partyka (2012)… | add: Jensen et al. (2022), a direct replication. Machiavellianism was linked to hard tactics but not soft ones, so the soft-tactics link is now attributed to narcissism only. |
| Lesson 10, Dark Tetrad table, Machiavellianism, "Where it shows up" | Favors, flattery and pressure. | Pressure, more than charm. |

The Lesson 10 table change moves learnerPrompts from grade 3.33 to 3.24
(ceiling 7).

**Unaffected:** Lesson 9's professionals sentence 1 ("People high in psychopathy
and Machiavellianism are more likely to use threats") is still `correct`, so
its key holds. Add Jensen et al. (2022) to `l9-key-professionals` as a second
check.

The October fact-check chose "Favors, flattery and pressure" from Jonason
(2012). That choice should be revisited in the light of the replication.

### 4. Lesson 8: relationships, with a current statistic and AI evidence ⚠

**Why.** `relationships-health` quotes 148 studies and 50% higher odds from
2010. That is a statistic 16 years old, against a window of one to two years.
Lesson 8's question ("does it take the place of real people?") now has direct
AI evidence, and that evidence is two-sided, which suits the course's stance.

**References (APA 7):**

- World Health Organization. (2025, June 30). *Social connection linked to
  improved health and reduced risk of early death* [News release].
  https://www.who.int/news/item/30-06-2025-social-connection-linked-to-improved-heath-and-reduced-risk-of-early-death
  (The WHO's own URL spells it "heath".)
- Holt-Lunstad, J. (2024). Social connection as a critical factor for mental and
  physical health: Evidence, trends, challenges, and future implications. *World
  Psychiatry, 23*(3), 312–332. https://doi.org/10.1002/wps.21224 (Crossref checked.)
- De Freitas, J., Oğuz-Uğuralp, Z., Uğuralp, A. K., & Puntoni, S. (2025). AI
  companions reduce loneliness. *Journal of Consumer Research, 52*(6), 1126–1148.
  https://doi.org/10.1093/jcr/ucaf040 (Crossref checked.)
- Fang, C. M., Liu, A. R., Danry, V., Lee, E., Chan, S. W. T., Pataranutaporn, P.,
  Maes, P., Phang, J., Lampe, M., Ahmad, L., & Agarwal, S. (2025). *How AI and
  human behaviors shape psychosocial effects of extended chatbot use: A
  longitudinal randomized controlled study* [Preprint]. arXiv.
  https://doi.org/10.48550/arXiv.2503.17473

**Findings:**

- **WHO release (read at source):** loneliness "is linked to an estimated 100
  deaths every hour—more than 871 000 deaths annually", and "1 in 6 people
  worldwide is affected by loneliness". The release lists digital technologies
  among the causes, and urges vigilance around "excessive screen time or
  negative online interactions" for young people. The full Commission report
  is cited in the release but not by title; take the title from the report
  itself.
- **Holt-Lunstad (2024), abstract:** robust evidence that social connection
  independently predicts health, strongest for mortality. Most data is
  observational. The review names digital technologies as a possible cause of
  decline.
- **De Freitas et al. (2025), abstract:** AI companions eased loneliness "on par
  only with interacting with another person", with "momentary reductions" over
  a week. Feeling heard explained most of the effect.
- **Fang et al. (2025), abstract:** four weeks, 981 people. The assigned
  condition had no effect. "Participants who voluntarily used the chatbot more,
  regardless of assigned condition, showed consistently worse outcomes" on four
  measures: loneliness, socialising with real people, emotional dependence and
  problematic use. ⚠ This is a preprint (v2, October 2025) with no journal
  version found. The finding is correlational, because people chose how much to
  use it.

**Changes (all Proposed):**

- **`relationships-health` text.** Old: "Across 148 studies of 308,849 people,
  those with stronger social relationships had about 50% higher odds of
  survival over the study periods, an effect comparable to well-known risk
  factors such as smoking." New: "In 2025 the World Health Organization
  estimated that loneliness is linked to more than 871,000 deaths a year, and
  that about 1 in 6 people worldwide are lonely." In the rationale, keep
  Holt-Lunstad et al. (2010) as the original meta-analysis and add Holt-Lunstad
  (2024).
- **New claim `ai-companions-loneliness`:** "AI companions can ease loneliness in
  the moment. But in a four-week trial with 981 people, those who chose to use
  a chatbot more had worse results on loneliness, time with real people and
  dependence on the AI." The rationale gives the findings above, with the
  preprint caution worded as in `ai-companion-farewells`.
- **Lesson 8 abstract stage:** add `"ai-companions-loneliness"` to `principles`.
  In the "Relationships" row, "Research on health and relationships." becomes
  "Research on health, relationships and AI companions." The learnerPrompts
  grade goes from 2.82 to 2.90 (ceiling 7).
- **`sources.js`:** add the four references (lessons: [8]). Keep Holt-Lunstad et
  al. (2010) as the original.

### 5. Lesson 1: pair Lewis et al. (2020) with Magesh et al. (2025) 🔒

**Why.** `retrieval-still-generated` says a retrieval step still produces
generated text that can misstate its documents. That is Lesson 1's core point,
and it is about AI tools, so the window is three years. Lewis et al. (2020) is
the original RAG paper, so it stays, paired with a 2025 test of commercial RAG
tools.

**Reference (APA 7):** Magesh, V., Surani, F., Dahl, M., Suzgun, M., Manning,
C. D., & Ho, D. E. (2025). Hallucination-free? Assessing the reliability of
leading AI legal research tools. *Journal of Empirical Legal Studies, 22*(2),
216–242. https://doi.org/10.1111/jels.12413 (Crossref checked: online
2025-04-23.)

**Finding (abstract):** this is the first pre-registered evaluation of
RAG-based legal research tools. Hallucinations were lower than for GPT-4, but
Lexis+ AI and Thomson Reuters' tools "each hallucinate between 17% and 33% of
the time". Providers' "hallucination-free" claims "are overstated".

**Change:** add this to the attested claim's basis. That is **David's edit**:
the claim text needs no change, and a session must not touch the attestation
block. Add it to `sources.js` (lessons: [1]). It could also serve Lesson 3,
next to *Mata v. Avianca*, as a current example of checking legal citations.

### 6. Lesson 8: pair Grossmann et al. (2020) with recent wisdom research

**Why.** `wisdom-model` rests on one 2020 review, now six years old. The common
wisdom model is a named theory, so it stays as the original, paired with
recent work.

**References (APA 7):**

- Smith, J. A., Dorfman, A., Wegenschimmel, N., & Grossmann, I. (2025). Wisdom
  reconsidered: A dynamic network account of metacognition and complex
  thought. *Journal of Experimental Psychology: General, 154*(11), 3114–3128.
  https://doi.org/10.1037/xge0001821 (Crossref checked.)
- Johnson, S. G. B., Karimi, A.-H., Bengio, Y., Chater, N., Gerstenberg, T.,
  Larson, K., Levine, S., Mitchell, M., Rahwan, I., Schölkopf, B., & Grossmann,
  I. (2026). Imagining and building wise machines: The centrality of AI
  metacognition. *Trends in Cognitive Sciences, 30*(10), 854–868.
  https://doi.org/10.1016/j.tics.2026.01.002 (Crossref checked. Abstract read
  from the arXiv version, 2411.02478.)

**Findings:**

- **Smith et al. (2025):** the four core metacognitive features are
  "intellectual humility, recognition of uncertainty and change, perspective
  taking, and search for a compromise". These match Lesson 8's four questions:
  humility, context, other views and balance. They vary by situation rather
  than acting as fixed traits.
- **Johnson et al. (2026):** human wisdom is metacognitive strategies like
  "intellectual humility, perspective-taking, or context-adaptability", and AI
  systems "particularly struggle with metacognition".

**Change:** add both to the `wisdom-model` rationale (Proposed; text
unchanged), and add both to `sources.js` (lessons: [8]). Johnson et al. links
the lesson's wisdom questions to AI directly.

### 7. Lesson 7: replace Wood & Rünger (2016) with Anderson & Wood (2021)

**Reference (APA 7):** Anderson, I. A., & Wood, W. (2021). Habits and the
electronic herd: The psychology behind social media's successes and failures.
*Consumer Psychology Review, 4*(1), 83–99. https://doi.org/10.1002/arcp.1063
(Crossref checked: online 2020-11-22, issue January 2021. That puts it at the
edge of the five-year window.)

**Finding (abstract):** social media design "provides cues that automatically
activate habits and nudge continued use", and strong habits make quitting
harder. A 2008 Facebook redesign reduced posting only among habitual users.

**`wellbeing-habits` rationale (Proposed; text unchanged).** Replace the Wood
and Rünger sentence with this reference and finding. Keep "Worded as 'can
support', not 'cause'". In `sources.js`, replace Wood & Rünger (lessons: [7]).

*Optional second source:* Wood, W., Mazar, A., & Neal, D. T. (2022). Habits and
goals in human behavior: Separate but interacting systems. *Perspectives on
Psychological Science, 17*(2), 590–605.
https://doi.org/10.1177/1745691621994226 (checked).

### 8. Lesson 10: replace Whittle et al. (2013) with Ringenberg et al. (2022)

**Reference (APA 7):** Ringenberg, T. R., Seigfried-Spellar, K. C., Rayz, J. M., &
Rogers, M. K. (2022). A scoping review of child grooming strategies: Pre- and
post-internet. *Child Abuse & Neglect, 123*, Article 105392.
https://doi.org/10.1016/j.chiabu.2021.105392 (Crossref checked.)

**Finding (abstract):** 93 papers from 1970 to 2020. Grooming strategies
overlap before and after the internet: enticements, secrecy, isolation and
coercion. Technology "increase[d] accessibility and isolation of the victim".

**Changes (Proposed; claim text and key unchanged):**

- `grooming-stages` rationale: replace the Whittle sentence. Keep Winters and
  Jeglic (2017), now paired, and the FBI podcast line.
- `l10-key-students` rationale: "Whittle et al. (2013)" becomes "Ringenberg et
  al. (2022)".
- `sources.js`: replace Whittle et al. (2013).

*Optional:* Winters, G. M., Kaylor, L. E., & Jeglic, E. L. (2022). Toward a
universal definition of child sexual grooming. *Deviant Behavior, 43*(8),
926–938. https://doi.org/10.1080/01639625.2021.1941427 (checked). Its abstract
doesn't state the definition, so no wording is proposed from it.

### 9. Lesson 7: pair the FTC (2022) report with the 2024 international review

**Reference (APA 7):** Federal Trade Commission. (2024, July 10). *FTC, ICPEN,
GPEN announce results of review of use of dark patterns affecting subscription
services, privacy* [Press release].
https://www.ftc.gov/news-events/news/press-releases/2024/07/ftc-icpen-gpen-announce-results-review-use-dark-patterns-affecting-subscription-services-privacy

**Finding (read at source):** 642 websites and apps offering subscriptions were
reviewed. "Nearly 76%" used at least one possible dark pattern, and "nearly
67%" used several. No findings were made on whether any practice was unlawful.

**Change:** add this to the `mindful-ux` rationale, with an optional sentence
in the claim text: "In a 2024 review of 642 subscription sites and apps,
regulators found possible dark patterns on about three in four." Keep the FTC
(2022) report as the original staff report. `sources.js`: add (lessons: [7]).

### 10. Essentials 2: pair the FBI's 2022 search-ad PSA with its 2026 notice

**Why.** `fake-downloads-fbi` is about scams, so the window is three years. The
2022 PSA is the original warning.

**Reference (APA 7):** Federal Bureau of Investigation. (2026, July 20). *FBI
warns of scammers impersonating the IC3* (Public Service Announcement
I-072026-PSA). Internet Crime Complaint Center.
https://www.ic3.gov/PSA/2026/PSA260720

**Finding (read at source):** "If using a search engine, avoid any 'sponsored'
results as these are usually paid imitators". The notice also warns about
AI-generated promotional videos.

**Change:** add this to the `fake-downloads-fbi` rationale (Proposed) beside the
2022 PSA and OX Security (2025). `sources.js`: add (lessons: [14]).

### 11. Lesson 10: replace O'Boyle et al.'s statistic with a 2025 review

**Reference (APA 7):** Duradoni, M., Gursesli, M. C., Martucci, A., Gonzalez
Ayarza, I. Y., Colombini, G., & Guazzini, A. (2025). Dark personality traits
and counterproductive work behavior: A PRISMA systematic review.
*Psychological Reports, 128*(6), 3939–3966.
https://doi.org/10.1177/00332941231219921 (Crossref checked: online 2023-12-02.)

**Finding (abstract):** a review of 21 papers. The Dark Triad and harmful work
behaviour "are positively associated". "Psychopathy exhibited the strongest
positive association", followed by Machiavellianism and narcissism.

**`work-harm-traits` text (Proposed):**

- Old: "Across 245 samples, harmful behavior at work (counterproductive work
  behavior) rose with all three Dark Triad traits."
- New: "A 2025 review of 21 studies found that harmful behavior at work
  (counterproductive work behavior) rose with all three Dark Triad traits, most
  with psychopathy."

In the rationale, keep O'Boyle et al. (2012) as the original meta-analysis. Add
the new source to `sources.js` (lessons: [10]).

### 12. Lesson 10: pair the trolling and cyberbullying sources ⚠

**Reference (APA 7):** Volkmer, S. A., Gaube, S., Raue, M., & Lermer, E. (2023).
Troll story: The dark tetrad and online trolling revisited with a glance at
humor. *PLOS ONE, 18*(3), Article e0280271.
https://doi.org/10.1371/journal.pone.0280271 (Crossref checked.)

**Finding (abstract):** a pre-registered study of 1,026 people. Trolling
correlates with "all facets of the Dark Tetrad". "Psychopathy and sadism
scores have a significant positive effect on immediate trolling motivation",
while Machiavellianism and narcissism didn't.

**Change:** add this to the `online-harm-traits` rationale (Proposed) as the
recent replication of Buckels et al. (2014). It supports Lesson 10's table
("Everyday sadism … The strongest link to trolling"), with psychopathy beside
it.

For cyberbullying, a 2024 meta-analysis exists: Xu, W., Zhao, B., & Jin, C.
(2024), *Aggression and Violent Behavior, 79*, 101992,
doi:10.1016/j.avb.2024.101992 (Crossref checked). ⚠ I couldn't read its
abstract, so nothing is proposed from it. If its result holds, it would
replace Goodboy and Martin (2015). Moor and Anderson (2019), a systematic
review of 26 studies (doi:10.1016/j.paid.2019.02.027, checked), finds
psychopathy most strongly linked to antisocial online behaviour, but it is now
seven years old.

### 13. Lesson 12: pair Sweet (2019) with March et al. (2025)

**Reference (APA 7):** March, E., Kay, C. S., Dinić, B. M., Wagstaff, D.,
Grabovac, B., & Jonason, P. K. (2025). "It's all in your head": Personality
traits and gaslighting tactics in intimate relationships. *Journal of Family
Violence, 40*(2), 259–268. https://doi.org/10.1007/s10896-023-00582-y (Crossref
checked: online 2023-06-23.)

**Finding (abstract):** gaslighting "includes manipulative tactics such as
misdirection, denial, lying, and contradiction – all to destabilize the
victim/survivor". This is a pre-registered study of 315 people.

**Change:** add this to the `gaslighting-defined` rationale (Proposed; text
unchanged). Sweet (2019) stays as the definition the lesson uses.
`sources.js`: add (lessons: [12]).

### 14. Lesson 9: pair Jauk & Dieterich (2019) with Refaie et al. (2024)

**Reference (APA 7):** Refaie, N., Wuth, A., & Mishra, S. (2024). Benefit
perceptions of risk, dark triad personality traits, and gambling behavior.
*International Gambling Studies, 24*(3), 525–542.
https://doi.org/10.1080/14459795.2024.2307047 (Crossref checked.)

**Finding (abstract):** the Dark Triad traits "have been robustly associated
with increased risk-taking, including gambling". In 293 people they were
linked to gambling decisions in a blackjack task (rs = .27 to .47).

**Change:** add this to the `dark-triad-addiction` rationale (Proposed; text
unchanged, and it still says "a link"). This covers gambling only; I found no
2021+ review on substance use.

### 15. Lesson 1 educators: replace Dunlosky et al. (2013) with Yang et al. (2021) 🔑 🔒

**Why.** The rule needs it: Dunlosky is 13 years old and isn't an original.
`l1-key-educators` is attested and names Dunlosky in its basis, so David
re-checks it. Do this when he next reviews Lesson 1.

**Reference (APA 7):** Yang, C., Luo, L., Vadillo, M. A., Yu, R., & Shanks, D. R.
(2021). Testing (quizzing) boosts classroom learning: A systematic and
meta-analytic review. *Psychological Bulletin, 147*(4), 399–435.
https://doi.org/10.1037/bul0000309 (Crossref checked.)

**Finding (abstract):** "hundreds of studies" show the testing effect. Across
222 classroom studies with 48,478 students, quizzing raises achievement "to a
medium extent (g = 0.499)".

**Lesson text, `lessons/lesson-01.js`, educators sentence 1, `source` only (sentence and key `correct` unchanged):**

- Old: "Dunlosky, J. et al. (2013). Improving students' learning with effective
  learning techniques. Psychological Science in the Public Interest, 14(1),
  4–58. Rates practice testing as high utility."
- New: "Yang, C., Luo, L., Vadillo, M. A., Yu, R., & Shanks, D. R. (2021).
  Testing (quizzing) boosts classroom learning: A systematic and meta-analytic
  review. Psychological Bulletin, 147(4), 399–435. Across 222 classroom
  studies, quizzing raised achievement."

### 16. Lesson 10 professionals: pair Whitty (2013) with Cross (2024)

**Reference (APA 7):** Cross, C. (2024). Romance baiting, cryptorom and 'pig
butchering': An evolutionary step in romance fraud. *Current Issues in
Criminal Justice, 36*(3), 334–346. https://doi.org/10.1080/10345329.2023.2248670
(Crossref checked: online 2023-09-04.)

**Finding (abstract):** romance and investment fraud have converged. Offenders
offer fake cryptocurrency investments "using a relationship as the mechanism".

**Change:** add this to the `scam-stages` rationale. An optional second
sentence in the text: "Today the request is often a fake investment, such as
cryptocurrency." Whitty stays for the stage model and the near-win finding.
`sources.js`: add.

### 17. Lesson 10: pair the Dark Tetrad sources with Paulhus et al. (2021)

**Reference (APA 7):** Paulhus, D. L., Buckels, E. E., Trapnell, P. D., & Jones,
D. N. (2021). Screening for dark personalities: The Short Dark Tetrad (SD4).
*European Journal of Psychological Assessment, 37*(3), 208–222.
https://doi.org/10.1027/1015-5759/a000602 (Crossref checked. Crossref gives
only "Screening for Dark Personalities", so check the subtitle.)

**Finding (abstract):** "Consensus is emerging that the constellation of dark
personalities should include the sadistic personality". Three studies
produced four seven-item subscales, and the structure replicated.

**Change:** add this to the `dark-tetrad` and `dark-triad-measure` rationales.
It pairs Buckels et al. (2013), Paulhus (2014) and Jones and Paulhus (2014).
Paulhus and Williams (2002) stays as the original definition.

### 18. Lesson 6: pair the design foundations

David's standing instruction anchors each of his eight principles in
foundational theory. The originals stay; each gets a recent pairing:

- **Nielsen (1993)** 🔒 (attested `usability-goals`): NN/g's *Usability 101*
  still lists the same five components, and is now marked "Last reviewed Jul.
  15, 2026" (read at source). In `sources.js`, change "Nielsen, J. (2012)" to
  show the review date. This pairing needs no change to the attested claim.
- **Nielsen (1994), heuristics:** the page is marked "Last reviewed Jan. 30,
  2024" (read at source). Add the review date.
- **Friedman (1996), value sensitive design:** add Umbrello, S., & van de Poel,
  I. (2021). Mapping value sensitive design onto AI for social good
  principles. *AI and Ethics, 1*(3), 283–296.
  https://doi.org/10.1007/s43681-021-00038-3 (Crossref checked). The abstract
  says AI "poses a number of challenges specific to VSD that require a
  somewhat modified VSD approach". The book Friedman & Hendry (2019, MIT Press,
  doi:10.7551/mitpress/7585.001.0001) is the fuller original.
- **Shneiderman (1987):** the current edition is Shneiderman, Plaisant, Cohen,
  Jacobs, Elmqvist and Diakopoulos (2016), *Designing the user interface*
  (6th ed.), Pearson. Check the year on the copyright page. It is still outside
  five years; Shneiderman (2022), already cited, keeps the user-control idea
  current.
- **Wertheimer (1923), Norman & Draper (1986), Center for Universal Design
  (1997):** originals. The last two are paired by ISO 9241-210:2019 and WCAG
  2.2 (2023). I found no 2021+ review of Gestalt grouping, and the ISO page
  refused automated access, so its review status is unchecked.

Changes go in the `design-principles` rationale (Proposed) and `sources.js`. No
lesson text changes.

### 19. Lesson 7: add Brignull (2023), the book ⚠

Brignull, H. (2023). *Deceptive patterns: Exposing the tricks tech companies use
to control you*. Testimonium.

⚠ The publisher and July 2023 date come from the book's site and a bookseller
listing (ISBN 9781739454401), not a library record.

Add it to the `mindful-ux` rationale and keep "coined … (2010)" as history.

### 20. Statistics missing the year in the sentence

The rule wants the year in the sentence. These Proposed claim texts quote a
recent figure without one:

| Claim | Add |
|---|---|
| `ai-companion-farewells` | "In a 2025 study of AI companion apps, …" |
| `darkbench-patterns` | "In one 2025 benchmark, …" |
| `fake-ai-extensions-example` | "In late 2025, a security company reported …" (OX Security, 30 December 2025) |
| `child-helplines` | "… is a global network of 155 child helplines in 133 countries (2026), …". Re-check the figures on the page first. |

`ai-index-adoption` already names "AI Index 2026".

### 21. Lesson 10: Snook et al. (2007), interim only

Fox, B., & Farrington, D. P. (2018). What have we learned from offender
profiling? A systematic review and meta-analysis of 40 years of research.
*Psychological Bulletin, 144*(12), 1247–1274. https://doi.org/10.1037/bul0000170
(Crossref checked.)

**Finding (abstract):** 426 publications. There are few tests of effectiveness,
but case linkage shows "moderate to strong accuracy rates for linking crimes
to a single offender".

**Proposed `bau-repeated-behavior` last sentence:** "Reviews find few tests of
whether profiling works, but linking crimes to one offender by repeated
behavior has shown moderate to strong accuracy."

This is ten years newer than Snook, but still outside five years. I found no
2021+ review. Douglas and Munn (1992) stays, paired with the FBI's own
Behavioral Analysis page.

### 22. Lesson 3 students: check AAP (2014) 🔑 if changed

Both sentences cite **a professional body's standing recommendation**. The
AASM consensus (8–10 hours for ages 13–18; Paruthi et al., 2016) is still what
the CDC's student sleep page cites, though that page is now archived.

AAP policy statements expire after five years unless reaffirmed. I couldn't
confirm whether the 2014 statement was reaffirmed, because the Pediatrics page
refused automated access. David should check the AAP page.

**If it has lapsed**, the fallback is Watson, N. F., et al. (2017). Delaying
middle school and high school start times promotes student health and
performance: An American Academy of Sleep Medicine position statement.
*Journal of Clinical Sleep Medicine, 13*(4), 623–625.
https://doi.org/10.5664/jcsm.6558 (Crossref checked. The PubMed abstract calls
for "8:30 AM or later".) The wrong sentence would then read "The American
Academy of Sleep Medicine says schools should start no earlier than 7:30 a.m."
The key stays `wrong`. That source is also outside five years. A current law,
such as California's 8:30 a.m. rule for high schools, could be the recent
pairing; I haven't verified it.

---

## Sources not changed

**Exempt (law, definition, standard, or planted error):**

- Ebbinghaus (1885): the planted wrong date.
- Regulation (EU) 2016/679 (GDPR), the Digital Services Act (2022), the AI Act
  (2024) and *Mata v. Avianca* (2023).
- CJEU C-311/18 (2020) and EC decision C(2023) 4745: dated legal facts in
  Lesson 5's notes.
- IAU Resolution B5 (2006): the definition.
- The ICO Children's Code (2020), the code in force.
- UNESCO Recommendation (2021): normative, and paired by UNESCO (2023).
- CRC General Comment 25 (2021).
- ISO 9241-11:2018 and ISO 9241-210:2019: standards.
- DSM-5-TR (2022).
- Robinson (1950): a statistical principle the rationale already calls "the
  classic related paper".

**Already paired with a recent source:**

| Original | Paired by |
|---|---|
| Stark (2007) | Home Office (2023) |
| Shneiderman (2020) | Shneiderman (2022) |
| NCSC 2021 and 2022 pages | CISA training page (retrieved 2026) and FTC (2024) |
| CISA MFA fact sheet (2022) | CISA CPG 2.0 (retrieved 2026) and NIST SP 800-63B-4 (2025) |
| FTC hacked-account page (2023) | FTC (2024) |
| Kandpal et al. (2023); Walters & Wilder (2023); Sharma et al. (2023); UNESCO (2023); NCSC (2023); Puig (2023); FTC Robocalls (2023) | none needed: they sit at the edge of the three-year window |

Re-check these 2023 sources next year.

**Paired once the proposals above are applied:**

| Original | Item |
|---|---|
| Jonason ×2 (2012) | 3 |
| Holt-Lunstad (2010) | 4 |
| Lewis (2020) | 5 |
| Grossmann (2020) | 6 |
| FTC (2022) | 9 |
| FBI PSA (2022) | 10 |
| O'Boyle (2012) | 11 |
| Buckels (2014) | 12 |
| Sweet (2019) | 13 |
| Jauk (2019) | 14 |
| Whitty (2013) | 16 |
| Paulhus & Williams (2002), SD3 (2014), Buckels (2013), Paulhus (2014) | 17 |
| Winters & Jeglic (2017) | 8 |
| Nielsen (1993, 1994); Friedman (1996) | 18 |
| Brignull (2010) | 19 |

**Unpaired: no 2021+ source found in this search.**

| Source | Lesson | Note |
|---|---|---|
| Vernon et al. (2008), twin study | 9 | The key source for the "purely genetic" wrong sentence. Behavioural-genetic studies of the Dark Triad are rare; a PsycINFO search may find one. |
| Fowler et al. (2009); Back et al. (2010) | 10, 12 | Thin-slice and first-impression findings behind "trust your gut, check it against behaviour". Only a 2025 thesis turned up. |
| Goodboy & Martin (2015) | 10 | Drop it once the Xu et al. (2024) meta-analysis is read (item 12). |
| Snook et al. (2007); Fox & Farrington (2018) | 10 | Item 21. |
| Wertheimer (1923); Shneiderman (1987, 2016 ed.) | 6 | Item 18. |
| Paruthi et al. (2016); AAP (2014); AASM (2017) | 3 | Item 22. |

These need David's call: keep them as named originals with a dated note, or
search further.

---

## Top five, for approval one at a time

1. **Lesson 3 educators: Bloom (1984) → Bastani et al. (2025), PNAS** (item 1).
   The visible wrong sentence becomes a real GPT-4 study read backwards. The
   key stays `wrong`. All text is drafted and within ceilings.
2. **Lesson 8: UNICEF v2.0 (2021) → v3.0 (2025)** (item 2). The course cites a
   superseded edition. The claim says "nine" where v3.0 has ten, and two key
   rationales use old numbers. Confirm the list in the PDF first.
3. **Machiavellianism and soft tactics** (item 3). A 2022 direct replication
   didn't find the link. This means one claim sentence and one Lesson 10 table
   cell; the Lesson 9 key holds.
4. **Lesson 8: relationships** (item 4). The 2010 statistic becomes WHO (2025),
   with the year in the sentence. A new `ai-companions-loneliness` claim brings
   AI evidence from both sides; Fang et al. is a preprint and is flagged as
   one.
5. **Lesson 1: Lewis et al. (2020) + Magesh et al. (2025)** (item 5). A 2025
   test found commercial RAG legal tools still hallucinate 17–33% of the time.
   This is David's own edit to an attested basis, and the text is unchanged.

Each needs the edits above, `sources.js`, `npm test`, and David's own check
before any claim is attested.
