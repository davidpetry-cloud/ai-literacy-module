# Essentials 1: Staying Secure in the Age of AI. Design

**Category (David, 2026-10-05):** an *essential*, not a numbered lesson: a habit anyone
needs, at any point in the course. Learners see "Essentials 1" on the hub, in its own
section below the lessons. Behind the scenes it is still `lessons/lesson-13.js`
(`n: 13`, so its page is `lesson.html?n=13`), with `category: "essentials"`,
`label: "Essentials 1"`, and objective ids starting `E1.`.

**Status:** built 2026-10-05. Objectives approved by David that day (he chose four of five drafts), then the warm-up and check, then the stage design, which he approved the same day.
Wording lives
in `lessons/lesson-13.js`; this file is the plan.

**David's direction (2026-10-05):** add a cybersecurity lesson to the course.

## Objectives (approved 2026-10-05)

- E1.1 *(understand)*: Explain how AI makes common attacks easier, such as
  convincing phishing, cloned voices and fake videos.
- E1.2 *(analyze)*: Spot the signs of an AI-assisted scam in a message, call or
  video, and check it through a second channel you trust.
- E1.3 *(apply)*: Decide what is safe to put into an AI tool, and keep private,
  work and other people's information out of it.
- E1.4 *(apply)*: Protect your own accounts with a password manager or passkeys,
  and two-step sign-in.

**Left for later:** prompt injection (hidden instructions in content an AI reads,
and limits on AI that acts for you). It matters most to people who build with AI or
use AI agents, and could become its own lesson, or part of the companion module
"UX/UI for AI builders".

## Sources to check before any claim is written

The lesson's facts should rest on security agencies' own published guidance, checked
at the time of writing, with the profession's terms (see the law-enforcement terms
rule in memory and `docs/fact-check-2026-10.md`):

- FBI Internet Crime Complaint Center (IC3): public service announcements on
  criminals using generative AI for fraud (for example voice cloning and fake
  video).
- US Cybersecurity and Infrastructure Security Agency (CISA): phishing, passkeys,
  multi-factor authentication ("More than a password").
- UK National Cyber Security Centre (NCSC): phishing, passwords, and guidance on
  using AI tools safely.
- Password and passkey guidance: NIST SP 800-63B (digital identity) and the FIDO
  Alliance on passkeys.

## Sources checked (2026-10-05)

| Fact the lesson uses | Source |
|---|---|
| Criminals use AI-written text, images, cloned voices and fake video to make fraud more believable and to run it at scale; agree a secret word or phrase with family; look for flaws in images and video | FBI IC3, public service announcement PSA241203, 3 December 2024 (ic3.gov) |
| Five signs of a scam message: authority, urgency, emotion, scarcity, current events; report suspicious emails to report@phishing.gov.uk | NCSC, "Spotting cyber attacks", Small Organisations Guide |
| Don't put confidential or sensitive information into public AI tools | NCSC, "ChatGPT and large language models: what's the risk?" (2023) |
| Passwords: at least 15 characters when used alone (8 with another factor); no forced mix of character types; no forced changes unless compromised; passkeys recognised | NIST SP 800-63B, revision 4 (2025) |
| Passkeys and FIDO are phishing-resistant: a passkey only works on the site it was made for | CISA, "More than a Password"; FIDO Alliance, "Passkeys" |

## Warm-up and check (written 2026-10-05)

Warm-ups surface four beliefs: scams are full of spelling mistakes; you'd know a
loved one's voice; pasting something into a chatbot is private; strong means
symbols and frequent changes. One check item per objective.

## Stages (approved 2026-10-05, built the same day)

**Timing:** warm-up 5, concrete 12, pictorial 10, abstract 8, check 10.

