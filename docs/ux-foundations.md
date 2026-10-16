# UX/UI foundations

David's standing UX/UI standard for every project. It comes from Lessons 6 and 7
of the AI literacy course (`lessons/lesson-06.js`, `docs/lesson-07-design.md`),
and is meant to be applied without being asked.

A concise version, with every idea once and nothing repeated, is in
[`ux-foundations-concise.md`](ux-foundations-concise.md). This full version keeps
the worked explanations. Update both together.

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
| Hierarchy | Do size, weight and space show what matters most? | The main action stands out; destructive actions don't; on a page that teaches, cues mark what's essential (see signaling below) |
| Context | Does the user know where they are and what just happened? | Every action shows a result: success, error, or progress |
| User control | Can the user go back, undo and cancel? | Back, undo or confirm for anything that loses work |
| Accessibility | Can everyone use it? | See WCAG and cognitive accessibility below |
| Usability | Can a real person finish with little effort? | Ask for each thing once; ask only for what's needed now |
| Wellbeing (mindful UX) | Does it respect time, attention, choice and privacy? | See mindful UX and privacy by design below |

## Accessibility: WCAG 2.2, target level AA

Organised by the four WCAG principles (POUR), with David's practical groups.

| WCAG principle | Group | Check |
|---|---|---|
| Perceivable | Text and visuals | Contrast 4.5:1 for text, 3:1 for large text and UI parts (1.4.3, 1.4.11); colour is never the only cue (1.4.1); text alternatives (1.1.1); text resizes (1.4.4) |
| Operable | Navigation and interaction | Works by keyboard (2.1.1); visible focus (2.4.7); targets at least 24px (2.5.8); moving content can be paused (2.2.2); time limits can be extended (2.2.1) |
| Understandable | Content clarity | Labels and instructions (3.3.2); errors named in words with a fix (3.3.1, 3.3.3); consistent navigation (3.2.3) |
| Robust | Mobile and device compatibility | Controls have a name and role (4.1.2); status messages are announced (4.1.3); reflows at 320px with no sideways scroll (1.4.10, filed under Perceivable in the standard) |

Levels: **A** is the minimum, **AA** the usual target and legal reference, and
**AAA** aspirational. The W3C doesn't recommend requiring AAA for whole sites,
because some content can't meet every AAA criterion.

**Contrast thresholds:**
- AA: 4.5:1 for normal text, and 3:1 for large text and UI parts.
- AAA: 7:1 for normal text, and 4.5:1 for large text.

Check with a contrast checker; never judge by eye. Test both light and dark
themes, and respect `prefers-reduced-motion`.

## Cognitive accessibility: beyond level AA

WCAG AA says little about people with cognitive and learning disabilities,
or anyone tired, stressed, distracted or reading in a second language. The
W3C's guidance for them, *Making Content Usable for People with Cognitive and
Learning Disabilities* (2021), sets eight objectives. The objective names are
the W3C's; the checks are this standard's own wording.

| W3C objective | In code, check that… |
|---|---|
| Help users understand what things are and how to use them | Every control looks like what it is and says what it does; no mystery icons |
| Help users find what they need | The page says where you are; the important thing is easy to find, not buried |
| Use clear and understandable content | Common words; short sentences; literal language; one instruction per step; white space |
| Help users avoid mistakes and know how to correct them | Errors are prevented where possible, and named in plain words with the fix (see user control) |
| Help users focus | Nothing moves, pops up or interrupts while someone is working (see mindful UX) |
| Ensure processes do not rely on memory | Nobody has to remember a code, a step or an earlier answer to finish |
| Provide help and support | Help is one step away on any task that can go wrong |
| Support adaptation and personalization | Text can be resized and themes changed without anything breaking |

A readability check helps with the third objective: measure the reading
grade of the text and keep sentences short. A grade score is a guide, not
proof; plain words and one idea per sentence matter more.

