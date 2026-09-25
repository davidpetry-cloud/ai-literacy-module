/**
 * Lesson 10 — Spot the pattern, in person and online.
 *
 * Part of the Dark Triad series (Lessons 9-12): recognizing behavior, not
 * labeling people. Objectives only (backward design); plan, sources and
 * David's decisions in docs/dark-triad-series.md. Self-contained, so the series
 * can move to its own module later.
 * S2. The Dark Tetrad (everyday sadism) is added in the abstract stage, at
 * David's request on 2026-09-25. 10.3 reworded at David's request on 2026-09-25 (trust your gut feeling); David confirmed the wording the same day.
 */

export default {
  n: 10,
  slug: "spot-the-pattern",
  title: "Spot the pattern, in person and online",
  ready: false,
  objectivesApproved: "2026-09-25",
  framing:
    "The same ways of using people show up face to face and online. This lesson helps you trust what your gut tells you, and check it against a pattern of behavior.",
  objectives: [
    {
      id: "10.1",
      bloom: "analyze",
      text: "Tell the difference between being used and an ordinary disagreement, face to face and online."
    },
    {
      id: "10.2",
      bloom: "analyze",
      text: "Find a pattern that repeats across situations, instead of judging from one incident."
    },
    {
      id: "10.3",
      bloom: "evaluate",
      text: "Trust how a person makes you feel over time as a signal, and check it against what they actually do."
    }
  ],

  warmup: {
    minutes: 5,
    items: [
      {
        id: "w1",
        targets: ["10.1"],
        prompt: "Someone you just met online is very kind, very fast. They send gifts and say you're special. Is that a good sign?",
        expected:
          "Most say yes, or \"lucky you.\" Note who asks why it's so fast, or what they might want."
      },
      {
        id: "w2",
        targets: ["10.2"],
        prompt: "Someone snapped at you once, in front of others. Does that tell you what they're like?",
        expected:
          "Answers split. Note who asks whether it keeps happening, and whether it happens in other places too."
      },
      {
        id: "w3",
        targets: ["10.3"],
        prompt: "You feel uneasy around someone, but you can't say why. What do you do with that feeling?",
        expected:
          "Most say they ignore it, or feel bad for thinking it. Note who says they would watch what the person does."
      }
    ]
  },

  check: {
    minutes: 10,
    items: [
      {
        id: "p1",
        targets: ["10.1"],
        prompt:
          "Two things happen. (a) Someone disagrees with your idea, loudly, in front of others. (b) A new online friend flatters you, asks you to keep your chats secret, then asks for a favor. Which one is using you? Why?",
        crit:
          "Says (b): flattery, then secrecy, then a request is how people who use others often work. Says (a) is a normal disagreement: it's open, and about the idea. Reteach if they judge by who seems nicer."
      },
      {
        id: "p2",
        targets: ["10.2"],
        prompt: "Name three things you would look for over time, not just once, to spot a pattern of control.",
        crit:
          "Names three, such as cutting you off from people, checking your phone or where you are, controlling your money or choices, threats, or putting you down. Says it's the repeat that matters. Reteach if they judge from one event."
      },
      {
        id: "p3",
        targets: ["10.3"],
        prompt: "Someone often leaves you feeling confused, guilty or on edge. What should you do with that feeling?",
        crit:
          "Takes the feeling seriously as a sign. Then watches what the person actually does over time, and talks to someone they trust. Reteach if they say ignore it, or act on the feeling alone, like accusing the person."
      }
    ],
    exit: {
      rating: "How useful was today for the people you deal with, face to face or online? (1 = not at all, 5 = very)",
      open: "What pattern will you watch for now, instead of a single moment?"
    }
  }
};
