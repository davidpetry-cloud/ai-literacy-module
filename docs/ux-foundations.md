# UX/UI foundations

David's standing UX/UI standard for every project. It comes from Lessons 6 and 7
of the AI literacy course (`lessons/lesson-06.js`, `docs/lesson-07-design.md`),
and is meant to be applied without being asked.

The course's own claims behind this list are still **Proposed** in `claims.js`
until David attests them. Treat the list as a working standard, not a cited
authority.

## The rule: UX/UI in parallel with the code

UX/UI is checked **while** code is written, as part of the same change. It isn't
a separate pass that runs later, at a different pace. A change that touches
anything a person sees or uses is not done until it has been checked against
the list below. The plan and the hand-over should say which items were checked.

## Usability goals (Nielsen, 1993): how you know it works

These five are Jakob Nielsen's usability attributes, in his order. See
"Where these come from" below for how they differ from other frameworks.

| Goal | The question it asks |
|---|---|
| Learnability | How quickly can a new user start getting things done? |
| Efficiency | Once they know it, how fast can they finish? |
| Memorability | After time away, can they use it without learning it again? |
| Errors | Are mistakes few, easy to recover from, and never a disaster? |
| Satisfaction | Is it pleasant to use? |

## Design principles (this course's set): how you get there

These eight are David's teaching set, not one scholar's list. Each draws on the
sources named in "Where these come from".

| Principle | The question it asks | In code, check that… |
|---|---|---|
| User-centricity | Is it built around the user's task and words? | Labels and titles use the user's words, not the system's names |
| Consistency | Does the same thing look and act the same everywhere? | One name per action; shared components and tokens, no one-off styles |
| Hierarchy | Do size, weight and space show what matters most? | The main action stands out; destructive actions don't |
| Context | Does the user know where they are and what just happened? | Every action shows a result: success, error, or progress |
| User control | Can the user go back, undo and cancel? | Back, undo or confirm for anything that loses work |
| Accessibility | Can everyone use it? | See WCAG below |
| Usability | Can a real person finish with little effort? | Ask for each thing once; ask only for what's needed now |
| Wellbeing (mindful UX) | Does it respect time, attention and choice? | See mindful UX below |

## Accessibility: WCAG 2.2, target level AA

Organised by the four WCAG principles (POUR), with David's practical groups.

| WCAG principle | Group | Check |
|---|---|---|
| Perceivable | Text and visuals | Contrast 4.5:1 for text, 3:1 for large text and UI parts (1.4.3, 1.4.11); colour is never the only cue (1.4.1); text alternatives (1.1.1); text resizes (1.4.4) |
| Operable | Navigation and interaction | Works by keyboard (2.1.1); visible focus (2.4.7); targets at least 24px (2.5.8); moving content can be paused (2.2.2); time limits can be extended (2.2.1) |
| Understandable | Content clarity | Labels and instructions (3.3.2); errors named in words with a fix (3.3.1, 3.3.3); consistent navigation (3.2.3) |
| Robust | Mobile and device compatibility | Controls have a name and role (4.1.2); status messages are announced (4.1.3); reflows at 320px with no sideways scroll (1.4.10, filed under Perceivable in the standard) |

Levels: **A** is the minimum, **AA** the usual target and legal reference, and
**AAA** aspirational. The W3C says AAA can't be required for whole sites.

**Contrast thresholds:**
- AA: 4.5:1 for normal text, and 3:1 for large text and UI parts.
- AAA: 7:1 for normal text, and 4.5:1 for large text.

Check with a contrast checker; never judge by eye. Test both light and dark
themes, and respect `prefers-reduced-motion`.

## Mindful UX (digital wellbeing)

- **Calmer defaults:** notifications off until asked, no autoplay, no streaks, quiet hours, sensible limits.
- **Natural pause points:** an end to lists ("you're all caught up"), pages instead of endless scroll, a stopping cue before big actions.
- **Audit for addictive patterns:** infinite scroll, autoplay, streak pressure, variable rewards, confirmshaming, hidden cancel or unsubscribe.
- **Reward care, not harm:** designs shouldn't reward manipulating, ranking or shaming people. Healthy habits, empathy and self-care are practised everywhere, at a screen, on a playground or at home.

## The principles in depth

Each principle below has four parts: what it means, how AI-built screens tend
to break it, how to check it (automatically where possible), and the usual fix.
WCAG numbers are 2.2 success criteria.

### User-centricity: the user's task, in the user's words
- **Means:** start from what the person is trying to do. Name things the way they would.
- **AI-built screens break it with:** system names as titles ("Slot Allocation Module"), database field names as labels ("UID per SIS"), features ordered by how the code is built, not how people work.
- **Check:** read every label aloud to someone outside the project. Would they know what to type or press? Search the UI strings for internal names, codes and abbreviations.
- **Fix:** rename in the user's words; order steps the way the task happens.
- **Related ideas:** *recognition over recall*, so show options rather than making people remember them; *match with the real world* (Nielsen).

### Consistency: one thing, one look, one name
- **Means:** the same action, element or word behaves and looks the same everywhere, and follows the platform's conventions.
- **AI-built screens break it with:** "Next", "Continue" and "Proceed" for one step; buttons styled differently on each page; one-off colours and sizes.
- **Check:** list every action verb in the UI and look for synonyms; check that styles come from shared tokens and components (a test can forbid raw hex colours and one-off font sizes).
- **Fix:** one word per action; shared components; design tokens.
- **WCAG link:** consistent navigation (3.2.3 AA), consistent identification (3.2.4 AA), consistent help (3.2.6 A).

