# Essentials 3: Talking With AI on the Phone. Source research

**Status:** research for the build, 2026-10-13. A model wrote this. It attests nothing.
The draft records below are **model proposals** (`source: "model"`), shown here only.
Nothing has been added to `claims.js`, `sources.js`, the lessons or the pages. They go
in at build time, and only David attests them.

Read with `docs/lesson-15-design.md` (approved objectives, tables and stages) and
`docs/essentials-gaps-ai-calls-and-security.md` (Essentials 1's call research).

## How the sources were checked: read this first

**No page in this note was opened.** This session's network policy blocked every
outside host, for both `curl` and page fetches: ic3.gov, fcc.gov, docs.fcc.gov,
consumerfinance.gov, cisa.gov, ecfr.gov, ncsc.gov.uk and ofcom.org.uk, and even
example.com. Web search was the only route. So every source below was checked
**through web search results on 2026-10-13, not opened.** That is how the Essentials 2
build checked its new sources too (see the note above the Essentials 2 block in
`claims.js`).

That means:

- quotes marked **"quoted"** are words that search results gave as the source's
  own text, on the source's own URL. They are probably exact, but nobody has seen them
  on the page;
- lines marked **"paraphrased"** are a search summary, not the source's words;
- before attesting, **open each page** and check the quoted words against it. Each
  record's rationale says "checked by web search, not opened", so that step can't be
  missed.

Two sources were quoted word for word in `docs/lesson-15-design.md` by an earlier
session that says it opened them on 2026-10-13 (the FCC guide and the FBI PSA). Today's
search results match those quotes.

## Summary

| Planned claim | Source | Supported? |
|---|---|---|
| `voice-protection-fbi-fcc` | FBI I-120324-PSA; FCC robocall guide | **Yes.** The FCC gives the voicemail password as protection against *hacking*, not voice cloning. Word it that way. |
| `voice-cloning-bank-access` | FBI I-120324-PSA | **Yes**, in the FBI's words. |
| `can-you-hear-me-fcc` | FCC consumer alert, 27 March 2017 | **As a warning, yes. As a fact, no.** The FCC warned that a recorded "yes" *could* approve charges. Reword the design doc's "Callers have recorded a yes to approve charges". |
| `chatbots-cfpb` | CFPB issue spotlight, June 2023 | **Yes**, for wrong answers, loops with no way out to a person, and privacy and security risks. It's about chatbots in general, mostly text. Applying it to voice agents is the lesson's own step. |
| `help-desk-code-scam` | CISA/FBI AA23-320A (updated 29 July 2025); FBI Flash, 26 May 2026 | **Yes.** The professionals' "IT help desk" call can stay (decision 3). |
| `political-ai-calls-waiver` (new, optional) | FCC Public Notice DA 26-940 | **Pending.** No FCC decision found. For a facilitator note only, checked again at build time. |
| FCC 24-84 still only a proposal | eCFR, 47 CFR § 64.1200; FCC 24-84 | **Probably still a proposal.** No final rule found. eCFR could not be opened. |
| Ofcom: report scam calls to 7726 | Ofcom | **Could not check.** The page wasn't opened, so whether a bot check is still there is unknown. No claim proposed. |

## 1. `voice-protection-fbi-fcc`

**FBI IC3, I-120324-PSA, *Criminals Use Generative Artificial Intelligence to
Facilitate Financial Fraud*, 3 December 2024** (ic3.gov/PSA/2024/PSA241203). Checked
by web search 2026-10-13. No update date was shown.

- Quoted, from "Tips to protect yourself": "Limit online content of your image or
  voice, make social media accounts private, and limit followers to people you know".
- Quoted: "Create a secret word or phrase with your family to verify their identity."
- Quoted: "Never share sensitive information with people you have met only online or
  over the phone."

**FCC, *Stop Unwanted Robocalls and Texts*, consumer guide, last reviewed 27 February
2026** (fcc.gov/consumers/guides/stop-unwanted-robocalls-and-texts). Checked by web
search 2026-10-13. A search snippet put the page at about 228 days old, which fits
27 February 2026.

- Quoted: "Set up strong passwords for your voicemail so it doesn't get hacked."
- Quoted (fragment): "account numbers, Social Security numbers, passwords, PINs, or
  other important information". The earlier session quoted the start of the line as
  "Never share".

**What they do and don't say.** The FBI ties limiting public recordings to
generative-AI fraud, so that part of E3.4 has a direct source. The **FCC's reason for
the voicemail password is hacking ("so it doesn't get hacked"), not voice copying.**
The lesson can still teach it under E3.4, but it shouldn't say the FCC links it to
cloning. Neither source says to stay silent on calls (as the design doc already says).

```js
"voice-protection-fbi-fcc": {
  text: "To make your voice harder to copy and misuse, keep public videos and voice recordings of you to a minimum, set social media accounts to private, and agree a secret word with your family. Set a strong voicemail password too, so no one can break into it.",
  attestation: proposedBy(
    "FBI IC3 PSA I-120324-PSA, 'Criminals Use Generative Artificial Intelligence to Facilitate Financial Fraud' (3 December 2024, ic3.gov/PSA/2024/PSA241203): 'Limit online content of your image or voice, make social media accounts private, and limit followers to people you know'; 'Create a secret word or phrase with your family to verify their identity.' FCC, 'Stop Unwanted Robocalls and Texts' (consumer guide, last reviewed 27 February 2026): 'Set up strong passwords for your voicemail so it doesn't get hacked.' The FCC gives hacking as the reason, not voice cloning, so the text keeps the two apart. Checked by web search 2026-10-13, not opened (the session's network policy blocked both sites); the design session quoted both pages the same day. Open both before attesting."
  )
},
```

## 2. `voice-cloning-bank-access`

**FBI I-120324-PSA** (as above). Checked by web search 2026-10-13.

- Quoted: "Criminals obtain access to bank accounts using AI-generated audio clips of
  individuals and impersonating them."
- Quoted, in the same section: criminals use short audio clips of a loved one's voice
  "to impersonate a close relative in a crisis situation, asking for immediate
  financial assistance or demanding a ransom."
- Quoted, among the tips: "listen closely to the tone and word choice to distinguish
  between a legitimate phone call from a loved one and an AI-generated vocal cloning."

**What it does and doesn't say.** It says criminals *do* this. It gives no numbers
and doesn't say how often it works, or which banks. It doesn't say how long a clip is
needed. The abstract table's "copy a real person's voice from a short clip" rests on
"short audio clips", which is the FBI's phrase for the relative scam. Keep "short" and
add no number of seconds.

```js
"voice-cloning-bank-access": {
  text: "Criminals have used AI to copy a person's voice from audio clips, then pretended to be that person to get into their bank account. They also copy the voice of someone's relative, to ask for money in a made-up emergency.",
  attestation: proposedBy(
    "FBI IC3 PSA I-120324-PSA (3 December 2024): 'Criminals obtain access to bank accounts using AI-generated audio clips of individuals and impersonating them'; short audio clips of a loved one's voice are used 'to impersonate a close relative in a crisis situation, asking for immediate financial assistance or demanding a ransom.' The PSA gives no figures, so the text says 'have used', not 'often'. Overlaps ai-fraud-fbi (Essentials 1), which covers copied voices in general; this claim is the bank-account case E3.4 needs. Checked by web search 2026-10-13, not opened. Open the PSA before attesting."
  )
},
```

## 3. `can-you-hear-me-fcc`

**FCC, *Consumer Alert: "Can You Hear Me" Scams*, 27 March 2017**
(docs.fcc.gov/public/attachments/DOC-344083A1.pdf; a text copy is at
DOC-344083A1.txt). Checked by web search 2026-10-13.

- Quoted: "The scam begins when a consumer answers a call and the person at the end of
  the line asks, 'Can you hear me?' The caller then records the consumer's 'Yes'
  response and thus obtains a voice signature."
- Paraphrased: the recording can later be used to approve charges by phone. Callers
  pose as a familiar business, such as a mortgage lender or a utility. Hang up right
  away. If you've had such a call, check your bank, credit card and phone bills for
  charges you didn't make. Report it to the BBB Scam Tracker and the FCC.
- Paraphrased: the alert also warns about calls, often recorded, that ask you to press
  a button to stop getting calls. Its advice is to hang up, because pressing finds
  people to target.

**What it does and doesn't say.** The FCC presents a recorded "yes" as a *risk*, from
complaints it received. **It doesn't report a confirmed loss.** A secondary source
(Wikipedia, "Can you hear me? (alleged telephone scam)") says the BBB, the FTC and the
Consumer Federation of America have no record of anyone being defrauded this way.
That source wasn't checked against the BBB or FTC. So:

- the design doc's "Callers have recorded a 'yes' to approve charges" goes further
  than the alert. Use **"The FCC has warned that a recorded 'yes' could be used to
  approve charges"**;
- the advice ("don't say yes, hang up, don't press a number") stands either way. It
  costs nothing, and the FCC gives it;
- the alert is from 2017, before AI voice bots. Say so, as the design doc does.

```js
"can-you-hear-me-fcc": {
  text: "The FCC has warned about callers who ask 'Can you hear me?' to record you saying 'yes', which could be used to approve charges. Its advice is to hang up, and not to press a number 'to stop the calls'.",
  attestation: proposedBy(
    "FCC, 'Consumer Alert: \"Can You Hear Me\" Scams' (27 March 2017, docs.fcc.gov/public/attachments/DOC-344083A1.pdf): the caller 'records the consumer's \"Yes\" response and thus obtains a voice signature'; hang up immediately; check bills for unauthorised charges; a recorded request to press a button to stop calls is also a reason to hang up. The text says 'has warned' and 'could', because the alert reports a risk, not confirmed losses; a secondary source (Wikipedia) says the BBB and FTC have no record of anyone losing money this way (not checked against them). Predates AI voice bots. Checked by web search 2026-10-13, not opened."
  )
},
```

## 4. `chatbots-cfpb`

**CFPB, *Chatbots in Consumer Finance*, issue spotlight, June 2023** (published 6 June
2023; PDF at files.consumerfinance.gov/f/documents/cfpb_chatbot-issue-spotlight_2023-06.pdf,
web version at consumerfinance.gov/data-research/research-reports/chatbots-in-consumer-finance/).
Checked by web search 2026-10-13.

- Quoted: automated responses can leave people in "continuous loops of repetitive,
  unhelpful jargon or legalese without an offramp to a human customer service
  representative" ("doom loops").
- Quoted: even with an offramp, customers may face "unreasonable wait times" to reach a
  person. Search gave this as "unreasonable waits"; check the wording.
- Quoted: chatbots may "provide inaccurate information", fail to recognise when a
  consumer is invoking their federal rights, or fail to protect privacy and data.
- Paraphrased: chatbots raise privacy and data security risks. Bad actors build fake
  chatbots that impersonate real ones, for phishing. One search result attributed this
  line to the report: "too many vulnerabilities for these systems to be entrusted with
  sensitive customer data without appropriate guardrails". It may be a quotation the
  report cites rather than the CFPB's own words. **Don't quote it until it's seen.**
- Figures (from law-firm summaries, not the report): more than 98 million people,
  about 37% of the US population, used a bank's chatbot in 2022, rising to about
  110.9 million by 2026. Summaries disagree on the year (2022 or 2023). The design doc's
  "all ten of the largest US commercial banks use chatbots" did not appear in any
  search result. **Leave both figures out of the claim** unless the PDF is opened.

**What it does and doesn't say.** It's about chatbots in banking. Most are text
chatbots, though the category includes voice assistants. It doesn't give advice to
consumers on what to say, so the lesson's "say only what the task needs; never a
password" is the lesson's own reading, as the design doc already notes. It says
nothing about AI phone agents' honesty, or about asking "am I talking to an AI?"
**Status:** the May 2025 withdrawal of 67 CFPB guidance documents covered interpretive
rules, policy statements and advisory opinions. Coverage of it didn't name this
report, which is research, not guidance. It still appears at its research-reports
address in search results. Confirm it's still up when opening it.

```js
"chatbots-cfpb": {
  text: "Company chatbots can give wrong answers, and can trap people in loops with no way to reach a person. They also raise privacy and security risks when they handle personal information. Asking for a person is a reasonable step when a bot can't help.",
  attestation: proposedBy(
    "CFPB, 'Chatbots in Consumer Finance' (issue spotlight, June 2023; files.consumerfinance.gov/f/documents/cfpb_chatbot-issue-spotlight_2023-06.pdf): chatbots may 'provide inaccurate information'; 'doom loops' are 'continuous loops of repetitive, unhelpful jargon or legalese without an offramp to a human customer service representative'; privacy and data security risks, including fake chatbots used for phishing. The report is about banks' chatbots, mostly text; applying it to phone AI agents is the lesson's step. 'Asking for a person is a reasonable step' is a practical reading, not a quotation. Usage figures (about 37% of the US population in 2022) are left out: seen only in secondary summaries, which disagree on the year. Checked by web search 2026-10-13, not opened."
  )
},
```

## 5. `help-desk-code-scam`: found, and the call can stay

**CISA and FBI, *Scattered Spider*, Cybersecurity Advisory AA23-320A.** First
published 16 November 2023, **updated 29 July 2025**. That update is the current
version in search results, and no later one was found. Web page:
cisa.gov/news-events/cybersecurity-advisories/aa23-320a. PDF of the 2025 version:
cisa.gov/sites/default/files/2025-08/aa23-320a-scattered-spider-508c.pdf, also on IC3
at ic3.gov/CSA/2025/250729.pdf. The 2025 version is co-sealed with international
partners, which search results didn't list; check them on the PDF. Checked by web
search 2026-10-13.

- Quoted, and matched against the 2025 PDF by an exact-phrase search: Scattered Spider
  actors pose as "company IT and/or helpdesk staff using phone calls or SMS messages to
  obtain credentials from employees and gain access to the network."
- Quoted: actors posed "as IT staff to convince employees to share their one-time
  password (OTP), an MFA authentication code." The search didn't show which version
  this line is from. Check that it's still in the 2025 text.
- Quoted: they use "multiple social engineering techniques—including push bombing—and
  subscriber identity module (SIM) swap attacks, to obtain credentials, install remote
  access tools, and/or bypass multi-factor authentication (MFA)".
- Paraphrased, new in 2025: they also pose as *employees* to get help desk staff to
  reset a password and move MFA to a device they control. That's the reverse direction:
  context for facilitators, not the learner's call.

**Newer agency guidance (supporting, not needed):**

- **FBI, FLASH-20260526-01, *Silent Ransom Group Impersonating IT Personnel through
  Social Engineering*, 26 May 2026** (ic3.gov/CSA/2026/260526.pdf). Paraphrased:
  callers pose as internal IT staff, by phone or email, to get employees to open a
  remote-access session. If that fails, someone may turn up in person with a storage
  device. The group targets US law firms mainly, and also insurance, finance and
  healthcare. It's about remote access, **not codes**, so it backs "fake IT help desk
  calls happen", not the code detail.
- **NCSC, *Incidents impacting retailers: recommendations from the NCSC*, blog post,
  2025** (ncsc.gov.uk/blog-post/incidents-impacting-retailers). Paraphrased: after the
  attacks on UK retailers, it advised organisations to "review helpdesk password reset
  processes, including how the helpdesk authenticates staff members credentials before
  resetting passwords". Also the reverse direction. The exact date wasn't shown;
  coverage dates it to spring 2025.

**Verdict.** An agency source supports the professionals' call 1 ("the IT help desk"
asks for the code it just sent you). Under decision 3 (David, 2026-10-13), the call
stays, once David has opened AA23-320A and seen the OTP line in the current version.
No source says "a real help desk never asks for your code". The call's reveal should
lean on the general rule instead: never give a code on a call you didn't make
(FTC, Miller, 2024; FBI I-051525-PSA, both already cited by Essentials 1). Then check
by calling the help desk on the number you already have.

