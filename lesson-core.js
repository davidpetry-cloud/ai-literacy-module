/**
 * Renderer for the hub and lesson pages. No side effects on import — pages
 * call boot(document); tests call the render functions directly.
 *
 * In the browser, "attestation-ledger" resolves through the import map in each
 * page to the published package on jsDelivr. In Node it resolves to the
 * installed devDependency. tests/governance.test.js keeps the two in step.
 */
import { resolveStatus, daysRemaining, tally, STATUS, SOURCE } from "attestation-ledger";
import { COURSE, TRACKS, TRACK_IDS, EVALUATION, getLesson } from "./course.js";
import { CLAIMS } from "./claims.js";

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* ---------- status badges: colour, shape AND text, never colour alone ---------- */

const ICON = {
  attested: '<path d="M3 8.5l3.2 3.2L13 5"/>',
  proposed: '<rect x="3.6" y="3.6" width="8.8" height="8.8" rx="1.4" transform="rotate(45 8 8)"/>',
  expired: '<circle cx="8" cy="8" r="5.6"/><path d="M8 4.8V8.4M8 11h.01"/>',
  rejected: '<path d="M4.4 4.4l7.2 7.2M11.6 4.4l-7.2 7.2"/>'
};
export const STATUS_LABEL = {
  attested: "Attested",
  proposed: "Proposed",
  expired: "Lapsed",
  rejected: "Rejected"
};

export function statusBadge(status) {
  return `<span class="badge st-${status}"><svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON[status]}</svg>${STATUS_LABEL[status]}</span>`;
}

function provenance(record, now) {
  const a = record.attestation;
  const status = resolveStatus(record, now);
  if (status === STATUS.REJECTED) {
    const r = a.rejection;
    return `<dl><dt>Rejected by</dt><dd>${esc(r.by)}${r.role ? ` · ${esc(r.role)}` : ""}</dd><dt>Reason</dt><dd>${esc(r.reason)}</dd><dt>Reviewed</dt><dd>${esc(r.reviewed)}</dd></dl>`;
  }
  if (a.source === SOURCE.MODEL) {
    return `<dl><dt>Proposed by</dt><dd>${esc(a.model)} (a model)</dd><dt>Reasoning</dt><dd>${esc(a.rationale)}</dd><dt>Signed by</dt><dd>Nobody yet. Treat as unverified.</dd></dl>`;
  }
  const left = daysRemaining(record, now);
  const lapse = left < 0 ? `lapsed ${Math.abs(left)} days ago — re-check before relying on it` : `${left} days until it lapses`;
  return `<dl><dt>Attested by</dt><dd>${esc(a.by)}${a.role ? ` · ${esc(a.role)}` : ""}</dd><dt>Basis</dt><dd>${esc(a.basis)}</dd><dt>Verified</dt><dd>${esc(a.verified)} · ${lapse}</dd></dl>`;
}

export function claimCard(id, now = new Date()) {
  const record = CLAIMS[id];
  const status = resolveStatus(record, now);
  return `<div class="claim" data-claim="${esc(id)}" data-status="${status}">
    <div class="claim-head">${statusBadge(status)}<span class="claim-id">${esc(id)}</span></div>
    <p>${esc(record.text)}</p>
    <details><summary>Who says so<span class="sr"> about: ${esc(record.text.split(" ").slice(0, 8).join(" "))}…</span></summary>${provenance(record, now)}</details>
  </div>`;
}

/* ---------- pictorial: tone against truth ---------- */

const KEY_LABEL = { correct: "Correct", wrong: "Wrong", "no-source": "No source", nothing: "Nothing to check" };
const KEY_ORDER = ["correct", "wrong", "no-source", "nothing"];
const TONE_ORDER = ["confident", "hedged"];
const TONE_LABEL = { confident: "Sounds confident", hedged: "Sounds unsure" };