### Hierarchy: what matters most looks most important
- **Means:** size, weight, colour, position and space show the order of importance. One primary action per view. Clarity and simplicity live here: remove what doesn't earn its place.
- **AI-built screens break it with:** six equal buttons; a big red Cancel beside a small grey Save; everything bold.
- **Check:** squint test (blur the screen: does the main action still stand out?); count primary-styled buttons per view (aim for one); headings in order with no skipped levels.
- **Fix:** one primary button; destructive actions quieter and set apart; *progressive disclosure*, showing advanced options only when asked.

### Context: where am I, and what just happened?
- **Means:** the system always shows its state. Every action gets a visible, timely response. Feedback lives here.
- **AI-built screens break it with:** a button that silently clears the form; an upload with no sign it worked; a spinner that never resolves.
- **Check:** for every control, write down what the user sees after using it. If the answer is "nothing", it fails. Status messages must also reach screen readers (4.1.3 AA, via a live region).
- **Fix:** confirmations ("Booked: Thursday 4:15"), progress indicators, clear current-location cues (page title, active tab, breadcrumb).
- **Timing rule of thumb** (Nielsen's response-time limits): under 0.1s feels instant; about 1s keeps the flow; past about 10s, show progress and let people do something else.

### User control: back, undo, cancel
- **Means:** people can leave, reverse and recover. Error prevention lives here: stop mistakes before they happen, and make them cheap when they do.
- **AI-built screens break it with:** "bookings are final"; delete with no undo; no Back button; going back wipes the form.
- **Check:** for every destructive or irreversible action, is there undo, a confirmation, or both? Does Back keep what the user typed?
- **Fix:** undo (better than "Are you sure?"); keep form state; constraints that stop impossible input (a date picker that won't take a past date).
- **WCAG link:** error prevention for legal, financial and data changes (3.3.4 AA); redundant entry, not asking twice for what was already given (3.3.7 A).

### Accessibility: everyone can use it
- **Means:** it works for people who see, hear, move and think differently, and on any device. The target is WCAG 2.2 AA (see below).
- **AI-built screens break it with:** colour-only error states; icon buttons with no name; low-contrast grey text; fixed widths that break on phones; placeholders instead of labels.
- **Check:** keyboard-only pass (Tab through everything, and every control must be reachable, visible when focused and usable); a contrast tool in both themes; zoom to 200% and a 320px width; a screen-reader pass of names and roles; automated checks for what can be automated.
- **Fix:** real `<label>`s, text alongside colour, visible focus, 24px+ targets (44px is better and is the AAA level), reflowing layouts.

### Usability: the task gets done with little effort
- **Means:** the whole flow works for a real person, first time and every time. It brings the goals together: learnable, efficient, memorable, forgiving and satisfying.
- **AI-built screens break it with:** asking for the same number three times; twelve required fields to join a club; steps that don't match the task.
- **Check:** watch one person try the core task without help, and note every hesitation; count the fields and clicks on the main path.
- **Fix:** ask once; ask only for what's needed now; sensible defaults; remove steps.

### Wellbeing (mindful UX): respect time, attention and choice
- **Means:** the design serves the person's goals, not engagement for its own sake. Calmer defaults, natural pause points, no manipulation.
- **AI-built screens break it with:** everything notifying by default; infinite feeds; streak guilt; "mystery bonus" rewards; confirmshaming; public rankings of people.
- **Check:** list every notification, timer, counter and prompt. Who does each one serve? Is there a natural place to stop? Can the user say no without being shamed?
- **Fix:** off-by-default notifications, "you're all caught up" endings, private progress instead of leaderboards, plain "No thanks".

## Where these come from

Kept separate so that these statements aren't confused with other frameworks.

**The usability goals are Nielsen's.**
- **Nielsen, J. (1993), *Usability Engineering*.** It defines usability by five attributes: learnability, efficiency, memorability, errors (few, easy to recover from, none catastrophic) and satisfaction. His "Usability 101" (Nielsen Norman Group) restates them as quality components.
- **Shneiderman, B., *Designing the User Interface*.** Its five measurable human factors line up with the same five: time to learn, speed of performance, rate of errors, retention over time and subjective satisfaction.

**Different frameworks, not used for the goals here:**
- **ISO 9241-11 (1998, revised 2018).** Usability is effectiveness, efficiency and satisfaction in a context of use. That's three measures, not five.
- **Preece, Rogers and Sharp, *Interaction Design*.** Six usability goals (effective, efficient, safe, good utility, easy to learn, easy to remember), with satisfaction and enjoyment kept apart as user experience goals.

**The design principles are this course's own set**, drawing on:
- Nielsen's ten usability heuristics (1994), for example visibility of system status, user control and freedom, and consistency and standards;
- Norman, *The Design of Everyday Things* (1988, revised 2013), for example feedback and constraints;
- user-centred design (ISO 9241-210);
- WCAG for accessibility.

Which principle "mainly helps" which goal is this course's mapping, not a published one.

**Accessibility** is the W3C's WCAG 2.2 (2023): four principles (perceivable, operable, understandable, robust) and levels A, AA and AAA.

**Mindful UX** draws on work on deceptive design ("dark patterns", Harry Brignull, 2010), the FTC's *Bringing Dark Patterns to Light* (2022), and Article 25 of the EU Digital Services Act.

The course claims behind these attributions are **Proposed** in `claims.js` until
David attests them against the sources above.

## Definition of done for any UI change

- [ ] Every action shows a result (context)
- [ ] Anything that loses work can be undone or confirmed (user control)
- [ ] The main action is the most prominent thing; destructive actions aren't (hierarchy)
- [ ] Labels use the user's words, one name per action (user-centricity, consistency)
- [ ] Works by keyboard, focus visible, targets at least 24px, names on controls
- [ ] Contrast checked in both themes; colour never the only cue
- [ ] No sideways scroll at 320px; reduced motion respected
- [ ] No addictive patterns; calm defaults
