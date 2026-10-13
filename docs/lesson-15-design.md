# Essentials 3: Talking With AI on the Phone. Design

**Category:** an essential, like Essentials 1 and 2. It will be `lessons/lesson-15.js`
(`n: 15`, `label: "Essentials 3"`, objective ids `E3.`). Working title.

**Status:** objectives approved by David on 2026-10-13, with "what to say and what not
to say" added at his request the same day. **Not registered yet:** the lesson file, the
hub entry, a `--l15` colour and the CLAUDE.md rows wait until the Essentials 2 build
(running in a separate session) has merged, so the two pieces of work don't clash in
`course.js`, `course.css` and `CLAUDE.md`. Next after that: warm-up and check.

**Why its own essential (David, 2026-10-13):** AI voice on the phone reaches past
scams. Essentials 1 teaches spotting a scam call and checking it another way, and
lists what to do if a call might be a bot. Essentials 3 builds on that, without
repeating it: practice on made-up calls, honest company bots, what to say and what
not to say, and protecting your own voice.

## Objectives (approved 2026-10-13)

- **E3.1** *(understand)*: Explain what an AI voice can do on a call, and what the law
  where you live says it must tell you.
- **E3.2** *(apply)*: Respond safely to a call that might be a bot: decide whether to
  answer, what not to say, when to hang up, and how to call back on an official number.
- **E3.3** *(evaluate)*: Decide what to say to a company's AI agent, what to keep to
  yourself, and when to ask for a person instead.
- **E3.4** *(apply)*: Protect your own voice from being copied: limit public
  recordings, lock your voicemail, and agree a family secret word.

Readability (`tests/lib/readability.js`): grade 9.0 together, against a ceiling of 11;
the longest sentence is 31 words (limit 35).

E3.2 deepens Essentials 1's "If a call might be a bot" table with practice: a
written-out call, decided moment by moment. E3.1's political calls are context for
adults only, not the students track.

## What to say, and what not to say (David, 2026-10-13)

Drafted for the warm-up, check and stages. Each line names its source. All sources
were opened on the date shown; claims go into `claims.js` as model proposals only
when the lesson is built.

**Never say or give on a call you didn't make, to a person or a bot:**

| Don't | Why | Source |
|---|---|---|
| A verification code | It lets someone into your account. No real fraud team asks for one. | FTC, Miller (8 Jul 2024); FBI IC3 I-051525-PSA |
| Account numbers, Social Security numbers, passwords or PINs | "Never share" them over the phone. | FCC, *Stop Unwanted Robocalls and Texts* (reviewed 27 Feb 2026), read 2026-10-13 |
| "Yes" to "Can you hear me?" | Callers have recorded a "yes" to approve charges. Hang up. | FCC, *Consumer Alert: "Can You Hear Me" Scams* (27 Mar 2017), read 2026-10-13. Predates AI voice bots; say so. |
| Agreement to move money, buy gift cards, or pay now | Real banks and agencies never ask for that on a call. | FTC, Miller (2024); FBI IC3 I-091726-PSA (17 Sep 2026) |
| Pressing a number "to stop the calls" | It can lead to more calls. | FTC, *Robocalls* (2023); FCC 2017 alert |

**Things worth saying:**

| Say | When | Source |
|---|---|---|
| "Am I talking to a person or an AI?" | Any call. An honest business should tell you (the EU requires it from 2 Aug 2026; Utah when you clearly ask). A scam bot may lie, so the answer proves nothing. | EU AI Act Art. 50; Utah Code § 13-77-103; claim `ai-disclosure-laws` |
| "I'd like to speak to a person." | A company's bot can't help, gets it wrong, or loops. | CFPB, *Chatbots in Consumer Finance* (June 2023): wrong answers, privacy risks, "doom loops" with no way out to a human |
| "I'll call you back on the official number." Then hang up. | Anyone who claims to be your bank, a company or the government. | FCC guide (2026) |
| Your family secret word (or ask for theirs) | A call in a loved one's voice. | FBI IC3 PSA I-120324-PSA (3 Dec 2024) |

**With an honest company's AI agent** (a call you made, on the official number): say
only what the task needs. Describe the problem in your own words. Don't read out a
full card number, a password or a code unless you're sure you dialled the official
number yourself, and even then, never a password. The CFPB report found chatbots
handling sensitive data raise privacy and security concerns. (This last paragraph is
practical advice drawn from the sources, to be checked again at build time.)

**Not included, because no agency source was found:** "don't speak at all, or a bot
will copy your voice". The FBI's advice is to limit *public* recordings of your voice
(E3.4), not to stay silent on calls.

## Sources checked for the objectives (2026-10-13)

- Federal Bureau of Investigation. (2024, December 3). *Criminals use generative
  artificial intelligence to facilitate financial fraud* (I-120324-PSA). "Limit online
  content of your image or voice"; "create a secret word or phrase with your family";
  "criminals obtain access to bank accounts using AI-generated audio clips of
  individuals and impersonating them." https://www.ic3.gov/PSA/2024/PSA241203
