# Lesson 8: Human-Centered AI. Design

**Status:** objectives and stage design approved by David 2026-09-25, and built
the same day on Opus (`ready: true`). Its ten claims are proposed, awaiting
David's attestation. Wording
lives in `lessons/lesson-08.js`; this file is the plan. Any change goes back
into this file first.

**David's direction (2026-09-25):** a section on Human-Centered AI built on human
dignity, children's rights, wisdom, ethics and human relationships, with UNESCO
as an organisation promoting humane approaches. The concepts rest on scientific
research and published frameworks, and every factual claim goes through
`claims.js` like the rest of the course. Placement: Lesson 8 of this course
(David, 2026-09-25).

**Model:** Opus. The pictorial stage adds a tool (the control-and-automation grid).

**Timing:** warm-up 5, concrete 12, pictorial 10, abstract 8, check 10.

## Objectives (approved 2026-09-25, in `lessons/lesson-08.js`)

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
- `hcai-framework`: Shneiderman (2020, 2022) proposes designing for high human
  control and high automation together, avoiding too much of either.
- `l8-key-educators`, `l8-key-professionals`, `l8-key-students` once the
  exercise exists.

## Warm-up and check (written 2026-09-25)

Each objective has one pre and one post item. The warm-ups surface three
misconceptions: that Human-Centered AI means AI that *seems* human; that a use is
fine if it helps; and that a job should go to the AI if the AI is faster.

## Stages (approved and built 2026-09-25)

**Concrete · Judge the app (12 min), 8.2.** Each track gets a made-up product
page for an AI tool, as if a company had published it, with five numbered
features. It's shown in the sandboxed frame Lessons 6 and 7 use, with a text
version. Learners mark each feature **keep**, **change** or **stop**, and name
what it touches: **dignity**, **children** or **relationships**. At least one
feature is good as it is.
- Educators: an AI homework helper sold to schools.
- Professionals: an AI screening tool for job applications.
- Students: an AI "study buddy" and chat app.

The answer key is a claim (`l8-key-*`), and the keys vary by position across
tracks, as the tests require.

**Pictorial · Who stays in control? (10 min), 8.2 and 8.3.** Shneiderman's
two-dimensional framework (2020, *International Journal of Human-Computer
Interaction* 36(6), 495–504; and the 2022 book) as a grid: **human control**
(low to high) against **automation** (low to high). Each feature from the concrete
stage is placed on it. The picture shows that the aim is **high control and high
automation together**, and names the two ways to go wrong: too much automation,
where no one can step in, and too much human control, where people do by hand
what a tool could do safely. Drawn twice, as SVG and as a table, with a toggle to
reveal the finished grid, like Lesson 6's fix-first grid. Built as the `judge`
exercise and the `control` figure (`controlGrid`, `controlView` in
`lesson-core.js`). The aim square has a dashed outline rather than a fill,
because a fill dropped the grid lines below 3:1. The tests hold the key to the
framework: every kept feature has high human control, and every stopped one low.

**Abstract · Put people first (8 min), 8.1.** The ideas and their sources, in a
reference table:
- **dignity:** UNESCO's Recommendation (2021);
- **children's rights:** UN General Comment No. 25 (2021) and UNICEF's nine
  requirements (2021);
- **relationships:** Holt-Lunstad et al. (2010);
- **wisdom, the four questions for judging any use:** Grossmann et al. (2020):
  balance viewpoints, be humble about what you know, fit the context, take
  several perspectives;
- **how widely AI is used:** Stanford HAI's AI Index (2026), for why it matters now.

The stage says plainly which ideas come from agreed frameworks (dignity, rights)
and which from research findings (relationships, wisdom).

**Use it this week (transfer, Kirkpatrick 3).** Pick one AI use near you and
ask the four wisdom questions. Decide where a person must stay, and tell one
person why. Tracks differ only in the setting: a classroom tool, a workplace
tool, or an app the learner uses.

**Children in the students track.** Students may be minors. Their examples are
about their own rights and choices, never about judging other children.

**Voice.** The course stance holds: no hype in either direction. The lesson
doesn't say AI is bad for dignity; it gives questions to ask of any use.

## Notes

The companion Dark Triad series is planned separately in
`docs/dark-triad-series.md`. Lesson 8 doesn't use the term.
