import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import { renderHub, renderLesson, STATUS_LABEL } from "../lesson-core.js";
import { COURSE, TRACK_IDS, getLesson } from "../course.js";
import { CLAIMS } from "../claims.js";

const page = (name) => new JSDOM(readFileSync(new URL(`../${name}`, import.meta.url), "utf8")).window.document;
const lesson1 = getLesson(1);
const concreteData = (track) => lesson1.stages[0].tracks[track].passage.sentences;

function lessonDoc(track) {
  const doc = page("lesson.html");
  renderLesson(doc, lesson1, { track });
  return doc;
}

describe("hub", () => {
  const doc = page("index.html");
  renderHub(doc);

  it("lists every lesson and links only the ready ones", () => {
    expect(doc.querySelectorAll(".card")).toHaveLength(COURSE.lessons.length);
    const links = [...doc.querySelectorAll(".card h3 a")].map((a) => a.getAttribute("href"));
    const ready = COURSE.lessons.filter((l) => l.ready).map((l) => `lesson.html?n=${l.n}&track=${TRACK_IDS[0]}`);
    expect(links).toEqual(ready);
  });

  it("shows every claim in the ledger with a text status label", () => {
    const cards = doc.querySelectorAll(".claims .claim");
    expect(cards).toHaveLength(Object.keys(CLAIMS).length);
    for (const c of cards) {
      expect(Object.values(STATUS_LABEL)).toContain(c.querySelector(".badge").textContent.trim());
    }
  });

  it("never shows a model-sourced claim as attested", () => {
    for (const c of doc.querySelectorAll(".claim")) {
      if (CLAIMS[c.dataset.claim].attestation.source === "model") {
        expect(c.dataset.status).toBe("proposed");
        expect(c.textContent).not.toContain("Attested by");
      }
    }
  });
});

describe.each(TRACK_IDS)("lesson 1, %s track", (track) => {
  const doc = lessonDoc(track);

  it("renders warm-up, concrete, pictorial, abstract, check in order", () => {
    const order = [...doc.querySelectorAll("[data-stage]")].map((s) => s.dataset.stage);
    expect(order).toEqual(["warmup", "concrete", "pictorial", "abstract", "check"]);
  });

  it("shows this track's passage, keyed and labelled with its provenance", () => {
    const items = doc.querySelectorAll(".passage li");
    const data = concreteData(track);
    expect(items).toHaveLength(data.length);
    items.forEach((li, i) => expect(li.querySelector("p").textContent).toBe(data[i].text));
    expect(doc.querySelector(".passage figcaption").textContent).toMatch(/planted on purpose|Captured from/);
  });

  it("keeps the answer key closed until revealed", () => {
    for (const d of doc.querySelectorAll(".passage details")) expect(d.open).toBe(false);
  });

  it("hides every badge icon from screen readers and keeps the text label", () => {
    for (const b of doc.querySelectorAll(".badge")) {
      expect(b.querySelector("svg").getAttribute("aria-hidden")).toBe("true");
      expect(b.textContent.trim().length).toBeGreaterThan(0);
    }
  });

  it("describes the empty grid, then every sentence's place once revealed", () => {
    const before = doc.querySelector("#grid svg").getAttribute("aria-label");
    expect(before).toContain("Empty until revealed");
    doc.querySelector("#reveal-grid").click();
    const svg = doc.querySelector("#grid svg");
    expect(svg.querySelectorAll(".g-mark")).toHaveLength(concreteData(track).length);
    const after = svg.getAttribute("aria-label");
    concreteData(track).forEach((_, i) => expect(after).toContain(`Sentence ${i + 1} is in`));
    expect(after).toContain("tone did not sort them");
    expect(doc.querySelector("#reveal-grid")).toBeNull();
  });

  it("ticks the alignment table once per objective per place it is taught or checked", () => {
    const ticks = doc.querySelectorAll(".align td").length -
      [...doc.querySelectorAll(".align td")].filter((td) => !td.textContent.includes("✓")).length;
    const expected = lesson1.objectives.reduce((n, o) => {
      const places = [
        lesson1.warmup.items.flatMap((i) => i.targets),
        ...lesson1.stages.map((s) => s.targets),
        lesson1.check.items.flatMap((i) => i.targets)
      ];
      return n + places.filter((t) => t.includes(o.id)).length;
    }, 0);
    expect(ticks).toBe(expected);
  });

  it("escapes content rather than injecting it", () => {
    expect(doc.querySelector("#content script")).toBeNull();
  });
});

describe("track switching changes context, not the core", () => {
  const html = (track, sel) => lessonDoc(track).querySelector(sel).innerHTML;

  it("keeps warm-up, pictorial, abstract and check identical across tracks", () => {
    for (const sel of ['[data-stage="warmup"]', '[data-stage="pictorial"]', '[data-stage="abstract"]', '[data-stage="check"]']) {
      const first = html(TRACK_IDS[0], sel);
      for (const t of TRACK_IDS.slice(1)) expect(html(t, sel), `${sel} ${t}`).toBe(first);
    }
  });

  it("changes the passage and the relevance framing", () => {
    const passages = new Set(TRACK_IDS.map((t) => html(t, ".passage")));
    const relevance = new Set(TRACK_IDS.map((t) => html(t, ".relevance")));
    expect(passages.size).toBe(TRACK_IDS.length);
    expect(relevance.size).toBe(TRACK_IDS.length);
  });
});

describe("lesson colours", () => {
  const css = readFileSync(new URL("../course.css", import.meta.url), "utf8");

  it("defines a distinct colour for every lesson", () => {
    const colours = COURSE.lessons.map((l) => css.match(new RegExp(`--l${l.n}:(#[0-9A-Fa-f]{6})`))?.[1]);
    for (const [i, c] of colours.entries()) expect(c, `lesson ${i + 1}`).toBeTruthy();
    expect(new Set(colours.map((c) => c.toLowerCase())).size).toBe(colours.length);
  });

  it("tags every hub card and the lesson header with its lesson number", () => {
    const hub = page("index.html");
    renderHub(hub);
    expect([...hub.querySelectorAll(".card")].map((c) => c.dataset.lesson)).toEqual(COURSE.lessons.map((l) => String(l.n)));
    const doc = lessonDoc(TRACK_IDS[0]);
    expect(doc.querySelector("header.top").dataset.lesson).toBe("1");
    expect(doc.querySelector(".lesson-no").textContent).toBe("Lesson 1");
  });
});

describe("lessons that aren't ready", () => {
  it("says a lesson in design is still in design", () => {
    const doc = page("lesson.html");
    renderLesson(doc, COURSE.lessons.find((l) => !l.ready));
    expect(doc.querySelector("#content").textContent).toContain("still in design");
  });

  it("says an unknown lesson number doesn't exist", () => {
    const doc = page("lesson.html");
    renderLesson(doc, getLesson(99));
    expect(doc.querySelector("#content").textContent).toContain("no lesson with that number");
  });
});
