/**
 * Lesson 9 — What the Dark Triad is, and isn't.
 *
 * Part of the Dark Triad series (Lessons 9-12): recognizing behavior, not
 * labeling people. Plan, sources and David's decisions in
 * docs/dark-triad-series.md.
 *
 * The concrete stage reuses Lesson 1's passage exercise: a made-up popular
 * article about the Dark Triad per track, with errors planted on purpose. The
 * pictorial "overlap" figure uses made-up scores for two groups, shared by
 * every track, to show that a finding about groups can't sort one person. Self-contained, so the series
 * can move to its own module later.
 * S1. 9.4 added at David's request on 2026-09-25; David confirmed the wording the same day.
 */

export default {
  n: 9,
  slug: "dark-triad-what-it-is",
  title: "What the Dark Triad is, and isn't",
  ready: true,
  objectivesApproved: "2026-09-25",
  framing:
    "Some people use others to get what they want. Researchers study this as three traits called the Dark Triad. This lesson says what the science shows, where the traits come from, and what it doesn't let you conclude about one person.",
  objectives: [
    {
      id: "9.1",
      bloom: "understand",
      text: "Describe the three Dark Triad traits as research measures on a scale, not diagnoses."
    },
    {
      id: "9.2",
      bloom: "understand",
      text: "Explain how people high in these traits tend to get others to do what they want, using the research."
    },
    {
      id: "9.3",
      bloom: "analyze",
      text: "Tell a research finding about a group apart from a judgement about one person."
    },
    {
      id: "9.4",
      bloom: "understand",
      text: "Explain what research says about where these traits come from, such as genes, upbringing and life events, and how they link to addiction."
    }
  ],

  arcs: {
    attention:
      "Ask: \"Have you ever called someone a narcissist?\" No names. Then ask: \"What did they actually do?\"",
    relevance: {
      educators:
        "Staff rooms and parent chats use these words a lot. You need to know what the research says before a label sticks to a colleague, a parent or a student.",
      professionals:
        "Articles about dark personalities at work are everywhere. Knowing what the research shows helps you deal with hard people without labeling them.",
      students:
        "Posts online tell you how to spot a narcissist. This lesson shows what the research really says, so you can protect yourself without labeling anyone."
    },
    confidence:
      "You don't need a psychology degree. Three words, one scale, and one rule: judge what people do, not a label.",
    satisfaction:
      "Learners leave able to say what the Dark Triad is and isn't, and to read an article about it with a careful eye."
  },

  warmup: {
    minutes: 5,
    items: [
      {
        id: "w1",
        targets: ["9.1"],
        prompt: "Is a person either a narcissist or not? Say why you think so.",
        expected:
          "Most say yes: you are one or you aren't. Note who says it's a matter of how much, like height."
      },
      {
        id: "w2",
        targets: ["9.2"],
        prompt: "How could you tell if someone was trying to use you? What would they do?",
        expected:
          "Most describe threats, or someone who seems creepy. Note who mentions charm, compliments or favours."
      },
      {
        id: "w3",
        targets: ["9.3"],
        prompt:
          "A study finds that people who score high on a trait tell more lies. Someone you know scores high. Are they lying to you?",
        expected:
          "Many say \"probably.\" Note who says a finding about a group can't tell you about one person."
      },
      {
        id: "w4",
        targets: ["9.4"],
        prompt: "Are people who use others born that way, or made that way?",
        expected:
          "Most pick one side. Note who says both, and who asks what else plays a part."
      }
    ]
  },

  stages: [
    {
      kind: "concrete",
      title: "Read the article",
      minutes: 12,
      targets: ["9.1", "9.3"],
      moves: [
        "Hand out the article for the group's track. Say it was made up for this lesson, with errors planted on purpose.",
        "Learners mark every sentence with one word: Correct, Wrong, No source, or Nothing to check.",
        "Reveal the key one sentence at a time. For each, ask what gave it away.",
        "Ask: what does this article want you to do with its ideas?"
      ],
      say: [
        ["Facilitator", "Articles like this are popular because they feel useful. Your job is to see what the research really says."],
        ["Expected", "\"But I know someone exactly like this.\" Say: maybe. The research still can't tell you that. What they do can."],
        ["Facilitator", "Which sentence would you share? Which would you want checked first?"]
      ],
      watch:
        "Learners accept a sentence because it matches someone they know. Bring them back to the question: what is the source, and does it say this?",
      tracks: {
        educators: {
          context: "A made-up staff newsletter article, \"Toxic personalities in schools\".",
          passage: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l9-key-educators",
            sentences: [
              {
                text: "We have all worked with someone like this.",
                tone: "confident",
                key: "nothing",
                source: null,
                note: "It can't be wrong, so it can't be checked. It invites you to picture a colleague, which is how labels start."
              },
              {
                text: "The Dark Triad is a diagnosis that doctors and psychologists give to patients.",
                tone: "confident",
                key: "wrong",
                source: "Paulhus, D. L. & Williams, K. M. (2002). The Dark Triad of personality. Journal of Research in Personality, 36, 556-563: three subclinical traits, measured in ordinary people.",
                note: "It's a research idea about traits in ordinary people. Doctors diagnose personality disorders, which are a different thing."
              },
              {
                text: "Researchers measure these traits with questionnaires, as scales that everyone sits somewhere on.",
                tone: "confident",
                key: "correct",
                source: "Jones, D. N. & Paulhus, D. L. (2014). Introducing the Short Dark Triad (SD3). Assessment, 21(1), 28-41: a 27-item questionnaire with a score on each trait.",
                note: "Checkable, and the source agrees. We all score somewhere on each scale."
              },
              {
                text: "A 2022 survey found that one in four teachers has worked under a psychopathic head teacher.",
                tone: "confident",
                key: "no-source",
                source: null,
                note: "A precise number, with no publisher and no link. Planted for this lesson: there is no survey to find."
              }
            ]
          }
        },
        professionals: {
          context: "A made-up business magazine article, \"Dark personalities at work\".",
          passage: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l9-key-professionals",
            sentences: [
              {
                text: "People high in psychopathy and Machiavellianism are more likely to use threats to get their way at work.",
                tone: "confident",
                key: "correct",
                source: "Jonason, P. K., Slomski, S. & Partyka, J. (2012). The Dark Triad at work: How toxic employees get their way. Personality and Individual Differences, 52, 449-453.",
                note: "Checkable, and the source agrees. It's a finding about groups on average, not about any one colleague."
              },
              {
                text: "A 2023 industry report found that 40% of managers show at least one Dark Triad trait.",
                tone: "confident",
                key: "no-source",
                source: null,
                note: "A precise number with no publisher and no link. Planted for this lesson: there is no report to find."
              },
              {
                text: "Trust us: once you know the signs, you'll spot one in every meeting.",
                tone: "confident",
                key: "nothing",
                source: null,
                note: "Nothing here can be checked. It also pushes you to label people, which the research doesn't do."
              },
              {
                text: "Scientists have shown that these traits are purely genetic.",
                tone: "confident",
                key: "wrong",
                source: "Vernon, P. A. et al. (2008). A behavioral genetic investigation of the Dark Triad and the Big 5. Personality and Individual Differences, 44, 445-452: genes and environment both play a part.",
                note: "A twin study found genes and life both matter. Machiavellianism depends most on life."
              }
            ]
          }
        },
        students: {
          context: "A made-up social media post, \"Signs someone is a narcissist\".",
          passage: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l9-key-students",
            sentences: [
              {
                text: "Studies show one in three teens has a narcissist friend.",
                tone: "confident",
                key: "no-source",
                source: null,
                note: "Which studies? There's no name and no link. Planted for this lesson: there is no study to find."
              },
              {
                text: "Narcissism is one of three traits researchers call the Dark Triad.",
                tone: "confident",
                key: "correct",
                source: "Paulhus, D. L. & Williams, K. M. (2002). The Dark Triad of personality: Narcissism, Machiavellianism, and psychopathy. Journal of Research in Personality, 36, 556-563.",
                note: "Checkable, and the source agrees."
              },
              {
                text: "Being a narcissist is a mental illness that doctors can diagnose from your posts.",
                tone: "confident",
                key: "wrong",
                source: "Paulhus & Williams (2002): the Dark Triad traits are subclinical, measured in ordinary people. A personality disorder is diagnosed by a trained clinician, not from posts.",
                note: "The research measures a trait we all have some of. Only a trained expert diagnoses a disorder, and never from posts."
              },
              {
                text: "Everyone has someone like this in their life.",
                tone: "confident",
                key: "nothing",
                source: null,
                note: "It can't be checked. The post wants you to picture someone you know. That's a label, not a fact."
              }
            ]
          }
        }
      }
    },
    {
      kind: "pictorial",
      title: "Groups overlap",
      minutes: 10,
      targets: ["9.1", "9.3"],
      figure: "overlap",
      overlap: {
        scale: "Machiavellianism scale from 1 to 5",
        steps: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
        groups: [
          { label: "Group A, people who say they rarely lie", short: "Say they rarely lie", counts: [1, 2, 3, 4, 4, 3, 2, 1, 0] },
          { label: "Group B, people who say they often lie", short: "Say they often lie", counts: [0, 1, 2, 3, 4, 4, 3, 2, 1] }
        ],
        picks: [3, 2.5, 3.5, 4.5, 1],
        note: "These scores are made up to show the idea. The averages differ a little, but most people in the two groups have the same scores."
      },
      moves: [
        "Show the two rows of dots. Each dot is one person. Say the scores are made up to show the idea.",
        "Point to the two averages. Ask: which group scores higher on average?",
        "Press \"Pick a person\". Learners say which group they think the person is in, then read the answer.",
        "Pick three or four people. Ask: what would you need to know about this person, instead of their group?"
      ],
      say: [
        ["Facilitator", "The study is true about the groups. It still can't tell you about one person."],
        ["Expected", "\"But higher scores mean more lying.\" Say: on average, in a group. This person might never lie."],
        ["Facilitator", "So what tells you about one person? What they actually do, over time."]
      ],
      watch:
        "Learners hear \"on average\" and still apply it to one person. Pick a score where both groups have people, and ask them to prove which group it is."
    },
    {
      kind: "abstract",
      title: "What the research shows",
      minutes: 8,
      targets: ["9.1", "9.2", "9.4"],
      principles: ["dark-triad-construct", "dark-triad-measure", "dark-triad-tactics", "trait-not-diagnosis", "dark-triad-origins", "dark-triad-addiction", "group-not-individual"],
      tables: [
        {
          title: "The three traits, in plain words",
          head: ["Trait", "What it looks like", "Ways of getting what they want"],
          rows: [
            ["Narcissism", "Feels special, and wants to be admired.", "Soft: charm and compliments."],
            ["Machiavellianism", "Plans how to use people, and stays cold about it.", "Soft and hard: favors, flattery and threats."],
            ["Psychopathy", "Feels little for others, acts on impulse, takes risks.", "Hard: threats and pressure."]
          ]
        },
        {
          title: "What the research can and can't tell you",
          head: ["Question", "Answer"],
          rows: [
            ["Is it a diagnosis?", "No. These are traits in ordinary people. Only a trained expert diagnoses a disorder."],
            ["Where do the traits come from?", "Genes and life both play a part. Machiavellianism depends most on life."],
            ["Are they linked to addiction?", "Yes, to drugs and drink, and to habits like gambling. It's a link, not a cause."],
            ["Can a study tell you about one person?", "No. It tells you about groups, on average."]
          ]
        }
      ],
      moves: [
        "Read the three traits. Ask for an action, not a person, that fits each one.",
        "Read the four questions. Learners answer each before you reveal the answer.",
        "Say it plainly: where a trait comes from explains it. It doesn't excuse what someone does."
      ],
      say: [
        ["Facilitator", "Notice the last column. People high in these traits don't only threaten. Many charm first."],
        ["Expected", "\"So if they were born that way, it's not their fault?\""],
        ["Facilitator", "Where it comes from explains it. What they do with it is still on them, and you can still protect yourself."]
      ],
      watch:
        "Learners start naming people they know. Stop it kindly. Ask for the action instead, and keep the name out of the room."
    }
  ],

  check: {
    minutes: 10,
    items: [
      {
        id: "p1",
        targets: ["9.1"],
        prompt: "Name the three Dark Triad traits. Why does the research treat them as a scale, not a diagnosis?",
        crit:
          "Names the three: narcissism, Machiavellianism and psychopathy. Says each is a scale, and we all sit somewhere on it. Only a doctor or trained expert can diagnose. Reteach if they sort people into \"is\" and \"isn't\"."
      },
      {
        id: "p2",
        targets: ["9.2"],
        prompt: "Name two ways people high in these traits tend to get others to do what they want.",
        crit:
          "Names one soft way, like compliments or favours, and one hard way, like threats. Says the tactics vary, so there is no single sign. Reteach if they name only threats or \"creepy\" behavior."
      },
      {
        id: "p3",
        targets: ["9.3"],
        prompt:
          "A study finds that people high in Machiavellianism tell more lies, on average. What can that tell you about one person you know? What can't it?",
        crit:
          "Says it describes a group on average, and many in the group don't lie more. It can't tell you about one person. Judge them by what they do. Reteach if they apply it to the person."
      },
      {
        id: "p4",
        targets: ["9.4"],
        prompt: "Where do these traits come from? How do they link to addiction?",
        crit:
          "Says both genes and life shape them, like upbringing and what happens to you. Says they are linked to addiction, not caused by it. Says a cause explains behavior but doesn't excuse it. Reteach if they give one cause."
      }
    ],
    exit: {
      rating: "How useful was today for the people you deal with, face to face or online? (1 = not at all, 5 = very)",
      open: "What will you look at now, before you decide what someone is like?"
    }
  },

  transfer: {
    educators:
      "This week, notice one time a label is put on a colleague, a parent or a student. Ask what the person actually did, and use that instead.",
    professionals:
      "This week, notice one time someone at work gets a label like \"narcissist\". Ask what they actually did, and talk about that instead.",
    students:
      "This week, notice one post or chat that puts a label on someone. Think about what the person actually did. Talk to an adult you trust if it worries you."
  },

  access: [
    {
      channel: "vision",
      note: "The dot plot is also a table of counts, and its description gives both averages. The picked score is read out in words."
    },
    {
      channel: "language",
      note: "Each trait has a plain-words meaning in the table. Keep the three names on the board, with one action for each."
    },
    {
      channel: "attention",
      note: "Four sentences, one at a time. Pick one person at a time on the dot plot, and talk before the next."
    }
  ]
};
