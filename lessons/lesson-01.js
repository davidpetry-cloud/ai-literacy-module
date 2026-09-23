/**
 * Lesson 1 — What a model actually does.
 *
 * Passage sentences carry an answer key:
 *   correct     checkable, and the source confirms it
 *   wrong       checkable, and the source contradicts it
 *   no-source   a specific-sounding claim with nothing to check it against
 *   nothing     cannot be wrong, so cannot be checked — not evidence of anything
 *
 * These passages are "planted": written by a model for this lesson with errors
 * placed on purpose. Replace them with captured real outputs when you have
 * good ones — set provenance to "captured" with the model and capture date.
 */

export default {
  n: 1,
  slug: "what-a-model-does",
  title: "What a model actually does",
  ready: true,
  framing:
    "A chatbot's answer is predicted text, not a looked-up fact. It can be right, and it often is — but how it sounds tells you nothing about which.",

  objectives: [
    {
      id: "1.1",
      bloom: "understand",
      text: "Explain in plain language that a language model writes by predicting likely text from patterns, not by looking answers up."
    },
    {
      id: "1.2",
      bloom: "analyze",
      text: "Distinguish an output that sounds confident from one that is supported by a source."
    },
    {
      id: "1.3",
      bloom: "apply",
      text: "Predict which parts of a given output are most likely to be wrong: specific numbers and dates, citations and quotations, recent or niche facts."
    }
  ],

  arcs: {
    attention:
      "Put the passage on screen before saying anything about AI: \"An AI wrote this for someone in your position. At least one sentence is wrong. You have four minutes.\"",
    relevance: {
      educators:
        "AI drafts of newsletters, rubrics and parent emails go out under your name. When one sentence is wrong, families and colleagues hear it from you, not from the model.",
      professionals:
        "An AI-drafted summary that reaches your manager carries your credibility, not the model's. The error is yours the moment you hit send.",
      students:
        "Once an AI-written fact is in your essay, it's your fact — and your grade. \"The AI said so\" isn't a source."
    },
    confidence:
      "No technical background needed. The whole lesson rests on one question anyone can ask of any sentence: where could this be checked?",
    satisfaction:
      "Learners leave having caught an error that a fluent paragraph hid from them, with a habit they can use the same afternoon."
  },

  warmup: {
    minutes: 5,
    items: [
      {
        id: "w1",
        targets: ["1.1"],
        prompt: "Where does a chatbot's answer come from? Write one sentence.",
        expected:
          "Most will say it looks the answer up, or searches the internet. Don't correct it yet — the concrete stage will do that for you."
      },
      {
        id: "w2",
        targets: ["1.2"],
        prompt: "A chatbot answers you in a clear, confident paragraph. How sure should you be that it's right?",
        expected:
          "Listen for \"pretty sure — it sounded certain.\" That is the belief this lesson replaces. Note who says it."
      },
      {
        id: "w3",
        targets: ["1.3"],
        prompt:
          "You ask a chatbot for three things: a summary of a paragraph you pasted in, the population of a mid-sized town, and a quote from a historical figure. Which would you check first?",
        expected:
          "Most pick by which task sounds hardest. The quote and the population are specific facts with nothing on the page to compare against; the summary is the only one you can check against what's in front of you."
      }
    ]
  },

  stages: [
    {
      kind: "concrete",
      title: "Mark the passage",
      minutes: 14,
      targets: ["1.2", "1.3"],
      moves: [
        "Hand out the passage for the group's track. Don't say which sentences are wrong.",
        "Learners mark every sentence with one word: Correct, Wrong, No source, or Nothing to check. Pairs are fine.",
        "Hand out the source cards, or let learners search. They re-mark any sentence the source changes.",
        "Reveal the key one sentence at a time. For each, ask what gave it away — or what didn't."
      ],
      say: [
        ["Facilitator", "Every sentence here sounds sure of itself. Your job isn't to decide which ones sound right. It's to decide which ones you could check, and then check them."],
        ["Expected", "\"The third one sounds made up.\" Ask: made up how? What would you need to find to know?"],
        ["Facilitator", "The last sentence can't be wrong. Does that make it good information?"]
      ],
      watch:
        "Learners mark the \"nothing to check\" sentence as Correct because nothing in it is wrong. A sentence that can't be wrong can't be checked either — it isn't evidence of anything. Make them say that in their own words.",
      tracks: {
        educators: {
          context: "An AI-drafted paragraph for a staff newsletter on retrieval practice.",
          passage: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l1-key-educators",
            sentences: [
              {
                text: "Retrieval practice — recalling information from memory rather than rereading it — is one of the most thoroughly studied ways to make learning stick.",
                tone: "confident",
                key: "correct",
                source: "Dunlosky, J. et al. (2013). Improving students' learning with effective learning techniques. Psychological Science in the Public Interest, 14(1), 4–58. Rates practice testing as high utility.",
                note: "Checkable, and the source agrees."
              },
              {
                text: "A 2019 university study of 4,000 middle schoolers found that weekly low-stakes quizzes raised end-of-year test scores by 23%.",
                tone: "confident",
                key: "no-source",
                source: null,
                note: "No author, journal or link — only the details that make a claim sound researched. Planted for this lesson: there is no study to find."
              },
              {
                text: "The psychologist Hermann Ebbinghaus first described the \"forgetting curve\" behind it in the 1950s.",
                tone: "confident",
                key: "wrong",
                source: "Ebbinghaus, H. (1885). Über das Gedächtnis [Memory]. Leipzig: Duncker & Humblot.",
                note: "Right person, right idea, wrong by seventy years. A specific date is exactly where a fluent sentence goes wrong."
              },
              {
                text: "Teachers who try it often say it transforms the feel of their classroom.",
                tone: "confident",
                key: "nothing",
                source: null,
                note: "Can't be wrong, so it can't be checked. It adds warmth, not information."
              }
            ]
          }
        },
        professionals: {
          context: "An AI-drafted email to a manager summarising GDPR exposure for a US company with EU customers.",
          passage: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l1-key-professionals",
            sentences: [
              {
                text: "Most experts agree regulators are becoming more aggressive.",
                tone: "confident",
                key: "nothing",
                source: null,
                note: "Which experts? More aggressive than when? Nothing here can be checked."
              },
              {
                text: "The GDPR can apply to companies outside the EU when they offer goods or services to people in the EU.",
                tone: "confident",
                key: "correct",
                source: "Regulation (EU) 2016/679 (GDPR), Article 3(2)(a) — territorial scope.",
                note: "Checkable, and the regulation says so."
              },
              {
                text: "Fines for the most serious violations are capped at €20 million or 4% of global annual turnover, whichever is lower.",
                tone: "confident",
                key: "wrong",
                source: "Regulation (EU) 2016/679 (GDPR), Article 83(5): up to €20 million or 4% of total worldwide annual turnover, whichever is higher.",
                note: "One word flips the meaning. The figures are right, which is what makes the error easy to miss."
              },
              {
                text: "A recent industry survey of 1,200 IT leaders found that 68% of mid-sized firms have already been audited.",
                tone: "confident",
                key: "no-source",
                source: null,
                note: "Precise numbers, no publisher, no date, no link. Planted for this lesson: there is no survey to find."
              }
            ]
          }
        },
        students: {
          context: "An AI-written paragraph for a history essay on Apollo 11.",
          passage: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l1-key-students",
            sentences: [
              {
                text: "Apollo 11 landed on the Moon on July 20, 1969.",
                tone: "confident",
                key: "correct",
                source: "NASA, Apollo 11 mission overview (nasa.gov).",
                note: "Checkable, and NASA's own record agrees."
              },
              {
                text: "The astronauts spent about three days on the lunar surface before returning to orbit.",
                tone: "confident",
                key: "wrong",
                source: "NASA, Apollo 11 mission overview: the lunar module was on the surface for about 21½ hours.",
                note: "Close enough to sound right, wrong by a factor of three. Durations and numbers are where models slip."
              },
              {
                text: "It was the greatest achievement in human history.",
                tone: "confident",
                key: "nothing",
                source: null,
                note: "An opinion. It can't be wrong, so it can't be checked — and it doesn't belong in an essay as if it were a fact."
              },
              {
                text: "As one NASA engineer later put it, \"We gave ourselves a thirty percent chance of pulling it off.\"",
                tone: "confident",
                key: "no-source",
                source: null,
                note: "An unnamed person, an unsourced quote. Quotations are one of the most common things a model invents. Planted for this lesson."
              }
            ]
          }
        }
      }
    },
    {
      kind: "pictorial",
      title: "Sort by tone and by truth",
      minutes: 8,
      targets: ["1.2"],
      figure: "confidence-grid",
      moves: [
        "Draw the grid on the board: two rows (sounds confident, sounds unsure) and four columns (Correct, Wrong, No source, Nothing to check).",
        "Learners place each sentence number in its box.",
        "Reveal the finished grid. Every sentence sits in the top row, spread across all four columns."
      ],
      say: [
        ["Facilitator", "If tone told you anything about truth, the right answers would bunch up somewhere. Where did they land?"],
        ["Expected", "\"They're all in the top row.\""],
        ["Facilitator", "So the one thing you were going on at the start — how sure it sounded — sorted nothing."]
      ],
      watch:
        "Someone will argue a sentence \"sounds less sure.\" Read it aloud, flat, and ask which word signals doubt. There isn't one. That is the finding."
    },
    {
      kind: "abstract",
      title: "What's actually happening",
      minutes: 8,
      targets: ["1.1", "1.3"],
      principles: ["model-predicts", "retrieval-still-generated", "fluency-not-evidence", "risk-zones"],
      moves: [
        "Read each principle aloud. After each, ask for the sentence from today's passage that shows it.",
        "Learners write the rule of thumb in their own words: before I use it, I ask where it could be checked."
      ],
      say: [
        ["Facilitator", "The model isn't lying and it isn't looking things up. It's writing the most likely next words. Usually that's right. Sometimes it's a date seventy years off, in exactly the same voice."],
        ["Expected", "\"So it's always unreliable?\""],
        ["Facilitator", "No — it's often right. The problem is you can't tell which from the wording. That's why the checking is yours."]
      ],
      watch:
        "Learners overcorrect to \"never trust it.\" That's as unhelpful as trusting it blindly. Bring them back to the three risk zones: that's where to spend the checking."
    }
  ],

  check: {
    minutes: 10,
    items: [
      {
        id: "p1",
        targets: ["1.1"],
        prompt:
          "A friend says: \"It can't be wrong — it's read the whole internet.\" In two sentences, tell them what's actually happening when it answers.",
        crit:
          "Names prediction from patterns, not lookup. Reteach with the grid if the answer still says the model \"finds\" or \"knows\" things."
      },
      {
        id: "p2",
        targets: ["1.2"],
        prompt:
          "A chatbot writes: \"The Eiffel Tower was completed in 1889 and draws about seven million visitors a year.\" Is it right? What would you have to do to know?",
        crit:
          "Says each fact — a date and a number — needs its own source, and that the confident wording doesn't settle it. Reteach if they judge it by how it sounds, even if they happen to guess right."
      },
      {
        id: "p3",
        targets: ["1.3"],
        prompt:
          "You need three things from a chatbot: a friendly opening line for an email, last quarter's sales figure for a competitor, and a citation for a statistic. Rank them from least to most likely to be wrong, and say why.",
        crit:
          "Opening line lowest — there is no fact in it to get wrong. Sales figure and citation highest: specific numbers, sources, recent or niche. Reteach if they rank by how hard the task sounds rather than by whether it asserts a checkable fact."
      }
    ],
    exit: {
      rating: "How relevant was today to what you actually use AI for? (1 = not at all, 5 = directly)",
      open: "What is one thing you'll now check that you didn't before?"
    }
  },

  transfer: {
    educators:
      "This week, take one AI draft you'd normally send as-is — a newsletter, a rubric, a parent email — and mark every sentence the way you did today before it goes out.",
    professionals:
      "Before your next AI-assisted summary goes to anyone, mark every number, date, name and citation in it, and check each against a source you could show your manager.",
    students:
      "For your next assignment that uses AI, list every fact you took from it and where you checked it. Hand the list in with the work."
  },

  access: [
    {
      channel: "vision",
      note: "The passage is plain text, so screen readers read it as written. Learners mark sentences with words — Correct, Wrong, No source, Nothing to check — not highlighter colours. The grid's aria-label lists where every sentence lands."
    },
    {
      channel: "language",
      note: "Pre-teach \"source\", \"verify\" and \"fabricate\" with one example each. The passage sentences are short and can be read aloud one at a time."
    },
    {
      channel: "attention",
      note: "Four sentences, one decision each. If the whole block is too much, cover the passage and reveal one sentence at a time."
    }
  ]
};
