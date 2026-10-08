/**
 * Essentials 1 — Staying Secure in the Age of AI.
 *
 * Not part of the numbered sequence: an essential, taken at any point (David,
 * 2026-10-05). It keeps n: 13 for its page address; learners see "Essentials 1".
 *
 * Backward design: objectives approved 2026-10-05, then the warm-up and check,
 * then the stages (design approved by David the same day). The concrete stage
 * is an inbox of made-up messages, genuine or scam; the pictorial is a sorter
 * for what's safe to put into an AI tool. On 2026-10-08 David approved swapping
 * one scam per track for an AI voice-bot call, with no new objective
 * (docs/essentials-gaps-ai-calls-and-security.md). Facts rest on the FBI (IC3, and its
 * September 2026 podcast on keeping teens safe online), the UK's NCSC, NIST
 * and CISA.
 * Plan and sources: docs/lesson-13-design.md. Security claims must rest on
 * security agencies' published guidance (e.g. FBI IC3, CISA, the UK's NCSC),
 * checked before they go into claims.js.
 */

export default {
  n: 13,
  category: "essentials",
  label: "Essentials 1",
  idPrefix: "E1",
  slug: "staying-secure",
  title: "Staying Secure in the Age of AI",
  ready: true,
  objectivesApproved: "2026-10-05",
  framing:
    "AI helps people who attack too. Scams are more convincing, voices can be copied, and what you type into a tool can travel further than you think. This lesson gives you habits that hold up anyway.",
  arcs: {
    attention:
      "Ask for a show of hands: \"Who has had a message this year that might have been a scam?\" Hands only, no stories.",
    relevance: {
      educators:
        "Schools hold money, children's data and trust, so scammers target staff. A few checks protect you, your students and their families.",
      professionals:
        "Fake invoices, changed bank details and fake calls from a boss cost companies money. A second check before you pay or share stops most of them.",
      students:
        "Scammers go after game accounts, phones and friends' accounts. A few habits keep your accounts and your money safe. A trusted adult can always help."
    },
    confidence:
      "You don't need to be a tech expert. Slow down, check another way, keep private things out of AI tools, and lock your accounts.",
    satisfaction:
      "Learners leave with one protection turned on, or a day to do it, and a family secret word."
  },

  objectives: [
    {
      id: "E1.1",
      bloom: "understand",
      text: "Explain how AI makes common attacks easier, such as convincing phishing, cloned voices and fake videos."
    },
    {
      id: "E1.2",
      bloom: "analyze",
      text: "Spot the signs of an AI-assisted scam in a message, call or video, and check it through a second channel you trust."
    },
    {
      id: "E1.3",
      bloom: "apply",
      text: "Decide what is safe to put into an AI tool, and keep private, work and other people's information out of it."
    },
    {
      id: "E1.4",
      bloom: "apply",
      text: "Protect your own accounts with a password manager or passkeys, and two-step sign-in."
    }
  ],

  warmup: {
    minutes: 5,
    items: [
      {
        id: "w1",
        targets: ["E1.1"],
        prompt: "Scam messages are easy to spot because they're full of spelling mistakes. True or false?",
        expected:
          "Most say true. Note who says AI can now write a scam with no mistakes at all."
      },
      {
        id: "w2",
        targets: ["E1.2"],
        prompt: "Someone calls with a family member's voice, asking for money right away. How would you know it's really them?",
        expected:
          "Most say they'd know the voice. Note who says they'd hang up and call back on a number they already have, or ask a question only the real person knows."
      },
      {
        id: "w3",
        targets: ["E1.3"],
        prompt: "Is it safe to paste a friend's message, or a work email, into an AI chatbot to help you reply?",
        expected:
          "Most say yes, because it feels private. Note who asks where the text goes, or whose information it is."
      },
      {
        id: "w4",
        targets: ["E1.4"],
        prompt: "What makes a password strong?",
        expected:
          "Most say symbols, capitals, and changing it often. Note who says length, a new password for each account, or a second step to sign in."
      }
    ]
  },

  stages: [
    {
      kind: "concrete",
      exercise: "inbox",
      title: "Check it, or trust it?",
      minutes: 12,
      targets: ["E1.1", "E1.2"],
      moves: [
        "Hand out the messages for the group's track. Say they were made up for this lesson.",
        "Learners mark each message genuine or scam, name the signs, and say how they would check.",
        "Reveal one message at a time. For each scam, ask: what did AI make easier here?",
        "Point out the genuine messages. The habit is to check, not to panic."
      ],
      say: [
        ["Facilitator", "Spelling isn't the test any more. AI writes perfectly. Look for the rush, the secret and the new details."],
        ["Expected", "\"I'd know my own mom's voice.\" Say: AI can copy a voice. Call back on a number you already have."],
        ["Facilitator", "Never check with the contact details in the message. Use ones you already have."]
      ],
      watch:
        "Learners mark everything as a scam. Ask what makes the genuine ones safe: they ask for nothing, and they come the usual way.",
      tracks: {
        educators: {
          context: "Five made-up messages in a teacher's inbox and phone.",
          inbox: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "e1-key-educators",
            items: [
              {
                kind: "call",
                from: "An automated caller, \"Lakeside Coach Tours booking assistant\"",
                text: "Hello, I'm Lakeside Coach Tours' automated booking assistant. Our bank has changed. To keep your class trip on Friday, please pay the balance to our new account today. I can text you the details now. Shall I go ahead?",
                key: "scam",
                signs: ["urgency", "scarcity", "new-details"],
                check: "Hang up. Call the company on the number in your original booking. Tell your school office before you pay anything.",
                note: "It said it was an AI, and many firms do use them. Saying so doesn't make it honest. The new bank details are the warning sign."
              },
              {
                kind: "call",
                from: "An unknown number, in your principal's voice",
                text: "Hi, it's Dr. Hale. I'm stuck in a board meeting and need a favor. Can you buy six $100 gift cards for staff prizes and text me the codes? Keep it quiet, it's a surprise. I'll pay you back today.",
                key: "scam",
                signs: ["authority", "urgency", "secrecy", "new-details"],
                check: "Hang up. Call the principal on the number you already have, or ask the office.",
                note: "AI can copy a voice. Gift cards and a secret are classic signs: no principal pays staff this way."
              },
              {
                kind: "email",
                from: "IT Help Desk <helpdesk@your school's usual address>",
                subject: "Staff Wi-Fi password changes Monday",
                text: "Reminder: the staff Wi-Fi password changes on Monday. The new one will be on the staff room notice board. We will never ask for your password by email.",
                key: "genuine",
                signs: [],
                check: "Nothing to do now. If in doubt, read the notice board yourself.",
                note: "It asks for nothing, has no link and no rush, and sends you to check in person."
              },
              {
                kind: "video",
                from: "A video call from \"the superintendent\"",
                text: "The picture was blurry and the voice sounded flat. \"The superintendent\" asked you to email the full class list, with home addresses, tonight, for an urgent safety review.",
                key: "scam",
                signs: ["authority", "urgency", "current-events"],
                check: "End the call. Contact the district office the usual way. Students' details go only through your data protection lead.",
                note: "Fake video calls can look real. A rushed request for children's data is a warning sign whoever seems to ask."
              },
              {
                kind: "text",
                from: "Your school office's number, saved in your phone",
                text: "Reminder: parent evening is Thursday at 6 p.m. in the main hall. No reply needed.",
                key: "genuine",
                signs: [],
                check: "Nothing to check. It came from a number you already have, and asks for nothing.",
                note: "Ordinary news from a known number, with no link, no money and no rush."
              }
            ]
          }
        },
        professionals: {
          context: "Five made-up messages at work.",
          inbox: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "e1-key-professionals",
            items: [
              {
                kind: "email",
                from: "People Team <hr@your company's usual address>",
                subject: "Benefits enrollment closes 31 October",
                text: "Benefits enrollment closes on 31 October. Sign in to the HR portal as usual to make changes. Questions? Ask your HR contact.",
                key: "genuine",
                signs: [],
                check: "Go to the HR portal the way you always do, not through a link.",
                note: "An ordinary deadline, from the usual address, sending you to the usual place."
              },
              {
                kind: "email",
                from: "Accounts, Northfield Supply <accounts@northfie1d-supply.example>",
                subject: "URGENT: overdue invoice, new bank details",
                text: "Our bank has changed. Please update our details before you pay this month's invoice, which is now overdue. Late payments may pause your orders.",
                key: "scam",
                signs: ["urgency", "emotion", "new-details"],
                check: "Call the supplier on the number in your own records. Look closely: the address has a 1 where the l should be.",
                note: "A look-alike address and new bank details. AI writes a perfect copy of a supplier's style."
              },
              {
                kind: "video",
                from: "A video call from your finance director, with two colleagues on screen",
                text: "They need an urgent transfer today for a confidential deal. They ask you not to tell anyone until it's announced.",
                key: "scam",
                signs: ["authority", "urgency", "secrecy", "new-details"],
                check: "Leave the call. Phone the finance director on a number you already have, and follow your payment approval process.",
                note: "Criminals use AI to fake video of company leaders. Secrecy plus a rushed payment is the pattern."
              },
              {
                kind: "call",
                from: "A caller from \"your bank's fraud team\"",
                text: "A calm voice answers every question at once. \"We've stopped a suspicious payment from your business account. Please read me the code we just texted you. Then we'll move your balance to a safe account until it's fixed.\" You ask if it's a real person. \"Yes, I'm Daniel, in the fraud team.\"",
                key: "scam",
                signs: ["authority", "urgency", "emotion", "new-details"],
                check: "Hang up. Call your bank on the number on your card or statement. In the UK, call 159. Never read out a code.",
                note: "This may be an AI voice bot, and it can claim to be human. A real fraud team never asks for your code, or tells you to move money to keep it safe."
              },
              {
                kind: "voice",
                from: "Your manager's usual number",
                text: "Hi, it's Sam. The team meeting has moved to 3 p.m. No need to call back.",
                key: "genuine",
                signs: [],
                check: "Nothing to check. It's from a known number, and asks for nothing.",
                note: "Ordinary news, with no money, no link and no secret."
              }
            ]
          }
        },
        students: {
          context: "Five made-up messages on a phone.",
          inbox: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "e1-key-students",
            items: [
              {
                kind: "text",
                from: "Your friend's account, in a game chat",
                text: "omg I'm locked out and need 20 dollars in gift cards NOW or I lose my account. pls don't tell anyone, just send the codes",
                key: "scam",
                signs: ["urgency", "emotion", "secrecy", "new-details"],
                check: "Ask your friend in person, or another way you trust. Tell a trusted adult.",
                note: "Friends' accounts get taken over. A rush, a secret and gift cards are the signs."
              },
              {
                kind: "text",
                from: "Your school's app",
                text: "Reminder: science fair forms are due Friday. Hand yours to your teacher.",
                key: "genuine",
                signs: [],
                check: "Nothing to check. If you're not sure, ask your teacher.",
                note: "It comes in the school's own app, and asks for nothing."
              },
              {
                kind: "call",
                from: "A caller from \"support\" for a game you play",
                text: "Hi! I'm Max, from game support. Someone just tried to hack your account. I can lock it for you right now. I've sent a code to your phone. Read it to me, quick, before they get in!",
                key: "scam",
                signs: ["authority", "urgency", "emotion"],
                check: "Hang up. Open the game yourself and check your account there. Never read out a code. Tell a trusted adult.",
                note: "The voice may be a computer, not a person. Real support never asks for a code. A code can let someone into your account. It's not your fault if you're fooled."
              },
              {
                kind: "voice",
                from: "A new number, in your mom's voice",
                text: "Hi sweetie, I lost my phone, this is my new number. Send me the code that just came to your phone. Quick, I'm in a hurry.",
                key: "scam",
                signs: ["urgency", "emotion", "new-details"],
                check: "Call your mom on her usual number, or ask for your family's secret word. Tell a trusted adult.",
                note: "AI can copy a voice. A code sent to your phone can let someone into your account. It's not your fault if you're fooled."
              },
              {
                kind: "text",
                from: "Your coach's number, saved in your phone",
                text: "Practice is canceled today because of the rain. See you Thursday.",
                key: "genuine",
                signs: [],
                check: "Nothing to check. It's from a number you already have.",
                note: "Ordinary news from someone you know, asking for nothing."
              }
            ]
          }
        }
      }
    },
    {
      kind: "pictorial",
      title: "What's safe to share?",
      minutes: 10,
      targets: ["E1.3"],
      figure: "share",
      claim: "e1-key-share",
      // Learner-visible instructions: say what the sort is for, and what counts as a public tool. Same in every track.
      intro: [
        "A public AI tool is one anyone can sign up for. Some schools and workplaces approve tools with stronger rules. Use only the tools you're allowed to use.",
        "Sort each item: fine to share with a public AI tool, or keep it out. Ask two questions: is it private, and is it mine to share? Then show the answers.",
        "Nothing you choose is saved or sent."
      ],
      items: [
        { id: "recipe", text: "A question about how long to cook rice.", key: "fine", why: "Nothing personal or private is in it." },
        { id: "password", text: "Your password, to ask if it's strong.", key: "keep", why: "Never share a password, with a person or a tool. A password manager can judge its strength for you." },
        { id: "friend", text: "A friend's message, pasted in so the tool can help you reply.", key: "keep", why: "It's your friend's words, not yours to share. Describe the situation in your own words instead." },
        { id: "topic", text: "A question about a topic you're learning, with no names in it.", key: "fine", why: "A general question with no personal details is fine." },
        { id: "health", text: "A note about a classmate's or colleague's health.", key: "keep", why: "Health details are some of the most private information there is, and they're someone else's." },
        { id: "address", text: "A letter with a customer's or neighbor's home address in it.", key: "keep", why: "That's someone else's personal information. Take out names and addresses, or keep it out." },
        { id: "face", text: "A clear photo of your face.", key: "keep", why: "Photos of faces can be copied, and used to make fake images or videos of you." },
        { id: "location", text: "A photo taken at home, with location turned on.", key: "keep", why: "A photo can carry hidden details, such as where it was taken. Turn location off for your camera and apps." },
        { id: "library", text: "Your local library's opening hours, to plan a visit.", key: "fine", why: "This is already public information." }
      ],
      moves: [
        "Learners sort all nine items before anyone shows the answers.",
        "Show the answers. Ask: which one surprised you, and why?",
        "Ask: how could you get help with the friend's message without pasting it in?",
        "Press Start again if the group wants a second try."
      ],
      say: [
        ["Facilitator", "Two questions before you paste: is it private, and is it mine to share?"],
        ["Expected", "\"I'll delete the chat after.\" Say: the company may already have a copy. Keep it out to begin with."],
        ["Facilitator", "Nothing you choose here is saved or sent."]
      ],
      watch:
        "Learners sort by how embarrassing something is. Bring them back to the two questions: is it private, and whose is it?"
    },
    {
      kind: "abstract",
      title: "Habits that hold up",
      minutes: 8,
      targets: ["E1.1", "E1.2", "E1.3", "E1.4"],
      principles: ["ai-fraud-fbi", "ai-voice-calls", "scam-signs-ncsc", "ai-tools-confidential", "fbi-teens-online", "passwords-nist", "passkeys-phishing-resistant", "report-scams", "uk-159"],
      tables: [
        {
          title: "Five signs of a scam (the UK's National Cyber Security Centre)",
          head: ["Sign", "What it sounds like"],
          rows: [
            ["Authority", "It claims to be from someone important, like your boss, your bank or the government."],
            ["Urgency", "Act now, or you'll pay a fine or lose something."],
            ["Emotion", "It makes you scared, worried or excited."],
            ["Scarcity", "Only a few left, or the offer ends today."],
            ["Current events", "It's about the news, a big event, or a time of year like tax season."]
          ]
        },
        {
          title: "What AI changes, and what to do",
          head: ["What AI makes easier", "What to do"],
          rows: [
            ["A perfect message, with no spelling mistakes.", "Don't judge by spelling. Look for the five signs."],
            ["A copy of someone's voice.", "Hang up, and call back on a number you already have. Or ask for your family's secret word."],
            ["A caller that sounds human but is a computer.", "Judge what it asks for, not how it sounds. Hang up and call the number on your card, statement or booking."],
            ["A fake photo or video call.", "Look for odd details, like hands or shadows. Ask something only the real person would know."],
            ["Your face on a fake image, to threaten you.", "It's not your fault. Don't pay. Save the messages, block, and tell someone you trust."],
            ["Many fake profiles at once.", "Don't accept friend requests from people you don't know. Ask a friend or a trusted adult first."]
          ]
        },
        {
          title: "Protect your accounts and your information",
          head: ["Step", "Why it helps"],
          rows: [
            ["Use a passkey where a site offers one.", "It only works on the real site, so a fake page can't steal it."],
            ["Otherwise, use a long password, different for each account.", "Length matters more than symbols. Aim for 15 characters or more."],
            ["Keep passwords in a password manager.", "It remembers them all, so each one can be long and different."],
            ["Turn on two-step sign-in.", "A stolen password alone isn't enough to get in."],
            ["Change a password only if it may have leaked.", "Changing it often doesn't help, and leads to weaker passwords."],
            ["Set accounts to private, and turn off location.", "Strangers can use your school, age or location to win your trust or find you."]
          ]
        },
        {
          title: "Where to report",
          head: ["Who", "How"],
          rows: [
            ["A trusted adult (students)", "Tell them first, about anything that worries you."],
            ["Your school or workplace", "Tell IT or your manager, especially about a fake request from a colleague."],
            ["The UK", "Forward scam emails to report@phishing.gov.uk, and scam texts to 7726."],
            ["Your bank, in the UK", "Hang up, then call 159. It reaches most banks, and scammers can't fake it."],
            ["The US", "Report scams to the FBI at ic3.gov, or to the FTC at ReportFraud.ftc.gov."]
          ]
        }
      ],
      moves: [
        "Read the five signs. Ask: which messages today used which signs?",
        "Read what AI changes. Learners pick one habit to start.",
        "Read the account steps. Ask who has two-step sign-in turned on. Hands only.",
        "Read where to report. Say who to tell at your school or workplace."
      ],
      say: [
        ["Facilitator", "Most of these attacks fail if you slow down and check another way."],
        ["Expected", "\"Isn't a password with symbols strong?\" Length matters more. A passkey is better still."],
        ["Facilitator", "If you clicked or paid, tell someone right away. It's not your fault, and acting fast helps."]
      ],
      watch:
        "Learners feel it's hopeless because AI is so good. Bring them back to the habits: they work however good the fake is."
    }
  ],

  check: {
    minutes: 10,
    items: [
      {
        id: "p1",
        targets: ["E1.1"],
        prompt: "Name two ways AI makes scams harder to spot.",
        crit:
          "Names two: messages with no mistakes, cloned voices, fake photos or videos, or many fake profiles at once. Reteach if they still check for spelling mistakes first."
      },
      {
        id: "p2",
        targets: ["E1.2"],
        prompt:
          "A message from a friend's account asks you to send money today, and to keep it quiet. What worries you, and how do you check?",
        crit:
          "Names the signs: a rush, a secret, and money. Checks another way they trust, like calling the friend on a number they already have. Reteach if they reply to the message itself to check."
      },
      {
        id: "p3",
        targets: ["E1.3"],
        prompt:
          "Which of these should stay out of a public AI tool? (a) a recipe question, (b) a colleague's medical note, (c) a password, (d) a draft with a customer's home address.",
        crit:
          "Says (b), (c) and (d): private, work and other people's details stay out. Uses only tools they're allowed to use. Reteach if they think deleting the chat later makes it safe."
      },
      {
        id: "p4",
        targets: ["E1.4"],
        prompt: "Give your three best steps to protect an account.",
        crit:
          "Names a passkey, or a long, different password for each account kept in a password manager. Adds two-step sign-in. Says length beats symbols. Reteach if they rely on short, complex passwords changed often."
      }
    ],
    exit: {
      rating: "How useful was today for keeping your accounts and messages safe? (1 = not at all, 5 = very)",
      open: "Which one habit will you start this week?"
    }
  },

  transfer: {
    educators:
      "Turn on two-step sign-in or a passkey for your school email this week. Agree a secret word with your family for urgent calls. Remind colleagues to check any change of bank details by phone.",
    professionals:
      "Turn on two-step sign-in or a passkey for your work email this week. Agree a secret word with your family. Agree with your team to check new bank details by calling a number you already have.",
    students:
      "With a parent or carer, turn on two-step sign-in or a passkey for one account, and agree a family secret word. Set your accounts to private. Only use the AI tools your school allows."
  },
  followUp: "Follow up in two weeks: which protection did you turn on, and did anything get in the way?",

  access: [
    {
      channel: "vision",
      note: "The messages are plain text, and each says in words what kind of message it is. The sorter reads its status aloud, and its grid is also a table."
    },
    {
      channel: "hearing",
      note: "The phone calls, voice messages and video call are written out as transcripts and notes, so no audio is needed."
    },
    {
      channel: "attention",
      note: "Take the inbox one message at a time. Pairs can split the five messages, then compare."
    },
    {
      channel: "motor",
      note: "The sorter uses radio buttons that work with the keyboard. Start again clears it in one step."
    }
  ]
};
