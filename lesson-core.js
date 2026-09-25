/**
 * Renderer for the hub and lesson pages. No side effects on import — pages
 * call boot(document); tests call the render functions directly.
 *
 * In the browser, "attestation-ledger" resolves through the import map in each
 * page to the published package on jsDelivr. In Node it resolves to the
 * installed devDependency. tests/governance.test.js keeps the two in step.
 */
import { resolveStatus, tally, STATUS, SOURCE } from "attestation-ledger";
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
  // Whole calendar days from today to the lapse date, so the count never drops a day after midday UTC
  // (the ledger's daysRemaining counts to the current time of day).
  const ttl = a.ttlDays ?? 730;
  const lapseDay = Date.parse(a.verified) + ttl * 86400000;
  const left = Math.round((lapseDay - Date.parse(now.toISOString().slice(0, 10))) / 86400000);
  const lapse = left < 0 ? `lapsed ${Math.abs(left)} day${left === -1 ? "" : "s"} ago — re-check before relying on it` : `${left} day${left === 1 ? "" : "s"} until it lapses`;
  return `<dl><dt>Attested by</dt><dd>${esc(a.by)}${a.role ? ` · ${esc(a.role)}` : ""}</dd><dt>Basis</dt><dd>${esc(a.basis)}</dd><dt>Verified</dt><dd>${esc(a.verified)} · ${lapse}</dd></dl>`;
}

export function claimCard(id, now = new Date(), { anchor = false, also = [] } = {}) {
  const record = CLAIMS[id];
  const status = resolveStatus(record, now);
  const alsoIn = also.length ? `<span class="claim-also">Also used in Lesson ${also.join(", ")}</span>` : "";
  return `<div class="claim"${anchor ? ` id="claim-${esc(id)}"` : ""} data-claim="${esc(id)}" data-status="${status}">
    <div class="claim-head">${statusBadge(status)}<span class="claim-id">${esc(id)}</span> ${alsoIn}</div>
    <p>${esc(record.text)}</p>
    <details><summary>Who says so<span class="sr"> about: ${esc(record.text.split(" ").slice(0, 8).join(" "))}…</span></summary>${provenance(record, now)}</details>
  </div>`;
}

/* ---------- pictorial: tone against truth ---------- */

const KEY_LABEL = { correct: "Correct", wrong: "Wrong", "no-source": "No source", nothing: "Nothing to check" };
const KEY_ORDER = ["correct", "wrong", "no-source", "nothing"];
const TONE_ORDER = ["confident", "hedged"];
const TONE_LABEL = { confident: "Sounds confident", hedged: "Sounds unsure" };

const placeSentences = (sentences) =>
  sentences.map((s, i) => ({ n: i + 1, row: TONE_ORDER.indexOf(s.tone), col: KEY_ORDER.indexOf(s.key), s }));

function confidenceLabel(placed, revealed) {
  let label = "Grid with two rows, sounds confident and sounds unsure, and four columns: correct, wrong, no source, nothing to check.";
  if (revealed) {
    label += " " + placed.map((p) => `Sentence ${p.n} is in ${TONE_LABEL[p.s.tone].toLowerCase()}, ${KEY_LABEL[p.s.key].toLowerCase()}.`).join(" ");
    const rows = new Set(placed.map((p) => p.row));
    if (rows.size === 1) label += ` Every sentence is in the ${TONE_LABEL[placed[0].s.tone].toLowerCase()} row: tone did not sort them.`;
  } else {
    label += " Empty until revealed.";
  }
  return label;
}

/** The same grid as a table, for figures too narrow to draw it. Only one of the two is ever shown. */
function gridTable(caption, corner, cols, rows, empty = "") {
  const cell = (marks) => `<td>${marks.length ? marks.map((m) => `<span class="tmark"><span class="sr">${m.word} </span>${m.n}</span>`).join("") : empty}</td>`;
  return `<table class="grid-alt"><caption class="sr">${esc(caption)}</caption><thead><tr><th scope="col">${corner}</th>${cols
    .map((c) => `<th scope="col">${c}</th>`)
    .join("")}</tr></thead><tbody>${rows.map((r) => `<tr><th scope="row">${esc(r.label)}</th>${r.cells.map(cell).join("")}</tr>`).join("")}</tbody></table>`;
}

