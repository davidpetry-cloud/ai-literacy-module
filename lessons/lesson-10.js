/**
 * Lesson 10 — Spot the pattern, in person and online.
 *
 * Part of the Dark Triad series (Lessons 9-12): recognizing behavior, not
 * labeling people. Plan, sources and David's decisions in
 * docs/dark-triad-series.md.
 *
 * The concrete stage is a "thread": six dated moments, face to face and
 * online, made up for this lesson. Each is keyed ordinary or warning, and a
 * warning names its pattern (see PATTERN_LABEL in lesson-core.js). `feeling`
 * is how the person might have felt, drawn under the pictorial timeline. Self-contained, so the series
 * can move to its own module later.
 * S2. The Dark Tetrad (everyday sadism) is added in the abstract stage, at
 * David's request on 2026-09-25. 10.3 reworded at David's request on 2026-09-25 (trust your gut feeling); David confirmed the wording the same day.
 */

export default {
  n: 10,
  slug: "spot-the-pattern",
  title: "Spot the pattern, in person and online",
  ready: true,
  objectivesApproved: "2026-09-25",
  framing:
    "The same ways of using people show up face to face and online. This lesson helps you trust what your gut tells you, and check it against a pattern of behavior.",
  objectives: [
    {
      id: "10.1",
      bloom: "analyze",
      text: "Tell the difference between being used and an ordinary disagreement, face to face and online."
    },
    {
      id: "10.2",
      bloom: "analyze",
      text: "Find a pattern that repeats across situations, instead of judging from one incident."
    },
    {
      id: "10.3",
      bloom: "evaluate",
      text: "Trust how a person makes you feel over time as a signal, and check it against what they actually do."
    }
  ],

  arcs: {
    attention:
      "Ask: \"Has anyone ever been really nice to you, and then asked for something?\" Take a show of hands, no stories. Then ask: \"What came first?\"",
    relevance: {
      educators:
        "Staff rooms, parent chats and online groups all have people who use others. Spotting the pattern early protects you, and helps you protect your students.",
      professionals:
        "Trust scams and controlling colleagues follow the same steps, in person and online. Knowing the steps is how you stop one before it costs you.",
      students:
        "Some people online act like friends to get something from you. The same thing can happen at school. This lesson shows you the signs, and who to tell."
    },
    confidence:
      "You don't have to work out what someone is. Watch what they do, notice how you feel, and look for the repeat.",
    satisfaction:
      "Learners leave able to tell being used from a normal disagreement, to look for a pattern over time, and to trust a bad feeling enough to look closer."
  },

  warmup: {
    minutes: 5,
    items: [
      {
        id: "w1",
        targets: ["10.1"],
        prompt: "Someone you just met online is very kind, very fast. They send gifts and say you're special. Is that a good sign?",
        expected:
          "Most say yes, or \"lucky you.\" Note who asks why it's so fast, or what they might want."
      },
      {
        id: "w2",
        targets: ["10.2"],
        prompt: "Someone snapped at you once, in front of others. Does that tell you what they're like?",
        expected:
          "Answers split. Note who asks whether it keeps happening, and whether it happens in other places too."
      },
      {
        id: "w3",
        targets: ["10.3"],
        prompt: "You feel uneasy around someone, but you can't say why. What do you do with that feeling?",
        expected:
          "Most say they ignore it, or feel bad for thinking it. Note who says they would watch what the person does."
      }
    ]
  },

  stages: [
    {
      kind: "concrete",
      exercise: "thread",
      title: "Follow the thread",
      minutes: 12,
      targets: ["10.1", "10.2"],
      moves: [
        "Before you start: know your safeguarding route. This lesson can lead someone to tell you something.",
        "Hand out the thread for the group's track. Say it was made up for this lesson.",
        "Learners mark each moment ordinary or warning sign. For a warning sign, they name the pattern.",
        "Reveal one moment at a time. Ask: on its own, is this enough? What about with the moments before it?"
      ],
      say: [
        ["Facilitator", "Don't decide what this person is. Look at what they do, week by week."],
        ["Expected", "\"The first message was just nice.\" Agree. Then ask: what came after it?"],
        ["Facilitator", "Two moments are ordinary. Which ones, and how are they different from the rest?"]
      ],
      watch:
        "Learners mark every unpleasant moment as a warning sign, including a fair disagreement. Ask: was it open, and about the idea? Or hidden, and about control?",
      tracks: {
        educators: {
          context: "A made-up term with a new colleague, Sam, at your school.",
          thread: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l10-key-educators",
            moments: [
              {
                "when": "Week 1",
                "where": "face to face",
                "text": "In a staff meeting, Sam praises your lessons: \"Best teacher here.\"",
                "key": "ordinary",
                "feeling": "Pleased",
                "note": "Praise on its own is fine. Notice it, and see what comes next."
              },
              {
                "when": "Week 2",
                "where": "online",
                "text": "Sam messages late at night: \"You're the only one who gets me.\" Then asks you to take their Friday duty.",
                "key": "warning",
                "pattern": "request",
                "feeling": "Flattered",
                "note": "Flattery first, then the ask. On its own it might be nothing. It's the start of a pattern."
              },
              {
                "when": "Week 3",
                "where": "face to face",
                "text": "Priya disagrees with your plan for the class trip. She says so openly in the meeting, and explains why.",
                "key": "ordinary",
                "feeling": "Annoyed",
                "note": "A real disagreement: out in the open, and about the plan, not about you."
              },
              {
                "when": "Week 4",
                "where": "online",
                "text": "Sam messages that Priya has been \"talking about you\", and says you should stop sitting with her.",
                "key": "warning",
                "pattern": "isolating",
                "feeling": "Confused",
                "note": "Turning you against a colleague leaves you more alone, and more reliant on Sam."
              },
              {
                "when": "Week 5",
                "where": "face to face",
                "text": "Sam asks who you've been talking to, and looks through your planner while you're out of the room.",
                "key": "warning",
                "pattern": "checking",
                "feeling": "Uneasy",
                "note": "Checking up on you is a way of keeping control."
              },
              {
                "when": "Week 6",
                "where": "online",
                "text": "You say no to another duty. Sam replies: \"After all I've done for you? I'd hate for the head to hear about your marking.\"",
                "key": "warning",
                "pattern": "pressure",
                "feeling": "On edge",
                "note": "Guilt, then a threat, when you say no. With weeks 2, 4 and 5, this is a pattern. Write it down, and talk to someone you trust."
              }
            ]
          }
        },
        professionals: {
          context: "A made-up contact you met at a conference, who stays in touch online.",
          thread: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l10-key-professionals",
            moments: [
              {
                "when": "Week 1",
                "where": "online",
                "text": "A contact from a conference messages you. They are warm, curious about your work, and reply within minutes.",
                "key": "ordinary",
                "feeling": "Flattered",
                "note": "Friendly and quick is common. Keep an eye on how fast things move."
              },
              {
                "when": "Week 2",
                "where": "online",
                "text": "They say you're the only person they trust with \"a private opportunity\", and ask you not to tell your team.",
                "key": "warning",
                "pattern": "secrecy",
                "feeling": "Special",
                "note": "Secrecy keeps other people from checking it for you."
              },
              {
                "when": "Week 3",
                "where": "face to face",
                "text": "At a meetup, they ask to see your banking app \"to help you set it up\".",
                "key": "warning",
                "pattern": "checking",
                "feeling": "Uneasy",
                "note": "Wanting access to your money or accounts is checking up on you, and a step toward control."
              },
              {
                "when": "Week 4",
                "where": "online",
                "text": "They send a small \"return\" on a test payment, then ask you to put in a much bigger sum.",
                "key": "warning",
                "pattern": "request",
                "feeling": "Excited",
                "note": "Trust first, then the request. Scam research finds this order again and again."
              },
              {
                "when": "Week 5",
                "where": "face to face",
                "text": "Your manager questions your budget in a meeting, and explains why.",
                "key": "ordinary",
                "feeling": "Annoyed",
                "note": "A normal disagreement at work: open, with reasons."
              },
              {
                "when": "Week 6",
                "where": "online",
                "text": "You hesitate. They say the deal closes tonight, and you'll lose everything you've put in.",
                "key": "warning",
                "pattern": "pressure",
                "feeling": "On edge",
                "note": "A sudden deadline is pressure. It stops you from checking or asking anyone. Stop, and talk to someone you trust."
              }
            ]
          }
        },
        students: {
          context: "A made-up online friend from a game chat, and a few days at school.",
          thread: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l10-key-students",
            moments: [
              {
                "when": "Week 1",
                "where": "online",
                "text": "Someone in a game chat says you're really good, and sends you free coins.",
                "key": "warning",
                "pattern": "flattery",
                "feeling": "Pleased",
                "note": "Flattery and gifts from someone you don't know is how many people who use others start."
              },
              {
                "when": "Week 2",
                "where": "face to face",
                "text": "At school, your friend Jo disagrees with you about the group project, and says so.",
                "key": "ordinary",
                "feeling": "Annoyed",
                "note": "A normal disagreement. Jo says it to your face, about the work."
              },
              {
                "when": "Week 3",
                "where": "online",
                "text": "The game friend says: \"Don't tell your parents about me. They wouldn't get it.\"",
                "key": "warning",
                "pattern": "secrecy",
                "feeling": "Special",
                "note": "Asking you to keep a secret from the adults who look after you is a big warning sign."
              },
              {
                "when": "Week 4",
                "where": "online",
                "text": "They ask you to move to a private app, and say your friends are just jealous of you.",
                "key": "warning",
                "pattern": "isolating",
                "feeling": "Confused",
                "note": "Moving you somewhere private, and against your friends, cuts you off from people who could help."
              },
              {
                "when": "Week 5",
                "where": "face to face",
                "text": "Your teacher asks why your homework is late, and offers to help.",
                "key": "ordinary",
                "feeling": "Awkward",
                "note": "An adult checking on you, openly, to help. That's care, not control."
              },
              {
                "when": "Week 6",
                "where": "online",
                "text": "They ask for a private photo, and say they'll stop being your friend if you don't send one.",
                "key": "warning",
                "pattern": "request",
                "feeling": "Scared",
                "note": "Stop here. Don't send anything. Tell a trusted adult now. It is not your fault, and you won't be in trouble for telling."
              }
            ]
          }
        }
      }
    },
    {
      kind: "pictorial",
      title: "The pattern over time",
      minutes: 10,
      targets: ["10.2", "10.3"],
      figure: "pattern",
      moves: [
        "Draw the grid: face to face and online down the side, weeks across the top, and a row for how it felt.",
        "Learners place each moment by its number, and write a feeling under each week.",
        "Reveal the finished grid. Point to where the warning signs repeat.",
        "Read the feelings row aloud. Ask: when did the feeling first say something was wrong?"
      ],
      say: [
        ["Facilitator", "One moment is a moment. The repeat, in more than one place, is the pattern."],
        ["Expected", "\"I'd have noticed sooner.\" Maybe. Most people don't, because each step is small."],
        ["Facilitator", "Your feelings were keeping score all along. That's why the feeling is worth taking seriously."]
      ],
      watch:
        "Learners blame the person in the story for not seeing it sooner. Stop that kindly. Each step was small on purpose, and it is never the target's fault."
    },
    {
      kind: "abstract",
      title: "What the pattern looks like",
      minutes: 8,
      targets: ["10.1", "10.2", "10.3"],
      principles: ["coercive-control-pattern", "grooming-stages", "scam-stages", "dark-tetrad", "online-harm-traits", "work-harm-traits", "gut-feeling-evidence"],
      tables: [
        {
          title: "Patterns to watch for, in person and online",
          head: ["Pattern", "What it looks like", "Where the evidence comes from"],
          rows: [
            ["Flattery or gifts", "Makes you feel special, fast.", "Research on grooming and scams."],
            ["Asking for something", "After the flattery comes the ask: money, a favor, a photo.", "Research on grooming and scams."],
            ["Secrecy", "Asks you to keep them, or the plan, secret.", "Research on grooming."],
            ["Cutting you off", "Turns you against friends, family or colleagues.", "Research on controlling behavior, and the law in England."],
            ["Checking up on you", "Wants to know where you are, or looks at your phone or money.", "Research on controlling behavior, and the law in England."],
            ["Pressure or threats", "Guilt, deadlines or threats when you say no.", "Research on controlling behavior and scams."]
          ]
        },
        {
          title: "Four dark traits: the Dark Tetrad",
          head: ["Trait", "In plain words", "Where it shows up"],
          rows: [
            ["Narcissism", "Wants to be admired.", "Charm and flattery."],
            ["Machiavellianism", "Plans how to use people.", "Secrecy, favors, pressure."],
            ["Psychopathy", "Feels little for others, acts on impulse.", "Threats, and bullying online."],
            ["Everyday sadism", "Enjoys other people's pain.", "The strongest link to trolling."]
          ]
        }
      ],
      moves: [
        "Read the six patterns. For each, find the moment in today's thread that showed it.",
        "Read the four traits. Say again: these are scales in ordinary people, not labels.",
        "Ask: which of these would you notice in person? Which online? Most answer: all of them, in both."
      ],
      say: [
        ["Facilitator", "The same patterns show up face to face and online. Only the setting changes."],
        ["Expected", "\"So everyone who flatters me is using me?\""],
        ["Facilitator", "No. One kind word is just kind. Watch for the pattern: flattery, then secrecy, then an ask, then pressure."]
      ],
      watch:
        "Learners start to suspect everyone. Bring them back to the pattern: several warning signs, repeated, usually with a bad feeling that grows."
    }
  ],

  check: {
    minutes: 10,
    items: [
      {
        id: "p1",
        targets: ["10.1"],
        prompt:
          "Two things happen. (a) Someone disagrees with your idea, loudly, in front of others. (b) A new online friend flatters you, asks you to keep your chats secret, then asks for a favor. Which one is using you? Why?",
        crit:
          "Says (b): flattery, then secrecy, then a request is how people who use others often work. Says (a) is a normal disagreement: it's open, and about the idea. Reteach if they judge by who seems nicer."
      },
      {
        id: "p2",
        targets: ["10.2"],
        prompt: "Name three things you would look for over time, not just once, to spot a pattern of control.",
        crit:
          "Names three, such as cutting you off from people, checking your phone or where you are, controlling your money or choices, threats, or putting you down. Says it's the repeat that matters. Reteach if they judge from one event."
      },
      {
        id: "p3",
        targets: ["10.3"],
        prompt: "Someone often leaves you feeling confused, guilty or on edge. What should you do with that feeling?",
        crit:
          "Takes the feeling seriously as a sign. Then watches what the person actually does over time, and talks to someone they trust. Reteach if they say ignore it, or act on the feeling alone, like accusing the person."
      }
    ],
    exit: {
      rating: "How useful was today for the people you deal with, face to face or online? (1 = not at all, 5 = very)",
      open: "What pattern will you watch for now, instead of a single moment?"
    }
  },

  transfer: {
    educators:
      "If something at work feels off this week, write down what happened and when. One moment is a moment. A written record shows the pattern. Talk to someone you trust.",
    professionals:
      "If a contact or colleague feels off this week, write down what happened and when. A record shows the pattern, and it helps if you need to report it.",
    students:
      "If someone online or at school makes you feel uneasy, write down what happened and when. Then tell an adult you trust. It's never your fault."
  },

  access: [
    {
      channel: "vision",
      note: "The timeline is also a table, with each moment's pattern in words. Warning signs and ordinary moments differ in shape, as well as in the words."
    },
    {
      channel: "language",
      note: "Each moment is one or two short sentences, with the week and the setting above it. Keep the six pattern names on the board."
    },
    {
      channel: "attention",
      note: "Six moments, one at a time. This topic can be upsetting: let learners work in pairs, and let anyone step out."
    }
  ]
};
