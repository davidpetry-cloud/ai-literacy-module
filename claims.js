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

const proposedBy = (rationale, model = "claude-opus-5-5") => ({
  source: "model",
  model,
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
  },
  "prompt-parts": {
    text: "A clear request to an AI tool usually states four things: the task, the context, the constraints, and the format you want back.",
    attestation: proposedBy(
      "A common framing in the prompting guides model providers publish, cut down to four parts a non-specialist can remember. Says 'usually' because a short request can work when the context is obvious."
    )
  },
  "gaps-get-filled": {
    text: "When a request leaves out details the output needs, a model often fills the gaps with plausible invented specifics, such as times, dates or how a project is going.",
    attestation: proposedBy(
      "Follows from model-predicts: the model writes likely text, and a specific-sounding detail is often more likely than a blank. Each track's vague output in Lesson 2 is built to show it."
    )
  },
  "example-steers-form": {
    text: "Showing an example of the output you want is an effective way to steer its format and tone, often more effective than describing them.",
    attestation: proposedBy(
      "Giving examples (few-shot prompting) is widely documented as a way to control format and style. Worded as 'often more effective' rather than 'the most reliable way', which would overclaim."
    )
  },
  "structure-not-truth": {
    text: "A better-structured request makes an output more likely to fit what you need. It doesn't make the output reliable: any fact you didn't supply still needs checking.",
    attestation: proposedBy(
      "Stops the lesson being read as 'good prompts give true answers', and links it back to Lesson 1. Facts you put in the context can come back right; anything the model adds is still predicted text."
    )
  },
  "l2-key-educators": {
    text: "The answer key for the Lesson 2 educators prompt pair is correct: each part of the vague request is labelled as the request shows it, each line of the structured output is traced to the parts that caused it, and each line marked invented has no basis in the request.",
    attestation: proposedBy(
      "Written with the prompt pair. Check it by reading each request beside its output. It is a judgement about the text on the page, so no outside source is needed."
    )
  },
  "l2-key-professionals": {
    text: "The answer key for the Lesson 2 professionals prompt pair is correct: each part of the vague request is labelled as the request shows it, each line of the structured output is traced to the parts that caused it, and each line marked invented has no basis in the request.",
    attestation: proposedBy(
      "Written with the prompt pair. Check it by reading each request beside its output. It is a judgement about the text on the page, so no outside source is needed."
    )
  },
  "l2-key-students": {
    text: "The answer key for the Lesson 2 students prompt pair is correct: each part of the vague request is labelled as the request shows it, each line of the structured output is traced to the parts that caused it, and each line marked invented has no basis in the request.",
    attestation: proposedBy(
      "Written with the prompt pair. Check it by reading each request beside its output. It is a judgement about the text on the page, so no outside source is needed."
    )
  },
  "independent-source": {
    text: "Checking a claim means comparing it with a source that doesn't depend on the AI's answer: the original study, law, dataset or organisation. Another chatbot, or a page that repeats the claim, isn't independent.",
    attestation: proposedBy(
      "Basic source-evaluation practice: a check only counts if the source could disagree with the AI. A chatbot or a page that copies the claim can't. Objective 3.1 rests on it.",
      "claude-sonnet-5"
    )
  },
  "citations-unreliable": {
    text: "AI tools can produce citations that look real but point to nothing. A citation that does exist can also fail to say what it's cited for.",
    attestation: proposedBy(
      "Invented and misattributed references are among the best-documented AI errors; lawyers were sanctioned in 2023 (Mata v. Avianca, S.D.N.Y.) for filing cases a chatbot made up. Follows from risk-zones. The second sentence covers the 'real, but doesn't say that' case Lesson 3 teaches. Check the case details before attesting.",
      "claude-sonnet-5"
    )
  },
  "check-fits-stakes": {
    text: "How much checking an output needs depends on what happens if it's wrong and how hard that is to undo, not on how the output sounds.",
    attestation: proposedBy(
      "Proportionate verification is standard risk practice. Worded to rule out both 'check everything' and 'trust fluent output'. Objective 3.3 rests on it.",
      "claude-sonnet-5"
    )
  },
  "l3-key-educators": {
    text: "The answer key for the Lesson 3 educators passage is correct: each sentence's label matches its cited source, the no-source sentence has no real review behind it, and each use is given a fitting level of checking.",
    attestation: proposedBy(
      "Written with the passage. Black & Wiliam (1998) and Bloom (1984) should be checked against the originals before this is attested. The level for each use is a judgement about consequences, not a fact.",
      "claude-sonnet-5"
    )
  },
  "l3-key-professionals": {
    text: "The answer key for the Lesson 3 professionals passage is correct: each sentence's label matches its cited source, the no-source sentence has no real report behind it, and each use is given a fitting level of checking.",
    attestation: proposedBy(
      "Written with the passage. The FTC's CAN-SPAM compliance guide (10 business days for opt-outs; valid physical postal address) should be checked before this is attested. The level for each use is a judgement about consequences.",
      "claude-sonnet-5"
    )
  },
  "l3-key-students": {
    text: "The answer key for the Lesson 3 students passage is correct: each sentence's label matches its cited source, the no-source sentence has no real study behind it, and each use is given a fitting level of checking.",
    attestation: proposedBy(
      "Written with the passage. Paruthi et al. (2016, 8 to 10 hours for ages 13 to 18) and the AAP's 2014 school start time statement (8:30 a.m. or later) should be checked before this is attested. The level for each use is a judgement about consequences.",
      "claude-sonnet-5"
    )
  },
  "attest-not-propose": {
    text: "A model can propose a value but can't attest it. Attesting means a named person takes responsibility for having checked it, on a stated basis, on a date.",
    attestation: proposedBy(
      "The rule attestation-ledger enforces and this course runs on. Stated as a definition of attesting, so it doesn't claim models are always wrong, only that they can't take responsibility."
    )
  },
  "attestation-lapses": {
    text: "A sign-off records a check at one point in time. Sources and rules change, so a sign-off should be treated as lapsed after a set period unless someone checks it again. The two-year window used here is this course's choice, not a standard.",
    attestation: proposedBy(
      "Periodic review is common practice for policies and reference material. The last sentence stops learners reading 730 days (the ledger's default) as an external rule."
    )
  },
  "signer-must-know": {
    text: "The right person to sign off is someone who did the check and answers for the result, not the most senior person or whoever asked for the output.",
    attestation: proposedBy(
      "Objective 4.2 rests on it. Worded around doing the check and being accountable, the two things each track's wrong-signer example lacks."
    )
  },
  "form-not-substance": {
    text: "Software can check that a sign-off has a name and a date and hasn't lapsed. Only a person can judge whether its basis is real and whether the signer could have made the check.",
    attestation: proposedBy(
      "Checked against attestation-ledger 0.1.1: resolveStatus() reads source, by, verified and ttlDays, never basis or role, so a tool's name typed into 'by' resolves as attested. Lesson 4's reveal shows this with the real engine."
    )
  },
  "l4-key-educators": {
    text: "The answer key for the Lesson 4 educators sign-offs is correct: each sign-off's label matches what it shows, and exactly one of the five is sound.",
    attestation: proposedBy(
      "Written with the document. The people and sign-offs are fictional, so no outside source is needed: check each label against the sign-off as shown, and that the lapsed one is over two years old."
    )
  },
  "l4-key-professionals": {
    text: "The answer key for the Lesson 4 professionals sign-offs is correct: each sign-off's label matches what it shows, and exactly one of the five is sound.",
    attestation: proposedBy(
      "Written with the document. Fictional, so check each label against the sign-off as shown. The wrong-signer judgement assumes legal and data protection own retention periods, which is typical but worth a look."
    )
  },
  "l4-key-students": {
    text: "The answer key for the Lesson 4 students sign-offs is correct: each sign-off's label matches what it shows, and exactly one of the five is sound.",
    attestation: proposedBy(
      "Written with the document. Fictional, so check each label against the sign-off as shown. The plastic-bottle figure is a common unsourced number; the key is about who signed it, not whether it's true."
    )
  }
};