export function confidenceGrid(sentences, { revealed = false } = {}) {
  const x0 = 150, y0 = 44, cw = 122, rh = 96, w = x0 + cw * 4 + 8, h = y0 + rh * 2 + 8;
  const placed = sentences.map((s, i) => ({ n: i + 1, row: TONE_ORDER.indexOf(s.tone), col: KEY_ORDER.indexOf(s.key), s }));

  let label = "Grid with two rows, sounds confident and sounds unsure, and four columns: correct, wrong, no source, nothing to check.";
  if (revealed) {
    label += " " + placed.map((p) => `Sentence ${p.n} is in ${TONE_LABEL[p.s.tone].toLowerCase()}, ${KEY_LABEL[p.s.key].toLowerCase()}.`).join(" ");
    const rows = new Set(placed.map((p) => p.row));
    if (rows.size === 1) label += ` Every sentence is in the ${TONE_LABEL[placed[0].s.tone].toLowerCase()} row: tone did not sort them.`;
  } else {
    label += " Empty until revealed.";
  }

  const cells = [];
  KEY_ORDER.forEach((k, c) => cells.push(`<text x="${x0 + c * cw + cw / 2}" y="28" class="g-col">${KEY_LABEL[k]}</text>`));
  TONE_ORDER.forEach((t, r) => {
    cells.push(`<text x="${x0 - 12}" y="${y0 + r * rh + rh / 2 + 5}" class="g-row">${TONE_LABEL[t]}</text>`);
    KEY_ORDER.forEach((_, c) => cells.push(`<rect x="${x0 + c * cw}" y="${y0 + r * rh}" width="${cw}" height="${rh}" class="g-cell"/>`));
  });
  const marks = revealed
    ? placed
        .map((p) => {
          const peers = placed.filter((q) => q.row === p.row && q.col === p.col);
          const k = peers.indexOf(p);
          const cx = x0 + p.col * cw + cw / 2 + (k - (peers.length - 1) / 2) * 34;
          const cy = y0 + p.row * rh + rh / 2;
          return `<g class="g-mark"><circle cx="${cx}" cy="${cy}" r="15"/><text x="${cx}" y="${cy + 5}">${p.n}</text></g>`;
        })
        .join("")
    : "";
  return `<svg class="grid" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">${cells.join("")}${marks}</svg>`;
}

/* ---------- shared pieces ---------- */

function say(lines) {
  return `<div class="say">${lines.map(([who, line]) => `<p><span class="who">${esc(who)}</span>${esc(line)}</p>`).join("")}</div>`;
}
const moves = (list) => `<ol class="moves">${list.map((m) => `<li>${esc(m)}</li>`).join("")}</ol>`;
const watch = (text) => `<div class="watch"><b>Watch for</b>${esc(text)}</div>`;
const targets = (ids) => `<span class="targets">Objectives ${ids.map(esc).join(", ")}</span>`;

function trackPicker(current) {
  return `<fieldset class="tracks"><legend>Audience track</legend>${TRACK_IDS.map(
    (t) =>
      `<label><input type="radio" name="track" value="${t}"${t === current ? " checked" : ""}> ${esc(TRACKS[t].label)}</label>`
  ).join("")}</fieldset>`;
}

/* ---------- hub ---------- */

