# Essentials 2: Keeping Your Devices and Accounts Safe. Design

**Category:** an essential, like Essentials 1. Behind the scenes it is
`lessons/lesson-14.js` (`n: 14`, `label: "Essentials 2"`, objective ids `E2.`).
Colour `--l14` rust (#9A3412 light, #FDBA74 dark).

**Status:** objectives approved 2026-10-12; warm-up and check approved and added
2026-10-13. **Stage design approved by David 2026-10-13, with a new `requests` exercise.** Next: build it. The ranking, the
reasons for each topic and the checked sources are in
`docs/essentials-gaps-ai-calls-and-security.md` (Part 2).

## Objectives (approved 2026-10-12)

- E2.1 *(apply)*: Turn on automatic updates, and install security updates promptly,
  on your own phone, computer and apps.
- E2.2 *(evaluate)*: Judge whether an AI app, browser extension or "connect your
  account" request is genuine, from where it came from and what it asks to see,
  before you install it or say yes.
- E2.3 *(apply)*: Recover a hacked account in order: get back in through the real
  site, lock it, remove access you didn't give, and warn your contacts.

Prompt injection moved to the companion module "UX/UI for AI builders".

## Stages (approved 2026-10-13)

**Timing:** warm-up 5, concrete 12, pictorial 10, abstract 8, check 10 (45, as the
course requires).

### Concrete · "Yes, no, or check first?" (12 min), E2.1 and E2.2

A new exercise, **`requests`**: five made-up things a phone or computer asks of you,
written out as they'd appear on screen. For each, the learner chooses **Say yes**,
**Say no** or **Check first**, names what they looked at (where it came from, what it
asks to see, a rush), and says how they'd check. Three answers, not two, so learners
practise the middle habit: not panic, not click, check.

Every track has, in a different order (keys not positional):

- a **real update** from the device's own settings (key: yes);
- a **fake update** on a website: "Your browser is out of date. Download the update"
  (key: no; updates come from settings or the official store, never a web page);
- an **AI app or extension** from an ad or with a "Featured" badge (key: check first:
  find it on the official store or the company's own site);
- a **"connect your account" screen** that asks for more than the job needs, such as
  reading and sending all your email for a tool that writes one reply (key: no, or
  check first);
- one more that fits the track, with at least one more "yes" so learners don't mark
  everything as a threat.

Track contexts (only the concrete stage varies by track):

- **Educators:** a classroom laptop's update; an "AI grading helper" extension that
  asks to read every website; an AI quiz app asking to connect to the school account
  and read and send email. Student data comes up in the check.
- **Professionals:** a work laptop's update; an "AI meeting notes" app asking for
  calendar, email and contacts; an AI sidebar extension (the real case OX Security
  reported: fake AI sidebars with about 900,000 users, one "Featured").
- **Students:** a phone's update; an "AI homework helper" app from an ad; a
  "connect your game account" request. Per `docs/student-safety.md`: about the
  learner's own devices and accounts, nothing to install or type in, a trusted adult
  named in every "no" and "check first", and only tools the school allows.

**Tool:** a new exercise like the inbox, with three keys and its own "what to look
at" labels. It needs Opus. **Cheaper option:** generalise the `inbox` renderer (it
already has kinds, keys, signs, a check and a note) so it accepts other key sets.
That's less new code, but it touches a tool Essentials 1 depends on.

### Pictorial · "Get your account back, in order" (10 min), E2.3

A new builder, **`recover`**: eight recovery steps in a jumbled list. The learner puts
them in order with **Move up** and **Move down** buttons (keyboard and screen reader
friendly; no dragging), then shows the order. The tool says which steps are in the
right place, in words and shape, and why the order matters. **Start again** resets
it. Nothing is saved or sent.

The steps follow the NCSC's order ("Recovering a hacked account"), with the FBI's
step 5 added and the NCSC's "update your devices" left to E2.1. The FTC's page has
the same steps in a slightly different order, so the key should mark a step right if
it's within the accepted range rather than one fixed place. To be checked again at
build time:

1. Go to the real site's own recovery page, not a link in a message.
2. Check your email for forwarding rules you didn't set up.
3. Change the password, and any account where you used the same one.
4. Sign out of every device.
5. Remove apps and connections you didn't add (changing the password doesn't remove
   them; FBI, September 2026).
6. Turn on two-step sign-in.
7. Tell your contacts not to trust recent messages from you.
8. Check your bank and shopping accounts, and report it.

Students track: the builder is the same in every track (one core), and the facilitator
notes say students do step 0 first: tell a trusted adult.

**Tool:** new, like Lesson 12's plan builder. It needs Opus.

### Abstract · "Habits that close the doors" (8 min), E2.1–E2.3

Reference tables, all two columns:

- **Keep things updated:** turn on automatic updates; install soon; updates come from
  your settings or the official store, never a pop-up on a web page; old devices stop
  getting updates.
- **Before you install or connect:** where it came from (type the address, or use the
  official store; not an ad); what it asks to see (no more than the job needs); you
  can remove access later in your account's security settings.
- **If your account is hacked:** the recovery steps, short.
- **Where to get help:** the provider's own help pages; the UK's Report Fraud; the
  US's IdentityTheft.gov if personal information was exposed; students tell a trusted
  adult first.

### ARCS and transfer (draft)

- **Relevance:** educators protect student data on school devices; professionals
  protect work accounts and the company's data; students protect their phone, game
  and school accounts, with a trusted adult.
- **Use it this week:** turn on automatic updates on one device, and check one
  account's connected apps; students do both with a parent or carer.

## Claims the build would need (model proposals; checked again at build time)

From the Part 2 drafts in `docs/essentials-gaps-ai-calls-and-security.md`:
`updates-cisa-ncsc` (re-sourced: CISA's update pages are archived, so the NCSC first
and a current CISA page), `fake-downloads-fbi`, `fake-ai-extensions-example`,
`consent-phishing-fbi`, `recover-hacked-account`. New ones to research:

- **Fake browser-update pop-ups** as a malware lure: needs an agency source (FBI,
  CISA or NCSC) before the "fake update" item can be keyed.
- **IdentityTheft.gov** as the US route when personal information is exposed (the FTC
  page says so; to cite).

Plus an answer-key claim for each track's `requests` set and one for the `recover`
order.

## Decisions (David, 2026-10-13)

1. Stage design: **approved** as written.
2. The concrete tool: **a new `requests` exercise**; the inbox renderer stays as it is,
   so Essentials 1 is untouched.
3. The fake browser-update item stays only if an agency source is found at build time.
