# Lesson 6: UX/UI: judging what AI builds. Design

**Status:** approved 2026-09-24, defect lists and frame rules added and approved the same day. Build on **Opus** (it adds a new tool). Wording
lives in `lessons/lesson-06.js` once built; this file is the plan. Any change
goes back into this file first.

**Timing:** warm-up 5, concrete 12, pictorial 10, abstract 8, check 10.

**Objectives** (approved 2026-09-24, in `lessons/lesson-06.js`):

- 6.1 *(understand)*: Explain in plain language what each usability goal and
  design principle asks of a screen.
- 6.2 *(analyze)*: Identify which design principle an AI-built screen breaks,
  and which usability goal suffers.
- 6.3 *(evaluate)*: Judge an AI-built screen against the usability goals, and
  decide what to fix first.

## The two lists (David's, 2026-09-24)

**Usability goals**: how you know a screen works (Nielsen's five components).

| Goal | The question it asks |
|---|---|
| Learnability | Can a first-time user get to grips with it? Consistency and information architecture help. |
| Efficiency | Once they know it, how fast can they finish a task? |
| Memorability | After time away, can they pick it up again? |
| Errors | How many mistakes, how severe, and how easy to recover from? Links to user control. |
| Satisfaction | Is it pleasant and enjoyable, or frustrating? |

**Design principles**: how you get there. Accessibility and wellbeing are named
here and taught in depth in Lesson 7.

| Principle | The question it asks | Mainly serves |
|---|---|---|
| User-centricity | Is it built around the user's task and words, not the system's? | Satisfaction, learnability |
| Consistency | Does the same thing look and act the same everywhere? | Learnability, memorability |
| Hierarchy | Do size, weight, colour and space show what matters most? Includes clarity and simplicity. | Efficiency, learnability |
| Context | Does the user always know where they are and what just happened? Includes feedback. | Errors, memorability |
| User control | Can they go back, undo and cancel? Includes freedom to explore and constraints. | Errors, satisfaction |
| Accessibility | Can everyone use it? (Lesson 7.) | All five |
| Usability | Can a real person get the task done with little effort? | Efficiency, errors |

David's earlier eleven qualities fold into these: feedback under context,
freedom to explore and constraints under user control, clarity and simplicity
under hierarchy, enjoyability under satisfaction, efficiency and learnability as
goals. Wellbeing (mindful UX) is the eighth principle, taught in Lesson 7.

## Warm-up (pre) and check (post)

| id | Obj | Question | Expect / Reteach if |
|---|---|---|---|
| w1 | 6.1 | "What makes an app easy to use? Name two things." | Most say "it looks nice" or "it's fast." Note who mentions knowing what to do next, or being told when something worked. |
| w2 | 6.2 | "You used an app that felt wrong, but you couldn't say why. What might have been wrong with it?" | Most say "it was confusing." Note whether anyone can name a specific cause. |
| w3 | 6.3 | "An AI builds you an app screen in one minute, and it looks polished. How much should you trust it?" | Most say "it looks finished, so it's fine." That is the belief the lesson tests. |
| p1 | 6.1 | "Explain what 'user control' asks of a screen. Give one example." | **Reteach if** they describe the designer being in control, or only a settings page. A pass says users can go back, undo or cancel, with an example such as undoing a delete. |
| p2 | 6.2 | "An AI-built checkout shows a spinner after you press Pay, then goes blank. Which principle does it break, and which goal suffers?" | **Reteach if** they say "it's confusing" or name no principle. A pass says context: the user can't tell what happened. Accept errors or satisfaction as the goal, with a reason. |
| p3 | 6.3 | "An AI-built screen has three problems: (a) the Submit button is small; (b) nothing happens after you press it; (c) the page title is a slightly different blue on each page. Which do you fix first, and why?" | **Reteach if** they fix (a) or (c) first, or say "all of them." A pass fixes (b) first: every user is left unsure it worked. It says why (c) comes last. |

**Exit ticket:** Lesson 1's rating word for word. Open: "Which principle will you
check first on the next screen an AI builds for you?"

## Concrete: "Use the screen. Find what it gets wrong" (12 min; 6.2)

Each track gets a small AI-built form learners can really click and fill in,
shown in a sandboxed frame, with six numbered parts. Five each break a
different principle and one works fine. Each track uses a different five of the
seven, so the abstract stage is where all of them come together. Learners tag
each part with a principle; each reveal names the goal that suffers and says how
you could tell. A "Text version of this screen" fold lists every part in words.
Order is shuffled per track.

| Track | Screen | Example defects |
|---|---|---|
| Educators | Parent-teacher conference sign-up | Nothing confirms the booking (context). Two names for the same button (consistency). |
| Professionals | Expense-report form | The main action is lost among equal-weight controls (hierarchy). A deleted line item can't be undone (user control). |
| Students | Club registration page | Errors shown only in red (accessibility). Jargon labels (user-centricity). |

**Defect lists (approved 2026-09-24).** Each principle appears in exactly two
tracks, so the three tracks together cover all seven. The part that works sits
in a different position in each track. Each defect also carries how bad it is
(low, medium, high) and how many users it hits (few, some, all) for the pictorial.

| Track | Part | Principle | Harm | Reach |
|---|---|---|---|---|
| Educators | Title "Slot Allocation Module v2" | user-centricity | low | all |
| Educators | Menu says "Book a slot", the button says "Reserve" | consistency | low | some |
| Educators | "Your child's name" field | (works) | | |
| Educators | "Bookings are final", no way to change one | user control | medium | some |
| Educators | Big bold Cancel beside a small grey Reserve | hierarchy | medium | all |
| Educators | Reserve empties the form, nothing confirms it | context | high | all |
| Professionals | Submit lost among six equal buttons | hierarchy | medium | all |
| Professionals | Date field with a calendar | (works) | | |
| Professionals | The amount asked for three times | usability | low | all |
| Professionals | Attach receipt shows no sign it worked | context | high | all |
| Professionals | Required fields marked only in red | accessibility | high | few |
| Professionals | Delete removes a line with no warning and no undo | user control | high | some |
| Students | "Next", "Continue" and "Proceed" for the same step | consistency | low | all |
| Students | 12 required fields to join a club | usability | medium | all |
| Students | A field in error shown only by a red border | accessibility | high | few |
| Students | Label "Enter UID per SIS" | user-centricity | medium | some |
| Students | Email field | (works) | | |
| Students | No Back button; going back clears your answers | user control | high | some |

**Frame rules (approved 2026-09-24).** Each mock sits in an `iframe` with
`sandbox="allow-scripts"` and no `allow-same-origin`, a `title`, and its content
inline in `srcdoc` with no external URLs. It is designed at about 340px and
reflows, so it never needs a sideways scroll. A "Text version of this screen"
lists every numbered part in words, so the whole exercise works without the
frame. The mocks are meant to be flawed and sit outside `ui-audit.js`; the tests
check the frame markup instead.

## Pictorial: "What to fix first" (10 min; 6.3)

A 3×3 grid: how bad a defect is (low, medium, high) against how many users it
hits. Learners place the five defects, then reveal the finished grid. Drawn as an
SVG and as a table on narrow screens, with an `aria-label` naming each defect and
where it lands. The finding: a silent Submit button and a small target are not
equally urgent.

## Abstract: "The goals and principles" (8 min; 6.1, 6.2, 6.3)

Both reference tables above, five principle claims, and a five-line design brief
each learner writes for their next AI request, using Lesson 2's four parts.

## New tool: `screen-frame`

A sandboxed frame (`sandbox`, a `title`, no network, no external URLs) holding
the track's mock screen, beside the numbered parts with their reveals. The
"Text version" fold carries the same information as the frame. The screens are
meant to be flawed, so they sit outside `ui-audit.js`; a test checks the frame
markup instead (sandbox present, title present, no external requests, a text
version for every numbered part).

## New claims (all `source: "model"`)

- `usability-goals`: the five, after Nielsen and ISO 9241-11.
- `design-principles`: the set as a teaching frame, not a standard list.
- `context-principle`: show what happened and where the user is (Nielsen, visibility of system status).
- `user-control-principle`: users can go back, undo and cancel (Nielsen, user control and freedom).
- `ai-ui-polish`: an AI-built screen can look finished while leaving out states, labels and accessibility unless asked. Needs David's judgement.
- `l6-key-educators`, `l6-key-professionals`, `l6-key-students`.

## Later: a lesson series (David, 2026-09-24)

The goals and principles in the abstract stage also become their own set of
lessons in the companion module ("UX/UI for AI builders"), for example one
short lesson per goal or principle. Lesson 6 keeps them as the overview. The
series is not designed yet; it starts at the backward-design gate. Lesson 6 is
also meant as a reusable UX/UI foundation for David's other projects.

## Knock-on changes

The course is now seven lessons: hub copy, `--l6` (olive green) and `--l7`
(chocolate) colours, and CLAUDE.md are already updated. The claims handover to
David waits until Lesson 7 ships.
