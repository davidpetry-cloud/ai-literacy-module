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

function themeTokens(selector) {
  const body = rules.find((r) => r.sel === selector)?.body ?? "";
  return Object.fromEntries([...body.matchAll(/--([\w-]+):\s*([^;]+)/g)].map((m) => [m[1], m[2].trim()]));
}
const light = themeTokens(":root");
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
  "--text": LIGHT_SURFACES,
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
  "#FFFFFF": ["--header-bg", "--btn-bg", "--btn-bg-hover", "--chip-bg"],
  "--amber": ["--header-bg"],
  "#9FB6CC": ["--header-bg"],
  "#B8CBDC": ["--header-bg"],
  "#0F2338": ["#FFFFFF"],
  "#2B1B04": ["--amber"]
};

describe.each(Object.keys(THEMES))("%s theme contrast", (name) => {
  const theme = THEMES[name];
  const cases = Object.entries(PAIRS).flatMap(([fg, bgs]) => bgs.map((bg) => [fg, bg]));

  it.each(cases)("%s on %s is at least 4.5:1", (fg, bg) => {
    expect(contrast(theme, fg, bg)).toBeGreaterThanOrEqual(4.5);
  });

  it.each(LESSONS)("lesson colour %s is readable as text on a card", (l) => {
    expect(contrast(theme, l, "--card")).toBeGreaterThanOrEqual(4.5);
  });
});

describe("colour usage", () => {
  it("defines every light token again for dark", () => {
    const dark = themeTokens(':root[data-theme="dark"]');
    const themed = Object.keys(light).filter((k) => !["sans", "serif", "mono"].includes(k));
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
  it("never sets text below 12.8px (0.8rem)", () => {
    for (const r of rules) {
      for (const [, n, unit] of r.body.matchAll(/font-size:\s*([\d.]+)(rem|px)/g)) {
        const px = unit === "rem" ? Number(n) * 16 : Number(n);
        expect(px, `${r.sel} ${n}${unit}`).toBeGreaterThanOrEqual(12.8);
      }
    }
  });

  it("keeps body text at 16px with 1.6+ line height", () => {
    const body = rules.find((r) => r.sel === "body").body;
    expect(body).toContain("font-size:16px");
    expect(Number(body.match(/line-height:([\d.]+)/)[1])).toBeGreaterThanOrEqual(1.6);
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
