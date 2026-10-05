// Builds the Content Security Policy for every page and writes it into a <meta> tag.
// GitHub Pages can't send security headers, so the policy lives in the page itself.
// Run `npm run csp` after changing an inline script (the import map, or a mock screen's
// script in a lesson); the governance test fails until the pages match.
//
// What it allows, and why:
// - scripts only from this site, plus the exact inline scripts listed by hash (the import
//   map, and the scripts inside the sandboxed mock screens, which inherit this policy);
// - styles from this site and inline, because the mock screens use inline styles. All text
//   is escaped before it reaches the page, so this can't be used to inject markup;
// - fonts and images only from this site; no network requests (connect-src 'none');
// - forms can't send anywhere (form-action 'none'); no plugins, no <base> rewriting.
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const sha = (text) => `'sha256-${createHash("sha256").update(text, "utf8").digest("base64")}'`;
export const PAGES = readdirSync(root).filter((f) => f.endsWith(".html"));

export async function inlineScripts() {
  const out = new Set();
  for (const page of PAGES) {
    const html = readFileSync(new URL(page, root), "utf8");
    for (const m of html.matchAll(/<script type="importmap">([\s\S]*?)<\/script>/g)) out.add(m[1]);
  }
  const { COURSE } = await import("../course.js");
  for (const lesson of COURSE.lessons) {
    for (const stage of lesson.stages ?? []) {
      for (const track of Object.values(stage.tracks ?? {})) {
        const html = track.screen?.html;
        if (html) for (const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) out.add(m[1]);
      }
    }
  }
  return [...out];
}

export async function buildPolicy() {
  const hashes = (await inlineScripts()).map(sha).sort();
  return [
    "default-src 'none'",
    `script-src 'self' ${hashes.join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self'",
    "connect-src 'none'",
    "frame-src 'self'",
    "form-action 'none'",
    "base-uri 'none'",
    "object-src 'none'",
    "manifest-src 'none'",
    "worker-src 'none'",
    "upgrade-insecure-requests"
  ].join("; ");
}

const TAGS = (policy) =>
  `<meta http-equiv="Content-Security-Policy" content="${policy}">\n<meta name="referrer" content="no-referrer">`;

export async function writePolicy() {
  const policy = await buildPolicy();
  for (const page of PAGES) {
    const url = new URL(page, root);
    let html = readFileSync(url, "utf8");
    html = html.replace(/<meta http-equiv="Content-Security-Policy"[^>]*>\n<meta name="referrer"[^>]*>\n/, "");
    html = html.replace('<meta charset="utf-8">\n', `<meta charset="utf-8">\n${TAGS(policy)}\n`);
    writeFileSync(url, html);
  }
  return policy;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const policy = await writePolicy();
  console.log(`Wrote the policy to ${PAGES.length} pages:\n${policy}`);
}