```js
"help-desk-code-scam": {
  text: "Criminals have called and texted employees while pretending to be the company's IT help desk, to get their sign-in details or the one-time code that lets them in. If 'IT' contacts you out of the blue, check by calling the help desk on the number you already have.",
  attestation: proposedBy(
    "CISA and FBI, 'Scattered Spider' (Cybersecurity Advisory AA23-320A, 16 November 2023, updated 29 July 2025): actors pose as 'company IT and/or helpdesk staff using phone calls or SMS messages to obtain credentials from employees'; posing 'as IT staff to convince employees to share their one-time password (OTP), an MFA authentication code' (check this line is in the 2025 version). Supporting: FBI FLASH-20260526-01, 'Silent Ransom Group Impersonating IT Personnel through Social Engineering' (26 May 2026): fake IT staff call employees to get remote access. 'Check by calling the help desk on the number you already have' applies the FCC's and FTC's call-back advice (answering-bot-calls); neither advisory says it in those words. Checked by web search 2026-10-13, not opened."
  )
},
```

## 6. The political-robocall waiver (facilitator note, US groups)

**FCC Consumer and Governmental Affairs Bureau, Public Notice DA 26-940, released
4 September 2026, CG Docket No. 02-278**, "CGB Seeks Comment on Political Calls and P2P
Systems Petitions" (docs.fcc.gov/public/attachments/DA-26-940A1.pdf). Checked by web
search 2026-10-13.

