// The attestation desk's page (served only by scripts/attest.mjs, on this computer).
// One claim at a time: read it, open its sources, then sign it off or reject it.

const token = document.querySelector('meta[name="desk-token"]').content;
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Links in the model's reasoning and the source list open in a new tab, so the desk stays where it was.
const link = (href, label) => `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(label)}<span class="sr"> (opens in a new tab)</span></a>`;
function linkify(text) {
  return esc(text).replace(/https?:\/\/[^\s<)"']+[^\s<)"'.,;:]|\b10\.\d{4,9}\/[^\s<)"']+[^\s<)"'.,;:]/g, (m) => {
    const raw = m.replace(/&amp;/g, "&");
    return link(raw.startsWith("10.") ? `https://doi.org/${raw}` : raw, raw);
  });
}

const TTL_LABEL = { 365: "1 year: law, policy or fast-changing tools", 730: "2 years: standards and most claims (the usual choice)", 1095: "3 years: settled research or definitions" };
const NEEDS = new Set(["proposed", "expired"]);
// Needs you: still proposed, lapsed, or signed with a basis that doesn't mention what the check points to.
const needsYou = (c) => NEEDS.has(c.status) || Boolean(c.hint);
let data = null;
const remembered = (() => {
  try { return JSON.parse(localStorage.getItem("desk-signer") ?? "null"); } catch { return null; }
})();

async function load() {
  const res = await fetch("/api/claims");
  data = await res.json();
  const sel = $("#f-lesson");
  sel.innerHTML = `<option value="all">All lessons</option>${data.lessons.map((l) => `<option value="${l.n}"></option>`).join("")}`;
  // One lesson at a time (the attestation guide's routine): open on the first lesson that still needs you.
  sel.value = String(data.lessons.find((l) => need(l))?.n ?? "all");
  render();
}

function counts() {
  const c = { attested: 0, proposed: 0, expired: 0, rejected: 0 };
  for (const x of data.claims) c[x.status]++;
  $("#counts").innerHTML = `<span><b>${c.attested}</b> of ${data.claims.length} attested</span> <span><b>${c.proposed}</b> proposed</span> <span><b>${c.expired}</b> lapsed</span> <span><b>${c.rejected}</b> rejected</span>`;
  return c;
}

const byId = (id) => data.claims.find((c) => c.id === id);
const shown = (c) => {
  const f = $("#f-status").value;
  return f === "all" || (f === "needs" ? needsYou(c) : c.status === f);
};

function card(c) {
  const also = c.lessons.length > 1 ? `<span class="dc-also">Also used in ${c.lessons.slice(1).map((n) => esc(data.lessons.find((l) => l.n === n)?.label ?? `Lesson ${n}`)).join(", ")}</span>` : "";
  const signed = c.attestation
    ? `<dl class="dc-record"><dt>Signed by</dt><dd>${esc(c.attestation.by)}${c.attestation.role ? `, ${esc(c.attestation.role)}` : ""}</dd><dt>Basis</dt><dd>${linkify(c.attestation.basis)}</dd><dt>Checked</dt><dd>${esc(c.attestation.verified)}, review every ${c.attestation.ttlDays / 365} year${c.attestation.ttlDays === 365 ? "" : "s"}</dd></dl>`
    : "";
  const rejected = c.rejection
    ? `<dl class="dc-record"><dt>Rejected by</dt><dd>${esc(c.rejection.by)}</dd><dt>Reason</dt><dd>${esc(c.rejection.reason)}</dd><dt>Reviewed</dt><dd>${esc(c.rejection.reviewed)}</dd></dl>`
    : "";
  const why = c.rationale
    ? `<details class="dc-why"${needsYou(c) ? " open" : ""}><summary>Why ${esc(c.model ?? "the model")} proposed it, with its sources</summary><p>${linkify(c.rationale)}</p></details>`
    : "";
  const lapsed = c.status === "expired" ? `<p class="dc-note">This sign-off has passed its review date. Check the sources again, then sign it off again.</p>` : "";
  const review = c.hint ? `<p class="dc-note dc-review"><b>Worth a second look.</b> ${esc(c.hint)} If it's right as it is, leave it. Otherwise press Sign off again and name what you checked.</p>` : "";
  const actions = `<div class="dc-actions">
      ${c.status === "rejected" ? "" : `<button type="button" class="btn" data-open="attest" aria-expanded="false">${c.status === "attested" ? "Sign off again" : "Sign off"}<span class="sr">: ${esc(c.id)}</span></button>`}
      ${c.status === "rejected" ? "" : `<button type="button" class="btn quiet" data-open="reject" aria-expanded="false">Reject<span class="sr">: ${esc(c.id)}</span></button>`}
      ${c.fromDesk ? `<button type="button" class="btn quiet" data-undo>Undo my last decision<span class="sr"> on ${esc(c.id)}</span></button>` : ""}
    </div>`;
  return `<article class="dc" id="c-${esc(c.id)}" data-id="${esc(c.id)}" data-status="${c.status}" tabindex="-1" aria-labelledby="t-${esc(c.id)}">
    <p class="dc-top">${c.badge}<code class="dc-id">${esc(c.id)}</code>${also}</p>
    <h3 class="dc-text" id="t-${esc(c.id)}">${esc(c.text)}</h3>
    ${lapsed}${review}${signed}${rejected}${why}${actions}
    <div class="dc-form" hidden></div>
  </article>`;
}

