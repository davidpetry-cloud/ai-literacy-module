/**
 * Course definition — SOURCE OF TRUTH for what exists.
 *
 * Built by backward design: objectives first, then the evidence that shows
 * each one was met (pre/post checks), then the activities (CPA stages).
 * tests/alignment.test.js enforces that order — a lesson cannot be marked
 * ready until every objective has an activity and a matched pre/post item.
 */

import lesson01 from "./lessons/lesson-01.js";
import lesson02 from "./lessons/lesson-02.js";
import lesson03 from "./lessons/lesson-03.js";
import lesson04 from "./lessons/lesson-04.js";
import lesson05 from "./lessons/lesson-05.js";
import lesson06 from "./lessons/lesson-06.js";
import lesson07 from "./lessons/lesson-07.js";
import lesson08 from "./lessons/lesson-08.js";
import lesson09 from "./lessons/lesson-09.js";
import lesson10 from "./lessons/lesson-10.js";
import lesson11 from "./lessons/lesson-11.js";
import lesson12 from "./lessons/lesson-12.js";

/** One core, three contexts. Only the concrete stage and ARCS relevance vary. */
export const TRACKS = {
  educators: {
    label: "Educators",
    who: "K–12 teachers and school staff using AI for planning, feedback and communication"
  },
  professionals: {
    label: "Professionals",
    who: "Adults using AI at work for writing, research, summaries and analysis"
  },
  students: {
    label: "Students",
    who: "Grades 9–12 learners using AI for study, research and writing"
  }
};

export const TRACK_IDS = Object.keys(TRACKS);

/** Revised Bloom's taxonomy (Anderson & Krathwohl, 2001), lowest to highest. */
export const BLOOM = ["remember", "understand", "apply", "analyze", "evaluate", "create"];

/** Named channels for per-lesson access notes. Never a boilerplate paragraph. */
export const ACCESS_CHANNELS = ["vision", "hearing", "language", "attention", "motor", "memory"];

/**
 * Kirkpatrick evaluation plan. Levels 1–3 are built into every lesson;
 * level 4 belongs to whoever adopts the course, and saying so is more honest
 * than pretending a static site can measure organisational results.
 */
export const EVALUATION = {
  1: {
    name: "Reaction",
    how: "Exit ticket each lesson: a 1–5 relevance rating plus one open question. The rating measures ARCS Relevance directly, so a low score points at the track examples, not the learner."
  },
  2: {
    name: "Learning",
    how: "Parallel pre- and post-check items for every objective. Gain is read per objective, so a flat result names which idea to reteach."
  },
  3: {
    name: "Behavior",
    how: "Each lesson ends with a transfer commitment for the learner's own context, and a two-week follow-up: bring one AI output you used and show what you checked."
  },
  4: {
    name: "Results",
    how: "Out of scope for the course itself. An adopting school or team measures it — for example, errors caught before AI-assisted work was sent, compared with before the course."
  }
};

export const COURSE = {
  title: "Human-Centered AI Literacy",
  tagline: "Using AI well, and protecting the people it touches.",
  framing:
    "Twelve lessons on working with AI the way a careful professional works with any source: knowing what it is, asking it well, checking what it says, deciding who signs off, judging the screens it builds, keeping people at the center, and recognizing manipulation, from people and from AI.",
  minutes: 45,
  lessons: [lesson01, lesson02, lesson03, lesson04, lesson05, lesson06, lesson07, lesson08, lesson09, lesson10, lesson11, lesson12]
};

export function getLesson(n) {
  return COURSE.lessons.find((l) => l.n === Number(n)) ?? null;
}
