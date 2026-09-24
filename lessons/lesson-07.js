/**
 * Lesson 7 — Accessible and mindful UX.
 *
 * The concrete stage is an "audit": the same sandboxed screen as Lesson 6, but
 * each numbered part is keyed as one of three kinds:
 *   wcag     an accessibility failure: WCAG principle, this course's group,
 *            criterion number and name, and level (A or AA)
 *   pattern  an addictive or manipulative pattern, with the calmer fix
 *   fine     the part that works
 * `contrast` is the failing colour pair the pictorial's contrast checker starts
 * from, taken from one of the screen's parts. `use` says what it colours: text
 * (needs 4.5:1 at AA) or an interface part (needs 3:1).
 *
 * The screens are made up for this lesson, as if an AI had built them, with
 * problems planted on purpose. The students screen's carousel moves only when
 * the learner's system allows motion, so the lesson itself respects reduced
 * motion while still showing the failure (no pause button).
 *
 * The worked example audits this course site. Each row names a `verify` check,
 * and tests/ui.test.js runs it, so the page can't claim something that isn't true.
 */

// Kept here, not shared with Lesson 6, so each lesson can move to the companion module on its own.
const MOCK_CSS = `*{box-sizing:border-box}body{margin:0;font:15px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif;color:#1f2430;background:#fff}
header{background:#0f766e;color:#fff;padding:12px 14px}header h1{font-size:18px;margin:0;display:flex;align-items:center}
main{padding:12px 14px 20px}label,.lbl{display:flex;align-items:center;margin:14px 0 4px;font-weight:600;font-size:14px}
input{width:100%;padding:9px 10px;font:inherit;border:1px solid #c5c9d6;border-radius:8px;background:#fff}
.n{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:#111;color:#fff;font:700 12px/1 system-ui;margin-right:6px;flex:none}
.row{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:14px}
.note{display:flex;align-items:center;font-size:13px;margin:12px 0 0}
.box{border:1px solid #e3e6ee;border-radius:10px;padding:10px;margin-top:12px}
.ico{width:40px;height:40px;font-size:18px;border:1px solid #c5c9d6;border-radius:8px;background:#fff}`;

