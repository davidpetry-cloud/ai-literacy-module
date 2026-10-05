# Fact recheck, October 2026

**Done:** 2026-10-05, after the full UX/UI audit, at David's request: recheck the
information and factual references in every lesson, and make sure the lessons are
objective and grounded in scientific study (behavioral science, forensic
psychology and related fields).

This is a model review, not an attestation. Only David attests claims.

## How it was checked

1. **Lesson text, not just claims.** Every lesson was scanned for dates, numbers,
   named studies, laws and phrases such as "research shows". Each hit was sorted
   into: backed by a claim; planted on purpose (made-up sources learners must
   catch, which the page says are made up); a prompt that asks learners to check
   something without asserting it; or a statement that needed a source or a fix.
2. **Claims against sources.** Lessons 1–7 (50 claims) were reviewed in
   `docs/claims-review.md` and fixed then. Lessons 8–12 (44 claims) were checked
   against their sources as they were written, 2026-09-25 to 2026-10-05; links
   and page numbers are in each claim's rationale.
3. **Evidence type.** Each topic is matched to the field it rests on, and anything
   that is a framework, a law or practical advice is labelled as such on the page,
   not presented as a research finding.

## What each lesson rests on

| Lesson | Field | Main sources |
|---|---|---|
| 1 What a model does | Computer science (language models); cognitive science | Jurafsky & Martin; Lewis et al. 2020; Xiong et al. 2024; Walters & Wilder 2023; Kandpal et al. 2023 |
| 2 Asking well | Applied AI practice | Model claims (prompt parts), reviewed |
| 3 Checking what it says | Information literacy; educational research | Black & Wiliam 1998; citation-error studies |
| 4 Who signs off | Professional practice; governance | The attestation-ledger engine; practice in fact-checking and clinical guidelines |
| 5 How it goes wrong | AI evaluation; bias research | Model claims, reviewed; dated facts checked (2006, 2020, 2023, 2024) |
| 6 Judging what AI builds | Human–computer interaction | Nielsen 1993 (attested); design-principle sources |
| 7 Accessible and mindful UX | Accessibility standards; behavioral science (habits, deceptive design) | WCAG 2.2 (W3C 2023); FTC 2022; EU DSA Art. 25; Wood & Rünger 2016 |
| 8 Human-Centered AI | Ethics frameworks (normative); psychology of wisdom; health research; HCI | UNESCO 2021, 2024; UN GC25; UNICEF 2021; Shneiderman 2020, 2022; Grossmann et al. 2020; Holt-Lunstad et al. 2010; Stanford HAI 2026 |
| 9 What the Dark Triad is | Personality psychology; behavioral genetics; clinical psychiatry | Paulhus & Williams 2002; Jones & Paulhus 2014; Jonason et al. 2012; Vernon et al. 2008; Jauk & Dieterich 2019; DSM-5-TR; Robinson 1950 |
| 10 Spot the pattern | Forensic psychology; criminology and law; personality psychology | Stark 2007; Home Office 2023; Winters & Jeglic 2017; Whittle et al. 2013; Whitty 2013; Buckels et al. 2013, 2014; Goodboy & Martin 2015; O'Boyle et al. 2012; Fowler et al. 2009; Back et al. 2010; FBI BAU; Douglas & Munn 1992; Snook et al. 2007 |
| 11 When AI manipulates | AI evaluation; behavioral science | De Freitas et al. 2025 (working paper); Sharma et al. 2023; Kran et al. 2025 |
| 12 Protect yourself | Sociology of abuse; safeguarding guidance; law enforcement guidance | Sweet 2019; KCSIE 2026; US mandated reporting; FBI and NCMEC; Child Helpline International |

## Fixed in this recheck

| Where | Was | Now | Why |
|---|---|---|---|
| Lesson 10, scam moment | "Scam research finds this order again and again." | "Research on romance scams describes this same order." | One interview study (Whitty 2013, 20 people). "Again and again" overstated it. |
| Lesson 10, Dark Tetrad table | Machiavellianism: "Secrecy, favors, pressure." | "Favors, flattery and pressure." | The cited research (Jonason et al. 2012) links Machiavellianism to soft and hard tactics; secrecy was not one of its findings. |
| Lesson 11, reasons table | "Apps are judged on time and money" | "Many apps are judged on time spent and money" | A generalization about every app; the evidence covers companion apps and engagement-measured products. |
| Lesson 12, disclosure key | "The school safeguarding guidance is clear on this." | "School safeguarding guidance, such as England's, is clear on this." | KCSIE is England's guidance; the course is international. |
| Lesson 8, sources table | People in control: "Research on design (Shneiderman)." | "A design framework (Shneiderman)." | Shneiderman's work is a design framework and argument, not an empirical finding. |
| Lesson 10, abstract | The FBI's BAU was in the plan but not on the page. | A facilitator line and a new claim, `bau-repeated-behavior`, with the caveat that profiling accuracy is contested. | David asked for it (2026-09-25). Worded without offender detail, as he chose, because the abstract is shared with students. |
| Lesson 9, `trait-not-diagnosis` | DSM-5-TR "to check" | Criteria counts recorded (NPD 5 of 9; ASPD 3 of 7) | Checked 2026-10-05 through clinical sources. |

## Checked and left as they are

- **Planted errors are labeled.** Every made-up study, survey and citation sits in
  a passage whose caption says it was written for the lesson with errors planted
  on purpose, and its key says so.
- **Prompts that ask learners to check facts** (Eiffel Tower, the Universal
  Declaration of Human Rights) don't assert those facts.
- **Dated facts** in Lesson 5's notes are right: Pluto reclassified 2006; Privacy
  Shield struck down 2020 and replaced 2023; the SAT digital in the US from spring
  2024.
- **Frameworks versus findings** are labeled in Lesson 8 (dignity and rights are
  agreed frameworks; relationships and wisdom have research behind them) and
  Lesson 12 (protecting your work is practical advice, not a research finding).

## Cautions for attesting

- `ai-companion-farewells` rests on a working paper, not yet peer reviewed.
- `ai-index-adoption`, `never-promise-secrecy`, `mandated-reporting-us`,
  `sextortion-advice` and `child-helplines` change with new editions or law:
  attest with `ttlDays: 365`.
- The `l*-key-*` claims for made-up exercises (Lessons 8, 10, 11, 12) are
  judgements: attest that each key is reasonable, or propose a different one.
- `gut-feeling-evidence` uses an inmate sample (Fowler et al. 2009) and one first-
  impressions study (Back et al. 2010); the lesson words it as a signal to check,
  not proof.
