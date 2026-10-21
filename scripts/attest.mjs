// The attestation desk (David, 2026-10-21): `npm run attest`. A private page on this computer for checking
// claims one at a time and signing them off, or rejecting them, without editing code. Sign-offs go to
// attestations.js, which claims.js applies when the site loads. Only David runs it: it refuses to start
// without a terminal a person is typing in, and the project's guard refuses to let a Claude session run it.

import { createServer } from "node:http";
import { readFile, writeFile, rename } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import { spawn } from "node:child_process";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { resolveStatus } from "attestation-ledger";
import { CLAIMS, BASE, mergeAttestation } from "../claims.js";
import { COURSE, lessonLabel } from "../course.js";
import { SOURCES } from "../sources.js";
import { claimLessons, statusBadge, modelName } from "../lesson-core.js";
import { makeAttestation, makeRejection, serialize, allowed, TTL_CHOICES } from "./attest-core.mjs";

export const PORT = 8091;
const root = fileURLToPath(new URL("..", import.meta.url));
const ORDER = Object.keys(CLAIMS);
const USES = claimLessons();

/**
 * The desk as a server, not yet listening. `file` is the sign-off file it reads and writes: the real
 * attestations.js when David runs it, a scratch copy in the tests. `port` and `secret` are what
 * allowed() checks every request against.
 */