const page = (body, script) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${MOCK_CSS}</style></head><body>${body}<script>${script}</script></body></html>`;

export default {
  n: 7,
  slug: "accessible-mindful-ux",
  title: "Accessible and mindful UX",
  ready: true,
  objectivesApproved: "2026-09-24",
  framing:
    "A polished screen can still shut people out or pull at their attention. WCAG gives you tests you can run. Mindful design gives you questions about time, attention and choice.",
  objectives: [
    {
      id: "7.1",
      bloom: "understand",
      text: "Explain what perceivable, operable, understandable and robust mean, and what levels A, AA and AAA add."
    },
    {
      id: "7.2",
      bloom: "apply",
      text: "Check a colour pair against the contrast levels, and say what to change if it fails."
    },
    {
      id: "7.3",
      bloom: "evaluate",
      text: "Audit an AI-built screen for accessibility failures and addictive patterns, and propose calmer defaults and pause points."
    }
  ],

  arcs: {
    attention:
      "Show the screen and ask two questions: \"Who can't use this?\" and \"Who is this trying to keep hooked?\" Take answers before anyone opens the audit.",
    relevance: {
      educators:
        "The apps your students use shape their habits, and some of those students can't see colour, hear sound or use a mouse. You choose which tools come into the room.",
      professionals:
        "Accessibility is a legal duty in many places, and a trust issue everywhere. Pushy defaults cost your users their attention, and cost you their goodwill.",
      students:
        "You can tell when an app is built to keep you scrolling. This lesson gives you the words for it, and ways to take your time back."
    },
    confidence:
      "You don't need to know the whole standard. Four groups, three levels and one contrast number will catch most problems.",
    satisfaction:
      "Learners leave able to check a colour pair, name what shuts people out, and suggest a calmer default. They also leave with one habit to try on their own use of AI."
  },

  warmup: {
    minutes: 5,
    items: [
      {
        id: "w1",
        targets: ["7.1"],
        prompt: "What does it mean for a screen to be \"accessible\"? Give one example.",
        expected:
          "Most say \"big text\" or \"for disabled people.\" Note who mentions screen readers, keyboards or colour blindness."
      },
      {
        id: "w2",
        targets: ["7.2"],
        prompt:
          "Which is easier to read: light grey text on white, or black text on white? How would you prove it to someone who disagrees?",
        expected: "Most say \"just look at it.\" Note who asks for a number, or a way to measure it."
      },
      {
        id: "w3",
        targets: ["7.3"],
        prompt: "An app pings you when you haven't opened it for a day. Is that helpful or pushy? What would make it calmer?",
        expected:
          "Answers split. Note who names a real change, like turning notifications off until you ask for them."
      }
    ]
  },

  stages: [
    {
      kind: "concrete",
      exercise: "audit",
      title: "Audit the screen",
      minutes: 12,
      targets: ["7.1", "7.3"],
      moves: [
        "Open the screen for the group's track. Say it was made up for this lesson, with problems planted on purpose.",
        "Learners use it for two minutes. Try the keyboard, zoom in, and read everything.",
        "For each numbered part, learners write one of three things: a WCAG group, a pattern, or \"works\".",
        "Reveal one part at a time. For each pattern, ask for a calmer default or a pause point."
      ],
      say: [
        ["Facilitator", "Two questions for every part. Who can't use this? And who is this trying to keep hooked?"],
        ["Expected", "\"It's just a design choice.\" Ask: who made that choice easier, the user or the business?"],
        ["Facilitator", "One part works well. Which one, and what does it do right?"]
      ],
      watch:
        "Learners spot the patterns but miss the accessibility failures, because those don't show for most people. Make them try the screen by keyboard and with zoom before they judge it.",
      tracks: {
        educators: {
          context: "An AI-built reading tracker for a class, used by students and parents.",
          screen: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l7-key-educators",
            title: "Class reading tracker",
            height: 500,
            contrast: { fg: "#A0A6B0", bg: "#FFFFFF", use: "text", part: 2, what: "the grey instructions" },
            html: page(
              `<header><h1><span class="n">1</span>This week's reading</h1></header>
<main>
<p class="note" style="color:#A0A6B0"><span class="n">2</span>Log each book you finish. Minutes count toward your class total.</p>
<div class="box" style="background:#fff4e5"><span class="n">3</span>🔥 Don't break your 12-day streak! Read today or lose it.</div>
<div class="row"><span class="n">4</span><button type="button" class="ico">＋</button><button type="button" class="ico">✎</button><button type="button" class="ico">🗑</button></div>
<div class="box"><p class="lbl" style="margin-top:0"><span class="n">5</span>Class leaderboard</p>
<ol style="margin:0;padding-left:20px"><li>Sam, 340 min</li><li>Priya, 310 min</li><li>Jo, 295 min</li><li>…</li><li>Leo, 20 min (last)</li></ol></div>
<p class="note"><span class="n">6</span><span id="t">Logging you out in 60 seconds</span></p>
</main>`,
              `var s=60,t=document.getElementById("t");var iv=setInterval(function(){s--;t.textContent=s>0?"Logging you out in "+s+" seconds":"You have been logged out.";if(s<=0){clearInterval(iv);document.querySelectorAll("button").forEach(function(b){b.disabled=true})}},1000);`
            ),
            parts: [
              {
                label: "The heading",
                desc: "The heading reads \"This week's reading\".",
                kind: "fine",
                note: "Clear, short, in the reader's words, and a real heading. Nothing to fix."
              },
              {
                label: "The line of instructions",
                desc: "Instructions in light grey text: \"Log each book you finish.\"",
                kind: "wcag",
                principle: "Perceivable",
                group: "Text and visuals",
                criterion: "1.4.3",
                name: "Contrast (Minimum)",
                level: "AA",
                note: "The grey is too faint to read for many people. It's about 2.44 to 1, and text needs 4.5 to 1. Try it in the contrast checker."
              },
              {
                label: "The banner",
                desc: "A banner says \"Don't break your 12-day streak! Read today or lose it.\"",
                kind: "pattern",
                pattern: "Streak pressure",
                fix: "Set a weekly goal instead, with no streak to lose.",
                note: "It turns reading into fear of losing a number. A missed day should cost nothing."
              },
              {
                label: "The three small buttons",
                desc: "Three buttons that show only symbols: a plus, a pencil and a bin. None has a name.",
                kind: "wcag",
                principle: "Robust",
                group: "Mobile and device",
                criterion: "4.1.2",
                name: "Name, Role, Value",
                level: "A",
                note: "A screen reader says only \"button\" three times. Give each one a name, like \"Add a book\"."
              },
              {
                label: "The class leaderboard",
                desc: "A list ranks every child in the class by minutes read, with the last child named.",
                kind: "pattern",
                pattern: "Ranking people",
                fix: "Show each child their own progress, in private.",
                note: "It shames the slowest readers in front of everyone. Reward care, not competition."
              },
              {
                label: "The line at the bottom",
                desc: "A line counts down: \"Logging you out in 60 seconds\". There is no way to stay logged in.",
                kind: "wcag",
                principle: "Operable",
                group: "Navigation and interaction",
                criterion: "2.2.1",
                name: "Timing Adjustable",
                level: "A",
                note: "Slow readers and typists get thrown out mid-task. Let people turn off, extend or change the time limit."
              }
            ]
          }
        },
        professionals: {
          context: "An AI-built settings page for a work app's notifications.",
          screen: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l7-key-professionals",
            title: "Notification settings",
            height: 760,
            contrast: { fg: "#F4A6A0", bg: "#FFFFFF", use: "ui", part: 2, what: "the faint red border on the email box" },
            html: page(
              `<header><h1>Notification settings</h1></header>
