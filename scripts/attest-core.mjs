// The attestation desk's rules, as plain functions so the tests can hold them (tests/attest.test.js).
// The desk (scripts/attest.mjs) is the only thing that writes attestations.js, and David runs it himself.

export const TTL_CHOICES = [365, 730, 1095];
export const MIN_BASIS = 30;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const clean = (s) => String(s ?? "").replace(/\s+/g, " ").trim();

function readDate(value, today, what) {
  const d = clean(value) || today;
  if (!DATE.test(d) || Number.isNaN(new Date(`${d}T00:00:00Z`).getTime()) || new Date(`${d}T00:00:00Z`).toISOString().slice(0, 10) !== d) {
    throw new Error(`The ${what} date must be a real date, written YYYY-MM-DD.`);
  }
  if (d > today) throw new Error(`The ${what} date can't be in the future.`);
  return d;
}

/** What a new sign-off replaces, so the record reads like a review log (attestation guide, examples 1 and 4). */
export function supersedesOf(current) {
  if (!current) return null;
  const out = current.source === "practitioner"
    ? { source: "practitioner", by: current.by, verified: current.verified }
    : { source: "model", model: current.model ?? null };
  if (current.rejection) out.rejection = current.rejection;
  return out;
}

/**
 * Build an attestation from the desk's form. Refuses anything the guide calls a weak sign-off:
 * no name, no real basis, the model's own reasoning pasted back as the basis, or no confirmation
 * that the sources were opened and checked.
 */
export function makeAttestation(claim, current, form, today, proposal = current?.rationale) {
  const own = inCourse(proposal);
  if (form.checked !== true) throw new Error(own ? "Tick \"I checked this against the page myself\" first." : "Tick \"I opened the sources and checked this myself\" first.");
  const by = clean(form.by);
  if (!by) throw new Error("Add your name. Anonymous sign-off is not sign-off.");
  // A claim judged from the course itself needs no source (David, 2026-10-24): the basis is optional, and a
  // blank one says so in words.
  const basis = clean(form.basis) || (own ? IN_COURSE_BASIS : "");
  if (!own && basis.length < MIN_BASIS) {
    throw new Error(`Write the basis in full: the source, where in it, and what you did (at least ${MIN_BASIS} characters).`);
  }
  // The model's argument can't be pasted back as the basis, but its "Check:" line can be quoted: it names the
  // sources and places to look, which is what a basis names (David hit this on 2026-10-23, copying from the
  // desk's "What to check" box).
  const rationale = clean(proposal);
  const check = CHECK_LINE.test(proposal ?? "") ? clean(checkLine(proposal)) : "";
  const argument = rationale.replace(check, " ").trim();
  const quotesCheck = check && check.includes(basis.replace(/^Check:\s*/i, ""));
  const echoes = [claim?.text, argument].map(clean).filter(Boolean);
  if (!quotesCheck && echoes.some((e) => e === basis || (basis.length > 60 && e.includes(basis)))) {
    throw new Error("The basis copies the claim or the model's argument for it. Say what you checked: the source, where in it, and what you did.");
  }
  const ttlDays = Number(form.ttlDays);
  if (!TTL_CHOICES.includes(ttlDays)) throw new Error("Choose a review cycle of 1, 2 or 3 years.");
  return {
    source: "practitioner",
    by,
    role: clean(form.role) || null,
    basis,
    verified: readDate(form.verified, today, "checked"),
    ttlDays,
    supersedes: supersedesOf(current)
  };
}

/** Build a rejection. The proposal stays on the record; the page strikes it through with the reason. */
export function makeRejection(form, today) {
  const by = clean(form.by);
  if (!by) throw new Error("Add your name. An anonymous veto is not a finding.");
  const reason = clean(form.reason);
  if (reason.length < 15) throw new Error("Say why it's wrong, so a replacement can be proposed (at least 15 characters).");
  return { rejection: { by, role: clean(form.role) || null, reason, reviewed: readDate(form.reviewed, today, "review") } };
}

