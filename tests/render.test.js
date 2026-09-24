import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import { renderHub, renderLesson, STATUS_LABEL, PARTS, INVENTED, LEVELS, SIGNOFF_LABEL, signoffStatus, signoffTimeline, ERROR_LABEL, KINDS, checklistStatus, runChecklist, PRINCIPLE_LABEL, fixOrder, AUDIT_LABEL, checkContrast, contrastRatio, nearestPassing, parseHex, buildSearchIndex, searchCourse, highlight, searchStatus } from "../lesson-core.js";
import { COURSE, TRACK_IDS, getLesson, EVALUATION } from "../course.js";
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

  it("groups the ledger by lesson, collapsed, each claim under the first lesson that uses it", () => {
    const groups = [...doc.querySelectorAll("details.claim-group")];
    expect(groups.map((g) => g.dataset.lesson)).toEqual(COURSE.lessons.map((l) => String(l.n)));
    for (const g of groups) {
      expect(g.open, g.id).toBe(false);
      // The number sits beside the colour, and the count is in words.
      expect(g.querySelector("summary .lesson-no").textContent).toBe(`Lesson ${g.dataset.lesson}`);
      expect(g.querySelector(".cg-count").textContent).toMatch(/^\d+ claims?: \d+ (attested|proposed)/);
    }
    expect(doc.querySelector("#claims-lesson-1 #claim-model-predicts")).not.toBeNull();
    expect(doc.querySelector("#claims-lesson-3 #claim-risk-zones")).toBeNull();
    expect(doc.querySelector("#claim-risk-zones .claim-also").textContent).toBe("Also used in Lesson 3");
    expect(doc.querySelector("#claim-check-fits-stakes .claim-also").textContent).toBe("Also used in Lesson 4");
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
    expect(doc.querySelector("#reveal-grid").textContent).toBe("Hide the finished grid");
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
    expect(doc.querySelector("#reveal-grid").textContent).toBe("Hide the finished grid");
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

const lesson4 = getLesson(4);
const signoffData = (track) => lesson4.stages[0].tracks[track].signoffs.items;
const lesson4Doc = (track) => lessonDoc(track, lesson4);
const setField = (doc, id, value) => {
  const el = doc.querySelector(`#${id}`);
  el.value = value;
  el.dispatchEvent(new doc.defaultView.Event("input", { bubbles: true }));
};

describe.each(TRACK_IDS)("lesson 4, %s track", (track) => {
  const doc = lesson4Doc(track);

  it("renders warm-up, concrete, pictorial, abstract, check in order", () => {
    expect([...doc.querySelectorAll("[data-stage]")].map((s) => s.dataset.stage)).toEqual(["warmup", "concrete", "pictorial", "abstract", "check"]);
  });

  it("shows five sign-offs, each with signer, basis and date, answers closed, and says they're made up", () => {
    const items = doc.querySelectorAll(".signoffs > ol > li");
    expect(items).toHaveLength(5);
    signoffData(track).forEach((d, i) => {
      expect(items[i].querySelector("p").textContent).toBe(d.statement);
      expect(items[i].querySelector(".so-line").textContent).toContain(d.by);
    });
    for (const d of doc.querySelectorAll(".signoffs details")) expect(d.open).toBe(false);
    expect(doc.querySelector(".signoffs figcaption").textContent).toContain("made up");
    expect(doc.querySelector(".signoffs figcaption").textContent).toContain("two years");
  });

  it("shows what the real ledger says beside each answer: four Attested, one Lapsed", () => {
    const shown = [...doc.querySelectorAll(".so-ledger .badge")].map((b) => b.textContent.trim());
    expect(shown.filter((s) => s === STATUS_LABEL.attested)).toHaveLength(4);
    expect(shown.filter((s) => s === STATUS_LABEL.expired)).toHaveLength(1);
    const keys = [...doc.querySelectorAll(".signoffs .k")].map((k) => k.textContent);
    expect(keys).toEqual(signoffData(track).map((d) => SIGNOFF_LABEL[d.key]));
  });

  it("opens the builder on the track's lapsed sign-off, reading Lapsed", () => {
    const lapsed = signoffData(track).find((d) => d.key === "lapsed");
    expect(doc.querySelector('[data-stage="pictorial"] .req').textContent).toContain(lapsed.statement);
    expect(doc.querySelector("#so-by").value).toBe(lapsed.by);
    expect(doc.querySelector("#so-badge").textContent).toContain("Lapsed");
    expect(doc.querySelector("#so-status").getAttribute("aria-live")).toBe("polite");
  });
});

describe("lesson 4: the sign-off builder", () => {
  const today = new Date().toISOString().slice(0, 10);

  it("steps through Proposed, Lapsed and Attested as the fields change, using the real engine", () => {
    const doc = lesson4Doc(TRACK_IDS[0]);
    const badge = () => doc.querySelector("#so-badge").textContent.trim();
    const status = () => doc.querySelector("#so-status").textContent;

    const model = doc.querySelector('input[name="so-who"][value="model"]');
    model.checked = true;
    model.dispatchEvent(new doc.defaultView.Event("change", { bubbles: true }));
    expect(badge()).toBe("Proposed");
    expect(status()).toContain("AI tool");

    const person = doc.querySelector('input[name="so-who"][value="person"]');
    person.checked = true;
    person.dispatchEvent(new doc.defaultView.Event("change", { bubbles: true }));
    setField(doc, "so-date", "");
    expect(badge()).toBe("Proposed");
    expect(status()).toContain("no date");
    expect(doc.querySelector("#timeline .so-empty")).not.toBeNull();

    setField(doc, "so-date", today);
    expect(badge()).toBe("Attested");
    expect(status()).toMatch(/lapses on \d{4}-\d{2}-\d{2}, in 730 days/);

    setField(doc, "so-basis", "");
    expect(badge()).toBe("Attested");
    expect(status()).toContain("no basis. Would you?");

    setField(doc, "so-by", "");
    expect(badge()).toBe("Proposed");
    expect(status()).toContain("no name");
  });

  it("keeps focus in the field being typed in", () => {
    const doc = lesson4Doc(TRACK_IDS[0]);
    const by = doc.querySelector("#so-by");
    by.focus();
    setField(doc, "so-by", "Someone");
    expect(doc.activeElement).toBe(by);
  });

  // The sentence shows a date and a count; they must agree at any time of day.
  it.each(["2026-09-24T00:30:00Z", "2026-09-24T12:30:00Z", "2026-09-24T23:30:00Z"])(
    "counts days to the lapse date it shows, whatever the time of day (%s)",
    (iso) => {
      const now = new Date(iso);
      const text = signoffStatus({ who: "person", by: "A", role: "", basis: "Checked it.", date: "2026-09-24" }, now).text;
      expect(text).toBe("Attested. It lapses on 2028-09-23, in 730 days.");
    }
  );

  it("says why for every verdict, and flags a date in the future", () => {
    const now = new Date("2026-06-01");
    const base = { who: "person", by: "A", role: "", basis: "Checked the policy.", date: "2026-05-01" };
    expect(signoffStatus(base, now)).toMatchObject({ status: "attested" });
    expect(signoffStatus({ ...base, date: "2023-01-01" }, now)).toMatchObject({ status: "expired" });
    expect(signoffStatus({ ...base, date: "2023-01-01" }, now).text).toContain("Lapsed. It was checked");
    expect(signoffStatus({ ...base, date: "2027-01-01" }, now).text).toContain("in the future");
    expect(signoffStatus({ ...base, who: "model" }, now).status).toBe("proposed");
  });

  it("describes the timeline in words, and gives the same points as a table", () => {
    const html = signoffTimeline("2024-01-10", new Date("2026-06-01"));
    const doc = new JSDOM(`<div>${html}</div>`).window.document;
    const label = doc.querySelector("svg").getAttribute("aria-label");
    expect(label).toContain("Checked on 2024-01-10");
    expect(label).toContain("Lapses on 2026-01-09");
    expect(label).toMatch(/after it lapsed/);
    expect(doc.querySelector("table.grid-alt caption").textContent).toBe(label);
    expect([...doc.querySelectorAll("tbody th")].map((t) => t.textContent)).toEqual(["Checked", "Today", "Lapses"]);
  });

  it("keeps the builder's controls, labels and script the same in every track", () => {
    const shared = (t) => {
      const stage = lesson4Doc(t).querySelector('[data-stage="pictorial"]');
      return [...stage.querySelectorAll("label, legend, h2, h3")].map((e) => e.firstChild.textContent.trim())
        .concat([".moves", ".say", ".watch"].map((s) => stage.querySelector(s).outerHTML)).join("\n");
    };
    for (const t of TRACK_IDS.slice(1)) expect(shared(t), t).toBe(shared(TRACK_IDS[0]));
    expect(lesson4Doc(TRACK_IDS[0]).querySelector("#content script")).toBeNull();
  });

  it("keeps warm-up, abstract and check identical across tracks", () => {
    const html = (t, sel) => lesson4Doc(t).querySelector(sel).innerHTML;
    for (const sel of ['[data-stage="warmup"]', '[data-stage="abstract"]', '[data-stage="check"]']) {
      for (const t of TRACK_IDS.slice(1)) expect(html(t, sel), `${sel} ${t}`).toBe(html(TRACK_IDS[0], sel));
    }
  });

  it("labels every field so a screen reader names it", () => {
    const doc = lesson4Doc(TRACK_IDS[0]);
    for (const input of doc.querySelectorAll("#so-form input")) expect(input.closest("label"), input.id || input.value).not.toBeNull();
    expect(doc.querySelector("#so-form fieldset legend").textContent).toBe("Who is signing?");
  });
});

const lesson5 = getLesson(5);
const classifyData = (track) => lesson5.stages[0].tracks[track].classify;
const checksData = lesson5.stages[1].checks;
const lesson5Doc = (track) => lessonDoc(track, lesson5);
const tick = (doc, id, on = true) => {
  const box = doc.querySelector(`#ck-form input[value="${id}"]`);
  box.checked = on;
  box.dispatchEvent(new doc.defaultView.Event("change", { bubbles: true }));
};

describe.each(TRACK_IDS)("lesson 5, %s track", (track) => {
  const doc = lesson5Doc(track);

  it("renders warm-up, concrete, pictorial, abstract, check in order", () => {
    expect([...doc.querySelectorAll("[data-stage]")].map((s) => s.dataset.stage)).toEqual(["warmup", "concrete", "pictorial", "abstract", "check"]);
  });

  it("shows the request, then five sentences with answers closed, and says it's made up", () => {
    expect(doc.querySelector(".classify .req").textContent).toContain(classifyData(track).request);
    const items = doc.querySelectorAll(".classify ol > li");
    expect(items).toHaveLength(5);
    classifyData(track).items.forEach((d, i) => expect(items[i].querySelector("p").textContent).toBe(d.text));
    for (const d of doc.querySelectorAll(".classify details")) expect(d.open).toBe(false);
    expect(doc.querySelector(".classify figcaption").textContent).toContain("made up");
  });

  it("labels each answer in words, says where to look, and quotes the rule a misread sentence breaks", () => {
    const keys = [...doc.querySelectorAll(".classify .k")].map((k) => k.textContent);
    expect(keys).toEqual(classifyData(track).items.map((d) => ERROR_LABEL[d.key]));
    const misread = classifyData(track).items.find((d) => d.key === "misread");
    expect(doc.querySelector(".classify").textContent).toContain(`The request said: “${misread.rule}”`);
    const where = [...doc.querySelectorAll(".classify .src")].filter((p) => p.textContent.startsWith("Where to look"));
    expect(where).toHaveLength(5);
  });

  it("shows a source card for the outdated sentence only", () => {
    const cards = [...doc.querySelectorAll(".classify .src")].filter((p) => p.textContent.startsWith("Source card"));
    expect(cards).toHaveLength(1);
  });
});

describe("lesson 5: the checklist builder", () => {
  const stage = lesson5.stages[1];

  it("starts empty: nothing ticked, an empty grid, and a status that says so", () => {
    const doc = lesson5Doc(TRACK_IDS[0]);
    expect(doc.querySelectorAll("#ck-form input[type=checkbox]")).toHaveLength(checksData.length);
    expect(doc.querySelectorAll("#ck-form input:checked")).toHaveLength(0);
    expect(doc.querySelector("#ck-status").textContent).toContain("No checks yet");
    expect(doc.querySelector("#ck-status").getAttribute("aria-live")).toBe("polite");
    expect(doc.querySelector("#ck-figure svg").getAttribute("aria-label")).toContain("Empty until you pick checks");
    expect(doc.querySelectorAll("#ck-figure .g-mark")).toHaveLength(0);
  });

  it("marks the grid, the table and the status as checks are ticked and unticked", () => {
    const doc = lesson5Doc(TRACK_IDS[0]);
    tick(doc, "c1");
    expect(doc.querySelectorAll("#ck-figure .g-mark")).toHaveLength(1);
    expect(doc.querySelector("#ck-status").textContent).toContain("This covers fabrication. Nothing catches outdated information, bias and a misread request.");
    expect(doc.querySelector("#ck-figure svg").getAttribute("aria-label")).toContain("Fabrication is covered by check 1.");
    const rows = [...doc.querySelectorAll("#ck-figure tbody tr")].map((tr) => tr.querySelector("td").textContent.replace(/\s+/g, " ").trim());
    expect(rows).toEqual(["Check 1", "Nothing yet", "Nothing yet", "Nothing yet"]);
    tick(doc, "c1", false);
    expect(doc.querySelectorAll("#ck-figure .g-mark")).toHaveLength(0);
    expect(doc.querySelector("#ck-status").textContent).toContain("No checks yet");
  });

  it("reaches full coverage with four checks, and says how many of the five were used", () => {
    const doc = lesson5Doc(TRACK_IDS[0]);
    for (const id of ["c1", "c2", "c3", "c4"]) tick(doc, id);
    expect(doc.querySelectorAll("#ck-figure .g-mark")).toHaveLength(4);
    expect(doc.querySelector("#ck-status").textContent).toBe("Every kind of error has a check. You used 4 of 5. On today's answer it catches all 4 mistakes.");
    expect(doc.querySelector("#ck-figure svg").getAttribute("aria-label")).toContain("Every kind is covered.");
    expect([...doc.querySelectorAll("#ck-figure .g-stat")].map((t) => t.textContent)).toEqual(Array(4).fill("✓ Covered"));
  });

  it("names a check that catches nothing, and marks nothing for it", () => {
    const doc = lesson5Doc(TRACK_IDS[0]);
    tick(doc, "c6");
    expect(doc.querySelectorAll("#ck-figure .g-mark")).toHaveLength(0);
    expect(doc.querySelector("#ck-status").textContent).toContain("None of these checks catches any of the four kinds. Check 6 catches none of the four kinds.");
    expect([...doc.querySelectorAll("#ck-figure .g-stat")].every((t) => t.textContent === "✕ Not covered")).toBe(true);
  });

  it("says when one check repeats another, and warns when the list gets long", () => {
    const doc = lesson5Doc(TRACK_IDS[0]);
    for (const id of ["c4", "c5"]) tick(doc, id);
    expect(doc.querySelector("#ck-status").textContent).toContain("Check 5 repeats check 4.");
    for (const id of ["c1", "c2", "c3"]) tick(doc, id);
    expect(doc.querySelector("#ck-status").textContent).toContain("You used 5 of 5.");
    expect(doc.querySelector("#ck-status").textContent).not.toContain("is short");
    tick(doc, "c6");
    expect(doc.querySelector("#ck-status").textContent).toContain("That's 6 checks. A checklist people use is short.");
  });

  it.each(TRACK_IDS)("runs the checklist over the %s track's own answer, sentence by sentence", (track) => {
    const doc = lesson5Doc(track);
    const items = classifyData(track).items;
    expect(doc.querySelector("#ck-run").textContent).toContain("Tick a check to run it");
    tick(doc, "c1");
    const lines = [...doc.querySelectorAll("#ck-run li")];
    expect(lines).toHaveLength(items.length);
    items.forEach((it, i) => {
      expect(lines[i].querySelector(".k").textContent).toBe(ERROR_LABEL[it.key]);
      const want = it.key === "fine" ? "Nothing to catch" : it.key === "fabrication" ? "Caught by check 1" : "Slips through";
      expect(lines[i].textContent, `${track} sentence ${i + 1}`).toContain(want);
    });
    expect(doc.querySelector("#ck-status").textContent).toContain("On today's answer it catches 1 of 4 mistakes.");
    for (const id of ["c2", "c3", "c4"]) tick(doc, id);
    expect([...doc.querySelectorAll("#ck-run .ck-miss")]).toHaveLength(0);
    for (const id of ["c1", "c2", "c3", "c4"]) tick(doc, id, false);
    expect(doc.querySelector("#ck-run").textContent).toContain("Tick a check to run it");
  });

  it("says why a mistake got through, and counts only real mistakes", () => {
    const items = classifyData(TRACK_IDS[0]).items;
    const run = runChecklist(["c6", "c7"], checksData, items);
    expect(run.caught).toBe(0);
    expect(run.total).toBe(4);
    expect(run.results.find((r) => r.key === "fine").outcome).toBe("fine");
    const doc = lesson5Doc(TRACK_IDS[0]);
    tick(doc, "c6");
    const bias = [...doc.querySelectorAll("#ck-run li")].find((l) => l.querySelector(".k").textContent === "Bias");
    expect(bias.textContent).toContain("No check asks who is left out.");
  });

  it("prints the learner's checklist back, with the task they name", () => {
    const doc = lesson5Doc(TRACK_IDS[0]);
    expect(doc.querySelector("#ck-mine").textContent).toContain("Nothing ticked yet");
    tick(doc, "c4");
    tick(doc, "c1");
    const task = doc.querySelector("#ck-task");
    task.value = "Weekly parent email <b>";
    task.dispatchEvent(new doc.defaultView.Event("input", { bubbles: true }));
    expect([...doc.querySelectorAll("#ck-mine li")].map((l) => l.textContent)).toEqual([checksData[0].text, checksData[3].text]);
    expect(doc.querySelector("#ck-mine").textContent).toContain("For: Weekly parent email <b>");
    expect(doc.querySelector("#ck-mine b")).toBeNull();
  });

  it("computes coverage the same way from the data as it shows on the page", () => {
    const s = checklistStatus(["c2", "c3", "c7"], checksData, stage.limit);
    expect(s.covered).toEqual(["outdated", "bias"]);
    expect(s.gaps).toEqual(["fabrication", "misread"]);
    expect(s.weak.map((c) => c.id)).toEqual(["c7"]);
    expect(s.over).toBe(false);
    expect(checklistStatus(checksData.map((c) => c.id), checksData, stage.limit).over).toBe(true);
    expect(KINDS).toHaveLength(4);
  });

  it("keeps the builder's controls, labels, checks and script the same in every track", () => {
    const shared = (t) => lesson5Doc(t).querySelector('[data-stage="pictorial"]').innerHTML;
    for (const t of TRACK_IDS.slice(1)) expect(shared(t), t).toBe(shared(TRACK_IDS[0]));
    expect(lesson5Doc(TRACK_IDS[0]).querySelector("#content script")).toBeNull();
  });

  it("keeps warm-up, abstract and check identical across tracks", () => {
    const html = (t, sel) => lesson5Doc(t).querySelector(sel).innerHTML;
    for (const sel of ['[data-stage="warmup"]', '[data-stage="abstract"]', '[data-stage="check"]']) {
      for (const t of TRACK_IDS.slice(1)) expect(html(t, sel), `${sel} ${t}`).toBe(html(TRACK_IDS[0], sel));
    }
  });

  it("labels every check so a screen reader names it, each with a different name", () => {
    const doc = lesson5Doc(TRACK_IDS[0]);
    const names = [...doc.querySelectorAll("#ck-form input")].map((i) => i.closest("label").textContent.replace(/\s+/g, " ").trim());
    expect(new Set(names).size).toBe(names.length);
    expect(doc.querySelector("#ck-form fieldset legend").textContent).toBe("Pick up to 5 checks");
  });
});

const lesson6 = getLesson(6);
const screenData = (track) => lesson6.stages[0].tracks[track].screen;
const lesson6Doc = (track) => lessonDoc(track, lesson6);

describe.each(TRACK_IDS)("lesson 6, %s track", (track) => {
  const doc = lesson6Doc(track);

  it("renders warm-up, concrete, pictorial, abstract, check in order", () => {
    expect([...doc.querySelectorAll("[data-stage]")].map((s) => s.dataset.stage)).toEqual(["warmup", "concrete", "pictorial", "abstract", "check"]);
  });

  it("frames the screen safely: sandboxed without same-origin, titled, inline, sized", () => {
    const f = doc.querySelector("iframe.mock");
    expect(f.getAttribute("sandbox")).toBe("allow-scripts");
    expect(f.getAttribute("sandbox")).not.toContain("allow-same-origin");
    expect(f.getAttribute("title")).toContain(screenData(track).title);
    expect(f.hasAttribute("src")).toBe(false);
    expect(f.getAttribute("srcdoc")).toBe(screenData(track).html);
    expect(Number(f.getAttribute("height"))).toBe(screenData(track).height);
  });

  it("gives a text version with every part, closed, and says the screen is made up", () => {
    const tv = doc.querySelector("details.textver");
    expect(tv.open).toBe(false);
    expect(tv.querySelector("summary").textContent).toBe("Text version of this screen");
    expect([...tv.querySelectorAll("li")].map((l) => l.textContent)).toEqual(screenData(track).parts.map((p) => p.desc));
    expect(doc.querySelector(".screen figcaption").textContent).toContain("made up");
  });

  it("lists the six parts, each with a closed reveal naming the principle and the goal", () => {
    const items = doc.querySelectorAll('[data-stage="concrete"] ol.gaps > li');
    expect(items).toHaveLength(6);
    screenData(track).parts.forEach((p, i) => {
      expect(items[i].querySelector("p").textContent).toBe(p.label);
      expect(items[i].querySelector("details").open).toBe(false);
      expect(items[i].querySelector(".k").textContent).toBe(PRINCIPLE_LABEL[p.principle]);
      if (p.goal) expect(items[i].querySelector(".goal").textContent).toContain(p.goal);
      else expect(items[i].querySelector(".goal")).toBeNull();
    });
  });

  it("describes the empty grid, then places each problem and gives the fix order once revealed", () => {
    const d = lesson6Doc(track);
    expect(d.querySelector("#grid svg").getAttribute("aria-label")).toContain("Empty until revealed");
    expect(d.querySelectorAll("#grid .g-mark")).toHaveLength(0);
    d.querySelector("#reveal-grid").click();
    const label = d.querySelector("#grid svg").getAttribute("aria-label");
    const order = fixOrder(screenData(track).parts).map((p) => p.n);
    expect(d.querySelectorAll("#grid svg .g-mark")).toHaveLength(5);
    expect(label).toContain(`Fix in this order: ${order.join(", ")}.`);
    expect(d.querySelector("#grid .fix-order").textContent).toContain(`problem ${order[0]}`);
    expect(d.querySelector("#grid table caption").textContent).toBe(label);
    expect(d.activeElement).toBe(d.querySelector("#grid"));
  });

  it("shows the goals and principles as reference tables in the abstract stage", () => {
    const tables = doc.querySelectorAll('[data-stage="abstract"] table.ref');
    expect(tables).toHaveLength(2);
    expect([...tables[0].querySelectorAll("tbody th")].map((t) => t.textContent)).toEqual(["Learnability", "Efficiency", "Memorability", "Errors", "Satisfaction"]);
    expect(tables[1].querySelectorAll("tbody tr")).toHaveLength(7);
  });
});

describe("lesson 6: one core across tracks", () => {
  const html = (t, sel) => lesson6Doc(t).querySelector(sel).innerHTML;

  it("keeps warm-up, abstract and check identical across tracks", () => {
    for (const sel of ['[data-stage="warmup"]', '[data-stage="abstract"]', '[data-stage="check"]']) {
      for (const t of TRACK_IDS.slice(1)) expect(html(t, sel), `${sel} ${t}`).toBe(html(TRACK_IDS[0], sel));
    }
  });

  it("keeps the grid's controls, headings and script the same; only the problems change", () => {
    const shared = (t) => {
      const stage = lesson6Doc(t).querySelector('[data-stage="pictorial"]');
      return ["#reveal-grid", ".moves", ".say", ".watch"].map((s) => stage.querySelector(s).outerHTML)
        .concat([...stage.querySelectorAll("h2, h3")].map((h) => h.textContent)).join("\n");
    };
    for (const t of TRACK_IDS.slice(1)) expect(shared(t), t).toBe(shared(TRACK_IDS[0]));
  });

  it("orders fixes by harm, then by reach", () => {
    const order = fixOrder([
      { principle: "a", harm: "low", reach: "all" },
      { principle: "fine" },
      { principle: "b", harm: "high", reach: "few" },
      { principle: "c", harm: "high", reach: "all" },
      { principle: "d", harm: "medium", reach: "some" }
    ]).map((p) => p.n);
    expect(order).toEqual([4, 3, 5, 1]);
  });
});

const lesson7 = getLesson(7);
const auditData = (track) => lesson7.stages[0].tracks[track].screen;
const lesson7Doc = (track) => lessonDoc(track, lesson7);
const typeInto = (doc, id, value) => {
  const el = doc.querySelector(`#${id}`);
  el.value = value;
  el.dispatchEvent(new doc.defaultView.Event("input", { bubbles: true }));
};

describe.each(TRACK_IDS)("lesson 7, %s track", (track) => {
  const doc = lesson7Doc(track);

  it("renders warm-up, concrete, pictorial, abstract, check in order", () => {
    expect([...doc.querySelectorAll("[data-stage]")].map((s) => s.dataset.stage)).toEqual(["warmup", "concrete", "pictorial", "abstract", "check"]);
  });

  it("frames the screen safely, with a text version of every part", () => {
    const f = doc.querySelector("iframe.mock");
    expect(f.getAttribute("sandbox")).toBe("allow-scripts");
    expect(f.getAttribute("srcdoc")).toBe(auditData(track).html);
    expect([...doc.querySelectorAll("details.textver li")].map((l) => l.textContent)).toEqual(auditData(track).parts.map((p) => p.desc));
  });

  it("reveals each part as an accessibility failure with its criterion and level, a pattern with its fix, or a part that works", () => {
    const items = doc.querySelectorAll('[data-stage="concrete"] ol.gaps > li');
    expect(items).toHaveLength(6);
    auditData(track).parts.forEach((p, i) => {
      const reveal = items[i].querySelector("details");
      expect(reveal.open).toBe(false);
      expect(reveal.querySelector(".k").textContent).toBe(AUDIT_LABEL[p.kind]);
      if (p.kind === "wcag") expect(reveal.textContent).toContain(`${p.criterion} ${p.name} · Level ${p.level}`);
      if (p.kind === "pattern") expect(reveal.textContent).toContain(`Calmer fix: ${p.fix}`);
    });
  });

  it("starts the checker on the screen's failing pair, and says so in words", () => {
    const c = auditData(track).contrast;
    expect(doc.querySelector("#cc-fg").value).toBe(c.fg);
    expect(doc.querySelector("#cc-bg").value).toBe(c.bg);
    const status = doc.querySelector("#cc-status");
    expect(status.getAttribute("aria-live")).toBe("polite");
    expect(status.textContent).toMatch(/^\d+\.\d{2} to 1\. Fails /);
    expect(doc.querySelector("#cc-use").disabled).toBe(false);
    expect(doc.querySelector("#cc-figure svg").getAttribute("aria-label")).toContain(`${c.fg} on background ${c.bg}`);
  });

  it("makes the pair pass with the nearest passing colour, and Reset brings it back", () => {
    const d = lesson7Doc(track);
    const c = auditData(track).contrast;
    d.querySelector("#cc-use").click();
    const fixed = d.querySelector("#cc-fg").value;
    expect(contrastRatio(fixed, c.bg)).toBeGreaterThanOrEqual(c.use === "ui" ? 3 : 4.5);
    expect(d.querySelector("#cc-status").textContent).toContain("Passes");
    expect(d.querySelector("#cc-use").disabled).toBe(true);
    expect(d.querySelector("#cc-fg-pick").value).toBe(fixed.toLowerCase());
    d.querySelector("#cc-reset").click();
    expect(d.querySelector("#cc-fg").value).toBe(c.fg);
    expect(d.querySelector("#cc-status").textContent).toContain("Fails");
  });

  it("shows the audit reference tables, and the course audit's known cost", () => {
    const titles = [...doc.querySelectorAll('[data-stage="abstract"] h3.subhead')].map((h) => h.textContent);
    expect(titles).toEqual(expect.arrayContaining(["WCAG 2.2 at a glance (W3C, 2023)", "The three levels", "Addictive patterns and calmer fixes", "This course, audited"]));
    expect(doc.querySelector('[data-stage="abstract"]').textContent).toContain("Known cost");
  });
});

describe("lesson 7: the contrast checker", () => {
  it("measures by the WCAG formula, and rounds down so nothing rounds up into a pass", () => {
    expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 5);
    expect(checkContrast("#999999", "#FFFFFF").text).toBe("2.84 to 1. Fails normal text, AA. The nearest colour that passes is #767676.");
    expect(checkContrast("#767676", "#FFFFFF").text).toBe("4.54 to 1. Passes normal text, AA.");
  });

  it("marks every level pass or fail in words", () => {
    const r = checkContrast("#767676", "#FFFFFF");
    expect(Object.fromEntries(r.levels.map((l) => [l.id, l.pass]))).toEqual({ "text-aa": true, "large-aa": true, "ui-aa": true, "text-aaa": false, "large-aaa": true });
  });

  it("checks parts of the screen against 3 to 1, not 4.5", () => {
    const r = checkContrast("#949494", "#FFFFFF", "ui");
    expect(r.target.id).toBe("ui-aa");
    expect(r.target.pass).toBe(true);
    expect(r.suggestion).toBeNull();
  });

  it("finds the nearest passing colour on dark backgrounds too, by going lighter", () => {
    const c = nearestPassing("#333333", "#000000", 4.5);
    expect(contrastRatio(c, "#000000")).toBeGreaterThanOrEqual(4.5);
    expect(parseInt(c.slice(1, 3), 16)).toBeGreaterThan(0x33);
  });

  it("reads short, long, lower-case and bare hex codes, and names the bad one in its message", () => {
    expect(parseHex("abc")).toBe("#AABBCC");
    expect(parseHex("#a0a6b0")).toBe("#A0A6B0");
    expect(parseHex("#12")).toBeNull();
    expect(checkContrast("red", "#FFFFFF").text).toBe("Enter the first colour as a hex code, like #1F2430.");
    expect(checkContrast("#000", "nope").text).toBe("Enter the background as a hex code, like #1F2430.");
  });

  it("updates as a learner types, keeps the picker in step, and handles a bad code without breaking", () => {
    const doc = lesson7Doc(TRACK_IDS[0]);
    typeInto(doc, "cc-fg", "#1f2430");
    expect(doc.querySelector("#cc-fg-pick").value).toBe("#1f2430");
    expect(doc.querySelector("#cc-status").textContent).toContain("Passes");
    typeInto(doc, "cc-fg", "#1f24");
    expect(doc.querySelector("#cc-status").textContent).toContain("hex code");
    expect(doc.querySelector("#cc-results").textContent).toContain("No results");
    expect(doc.querySelector("#cc-use").disabled).toBe(true);
  });

  it("keeps the checker's controls and labels the same in every track; only the starting pair changes", () => {
    const shared = (t) => {
      const stage = lesson7Doc(t).querySelector('[data-stage="pictorial"]');
      return [...stage.querySelectorAll("label, button, h2, h3, th[scope=col]")].map((e) => e.firstChild.textContent.trim())
        .concat([".moves", ".say", ".watch"].map((s) => stage.querySelector(s).outerHTML)).join("\n");
    };
    for (const t of TRACK_IDS.slice(1)) expect(shared(t), t).toBe(shared(TRACK_IDS[0]));
  });

  it("keeps warm-up, abstract and check identical across tracks", () => {
    const html = (t, sel) => lesson7Doc(t).querySelector(sel).innerHTML;
    for (const sel of ['[data-stage="warmup"]', '[data-stage="abstract"]', '[data-stage="check"]']) {
      for (const t of TRACK_IDS.slice(1)) expect(html(t, sel), `${sel} ${t}`).toBe(html(TRACK_IDS[0], sel));
    }
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
  it.each([[1, lessonDoc], [2, lesson2Doc], [3, lesson3Doc], [4, lesson4Doc], [5, lesson5Doc], [6, lesson6Doc], [7, lesson7Doc]])("lesson %i: every stage carries its notes in a labelled box", (n, make) => {
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
    for (const make of [lessonDoc, lesson2Doc, lesson3Doc, lesson4Doc, lesson5Doc, lesson6Doc, lesson7Doc]) {
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
  it.each([[1, lessonDoc], [2, lesson2Doc], [3, lesson3Doc], [4, lesson4Doc], [5, lesson5Doc], [6, lesson6Doc], [7, lesson7Doc]])("lesson %i: names each stage in words and each objective in the header", (n, make) => {
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
    ...TRACK_IDS.map((t) => [`lesson 3 (${t})`, lesson3Doc(t)]),
    ...TRACK_IDS.map((t) => [`lesson 4 (${t})`, lesson4Doc(t)]),
    ...TRACK_IDS.map((t) => [`lesson 5 (${t})`, lesson5Doc(t)]),
    ...TRACK_IDS.map((t) => [`lesson 6 (${t})`, lesson6Doc(t)]),
    ...TRACK_IDS.map((t) => [`lesson 7 (${t})`, lesson7Doc(t)])
  ])("%s has one h1 and never skips a heading level", (_, doc) => {
    const levels = outline(doc);
    expect(levels.filter((l) => l === 1)).toHaveLength(1);
    levels.forEach((l, i) => i && expect(l, `h${levels[i - 1]} → h${l}`).toBeLessThanOrEqual(levels[i - 1] + 1));
  });

  it.each([
    ["hub", hub],
    ["lesson 1", lessonDoc(TRACK_IDS[0])],
    ["lesson 2", lesson2Doc(TRACK_IDS[0])],
    ["lesson 3", lesson3Doc(TRACK_IDS[0])],
    ["lesson 4", lesson4Doc(TRACK_IDS[0])],
    ["lesson 5", lesson5Doc(TRACK_IDS[0])],
    ["lesson 6", lesson6Doc(TRACK_IDS[0])],
    ["lesson 7", lesson7Doc(TRACK_IDS[0])]
  ])("%s gives every control a distinct accessible name", (_, doc) => {
    const names = [...doc.querySelectorAll("button, summary, a[href]")].map((e) => (e.getAttribute("aria-label") || e.textContent).replace(/\s+/g, " ").trim());
    expect(names.filter((n, i) => names.indexOf(n) !== i)).toEqual([]);
  });

  it("moves focus to the grid when it is shown", () => {
    const doc = lessonDoc(TRACK_IDS[0]);
    doc.querySelector("#reveal-grid").click();
    expect(doc.activeElement).toBe(doc.querySelector("#grid"));
  });
});

describe("user control and context fixes (UX audit, 2026-09-24)", () => {
  // A facilitator can run the activity again without reloading.
  it.each([[1, (t) => lessonDoc(t)], [3, (t) => lesson3Doc(t)], [6, (t) => lesson6Doc(t)]])(
    "lesson %i: the grid can be hidden again, empty as before, with focus left on the button",
    (n, make) => {
      const doc = make(TRACK_IDS[0]);
      const btn = doc.querySelector("#reveal-grid");
      const empty = doc.querySelector("#grid svg").getAttribute("aria-label");
      btn.click();
      expect(btn.textContent).toBe("Hide the finished grid");
      expect(doc.querySelectorAll("#grid svg .g-mark").length).toBeGreaterThan(0);
      btn.focus();
      btn.click();
      expect(btn.textContent).toBe("Show the finished grid");
      expect(doc.querySelectorAll("#grid svg .g-mark")).toHaveLength(0);
      expect(doc.querySelector("#grid svg").getAttribute("aria-label")).toBe(empty);
      expect(doc.activeElement).toBe(btn);
      btn.click();
      expect(doc.querySelectorAll("#grid svg .g-mark").length).toBeGreaterThan(0);
    }
  );

  it("lesson 4: Start again puts the sign-off builder back where it began", () => {
    const doc = lesson4Doc(TRACK_IDS[0]);
    const startBy = doc.querySelector("#so-by").value;
    const startStatus = doc.querySelector("#so-status").textContent;
    setField(doc, "so-by", "");
    const model = doc.querySelector('input[name="so-who"][value="model"]');
    model.checked = true;
    model.dispatchEvent(new doc.defaultView.Event("change", { bubbles: true }));
    expect(doc.querySelector("#so-badge").textContent.trim()).toBe("Proposed");
    doc.querySelector("#so-reset").click();
    expect(doc.querySelector("#so-by").value).toBe(startBy);
    expect(doc.querySelector('input[name="so-who"][value="person"]').checked).toBe(true);
    expect(doc.querySelector("#so-status").textContent).toBe(startStatus);
    expect(doc.querySelector("#so-badge").textContent.trim()).toBe("Lapsed");
  });

  it("lesson 5: Start again clears every check and the task, and says so", () => {
    const doc = lesson5Doc(TRACK_IDS[0]);
    for (const id of ["c1", "c4", "c6"]) tick(doc, id);
    const task = doc.querySelector("#ck-task");
    task.value = "Weekly email";
    task.dispatchEvent(new doc.defaultView.Event("input", { bubbles: true }));
    doc.querySelector("#ck-reset").click();
    expect(doc.querySelectorAll("#ck-form input:checked")).toHaveLength(0);
    expect(task.value).toBe("");
    expect(doc.querySelector("#ck-status").textContent).toContain("No checks yet");
    expect(doc.querySelector("#ck-run").textContent).toContain("Tick a check to run it");
    expect(doc.querySelectorAll("#ck-figure .g-mark")).toHaveLength(0);
  });

  it.each(["index.html", "lesson.html"])("%s announces a track change in a live region outside the re-rendered area", async (name) => {
    const { boot } = await import("../lesson-core.js");
    const url = name === "lesson.html" ? "http://localhost/lesson.html?n=1&track=educators" : "http://localhost/index.html";
    const dom = new JSDOM(readFileSync(new URL(`../${name}`, import.meta.url), "utf8").replace(/<script[\s\S]*?<\/script>/g, ""), { url });
    const doc = dom.window.document;
    const live = doc.querySelector("#announce");
    expect(live.getAttribute("aria-live")).toBe("polite");
    expect(live.closest("#top, #content")).toBeNull();
    boot(doc);
    expect(live.textContent).toBe("");
    const radio = doc.querySelector('input[name="track"][value="professionals"]');
    radio.checked = true;
    radio.dispatchEvent(new dom.window.Event("change", { bubbles: true }));
    expect(live.textContent).toBe("Now showing the Professionals track.");
    expect(doc.activeElement).toBe(doc.querySelector('input[name="track"][value="professionals"]'));
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
    // Every lesson is built now, so take one and mark it not ready, as a new lesson starts out.
    renderLesson(doc, { ...COURSE.lessons[0], ready: false });
    expect(doc.querySelector("#content").textContent).toContain("still in design");
  });

  it("says an unknown lesson number doesn't exist", () => {
    const doc = page("lesson.html");
    renderLesson(doc, getLesson(99));
    expect(doc.querySelector("#content").textContent).toContain("no lesson with that number");
  });
});

describe("course search on the hub", () => {
  const hubDoc = (opts) => { const d = page("index.html"); renderHub(d, opts); return d; };
  const search = (d, q) => {
    const input = d.querySelector("#course-search");
    input.value = q;
    input.dispatchEvent(new d.defaultView.Event("input", { bubbles: true }));
  };

  it("has a labelled search box in a search landmark, and says what it searches", () => {
    const d = hubDoc();
    const input = d.querySelector("#course-search");
    expect(d.querySelector(`label[for="course-search"]`).textContent).toBe("Search lessons, objectives, stages and claims");
    expect(input.closest("form").getAttribute("role")).toBe("search");
    expect(input.type).toBe("search");
    expect(d.querySelector("#search-status").getAttribute("aria-live")).toBe("polite");
    expect(d.querySelector("#search-status").textContent).toBe("Search every lesson, objective, stage and claim.");
  });

  it("indexes every ready lesson, its objectives and stages, and every claim, each with a link", () => {
    const index = buildSearchIndex("students");
    const ready = COURSE.lessons.filter((l) => l.ready);
    expect(index.filter((e) => e.kind === "Lesson")).toHaveLength(ready.length);
    expect(index.filter((e) => e.kind === "Claim")).toHaveLength(Object.keys(CLAIMS).length);
    expect(index.filter((e) => e.kind === "Objective")).toHaveLength(ready.reduce((n, l) => n + l.objectives.length, 0));
    for (const e of index) expect(e.href, e.where).toMatch(/^(lesson\.html\?n=\d&track=students(#[a-z-]+)?|#claim-[a-z0-9-]+)$/);
  });

  it("finds by every word in any order, ranks title matches first, and links to the right place", () => {
    const d = hubDoc();
    search(d, "contrast checker");
    const items = [...d.querySelectorAll("#search-results li")];
    expect(items.length).toBeGreaterThan(0);
    expect(items[0].querySelector("a").textContent.toLowerCase()).toContain("contrast");
    expect(d.querySelector("#search-status").textContent).toMatch(/^\d+ results? for "contrast checker"\.$/);
    search(d, "nielsen usability");
    const hrefs = [...d.querySelectorAll("#search-results a")].map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("#claim-usability-goals");
    // Every claim link lands on a real card on this page, and following it opens the card's lesson group.
    for (const h of hrefs.filter((x) => x.startsWith("#"))) expect(d.querySelector(h), h).not.toBeNull();
    const link = d.querySelector('#search-results a[href="#claim-usability-goals"]');
    expect(d.querySelector("#claims-lesson-6").open).toBe(false);
    link.click();
    expect(d.querySelector("#claims-lesson-6").open).toBe(true);
  });

  it("forgives word forms: checker, checking and checks all find check", () => {
    const index = buildSearchIndex();
    for (const q of ["checker", "checking", "checks"]) expect(searchCourse(q, index).some((r) => r.title === "Check the contrast"), q).toBe(true);
    expect(highlight("Check the contrast", "checker")).toBe("<mark>Check</mark> the contrast");
  });

  it("marks matches in bold as well as colour, and never injects the query as markup", () => {
    expect(highlight("Check the contrast", "contrast")).toBe("Check the <mark>contrast</mark>");
    const d = hubDoc();
    search(d, "<img src=x onerror=alert(1)> claim");
    expect(d.querySelector("#search-results img")).toBeNull();
    expect(d.querySelector("#search-status").textContent).toContain("<img src=x onerror=alert(1)>");
    const css = readFileSync(new URL("../course.css", import.meta.url), "utf8");
    expect(css).toMatch(/mark\{[^}]*font-weight:700/);
  });

  it("gives each result link a name distinct from every other control on the page", () => {
    const d = hubDoc();
    search(d, "accessible");
    const names = [...d.querySelectorAll("button, summary, a[href]")].map((e) => e.textContent.replace(/\s+/g, " ").trim());
    expect(names.filter((n, i) => names.indexOf(n) !== i)).toEqual([]);
  });

  it("says what to do when nothing matches, or the query is too short", () => {
    expect(searchStatus("zzqqxx", [])).toBe('No results for "zzqqxx". Try fewer words, or a different spelling.');
    expect(searchStatus("a", [])).toBe("Type at least two letters.");
    const d = hubDoc();
    search(d, "zzqqxx");
    expect(d.querySelectorAll("#search-results li")).toHaveLength(0);
  });

  it("shows at most twenty, and says how to narrow down", () => {
    const d = hubDoc();
    search(d, "the");
    expect(d.querySelectorAll("#search-results li")).toHaveLength(20);
    expect(d.querySelector("#search-status").textContent).toContain("add a word to narrow them down");
  });

  it("clears with one button and puts focus back in the box", () => {
    const d = hubDoc();
    search(d, "bias");
    d.querySelector("#search-clear").click();
    expect(d.querySelector("#course-search").value).toBe("");
    expect(d.querySelectorAll("#search-results li")).toHaveLength(0);
    expect(d.activeElement).toBe(d.querySelector("#course-search"));
  });

  it("keeps the query, and relinks results to the new track, when the track changes", async () => {
    const { boot } = await import("../lesson-core.js");
    const dom = new JSDOM(readFileSync(new URL("../index.html", import.meta.url), "utf8").replace(/<script[\s\S]*?<\/script>/g, ""), { url: "http://localhost/index.html" });
    const d = dom.window.document;
    boot(d);
    search(d, "sign");
    const radio = d.querySelector('input[name="track"][value="students"]');
    radio.checked = true;
    radio.dispatchEvent(new dom.window.Event("change", { bubbles: true }));
    expect(d.querySelector("#course-search").value).toBe("sign");
    const lessonLinks = [...d.querySelectorAll("#search-results a")].map((a) => a.getAttribute("href")).filter((h) => h.startsWith("lesson"));
    expect(lessonLinks.length).toBeGreaterThan(0);
    for (const h of lessonLinks) expect(h).toContain("track=students");
  });

  it("gives every lesson page the anchors that results point to", () => {
    const d = lessonDoc(TRACK_IDS[0]);
    expect(d.querySelector("#objectives")).not.toBeNull();
    for (const k of ["warmup", "concrete", "pictorial", "abstract", "check"]) expect(d.querySelector(`#stage-${k}`), k).not.toBeNull();
  });
});

describe("hub evaluation levels", () => {
  it("shows the four levels in order, each with its number, name, who measures it, and a colour class", () => {
    const d = page("index.html");
    renderHub(d);
    const items = [...d.querySelectorAll("ol.eval-levels > li")];
    expect(items).toHaveLength(4);
    items.forEach((li, i) => {
      const n = i + 1;
      expect(li.classList.contains(`lvl-${n}`)).toBe(true);
      expect(li.querySelector("h3 .lvl-no").textContent).toBe(`Level ${n}`);
      expect(li.querySelector("h3").textContent).toContain(EVALUATION[n].name);
      expect(li.querySelector(".lvl-who").textContent).toBe(n < 4 ? "Built into every lesson" : "Measured by whoever adopts the course");
    });
  });
});

describe("attested claim cards count whole days", () => {
  // A claim signed today with a 730-day review must say 730, at any hour.
  it.each(["2026-09-24T00:30:00Z", "2026-09-24T12:30:00Z", "2026-09-24T23:30:00Z"])("counts to the lapse date, not the time of day (%s)", async (iso) => {
    const { claimCard } = await import("../lesson-core.js");
    const { CLAIMS: C } = await import("../claims.js");
    const signed = Object.entries(C).find(([, v]) => v.attestation.source === "practitioner");
    if (!signed) return;
    const [id, rec] = signed;
    const now = new Date(iso);
    const d = new JSDOM(`<div>${claimCard(id, now)}</div>`).window.document;
    const expected = Math.round((Date.parse(rec.attestation.verified) + (rec.attestation.ttlDays ?? 730) * 86400000 - Date.parse(iso.slice(0, 10))) / 86400000);
    expect(d.querySelector("dl").textContent).toContain(`${expected} days until it lapses`);
    if (rec.attestation.verified === iso.slice(0, 10)) expect(expected).toBe(rec.attestation.ttlDays ?? 730);
  });
});