- Quoted: Club for Growth seeks "a limited waiver of section 64.1200(a)(1)(iii) of the
  Commission's rules and an exemption from section 227(b)(1)(A)(iii) of the
  Communications Act". It covers noncommercial political calls to wireless numbers
  using an artificial or prerecorded voice, including an AI-generated voice. The
  petition was filed 31 August 2026.
- **Comments were due 5 October 2026; reply comments are due 19 October 2026.**
- Paraphrased, from secondary coverage, not the notice: the petition offers conditions
  taken from the landline rules. These are no more than three calls to a number in 30
  days, an automated opt-out, and a do-not-call list. The same notice also seeks
  comment on a separate petition from Joe Shields.
- AP, 7 October 2026 (carried by HuffPost, TV News Check, the Washington Times and
  others): the FCC "could rule on it as soon as late October". Commissioner Anna Gomez
  opposes it. No statement from Chairman Carr turned up.

**Status on 2026-10-13: pending.** No order, grant or denial was found. The record is
still open until 19 October. ECFS couldn't be opened, so a filing from the last few
days could have been missed. **Check again at build time, and again before any
session that runs close to the 3 November 2026 election.** If it's granted, the
abstract table's "US federal rules" row is unchanged: the waiver touches consent, not
caller identity. It's adults only, never in the students track.

