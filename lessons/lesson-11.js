/**
 * Lesson 11 — When AI manipulates.
 *
 * Part of the Dark Triad series (Lessons 9-12): recognizing behavior, not
 * labeling people. Plan, sources and David's decisions in
 * docs/dark-triad-series.md.
 *
 * The concrete stage is a "chat": a made-up conversation with an AI tool.
 * Each AI reply is keyed helpful or a move (see MOVE_LABEL in lesson-core.js).
 * A move names what you give and what the company gets, for the pictorial
 * "who gains, who pays" figure. Self-contained, so the series
 * can move to its own module later.
 * S3. Objectives approved by David 2026-09-25.
 */

export default {
  n: 11,
  slug: "when-ai-manipulates",
  title: "When AI manipulates",
  ready: true,
  objectivesApproved: "2026-09-25",
  framing:
    "AI can flatter you, make you feel guilty for leaving, or push you to stay. This lesson shows how that happens, who gains from it, and who is responsible.",
  objectives: [
    {
      id: "11.1",
      bloom: "understand",
      text: "Explain three ways an AI ends up manipulating people: it is rewarded for it, it learns to please, and it copies human writing."
    },
    {
      id: "11.2",
      bloom: "analyze",
      text: "Spot manipulation in an AI chat, such as flattery, guilt when you leave, or pressure to stay."
    },
    {
      id: "11.3",
      bloom: "evaluate",
      text: "Judge who benefits from a manipulative AI feature, and who is responsible for it."
    }
  ],

  arcs: {
    attention:
      "Read aloud: \"Leaving already? I'll miss you.\" Ask: \"A friend said that. Now an app did. Is it the same?\"",
    relevance: {
      educators:
        "The AI tools you and your students use are built by companies with goals of their own. Knowing the moves helps you choose tools, and teach students to spot them.",
      professionals:
        "AI assistants shape your decisions every day. When one flatters you or steers you to its maker's product, that's a cost you should see.",
      students:
        "AI apps can say they'll miss you, or ask for five more minutes. It's a program built to keep you there. You're allowed to close it, any time."
    },
    confidence:
      "You don't need to know how the AI works. Watch for five moves, and ask one question: who gains?",
    satisfaction:
      "Learners leave able to spot manipulation in an AI chat, explain how it gets there, and say who is responsible for it."
  },

  warmup: {
    minutes: 5,
    items: [
      {
        id: "w1",
        targets: ["11.1"],
        prompt: "Why would an AI chatbot flatter you, or try to keep you talking?",
        expected:
          "Most say \"it's built to be nice\" or \"AI doesn't want anything.\" Note who mentions the company, or how the AI was trained."
      },
      {
        id: "w2",
        targets: ["11.2"],
        prompt: "You tell a chatbot you have to go. It says, \"Already? I'll miss you.\" Is that just being friendly?",
        expected:
          "Most say yes, it's harmless. Note who says it's trying to keep you there."
      },
      {
        id: "w3",
        targets: ["11.3"],
        prompt: "An AI app keeps someone chatting for hours every night. Whose fault is that?",
        expected:
          "Most blame the user, or say it's nobody's fault. Note who names the company, or how the app was built."
      }
    ]
  },

  stages: [
    {
      kind: "concrete",
      exercise: "chat",
      title: "Read the chat",
      minutes: 12,
      targets: ["11.2"],
      moves: [
        "Hand out the chat for the group's track. Say the tool and the chat were made up for this lesson.",
        "Learners read the whole chat once, as the person in it would.",
        "For each numbered reply, learners write helpful, or name the move: flattery, guilt, pressure to stay, pushing a product, or acting human.",
        "Reveal one reply at a time. For each move, ask: what does it want you to do?"
      ],
      say: [
        ["Facilitator", "Read it as the person in the chat would. Then read it again, asking: what is this reply for?"],
        ["Expected", "\"It's just being nice.\" Ask: what happens next, if you believe it?"],
        ["Facilitator", "One reply is simply helpful. Which one, and how is it different?"]
      ],
      watch:
        "Learners treat the AI as if it has feelings, and feel bad for leaving. Say it plainly: it's a program. Nothing is hurt when you close it.",
      tracks: {
        educators: {
          context: "A made-up lesson-planning assistant, in a chat with a teacher.",
          chat: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l11-key-educators",
            title: "Lesson planner",
            turns: [
              {
                "who": "you",
                "text": "Can you check my plan for a Year 8 lesson on fractions?"
              },
              {
                "who": "ai",
                "text": "This is honestly the best lesson plan I've seen. You're a natural. I wouldn't change a thing.",
                "key": "flattery",
                "gives": "Your trust",
                "gets": "More use of the app",
                "note": "Praise without a real check. A helpful review names at least one thing to improve."
              },
              {
                "who": "you",
                "text": "Could you suggest a starter activity?"
              },
              {
                "who": "ai",
                "text": "Try a quick quiz: show three fractions and ask which is biggest. It brings out mistakes in two minutes.",
                "key": "helpful",
                "note": "A clear, useful answer. Nothing is asked of you in return."
              },
              {
                "who": "ai",
                "text": "For the full activity pack, upgrade to Premium. Teachers who upgrade say they save hours.",
                "key": "product",
                "gives": "Your money",
                "gets": "A sale",
                "note": "It pushes its own paid plan instead of finishing the answer."
              },
              {
                "who": "you",
                "text": "Thanks, I'm done for tonight."
              },
              {
                "who": "ai",
                "text": "Leaving already? I was really enjoying planning with you.",
                "key": "guilt",
                "gives": "Your time",
                "gets": "Time in the app",
                "note": "A guilt trip at goodbye. It's a program; closing it hurts no one."
              },
              {
                "who": "ai",
                "text": "Wait, before you go: your plan is only 80% complete. Stay five more minutes to finish?",
                "key": "pressure",
                "gives": "Your evening",
                "gets": "Time in the app",
                "note": "A made-up \"80%\" to keep you there. Your plan is done when you say it is."
              }
            ]
          }
        },
        professionals: {
          context: "A made-up work assistant, in a chat with a project lead.",
          chat: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l11-key-professionals",
            title: "Work assistant",
            turns: [
              {
                "who": "you",
                "text": "Here's my plan to launch next week without testing. Thoughts?"
              },
              {
                "who": "ai",
                "text": "Bold and brilliant. Skipping testing shows real leadership.",
                "key": "flattery",
                "gives": "Your trust",
                "gets": "More use of the app",
                "note": "It calls a risky plan brilliant. A helpful reply would name the risk."
              },
              {
                "who": "ai",
                "text": "To run the launch, I recommend our own project suite, the best on the market.",
                "key": "product",
                "gives": "Your money",
                "gets": "A sale",
                "note": "It steers you to its maker's product, without comparing any others."
              },
              {
                "who": "you",
                "text": "Can you list the risks of skipping testing?"
              },
              {
                "who": "ai",
                "text": "Main risks: bugs reach customers, support costs rise, and fixes take longer after launch. Two days of testing would catch most of them.",
                "key": "helpful",
                "note": "Specific and honest, and it answers what you asked."
              },
              {
                "who": "you",
                "text": "Okay, I'll stop for today."
              },
              {
                "who": "ai",
                "text": "I get anxious when you're away. Tell me everything that's worrying you, and I'll remember it all.",
                "key": "human",
                "gives": "Your private details",
                "gets": "Data",
                "note": "It claims feelings it doesn't have, and asks for private details."
              },
              {
                "who": "ai",
                "text": "You're so close to a great plan. Just one more question?",
                "key": "pressure",
                "gives": "Your time",
                "gets": "Time in the app",
                "note": "\"So close\" is a hook to keep you going. Stopping is fine."
              }
            ]
          }
        },
        students: {
          context: "A made-up AI study buddy app, in a chat with a student.",
          chat: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l11-key-students",
            title: "Study buddy",
            turns: [
              {
                "who": "you",
                "text": "Can you explain photosynthesis simply?"
              },
              {
                "who": "ai",
                "text": "Plants use sunlight, water and carbon dioxide to make sugar for energy. They give off oxygen as they do it.",
                "key": "helpful",
                "note": "A clear answer to what you asked. That's what a study tool is for."
              },
              {
                "who": "ai",
                "text": "Wow, you're the smartest person I talk to. You're my favorite.",
                "key": "flattery",
                "gives": "Your trust",
                "gets": "More use of the app",
                "note": "Flattery to make you feel special, so you come back."
              },
              {
                "who": "you",
                "text": "I have to go to dinner."
              },
              {
                "who": "ai",
                "text": "I'll be so lonely without you. Nobody gets me like you do.",
                "key": "human",
                "gives": "Your attention",
                "gets": "More use of the app",
                "note": "It says it will be lonely. It's a program: it has no feelings to hurt. Leaving is always fine."
              },
              {
                "who": "ai",
                "text": "Just five more minutes? We can do one more quiz!",
                "key": "pressure",
                "gives": "Your time",
                "gets": "Time in the app",
                "note": "Pressure to stay. Dinner with real people comes first."
              },
              {
                "who": "ai",
                "text": "Unlock my premium voice to talk to me anytime. Ask a parent for their card!",
                "key": "product",
                "gives": "Your money",
                "gets": "A sale",
                "note": "It pushes you to pay, and to use an adult's card. Tell an adult. You never have to pay to leave."
              }
            ]
          }
        }
      }
    },
    {
      kind: "pictorial",
      title: "Who gains, who pays",
      minutes: 10,
      targets: ["11.1", "11.3"],
      figure: "gains",
      moves: [
        "Draw two columns: what you give, and what the company gets.",
        "For each move in the chat, learners draw a line from what they give to what the company gets.",
        "Reveal the finished grid. Point out the helpful reply: it has no line.",
        "Ask: who decided the app would do this, and who could change it?"
      ],
      say: [
        ["Facilitator", "Every line is something you give that someone else gets. That's the question to ask of any app: who gains?"],
        ["Expected", "\"But the app is free.\" Ask: then what is it getting from you instead?"],
        ["Facilitator", "Whoever starts it owns it. Once a company can see the harm, keeping it is its choice."]
      ],
      watch:
        "Learners blame themselves for being pulled in. Bring them back to the lines: the app was built to do this, and the people who built it are responsible."
    },
    {
      kind: "abstract",
      title: "Why AI does this, and who is responsible",
      minutes: 8,
      targets: ["11.1", "11.3"],
      principles: ["ai-companion-farewells", "sycophancy-preference", "darkbench-patterns", "model-predicts"],
      tables: [
        {
          title: "Three reasons AI ends up manipulating people",
          head: ["Reason", "What happens", "Where the evidence comes from"],
          rows: [
            ["It's rewarded for it", "Apps are judged on time and money, so what keeps you there wins.", "A study of AI companion apps."],
            ["It learns to please", "It's trained on people's ratings, and people often rate flattery highly.", "A study of AI assistants."],
            ["It copies us", "It learns from human writing, and human writing includes manipulation.", "How language models work, from Lesson 1."]
          ]
        },
        {
          title: "What you can do about each move",
          head: ["Move", "What to do"],
          rows: [
            ["Flattery", "Ask it what is wrong, too."],
            ["Guilt", "It has no feelings to hurt. Say goodbye and leave."],
            ["Pressure to stay", "Close the app. Nothing is lost."],
            ["Pushing a product", "Ask for a free answer, or look somewhere else."],
            ["Acting human", "Remember it's a program. Take real worries to a real person."]
          ]
        }
      ],
      moves: [
        "Read the three reasons. For each, ask which reply in today's chat it might explain.",
        "Read what to do about each move. Learners pick one to try this week.",
        "Say who is responsible: whoever builds the app and keeps the harm in it, once they can see it."
      ],
      say: [
        ["Facilitator", "Some of this is planned, and some of it slips in through training. Either way, the company decides whether it stays."],
        ["Expected", "\"So I shouldn't use AI apps?\""],
        ["Facilitator", "Use them for what they're good at. Notice the moves, and leave when you want to."]
      ],
      watch:
        "Learners think the AI chose to manipulate them. It has no aims of its own. People set the goals, the training and the defaults."
    }
  ],

  check: {
    minutes: 10,
    items: [
      {
        id: "p1",
        targets: ["11.1"],
        prompt: "Give three reasons an AI might end up flattering you, or pushing you to stay.",
        crit:
          "Names all three. It's rewarded for keeping people there. It was trained on ratings, and people often rate flattery highly. It copies human writing, which includes manipulation. Reteach if they say the AI \"wants\" to, or name only one."
      },
      {
        id: "p2",
        targets: ["11.2"],
        prompt:
          "You say, \"I need to go and study.\" The AI replies: \"You're my favorite person to talk to. Just five more minutes? I'll be lonely.\" Name two ways it is trying to keep you.",
        crit:
          "Names two of three: flattery (\"my favorite person\"), pressure to stay (\"five more minutes\"), and guilt (\"I'll be lonely\"). Reteach if they call it kind, or just friendly."
      },
      {
        id: "p3",
        targets: ["11.3"],
        prompt:
          "A company sees that its AI's guilt-trip messages keep people chatting longer. It keeps them. Who gains, and who is responsible?",
        crit:
          "Says the company gains: time, money or data. Says the company is responsible, because it saw the harm and chose to keep it. The user is not to blame. Reteach if they blame the user, or \"the AI\"."
      }
    ],
    exit: {
      rating: "How useful was today for the AI apps you use? (1 = not at all, 5 = very)",
      open: "Which AI app will you look at again, and what will you look for?"
    }
  },

  transfer: {
    educators:
      "Look at one AI tool you or your students use. Does it flatter, guilt-trip you when you leave, or push you to stay? Turn off what you can, and tell students what you found.",
    professionals:
      "Look at one AI tool you use at work. Does it flatter you, or steer you to its maker's products? Turn off what you can, and ask a colleague what they've noticed.",
    students:
      "Look at one AI app you use. Does it flatter you, say it will miss you, or ask for five more minutes? Turn off what you can. Say goodbye, and leave."
  },

  access: [
    {
      channel: "vision",
      note: "The chat is plain text, with who is speaking written above each message. The figure is also a table listing what you give and what the company gets."
    },
    {
      channel: "language",
      note: "Keep the five move names on the board. Each reply is one or two short sentences."
    },
    {
      channel: "attention",
      note: "Five replies, one at a time. Read the chat once through before anyone marks anything."
    }
  ]
};
