import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import { renderHub, renderLesson, STATUS_LABEL, PARTS, INVENTED, LEVELS } from "../lesson-core.js";
import { COURSE, TRACK_IDS, getLesson } from "../course.js";
import { CLAIMS } from "../claims.js";

const page = (name) => new JSDOM(readFileSync(new URL(`../${name}`, import.meta.url), "utf8")).window.document;
const lesson1 = getLesson(1);
const concreteData = (track) => lesson1.stages[0].tracks[track].passage.sentences;

function lessonDoc(track, lesson = lesson1) {
  const doc = page("lesson.html");
  renderLesson(doc, lesson, { track });
  return doc;
}
const lesson2 = getLesson(2);
const pairData = (track) => lesson2.stages[0].tracks[track].pair;
const lesson2Doc = (track) => lessonDoc(track, lesson2);

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

describe.each(TRACK_IDS)("lesson 2, %s track", (track) => {
  const doc = lesson2Doc(track);
  const pair = pairData(track);
  const press = (part) => doc.querySelector(`.cmp-btn[data-part="${part}"]`).click();
  const marked = () => [...doc.querySelectorAll("#cmp-structured li.on")].map((li) => li.firstChild.textContent.trim());

  it("renders warm-up, concrete, pictorial, abstract, check in order", () => {
    const order = [...doc.querySelectorAll("[data-stage]")].map((s) => s.dataset.stage);
    expect(order).toEqual(["warmup", "concrete", "pictorial", "abstract", "check"]);
  });

  it("shows this track's vague request and output, labelled with its provenance", () => {
    expect(doc.querySelector(".pair .req").textContent).toBe(`“${pair.vague.prompt}”`);
    const items = doc.querySelectorAll(".pair li > p");
    expect([...items].map((p) => p.textContent)).toEqual(pair.vague.output.map((l) => l.text));
    expect(doc.querySelector(".pair figcaption").textContent).toMatch(/planted on purpose|Captured from/);
  });

  it("asks about all four parts, with each key closed until revealed", () => {
    const rows = doc.querySelectorAll(".gaps li");
    expect(rows).toHaveLength(PARTS.length);
    rows.forEach((li, i) => {
      expect(li.textContent).toContain(PARTS[i].label);
      expect(li.querySelector("details").open).toBe(false);
      expect(li.querySelector(".k").classList.contains(`k-${pair.vague.gaps[PARTS[i].id].key}`)).toBe(true);
    });
  });

  it("starts with no part pressed, nothing marked, and says so", () => {
    for (const b of doc.querySelectorAll(".cmp-btn")) expect(b.getAttribute("aria-pressed")).toBe("false");
    expect(marked()).toEqual([]);
    expect(doc.querySelector("#cmp-status").textContent).toContain("No part selected");
  });

  it("labels every invented line in words", () => {
    const expected = [...pair.vague.output, ...pair.structured.output].filter((l) => l.invented).length;
    const labels = [...doc.querySelectorAll("#compare .cmp-inv")];
    expect(labels).toHaveLength(expected);
    for (const l of labels) expect(l.textContent).toBe(INVENTED);
  });

  it.each(PARTS.map((p) => p.id))("pressing %s marks exactly the lines it caused, and says what changed", (part) => {
    press(part);
    const expected = pair.structured.output.filter((l) => l.causedBy?.includes(part)).map((l) => l.text);
    expect(marked()).toEqual(expected);
    for (const b of doc.querySelectorAll(".cmp-btn")) expect(b.getAttribute("aria-pressed")).toBe(String(b.dataset.part === part));
    const label = PARTS.find((p) => p.id === part).label;
    for (const li of doc.querySelectorAll("#cmp-structured li.on")) expect(li.querySelector(".cmp-tag").textContent).toContain(label);
    const status = doc.querySelector("#cmp-status").textContent;
    expect(status).toContain(pair.structured.effects[part]);
    expect(status).toContain(`${expected.length} line`);
    press(part);
  });

  it("clears when the pressed part is pressed again", () => {
    press("format");
    press("format");
    expect(marked()).toEqual([]);
    expect(doc.querySelector(".cmp-btn[aria-pressed=\"true\"]")).toBeNull();
    expect(doc.querySelector("#cmp-status").textContent).toContain("No part selected");
  });

  it("moves from one part to the next without a second press", () => {
    press("task");
    press("context");
    expect([...doc.querySelectorAll('.cmp-btn[aria-pressed="true"]')].map((b) => b.dataset.part)).toEqual(["context"]);
    press("context");
  });

  it("keeps focus on the button that was pressed", () => {
    const b = doc.querySelector('.cmp-btn[data-part="constraints"]');
    b.focus();
    b.click();
    expect(doc.activeElement).toBe(b);
    b.click();
  });

  it("escapes content rather than injecting it", () => {
    expect(doc.querySelector("#content script")).toBeNull();
  });
});

