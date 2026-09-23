/**
 * Lesson 2 — Asking well: prompt structure.
 *
 * The concrete stage is a "prompt pair" rather than Lesson 1's passage:
 *   vague.prompt       the request as a learner might first write it
 *   vague.gaps         the answer key: each of the four parts is stated, vague or missing
 *   vague.output       what came back; a line the model made up carries an `invented` note
 *   structured.parts   the same request in four parts
 *   structured.output  what came back; each line names the parts that caused it
 *                      (`causedBy`), or is marked `invented`
 *   structured.effects one sentence per part, read out when the part is pressed
 *
 * These pairs are "planted": written by a model for this lesson, with the
 * gaps and guesses placed on purpose. Replace them with captured outputs when
 * you have good ones — set provenance to "captured" with the model and date.
 */

export default {
  n: 2,
  slug: "prompt-structure",
  title: "Asking well: prompt structure",
  ready: true,
  objectivesApproved: "2026-09-23",
  framing:
    "A vague request gets a generic answer. Saying what you need, for whom, within what limits, and in what shape changes what comes back — in ways you can predict.",
  objectives: [
    {
      id: "2.1",
      bloom: "apply",
      text: "Rewrite a vague request so it states the task, the context, the constraints and the format wanted."
    },
    {
      id: "2.2",
      bloom: "analyze",
      text: "Compare two outputs and attribute each difference to a specific change in the prompt."
    },
    {
      id: "2.3",
      bloom: "create",
      text: "Construct a prompt that includes an example of the output wanted."
    }
  ],

  arcs: {
    attention:
      "Put the vague request and its answer on screen. Ask: \"Would you send this?\" Then ask what the request left out.",
    relevance: {
      educators:
        "Parent emails, rubrics and lesson plans all start with a request. A vague one gets a generic draft you rewrite yourself, or a made-up detail you don't catch.",
      professionals:
        "Much of the time spent fixing an AI draft goes on things the request never said. A clear request gets a first draft that is closer to what you need.",
      students:
        "How you ask decides what you get back. Ask for help and you may get an essay that isn't yours. Ask for feedback and you get ideas to use in your own words."
    },
    confidence:
      "Nothing technical here. Four plain questions work for any request: what's the job, who's it for, what are the limits, and what shape should it take?",
    satisfaction:
      "Learners leave with a request they wrote themselves, in four parts, with an example. They can use it the same day."
  },

  warmup: {
    minutes: 5,
    items: [
      {
        id: "w1",
        targets: ["2.1"],
        prompt: "A colleague asks you to \"write something about the meeting.\" What would you need to know to do it well?",
        expected:
          "Most people name one or two things, like the topic or the length. Note which of the four parts nobody names: the job, who it's for, the limits, or the shape."
      },
      {
        id: "w2",
        targets: ["2.2"],
        prompt: "Two people ask a chatbot for the same thing and get very different answers. Why?",
        expected:
          "Expect \"the AI is random\" or \"they're better at AI.\" Some of it is chance. But big, steady differences in shape and content come from what each person asked. Don't correct it yet."
      },
      {
        id: "w3",
        targets: ["2.3"],
        prompt: "How would you get a chatbot to write just like a note you already have?",
        expected:
          "Most will describe the style in words. Few think to paste in the note itself. Note who does."
      }
    ]
  },

  stages: [
    {
      kind: "concrete",
      exercise: "prompt-pair",
      title: "Find what the request left out",
      minutes: 14,
      targets: ["2.1"],
      moves: [
        "Show the vague request and what came back. Ask whether they would send it.",
        "Learners mark each of the four parts in the request: stated, vague or missing.",
        "Reveal the key one part at a time. For each, ask where the answer filled that gap with a guess.",
        "Learners rewrite the request with all four parts. Keep these. They come back in the next two stages."
      ],
      say: [
        ["Facilitator", "The model didn't do a bad job. It did the job it was given. What job was that?"],
        ["Expected", "\"It made that up.\" Ask: where would it have got the real answer?"],
        ["Facilitator", "Each gap in a request is a choice the model makes for you. Which of these choices would you have made differently?"]
      ],
      watch:
        "Learners blame the model and stop there. Point them back to the request. Ask which part, if it had been stated, would have stopped each guess.",
      tracks: {
        educators: {
          context: "A teacher asks an AI to draft a note to parents about a class trip.",
          pair: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l2-key-educators",
            vague: {
              prompt: "Write something about the field trip for parents.",
              gaps: {
                task: { key: "vague", note: "\"Something\" could be an email, a flyer or a letter. The model had to pick." },
                context: { key: "vague", note: "It names the trip and the readers. It doesn't say which class, where, or when." },
                constraints: { key: "missing", note: "Nothing about length, tone, or what must be in it." },
                format: { key: "missing", note: "Nothing about the shape, so it came back as paragraphs." }
              },
              output: [
                { text: "Dear parents and guardians, we are excited to share news about our upcoming field trip!" },
                {
                  text: "Students will board the bus at 9 a.m. sharp, so please make sure your child arrives on time.",
                  invented: "The request gave no time. The model made one up, and it sounds official."
                },
                { text: "This hands-on experience will bring our classroom learning to life in memorable ways." },
                { text: "Please don't hesitate to reach out with any questions." }
              ]
            },
            structured: {
              parts: {
                task: "Write a reminder email to parents.",
                context: "My Grade 3 class is going to the zoo this Friday.",
                constraints: "Under 120 words. No jargon. Mention packed lunches and that permission slips are due Wednesday.",
                format: "A subject line, then 3 short bullets, then a sign-off."
              },
              output: [
                { text: "Subject: Zoo trip reminder for Friday", causedBy: ["format", "context"] },
                { text: "Hi families, here is a quick reminder about our trip.", causedBy: ["task"] },
                { text: "Our Grade 3 class visits the zoo this Friday.", causedBy: ["context"] },
                { text: "• Please pack a lunch for your child.", causedBy: ["constraints", "format"] },
                { text: "• Permission slips are due this Wednesday.", causedBy: ["constraints", "format"] },
                {
                  text: "• Please write your child's name on the lunch bag.",
                  invented: "Sensible, but nobody asked for it. Even a good request leaves room for extras, so read them before you send."
                },
                { text: "Thank you!", causedBy: ["format"] }
              ],
              effects: {
                task: "Task made it a reminder email, not a general piece of writing.",
                context: "Context put in the class, the place and the day. The vague version had to guess at these.",
                constraints: "Constraints kept it short and made sure lunches and the Wednesday deadline were in.",
                format: "Format added the subject line, the bullets and the sign-off."
              }
            }
          }
        },
        professionals: {
          context: "An employee asks an AI to draft a project update for a senior manager.",
          pair: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l2-key-professionals",
            vague: {
              prompt: "Write an update on the project for my manager.",
              gaps: {
                task: { key: "stated", note: "An update is a clear kind of writing. The problem is everything around it." },
                context: { key: "vague", note: "\"The project\" and \"my manager\" mean something to you. The model knows neither." },
                constraints: { key: "missing", note: "Nothing about length, what to lead with, or tone." },
                format: { key: "missing", note: "Nothing about the shape, so it came back as a chatty note." }
              },
              output: [
                { text: "Hi, I wanted to share a quick update on the project." },
                {
                  text: "The project is on track, and the team is making strong progress across all workstreams.",
                  invented: "The request never said how the project is going. The model guessed \"on track\", which is the opposite of the truth here."
                },
                {
                  text: "We expect to hit our key milestones as planned.",
                  invented: "Another guess, stated as fact. Sent as it is, it would mislead your manager."
                },
                { text: "Let me know if you'd like more detail." }
              ]
            },
            structured: {
              parts: {
                task: "Write a status update email.",
                context: "The reader is our VP, who cares about budget and dates. The CRM migration is two weeks behind because the customer data needed clean-up.",
                constraints: "100 words or fewer. Lead with the risk. Don't blame anyone.",
                format: "Three labelled lines: Risk, Status, Ask."
              },
              output: [
                { text: "Subject: CRM migration status update", causedBy: ["task", "context"] },
                { text: "Risk: The CRM migration will go live two weeks late.", causedBy: ["constraints", "format", "context"] },
                { text: "Status: The customer data needed more clean-up than we planned for.", causedBy: ["context", "constraints", "format"] },
                { text: "Ask: Please approve the new go-live date.", causedBy: ["format"] },
                {
                  text: "I can walk you through the details at Friday's check-in.",
                  invented: "The request never mentioned a Friday check-in. Read additions like this before you send."
                }
              ],
              effects: {
                task: "Task made it a status update email with a clear subject.",
                context: "Context put in the real project, the delay and its cause. The vague version guessed \"on track\".",
                constraints: "Constraints put the risk first and kept blame out: \"than we planned for\", not a name.",
                format: "Format gave it three labelled lines and the Ask at the end."
              }
            }
          }
        },
        students: {
          context: "A Grade 10 student asks an AI for help with an argumentative essay.",
          pair: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l2-key-students",
            vague: {
              prompt: "Help me with my essay on climate change.",
              gaps: {
                task: { key: "missing", note: "\"Help\" could mean ideas, feedback or writing it. The model chose writing it." },
                context: { key: "vague", note: "It gives the topic, but not the grade, the kind of essay, or your own thesis." },
                constraints: { key: "missing", note: "Nothing about keeping your voice or not writing it for you." },
                format: { key: "missing", note: "Nothing about the shape, so it came back as an essay paragraph." }
              },
              output: [
                {
                  text: "Climate change is one of the most urgent problems facing our world today.",
                  invented: "You never gave a position. The model picked one and started your essay for you."
                },
                { text: "Rising temperatures and extreme weather affect millions of people every year." },
                { text: "Governments, businesses and ordinary people all have a part to play." },
                {
                  text: "In this essay, I will argue that stronger action is needed now.",
                  invented: "This is written in your voice, as if it were your work. You asked for help and got someone else's essay."
                }
              ]
            },
            structured: {
              parts: {
                task: "Give me feedback on my thesis statement. Don't rewrite it.",
                context: "I'm in Grade 10, writing an argumentative essay. My thesis: \"Schools should cut their energy use because it saves money and teaches responsibility.\"",
                constraints: "At most 3 suggestions. Keep my voice. Don't write sentences for me.",
                format: "A numbered list, with one question for me on each point."
              },
              output: [
                { text: "Here is feedback on your thesis. I haven't rewritten it.", causedBy: ["task"] },
                { text: "1. Saving money is easy to show with numbers. Which figures could you find for your own school?", causedBy: ["context", "format"] },
                { text: "2. \"Teaches responsibility\" is harder to prove. What would count as evidence?", causedBy: ["context", "format"] },
                { text: "3. An argumentative essay needs to answer the other side. What would someone who disagrees say?", causedBy: ["context", "format"] },
                { text: "I've kept to three points, and the sentences are yours to write.", causedBy: ["constraints"] }
              ],
              effects: {
                task: "Task turned it from writing your essay into feedback on your thesis.",
                context: "Context gave it your actual thesis to respond to, and told it the essay has to argue a case.",
                constraints: "Constraints kept it to three points and left the writing to you.",
                format: "Format made it a numbered list with a question on each point."
              }
            }
          }
        }
      }
    },
    {
      kind: "pictorial",
      title: "Trace each change to its cause",
      minutes: 8,
      targets: ["2.2"],
      figure: "prompt-compare",
      moves: [
        "Show the full request, split into its four parts, beside both answers.",
        "Before pressing anything, learners say which part caused each line of the second answer.",
        "Press one part at a time. Check their guesses against the lines it marks.",
        "Point out any line marked Invented. Ask which part of the request could have stopped it."
      ],
      say: [
        ["Facilitator", "Each line of the new answer has a cause. Which part of the request put it there?"],
        ["Expected", "\"It's just better.\" Ask: better how? Point at one line. Which part asked for that?"],
        ["Facilitator", "Did the better version add anything nobody asked for? If it did, that still needs checking."]
      ],
      watch:
        "Learners give all the credit to one part, often format, because it is the easiest to see. Press the others too. Context often does the most work."
    },
    {
      kind: "abstract",
      title: "What makes a request work",
      minutes: 8,
      targets: ["2.3"],
      principles: ["prompt-parts", "gaps-get-filled", "example-steers-form", "structure-not-truth"],
      moves: [
        "Read each principle aloud. After each, ask for the moment in today's example that shows it.",
        "Learners add a short example of the answer they want to the request they rewrote.",
        "Pairs swap requests and check: does the example show the shape, without asking the model to copy its content?"
      ],
      say: [
        ["Facilitator", "Describing a style is hard. Showing one is easy. If you have a note that sounds right, paste it in and say: write it like this."],
        ["Expected", "\"Won't it just copy my example?\""],
        ["Facilitator", "It might. So say what to keep, like the length, the tone or the layout. Then say what's new, like the topic and the facts."]
      ],
      watch:
        "Learners think a well-built request makes the answer true. It makes it fit better, not more reliable. The Lesson 1 check still applies to every fact the model adds."
    }
  ],

  check: {
    minutes: 10,
    items: [
      {
        id: "p1",
        targets: ["2.1"],
        prompt: "Rewrite this request so it states the task, the context, the limits and the format: \"Make a flyer for the event.\"",
        crit:
          "All four parts are there, and each one is specific. Reteach if context or limits are missing, which are the usual gaps, or if a part is vague, like \"make it good.\""
      },
      {
        id: "p2",
        targets: ["2.2"],
        prompt:
          "Two requests are the same, except the second adds \"for a 10-year-old.\" The first gets: \"Plants turn light into chemical energy.\" The second gets: \"Plants use sunlight to make their own food.\" What changed, and which line caused it?",
        crit:
          "Names the added line as the cause of the simpler words. Reteach if they put a change that plainly follows from that line down to chance, or to the model \"trying harder.\""
      },
      {
        id: "p3",
        targets: ["2.3"],
        prompt: "Write a request, with an example of what you want back, for a task you'll really do this week.",
        crit:
          "The request has a real example in it. Reteach if there's no example, or if it asks the model to copy the example's content when it only wanted its shape."
      }
    ],
    exit: {
      rating: "How relevant was today to what you actually use AI for? (1 = not at all, 5 = directly)",
      open: "What's one request you'll now write differently?"
    }
  },

  transfer: {
    educators:
      "Write the request for your next class message using the four parts, with an example of a message you liked. Save it as a template.",
    professionals:
      "Pick one request you make every week. Rewrite it in four parts with an example, and save it where you'll reuse it.",
    students:
      "Next time you use AI for schoolwork, ask for feedback, not writing. Use the four parts, and keep the words yours."
  },

  access: [
    {
      channel: "vision",
      note: "The four parts are named in words, not only by colour. The comparison tool is plain text with buttons, so screen readers read every line. Each button says which part it shows, and the result is read out."
    },
    {
      channel: "language",
      note: "Pre-teach \"context\", \"constraint\" and \"format\" with one example each. Put the four questions on the board in plain words: job, who, limits, shape."
    },
    {
      channel: "attention",
      note: "Work on one part at a time. In the tool, press one button, talk about it, then move on to the next."
    }
  ]
};
