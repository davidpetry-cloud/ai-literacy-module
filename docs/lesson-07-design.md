# Lesson 7: Accessible and mindful UX. Design

**Status:** approved 2026-09-24. Build on **Opus** (it adds the contrast
checker). Wording lives in `lessons/lesson-07.js` once built; this file is the
plan. Any change goes back into this file first.

**Timing:** warm-up 5, concrete 12, pictorial 10, abstract 8, check 10.

**Objectives** (approved 2026-09-24, in `lessons/lesson-07.js`):

- 7.1 *(understand)*: Explain what perceivable, operable, understandable and
  robust mean, and what levels A, AA and AAA add.
- 7.2 *(apply)*: Check a colour pair against the contrast levels, and say what
  to change if it fails.
- 7.3 *(evaluate)*: Audit an AI-built screen for accessibility failures and
  addictive patterns, and propose calmer defaults and pause points.

## WCAG, David's structure (2026-09-24)

| WCAG principle | David's group | Example criteria |
|---|---|---|
| Perceivable | Text and visuals | Contrast (1.4.3, 1.4.11), text alternatives (1.1.1), colour not the only cue (1.4.1), resizing text (1.4.4) |
| Operable | Navigation and interaction | Keyboard (2.1.1), visible focus (2.4.7), target size (2.5.8), pause and stop moving content (2.2.2) |
| Understandable | Content clarity | Labels and instructions (3.3.2), error messages (3.3.1), consistent navigation (3.2.3) |
| Robust | Mobile and device compatibility | Name, role and value (4.1.2), status messages (4.1.3), reflow at phone width (1.4.10, filed under Perceivable in the standard) |

The four groups are a teaching view. The reference table prints the official
principle beside each criterion so learners don't learn it wrongly.

**Levels:** A is the minimum, AA the usual target and legal reference, AAA
aspirational. The W3C says AAA can't be required for whole sites, because some
criteria can't be met for all content.

**Wellbeing (mindful UX), the eighth principle:**

| Practice | On a screen |
|---|---|
| Calmer defaults | Notifications off until asked, no autoplay, no streaks, quiet hours, sensible limits |
| Natural pause points | An end to the list ("you're all caught up"), pages instead of endless scroll, a stopping cue before a big action |
| Audit for addictive patterns | Infinite scroll, autoplay, streak pressure, variable rewards, confirmshaming, hard-to-find cancel or unsubscribe |

## Warm-up (pre) and check (post)

| id | Obj | Question | Expect / Reteach if |
|---|---|---|---|
| w1 | 7.1 | "What does it mean for a screen to be 'accessible'? Give one example." | Most say "big text" or "for disabled people." Note who mentions screen readers, keyboards or colour blindness. |
| w2 | 7.2 | "Which is easier to read: light grey text on white, or black text on white? How would you prove it to someone who disagrees?" | Most say "just look at it." Note who asks for a number. |
| w3 | 7.3 | "An app pings you when you haven't opened it for a day. Helpful or pushy? What would make it calmer?" | Answers split. Note who names a specific change, such as notifications off by default. |
| p1 | 7.1 | "Name the four WCAG principles. What do levels A, AA and AAA add?" | **Reteach if** they list single criteria instead of principles, or think AAA is required. A pass: perceivable, operable, understandable, robust. A is the minimum, AA the usual target, AAA aspirational. |
| p2 | 7.2 | "Light grey text (#999999) sits on a white background. Does it pass AA for normal text? What would you change?" | **Reteach if** they judge by eye, or say it passes. A pass says no: about 2.85:1 against 4.5:1. Darken the text. |
| p3 | 7.3 | "An AI-built page auto-plays a video, shows a streak counter, has a 22px close button, and shows errors only in red. Name two accessibility failures and two addictive patterns. Which do you fix first?" | **Reteach if** they mix the two kinds or say "all." A pass names the small target and red-only errors, and autoplay and the streak. It fixes first what blocks a person from using the page. |

**Exit ticket:** Lesson 1's rating word for word. Open: "Which one thing will you
change first on a screen you build or approve?"