## Mindful UX (digital wellbeing)

- **Calmer defaults:** notifications off until asked, no autoplay, no streaks, quiet hours, sensible limits.
- **Natural pause points:** an end to lists ("you're all caught up"), pages instead of endless scroll, a stopping cue before big actions.
- **Audit for addictive patterns:** infinite scroll, autoplay, streak pressure, variable rewards, confirmshaming, hidden cancel or unsubscribe.
- **Reward care, not harm:** designs shouldn't reward manipulating, ranking or shaming people. Healthy habits, empathy and self-care are practised everywhere, at a screen, on a playground or at home.

## Signaling and cognitive load: pages that teach

A person's working memory is small. Everything on a page that doesn't help
them learn competes with what does (Sweller's cognitive load theory). Richard
Mayer's research on multimedia learning turns this into design principles.
Three apply to any page that teaches, explains or trains. The principle names
are Mayer's; the checks are this standard's own wording.

| Principle (Mayer) | Means | In code, check that… |
|---|---|---|
| Coherence | Leave out material that doesn't serve the learning goal | Every element on a teaching page serves an objective; no decoration, side stories or background noise competing with it |
| Signaling | Cues show what's essential and how it's organised | Headings, contrast, bands and emphasis mark the parts; a squint test shows question from answer, rule from example and header from body without reading. If the parts blend together, signaling has failed |
| Segmenting | Break a lesson into parts the learner moves through at their own pace | Long content is split into steps or disclosures the learner opens; nothing advances on its own |

Mayer groups coherence and signaling with the principles that cut wasted
effort ("extraneous processing"), and segmenting with those that make hard
material manageable ("essential processing"). His evidence comes mainly from
lessons that combine words and pictures. Applying it to the design of any
teaching page is this standard's extension, not his claim.

## Expression: Budapest, not small-town USA

David's design direction (2026-10-16): everything should look like a person
designed it, never a template. His comparison is the architecture of Budapest
(Art Nouveau craft, ceramic tile, the baths' mosaics, the bridges over the
Danube) against small-town USA. His words: innovation, exploration, texture,
flow, beauty, inspiration, invention. This is a direction of taste, not a
research finding, and it works inside the rest of this standard, never instead
of it.

| Quality | Means | In code, check that… |
|---|---|---|
| Craft | It looks made, not assembled from a kit | Custom details (SVG ornament, considered borders and dividers, a type pairing with character); no stock component-library or generic "AI site" look |
| Texture | Surfaces have depth | Subtle grain, pattern or tile motifs on frames and bands, never behind body text; text still passes contrast over them in both themes |
| Colour with depth | Rich, warm palettes | Built in `oklch` so shades stay even; every pairing still checked at 4.5:1 (3:1 for UI parts) in both themes |
| Warm light, no glare | Light themes rest the eyes | A warm sandstone page (e.g. #EBE1CF) with cards one gentle step lighter (#F2E9DA); no bright white on screen, only in print (David, 2026-10-16); pairings re-checked on the warmer surfaces |
| Flow | The page leads the eye | Rhythm, curves and layered layouts; motion that follows the reader (scroll-linked, View Transitions) and has a job: orientation, continuity or feedback |
| Invention | Small, purposeful discoveries | A custom interaction or detail that teaches or helps; nothing that exists only to impress |

**Where expression goes.** Richness belongs in the frame: headers, hubs, section
openings, transitions and empty states. Quiet belongs where people read, learn,
fill in forms or compare data, because there coherence and signaling come first
(see above). A squint test still has to show the parts of a teaching page apart.

**Motion, the expressive way.** Prefer motion the person drives: tied to their
scroll, their click or their choice, so it moves at their speed and stops when
they stop. Nothing moves on its own. Every motion has a purpose you can name.
Respect the device's reduce-motion setting (people whom movement makes unwell
rely on it). David decided against an on-site motion switch (2026-10-16), so the
device setting is the one control. With motion off, nothing is lost: same
content, same focus, same announcements.

**Depth by illusion.** Create depth with light, shade, shadow and texture, the
way a painter does, not with real 3D: nothing rotates, skews or tilts, so text
never warps. Straight movement is fine: a card may lift on hover while its
shadow deepens.

**The floor doesn't move.** Accessibility, cognitive accessibility, privacy and
mindful UX are the floor. An expressive idea that fails contrast, needs motion
to make sense, hides meaning in colour alone, or slows a learner down is changed
until it passes, or it goes.

## Privacy by design

Privacy is part of the design from the start, not a setting added later. Ann
Cavoukian's seven foundational principles name the approach, and Article 25 of
the EU's GDPR makes "data protection by design and by default" a legal duty
for anyone handling personal data. The principle names are Cavoukian's; the
checks are this standard's own wording.

| Principle (Cavoukian) | In code, check that… |
|---|---|
| Proactive not reactive; preventative not remedial | Privacy is planned before building, not patched after a problem |
| Privacy as the default | Nothing is collected, shared or made public unless the person turns it on |
| Privacy embedded into design | Privacy is part of the feature itself, not a separate settings page |
| Full functionality: positive-sum, not zero-sum | The design keeps both the feature and the privacy; neither is traded away |
| End-to-end security: lifecycle protection | Data is protected from collection to deletion, and deleted when no longer needed |
| Visibility and transparency | The page says plainly what is collected, why, and where it goes |
| Respect for user privacy | The person's interests come first: strong defaults, clear notice, easy choices |

In practice:
- **Collect only what each purpose needs** (GDPR Article 25(2)). If a page
  works without an account, a name or a location, don't ask for one.
- **Every request to another site shares data.** Fonts, scripts, analytics and
  embeds from third parties tell those companies who visited. Host them
  yourself, or leave them out.
- **Children's data needs the most care.** Check the law for each country
  you serve before collecting anything from or about a child.

## Human–AI interaction: designing with a model inside

AI output is a spread of possible answers, not one fixed result. Use these
nine themes whenever a screen shows, suggests or acts on model output. They
decide when a product should suggest, ask or act, and how it keeps a person
responsible for the result.

The nine themes and their names follow the Human–AI section of
[uxprinciples.design](https://uxprinciples.design/human-ai), which credits no
sources. The questions and checks here are this standard's own wording, and the
"Rests on" column names the published research each theme comes from (see
"Where these come from").

| Theme | The question it asks | In code, check that… | Rests on |
|---|---|---|---|
| Probabilistic foundation | Is the design built for answers that vary and can be wrong? | Nothing treats model output as a fixed fact; the same request can safely give a different answer | Amershi et al. (2019), G2; this course's Lesson 1 |
| Expectation setting | Does the user know what the AI can and can't do before they rely on it? | The screen says an AI is involved, what it's for, and its known limits, up front | Amershi et al. (2019), G1–G2; PAIR, "Mental models" |
| Calibrated trust | Does the user rely on it as much as it deserves, and no more? | Confidence or source is shown where it matters; weak output looks weak | Lee and See (2004); Parasuraman and Riley (1997) |
| Transparency | Can the user see why it said or did that? | Sources, inputs or reasons are one step away, not buried and not flooding the screen | Amershi et al. (2019), G11; PAIR, "Explainability + trust" |
| Control and agency | Can the user accept, reject, edit, undo or override easily? | Every AI action has a one-step undo or dismiss, and a way to turn the feature off | Horvitz (1999); Amershi et al. (2019), G7–G9, G17; Shneiderman (2022) |
| Graceful failure | What happens when it's wrong, unsure or stuck? | Wrong, empty and uncertain results have a designed state and a way forward, such as retry, edit or reach a person | Amershi et al. (2019), G9–G10; PAIR, "Errors + graceful failure" |
| Co-creation | Is the output a draft the user shapes, or a verdict they must accept? | Generated content arrives editable, and the user's changes are kept | Horvitz (1999), mixed-initiative interaction |
| Responsible autonomy | Does independent action scale with stakes and reversibility? | The more costly or permanent an action, the more it asks first, and it only acts within permissions given | Parasuraman, Sheridan and Wickens (2000); Shneiderman (2022) |
| Sustained reliance | Does it stay healthy to use over time? | Waits show progress; changes in behaviour, cost or quality are announced; the user keeps ownership of their work | Amershi et al. (2019), G12–G18 |

These connect to the principles above. Control and agency is user control,
graceful failure is context, and sustained reliance is wellbeing, each seen
through a model that can be wrong.

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
- **On a page that teaches:** hierarchy becomes *signaling* (Mayer). Give a table a distinct header and row labels, and set notes, examples and answers apart, so the parts don't blend together. See "Signaling and cognitive load" above.

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
- **Beyond AA:** plain words, one instruction per step, and nothing that relies on memory. See "Cognitive accessibility" above.

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
- **Privacy is part of respect:** collect nothing a feature doesn't need, keep it private by default, and say what happens to it. See "Privacy by design" above.

## Where these come from

Kept separate so that these statements aren't confused with other frameworks.

**The usability goals are Nielsen's.**
- **Nielsen, J. (1993), *Usability Engineering*.** It defines usability by five attributes: learnability, efficiency, memorability, errors (few, easy to recover from, none catastrophic) and satisfaction. His "Usability 101" (Nielsen Norman Group) restates them as quality components.
- **Shneiderman, B., *Designing the User Interface*.** Its five measurable human factors line up with the same five: time to learn, speed of performance, rate of errors, retention over time and subjective satisfaction.

**Different frameworks, not used for the goals here:**
- **ISO 9241-11 (1998, revised 2018).** Usability is effectiveness, efficiency and satisfaction in a context of use. That's three measures, not five.
- **Preece, Rogers and Sharp, *Interaction Design*.** Six usability goals (effective, efficient, safe, good utility, easy to learn, easy to remember), with satisfaction and enjoyment kept apart as user experience goals.

**The design principles are this course's own set of eight, and each rests on
foundational theory.** The grouping is the course's; the ideas are not.

| Principle | Rests on |
|---|---|
| User-centricity | User-centred design: Norman and Draper (eds.), *User Centered System Design* (1986); ISO 9241-210 |
| Consistency | Shneiderman, *Designing the User Interface* (1987 on), "strive for consistency"; Nielsen's heuristics (1994), "consistency and standards" |
| Hierarchy | The Gestalt principles of perceptual organisation (Wertheimer, 1923), the basis of visual hierarchy; on pages that teach, Mayer's signaling principle (2021) |
| Context | Norman, *The Design of Everyday Things* (1988; 2013), feedback and visibility; Nielsen (1994), "visibility of system status" |
| User control | Nielsen (1994), "user control and freedom"; Shneiderman, "permit easy reversal of actions" and "keep users in control" |
| Accessibility | *The Principles of Universal Design* (Center for Universal Design, NC State, 1997); W3C WCAG 2.2; W3C, *Making Content Usable for People with Cognitive and Learning Disabilities* (2021) |
| Usability | Nielsen, *Usability Engineering* (1993); ISO 9241-11 |
| Wellbeing (mindful UX) | Value sensitive design (Friedman, 1996); deceptive-design research (Brignull, 2010); Privacy by Design (Cavoukian, 2009) |

Which principle "mainly helps" which goal is this course's mapping, not a published one.

**Human–AI interaction.** The nine themes follow the Human–AI section of
uxprinciples.design (https://uxprinciples.design/human-ai; theme names used with
credit, wording here is this standard's own). The research beneath them:
- Amershi, S. et al. (2019), "Guidelines for Human-AI Interaction", *CHI 2019*: 18 guidelines (G1–G18) across four phases (initially, during interaction, when wrong, over time).
- Horvitz, E. (1999), "Principles of Mixed-Initiative User Interfaces", *CHI 1999*.
- Lee, J. D. and See, K. A. (2004), "Trust in Automation: Designing for Appropriate Reliance", *Human Factors* 46(1).
- Parasuraman, R. and Riley, V. (1997), "Humans and Automation: Use, Misuse, Disuse, Abuse", *Human Factors* 39(2).
- Parasuraman, R., Sheridan, T. B. and Wickens, C. D. (2000), "A Model for Types and Levels of Human Interaction with Automation", *IEEE Transactions on Systems, Man, and Cybernetics* 30(3).
- Google PAIR, *People + AI Guidebook* (2019; updated 2021).
- Shneiderman, B. (2022), *Human-Centered AI*, Oxford University Press.

**Accessibility** is the W3C's WCAG 2.2 (2023): four principles (perceivable, operable, understandable, robust) and levels A, AA and AAA.

**Mindful UX** draws on work on deceptive design ("dark patterns", Harry Brignull, 2010), the FTC's *Bringing Dark Patterns to Light* (2022), and Article 25 of the EU Digital Services Act.

**Cognitive accessibility** is W3C, *Making Content Usable for People with
Cognitive and Learning Disabilities*, W3C Working Group Note, 29 April 2021
(editors Lisa Seeman-Horwitz, Rachael Bradley Montgomery, Steve Lee and Ruoxi
Ran; https://www.w3.org/TR/coga-usable/). It sets eight objectives, each with
design patterns.

**Signaling and cognitive load:**
- Mayer, R. E. (2021), *Multimedia Learning* (3rd ed.), Cambridge University
  Press. It reviews fifteen principles of multimedia design. Coherence and
  signaling are among the principles for reducing extraneous processing, and
  segmenting among those for managing essential processing.
- Sweller, J. (1988), "Cognitive Load During Problem Solving: Effects on
  Learning", *Cognitive Science* 12(2), 257–285. The start of cognitive load
  theory.

**Privacy by design:**
- Cavoukian, A. (2009; revised 2011), *Privacy by Design: The 7 Foundational
  Principles*, Information and Privacy Commissioner of Ontario. In 2010 the
  International Conference of Data Protection and Privacy Commissioners
  adopted a resolution recognising Privacy by Design.
- Regulation (EU) 2016/679 (GDPR), Article 25, "Data protection by design and
  by default": build data protection into how data is handled, and by default
  process only the personal data each purpose needs.

These three sections were added on 2026-10-13. A model checked the sources the
same day: Mayer against Cambridge's front matter (copyright page and contents),
the W3C note and GDPR Article 25 at their own pages, and Cavoukian's seven
principles in a copy of the IPC document. Sweller, Cavoukian's dates and the
2010 resolution were checked by search only, not opened. None of them is a
course claim awaiting David's attestation.

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
- [ ] Plain words, one instruction per step, nothing relies on memory (cognitive accessibility)
- [ ] On a page that teaches, the essential parts are cued and don't blend together (signaling)
- [ ] Collects only what it needs; private by default; says what happens to data; no third-party requests it doesn't need (privacy by design)
- [ ] Looks made, not templated; richness in the frame, quiet where people read; every motion follows the person, has a job, and can be turned off on the site (expression)

If the screen shows, suggests or acts on AI output, also check:

- [ ] It says an AI is involved, and what it can't do (expectation setting)
- [ ] Sources or reasons are one step away (transparency)
- [ ] Every AI action can be undone, dismissed or turned off (control and agency)
- [ ] Wrong, empty and unsure results have a designed state and a way forward (graceful failure)
- [ ] Generated content is editable, and the user's edits are kept (co-creation)
- [ ] Costly or permanent actions ask first (responsible autonomy)
