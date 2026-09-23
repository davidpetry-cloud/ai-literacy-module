// In-browser UI audit for a rendered page, in both themes. From the preview:
//   const { audit } = await import("/scripts/ui-audit.js"); await audit();
// Opens every <details>, reveals the grid, presses each part of the prompt
// comparison in turn, and checks every visible text element against the
// background it actually sits on, after any opacity. It also checks the edges
// of controls and grid cells (3:1), content hidden behind a sideways scroll,
// aria-labels that drop the visible words, and disclosures with no arrow.
const rgb = (s) => (s.match(/[\d.]+/g) || []).map(Number);
const lum = ([r, g, b]) => {
  const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
function bgOf(el) {
  for (let e = el; e; e = e.parentElement) {
    const c = rgb(getComputedStyle(e).backgroundColor);
    if (c.length >= 3 && (c[3] ?? 1) > 0.5) return c;
  }
  return [255, 255, 255];
}

// Opacity fades text without changing its computed colour, so fold it in.
const opacityOf = (el) => {
  let o = 1;
  for (let e = el; e; e = e.parentElement) o *= parseFloat(getComputedStyle(e).opacity);
  return o;
};
const blend = (fg, bg, a) => fg.slice(0, 3).map((c, i) => c * a + bg[i] * (1 - a));

// WCAG 1.4.11: the edges that show where a control or a grid cell is need 3:1
// against what is under them. Text is checked separately.
function nonText() {
  const fails = new Set();
  const seen = (el) => el.getClientRects().length;
  for (const b of document.querySelectorAll(".btn")) {
    if (!seen(b)) continue;
    const s = getComputedStyle(b);
    const c = ratio(rgb(s.borderTopColor), bgOf(b.parentElement));
    if (parseFloat(s.borderTopWidth) < 1 || c < 3) fails.add(`button ${b.textContent.trim().slice(0, 30)} edge ${c.toFixed(2)}:1`);
  }
  for (const cell of document.querySelectorAll("svg .g-cell")) {
    if (!seen(cell)) continue;
    const c = ratio(rgb(getComputedStyle(cell).stroke), rgb(getComputedStyle(cell).fill));
    if (c < 3) fails.add(`grid line ${c.toFixed(2)}:1`);
  }
  for (const circle of document.querySelectorAll("svg .g-mark circle")) {
    if (!seen(circle)) continue;
    const s = getComputedStyle(circle);
    const c = ratio(rgb(s.stroke), rgb(s.fill));
    const outside = ratio(rgb(s.stroke), bgOf(circle.closest("svg").parentElement));
    if (outside < 3) fails.add(`grid mark edge ${outside.toFixed(2)}:1 (fill ${c.toFixed(2)}:1)`);
  }
  for (const m of document.querySelectorAll(".tmark")) {
    if (!seen(m)) continue;
    const c = ratio(rgb(getComputedStyle(m).borderTopColor), bgOf(m.parentElement));
    if (c < 3) fails.add(`table mark edge ${c.toFixed(2)}:1`);
  }
  return [...fails];
}

function check() {
  const fails = new Set();
  const small = new Set();
  let checked = 0, lowest = Infinity;
  for (const el of document.querySelectorAll("body *")) {
    if (el.closest(".sr") || el instanceof SVGElement || !el.getClientRects().length) continue;
    if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
    const s = getComputedStyle(el);
    const size = parseFloat(s.fontSize);
    const need = size >= 24 || (size >= 18.66 && +s.fontWeight >= 700) ? 3 : 4.5;
    const bg = bgOf(el);
    const c = ratio(blend(rgb(s.color), bg, opacityOf(el) * (rgb(s.color)[3] ?? 1)), bg);
    checked++;
    lowest = Math.min(lowest, c);
    if (c < need) fails.add(`${el.tagName.toLowerCase()}.${el.getAttribute("class") ?? ""} ${c.toFixed(2)}:1`);
    if (size < 12.8) small.add(`${el.tagName.toLowerCase()}.${el.getAttribute("class") ?? ""} ${size.toFixed(1)}px`);
  }
  return { checked, lowest: +lowest.toFixed(2), contrastFails: [...fails], under12_8px: [...small], nonTextFails: nonText() };
}

export async function audit() {
  // Transitions freeze in a hidden tab and would report mid-fade colours.
  const freeze = document.createElement("style");
  freeze.textContent = "*{transition:none!important}";
  document.head.append(freeze);
  document.querySelectorAll("details").forEach((d) => (d.open = true));
  document.querySelector("#reveal-grid")?.click();

  const root = document.documentElement;
  const original = root.dataset.theme;
  const result = { page: location.pathname + location.search, viewport: root.clientWidth };
  // Each part marks its lines on its own surface, so check the page once per part.
  const parts = [...document.querySelectorAll(".cmp-btn")];
  const states = parts.length ? parts : [null];
  for (const theme of ["light", "dark"]) {
    root.dataset.theme = theme;
    const runs = states.map((b) => {
      if (b && b.getAttribute("aria-pressed") !== "true") b.click();
      void document.body.offsetWidth;
      return check();
    });
    result[theme] = {
      checked: Math.max(...runs.map((r) => r.checked)),
      lowest: Math.min(...runs.map((r) => r.lowest)),
      contrastFails: [...new Set(runs.flatMap((r) => r.contrastFails))],
      under12_8px: [...new Set(runs.flatMap((r) => r.under12_8px))],
      nonTextFails: [...new Set(runs.flatMap((r) => r.nonTextFails))]
    };
  }
  document.querySelector('.cmp-btn[aria-pressed="true"]')?.click();
  root.dataset.theme = original;
  freeze.remove();

  // Heading outline: exactly one h1, and no level skipped on the way down.
  const levels = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
    .filter((h) => h.getClientRects().length)
    .map((h) => Number(h.tagName[1]));
  result.headingSkips = levels
    .map((l, i) => (i && l > levels[i - 1] + 1 ? `h${levels[i - 1]}→h${l}` : null))
    .filter(Boolean);
  result.h1Count = levels.filter((l) => l === 1).length;

  // Controls a screen reader would announce with the same name.
  const nameOf = (el) => (el.getAttribute("aria-label") || el.textContent).replace(/\s+/g, " ").trim();
  const names = [...document.querySelectorAll("button, summary, a[href]")].filter((e) => e.getClientRects().length).map(nameOf);
  result.duplicateNames = [...new Set(names.filter((n, i) => names.indexOf(n) !== i))];

  // Real characters per line for running text (not `ch`, which is the width of "0").
  const canvas = document.createElement("canvas").getContext("2d");
  result.longLines = [...document.querySelectorAll("main p, main li, main dd, main td")]
    .filter((e) => e.getClientRects().length && e.textContent.trim().length > 80 && !e.querySelector("p, li"))
    .map((e) => {
      const s = getComputedStyle(e);
      canvas.font = `${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
      const avg = canvas.measureText("the quick brown fox jumps over a lazy dog").width / 41;
      const style = getComputedStyle(e);
      const inner = e.getBoundingClientRect().width - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      return { el: `${e.tagName.toLowerCase()}.${e.className}`, chars: Math.round(inner / avg) };
    })
    .filter((l) => l.chars > 75)
    .map((l) => `${l.el} ${l.chars}`)
    .filter((v, i, a) => a.indexOf(v) === i);

  result.horizontalScroll = root.scrollWidth > root.clientWidth;

  // Anything that needs a sideways scroll inside the page hides part of itself
  // on a phone. A figure should reflow (the grid becomes a table) instead.
  result.hiddenByScroll = [...document.querySelectorAll("main *")]
    .filter((e) => e.getClientRects().length && /auto|scroll/.test(getComputedStyle(e).overflowX) && e.scrollWidth > e.clientWidth + 1)
    .map((e) => `${e.tagName.toLowerCase()}#${e.id}.${e.className} ${e.scrollWidth}px in ${e.clientWidth}px`);

  // WCAG 2.5.3, label in name: a control's accessible name must contain the words a sighted user sees.
  const visibleText = (el) => [...el.childNodes].map((n) => (n.nodeType === 3 ? n.textContent : n.getAttribute?.("aria-hidden") === "true" ? "" : n.textContent)).join("").replace(/\s+/g, " ").trim().toLowerCase();
  result.labelMismatch = [...document.querySelectorAll("button, a[href], summary")]
    .filter((e) => e.getClientRects().length && e.hasAttribute("aria-label") && !e.getAttribute("aria-label").toLowerCase().includes(visibleText(e)))
    .map((e) => `${e.tagName.toLowerCase()} "${visibleText(e)}" is named "${e.getAttribute("aria-label")}"`);

  // A disclosure must show an arrow, whatever display it uses.
  result.summariesWithoutArrow = [...document.querySelectorAll("summary")]
    .filter((e) => e.getClientRects().length && !/^["'][▸▾]/.test(getComputedStyle(e, "::before").content))
    .map((e) => e.textContent.trim().slice(0, 30));
  result.smallTargets = [...document.querySelectorAll("button, a.back, .tracks label")]
    .filter((e) => e.getClientRects().length && e.getBoundingClientRect().height < 44)
    .map((e) => `${e.tagName.toLowerCase()}.${e.className} ${Math.round(e.getBoundingClientRect().height)}px`);
  result.pass =
    !result.light.contrastFails.length && !result.dark.contrastFails.length &&
    !result.light.under12_8px.length && !result.horizontalScroll && !result.smallTargets.length &&
    !result.light.nonTextFails.length && !result.dark.nonTextFails.length &&
    !result.hiddenByScroll.length && !result.labelMismatch.length && !result.summariesWithoutArrow.length &&
    !result.headingSkips.length && result.h1Count === 1 && !result.duplicateNames.length && !result.longLines.length;
  return result;
}
