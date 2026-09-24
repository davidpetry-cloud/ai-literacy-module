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
  },
  "error-kinds": {
    text: "Most AI output errors fall into four kinds: fabrication (an invented detail), outdated information (once true, no longer), bias (an assumption that favours or leaves out a group), and a misread instruction (ignoring or skipping something the request said). The four are a teaching frame, not a full list.",
    attestation: proposedBy(
      "A teaching frame drawn from common failure analyses: hallucination, knowledge cutoff, social bias and instruction-following failures. Worded as 'most' and 'not a full list' so it doesn't claim to be complete. Objective 5.1 rests on it.",
      "claude-sonnet-5"
    )
  },
  "outdated-cutoff": {
    text: "A model's knowledge stops at a training cutoff, so it can state something as current that has since changed, even when it was once correct.",
    attestation: proposedBy(
      "Follows from model-predicts: a model writes text it learned from data up to a cutoff. The three answer keys use Pluto (2006), Privacy Shield (2020 and 2023) and the digital SAT (2024). Check each against its source.",
      "claude-sonnet-5"
    )
  },
  "bias-inherited": {
    text: "Models can reproduce stereotypes and one-sided assumptions from their training data, in wording that reads as neutral.",
    attestation: proposedBy(
      "Widely documented in studies of language models. Worded as 'can reproduce', not 'always', and about neutral-sounding wording because that is what makes it hard to see.",
      "claude-sonnet-5"
    )
  },
  "misread-instruction": {
    text: "A model can skip or contradict a constraint in a request while the rest of the output reads well, so compare the output with the request line by line.",
    attestation: proposedBy(
      "Instruction-following failures are a standard evaluation category. Each misread sentence in Lesson 5 breaks one line of the request, so the check is a comparison you can make from the page.",
      "claude-sonnet-5"
    )
  },
  "checklist-specific": {
    text: "A checklist works best when it is short and each check is a specific action aimed at one kind of error. A general check such as 'does it sound right' catches none of the four kinds.",
    attestation: proposedBy(
      "Checklist practice in aviation and medicine favours short, action-based items. The second sentence follows from fluency-not-evidence. 'Works best' is a claim about practice, not a measured threshold, and the five-check limit is this course's choice.",
      "claude-sonnet-5"
    )
  },
  "l5-key-educators": {
    text: "The answer key for the Lesson 5 educators answer is correct: each sentence's label matches what it shows, the outdated sentence's source says what the note says, and exactly one sentence has no error.",
    attestation: proposedBy(
      "Written with the answer. Pluto's reclassification should be checked against IAU Resolution B5 (2006). The request and answer are made up, so check each other label against the sentence as shown. Revised 2026-09-24: the request now names everything the No error sentence says.",
      "claude-sonnet-5"
    )
  },
  "l5-key-professionals": {
    text: "The answer key for the Lesson 5 professionals answer is correct: each sentence's label matches what it shows, the outdated sentence's source says what the note says, and exactly one sentence has no error.",
    attestation: proposedBy(
      "Written with the answer. Privacy Shield's invalidation should be checked against CJEU Case C-311/18 (2020) and the EU-US Data Privacy Framework decision (2023). The misread sentence breaks the plain-words rule with a real reference, GDPR Article 46(2)(c) on Standard Contractual Clauses, which is correct in itself; check it. The vendor and audit are made up. Revised 2026-09-24: the No error sentence no longer adds a claim the request didn't make.",
      "claude-sonnet-5"
    )
  },
  "l5-key-students": {
    text: "The answer key for the Lesson 5 students answer is correct: each sentence's label matches what it shows, the outdated sentence's source says what the note says, and exactly one sentence has no error.",
    attestation: proposedBy(
      "Written with the answer. The digital SAT for US students since spring 2024 should be checked against the College Board. The workshop and its score gains are made up. Revised 2026-09-24: the answer now keeps the request's word limit, the misread sentence ignores who the reminder is for, and the bias sentence is a default assumption about families rather than a contested group statistic.",
      "claude-sonnet-5"
    )
  },
  "usability-goals": {
    text: "A screen's usability can be judged by five goals: learnability, efficiency, memorability, errors (how few, how bad, and how easy to recover from) and satisfaction.",
    attestation: proposedBy(
      "Nielsen's five quality components of usability; ISO 9241-11 defines usability through effectiveness, efficiency and satisfaction. David chose this set for Lesson 6 on 2026-09-24. Check the wording against Nielsen's 'Usability 101'."
    )
  },
  "design-principles": {
    text: "Seven design principles cover most of what makes a screen usable: user-centricity, consistency, hierarchy, context, user control, accessibility and usability. They are a teaching frame, not a standard list.",
    attestation: proposedBy(
      "David's set of seven (2026-09-24), drawn from widely taught sources such as Nielsen's ten heuristics and Norman's The Design of Everyday Things. Worded as a teaching frame so it doesn't claim to be a formal standard."
    )
  },
  "context-principle": {
    text: "A screen should always show people where they are and what just happened, for example with a message that confirms an action worked.",
    attestation: proposedBy(
      "Nielsen's first heuristic, 'visibility of system status'. Two of Lesson 6's three screens break it with a silent action, and check item p2 turns on it."
    )
  },
  "user-control-principle": {
    text: "People should be able to go back, undo and cancel, so that one mistake doesn't cost them their work.",
    attestation: proposedBy(
      "Nielsen's heuristic 'user control and freedom'. All three of Lesson 6's screens break it in a different way: a final booking, a delete with no undo, and no Back button."
    )
  },
  "ai-ui-polish": {
    text: "A screen built by an AI tool can look finished while missing things people need, such as confirmation messages, clear labels, undo and accessible error messages, unless the request asks for them.",
    attestation: proposedBy(
      "Follows from gaps-get-filled and prompt-parts: a model builds what the request describes and fills gaps with likely defaults, and visual polish is a likely default. 'Can' is deliberate. This rests on practice more than published study, so it needs David's own judgement."
    )
  },
  "l6-key-educators": {
    text: "The answer key for the Lesson 6 educators screen is correct: each part's principle, goal and harm-and-reach placing matches what the screen does, and exactly one part has no problem.",
    attestation: proposedBy(
      "Written with the screen, which is made up, so check it by using the screen beside the key. The goal for each problem and its place on the grid are judgements; the reveal names a main goal and allows a second."
    )
  },
  "l6-key-professionals": {
    text: "The answer key for the Lesson 6 professionals screen is correct: each part's principle, goal and harm-and-reach placing matches what the screen does, and exactly one part has no problem.",
    attestation: proposedBy(
      "Written with the screen, which is made up, so check it by using the screen beside the key. Placing the red-only required labels as 'few' users assumes colour-vision and screen-reader users are a minority of this form's users; the harm for them is still high."
    )
  },
  "l6-key-students": {
    text: "The answer key for the Lesson 6 students screen is correct: each part's principle, goal and harm-and-reach placing matches what the screen does, and exactly one part has no problem.",
    attestation: proposedBy(
      "Written with the screen, which is made up, so check it by using the screen beside the key. Twelve required fields is filed under usability (effort) rather than user-centricity; either is defensible, and the note explains the choice."
    )
  }
};
