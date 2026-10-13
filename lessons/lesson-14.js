/**
 * Essentials 2 — Keeping Your Devices and Accounts Safe.
 *
 * An essential, like Essentials 1: taken at any point. It keeps n: 14 for its
 * page address; learners see "Essentials 2".
 *
 * Backward design: objectives, then the warm-up and check (approved
 * 2026-10-13). Stages come next.
 * David approved the objectives on 2026-10-12, with E2.2 reworded and
 * prompt injection moved to the companion module "UX/UI for AI builders".
 * Plan, ranking and checked sources: docs/essentials-gaps-ai-calls-and-security.md.
 * Security claims must rest on security agencies' published guidance (e.g. FBI
 * IC3, CISA, the UK's NCSC), checked before they go into claims.js.
 */

export default {
  n: 14,
  category: "essentials",
  label: "Essentials 2",
  idPrefix: "E2",
  slug: "devices-and-accounts",
  title: "Keeping Your Devices and Accounts Safe",
  ready: false,
  objectivesApproved: "2026-10-12",
  framing:
    "Many attacks don't need your password. They use an old update, a fake app, or an account taken over without anyone noticing. This lesson gives you three habits that close those doors.",
  objectives: [
    {
      id: "E2.1",
      bloom: "apply",
      text: "Turn on automatic updates, and install security updates promptly, on your own phone, computer and apps."
    },
    {
      id: "E2.2",
      bloom: "evaluate",
      text: "Judge whether an AI app, browser extension or \"connect your account\" request is genuine, from where it came from and what it asks to see, before you install it or say yes."
    },
    {
      id: "E2.3",
      bloom: "apply",
      text: "Recover a hacked account in order: get back in through the real site, lock it, remove access you didn't give, and warn your contacts."
    }
  ],

  // Warm-up and check approved by David on 2026-10-13. One pre and one post item per objective.
  warmup: {
    minutes: 5,
    items: [
      {
        id: "w1",
        targets: ["E2.1"],
        prompt: "Your phone says an update is ready. Is it safe to tap \"Remind me later\" for a few weeks?",
        expected:
          "Most say yes, because updates just add new features. Note who says updates fix security holes."
      },
      {
        id: "w2",
        targets: ["E2.2"],
        prompt: "An AI browser extension has thousands of users and a \"Featured\" badge. Is it safe to install?",
        expected:
          "Most say yes. Note who asks who made it, or what it will be able to see."
      },
      {
        id: "w3",
        targets: ["E2.3"],
        prompt: "You think someone got into your email. Is changing the password enough?",
        expected:
          "Most say yes. Note who mentions signing out other devices, forwarding rules, or apps that still have access."
      }
    ]
  },

  check: {
    minutes: 10,
    items: [
      {
        id: "p1",
        targets: ["E2.1"],
        prompt: "Give two reasons to install updates soon. How will you stop forgetting?",
        crit:
          "Says updates fix security flaws that criminals use, and that old devices stop getting them. Turns on automatic updates. Reteach if they think updates only add features."
      },
      {
        id: "p2",
        targets: ["E2.2"],
        prompt:
          "You click an ad for an AI helper. It asks to \"connect to your email\" so it can write replies. What do you check before you say yes?",
        crit:
          "Checks where it came from: the company's own site or the official app store, not an ad or a link. Checks what it wants to see, and says no if it wants more than the job needs. Uses only tools they're allowed to use. Reteach if they trust a badge, lots of users or the top search result."
      },
      {
        id: "p3",
        targets: ["E2.3"],
        prompt:
          "Your friends get a strange link from your account. Then you see a sign-in you didn't make. What do you do, in order?",
        crit:
          "Uses the provider's own recovery page. Changes the password, and any it was reused on. Signs out all devices and turns on two-step sign-in. Checks forwarding rules and removes apps they didn't add. Then warns contacts. Students tell a trusted adult first. Reteach if they stop at a new password."
      }
    ],
    exit: {
      rating: "How useful was today for keeping your devices and accounts safe? (1 = not at all, 5 = very)",
      open: "Which one thing will you check or turn on this week?"
    }
  }
};