describe("lesson 2: the comparison tool is one core across tracks", () => {
  const html = (track, sel) => lesson2Doc(track).querySelector(sel).innerHTML;

  it("keeps warm-up, abstract and check identical across tracks", () => {
    for (const sel of ['[data-stage="warmup"]', '[data-stage="abstract"]', '[data-stage="check"]']) {
      const first = html(TRACK_IDS[0], sel);
      for (const t of TRACK_IDS.slice(1)) expect(html(t, sel), `${sel} ${t}`).toBe(first);
    }
  });

  it("keeps the tool's controls, headings and script identical; only the pair changes", () => {
    const shared = (t) => {
      const stage = lesson2Doc(t).querySelector('[data-stage="pictorial"]');
      return [".cmp-controls", "#cmp-status", ".moves", ".say", ".watch"].map((s) => stage.querySelector(s).outerHTML)
        .concat([...stage.querySelectorAll("h2, h3")].map((h) => h.textContent)).join("\n");
    };
    for (const t of TRACK_IDS.slice(1)) expect(shared(t), t).toBe(shared(TRACK_IDS[0]));
    expect(new Set(TRACK_IDS.map((t) => html(t, "#cmp-structured"))).size).toBe(TRACK_IDS.length);
  });

  it("asks the same four questions in every track's concrete stage", () => {
    const asks = (t) => [...lesson2Doc(t).querySelectorAll(".gaps li > p")].map((p) => p.textContent).join();
    for (const t of TRACK_IDS.slice(1)) expect(asks(t)).toBe(asks(TRACK_IDS[0]));
  });
});

const lesson3 = getLesson(3);
const usesData = (track) => lesson3.stages[0].tracks[track].passage.uses;
const lesson3Doc = (track) => lessonDoc(track, lesson3);

describe.each(TRACK_IDS)("lesson 3, %s track", (track) => {
  const doc = lesson3Doc(track);

  it("renders warm-up, concrete, pictorial, abstract, check in order", () => {
    expect([...doc.querySelectorAll("[data-stage]")].map((s) => s.dataset.stage)).toEqual(["warmup", "concrete", "pictorial", "abstract", "check"]);
  });

  it("shows this track's passage with every source card closed until revealed", () => {
    const items = doc.querySelectorAll(".passage li");
    expect(items).toHaveLength(lesson3.stages[0].tracks[track].passage.sentences.length);
    for (const d of doc.querySelectorAll(".passage details")) expect(d.open).toBe(false);
    expect(doc.querySelector(".passage figcaption").textContent).toContain("planted on purpose");
  });

  it("lists this track's three uses and all three levels of checking", () => {
    const uses = [...doc.querySelectorAll("ol.uses li")].map((li) => li.textContent);
    usesData(track).forEach((u, i) => expect(uses[i]).toContain(u.label));
    expect([...doc.querySelectorAll("dl.levels dt")].map((d) => d.textContent)).toEqual(LEVELS.map((l) => l.label));
  });

  it("describes the empty grid, then the level for every use once revealed", () => {
    const before = doc.querySelector("#grid svg").getAttribute("aria-label");
    expect(before).toContain("Empty until revealed");
    expect(doc.querySelectorAll("#grid .g-mark")).toHaveLength(0);
    doc.querySelector("#reveal-grid").click();
    const svg = doc.querySelector("#grid svg");
    const after = svg.getAttribute("aria-label");
    const level = (id) => LEVELS.find((l) => l.id === id).label.toLowerCase();
    usesData(track).forEach((u) => expect(after).toContain(`${u.label} gets a ${level(u.check)}.`));
    expect(after).toContain("the use decides the check");
    expect(svg.querySelectorAll(".g-mark")).toHaveLength(3);
    expect(doc.querySelector("#reveal-grid")).toBeNull();
    expect(doc.activeElement).toBe(doc.querySelector("#grid"));
  });

  it("puts each mark in the column of its use's level", () => {
    const doc2 = lesson3Doc(track);
    doc2.querySelector("#reveal-grid").click();
    const cols = [...doc2.querySelectorAll("#grid .g-mark circle")].map((c) => Number(c.getAttribute("cx")));
    expect(cols.map((cx) => LEVELS[Math.floor((cx - 240) / 136)].id)).toEqual(usesData(track).map((u) => u.check));
  });
});

