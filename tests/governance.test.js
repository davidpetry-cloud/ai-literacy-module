/**
 * The course's own claims follow the rule the course teaches:
 * a model can propose, only a named human can attest.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { resolveStatus, STATUS, SOURCE } from "attestation-ledger";
import { COURSE } from "../course.js";
import { CLAIMS } from "../claims.js";

const root = new URL("../", import.meta.url);
const ids = Object.keys(CLAIMS);

function referencedClaims() {
  const refs = new Set();
  for (const lesson of COURSE.lessons.filter((l) => l.ready)) {
    for (const stage of lesson.stages) {
      for (const id of stage.principles ?? []) refs.add(id);
      for (const track of Object.values(stage.tracks ?? {})) refs.add((track.passage ?? track.pair ?? track.signoffs ?? track.classify ?? track.screen ?? track.thread ?? track.chat ?? track.respond).claim);
    }
  }
  return refs;
}

describe("claim references", () => {
  it("every claim a lesson cites exists", () => {
    for (const id of referencedClaims()) expect(CLAIMS, id).toHaveProperty(id);
  });

  it("every claim is cited by some lesson — no orphans", () => {
    const refs = referencedClaims();
    for (const id of ids) expect(refs.has(id), id).toBe(true);
  });
});

describe("claim records", () => {
  it.each(ids)("%s has text and an attestation block", (id) => {
    expect(CLAIMS[id].text.length).toBeGreaterThan(20);
    expect([SOURCE.MODEL, SOURCE.PRACTITIONER]).toContain(CLAIMS[id].attestation.source);
  });

  it.each(ids)("%s: a model proposal carries its model and reasoning", (id) => {
    const a = CLAIMS[id].attestation;
    if (a.source !== SOURCE.MODEL) return;
    expect(a.model).toBeTruthy();
    expect(a.rationale).toBeTruthy();
  });

  it.each(ids)("%s: a practitioner record names who, on what basis, and when", (id) => {
    const a = CLAIMS[id].attestation;
    if (a.source !== SOURCE.PRACTITIONER) return;
    expect(a.by).toBeTruthy();
    expect(a.basis).toBeTruthy();
    expect(Number.isNaN(new Date(a.verified).getTime())).toBe(false);
  });

  it.each(ids)("%s: a model-sourced claim never resolves to attested", (id) => {
    if (CLAIMS[id].attestation.source !== SOURCE.MODEL) return;
    expect(resolveStatus(CLAIMS[id])).toBe(STATUS.PROPOSED);
  });

  it("a model claim dressed in human-looking fields still resolves to proposed", () => {
    const smuggled = {
      text: "x",
      attestation: {
        source: SOURCE.MODEL,
        model: "claude-opus-5-5",
        by: "David Petry",
        basis: "looks legitimate",
        verified: new Date().toISOString().slice(0, 10)
      }
    };
    expect(resolveStatus(smuggled)).toBe(STATUS.PROPOSED);
  });
});

describe("ledger version pin", () => {
  const installed = JSON.parse(
    readFileSync(new URL("node_modules/attestation-ledger/package.json", root), "utf8")
  ).version;
  const pages = readdirSync(root).filter((f) => f.endsWith(".html"));

  it("has pages to check", () => {
    expect(pages.length).toBeGreaterThan(0);
  });

  it.each(pages)("%s loads the same ledger version the tests run against", (page) => {
    const html = readFileSync(new URL(page, root), "utf8");
    const pin = html.match(/attestation-ledger@([\d.]+)\//)?.[1];
    expect(pin).toBe(installed);
  });
});