- Consumer Financial Protection Bureau. (2023, June). *Chatbots in consumer finance*
  [Issue spotlight]. All ten of the largest US commercial banks use chatbots; about 37%
  of the US population used a bank's chatbot in 2022; "doom loops" without an offramp
  to a human. https://files.consumerfinance.gov/f/documents/cfpb_chatbot-issue-spotlight_2023-06.pdf
- Federal Communications Commission. (2017, March 27). *Consumer alert: "Can you hear
  me" scams*. https://docs.fcc.gov/public/attachments/DOC-344083A1.pdf
- Federal Communications Commission. (2026, February 27). *Stop unwanted robocalls and
  texts* [Consumer guide]: "Set up strong passwords for your voicemail"; "Never share
  account numbers, Social Security numbers, passwords, PINs".
  https://www.fcc.gov/consumers/guides/stop-unwanted-robocalls-and-texts
- Already checked for Essentials 1 (2026-10-08 to 10-13): FCC 24-17 and 24-84, EU AI
  Act Art. 50, Utah § 13-77-103, California B.O.T. Act, FTC *Robocalls*, FTC Miller
  (2024), FBI I-051525-PSA and I-091726-PSA. See
  `docs/essentials-gaps-ai-calls-and-security.md`.

## Warm-up and check (drafted 2026-10-13, awaiting David)

One pre and one post item per objective. Learner questions measure grade 2.2 and the
facilitator notes 3.2 (ceilings 7); the longest sentence is 20 words.

**Warm-up (5 min)**

- **w1 (E3.1):** "A friendly caller sounds completely human. Could it be a computer? Would it
  have to tell you?" *Expected:* Most say they'd hear a robot. Note who says AI can
  sound human, or that it might not tell you.
- **w2 (E3.2):** "A caller asks, 'Can you hear me?' What's the harm in saying yes?"
  *Expected:* Most say none. Note who says they'd hang up, or that a recorded yes can be
  misused.
- **w3 (E3.3):** "You call your bank and an AI answers. It asks for your password to help
  you faster. Is that OK, because you called them?" *Expected:* Most say yes. Note who
  says never give a password, or who would ask for a person.
- **w4 (E3.4):** "How could someone get a copy of your voice?" *Expected:* Most say only
  by hacking. Note who mentions videos or voice notes they've posted online.

**Check (10 min)**

- **p1 (E3.1):** "Name two things an AI voice can do on a call. Does a business's AI have
  to tell you it's an AI?" *Crit:* Names two: sound human, copy a real person's voice,
  answer questions, or call many people at once. Says the rule depends on where you
  live, and that scam bots ignore it. Reteach if they think a bot always sounds like a
  robot.
- **p2 (E3.2):** "A caller says it's your bank. It asks, 'Can you hear me?' Then it asks
  you to confirm your account number. What do you do, and what do you not say?"
  *Crit:* Hangs up without saying yes or giving the number. Doesn't press any keys.
  Calls back on the number on their card or statement. Reteach if they'd say yes to be
  polite, or give part of the number.
- **p3 (E3.3):** "You call a company's official number and an AI answers. It keeps
  getting your problem wrong. What do you say, and what do you keep to yourself?"
  *Crit:* Asks for a person. Describes the problem in their own words. Gives only what
  the task needs, and never a password. Reteach if they'd share a password, or keep
  going round in circles.
- **p4 (E3.4):** "Give three ways to make it harder for someone to copy your voice or
  use it to fool your family." *Crit:* Limits public videos and voice notes, or sets
  accounts to private. Sets a strong voicemail password. Agrees a family secret word.
  Students do this with a parent or carer. Reteach if they think only famous people's
  voices get copied.

**Exit ticket:** "How useful was today for handling calls from AI? (1 = not at all,
5 = very)" and "What will you say, or not say, on your next unexpected call?"

Two deliberate choices: p3 says "never a password" but not "never a code", because on
a call *you* made to the official number some banks do send a code to confirm it's you
(the FTC's "no caller will ever ask" is about calls to you). And "call many people at
once" in p1 rests on robocalls being mass calls by definition (FCC 24-17), not on any
count of AI scam bots.

## Students track (to design)

Per `docs/student-safety.md`: calls about the learner's own phone, games and school;
nothing asks a student to call anyone or record their voice; a trusted adult in every
"hang up" step; E3.4 done with a parent or carer; no political calls. AI voice
companions are covered in Lesson 11 and not repeated here.

## Next

1. After Essentials 2 merges: create `lessons/lesson-15.js` with these objectives,
   `ready: false`; register it in `course.js`; add `--l15` (both themes); update
   CLAUDE.md.
2. Warm-up and check: one pre and one post item per objective, for David's review.
3. Stage design. A likely concrete stage: a written-out call that pauses at each
   decision (answer? say this? hang up?), per track. It may need a new tool (Opus).
