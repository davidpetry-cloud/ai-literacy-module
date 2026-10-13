# Essentials 3: Talking With AI on the Phone. Design

**Category:** an essential, like Essentials 1 and 2. It will be `lessons/lesson-15.js`
(`n: 15`, `label: "Essentials 3"`, objective ids `E3.`). Working title.

**Status:** objectives approved by David on 2026-10-13, with "what to say and what not
to say" added at his request the same day. **Not registered yet:** the lesson file, the
hub entry, a `--l15` colour and the CLAUDE.md rows wait until the Essentials 2 build
(running in a separate session) has merged, so the two pieces of work don't clash in
`course.js`, `course.css` and `CLAUDE.md`. Warm-up and check approved 2026-10-13. Stage design proposed 2026-10-13, awaiting David.

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

## Warm-up and check (approved by David 2026-10-13)

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

## Stages (proposed 2026-10-13, awaiting David)

**Timing:** warm-up 5, concrete 12, pictorial 10, abstract 8, check 10 (45).

### Concrete · "Pause the call" (12 min), E3.1, E3.2, E3.3

A new exercise, **`pause-call`**: two written-out phone calls per track. Each call stops
at three or four **pause points**. At each, the learner picks what they'd say or do from
three choices, then reveals the answer and why. It's linear, not a branching story: every
learner reads the same call, so the group can compare choices at each pause.

Each track has two calls, so learners practise both sides of the lesson:

1. **A call you didn't make**, from a bot that may be a scam (E3.2). Pauses: whether to
   answer, then "Can you hear me?", a request for a detail, then the push to act now. The
   best choices: let it go to voicemail or hang up; don't say "yes"; never give the
   detail; "I'll call you back on the official number."
2. **A call you made** to a company's official number, answered by an honest AI agent
   (E3.3). Pauses: it says it's an AI (it should; E3.1), it asks for more than the task
   needs, it gets your problem wrong twice, then it offers to finish. The best choices:
   describe the problem in your own words, keep the password to yourself, and say "I'd
   like to speak to a person."

The reveal at the first pause of call 1 says the caller was a bot, which carries E3.1
("it sounded human"). Choices are written so the best one isn't always in the same
place (keys not positional, as the tests require for every exercise).

Track contexts (only the concrete stage varies by track):

- **Educators:** call 1 is "district payroll" asking you to confirm your bank details
  for a pay update; call 2 is you calling a textbook supplier's order line.
