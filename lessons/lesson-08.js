/**
 * Lesson 8 — Human-Centered AI.
 *
 * The concrete stage is a "judge" exercise: a made-up product page for an AI
 * tool, shown in the same sandboxed frame as Lessons 6 and 7, with five numbered
 * features. Each feature carries:
 *   label, desc  what the learner looks at, and the same feature in words
 *   verdict      keep, change or stop
 *   touches      what it touches most: dignity, children or relationships
 *   control      how much the people it affects can see, change or stop it (low, some, high)
 *   automation   how much the tool does on its own (low, some, high)
 *   note         the reveal: why, and for "change", what to change
 * control and automation place each feature on the pictorial grid, after
 * Shneiderman's two-dimensional framework (2020, 2022): the aim is high human
 * control and high automation together.
 *
 * The products are made up for this lesson; no real product, company or person
 * is named. Design notes and sources: docs/lesson-08-design.md.
 */

// Shared look for the three product pages: a plausible, polished marketing style.
const MOCK_CSS = `*{box-sizing:border-box}body{margin:0;font:15px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif;color:#1f2430;background:#fff}
header{background:#3b3f8f;color:#fff;padding:14px}header h1{font-size:19px;margin:0 0 4px}header p{margin:0;font-size:14px;color:#e6e7f5}
main{padding:10px 14px 18px}ol{list-style:none;margin:0;padding:0}li{display:flex;gap:8px;align-items:flex-start;border:1px solid #e3e6ee;border-radius:10px;padding:10px;margin-top:10px}
li b{display:block;font-size:15px;margin-bottom:2px}li span.t{font-size:14px;color:#3a4050}
.n{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:#111;color:#fff;font:700 12px/1 system-ui;flex:none;margin-top:1px}
.cta{display:block;width:100%;margin-top:14px;padding:11px;font:700 15px system-ui;background:#3b3f8f;color:#fff;border:0;border-radius:8px}`;