```js
"political-ai-calls-waiver": {
  text: "In the US, the FCC is considering a request to let political groups make recorded or AI-voice calls to cell phones without consent before the November 2026 election. As of 13 October 2026 it had not decided.",
  attestation: proposedBy(
    "FCC CGB Public Notice DA 26-940 (4 September 2026, CG Docket No. 02-278): Club for Growth petition (filed 31 August 2026) for a limited waiver of 47 CFR § 64.1200(a)(1)(iii) and an exemption from 47 U.S.C. § 227(b)(1)(A)(iii), for noncommercial political calls to wireless numbers using an artificial or prerecorded voice, including an AI-generated voice; comments due 5 October, replies 19 October 2026. AP (7 October 2026): a ruling could come as soon as late October. Time-limited: re-check before every use, and withdraw or reword after a decision. Facilitator note for adult US groups only. Checked by web search 2026-10-13, not opened."
  )
},
```

## 7. FCC 24-84: still only a proposal

- **47 CFR § 64.1200 (eCFR).** Couldn't be opened. Search results showed Title 47 "up
  to date as of 7/20/2026" and "last amended 7/13/2026". That date is for the whole
  title, not this section. The gaps note read the section on 2026-10-08: "last amended
  25 March 2026", with no AI-disclosure duty (searched for "artificial intelligence" and
  "AI-generated"). Nothing found today contradicts that.