export function confidenceGrid(sentences, { revealed = false } = {}) {
  const x0 = 150, y0 = 44, cw = 122, rh = 96, w = x0 + cw * 4 + 8, h = y0 + rh * 2 + 8;
  const placed = placeSentences(sentences);
  const label = confidenceLabel(placed, revealed);

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

/** Drawing plus table: CSS shows whichever fits the figure's width. */
export function confidenceView(sentences, { revealed = false } = {}) {
  const placed = placeSentences(sentences);
  // Turned on its side (answers down, tone across) so it needs three columns, not five, on a phone.
  const rows = KEY_ORDER.map((k, c) => ({
    label: KEY_LABEL[k],
    cells: TONE_ORDER.map((_, r) => (revealed ? placed.filter((p) => p.row === r && p.col === c).map((p) => ({ word: "Sentence", n: p.n })) : []))
  }));
  return confidenceGrid(sentences, { revealed }) + gridTable(confidenceLabel(placed, revealed), "Answer", TONE_ORDER.map((t) => TONE_LABEL[t]), rows);
}

/* ---------- pictorial: one passage, three uses, three levels of checking ---------- */

export const LEVELS = [
  { id: "glance", label: "Glance", what: "Read it. Does it fit what you already know? No lookup." },
  { id: "spot", label: "Spot-check", what: "Check the numbers, dates, names, quotes and citations. One source for each." },
  { id: "full", label: "Full check", what: "Check every claim against the original. A second person reads it too." }
];

const levelCol = (u) => LEVELS.findIndex((l) => l.id === u.check);

function scaleLabel(uses, revealed) {
  let label = `Grid with three rows, the uses of this passage, and three columns: ${LEVELS.map((l) => l.label.toLowerCase()).join(", ")}.`;
  if (revealed) {
    label += " " + uses.map((u) => `${u.label} gets a ${LEVELS[levelCol(u)].label.toLowerCase()}.`).join(" ");
    label += " The passage is the same in every row: the use decides the check.";
  } else {
    label += " Empty until revealed.";
  }
  return label;
}

export function checkScaleView(uses, { revealed = false } = {}) {
  const rows = uses.map((u, r) => ({
    label: u.label,
    cells: LEVELS.map((_, c) => (revealed && levelCol(u) === c ? [{ word: "Use", n: r + 1 }] : []))
  }));
  return checkScale(uses, { revealed }) + gridTable(scaleLabel(uses, revealed), "Use", LEVELS.map((l) => l.label), rows);
}

export function checkScale(uses, { revealed = false } = {}) {
  const x0 = 240, y0 = 44, cw = 136, rh = 64, w = x0 + cw * LEVELS.length + 8, h = y0 + rh * uses.length + 8;
  const col = levelCol;
  const label = scaleLabel(uses, revealed);

  const cells = [];
  LEVELS.forEach((l, c) => cells.push(`<text x="${x0 + c * cw + cw / 2}" y="28" class="g-col">${l.label}</text>`));
  uses.forEach((u, r) => {
    cells.push(`<text x="${x0 - 12}" y="${y0 + r * rh + rh / 2 + 5}" class="g-row">${esc(u.label)}</text>`);
    LEVELS.forEach((_, c) => cells.push(`<rect x="${x0 + c * cw}" y="${y0 + r * rh}" width="${cw}" height="${rh}" class="g-cell"/>`));
  });
  const marks = revealed
    ? uses
        .map((u, r) => {
          const cx = x0 + col(u) * cw + cw / 2, cy = y0 + r * rh + rh / 2;
          return `<g class="g-mark"><circle cx="${cx}" cy="${cy}" r="15"/><text x="${cx}" y="${cy + 5}">${r + 1}</text></g>`;
        })
        .join("")
    : "";
  return `<svg class="grid" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">${cells.join("")}${marks}</svg>`;
}

function scaleFigure(uses) {
  return `<h3 class="subhead">Three levels of checking</h3>
      <dl class="levels">${LEVELS.map((l) => `<div><dt>${l.label}</dt><dd>${l.what}</dd></div>`).join("")}</dl>
      <h3 class="subhead">Three uses of this passage</h3>
      <ol class="uses">${uses.map((u) => `<li><b>${esc(u.label)}.</b> ${esc(u.why)}</li>`).join("")}</ol>
      <div class="figure" id="grid">${checkScaleView(uses)}</div>
      <button type="button" class="btn" id="reveal-grid">Show the finished grid</button>`;
}

/* ---------- prompt pairs: which part of a request caused which line ---------- */

export const PARTS = [
  { id: "task", label: "Task", ask: "What kind of writing is wanted?" },
  { id: "context", label: "Context", ask: "Who is it for, and what's the situation?" },
  { id: "constraints", label: "Constraints", ask: "What limits apply, such as length, tone or must-haves?" },
  { id: "format", label: "Format", ask: "What shape should it come back in?" }
];
export const GAP_LABEL = { stated: "Stated", vague: "Vague", missing: "Missing" };
export const INVENTED = "Invented — the request didn't say.";
const partLabel = (id) => PARTS.find((p) => p.id === id).label;
const IDLE = "No part selected. Press one to see which lines it changed.";

function outputLines(lines, active = null) {
  return lines
    .map((l) => {
      const on = active && l.causedBy?.includes(active);
      const tag = on ? ` <span class="cmp-tag"><span aria-hidden="true">←</span> ${partLabel(active)}<span class="sr"> caused this line</span></span>` : "";
      const inv = l.invented ? ` <span class="cmp-inv">${INVENTED}</span><span class="cmp-note">${esc(l.invented)}</span>` : "";
      return `<li${on ? ` class="on part-${active}"` : ""}>${esc(l.text)}${tag}${inv}</li>`;
    })
    .join("");
}

/** What the live region says for a pressed part, or for none. */
export function compareStatus(pair, active) {
  if (!active) return IDLE;
  const n = pair.structured.output.filter((l) => l.causedBy?.includes(active)).length;
  return `${pair.structured.effects[active]} ${n} line${n === 1 ? "" : "s"} marked.`;
}

export function structuredOutput(pair, active = null) {
  return `<ul class="cmp-out" id="cmp-structured">${outputLines(pair.structured.output, active)}</ul>`;
}

export function promptCompare(pair) {
  return `<div class="cmp-controls" role="group" aria-label="Parts of the request">${PARTS.map(
    (p) => `<button type="button" class="btn cmp-btn" data-part="${p.id}" aria-pressed="false" aria-controls="cmp-structured">Show what ${p.label} changed</button>`
  ).join("")}</div>
    <p class="cmp-status" id="cmp-status" aria-live="polite">${IDLE}</p>
    <div class="cmp">
      <div class="cmp-col"><h3 class="subhead">The vague request</h3><p class="req">“${esc(pair.vague.prompt)}”</p>
        <p class="cmp-label">What came back</p><ul class="cmp-out">${outputLines(pair.vague.output)}</ul></div>
      <div class="cmp-col"><h3 class="subhead">The request in four parts</h3><dl class="cmp-parts">${PARTS.map(
        (p) => `<div class="cmp-part part-${p.id}"><dt>${p.label}</dt><dd>${esc(pair.structured.parts[p.id])}</dd></div>`
      ).join("")}</dl>
        <p class="cmp-label">What came back</p>${structuredOutput(pair)}</div>
    </div>`;
}

/* ---------- sign-offs (Lesson 4): what the ledger checks, and what only a person can ---------- */

export const SIGNOFF_LABEL = {
  sound: "Sound",
  "not-a-person": "Not a person",
  "no-basis": "No basis",
  "wrong-signer": "Wrong signer",
  lapsed: "Lapsed"
};
const DAY_MS = 86400000;
const TTL_DAYS = 730;
const isoDay = (d) => d.toISOString().slice(0, 10);
const daysFrom = (d, days) => new Date(d.getTime() + days * DAY_MS);
const validDate = (s) => Boolean(s) && !Number.isNaN(new Date(s).getTime());

/**
 * A lesson's fictional sign-off as a ledger record. Dated relative to `now`,
 * so a sound sign-off never drifts into a lapsed one as real time passes.
 */
export function signoffRecord(item, now = new Date()) {
  return {
    attestation: { source: SOURCE.PRACTITIONER, by: item.by, role: item.role, basis: item.basis, verified: isoDay(daysFrom(now, -item.daysAgo)) }
  };
}

/** What the builder's fields add up to, as a record the real engine can judge. */
export function draftRecord({ who, by = "", role = "", basis = "", date = "" }) {
  if (who === "model") return { attestation: { source: SOURCE.MODEL, model: by.trim() || "an AI tool", rationale: basis, by: null, verified: null } };
  return { attestation: { source: SOURCE.PRACTITIONER, by: by.trim() || null, role: role.trim() || null, basis: basis.trim(), verified: date || null } };
}

/** The builder's verdict: the engine's status, and a sentence saying why. */
export function signoffStatus(fields, now = new Date()) {
  const status = resolveStatus(draftRecord(fields), now);
  let text;
  if (fields.who === "model") text = "Proposed. An AI tool can propose a value, but it can't sign for it.";
  else if (!fields.by.trim()) text = "Proposed. There's no name, so nobody has signed it.";
  else if (!validDate(fields.date)) text = "Proposed. There's no date, so nobody can tell when it was checked.";
  else if (status === STATUS.EXPIRED) {
    const age = Math.round((now - new Date(fields.date)) / DAY_MS);
    text = `Lapsed. It was checked ${age} days ago. Sign-offs here last two years, so it needs checking again.`;
  } else if (fields.date > isoDay(now)) text = "Attested, but the date is in the future. Nobody can have checked it then.";
  else {
    // Count whole calendar days to the date we show, so the two numbers always agree.
    // (The engine counts to the current time of day, which drops a day after midday UTC.)
    const lapse = isoDay(daysFrom(new Date(fields.date), TTL_DAYS));
    const left = Math.round((Date.parse(lapse) - Date.parse(isoDay(now))) / DAY_MS);
    text = `Attested. It lapses on ${lapse}, in ${left} day${left === 1 ? "" : "s"}.`;
  }
  if (status === STATUS.ATTESTED && !fields.basis.trim()) text += " The ledger accepted a sign-off with no basis. Would you?";
  return { status, text };
}

/** Checked, today and lapses on one line: drawn, and again as a table for narrow screens. */
export function signoffTimeline(date, now = new Date()) {
  if (!validDate(date)) return `<p class="so-empty">No date checked, so there is no timeline to draw.</p>`;
  const checked = new Date(date), lapse = daysFrom(checked, TTL_DAYS);
  const x0 = 80, x1 = 540, w = 640, h = 124, y = 64;
  const age = (now - checked) / DAY_MS;
  const tx = Math.max(24, Math.min(616, x0 + (age / TTL_DAYS) * (x1 - x0)));
  const gap = Math.round(Math.abs((now - lapse) / DAY_MS));
  const where =
    age < 0 ? "before the date it was checked" : now > lapse ? `${gap} days after it lapsed` : `${gap} days before it lapses`;
  const label = `Timeline. Checked on ${isoDay(checked)}. Lapses on ${isoDay(lapse)}, two years later. Today, ${isoDay(now)}, is ${where}.`;
  const svg = `<svg class="grid timeline" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">
    <line class="tl-axis" x1="24" y1="${y}" x2="616" y2="${y}"/>
    <line class="tl-live" x1="${x0}" y1="${y}" x2="${x1}" y2="${y}"/>
    <line class="tl-today" x1="${tx}" y1="${y - 26}" x2="${tx}" y2="${y + 14}"/>
    <text x="${tx}" y="28" class="g-col">Today</text>
    <g class="g-mark"><circle cx="${x0}" cy="${y}" r="9"/></g>
    <g class="g-mark"><circle cx="${x1}" cy="${y}" r="9"/></g>
    <text x="${x0}" y="${y + 34}" class="g-col">Checked</text><text x="${x0}" y="${y + 54}" class="g-col">${isoDay(checked)}</text>
    <text x="${x1}" y="${y + 34}" class="g-col">Lapses</text><text x="${x1}" y="${y + 54}" class="g-col">${isoDay(lapse)}</text>
  </svg>`;
  const rows = [["Checked", isoDay(checked)], ["Today", isoDay(now)], ["Lapses", isoDay(lapse)]];
  const table = `<table class="grid-alt"><caption class="sr">${esc(label)}</caption><thead><tr><th scope="col">Point</th><th scope="col">Date</th></tr></thead><tbody>${rows
    .map(([k, v]) => `<tr><th scope="row">${k}</th><td>${v}</td></tr>`)
    .join("")}</tbody></table>`;
  return svg + table;
}

const soField = (id, label, value) =>
  `<label for="${id}">${label}<input id="${id}" type="text" autocomplete="off" value="${esc(value)}"></label>`;

function signoffBuilder(items, now) {
  const start = items.find((i) => i.key === "lapsed");
  const fields = { who: "person", by: start.by, role: start.role, basis: start.basis, date: isoDay(daysFrom(now, -start.daysAgo)) };
  const s = signoffStatus(fields, now);
  return `<p class="cmp-label">The statement being signed</p>
      <p class="req">“${esc(start.statement)}”</p>
      <form class="so-form" id="so-form" novalidate>
        <fieldset class="so-who"><legend>Who is signing?</legend>
          <label><input type="radio" name="so-who" value="person" checked> A person</label>
          <label><input type="radio" name="so-who" value="model"> An AI tool</label>
        </fieldset>
        ${soField("so-by", "Name", fields.by)}
        ${soField("so-role", "Role", fields.role)}
        ${soField("so-basis", "What you checked it against", fields.basis)}
        <label for="so-date">Date checked<input id="so-date" type="date" value="${fields.date}"></label>
      </form>
      <button type="button" class="btn" id="so-reset">Start again</button>
      <div class="so-result"><span id="so-badge">${statusBadge(s.status)}</span><p class="so-status" id="so-status" aria-live="polite">${esc(s.text)}</p></div>
      <div class="figure" id="timeline">${signoffTimeline(fields.date, now)}</div>`;
}

function signoffExercise(set, provenanceNote, now) {
  return `<figure class="passage signoffs">
        <ol>${set.items
          .map((it, i) => {
            const rec = signoffRecord(it, now);
            return `<li><p>${esc(it.statement)}</p>
          <dl class="so-line"><div><dt>Signed</dt><dd>${esc(it.by)}, ${esc(it.role)}</dd></div><div><dt>Basis</dt><dd>${it.basis ? esc(it.basis) : "<i>None given</i>"}</dd></div><div><dt>Checked</dt><dd>${rec.attestation.verified}</dd></div></dl>
          <details class="key"><summary>Reveal<span class="sr"> the answer for sign-off ${i + 1}</span></summary><p class="so-ledger">The ledger shows ${statusBadge(resolveStatus(rec, now))}</p><p><b class="k k-${it.key}">${SIGNOFF_LABEL[it.key]}</b> ${esc(it.note)}</p></details></li>`;
          })
          .join("")}</ol>
        <figcaption>${provenanceNote} This team treats a sign-off as lapsed two years after it was checked. Today is ${isoDay(now)}.</figcaption>
      </figure>`;
}

function wireSignoff(doc, now) {
  const form = doc.querySelector("#so-form");
  const val = (id) => form.querySelector(`#${id}`).value;
  const update = () => {
    const fields = { who: form.querySelector('input[name="so-who"]:checked').value, by: val("so-by"), role: val("so-role"), basis: val("so-basis"), date: val("so-date") };
    const s = signoffStatus(fields, now);
    doc.querySelector("#so-badge").innerHTML = statusBadge(s.status);
    doc.querySelector("#so-status").textContent = s.text;
    doc.querySelector("#timeline").innerHTML = signoffTimeline(fields.date, now);
  };
  // Remember where it started, so "Start again" can put it back without a reload (user control).
  const start = [...form.querySelectorAll("input")].map((el) => [el, el.type === "radio" ? el.checked : el.value]);
  doc.querySelector("#so-reset").addEventListener("click", () => {
    for (const [el, v] of start) el.type === "radio" ? (el.checked = v) : (el.value = v);
    update();
  });
  form.addEventListener("input", update);
  form.addEventListener("change", update);
  form.addEventListener("submit", (e) => e.preventDefault());
}

/* ---------- classify + checklist (Lesson 5): name the mistake, then build the checks that catch it ---------- */

export const KINDS = ["fabrication", "outdated", "bias", "misread"];
export const ERROR_LABEL = { fabrication: "Fabrication", outdated: "Outdated", bias: "Bias", misread: "Misread request", fine: "No error" };
const KIND_PLAIN = { fabrication: "fabrication", outdated: "outdated information", bias: "bias", misread: "a misread request" };
const KIND_ROW = { fabrication: "Fabrication", outdated: "Outdated", bias: "Bias", misread: "Misread" };
// Each kind has its own place to look, which is why each needs its own check.
const ERROR_WHERE = {
  fabrication: "a source you can find",
  outdated: "the date behind the fact",
  bias: "who is left out",
  misread: "the request",
  fine: "nothing, there is nothing to fix"
};
// Why a mistake of each kind got past a checklist.
const MISS_WHY = {
  fabrication: "No check looks up names, numbers or sources.",
  outdated: "No check looks at the date behind a fact.",
  bias: "No check asks who is left out.",
  misread: "No check compares it with the request."
};
const joinList = (a) => (a.length < 2 ? a.join("") : a.length === 2 ? a.join(" and ") : `${a.slice(0, -1).join(", ")} and ${a.at(-1)}`);

function classifyExercise(set, request, provenanceNote) {
  return `<figure class="passage classify">
        <p class="cmp-label">The request</p>
        <p class="req">“${esc(set.request)}”</p>
        <p class="cmp-label">What came back</p>
        <ol>${set.items
          .map(
            (it, i) => `<li><p>${esc(it.text)}</p><details class="key"><summary>Reveal<span class="sr"> the answer for sentence ${i + 1}</span></summary><p><b class="k k-${it.key}">${ERROR_LABEL[it.key]}</b> ${esc(it.note)}</p>${
              it.rule ? `<p class="src">The request said: “${esc(it.rule)}”</p>` : ""
            }<p class="src">Where to look: ${ERROR_WHERE[it.key]}.</p>${it.source ? `<p class="src">Source card: ${esc(it.source)}</p>` : ""}</details></li>`
          )
          .join("")}</ol>
        <figcaption>${provenanceNote}</figcaption>
      </figure>`;
}

/**
 * What a set of ticked checks adds up to. Coverage is by kind of error: a
 * check "covers" a kind if it really finds it. A check that finds none of the
 * four still feels like checking, so the status names it.
 */
export function checklistStatus(ids, checks, limit = 5) {
  const chosen = checks.map((c, i) => ({ ...c, n: i + 1 })).filter((c) => ids.includes(c.id));
  const first = new Map();
  const repeats = [];
  for (const c of chosen) {
    const fresh = c.catches.filter((k) => !first.has(k));
    if (c.catches.length && !fresh.length) repeats.push({ n: c.n, of: first.get(c.catches[0]) });
    for (const k of fresh) first.set(k, c.n);
  }
  const coverBy = Object.fromEntries(KINDS.map((k) => [k, chosen.filter((c) => c.catches.includes(k)).map((c) => c.n)]));
  const covered = KINDS.filter((k) => coverBy[k].length);
  const gaps = KINDS.filter((k) => !coverBy[k].length);
  const weak = chosen.filter((c) => !c.catches.length);
  const over = chosen.length > limit;

  let text;
  if (!chosen.length) text = `No checks yet. Pick up to ${limit}.`;
  else {
    const parts = [];
    if (!covered.length) parts.push("None of these checks catches any of the four kinds.");
    else if (!gaps.length) parts.push("Every kind of error has a check.");
    else parts.push(`This covers ${joinList(covered.map((k) => KIND_PLAIN[k]))}. Nothing catches ${joinList(gaps.map((k) => KIND_PLAIN[k]))}.`);
    for (const c of weak) parts.push(`Check ${c.n} catches none of the four kinds. ${c.note}`.trim());
    for (const r of repeats) parts.push(`Check ${r.n} repeats check ${r.of}.`);
    if (over) parts.push(`That's ${chosen.length} checks. A checklist people use is short.`);
    else if (!gaps.length) parts.push(`You used ${chosen.length} of ${limit}.`);
    text = parts.join(" ");
  }
  return { chosen, covered, gaps, weak, repeats, over, coverBy, text };
}

function checklistLabel(status, count) {
  let label = `Grid with four rows, the kinds of error, and ${count} columns, the checks.`;
  if (!status.chosen.length) return `${label} Empty until you pick checks.`;
  label += " " + KINDS.map((k) => {
    const by = status.coverBy[k];
    const name = k === "misread" ? "A misread request" : KIND_ROW[k] === "Outdated" ? "Outdated information" : KIND_ROW[k];
    return by.length ? `${name} is covered by check${by.length > 1 ? "s" : ""} ${joinList(by.map(String))}.` : `${name} is not covered.`;
  }).join(" ");
  if (!status.gaps.length) label += " Every kind is covered.";
  return label;
}

export function checklistGrid(ids, checks, limit = 5) {
  const status = checklistStatus(ids, checks, limit);
  const x0 = 130, y0 = 44, cw = 46, rh = 52, statW = 148;
  const w = x0 + cw * checks.length + statW, h = y0 + rh * KINDS.length + 8;
  const label = checklistLabel(status, checks.length);
  const cells = [];
  checks.forEach((_, c) => cells.push(`<text x="${x0 + c * cw + cw / 2}" y="28" class="g-col">${c + 1}</text>`));
  KINDS.forEach((k, r) => {
    cells.push(`<text x="${x0 - 12}" y="${y0 + r * rh + rh / 2 + 5}" class="g-row">${KIND_ROW[k]}</text>`);
    checks.forEach((_, c) => cells.push(`<rect x="${x0 + c * cw}" y="${y0 + r * rh}" width="${cw}" height="${rh}" class="g-cell"/>`));
    if (status.chosen.length) {
      const ok = status.coverBy[k].length > 0;
      cells.push(`<text x="${x0 + cw * checks.length + 12}" y="${y0 + r * rh + rh / 2 + 5}" class="g-stat ${ok ? "ok" : "gap"}">${ok ? "✓ Covered" : "✕ Not covered"}</text>`);
    }
  });
  const marks = status.chosen
    .flatMap((c) => KINDS.map((k, r) => (c.catches.includes(k) ? { c, r } : null)).filter(Boolean))
    .map(({ c, r }) => {
      const cx = x0 + (c.n - 1) * cw + cw / 2, cy = y0 + r * rh + rh / 2;
      return `<g class="g-mark"><circle cx="${cx}" cy="${cy}" r="15"/><text x="${cx}" y="${cy + 5}">${c.n}</text></g>`;
    })
    .join("");
  return `<svg class="grid" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">${cells.join("")}${marks}</svg>`;
}

/** Drawing plus table, as in the other figures: CSS shows whichever fits the width. */
export function checklistView(ids, checks, limit = 5) {
  const status = checklistStatus(ids, checks, limit);
  const rows = KINDS.map((k) => ({ label: KIND_ROW[k], cells: [status.coverBy[k].map((n) => ({ word: "Check", n }))] }));
  return checklistGrid(ids, checks, limit) + gridTable(checklistLabel(status, checks.length), "Kind of error", ["Covered by"], rows, "Nothing yet");
}

/**
 * Run a checklist over an answer (objective 5.3). A mistake is caught when a
 * ticked check finds its kind; a sentence with no error has nothing to catch.
 */
export function runChecklist(ids, checks, items) {
  const chosen = checks.map((c, i) => ({ ...c, n: i + 1 })).filter((c) => ids.includes(c.id));
  const results = items.map((it, i) => {
    if (it.key === "fine") return { n: i + 1, key: it.key, outcome: "fine", by: [] };
    const by = chosen.filter((c) => c.catches.includes(it.key)).map((c) => c.n);
    return { n: i + 1, key: it.key, outcome: by.length ? "caught" : "missed", by };
  });
  const mistakes = results.filter((r) => r.outcome !== "fine");
  const caught = mistakes.filter((r) => r.outcome === "caught");
  const summary = !chosen.length
    ? ""
    : caught.length === mistakes.length
      ? `On today's answer it catches all ${mistakes.length} mistakes.`
      : `On today's answer it catches ${caught.length} of ${mistakes.length} mistakes.`;
  return { results, caught: caught.length, total: mistakes.length, summary };
}

function runList(run) {
  return `<ol class="ck-run">${run.results
    .map((r) =>
      r.outcome === "fine"
        ? `<li><b class="k k-fine">No error</b> Nothing to catch.</li>`
        : r.outcome === "caught"
          ? `<li><b class="k k-${r.key}">${ERROR_LABEL[r.key]}</b> Caught by check${r.by.length > 1 ? "s" : ""} ${joinList(r.by.map(String))}.</li>`
          : `<li><b class="k k-${r.key}">${ERROR_LABEL[r.key]}</b> <span class="ck-miss">Slips through.</span> ${MISS_WHY[r.key]}</li>`
    )
    .join("")}</ol>`;
}

function checklistBuilder(stage, items) {
  return `<form class="ck-form" id="ck-form" novalidate>
        <label for="ck-task">What do you use AI for every week?<input id="ck-task" type="text" autocomplete="off" value=""></label>
        <fieldset class="ck-list"><legend>Pick up to ${stage.limit} checks</legend>
          ${stage.checks.map((c, i) => `<label><input type="checkbox" value="${esc(c.id)}"><span><b>${i + 1}.</b> ${esc(c.text)}</span></label>`).join("")}
        </fieldset>
      </form>
      <button type="button" class="btn" id="ck-reset">Start again</button>
      <p class="so-status" id="ck-status" aria-live="polite">${esc(checklistStatus([], stage.checks, stage.limit).text)}</p>
      <div class="figure" id="ck-figure">${checklistView([], stage.checks, stage.limit)}</div>
      <div class="ck-mine"><h3 class="subhead">Your checklist</h3><div id="ck-mine"><p class="so-empty">Nothing ticked yet.</p></div></div>
      <div class="ck-mine"><h3 class="subhead">Run it on today's answer</h3><p class="sense">Each line is a sentence from the concrete stage, in the same order.</p><div id="ck-run"><p class="so-empty">Tick a check to run it.</p></div></div>`;
}

function wireChecklist(doc, stage, items) {
  const form = doc.querySelector("#ck-form");
  doc.querySelector("#ck-reset").addEventListener("click", () => {
    for (const b of form.querySelectorAll('input[type="checkbox"]')) b.checked = false;
    form.querySelector("#ck-task").value = "";
    form.dispatchEvent(new doc.defaultView.Event("change"));
  });
  const update = () => {
    const ids = [...form.querySelectorAll('input[type="checkbox"]:checked')].map((i) => i.value);
    const status = checklistStatus(ids, stage.checks, stage.limit);
    const task = form.querySelector("#ck-task").value.trim();
    const run = runChecklist(ids, stage.checks, items);
    doc.querySelector("#ck-status").textContent = run.summary ? `${status.text} ${run.summary}` : status.text;
    doc.querySelector("#ck-run").innerHTML = ids.length ? runList(run) : `<p class="so-empty">Tick a check to run it.</p>`;
    doc.querySelector("#ck-figure").innerHTML = checklistView(ids, stage.checks, stage.limit);
    doc.querySelector("#ck-mine").innerHTML = status.chosen.length
      ? `${task ? `<p>For: ${esc(task)}</p>` : ""}<ol>${status.chosen.map((c) => `<li>${esc(c.text)}</li>`).join("")}</ol>`
      : `<p class="so-empty">Nothing ticked yet.</p>`;
  };
  form.addEventListener("input", update);
  form.addEventListener("change", update);
  form.addEventListener("submit", (e) => e.preventDefault());
}

/* ---------- screens (Lesson 6): use an AI-built screen, name what it breaks, decide what to fix first ---------- */

export const PRINCIPLE_LABEL = {
  "user-centricity": "User-centricity",
  consistency: "Consistency",
  hierarchy: "Hierarchy",
  context: "Context",
  "user-control": "User control",
  accessibility: "Accessibility",
  usability: "Usability",
  fine: "Works well"
};
export const GOAL_LABEL = { learnability: "learnability", efficiency: "efficiency", memorability: "memorability", errors: "errors", satisfaction: "satisfaction" };
export const HARM = ["high", "medium", "low"];
export const REACH = ["few", "some", "all"];
const HARM_LABEL = { high: "High harm", medium: "Medium harm", low: "Low harm" };
const REACH_LABEL = { few: "Hits few", some: "Hits some", all: "Hits all" };

/**
 * The mock screen sits in a sandboxed frame: scripts may run so it can be used,
 * but it has no access to this page, and its content is inline with no URLs.
 * It is meant to be flawed, so it stays out of the page's own audit; the text
 * version beside it carries the same parts in words.
 */
function principleReveal(p) {
  const goal = p.goal ? ` <span class="goal">Goal that suffers: ${GOAL_LABEL[p.goal]}${p.also ? `, and ${GOAL_LABEL[p.also]}` : ""}.</span>` : "";
  return `<b class="k k-${p.principle}">${PRINCIPLE_LABEL[p.principle]}</b>${goal} ${esc(p.note)}`;
}

/** Lesson 7's key: a WCAG failure, an addictive pattern, or the part that works. */
export const AUDIT_LABEL = { wcag: "Accessibility", pattern: "Addictive pattern", fine: "Works well" };
function auditReveal(p) {
  if (p.kind === "wcag") {
    return `<b class="k k-wcag">${AUDIT_LABEL.wcag}</b> <span class="goal">${esc(p.group)} (WCAG: ${esc(p.principle)}) · ${esc(p.criterion)} ${esc(p.name)} · Level ${esc(p.level)}.</span> ${esc(p.note)}`;
  }
  if (p.kind === "pattern") {
    return `<b class="k k-pattern">${AUDIT_LABEL.pattern}</b> <span class="goal">${esc(p.pattern)}. Calmer fix: ${esc(p.fix)}</span> ${esc(p.note)}`;
  }
  return `<b class="k k-fine">${AUDIT_LABEL.fine}</b> ${esc(p.note)}`;
}

function screenExercise(screen, provenanceNote, reveal = principleReveal, ask = "Name what each numbered part breaks, or say it works") {
  return `<figure class="passage screen">
        <iframe class="mock" title="${esc(screen.title)}: a made-up screen, as if built by AI" sandbox="allow-scripts" height="${Number(screen.height)}" srcdoc="${esc(screen.html)}"></iframe>
        <details class="key textver"><summary>Text version of this screen</summary><ol>${screen.parts.map((p) => `<li>${esc(p.desc)}</li>`).join("")}</ol></details>
        <figcaption>${provenanceNote}</figcaption>
      </figure>
      <h3 class="subhead">${ask}</h3>
      <ol class="gaps">${screen.parts
        .map((p, i) => `<li><p>${esc(p.label)}</p><details class="key"><summary>Reveal<span class="sr"> the answer for part ${i + 1}</span></summary><p>${reveal(p)}</p></details></li>`)
        .join("")}</ol>`;
}

/** The problems in the order to fix them: worst harm first, then widest reach. */
export function fixOrder(parts) {
  return parts
    .map((p, i) => ({ ...p, n: i + 1 }))
    .filter((p) => p.principle !== "fine")
    .sort((a, b) => HARM.indexOf(a.harm) - HARM.indexOf(b.harm) || REACH.indexOf(b.reach) - REACH.indexOf(a.reach) || a.n - b.n);
}

function fixLabel(parts, revealed) {
  let label = "Grid with three rows, how bad the problem is: high, medium and low harm, and three columns, how many users it hits: few, some and all.";
  if (!revealed) return `${label} Empty until revealed.`;
  const placed = parts.map((p, i) => ({ ...p, n: i + 1 })).filter((p) => p.principle !== "fine");
  label += " " + placed.map((p) => `Problem ${p.n} is ${p.harm} harm and hits ${p.reach} users.`).join(" ");
  label += ` Fix in this order: ${fixOrder(parts).map((p) => p.n).join(", ")}. Fix first means the top right: high harm that hits everyone.`;
  return label;
}

export function fixFirstGrid(parts, { revealed = false } = {}) {
  const x0 = 150, y0 = 44, cw = 150, rh = 80, w = x0 + cw * REACH.length + 8, h = y0 + rh * HARM.length + 8;
  const cells = [];
  REACH.forEach((r, c) => cells.push(`<text x="${x0 + c * cw + cw / 2}" y="28" class="g-col">${REACH_LABEL[r]}</text>`));
  HARM.forEach((hm, r) => {
    cells.push(`<text x="${x0 - 12}" y="${y0 + r * rh + rh / 2 + 5}" class="g-row">${HARM_LABEL[hm]}</text>`);
    REACH.forEach((_, c) => cells.push(`<rect x="${x0 + c * cw}" y="${y0 + r * rh}" width="${cw}" height="${rh}" class="g-cell"/>`));
  });
  const placed = parts.map((p, i) => ({ ...p, n: i + 1 })).filter((p) => p.principle !== "fine");
  const marks = revealed
    ? placed
        .map((p) => {
          const row = HARM.indexOf(p.harm), col = REACH.indexOf(p.reach);
          const peers = placed.filter((q) => q.harm === p.harm && q.reach === p.reach);
          const k = peers.indexOf(p);
          const cx = x0 + col * cw + cw / 2 + (k - (peers.length - 1) / 2) * 36, cy = y0 + row * rh + rh / 2;
          return `<g class="g-mark"><circle cx="${cx}" cy="${cy}" r="15"/><text x="${cx}" y="${cy + 5}">${p.n}</text></g>`;
        })
        .join("")
    : "";
  return `<svg class="grid" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(fixLabel(parts, revealed))}">${cells.join("")}${marks}</svg>`;
}

/** Drawing plus table, as in the other figures, and the fix order in words once revealed. */
export function fixFirstView(parts, { revealed = false } = {}) {
  const placed = parts.map((p, i) => ({ ...p, n: i + 1 })).filter((p) => p.principle !== "fine");
  const rows = HARM.map((hm) => ({
    label: HARM_LABEL[hm],
    cells: REACH.map((r) => (revealed ? placed.filter((p) => p.harm === hm && p.reach === r).map((p) => ({ word: "Problem", n: p.n })) : []))
  }));
  const order = revealed ? `<p class="fix-order">Fix in this order: ${fixOrder(parts).map((p) => `problem ${p.n}`).join(", ")}.</p>` : "";
  return fixFirstGrid(parts, { revealed }) + gridTable(fixLabel(parts, revealed), "Harm", REACH.map((r) => REACH_LABEL[r]), rows) + order;
}

/** Reference tables for an abstract stage, such as goals and principles. */
function refTables(tables = []) {
  return tables
    .map(
      (t) => `<h3 class="subhead">${esc(t.title)}</h3><table class="ref"><thead><tr>${t.head.map((h) => `<th scope="col">${esc(h)}</th>`).join("")}</tr></thead><tbody>${t.rows
        .map((r) => `<tr><th scope="row">${esc(r[0])}</th>${r.slice(1).map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`)
        .join("")}</tbody></table>`
    )
    .join("");
}

/* ---------- judge (Lesson 8): keep, change or stop; and who stays in control ---------- */

export const VERDICT_LABEL = { keep: "Keep", change: "Change", stop: "Stop" };
export const TOUCHES = ["dignity", "children", "relationships"];
export const CONTROL = ["high", "some", "low"];
export const AUTOMATION = ["low", "some", "high"];
const CONTROL_LABEL = { high: "High human control", some: "Some human control", low: "Low human control" };
const AUTOMATION_LABEL = { low: "Little automation", some: "Some automation", high: "High automation" };

function judgeReveal(p) {
  return `<b class="k k-${p.verdict}">${VERDICT_LABEL[p.verdict]}</b> <span class="goal">Touches ${esc(p.touches)} most.</span> ${esc(p.note)}`;
}

/**
 * Shneiderman's two-dimensional framework (2020, 2022) as a grid: human control
 * up the side, automation across the top. The aim is the top right, both high.
 */
function controlLabel(parts, revealed) {
  let label = "Grid with three rows, how much the people affected stay in control: high, some and low, and three columns, how much the AI does on its own: little, some and high. The aim is the top right: high human control and high automation together.";
  if (!revealed) return `${label} Empty until revealed.`;
  label += " " + parts.map((p, i) => `Feature ${i + 1} has ${p.control} human control and ${p.automation === "low" ? "little" : p.automation} automation.`).join(" ");
  const aim = parts.map((p, i) => ({ ...p, n: i + 1 })).filter((p) => p.control === "high" && p.automation === "high").map((p) => p.n);
  label += aim.length ? ` In the aim, top right: feature${aim.length > 1 ? "s" : ""} ${aim.join(" and ")}.` : " No feature reaches the top right.";
  return label;
}

export function controlGrid(parts, { revealed = false } = {}) {
  const x0 = 170, y0 = 44, cw = 150, rh = 80, w = x0 + cw * AUTOMATION.length + 8, h = y0 + rh * CONTROL.length + 8;
  const cells = [];
  AUTOMATION.forEach((a, c) => cells.push(`<text x="${x0 + c * cw + cw / 2}" y="28" class="g-col">${AUTOMATION_LABEL[a]}</text>`));
  CONTROL.forEach((ct, r) => {
    cells.push(`<text x="${x0 - 12}" y="${y0 + r * rh + rh / 2 + 5}" class="g-row">${CONTROL_LABEL[ct]}</text>`);
    AUTOMATION.forEach((a, c) => cells.push(`<rect x="${x0 + c * cw}" y="${y0 + r * rh}" width="${cw}" height="${rh}" class="g-cell${ct === "high" && a === "high" ? " g-aim" : ""}"/>`));
  });
  const placed = parts.map((p, i) => ({ ...p, n: i + 1 }));
  const marks = revealed
    ? placed
        .map((p) => {
          const row = CONTROL.indexOf(p.control), col = AUTOMATION.indexOf(p.automation);
          const peers = placed.filter((q) => q.control === p.control && q.automation === p.automation);
          const k = peers.indexOf(p);
          const cx = x0 + col * cw + cw / 2 + (k - (peers.length - 1) / 2) * 36, cy = y0 + row * rh + rh / 2;
          return `<g class="g-mark"><circle cx="${cx}" cy="${cy}" r="15"/><text x="${cx}" y="${cy + 5}">${p.n}</text></g>`;
        })
        .join("")
    : "";
  return `<svg class="grid" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(controlLabel(parts, revealed))}">${cells.join("")}${marks}</svg>`;
}

/** Drawing plus table, and in words where the kept features landed. */
export function controlView(parts, { revealed = false } = {}) {
  const placed = parts.map((p, i) => ({ ...p, n: i + 1 }));
  const rows = CONTROL.map((ct) => ({
    label: CONTROL_LABEL[ct],
    cells: AUTOMATION.map((a) => (revealed ? placed.filter((p) => p.control === ct && p.automation === a).map((p) => ({ word: "Feature", n: p.n })) : []))
  }));
  const kept = placed.filter((p) => p.verdict === "keep").map((p) => p.n);
  const note = revealed
    ? `<p class="fix-order">The features worth keeping (${kept.join(" and ")}) all leave people in control. The aim is the top right: the AI does a lot, and people can still see it, change it and stop it.</p>`
    : `<p class="fix-order">The aim is the top right: high human control and high automation together. On the drawing, that square has a dashed outline.</p>`;
  return controlGrid(parts, { revealed }) + gridTable(controlLabel(parts, revealed), "Control", AUTOMATION.map((a) => AUTOMATION_LABEL[a]), rows) + note;
}

/* ---------- contrast checker (Lesson 7): measure a colour pair against WCAG, and find the nearest pass ---------- */

export const CONTRAST_LEVELS = [
  { id: "text-aa", label: "Normal text, AA", need: 4.5 },
  { id: "large-aa", label: "Large text, AA", need: 3 },
  { id: "ui-aa", label: "Parts of the screen, AA", need: 3 },
  { id: "text-aaa", label: "Normal text, AAA", need: 7 },
  { id: "large-aaa", label: "Large text, AAA", need: 4.5 }
];

/** "#abc" or "abc" or "#aabbcc" → "#AABBCC", or null if it isn't a colour. */
export function parseHex(v) {
  const m = String(v ?? "").trim().match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return null;
  const h = m[1].length === 3 ? [...m[1]].map((c) => c + c).join("") : m[1];
  return `#${h.toUpperCase()}`;
}
const rgbOf = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const luminance = (rgb) => {
  const [r, g, b] = rgb.map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const hexOf = (rgb) => `#${rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase()}`;

/** WCAG contrast ratio of two hex colours, 1 to 21. */
export function contrastRatio(a, b) {
  const [x, y] = [luminance(rgbOf(a)), luminance(rgbOf(b))];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

/**
 * The nearest colour to `fg` that reaches `need` against `bg`: move toward black
 * or white, whichever needs the smaller change. Null if neither end can reach it.
 */
export function nearestPassing(fg, bg, need) {
  if (contrastRatio(fg, bg) >= need) return fg;
  const from = rgbOf(fg);
  let best = null;
  for (const end of [[0, 0, 0], [255, 255, 255]]) {
    if (contrastRatio(hexOf(end), bg) < need) continue;
    let lo = 0, hi = 1;
    for (let i = 0; i < 24; i++) {
      const mid = (lo + hi) / 2;
      const c = hexOf(from.map((v, k) => v + (end[k] - v) * mid));
      if (contrastRatio(c, bg) >= need) hi = mid;
      else lo = mid;
    }
    let c = hexOf(from.map((v, k) => v + (end[k] - v) * hi));
    // Rounding to whole channels can land just short; step once more toward the end if so.
    if (contrastRatio(c, bg) < need) c = hexOf(rgbOf(c).map((v, k) => v + Math.sign(end[k] - v)));
    if (!best || hi < best.t) best = { t: hi, c };
  }
  return best?.c ?? null;
}

const fmt = (r) => (Math.floor(r * 100) / 100).toFixed(2);

/** What the checker says about a pair: each level, and the sentence read aloud. */
export function checkContrast(fgIn, bgIn, use = "text") {
  const fg = parseHex(fgIn), bg = parseHex(bgIn);
  if (!fg || !bg) {
    return { valid: false, text: `Enter ${!fg ? "the first colour" : "the background"} as a hex code, like #1F2430.` };
  }
  const ratio = contrastRatio(fg, bg);
  const levels = CONTRAST_LEVELS.map((l) => ({ ...l, pass: ratio >= l.need }));
  const key = use === "ui" ? "ui-aa" : "text-aa";
  const target = levels.find((l) => l.id === key);
  const suggestion = target.pass ? null : nearestPassing(fg, bg, target.need);
  // Rounded down, so a pair can never round up into a pass.
  let text = `${fmt(ratio)} to 1. ${target.pass ? "Passes" : "Fails"} ${target.label[0].toLowerCase()}${target.label.slice(1)}.`;
  if (suggestion) text += ` The nearest colour that passes is ${suggestion}.`;
  return { valid: true, fg, bg, ratio, levels, target, suggestion, text };
}

function contrastSample(fg, bg) {
  const ok = parseHex(fg) && parseHex(bg);
  const r = ok ? checkContrast(fg, bg) : null;
  const label = ok ? `Sample: colour ${parseHex(fg)} on background ${parseHex(bg)}, ${fmt(r.ratio)} to 1.` : "Sample: not shown until both colours are valid hex codes.";
  return `<svg class="cc-sample" viewBox="0 0 320 110" role="img" aria-label="${esc(label)}">${
    ok
      ? `<rect x="1" y="1" width="318" height="108" rx="8" fill="${parseHex(bg)}" class="cc-frame"/><text x="20" y="46" fill="${parseHex(fg)}" font-size="16">Sample text, 16 pixels</text><text x="20" y="86" fill="${parseHex(fg)}" font-size="24" font-weight="700">Large text</text>`
      : `<rect x="1" y="1" width="318" height="108" rx="8" class="cc-frame cc-empty"/>`
  }</svg>`;
}

function contrastTable(r) {
  if (!r.valid) return `<p class="so-empty">No results until both colours are valid.</p>`;
  return `<table class="ref cc-results"><thead><tr><th scope="col">Use and level</th><th scope="col">Needs</th><th scope="col">Result</th></tr></thead><tbody>${r.levels
    .map((l) => `<tr><th scope="row">${l.label}</th><td>${l.need} to 1</td><td><span class="pf ${l.pass ? "pass" : "fail"}">${l.pass ? "✓ Pass" : "✕ Fail"}</span></td></tr>`)
    .join("")}</tbody></table>`;
}

function contrastChecker(pair) {
  const r = checkContrast(pair.fg, pair.bg, pair.use);
  return `<p class="cmp-label">From the screen</p>
      <p>Part ${Number(pair.part)}: ${esc(pair.what)}. It needs at least ${r.target.need} to 1, because it is ${pair.use === "ui" ? "a part of the screen people need to see" : "text"}.</p>
      <form class="cc-form" id="cc-form" novalidate data-use="${esc(pair.use)}">
        <div class="cc-pair"><label for="cc-fg">Colour (hex)<input id="cc-fg" type="text" autocomplete="off" spellcheck="false" value="${esc(pair.fg)}"></label><label for="cc-fg-pick">Pick the colour<input id="cc-fg-pick" type="color" value="${esc(pair.fg.toLowerCase())}"></label></div>
        <div class="cc-pair"><label for="cc-bg">Background (hex)<input id="cc-bg" type="text" autocomplete="off" spellcheck="false" value="${esc(pair.bg)}"></label><label for="cc-bg-pick">Pick the background<input id="cc-bg-pick" type="color" value="${esc(pair.bg.toLowerCase())}"></label></div>
      </form>
      <p class="so-status" id="cc-status" aria-live="polite">${esc(r.text)}</p>
      <div class="row-btns"><button type="button" class="btn" id="cc-use">Use the nearest passing colour</button><button type="button" class="btn" id="cc-reset">Reset to the screen's colours</button></div>
      <div class="figure" id="cc-figure">${contrastSample(pair.fg, pair.bg)}</div>
      <div id="cc-results">${contrastTable(r)}</div>`;
}

function wireContrast(doc, pair) {
  const $ = (id) => doc.querySelector(`#${id}`);
  const update = () => {
    const r = checkContrast($("cc-fg").value, $("cc-bg").value, pair.use);
    $("cc-status").textContent = r.text;
    $("cc-figure").innerHTML = contrastSample($("cc-fg").value, $("cc-bg").value);
    $("cc-results").innerHTML = contrastTable(r);
    $("cc-use").disabled = !r.suggestion;
    return r;
  };
  // Typing a valid hex moves the picker; the picker writes the hex.
  for (const [text, pick] of [["cc-fg", "cc-fg-pick"], ["cc-bg", "cc-bg-pick"]]) {
    $(text).addEventListener("input", () => {
      const h = parseHex($(text).value);
      if (h) $(pick).value = h.toLowerCase();
      update();
    });
    $(pick).addEventListener("input", () => {
      $(text).value = $(pick).value.toUpperCase();
      update();
    });
  }
  $("cc-use").addEventListener("click", () => {
    const r = checkContrast($("cc-fg").value, $("cc-bg").value, pair.use);
    if (!r.suggestion) return;
    $("cc-fg").value = r.suggestion;
    $("cc-fg-pick").value = r.suggestion.toLowerCase();
    update();
  });
  $("cc-reset").addEventListener("click", () => {
    $("cc-fg").value = pair.fg;
    $("cc-bg").value = pair.bg;
    $("cc-fg-pick").value = pair.fg.toLowerCase();
    $("cc-bg-pick").value = pair.bg.toLowerCase();
    update();
  });
  $("cc-form").addEventListener("submit", (e) => e.preventDefault());
  update();
}

/* ---------- course search (hub): lessons, objectives, stages and claims ---------- */

const STAGE_NAME = { warmup: "Warm-up", concrete: "Concrete", pictorial: "Pictorial", abstract: "Abstract", check: "Check" };
const SEARCH_LIMIT = 20;

/** Everything the search can find, each with a plain label and a link to the exact place. */
export function buildSearchIndex(track = TRACK_IDS[0]) {
  const out = [];
  const page = (n, hash = "") => `lesson.html?n=${n}&track=${track}${hash}`;
  for (const l of COURSE.lessons.filter((x) => x.ready)) {
    out.push({ kind: "Lesson", where: `Lesson ${l.n}`, title: l.title, text: l.framing, href: page(l.n) });
    for (const o of l.objectives) out.push({ kind: "Objective", where: `Lesson ${l.n} · Objective ${o.id}`, title: l.title, text: o.text, href: page(l.n, "#objectives") });
    for (const s of l.stages) out.push({ kind: "Stage", where: `Lesson ${l.n} · ${STAGE_NAME[s.kind]}`, title: s.title, text: `${STAGE_NAME[s.kind]} stage of "${l.title}".`, href: page(l.n, `#stage-${s.kind}`) });
  }
  for (const [id, c] of Object.entries(CLAIMS)) out.push({ kind: "Claim", where: `Claim · ${id}`, title: id, text: c.text, href: `#claim-${id}` });
  return out;
}

const words = (q) => [...new Set(String(q ?? "").toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [])].filter((w) => w.length >= 2);
// Forgiving match: "checker", "checking" and "checks" also find "check" (usability: people type any form of a word).
const stem = (w) => (w.length > 5 ? w.replace(/(ings?|ers?|ed|es|s)$/, "") : w.length > 3 ? w.replace(/s$/, "") : w);
const has = (hay, w) => hay.includes(w) || hay.includes(stem(w));

/** Every word must appear, in any order. Matches in the title rank first. */
export function searchCourse(query, index) {
  const ws = words(query);
  if (!ws.length) return [];
  return index
    .map((e) => {
      const title = e.title.toLowerCase(), all = `${title} ${e.text.toLowerCase()}`;
      if (!ws.every((w) => has(all, w))) return null;
      const score = ws.filter((w) => has(title, w)).length * 2 + (e.kind === "Lesson" ? 1 : 0);
      return { ...e, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);
}

/** Escape first, piece by piece, then mark the matches, so a query can never inject markup. */
export function highlight(text, query, max = 170) {
  const ws = words(query);
  let t = String(text);
  if (t.length > max && ws.length) {
    const at = Math.max(0, t.toLowerCase().indexOf(ws[0]) - 40);
    t = (at ? "…" : "") + t.slice(at, at + max).trim() + (at + max < t.length ? "…" : "");
  }
  if (!ws.length) return esc(t);
  const alts = [...new Set(ws.flatMap((w) => [w, stem(w)]))].sort((x, y) => y.length - x.length);
  const re = new RegExp(`(${alts.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "giu");
  return t.split(re).map((part, i) => (i % 2 ? `<mark>${esc(part)}</mark>` : esc(part))).join("");
}

export function searchStatus(query, results) {
  const q = String(query ?? "").trim();
  if (!q) return "Search every lesson, objective, stage and claim.";
  if (!words(q).length) return "Type at least two letters.";
  if (!results.length) return `No results for "${q}". Try fewer words, or a different spelling.`;
  const n = results.length;
  return n > SEARCH_LIMIT
    ? `${n} results for "${q}". Showing the first ${SEARCH_LIMIT}; add a word to narrow them down.`
    : `${n} result${n === 1 ? "" : "s"} for "${q}".`;
}

function searchResults(query, results) {
  return results
    .slice(0, SEARCH_LIMIT)
    // Hidden context keeps each link's name distinct from the lesson cards below, and says what it is.
    .map((r) => `<li><a href="${esc(r.href)}">${highlight(r.title, query)}<span class="sr"> (search result: ${esc(r.where)})</span></a><span class="where">${esc(r.where)}</span><p>${highlight(r.text, query)}</p></li>`)
    .join("");
}

function wireSearch(doc, track, onQuery) {
  const input = doc.querySelector("#course-search");
  const index = buildSearchIndex(track);
  const run = () => {
    const results = searchCourse(input.value, index);
    doc.querySelector("#search-status").textContent = searchStatus(input.value, results);
    doc.querySelector("#search-results").innerHTML = searchResults(input.value, results);
    onQuery?.(input.value);
  };
  input.addEventListener("input", run);
  doc.querySelector("#search-form").addEventListener("submit", (e) => e.preventDefault());
  doc.querySelector("#search-clear").addEventListener("click", () => {
    input.value = "";
    run();
    input.focus();
  });
  run();
}

/* ---------- shared pieces ---------- */

function say(lines) {
  return `<div class="say">${lines.map(([who, line]) => `<p><span class="who">${esc(who)}</span>${esc(line)}</p>`).join("")}</div>`;
}
// What the person leading the session does and says, kept apart from what learners work on.
const facil = (m, sy, w) => `<div class="facil"><h3 class="subhead">Facilitator notes</h3>${moves(m)}${say(sy)}${watch(w)}</div>`;
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

/** Every lesson that cites each claim, in lesson order. */
export function claimLessons() {
  const out = {};
  for (const l of COURSE.lessons.filter((x) => x.ready)) {
    for (const s of l.stages) {
      const ids = [...(s.principles ?? []), ...Object.values(s.tracks ?? {}).map((t) => (t.passage ?? t.pair ?? t.signoffs ?? t.classify ?? t.screen)?.claim)];
      for (const id of ids.filter(Boolean)) if (!(out[id] ??= []).includes(l.n)) out[id].push(l.n);
    }
  }
  return out;
}

/** The ledger, one collapsed group per lesson, so a reviewer can work through one lesson at a time (progressive disclosure).
 *  Each claim sits under the first lesson that uses it, and says where else it is used. */
function claimGroups(now) {
  const uses = claimLessons();
  return COURSE.lessons
    .map((l) => {
      const ids = Object.keys(CLAIMS).filter((id) => uses[id]?.[0] === l.n);
      if (!ids.length) return "";
      const c = tally(ids.map((id) => CLAIMS[id]), now);
      const counts = ["attested", "proposed", "expired", "rejected"].filter((s) => c[s]).map((s) => `${c[s]} ${STATUS_LABEL[s].toLowerCase()}`).join(", ");
      return `<details class="claim-group" data-lesson="${l.n}" id="claims-lesson-${l.n}">
        <summary><span class="lesson-no">Lesson ${l.n}</span> <span class="cg-text"><span class="cg-title">${esc(l.title)}</span> <span class="cg-count">${ids.length} claim${ids.length === 1 ? "" : "s"}: ${counts}</span></span></summary>
        <div class="claims">${ids.map((id) => claimCard(id, now, { anchor: true, also: uses[id].slice(1) })).join("")}</div>
      </details>`;
    })
    .join("");
}

/** A link to a claim opens its group first, so the card is never hidden inside a closed one. */
function openClaimGroup(doc, hash) {
  if (!/^#claim-[a-z0-9-]+$/.test(hash ?? "")) return;
  const group = doc.querySelector(hash)?.closest("details.claim-group");
  if (group) group.open = true;
}

export function renderHub(doc, { track = TRACK_IDS[0], now = new Date(), query = "", onQuery } = {}) {
  const counts = tally(Object.values(CLAIMS), now);
  const readyCount = COURSE.lessons.filter((l) => l.ready).length;

  doc.querySelector("#top").innerHTML = `
    <h1>${esc(COURSE.title)}</h1>
    <p class="sub"><b>${esc(COURSE.tagline)}</b> ${esc(COURSE.framing)}</p>
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
    <section class="search" aria-labelledby="search-h"><h2 id="search-h">Search the course</h2>
      <form role="search" id="search-form" class="search-form">
        <label for="course-search">Search lessons, objectives, stages and claims</label>
        <div class="search-row"><input id="course-search" type="search" autocomplete="off" spellcheck="false" value="${esc(query)}"><button type="button" class="btn" id="search-clear">Clear search</button></div>
      </form>
      <p class="so-status" id="search-status" aria-live="polite"></p>
      <ol class="search-results" id="search-results"></ol>
    </section>
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
      <p class="lede">Four levels, after Kirkpatrick. Each builds on the one before, from how learners react on the day to what changes for the school or team.</p>
      <ol class="eval-levels">${Object.entries(EVALUATION)
        .map(
          ([n, e]) => `<li class="lvl lvl-${n}"><h3><span class="lvl-no">Level ${n}</span> ${esc(e.name)}</h3><p class="lvl-who">${
            Number(n) < 4 ? "Built into every lesson" : "Measured by whoever adopts the course"
          }</p><p>${esc(e.how)}</p></li>`
        )
        .join("")}</ol>
    </section>

    <section><h2>What this course claims, and who has signed it</h2>
      <p class="lede">A course on checking AI output should show which of its own claims are checked. Every factual claim below was proposed by a model and stays Proposed until a named person attests it. Attested claims lapse after two years unless re-checked.</p>
      <p class="tally">${["attested", "proposed", "expired", "rejected"].map((s) => `${statusBadge(s)} ${counts[s]}`).join(" ")}</p>
      <p class="lede">Grouped by the lesson that first uses each claim. Open a lesson to review its claims.</p>
      <div class="claim-groups">${claimGroups(now)}</div>
    </section>`;

  wireSearch(doc, track, onQuery);
  doc.querySelector("#search-results").addEventListener("click", (e) => openClaimGroup(doc, e.target.closest("a")?.getAttribute("href")));
  openClaimGroup(doc, doc.defaultView?.location.hash);
}

/* ---------- lesson ---------- */

export function renderLesson(doc, lesson, { track = TRACK_IDS[0], now = new Date() } = {}) {
  const top = doc.querySelector("#top");
  const content = doc.querySelector("#content");
  const side = doc.querySelector("#side");
  const header = top.closest(".top");

  if (!lesson || !lesson.ready) {
    delete header.dataset.lesson;
    doc.title = `Lesson not available — ${COURSE.title}`;
    top.innerHTML = `<h1>Lesson not available</h1>`;
    content.innerHTML = `<p>${lesson ? `Lesson ${lesson.n} is still in design.` : "There is no lesson with that number."} <a href="index.html">Back to the course overview</a>.</p>`;
    side.innerHTML = "";
    return;
  }

  const [concrete, pictorial, abstract] = lesson.stages;
  const art = concrete.tracks[track];
  const exercise = concrete.exercise ?? "passage";
  const isPair = exercise === "prompt-pair";
  const isSignoff = exercise === "sign-offs";
  const isClassify = exercise === "classify";
  const isScreen = exercise === "screen";
  const isAudit = exercise === "audit";
  const isJudge = exercise === "judge";
  const artefact = { passage: art.passage, "prompt-pair": art.pair, "sign-offs": art.signoffs, classify: art.classify, screen: art.screen, audit: art.screen, judge: art.screen }[exercise];

  header.dataset.lesson = lesson.n;
  // Each lesson's tab says which lesson it is (WCAG 2.4.2, Page Titled).
  doc.title = `Lesson ${lesson.n}: ${lesson.title} — ${COURSE.title}`;
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

  const provenanceNote =
    artefact.provenance === "planted"
      ? isJudge
        ? `Written by ${esc(artefact.model)} for this lesson. The product, its features and its company are made up.`
        : isScreen || isAudit
        ? `Written by ${esc(artefact.model)} for this lesson, as if an AI had built it. The screen is made up, with problems planted on purpose.`
        : isClassify
        ? `Written by ${esc(artefact.model)} for this lesson. The request and the answer are made up, with mistakes planted on purpose.`
        : isSignoff
        ? `Written by ${esc(artefact.model)} for this lesson. The document, the people and their sign-offs are made up, with problems planted on purpose.`
        : `Written by ${esc(artefact.model)} for this lesson, with ${isPair ? "gaps and guesses" : "errors"} planted on purpose.`
      : `Captured from ${esc(artefact.model)} on ${esc(artefact.captured)}.`;
  const concreteBody = isPair
    ? pairExercise(artefact, provenanceNote)
    : isSignoff
      ? signoffExercise(artefact, provenanceNote, now)
      : isScreen
        ? screenExercise(artefact, provenanceNote)
        : isAudit
        ? screenExercise(artefact, provenanceNote, auditReveal, "For each numbered part: an accessibility failure, an addictive pattern, or it works")
        : isJudge
        ? screenExercise(artefact, provenanceNote, judgeReveal, "For each numbered feature: keep, change or stop, and what it touches most")
        : isClassify
        ? classifyExercise(artefact, null, provenanceNote)
        : passageExercise(artefact, provenanceNote);
  const scale = pictorial.figure === "check-scale";
  const pictorialBody = isPair
    ? `<div class="figure" id="compare">${promptCompare(artefact)}</div>`
    : isSignoff
      ? signoffBuilder(artefact.items, now)
      : isAudit
        ? contrastChecker(artefact.contrast)
        : isJudge
        ? `<div class="figure" id="grid">${controlView(artefact.parts)}</div>
      <button type="button" class="btn" id="reveal-grid">Show the finished grid</button>`
        : isScreen
        ? `<div class="figure" id="grid">${fixFirstView(artefact.parts)}</div>
      <button type="button" class="btn" id="reveal-grid">Show the finished grid</button>`
        : isClassify
        ? checklistBuilder(pictorial, artefact.items)
    : scale
      ? scaleFigure(artefact.uses)
      : `<div class="figure" id="grid">${confidenceView(artefact.sentences)}</div>
      <button type="button" class="btn" id="reveal-grid">Show the finished grid</button>`;

  content.innerHTML = `
    <div class="obj" id="objectives"><p><b>By the end, learners can:</b></p><ul>${lesson.objectives
      .map((o) => `<li><span class="oid">${esc(o.id)}</span> ${esc(o.text)} <span class="bloom">${esc(o.bloom)}</span></li>`)
      .join("")}</ul><p class="legend">Boxes marked <b>Facilitator</b> are for whoever leads the session. Everything else is for learners.</p></div>

    <section class="block why"><h2>Why this matters</h2>
      <p class="relevance">${esc(lesson.arcs.relevance[track])}</p>
      <div class="facil"><h3 class="subhead">Facilitator notes</h3>
        <p><b>Open with:</b> ${esc(lesson.arcs.attention)}</p>
        <p><b>Confidence:</b> ${esc(lesson.arcs.confidence)}</p></div>
    </section>

    <section class="block w" data-stage="warmup" id="stage-warmup"><h2>Warm-up · Pre-check <span class="mins">${lesson.warmup.minutes} min</span></h2>
      <p class="sense">Record answers — they are the "before" for the post-check.</p>
      <ol class="probs">${lesson.warmup.items
        .map((i) => `<li>${esc(i.prompt)} ${targets(i.targets)}<div class="expect"><b>Facilitator · Expect</b>${esc(i.expected)}</div></li>`)
        .join("")}</ol>
    </section>

    <section class="block c" data-stage="concrete" id="stage-concrete"><h2>Concrete · ${esc(concrete.title)} <span class="mins">${concrete.minutes} min</span></h2>
      <p class="stage-meta">${targets(concrete.targets)}</p>
      <p class="context">${esc(art.context)}</p>
      ${concreteBody}
      ${facil(concrete.moves, concrete.say, concrete.watch)}
      <div class="keyclaim"><h3 class="subhead">Is this answer key right?</h3>${claimCard(artefact.claim, now)}</div>
    </section>

    <section class="block p" data-stage="pictorial" id="stage-pictorial"><h2>Pictorial · ${esc(pictorial.title)} <span class="mins">${pictorial.minutes} min</span></h2>
      <p class="stage-meta">${targets(pictorial.targets)}</p>
      ${pictorialBody}
      ${facil(pictorial.moves, pictorial.say, pictorial.watch)}
    </section>

    <section class="block a" data-stage="abstract" id="stage-abstract"><h2>Abstract · ${esc(abstract.title)} <span class="mins">${abstract.minutes} min</span></h2>
      <p class="stage-meta">${targets(abstract.targets)}</p>
      ${refTables(abstract.tables)}
      <div class="claims">${abstract.principles.map((id) => claimCard(id, now)).join("")}</div>
      ${facil(abstract.moves, abstract.say, abstract.watch)}
    </section>

    <section class="block w" data-stage="check" id="stage-check"><h2>Check · Post-check <span class="mins">${lesson.check.minutes} min</span></h2>
      <p class="sense">Compare with the warm-up answers, objective by objective.</p>
      <ol class="probs">${lesson.check.items
        .map((i) => `<li>${esc(i.prompt)} ${targets(i.targets)}<div class="crit"><b>Facilitator · Reteach if</b>${esc(i.crit)}</div></li>`)
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

  if (isPair) wireCompare(doc, artefact);
  else if (isSignoff) wireSignoff(doc, now);
  else if (isClassify) wireChecklist(doc, pictorial, artefact.items);
  else if (isScreen) wireGrid(doc, (revealed) => fixFirstView(artefact.parts, { revealed }));
  else if (isAudit) wireContrast(doc, artefact.contrast);
  else if (isJudge) wireGrid(doc, (revealed) => controlView(artefact.parts, { revealed }));
  else if (scale) wireGrid(doc, (revealed) => checkScaleView(artefact.uses, { revealed }));
  else wireGrid(doc, (revealed) => confidenceView(artefact.sentences, { revealed }));
}

function passageExercise(passage, provenanceNote) {
  return `<figure class="passage">
        <ol>${passage.sentences
          .map(
            (s, i) => `<li><p>${esc(s.text)}</p><details class="key"><summary>Reveal<span class="sr"> the answer for sentence ${i + 1}</span></summary><p><b class="k k-${s.key}">${KEY_LABEL[s.key]}</b> ${esc(s.note)}</p>${
              s.source ? `<p class="src">Source card: ${esc(s.source)}</p>` : ""
            }</details></li>`
          )
          .join("")}</ol>
        <figcaption>${provenanceNote}</figcaption>
      </figure>`;
}

function pairExercise(pair, provenanceNote) {
  return `<figure class="passage pair">
        <p class="cmp-label">The request</p>
        <p class="req">“${esc(pair.vague.prompt)}”</p>
        <p class="cmp-label">What came back</p>
        <ol>${pair.vague.output.map((l) => `<li><p>${esc(l.text)}</p></li>`).join("")}</ol>
        <figcaption>${provenanceNote}</figcaption>
      </figure>
      <h3 class="subhead">Mark each part: stated, vague or missing</h3>
      <ol class="gaps">${PARTS.map((p) => {
        const g = pair.vague.gaps[p.id];
        return `<li><p><b>${p.label}.</b> ${p.ask}</p><details class="key"><summary>Reveal<span class="sr"> the answer for ${p.label}</span></summary><p><b class="k k-${g.key}">${GAP_LABEL[g.key]}</b> ${esc(g.note)}</p></details></li>`;
      }).join("")}</ol>`;
}

// Show and hide, so a facilitator can run the activity again without reloading (user control).
export const GRID_SHOW = "Show the finished grid";
export const GRID_HIDE = "Hide the finished grid";
function wireGrid(doc, draw) {
  const btn = doc.querySelector("#reveal-grid");
  let shown = false;
  btn.addEventListener("click", () => {
    const grid = doc.querySelector("#grid");
    shown = !shown;
    grid.innerHTML = draw(shown);
    btn.textContent = shown ? GRID_HIDE : GRID_SHOW;
    // On show, hand focus to the grid so its new description is read; on hide, stay on the button.
    if (shown) {
      grid.tabIndex = -1;
      grid.focus();
    }
  });
}

// One part at a time: pressing a part marks the lines it caused; pressing it again clears.
function wireCompare(doc, pair) {
  const buttons = [...doc.querySelectorAll(".cmp-btn")];
  for (const b of buttons) {
    b.addEventListener("click", () => {
      const active = b.getAttribute("aria-pressed") === "true" ? null : b.dataset.part;
      for (const o of buttons) o.setAttribute("aria-pressed", String(o.dataset.part === active));
      doc.querySelector("#cmp-structured").outerHTML = structuredOutput(pair, active);
      doc.querySelector("#cmp-status").textContent = compareStatus(pair, active);
    });
  }
}

function alignmentTable(lesson) {
  const rows = [
    ["Warm-up (pre)", lesson.warmup.items.flatMap((i) => i.targets)],
    ...lesson.stages.map((s) => [s.kind[0].toUpperCase() + s.kind.slice(1), s.targets]),
    ["Check (post)", lesson.check.items.flatMap((i) => i.targets)]
  ];
  return `<table class="align"><thead><tr><th scope="col">Stage</th>${lesson.objectives
    .map((o) => `<th scope="col"><span class="sr">Objective </span>${esc(o.id)}</th>`)
    .join("")}</tr></thead><tbody>${rows
    .map(
      ([name, t]) =>
        `<tr><th scope="row">${name}</th>${lesson.objectives
          .map((o) => (t.includes(o.id) ? `<td>✓<span class="sr"> taught or checked</span></td>` : `<td><span class="sr">not here</span></td>`))
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

  // The hub re-renders on a track change; keep what the learner typed in the search box (user control).
  let query = "";
  const draw = () => {
    if (page === "hub") renderHub(doc, { track, query, onQuery: (q) => (query = q) });
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
    // The whole page re-rendered around the radio. Say so, for anyone who can't see it (context; WCAG 4.1.3).
    const announce = doc.querySelector("#announce");
    if (announce) announce.textContent = `Now showing the ${TRACKS[track].label} track.`;
  });

  win.addEventListener("hashchange", () => openClaimGroup(doc, win.location.hash));
  draw();
  if (page === "hub" && win.location.hash) doc.getElementById(win.location.hash.slice(1))?.scrollIntoView();
  doc.body.dataset.ready = "true";
}
