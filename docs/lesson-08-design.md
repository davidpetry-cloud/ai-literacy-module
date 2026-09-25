# Lesson 8: Human-Centered AI. Design

**Status:** objectives drafted 2026-09-25, **awaiting David's approval**. Nothing
downstream (warm-up, check, stages) is written until he approves them. Wording
lives in `lessons/lesson-08.js`; this file is the plan. Any change goes back
into this file first.

**David's direction (2026-09-25):** a section on Human-Centered AI built on human
dignity, children's rights, wisdom, ethics and human relationships, with UNESCO
as an organisation promoting humane approaches. The concepts rest on scientific
research and published frameworks, and every factual claim goes through
`claims.js` like the rest of the course. Placement: Lesson 8 of this course
(David, 2026-09-25).

**Model:** Opus if the concrete stage needs a new tool (see "Open questions");
Sonnet if it reuses an existing exercise.

## Objectives (drafts, in `lessons/lesson-08.js`)

- 8.1 *(understand)*: Explain what Human-Centered AI means, using human dignity
  and children's rights as UNESCO and the United Nations describe them.
- 8.2 *(evaluate)*: Judge an AI use by its effect on dignity, children and human
  relationships, and recommend keeping, changing or stopping it.
- 8.3 *(apply)*: Decide where a person, not an AI, must stay in one decision or
  relationship in your own work, and say why.

## What rests on what

Dignity, rights and ethics are **normative**: they come from agreed frameworks,
not experiments. The lesson says so plainly, and cites the framework. Wisdom and
human relationships have an **empirical** research base, and the lesson cites
the studies. Both kinds go into `claims.js` as model proposals for David to attest.

| Concept | Source (checked to exist, 2026-09-25) | What the lesson uses from it |
|---|---|---|
| Human dignity | UNESCO, *Recommendation on the Ethics of Artificial Intelligence* (adopted by 193 member states, Nov 2021) | Respect for human rights and human dignity as the first value; human oversight |
| Human-centred mindset | UNESCO, *AI Competency Framework for Students* and *…for Teachers* (2024) | "Human-centred mindset" is one of four dimensions for students (with ethics of AI, AI techniques and applications, AI system design) |
| Children's rights | UN Committee on the Rights of the Child, *General Comment No. 25* (2021), on children's rights in the digital environment | Children's rights apply online as offline; drafted with input from over 700 children in 27 countries |
| Child-centred AI | UNICEF, *Policy Guidance on AI for Children 2.0* (Nov 2021) | Nine requirements, e.g. support children's development and wellbeing, protect their data and privacy, ensure safety |
| Human-Centered AI as design | Shneiderman, *Human-Centered AI* (Oxford University Press, 2022) | High automation and high human control together, not a trade-off. Already in `docs/ux-foundations.md` |
| The state of AI, and what people think of it | Stanford Institute for Human-Centered Artificial Intelligence (HAI), *AI Index Report 2026* (annual). Suggested by David, 2026-09-25 | Current adoption and public-opinion figures for the relevance hooks, for example 4 in 5 university students using generative AI, and 59% of people saying AI's benefits outweigh its drawbacks while 52% say it makes them nervous. Figures change every year, so these claims get `ttlDays: 365` and are re-checked against the newest edition |
| Wisdom | Grossmann et al. (2020), "The science of wisdom in a polarized world", *Psychological Inquiry* 31(2), 103–133 | The "common wisdom model": balancing viewpoints, epistemic humility, adapting to context, taking several perspectives. Used as the questions in 8.2 |
| Human relationships | Holt-Lunstad, Smith & Layton (2010), *PLoS Medicine* 7(7): e1000316 | Meta-analysis of 148 studies (308,849 people): stronger social relationships, 50% higher odds of survival; comparable to smoking as a risk factor. Why relationships are worth protecting from substitution |

Ethics also draws on value sensitive design (Friedman, 1996), which the
course's wellbeing principle already cites.

## Proposed claims (all `source: "model"`, added at build time)

- `human-dignity-unesco`: UNESCO's 2021 Recommendation, adopted by its 193
  member states, puts respect for human rights and human dignity at its core.
- `children-digital-rights`: General Comment No. 25 (2021) says children's rights
  apply in the digital environment, and sets out what states should do.
- `child-centred-ai`: UNICEF's guidance (2021) sets nine requirements for AI
  that affects children.
- `wisdom-model`: research converges on wisdom as balancing viewpoints, humility,
  adapting to context and taking several perspectives (Grossmann et al., 2020).
- `relationships-health`: stronger social relationships are linked to 50% higher
  odds of survival across 148 studies (Holt-Lunstad et al., 2010). Worded as
  "linked to", not "cause".
- `ai-index-adoption`: Stanford HAI's *AI Index 2026* reports that 4 in 5
  university students use generative AI, and that 59% of people globally say AI
  products offer more benefits than drawbacks, while 52% say they make them
  nervous. `ttlDays: 365`.
- `l8-key-educators`, `l8-key-professionals`, `l8-key-students` once the
  exercise exists.

## Open questions for David (after the objectives)

1. **Concrete stage.** An idea: a set of short, fictional AI uses (a homework
   helper, an AI "friend" app, a hiring screen, a grading tool), different per
   track. Learners judge each with the 8.2 questions and mark keep, change or
   stop. This could reuse the `classify` exercise from Lesson 5, or need a
   small new one.
2. **Children in the students track.** Students may be minors. Their examples
   should be about their own rights and choices, never about judging other
   children.
3. **Voice.** The course stance holds: no hype in either direction. The lesson
   doesn't say AI is bad for dignity; it gives questions to ask of any use.

## Notes

The companion Dark Triad series is planned separately in
`docs/dark-triad-series.md`. Lesson 8 doesn't use the term.