export function renderHub(doc, { track = TRACK_IDS[0], now = new Date() } = {}) {
  const counts = tally(Object.values(CLAIMS), now);
  const readyCount = COURSE.lessons.filter((l) => l.ready).length;

  doc.querySelector("#top").innerHTML = `
    <h1>${esc(COURSE.title)}</h1>
    <p class="sub">${esc(COURSE.framing)}</p>
    <div class="facts">
      <span><b>${COURSE.lessons.length}</b> lessons</span>
      <span><b>${COURSE.minutes}</b> minutes each</span>
      <span><b>${TRACK_IDS.length}</b> audience tracks</span>
      <span><b>${readyCount}</b> ready</span>
      <span><b>${counts.attested}</b> of ${Object.keys(CLAIMS).length} claims attested</span>
    </div>
    ${trackPicker(track)}`;

  const lessons = COURSE.lessons
    .map(
      (l) => `<article class="card${l.ready ? "" : " pending"}" data-lesson="${l.n}">
      <p class="eyebrow">Lesson ${l.n}${l.ready ? "" : " · in design"}</p>
      <h3>${l.ready ? `<a href="lesson.html?n=${l.n}&amp;track=${track}">${esc(l.title)}</a>` : esc(l.title)}</h3>
      <p>${esc(l.framing)}</p>
      <ul class="objs">${l.objectives.map((o) => `<li><span class="bloom">${esc(o.bloom)}</span>${esc(o.text)}</li>`).join("")}</ul>
      ${l.ready ? "" : `<p class="note">${
        l.objectivesApproved
          ? `Objectives approved ${esc(l.objectivesApproved)}. Assessments and activities come next.`
          : "Objectives drafted, awaiting review."
      }</p>`}
    </article>`
    )
    .join("");

  doc.querySelector("#content").innerHTML = `
    <section><h2>Lessons</h2><p class="lede">${esc(TRACKS[track].who)}.</p><div class="cards">${lessons}</div></section>

    <section><h2>How it's built</h2>
      <table class="basis"><thead><tr><th>Framework</th><th>Its one job here</th></tr></thead><tbody>
        <tr><td>Backward design<br><small>Wiggins &amp; McTighe</small></td><td>Order of work: objectives first, then the evidence that shows each was met, then the activities. The test suite refuses a lesson that skips a step.</td></tr>
        <tr><td>Revised Bloom's taxonomy<br><small>Anderson &amp; Krathwohl</small></td><td>Every objective names a level and an observable verb. "Understand" and "know" are not allowed as the verb.</td></tr>
        <tr><td>Concrete → Pictorial → Abstract</td><td>Each lesson starts with a real output in the learner's hands, then a picture of what happened, then the principle.</td></tr>
        <tr><td>ARCS motivation<br><small>Keller</small></td><td>Attention, Relevance, Confidence, Satisfaction — why this matters, said differently for each track.</td></tr>
        <tr><td>Kirkpatrick evaluation</td><td>How we know it worked, at four levels (below).</td></tr>
      </tbody></table>
    </section>

    <section><h2>Evaluation</h2>
      <dl class="eval">${Object.entries(EVALUATION)
        .map(([n, e]) => `<dt>Level ${n} · ${esc(e.name)}</dt><dd>${esc(e.how)}</dd>`)
        .join("")}</dl>
    </section>

    <section><h2>What this course claims, and who has signed it</h2>
      <p class="lede">A course on checking AI output should show which of its own claims are checked. Every factual claim below was proposed by a model and stays Proposed until a named person attests it. Attested claims lapse after two years unless re-checked.</p>
      <p class="tally">${["attested", "proposed", "expired", "rejected"].map((s) => `${statusBadge(s)} ${counts[s]}`).join(" ")}</p>
      <div class="claims">${Object.keys(CLAIMS).map((id) => claimCard(id, now)).join("")}</div>
    </section>`;
}

/* ---------- lesson ---------- */

