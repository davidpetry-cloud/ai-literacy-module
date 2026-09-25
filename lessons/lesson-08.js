/**
 * Lesson 8 — Human-Centered AI.
 *
 * Backward design: objectives (approved 2026-09-25), then the warm-up and
 * check below. Stages come next. Design notes and sources: docs/lesson-08-design.md.
 * The scenarios are made up for this lesson; no real app or person is named.
 */

export default {
  n: 8,
  slug: "human-centered-ai",
  title: "Human-Centered AI",
  ready: false,
  objectivesApproved: "2026-09-25",
  framing:
    "The first seven lessons ask whether an AI output is right. This one asks whether a use of AI is good for the people it touches: their dignity, the rights of children, and the relationships that no tool should replace.",
  objectives: [
    {
      id: "8.1",
      bloom: "understand",
      text: "Explain what Human-Centered AI means, using human dignity and children's rights as UNESCO and the United Nations describe them."
    },
    {
      id: "8.2",
      bloom: "evaluate",
      text: "Judge an AI use by its effect on dignity, children and human relationships, and recommend keeping, changing or stopping it."
    },
    {
      id: "8.3",
      bloom: "apply",
      text: "Decide where a person, not an AI, must stay in one decision or relationship in your own work, and say why."
    }
  ],

  warmup: {
    minutes: 5,
    items: [
      {
        id: "w1",
        targets: ["8.1"],
        prompt: "What do you think \"Human-Centered AI\" means? Say it in one sentence.",
        expected:
          "Most say AI that seems human, or is friendly. Note who talks about people's rights, or who stays in charge."
      },
      {
        id: "w2",
        targets: ["8.2"],
        prompt:
          "An app uses AI to chat with lonely teenagers late at night. They say it makes them feel better. Is there anything to worry about?",
        expected:
          "Most say it's fine because it helps. Note who asks about their data, whether an adult knows, or whether it takes the place of real friends."
      },
      {
        id: "w3",
        targets: ["8.3"],
        prompt: "Name one job at work or school an AI could do faster than a person. Should it do that job alone?",
        expected:
          "Most answer by speed: if it's faster, let it. Note who asks who the job affects, or who answers for it when it goes wrong."
      }
    ]
  },

  check: {
    minutes: 10,
    items: [
      {
        id: "p1",
        targets: ["8.1"],
        prompt: "What makes AI human-centered? Name one thing UNESCO or the United Nations say it must respect.",
        crit:
          "Says it puts people's dignity, rights and control first, not that it seems human. Names human dignity or human rights (UNESCO), or that children's rights apply online too (UN). Reteach if they describe AI that acts like a person."
      },
      {
        id: "p2",
        targets: ["8.2"],
        prompt:
          "A free AI \"friend\" app is aimed at teenagers. It is always there, and it asks for photos \"to get to know you.\" Keep it, change it, or stop it? Give two reasons.",
        crit:
          "Sees that a child is involved, names the risk to their privacy and dignity, and asks what it does to real friendships. Says change or stop, with a real change, like no photos or an adult in the loop. Reteach if they judge it only by whether it works or is popular."
      },
      {
        id: "p3",
        targets: ["8.3"],
        prompt: "Pick one decision or relationship in your own work or life. Where must a person, not an AI, stay? Why?",
        crit:
          "Names one real decision or relationship. The reason is about dignity, rights, care, or who answers for it. Reteach if they say \"everything\" or \"nothing\", or give only speed or cost."
      }
    ],
    exit: {
      rating: "How relevant was today to how AI is used around you? (1 = not at all, 5 = directly)",
      open: "Which one use of AI near you would you now ask more questions about?"
    }
  }
};