**Concrete · Check it, or trust it? (12 min), E1.1 and E1.2.** A new exercise: a
made-up inbox of five items per track (emails, texts, a voice-message transcript, a
video-call note). Learners mark each **genuine** or **scam**, name the signs (the
NCSC's five, plus AI tells such as a perfect message from an odd address, or a
familiar voice asking for secrecy), and say **how they'd check through a second
channel** (call back on a number they already have; a family code word). At least
one item is genuine, so learners practise not panicking at everything.
- Educators: a "parent" asking to change the bank details for a trip payment; a
  voice note in the head teacher's voice asking for gift cards; a genuine IT notice.
- Professionals: a "supplier" changing bank details; a video call in a director's
  voice asking for an urgent transfer; a genuine HR reminder.
- Students: a friend's account asking for money; a game "prize" asking for a
  login; a voice note from "Mum" with a new number; a genuine school reminder. The
  key names a trusted adult.

**Pictorial · What's safe to share? (10 min), E1.3.** A new sorter: about eight
made-up items (a recipe question, a homework question with no names, a friend's
message, a password, a colleague's medical note, a customer's address, a photo of
your face, a school timetable). Learners sort each into **fine for a public AI tool**
or **keep it out**, and the tool says which they got right and why, in words and
shape. Start again clears it. Nothing typed, nothing sent.

**Abstract · Habits that hold up (8 min), E1.1–E1.4.** Reference tables:
- the five signs (NCSC) and AI's new tells (FBI);
- how to check: a second channel, a family code word, never the contact details
  in the message;
- protecting accounts: a passkey where offered; otherwise a long, different
  password for each account, in a password manager; two-step sign-in (NIST, CISA);
- where to report: the UK (report@phishing.gov.uk), the US (ic3.gov); students
  tell a trusted adult.

**Use it this week:** turn on two-step sign-in or a passkey for one account, and
agree a family code word. Students do both with a parent or carer.

**Model:** Opus, for the new exercise and sorter.

## Students track

Follows `docs/student-safety.md`: scenarios are about the learner's own accounts and
messages; nothing asks a student to enter real personal details anywhere; a trusted
adult is named for anything that worries them; no student is asked to try an attack.

## Model

Opus, if the stage design adds a new tool (likely: a "verify it" exercise and a
"what's safe to share" sorter).

## Built (2026-10-05)

- The inbox has five messages per track, two of them genuine in every track, so learners practise not panicking. Each scam names its signs (the NCSC's five, plus secrecy and new details or payment, from the FBI's advice) and a second-channel check.
- The sorter has nine items. It added a ninth, a photo with location on, after David shared the FBI's podcast "Keeping Teens Safe on the Web" (4 September 2026).
- From the same podcast, the abstract adds: set accounts to private and turn off location; don't accept friend requests from strangers; ask a friend or trusted adult first; and what to do if someone threatens to share a fake image of you. Cited as the claim `fbi-teens-online`.
- Eleven claims, all model proposals awaiting David's attestation: `ai-fraud-fbi`, `scam-signs-ncsc`, `ai-tools-confidential`, `fbi-teens-online`, `passwords-nist`, `passkeys-phishing-resistant`, `report-scams`, and the answer keys `e1-key-educators`, `e1-key-professionals`, `e1-key-students`, `e1-key-share`.
- **AI voice-bot calls (David, 2026-10-08):** one scam per track was swapped for a call from an AI voice bot that isn't copying anyone the learner knows, with no new objective (E1.2 already covers calls). Educators: the coach company's bank-details email became its "automated booking assistant" asking for payment to new details (saying it's an AI doesn't make it honest). Professionals: the parcel text became a "bank fraud team" bot that asks for a code and claims to be human. Students: the prize text became "game support" asking for a code. Five messages, key orders and timings unchanged. Plan, sources and the right-to-know research: `docs/essentials-gaps-ai-calls-and-security.md`. The same day the abstract gained a "What AI changes" row ("A caller that sounds human but is a computer") and a UK row under "Where to report" (hang up, then call 159), cited as `ai-voice-calls` and `uk-159`.
