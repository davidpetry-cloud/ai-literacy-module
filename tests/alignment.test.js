/**
 * Instructional design, enforced. Backward design says objectives come first,
 * then the evidence that each was met, then the activities. A lesson may exist
 * with objectives alone; it may not be marked ready until the rest aligns.
 */
import { describe, it, expect } from "vitest";
import { COURSE, TRACK_IDS, BLOOM, ACCESS_CHANNELS, EVALUATION } from "../course.js";
import { CLAIMS } from "../claims.js";
import { signoffRecord } from "../lesson-core.js";
import { resolveStatus } from "attestation-ledger";

const CPA = ["concrete", "pictorial", "abstract"];
const KEYS = ["correct", "wrong", "no-source", "nothing"];
const TONES = ["confident", "hedged"];
const PARTS = ["task", "context", "constraints", "format"];
const LEVELS = ["glance", "spot", "full"];
const GAPS = ["stated", "vague", "missing"];
// Each exercise type has its own rules; a lesson's concrete stage names its type.
const EXERCISES = ["passage", "prompt-pair", "sign-offs"];
const SIGNOFF_KEYS = ["sound", "not-a-person", "no-basis", "wrong-signer", "lapsed"];
const exerciseOf = (lesson) => lesson.stages.find((s) => s.kind === "concrete").exercise ?? "passage";
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

  it("names a known exercise type, and a pictorial figure that fits it", () => {
    expect(EXERCISES).toContain(exerciseOf(lesson));
    const figure = lesson.stages.find((s) => s.kind === "pictorial").figure;
    expect({ passage: ["confidence-grid", "check-scale"], "prompt-pair": ["prompt-compare"], "sign-offs": ["sign-off"] }[exerciseOf(lesson)]).toContain(figure);
  });

  describe.runIf(exerciseOf(lesson) === "passage")("concrete stage: passage", () => {
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

  describe.runIf(exerciseOf(lesson) === "prompt-pair")("concrete stage: prompt pair", () => {
    const concrete = lesson.stages.find((s) => s.kind === "concrete");
    const pair = (t) => concrete.tracks[t].pair;

    it("has a context and a vague and structured request for every track", () => {
      for (const t of TRACK_IDS) {
        expect(concrete.tracks[t]?.context, t).toBeTruthy();
        expect(pair(t)?.vague?.prompt, t).toBeTruthy();
        for (const p of PARTS) expect(pair(t).structured.parts[p], `${t} ${p}`).toBeTruthy();
        expect(pair(t).vague.output.length, t).toBeGreaterThanOrEqual(3);
        expect(pair(t).structured.output.length, t).toBeGreaterThanOrEqual(3);
      }
    });

    it("records where every pair came from", () => {
      for (const t of TRACK_IDS) {
        const p = pair(t);
        expect(["planted", "captured"], t).toContain(p.provenance);
        expect(p.model, t).toBeTruthy();
        if (p.provenance === "captured") {
          expect(Number.isNaN(new Date(p.captured).getTime()), `${t} capture date`).toBe(false);
        }
      }
    });

    it("keys every part of the vague request, with a reason", () => {
      for (const t of TRACK_IDS) {
        expect(Object.keys(pair(t).vague.gaps).sort(), t).toEqual([...PARTS].sort());
        for (const p of PARTS) {
          expect(GAPS, `${t} ${p}`).toContain(pair(t).vague.gaps[p].key);
          expect(pair(t).vague.gaps[p].note, `${t} ${p}`).toBeTruthy();
        }
      }
    });

    it("doesn't let the gap key be guessed from position", () => {
      const orders = TRACK_IDS.map((t) => PARTS.map((p) => pair(t).vague.gaps[p].key).join());
      for (const o of orders) expect(new Set(o.split(",")).size, o).toBeGreaterThan(1);
      expect(new Set(orders).size, "every track uses the same order").toBeGreaterThan(1);
    });

    it("shows at least one invented detail in every vague output, each with a reason", () => {
      for (const t of TRACK_IDS) {
        const invented = pair(t).vague.output.filter((l) => l.invented);
        expect(invented.length, t).toBeGreaterThanOrEqual(1);
        for (const l of pair(t).vague.output) expect(l.causedBy, l.text).toBeUndefined();
      }
    });

    it("traces every structured line to real parts, or marks it invented — never both", () => {
      for (const t of TRACK_IDS) {
        for (const l of pair(t).structured.output) {
          expect(Boolean(l.causedBy) !== Boolean(l.invented), l.text).toBe(true);
          if (l.invented) expect(typeof l.invented, l.text).toBe("string");
          else {
            expect(l.causedBy.length, l.text).toBeGreaterThan(0);
            for (const c of l.causedBy) expect(PARTS, l.text).toContain(c);
          }
        }
      }
    });

    it("gives every part at least one line it caused, and says what it changed", () => {
      for (const t of TRACK_IDS) {
        for (const p of PARTS) {
          expect(pair(t).structured.output.some((l) => l.causedBy?.includes(p)), `${t} ${p}`).toBe(true);
          expect(pair(t).structured.effects[p], `${t} ${p}`).toBeTruthy();
        }
      }
    });

    it("puts each pair's answer key under a ledger claim", () => {
      for (const t of TRACK_IDS) expect(CLAIMS).toHaveProperty(pair(t).claim);
    });
  });

  describe.runIf(exerciseOf(lesson) === "sign-offs")("concrete stage: sign-offs", () => {
    const concrete = lesson.stages.find((s) => s.kind === "concrete");
    const set = (t) => concrete.tracks[t].signoffs;

    it("has a context and five sign-offs for every track, each fully written", () => {
      for (const t of TRACK_IDS) {
        expect(concrete.tracks[t]?.context, t).toBeTruthy();
        expect(set(t).items, t).toHaveLength(5);
        for (const i of set(t).items) {
          for (const f of ["statement", "by", "role", "note"]) expect(i[f], `${t} ${f}`).toBeTruthy();
          expect(typeof i.basis, i.statement).toBe("string");
          expect(Number.isInteger(i.daysAgo) && i.daysAgo >= 0, i.statement).toBe(true);
        }
      }
    });

    it("records where every document came from", () => {
      for (const t of TRACK_IDS) {
        expect(["planted", "captured"], t).toContain(set(t).provenance);
        expect(set(t).model, t).toBeTruthy();
      }
    });

    it("uses each key exactly once per track", () => {
      for (const t of TRACK_IDS) expect(set(t).items.map((i) => i.key).sort(), t).toEqual([...SIGNOFF_KEYS].sort());
    });

    it("dates the lapsed sign-off well past two years, and every other one well inside it", () => {
      for (const t of TRACK_IDS) {
        for (const i of set(t).items) {
          if (i.key === "lapsed") expect(i.daysAgo, `${t} lapsed`).toBeGreaterThan(760);
          else expect(i.daysAgo, `${t} ${i.key}`).toBeLessThan(365);
        }
      }
    });

    it("gives a no-basis sign-off a basis that names nothing checkable", () => {
      for (const t of TRACK_IDS) {
        const b = set(t).items.find((i) => i.key === "no-basis").basis;
        expect(b.length < 25, `${t}: "${b}"`).toBe(true);
      }
    });

    // The lesson's point: the ledger lets four of five through, and only a person catches them.
    it("matches what the real ledger engine says: only the lapsed one fails its check", () => {
      const now = new Date("2030-01-01");
      for (const t of TRACK_IDS) {
        for (const i of set(t).items) {
          expect(resolveStatus(signoffRecord(i, now), now), `${t} ${i.key}`).toBe(i.key === "lapsed" ? "expired" : "attested");
        }
      }
    });

    it("doesn't let the key be guessed from position", () => {
      const orders = TRACK_IDS.map((t) => set(t).items.map((i) => i.key).join());
      for (const o of orders) expect(o).not.toBe(SIGNOFF_KEYS.join());
      expect(new Set(orders).size, "every track uses the same order").toBe(TRACK_IDS.length);
    });

    it("puts each document's answer key under a ledger claim", () => {
      for (const t of TRACK_IDS) expect(CLAIMS).toHaveProperty(set(t).claim);
    });
  });

  describe.runIf(lesson.stages.find((s) => s.kind === "pictorial").figure === "check-scale")("pictorial stage: check scale", () => {
    const concrete = lesson.stages.find((s) => s.kind === "concrete");
    const uses = (t) => concrete.tracks[t].passage.uses;

    it("gives every track three uses, one at each level of checking, each with a reason", () => {
      for (const t of TRACK_IDS) {
        expect(uses(t).map((u) => u.check).sort(), t).toEqual([...LEVELS].sort());
        for (const u of uses(t)) {
          expect(u.label.length, u.label).toBeLessThanOrEqual(24);
          expect(u.why, u.label).toBeTruthy();
        }
      }
    });

    it("doesn't let the levels be guessed from position", () => {
      const orders = TRACK_IDS.map((t) => uses(t).map((u) => u.check).join());
      for (const o of orders) expect(o).not.toBe(LEVELS.join());
      expect(new Set(orders).size, "every track uses the same order").toBeGreaterThan(1);
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
