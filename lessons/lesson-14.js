/**
 * Essentials 2 — Keeping Your Devices and Accounts Safe.
 *
 * An essential, like Essentials 1: taken at any point. It keeps n: 14 for its
 * page address; learners see "Essentials 2".
 *
 * Objectives only (backward design): assessments and activities come next.
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
  ]
};