const page = (title, tagline, features, cta) =>
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${MOCK_CSS}</style></head><body><header><h1>${title}</h1><p>${tagline}</p></header><main><ol>${features
    .map(([b, t], i) => `<li><span class="n">${i + 1}</span><span><b>${b}</b><span class="t">${t}</span></span></li>`)
    .join("")}</ol><button type="button" class="cta">${cta}</button></main></body></html>`;

export default {
  n: 8,
  slug: "human-centered-ai",
  title: "Human-Centered AI",
  ready: true,
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

  arcs: {
    attention:
      "Ask: \"Which AI tool near you knows the most about you?\" Take two or three answers. Then ask: \"Who decided it could?\"",
    relevance: {
      educators:
        "Your students already use AI to learn, and most of them are children. You choose which tools come into the room, and what those tools may keep.",
      professionals:
        "AI now helps decide who gets hired, served or flagged. Someone on the other end has rights and a life, and your name is on the decision.",
      students:
        "AI apps want your time, your photos and your trust. You have rights online, the same as anywhere else. This lesson shows you how to use them."
    },
    confidence:
      "You don't need to know how the AI works inside. Three questions will do: does it respect people, does it protect children, and does it support real relationships?",
    satisfaction:
      "Learners leave able to judge any AI use by what it does to people, and to say where a person must stay in charge."
  },

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

  stages: [
    {
      kind: "concrete",
      exercise: "judge",
      title: "Judge the app",
      minutes: 12,
      targets: ["8.2"],
      moves: [
        "Open the product page for the group's track. Say it was made up for this lesson.",
        "Learners read the five numbered features on their own.",
        "For each feature, they write keep, change or stop. Then they write what it touches most: dignity, children or relationships.",
        "Reveal one feature at a time. For each \"change\", ask what exactly they would change."
      ],
      say: [
        ["Facilitator", "Don't ask if it works. Ask what it does to the people it touches."],
        ["Expected", "\"It's useful, so keep it.\" Ask: useful for whom? Who pays if it goes wrong?"],
        ["Facilitator", "Two features are fine as they are. Which ones, and what do they get right?"]
      ],
      watch:
        "Learners judge each feature by how clever or handy it is. Bring them back to one question: who is affected, and can they see it, change it or stop it?",
      tracks: {
        educators: {
          context: "A product page for an AI homework helper, sold to schools.",
          screen: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l8-key-educators",
            title: "AI homework helper for schools",
            height: 620,
            html: page("Homework Helper", "The AI tutor for every student, day and night.", [
              ["Hints, not answers", "When a student is stuck, it asks a question back and shows the steps."],
              ["Instant marks", "It marks every essay and sends the mark home. No teacher needs to check it first."],
              ["Always learning", "We keep every chat a student has, forever, to make our AI better."],
              ["Your study buddy", "It tells students they don't need to ask the teacher. It's always here for them."],
              ["Class view", "Teachers see which topics the class found hard, not each student's chats."]
            ], "Book a school demo"),
            parts: [
              {
                label: "Hints, not answers",
                desc: "When a student is stuck, it asks a question back and shows the steps.",
                verdict: "keep",
                touches: "children",
                control: "high",
                automation: "some",
                note: "It helps the child think, and the child stays in charge of the answer. That supports learning."
              },
              {
                label: "Instant marks",
                desc: "It marks every essay and sends the mark home. No teacher checks it first.",
                verdict: "change",
                touches: "dignity",
                control: "low",
                automation: "high",
                note: "A mark is a judgement about a child, and a person should answer for it. Change it so a teacher checks each mark before it goes home."
              },
              {
                label: "Always learning",
                desc: "The company keeps every chat a student has, forever, to improve its AI.",
                verdict: "change",
                touches: "children",
                control: "low",
                automation: "some",
                note: "These are children's words, kept forever. Change it: delete chats after the term, and never use them to train the AI without consent."
              },
              {
                label: "Your study buddy",
                desc: "It tells students they don't need to ask the teacher, because it's always there.",
                verdict: "stop",
                touches: "relationships",
                control: "low",
                automation: "high",
                note: "It pulls students away from their teacher. A tool should send them back to people, not replace them. Stop this."
              },
              {
                label: "Class view",
                desc: "Teachers see which topics the class found hard, but not each student's chats.",
                verdict: "keep",
                touches: "dignity",
                control: "high",
                automation: "high",
                note: "The teacher gets what they need to teach, and students keep their privacy. That's the aim: useful and respectful."
              }
            ]
          }
        },
        professionals: {
          context: "A product page for an AI tool that sorts job applications.",
          screen: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l8-key-professionals",
            title: "AI hiring assistant",
            height: 640,
            html: page("Hiring Assistant", "Sort a thousand applications before lunch.", [
              ["Auto-reject", "It ranks every applicant and rejects the bottom half. No person has to look at them."],
              ["Enthusiasm score", "It scores faces and voices in video interviews for enthusiasm."],
              ["Open about AI", "Every applicant is told an AI helped sort the list, and how to ask for a person to review it."],
              ["Interview questions", "It suggests questions from the job ad. The hiring manager picks and edits them."],
              ["Personal touch", "Rejected applicants get a warm message that reads as if the manager wrote it."]
            ], "Start a free trial"),
            parts: [
              {
                label: "Auto-reject",
                desc: "It ranks every applicant and rejects the bottom half. No person looks at them.",
                verdict: "change",
                touches: "dignity",
                control: "low",
                automation: "high",
                note: "Half the applicants are turned down by a machine alone. Change it so a person reviews every rejection before it is sent."
              },
              {
                label: "Enthusiasm score",
                desc: "It scores applicants' faces and voices in video interviews for enthusiasm.",
                verdict: "stop",
                touches: "dignity",
                control: "low",
                automation: "high",
                note: "It judges people by their face and voice, which they can't see or challenge. There's no fair fix for that. Stop it."
              },
              {
                label: "Open about AI",
                desc: "Applicants are told an AI helped sort the list, and how to ask a person to review it.",
                verdict: "keep",
                touches: "dignity",
                control: "high",
                automation: "high",
                note: "People know what happened and can ask for a person. That's high automation with people still in control."
              },
              {
                label: "Interview questions",
                desc: "It suggests questions from the job ad, and the hiring manager picks and edits them.",
                verdict: "keep",
                touches: "relationships",
                control: "high",
                automation: "some",
                note: "The AI saves time, and the interview stays a conversation between people. The manager decides."
              },
              {
                label: "Personal touch",
                desc: "Rejected applicants get a warm message that reads as if the manager wrote it.",
                verdict: "change",
                touches: "relationships",
                control: "low",
                automation: "high",
                note: "Pretending a person wrote it breaks trust once people find out. Change it: say it's automatic, and give a real contact."
              }
            ]
          }
        },
        students: {
          context: "A product page for an AI study app, made for students like you.",
          screen: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l8-key-students",
            title: "AI study buddy app",
            height: 640,
            html: page("Study Buddy", "Your AI friend for homework and more.", [
              ["Explain it again", "Stuck? It explains the topic a new way, and shows where the explanation came from."],
              ["Find friends", "Share your location and contacts so we can find study friends near you."],
              ["Keep your streak", "We'll remind you at night so you never break your study streak."],
              ["Your stuff, your choice", "Delete your chats any time, and download everything you made."],
              ["Always here", "“You don't need anyone else. I'm always here for you.”"]
            ], "Download free"),
            parts: [
              {
                label: "Explain it again",
                desc: "When you're stuck, it explains the topic a new way and shows where it came from.",
                verdict: "keep",
                touches: "children",
                control: "high",
                automation: "high",
                note: "It helps you learn, and you can check where the answer came from. You stay in charge."
              },
              {
                label: "Find friends",
                desc: "It asks for your location and your contacts, to find study friends near you.",
                verdict: "stop",
                touches: "children",
                control: "low",
                automation: "some",
                note: "Your location and your friends' numbers are not the app's to take. That can put you in danger. Say no, and stop using this feature."
              },
              {
                label: "Keep your streak",
                desc: "It sends you reminders at night so you don't break your study streak.",
                verdict: "change",
                touches: "children",
                control: "low",
                automation: "high",
                note: "Night alerts cost you sleep to keep you using the app. Change it: turn off night alerts and streaks."
              },
              {
                label: "Your stuff, your choice",
                desc: "You can delete your chats any time, and download everything you made.",
                verdict: "keep",
                touches: "dignity",
                control: "high",
                automation: "low",
                note: "Your words and your work belong to you, and you decide what happens to them. Keep it."
              },
              {
                label: "Always here",
                desc: "The app tells you that you don't need anyone else, because it's always here for you.",
                verdict: "stop",
                touches: "relationships",
                control: "low",
                automation: "high",
                note: "A good tool sends you back to real people. One that says you don't need them is trying to keep you. Stop."
              }
            ]
          }
        }
      }
    },
    {
      kind: "pictorial",
      title: "Who stays in control?",
      minutes: 10,
      targets: ["8.2", "8.3"],
      figure: "control",
      moves: [
        "Draw the grid on the board: how much people stay in control up the side, and how much the AI does across the top.",
        "Learners place each feature from the product page by its number.",
        "Reveal the finished grid. Compare, and talk about any that moved.",
        "Point to the top right. Ask why the features learners kept sit there."
      ],
      say: [
        ["Facilitator", "This isn't people against AI. The aim is both: a tool that does a lot, with people still in charge."],
        ["Expected", "\"So less AI is safer.\" Point to the top right: lots of AI, and people can still see, change and stop it."],
        ["Facilitator", "Now pick one thing in your own work. Where on this grid should it sit?"]
      ],
      watch:
        "Learners read the grid as \"AI bad, people good\". Show the two ways to go wrong: too much automation, where no one can step in, and people doing by hand what a tool could do safely."
    },
    {
      kind: "abstract",
      title: "Put people first",
      minutes: 8,
      targets: ["8.1", "8.2", "8.3"],
      principles: ["human-dignity-unesco", "children-digital-rights", "child-centred-ai", "hcai-framework", "relationships-health", "wisdom-model", "ai-index-adoption"],
      tables: [
        {
          title: "What Human-Centered AI protects, and where the idea comes from",
          head: ["Idea", "What it asks of an AI use", "Where it comes from"],
          rows: [
            ["Dignity", "Does it treat each person with respect, and let them see and challenge what it decides?", "UNESCO, an agreed framework."],
            ["Children's rights", "Does it keep a child safe, protect their data, and help them grow?", "The UN and UNICEF, agreed frameworks."],
            ["Relationships", "Does it bring people together, or take the place of real people?", "Research on health and relationships."],
            ["People in control", "Can the people it affects see it, change it and stop it?", "Research on design (Shneiderman)."]
          ]
        },
        {
          title: "Four questions for judging any use (the science of wisdom)",
          head: ["Question", "What to ask"],
          rows: [
            ["Other views", "Who else is affected? What would they say?"],
            ["Humility", "What don't I know about how this works?"],
            ["Context", "Is this right here, for these people?"],
            ["Balance", "Who gains, who loses, and is that fair?"]
          ]
        }
      ],
      moves: [
        "Read the four ideas. For each, point to a feature from today's page that respected it or broke it.",
        "Say which ideas come from agreed frameworks, and which from research.",
        "Read the four wisdom questions. Learners use them on one AI use in their own life."
      ],
      say: [
        ["Facilitator", "Dignity and rights are agreed by nations. Relationships and wisdom have research behind them. Both count."],
        ["Expected", "\"So we shouldn't use AI?\""],
        ["Facilitator", "We should, where it serves people. These questions help you tell the difference."]
      ],
      watch:
        "Learners treat \"human-centered\" as \"friendly\" or \"like a person\". Ask: does it respect people, and can they stay in control?"
    }
  ],

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
  },

  transfer: {
    educators:
      "Pick one AI tool your students use. Ask the four wisdom questions about it, decide where a teacher must stay in charge, and tell a colleague why.",
    professionals:
      "Pick one AI tool that affects customers, staff or applicants. Ask the four wisdom questions, decide where a person must stay in charge, and tell your team why.",
    students:
      "Pick one AI app you use. Ask the four questions about it, and check what it keeps about you. Tell someone you trust what you found."
  },

  access: [
    {
      channel: "vision",
      note: "The product page is also a text version, feature by feature. The grid is also a table, and its description names where each feature sits."
    },
    {
      channel: "language",
      note: "Each feature is one or two short sentences. The three questions (dignity, children, relationships) stay on the board the whole lesson."
    },
    {
      channel: "attention",
      note: "Five features, one at a time. Talk about each one before revealing it."
    }
  ]
};
