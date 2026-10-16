# UX/UI foundations (concise)

The same standard as [`ux-foundations.md`](ux-foundations.md), with Occam's
Razor applied: every idea once, nothing repeated. Use this one day to day; use
the full version when you want the worked explanations. If they ever disagree,
the full version wins, and both should be updated together.

The course claims behind these attributions are **Proposed** in `claims.js`
until David attests them.

## The rule

Check UX/UI **while** the code is written, in the same change, not in a later
pass. A change to anything a person sees or uses isn't done until it's checked.
Say which items you checked.

## Usability goals (Nielsen, 1993)

| Goal | The question it asks |
|---|---|
| Learnability | How quickly can a new user start getting things done? |
| Efficiency | Once they know it, how fast can they finish? |
| Memorability | After time away, can they use it without learning it again? |
| Errors | Are mistakes few, easy to recover from, and never a disaster? |
| Satisfaction | Is it pleasant to use? |

## Design principles (David's set of eight)

The grouping is David's; each idea rests on the theory named.

| Principle | In code, check that… | Tip | Rests on |
|---|---|---|---|
| User-centricity | Labels and titles use the user's words | Read labels aloud to an outsider | Norman and Draper (1986); ISO 9241-210 |
| Consistency | One name per action; shared tokens and components | List every action verb; hunt synonyms | Shneiderman (1987 on); Nielsen (1994) |
| Hierarchy | One primary action per view; destructive actions quieter; on a teaching page, cues mark what's essential | Squint test: blur it, does the main action stand out? | Gestalt, Wertheimer (1923); Mayer (2021) |
| Context | Every action shows a result: success, error or progress | Under 0.1s feels instant, about 1s keeps the flow, past 10s show progress (Nielsen) | Norman (1988/2013); Nielsen (1994) |
| User control | Undo, back or confirm for anything that loses work | Undo beats "Are you sure?"; keep form state | Nielsen (1994); Shneiderman |
| Accessibility | Meets WCAG 2.2 AA, plus cognitive accessibility (below) | Keyboard-only pass; zoom to 200%; 320px width | Universal Design (1997); WCAG 2.2; W3C (2021) |
| Usability | Ask once, and only for what's needed now | Watch one person do the core task | Nielsen (1993); ISO 9241-11 |
| Wellbeing | Calm defaults, pause points, no addictive patterns; privacy by design (below) | For every prompt, ask who it serves | Friedman (1996); Brignull (2010); Cavoukian (2009) |

## Accessibility: WCAG 2.2, level AA

| Principle | Group | Check |
|---|---|---|
| Perceivable | Text and visuals | Contrast 4.5:1 text, 3:1 large text and UI parts (AAA: 7:1 and 4.5:1); colour never the only cue; text alternatives; text resizes |
| Operable | Navigation and interaction | Keyboard; visible focus; 24px targets; moving content can pause; time limits can extend |
| Understandable | Content clarity | Labels; errors in words with a fix; consistent navigation |
| Robust | Mobile and device | Names and roles on controls; status messages announced; reflow at 320px |

A is the minimum, AA the target, AAA where you can (the W3C doesn't recommend
requiring it site-wide). Measure contrast with a tool, in both themes.

## Cognitive accessibility (W3C, 2021)

Beyond AA, for people with cognitive and learning disabilities and anyone
tired, stressed or distracted. The W3C's eight objectives, as checks:

- Controls look like what they are and say what they do.
- The important thing is easy to find.
- Common words, short sentences, literal language, one instruction per step.
- Mistakes are prevented, or named in plain words with the fix.
- Nothing interrupts someone who is working.
- Nobody has to remember a code, a step or an earlier answer.
- Help is one step away.
- Text resizes and themes change without breaking anything.

## Mindful UX

- **Calmer defaults:** notifications off until asked; no autoplay or streaks.
- **Natural pause points:** "you're all caught up"; pages, not endless scroll.
- **No addictive patterns:** infinite scroll, autoplay, streaks, variable rewards, confirmshaming, hidden cancel.
- **Reward care, not harm:** never reward manipulating, ranking or shaming people.

## Signaling and cognitive load (Mayer, 2021; Sweller, 1988)

