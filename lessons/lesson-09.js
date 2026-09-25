/**
 * Lesson 9 — What the Dark Triad is, and isn't.
 *
 * Part of the Dark Triad series (Lessons 9-12): recognizing behavior, not
 * labeling people. Objectives only (backward design); plan, sources and
 * David's decisions in docs/dark-triad-series.md. Self-contained, so the series
 * can move to its own module later.
 * S1. 9.4 added at David's request on 2026-09-25; David confirmed the wording the same day.
 */

export default {
  n: 9,
  slug: "dark-triad-what-it-is",
  title: "What the Dark Triad is, and isn't",
  ready: false,
  objectivesApproved: "2026-09-25",
  framing:
    "Some people use others to get what they want. Researchers study this as three traits called the Dark Triad. This lesson says what the science shows, where the traits come from, and what it doesn't let you conclude about one person.",
  objectives: [
    {
      id: "9.1",
      bloom: "understand",
      text: "Describe the three Dark Triad traits as research measures on a scale, not diagnoses."
    },
    {
      id: "9.2",
      bloom: "understand",
      text: "Explain how people high in these traits tend to get others to do what they want, using the research."
    },
    {
      id: "9.3",
      bloom: "analyze",
      text: "Tell a research finding about a group apart from a judgement about one person."
    },
    {
      id: "9.4",
      bloom: "understand",
      text: "Explain what research says about where these traits come from, such as genes, upbringing and life events, and how they link to addiction."
    }
  ],

  warmup: {
    minutes: 5,
    items: [
      {
        id: "w1",
        targets: ["9.1"],
        prompt: "Is a person either a narcissist or not? Say why you think so.",
        expected:
          "Most say yes: you are one or you aren't. Note who says it's a matter of how much, like height."
      },
      {
        id: "w2",
        targets: ["9.2"],
        prompt: "How could you tell if someone was trying to use you? What would they do?",
        expected:
          "Most describe threats, or someone who seems creepy. Note who mentions charm, compliments or favours."
      },
      {
        id: "w3",
        targets: ["9.3"],
        prompt:
          "A study finds that people who score high on a trait tell more lies. Someone you know scores high. Are they lying to you?",
        expected:
          "Many say \"probably.\" Note who says a finding about a group can't tell you about one person."
      },
      {
        id: "w4",
        targets: ["9.4"],
        prompt: "Are people who use others born that way, or made that way?",
        expected:
          "Most pick one side. Note who says both, and who asks what else plays a part."
      }
    ]
  },

  check: {
    minutes: 10,
    items: [
      {
        id: "p1",
        targets: ["9.1"],
        prompt: "Name the three Dark Triad traits. Why does the research treat them as a scale, not a diagnosis?",
        crit:
          "Names the three: narcissism, Machiavellianism and psychopathy. Says each is a scale, and we all sit somewhere on it. Only a doctor or trained expert can diagnose. Reteach if they sort people into \"is\" and \"isn't\"."
      },
      {
        id: "p2",
        targets: ["9.2"],
        prompt: "Name two ways people high in these traits tend to get others to do what they want.",
        crit:
          "Names one soft way, like compliments or favours, and one hard way, like threats. Says the tactics vary, so there is no single sign. Reteach if they name only threats or \"creepy\" behavior."
      },
      {
        id: "p3",
        targets: ["9.3"],
        prompt:
          "A study finds that people high in Machiavellianism tell more lies, on average. What can that tell you about one person you know? What can't it?",
        crit:
          "Says it describes a group on average, and many in the group don't lie more. It can't tell you about one person. Judge them by what they do. Reteach if they apply it to the person."
      },
      {
        id: "p4",
        targets: ["9.4"],
        prompt: "Where do these traits come from? How do they link to addiction?",
        crit:
          "Says both genes and life shape them, like upbringing and what happens to you. Says they are linked to addiction, not caused by it. Says a cause explains behavior but doesn't excuse it. Reteach if they give one cause."
      }
    ],
    exit: {
      rating: "How useful was today for the people you deal with, face to face or online? (1 = not at all, 5 = very)",
      open: "What will you look at now, before you decide what someone is like?"
    }
  }
};
