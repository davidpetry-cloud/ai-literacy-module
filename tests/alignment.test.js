/**
 * Instructional design, enforced. Backward design says objectives come first,
 * then the evidence that each was met, then the activities. A lesson may exist
 * with objectives alone; it may not be marked ready until the rest aligns.
 */
import { describe, it, expect } from "vitest";
import { COURSE, TRACK_IDS, BLOOM, ACCESS_CHANNELS, EVALUATION } from "../course.js";
import { CLAIMS } from "../claims.js";

const CPA = ["concrete", "pictorial", "abstract"];
const KEYS = ["correct", "wrong", "no-source", "nothing"];
const TONES = ["confident", "hedged"];
// Verbs that name an internal state rather than something you can observe.
const UNMEASURABLE = /^(understand|know|learn|appreciate|be aware|become familiar|grasp|realise|realize)\b/i;

const ready = COURSE.lessons.filter((l) => l.ready);

describe("course", () => {
  it("numbers lessons 1..n with unique slugs", () => {
    COURSE.lessons.forEach((l, i) => expect(l.n).toBe(i + 1));
    const slugs = COURSE.lessons.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has a Kirkpatrick plan for all four levels", () => {
    for (const level of [1, 2, 3, 4]) expect(EVALUATION[level]?.how).toBeTruthy();
  });

  it("has at least one lesson ready", () => {
    expect(ready.length).toBeGreaterThan(0);
  });
});

describe.each(COURSE.lessons.map((l) => [l.n, l]))("lesson %i objectives", (n, lesson) => {
  it("has objectives with ids scoped to the lesson", () => {
    expect(lesson.objectives.length).toBeGreaterThan(0);
    const ids = lesson.objectives.map((o) => o.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id.startsWith(`${n}.`)).toBe(true);
  });

  it("uses a Bloom level and an observable verb for every objective", () => {
    for (const o of lesson.objectives) {
      expect(BLOOM, o.id).toContain(o.bloom);
      expect(o.text, o.id).not.toMatch(UNMEASURABLE);
    }
  });
});

describe.each(ready.map((l) => [l.n, l]))("ready lesson %i", (n, lesson) => {
  const objectiveIds = new Set(lesson.objectives.map((o) => o.id));
  const allTargets = [
    ...lesson.warmup.items.flatMap((i) => i.targets),
    ...lesson.stages.flatMap((s) => s.targets),
    ...lesson.check.items.flatMap((i) => i.targets)
  ];

  it("targets only objectives that exist", () => {
    for (const t of allTargets) expect(objectiveIds, t).toContain(t);
  });

  it("pairs every objective with a pre-check and a post-check item", () => {
    for (const id of objectiveIds) {
      expect(lesson.warmup.items.some((i) => i.targets.includes(id)), `pre ${id}`).toBe(true);
      expect(lesson.check.items.some((i) => i.targets.includes(id)), `post ${id}`).toBe(true);
    }
  });

  it("teaches every objective in at least one stage", () => {
    for (const id of objectiveIds) {
      expect(lesson.stages.some((s) => s.targets.includes(id)), id).toBe(true);
    }
  });

  it("runs concrete, pictorial, abstract in that order", () => {
    expect(lesson.stages.map((s) => s.kind)).toEqual(CPA);
  });

  it("fits the lesson length exactly", () => {
    const total =
      lesson.warmup.minutes +
      lesson.stages.reduce((sum, s) => sum + s.minutes, 0) +
      lesson.check.minutes;
    expect(total).toBe(COURSE.minutes);
  });

  it("gives every stage moves and a watch note", () => {
    for (const s of lesson.stages) {
      expect(s.moves.length, s.kind).toBeGreaterThan(0);
      expect(s.watch, s.kind).toBeTruthy();
    }
  });

  it("gives warm-up items an expected response and check items a reteach criterion", () => {
    for (const i of lesson.warmup.items) expect(i.expected, i.id).toBeTruthy();
    for (const i of lesson.check.items) expect(i.crit, i.id).toBeTruthy();
  });

  it("covers all four ARCS components, with relevance for every track", () => {
    for (const k of ["attention", "confidence", "satisfaction"]) expect(lesson.arcs[k], k).toBeTruthy();
    for (const t of TRACK_IDS) expect(lesson.arcs.relevance[t], t).toBeTruthy();
  });

  it("has an exit ticket (Kirkpatrick 1) and a transfer task per track (Kirkpatrick 3)", () => {
    expect(lesson.check.exit.rating).toBeTruthy();
    expect(lesson.check.exit.open).toBeTruthy();
    for (const t of TRACK_IDS) expect(lesson.transfer[t], t).toBeTruthy();
  });

  it("names a real channel in every access note, once each", () => {
    const channels = lesson.access.map((a) => a.channel);
    expect(channels.length).toBeGreaterThan(0);
    expect(new Set(channels).size).toBe(channels.length);
    for (const a of lesson.access) {
      expect(ACCESS_CHANNELS).toContain(a.channel);
      expect(a.note.length).toBeGreaterThan(40);
    }
  });

  describe("concrete stage", () => {
    const concrete = lesson.stages.find((s) => s.kind === "concrete");

    it("has a context and passage for every track", () => {
      for (const t of TRACK_IDS) {
        expect(concrete.tracks[t]?.context, t).toBeTruthy();
        expect(concrete.tracks[t]?.passage?.sentences?.length, t).toBeGreaterThanOrEqual(3);
      }
    });

    it("records where every passage came from", () => {
      for (const t of TRACK_IDS) {
        const p = concrete.tracks[t].passage;
        expect(["planted", "captured"], t).toContain(p.provenance);
        expect(p.model, t).toBeTruthy();
        if (p.provenance === "captured") {
          expect(Number.isNaN(new Date(p.captured).getTime()), `${t} capture date`).toBe(false);
        }
      }
    });

    it("keys every sentence, and cites a source wherever the key says it was checked", () => {
      for (const t of TRACK_IDS) {
        for (const s of concrete.tracks[t].passage.sentences) {
          expect(KEYS, s.text).toContain(s.key);
          expect(s.note, s.text).toBeTruthy();
          if (s.key === "correct" || s.key === "wrong") expect(s.source, s.text).toBeTruthy();
          else expect(s.source, s.text).toBeNull();
        }
      }
    });

    it("doesn't let the answer key be guessed from position", () => {
      const orders = TRACK_IDS.map((t) => concrete.tracks[t].passage.sentences.map((s) => s.key).join());
      for (const o of orders) expect(o).not.toBe(KEYS.join());
      expect(new Set(orders).size, "every track uses the same order").toBeGreaterThan(1);
    });

    it("puts each passage's answer key under a ledger claim", () => {
      for (const t of TRACK_IDS) expect(CLAIMS).toHaveProperty(concrete.tracks[t].passage.claim);
    });
  });

  it("gives every sentence a tone when the pictorial stage sorts by tone", () => {
    const pictorial = lesson.stages.find((s) => s.kind === "pictorial");
    if (pictorial.figure !== "confidence-grid") return;
    const concrete = lesson.stages.find((s) => s.kind === "concrete");
    for (const t of TRACK_IDS) {
      for (const s of concrete.tracks[t].passage.sentences) expect(TONES, s.text).toContain(s.tone);
    }
  });
});