const need = (l) => l.ids.filter((id) => needsYou(byId(id))).length;

function render(focusId = null) {
  counts();
  for (const o of $("#f-lesson").options) {
    const l = data.lessons.find((x) => String(x.n) === o.value);
    if (l) o.textContent = `${l.label}: ${l.title} (${need(l) ? `${need(l)} need${need(l) === 1 ? "s" : ""} you` : "done"})`;
  }
  const lf = $("#f-lesson").value;
  const groups = data.lessons.filter((l) => lf === "all" || String(l.n) === lf);
  const html = groups
    .map((l) => {
      const cs = l.ids.map(byId).filter(shown);
      if (!cs.length) return "";
      const src = l.sources.length
        ? `<details class="dc-sources"><summary>Sources cited in ${esc(l.label)} (${l.sources.length})</summary><ul>${l.sources.map((s) => `<li>${esc(s.apa.replace(/\*/g, ""))}${s.url ? ` ${link(s.url, s.url)}` : ""}</li>`).join("")}</ul></details>`
        : "";
      return `<section class="dc-group" aria-labelledby="g-${l.n}"><h2 id="g-${l.n}">${esc(l.label)}: ${esc(l.title)}</h2>${src}${cs.map(card).join("")}</section>`;
    })
    .join("");
  const lesson = data.lessons.find((l) => String(l.n) === lf);
  $("#list").innerHTML = html || `<p class="dc-done" tabindex="-1">${lesson ? `${esc(lesson.label)} is done: nothing in it needs you. Choose another lesson above.` : `Nothing here needs you right now. Choose "Every claim" to see the rest.`}</p>`;
  if (focusId !== null) (document.getElementById(`c-${focusId}`) ?? $("#list .dc-done") ?? $("#list .dc"))?.focus();
}

function signerFields(prefix) {
  const s = remembered ?? data.signer;
  return `<div class="dc-pair">
      <p><label for="${prefix}-by">Your name</label><input id="${prefix}-by" name="by" autocomplete="name" value="${esc(s.by)}" required></p>
      <p><label for="${prefix}-role">Your role</label><input id="${prefix}-role" name="role" autocomplete="organization-title" value="${esc(s.role)}"></p>
    </div>`;
}

function attestForm(c) {
  const p = `a-${c.id}`;
  return `<form class="dc-f" data-kind="attest" novalidate>
    <p class="dc-f-head">Sign off: say what you checked</p>
    ${c.check ? `<div class="dc-what"><p class="dc-what-head">What to check</p><p>${linkify(c.check)}</p></div>` : ""}
    <p><label for="${p}-basis">Basis</label>
      <span class="hint" id="${p}-basis-hint">The source, where in it, and what you did. For example: "Checked against WCAG 2.2 (W3C, 2023), 1.4.3 and 1.4.11."</span>
      <textarea id="${p}-basis" name="basis" rows="4" aria-describedby="${p}-basis-hint" required></textarea></p>
    <fieldset><legend>Review it again in</legend>${data.ttl.map((t) => `<label class="dc-radio"><input type="radio" name="ttlDays" value="${t}"${t === 730 ? " checked" : ""}> ${TTL_LABEL[t]}</label>`).join("")}</fieldset>
    <p><label for="${p}-date">Date you checked it</label><input id="${p}-date" name="verified" type="date" value="${data.today}" max="${data.today}" required></p>
    ${signerFields(p)}
    <p class="dc-check"><label><input type="checkbox" name="checked" required> I opened the sources and checked this myself.</label></p>
    <p class="dc-error" role="alert"></p>
    <div class="dc-actions"><button type="submit" class="btn">Sign off this claim</button><button type="button" class="btn quiet" data-cancel>Cancel</button></div>
  </form>`;
}

