/**
 * Essentials 3 — Talking With AI on the Phone.
 *
 * An essential, like Essentials 1 and 2: taken at any point. It keeps n: 15
 * for its page address; learners see "Essentials 3".
 *
 * Backward design: objectives (approved by David on 2026-10-13, with "what to
 * say and what not to say" added at his request), then the warm-up and check
 * (approved the same day). The stage design is approved too (a new
 * `pause-call` exercise and the `share` sorter generalised to three bins);
 * the stages are built in their own session. Plan, stage design and checked
 * sources: docs/lesson-15-design.md. Builds on Essentials 1's voice-bot rows
 * without repeating them. Security claims must rest on agencies' published
 * guidance (e.g. FBI IC3, the FCC, the FTC, the CFPB), checked before they go
 * into the claims ledger.
 */

export default {
  n: 15,
  category: "essentials",
  label: "Essentials 3",
  idPrefix: "E3",
  slug: "ai-on-the-phone",
  title: "Talking With AI on the Phone",
  ready: false,
  objectivesApproved: "2026-10-13",
  framing:
    "AI voices now answer company phone lines, and scammers use them too. A voice can sound human, or like someone you love. This lesson gives you words to say, words to keep back, and ways to protect your own voice.",
  objectives: [
    {
      id: "E3.1",
      bloom: "understand",
      text: "Explain what an AI voice can do on a call, and what the law where you live says it must tell you."
    },
    {
      id: "E3.2",
      bloom: "apply",
      text: "Respond safely to a call that might be a bot: decide whether to answer, what not to say, when to hang up, and how to call back on an official number."
    },
    {
      id: "E3.3",
      bloom: "evaluate",
      text: "Decide what to say to a company's AI agent, what to keep to yourself, and when to ask for a person instead."
    },
    {
      id: "E3.4",
      bloom: "apply",
      text: "Protect your own voice from being copied: limit public recordings, lock your voicemail, and agree a family secret word."
    }
  ],

  // Warm-up and check approved by David on 2026-10-13. One pre and one post item per objective.
  warmup: {
    minutes: 5,
    items: [
      {
        id: "w1",
        targets: ["E3.1"],
        prompt: "A friendly caller sounds completely human. Could it be a computer? Would it have to tell you?",
        expected: "Most say they'd hear a robot. Note who says AI can sound human, or that it might not tell you."
      },
      {
        id: "w2",
        targets: ["E3.2"],
        prompt: "A caller asks, \"Can you hear me?\" What's the harm in saying yes?",
        expected: "Most say none. Note who says they'd hang up, or that a recorded yes can be misused."
      },
      {
        id: "w3",
        targets: ["E3.3"],
        prompt: "You call your bank and an AI answers. It asks for your password to help you faster. Is that OK, because you called them?",
        expected: "Most say yes. Note who says never give a password, or who would ask for a person."
      },
      {
        id: "w4",
        targets: ["E3.4"],
        prompt: "How could someone get a copy of your voice?",
        expected: "Most say only by hacking. Note who mentions videos or voice notes they've posted online."
      }
    ]
  },

  check: {
    minutes: 10,
    items: [
      {
        id: "p1",
        targets: ["E3.1"],
        prompt: "Name two things an AI voice can do on a call. Does a business's AI have to tell you it's an AI?",
        crit:
          "Names two: sound human, copy a real person's voice, answer questions, or call many people at once. Says the rule depends on where you live, and that scam bots ignore it. Reteach if they think a bot always sounds like a robot."
      },
      {
        id: "p2",
        targets: ["E3.2"],
        prompt:
          "A caller says it's your bank. It asks, \"Can you hear me?\" Then it asks you to confirm your account number. What do you do, and what do you not say?",
        crit:
          "Hangs up without saying yes or giving the number. Doesn't press any keys. Calls back on the number on their card or statement. Reteach if they'd say yes to be polite, or give part of the number."
      },
      {
        id: "p3",
        targets: ["E3.3"],
        prompt:
          "You call a company's official number and an AI answers. It keeps getting your problem wrong. What do you say, and what do you keep to yourself?",
        crit:
          "Asks for a person. Describes the problem in their own words. Gives only what the task needs, and never a password. Reteach if they'd share a password, or keep going round in circles."
      },
      {
        id: "p4",
        targets: ["E3.4"],
        prompt: "Give three ways to make it harder for someone to copy your voice or use it to fool your family.",
        crit:
          "Limits public videos and voice notes, or sets accounts to private. Sets a strong voicemail password. Agrees a family secret word. Students do this with a parent or carer. Reteach if they think only famous people's voices get copied."
      }
    ],
    exit: {
      rating: "How useful was today for handling calls from AI? (1 = not at all, 5 = very)",
      open: "What will you say, or not say, on your next unexpected call?"
    }
  }
};