describe("lesson 3: the grid is one core across tracks", () => {
  const html = (track, sel) => lesson3Doc(track).querySelector(sel).innerHTML;

  it("keeps warm-up, abstract and check identical across tracks", () => {
    for (const sel of ['[data-stage="warmup"]', '[data-stage="abstract"]', '[data-stage="check"]']) {
      const first = html(TRACK_IDS[0], sel);
      for (const t of TRACK_IDS.slice(1)) expect(html(t, sel), `${sel} ${t}`).toBe(first);
    }
  });

  it("keeps the figure's headings, levels, button and script identical; only the uses change", () => {
    const shared = (t) => {
      const stage = lesson3Doc(t).querySelector('[data-stage="pictorial"]');
      return [".levels", "#reveal-grid", ".moves", ".say", ".watch"].map((s) => stage.querySelector(s).outerHTML)
        .concat([...stage.querySelectorAll("h2, h3")].map((h) => h.textContent)).join("\n");
    };
    for (const t of TRACK_IDS.slice(1)) expect(shared(t), t).toBe(shared(TRACK_IDS[0]));
    expect(new Set(TRACK_IDS.map((t) => html(t, "ol.uses"))).size).toBe(TRACK_IDS.length);
    expect(lesson3Doc(TRACK_IDS[0]).querySelector("#content script")).toBeNull();
  });
});

describe("narrow figures: the grid as a table", () => {
  const revealed = (doc) => { doc.querySelector("#reveal-grid").click(); return doc; };
  const cellsOf = (doc) => [...doc.querySelectorAll("#grid table.grid-alt tbody tr")].map((tr) => [...tr.querySelectorAll("td")].map((td) => td.textContent.replace(/\s+/g, " ").trim()));

  it.each(TRACK_IDS)("lesson 1 (%s): empty until revealed, then every sentence in its cell", (track) => {
    const doc = lessonDoc(track);
    expect(doc.querySelector("#grid table.grid-alt caption").textContent).toBe(doc.querySelector("#grid svg").getAttribute("aria-label"));
    expect(cellsOf(doc).flat().every((c) => c === "")).toBe(true);
    revealed(doc);
    const data = concreteData(track);
    const cols = ["correct", "wrong", "no-source", "nothing"];
    const rows = ["confident", "hedged"];
    // The table is turned on its side: one row per answer, one column per tone.
    cellsOf(doc).forEach((row, c) => row.forEach((cell, r) => {
      const want = data.map((s, i) => [s, i + 1]).filter(([s]) => rows.indexOf(s.tone) === r && cols.indexOf(s.key) === c).map(([, n]) => `Sentence ${n}`);
      expect(cell, `${track} r${r} c${c}`).toBe(want.join(" "));
    }));
    expect(doc.querySelector("#grid table caption").textContent).toBe(doc.querySelector("#grid svg").getAttribute("aria-label"));
  });

  it.each(TRACK_IDS)("lesson 3 (%s): each use lands in its level's column", (track) => {
    const doc = revealed(lesson3Doc(track));
    const grid = cellsOf(doc);
    usesData(track).forEach((u, r) => grid[r].forEach((cell, c) => expect(cell, `${u.label} col ${c}`).toBe(LEVELS[c].id === u.check ? `Use ${r + 1}` : "")));
    expect([...doc.querySelectorAll("#grid table tbody th")].map((th) => th.textContent)).toEqual(usesData(track).map((u) => u.label));
  });

  it("labels every row and column of the table", () => {
    const t = lessonDoc(TRACK_IDS[0]).querySelector("#grid table");
    for (const th of t.querySelectorAll("th")) expect(["col", "row"]).toContain(th.getAttribute("scope"));
  });
});

