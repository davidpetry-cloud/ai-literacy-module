/**
 * Sign-offs made with the attestation desk (`npm run attest`). Written only by the desk, which
 * David runs himself; never by hand, never by a Claude session (the project's guard refuses it).
 * claims.js holds the model's proposals; each entry here replaces its claim's attestation block
 * when the site loads, so attesting never means editing code. See docs/attestation-guide.md.
 */
export const ATTESTATIONS = {
  "l1-key-students": {
    "source": "practitioner",
    "by": "David Petry",
    "role": "Course author and UX lead",
    "basis": "Checked against NASA. (n.d.). Apollo 11. https://www.nasa.gov/mission/apollo-11/",
    "verified": "2026-10-21",
    "ttlDays": 730,
    "supersedes": {
      "source": "model",
      "model": "claude-opus-5-5"
    }
  }
};
