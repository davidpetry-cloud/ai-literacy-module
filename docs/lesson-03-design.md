# Lesson 3: Checking what it says. Design

**Status:** approved 2026-09-23. Built on Sonnet; the design lives in
`lessons/lesson-03.js`, which is the source of truth for wording.

**Timing:** warm-up 5, concrete 14, pictorial 8, abstract 8, check 10.

**Objectives** (approved 2026-09-23): 3.1 apply, check a claim against an
independent primary source; 3.2 evaluate, judge whether a cited source exists
and supports its claim; 3.3 evaluate, decide how much verification an output
needs from the stakes of its use.

**Concrete:** the Lesson 1 passage exercise, with a named source on every
sentence except the "nothing" one. *Correct*: the source exists and says it.
*Wrong*: the source exists but says something else. *No source*: the cited
source doesn't exist. Source cards say what the real source says.

**Pictorial:** `check-scale`. Each track's passage has three `uses`, each with
one level of checking (glance, spot-check, full check). Learners pick a level
per use, then reveal the grid. Rows are out of order so the answer isn't a
diagonal. Only the uses' text varies by track.

**Abstract:** `independent-source`, `citations-unreliable`,
`check-fits-stakes`, and Lesson 1's `risk-zones`.

**Changes to shared code:** `checkScale()` and `LEVELS` in `lesson-core.js`;
`wireGrid` takes a draw function; the alignment test allows `check-scale` for
passage lessons and checks each track's `uses`; the readability text roles
count the uses; the SVG label-size test measures both grids.

**Claims:** three principles and three answer keys, all `source: "model"`,
proposed by `claude-sonnet-5`. The use levels are judgements about
consequences, and they sit under the key claims.