describe("facilitator content is labelled and kept apart from what learners work on", () => {
  it.each([[1, lessonDoc], [2, lesson2Doc], [3, lesson3Doc]])("lesson %i: every stage carries its notes in a labelled box", (n, make) => {
    const doc = make(TRACK_IDS[0]);
    for (const stage of doc.querySelectorAll('[data-stage="concrete"], [data-stage="pictorial"], [data-stage="abstract"]')) {
      const box = stage.querySelector(".facil");
      expect(box?.querySelector("h3")?.textContent, stage.dataset.stage).toBe("Facilitator notes");
      for (const sel of [".moves", ".say", ".watch"]) expect(box.querySelector(sel), `${stage.dataset.stage} ${sel}`).not.toBeNull();
      // Learner-facing material stays outside the box.
      for (const sel of [".passage", ".figure", ".claims"]) expect(box.querySelector(sel), sel).toBeNull();
    }
  });

  it("puts the answer-key card after the facilitator's steps, not between them and the exercise", () => {
    for (const make of [lessonDoc, lesson2Doc, lesson3Doc]) {
      const stage = make(TRACK_IDS[0]).querySelector('[data-stage="concrete"]');
      const kids = [...stage.children];
      expect(kids.findIndex((e) => e.classList.contains("keyclaim"))).toBeGreaterThan(kids.findIndex((e) => e.classList.contains("facil")));
    }
  });

  it("marks the facilitator's expect and reteach boxes, and says what the marking means", () => {
    const doc = lessonDoc(TRACK_IDS[0]);
    for (const b of doc.querySelectorAll(".expect b, .crit b")) expect(b.textContent).toMatch(/^Facilitator · /);
    expect(doc.querySelector(".obj .legend").textContent).toContain("Facilitator");
    expect(doc.querySelector(".why .facil h3").textContent).toBe("Facilitator notes");
  });
});

describe("alignment table", () => {
  it.each([[1, lessonDoc], [2, lesson2Doc], [3, lesson3Doc]])("lesson %i: names each stage in words and each objective in the header", (n, make) => {
    const doc = make(TRACK_IDS[0]);
    const lesson = getLesson(n);
    expect([...doc.querySelectorAll(".align tbody th")].map((t) => t.textContent)).toEqual(["Warm-up (pre)", "Concrete", "Pictorial", "Abstract", "Check (post)"]);
    expect([...doc.querySelectorAll(".align thead th")].slice(1).map((t) => t.textContent.replace("Objective ", ""))).toEqual(lesson.objectives.map((o) => o.id));
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

describe("page structure", () => {
  const outline = (doc) => [...doc.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => Number(h.tagName[1]));
  const hub = page("index.html");
  renderHub(hub);

  it.each([
    ["hub", hub],
    ...TRACK_IDS.map((t) => [`lesson 1 (${t})`, lessonDoc(t)]),
    ...TRACK_IDS.map((t) => [`lesson 2 (${t})`, lesson2Doc(t)]),
    ...TRACK_IDS.map((t) => [`lesson 3 (${t})`, lesson3Doc(t)])
  ])("%s has one h1 and never skips a heading level", (_, doc) => {
    const levels = outline(doc);
    expect(levels.filter((l) => l === 1)).toHaveLength(1);
    levels.forEach((l, i) => i && expect(l, `h${levels[i - 1]} → h${l}`).toBeLessThanOrEqual(levels[i - 1] + 1));
  });

  it.each([
    ["hub", hub],
    ["lesson 1", lessonDoc(TRACK_IDS[0])],
    ["lesson 2", lesson2Doc(TRACK_IDS[0])],
    ["lesson 3", lesson3Doc(TRACK_IDS[0])]
  ])("%s gives every control a distinct accessible name", (_, doc) => {
    const names = [...doc.querySelectorAll("button, summary, a[href]")].map((e) => (e.getAttribute("aria-label") || e.textContent).replace(/\s+/g, " ").trim());
    expect(names.filter((n, i) => names.indexOf(n) !== i)).toEqual([]);
  });

  it("moves focus to the grid when the reveal button removes itself", () => {
    const doc = lessonDoc(TRACK_IDS[0]);
    doc.querySelector("#reveal-grid").click();
    expect(doc.activeElement).toBe(doc.querySelector("#grid"));
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