## Concrete: "Audit the screen" (12 min; 7.1, 7.3)

Each track gets an AI-built screen (same `screen-frame` tool as Lesson 6). Learners
audit it: tag each numbered failure with a WCAG group (text and visuals, navigation
and interaction, content clarity, mobile and device) and mark the addictive
patterns. Each reveal names the criterion and level, and what to change.

## Pictorial: the contrast checker (10 min; 7.2)

Two colours, entered as hex with a colour picker. It shows the ratio (for
example 4.47:1) and a Pass or Fail badge, with a shape and a word, for each level:
normal text AA (4.5:1), large text AA (3:1), interface parts AA (3:1, 1.4.11),
normal text AAA (7:1), large text AAA (4.5:1). It suggests the nearest passing
text colour. A status line reads the result aloud as you type. The sample is an
SVG, so a failing pair does not trip the page's own contrast audit. It starts
loaded with the failing pair from the learner's track screen; the tool, labels
and script are the same in every track.

## Abstract: "Levels, groups and calmer defaults" (8 min; 7.1, 7.3)

The WCAG reference table with levels, the patterns audit list, and the three
wellbeing practices. Learners write, for the concrete screen, one calmer default
and one pause point. **Worked example:** the course site audited against these
lists. Every finding is checked before it is claimed, and anything found is fixed
or recorded.

## New claims (all `source: "model"`)

- `wcag-structure`: WCAG 2.2 has four principles and testable criteria at A, AA and AAA (W3C Recommendation, 2023).
- `contrast-thresholds`: 4.5:1 normal text, 3:1 large text and interface parts; 7:1 and 4.5:1 at AAA (WCAG 1.4.3, 1.4.6, 1.4.11).
- `mindful-ux`: interfaces can steer people against their own interests through deceptive design, and a design that respects time, attention and choice avoids it. Sources: FTC, *Bringing Dark Patterns to Light* (2022); EU Digital Services Act, Article 25.
- `l7-key-educators`, `l7-key-professionals`, `l7-key-students`.

## Personal wellbeing (David, 2026-09-24)

David's direction: healthy behavioural patterns are practised throughout life,
whether with AI, on the playground, or in a child's or an adult's everyday
surroundings. Practising empathy and self-care, and not enabling manipulative,
exploitative or callous behaviour, matters in all of them.

How the lesson carries it, without grading anyone's private habits:

- **"Use it this week" (Kirkpatrick 3), every track.** The transfer task turns the
  lesson's two practices on the learner's own use of AI: set one calmer default
  on a tool they use (notifications, a time limit, no autoplay), and notice one
  natural pause point, a moment where a break, or a person, would serve better
  than another prompt. Tracks differ only in the setting:
  - educators: their own use, and one habit to model for students;
  - professionals: their own working day with AI tools;
  - students: their own study and screen time, and how they treat others online.
- **The addictive-pattern audit gains one question:** does the design reward
  treating people as means, such as manipulation, status games or cruelty,
  or does it reward care and empathy? Rage-bait, public ranking of people, and
  prompts that shame others are the examples.
- **Framing and relevance** say plainly that the same habits are built at a
  screen, on a playground and at home, and that self-care and empathy come
  first. Voice stays plain: no alarm about technology.
- **Not assessed.** Objectives 7.1–7.3 stay as approved. The personal angle is
  practice and reflection, not a graded item.

**Language.** The lesson describes behaviours (manipulating, exploiting,
ignoring others' feelings) and design patterns. It does not use "dark triad"
or label people with personality terms. That is a research construct from
personality psychology, and naming it would need its own attested claim
(source: Paulhus and Williams, 2002, *Journal of Research in Personality*).
If David wants the term on the page, add it as a claim first.

**One new claim to propose at build time:** `wellbeing-habits`, that small,
repeated defaults and cues shape habits, so calmer defaults and pause points
support healthier use. Source to check: the habit-formation literature (for
example Wood and Rünger, 2016, *Annual Review of Psychology*). Worded as
"support", not "cause".

## Notes

Nothing leaves the page. Example screens and products are fictional and unnamed.
