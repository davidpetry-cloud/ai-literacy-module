/**
 * The attestation desk (David, 2026-10-21): `npm run attest`. A model proposes, only David attests;
 * the desk makes attesting a form instead of a code edit, and these tests hold its rules.
 * Server tests run against a scratch copy, never the real attestations.js, and sign as an obvious fixture.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { request } from "node:http";
import { pathToFileURL } from "node:url";
import { resolveStatus, STATUS } from "attestation-ledger";
import { CLAIMS, BASE, mergeAttestation } from "../claims.js";
import { ATTESTATIONS } from "../attestations.js";
import { makeAttestation, makeRejection, serialize, allowed, supersedesOf, TTL_CHOICES } from "../scripts/attest-core.mjs";
import { createDesk } from "../scripts/attest.mjs";

const TODAY = "2026-10-21";
const ORDER = Object.keys(CLAIMS);
const modelId = ORDER.find((id) => BASE[id].source === "model");
const FIXTURE = { by: "Test Signer (fixture)", role: "Test", basis: "Fixture basis: checked against a made-up source, section 1, for the tests only.", ttlDays: 730, verified: TODAY, checked: true };

describe("merging the desk's sign-offs into the claims", () => {
  const proposal = { source: "model", model: "claude-opus-5-5", rationale: "r", by: null, verified: null };
  it("replaces a proposal with an attestation", () => {
    const a = { source: "practitioner", by: "X", basis: "b", verified: TODAY };
    expect(mergeAttestation(proposal, a)).toBe(a);
  });
  it("adds a rejection to the proposal, so the proposal stays on the record", () => {
    const m = mergeAttestation(proposal, { rejection: { by: "X", reason: "wrong", reviewed: TODAY } });
    expect(m.rationale).toBe("r");
    expect(resolveStatus({ attestation: m })).toBe(STATUS.REJECTED);
  });
  it("leaves a claim with no sign-off as it is", () => expect(mergeAttestation(proposal, undefined)).toBe(proposal));
});

describe("the desk refuses a weak sign-off", () => {
  const claim = CLAIMS[modelId];
  const current = BASE[modelId];
  const bad = (change, msg) => expect(() => makeAttestation(claim, current, { ...FIXTURE, ...change }, TODAY)).toThrow(msg);
  it("without the 'I checked the sources myself' tick", () => bad({ checked: false }, /Tick/));
  it("without a name", () => bad({ by: "  " }, /name/));
  it("with a basis too short to say source, place and check", () => bad({ basis: "Looks right." }, /basis in full/));
  // An old-style proposal argues its case with no "Check:" line; pasting that argument back is not a check.
  const argument = "Follows from model-predicts: the model writes likely text, and a specific-sounding detail is often more likely than a blank.";
  const oldStyle = { source: "model", model: "claude-opus-5-5", rationale: argument };
  const withCheck = { source: "model", model: "claude-opus-5-5", rationale: "Check: Walters & Wilder (2023), Scientific Reports 13, 14045, abstract. Rewritten 2026-10-23: it cited nothing." };
  it("with the model's argument pasted back as the basis", () => {
    expect(() => makeAttestation(claim, oldStyle, { ...FIXTURE, basis: argument }, TODAY)).toThrow(/argument/);
  });
  it("with the claim's own text as the basis", () => bad({ basis: claim.text }, /copies the claim/));
  it("but lets the basis quote the claim's Check line, which names where to look", () => {
    expect(makeAttestation(claim, withCheck, { ...FIXTURE, basis: "Check: Walters & Wilder (2023), Scientific Reports 13, 14045, abstract." }, TODAY).basis).toMatch(/Walters/);
  });
  it("and judges a re-sign against the original proposal, not the earlier sign-off", () => {
    const signed = { source: "practitioner", by: "X", basis: "b", verified: "2026-10-22" };
    expect(() => makeAttestation(claim, signed, { ...FIXTURE, basis: argument }, TODAY, oldStyle.rationale)).toThrow(/argument/);
  });
  it("with a review cycle other than 1, 2 or 3 years", () => bad({ ttlDays: 9999 }, /review cycle/));
  it("with a date in the future", () => bad({ verified: "2026-10-22" }, /future/));
  it("with a date that doesn't exist", () => bad({ verified: "2026-02-30" }, /real date/));
});

describe("a good sign-off", () => {
  const a = makeAttestation(CLAIMS[modelId], BASE[modelId], FIXTURE, TODAY);
  it("is a practitioner block the ledger resolves as attested", () => {
    expect(a).toMatchObject({ source: "practitioner", by: FIXTURE.by, basis: FIXTURE.basis, verified: TODAY, ttlDays: 730 });
    expect(resolveStatus({ attestation: a }, new Date(`${TODAY}T12:00:00Z`))).toBe(STATUS.ATTESTED);
  });
  it("records the model proposal it replaces", () => expect(a.supersedes).toEqual({ source: "model", model: BASE[modelId].model }));
  it("records an earlier sign-off it replaces, as a re-check does", () => {
    expect(supersedesOf({ source: "practitioner", by: "X", verified: "2024-01-01", basis: "b" })).toEqual({ source: "practitioner", by: "X", verified: "2024-01-01" });
  });
  it("records a rejection it overturns", () => {
    const r = { by: "X", reason: "wrong", reviewed: "2026-01-01" };
    expect(supersedesOf({ ...BASE[modelId], rejection: r }).rejection).toEqual(r);
  });
  it("defaults the date to today and tidies stray spaces", () => {
    const b = makeAttestation(CLAIMS[modelId], BASE[modelId], { ...FIXTURE, verified: "", basis: `  ${FIXTURE.basis}\n ` }, TODAY);
    expect(b.verified).toBe(TODAY);
    expect(b.basis).toBe(FIXTURE.basis);
  });
});

// David, 2026-10-23: he couldn't find the weak sign-offs to re-sign. The desk now points them out.
describe("a basis worth a second look", async () => {
  const { basisHint, checkLine } = await import("../scripts/attest-core.mjs");
  const sourced = "Check: Walters & Wilder (2023), Scientific Reports 13, 14045, abstract (Sources page). Rewritten 2026-10-23: it had cited nothing.";
  const inCourse = "Check: nothing outside the course. It is a definition of attesting. Basis note added 2026-10-23.";
  it("passes a basis that names the check's source, its year or its site", () => {
    expect(basisHint(sourced, "Read Walters and Wilder's abstract")).toBeNull();
    expect(basisHint(sourced, "Checked the 2023 paper's abstract")).toBeNull();
    expect(basisHint("Check: NASA's mission record.", "Checked against NASA. (n.d.). Apollo 11.")).toBeNull();
  });
  it("points out a basis that names a different source", () => {
    expect(basisHint(sourced, "Checked against the COPPA rule, 16 C.F.R. pt. 312")).toMatch(/doesn't mention the source/);
  });
  it("passes an in-course check judged from the course, and points out a vague one", () => {
    expect(basisHint(inCourse, "A definition; I read the ledger code in vendor/")).toBeNull();
    expect(basisHint(inCourse, "Checked Against Design Principle")).toMatch(/course itself/);
  });
  it("never flags a sign-off with no reasoning to compare against", () => expect(basisHint("", "anything")).toBeNull());
  // David, 2026-10-25: trait-not-diagnosis stayed flagged because "Check the manual itself" was read as its check.
  it("doesn't mistake the word 'check' in a sentence for a check line", () => {
    const r = "Paulhus and Williams (2002) for the traits as subclinical. DSM-5-TR, Section II. Check the manual itself if you have access.";
    expect(checkLine(r)).toBe(r);
    expect(basisHint(r, "Checked against Paulhus, D. L., & Williams, K. M. (2002).")).toBeNull();
    expect(checkLine("Check, both on the Sources page: Paulhus (2016). Revised 2026-09-24: x.")).toMatch(/^Check, both/);
  });
  it("reads the check, not the change notes after it", () => {
    expect(checkLine(sourced)).not.toMatch(/Rewritten/);
  });
});

// David, 2026-10-24: "For attests that say 'no source needed,' do not require a source."
describe("a claim judged from the course itself", async () => {
  const { IN_COURSE_BASIS, inCourse } = await import("../scripts/attest-core.mjs");
  const pageJudged = { source: "model", model: "claude-opus-5-5", rationale: "Written with the prompt pair. It is a judgement about the text on the page, so no outside source is needed." };
  const ownRule = { source: "model", model: "claude-opus-5-5", rationale: "Check: nothing outside the course. This is the course's own rule of thumb." };
  it("is recognised by either wording", () => {
    expect(inCourse(pageJudged.rationale)).toBe(true);
    expect(inCourse(ownRule.rationale)).toBe(true);
    expect(inCourse("Check: Walters & Wilder (2023), abstract.")).toBe(false);
  });
  it("takes a blank basis, and the record says so in words", () => {
    expect(makeAttestation(CLAIMS[modelId], pageJudged, { ...FIXTURE, basis: "" }, TODAY).basis).toBe(IN_COURSE_BASIS);
  });
  it("takes a short basis of your own", () => {
    expect(makeAttestation(CLAIMS[modelId], ownRule, { ...FIXTURE, basis: "Read it beside the page." }, TODAY).basis).toBe("Read it beside the page.");
  });
  it("still needs the tick, in its own words", () => {
    expect(() => makeAttestation(CLAIMS[modelId], pageJudged, { ...FIXTURE, basis: "", checked: false }, TODAY)).toThrow(/against the page myself/);
  });
  it("while a claim with sources still needs a full basis", () => {
    const sourced = { source: "model", model: "claude-opus-5-5", rationale: "Check: Walters & Wilder (2023), abstract." };
    expect(() => makeAttestation(CLAIMS[modelId], sourced, { ...FIXTURE, basis: "" }, TODAY)).toThrow(/basis in full/);
  });
});

describe("a rejection", () => {
  it("needs a name and a reason", () => {
    expect(() => makeRejection({ by: "X", reason: "no" }, TODAY)).toThrow(/why/);
    expect(() => makeRejection({ by: "", reason: "The wording overstates the source." }, TODAY)).toThrow(/name/);
  });
  it("carries who, why and when", () => {
    expect(makeRejection({ by: "X", reason: "The wording overstates the source." }, TODAY)).toEqual({ rejection: { by: "X", role: null, reason: "The wording overstates the source.", reviewed: TODAY } });
  });
});

describe("the file the desk writes", () => {
  it("reads back exactly what was written, in claims.js order", async () => {
    const dir = mkdtempSync(join(tmpdir(), "desk-"));
    const entries = { [ORDER[5]]: makeRejection({ by: "X", reason: "The wording overstates the source." }, TODAY), [ORDER[2]]: makeAttestation(CLAIMS[ORDER[2]], BASE[ORDER[2]], FIXTURE, TODAY) };
    const file = join(dir, "a.js");
    writeFileSync(file, serialize(entries, ORDER));
    const back = (await import(pathToFileURL(file).href)).ATTESTATIONS;
    expect(back).toEqual(entries);
    expect(Object.keys(back)).toEqual([ORDER[2], ORDER[5]]);
    rmSync(dir, { recursive: true });
  });
  it("writes an empty desk as {}", () => expect(serialize({}, ORDER)).toContain("export const ATTESTATIONS = {};"));
});

describe("only the desk's own page can change anything", () => {
  const cfg = { port: 8091, secret: "s3cret" };
  it("accepts its own page on this computer", () => {
    expect(allowed({ host: "127.0.0.1:8091", origin: "http://127.0.0.1:8091", token: "s3cret" }, cfg)).toBe(true);
    expect(allowed({ host: "localhost:8091", token: "s3cret" }, cfg)).toBe(true);
  });
  it("refuses another host name (DNS rebinding)", () => expect(allowed({ host: "evil.example:8091", token: "s3cret" }, cfg)).toBe(false));
  it("refuses another website posting to it", () => expect(allowed({ host: "127.0.0.1:8091", origin: "https://evil.example", token: "s3cret" }, cfg)).toBe(false));
  it("refuses a request without the page's token", () => {
    expect(allowed({ host: "127.0.0.1:8091" }, cfg)).toBe(false);
    expect(allowed({ host: "127.0.0.1:8091", token: "guess" }, cfg)).toBe(false);
  });
});

describe("the desk server, on a scratch copy", () => {
  const port = 18091;
  const secret = "test-secret";
  let dir, file, server;
  const call = (method, path, { headers = {}, body } = {}) =>
    new Promise((resolve, reject) => {
      const req = request({ host: "127.0.0.1", port, method, path, headers: { Host: `127.0.0.1:${port}`, ...headers } }, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
      });
      req.on("error", reject);
      if (body) req.end(JSON.stringify(body));
      else req.end();
    });
  const post = (path, body, headers = { "X-Desk-Token": secret, Origin: `http://127.0.0.1:${port}` }) => call("POST", path, { headers: { "Content-Type": "application/json", ...headers }, body });
  const onDisk = async () => (await import(`${pathToFileURL(file).href}?v=${Math.random()}`)).ATTESTATIONS;

  beforeAll(async () => {
    dir = mkdtempSync(join(tmpdir(), "desk-"));
    file = join(dir, "attestations.js");
    writeFileSync(file, serialize({}, ORDER));
    server = await createDesk({ file, port, secret, log: () => {} });
    await new Promise((r) => server.listen(port, "127.0.0.1", r));
  });
  afterAll(() => {
    server?.close();
    rmSync(dir, { recursive: true, force: true });
  });

  it("serves its page with the token, a strict content policy and no caching", async () => {
    const r = await call("GET", "/");
    expect(r.status).toBe(200);
    expect(r.body).toContain(`<meta name="desk-token" content="${secret}">`);
    expect(r.headers["content-security-policy"]).toContain("default-src 'none'");
    expect(r.headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(r.headers["cache-control"]).toBe("no-store");
  });
  it("lists every claim, grouped under the first lesson that uses it", async () => {
    const r = JSON.parse((await call("GET", "/api/claims")).body);
    expect(r.claims).toHaveLength(ORDER.length);
    expect(r.lessons.flatMap((l) => l.ids).sort()).toEqual([...ORDER].sort());
  });
  // David, 2026-10-25: a page left open across a restart kept failing with no hint what to do.
  it("tells a page from an earlier run to reload, and saves nothing", async () => {
    const r = await post("/api/attest", { id: modelId, ...FIXTURE }, { Origin: `http://127.0.0.1:${port}`, "X-Desk-Token": "an-older-run" });
    expect(r.status).toBe(403);
    expect(JSON.parse(r.body)).toMatchObject({ reload: true });
    expect(JSON.parse(r.body).error).toMatch(/Reload the page/);
    expect(await onDisk()).toEqual({});
  });
  it("refuses another host name, another website, and a missing token", async () => {
    expect((await call("GET", "/", { headers: { Host: `evil.example:${port}` } })).status).toBe(403);
    expect((await post("/api/attest", { id: modelId, ...FIXTURE }, { Origin: "https://evil.example", "X-Desk-Token": secret })).status).toBe(403);
    expect((await post("/api/attest", { id: modelId, ...FIXTURE }, { Origin: `http://127.0.0.1:${port}` })).status).toBe(403);
    expect(await onDisk()).toEqual({});
  });
  it("serves the page's own style sheets, script, fonts and textures with their real types", async () => {
    expect((await call("GET", "/course.css")).headers["content-type"]).toMatch(/text\/css/);
    expect((await call("GET", "/desk.css")).headers["content-type"]).toMatch(/text\/css/);
    expect((await call("GET", "/desk.js")).headers["content-type"]).toMatch(/text\/javascript/);
    expect((await call("GET", "/theme-toggle.js")).status).toBe(200);
    expect((await call("GET", "/textures/grain.svg")).headers["content-type"]).toMatch(/image\/svg/);
  });
  it("serves only the desk's own files, never the rest of the project", async () => {
    expect((await call("GET", "/claims.js")).status).toBe(404);
    expect((await call("GET", "/fonts/../package.json")).status).not.toBe(200);
  });
  it("explains a weak sign-off in words and saves nothing", async () => {
    const r = await post("/api/attest", { id: modelId, ...FIXTURE, checked: false });
    expect(r.status).toBe(400);
    expect(JSON.parse(r.body).error).toMatch(/Tick/);
    expect(await onDisk()).toEqual({});
  });
  it("signs off, rejects and undoes, writing the scratch file each time", async () => {
    let r = JSON.parse((await post("/api/attest", { id: modelId, ...FIXTURE })).body);
    expect(r.claim.status).toBe("attested");
    expect((await onDisk())[modelId].by).toBe(FIXTURE.by);
    r = JSON.parse((await post("/api/reject", { id: ORDER[0], by: "X", reason: "The wording overstates the source." })).body);
    expect(r.claim.status).toBe("rejected");
    r = JSON.parse((await post("/api/undo", { id: modelId })).body);
    expect(r.claim.status).toBe(resolveStatus({ attestation: BASE[modelId] }));
    expect(Object.keys(await onDisk())).toEqual([ORDER[0]]);
  });
  it("can only undo what the desk itself wrote", async () => {
    expect((await post("/api/undo", { id: ORDER[1] })).status).toBe(409);
  });
});

describe("the project's guard keeps Claude away from the desk", async () => {
  const { pre } = await import("../.claude/hooks/claims-guard.mjs");
  const refused = (tool_name, tool_input) => pre({ tool_name, tool_input })?.hookSpecificOutput?.permissionDecision === "deny";
  it("refuses any edit to attestations.js, even an empty one", () => {
    expect(refused("Edit", { file_path: "/x/attestations.js", old_string: "{}", new_string: "{ }" })).toBe(true);
    expect(refused("Write", { file_path: "/x/attestations.js", content: "export const ATTESTATIONS = {};" })).toBe(true);
  });
  it.each(["npm run attest", "npm run-script attest", "node scripts/attest.mjs", "echo x > attestations.js", "sed -i '' s/a/b/ attestations.js", 'bash -c "npm run attest"', "cd /x && npm run attest"])("refuses the shell command: %s", (command) => {
    expect(refused("Bash", { command })).toBe(true);
  });
  it.each(["npx vitest run tests/attest.test.js", "npm test", "cat attestations.js", "git diff attestations.js", "npm run preview", "grep -n desk scripts/attest.mjs", "npm run desk:preview", 'git commit -m "tool: the desk (npm run attest)"'])("allows the shell command: %s", (command) => {
    expect(refused("Bash", { command })).toBe(false);
  });
  it("refuses starting the desk from the terminal panel", () => expect(refused("mcp__terminal__run_in_terminal", { command: "npm run attest" })).toBe(true));
  it("refuses opening the desk in either browser, and leaves the course preview alone", () => {
    expect(refused("mcp__Claude_Browser__navigate", { url: "http://127.0.0.1:8091/" })).toBe(true);
    expect(refused("mcp__claude-in-chrome__navigate", { url: "localhost:8091" })).toBe(true);
    expect(refused("mcp__Claude_Browser__javascript_tool", { text: "fetch('http://localhost:8091/api/attest')" })).toBe(true);
    expect(refused("mcp__Claude_Browser__navigate", { url: "http://localhost:8080/index.html" })).toBe(false);
  });
});

describe("the real attestations.js", () => {
  const text = readFileSync(new URL("../attestations.js", import.meta.url), "utf8");
  it("is exactly the desk's own format, so it was written by the desk and not by hand", () => {
    expect(text).toBe(serialize(ATTESTATIONS, ORDER));
  });
  it.each(Object.keys(ATTESTATIONS).length ? Object.entries(ATTESTATIONS) : [["(none yet)", null]])("%s is a complete sign-off or rejection of a real claim", (id, e) => {
    if (!e) return;
    expect(CLAIMS).toHaveProperty(id);
    if (e.rejection && !e.source) {
      expect(e.rejection.by && e.rejection.reason && e.rejection.reviewed).toBeTruthy();
      return;
    }
    expect(e.source).toBe("practitioner");
    expect(e.by && e.basis && e.verified).toBeTruthy();
    expect(TTL_CHOICES).toContain(e.ttlDays);
    expect(e.by).not.toMatch(/fixture/i);
  });
});
