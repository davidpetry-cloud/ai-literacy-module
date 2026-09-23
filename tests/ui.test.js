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
const LESSONS = Object.keys(light).filter((t) => /^l\d$/.test(t)).map((t) => `--${t}`);
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
  "--on-lc": LESSONS,
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

  it.each(LESSONS)("lesson colour %s is readable as text on a card", (l) => {
    expect(contrast(theme, l, "--card")).toBeGreaterThanOrEqual(4.5);
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

  it("never paints a background with --ink, which flips in dark mode", () => {
    // SVG text uses fill as its text colour, so it's covered by PAIRS instead.
    const svgText = /\.g-col|\.g-row|\btext\b/;
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
      if (r.sel === "body" || svgText.test(r.sel)) continue;
      for (const [, value] of r.body.matchAll(/font-size:\s*([^;]+)/g)) {
        expect(value.trim(), r.sel).toMatch(/^var\(--fs-(xs|sm|base|md|lg|xl|display)\)$/);
      }
    }
  });

  it("keeps diagram labels at 12.8px+ even at the diagram's narrowest", async () => {
    const { confidenceGrid } = await import("../lesson-core.js");
    const viewBoxWidth = Number(confidenceGrid([]).match(/viewBox="0 0 ([\d.]+)/)[1]);
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

  it("keeps body text at 16px with 1.6+ line height", () => {
    const body = rules.find((r) => r.sel === "body").body;
    expect(body).toContain("font-size:16px");
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

  it.each([".key summary", ".claim details summary"])("%s is at least 24px tall", (sel) => {
    expect(minHeight(sel)).toBeGreaterThanOrEqual(24);
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
      expect(b.getAttribute("aria-label")).toBe("Toggle dark mode");
    }
  });

  it("follows the system setting when nothing is saved", () => {
    expect(theme(load({ systemDark: true }))).toBe("dark");
    expect(theme(load({ systemDark: false }))).toBe("light");
  });

  it("lets a saved choice override the system", () => {
    expect(theme(load({ saved: "light", systemDark: true }))).toBe("light");
  });

  it("flips, saves, and reports its state on click", () => {
    const w = load();
    expect(btn(w).getAttribute("aria-pressed")).toBe("false");
    btn(w).click();
    expect(theme(w)).toBe("dark");
    expect(btn(w).getAttribute("aria-pressed")).toBe("true");
    expect(btn(w).textContent).toContain("Light");
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
        expect(val.replace(/var\(--r-(sm|md|lg|pill)\)|\b0\b/g, "").trim(), `${r.sel} ${val}`).toBe("");
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
    for (const sel of [".relevance", ".passage li > p"]) {
      expect(rules.find((r) => r.sel === sel)?.body, sel).toContain("max-width:var(--measure-serif)");
    }
  });

  it("has no leftover monospace font variable (labels use Lexend, like Singapore Math)", () => {
    expect(css).not.toContain("--mono");
  });
});
