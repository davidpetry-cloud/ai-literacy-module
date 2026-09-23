/**
 * Every factual claim this course makes about AI, as an attestation-ledger
 * record. Status is never stored here — resolveStatus() derives it from the
 * attestation block, so an attested claim lapses unless somebody re-checks it.
 *
 * Claims about how AI tools behave date quickly. That is the point of putting
 * them here rather than in lesson prose: a stale claim shows as Lapsed on the
 * page instead of quietly going wrong.
 *
 * To attest a claim, replace its attestation block with:
 *   { source: "practitioner", by: "David Petry", role: "...",
 *     basis: "what it is grounded in", verified: "YYYY-MM-DD" }
 * The original model proposal is kept in git history. Do not edit the text of
 * a claim while attesting it — if the wording is wrong, reject it with a
 * reason and propose a replacement.
 */

const proposedBy = (rationale) => ({
  source: "model",
  model: "claude-opus-5-5",
  rationale,
  by: null,
  verified: null
});

export const CLAIMS = {
  "model-predicts": {
    text: "A language model writes by repeatedly predicting a likely next piece of text, based on patterns learned from its training data. It does not look answers up in a stored table of facts.",
    attestation: proposedBy(
      "The standard description of how autoregressive language models generate text. Deliberately stated without technical vocabulary so a non-specialist can repeat it."
    )
  },
  "retrieval-still-generated": {
    text: "Some AI tools add a search or retrieval step that pulls in documents first. The answer is still generated text, and it can misstate or overstate what those documents say.",
    attestation: proposedBy(
      "Many current assistants browse or retrieve. Without this claim, learners who use such tools would rightly say claim model-predicts doesn't describe them."
    )
  },
  "fluency-not-evidence": {
    text: "How confident an AI output sounds is not a reliable signal of whether it is correct.",
    attestation: proposedBy(
      "Models produce correct and incorrect statements in the same register; Lesson 1's passages are built to show it. Stated as 'not a reliable signal' rather than 'no signal', which would overclaim."
    )
  },
  "risk-zones": {
    text: "AI outputs are most likely to be wrong on specific numbers and dates, on citations and quotations, and on recent or niche information.",
    attestation: proposedBy(
      "These are the error types most often reported in practice and most easily demonstrated. Recent information falls outside or at the edge of training data; niche facts have few examples to learn from; citations and quotes need exact recall the model does not reliably have."
    )
  },
  "l1-key-educators": {
    text: "The answer key for the Lesson 1 educators passage is correct: each sentence's label matches its cited source, and the no-source sentence has no real study behind it.",
    attestation: proposedBy(
      "Written with the passage. Dunlosky et al. (2013) and Ebbinghaus (1885) should be checked against the originals before this is attested."
    )
  },
  "l1-key-professionals": {
    text: "The answer key for the Lesson 1 professionals passage is correct: each sentence's label matches its cited source, and the no-source sentence has no real survey behind it.",
    attestation: proposedBy(
      "Written with the passage. GDPR Articles 3(2)(a) and 83(5) should be checked against the published regulation before this is attested."
    )
  },
  "l1-key-students": {
    text: "The answer key for the Lesson 1 students passage is correct: each sentence's label matches its cited source, and the quoted engineer is invented.",
    attestation: proposedBy(
      "Written with the passage. The landing date and surface duration should be checked against NASA's mission record before this is attested."
    )
  }
};