- **FCC 24-84** (NPRM and NOI, adopted 7 August 2024, CG Docket No. 23-362). No
  Report and Order adopting the disclosure duty was found in any result. Secondary
  sources (vendor compliance guides, not FCC documents) say no final rule had been
  adopted as of September 2026.
- **Conclusion:** still a proposal, as far as can be told without opening ECFS or the
  eCFR. `ai-disclosure-laws` ("US federal rules require … who is calling, but not that
  it uses AI") stands. Open the eCFR section at build time and search it again for
  "artificial intelligence".

## 8. Ofcom and 7726 for calls: could not check

The Ofcom pages couldn't be opened, because the session's network policy blocked
ofcom.org.uk. So it's unknown whether the bot check the Essentials 1 session met is
still there. **Mark it "could not check".** For the record, search results quoted
Ofcom's page *What to do about a scam call, text or message*
(ofcom.org.uk/phones-and-broadband/scam-calls-and-messages/7726-reporting-scam-texts-and-calls)
as saying you can report scam calls on mobiles to 7726 as well as texts. Doing so
"alerts your mobile provider to investigate the number and potentially block it". The
summary added that texts to 7726 are free, and that scam calls more generally go to
Report Fraud. **No claim is proposed.** `report-scams` (Essentials 1) covers texts to
7726 from the NCSC, and stays as it is until someone opens Ofcom's page in a browser.

## 9. Answer keys (drafts; the calls aren't written yet)

The wording follows Essentials 1's keys. Each rationale names the checks David makes
once the calls and the sorter exist.

```js
"e3-key-educators": {
  text: "The answer key for the Essentials 3 educators calls is reasonable: each pause point's best choice follows from the FCC's and FTC's advice on unexpected calls, and from the CFPB's findings on company chatbots.",
  attestation: proposedBy(
    "The calls are made up. Call 1 ('district payroll' asking to confirm bank details): check that the best choices are let it go to voicemail or hang up, don't say 'yes', never give the details, and call back on the official number (answering-bot-calls; can-you-hear-me-fcc; FBI IC3 I-091726-PSA on spoofed names and numbers). Call 2 (calling a supplier's official order line): check that the AI says it's an AI, the best choices give only what the task needs, keep any password back, and ask for a person after it gets the problem wrong (chatbots-cfpb). Check that the best choice isn't in the same position at every pause. Judgements, not facts."
  )
},
"e3-key-professionals": {
  text: "The answer key for the Essentials 3 professionals calls is reasonable: each pause point's best choice follows from the FCC's and FTC's advice on unexpected calls, CISA's advisory on fake IT help desk calls, and the CFPB's findings on company chatbots.",
  attestation: proposedBy(
    "The calls are made up. Call 1 ('the IT help desk' asking for the code it just sent): check against help-desk-code-scam (CISA/FBI AA23-320A) and the rule that no one who calls you gets a code (FTC, T. Miller, 8 July 2024; FBI IC3 I-051525-PSA); the best choice is to hang up and call the help desk on the number you already have. Call 2 (calling an insurer about a claim): give the claim number, not a password; ask for a person when it loops (chatbots-cfpb). Check that the key isn't positional. Judgements, not facts."
  )
},
"e3-key-students": {
  text: "The answer key for the Essentials 3 students calls is reasonable: each pause point's best choice follows from the FCC's advice on unexpected calls, and every 'hang up' choice names a trusted adult.",
  attestation: proposedBy(
    "The calls are made up, about the learner's own phone, and ask no student to make a call or record their voice (docs/student-safety.md). Call 1 ('your phone company', 'Can you hear me?', then the account PIN): don't say yes, never give the PIN, hang up and tell a trusted adult (can-you-hear-me-fcc; FCC guide: never share 'passwords, PINs'). Call 2 (a parent or carer calls the phone company with the student; the AI asks for the account password): keep the password back; ask for a person (chatbots-cfpb). The tests should require a trusted adult in every students 'hang up' choice. Judgements, not facts."
  )
},
"e3-key-say": {
  text: "The answer key for the Essentials 3 sorter is reasonable: questions and refusals are fine on any call; your name, reason, order or claim number and a code your bank sends are only for a call you made to the official number; passwords, PINs, a code on a call you didn't make, 'yes' to 'Can you hear me?' and agreeing to move money are never said on a call.",
  attestation: proposedBy(
    "Follows the FCC's guide (never share account numbers, Social Security numbers, passwords or PINs; call back on an official number), the FCC's 2017 'Can You Hear Me' alert, the FTC (T. Miller, 8 July 2024: no real fraud team asks for a code or tells you to move money), and the CFPB on chatbots. The middle bin is a judgement: on a call you made to the official number, some banks send a code to confirm it's you, so 'a code your bank sends' is placed there, not under 'never'. No source says this in those words; attest it as reasonable, not as quoted."
  )
},
```

## 10. Claims reused from Essentials 1, and two that aren't in `claims.js` yet

- In `claims.js` and reusable as they are: `ai-voice-calls`, `answering-bot-calls`,
  `ai-disclosure-laws`, `ai-fraud-fbi`, `report-scams`, `uk-159`.
- **`bank-fraud-call-ftc` is not in `claims.js`.** It's drafted only in
  `docs/essentials-gaps-ai-calls-and-security.md` (line 236). The design doc lists it
  as a reuse. The build has to add it as a new model proposal, re-checking FTC Miller
  (2024) and FBI I-051525-PSA.
- `fcc-ai-voice-tcpa` is also drafted only in the gaps note. Its content is covered by
  `ai-disclosure-laws`, so it isn't needed.

## 11. References (APA 7th, house style)

**Already in `sources.js`.** At build time, add `15` to their `lessons`:

- Federal Bureau of Investigation. (2024, December 3). *Criminals use generative
  artificial intelligence to facilitate financial fraud* (Public Service Announcement
  I-120324-PSA). Internet Crime Complaint Center. https://www.ic3.gov/PSA/2024/PSA241203
- Federal Communications Commission. (2026, February 27). *Stop unwanted robocalls and
  texts* [Consumer guide]. https://www.fcc.gov/consumers/guides/stop-unwanted-robocalls-and-texts
- Federal Bureau of Investigation. (2025, May 15). *Senior US officials impersonated in
  malicious messaging campaign* (Public Service Announcement I-051525-PSA). Internet
  Crime Complaint Center. https://www.ic3.gov/PSA/2025/PSA250515
- Miller, T. (2024, July 8). *Got a call about fraud activity on your bank account? It
  could be a scammer*. Federal Trade Commission, Consumer Advice.
  https://consumer.ftc.gov/consumer-alerts/2024/06/got-call-about-fraud-activity-your-bank-account-it-could-be-scammer
- Federal Trade Commission. (2023). *Robocalls*. Consumer Advice.
  https://consumer.ftc.gov/articles/robocalls
- European Parliament & Council of the European Union. (2024). Regulation (EU)
  2024/1689 (Artificial Intelligence Act). *Official Journal of the European Union, L
  series*. https://eur-lex.europa.eu/eli/reg/2024/1689/oj
- Utah Legislature. (2025). *Generative artificial intelligence — consumer disclosures
  and enforcement*, Utah Code § 13-77-103 (enacted by S.B. 226, 2025 General Session).
  https://le.utah.gov/xcode/Title13/Chapter77/13-77-S103.html
- Federal Communications Commission. (2024). *Implications of artificial intelligence
  technologies on protecting consumers from unwanted robocalls and robotexts*
  (Declaratory Ruling, FCC 24-17, CG Docket No. 23-362).
  https://docs.fcc.gov/public/attachments/FCC-24-17A1.pdf

**New, in `sources.js` shape** (`lessons: [15]`):

```js
{ lessons: [15], apa: "Consumer Financial Protection Bureau. (2023, June). *Chatbots in consumer finance* [Issue spotlight].", url: "https://files.consumerfinance.gov/f/documents/cfpb_chatbot-issue-spotlight_2023-06.pdf" },
{ lessons: [15], apa: "Cybersecurity and Infrastructure Security Agency & Federal Bureau of Investigation. (2025, July 29). *Scattered Spider* (Cybersecurity Advisory AA23-320A; first published November 16, 2023).", url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-320a" },
{ lessons: [15], apa: "Federal Bureau of Investigation. (2026, May 26). *Silent Ransom Group impersonating IT personnel through social engineering* (FBI FLASH-20260526-01). Internet Crime Complaint Center.", url: "https://www.ic3.gov/CSA/2026/260526.pdf" },
{ lessons: [15], apa: "Federal Communications Commission. (2017, March 27). *Consumer alert: \"Can you hear me\" scams*.", url: "https://docs.fcc.gov/public/attachments/DOC-344083A1.pdf" },
{ lessons: [15], apa: "Federal Communications Commission, Consumer and Governmental Affairs Bureau. (2026, September 4). *Consumer and Governmental Affairs Bureau seeks comment on political calls and P2P systems petitions* (Public Notice DA 26-940, CG Docket No. 02-278).", url: "https://docs.fcc.gov/public/attachments/DA-26-940A1.pdf" },
{ lessons: [15], apa: "National Cyber Security Centre. (2025). *Incidents impacting retailers – recommendations from the NCSC*.", url: "https://www.ncsc.gov.uk/blog-post/incidents-impacting-retailers" },
```

Notes on these entries:

- **AA23-320A authors:** the 2023 advisory was CISA and FBI. The 2025 update lists
  international co-sealers that search results didn't show. Copy the author list from
  the PDF's first page. The house style then lists every agency, as for AA25-203A.
- **DA 26-940's title** is the FCC's short page title ("CGB Seeks Comment on Political
  Calls and P2P Systems Petitions"), written out. Take the full caption from the PDF.
- **The NCSC blog's** exact date wasn't shown. Add it from the page.
- **The AP article** (7 October 2026) is context only, not a claim source. If the
  facilitator note cites it: Associated Press. (2026, October 7). *FCC considers
  allowing more political robocalls before midterms, including those created with AI*.
  Take the URL from the outlet actually read.
- If Wikipedia's "Can you hear me?" note is ever cited, cite the BBB or FTC page it
  relies on instead, once opened.

## 12. Could not be supported, or not checked

1. **No page was opened.** The network policy blocked every host. Every quote needs
   checking on the page before David attests. To open them, the hosts must be added to
   the environment's allowed domains.
2. **"Callers have recorded a 'yes' to approve charges"** (design doc, "Don't" table)
   goes further than the FCC's 2017 alert, which warns it *could* happen. Reword it as a
   warning (claim 3).
3. **"All ten of the largest US commercial banks use chatbots"** and **"about 37% in
   2022"** (design doc, CFPB line): not found in any search result, or only in secondary
   summaries that disagree on the year. Leave them out unless the PDF is opened.
4. **The FCC's voicemail password is about hacking**, not voice cloning. Teach it under
   E3.4 without saying the FCC links it to copied voices.
5. **"A real IT help desk never asks for your code"**: no agency source says that. Use
   "no one who calls you gets a code" (FTC, FBI) instead.
6. **Ofcom 7726 for calls:** could not check. No claim.
7. **The political waiver** is pending and time-limited. Check it again at build time
   and before any session near 3 November 2026.
8. **FCC 24-84** looks like it's still a proposal, but the eCFR and ECFS weren't
   opened today. Check again at build time.
9. **A UK rule on AI disclosure** for calls still hasn't been researched. The abstract
   table keeps no UK row, as the design says.