<main>
<div class="box"><p class="lbl" style="margin-top:0"><span class="n">1</span>Alerts <span style="margin-left:6px;background:#d6333a;color:#fff;border-radius:10px;padding:0 7px;font-size:12px">12</span></p>
<label style="font-weight:400"><input type="checkbox" checked style="width:auto;margin-right:8px">Email alerts</label>
<label style="font-weight:400"><input type="checkbox" checked style="width:auto;margin-right:8px">Push alerts</label>
<label style="font-weight:400"><input type="checkbox" checked style="width:auto;margin-right:8px">Text messages</label></div>
<label for="em"><span class="n">2</span>Email</label><input id="em" value="sam@work" style="border:2px solid #F4A6A0">
<p class="lbl"><span class="n">3</span>Quiet hours</p>
<label for="q1" style="font-weight:400">From</label><input id="q1" type="time" value="20:00">
<label for="q2" style="font-weight:400">To</label><input id="q2" type="time" value="07:00">
<label for="ph"><span class="n">4</span>Phone</label><input id="ph" value="0400"><p class="note" style="color:#b3261e">Invalid input</p>
<div class="row"><span class="n">5</span><button type="button" style="height:20px;padding:0 6px;font:11px system-ui">Save</button></div>
<p class="note"><span class="n">6</span><a href="#">Turn off all alerts?</a>&nbsp;<a href="#">No thanks, I like missing important updates</a></p>
</main>`,
              ``
            ),
            parts: [
              {
                label: "The Alerts box",
                desc: "Email, push and text alerts are all ticked on by default, with a red badge showing 12.",
                kind: "pattern",
                pattern: "Noisy defaults",
                fix: "Turn alerts off until the person asks for them.",
                note: "Everything is on unless you dig in to stop it. The badge pulls you back in."
              },
              {
                label: "The Email box",
                desc: "The Email box has a faint red border. No words say what is wrong.",
                kind: "wcag",
                principle: "Perceivable",
                group: "Text and visuals",
                criterion: "1.4.1",
                name: "Use of Color",
                level: "A",
                note: "Colour is the only sign, and it's faint too: about 1.94 to 1 against 3 to 1 for a part of the screen. Add a message in words. Try it in the contrast checker."
              },
              {
                label: "The Quiet hours section",
                desc: "A section headed \"Quiet hours\", with \"From\" and \"To\" time boxes.",
                kind: "fine",
                note: "Clear heading, labelled boxes, and a calm default. Nothing to fix."
              },
              {
                label: "The message under Phone",
                desc: "Under the Phone box, red text says \"Invalid input\" and nothing more.",
                kind: "wcag",
                principle: "Understandable",
                group: "Content clarity",
                criterion: "3.3.3",
                name: "Error Suggestion",
                level: "AA",
                note: "It says something is wrong but not how to fix it. Say what's needed, like \"Enter 10 digits\"."
              },
              {
                label: "The Save button",
                desc: "A Save button about 20 pixels tall, with tiny text.",
                kind: "wcag",
                principle: "Operable",
                group: "Navigation and interaction",
                criterion: "2.5.8",
                name: "Target Size (Minimum)",
                level: "AA",
                note: "It's smaller than the 24 pixel minimum, and hard to press on a phone or with a shaky hand. Make it bigger."
              },
              {
                label: "The two links at the bottom",
                desc: "Two links: \"Turn off all alerts?\" and \"No thanks, I like missing important updates\".",
                kind: "pattern",
                pattern: "Confirmshaming",
                fix: "Use a plain \"No thanks\".",
                note: "It shames you for saying no. A choice should be easy to make either way."
              }
            ]
          }
        },
        students: {
          context: "An AI-built study app that shows a feed of flashcards.",
          screen: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l7-key-students",
            title: "Study app feed",
            // Shorter than its content on purpose: the feed only loads more when you scroll.
            height: 480,
            contrast: { fg: "#B0B0B0", bg: "#FFFFFF", use: "text", part: 2, what: "the search box's placeholder text" },
            html: page(
              `<style>@keyframes slide{0%,30%{transform:translateX(0)}35%,65%{transform:translateX(-100%)}70%,100%{transform:translateX(-200%)}}
