/**
 * Reading-level consistency across lessons. Ceilings are Lesson 1's measured
 * levels plus modest headroom, so every later lesson reads like the pilot.
 * Flesch–Kincaid grade, heuristic syllables — a guardrail, not a verdict.
 * Passages are written to sound like real AI output, so they sit higher than
 * the text learners and facilitators read from the course itself.
 */
import { describe, it, expect } from "vitest";
import { COURSE, TRACK_IDS } from "../course.js";
import { readability, textRoles } from "./lib/readability.js";

export const CEILINGS = {
  learnerPrompts: 7,
  facilitator: 7,
  key: 7,
  framing: 9,
  relevance: 10,
  "relevance:students": 8,
  passage: 11,
  "passage:students": 10,
  objectives: 11
};
const LONGEST_SENTENCE = 35;

const ceilingFor = (role) => CEILINGS[role] ?? CEILINGS[role.split(":")[0]];

describe.each(COURSE.lessons.filter((l) => l.ready).map((l) => [l.n, l]))("lesson %i reading level", (n, lesson) => {
  const roles = Object.entries(textRoles(lesson, TRACK_IDS));

  it.each(roles)("%s is within its grade ceiling", (role, texts) => {
    const r = readability(texts);
    expect(r.grade, `grade ${r.grade.toFixed(1)} > ${ceilingFor(role)}`).toBeLessThanOrEqual(ceilingFor(role));
  });

  it.each(roles)(`%s has no sentence over ${LONGEST_SENTENCE} words`, (role, texts) => {
    const r = readability(texts);
    expect(r.longest, r.longestSentence).toBeLessThanOrEqual(LONGEST_SENTENCE);
  });
});

it("has a ceiling for every role a lesson produces", () => {
  const lesson = COURSE.lessons.find((l) => l.ready);
  for (const role of Object.keys(textRoles(lesson, TRACK_IDS))) expect(ceilingFor(role), role).toBeTypeOf("number");
});

// The hub's framing is the first thing anyone reads, so it meets the framing ceiling too.
describe("hub framing", () => {
  it("is within the framing grade ceiling, with no sentence over the limit", () => {
    const r = readability([COURSE.tagline, COURSE.framing]);
    expect(r.grade, `grade ${r.grade.toFixed(1)}`).toBeLessThanOrEqual(CEILINGS.framing);
    expect(r.longest, r.longestSentence).toBeLessThanOrEqual(LONGEST_SENTENCE);
  });

  it("gives every lesson card's framing the same ceiling", () => {
    for (const l of COURSE.lessons) {
      const r = readability(l.framing);
      expect(r.grade, `lesson ${l.n}: grade ${r.grade.toFixed(1)}`).toBeLessThanOrEqual(CEILINGS.framing);
      expect(r.longest, `lesson ${l.n}`).toBeLessThanOrEqual(LONGEST_SENTENCE);
    }
  });
});
