/**
 * Essentials 2 — Keeping Your Devices and Accounts Safe.
 *
 * An essential, like Essentials 1: taken at any point. It keeps n: 14 for its
 * page address; learners see "Essentials 2".
 *
 * Backward design: objectives (approved 2026-10-12, with E2.2 reworded and
 * prompt injection moved to the companion module "UX/UI for AI builders"),
 * then the warm-up and check, then the stages (both approved 2026-10-13).
 * The concrete stage is the `requests` exercise: made-up things a phone or
 * computer asks of you, each keyed say yes, say no or check first. The
 * pictorial is the `recover` builder: eight recovery steps put in order, with
 * a range of right places where the NCSC's and the FTC's orders differ.
 * Plan and stage design: docs/lesson-14-design.md. Ranking and checked sources:
 * docs/essentials-gaps-ai-calls-and-security.md. Security claims must rest on security agencies' published guidance (e.g. FBI
 * IC3, CISA, the UK's NCSC), checked before they go into claims.js.
 */

export default {
  n: 14,
  category: "essentials",
  label: "Essentials 2",
  idPrefix: "E2",
  slug: "devices-and-accounts",
  title: "Keeping Your Devices and Accounts Safe",
  ready: true,
  objectivesApproved: "2026-10-12",
  framing:
    "Many attacks don't need your password. They use an old update, a fake app, or an account taken over without anyone noticing. This lesson gives you three habits that close those doors.",
  arcs: {
    attention:
      "Ask for a show of hands: \"Who has tapped 'Remind me later' on an update this month?\" Hands only, no stories.",
    relevance: {
      educators:
        "School laptops and accounts hold student records. An old update, a fake extension or a hacked email can expose them. Three habits keep that data safe.",
      professionals:
        "Work laptops and accounts hold company and customer data. A fake AI tool or a hacked email can leak it, or send scams in your name. Three habits close those doors.",
      students:
        "Your phone, your games and your school account matter. These habits keep strangers out of them. A trusted adult can always help."
    },
    confidence:
      "You don't need to be a tech expert. Turn on updates, ask two questions before you say yes, and follow the steps in order.",
    satisfaction:
      "Learners leave with automatic updates turned on, or a time to do it, and the steps to get a hacked account back."
  },
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

  // Stage design approved by David on 2026-10-13 (docs/lesson-14-design.md).
  stages: [
    {
      kind: "concrete",
      exercise: "requests",
      title: "Yes, no, or check first?",
      minutes: 12,
      targets: ["E2.1", "E2.2"],
      moves: [
        "Hand out the requests for the group's track. Say they were made up for this lesson. Nobody installs or types anything.",
        "Learners choose for each one: say yes, say no, or check first. They name what they looked at, and how they would check.",
        "Reveal one request at a time. Ask: where did it come from, and what does it want to see?",
        "Point out the yes answers. The habit is to check, not to refuse everything."
      ],
      say: [
        ["Facilitator", "Two questions before you say yes: where did it come from, and what does it want to see?"],
        ["Expected", "\"It has a Featured badge, so it's safe.\" Say: a badge and lots of users don't prove who made it."],
        ["Facilitator", "Updates come from your settings or the official store. Never from a pop-up on a web page."]
      ],
      watch:
        "Learners say no to everything. Ask what makes the yes answers safe: they come from settings or an approved tool, and ask only for what the job needs. Learners trust a request because the sign-in screen looks real. The screen can be real while the app behind it is not.",
      tracks: {
        educators: {
          context: "Five made-up requests on a classroom laptop, a phone and a school account.",
          requests: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "e2-key-educators",
            items: [
              {
                kind: "extension",
                where: "The browser's official extension store, after you searched for \"grading\". It has a \"Featured\" badge and 40,000 users.",
                text: "GradeGenie AI: grade essays in seconds. Add to browser.",
                asks: ["Read and change all your data on all websites"],
                key: "check",
                look: {
                  source: "The official store, but a badge and many users don't prove who made it.",
                  access: "Every website you open, including your student records."
                },
                check: "Ask your school's IT team if it's approved. Find out who makes it, on the company's own website.",
                note: "A security company found fake AI extensions with a \"Featured\" badge and about 900,000 users. This one could see student records on any site."
              },
              {
                kind: "update",
                where: "Your classroom laptop's own Settings, under Update.",
                text: "A security update is ready. Your laptop will restart at 11 p.m. tonight to install it. Restart now, or keep the time.",
                key: "yes",
                look: {
                  source: "The laptop's own settings.",
                  access: "Nothing. It asks for no password and no details."
                },
                check: "Nothing to check. Let it install tonight, or now if the time suits you.",
                note: "Updates fix security holes that criminals use. Don't keep putting them off."
              },
              {
                kind: "popup",
                where: "A pop-up on a website with free lesson plans.",
                text: "Your browser is out of date! Download the update now to keep viewing this page.",
                asks: ["Download and open a file"],
                key: "no",
                look: {
                  source: "A web page, not your browser's settings.",
                  access: "To run a file on your laptop.",
                  rush: "\"Now\", or you lose the page."
                },
                check: "Close the page. To check for updates, open your browser's own settings, or ask your IT team.",
                note: "Updates come from your settings or the official store, never a pop-up on a web page. Fake browser updates are a known way to spread harmful software."
              },
              {
                kind: "connect",
                where: "A sign-in screen, after you clicked \"Sign in with your school account\" in a free AI quiz maker.",
                text: "QuizWhiz AI wants to access your school account.",
                asks: ["Read, write and send email as you", "See and download all your files", "See your contacts"],
                key: "no",
                look: {
                  source: "A free tool you found online, not one your school approved.",
                  access: "Far more than a quiz needs: your email, files and contacts."
                },
                check: "Choose Cancel. Ask your IT team for an approved quiz tool. If you already said yes, remove it in your account's security settings.",
                note: "Saying yes can let an app into your account without your password. A new password doesn't remove it."
              },
              {
                kind: "update",
                where: "Your phone's own Settings app.",
                text: "Automatic updates are off. Turn on automatic updates?",
                key: "yes",
                look: {
                  source: "Your phone's own settings.",
                  access: "Nothing new. It only changes when updates install."
                },
                check: "Nothing to check. Turn it on.",
                note: "With automatic updates, you don't have to remember. Old phones stop getting updates, so check that yours still does."
              }
            ]
          }
        },
        professionals: {
          context: "Five made-up requests on a work laptop and a work account.",
          requests: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "e2-key-professionals",
            items: [
              {
                kind: "update",
                where: "Your work laptop's own Settings, under Update.",
                text: "A security update is ready. Restart to finish installing it.",
                key: "yes",
                look: {
                  source: "The laptop's own settings, run by your IT team.",
                  access: "Nothing. It asks for no password and no details."
                },
                check: "Nothing to check. Save your work and restart.",
                note: "Updates fix security holes that criminals use. Putting them off for weeks leaves the hole open."
              },
              {
                kind: "connect",
                where: "A sign-in screen, after you clicked \"Connect\" in an AI meeting-notes app a colleague told you about.",
                text: "MeetMind AI wants to access your work account.",
                asks: ["See and edit your calendar", "Read, write and send email as you", "See all your contacts"],
                key: "check",
                look: {
                  source: "A colleague's tip, not your company's list of approved tools.",
                  access: "Your calendar may fit the job. Sending email as you doesn't."
                },
                check: "Ask IT if it's approved before you connect a work account. Say no to anything the job doesn't need.",
                note: "Saying yes can let an app into your account without your password. A new password doesn't remove it. Check first, because it's company data."
              },
              {
                kind: "popup",
                where: "A pop-up on a news site you read at lunch.",
                text: "Your browser needs an urgent security update. Install it now to keep browsing safely.",
                asks: ["Download and open a file"],
                key: "no",
                look: {
                  source: "A web page, not your browser or your IT team.",
                  access: "To run a file on your work laptop.",
                  rush: "\"Urgent\" and \"now\"."
                },
                check: "Close the tab. Updates come from your laptop's settings or your IT team. Tell IT about the pop-up.",
                note: "Criminals have spread harmful software dressed up as browser updates. A web page can't update your browser."
              },
              {
                kind: "extension",
                where: "A search ad at the top of the results for \"AI sidebar\". It leads to the official extension store, where it has a \"Featured\" badge and 600,000 users.",
                text: "AI Sidebar: chat with popular AI models on any page. Add to browser.",
                asks: ["Read and change all your data on all websites"],
                key: "check",
                look: {
                  source: "An ad, then the official store. A badge and a big user count don't prove who made it.",
                  access: "Every page you open, and everything you type into AI chats."
                },
                check: "Don't install it from the ad. Ask IT if it's approved, and use the AI company's own website or app.",
                note: "A security company found two fake AI sidebars like this, with about 900,000 users. They sent people's AI chats to criminals. One had a \"Featured\" badge."
              },
              {
                kind: "app",
                where: "The video-call app your company approved, opened from your IT team's page. You've just clicked Join.",
                text: "Allow access to your microphone so others can hear you?",
                asks: ["Use your microphone during this call"],
                key: "yes",
                look: {
                  source: "An approved app, opened the usual way, right after you clicked Join.",
                  access: "Only the microphone, which a call needs."
                },
                check: "Nothing to check. Allow it. You can turn it off again in Settings.",
                note: "It asks only for what the call needs, just when you need it, from an app you're allowed to use. Not every request is a threat."
              }
            ]
          }
        },
        students: {
          context: "Five made-up requests on your own phone. Just read them. Don't install or type anything.",
          requests: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "e2-key-students",
            items: [
              {
                kind: "app",
                where: "An ad in a video app.",
                text: "Homework Hero AI: finish any homework in seconds! Free download.",
                asks: ["See your contacts", "See your photos", "Know your location"],
                key: "check",
                look: {
                  source: "An ad, not your school.",
                  access: "Your contacts, photos and location. Homework doesn't need those."
                },
                check: "Don't tap the ad. Ask a trusted adult. Use only the AI tools your school allows.",
                note: "Fake apps can look real. A trusted adult can help you check if your school allows it."
              },
              {
                kind: "connect",
                where: "A website that offers free game coins.",
                text: "Connect your game account to get 1,000 free coins! Offer ends in 10 minutes.",
                asks: ["See your friends list", "Send messages as you", "See what you've bought"],
                key: "no",
                look: {
                  source: "A website you don't know, not the game itself.",
                  access: "Your friends and your messages. Coins don't need those.",
                  rush: "\"Ends in 10 minutes.\""
                },
                check: "Close the page. Tell a trusted adult. Get coins only inside the game itself.",
                note: "Saying yes can let a stranger into your account without your password. They could message your friends as you."
              },
              {
                kind: "update",
                where: "Your phone's own Settings app.",
                text: "A security update is ready. Install it tonight?",
                key: "yes",
                look: {
                  source: "Your phone's own settings.",
                  access: "Nothing. It asks for no password and no details."
                },
                check: "Nothing to check. Say yes, or ask a parent or carer to help.",
                note: "Updates fix holes that criminals use. Saying yes keeps your phone safer."
              },
              {
                kind: "popup",
                where: "A pop-up on a website with free videos.",
                text: "Your browser is out of date. Download the update to keep watching.",
                asks: ["Install a file from this page"],
                key: "no",
                look: {
                  source: "A web page, not your phone's settings or the app store.",
                  access: "To put something new on your phone."
                },
                check: "Close the page. Tell a trusted adult. Real updates come from your phone's settings or the app store.",
                note: "A web page can't update your phone. Fake updates can put harmful software on it. If you tapped it, it's not your fault. Tell an adult."
              },
              {
                kind: "update",
                where: "The official app store on your phone.",
                text: "An update is ready for ReadAlong, your school's reading app.",
                key: "yes",
                look: {
                  source: "The official app store, for an app your school uses.",
                  access: "Nothing new."
                },
                check: "Nothing to check. Update it, or ask a parent or carer to help.",
                note: "App updates fix security holes too. The official store is the right place to get them."
              }
            ]
          }
        }
      }
    },
    {
      kind: "pictorial",
      title: "Get your account back, in order",
      minutes: 10,
      targets: ["E2.3"],
      figure: "recover",
      claim: "e2-key-recover",
      // Learner-visible instructions. Same in every track.
      intro: [
        "Someone got into your email. Put these eight steps in order, from first to last. Use Move up and Move down.",
        "Then show the order. Some steps have more than one right place, because the UK and US guides order them a little differently.",
        "Nothing you choose is saved or sent."
      ],
      // In the NCSC's order, with the FBI's step 5 added and its "update your devices" left to E2.1.
      // places: the range of right places. Where the NCSC's and the FTC's orders differ, both are right.
      steps: [
        { id: "recovery", label: "Recovery page", text: "Go to the real site's own recovery page. Don't use a link in a message.", places: [1, 1], why: "This comes first. A link in a message could lead to a fake page. The real site's help pages show you how to get back in." },
        { id: "forwarding", label: "Forwarding rules", text: "Check your email for forwarding rules you didn't set up.", places: [2, 6], why: "A forwarding rule sends the attacker a copy of your mail, even password reset emails. The UK guide checks it before the new password. The US guide checks it later." },
        { id: "password", label: "New password", text: "Change the password. Change it on any account where you used the same one, too.", places: [2, 3], why: "Do this early, so the old password stops working. Attackers try the same password on other sites." },
        { id: "signout", label: "Sign out everywhere", text: "Sign out of every device.", places: [3, 4], why: "The attacker may still be signed in. Signing out every device ends their visit." },
        { id: "apps", label: "Remove apps", text: "Remove apps and connections you didn't add.", places: [4, 6], why: "A new password doesn't remove an app that was given access. The FBI says you have to remove it in your security settings." },
        { id: "twostep", label: "Two-step sign-in", text: "Turn on two-step sign-in.", places: [4, 6], why: "Then a stolen password alone isn't enough to get back in." },
        { id: "contacts", label: "Warn contacts", text: "Tell your contacts not to trust recent messages from you.", places: [7, 7], why: "Do this once the account is locked. The attacker may have sent scams to your friends in your name." },
        { id: "money", label: "Check money and report", text: "Check your bank and shopping accounts, and report it.", places: [8, 8], why: "Look for payments you didn't make. In the UK, report it to Report Fraud. In the US, go to IdentityTheft.gov if your personal details were taken." }
      ],
      // The jumbled order the builder starts in: no step starts in a right place.
      start: ["forwarding", "twostep", "contacts", "recovery", "money", "password", "apps", "signout"],
      moves: [
        "Say: someone got into your email. Learners put the eight steps in order, alone or in pairs.",
        "Show the order. Ask: which step surprised you?",
        "Ask: why doesn't a new password remove an app that was given access?",
        "Students: the first step is always to tell a trusted adult. For a school account, also tell the teacher or school IT.",
        "Press Start again if the group wants a second try."
      ],
      say: [
        ["Facilitator", "A new password is step three, not the last step."],
        ["Expected", "\"I'd warn my friends first.\" Say: lock the account first, or the attacker keeps sending messages as you."],
        ["Facilitator", "Nothing you choose here is saved or sent."]
      ],
      watch:
        "Learners stop at a new password. Ask what still lets the attacker in: a forwarding rule, a device still signed in, or an app that was given access."
    },
    {
      kind: "abstract",
      title: "Habits that close the doors",
      minutes: 8,
      targets: ["E2.1", "E2.2", "E2.3"],
      principles: ["updates-ncsc-cisa", "fake-updates-cisa", "fake-downloads-fbi", "fake-ai-extensions-example", "consent-phishing-fbi", "recover-hacked-account", "identitytheft-gov"],
      tables: [
        {
          title: "Keep things updated",
          head: ["Habit", "Why it helps"],
          rows: [
            ["Turn on automatic updates.", "You don't have to remember. Updates install on their own."],
            ["Install updates soon.", "Updates fix security holes that criminals use."],
            ["Get updates from your settings or the official store.", "Never from a pop-up on a web page. Fake updates can carry harmful software."],
            ["Check that your device still gets updates.", "Old devices stop getting them. Then it's time to replace it."]
          ]
        },
        {
          title: "Before you install or connect",
          head: ["Ask", "What to look for"],
          rows: [
            ["Where did it come from?", "Type the company's address, or use the official app store. Don't trust an ad or a link."],
            ["What does it ask to see?", "No more than the job needs. A tool that writes one reply doesn't need to send all your email."],
            ["Does a badge or lots of users prove it's safe?", "No. Fake AI extensions have had both."],
            ["Am I allowed to use it?", "At school or work, use only approved tools. Students ask a trusted adult."],
            ["Can I take it back?", "Yes. Remove apps and connections in your account's security settings."]
          ]
        },
        {
          title: "If your account is hacked",
          head: ["Step", "Do this"],
          rows: [
            ["1. Get back in", "Use the real site's own recovery page, not a link in a message."],
            ["2. Lock it", "Check for forwarding rules. Change the password, and any you used again. Sign out of every device."],
            ["3. Remove access", "Remove apps you didn't add. Turn on two-step sign-in."],
            ["4. Warn and check", "Warn your contacts. Check your bank, and report it."]
          ]
        },
        {
          title: "Where to get help",
          head: ["Who", "How"],
          rows: [
            ["A trusted adult (students)", "Tell them first, before you do anything else."],
            ["Your school or workplace", "Tell IT about a hacked school or work account, or an app you're not sure of."],
            ["The company that runs the account", "Use the help pages on its own website."],
            ["The UK", "If you lost money, tell your bank and report it to Report Fraud. In Scotland, call the police on 101."],
            ["The US", "If your personal details were stolen, go to IdentityTheft.gov for a recovery plan."]
          ]
        }
      ],
      moves: [
        "Read the update habits. Ask who has automatic updates turned on. Hands only.",
        "Read the questions to ask before you install or connect. Ask: which of today's requests failed which question?",
        "Read the recovery steps. Point out the four parts: get back in, lock it, remove access, then warn and check.",
        "Read where to get help. Say who to tell at your school or workplace."
      ],
      say: [
        ["Facilitator", "Most of this is set up once. Turn on updates, check your connected apps, and you're done."],
        ["Expected", "\"My antivirus will catch it.\" Say: an app you said yes to isn't a virus. You remove it in your account's settings."],
        ["Facilitator", "If you clicked or said yes, act fast and tell someone. It's not your fault."]
      ],
      watch:
        "Learners decide it's safer never to update or connect anything. Bring them back to the yes answers: updates from settings, and approved tools that ask only for what they need."
    }
  ],

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
  },

  transfer: {
    educators:
      "Turn on automatic updates on one device this week. Then open your school account's security settings and look at its connected apps. Remove any you don't use or don't know, or ask IT first.",
    professionals:
      "Turn on automatic updates on one device this week. Then look at your work account's connected apps, and remove any you don't use. Ask IT before you remove anything you're not sure of.",
    students:
      "With a parent or carer, turn on automatic updates on your phone this week. Together, check which apps are connected to one of your accounts. Only use the AI tools your school allows."
  },
  followUp: "Follow up in two weeks: which device did you update, and did you find any connected apps you didn't expect?",

  access: [
    {
      channel: "vision",
      note: "The requests are plain text, and each says in words what kind of request it is. The order builder says each step's place in words, and right or wrong with a word and a symbol."
    },
    {
      channel: "hearing",
      note: "Nothing in this lesson needs sound. Every request is written out as text."
    },
    {
      channel: "attention",
      note: "Take the requests one at a time. Pairs can split the five, then compare. In the builder, group the eight steps into the four parts first."
    },
    {
      channel: "motor",
      note: "The builder uses Move up and Move down buttons that work with the keyboard, with no dragging. Start again resets it in one step."
    }
  ]
};