- **Professionals:** call 1 is "the IT help desk" asking for the code it just sent you,
  to "fix your account" (a known pattern against workplaces; source to check, likely
  CISA's advisory on Scattered Spider, AA23-320A); call 2 is you calling an insurer to
  ask about a claim.
- **Students:** call 1 is "your phone company", opening with "Can you hear me?" and then
  asking for your account PIN; call 2 is a parent or carer calling the phone company
  with you, and the AI asks for the account password. Per `docs/student-safety.md`:
  made-up calls about the learner's own phone; nothing asks a student to make a call or
  record their voice; every "hang up" choice names a trusted adult.

**Tool:** new, in `lesson-core.js` beside the inbox. It needs Opus. Each pause point
gets a fieldset of radio buttons with a visible question, a toggling "Show the answer"
reveal that hands focus to the answer, and a "Start again" button; the calls are plain
text, so no audio is needed.

### Pictorial · "Say it, or keep it?" (10 min), E3.2, E3.3

A three-way sorter: twelve things you might say on a call, each sorted into **Fine on any
call**, **Only on a call you made to the official number**, or **Never on a call**. The
middle column is the lesson's real point: the same words can be fine or risky depending
on who called whom. For example:

- Fine on any call: "Am I talking to a person or an AI?", "I'd like to speak to a person",
  "I'll call you back on the official number", "No, thank you" (then hang up).
- Only on a call you made: your name and the reason you're calling, your order or claim
  number, a one-time code your bank sends to confirm it's you.
- Never: your password, your PIN, a code on a call you didn't make, "yes" to "Can you
  hear me?", agreeing to move money or buy gift cards.

**Tool:** Essentials 1's `share` sorter has two bins. Two options:

- generalise it to accept a set of keys (recommended: small, reuses a tested tool, and
  Essentials 1's two-bin sort stays the same, which its tests will prove); or
- build a new three-bin sorter.

### Abstract · "Talking with AI on the phone" (8 min), E3.1–E3.4

Two-column reference tables:

- **What an AI voice can do:** sound human; copy a real person's voice from a short
  clip; answer questions and keep a conversation going; call many people at once. And
  what it can't prove: who it is.
- **What it must tell you:** the EU (from 2 August 2026, it must say it's an AI unless
  that's obvious); Utah (if you clearly ask); US federal rules (who is calling, but not
  that it's AI); scam bots (nothing, and they lie). Learners elsewhere check their own
  rules. No UK row: no UK rule was researched.
- **Say it, or keep it:** the summary of the sorter.
- **Protect your voice:** limit public videos and voice notes, and set accounts to
  private (FBI, December 2024); set a strong voicemail password (FCC); agree a family
  secret word (FBI). Students do these with a parent or carer.

A facilitator note for US groups before an election: AI voices in political calls, and
the FCC's pending waiver petition (AP, 7 October 2026), checked again at build time.

### ARCS and transfer (draft)

- **Relevance:** educators get calls about pay, trips and student records; professionals
  get "help desk", supplier and bank calls, and use company AI lines; students get
  calls and voice notes about phones, games and school.
- **Use it this week:** set a voicemail password and agree a family secret word.
  Educators and professionals also try "Am I talking to a person or an AI?" on the next
  company line they call. Students do the first two with a parent or carer.

## Claims the build would need (model proposals; checked again at build time)

Reuse from Essentials 1: `ai-voice-calls`, `answering-bot-calls`, `ai-disclosure-laws`,
`bank-fraud-call-ftc` (drafted in the gaps note). New:

- `voice-protection-fbi-fcc`: limit public recordings, private accounts, voicemail
  password, secret word (FBI I-120324-PSA; FCC guide).
- `voice-cloning-bank-access`: criminals have used AI-generated audio of a person to get
  into their bank account (FBI I-120324-PSA).
- `can-you-hear-me-fcc`: callers have recorded a "yes" to approve charges (FCC, 2017).
- `chatbots-cfpb`: company chatbots can give wrong answers and trap people with no way to
  a human; sharing sensitive data with them carries privacy risks (CFPB, 2023).
- `help-desk-code-scam`: criminals pose as IT help desks to get sign-in codes (source to
  find and check; CISA AA23-320A is the likely one).
- Answer keys: `e3-key-educators`, `e3-key-professionals`, `e3-key-students` and
  `e3-key-say`.

## Students track

Per `docs/student-safety.md`: calls about the learner's own phone, games and school;
nothing asks a student to call anyone or record their voice; a trusted adult in every
"hang up" step; E3.4 done with a parent or carer; no political calls. AI voice
companions are covered in Lesson 11 and not repeated here.

## Open choices for David

1. Approve the stage design, or change it.
2. The sorter: generalise Essentials 1's `share` sorter to three bins (recommended), or
   build a new one.
3. The professionals' "IT help desk" call stays only if an agency source is found.

## Next

1. After Essentials 2 merges: create `lessons/lesson-15.js` with these objectives,
   `ready: false`; register it in `course.js`; add `--l15` (both themes); update
   CLAUDE.md.
2. Warm-up and check: approved 2026-10-13 (above); add them to the lesson file with the objectives.
3. Stage design: proposed above, awaiting David. Then build, in its own session on Opus
   at high effort (two tools: a new `pause-call` exercise and a three-bin sorter).
