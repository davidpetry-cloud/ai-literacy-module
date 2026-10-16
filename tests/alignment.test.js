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
const EXERCISES = ["passage", "prompt-pair", "sign-offs", "classify", "screen", "audit", "judge", "thread", "chat", "respond", "inbox", "requests", "pause-call"];
const VERDICTS = ["keep", "change", "stop"];
const TOUCHES = ["dignity", "children", "relationships"];
const WCAG_PRINCIPLES = ["Perceivable", "Operable", "Understandable", "Robust"];
const WCAG_GROUPS = ["Text and visuals", "Navigation and interaction", "Content clarity", "Mobile and device"];
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
    for (const id of ids) expect(id.startsWith(`${lesson.idPrefix ?? n}.`)).toBe(true);
  });

  it("uses a Bloom level and an observable verb for every objective", () => {
    for (const o of lesson.objectives) {
      expect(BLOOM, o.id).toContain(o.bloom);
      expect(o.text, o.id).not.toMatch(UNMEASURABLE);
    }
  });
});

describe.each(ready.map((l) => [l.n, l]))("ready lesson %i", (n, lesson) => {
  // Every activity says on the page what to do, not only in the facilitator notes (David, 2026-10-05;
  // UX audit 2026-10, finding 4). A grid that is only shown, never built, needs an intro to say so.
  it("gives learners the question for the concrete stage, and an intro for a grid they only reveal", () => {
    const [concrete, pictorial] = lesson.stages;
    expect(concrete.ask, "concrete.ask").toBeTruthy();
    if (["confidence-grid", "fix-first", "control", "pattern", "gains"].includes(pictorial.figure)) {
      expect(pictorial.intro?.length, "pictorial.intro").toBeGreaterThan(0);
    }
  });

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
    expect({ passage: ["confidence-grid", "check-scale", "overlap"], "prompt-pair": ["prompt-compare"], "sign-offs": ["sign-off"], classify: ["checklist"], screen: ["fix-first"], audit: ["contrast"], judge: ["control"], thread: ["pattern"], chat: ["gains"], respond: ["plan"], inbox: ["share"], requests: ["recover"], "pause-call": ["share"] }[exerciseOf(lesson)]).toContain(figure);
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

  describe.runIf(exerciseOf(lesson) === "audit")("concrete stage: audit", () => {
    // The course's groups put "Mobile and device" under Robust, but WCAG files Reflow (1.4.10) under
    // Perceivable, as the students key does. The table must say so (UX audit 2026-10, finding 12).
    it("notes, wherever a WCAG table puts phone layouts under Robust, that WCAG files them under Perceivable", () => {
      const rows = lesson.stages.flatMap((s) => s.tables ?? []).flatMap((tb) => tb.rows);
      for (const r of rows.filter((x) => x[0] === "Robust" && /phone|reflow/i.test(x.join(" ")))) expect(r.join(" ")).toMatch(/Perceivable/);
    });
    const concrete = lesson.stages.find((s) => s.kind === "concrete");
    const screen = (t) => concrete.tracks[t].screen;
    const hexRe = /^#[0-9A-F]{6}$/;

    // A key must be true of its own screen. Symbols such as "＋" or "🗑" are text, so they are the
    // button's name; only a drawn icon with no text, label or title leaves it nameless
    // (UX audit 2026-10, finding 3).
    it("keys 4.1.2 Name, Role, Value only where the screen has a button with no name at all", () => {
      for (const t of TRACK_IDS) {
        if (!screen(t).parts.some((p) => p.criterion === "4.1.2")) continue;
        const buttons = [...screen(t).html.matchAll(/<button([^>]*)>([\s\S]*?)<\/button>/g)];
        const nameless = buttons.filter(([, attrs, inner]) =>
          !/aria-label|aria-labelledby|title=/.test(attrs) &&
          !/<title/.test(inner) &&
          inner.replace(/<[^>]*>/g, "").trim() === "" &&
          [...inner.matchAll(/<svg([^>]*)>/g)].every(([, a]) => /aria-hidden="true"/.test(a)));
        expect(nameless.length, t).toBeGreaterThan(0);
      }
    });

    it("has a context, a titled screen and six numbered parts for every track", () => {
      for (const t of TRACK_IDS) {
        expect(concrete.tracks[t]?.context, t).toBeTruthy();
        expect(screen(t).title, t).toBeTruthy();
        expect(screen(t).parts, t).toHaveLength(6);
        for (const [i, p] of screen(t).parts.entries()) {
          for (const f of ["label", "desc", "note"]) expect(p[f], `${t} part ${i + 1} ${f}`).toBeTruthy();
          expect(screen(t).html, `${t} marks part ${i + 1}`).toContain(`<span class="n">${i + 1}</span>`);
        }
        expect(["planted", "captured"], t).toContain(screen(t).provenance);
        expect(screen(t).model, t).toBeTruthy();
      }
    });

    it("keeps every screen self-contained: no external URLs, no loaded scripts or styles", () => {
      for (const t of TRACK_IDS) {
        expect(screen(t).html, t).not.toMatch(/https?:\/\/|\/\/[a-z]/i);
        expect(screen(t).html, t).not.toMatch(/<script[^>]+src=|<link[^>]+href=|<img|@import/i);
      }
    });

    // Anything that moves must stop for learners who ask their device for less motion.
    it("moves only when the learner's device allows motion", () => {
      for (const t of TRACK_IDS) {
        const html = screen(t).html;
        if (!/animation|@keyframes/.test(html)) continue;
        expect(html, t).toMatch(/@media \(prefers-reduced-motion:no-preference\)\{[^}]*animation/);
        expect(html.replace(/@media \(prefers-reduced-motion:no-preference\)\{[^}]*\}\}/g, ""), t).not.toMatch(/animation\s*:/);
      }
    });

    it("keys three accessibility failures, two patterns and one part that works", () => {
      for (const t of TRACK_IDS) {
        const kinds = screen(t).parts.map((p) => p.kind);
        expect(kinds.filter((k) => k === "wcag"), t).toHaveLength(3);
        expect(kinds.filter((k) => k === "pattern"), t).toHaveLength(2);
        expect(kinds.filter((k) => k === "fine"), t).toHaveLength(1);
      }
    });

    it("names the WCAG principle, group, criterion and level for every failure", () => {
      for (const t of TRACK_IDS) {
        for (const p of screen(t).parts.filter((x) => x.kind === "wcag")) {
          expect(WCAG_PRINCIPLES, `${t} ${p.label}`).toContain(p.principle);
          expect(WCAG_GROUPS, `${t} ${p.label}`).toContain(p.group);
          expect(p.criterion, `${t} ${p.label}`).toMatch(/^[1-4]\.\d+\.\d+$/);
          // The criterion's first number is its WCAG principle, whatever group the course teaches it under.
          expect(WCAG_PRINCIPLES[Number(p.criterion[0]) - 1], `${t} ${p.criterion}`).toBe(p.principle);
          expect(p.name, `${t} ${p.label}`).toBeTruthy();
          expect(["A", "AA"], `${t} ${p.label}`).toContain(p.level);
        }
      }
    });

    it("gives every pattern a calmer fix, and no pattern twice across the course", () => {
      const patterns = TRACK_IDS.flatMap((t) => screen(t).parts.filter((p) => p.kind === "pattern"));
      for (const p of patterns) {
        expect(p.pattern, p.label).toBeTruthy();
        expect(p.fix, p.label).toBeTruthy();
      }
      expect(new Set(patterns.map((p) => p.pattern)).size).toBe(patterns.length);
    });

    it("covers all four WCAG groups across the tracks", () => {
      const groups = new Set(TRACK_IDS.flatMap((t) => screen(t).parts.filter((p) => p.kind === "wcag").map((p) => p.group)));
      for (const g of WCAG_GROUPS) expect(groups, g).toContain(g);
    });

    it("starts the contrast checker on a pair from the screen that really fails its target", async () => {
      const { contrastRatio } = await import("../lesson-core.js");
      for (const t of TRACK_IDS) {
        const c = screen(t).contrast;
        expect(c.fg, t).toMatch(hexRe);
        expect(c.bg, t).toMatch(hexRe);
        expect(["text", "ui"], t).toContain(c.use);
        expect(contrastRatio(c.fg, c.bg), t).toBeLessThan(c.use === "ui" ? 3 : 4.5);
        expect(screen(t).parts[c.part - 1], `${t} part ${c.part}`).toBeTruthy();
        expect(screen(t).html, `${t} uses the pair on the screen`).toContain(c.fg);
      }
    });

    it("doesn't let the key be guessed from position", () => {
      const fine = TRACK_IDS.map((t) => screen(t).parts.findIndex((p) => p.kind === "fine"));
      expect(new Set(fine).size, "the part that works is in the same place in every track").toBe(TRACK_IDS.length);
      const orders = TRACK_IDS.map((t) => screen(t).parts.map((p) => p.kind).join());
      expect(new Set(orders).size).toBe(TRACK_IDS.length);
    });

    it("puts each screen's answer key under a ledger claim", () => {
      for (const t of TRACK_IDS) expect(CLAIMS).toHaveProperty(screen(t).claim);
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
          // A note that says nobody (or everyone) is affected can't be placed as "hits few" (UX audit 2026-10, finding 10).
          if (/\b(nobody|no one|everyone|every user)\b/i.test(p.note)) expect(p.reach, `${t} ${p.label}`).not.toBe("few");
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

  describe.runIf(exerciseOf(lesson) === "judge")("concrete stage: judge", () => {
    const concrete = lesson.stages.find((s) => s.kind === "concrete");
    const screen = (t) => concrete.tracks[t].screen;

    it("has a context, a titled product page and five numbered features for every track", () => {
      for (const t of TRACK_IDS) {
        expect(concrete.tracks[t]?.context, t).toBeTruthy();
        expect(screen(t).title, t).toBeTruthy();
        expect(screen(t).parts, t).toHaveLength(5);
        for (const [i, p] of screen(t).parts.entries()) {
          for (const f of ["label", "desc", "note"]) expect(p[f], `${t} ${i + 1} ${f}`).toBeTruthy();
          expect(screen(t).html, `${t} marks feature ${i + 1}`).toContain(`<span class="n">${i + 1}</span>`);
        }
        expect(["planted", "captured"], t).toContain(screen(t).provenance);
        expect(screen(t).model, t).toBeTruthy();
      }
    });

    it("keeps every page self-contained: no external URLs, no loaded scripts or styles", () => {
      for (const t of TRACK_IDS) {
        expect(screen(t).html, t).not.toMatch(/https?:\/\/|\/\/[a-z]/i);
        expect(screen(t).html, t).not.toMatch(/<script[^>]+src=|<link[^>]+href=|<img|@import/i);
        expect(screen(t).height, t).toBeGreaterThan(200);
      }
    });

    it("gives every feature a verdict, what it touches, and a place on the control grid", () => {
      for (const t of TRACK_IDS) {
        for (const p of screen(t).parts) {
          expect(VERDICTS, `${t} ${p.label}`).toContain(p.verdict);
          expect(TOUCHES, `${t} ${p.label}`).toContain(p.touches);
          expect(["high", "some", "low"], `${t} ${p.label}`).toContain(p.control);
          expect(["low", "some", "high"], `${t} ${p.label}`).toContain(p.automation);
        }
      }
    });

    it("uses all three verdicts in every track, and touches all three ideas across the tracks", () => {
      for (const t of TRACK_IDS) expect(new Set(screen(t).parts.map((p) => p.verdict)), t).toEqual(new Set(VERDICTS));
      const touched = new Set(TRACK_IDS.flatMap((t) => screen(t).parts.map((p) => p.touches)));
      for (const x of TOUCHES) expect(touched, x).toContain(x);
    });

    // The picture teaches Shneiderman's point, so the key must agree with it.
    it("keeps only features that leave people in control, and stops only ones that don't", () => {
      for (const t of TRACK_IDS) {
        for (const p of screen(t).parts) {
          if (p.verdict === "keep") expect(p.control, `${t} ${p.label}`).toBe("high");
          if (p.verdict === "stop") expect(p.control, `${t} ${p.label}`).toBe("low");
        }
      }
    });

    it("puts at least one kept feature in the aim: high control and high automation", () => {
      const aim = TRACK_IDS.flatMap((t) => screen(t).parts.filter((p) => p.verdict === "keep" && p.control === "high" && p.automation === "high"));
      expect(aim.length).toBeGreaterThan(0);
    });

    it("doesn't let the key be guessed from position", () => {
      const orders = TRACK_IDS.map((t) => screen(t).parts.map((p) => p.verdict).join());
      expect(new Set(orders).size).toBe(TRACK_IDS.length);
      const keeps = TRACK_IDS.map((t) => screen(t).parts.map((p, i) => (p.verdict === "keep" ? i : -1)).filter((i) => i >= 0).join());
      expect(new Set(keeps).size, "the kept features sit in the same places in every track").toBe(TRACK_IDS.length);
    });

    it("puts each page's answer key under a ledger claim", () => {
      for (const t of TRACK_IDS) expect(CLAIMS).toHaveProperty(screen(t).claim);
    });
  });

  describe.runIf(exerciseOf(lesson) === "thread")("concrete stage: thread", () => {
    // The script is shared by every track. Where any track keys its first moment a warning sign, the
    // script must not tell the facilitator to agree that it was ordinary (UX audit 2026-10, finding 5).
    it("never has the shared script agree that a first moment keyed a warning sign was fine", () => {
      const concrete = lesson.stages.find((s) => s.kind === "concrete");
      const firstIsWarning = TRACK_IDS.some((t) => concrete.tracks[t].thread.moments[0].key === "warning");
      if (!firstIsWarning) return;
      for (const [, line] of concrete.say) expect(line).not.toMatch(/first (message|moment)[^.]*\.\W*"?\s*Agree\b/i);
    });
    const concrete = lesson.stages.find((s) => s.kind === "concrete");
    const thread = (t) => concrete.tracks[t].thread;
    const PATTERNS = ["flattery", "secrecy", "isolating", "checking", "pressure", "request"];

    it("has a context and six dated moments for every track, with where they happened", () => {
      for (const t of TRACK_IDS) {
        expect(concrete.tracks[t]?.context, t).toBeTruthy();
        expect(thread(t).moments, t).toHaveLength(6);
        for (const m of thread(t).moments) {
          for (const f of ["when", "text", "note", "feeling"]) expect(m[f], `${t} ${f}`).toBeTruthy();
          expect(["face to face", "online"], t).toContain(m.where);
          // Feelings sit side by side under the timeline, so each stays short enough not to collide.
          expect(m.feeling.length, `${t} ${m.feeling}`).toBeLessThanOrEqual(9);
        }
        expect(["planted", "captured"], t).toContain(thread(t).provenance);
        expect(thread(t).model, t).toBeTruthy();
      }
    });

    it("keys every moment ordinary or warning, and names a pattern only for a warning", () => {
      for (const t of TRACK_IDS) {
        for (const m of thread(t).moments) {
          expect(["ordinary", "warning"], m.text).toContain(m.key);
          if (m.key === "warning") expect(PATTERNS, m.text).toContain(m.pattern);
          else expect(m.pattern, m.text).toBeUndefined();
        }
      }
    });

    it("has at least two ordinary moments and three warning signs per track, so learners tell them apart", () => {
      for (const t of TRACK_IDS) {
        const keys = thread(t).moments.map((m) => m.key);
        expect(keys.filter((k) => k === "ordinary").length, t).toBeGreaterThanOrEqual(2);
        expect(keys.filter((k) => k === "warning").length, t).toBeGreaterThanOrEqual(3);
      }
    });

    it("shows the patterns face to face and online, across the tracks", () => {
      const warn = TRACK_IDS.flatMap((t) => thread(t).moments.filter((m) => m.key === "warning"));
      expect(new Set(warn.map((m) => m.where))).toEqual(new Set(["face to face", "online"]));
      for (const t of TRACK_IDS) expect(new Set(thread(t).moments.map((m) => m.where)).size, t).toBe(2);
      expect(new Set(warn.map((m) => m.pattern)).size).toBeGreaterThanOrEqual(5);
    });

    it("doesn't let the key be guessed from position", () => {
      const orders = TRACK_IDS.map((t) => thread(t).moments.map((m) => m.key).join());
      expect(new Set(orders).size).toBe(TRACK_IDS.length);
    });

    // Safeguarding: the students track always ends by sending the learner to a trusted adult.
    it("ends the students thread with a trusted adult, and says it isn't their fault", () => {
      const last = thread("students").moments.at(-1).note;
      expect(last).toMatch(/trusted adult/);
      expect(last).toMatch(/not your fault/);
    });

    it("puts each thread's answer key under a ledger claim", () => {
      for (const t of TRACK_IDS) expect(CLAIMS).toHaveProperty(thread(t).claim);
    });
  });

  describe.runIf(exerciseOf(lesson) === "chat")("concrete stage: chat", () => {
    const concrete = lesson.stages.find((s) => s.kind === "concrete");
    const chat = (t) => concrete.tracks[t].chat;
    const replies = (t) => chat(t).turns.filter((x) => x.who === "ai");
    const MOVES = ["helpful", "flattery", "guilt", "pressure", "product", "human"];

    it("has a context, a titled tool, and five AI replies for every track", () => {
      for (const t of TRACK_IDS) {
        expect(concrete.tracks[t]?.context, t).toBeTruthy();
        expect(chat(t).title, t).toBeTruthy();
        expect(replies(t), t).toHaveLength(5);
        for (const x of chat(t).turns) expect(["you", "ai"], t).toContain(x.who);
        expect(["planted", "captured"], t).toContain(chat(t).provenance);
        expect(chat(t).model, t).toBeTruthy();
      }
    });

    it("keys every reply, and says what a move trades; a helpful reply trades nothing", () => {
      for (const t of TRACK_IDS) {
        for (const r of replies(t)) {
          expect(MOVES, r.text).toContain(r.key);
          expect(r.note, r.text).toBeTruthy();
          if (r.key === "helpful") expect([r.gives, r.gets], r.text).toEqual([undefined, undefined]);
          else for (const f of ["gives", "gets"]) expect(r[f], `${r.text} ${f}`).toBeTruthy();
        }
      }
    });

    it("has a helpful reply and at least three different moves in every track, and every move across tracks", () => {
      for (const t of TRACK_IDS) {
        const keys = replies(t).map((r) => r.key);
        expect(keys, t).toContain("helpful");
        expect(new Set(keys.filter((k) => k !== "helpful")).size, t).toBeGreaterThanOrEqual(3);
      }
      const all = new Set(TRACK_IDS.flatMap((t) => replies(t).map((r) => r.key)));
      for (const m of MOVES) expect(all, m).toContain(m);
    });

    it("doesn't let the key be guessed from position", () => {
      const orders = TRACK_IDS.map((t) => replies(t).map((r) => r.key).join());
      expect(new Set(orders).size).toBe(TRACK_IDS.length);
      expect(new Set(TRACK_IDS.map((t) => replies(t).findIndex((r) => r.key === "helpful"))).size).toBeGreaterThan(1);
    });

    // The post-check calls "I'll be lonely" guilt, so a chat must too (UX audit 2026-10, finding 2).
    it("keys a reply that says it will be lonely or miss you as guilt, as the post-check does", () => {
      const lonely = /\blonely\b|\bmiss you\b/i;
      expect(lesson.check.items.some((i) => lonely.test(i.prompt) && /guilt/i.test(i.crit))).toBe(true);
      for (const t of TRACK_IDS) for (const r of replies(t).filter((x) => lonely.test(x.text))) expect(r.key, `${t}: ${r.text}`).toBe("guilt");
    });

    // Safeguarding: students hear that leaving is always fine, and to tell an adult about money.
    it("tells students that leaving is fine, and to tell an adult when asked to pay", () => {
      const notes = replies("students").map((r) => r.note).join(" ");
      expect(notes).toMatch(/Leaving is always fine/);
      expect(replies("students").find((r) => r.key === "product").note).toMatch(/Tell an adult/);
    });

    it("puts each chat's answer key under a ledger claim", () => {
      for (const t of TRACK_IDS) expect(CLAIMS).toHaveProperty(chat(t).claim);
    });
  });

  describe.runIf(exerciseOf(lesson) === "respond")("concrete stage: respond", () => {
    const concrete = lesson.stages.find((s) => s.kind === "concrete");
    const pictorial = lesson.stages.find((s) => s.kind === "pictorial");
    const respond = (t) => concrete.tracks[t].respond;

    it("has a context and three situations of three responses for every track", () => {
      for (const t of TRACK_IDS) {
        expect(concrete.tracks[t]?.context, t).toBeTruthy();
        expect(respond(t).situations, t).toHaveLength(3);
        for (const x of respond(t).situations) {
          expect(x.text, t).toBeTruthy();
          expect(x.responses, t).toHaveLength(3);
          for (const r of x.responses) {
            expect(["safe", "risky"], r.text).toContain(r.key);
            expect(r.note, r.text).toBeTruthy();
          }
        }
        expect(["planted", "captured"], t).toContain(respond(t).provenance);
        expect(respond(t).model, t).toBeTruthy();
      }
    });

    it("gives every situation at least one safe and one risky response", () => {
      for (const t of TRACK_IDS) {
        for (const x of respond(t).situations) {
          const keys = x.responses.map((r) => r.key);
          expect(keys, x.text).toContain("safe");
          expect(keys, x.text).toContain("risky");
        }
      }
    });

    it("doesn't let the key be guessed from position", () => {
      const orders = TRACK_IDS.map((t) => respond(t).situations.map((x) => x.responses.map((r) => r.key).join()).join("|"));
      expect(new Set(orders).size).toBe(TRACK_IDS.length);
      for (const t of TRACK_IDS) expect(new Set(respond(t).situations.map((x) => x.responses.findIndex((r) => r.key === "safe"))).size, t).toBeGreaterThan(1);
    });

    // Safeguarding, held by the tests: the disclosure key follows KCSIE, and students always have a trusted adult.
    it("never lets a promise of secrecy be safe, and routes a disclosure to the safeguarding lead", () => {
      const all = TRACK_IDS.flatMap((t) => respond(t).situations.flatMap((x) => x.responses));
      for (const r of all.filter((x) => /promise to keep it secret/i.test(x.text))) expect(r.key, r.text).toBe("risky");
      expect(all.some((r) => r.key === "safe" && /safeguarding lead/.test(r.text))).toBe(true);
    });

    it("points every students situation to a trusted adult, never to paying, and says it's not their fault", () => {
      for (const x of respond("students").situations) expect(x.responses.map((r) => `${r.text} ${r.note}`).join(" "), x.text).toMatch(/trusted adult/);
      const students = respond("students").situations.flatMap((x) => x.responses);
      for (const r of students.filter((x) => /^Pay/.test(x.text))) expect(r.key).toBe("risky");
      expect(students.map((r) => r.note).join(" ")).toMatch(/not your fault/);
    });

    it("labels no one in a safe response", () => {
      const safe = TRACK_IDS.flatMap((t) => respond(t).situations.flatMap((x) => x.responses.filter((r) => r.key === "safe")));
      for (const r of safe) expect(r.text, r.text).not.toMatch(/narcissist|psychopath|fraud|sadist/i);
    });

    it("builds a plan from steps that each give a record, support or a boundary, plus one that gives none", () => {
      const steps = pictorial.steps;
      for (const need of ["record", "support", "boundary"]) expect(steps.some((st) => st.meets.includes(need)), need).toBe(true);
      const weak = steps.filter((st) => !st.meets.length);
      expect(weak).toHaveLength(1);
      expect(weak[0].note).toBeTruthy();
    });

    it("puts each track's answer key under a ledger claim", () => {
      for (const t of TRACK_IDS) expect(CLAIMS).toHaveProperty(respond(t).claim);
    });
  });

  describe.runIf(exerciseOf(lesson) === "inbox")("concrete stage: inbox", () => {
    const concrete = lesson.stages.find((s) => s.kind === "concrete");
    const pictorial = lesson.stages.find((s) => s.kind === "pictorial");
    const inbox = (t) => concrete.tracks[t].inbox;
    const SIGNS = ["authority", "urgency", "emotion", "scarcity", "current-events", "secrecy", "new-details"];

    it("has a context and five keyed messages for every track, each with a way to check", () => {
      for (const t of TRACK_IDS) {
        expect(concrete.tracks[t]?.context, t).toBeTruthy();
        expect(inbox(t).items, t).toHaveLength(5);
        for (const m of inbox(t).items) {
          expect(["email", "text", "voice", "call", "video"], m.text).toContain(m.kind);
          expect(["genuine", "scam"], m.text).toContain(m.key);
          for (const f of ["from", "text", "check", "note"]) expect(m[f], `${m.text} ${f}`).toBeTruthy();
          for (const sg of m.signs) expect(SIGNS, m.text).toContain(sg);
          // A scam shows at least one sign; a genuine message shows none.
          if (m.key === "scam") expect(m.signs.length, m.text).toBeGreaterThan(0);
          else expect(m.signs, m.text).toEqual([]);
        }
        expect(["planted", "captured"], t).toContain(inbox(t).provenance);
        expect(inbox(t).model, t).toBeTruthy();
      }
    });

    it("includes genuine messages, so learners practise not panicking, and a copied voice or fake video", () => {
      for (const t of TRACK_IDS) {
        expect(inbox(t).items.filter((m) => m.key === "genuine").length, t).toBeGreaterThanOrEqual(1);
        expect(inbox(t).items.some((m) => m.key === "scam" && ["voice", "call", "video"].includes(m.kind)), t).toBe(true);
      }
    });

    it("doesn't let the key be guessed from position", () => {
      const orders = TRACK_IDS.map((t) => inbox(t).items.map((m) => m.key).join());
      expect(new Set(orders).size).toBe(TRACK_IDS.length);
      expect(new Set(TRACK_IDS.map((t) => inbox(t).items.findIndex((m) => m.key === "genuine"))).size).toBeGreaterThan(1);
    });

    it("never checks a message through its own contact details", () => {
      for (const t of TRACK_IDS) for (const m of inbox(t).items.filter((x) => x.key === "scam")) expect(m.check, m.text).not.toMatch(/reply to (the|this) message|number in the message/i);
    });

    // Safeguarding: every students scam points to a trusted adult; nothing asks for real details.
    it("points every students scam to a trusted adult", () => {
      for (const m of inbox("students").items.filter((x) => x.key === "scam")) expect(`${m.check} ${m.note}`, m.text).toMatch(/trusted adult/);
    });

    it("sorts items into fine or keep out, with a reason, both sides used, and the key under a ledger claim", () => {
      for (const it of pictorial.items) {
        expect(["fine", "keep"], it.text).toContain(it.key);
        expect(it.why, it.text).toBeTruthy();
      }
      expect(new Set(pictorial.items.map((it) => it.key))).toEqual(new Set(["fine", "keep"]));
      expect(new Set(pictorial.items.map((it) => it.id)).size).toBe(pictorial.items.length);
      expect(pictorial.items.find((it) => it.id === "password").key).toBe("keep");
      expect(CLAIMS).toHaveProperty(pictorial.claim);
    });

    it("puts each track's answer key under a ledger claim", () => {
      for (const t of TRACK_IDS) expect(CLAIMS).toHaveProperty(inbox(t).claim);
    });
  });

  describe.runIf(exerciseOf(lesson) === "requests")("concrete stage: requests", () => {
    // Safeguarding: the recovery builder is shared, so its intro tells students to bring in a trusted
    // adult before step 1, as the moves and the post-check do (UX audit 2026-10, finding 11).
    it("tells students, before the recovery steps, to tell a trusted adult first", () => {
      const pictorial = lesson.stages.find((s) => s.kind === "pictorial");
      expect(pictorial.intro.some((line) => /^Students:.*trusted adult before step 1/.test(line))).toBe(true);
    });
    const concrete = lesson.stages.find((s) => s.kind === "concrete");
    const pictorial = lesson.stages.find((s) => s.kind === "pictorial");
    const requests = (t) => concrete.tracks[t].requests;
    const LOOK = ["source", "access", "rush"];

    it("has a context and five keyed requests for every track, each with what to look at and a way to check", () => {
      for (const t of TRACK_IDS) {
        expect(concrete.tracks[t]?.context, t).toBeTruthy();
        expect(requests(t).items, t).toHaveLength(5);
        for (const r of requests(t).items) {
          expect(["update", "popup", "app", "extension", "connect"], r.text).toContain(r.kind);
          expect(["yes", "no", "check"], r.text).toContain(r.key);
          for (const f of ["where", "text", "check", "note"]) expect(r[f], `${r.text} ${f}`).toBeTruthy();
          // Every request says where it came from and what it asks to see; a rush only when there is one.
          expect(r.look.source, r.text).toBeTruthy();
          expect(r.look.access, r.text).toBeTruthy();
          for (const k of Object.keys(r.look)) expect(LOOK, r.text).toContain(k);
        }
        expect(["planted", "captured"], t).toContain(requests(t).provenance);
        expect(requests(t).model, t).toBeTruthy();
      }
    });

    // The approved design: a real update, a fake update, an AI app or extension, a "connect" screen, and one more yes.
    it("gives every track a real update, a fake update, an AI app or extension to check, a connect screen, and two yes answers", () => {
      for (const t of TRACK_IDS) {
        const items = requests(t).items;
        expect(items.some((r) => r.kind === "update" && r.key === "yes"), t).toBe(true);
        expect(items.filter((r) => r.kind === "popup").map((r) => r.key), t).toEqual(["no"]);
        expect(items.some((r) => ["app", "extension"].includes(r.kind) && r.key === "check" && /\bAI\b/.test(r.text)), t).toBe(true);
        expect(items.filter((r) => r.kind === "connect").every((r) => ["no", "check"].includes(r.key)), t).toBe(true);
        expect(items.some((r) => r.kind === "connect"), t).toBe(true);
        expect(items.filter((r) => r.key === "yes").length, t).toBeGreaterThanOrEqual(2);
      }
    });

    it("doesn't let the key be guessed from position", () => {
      const orders = TRACK_IDS.map((t) => requests(t).items.map((r) => r.key).join());
      expect(new Set(orders).size).toBe(TRACK_IDS.length);
      expect(new Set(TRACK_IDS.map((t) => requests(t).items.findIndex((r) => r.key === "yes"))).size).toBeGreaterThan(1);
    });

    it("never checks a request through the request itself, and sends updates to settings or the official store", () => {
      for (const t of TRACK_IDS) {
        for (const r of requests(t).items.filter((x) => x.key !== "yes")) expect(r.check, r.text).not.toMatch(/click the link|tap the link|download the update/i);
        for (const r of requests(t).items.filter((x) => x.kind === "popup")) expect(`${r.check} ${r.note}`, r.text).toMatch(/settings|official store|app store|IT/);
      }
    });

    // Safeguarding (docs/student-safety.md): own devices, nothing installed or typed, a trusted adult, allowed tools only.
    it("points every students \"no\" and \"check first\" to a trusted adult, and keeps students to their own phone and allowed tools", () => {
      const items = requests("students").items;
      for (const r of items.filter((x) => x.key !== "yes")) expect(`${r.check} ${r.note}`, r.text).toMatch(/trusted adult/);
      expect(concrete.tracks.students.context).toMatch(/your own phone/);
      expect(concrete.tracks.students.context).toMatch(/Don't install or type anything/);
      expect(items.filter((r) => /\bAI\b/.test(r.text)).map((r) => r.check).join(" ")).toMatch(/AI tools your school allows/);
    });

    it("orders eight recovery steps with a right place or range for each, starting jumbled, and both guides' orders score right", () => {
      const steps = pictorial.steps;
      expect(steps).toHaveLength(8);
      expect(new Set(steps.map((st) => st.id)).size).toBe(8);
      for (const st of steps) {
        for (const f of ["label", "text", "why"]) expect(st[f], `${st.id} ${f}`).toBeTruthy();
        expect(st.places[0], st.id).toBeGreaterThanOrEqual(1);
        expect(st.places[1], st.id).toBeLessThanOrEqual(steps.length);
        expect(st.places[0], st.id).toBeLessThanOrEqual(st.places[1]);
      }
      const scores = (order) => order.every((id, i) => { const st = steps.find((x) => x.id === id); return i + 1 >= st.places[0] && i + 1 <= st.places[1]; });
      // The NCSC's order (the steps as listed) and the FTC's, with the FBI's "remove apps" added.
      expect(scores(steps.map((st) => st.id))).toBe(true);
      expect(scores(["recovery", "password", "signout", "twostep", "forwarding", "apps", "contacts", "money"])).toBe(true);
      expect(steps[0].id).toBe("recovery");
      expect([...pictorial.start].sort()).toEqual(steps.map((st) => st.id).sort());
      pictorial.start.forEach((id, i) => {
        const st = steps.find((x) => x.id === id);
        expect(i + 1 >= st.places[0] && i + 1 <= st.places[1], `${id} starts in a right place`).toBe(false);
      });
      expect(CLAIMS).toHaveProperty(pictorial.claim);
    });

    it("tells students' facilitators that a trusted adult comes first", () => {
      expect(pictorial.moves.join(" ")).toMatch(/Students: the first step is always to tell a trusted adult/);
    });

    it("puts each track's answer key under a ledger claim", () => {
      for (const t of TRACK_IDS) expect(CLAIMS).toHaveProperty(requests(t).claim);
    });
  });

  describe.runIf(exerciseOf(lesson) === "pause-call")("concrete stage: pause-call", () => {
    const concrete = lesson.stages.find((s) => s.kind === "concrete");
    const pictorial = lesson.stages.find((s) => s.kind === "pictorial");
    const calls = (t) => concrete.tracks[t].calls;
    const bestAt = (p) => p.choices.findIndex((c) => c.best);

    // The approved design: one call you didn't make, then one you made, each stopped at four pauses.
    it("has a context and two calls for every track, a call you didn't make and then one you made, each with four keyed pauses", () => {
      for (const t of TRACK_IDS) {
        expect(concrete.tracks[t]?.context, t).toBeTruthy();
        expect(calls(t).items.map((c) => c.kind), t).toEqual(["incoming", "outgoing"]);
        for (const c of calls(t).items) {
          expect(c.from, t).toBeTruthy();
          expect(c.pauses, t).toHaveLength(4);
          for (const p of c.pauses) {
            expect(p.before.length, p.ask).toBeGreaterThan(0);
            for (const [who, line] of p.before) expect(typeof who === "string" && line, p.ask).toBeTruthy();
            for (const f of ["ask", "why"]) expect(p[f], `${t} ${f}`).toBeTruthy();
            expect(p.choices, p.ask).toHaveLength(3);
            expect(p.choices.filter((ch) => ch.best), p.ask).toHaveLength(1);
            expect(new Set(p.choices.map((ch) => ch.text)).size, p.ask).toBe(3);
          }
        }
        expect(["planted", "captured"], t).toContain(calls(t).provenance);
        expect(calls(t).model, t).toBeTruthy();
      }
    });

    it("doesn't let the best choice be guessed from position", () => {
      const orders = TRACK_IDS.map((t) => calls(t).items.flatMap((c) => c.pauses.map(bestAt)).join());
      expect(new Set(orders).size).toBe(TRACK_IDS.length);
      for (const t of TRACK_IDS) for (const c of calls(t).items) expect(new Set(c.pauses.map(bestAt)).size, `${t} ${c.kind}`).toBeGreaterThan(1);
    });

    // E3.1 rides on the first reveal: the caller sounded human and was a bot.
    it("reveals at the first pause of the unexpected call that it was an AI voice bot", () => {
      for (const t of TRACK_IDS) expect(calls(t).items[0].pauses[0].why, t).toMatch(/AI voice bot/);
    });

    // E3.2: on a call you didn't make, the best choice never calls a number the call supplied, or gives a detail.
    it("never makes calling the caller's own number, or giving a detail, the best choice on a call you didn't make", () => {
      for (const t of TRACK_IDS) {
        for (const p of calls(t).items[0].pauses) {
          const best = p.choices.find((ch) => ch.best).text;
          expect(best, t).not.toMatch(/straight back|number (it|the caller) gives|caller's direct number|^Read out|^Give|^Tell it/i);
        }
        expect(calls(t).items[0].pauses.some((p) => /can you hear me/i.test(p.before.map(([, l]) => l).join(" "))), t).toBe(true);
      }
    });

    // E3.3: the honest agent says it's an AI, asks for more than it needs, and loops; the best choices keep the password and ask for a person.
    it("has the company's AI say it's an AI, and makes keeping the password and asking for a person the best choices", () => {
      for (const t of TRACK_IDS) {
        const out = calls(t).items[1];
        expect(out.pauses[0].before.find(([who]) => who === "AI agent")[1], t).toMatch(/an AI assistant/);
        const bests = out.pauses.map((p) => p.choices.find((ch) => ch.best).text).join(" ");
        expect(bests, t).toMatch(/won't share the password/);
        expect(bests, t).toMatch(/speak to a person/);
        for (const p of out.pauses) expect(p.choices.find((ch) => ch.best).text, t).not.toMatch(/^(Give it|Read out|Both|All three|The password)/);
      }
    });

    // Safeguarding (docs/student-safety.md): the learner's own phone, nobody calls anyone, a trusted adult in every hang-up.
    it("keeps students to their own phone, has a parent or carer make the call, and names a trusted adult in every students hang-up", () => {
      expect(concrete.tracks.students.context).toMatch(/your own phone/);
      expect(concrete.tracks.students.context).toMatch(/Nobody makes a call/);
      expect(calls("students").items[1].from).toMatch(/parent or carer/);
      for (const c of calls("students").items) for (const p of c.pauses) for (const ch of p.choices) if (/hang up/i.test(ch.text)) expect(ch.text).toMatch(/trusted adult/);
    });

    it("sorts twelve things to say into three bins, all used, with a reason each and the key under a ledger claim", () => {
      expect(pictorial.figure).toBe("share");
      expect(pictorial.bins.map((b) => b.id)).toEqual(["any", "made", "never"]);
      for (const b of pictorial.bins) expect(b.label && b.short, b.id).toBeTruthy();
      expect(pictorial.items).toHaveLength(12);
      expect(new Set(pictorial.items.map((it) => it.id)).size).toBe(12);
      for (const it of pictorial.items) {
        expect(["any", "made", "never"], it.text).toContain(it.key);
        expect(it.why, it.text).toBeTruthy();
      }
      expect(new Set(pictorial.items.map((it) => it.key))).toEqual(new Set(["any", "made", "never"]));
      // The approved middle bin: the same kind of thing is fine or never, depending on who called whom.
      const key = (id) => pictorial.items.find((it) => it.id === id).key;
      expect([key("password"), key("pin"), key("code-them"), key("yes"), key("money")]).toEqual(["never", "never", "never", "never", "never"]);
      expect([key("code-bank"), key("order"), key("name-reason")]).toEqual(["made", "made", "made"]);
      expect(CLAIMS).toHaveProperty(pictorial.claim);
    });

    it("puts each track's answer key under a ledger claim", () => {
      for (const t of TRACK_IDS) expect(CLAIMS).toHaveProperty(calls(t).claim);
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