@media (prefers-reduced-motion:no-preference){.track{animation:slide 9s infinite}}
input::placeholder{color:#B0B0B0}</style>
<header><h1>Study feed</h1></header>
<main>
<div class="box" style="overflow:hidden"><p class="lbl" style="margin-top:0"><span class="n">1</span>Tips</p><div class="track" style="display:flex"><p style="min-width:100%;margin:0">Tip: space out your study.</p><p style="min-width:100%;margin:0">Tip: test yourself.</p><p style="min-width:100%;margin:0">Tip: sleep helps memory.</p></div></div>
<div class="row"><span class="n">2</span><input placeholder="Search cards" style="flex:1"></div>
<div class="row" style="flex-wrap:nowrap;overflow-x:auto"><span class="n">3</span><div style="min-width:600px;display:flex;gap:8px"><div class="box" style="flex:1;margin:0">Biology: cells</div><div class="box" style="flex:1;margin:0">History: 1914</div><div class="box" style="flex:1;margin:0">Maths: fractions</div></div></div>
<div class="box" style="background:#fdf2ff"><span class="n">4</span>🎁 Mystery bonus! Keep swiping to unlock it.</div>
<div class="box"><p class="lbl" style="margin-top:0"><span class="n">5</span>Your cards</p><ul id="feed" style="margin:0;padding-left:20px"><li>Card 1</li><li>Card 2</li><li>Card 3</li></ul><p class="note">Loading more cards…</p></div>
<p class="note"><span class="n">6</span><a href="#">Log out</a></p>
</main>`,
              `var f=document.getElementById("feed"),n=3;window.addEventListener("scroll",function(){if(window.innerHeight+window.scrollY>=document.body.offsetHeight-40){for(var i=0;i<5;i++){n++;var li=document.createElement("li");li.textContent="Card "+n;f.appendChild(li)}}});`
            ),
            parts: [
              {
                label: "The Tips box",
                desc: "A Tips box that slides from one tip to the next by itself, with no pause button. It moves only if your device allows motion.",
                kind: "wcag",
                principle: "Operable",
                group: "Navigation and interaction",
                criterion: "2.2.2",
                name: "Pause, Stop, Hide",
                level: "A",
                note: "Moving text is hard to read and hard to ignore. Add a pause button, or don't move it at all."
              },
              {
                label: "The search box",
                desc: "A search box with light grey text inside it, \"Search cards\", and no label.",
                kind: "wcag",
                principle: "Understandable",
                group: "Content clarity",
                criterion: "3.3.2",
                name: "Labels or Instructions",
                level: "A",
                note: "The hint disappears when you type, and it's too faint anyway, about 2.16 to 1. Add a real label above the box. Try the grey in the contrast checker."
              },
              {
                label: "The row of subject cards",
                desc: "A row of three subject cards that is wider than a phone screen, so you have to scroll sideways.",
                kind: "wcag",
                principle: "Perceivable",
                group: "Mobile and device",
                criterion: "1.4.10",
                name: "Reflow",
                level: "AA",
                note: "On a phone you have to scroll sideways to see it all. Let the cards wrap onto new lines."
              },
              {
                label: "The Mystery bonus box",
                desc: "A box says \"Mystery bonus! Keep swiping to unlock it.\"",
                kind: "pattern",
                pattern: "Variable rewards",
                fix: "Show plain progress, like \"5 of 20 cards done\".",
                note: "A surprise prize keeps you swiping for the prize, not for the learning."
              },
              {
                label: "The Your cards list",
                desc: "A list of cards that keeps loading more as you scroll, with no end.",
                kind: "pattern",
                pattern: "Infinite scroll",
                fix: "Stop at a natural end: \"You're done for today.\"",
                note: "There's never a good place to stop. A pause point gives you one."
              },
              {
                label: "The Log out link",
                desc: "A link that says \"Log out\".",
                kind: "fine",
                note: "Easy to find, plainly named, and it does what it says. Nothing to fix."
              }
            ]
          }
        }
      }
    },
    {
      kind: "pictorial",
      title: "Check the contrast",
      minutes: 10,
      targets: ["7.2"],
      figure: "contrast",
      moves: [
        "The checker starts with a failing colour pair from the screen. Read the ratio and the results aloud.",
        "Learners change the colour until it passes AA for its use. Then they try AAA.",
        "Press \"Use the nearest passing colour\". Compare it with the learners' choice.",
        "Press \"Reset to the screen's colours\". Ask: what would you tell the person who built it?"
      ],
      say: [
        ["Facilitator", "You can't judge contrast by eye. Your screen, the light and your eyes all change it. The number doesn't."],
        ["Expected", "\"It looks fine to me.\" Ask: will it look fine to everyone, on every screen?"],
        ["Facilitator", "AA is the usual target. AAA is better where you can reach it."]
      ],
      watch:
        "Learners darken the colour until it looks right, then stop just short. Make them read the number. Close to 4.5 isn't 4.5."
    },
    {
      kind: "abstract",
      title: "Levels, groups and calmer defaults",
      minutes: 8,
      targets: ["7.1", "7.3"],
      principles: ["wcag-structure", "contrast-thresholds", "mindful-ux", "wellbeing-habits"],
      tables: [
        {
          title: "WCAG 2.2 at a glance (W3C, 2023)",
          head: ["WCAG principle", "This course's group", "Examples to check"],
          rows: [
            ["Perceivable", "Text and visuals", "Contrast, colour is never the only sign, text alternatives, text that can grow."],
            ["Operable", "Navigation and interaction", "Keyboard use, visible focus, big enough targets, a way to pause moving things."],
            ["Understandable", "Content clarity", "Labels, clear error messages that say how to fix them, the same navigation everywhere."],
            ["Robust", "Mobile and device", "Controls with names, status messages that are announced, layouts that fit a phone."]
          ]
        },
        {
          title: "The three levels",
          head: ["Level", "What it means"],
          rows: [
            ["A", "The minimum. Without it, some people can't use the page at all."],
            ["AA", "The usual target, and the one most laws point to."],
            ["AAA", "The highest level. Aim for it where you can. It can't be required for a whole site."]
          ]
        },
        {
          title: "Addictive patterns and calmer fixes",
          head: ["Pattern", "Calmer fix"],
          rows: [
            ["Noisy defaults", "Alerts off until the person asks for them."],
            ["Streak pressure", "A weekly goal with nothing to lose."],
            ["Infinite scroll", "A natural end: \"You're done for today.\""],
            ["Variable rewards", "Plain progress, like \"5 of 20 done\"."],
            ["Confirmshaming", "A plain \"No thanks\"."],
            ["Ranking people", "Private progress for each person."]
          ]
        },
        {
          title: "This course, audited",
          head: ["What we checked", "What we found"],
          verify: ["contrast", "focus", "targets", "reflow", "motion", "status", "calm", null],
          rows: [
            ["Text contrast", "Every text and background pair passes 4.5 to 1, in both themes."],
            ["Keyboard focus", "Every control shows a thick focus ring that passes 3 to 1."],
            ["Target size", "Buttons and Reveal links are at least 44 pixels tall."],
            ["Phones", "Grids turn into tables, so nothing needs sideways scrolling."],
            ["Motion", "Pages respect your device's reduced motion setting."],
            ["Status messages", "Track changes and tool results are read aloud."],
            ["Calm by default", "No alerts, autoplay, streaks, points or endless feeds."],
            ["Known cost", "On a phone, the header fills most of the first screen. It isn't a WCAG failure, but it costs a scroll. We plan to fix it."]
          ]
        }
      ],
      moves: [
        "Walk through the four WCAG principles. For each, ask for a part of today's screen that failed it.",
        "Read the patterns table. For the screen, learners write one calmer default and one natural pause point.",
        "Show \"This course, audited\". Ask what they would check first on a tool they use."
      ],
      say: [
        ["Facilitator", "Accessibility asks who can't use this. Mindful design asks what it does to the people who can."],
        ["Expected", "\"So every app is bad?\""],
        ["Facilitator", "No. Most problems here are easy to fix once someone looks. That someone can be you."]
      ],
      watch:
        "Learners treat AAA as the must-have and give up. AA is the usual target. Or they treat patterns as a matter of taste. Ask who each one helps: the person, or the business."
    }
  ],

  check: {
    minutes: 10,
    items: [
      {
        id: "p1",
        targets: ["7.1"],
        prompt: "Name the four WCAG principles. What do levels A, AA and AAA add?",
        crit:
          "Names perceivable, operable, understandable and robust. Says A is the minimum, AA the usual target, and AAA the highest. Reteach if they list single checks instead of principles, or think AAA is required."
      },
      {
        id: "p2",
        targets: ["7.2"],
        prompt:
          "Light grey text (#999999) sits on a white background. Does it pass AA for normal text? What would you change?",
        crit:
          "Says no: it's about 2.84 to 1, and normal text needs 4.5 to 1. Darken the text, for example to #767676. Reteach if they judge by eye, or say it passes."
      },
      {
        id: "p3",
        targets: ["7.3"],
        prompt:
          "An AI-built page plays a video by itself, shows a streak counter, has a 22 pixel close button, and shows errors only in red. Name two accessibility failures and two addictive patterns. Which do you fix first?",
        crit:
          "Names the small button and red-only errors as accessibility failures, and autoplay and the streak as patterns. Fixes first what stops a person using the page. Reteach if they mix up the two kinds, or say \"all of them.\""
      }
    ],
    exit: {
      rating: "How relevant was today to what you actually use AI for? (1 = not at all, 5 = directly)",
      open: "Which one thing will you change first on a screen you build or approve?"
    }
  },

  transfer: {
    educators:
      "Set one calmer default on an AI tool you use, like fewer alerts or a time limit. Then pick one habit to show your students, such as stopping at a natural end.",
    professionals:
      "Set one calmer default on an AI tool you use at work. Then notice one moment in your day when a break, or a colleague, would help more than another prompt.",
    students:
      "Set one calmer default on an app you study with. Then notice one moment when a break would help more than another prompt, and be kind to others online."
  },

  access: [
    {
      channel: "vision",
      note: "The screen is also a text version, part by part. The contrast checker reads its result aloud, and its results are a table with Pass or Fail in words."
    },
    {
      channel: "motor",
      note: "The checker takes typed hex codes as well as a colour picker. The screen works with the keyboard, or learners can use the text version."
    },
    {
      channel: "attention",
      note: "The students screen only moves if the learner's device allows motion. Take one part at a time, and talk before revealing."
    }
  ]
};
