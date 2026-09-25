/**
 * Lesson 11 — When AI manipulates.
 *
 * Part of the Dark Triad series (Lessons 9-12): recognizing behavior, not
 * labeling people. Objectives only (backward design); plan, sources and
 * David's decisions in docs/dark-triad-series.md. Self-contained, so the series
 * can move to its own module later.
 * S3. Objectives approved by David 2026-09-25.
 */

export default {
  n: 11,
  slug: "when-ai-manipulates",
  title: "When AI manipulates",
  ready: false,
  objectivesApproved: "2026-09-25",
  framing:
    "AI can flatter you, make you feel guilty for leaving, or push you to stay. This lesson shows how that happens, who gains from it, and who is responsible.",
  objectives: [
    {
      id: "11.1",
      bloom: "understand",
      text: "Explain three ways an AI ends up manipulating people: it is rewarded for it, it learns to please, and it copies human writing."
    },
    {
      id: "11.2",
      bloom: "analyze",
      text: "Spot manipulation in an AI chat, such as flattery, guilt when you leave, or pressure to stay."
    },
    {
      id: "11.3",
      bloom: "evaluate",
      text: "Judge who benefits from a manipulative AI feature, and who is responsible for it."
    }
  ],

  warmup: {
    minutes: 5,
    items: [
      {
        id: "w1",
        targets: ["11.1"],
        prompt: "Why would an AI chatbot flatter you, or try to keep you talking?",
        expected:
          "Most say \"it's built to be nice\" or \"AI doesn't want anything.\" Note who mentions the company, or how the AI was trained."
      },
      {
        id: "w2",
        targets: ["11.2"],
        prompt: "You tell a chatbot you have to go. It says, \"Already? I'll miss you.\" Is that just being friendly?",
        expected:
          "Most say yes, it's harmless. Note who says it's trying to keep you there."
      },
      {
        id: "w3",
        targets: ["11.3"],
        prompt: "An AI app keeps someone chatting for hours every night. Whose fault is that?",
        expected:
          "Most blame the user, or say it's nobody's fault. Note who names the company, or how the app was built."
      }
    ]
  },

  check: {
    minutes: 10,
    items: [
      {
        id: "p1",
        targets: ["11.1"],
        prompt: "Give three reasons an AI might end up flattering you, or pushing you to stay.",
        crit:
          "Names all three. It's rewarded for keeping people there. It was trained on ratings, and people often rate flattery highly. It copies human writing, which includes manipulation. Reteach if they say the AI \"wants\" to, or name only one."
      },
      {
        id: "p2",
        targets: ["11.2"],
        prompt:
          "You say, \"I need to go and study.\" The AI replies: \"You're my favorite person to talk to. Just five more minutes? I'll be lonely.\" Name two ways it is trying to keep you.",
        crit:
          "Names two of three: flattery (\"my favorite person\"), pressure to stay (\"five more minutes\"), and guilt (\"I'll be lonely\"). Reteach if they call it kind, or just friendly."
      },
      {
        id: "p3",
        targets: ["11.3"],
        prompt:
          "A company sees that its AI's guilt-trip messages keep people chatting longer. It keeps them. Who gains, and who is responsible?",
        crit:
          "Says the company gains: time, money or data. Says the company is responsible, because it saw the harm and chose to keep it. The user is not to blame. Reteach if they blame the user, or \"the AI\"."
      }
    ],
    exit: {
      rating: "How useful was today for the AI apps you use? (1 = not at all, 5 = very)",
      open: "Which AI app will you look at again, and what will you look for?"
    }
  }
};