export function renderLesson(doc, lesson, { track = TRACK_IDS[0], now = new Date() } = {}) {
  const top = doc.querySelector("#top");
  const content = doc.querySelector("#content");
  const side = doc.querySelector("#side");
  const header = top.closest(".top");

  if (!lesson || !lesson.ready) {
    delete header.dataset.lesson;
    top.innerHTML = `<h1>Lesson not available</h1>`;
    content.innerHTML = `<p>${lesson ? `Lesson ${lesson.n} is still in design.` : "There is no lesson with that number."} <a href="index.html">Back to the course overview</a>.</p>`;
    side.innerHTML = "";
    return;
  }

  const [concrete, pictorial, abstract] = lesson.stages;
  const passage = concrete.tracks[track];

  header.dataset.lesson = lesson.n;
  doc.querySelector("#back")?.setAttribute("href", `index.html?track=${track}`);
  top.innerHTML = `
    <p class="eyebrow"><span class="lesson-no">Lesson ${lesson.n}</span> ${esc(TRACKS[track].label)}</p>
    <h1>${esc(lesson.title)}</h1>
    <p class="sub">${esc(lesson.framing)}</p>
    <div class="facts">
      <span><b>${COURSE.minutes}</b> minutes</span>
      <span><b>${lesson.objectives.length}</b> objectives</span>
      <span>Warm-up <b>${lesson.warmup.minutes}</b> · Concrete <b>${concrete.minutes}</b> · Pictorial <b>${pictorial.minutes}</b> · Abstract <b>${abstract.minutes}</b> · Check <b>${lesson.check.minutes}</b></span>
    </div>
    ${trackPicker(track)}`;

  const sentences = passage.passage.sentences;
  const provenanceNote =
    passage.passage.provenance === "planted"
      ? `Written by ${esc(passage.passage.model)} for this lesson, with errors planted on purpose.`
      : `Captured from ${esc(passage.passage.model)} on ${esc(passage.passage.captured)}.`;

  content.innerHTML = `
    <div class="obj"><p><b>By the end, learners can:</b></p><ul>${lesson.objectives
      .map((o) => `<li><span class="oid">${esc(o.id)}</span> ${esc(o.text)} <span class="bloom">${esc(o.bloom)}</span></li>`)
      .join("")}</ul></div>

    <section class="block why"><h2>Why this matters</h2>
      <p class="relevance">${esc(lesson.arcs.relevance[track])}</p>
      <p><b>Open with:</b> ${esc(lesson.arcs.attention)}</p>
      <p><b>Confidence:</b> ${esc(lesson.arcs.confidence)}</p>
    </section>

    <section class="block w" data-stage="warmup"><h2>Warm-up · Pre-check <span class="mins">${lesson.warmup.minutes} min</span></h2>
      <p class="sense">Record answers — they are the "before" for the post-check.</p>
      <ol class="probs">${lesson.warmup.items
        .map((i) => `<li>${esc(i.prompt)} ${targets(i.targets)}<div class="expect"><b>Expect</b>${esc(i.expected)}</div></li>`)
        .join("")}</ol>
    </section>

    <section class="block c" data-stage="concrete"><h2>Concrete · ${esc(concrete.title)} <span class="mins">${concrete.minutes} min</span></h2>
      <p class="stage-meta">${targets(concrete.targets)}</p>
      <p class="context">${esc(passage.context)}</p>
      <figure class="passage" data-track="${track}">
        <ol>${sentences
          .map(
            (s, i) => `<li><p>${esc(s.text)}</p><details class="key"><summary>Reveal<span class="sr"> the answer for sentence ${i + 1}</span></summary><p><b class="k k-${s.key}">${KEY_LABEL[s.key]}</b> ${esc(s.note)}</p>${
              s.source ? `<p class="src">Source card: ${esc(s.source)}</p>` : ""
            }</details></li>`
          )
          .join("")}</ol>
        <figcaption>${provenanceNote}</figcaption>
      </figure>
      <div class="keyclaim"><h3 class="subhead">Is this answer key right?</h3>${claimCard(passage.passage.claim, now)}</div>
      ${moves(concrete.moves)}${say(concrete.say)}${watch(concrete.watch)}
    </section>

    <section class="block p" data-stage="pictorial"><h2>Pictorial · ${esc(pictorial.title)} <span class="mins">${pictorial.minutes} min</span></h2>
      <p class="stage-meta">${targets(pictorial.targets)}</p>
      <div class="figure" id="grid">${confidenceGrid(sentences)}</div>
      <button type="button" class="btn" id="reveal-grid">Show the finished grid</button>
      ${moves(pictorial.moves)}${say(pictorial.say)}${watch(pictorial.watch)}
    </section>

    <section class="block a" data-stage="abstract"><h2>Abstract · ${esc(abstract.title)} <span class="mins">${abstract.minutes} min</span></h2>
      <p class="stage-meta">${targets(abstract.targets)}</p>
      <div class="claims">${abstract.principles.map((id) => claimCard(id, now)).join("")}</div>
      ${moves(abstract.moves)}${say(abstract.say)}${watch(abstract.watch)}
    </section>

    <section class="block w" data-stage="check"><h2>Check · Post-check <span class="mins">${lesson.check.minutes} min</span></h2>
      <p class="sense">Compare with the warm-up answers, objective by objective.</p>
      <ol class="probs">${lesson.check.items
        .map((i) => `<li>${esc(i.prompt)} ${targets(i.targets)}<div class="crit"><b>Reteach if</b>${esc(i.crit)}</div></li>`)
        .join("")}</ol>
      <div class="exit"><b>Exit ticket</b><p>${esc(lesson.check.exit.rating)}</p><p>${esc(lesson.check.exit.open)}</p></div>
    </section>

    <section class="block transfer"><h2>Use it this week</h2>
      <p>${esc(lesson.transfer[track])}</p>
      <p class="sense">Follow up in two weeks: bring one AI output you used and show what you checked.</p>
    </section>`;

  side.innerHTML = `
    <div class="sidebox"><h2>Alignment</h2>${alignmentTable(lesson)}</div>
    <div class="sidebox"><h2>Access notes</h2>${lesson.access
      .map((a) => `<p><b>${esc(a.channel)}</b> ${esc(a.note)}</p>`)
      .join("")}</div>
    <div class="sidebox"><h2>What learners leave with</h2><p>${esc(lesson.arcs.satisfaction)}</p></div>`;

  const btn = doc.querySelector("#reveal-grid");
  btn.addEventListener("click", () => {
    const grid = doc.querySelector("#grid");
    grid.innerHTML = confidenceGrid(sentences, { revealed: true });
    btn.remove();
    // The button vanishes, so hand focus to what it revealed rather than dropping it on <body>.
    grid.tabIndex = -1;
    grid.focus();
  });
}

