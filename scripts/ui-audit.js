// In-browser UI audit for a rendered page, in both themes. From the preview:
//   const { audit } = await import("/scripts/ui-audit.js"); await audit();
// Opens every <details>, reveals the grid, and checks every visible text
// element against the background it actually sits on.
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
    const c = ratio(rgb(s.color), bgOf(el));
    checked++;
    lowest = Math.min(lowest, c);
    if (c < need) fails.add(`${el.tagName.toLowerCase()}.${el.getAttribute("class") ?? ""} ${c.toFixed(2)}:1`);
    if (size < 12.8) small.add(`${el.tagName.toLowerCase()}.${el.getAttribute("class") ?? ""} ${size.toFixed(1)}px`);
  }
  return { checked, lowest: +lowest.toFixed(2), contrastFails: [...fails], under12_8px: [...small] };
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
  for (const theme of ["light", "dark"]) {
    root.dataset.theme = theme;
    void document.body.offsetWidth;
    result[theme] = check();
  }
  root.dataset.theme = original;
  freeze.remove();

  result.horizontalScroll = root.scrollWidth > root.clientWidth;
  result.smallTargets = [...document.querySelectorAll("button, a.back, .tracks label")]
    .filter((e) => e.getClientRects().length && e.getBoundingClientRect().height < 44)
    .map((e) => `${e.tagName.toLowerCase()}.${e.className} ${Math.round(e.getBoundingClientRect().height)}px`);
  result.pass =
    !result.light.contrastFails.length && !result.dark.contrastFails.length &&
    !result.light.under12_8px.length && !result.horizontalScroll && !result.smallTargets.length;
  return result;
}
