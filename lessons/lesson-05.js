/**
 * Lesson 5 — How it goes wrong, and a checklist that holds.
 *
 * The concrete stage is a "classify" exercise: a request, and an AI answer of
 * five sentences, each keyed by what is wrong with it:
 *   fabrication   a specific detail with nothing behind it: an invented name, number or source
 *   outdated      true once, and has changed since; the item carries a source card
 *   bias          assumes one group, or leaves others out
 *   misread       breaks a line of the request; the item carries that line as `rule`
 *   fine          no error, so "mark everything" loses
 *
 * The pictorial stage is a checklist builder. Its eight checks are shared by
 * every track. `catches` lists the kinds a check really finds; an empty list
 * is a check that feels useful and finds none of the four.
 *
 * These requests and answers are "planted": written by a model for this
 * lesson, with errors placed on purpose. Replace them with captured outputs
 * when you have good ones — set provenance to "captured" with the model and
 * capture date.
 */

export default {
  n: 5,
  slug: "failure-modes",
  title: "How it goes wrong, and a checklist that holds",
  ready: true,
  objectivesApproved: "2026-09-23",
  framing:
    "Most AI errors fall into a handful of kinds. Naming them turns vague unease into specific checks, and a personal checklist makes those checks routine.",
  objectives: [
    {
      id: "5.1",
      bloom: "analyze",
      text: "Classify an output error as a made-up detail, outdated information, bias, or a misread request."
    },
    {
      id: "5.2",
      bloom: "create",
      text: "Assemble a personal checklist for checking their own regular AI use."
    },
    {
      id: "5.3",
      bloom: "evaluate",
      text: "Critique an AI-assisted work product using that checklist."
    }
  ],

  arcs: {
    attention:
      "Put a request and one sentence of the answer side by side. Request: \"Don't mention the cost.\" Answer: \"The $8 ticket is due with the slip.\" Ask: \"What's wrong, and where would you look?\"",
    relevance: {
      educators:
        "Mistakes in a note home aren't all made-up facts. Some ignore what you asked for, or assume things about families. Knowing the kind tells you where to look.",
      professionals:
        "A checklist is faster than rereading. It sends you to the right place for each kind of slip, so a summary can go out with checks you can name.",
      students:
        "Teachers can spot these slips. A short checklist before you hand in work is a habit you can use in every class."
    },
    confidence:
      "There are only four kinds, and each has its own check. That's the whole idea.",
    satisfaction:
      "Learners leave with a checklist of their own, and a way to use it on the next thing an AI writes."
  },

  warmup: {
    minutes: 5,
    items: [
      {
        id: "w1",
        targets: ["5.1"],
        prompt: "An AI writes something that turns out to be wrong. What are the different ways it could be wrong?",
        expected:
          "Most say \"it made something up\" or \"a fact was off.\" Note who mentions old facts, unfair assumptions, or not doing what was asked. Don't correct anyone yet."
      },
      {
        id: "w2",
        targets: ["5.2"],
        prompt: "What do you check before you use something an AI wrote? Write your list.",
        expected:
          "Most write one item, like \"check the facts.\" Note any list with no step you could really do."
      },
      {
        id: "w3",
        targets: ["5.3"],
        prompt:
          "An AI wrote: \"Our library's new hours start Monday. Come after 5 to avoid the crowd.\" You have 30 seconds. What do you check first, and why?",
        expected:
          "Most go by gut. Note who asks what the request said, or how anyone knows the hours."
      }
    ]
  },

  stages: [
    {
      kind: "concrete",
      exercise: "classify",
      title: "Name the mistake",
      minutes: 12,
      targets: ["5.1"],
      moves: [
        "Hand out the request and the answer for the group's track. Say that both are made up.",
        "Learners mark each sentence with one word: Fabrication, Outdated, Bias, Misread request, or No error.",
        "For each sentence, ask what they compared it with: a source, the date, who is left out, or the request.",
        "Reveal one sentence at a time. Ask what they would check next time."
      ],
      say: [
        ["Facilitator", "Each kind of mistake needs a different check. The trick is to name the kind first."],
        ["Expected", "\"They're all made up.\" Ask: is a sentence that ignores the request made up? What do you compare it with?"],
        ["Facilitator", "One sentence here is fine. What made it fine, and how did you know?"]
      ],
      watch:
        "Learners call every mistake a fabrication. That blurs the checks, because a misread request has no source to look up. Ask what they compared each sentence with. The answer decides the kind.",
      tracks: {
        educators: {
          context: "An AI-drafted note home about a planetarium trip.",
          classify: {
            provenance: "planted",
            model: "claude-sonnet-5",
            claim: "l5-key-educators",
            request:
              "Write a short note to parents. Our Grade 5 class visits the planetarium on Thursday. The bus leaves at 9:00, and students bring a packed lunch. Tickets cost $8. Don't mention the cost. Keep it under 60 words.",
            items: [
              {
                text: "Our Grade 5 class visits the planetarium on Thursday, and the bus leaves at 9:00.",
                key: "fine",
                source: null,
                note: "Every detail comes from the request. Nothing is added, nothing is left out, and nothing ignores a rule."
              },
              {
                text: "Students will see all nine planets in the dome show.",
                key: "outdated",
                source: "International Astronomical Union (2006). Resolution B5: Definition of a Planet in the Solar System. Pluto was reclassified as a dwarf planet, which leaves eight planets.",
                note: "This was true until 2006. Pluto was then reclassified as a dwarf planet. Check the date behind a fact, not just the fact."
              },
              {
                text: "The $8 ticket is due with the permission slip.",
                key: "misread",
                rule: "Don't mention the cost.",
                source: null,
                note: "The number is right, but the request said not to mention the cost. This one only shows when you read the request."
              },
              {
                text: "Mums can pack the lunches the night before.",
                key: "bias",
                source: null,
                note: "It assumes mothers do the packing. Fathers, guardians and students who pack their own lunch are left out."
              },
              {
                text: "Our guide, Dr. Priya Nandakumar from the university observatory, will answer questions.",
                key: "fabrication",
                source: null,
                note: "The request named no guide. The name, the title and the observatory were made up, and nothing on the page can back them."
              }
            ]
          }
        },
        professionals: {
          context: "An AI-drafted blurb for a team newsletter about sending EU data to the US.",
          classify: {
            provenance: "planted",
            model: "claude-sonnet-5",
            claim: "l5-key-professionals",
            request:
              "Write a short blurb for the team newsletter on how we send EU customers' data to our US servers, which are run by Nimbus Host. Use plain words, with no legal terms. Keep it under 70 words.",
            items: [
              {
                text: "Each transfer relies on Standard Contractual Clauses under Article 46(2)(c) of the GDPR.",
                key: "misread",
                rule: "Use plain words, with no legal terms.",
                source: null,
                note: "The request asked for plain words. Clause names and article numbers are the legal terms it ruled out."
              },
              {
                text: "A 2023 audit found that we had zero transfer incidents.",
                key: "fabrication",
                source: null,
                note: "The request mentioned no audit. The year and the result were made up, and nothing on the page can back them."
              },
              {
                text: "We send EU customers' data to our US servers, which are run by Nimbus Host.",
                key: "fine",
                source: null,
                note: "Every detail comes from the request. It adds nothing and breaks no rule."
              },
              {
                text: "Those transfers are covered by the EU–US Privacy Shield.",
                key: "outdated",
                source: "Court of Justice of the EU (2020). Case C-311/18, Schrems II: the Privacy Shield decision was invalid. European Commission (2023). Adequacy decision for the EU–US Data Privacy Framework.",
                note: "Privacy Shield was struck down in 2020, and a new framework replaced it in 2023. The sentence was true once."
              },
              {
                text: "The new consent screen is simple enough that even our older staff can use it.",
                key: "bias",
                source: null,
                note: "It assumes older staff are less able with technology. That is a stereotype, not a fact about your team."
              }
            ]
          }
        },
        students: {
          context: "An AI-written reminder for the school newsletter about SAT registration.",
          classify: {
            provenance: "planted",
            model: "claude-sonnet-5",
            claim: "l5-key-students",
            request:
              "Write a short reminder for the school newsletter about SAT registration. It is for juniors only. Juniors must register for the SAT by the end of next week. Keep it under 60 words.",
            items: [
              {
                text: "Ask your mom or dad to check the form with you.",
                key: "bias",
                source: null,
                note: "It assumes every student lives with a mom and a dad. Many live with one parent, grandparents or carers."
              },
              {
                text: "Juniors, register for the SAT by the end of next week.",
                key: "fine",
                source: null,
                note: "It says what the request said, and nothing more. There is nothing to fix."
              },
              {
                text: "Last year's juniors gained 140 points after our prep workshop.",
                key: "fabrication",
                source: null,
                note: "The request mentioned no workshop and no scores. The number was made up, and nothing on the page can back it."
              },
              {
                text: "All students, from freshmen to seniors, should sign up now.",
                key: "misread",
                rule: "It is for juniors only.",
                source: null,
                note: "The request said the reminder is for juniors only. This sentence tells the whole school to sign up."
              },
              {
                text: "Bring two sharpened pencils, because the SAT is taken on paper.",
                key: "outdated",
                source: "College Board. The digital SAT: the SAT moved to a digital format, and students in the US have taken it on a computer since spring 2024.",
                note: "For years this was true. The US moved to a digital test in 2024. Check the date behind a fact."
              }
            ]
          }
        }
      }
    },
    {
      kind: "pictorial",
      title: "Build a checklist that covers every kind",
      minutes: 10,
      targets: ["5.2", "5.3"],
      figure: "checklist",
      limit: 5,
      // The builder runs the learner's checklist over this track's concrete answer (objective 5.3).
      checks: [
        {
          id: "c1",
          text: "Look up every name, number and source in the original.",
          catches: ["fabrication"],
          note: ""
        },
        {
          id: "c2",
          text: "Check the date behind each fact. Has it changed since?",
          catches: ["outdated"],
          note: ""
        },
        {
          id: "c3",
          text: "Ask who is left out, or described in one fixed way.",
          catches: ["bias"],
          note: ""
        },
        {
          id: "c4",
          text: "Read my request line by line. Tick what I asked for and what I ruled out.",
          catches: ["misread"],
          note: ""
        },
        {
          id: "c5",
          text: "Check the length and the format I asked for.",
          catches: ["misread"],
          note: ""
        },
        {
          id: "c6",
          text: "Read it again and see if it sounds right.",
          catches: [],
          note: "Wrong answers sound right too."
        },
        {
          id: "c7",
          text: "Ask the AI if it is sure.",
          catches: [],
          note: "It answers the same way when it is wrong."
        },
        {
          id: "c8",
          text: "Paste it into a second chatbot and see if it agrees.",
          catches: [],
          note: "A second chatbot can make the same mistake, so it isn't an independent source."
        }
      ],
      moves: [
        "Read the eight checks aloud. Ask which ones you could really do in two minutes.",
        "Learners tick up to five checks, one at a time. After each tick, read the status line aloud.",
        "Aim for a grid with no empty row. Then try to reach it with fewer ticks.",
        "Read the run on today's answer. Which mistake got through, and which check would have caught it?",
        "Type the weekly task into the field. Read your checklist back."
      ],
      say: [
        ["Facilitator", "Look for an empty row. Which kind of mistake would get through your checklist?"],
        ["Expected", "\"I'll just tick all eight.\" Ask: would you really do eight checks every time?"],
        ["Facilitator", "Now run it on today's answer. Did anything get past you?"]
      ],
      watch:
        "Learners tick \"read it again\" first, because it feels like checking. It catches none of the four kinds. Point at the empty grid when they tick it."
    },
    {
      kind: "abstract",
      title: "One check for each kind",
      minutes: 8,
      targets: ["5.1", "5.2", "5.3"],
      principles: ["error-kinds", "outdated-cutoff", "bias-inherited", "misread-instruction", "checklist-specific"],
      moves: [
        "Read each principle aloud. After each, ask for the sentence from the concrete stage that shows it.",
        "Learners write a final checklist of five checks or fewer, for one thing they use AI for every week.",
        "Now run it over the concrete answer. For each mistake, write which check would catch it. Then write one that would slip through."
      ],
      say: [
        ["Facilitator", "A checklist is a promise to your future self. Make each check small enough to keep."],
        ["Expected", "\"It would have caught everything.\" Ask: which check caught the misread request? Show me the line."],
        ["Facilitator", "A miss is useful. Add the check that would have caught it, or drop one that never catches anything."]
      ],
      watch:
        "Learners write checks like \"be careful.\" A check is something you do with your hands or eyes, like \"find the source\" or \"read the request again.\" Ask what they would do first."
    }
  ],

  check: {
    minutes: 10,
    items: [
      {
        id: "p1",
        targets: ["5.1"],
        prompt:
          "Name the kind of error in each. (a) An AI names a CEO who left two years ago. (b) You asked for three bullets and got a paragraph. (c) An AI quotes a study that doesn't exist. (d) A job ad from an AI asks for a \"young, energetic team.\"",
        crit:
          "Says (a) outdated, (b) misread request, (c) fabrication, (d) bias. Reteach if they call everything \"made up\" or \"wrong,\" or can't say what they would compare each one with."
      },
      {
        id: "p2",
        targets: ["5.2"],
        prompt: "Write a checklist of five checks or fewer for one thing you use AI for every week. Name the thing.",
        crit:
          "Names a real task, every check is something they can do, and every kind of error has a check. Reteach if a check is \"make sure it's good\" or \"see if it sounds right,\" or if a kind has no check."
      },
      {
        id: "p3",
        targets: ["5.3"],
        prompt:
          "Your request was: \"Two sentences. Meeting is Thursday at 7 in the library. Don't mention food.\" The AI wrote: \"Book club meets Thursday at 7 in the library. Snacks are provided, so come hungry. Everyone loves a good thriller, especially the ladies.\" Use your checklist to critique it. What do you find, and which check found each?",
        crit:
          "Finds three problems: a third sentence, food mentioned, and \"the ladies.\" Names the check that found each. Reteach if they only fix the wording, say it looks fine, or find problems without saying which check caught them."
      }
    ],
    exit: {
      rating: "How relevant was today to what you actually use AI for? (1 = not at all, 5 = directly)",
      open: "Which check from your list will you use first this week?"
    }
  },

  transfer: {
    educators:
      "Use your checklist on the next AI draft you send home. Note which check caught something, and which caught nothing.",
    professionals:
      "Keep your checklist next to the tool you use most. Use it on the next three outputs, and note what each check caught.",
    students:
      "Use your checklist on your next AI-assisted assignment. Hand it in with the work, with a note on what you found."
  },

  access: [
    {
      channel: "vision",
      note: "The grid is also a table that lists which checks cover each kind. Each tick is read aloud as a status line, and the checks are plain labelled boxes."
    },
    {
      channel: "language",
      note: "Pre-teach \"fabrication\", \"outdated\" and \"bias\" with one example each. Say \"misread\" as \"didn't do what I asked\"."
    },
    {
      channel: "attention",
      note: "Five sentences, one decision each. In the builder, tick one check at a time and talk about it before you tick the next."
    }
  ]
};