function rejectForm(c) {
  const p = `r-${c.id}`;
  return `<form class="dc-f" data-kind="reject" novalidate>
    <p class="dc-f-head">Reject: say what's wrong</p>
    <p><label for="${p}-reason">Reason</label>
      <span class="hint" id="${p}-reason-hint">What's wrong, and what the right wording would rest on. The claim stays on record, struck through, with your reason.</span>
      <textarea id="${p}-reason" name="reason" rows="3" aria-describedby="${p}-reason-hint" required></textarea></p>
    ${signerFields(p)}
    <p class="dc-error" role="alert"></p>
    <div class="dc-actions"><button type="submit" class="btn">Reject this claim</button><button type="button" class="btn quiet" data-cancel>Cancel</button></div>
  </form>`;
}

function closeForm(article) {
  const box = $(".dc-form", article);
  box.hidden = true;
  box.innerHTML = "";
  for (const b of article.querySelectorAll("[data-open]")) b.setAttribute("aria-expanded", "false");
}

function openForm(article, kind, button) {
  const c = byId(article.dataset.id);
  const wasOpen = button.getAttribute("aria-expanded") === "true";
  closeForm(article);
  if (wasOpen) return button.focus();
  const box = $(".dc-form", article);
  box.innerHTML = kind === "attest" ? attestForm(c) : rejectForm(c);
  box.hidden = false;
  button.setAttribute("aria-expanded", "true");
  $("textarea", box).focus();
}

async function post(path, payload) {
  const res = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json", "X-Desk-Token": token }, body: JSON.stringify(payload) });
  const out = await res.json();
  if (!res.ok) throw new Error(out.error ?? "Something went wrong. Nothing was saved.");
  return out.claim;
}

// After a decision, focus goes to the next claim that still needs you, so you can keep going.
// Only claims in the lesson on screen count, so focus never jumps somewhere hidden.
function nextId(id) {
  const lf = $("#f-lesson").value;
  const order = data.lessons.filter((l) => lf === "all" || String(l.n) === lf).flatMap((l) => l.ids);
  const at = order.indexOf(id);
  const after = order.slice(at + 1).concat(order.slice(0, Math.max(at, 0)));
  return after.find((x) => needsYou(byId(x)) && shown(byId(x))) ?? (shown(byId(id)) ? id : null);
}

function update(claim) {
  data.claims[data.claims.findIndex((c) => c.id === claim.id)] = claim;
}

document.addEventListener("click", async (e) => {
  const article = e.target.closest(".dc");
  if (!article) return;
  const open = e.target.closest("[data-open]");
  if (open) return openForm(article, open.dataset.open, open);
  if (e.target.closest("[data-cancel]")) {
    const kind = $("form", article)?.dataset.kind;
    closeForm(article);
    return $(`[data-open="${kind}"]`, article)?.focus();
  }
  if (e.target.closest("[data-undo]")) {
    try {
      const claim = await post("/api/undo", { id: article.dataset.id });
      update(claim);
      render(claim.id);
      $("#announce").textContent = `Undone. ${claim.id} is ${claim.status === "expired" ? "lapsed" : claim.status} again.`;
    } catch (err) {
      $("#announce").textContent = err.message;
    }
  }
});

document.addEventListener("submit", async (e) => {
  const form = e.target.closest("form.dc-f");
  if (!form) return;
  e.preventDefault();
  const article = form.closest(".dc");
  const id = article.dataset.id;
  const f = new FormData(form);
  const payload = { id, ...Object.fromEntries(f), checked: f.get("checked") === "on" };
  const err = $(".dc-error", form);
  try {
    const claim = await post(form.dataset.kind === "attest" ? "/api/attest" : "/api/reject", payload);
    try { localStorage.setItem("desk-signer", JSON.stringify({ by: payload.by, role: payload.role })); } catch {}
    update(claim);
    const next = nextId(id);
    render(next ?? "");
    const c = counts();
    $("#announce").textContent = `${form.dataset.kind === "attest" ? "Signed off" : "Rejected"}: ${id}. ${c.attested} of ${data.claims.length} attested. ${next && next !== id ? `Next: ${next}.` : ""}`;
  } catch (ex) {
    err.textContent = ex.message;
    const bad = /basis|reason/i.test(ex.message) ? $("textarea", form) : /tick/i.test(ex.message) ? $('[name="checked"]', form) : /name/i.test(ex.message) ? $('[name="by"]', form) : /date/i.test(ex.message) ? $('[type="date"]', form) : null;
    (bad ?? err).focus?.();
  }
});

for (const id of ["#f-status", "#f-lesson"]) $(id).addEventListener("change", () => render());
load();
