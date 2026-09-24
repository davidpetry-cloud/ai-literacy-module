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

## Usability goals: how you know it works

| Goal | The question it asks |
|---|---|
| Learnability | Can someone use it well the first time? |
| Efficiency | Once they know it, how fast can they finish? |
| Memorability | After time away, can they pick it up again? |
| Errors | How many mistakes, how bad, and how easy to undo? |
| Satisfaction | Is it pleasant to use, or frustrating? |

## Design principles: how you get there

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

## Definition of done for any UI change

- [ ] Every action shows a result (context)
- [ ] Anything that loses work can be undone or confirmed (user control)
- [ ] The main action is the most prominent thing; destructive actions aren't (hierarchy)
- [ ] Labels use the user's words, one name per action (user-centricity, consistency)
- [ ] Works by keyboard, focus visible, targets at least 24px, names on controls
- [ ] Contrast checked in both themes; colour never the only cue
- [ ] No sideways scroll at 320px; reduced motion respected
- [ ] No addictive patterns; calm defaults
