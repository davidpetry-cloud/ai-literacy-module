/**
 * Essentials 1 — Staying Secure in the Age of AI.
 *
 * Not part of the numbered sequence: an essential, taken at any point (David,
 * 2026-10-05). It keeps n: 13 for its page address; learners see "Essentials 1".
 *
 * Backward design: objectives approved 2026-10-05, then the warm-up and check
 * below. Stages come next, after David approves the stage design.
 * Plan and sources: docs/lesson-13-design.md. Security claims must rest on
 * security agencies' published guidance (e.g. FBI IC3, CISA, the UK's NCSC),
 * checked before they go into claims.js.
 */

export default {
  n: 13,
  category: "essentials",
  label: "Essentials 1",
  idPrefix: "E1",
  slug: "staying-secure",
  title: "Staying Secure in the Age of AI",
  ready: false,
  objectivesApproved: "2026-10-05",
  framing:
    "AI helps people who attack too. Scams are more convincing, voices can be copied, and what you type into a tool can travel further than you think. This lesson gives you habits that hold up anyway.",
  objectives: [
    {
      id: "E1.1",
      bloom: "understand",
      text: "Explain how AI makes common attacks easier, such as convincing phishing, cloned voices and fake videos."
    },
    {
      id: "E1.2",
      bloom: "analyze",
      text: "Spot the signs of an AI-assisted scam in a message, call or video, and check it through a second channel you trust."
    },
    {
      id: "E1.3",
      bloom: "apply",
      text: "Decide what is safe to put into an AI tool, and keep private, work and other people's information out of it."
    },
    {
      id: "E1.4",
      bloom: "apply",
      text: "Protect your own accounts with a password manager or passkeys, and two-step sign-in."
    }
  ],

  warmup: {
    minutes: 5,
    items: [
      {
        id: "w1",
        targets: ["E1.1"],
        prompt: "Scam messages are easy to spot because they're full of spelling mistakes. True or false?",
        expected:
          "Most say true. Note who says AI can now write a scam with no mistakes at all."
      },
      {
        id: "w2",
        targets: ["E1.2"],
        prompt: "Someone calls with a family member's voice, asking for money right away. How would you know it's really them?",
        expected:
          "Most say they'd know the voice. Note who says they'd hang up and call back on a number they already have, or ask a question only the real person knows."
      },
      {
        id: "w3",
        targets: ["E1.3"],
        prompt: "Is it safe to paste a friend's message, or a work email, into an AI chatbot to help you reply?",
        expected:
          "Most say yes, because it feels private. Note who asks where the text goes, or whose information it is."
      },
      {
        id: "w4",
        targets: ["E1.4"],
        prompt: "What makes a password strong?",
        expected:
          "Most say symbols, capitals, and changing it often. Note who says length, a new password for each account, or a second step to sign in."
      }
    ]
  },

  check: {
    minutes: 10,
    items: [
      {
        id: "p1",
        targets: ["E1.1"],
        prompt: "Name two ways AI makes scams harder to spot.",
        crit:
          "Names two: messages with no mistakes, cloned voices, fake photos or videos, or many fake profiles at once. Reteach if they still check for spelling mistakes first."
      },
      {
        id: "p2",
        targets: ["E1.2"],
        prompt:
          "A message from a friend's account asks you to send money today, and to keep it quiet. What worries you, and how do you check?",
        crit:
          "Names the signs: a rush, a secret, and money. Checks another way they trust, like calling the friend on a number they already have. Reteach if they reply to the message itself to check."
      },
      {
        id: "p3",
        targets: ["E1.3"],
        prompt:
          "Which of these should stay out of a public AI tool? (a) a recipe question, (b) a colleague's medical note, (c) a password, (d) a draft with a customer's home address.",
        crit:
          "Says (b), (c) and (d): private, work and other people's details stay out. Uses only tools they're allowed to use. Reteach if they think deleting the chat later makes it safe."
      },
      {
        id: "p4",
        targets: ["E1.4"],
        prompt: "Give your three best steps to protect an account.",
        crit:
          "Names a passkey, or a long, different password for each account kept in a password manager. Adds two-step sign-in. Says length beats symbols. Reteach if they rely on short, complex passwords changed often."
      }
    ],
    exit: {
      rating: "How useful was today for keeping your accounts and messages safe? (1 = not at all, 5 = very)",
      open: "Which one habit will you start this week?"
    }
  }
};