/** A claim whose check is the course itself: its reasoning says no outside source is needed. */
export const inCourse = (rationale = "") => /nothing outside the course|no outside source is needed/i.test(rationale ?? "");
export const IN_COURSE_BASIS = "Checked against the course itself, as the claim's check says: no outside source is needed.";

// Words that start a "Check:" line or a change note, not names of sources.
const NOT_SOURCES = new Set("Check Sources Lesson Lessons Each Both None Nothing Basis Rewritten Revised Written The This That Attest Course Page Where Open Read".split(" "));
const IN_COURSE = /course|page|screen|definition|judg|shown|sign-off|ledger|standard|ux-foundations/i;

/** The part of a claim's reasoning that says where to check: its "Check:" lines, or all of it if it has none. */
// A real check line: "Check:" or "Check, both on the Sources page …:". The word "check" in a sentence
// ("Check the manual itself if you have access.") is not one (David, 2026-10-25: trait-not-diagnosis).
export const CHECK_LINE = /\bCheck(?:,[^:.]{0,80})?:/;

export function checkLine(rationale = "") {
  const at = rationale.search(CHECK_LINE);
  return (at === -1 ? rationale : rationale.slice(at)).split(/(?<=\.) (?=(?:Basis |Rewritten |Revised |Written with ))/)[0];
}

/**
 * Whether a sign-off's basis mentions what its claim's "Check:" line points to (David, 2026-10-23: he couldn't
 * find the weak ones to re-sign). A hint for a second look, never a block: the basis must name one of the
 * check's sources (an author, an organisation, a year, a site), or, where the check is "nothing outside the
 * course", say it was judged from the course itself. Returns null when it matches, or the reason when not.
 */
export function basisHint(rationale, basis) {
  if (!basis || !rationale) return null;
  const check = checkLine(rationale);
  const names = (check.match(/\b[A-Z][A-Za-z&'.-]{2,}\b|\b(?:19|20)\d\d\b|[a-z0-9.-]+\.(?:gov|org|com|uk|eu|edu|int)\b/g) ?? []).map((w) => w.replace(/['’]s$/, "")).filter((w) => !NOT_SOURCES.has(w));
  const b = basis.toLowerCase();
  if (names.some((w) => b.includes(w.toLowerCase()))) return null;
  if (inCourse(rationale) && IN_COURSE.test(basis)) return null;
  return inCourse(rationale)
    ? "The check is the course itself (a definition, a judgement, or the page), and your basis doesn't say so."
    : "Your basis doesn't mention the source the check points to.";
}

/** The whole of attestations.js, in claims.js order so each sign-off's diff is easy to read in git. */
export function serialize(entries, order) {
  const ids = Object.keys(entries).sort((a, b) => order.indexOf(a) - order.indexOf(b));
  const body = ids.length ? `{\n${ids.map((id) => `  ${JSON.stringify(id)}: ${JSON.stringify(entries[id], null, 2).replace(/\n/g, "\n  ")}`).join(",\n")}\n}` : "{}";
  return `/**
 * Sign-offs made with the attestation desk (\`npm run attest\`). Written only by the desk, which
 * David runs himself; never by hand, never by a Claude session (the project's guard refuses it).
 * claims.js holds the model's proposals; each entry here replaces its claim's attestation block
 * when the site loads, so attesting never means editing code. See docs/attestation-guide.md.
 */
export const ATTESTATIONS = ${body};
`;
}

/**
 * Only this desk's own page may change anything: the request must come to the loopback address
 * it listens on (no DNS rebinding), from its own origin (no other website posting to localhost),
 * with the token printed into its page (no forged form posts).
 */
export function allowed({ host, origin, token }, { port, secret }) {
  const self = [`127.0.0.1:${port}`, `localhost:${port}`];
  if (!self.includes(host ?? "")) return false;
  if (origin && !self.some((h) => origin === `http://${h}`)) return false;
  return typeof token === "string" && token.length > 0 && token === secret;
}
