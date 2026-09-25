/**
 * Lesson 12 — Protect yourself and your gifts.
 *
 * Part of the Dark Triad series (Lessons 9-12): recognizing behavior, not
 * labeling people. Objectives only (backward design); plan, sources and
 * David's decisions in docs/dark-triad-series.md. Self-contained, so the series
 * can move to its own module later.
 * S4. 12.3 added at David's request on 2026-09-25; David confirmed the wording the same day.
 */

export default {
  n: 12,
  slug: "protect-your-gifts",
  title: "Protect yourself and your gifts",
  ready: false,
  objectivesApproved: "2026-09-25",
  framing:
    "Knowing the signs is half of it. This lesson is the other half: what to do, how to keep hold of what really happened, and how to protect your work and your talents.",
  objectives: [
    {
      id: "12.1",
      bloom: "apply",
      text: "Choose a safe response, such as a boundary, a written record, or a trusted person, without labeling anyone."
    },
    {
      id: "12.2",
      bloom: "create",
      text: "Plan how to protect your own work and ideas from someone who takes credit for them or uses them."
    },
    {
      id: "12.3",
      bloom: "apply",
      text: "Recognize gaslighting, and use a written record and a trusted person to hold on to what really happened."
    }
  ],

  warmup: {
    minutes: 5,
    items: [
      {
        id: "w1",
        targets: ["12.1"],
        prompt: "If you realize someone is using you, what's the best thing to do?",
        expected:
          "Most say confront them, call them out, or say nothing. Note who mentions a boundary, writing it down, or telling someone."
      },
      {
        id: "w2",
        targets: ["12.2"],
        prompt: "Someone presents your idea as their own. What could you have done before you shared it?",
        expected:
          "Most say \"nothing\" or \"trust fewer people.\" Note who mentions putting it in writing, with a date, first."
      },
      {
        id: "w3",
        targets: ["12.3"],
        prompt: "Someone keeps telling you things didn't happen the way you remember. Who do you believe?",
        expected:
          "Many start to doubt themselves. Note who says they would check their notes, or ask someone else who was there."
      }
    ]
  },

  check: {
    minutes: 10,
    items: [
      {
        id: "p1",
        targets: ["12.1"],
        prompt:
          "Someone online keeps pushing you to share your password \"as a favor\", and gets angry when you say no. Choose a safe response, without calling them names.",
        crit:
          "Says no, clearly. Saves the messages, then blocks. Tells someone they trust, or reports it. Doesn't insult or label them. Reteach if they give in, argue with labels, or keep it secret."
      },
      {
        id: "p2",
        targets: ["12.2"],
        prompt:
          "You're about to share a big idea with someone who has taken credit before. Plan two ways to protect it.",
        crit:
          "Plans two, such as: write it down with a date first, share it with more than one person, agree who gets credit before starting, or keep your drafts. Reteach if they say \"never share\", or give nothing specific."
      },
      {
        id: "p3",
        targets: ["12.3"],
        prompt:
          "Someone often says, \"That never happened. You're too sensitive.\" What is this called, and what two things help?",
        crit:
          "Names it gaslighting: trying to make you doubt your own memory. Says a written record helps, with dates and what was said. So does a trusted person to check with. Reteach if they decide they must be wrong."
      }
    ],
    exit: {
      rating: "How ready do you feel to protect yourself and your work? (1 = not at all, 5 = very)",
      open: "What is one thing you will start writing down, or one person you could tell?"
    }
  }
};
