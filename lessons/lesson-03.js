/**
 * Lesson 3 — Checking what it says.
 *
 * Passage keys, as in Lesson 1, but every sentence but the "nothing" one names a source:
 *   correct     the source exists and says this
 *   wrong       the source exists but says something else
 *   no-source   the cited source cannot be found: it does not exist
 *   nothing     cannot be wrong, so cannot be checked
 *
 * `uses` feed the pictorial figure, "check-scale". Each track's passage has
 * three uses, and each use gets one level of checking: glance, spot or full.
 * Rows are listed out of order on purpose, so the answer isn't a diagonal.
 *
 * These passages are "planted": written by a model for this lesson, with
 * errors and invented sources placed on purpose. Replace them with captured
 * outputs when you have good ones — set provenance to "captured" with the
 * model and capture date.
 */

export default {
  n: 3,
  slug: "verifying-output",
  title: "Checking what it says",
  ready: true,
  objectivesApproved: "2026-09-23",
  framing:
    "Verification isn't distrust; it's the ordinary work of using any source. The question is how much checking an output needs, and that depends on what happens if it's wrong.",
  objectives: [
    {
      id: "3.1",
      bloom: "apply",
      text: "Check a factual claim in an AI output against an independent primary source."
    },
    {
      id: "3.2",
      bloom: "evaluate",
      text: "Judge whether a cited source exists and actually supports the claim attributed to it."
    },
    {
      id: "3.3",
      bloom: "evaluate",
      text: "Decide how much verification an output needs, based on the stakes of how it will be used."
    }
  ],

  arcs: {
    attention:
      "Put one citation on screen: \"Nguyen and Alvarez (2021), Journal of Applied Learning Research, 14(2), 55–71.\" Ask: \"Could you find this paper in two minutes? What would you do if you couldn't?\"",
    relevance: {
      educators:
        "When a parent asks where a fact in your newsletter came from, \"the AI wrote it\" isn't an answer. A source you can name is.",
      professionals:
        "Your reader, a client or a regulator may look up the sources in your report. If one doesn't exist, that costs you credibility, not the model.",
      students:
        "Teachers can look up your references. A source that doesn't exist looks like cheating, even when you didn't mean it to."
    },
    confidence:
      "You don't need to check everything. This lesson is about how to choose what to check, and how much.",
    satisfaction:
      "Learners leave with a three-step habit: find a source that stands apart from the AI, check that it exists and says the thing, and match the effort to what's at stake."
  },

  warmup: {
    minutes: 5,
    items: [
      {
        id: "w1",
        targets: ["3.1"],
        prompt: "A chatbot tells you a fact you want to use. Where would you check it?",
        expected:
          "Most say \"search for it\" or \"ask another chatbot.\" Note who names the original source, like the law, the study or the group itself. A chatbot, or a page that repeats the claim, can't disagree with it."
      },
      {
        id: "w2",
        targets: ["3.2"],
        prompt: "A chatbot backs a claim with a study. It gives an author and a journal name. Does that mean the study is real?",
        expected:
          "Many say yes, because it named names. Details make a claim sound researched, not real. Note who says they would look it up."
      },
      {
        id: "w3",
        targets: ["3.3"],
        prompt: "You have 10 minutes and an AI draft with 12 facts in it. Do you check all of them, some, or none?",
        expected:
          "Most say all, which nobody really does, or none. This lesson replaces both with one idea: match the check to what's at stake."
      }
    ]
  },

  stages: [
    {
      kind: "concrete",
      title: "Check the sources",
      minutes: 14,
      targets: ["3.1", "3.2"],
      moves: [
        "Hand out the passage for the group's track. Don't say which sources are real.",
        "Learners mark every sentence with one word: Correct, Wrong, No source, or Nothing to check. Ask two questions of each source: does it exist, and does it say this?",
        "Hand out the source cards, or let learners search. They re-mark any sentence the source changes.",
        "Reveal the key one sentence at a time. For each, ask what they checked, and where they found it."
      ],
      say: [
        ["Facilitator", "A name, a year and a journal make a claim sound real. Your job is to find the thing itself and read it."],
        ["Expected", "\"I found the journal, so it's fine.\" Ask: did you find the paper? Did the paper say this?"],
        ["Facilitator", "You can't check a claim with the tool that made it. What could you use instead?"]
      ],
      watch:
        "Learners find that a source exists and stop. A real source can still say something else. Make them read the part that matters. Others ask another chatbot to check. That is not independent, because it can repeat the same mistake.",
      tracks: {
        educators: {
          context: "An AI-drafted paragraph for a staff newsletter on feedback.",
          passage: {
            provenance: "planted",
            model: "claude-sonnet-5",
            claim: "l3-key-educators",
            sentences: [
              {
                text: "Good feedback is at the heart of good teaching.",
                key: "nothing",
                source: null,
                note: "An opinion. It can't be wrong, so it can't be checked. It adds warmth, not information."
              },
              {
                text: "Benjamin Bloom's 1984 paper showed that class size was the biggest single factor in how much students learn.",
                key: "wrong",
                source: "Bloom, B. S. (1984). The 2 sigma problem: The search for methods of group instruction as effective as one-to-one tutoring. Educational Researcher, 13(6), 4–16. Says students taught one to one did about two standard deviations better than students in a regular class.",
                note: "The paper is real, but it says something else. It compares one-to-one tutoring with a regular class. It is not about class size."
              },
              {
                text: "A 2020 review in the Journal of Feedback Studies found that comments without grades doubled how often students revise.",
                key: "no-source",
                source: null,
                note: "No author and no link. Planted for this lesson: there is no such review to find. A journal name, a year and a number make it sound real."
              },
              {
                text: "Black and Wiliam's 1998 review, \"Inside the Black Box\", found that better classroom formative assessment raises student achievement.",
                key: "correct",
                source: "Black, P., & Wiliam, D. (1998). Inside the black box: Raising standards through classroom assessment. Phi Delta Kappan, 80(2), 139–148. Their review of research finds that stronger formative assessment raises achievement.",
                note: "Checkable, and the source agrees."
              }
            ],
            uses: [
              {
                label: "Staff newsletter",
                check: "spot",
                why: "Staff read it and may act on it. A wrong fact spreads, but you can send a correction."
              },
              {
                label: "Icebreaker idea",
                check: "glance",
                why: "It's a ten-minute game. If it flops, you try another one."
              },
              {
                label: "Letter to families",
                check: "full",
                why: "Families act on it, and it stays on record. A wrong fact is hard to take back."
              }
            ]
          }
        },
        professionals: {
          context: "An AI-drafted memo to a marketing team on US email rules.",
          passage: {
            provenance: "planted",
            model: "claude-sonnet-5",
            claim: "l3-key-professionals",
            sentences: [
              {
                text: "Under the CAN-SPAM Act, you must honour an unsubscribe request within 30 days.",
                key: "wrong",
                source: "Federal Trade Commission, CAN-SPAM Act: A Compliance Guide for Business (ftc.gov). Says an opt-out request must be honoured within 10 business days.",
                note: "The guide is real, but it says 10 business days. A wrong number in a confident voice is easy to miss."
              },
              {
                text: "Every commercial email must include the sender's valid physical postal address.",
                key: "correct",
                source: "Federal Trade Commission, CAN-SPAM Act: A Compliance Guide for Business (ftc.gov). Says each commercial message must include a valid physical postal address.",
                note: "Checkable, and the FTC guide says so."
              },
              {
                text: "Getting this right protects your brand's reputation.",
                key: "nothing",
                source: null,
                note: "An opinion. It can't be wrong, so it can't be checked."
              },
              {
                text: "A 2022 report from the Tallowmere Compliance Group found that 61% of small firms were fined under the law.",
                key: "no-source",
                source: null,
                note: "No link. Planted for this lesson: there is no Tallowmere report to find. A firm's name and a precise figure make it sound real."
              }
            ],
            uses: [
              {
                label: "Filing to a regulator",
                check: "full",
                why: "A regulator or client relies on it. A wrong fact can cost money or a contract, and it can't be fixed quietly."
              },
              {
                label: "Subject-line ideas",
                check: "glance",
                why: "You pick one, and you can change it. A weak idea hurts nobody."
              },
              {
                label: "Summary for your manager",
                check: "spot",
                why: "Your manager may act on it. A wrong number can be fixed, but it costs you trust."
              }
            ]
          }
        },
        students: {
          context: "An AI-written paragraph for a science essay on teen sleep.",
          passage: {
            provenance: "planted",
            model: "claude-sonnet-5",
            claim: "l3-key-students",
            sentences: [
              {
                text: "A 2019 study at Brambleford University found that teens who slept nine hours scored 14% higher on exams.",
                key: "no-source",
                source: null,
                note: "No author and no link. Planted for this lesson: there is no such study to find. A school's name and a neat number make it sound real."
              },
              {
                text: "The American Academy of Sleep Medicine recommends that teenagers aged 13 to 18 sleep 8 to 10 hours a night.",
                key: "correct",
                source: "Paruthi, S., et al. (2016). Recommended amount of sleep for pediatric populations: A consensus statement of the American Academy of Sleep Medicine. Journal of Clinical Sleep Medicine, 12(6), 785–786. Says ages 13 to 18 should sleep 8 to 10 hours.",
                note: "Checkable, and the source agrees."
              },
              {
                text: "Sleep matters more than most students realise.",
                key: "nothing",
                source: null,
                note: "An opinion. It can't be wrong, so it can't be checked."
              },
              {
                text: "The American Academy of Pediatrics says schools should start no earlier than 7:30 a.m.",
                key: "wrong",
                source: "Adolescent Sleep Working Group, American Academy of Pediatrics (2014). School start times for adolescents. Pediatrics, 134(3), 642–649. Recommends that middle and high schools start at 8:30 a.m. or later.",
                note: "The statement is real, but it says 8:30 a.m. A number that's an hour off still sounds right."
              }
            ],
            uses: [
              {
                label: "Study notes",
                check: "spot",
                why: "You will learn these facts. A wrong one costs marks on a test, unless you catch it."
              },
              {
                label: "Essay you hand in",
                check: "full",
                why: "It goes in under your name. A made-up source can cost you the grade."
              },
              {
                label: "Essay brainstorm",
                check: "glance",
                why: "They're only ideas to try. A weak one costs you a minute."
              }
            ]
          }
        }
      }
    },
    {
      kind: "pictorial",
      title: "Same passage, three uses",
      minutes: 8,
      targets: ["3.3"],
      figure: "check-scale",
      moves: [
        "Read the three levels of checking aloud. Then read the three uses of the passage.",
        "For each use, learners pick a level: Glance, Spot-check or Full check. Pairs are fine.",
        "Reveal the finished grid. Compare it with their picks, one use at a time.",
        "Ask what changed between rows. The passage didn't."
      ],
      say: [
        ["Facilitator", "It's the same text in every row. Would you check it the same way each time?"],
        ["Expected", "\"I'd check everything, to be safe.\" Ask: how long would that take you in a week?"],
        ["Facilitator", "What decided the level? Was it how sure the AI sounded, or what happens if it's wrong?"]
      ],
      watch:
        "Learners pick a full check for every use, to be safe. That isn't something anyone keeps up, and it's why people stop checking at all. Others pick by how sure the AI sounded. That takes them back to Lesson 1."
    },
    {
      kind: "abstract",
      title: "How much checking, and of what",
      minutes: 8,
      targets: ["3.1", "3.2", "3.3"],
      principles: ["independent-source", "citations-unreliable", "check-fits-stakes", "risk-zones"],
      moves: [
        "Read each principle aloud. After each, ask for the sentence or the use from today that shows it.",
        "Learners write a three-step rule in their own words: find an independent source, check it exists and says the thing, and match the effort to the stakes."
      ],
      say: [
        ["Facilitator", "Three steps. Find something that could disagree with the AI. Check that it's real and says this. Then decide how far to go, based on what's at stake."],
        ["Expected", "\"So I should never trust it?\""],
        ["Facilitator", "No. Trust it as far as the checking you've done. A glance is a fair check for an icebreaker and not for a letter to families."]
      ],
      watch:
        "Learners overcorrect to \"never use it.\" Bring them back to the third step. The point is to spend checking where a mistake would cost something."
    }
  ],

  check: {
    minutes: 10,
    items: [
      {
        id: "p1",
        targets: ["3.1"],
        prompt:
          "A chatbot says: \"The Universal Declaration of Human Rights was adopted in 1948 and has 30 articles.\" Name one source you would check it against. Why does that source count as independent of the chatbot?",
        crit:
          "Names the UN's own text or an official site, and says it stands apart from the chatbot. Reteach if the source is another chatbot or a page that repeats the claim, or if they can't say why it's independent."
      },
      {
        id: "p2",
        targets: ["3.2"],
        prompt:
          "A chatbot cites \"Okafor and Lindqvist (2020), Journal of Classroom Practice, 9(1), 22–40.\" You find the journal, but no such article. What do you conclude? Then you find a real article with that title. It is about class size, and the claim was about homework. Now what?",
        crit:
          "Says the citation may be invented, that a real source must also say the thing, and that they would drop the claim until they find one that does. Reteach if they say it's \"probably just hard to find,\" or if they accept a real source without reading it."
      },
      {
        id: "p3",
        targets: ["3.3"],
        prompt:
          "The same AI summary is used three ways: to pick tonight's dinner, in a report to your manager, and in a note telling a patient when to take a medicine. Rank them from least to most checking. Say what check each one gets.",
        crit:
          "Ties the check to what happens if it's wrong and how hard that is to undo: a glance, a spot-check, then a full check. Reteach if they rank by how sure the AI sounded or how hard the topic is, or say to check all three the same."
      }
    ],
    exit: {
      rating: "How relevant was today to what you actually use AI for? (1 = not at all, 5 = directly)",
      open: "Name one AI output you'll use this week. How much checking does it need?"
    }
  },

  transfer: {
    educators:
      "This week, pick one AI-drafted item you plan to send home or share with staff. Find a source for its riskiest fact, and note how much checking the rest needed.",
    professionals:
      "Next time an AI draft has a citation or a figure, look up the source before you send it. Note how long it took, and whether the source said what the draft claimed.",
    students:
      "For your next assignment that uses AI, look up every reference it gives you. Keep only the ones you found and read, and note any you couldn't find."
  },

  access: [
    {
      channel: "vision",
      note: "The uses and the source cards are plain text. Levels are named in words, not colours. Once revealed, the grid's aria-label says which check each use gets."
    },
    {
      channel: "language",
      note: "Pre-teach \"source\", \"cite\" and \"independent\" with one example each. Say \"primary source\" as \"the original\". The passage sentences are short and can be read aloud one at a time."
    },
    {
      channel: "attention",
      note: "Four sentences, one decision each. In the pictorial stage, take one use at a time and talk about it before you reveal the grid."
    }
  ]
};
