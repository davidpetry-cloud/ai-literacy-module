/**
 * UI floor, enforced from course.css so new lessons can't erode it.
 * Pattern and palette follow grade6-singapore-math-cpa's live pages.
 * Thresholds are WCAG 2.2 AA; every pairing is checked in both themes.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { JSDOM } from "jsdom";

const root = new URL("../", import.meta.url);
const read = (f) => readFileSync(new URL(f, root), "utf8");
const css = read("course.css").replace(/\/\*[\s\S]*?\*\//g, "");
const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({ sel: m[1].trim(), body: m[2] }));

function themeTokens(selector, { all = false } = {}) {
  const matches = rules.filter((r) => r.sel === selector);
  const body = (all ? matches : matches.slice(0, 1)).map((r) => r.body).join(";");
  return Object.fromEntries([...body.matchAll(/--([\w-]+):\s*([^;]+)/g)].map((m) => [m[1], m[2].trim()]));
}
const themedLight = themeTokens(":root");
const light = themeTokens(":root", { all: true });
const THEMES = { light, dark: { ...light, ...themeTokens(':root[data-theme="dark"]') } };

function hexIn(theme, v) {
  if (v.startsWith("#")) return v;
  const ref = v.match(/^var\(--([\w-]+)\)$/)?.[1] ?? v.replace(/^--/, "");
  return hexIn(theme, theme[ref]);
}
const lum = (h) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (theme, a, b) => {
  const [x, y] = [lum(hexIn(theme, a)), lum(hexIn(theme, b))];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
const LESSONS = Object.keys(light).filter((t) => /^l\d+$/.test(t)).map((t) => `--${t}`);
// Each lesson's fill (--fN): deep in both themes, under --on-lc text (David, 2026-10-20).
const FILLS = Object.keys(light).filter((t) => /^f\d+$/.test(t)).map((t) => `--${t}`);
const LIGHT_SURFACES = ["--card", "--paper", "--peri-pale", "--amber-pale", "--rose-pale"];

// Which text colours may sit on which surfaces. Adding a pairing here is a
// design decision — make it pass in both themes before using it in the CSS.
const PAIRS = {
  "--text": [...LIGHT_SURFACES, "--teal-pale"],
  "--ink": LIGHT_SURFACES,
  "--ink-2": LIGHT_SURFACES,
  "--ink-3": LIGHT_SURFACES,
  "--muted": ["--card", "--paper"],
  "--teal-text": ["--card", "--paper"],
  "--att-text": ["--card"],
  "--prop": ["--card"],
  "--exp": ["--card"],
  "--rej": ["--card"],
  "--on-lc": FILLS,
  "--on-dark": ["--header-bg", "--btn-bg", "--btn-bg-hover", "--chip-bg"],
  "--amber": ["--header-bg"],
  "--header-muted": ["--header-bg"],
  "--header-sub": ["--header-bg"],
  "--pill-text": ["--on-dark"],
  "--pill-hover-text": ["--amber"]
};

describe.each(Object.keys(THEMES))("%s theme contrast", (name) => {
  const theme = THEMES[name];
  const cases = Object.entries(PAIRS).flatMap(([fg, bgs]) => bgs.map((bg) => [fg, bg]));

  it.each(cases)("%s on %s is at least 4.5:1", (fg, bg) => {
    expect(contrast(theme, fg, bg)).toBeGreaterThanOrEqual(4.5);
  });

  // WCAG 2.2 non-text contrast: the focus ring must stand out from whatever it sits on.
  it.each(["--card", "--paper", "--header-bg"])("focus ring is at least 3:1 on %s", (bg) => {
    expect(contrast(theme, "--focus", bg)).toBeGreaterThanOrEqual(3);
  });

  // WCAG 2.2 non-text contrast (1.4.11): the lines that make a grid a grid, and
  // the ring that keeps a button's shape, must be 3:1 against the surface under them.
  it.each([["--edge", "--card"], ["--btn-edge", "--card"], ["--btn-edge", "--paper"]])("%s is at least 3:1 on %s", (edge, bg) => {
    expect(contrast(theme, edge, bg)).toBeGreaterThanOrEqual(3);
  });

  // Box outlines (David, 2026-10-05): a coloured box is outlined in its own colour, a white box in
  // --edge. Each outline must show against the page and the card behind it.
  const OUTLINES = ["--edge", "--peri", "--teal", "--prop", "--rose", ...LESSONS];
  it.each(OUTLINES.flatMap((o) => ["--paper", "--card"].map((bg) => [o, bg])))("box outline %s is at least 3:1 on %s", (o, bg) => {
    expect(contrast(theme, o, bg)).toBeGreaterThanOrEqual(3);
  });

  it.each(LESSONS)("lesson colour %s is readable as text on a card", (l) => {
    expect(contrast(theme, l, "--card")).toBeGreaterThanOrEqual(4.5);
  });
});

// Visual refresh item 1 (David, 2026-10-08). In dark mode the header and the page are almost the same
// colour, so the hub and Sources headers need an edge that shows. In light mode the dark header is its own edge.
describe("header edge", () => {
  // Since 2026-10-20 the edge is the Singapore Math wave: an amber line along the crest of the Danube.
  it("closes the hub and Sources header with the wave and its amber line", () => {
    expect(rules.find((r) => r.sel === '[data-page="hub"] .top::before,[data-page="sources"] .top::before')?.body).toMatch(/mask-image:url\(textures\/wave-line\.svg\);background:var\(--amber\)/);
    for (const f of ["roof-diamonds", "wave-fill", "wave-line", "flourish"]) expect(read(`textures/${f}.svg`), f).toContain("<svg");
  });

  it("shows the amber rule at 3:1 against the dark page, and the header itself against the light page", () => {
    expect(contrast(THEMES.dark, "--amber", "--paper")).toBeGreaterThanOrEqual(3);
    expect(contrast(THEMES.light, "--header-bg", "--paper")).toBeGreaterThanOrEqual(3);
  });
});

// Visual refresh item 5 (David, 2026-10-13): answer keys look like something to press. The summary stays
// a 44px tap area and draws a lighter 32px pill (44 less 6px top and bottom); its focus ring sits on the pill.
describe("reveal pills", () => {
  const body = (sel) => rules.find((r) => r.sel === sel)?.body ?? "";

  it("draws a 32px pill in an edge outline inside the 44px summary", () => {
    expect(body(".key summary")).toContain("min-height:44px");
    expect(body(".key summary::after")).toMatch(/top:6px;bottom:6px/);
    expect(body(".key summary::after")).toContain("border:1.5px solid var(--edge)");
    expect(body(".key summary::after")).toContain("border-radius:var(--r-pill)");
  });

  it("moves the focus ring onto the pill rather than removing it", () => {
    expect(body(".key summary:focus-visible")).toContain("outline:none");
    expect(body(".key summary:focus-visible::after")).toContain("outline:3px solid var(--focus)");
  });

  it("slides an opened answer in only when motion is allowed", () => {
    expect(css).toMatch(/@media \(prefers-reduced-motion:no-preference\)\{\.key\[open\] > :not\(summary\)\{animation:reveal \.18s/);
  });

  it("keeps the pill's words and outline readable on the card and the page", () => {
    for (const theme of [THEMES.light, THEMES.dark]) {
      for (const bg of ["--card", "--paper"]) {
        expect(contrast(theme, "--ink-2", bg)).toBeGreaterThanOrEqual(4.5);
        expect(contrast(theme, "--edge", bg)).toBeGreaterThanOrEqual(3);
      }
    }
  });
});

describe("colour usage", () => {
  it("defines every light token again for dark", () => {
    const dark = themeTokens(':root[data-theme="dark"]');
    // Colours in the themed block must flip; the second :root holds header constants.
    const themed = Object.keys(themedLight).filter((k) => /^#/.test(themedLight[k]));
    for (const k of themed) expect(dark, `--${k}`).toHaveProperty(k);
  });

  it("uses border-only hues for borders, never for text", () => {
    const borderOnly = /(?:^|;)\s*color:\s*var\(--(teal|att|peri|rose)\)/;
    for (const r of rules) expect(r.body, r.sel).not.toMatch(borderOnly);
  });

  it("outlines boxes with a token that passes 3:1, never the faint --line", () => {
    const boxes = [".lvl", ".claim", ".claim-group", ".block", ".sidebox", ".search-results li", ".chat .turn", ".ref-list > div", ".support", ".watch,.expect,.crit", "table.basis", ".obj", ".warn", ".passage", ".facil"];
    for (const sel of boxes) {
      const body = rules.find((r) => r.sel === sel)?.body ?? "";
      expect(body, sel).toMatch(/border:1\.5px solid var\(--(edge|lvl|teal|prop|rose|lc,var\(--edge\))\)/);
    }
  });

  // Visual refresh item 2 (2026-10-13): one box language. A note is outlined in its own colour with a
  // 4px left rule; the facilitator box gets an --ink-3 rule so it stays apart from learner material.
  it("outlines each note in its own colour, with a 4px left rule", () => {
    expect(rules.find((r) => r.sel === ".watch,.expect,.crit").body).toContain("border-left-width:4px");
    expect(rules.find((r) => r.sel === ".expect,.crit").body).toContain("border-color:var(--peri)");
    expect(rules.find((r) => r.sel === ".facil").body).toContain("border-left:4px solid var(--ink-3)");
    for (const theme of [THEMES.light, THEMES.dark]) {
      for (const bg of ["--paper", "--card"]) expect(contrast(theme, "--ink-3", bg)).toBeGreaterThanOrEqual(3);
    }
  });

  // Reference tables (David, 2026-10-13: "everything is the same color and blends together"): a dark header
  // band, a pale first column and an --edge outline, so the parts of a table don't melt into the card.
  it("gives reference tables a dark header band, a pale first column and a box outline", () => {
    expect(rules.find((r) => r.sel === "table.ref").body).toContain("border:1.5px solid var(--edge)");
    expect(rules.find((r) => r.sel === ".ref thead th").body).toMatch(/color:var\(--on-dark\);background:var\(--chip-bg\)/);
    expect(rules.find((r) => r.sel === ".ref tbody th").body).toContain("background:var(--paper)");
    expect(rules.find((r) => r.sel === ".ref-list dt").body).toContain("background:var(--paper)");
  });

  // Dashed means one thing per place: a lesson still in design on the hub, the learner's own turn in a chat,
  // and a recovery step in the wrong place. The last two carry meaning by shape, not colour alone.
  it("uses a dashed border only where the shape carries a meaning", () => {
    const dashed = rules.filter((r) => /border[\w-]*:[^;]*dashed/.test(r.body)).map((r) => r.sel).sort();
    expect(dashed).toEqual([".card.pending", ".status.soon", ".chat .turn.you", ".rc-step.rc-off"].sort());
  });

  it("makes the whole hub card the click target, with a focus ring around the card", () => {
    expect(rules.find((r) => r.sel === ".card h3 a::after").body).toMatch(/position:absolute;inset:0/);
    expect(rules.find((r) => r.sel === ".card").body ?? "").toBeDefined();
    expect(rules.some((r) => r.sel === ".card" && r.body.includes("position:relative"))).toBe(true);
    // Focus moves to the whole card, never vanishes: the link's own outline is replaced, not removed.
    expect(rules.find((r) => r.sel === ".card h3 a:focus-visible::after").body).toMatch(/outline:3px solid var\(--focus\)/);
  });

  it("never paints a background with --ink, which flips in dark mode", () => {
    // SVG text uses fill as its text colour, so it's covered by PAIRS instead.
    const svgText = /\.g-col|\.g-row|\.g-meanlabel|\btext\b/;
    const inkFill = /(?:background|fill):\s*var\(--ink/;
    for (const r of rules.filter((r) => !svgText.test(r.sel))) expect(r.body, r.sel).not.toMatch(inkFill);
  });

  it("keeps amber text inside the dark header", () => {
    for (const r of rules.filter((r) => /(?:^|;)\s*color:\s*var\(--amber\)/.test(r.body))) {
      expect(r.sel.startsWith(".top"), r.sel).toBe(true);
    }
  });

  it("gives status badges and answer-key labels their own card background", () => {
    for (const sel of [".badge", ".k"]) {
      expect(rules.find((r) => r.sel === sel)?.body, sel).toContain("background:var(--card)");
    }
  });

  // The audit and these tests measure a colour, not the colour after opacity
  // has faded it. Fade nothing that carries text; use a token instead.
  it("never fades anything with opacity", () => {
    for (const r of rules) expect(r.body, r.sel).not.toMatch(/(?:^|;)\s*opacity\s*:/);
  });

  it("wraps long unbroken strings in a claim's provenance (DOIs, URLs), so an open card never scrolls sideways on a phone", () => {
    expect(rules.find((r) => r.sel === ".claim dd").body).toContain("overflow-wrap:anywhere");
  });

  // "anywhere" lowers a cell's narrowest width to one letter, so an auto-layout table squeezes its
  // label column until words split: "Autho / rity", "A / A / A" (UX audit 2026-10, finding 1).
  it("never lets a reference table's labels break mid-word; only body cells, which may hold an address", () => {
    const thRules = rules.filter((r) => r.sel.split(",").some((s) => /\.ref\b.*\bth\b/.test(s.trim())));
    for (const r of thRules) expect(r.body, r.sel).not.toContain("overflow-wrap:anywhere");
    expect(rules.find((r) => r.sel === ".ref th").body).toContain("overflow-wrap:break-word");
    expect(rules.find((r) => r.sel === ".ref td").body).toContain("overflow-wrap:anywhere");
  });

  // A quiet button stays light when hovered, so its dark text never lands on a dark band (finding 15).
  it("keeps the quiet button light in every state, with the button ring", () => {
    expect(rules.find((r) => r.sel === ".btn.quiet").body).toContain("background:var(--card)");
    expect(rules.find((r) => r.sel === ".btn.quiet").body).toContain("color:var(--ink)");
    expect(rules.find((r) => r.sel === ".btn.quiet:hover").body).toContain("background:var(--paper)");
  });

  it("lets the prompt comparison's columns shrink below 280px, so it reflows at 320px", () => {
    expect(rules.find((r) => r.sel === ".cmp").body).toContain("minmax(min(100%,280px),1fr)");
  });

  it("swaps wide reference tables for a stacked list in a narrow container", () => {
    expect(css).toMatch(/@container \(max-width:440px\)\{\.ref-wrap table\.ref\{display:none\}\.ref-wrap \.ref-list\{display:block\}\}/);
  });

  it("marks a rejected claim with a strike-through in a passing colour, not a fade", () => {
    const body = rules.find((r) => r.sel === '.claim[data-status="rejected"] > p').body;
    expect(body).toContain("line-through");
    expect(body).toContain("color:var(--rej)");
  });

  it("draws its own disclosure arrow, closed and open, so no summary loses it", () => {
    expect(rules.some((r) => r.sel === "summary::before" && r.body.includes('content:"▸"'))).toBe(true);
    expect(rules.some((r) => r.sel === "details[open] > summary::before" && r.body.includes('content:"▾"'))).toBe(true);
  });

  it("shows a narrow figure as a table instead of a drawing that scrolls sideways", () => {
    expect(css).toMatch(/@container \(max-width:\d+px\)\{\s*svg\.grid\{display:none\}\s*table\.grid-alt\{display:table\}/);
    expect(rules.find((r) => r.sel === "table.grid-alt").body).toContain("display:none");
    expect(rules.find((r) => r.sel === ".figure").body).toContain("container-type:inline-size");
  });

  it("makes a pressed button look different from an unpressed one, not just tick it", () => {
    const pressed = rules.find((r) => r.sel === '.cmp-btn[aria-pressed="true"]').body;
    expect(pressed).toContain("background:var(--card)");
    expect(pressed).toContain("color:var(--ink)");
    expect(rules.find((r) => r.sel === '.cmp-btn[aria-pressed="true"]::before').body).toContain("✓");
  });

  it("gives every button a ring, and draws grid lines and marks in the edge tokens", () => {
    expect(rules.find((r) => r.sel === ".btn").body).toContain("border:2px solid var(--btn-edge)");
    expect(rules.find((r) => r.sel === ".g-cell").body).toContain("stroke:var(--edge)");
    expect(rules.find((r) => r.sel === ".g-mark circle").body).toContain("stroke:var(--btn-edge)");
  });

  // main also has .wrap, whose padding shorthand beats a plain main rule; this once left a 0px gap.
  it("leaves 32px between the header and the page content", () => {
    expect(rules.find((r) => r.sel === "main.wrap")?.body).toContain("padding-top:32px");
  });

  it("prints in light colours whatever the screen theme", () => {
    expect(css).toMatch(/@media print\{\s*:root,:root\[data-theme="dark"\]\{/);
  });
});

describe("type", () => {
  const printStart = css.indexOf("@media print");
  const beforePrint = [...css.slice(0, printStart).matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({ sel: m[1].trim(), body: m[2] }));
  const SCALE = ["xs", "sm", "base", "md", "lg", "xl", "display"];
  const svgText = /^\.g-/;

  it("defines a type scale whose smallest step is 12.8px", () => {
    for (const step of SCALE) expect(light, `--fs-${step}`).toHaveProperty(`fs-${step}`);
    expect(Number(light["fs-xs"].replace("rem", "")) * 16).toBeGreaterThanOrEqual(12.8);
    const steps = SCALE.slice(0, -1).map((s) => Number(light[`fs-${s}`].replace("rem", "")));
    expect([...steps].sort((a, b) => a - b), "scale steps ascend").toEqual(steps);
    // The page title must outrank the lesson/track line even at its smallest.
    const displayMin = Number(light["fs-display"].match(/clamp\(([\d.]+)rem/)[1]);
    expect(displayMin).toBeGreaterThan(steps.at(-1) * 1.2);
  });

  it("sizes all text from the scale — no one-off font sizes", () => {
    for (const r of beforePrint) {
      // The root sets the size every --fs-* step scales from (17px body text, after Apple's guidelines).
      if (r.sel === "body" || r.sel === "html" || svgText.test(r.sel)) continue;
      for (const [, value] of r.body.matchAll(/font-size:\s*([^;]+)/g)) {
        expect(value.trim(), r.sel).toMatch(/^var\(--fs-(xs|sm|base|md|lg|xl|display)\)$/);
      }
    }
  });

  it("keeps diagram labels at 12.8px+ even at the diagram's narrowest", async () => {
    const { confidenceGrid, checkScale, signoffTimeline, checklistGrid, fixFirstGrid, controlGrid, overlapPlot, patternTimeline, gainsFigure, planGrid, shareGrid } = await import("../lesson-core.js");
    const { getLesson } = await import("../course.js");
    const eight = Array.from({ length: 8 }, (_, i) => ({ id: `c${i}`, catches: [] }));
    const viewBoxWidth = Math.max(...[confidenceGrid([]), checkScale([]), signoffTimeline("2026-01-01"), checklistGrid([], eight), fixFirstGrid([]), controlGrid([]), overlapPlot(getLesson(9).stages[1].overlap), patternTimeline(getLesson(10).stages[0].tracks.educators.thread.moments), gainsFigure(getLesson(11).stages[0].tracks.educators.chat), planGrid([], getLesson(12).stages[1].steps), shareGrid({}, getLesson(13).stages[1].items), shareGrid({}, getLesson(15).stages[1].items, { bins: getLesson(15).stages[1].bins })].map((svg) => Number(svg.match(/viewBox="0 0 ([\d.]+)/)[1])));
    const minWidth = Number(rules.find((r) => r.sel === "svg.grid").body.match(/min-width:(\d+)px/)[1]);
    for (const r of beforePrint.filter((r) => svgText.test(r.sel) && r.body.includes("font-size"))) {
      const px = Number(r.body.match(/font-size:(\d+)px/)[1]);
      expect(px * (minWidth / viewBoxWidth), r.sel).toBeGreaterThanOrEqual(12.8);
    }
  });

  // The smallest step is for labels a reader scans (ids, tags, timings), never
  // for a sentence addressed to them. Adding a selector here is a decision.
  const XS_LABELS = [".bloom", ".basis th", ".claim-id", ".badge", ".mins", ".targets", ".k", ".say .who", ".sidebox p b", "table.align"];
  it("reserves --fs-xs for labels, never instructions or questions", () => {
    const xs = beforePrint.filter((r) => r.body.includes("font-size:var(--fs-xs)")).map((r) => r.sel);
    expect(xs.sort()).toEqual([...XS_LABELS].sort());
  });

  // One heading order across every page, so a new lesson can't reshuffle it.
  it.each([
    [".subhead", "md"],
    [".sense", "base"],
    [".top h1", "display"],
    ["h2", "xl"],
    [".top .eyebrow", "xl"],
    [".block > h2", "lg"],
    [".sidebox h2", "md"],
    [".card h3", "lg"],
    [".tracks label", "md"],
    [".relevance", "md"],
    [".passage li > p", "md"]
  ])("%s uses --fs-%s", (sel, step) => {
    expect(rules.find((r) => r.sel === sel)?.body, sel).toContain(`font-size:var(--fs-${step})`);
  });

  // Apple's Human Interface Guidelines (David, 2026-10-20): 17px body text, set as a percentage so the
  // reader's own browser text size still applies.
  it("keeps body text at 17px with 1.6+ line height", () => {
    expect(rules.find((r) => r.sel === "html").body).toContain("font-size:106.25%");
    const body = rules.find((r) => r.sel === "body").body;
    expect(body).toContain("font-size:1rem");
    const lh = body.match(/line-height:var\(--(lh-[\w]+)\)/)[1];
    expect(Number(light[lh])).toBeGreaterThanOrEqual(1.6);
  });

  it("self-hosts every font it declares — no third-party font requests", () => {
    for (const [, file] of css.matchAll(/url\((fonts\/[^)]+)\)/g)) expect(existsSync(new URL(file, root)), file).toBe(true);
    for (const page of ["index.html", "lesson.html"]) expect(read(page)).not.toContain("fonts.googleapis.com");
    expect(existsSync(new URL("fonts/OFL-Lexend.txt", root))).toBe(true);
    expect(existsSync(new URL("fonts/OFL-Fraunces.txt", root))).toBe(true);
  });
});

describe("tap targets", () => {
  const minHeight = (sel) => Number(rules.find((r) => r.sel === sel)?.body.match(/min-height:(\d+)px/)?.[1] ?? 0);

  it.each([".btn", ".top a.back", ".theme-toggle", ".tracks label"])("%s is at least 44px tall", (sel) => {
    expect(minHeight(sel)).toBeGreaterThanOrEqual(44);
  });

  it.each([".key summary", ".claim details summary", ".foot-links a"])("%s is at least 44px tall", (sel) => {
    expect(minHeight(sel)).toBeGreaterThanOrEqual(44);
  });

  // A link inside a footer sentence is only one line tall, so the footer keeps its links in their own row.
  it("keeps every footer link in the 44px link row, not in the footer's sentences", () => {
    for (const p of ["index.html", "lesson.html", "sources.html"]) {
      const foot = read(p).match(/<footer[^>]*>([\s\S]*?)<\/footer>/)[1];
      const loose = foot.replace(/<ul class="foot-links">[\s\S]*?<\/ul>/, "");
      expect(loose, p).not.toMatch(/<a\s/);
      expect(foot, p).toMatch(/<ul class="foot-links">/);
    }
  });

  it("shows a visible focus ring", () => {
    expect(rules.find((r) => r.sel === ":focus-visible")?.body).toMatch(/outline:\s*3px/);
  });

  it("respects reduced motion", () => {
    expect(css).toContain("prefers-reduced-motion:reduce");
  });
});

describe("theme toggle", () => {
  function load({ saved = null, systemDark = false } = {}) {
    const dom = new JSDOM(read("lesson.html").replace(/<script type="module">[\s\S]*?<\/script>/, ""), {
      url: "http://localhost/lesson.html",
      runScripts: "outside-only"
    });
    const w = dom.window;
    w.matchMedia = () => ({ matches: systemDark, addEventListener() {} });
    if (saved) w.localStorage.setItem("ai-literacy-theme", saved);
    w.eval(read("theme-toggle.js"));
    w.document.dispatchEvent(new w.Event("DOMContentLoaded"));
    return w;
  }
  const theme = (w) => w.document.documentElement.dataset.theme;
  const btn = (w) => w.document.querySelector("[data-theme-toggle]");

  it("sits in every page's header, outside the re-rendered area", () => {
    for (const page of ["index.html", "lesson.html"]) {
      const doc = new JSDOM(read(page)).window.document;
      const b = doc.querySelector("header .hdr-row [data-theme-toggle]");
      expect(b, page).not.toBeNull();
      expect(b.closest("#top"), page).toBeNull();
      // Label in name (WCAG 2.5.3): what a sighted user reads is what a voice user says.
      expect(b.hasAttribute("aria-label"), page).toBe(false);
      expect(b.textContent.replace(/[^\w ]/gu, "").trim(), page).toBe("Dark mode");
      expect(b.querySelector("[aria-hidden='true']"), page).not.toBeNull();
    }
  });

  it("follows the system setting when nothing is saved", () => {
    expect(theme(load({ systemDark: true }))).toBe("dark");
    expect(theme(load({ systemDark: false }))).toBe("light");
  });

  it("lets a saved choice override the system", () => {
    expect(theme(load({ saved: "light", systemDark: true }))).toBe("light");
  });

  // A View Transition only when the browser has one and the learner allows motion; the theme always changes.
  function loadWith({ calm, vt }) {
    const dom = new JSDOM(read("lesson.html").replace(/<script type="module">[\s\S]*?<\/script>/, ""), {
      url: "http://localhost/lesson.html",
      runScripts: "outside-only"
    });
    const w = dom.window;
    w.matchMedia = (q) => ({ matches: q.includes("reduced-motion") ? calm : false, addEventListener() {} });
    const calls = [];
    if (vt) w.document.startViewTransition = (fn) => { calls.push(fn); fn(); return { finished: Promise.resolve() }; };
    w.eval(read("theme-toggle.js"));
    w.document.dispatchEvent(new w.Event("DOMContentLoaded"));
    return { w, calls };
  }

  // With reduce motion on, the theme still changes through a View Transition, but as a plain cross-fade:
  // the circle that spreads from the button needs motion on (David, 2026-10-20, after Apple's guidelines).
  it("spreads the new theme in a circle when motion is on, cross-fades it when motion is off, and changes it at once without View Transitions", () => {
    for (const [calm, vt, expected, circle] of [[false, true, 1, true], [true, true, 1, false], [false, false, 0, false]]) {
      const { w, calls } = loadWith({ calm, vt });
      btn(w).click();
      expect(theme(w), `calm ${calm}, vt ${vt}`).toBe("dark");
      expect(btn(w).textContent).toContain("Light mode");
      expect(calls.length, `calm ${calm}, vt ${vt}`).toBe(expected);
      expect(w.document.documentElement.classList.contains("vt-theme"), `calm ${calm}, vt ${vt}`).toBe(circle);
    }
  });

  it("keeps page changes a plain cross-fade with reduce motion: nothing switches View Transitions off, and the circle needs motion on", () => {
    expect(css).not.toMatch(/::view-transition-(?:group|old|new)\(\*\)\{animation:none/);
    expect(css).toContain(':root[data-motion="on"].vt-theme::view-transition-new(root){animation:vt-reveal');
    expect(css).not.toMatch(/(?:^|\})html\.vt-theme::view-transition/);
  });

  // No on-site motion switch (David, 2026-10-16); motion follows the device's reduce-motion setting.
  function loadMotion({ systemReduce = false } = {}) {
    const dom = new JSDOM(read("lesson.html").replace(/<script type="module">[\s\S]*?<\/script>/, ""), {
      url: "http://localhost/lesson.html",
      runScripts: "outside-only"
    });
    const w = dom.window;
    w.matchMedia = (q) => ({ matches: q.includes("reduced-motion") ? systemReduce : false, addEventListener() {} });
    w.eval(read("theme-toggle.js"));
    w.document.dispatchEvent(new w.Event("DOMContentLoaded"));
    return w;
  }

  it("has no motion button on any page", () => {
    for (const page of ["index.html", "lesson.html", "sources.html"]) {
      expect(new JSDOM(read(page)).window.document.querySelector("[data-motion-toggle]"), page).toBeNull();
    }
  });

  it("follows the device's reduce-motion setting", () => {
    expect(loadMotion({ systemReduce: true }).document.documentElement.dataset.motion).toBe("off");
    expect(loadMotion({ systemReduce: false }).document.documentElement.dataset.motion).toBe("on");
  });

  // With reduce motion on, nothing slides, zooms or scales: animations stop, only colour and shadow
  // transitions remain, and a hover lift stays put (David, 2026-10-20, after Apple's guidelines).
  it("turns movement into change at once or a fade when motion is off, whatever the device says", () => {
    const keep = "transition-property:color,background-color,border-color,outline-color,box-shadow!important";
    expect(css).toContain(`:root[data-motion="off"] *,:root[data-motion="off"] *::before,:root[data-motion="off"] *::after{animation:none!important;${keep}}`);
    expect(css).toContain(`@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;${keep}}}`);
    expect(css).not.toMatch(/transition-property:[^;}]*\b(?:transform|translate|scale)\b/);
    expect(css).toContain(':root[data-motion="off"] .card{transform:none!important}');
  });

  it("raises built hub cards, keeps cards in design flat, lifts on hover and keyboard focus, and prints flat", () => {
    expect(css).toMatch(/\.card\{[^}]*box-shadow:var\(--lift\)/);
    expect(css).toMatch(/\.card\.pending\{box-shadow:none/);
    // Hover and keyboard focus lift a card straight up (no rotation, so text never warps; David, 2026-10-16).
    expect(css).toMatch(/\.card:not\(\.pending\):has\(h3 a:hover\),\.card:not\(\.pending\):has\(h3 a:focus-visible\)\{transform:translateY\(-6px\);/);
    expect(css).toMatch(/@media print\{[\s\S]*\.card\{box-shadow:none;transform:none\}/);
    // The scroll rise uses the separate translate property, so it never blocks the card's hover transform,
    // and it overshoots a little before settling, so the cards seem to have weight (gravity).
    expect(css).toContain("@keyframes rise{0%{translate:0 40px}75%{translate:0 -4px}100%{translate:0 0}}");
    expect(css).not.toMatch(/@keyframes rise\{[^}]*transform/);
  });

  // David, 2026-10-16: text must never warp "like a fun mirror". 3D rotation and perspective skew
  // text, so the site's CSS uses neither; depth comes from shadows and straight movement only.
  it("gives the page texture and light without touching text contrast: a self-hosted grain and a glow, off in print", () => {
    expect(rules.find((r) => r.sel === "body").body).toMatch(/background:url\(textures\/grain\.svg\),radial-gradient\([^)]*var\(--glow\)/);
    expect(read("textures/grain.svg")).toContain("feTurbulence");
    expect(css).toMatch(/@media print\{[\s\S]*body\{background:#fff/);
  });

  // Hub cards (David, 2026-10-21): petal corners, a band on top in the lesson's deep fill with the number and
  // its theme's shapes in three tints, a soft lift, and an outlined status; spaced-capital theme labels.
  it("draws hub cards with a coloured band of number and shapes, and each theme a clean rule", () => {
    const card = rules.find((r) => r.sel === ".card").body;
    expect(card).toContain("border-radius:var(--r-xl) var(--r-sm) var(--r-xl) var(--r-sm)");
    const band = rules.find((r) => r.sel === ".card-band").body;
    expect(band).toContain("background:url(textures/stone.svg),var(--lcf,var(--lc))");
    expect(band).toContain("border-radius:var(--r-xl) var(--r-sm) 0 0");
    // The number is white on the deep fill, the same pairing as the lesson chip.
    expect(rules.find((r) => r.sel === ".card-num").body).toContain("color:var(--on-lc)");
    for (const t of ["t1", "t2", "t3"]) expect(rules.find((r) => r.sel === `.motif .${t}`).body).toMatch(/fill:color-mix\(in oklch,var\(--lcf,var\(--lc\)\),var\(--on-lc\) \d+%\)/);
    expect(rules.find((r) => r.sel === ".status").body).toContain("border:1.5px solid var(--lc,var(--edge))");
    expect(css).toMatch(/\.group-label\{[^}]*text-transform:uppercase/);
    expect(css).toMatch(/\.group-label::after\{[^}]*height:2px;background:var\(--lc\)/);
  });

  // Essentials sit in a dark frame of their own, like the Singapore Math hub's access band.
  // Full width, opened and closed by the Danube wave (David, 2026-10-20: a box cut into the page looked "boxy").
  it("sets the Essentials in a full-width dark band on the Zsolnay roof diamonds, with waves, solid cards and no sideways scroll", () => {
    const bg = rules.find((r) => r.sel === "#essentials.band .band-bg").body;
    expect(bg).toContain("inset:0 calc(50% - 50vw)");
    expect(bg).toMatch(/background:var\(--header-bg\)[\s\S]*url\(textures\/roof-diamonds\.svg\)/);
    expect(bg).toMatch(/mask:url\(textures\/wave-fill\.svg\) top[^;]*url\(textures\/wave-cap\.svg\) bottom/);
    expect(rules.find((r) => r.sel === "#essentials.band").body).toContain("background:var(--header-bg) content-box");
    expect(css).toMatch(/#essentials\.band::before,#essentials\.band::after\{[^}]*mask:url\(textures\/wave-line\.svg\)[^}]*background:var\(--amber\)/);
    expect(rules.find((r) => r.sel === 'body[data-page="hub"]').body).toContain("overflow-x:clip");
    expect(rules.find((r) => r.sel === "#essentials.band .card").body).toMatch(/background:color-mix\(in oklch,var\(--header-bg\),var\(--on-dark\) 8%\)/);
  });

  it("never rotates in 3D or adds perspective, so text never warps", () => {
    expect(css).not.toMatch(/perspective\s*:|perspective\(|rotate[XYZ3]\w*\(|rotate\s*:\s*[xyz]\b/i);
  });

  it("ties the scroll effects to the scrollbar, only when motion is on and the browser has scroll timelines", () => {
    expect(css).toMatch(/@supports \(animation-timeline:view\(\)\)\{\s*:root\[data-motion="on"\] \[data-stage\]/);
    expect(css).toContain("animation-timeline:scroll(root)");
  });

  it("flips, saves, and renames itself for what a click will do next", () => {
    const w = load();
    expect(btn(w).textContent).toContain("Dark mode");
    btn(w).click();
    expect(theme(w)).toBe("dark");
    expect(btn(w).textContent).toContain("Light mode");
    expect(btn(w).hasAttribute("aria-pressed")).toBe(false);
    expect(btn(w).hasAttribute("aria-label")).toBe(false);
    expect(w.localStorage.getItem("ai-literacy-theme")).toBe("dark");
  });
});

describe("consistency", () => {
  const screen = css.slice(0, css.indexOf("@media print"));
  const screenRules = [...screen.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({ sel: m[1].trim(), body: m[2] }));
  const nonRoot = screenRules.filter((r) => !r.sel.startsWith(":root"));

  it("spaces everything on one scale: 0 2 4 8 12 16 24 32 48px", () => {
    const SPACE = [0, 2, 4, 8, 12, 16, 24, 32, 48];
    for (const r of nonRoot) {
      for (const [, prop, val] of r.body.matchAll(/\b(margin(?:-\w+)?|padding(?:-\w+)?|gap)\s*:\s*([^;]+)/g)) {
        for (const [, n] of val.matchAll(/(\d+)px/g)) expect(SPACE, `${r.sel} ${prop}:${val}`).toContain(Number(n));
      }
    }
  });

  it("rounds corners only with the radius tokens", () => {
    for (const r of nonRoot) {
      for (const [, val] of r.body.matchAll(/border-radius:\s*([^;]+)/g)) {
        expect(val.replace(/var\(--r-(sm|md|lg|xl|pill)\)|\b0\b/g, "").trim(), `${r.sel} ${val}`).toBe("");
      }
    }
  });

  it("names every colour — no hex values outside the token blocks", () => {
    for (const r of nonRoot) expect(r.body, r.sel).not.toMatch(/#[0-9A-Fa-f]{3,6}\b/);
  });

  it("uses the theme-aware focus colour for the focus ring", () => {
    expect(rules.find((r) => r.sel === ":focus-visible").body).toContain("outline:3px solid var(--focus)");
  });

  it.each([".top h1", "h2", ".top .eyebrow", ".block > h2", ".card h3", ".subhead", ".sidebox h2"])(
    "%s sets its line height from a token",
    (sel) => expect(rules.find((r) => r.sel === sel)?.body, sel).toMatch(/line-height:var\(--lh-(display|heading)\)/)
  );

  it("caps prose at a readable measure (45–75 characters)", () => {
    // `ch` is the width of "0", which in Lexend is wider than an average letter:
    // 60ch holds about 69 real characters. ui-audit.js measures the real thing.
    expect(Number(light.measure.replace("ch", ""))).toBeLessThanOrEqual(62);
    // Zero-specificity so a component (e.g. serif .relevance) can set its own measure.
    const capped = screenRules.find((r) => r.sel.startsWith(":where(.block"));
    expect(capped?.body).toContain("max-width:var(--measure)");
    expect(capped.sel).toBe(":where(.block, .obj, .claim, .card, .sidebox) :where(p, li, dd)");
    for (const sel of [".relevance", ".passage li > p", ".req"]) {
      expect(rules.find((r) => r.sel === sel)?.body, sel).toContain("max-width:var(--measure-serif)");
    }
  });

  it("has no leftover monospace font variable (labels use Lexend, like Singapore Math)", () => {
    expect(css).not.toContain("--mono");
  });
});

// Lesson 7's worked example audits this course. Each row names a check, and this
// runs it, so the lesson can't tell learners something about the site that isn't true.
describe("Lesson 7 worked example: the course audits true", async () => {
  const { getLesson } = await import("../course.js");
  const table = getLesson(7).stages.find((s) => s.kind === "abstract").tables.find((t) => t.verify);
  const minHeight = (sel) => Number(rules.find((r) => r.sel === sel)?.body.match(/min-height:(\d+)px/)?.[1] ?? 0);
  const site = ["index.html", "lesson.html", "lesson-core.js", "course.css", "theme-toggle.js"].map((f) => [f, read(f)]);

  const CHECKS = {
    contrast: () => {
      for (const [name, theme] of Object.entries(THEMES)) {
        for (const [fg, bgs] of Object.entries(PAIRS)) for (const bg of bgs) expect(contrast(theme, fg, bg), `${name} ${fg} on ${bg}`).toBeGreaterThanOrEqual(4.5);
      }
    },
    focus: () => {
      expect(rules.find((r) => r.sel === ":focus-visible").body).toContain("outline:3px solid var(--focus)");
      for (const [name, theme] of Object.entries(THEMES)) {
        for (const bg of ["--card", "--paper"]) expect(contrast(theme, "--focus", bg), `${name} ${bg}`).toBeGreaterThanOrEqual(3);
      }
    },
    targets: () => {
      for (const sel of [".btn", ".key summary", ".claim details summary"]) expect(minHeight(sel), sel).toBeGreaterThanOrEqual(44);
    },
    reflow: () => {
      expect(css).toMatch(/@container \(max-width:\d+px\)\{\s*svg\.grid\{display:none\}\s*table\.grid-alt\{display:table\}/);
    },
    motion: () => {
      expect(css).toMatch(/@media \(prefers-reduced-motion:reduce\)\{\*,\*::before,\*::after\{animation:none!important;transition-property:color,background-color,border-color,outline-color,box-shadow!important\}\}/);
    },
    status: () => {
      for (const page of ["index.html", "lesson.html"]) expect(read(page)).toMatch(/id="announce"[^>]*aria-live="polite"|aria-live="polite"[^>]*id="announce"/);
      expect(read("lesson-core.js").match(/aria-live="polite"/g).length).toBeGreaterThanOrEqual(3);
    },
    calm: () => {
      for (const [f, text] of site) {
        expect(text, f).not.toMatch(/\bautoplay\b|<video|<audio|new Notification|Notification\.requestPermission|setInterval\(/);
      }
    }
  };

  it("names a known check, or none, for every row", () => {
    expect(table.verify).toHaveLength(table.rows.length);
    for (const v of table.verify) if (v !== null) expect(Object.keys(CHECKS)).toContain(v);
    // Exactly one row is an honest known cost, and it says so.
    const known = table.rows.filter((_, i) => table.verify[i] === null);
    expect(known).toHaveLength(1);
    expect(known[0][0]).toBe("Known cost");
  });

  it.each(table.rows.map((r, i) => [r[0], table.verify[i]]).filter(([, v]) => v))("%s holds (%s)", (_, id) => CHECKS[id]());
});

// Hub Evaluation: four levels, cool to warm. Text sits on each level's pale tint,
// and each accent stripe stands out from both the tint and the page.
describe("Evaluation levels colour", () => {
  // The levels flow with the other cards (David, 2026-10-20): stone and earth, cool to warm, no pastel tints.
  const LEVELS = { 1: ["--l13", "--f13"], 2: ["--l14", "--f14"], 3: ["--l10", "--f10"], 4: ["--l3", "--f3"] };

  it.each(Object.entries(LEVELS))("level %s uses its accent and fill tokens", (n, [accent, fill]) => {
    const body = rules.find((r) => r.sel === `.lvl-${n}`)?.body;
    expect(body).toContain(`--lvl:var(${accent})`);
    expect(body).toContain(`--lvlf:var(${fill})`);
  });

  it.each(Object.entries(THEMES))("%s theme: the level chip's text passes 4.5:1 on its fill, and every top rule 3:1 on the page", (_, theme) => {
    for (const [, [accent, fill]] of Object.entries(LEVELS)) {
      expect(contrast(theme, "--on-lc", fill), `--on-lc on ${fill}`).toBeGreaterThanOrEqual(4.5);
      expect(contrast(theme, accent, "--paper"), `${accent} on --paper`).toBeGreaterThanOrEqual(3);
    }
  });
});
