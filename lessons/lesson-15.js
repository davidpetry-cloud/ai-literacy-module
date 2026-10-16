/**
 * Essentials 3 — Talking With AI on the Phone.
 *
 * An essential, like Essentials 1 and 2: taken at any point. It keeps n: 15
 * for its page address; learners see "Essentials 3".
 *
 * Backward design: objectives (approved by David on 2026-10-13, with "what to
 * say and what not to say" added at his request), then the warm-up and check
 * (approved the same day), then the stages (design approved the same day,
 * built 2026-10-16). The concrete stage is the `pause-call` exercise: two
 * written-out calls per track, a call you didn't make and a call you made,
 * each stopped at four pause points. The pictorial is Essentials 1's `share`
 * sorter, generalised to three bins. Plan and stage design:
 * docs/lesson-15-design.md; source research: docs/lesson-15-research.md.
 * Builds on Essentials 1's voice-bot rows without repeating them. Security
 * claims rest on agencies' published guidance (FBI IC3, CISA, the FCC, the
 * FTC, the CFPB), opened and checked on 2026-10-16.
 */

export default {
  n: 15,
  category: "essentials",
  label: "Essentials 3",
  idPrefix: "E3",
  slug: "ai-on-the-phone",
  title: "Talking With AI on the Phone",
  ready: true,
  objectivesApproved: "2026-10-13",
  framing:
    "AI voices now answer company phone lines, and scammers use them too. A voice can sound human, or like someone you love. This lesson gives you words to say, words to keep back, and ways to protect your own voice.",
  arcs: {
    attention:
      "Ask for a show of hands: \"Who has talked to an AI on a phone line this year?\" Then: \"Who wasn't sure?\" Hands only, no stories.",
    relevance: {
      educators:
        "Schools get calls about pay, trips and student records. Suppliers and banks now answer the phone with AI. A few words to say, and a few to keep back, protect you and your students.",
      professionals:
        "Fake help desk, supplier and bank calls target staff, and company phone lines now answer with AI. Knowing what to say and what to keep back protects you and your company.",
      students:
        "Calls can come about your phone, your games or school. Some come from AI. A few words to say, and a few to keep back, keep you safe. A trusted adult can always help."
    },
    confidence:
      "You don't need to spot a bot by its voice. Ask who called whom, give only what the task needs, and hang up whenever you like.",
    satisfaction:
      "Learners leave with words to use on their next call, a voicemail password set or a time to set it, and a family secret word."
  },
  objectives: [
    {
      id: "E3.1",
      bloom: "understand",
      text: "Explain what an AI voice can do on a call, and what the law where you live says it must tell you."
    },
    {
      id: "E3.2",
      bloom: "apply",
      text: "Respond safely to a call that might be a bot: decide whether to answer, what not to say, when to hang up, and how to call back on an official number."
    },
    {
      id: "E3.3",
      bloom: "evaluate",
      text: "Decide what to say to a company's AI agent, what to keep to yourself, and when to ask for a person instead."
    },
    {
      id: "E3.4",
      bloom: "apply",
      text: "Protect your own voice from being copied: limit public recordings, lock your voicemail, and agree a family secret word."
    }
  ],

  // Warm-up and check approved by David on 2026-10-13. One pre and one post item per objective.
  warmup: {
    minutes: 5,
    items: [
      {
        id: "w1",
        targets: ["E3.1"],
        prompt: "A friendly caller sounds completely human. Could it be a computer? Would it have to tell you?",
        expected: "Most say they'd hear a robot. Note who says AI can sound human, or that it might not tell you."
      },
      {
        id: "w2",
        targets: ["E3.2"],
        prompt: "A caller asks, \"Can you hear me?\" What's the harm in saying yes?",
        expected: "Most say none. Note who says they'd hang up, or that a recorded yes can be misused."
      },
      {
        id: "w3",
        targets: ["E3.3"],
        prompt: "You call your bank and an AI answers. It asks for your password to help you faster. Is that OK, because you called them?",
        expected: "Most say yes. Note who says never give a password, or who would ask for a person."
      },
      {
        id: "w4",
        targets: ["E3.4"],
        prompt: "How could someone get a copy of your voice?",
        expected: "Most say only by hacking. Note who mentions videos or voice notes they've posted online."
      }
    ]
  },

  // Stage design approved by David on 2026-10-13 (docs/lesson-15-design.md).
  stages: [
    {
      kind: "concrete",
      // The question learners answer, shown before the calls (UX audit 2026-10, findings 4 and 7).
      ask: "At each pause: what would you say or do? Choose, then show the answer.",
      next: "Next, you'll sort what's fine to say on a call, and what isn't.",
      exercise: "pause-call",
      title: "Pause the call",
      minutes: 12,
      targets: ["E3.1", "E3.2", "E3.3"],
      moves: [
        "Hand out the two calls for the group's track. Say they were made up for this lesson. Nobody calls anyone.",
        "Read call 1 aloud, one part at a time. At each pause, everyone chooses before anyone shows the answer.",
        "At each pause, ask: who chose what, and why? Then show the answer.",
        "Read call 2 the same way. Ask: what changed, now that you made the call?"
      ],
      say: [
        ["Facilitator", "The same words can be fine or risky. It depends on who called whom."],
        ["Expected", "\"It sounded like a real person.\" Say: AI voices can sound human. Judge what it asks for, not how it sounds."],
        ["Facilitator", "You can always hang up, and you can always ask for a person."]
      ],
      watch:
        "Learners stay on the line to be polite. Say that hanging up is always allowed. Learners trust the honest AI with everything, because they made the call. Bring them back to what the task needs.",
      tracks: {
        educators: {
          context: "Two made-up calls: one you didn't make, and one you made.",
          calls: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "e3-key-educators",
            items: [
              {
                kind: "incoming",
                from: "Caller ID: \"District Payroll\", from a number you don't know.",
                pauses: [
                  {
                    before: [["", "Your phone rings in your lunch break. The screen says \"District Payroll\". You don't know the number."]],
                    ask: "Do you answer?",
                    choices: [
                      { text: "Answer it. It says it's payroll." },
                      { text: "Let it go to voicemail. If it matters, call payroll on the number you already have.", best: true },
                      { text: "Call the number straight back." }
                    ],
                    why: "You don't have to answer a number you don't know. Caller ID can be faked. In this made-up call, the caller was an AI voice bot. It sounded like a friendly person."
                  },
                  {
                    before: [["", "Say you answered anyway."], ["Caller", "Hi, this is Jordan from district payroll. Can you hear me okay?"]],
                    ask: "What do you say?",
                    choices: [
                      { text: "\"Yes, I can hear you fine.\"" },
                      { text: "\"Yes. What's this about?\"" },
                      { text: "Hang up without saying \"yes\".", best: true }
                    ],
                    why: "The FCC has warned that a recorded \"yes\" could be used to approve charges. The warning is from 2017, before AI voice bots. Hanging up costs you nothing."
                  },
                  {
                    before: [["", "Say you stayed on, and didn't say yes."], ["Caller", "Great. We're moving everyone to a new pay system. So your pay arrives on Friday, please confirm your bank account number."]],
                    ask: "What do you say?",
                    choices: [
                      { text: "\"I won't give that on a call. I'll call payroll back on the official number.\"", best: true },
                      { text: "Read out only the last four digits." },
                      { text: "Read out the account number, so your pay isn't late." }
                    ],
                    why: "Never give an account number on a call you didn't make, not even part of it. Call back on a number you already have."
                  },
                  {
                    before: [["Caller", "I understand. But if we can't confirm it in the next ten minutes, your pay will be late this month. I can give you a number to call back."]],
                    ask: "What do you do?",
                    choices: [
                      { text: "Take the number it gives you, and call that." },
                      { text: "Give the details, so your pay isn't late." },
                      { text: "Hang up. Call payroll on the number in the staff directory or on your payslip.", best: true }
                    ],
                    why: "A rush is a warning sign. A number the caller gives you could lead straight back to the scammer. Use a number you already have."
                  }
                ]
              },
              {
                kind: "outgoing",
                from: "You called the order line on the supplier's own website.",
                pauses: [
                  {
                    before: [
                      ["", "Your class set of 30 novels arrived with 10 missing. You call the number on the supplier's website."],
                      ["AI agent", "Hi, I'm Sage, an AI assistant for Quillmore Books. I can help with orders. What can I do for you?"]
                    ],
                    ask: "What do you say first?",
                    choices: [
                      { text: "Hang up. You only talk to people." },
                      { text: "Say what's wrong in your own words: 10 of the 30 books didn't arrive.", best: true },
                      { text: "Read out the school's card number, to save time." }
                    ],
                    why: "It told you it's an AI, as an honest business should. Some places require that by law. Start by saying what's wrong, in your own words."
                  },
                  {
                    before: [["AI agent", "I can look into that. Please tell me your order number, and the password for your account."]],
                    ask: "What do you give it?",
                    choices: [
                      { text: "The order number and the password." },
                      { text: "The password only. The order number is long." },
                      { text: "The order number only. Say you won't share the password.", best: true }
                    ],
                    why: "Give only what the task needs. An order number finds your order. No one needs your password, even on a call you made."
                  },
                  {
                    before: [
                      ["", "You give the order number."],
                      ["AI agent", "Thanks. I see you'd like to return 30 books. I've started a return."],
                      ["You", "No, 10 books are missing."],
                      ["AI agent", "Sorry about that. So you'd like to cancel the whole order?"]
                    ],
                    ask: "It got your problem wrong twice. What now?",
                    choices: [
                      { text: "\"I'd like to speak to a person.\"", best: true },
                      { text: "Say the same thing again, until it understands." },
                      { text: "Agree to cancel, to get it over with." }
                    ],
                    why: "Bots can get things wrong, and go round in circles. Asking for a person is a fair step. Don't agree to something you didn't ask for."
                  },
                  {
                    before: [["AI agent", "I'm sorry. A person can call you back tomorrow morning. Or, now that I understand, I can send the 10 missing books today."]],
                    ask: "What do you say?",
                    choices: [
                      { text: "\"Do whatever you think is best.\"" },
                      { text: "\"Please send the 10 books, and email me what you've done.\"", best: true },
                      { text: "Give it your password, so it can check everything else." }
                    ],
                    why: "If it has it right now, let it do the task, then check what it did. An email gives you a record. You can still ask for the call."
                  }
                ]
              }
            ]
          }
        },
        professionals: {
          context: "Two made-up calls at work: one you didn't make, and one you made.",
          calls: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "e3-key-professionals",
            items: [
              {
                kind: "incoming",
                from: "Caller ID: \"IT Service Desk\", from a number you don't recognize.",
                pauses: [
                  {
                    before: [["", "Your work phone rings. The screen says \"IT Service Desk\". You don't recognize the number."]],
                    ask: "Do you answer?",
                    choices: [
                      { text: "Call the number straight back." },
                      { text: "Answer it. IT calls sometimes." },
                      { text: "Let it go to voicemail. If it matters, call the help desk on the number you already have.", best: true }
                    ],
                    why: "Caller ID can be faked. Criminals have pretended to be IT help desks to get into company networks. In this made-up call, the caller was an AI voice bot that sounded human."
                  },
                  {
                    before: [["", "Say you answered anyway."], ["Caller", "Hi, it's Alex from the IT service desk. Can you hear me?"]],
                    ask: "What do you say?",
                    choices: [
                      { text: "Hang up without saying \"yes\".", best: true },
                      { text: "\"Yes, I can hear you.\"" },
                      { text: "\"Yes. Is something wrong?\"" }
                    ],
                    why: "The FCC has warned that a recorded \"yes\" could be used to approve charges. The warning is from 2017, before AI voice bots. Hanging up costs you nothing."
                  },
                  {
                    before: [["", "Say you stayed on, and didn't say yes."], ["Caller", "We've found a problem with your account. I've just sent a code to your phone. Read it to me, and I'll fix it now."]],
                    ask: "What do you say?",
                    choices: [
                      { text: "Read out the code. IT sent it." },
                      { text: "\"I won't read out a code. I'll call the help desk myself.\"", best: true },
                      { text: "Read out half the code, to be safe." }
                    ],
                    why: "A code lets someone into your account. No one who calls you should get it. Criminals have posed as IT staff to get these codes from employees."
                  },
                  {
                    before: [["Caller", "If we don't fix this now, your account will be locked for the rest of the day. Your manager asked me to sort it quickly."]],
                    ask: "What do you do?",
                    choices: [
                      { text: "Hang up. Call the help desk on the number you already have, and tell IT about the call.", best: true },
                      { text: "Read out the code. You can't lose a day's work." },
                      { text: "Ask for the caller's direct number, and call that." }
                    ],
                    why: "A rush and a boss's name are pressure. Use a number you already have. Telling IT helps them warn others."
                  }
                ]
              },
              {
                kind: "outgoing",
                from: "You called the claims line on your insurer's own website.",
                pauses: [
                  {
                    before: [
                      ["", "Your car was damaged in a parking lot, and you made a claim last week. You call the number on your insurer's website to ask how it's going."],
                      ["AI agent", "Hello, I'm Ari, an AI assistant for Larkspur Insurance. How can I help today?"]
                    ],
                    ask: "What do you say first?",
                    choices: [
                      { text: "Say what you need in your own words: an update on your car claim.", best: true },
                      { text: "Read out your bank card number, in case there's a payment." },
                      { text: "Hang up. It's not a person." }
                    ],
                    why: "It told you it's an AI, as an honest business should. Some places require that by law. Start by saying what you need, in your own words."
                  },
                  {
                    before: [["AI agent", "I can check that. Please tell me your claim number, your date of birth, and the password for your online account."]],
                    ask: "What do you give it?",
                    choices: [
                      { text: "All three. You made the call, so it's safe." },
                      { text: "The claim number and date of birth. Say you won't share the password.", best: true },
                      { text: "Just the password. That proves who you are." }
                    ],
                    why: "Give only what the task needs. The claim number and your date of birth find your claim. No one needs your password, even on a call you made."
                  },
                  {
                    before: [
                      ["AI agent", "Thanks. It sounds like you'd like a quote for a new policy."],
                      ["You", "No, I want an update on my claim."],
                      ["AI agent", "Of course. I can help you buy extra cover for your car."]
                    ],
                    ask: "It got your problem wrong twice. What now?",
                    choices: [
                      { text: "Say it again, more slowly, until it gets it." },
                      { text: "Agree to hear about extra cover, to move things along." },
                      { text: "\"I'd like to speak to a person.\"", best: true }
                    ],
                    why: "Bots can get things wrong, and go round in circles. Asking for a person is a fair step. Don't agree to something you didn't ask for."
                  },
                  {
                    before: [["AI agent", "I'm sorry. A person can call you back today. Or I can tell you now: your claim is approved, and the repair shop can start on Monday."]],
                    ask: "What do you say?",
                    choices: [
                      { text: "\"Thanks. Please email me that, with the claim number.\"", best: true },
                      { text: "Take its word for it, and tell the repair shop to start." },
                      { text: "Give it your password, so it can check your other policies." }
                    ],
                    why: "An AI can get facts wrong. Ask for it in writing, so you have a record you can check. You can still ask for a person to call."
                  }
                ]
              }
            ]
          }
        },
        students: {
          context: "Two made-up calls about your own phone. Just read them. Nobody makes a call.",
          calls: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "e3-key-students",
            items: [
              {
                kind: "incoming",
                from: "Caller ID: the name of your phone company, from a number you don't know.",
                pauses: [
                  {
                    before: [["", "Your phone rings after school. The screen shows the name of your phone company. You don't know the number."]],
                    ask: "Do you answer?",
                    choices: [
                      { text: "Let it go to voicemail, and tell a trusted adult.", best: true },
                      { text: "Answer it. It's your phone company." },
                      { text: "Call the number straight back." }
                    ],
                    why: "You don't have to answer. Caller ID can be faked. In this made-up call, the caller was an AI voice bot. It sounded like a kind person."
                  },
                  {
                    before: [["", "Say you answered anyway."], ["Caller", "Hi there! Can you hear me?"]],
                    ask: "What do you say?",
                    choices: [
                      { text: "\"Yes, I can hear you!\"" },
                      { text: "\"Yes. Who's this?\"" },
                      { text: "Hang up without saying \"yes\", and tell a trusted adult.", best: true }
                    ],
                    why: "The FCC has warned that a recorded \"yes\" could be misused. Hanging up is always OK, even if the caller sounds kind."
                  },
                  {
                    before: [["", "Say you stayed on, and didn't say yes."], ["Caller", "I'm from your phone company. To keep your phone working, tell me the PIN for your account."]],
                    ask: "What do you say?",
                    choices: [
                      { text: "Tell it the PIN. It's your phone company." },
                      { text: "Hang up without giving the PIN, and tell a trusted adult.", best: true },
                      { text: "Give the first two numbers only." }
                    ],
                    why: "Never share a PIN or a password on the phone, not even part of it. A trusted adult can call the phone company on the official number."
                  },
                  {
                    before: [["Caller", "If you don't tell me now, your phone will be cut off tonight!"]],
                    ask: "What do you do?",
                    choices: [
                      { text: "Tell it the PIN, so your phone keeps working." },
                      { text: "Ask it for a number to call back." },
                      { text: "Hang up, and tell a trusted adult. They can check with the phone company.", best: true }
                    ],
                    why: "A rush is a warning sign. A trusted adult can call the number on the bill or the company's website. If you were fooled, it's not your fault."
                  }
                ]
              },
              {
                kind: "outgoing",
                from: "Your parent or carer called the number on the phone company's website, with you, on speaker.",
                pauses: [
                  {
                    before: [
                      ["", "Your phone's data has stopped working. Your parent or carer calls the phone company's official number. You listen on speaker."],
                      ["AI agent", "Hi, I'm Robin, an AI assistant for Kestrel Mobile. How can I help?"]
                    ],
                    ask: "What should you and your parent or carer say first?",
                    choices: [
                      { text: "Refuse to talk to it, because it's only a computer." },
                      { text: "Read out the account password, to save time." },
                      { text: "Say what's wrong in your own words: the phone's data stopped working.", best: true }
                    ],
                    why: "It told you it's an AI, as an honest business should. Some places require that by law. Start by saying what's wrong, in your own words."
                  },
                  {
                    before: [["AI agent", "I can help with that. Please tell me the phone number, and the password for the account."]],
                    ask: "What do you give it?",
                    choices: [
                      { text: "The phone number only. Say you won't share the password.", best: true },
                      { text: "The password only." },
                      { text: "Both. You made the call, so it's safe." }
                    ],
                    why: "Give only what the task needs. The phone number finds the account. No one needs a password on a call, even one you made."
                  },
                  {
                    before: [
                      ["AI agent", "Thanks. It sounds like you'd like a new phone."],
                      ["Your parent or carer", "No, the data stopped working."],
                      ["AI agent", "Great! I can show you our newest phones."]
                    ],
                    ask: "It got the problem wrong twice. What now?",
                    choices: [
                      { text: "Agree to hear about new phones." },
                      { text: "\"We'd like to speak to a person.\"", best: true },
                      { text: "Say the same thing again and again." }
                    ],
                    why: "Bots can get things wrong, and go round in circles. Asking for a person is a fair step. Don't agree to something you didn't ask for."
                  },
                  {
                    before: [["AI agent", "Sorry about that. A person can call back in an hour. Or I can restart your data now. You may need to turn your phone off and on."]],
                    ask: "What do you say?",
                    choices: [
                      { text: "Give it the password, so it can check everything." },
                      { text: "\"Do whatever you think.\"" },
                      { text: "\"Please restart it, and send us a text saying what you did.\"", best: true }
                    ],
                    why: "If it understands now, let it do the task, then check it worked. A text gives you a record. You can still ask for the person."
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
      title: "Say it, or keep it?",
      minutes: 10,
      targets: ["E3.2", "E3.3"],
      figure: "share",
      claim: "e3-key-say",
      // Essentials 1's sorter with three bins. The middle one is the lesson's point: the same words
      // can be fine or risky depending on who called whom. `short` labels the drawing's rows.
      bins: [
        { id: "any", label: "Fine on any call", short: "Any call" },
        { id: "made", label: "Only on a call you made to the official number", short: "Calls you made" },
        { id: "never", label: "Never on a call", short: "Never" }
      ],
      // Learner-visible instructions. Same in every track.
      intro: [
        "Sort each thing you might say on a phone call. Is it fine on any call, only on a call you made to the official number, or never? Then show the answers.",
        "Ask two questions: who called whom, and what does the task need?",
        "Nothing you choose is saved or sent."
      ],
      items: [
        { id: "ask-ai", text: "\"Am I talking to a person or an AI?\"", key: "any", why: "Fine to ask on any call. An honest business should tell you. A scam bot may lie, so the answer proves nothing on its own." },
        { id: "password", text: "Your password.", key: "never", why: "No one needs your password on a call, not even on a call you made. Not a person, and not a bot." },
        { id: "name-reason", text: "Your name, and why you're calling.", key: "made", why: "Fine when you called the official number yourself. If someone calls you, you don't have to say who you are." },
        { id: "yes", text: "\"Yes\", when a caller asks \"Can you hear me?\"", key: "never", why: "The FCC has warned that a recorded \"yes\" could be misused. Hang up instead." },
        { id: "person", text: "\"I'd like to speak to a person.\"", key: "any", why: "Fine on any call. Use it when a bot can't help, gets it wrong, or goes round in circles." },
        { id: "order", text: "Your order number or claim number.", key: "made", why: "It helps on a call you made to the official number. Don't give it to someone who called you." },
        { id: "pin", text: "Your PIN.", key: "never", why: "Never share a PIN on the phone, the FCC says. Not even part of it." },
        { id: "callback", text: "\"I'll call you back on the official number.\"", key: "any", why: "Fine on any call. Then hang up, and use a number from your card, a statement or the official website." },
        { id: "code-them", text: "A code that just came to your phone, on a call you didn't make.", key: "never", why: "A code can let someone into your account. No real caller asks you for one." },
        { id: "code-bank", text: "A code your bank sends to check it's you, on a call you made to its official number.", key: "made", why: "Some banks do this when you call them. Check that you dialed the official number. Never read a code to someone who called you." },
        { id: "no-thanks", text: "\"No, thank you.\" Then you hang up.", key: "any", why: "Fine on any call. You never have to stay on the line." },
        { id: "money", text: "Agreeing to move money, or to pay with gift cards.", key: "never", why: "If a caller asks you to pay with gift cards, it's a scam, the FCC says. No real bank asks you to move money to keep it safe." }
      ],
      moves: [
        "Learners sort all twelve before anyone shows the answers.",
        "Show the answers. Ask: which one surprised you?",
        "Point to the middle bin. Ask: why is the same thing fine on one call and risky on another?",
        "Press Start again if the group wants a second try."
      ],
      say: [
        ["Facilitator", "Two questions: who called whom, and what does the task need?"],
        ["Expected", "\"I'd give my password to my own bank.\" Say: no one needs your password on a call, not even your bank."],
        ["Facilitator", "Nothing you choose here is saved or sent."]
      ],
      watch:
        "Learners put everything under Never. Ask what you would say to get help on a call you made. Learners put a code from a call they didn't make in the middle. Ask: who called whom?"
    },
    {
      kind: "abstract",
      title: "Talking with AI on the phone",
      minutes: 8,
      targets: ["E3.1", "E3.2", "E3.3", "E3.4"],
      principles: [
        "ai-voice-calls",
        "voice-cloning-bank-access",
        "ai-disclosure-laws",
        "california-human-agent-law",
        "answering-bot-calls",
        "can-you-hear-me-fcc",
        "bank-fraud-call-ftc",
        "help-desk-code-scam",
        "chatbots-cfpb",
        "voice-protection-fbi-fcc",
        "political-ai-calls-waiver"
      ],
      tables: [
        {
          title: "What an AI voice can do",
          head: ["It can…", "So…"],
          rows: [
            ["Sound like a person.", "You can't tell by listening. Judge what it asks for."],
            ["Copy a real person's voice from short clips.", "A voice you know proves nothing. Ask for your family's secret word."],
            ["Answer questions and keep a conversation going.", "Talking back doesn't make it a person."],
            ["Call many people at once.", "A call that seems meant for you may not be."],
            ["Say who it is.", "It can't prove it. Call back on a number you already have."]
          ]
        },
        {
          title: "What it must tell you",
          head: ["Where", "The rule"],
          rows: [
            ["The EU", "From 2 August 2026, a business's AI must say it's an AI, unless that's obvious."],
            ["Utah, in the US", "A business's AI must say it's an AI if you clearly ask."],
            ["California, in the US", "From 1 January 2027, a large business's bot must not claim to be human. It must say it's a bot if you could be fooled. You must be able to ask for a person."],
            ["US federal rules", "A recorded or AI-voice call must say who is calling, but not that it's an AI."],
            ["Scam bots", "They ignore every rule, and they lie. What a caller says about itself proves nothing."],
            ["Anywhere else", "Check the rules where you live. They may be different, or there may be none yet."]
          ]
        },
        {
          title: "Say it, or keep it",
          head: ["On…", "What you can say"],
          rows: [
            ["Any call", "\"Am I talking to a person or an AI?\" \"I'd like to speak to a person.\" \"I'll call you back on the official number.\" \"No, thank you.\""],
            ["Only a call you made to the official number", "Your name, why you're calling, your order or claim number, and a code your bank sends to check it's you."],
            ["Never on a call", "Your password or PIN. A code on a call you didn't make. \"Yes\" to \"Can you hear me?\" Agreeing to move money or buy gift cards."]
          ]
        },
        {
          title: "Protect your voice",
          head: ["Step", "Why it helps"],
          rows: [
            ["Keep public videos and voice notes of you to a minimum.", "Criminals can copy a voice from short clips. Less online means less to copy."],
            ["Set your social media accounts to private.", "Then only people you know can see and hear your posts."],
            ["Set a strong voicemail password.", "It stops someone breaking into your voicemail."],
            ["Agree a secret word with your family.", "If a call in a loved one's voice asks for help, ask for the word."],
            ["Students: do these with a parent or carer.", "They can help you set things up, and pick the word with you."]
          ]
        }
      ],
      moves: [
        "Read what an AI voice can do. Ask: which of today's calls sounded human?",
        "Read what it must tell you. Ask: what are the rules where you live? If no one knows, look it up together.",
        "Read the say-it-or-keep-it table. Each learner picks one line to use on their next call.",
        "Read how to protect your voice. Students do these steps with a parent or carer."
      ],
      say: [
        ["Facilitator", "An honest AI tells you what it is. A scam bot can lie. So judge what it asks for, not what it says it is."],
        ["Expected", "\"Only famous people get their voices copied.\" Say: short clips are enough. Videos and voice notes you post count."],
        ["Facilitator", "For adult groups in the US only, not students: a group has asked the FCC to allow AI-voice political calls to cell phones before the election. Check if it has decided."],
        ["Facilitator", "You can always hang up. You can always ask for a person."]
      ],
      watch:
        "Learners decide never to talk to any AI. Bring them back to call 2: an honest AI can help, if you give it only what the task needs. Learners think the law keeps scam bots away. Scammers ignore the law."
    }
  ],

  check: {
    minutes: 10,
    items: [
      {
        id: "p1",
        targets: ["E3.1"],
        prompt: "Name two things an AI voice can do on a call. Does a business's AI have to tell you it's an AI?",
        crit:
          "Names two: sound human, copy a real person's voice, answer questions, or call many people at once. Says the rule depends on where you live, and that scam bots ignore it. Reteach if they think a bot always sounds like a robot."
      },
      {
        id: "p2",
        targets: ["E3.2"],
        prompt:
          "A caller says it's your bank. It asks, \"Can you hear me?\" Then it asks you to confirm your account number. What do you do, and what do you not say?",
        crit:
          "Hangs up without saying yes or giving the number. Doesn't press any keys. Calls back on the number on their card or statement. Reteach if they'd say yes to be polite, or give part of the number."
      },
      {
        id: "p3",
        targets: ["E3.3"],
        prompt:
          "You call a company's official number and an AI answers. It keeps getting your problem wrong. What do you say, and what do you keep to yourself?",
        crit:
          "Asks for a person. Describes the problem in their own words. Gives only what the task needs, and never a password. Reteach if they'd share a password, or keep going round in circles."
      },
      {
        id: "p4",
        targets: ["E3.4"],
        prompt: "Give three ways to make it harder for someone to copy your voice or use it to fool your family.",
        crit:
          "Limits public videos and voice notes, or sets accounts to private. Sets a strong voicemail password. Agrees a family secret word. Students do this with a parent or carer. Reteach if they think only famous people's voices get copied."
      }
    ],
    exit: {
      rating: "How useful was today for handling calls from AI? (1 = not at all, 5 = very)",
      open: "What will you say, or not say, on your next unexpected call?"
    }
  },

  transfer: {
    educators:
      "Set a strong voicemail password this week, and agree a secret word with your family. On the next company line you call, try asking: \"Am I talking to a person or an AI?\"",
    professionals:
      "Set a strong voicemail password this week, and agree a secret word with your family. On the next company line you call, try asking: \"Am I talking to a person or an AI?\" Agree with your team how to check a call from \"IT\".",
    students:
      "With a parent or carer, set a strong voicemail password this week, and agree a family secret word. Set your accounts to private."
  },
  followUp: "Follow up in two weeks: did you set a voicemail password and a secret word, and did a call test what you'd say?",

  access: [
    {
      channel: "vision",
      note: "The calls are plain text. Each says in words which kind of call it is and who is speaking. Each answer names the best choice and yours, with a word and a symbol. The sorter reads its status aloud, and its grid is also a table."
    },
    {
      channel: "hearing",
      note: "Nothing in this lesson needs sound. Both calls are written out, so no audio is played or recorded."
    },
    {
      channel: "attention",
      note: "Take each call one pause at a time. Pairs can split the two calls, then compare. The sorter can be done in two halves of six."
    },
    {
      channel: "motor",
      note: "Every choice is a radio button that works with the keyboard. Show the answer and Start again are buttons, with no dragging."
    }
  ]
};
