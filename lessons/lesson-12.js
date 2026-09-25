/**
 * Lesson 12 — Protect yourself and your gifts.
 *
 * Part of the Dark Triad series (Lessons 9-12): recognizing behavior, not
 * labeling people. Plan, sources and David's decisions in
 * docs/dark-triad-series.md.
 *
 * The concrete stage is "respond": three made-up situations per track, each
 * with three responses keyed safe or risky. The pictorial is a plan builder:
 * steps that give a record, support or a boundary. It collects nothing and
 * sends nothing. Safeguarding keys follow Keeping Children Safe in Education
 * (2026) and the FBI's advice on sextortion. Self-contained, so the series
 * can move to its own module later.
 * S4. 12.3 added at David's request on 2026-09-25; David confirmed the wording the same day.
 */

export default {
  n: 12,
  slug: "protect-your-gifts",
  title: "Protect yourself and your gifts",
  ready: true,
  objectivesApproved: "2026-09-25",
  framing:
    "Knowing the signs is half of it. This lesson is the other half: what to do, how to keep hold of what really happened, and how to protect your work and your talents.",
  objectives: [
    {
      id: "12.1",
      bloom: "apply",
      text: "Choose a safe response, such as a boundary, a written record, or a trusted person, without labeling anyone."
    },
    {
      id: "12.2",
      bloom: "create",
      text: "Plan how to protect your own work and ideas from someone who takes credit for them or uses them."
    },
    {
      id: "12.3",
      bloom: "apply",
      text: "Recognize gaslighting, and use a written record and a trusted person to hold on to what really happened."
    }
  ],

  arcs: {
    attention:
      "Ask: \"When someone is using you, what do people usually do?\" List the answers. Then ask: \"Which of these keep you safe?\"",
    relevance: {
      educators:
        "You protect students, and your own work and wellbeing. Knowing the safe responses, and your school's safeguarding route, means you act well when it matters.",
      professionals:
        "Credit-taking, pressure and gaslighting happen at work. A few habits, like dated records and clear boundaries, protect your work and your name.",
      students:
        "Your ideas, your photos and your feelings are yours. This lesson shows you how to protect them, and who can help. You never have to handle it alone."
    },
    confidence:
      "You don't need to win an argument. Three things protect you: a record, support and a boundary.",
    satisfaction:
      "Learners leave with a plan of their own: how to keep a record, who to tell, and how to protect their work before they share it."
  },

  warmup: {
    minutes: 5,
    items: [
      {
        id: "w1",
        targets: ["12.1"],
        prompt: "If you realize someone is using you, what's the best thing to do?",
        expected:
          "Most say confront them, call them out, or say nothing. Note who mentions a boundary, writing it down, or telling someone."
      },
      {
        id: "w2",
        targets: ["12.2"],
        prompt: "Someone presents your idea as their own. What could you have done before you shared it?",
        expected:
          "Most say \"nothing\" or \"trust fewer people.\" Note who mentions putting it in writing, with a date, first."
      },
      {
        id: "w3",
        targets: ["12.3"],
        prompt: "Someone keeps telling you things didn't happen the way you remember. Who do you believe?",
        expected:
          "Many start to doubt themselves. Note who says they would check their notes, or ask someone else who was there."
      }
    ]
  },

  stages: [
    {
      kind: "concrete",
      exercise: "respond",
      title: "What would you do?",
      minutes: 12,
      targets: ["12.1", "12.3"],
      moves: [
        "Before you start: know your safeguarding route. Never promise to keep abuse secret.",
        "Hand out the situations for the group's track. Say they were made up for this lesson.",
        "Learners mark each response safe or risky, and write one reason.",
        "Reveal one situation at a time. For each safe response, ask: does it give a record, support or a boundary?"
      ],
      say: [
        ["Facilitator", "The risky responses are the ones we all reach for. That's why it helps to plan ahead."],
        ["Expected", "\"I'd just tell them what I think of them.\" Ask: what happens next? Who has the record?"],
        ["Facilitator", "Notice that no safe response calls anyone a name. They stick to what happened."]
      ],
      watch:
        "Learners pick the response that feels strongest, like calling someone out. Bring them back to safety: what protects you, and who can help?",
      tracks: {
        educators: {
          context: "Three made-up situations at a school.",
          respond: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l12-key-educators",
            situations: [
              {
                "text": "A colleague presents your unit plan as their own at a staff meeting. When you raise it, they say: \"That's not what happened. You're remembering it wrong.\"",
                "responses": [
                  {
                    "text": "Show the dated email where you first shared the plan, and talk to your head of department.",
                    "key": "safe",
                    "note": "A record shows what happened, and a trusted person backs you up."
                  },
                  {
                    "text": "Tell the staffroom they're a narcissist.",
                    "key": "risky",
                    "note": "A label can backfire on you, and it isn't what happened. Stick to the facts."
                  },
                  {
                    "text": "Let it go, and start to doubt your own memory.",
                    "key": "risky",
                    "note": "That's what gaslighting aims for. Your dated email says what really happened."
                  }
                ]
              },
              {
                "text": "A parent keeps sending you private messages late at night, pushing you to change their child's grade.",
                "responses": [
                  {
                    "text": "Reply once, briefly: grades are discussed at school, during office hours. Save the messages.",
                    "key": "safe",
                    "note": "A clear boundary, and a record, without a fight."
                  },
                  {
                    "text": "Change the grade so the messages stop.",
                    "key": "risky",
                    "note": "Giving in teaches that pressure works, and it's unfair to other students."
                  },
                  {
                    "text": "Tell your line manager, and share the messages with them.",
                    "key": "safe",
                    "note": "Support from school, and the messages are the record."
                  }
                ]
              },
              {
                "text": "A student tells you something worrying about an adult they met online. They ask you to promise not to tell anyone.",
                "responses": [
                  {
                    "text": "Promise to keep it secret, so they keep trusting you.",
                    "key": "risky",
                    "note": "Never promise to keep abuse secret. The school safeguarding guidance is clear on this."
                  },
                  {
                    "text": "Listen, tell them they did the right thing, and explain that you'll need to tell the safeguarding lead.",
                    "key": "safe",
                    "note": "This follows the guidance: take it seriously, don't promise secrecy, and involve the safeguarding lead."
                  },
                  {
                    "text": "Ask them for every detail and screenshot yourself.",
                    "key": "risky",
                    "note": "Listen, but don't investigate. Your safeguarding lead knows what to do next."
                  }
                ]
              }
            ]
          }
        },
        professionals: {
          context: "Three made-up situations at work.",
          respond: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l12-key-professionals",
            situations: [
              {
                "text": "Your manager presents your analysis to the board as their own.",
                "responses": [
                  {
                    "text": "Say nothing, and assume it will even out.",
                    "key": "risky",
                    "note": "It rarely evens out, and it can keep happening."
                  },
                  {
                    "text": "For your next piece, email it to the team with a date, and agree who presents it before the meeting.",
                    "key": "safe",
                    "note": "A dated record, and credit agreed up front."
                  },
                  {
                    "text": "Post in the team chat that your manager is a fraud.",
                    "key": "risky",
                    "note": "A public label can cost you more than it costs them. Use records and the right channels."
                  }
                ]
              },
              {
                "text": "A new contact keeps pushing for your work password \"to speed things up\", and gets angry when you say no.",
                "responses": [
                  {
                    "text": "Say no, save the messages, block them, and tell your security team.",
                    "key": "safe",
                    "note": "A boundary, a record and support, all at once."
                  },
                  {
                    "text": "Share it once, then change it later.",
                    "key": "risky",
                    "note": "Once shared, the damage can be done in minutes."
                  },
                  {
                    "text": "Keep refusing, but tell no one.",
                    "key": "risky",
                    "note": "Your security team needs to know. Others may be getting the same messages."
                  }
                ]
              },
              {
                "text": "A colleague says you \"imagined\" a conversation where they agreed to share the workload.",
                "responses": [
                  {
                    "text": "Doubt yourself, and do all the work.",
                    "key": "risky",
                    "note": "That's what gaslighting aims for. Check your notes, or ask someone who was there."
                  },
                  {
                    "text": "From now on, follow up conversations with a short email: \"To confirm what we agreed...\"",
                    "key": "safe",
                    "note": "A written record, made at the time, is hard to argue with."
                  },
                  {
                    "text": "Check with someone else who was there, and keep your own notes.",
                    "key": "safe",
                    "note": "A trusted person and your notes help you hold on to what happened."
                  }
                ]
              }
            ]
          }
        },
        students: {
          context: "Three made-up situations, online and at school.",
          respond: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l12-key-students",
            situations: [
              {
                "text": "Someone you met online says they'll share a photo of you with your friends unless you pay them.",
                "responses": [
                  {
                    "text": "Pay them, so it goes away.",
                    "key": "risky",
                    "note": "Paying rarely stops it. They usually ask for more."
                  },
                  {
                    "text": "Delete everything, and hope it stops.",
                    "key": "risky",
                    "note": "Block them, but don't delete the messages. They can help adults and the police stop this person."
                  },
                  {
                    "text": "Don't pay. Save the messages, block them, and tell a trusted adult now. Take It Down can help remove images.",
                    "key": "safe",
                    "note": "This is what the FBI advises. It's not your fault, and you won't be in trouble for telling."
                  }
                ]
              },
              {
                "text": "A friend copies your project and tells the teacher it was theirs.",
                "responses": [
                  {
                    "text": "Show your teacher your saved drafts, with their dates.",
                    "key": "safe",
                    "note": "Your drafts are a record that shows the work was yours."
                  },
                  {
                    "text": "Post about it in the class group chat.",
                    "key": "risky",
                    "note": "Posting can turn into a fight, and it doesn't prove anything. Talk to your teacher."
                  },
                  {
                    "text": "Next time, save your work with dates as you go. If it keeps happening, tell a trusted adult.",
                    "key": "safe",
                    "note": "Protecting your work before you share it, and support if it keeps happening."
                  }
                ]
              },
              {
                "text": "Someone keeps telling you \"You're too sensitive. That never happened\" whenever you're upset.",
                "responses": [
                  {
                    "text": "Decide you must be remembering it wrong.",
                    "key": "risky",
                    "note": "That's what gaslighting aims for. Your memory matters."
                  },
                  {
                    "text": "Write down what happened and when, and talk it through with a trusted adult.",
                    "key": "safe",
                    "note": "A record and a trusted adult help you hold on to what happened. It's not your fault."
                  },
                  {
                    "text": "Argue until they admit it.",
                    "key": "risky",
                    "note": "Arguing often goes nowhere. A record and a trusted adult help more."
                  }
                ]
              }
            ]
          }
        }
      }
    },
    {
      kind: "pictorial",
      title: "Build your plan",
      minutes: 10,
      targets: ["12.1", "12.2", "12.3"],
      figure: "plan",
      steps: [
        { id: "write", text: "Write down what happened, with dates.", meets: ["record"] },
        { id: "copies", text: "Keep copies: screenshots, emails and drafts.", meets: ["record"] },
        { id: "no", text: "Say no clearly, once.", meets: ["boundary"] },
        { id: "limit", text: "Limit contact, or block after saving the messages.", meets: ["boundary"] },
        { id: "tell", text: "Tell someone you trust.", meets: ["support"] },
        { id: "report", text: "Report it: to a manager, the safeguarding lead, the app, or the police.", meets: ["support"] },
        { id: "protect", text: "Protect your work before you share it: a dated draft, and credit agreed first.", meets: ["record", "boundary"] },
        { id: "callout", text: "Call them out in public.", meets: [], note: "calling someone out can feel strong, but it can put you at risk, and it gives you no record, support or boundary." }
      ],
      moves: [
        "Learners tick the steps they would use for one situation from today.",
        "Read the status aloud. Ask: what's missing, and which step would add it?",
        "Press Start again, and build a plan for a second situation.",
        "Ask each learner to name one step they'll start this week."
      ],
      say: [
        ["Facilitator", "A good plan has three parts: a record, support and a boundary."],
        ["Expected", "\"Calling them out would be enough.\" Tick it and read what the plan says."],
        ["Facilitator", "Nothing you tick here is saved or sent. It's your plan, for you."]
      ],
      watch:
        "Learners tick every step. Ask them to choose the fewest steps that cover all three parts, so the plan is one they'll really use."
    },
    {
      kind: "abstract",
      title: "Protect yourself and your gifts",
      minutes: 8,
      targets: ["12.1", "12.2", "12.3"],
      principles: ["gaslighting-defined", "never-promise-secrecy", "mandated-reporting-us", "sextortion-advice", "child-helplines"],
      tables: [
        {
          title: "Gaslighting, and what helps",
          head: ["What you hear or feel", "What helps"],
          rows: [
            ["\"That never happened.\"", "Your written record, with dates."],
            ["\"You're too sensitive.\"", "A trusted person to talk it through with."],
            ["You start to doubt your memory.", "Notes made at the time, and people who were there."]
          ]
        },
        {
          title: "Protect your work and ideas (practical advice, not a research finding)",
          head: ["Step", "Why it helps"],
          rows: [
            ["Write it down with a date first.", "It shows the idea was yours, and when."],
            ["Share it with more than one person.", "Others can say where it came from."],
            ["Agree credit before you start.", "It's easier to agree before than to argue after."],
            ["Keep your drafts.", "Drafts show how the work grew."]
          ]
        },
        {
          title: "Where to get help",
          head: ["Who", "When"],
          rows: [
            ["Someone you trust", "Always a good first step."],
            ["The safeguarding lead, at school", "When a child could be at risk."],
            ["The app, and the police or FBI", "Threats, blackmail, or someone asking for photos."],
            ["Take It Down", "To help remove images of someone under 18."],
            ["Child Helpline International", "To find a helpline in your country."]
          ]
        }
      ],
      moves: [
        "Read the gaslighting table. Ask: which situation today showed it?",
        "Read the four steps for protecting your work. Learners pick one to use this week.",
        "Read where to get help. Say who the safeguarding lead is, or the right person where you work."
      ],
      say: [
        ["Facilitator", "You don't need to prove what kind of person they are. You only need a record, support and a boundary."],
        ["Expected", "\"What if no one believes me?\""],
        ["Facilitator", "That's what the record is for. And keep telling people until someone helps. It's never your fault."]
      ],
      watch:
        "Someone may go quiet or seem upset. Check in privately afterwards, and follow your safeguarding route if a child could be at risk."
    }
  ],

  check: {
    minutes: 10,
    items: [
      {
        id: "p1",
        targets: ["12.1"],
        prompt:
          "Someone online keeps pushing you to share your password \"as a favor\", and gets angry when you say no. Choose a safe response, without calling them names.",
        crit:
          "Says no, clearly. Saves the messages, then blocks. Tells someone they trust, or reports it. Doesn't insult or label them. Reteach if they give in, argue with labels, or keep it secret."
      },
      {
        id: "p2",
        targets: ["12.2"],
        prompt:
          "You're about to share a big idea with someone who has taken credit before. Plan two ways to protect it.",
        crit:
          "Plans two, such as: write it down with a date first, share it with more than one person, agree who gets credit before starting, or keep your drafts. Reteach if they say \"never share\", or give nothing specific."
      },
      {
        id: "p3",
        targets: ["12.3"],
        prompt:
          "Someone often says, \"That never happened. You're too sensitive.\" What is this called, and what two things help?",
        crit:
          "Names it gaslighting: trying to make you doubt your own memory. Says a written record helps, with dates and what was said. So does a trusted person to check with. Reteach if they decide they must be wrong."
      }
    ],
    exit: {
      rating: "How ready do you feel to protect yourself and your work? (1 = not at all, 5 = very)",
      open: "What is one thing you will start writing down, or one person you could tell?"
    }
  },

  transfer: {
    educators:
      "Start one written record this week, or protect one piece of work before you share it. Check you know your school's safeguarding lead, and how to reach them.",
    professionals:
      "Start one written record this week, or send one idea by email, with a date, before you present it. Agree credit before your next shared project.",
    students:
      "Save your next piece of work with a date. If anything online or at school worries you, tell an adult you trust. It's never your fault."
  },

  access: [
    {
      channel: "vision",
      note: "The situations are plain text, with lettered responses. The plan builder reads its status aloud, and its grid is also a table."
    },
    {
      channel: "attention",
      note: "This topic can be upsetting. Take one situation at a time, let learners work in pairs, and let anyone step out."
    },
    {
      channel: "motor",
      note: "The plan builder is a list of checkboxes that works with the keyboard. Start again clears it in one step."
    }
  ]
};