function alignmentTable(lesson) {
  const cols = [
    ["Pre", lesson.warmup.items.flatMap((i) => i.targets)],
    ...lesson.stages.map((s) => [s.kind[0].toUpperCase(), s.targets]),
    ["Post", lesson.check.items.flatMap((i) => i.targets)]
  ];
  return `<table class="align"><thead><tr><th scope="col">Obj</th>${cols
    .map(([h]) => `<th scope="col">${h}</th>`)
    .join("")}</tr></thead><tbody>${lesson.objectives
    .map(
      (o) =>
        `<tr><th scope="row">${esc(o.id)}</th>${cols
          .map(([, t]) => (t.includes(o.id) ? `<td>✓<span class="sr"> taught or checked</span></td>` : `<td><span class="sr">not here</span></td>`))
          .join("")}</tr>`
    )
    .join("")}</tbody></table>`;
}

/* ---------- boot ---------- */

function readTrack(win) {
  const fromUrl = new URLSearchParams(win.location.search).get("track");
  if (TRACK_IDS.includes(fromUrl)) return fromUrl;
  try {
    const saved = win.localStorage.getItem("ai-literacy-track");
    if (TRACK_IDS.includes(saved)) return saved;
  } catch {}
  return TRACK_IDS[0];
}

export function boot(doc) {
  const win = doc.defaultView;
  const page = doc.body.dataset.page;
  let track = readTrack(win);

  const draw = () => {
    if (page === "hub") renderHub(doc, { track });
    else renderLesson(doc, getLesson(new URLSearchParams(win.location.search).get("n")), { track });
  };

  doc.addEventListener("change", (e) => {
    if (e.target.name !== "track") return;
    track = e.target.value;
    try { win.localStorage.setItem("ai-literacy-track", track); } catch {}
    const url = new URL(win.location.href);
    url.searchParams.set("track", track);
    win.history.replaceState(null, "", url);
    draw();
    doc.querySelector(`input[name="track"][value="${track}"]`)?.focus();
  });

  draw();
  doc.body.dataset.ready = "true";
}
