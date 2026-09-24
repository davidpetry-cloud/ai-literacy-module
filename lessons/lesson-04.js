/**
 * Lesson 4 — Who signs off: human in the loop.
 *
 * The concrete stage is a set of "sign-offs": statements in an AI-assisted
 * document, each with a sign-off attached. Every sign-off is keyed:
 *   sound          a named person, a basis you could check, the right person, in date
 *   not-a-person   a tool's name typed where a person's should be
 *   no-basis       a name and a date, but nothing checked
 *   wrong-signer   a basis that sounds right, from someone who couldn't make the check
 *                  or doesn't answer for the result
 *   lapsed         a proper sign-off, older than two years
 *
 * Dates are stored as `daysAgo`, not as dates, so a sound sign-off can't
 * drift into a lapsed one as real time passes. lesson-core.js turns each one
 * into a ledger record at render time and asks the real attestation-ledger
 * what it thinks. It shows Attested for four of the five.
 *
 * The documents, people and sign-offs are fictional, written for this lesson
 * with problems placed on purpose. They are lesson material, not claims: the
 * course's own claims live in claims.js and are never signed by a model.
 */

export default {
  n: 4,
  slug: "human-in-the-loop",
  title: "Who signs off: human in the loop",
  ready: true,
  objectivesApproved: "2026-09-23",
  framing:
    "A model can propose. Only a named human can attest. This lesson makes that rule concrete — the same one this course applies to its own claims.",
  objectives: [
    {
      id: "4.1",
      bloom: "understand",
      text: "Describe the difference between a proposed value and an attested one, and why an attestation expires."
    },
    {
      id: "4.2",
      bloom: "evaluate",
      text: "Determine who must sign off on an AI-assisted decision in a given scenario, and on what basis."
    },
    {
      id: "4.3",
      bloom: "create",
      text: "Write an attestation — name, basis, date — for an output they have verified."
    }
  ],

  arcs: {
    attention:
      "Show one sign-off: \"Verified by AI Assistant (auto-verify), 3 days ago.\" Ask: \"Would you rely on this? Why not?\"",
    relevance: {
      educators:
        "When a policy page says \"approved\", parents and staff act on it. They need to know who approved it, what they checked, and when.",
      professionals:
        "Clients and auditors ask who approved a statement and on what basis. A sign-off with your name on it is a promise that you checked.",
      students:
        "When your group hands in work, each fact needs an owner. Your name on it means you checked it. It does not mean the AI did."
    },
    confidence:
      "There's no new tool to learn. A sign-off is three things you already know: who checked it, against what, and when.",
    satisfaction:
      "Learners leave having written a real sign-off: their name, what they checked it against, and the date."
  },

  warmup: {
    minutes: 5,
    items: [
      {
        id: "w1",
        targets: ["4.1"],
        prompt: "A colleague says a figure in a report is \"approved\". What would you want to know about that approval?",
        expected:
          "Most take \"approved\" as the end of it. Note who asks who approved it, what they checked, and when."
      },
      {
        id: "w2",
        targets: ["4.2"],
        prompt: "An AI drafts a safety notice for your building. Who should check it before it goes up?",
        expected:
          "Expect \"whoever asked for it\" or \"the AI already checked it.\" Don't correct it yet. The document will do that."
      },
      {
        id: "w3",
        targets: ["4.3"],
        prompt: "You checked a fact in an AI draft. How would someone else know you checked it?",
        expected:
          "Most say \"they'd trust me.\" Few think to write down what they checked it against, and when."
      }
    ]
  },

  stages: [
    {
      kind: "concrete",
      exercise: "sign-offs",
      title: "Check the sign-offs",
      minutes: 12,
      targets: ["4.1", "4.2"],
      moves: [
        "Hand out the document for the group's track. Say that every person and sign-off in it is made up.",
        "Learners mark each sign-off with one word: Sound, Not a person, No basis, Wrong signer, or Lapsed.",
        "Reveal the answers one at a time. Point out what the ledger shows next to each one.",
        "Count how many say Attested. Then ask how many deserve it."
      ],
      say: [
        ["Facilitator", "Every sign-off here has a name and a date. Your job is to decide if each one means anything."],
        ["Expected", "\"It says Attested, so it's fine.\" Ask: what did the software check? What did it not check?"],
        ["Facilitator", "Who could really have made this check? And who answers for it if it's wrong?"]
      ],
      watch:
        "Learners trust the badge. Four of the five show Attested, and only one deserves it. Make them say what the software can't see: whether the basis is real, and whether the signer could make the check.",
      tracks: {
        educators: {
          context: "An AI-drafted handbook page on attendance and school trips, with a sign-off under each rule.",
          signoffs: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l4-key-educators",
            items: [
              {
                statement: "Parents must report an absence by 9 a.m. on the day.",
                by: "Dana Okoro",
                role: "Grade 4 teacher",
                basis: "Looks right to me.",
                daysAgo: 21,
                key: "no-basis",
                note: "A name and a date, but no basis. \"Looks right\" is not a check. Ask what she compared it with."
              },
              {
                statement: "Students may not carry their own prescription medicine on trips. Staff hold it.",
                by: "Priya Raman",
                role: "School nurse",
                basis: "Checked against the district medication policy, section 4.",
                daysAgo: 45,
                key: "sound",
                note: "The right person, a basis you could check yourself, and in date. This one means something."
              },
              {
                statement: "A trip needs one adult for every ten students.",
                by: "Sam Ellery",
                role: "Deputy principal",
                basis: "Checked against the district trips policy.",
                daysAgo: 1100,
                key: "lapsed",
                note: "A good sign-off once, but it's three years old. Ratios and policies change. Someone needs to check it again."
              },
              {
                statement: "Staff must write down each dose they give on a trip in the medicine log.",
                by: "Leo Marsh",
                role: "IT technician",
                basis: "Matched against the nurse's medicine protocol.",
                daysAgo: 30,
                key: "wrong-signer",
                note: "The basis sounds right. But the IT technician doesn't own the protocol and doesn't answer for doses. The nurse should sign this one."
              },
              {
                statement: "Late arrivals must sign in at the front office.",
                by: "AI Assistant (auto-verify)",
                role: "Built-in checker",
                basis: "Automated accuracy scan.",
                daysAgo: 3,
                key: "not-a-person",
                note: "A tool's name typed where a person's should be. The ledger shows Attested because it can't tell. No person checked this."
              }
            ]
          }
        },
        professionals: {
          context: "An AI-drafted client FAQ on how long the company keeps data, with a sign-off under each answer.",
          signoffs: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l4-key-professionals",
            items: [
              {
                statement: "We keep invoices for seven years.",
                by: "Marta Silva",
                role: "Finance manager",
                basis: "Checked against our records retention schedule.",
                daysAgo: 950,
                key: "lapsed",
                note: "The right person and a real basis, but more than two years ago. Retention rules change. Check it against this year's schedule."
              },
              {
                statement: "Support chat logs are deleted after 90 days.",
                by: "DraftBot (verified)",
                role: "AI writing tool",
                basis: "Cross-checked by the model.",
                daysAgo: 5,
                key: "not-a-person",
                note: "The tool that wrote the answer signed its own work. The ledger shows Attested because a name was typed in. No person checked this."
              },
              {
                statement: "Clients can ask for a copy of their data at any time.",
                by: "Jon Adeyemi",
                role: "Data protection lead",
                basis: "Checked against our privacy notice, section 6.",
                daysAgo: 60,
                key: "sound",
                note: "The person who answers for data, a basis you could open yourself, and in date."
              },
              {
                statement: "Backups are kept for 30 days.",
                by: "Kim Tran",
                role: "IT manager",
                basis: "",
                daysAgo: 14,
                key: "no-basis",
                note: "The right kind of person, but no basis at all. The ledger still shows Attested. It never reads that field."
              },
              {
                statement: "Closed accounts are deleted after 12 months, as the contract says.",
                by: "Alex Byrne",
                role: "Sales lead",
                basis: "Matched against the client contract.",
                daysAgo: 25,
                key: "wrong-signer",
                note: "A sales lead can read a contract. But legal and data protection set retention, and they answer for it. The data protection lead should sign."
              }
            ]
          }
        },
        students: {
          context: "A recycling fact sheet for a school club, drafted with AI and partly reused from an older sheet. Each fact has a sign-off.",
          signoffs: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l4-key-students",
            items: [
              {
                statement: "Our survey found that 62% of students recycle their bottles.",
                by: "Ava Lin",
                role: "Club member, wrote the sheet",
                basis: "Checked the survey numbers.",
                daysAgo: 20,
                key: "wrong-signer",
                note: "Another group ran the survey, and Ava never saw the answers. Someone from the survey group should sign this."
              },
              {
                statement: "The school cafeteria uses cups that can be composted.",
                by: "Noah Park",
                role: "Club treasurer",
                basis: "Everyone knows this.",
                daysAgo: 10,
                key: "no-basis",
                note: "\"Everyone knows\" is not a basis. What did Noah look at? Ask the cafeteria, or check the cups."
              },
              {
                statement: "Plastic bottles take 450 years to break down.",
                by: "Homework Helper AI",
                role: "Chatbot",
                basis: "The chatbot said it was accurate.",
                daysAgo: 7,
                key: "not-a-person",
                note: "A chatbot vouching for itself. The ledger shows Attested because a name was typed in. No person checked this number."
              },
              {
                statement: "The city collects recycling every Tuesday.",
                by: "Ms. Grant",
                role: "Club adviser",
                basis: "Checked the city's collection calendar.",
                daysAgo: 800,
                key: "lapsed",
                note: "Checked properly, but more than two years ago. Collection days change. Check this year's calendar."
              },
              {
                statement: "Our school has 24 recycling bins.",
                by: "Leo Diaz",
                role: "Club member",
                basis: "Counted the bins myself and matched the caretaker's list.",
                daysAgo: 15,
                key: "sound",
                note: "He did the check himself, says how, and it's recent. This one means something."
              }
            ]
          }
        }
      }
    },
    {
      kind: "pictorial",
      title: "Sign it yourself",
      minutes: 10,
      targets: ["4.1", "4.3"],
      figure: "sign-off",
      moves: [
        "Open the builder. It starts with the lapsed sign-off from the document.",
        "Switch the signer to an AI tool. Then clear the date. Read the status each time.",
        "Put in a date from three years ago. Then write a real sign-off with today's date.",
        "Last, empty the basis. Ask why the ledger still says Attested."
      ],
      say: [
        ["Facilitator", "The ledger checks three things: who signed, a name, and a date. What doesn't it check?"],
        ["Expected", "\"It checks everything.\" Empty the basis and read the status again."],
        ["Facilitator", "So the badge is only as honest as the person who filled it in."]
      ],
      watch:
        "Learners write a basis like \"I checked it.\" Ask: checked it against what? A basis names something another person could check too."
    },
    {
      kind: "abstract",
      title: "Who signs, and on what",
      minutes: 8,
      targets: ["4.1", "4.2", "4.3"],
      principles: ["attest-not-propose", "attestation-lapses", "signer-must-know", "form-not-substance", "check-fits-stakes"],
      moves: [
        "Read each principle aloud. After each, ask for the sign-off from today that shows it.",
        "Learners name one piece of their own AI-assisted work. Who should sign it, and what should they check it against?"
      ],
      say: [
        ["Facilitator", "This course runs on the same rule. Each claim on the course page says who proposed it and if a person has signed it."],
        ["Expected", "\"So nothing here is signed yet?\""],
        ["Facilitator", "Not yet. They stay Proposed until someone checks them. That's the rule working, not failing."]
      ],
      watch:
        "Learners think the most senior person should sign. Being senior is not a basis. Ask who did the check, and who answers for the result."
    }
  ],

  check: {
    minutes: 10,
    items: [
      {
        id: "p1",
        targets: ["4.1"],
        prompt:
          "A sign-off from 2019 says a policy summary is correct. Can you rely on it today? Explain how a proposed value differs from an attested one, and why sign-offs expire.",
        crit:
          "Says an attested value has a person, a basis and a date, and that rules and facts change, so a check goes stale. Reteach if they treat a sign-off as lasting forever, or treat the AI sounding sure as a sign-off."
      },
      {
        id: "p2",
        targets: ["4.2"],
        prompt:
          "An AI sums up a new privacy law for your team. Three people offer to sign it off. One is the AI's vendor. One read the summary. One read the law itself. Who signs, and on what basis?",
        crit:
          "Picks the person who read the law, and says the basis is the law itself. Reteach if they pick by who is most senior, or pick the person who only read the summary."
      },
      {
        id: "p3",
        targets: ["4.3"],
        prompt: "Write a sign-off for one fact you checked this week. Give your name, what you checked it against, and the date.",
        crit:
          "The basis names a source someone else could look at. Reteach if the basis is \"looked right\" or \"the AI said so\", or if the name or date is missing."
      }
    ],
    exit: {
      rating: "How relevant was today to what you actually use AI for? (1 = not at all, 5 = directly)",
      open: "Whose sign-off does your AI-assisted work need? Who gives it now?"
    }
  },

  transfer: {
    educators:
      "Pick one AI-drafted page you share with families. Add a sign-off to it: who checked it, against what, and when. Set a date to check it again.",
    professionals:
      "Find one AI-assisted document your team relies on. Check who signed it off, on what basis, and when. Fix any sign-off that fails today's checks.",
    students:
      "On your next group project, add a line under each fact. Say who checked it, what they checked it against, and the date."
  },

  access: [
    {
      channel: "vision",
      note: "Every sign-off is plain text. Status badges carry a shape and a word. The builder reads its result aloud as it changes, and the timeline is also a table."
    },
    {
      channel: "language",
      note: "Pre-teach \"sign off\", \"basis\" and \"lapse\" with one example each. Say \"attested\" as \"signed by a person who checked\"."
    },
    {
      channel: "motor",
      note: "The builder is a plain form. Every field works with the keyboard alone, and nothing needs dragging or fine pointing."
    }
  ]
};
