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
const EXERCISES = ["passage", "prompt-pair", "sign-offs", "classify", "screen"];
const PRINCIPLES = ["user-centricity", "consistency", "hierarchy", "context", "user-control", "accessibility", "usability"];
const GOALS = ["learnability", "efficiency", "memorability", "errors", "satisfaction"];
const ERROR_KEYS = ["fabrication", "outdated", "bias", "misread", "fine"];
const KINDS = ["fabrication", "outdated", "bias", "misread"];
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
    expect({ passage: ["confidence-grid", "check-scale"], "prompt-pair": ["prompt-compare"], "sign-offs": ["sign-off"], classify: ["checklist"], screen: ["fix-first"] }[exerciseOf(lesson)]).toContain(figure);
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

  describe.runIf(exerciseOf(lesson) === "screen")("concrete stage: screen", () => {
    const concrete = lesson.stages.find((s) => s.kind === "concrete");
    const screen = (t) => concrete.tracks[t].screen;

    it("has a context, a titled screen and six numbered parts for every track", () => {
      for (const t of TRACK_IDS) {
        expect(concrete.tracks[t]?.context, t).toBeTruthy();
        expect(screen(t).title, t).toBeTruthy();
        expect(screen(t).parts, t).toHaveLength(6);
        for (const [i, p] of screen(t).parts.entries()) {
          for (const f of ["label", "desc", "note"]) expect(p[f], `${t} part ${i + 1} ${f}`).toBeTruthy();
          // Every part is numbered on the screen, so learners can find it.
          expect(screen(t).html, `${t} marks part ${i + 1}`).toContain(`<span class="n">${i + 1}</span>`);
        }
      }
    });

    it("records where every screen came from", () => {
      for (const t of TRACK_IDS) {
        expect(["planted", "captured"], t).toContain(screen(t).provenance);
        expect(screen(t).model, t).toBeTruthy();
      }
    });

    // The frame is meant to be flawed, and sits outside the page audit. What it may not do is reach out.
    it("keeps every screen self-contained: no external URLs, no loaded scripts or styles", () => {
      for (const t of TRACK_IDS) {
        const html = screen(t).html;
        expect(html, t).not.toMatch(/https?:\/\/|\/\/[a-z]/i);
        expect(html, t).not.toMatch(/<script[^>]+src=|<link[^>]+href=|<img|@import/i);
        expect(screen(t).height, t).toBeGreaterThan(200);
      }
    });

    it("has five parts that each break a different principle, and one that works", () => {
      for (const t of TRACK_IDS) {
        const keys = screen(t).parts.map((p) => p.principle);
        expect(keys.filter((k) => k === "fine"), t).toHaveLength(1);
        const broken = keys.filter((k) => k !== "fine");
        expect(new Set(broken).size, t).toBe(5);
        for (const k of broken) expect(PRINCIPLES, `${t} ${k}`).toContain(k);
      }
    });

    it("covers every principle across the three tracks", () => {
      const used = new Set(TRACK_IDS.flatMap((t) => screen(t).parts.map((p) => p.principle)));
      for (const p of PRINCIPLES) expect(used, p).toContain(p);
    });

    it("names a goal, a harm and a reach for every problem, and none for the part that works", () => {
      for (const t of TRACK_IDS) {
        for (const p of screen(t).parts) {
          if (p.principle === "fine") {
            for (const f of ["goal", "also", "harm", "reach"]) expect(p[f], `${t} fine ${f}`).toBeUndefined();
            continue;
          }
          expect(GOALS, `${t} ${p.label}`).toContain(p.goal);
          if (p.also) expect(GOALS.filter((g) => g !== p.goal), `${t} ${p.label}`).toContain(p.also);
          expect(["high", "medium", "low"], `${t} ${p.label}`).toContain(p.harm);
          expect(["few", "some", "all"], `${t} ${p.label}`).toContain(p.reach);
        }
      }
    });

    it("doesn't let the key be guessed from position", () => {
      const fine = TRACK_IDS.map((t) => screen(t).parts.findIndex((p) => p.principle === "fine"));
      expect(new Set(fine).size, "the part that works is in the same place in every track").toBe(TRACK_IDS.length);
      const orders = TRACK_IDS.map((t) => screen(t).parts.map((p) => p.principle).join());
      expect(new Set(orders).size).toBe(TRACK_IDS.length);
    });

    it("puts each screen's answer key under a ledger claim", () => {
      for (const t of TRACK_IDS) expect(CLAIMS).toHaveProperty(screen(t).claim);
    });
  });

  describe.runIf(exerciseOf(lesson) === "classify")("concrete stage: classify", () => {
    const concrete = lesson.stages.find((s) => s.kind === "concrete");
    const set = (t) => concrete.tracks[t].classify;

    it("has a context, a request and five answer sentences for every track", () => {
      for (const t of TRACK_IDS) {
        expect(concrete.tracks[t]?.context, t).toBeTruthy();
        expect(set(t).request, t).toBeTruthy();
        expect(set(t).items, t).toHaveLength(5);
        for (const i of set(t).items) {
          expect(i.text, t).toBeTruthy();
          expect(i.note, i.text).toBeTruthy();
        }
      }
    });

    it("records where every request and answer came from", () => {
      for (const t of TRACK_IDS) {
        expect(["planted", "captured"], t).toContain(set(t).provenance);
        expect(set(t).model, t).toBeTruthy();
        if (set(t).provenance === "captured") expect(Number.isNaN(new Date(set(t).captured).getTime()), `${t} capture date`).toBe(false);
      }
    });

    it("uses each key exactly once per track, so 'mark everything' loses", () => {
      for (const t of TRACK_IDS) expect(set(t).items.map((i) => i.key).sort(), t).toEqual([...ERROR_KEYS].sort());
    });

    it("cites a source for the outdated sentence and for no other", () => {
      for (const t of TRACK_IDS) {
        for (const i of set(t).items) {
          if (i.key === "outdated") expect(i.source, `${t} outdated`).toBeTruthy();
          else expect(i.source, `${t} ${i.key}`).toBeNull();
        }
      }
    });

    it("gives the misread sentence a rule that appears word for word in the request", () => {
      for (const t of TRACK_IDS) {
        for (const i of set(t).items) {
          if (i.key === "misread") expect(set(t).request, `${t} rule`).toContain(i.rule);
          else expect(i.rule, `${t} ${i.key}`).toBeUndefined();
        }
      }
    });

    it("doesn't let the key be guessed from position", () => {
      const orders = TRACK_IDS.map((t) => set(t).items.map((i) => i.key).join());
      for (const o of orders) expect(o).not.toBe(ERROR_KEYS.join());
      expect(new Set(orders).size, "every track uses the same order").toBe(TRACK_IDS.length);
      for (const p of [0, 1, 2, 3, 4]) {
        expect(new Set(TRACK_IDS.map((t) => set(t).items[p].key)).size, `position ${p} is the same in every track`).toBeGreaterThan(1);
      }
    });

    it("puts each answer key under a ledger claim", () => {
      for (const t of TRACK_IDS) expect(CLAIMS).toHaveProperty(set(t).claim);
    });

    // The answer is judged against its own request, so it must keep the request's
    // word limit, or it hides an extra misread the key doesn't mention.
    it("keeps every answer inside its request's word limit", () => {
      for (const t of TRACK_IDS) {
        const limit = Number(set(t).request.match(/under (\d+) words/)?.[1]);
        expect(limit, `${t} states a word limit`).toBeGreaterThan(0);
        const words = set(t).items.reduce((n, i) => n + i.text.split(/\s+/).length, 0);
        expect(words, `${t}: ${words} words, limit under ${limit}`).toBeLessThan(limit);
      }
    });

    // A "No error" sentence may say only what the request said. Anything more is
    // something the model added, which is the very thing the lesson teaches.
    it("builds every 'No error' sentence only from words in the request", () => {
      const STOP = new Set(["about", "there", "their", "these", "those", "which", "would", "could", "should", "other", "every", "after", "before"]);
      const stems = (text) => text.toLowerCase().replace(/[’']/g, "'").match(/[a-z0-9$:]+/g) ?? [];
      for (const t of TRACK_IDS) {
        const request = new Set(stems(set(t).request).map((w) => w.slice(0, 5)));
        const fine = set(t).items.find((i) => i.key === "fine").text;
        const extra = stems(fine).filter((w) => w.length > 3 && !STOP.has(w) && !request.has(w.slice(0, 5)));
        expect(extra, `${t}: "${fine}"`).toEqual([]);
      }
    });

    it("varies the kind of rule each track's misread sentence breaks", () => {
      const rules = TRACK_IDS.map((t) => set(t).items.find((i) => i.key === "misread").rule);
      expect(new Set(rules).size).toBe(TRACK_IDS.length);
      expect(new Set(rules.map((r) => r.split(" ").slice(0, 2).join(" "))).size, rules.join(" | ")).toBe(TRACK_IDS.length);
    });
  });

  describe.runIf(lesson.stages.find((s) => s.kind === "pictorial").figure === "checklist")("pictorial stage: checklist", () => {
    const stage = lesson.stages.find((s) => s.kind === "pictorial");

    it("offers a fixed bank of checks, each with an id, a text and a list of kinds it finds", () => {
      expect(stage.checks.length).toBeGreaterThanOrEqual(6);
      expect(new Set(stage.checks.map((c) => c.id)).size).toBe(stage.checks.length);
      for (const c of stage.checks) {
        expect(c.text, c.id).toBeTruthy();
        expect(Array.isArray(c.catches), c.id).toBe(true);
        for (const k of c.catches) expect(KINDS, c.id).toContain(k);
      }
    });

    it("has a check that catches each of the four kinds", () => {
      for (const k of KINDS) expect(stage.checks.some((c) => c.catches.includes(k)), k).toBe(true);
    });

    it("includes checks that feel useful but catch none, each saying why", () => {
      const weak = stage.checks.filter((c) => c.catches.length === 0);
      expect(weak.length).toBeGreaterThanOrEqual(2);
      for (const c of weak) expect(c.note, c.id).toBeTruthy();
    });

    it("has a limit shorter than the bank, so a learner has to choose", () => {
      expect(stage.limit).toBeGreaterThanOrEqual(KINDS.length);
      expect(stage.limit).toBeLessThan(stage.checks.length);
    });

    it("can reach full coverage within the limit, and can't by ticking everything that only feels useful", () => {
      const best = KINDS.map((k) => stage.checks.find((c) => c.catches.includes(k)).id);
      expect(new Set(best).size).toBeLessThanOrEqual(stage.limit);
      expect(stage.checks.filter((c) => c.catches.length === 0).flatMap((c) => c.catches)).toEqual([]);
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
