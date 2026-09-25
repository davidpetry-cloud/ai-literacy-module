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
    attestation: {
    source: "practitioner",
    by: "David Petry",
    role: "Course author and UX lead",
    basis: "Checked against Jurafsky & Martin, Speech and Language Processing, 3rd ed. draft (Aug 2026), ch. 7 'Transformers and Pretraining': generation is repeated next-token prediction from patterns learned in pretraining, not lookup in a table of facts.",
    verified: "2026-09-24",
    ttlDays: 1095,
      supersedes: { source: "model", model: 
    "claude-opus-5-5" },
      }
    },
  "retrieval-still-generated": {
    text: "Some AI tools add a search or retrieval step that pulls in documents first. The answer is still generated text, and it can misstate or overstate what those documents say.",
    attestation: {
    source: "practitioner",
    by: "David Petry",
    role: "Course author and UX lead",
    basis: "Checked against Lewis et al. (2020), NeurIPS 33, arXiv:2005.11401, and Jurafsky & Martin 3rd ed. draft ch. 11: retrieved passages condition a generator; the answer is still generated text.",
    verified: "2026-09-24",
    ttlDays: 1095,
      supersedes: { source: "model", model: 
    "claude-opus-5-5" },
      }
    },
    "fluency-not-evidence": {
    text: "How confident an AI output sounds is not a reliable signal of whether it is correct.",
    attestation: {
    source: "practitioner",
    by: "David Petry",
    role: "Course author and UX lead",
    basis: "Checked against Xiong et al. (2024), ICLR, 'Can LLMs Express Their Uncertainty?': verbalized confidence is overconfident, with many incorrect answers at high confidence; supports 'not a reliable signal', not 'no signal'.",
    verified: "2026-09-24",
    ttlDays: 730,
      supersedes: { source: "model", model: 
    "claude-opus-5-5" },
      }
    },
    "risk-zones": {
    text: "AI outputs are most likely to be wrong on specific numbers and dates, on citations and quotations, and on recent or niche information.",
    attestation:  {
    source: "practitioner",
    by: "David Petry",
    role: "Course author and UX lead",
    basis: "Checked against Kandpal et al. (2023), ICML (proceedings.mlr.press). Numbers, dates, citations and quotes. Walters & Wilder (2023), Sci. Rep. 13:14045.",
    verified: "2026-09-24",
    ttlDays: 1095,
      supersedes:  { source: "model", model:
    "claude-opus-5-5" },    
      }     
    },
    "l1-key-educators": {
    text: "The answer key for the Lesson 1 educators passage is correct: each sentence's label matches its cited source, and the no-source sentence has no real study behind it.",
    attestation: {
    source: "practitioner",
    by: "David Petry",
    role: "Course author and UX lead",
    basis: "Checked against Dunlosky, J. et al. (2013), Improving Students' Learning With Effective Learning Techniques, Psychological Science in the Public Interest 14(1), 4–58. doi:10.1177/1529100612453266. It rates practice testing high utility. Ebbinghaus published the forgetting curve in 1885 (Über das Gedächtnis), not the 1950s; the 2019 study is planted with no source; the last sentence can't be checked.",
    verified: "2026-09-24",
    ttlDays: 1095,
      supersedes:  { source: "model", model:
    "claude-opus-5-5" }, 
      }
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
      "Written with the passage. The FTC's CAN-SPAM compliance guide (10 business days for opt-outs; valid physical postal address) should be checked before this is attested. The level for each use is a judgement about consequences. Revised 2026-09-24: the planted report's firm is now 'Tallowmere Compliance Group', because several real firms trade as 'Meridian Compliance'.",
      "claude-sonnet-5"
    )
  },
  "l3-key-students": {
    text: "The answer key for the Lesson 3 students passage is correct: each sentence's label matches its cited source, the no-source sentence has no real study behind it, and each use is given a fitting level of checking.",
    attestation: proposedBy(
      "Written with the passage. Paruthi et al. (2016, 8 to 10 hours for ages 13 to 18) and the AAP's 2014 school start time statement (8:30 a.m. or later) should be checked before this is attested. The level for each use is a judgement about consequences. Revised 2026-09-24: the planted study's university is now 'Brambleford University', because real institutions are named Lakeside University College.",
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
    text: "The right person to sign off is someone who did the check and answers for the result. Being the most senior person, or the one who asked for the output, isn't enough on its own.",
    attestation: proposedBy(
      "Objective 4.2 rests on it. Worded around doing the check and being accountable, the two things each track's wrong-signer example lacks. Revised 2026-09-24: the old wording read as if a senior person could never be the right signer. A senior person who did the check can be."
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
      "Written with the document. Fictional, so check each label against the sign-off as shown. The wrong-signer judgement assumes legal and data protection own retention periods, which is typical but worth a look. Revised 2026-09-24: the tool signer is now 'AI writing tool (verified)', replacing a product-like name."
    )
  },
  "l4-key-students": {
    text: "The answer key for the Lesson 4 students sign-offs is correct: each sign-off's label matches what it shows, and exactly one of the five is sound.",
    attestation: proposedBy(
      "Written with the document. Fictional, so check each label against the sign-off as shown. The plastic-bottle figure is a common unsourced number; the key is about who signed it, not whether it's true. Revised 2026-09-24: the tool signer is now 'Study chatbot (self-check)', replacing a product-like name."
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
      "Written with the answer. Pluto's reclassification should be checked against IAU Resolution B5 (2006). The request and answer are made up, so check each other label against the sentence as shown. Revised 2026-09-24: the request now names everything the No error sentence says. Revised 2026-09-24: the invented guide is now 'Dr. Mara Linwood', because the old name was close to a real Yale astronomer.",
      "claude-sonnet-5"
    )
  },
  "l5-key-professionals": {
    text: "The answer key for the Lesson 5 professionals answer is correct: each sentence's label matches what it shows, the outdated sentence's source says what the note says, and exactly one sentence has no error.",
    attestation: proposedBy(
      "Written with the answer. Privacy Shield's invalidation should be checked against CJEU Case C-311/18 (2020) and the EU-US Data Privacy Framework decision (2023). The misread sentence breaks the plain-words rule with a real reference, GDPR Article 46(2)(c) on Standard Contractual Clauses, which is correct in itself; check it. The vendor and audit are made up. Revised 2026-09-24: the No error sentence no longer adds a claim the request didn't make. Revised 2026-09-24: the vendor is no longer named, because 'Nimbus Hosting' is a real UK company.",
      "claude-sonnet-5"
    )
  },
  "l5-key-students": {
    text: "The answer key for the Lesson 5 students answer is correct: each sentence's label matches what it shows, the outdated sentence's source says what the note says, and exactly one sentence has no error.",
    attestation: proposedBy(
      "Written with the answer. The digital SAT for US students since spring 2024 should be checked against the College Board. The workshop and its score gains are made up. Revised 2026-09-24: the answer now keeps the request's word limit, the misread sentence ignores who the reminder is for, and the bias sentence is a default assumption about families rather than a contested group statistic. Revised 2026-09-24: the outdated sentence is now 'The SAT is a paper test', because the College Board still asks students to bring a pencil for scratch work, so the old sentence was only half outdated.",
      "claude-sonnet-5"
    )
  },
  "usability-goals": {
    text: "Jakob Nielsen (1993) defines usability by five attributes: learnability, efficiency, memorability, errors (few of them, easy to recover from, and none catastrophic) and satisfaction. This course uses his five as its usability goals.",
     attestation: {
   source: "practitioner",
   by: "David Petry",
   role: "Course author and UX lead",
   basis: "Checked against Nielsen, J. (1993), Usability Engineering, Academic Press, ch. 2 'What Is Usability?': five attributes, with errors defined as few, easy to recover from and none catastrophic. Cross-checked with Nielsen Norman Group, 'Usability 101'.",
   verified: "2026-09-24",
   ttlDays: 730,
   supersedes: { source: "model", model: "claude-opus-5-5" }
 }
  },
  "design-principles": {
    text: "Each of the course's eight design principles rests on established theory. User-centricity: user-centred design (Norman and Draper, 1986). Consistency: Shneiderman's golden rules and Nielsen's heuristics. Hierarchy: the Gestalt principles of perception. Context: feedback and visibility of system status (Norman; Nielsen). User control: easy reversal and user control (Shneiderman; Nielsen). Accessibility: universal design and WCAG. Usability: Nielsen (1993). Wellbeing: value sensitive design (Friedman, 1996). Grouping them as these eight is the course's own teaching choice.",
    attestation: proposedBy(
      "Sources, one per principle. User-centricity: Norman, D. A. and Draper, S. W. (eds.) (1986), User Centered System Design; ISO 9241-210 (human-centred design). Consistency: Shneiderman, B., Designing the User Interface (1987 onward), rule 'strive for consistency'; Nielsen, J. (1994), heuristic 'consistency and standards'. Hierarchy: Wertheimer, M. (1923) and the Gestalt principles of perceptual organisation, the basis of visual hierarchy. Context: Norman, D. A., The Design of Everyday Things (1988; revised 2013), feedback and visibility; Nielsen (1994), 'visibility of system status'. User control: Nielsen (1994), 'user control and freedom'; Shneiderman, 'permit easy reversal of actions' and 'keep users in control'. Accessibility: Center for Universal Design, NC State, The Principles of Universal Design (1997); W3C, WCAG 2.2. Usability: Nielsen, J. (1993), Usability Engineering; ISO 9241-11. Wellbeing: Friedman, B. (1996), 'Value-sensitive design', Interactions 3(6). Revised 2026-09-24 at David's request to anchor his set in foundational theory; the eight-way grouping and the principle-to-goal mapping remain the course's own, so no single scholar's list is implied. Earlier: the text said seven, but Lesson 7 teaches wellbeing as an eighth."
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
  },
  "wcag-structure": {
    text: "WCAG 2.2 organises accessibility under four principles: perceivable, operable, understandable and robust. Its testable success criteria sit at three levels: A (the minimum), AA (the usual target) and AAA (the highest).",
    attestation: proposedBy(
      "W3C, Web Content Accessibility Guidelines (WCAG) 2.2, W3C Recommendation, October 2023. The W3C's conformance notes say AAA is not recommended as a general policy for entire sites, because some content can't meet it. AA as 'the usual target' reflects its use in laws and policies; check against the conformance section. The current edition of WCAG 2.2 is dated 12 December 2024; the Recommendation was first published 5 October 2023."
    )
  },
  "contrast-thresholds": {
    text: "WCAG sets contrast minimums: 4.5:1 for normal text and 3:1 for large text at level AA, 7:1 and 4.5:1 at AAA, and 3:1 for the parts of a screen you need to see to use it, such as input borders and icons.",
    attestation: proposedBy(
      "WCAG 2.2 success criteria 1.4.3 Contrast (Minimum, AA), 1.4.6 Contrast (Enhanced, AAA) and 1.4.11 Non-text Contrast (AA). Large text is at least 18 point, or 14 point bold. The checker in Lesson 7 uses the WCAG relative-luminance formula; check a few pairs against another checker."
    )
  },
  "mindful-ux": {
    text: "Interfaces can steer people against their own interests through deceptive design, often called dark patterns. A design that respects time, attention and choice avoids them, and uses calmer defaults and natural pause points.",
    attestation: proposedBy(
      "'Dark patterns' was coined by Harry Brignull (2010). Sources: FTC staff report, Bringing Dark Patterns to Light (2022); EU Digital Services Act, Article 25, on online interface design. 'Calmer defaults' and 'natural pause points' are this course's terms for the practices David set out on 2026-09-24, not terms from those sources."
    )
  },
  "wellbeing-habits": {
    text: "Small, repeated cues and defaults shape habits, so calmer defaults and natural pause points can support healthier use of technology.",
    attestation: proposedBy(
      "Habit research finds that behaviour repeated in a stable context becomes cued by that context (Wood and Rünger, 2016, 'Psychology of Habit', Annual Review of Psychology). Worded as 'can support', not 'cause'. The personal-wellbeing framing is David's (2026-09-24)."
    )
  },
  "l7-key-educators": {
    text: "The answer key for the Lesson 7 educators screen is correct: each part's kind, WCAG criterion and level, or pattern and calmer fix matches what the screen does, and exactly one part has no problem.",
    attestation: proposedBy(
      "Written with the screen, which is made up, so check it by using the screen beside the key and WCAG 2.2: 1.4.3 (AA), 4.1.2 (A), 2.2.1 (A). The instructions' contrast was measured at 2.44:1 (rounded down, as the checker does)."
    )
  },
  "l7-key-professionals": {
    text: "The answer key for the Lesson 7 professionals screen is correct: each part's kind, WCAG criterion and level, or pattern and calmer fix matches what the screen does, and exactly one part has no problem.",
    attestation: proposedBy(
      "Written with the screen, which is made up. Check against WCAG 2.2: 1.4.1 (A), 2.5.8 (AA, 24 by 24 CSS pixels unless spacing exceptions apply), 3.3.3 (AA). The red border was measured at 1.94:1 against white."
    )
  },
  "l7-key-students": {
    text: "The answer key for the Lesson 7 students screen is correct: each part's kind, WCAG criterion and level, or pattern and calmer fix matches what the screen does, and exactly one part has no problem.",
    attestation: proposedBy(
      "Written with the screen, which is made up. Check against WCAG 2.2: 2.2.2 (A; the carousel runs longer than 5 seconds with no pause), 1.4.10 (AA; filed under Perceivable, taught in the mobile and device group), 3.3.2 (A). The placeholder was measured at 2.16:1 (rounded down, as the checker does)."
    )
  },
  "human-dignity-unesco": {
    text: "UNESCO's Recommendation on the Ethics of Artificial Intelligence, adopted by its 193 member states in November 2021, puts respect for human rights and human dignity at its core, with human oversight of AI systems.",
    attestation: proposedBy(
      "Check against the Recommendation itself (unesco.org, 'Recommendation on the Ethics of Artificial Intelligence', 2021): the values section lists respect, protection and promotion of human rights, fundamental freedoms and human dignity first; human oversight and determination is one of its principles. Normative, not empirical: a framework agreed by states."
    )
  },
  "children-digital-rights": {
    text: "The UN Committee on the Rights of the Child's General Comment No. 25 (2021) says children's rights apply in the digital environment, and sets out what states should do to respect, protect and fulfil them there.",
    attestation: proposedBy(
      "Check against General Comment No. 25 (2021), CRC/C/GC/25, on the OHCHR site. Drafted after consultation that included over 700 children and young people in 27 countries. Normative: an authoritative interpretation of the Convention on the Rights of the Child."
    )
  },
  "child-centred-ai": {
    text: "UNICEF's Policy Guidance on AI for Children (version 2.0, 2021) sets nine requirements for AI that affects children, including supporting their development and wellbeing, protecting their data and privacy, and keeping them safe.",
    attestation: proposedBy(
      "Check the list of nine requirements in UNICEF Innocenti, 'Policy guidance on AI for children 2.0' (November 2021). The three named here are requirements 1, 4 and 5. Normative guidance, developed with the Government of Finland."
    )
  },
  "hcai-framework": {
    text: "Ben Shneiderman's Human-Centered AI framework treats human control and computer automation as two separate scales, and argues for designs with high levels of both, avoiding too much of either.",
    attestation: proposedBy(
      "Shneiderman (2020), 'Human-Centered Artificial Intelligence: Reliable, Safe & Trustworthy', International Journal of Human-Computer Interaction 36(6), 495-504 (arXiv:2002.04087), and his book Human-Centered AI (Oxford University Press, 2022). The lesson's three-by-three grid is a teaching simplification of his two-dimensional framework."
    )
  },
  "relationships-health": {
    text: "Across 148 studies of 308,849 people, those with stronger social relationships had about 50% higher odds of survival over the study periods, an effect comparable to well-known risk factors such as smoking.",
    attestation: proposedBy(
      "Holt-Lunstad, Smith and Layton (2010), 'Social Relationships and Mortality Risk: A Meta-analytic Review', PLoS Medicine 7(7): e1000316 (OR = 1.50, 95% CI 1.42 to 1.59). Observational data: worded as 'had higher odds', not 'caused'. Used to say why relationships are worth protecting from substitution."
    )
  },
  "wisdom-model": {
    text: "Research on wisdom converges on a common model: balancing viewpoints, humility about what you know, adapting to context, and taking several perspectives, applied with a moral aim.",
    attestation: proposedBy(
      "Grossmann et al. (2020), 'The Science of Wisdom in a Polarized World: Knowns and Unknowns', Psychological Inquiry 31(2), 103-133: the 'common wisdom model' of perspectival metacognition grounded in moral aspirations. The lesson's four questions are a plain-language teaching version of it."
    )
  },
  "ai-index-adoption": {
    text: "Stanford HAI's AI Index 2026 reports that about 4 in 5 university students use generative AI, and that globally 59% of people say AI products offer more benefits than drawbacks, while 52% say AI products make them nervous.",
    attestation: proposedBy(
      "Stanford Institute for Human-Centered Artificial Intelligence, The 2026 AI Index Report (hai.stanford.edu/ai-index/2026-ai-index-report), public opinion and education chapters. Figures change every edition: attest with ttlDays 365 and re-check against the newest report. Suggested as a source by David (2026-09-25)."
    )
  },
  "l8-key-educators": {
    text: "The answer key for the Lesson 8 educators product page is reasonable: each feature's verdict (keep, change or stop), what it touches most, and where it sits on the control grid follow from the lesson's questions.",
    attestation: proposedBy(
      "The product is made up, so check the key against the page and the lesson's own sources: marks sent home with no teacher check (a judgement about a child with no one answerable), chats kept forever (UNICEF requirement 4, data and privacy), a 'buddy' that discourages asking the teacher (relationships). These are judgements, not facts: attest that they are reasonable, or propose a different verdict."
    )
  },
  "l8-key-professionals": {
    text: "The answer key for the Lesson 8 professionals product page is reasonable: each feature's verdict (keep, change or stop), what it touches most, and where it sits on the control grid follow from the lesson's questions.",
    attestation: proposedBy(
      "The product is made up. 'Stop' for scoring faces and voices rests on dignity and on people being unable to see or challenge the score; the EU AI Act (2024) also prohibits emotion recognition in workplaces, with exceptions, which could be checked and added. 'Change' for auto-reject asks for a person to review, in line with UNESCO's human oversight principle."
    )
  },
  "l8-key-students": {
    text: "The answer key for the Lesson 8 students product page is reasonable: each feature's verdict (keep, change or stop), what it touches most, and where it sits on the control grid follow from the lesson's questions.",
    attestation: proposedBy(
      "The product is made up. Location and contacts (UNICEF requirements 4 and 5, privacy and safety; General Comment 25), night-time streak alerts (wellbeing, as in Lesson 7), and an app that says 'you don't need anyone else' (relationships). The key speaks to the student about their own choices, never about judging other children."
    )
  }
};