export async function createDesk({ file = join(root, "attestations.js"), port = PORT, secret = randomBytes(24).toString("hex"), log = console.log, preview = false } = {}) {
  let entries = (await import(`${pathToFileURL(file).href}?v=${Date.now()}`)).ATTESTATIONS;

  async function save() {
    const tmp = `${file}.tmp`;
    await writeFile(tmp, serialize(entries, ORDER));
    await rename(tmp, file);
  }

  // Today on this computer's calendar, not UTC, so a sign-off made in the evening carries the right date.
  const today = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  // The name and role of the signer the file already knows, so the form starts filled in.
  function signer() {
    const signed = Object.values(BASE).concat(Object.values(entries)).filter((a) => a?.source === "practitioner");
    const last = signed[signed.length - 1];
    return { by: last?.by ?? "", role: last?.role ?? "" };
  }

  function claimView(id) {
    const current = mergeAttestation(BASE[id], entries[id]);
    const status = resolveStatus({ attestation: current }, new Date(`${today()}T12:00:00`));
    const model = BASE[id].source === "model" ? BASE[id] : null;
    return {
      id,
      text: CLAIMS[id].text,
      status,
      badge: statusBadge(status),
      lessons: USES[id] ?? [],
      fromDesk: Boolean(entries[id]),
      rationale: BASE[id].rationale ?? null,
      model: model?.model ? modelName(model.model) : null,
      attestation: current.source === "practitioner" ? { by: current.by, role: current.role, basis: current.basis, verified: current.verified, ttlDays: current.ttlDays ?? 730 } : null,
      rejection: current.rejection ?? null
    };
  }

  function snapshot() {
    const claims = ORDER.map(claimView);
    const lessons = COURSE.lessons
      .map((l) => ({
        n: l.n,
        label: lessonLabel(l),
        title: l.title,
        ids: claims.filter((c) => c.lessons[0] === l.n).map((c) => c.id),
        sources: SOURCES.filter((s) => s.lessons.includes(l.n)).map((s) => ({ apa: s.apa, url: s.url ?? null }))
      }))
      .filter((l) => l.ids.length);
    return { today: today(), signer: signer(), ttl: TTL_CHOICES, claims, lessons };
  }

  const page = () => `<!doctype html>
  <html lang="en">
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="desk-token" content="${secret}">
  <title>Attestation desk — Human-Centered AI Literacy</title>
  <link rel="stylesheet" href="/course.css">
  <link rel="stylesheet" href="/desk.css">
  <script src="/theme-toggle.js"></script>
  <script type="module" src="/desk.js"></script>
  </head>
  <body class="desk">
  ${preview ? `<p class="desk-preview" role="note"><b>Preview.</b> A scratch copy for checking how the desk looks. Nothing done here is saved or signed.</p>` : ""}
  <header class="desk-top">
    <div class="desk-row"><p class="desk-kicker">On this computer only</p><button type="button" class="theme-toggle" data-theme-toggle><span aria-hidden="true">🌙</span> Dark mode</button></div>
    <h1>Attestation desk</h1>
    <p class="desk-lede">Check each claim against its sources, then sign it off or reject it. Your sign-offs are saved to <code>attestations.js</code> as you go. Nothing in <code>claims.js</code> is edited or deleted.</p>
    <p class="desk-lede">When you're done, stop the desk in the terminal (Control-C), then run <code>npm test</code> and <code>/ship</code>.</p>
    <p class="desk-counts" id="counts"></p>
  </header>
  <main id="main">
    <div class="desk-filters">
      <label>Show <select id="f-status"><option value="needs">Needs you: proposed or lapsed</option><option value="all">Every claim</option><option value="attested">Attested</option><option value="rejected">Rejected</option></select></label>
      <label>Lesson <select id="f-lesson"><option value="all">All lessons</option></select></label>
    </div>
    <p id="announce" class="sr" aria-live="polite"></p>
    <div id="list"><p>Loading the claims…</p></div>
  </main>
  </body>
  </html>`;

  const TYPES = { ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
  const ASSETS = { "/desk.js": "scripts/attest-desk.js", "/desk.css": "scripts/attest-desk.css", "/course.css": "course.css", "/theme-toggle.js": "theme-toggle.js" };
  const CSP = "default-src 'none'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'";

  async function body(req) {
    let data = "";
    for await (const chunk of req) {
      data += chunk;
      if (data.length > 65536) throw new Error("That request is too large.");
    }
    return JSON.parse(data || "{}");
  }

  const send = (res, code, type, data) => res.writeHead(code, { "Content-Type": type, "Content-Security-Policy": CSP, "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" }).end(data);
  const json = (res, code, data) => send(res, code, "application/json", JSON.stringify(data));

  return createServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const self = allowed({ host: req.headers.host, origin: req.headers.origin, token: secret }, { port, secret });
    if (!self) return send(res, 403, "text/plain", "The attestation desk only answers its own page on this computer.");
    try {
      if (req.method === "GET") {
        if (path === "/") return send(res, 200, "text/html; charset=utf-8", page());
        if (path === "/api/claims") return json(res, 200, snapshot());
        const rel = ASSETS[path] ?? (/^\/(fonts|textures)\/[\w.-]+$/.test(path) ? path.slice(1) : null);
        if (!rel) return send(res, 404, "text/plain", "Not found");
        const file = normalize(join(root, rel));
        if (!file.startsWith(root.endsWith(sep) ? root : root + sep)) return send(res, 403, "text/plain", "Forbidden");
        return send(res, 200, TYPES[extname(file)] ?? "application/octet-stream", await readFile(file));
      }
      if (req.method !== "POST") return send(res, 405, "text/plain", "Method not allowed");
      if (!allowed({ host: req.headers.host, origin: req.headers.origin, token: req.headers["x-desk-token"] }, { port, secret })) {
        return json(res, 403, { error: "This change didn't come from the desk's own page, so it was refused." });
      }
      const form = await body(req);
      const id = String(form.id ?? "");
      if (!CLAIMS[id]) return json(res, 404, { error: `There is no claim called "${id}".` });
      const current = mergeAttestation(BASE[id], entries[id]);
      if (path === "/api/attest") {
        entries = { ...entries, [id]: makeAttestation(CLAIMS[id], current, form, today()) };
        log(`Signed off   ${id}  (${entries[id].by}, ${entries[id].verified})`);
      } else if (path === "/api/reject") {
        entries = { ...entries, [id]: makeRejection(form, today()) };
        log(`Rejected     ${id}  (${entries[id].rejection.by})`);
      } else if (path === "/api/undo") {
        if (!entries[id]) return json(res, 409, { error: "Only a sign-off made with the desk can be undone here." });
        const { [id]: _gone, ...rest } = entries;
        entries = rest;
        log(`Undone       ${id}`);
      } else {
        return json(res, 404, { error: "Not found" });
      }
      await save();
      return json(res, 200, { claim: claimView(id) });
    } catch (err) {
      return json(res, 400, { error: err.message });
    }
  });

}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  // A person at a keyboard, not a script or an AI session: no terminal, no desk.
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    console.error("The attestation desk only runs in a terminal you're typing in. Open Terminal and run: npm run attest");
    process.exit(1);
  }
  const desk = await createDesk();
  const url = `http://127.0.0.1:${PORT}/`;
  const show = () => process.platform === "darwin" && spawn("open", [url], { stdio: "ignore", detached: true }).unref();
  // Started twice: say so in plain words and bring the open desk forward, instead of a Node stack trace.
  desk.on("error", (err) => {
    if (err.code !== "EADDRINUSE") throw err;
    console.log(`\nThe attestation desk is already running, in another terminal window or tab.\nIt's at ${url} (opening it now). To stop it, press Control-C in the window where it's running.\n`);
    show();
    process.exit(0);
  });
  desk.listen(PORT, "127.0.0.1", () => {
    console.log(`\nAttestation desk: ${url}\nSign-offs are saved to attestations.js as you go. Press Control-C to stop.\n`);
    show();
  });
}