For any page that teaches. Working memory is small, so the design mustn't
compete with the learning.

| Principle | In code, check that… |
|---|---|
| Coherence | Every element serves an objective; no decoration competing with it |
| Signaling | Headings, contrast and bands mark the parts; question, answer, rule and example don't blend together |
| Segmenting | Long content comes in learner-paced steps; nothing advances on its own |

## Expression: Budapest, not small-town USA (David, 2026-10-16)

It should look like a person designed it, never a template: innovation,
exploration, texture, flow, beauty, inspiration, invention. A direction of
taste, inside this standard.

- **Craft and texture:** custom details, grain or tile motifs on frames, never behind body text.
- **Colour with depth:** rich `oklch` palettes, still 4.5:1 in both themes.
- **Flow:** motion the person drives (scroll-linked, View Transitions), each with a job; nothing moves on its own.
- **Richness in the frame, quiet where people read:** coherence and signaling still win on teaching pages.
- **Motion:** respect the device's reduce-motion setting; no on-site switch.
- **Depth by illusion:** light, shade and shadow, never real 3D; text never warps.
- **The floor doesn't move:** an idea that fails accessibility or slows a learner changes or goes.

## Privacy by design (Cavoukian, 2009; GDPR Art. 25)

| Principle | In code, check that… |
|---|---|
| Proactive, preventative | Privacy is planned before building |
| Privacy as the default | Nothing is collected, shared or public unless the person turns it on |
| Embedded into design | Privacy is part of the feature, not a settings page |
| Positive-sum | Keep both the feature and the privacy |
| End-to-end security | Protected from collection to deletion; deleted when not needed |
| Visibility and transparency | Say what is collected, why, and where it goes |
| Respect for user privacy | Strong defaults, clear notice, easy choices |

Collect only what each purpose needs. Every third-party request (fonts,
scripts, analytics) shares data, so host it yourself or leave it out.
Children's data needs the most care.

## Human–AI interaction

For any screen that shows, suggests or acts on AI output. Theme names follow
[uxprinciples.design](https://uxprinciples.design/human-ai) (credited); wording is ours.

| Theme | In code, check that… | Rests on |
|---|---|---|
| Probabilistic foundation | Output is never treated as a fixed fact | Amershi et al. (2019) G2 |
| Expectation setting | It says an AI is involved, and what it can't do | Amershi G1–G2; PAIR |
| Calibrated trust | Weak output looks weak; confidence or source shown | Lee and See (2004); Parasuraman and Riley (1997) |
| Transparency | Sources or reasons are one step away | Amershi G11; PAIR |
| Control and agency | Every AI action can be undone, dismissed or turned off | Horvitz (1999); Amershi G7–G9, G17 |
| Graceful failure | Wrong, empty and unsure results have a designed way forward | Amershi G9–G10; PAIR |
| Co-creation | Output arrives editable; edits are kept | Horvitz (1999) |
| Responsible autonomy | Costly or permanent actions ask first, within permissions | Parasuraman, Sheridan and Wickens (2000); Shneiderman (2022) |
| Sustained reliance | Progress shown; changes announced; the user owns their work | Amershi G12–G18 |

## Definition of done

- [ ] Every action shows a result
- [ ] Anything that loses work can be undone or confirmed
- [ ] The main action stands out; destructive actions don't
- [ ] The user's words, one name per action
- [ ] Keyboard, visible focus, 24px targets, names on controls
- [ ] Contrast checked in both themes; colour never the only cue
- [ ] No sideways scroll at 320px; reduced motion respected
- [ ] Calm defaults; no addictive patterns
- [ ] Plain words, one instruction per step, nothing relies on memory
- [ ] On a teaching page, the essential parts are cued and don't blend together
- [ ] Collects only what it needs; private by default; no needless third-party requests
- [ ] Looks made, not templated; motion follows the person, has a job, and can be turned off

With AI output, also:

- [ ] AI involvement and limits are stated
- [ ] Sources or reasons are one step away
- [ ] Every AI action can be undone, dismissed or turned off
- [ ] Failure has a designed way forward
- [ ] Output is editable; edits are kept
- [ ] Costly or permanent actions ask first

Full citations for every source above are in the full version, under "Where
these come from".
