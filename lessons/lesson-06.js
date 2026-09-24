/**
 * Lesson 6 — UX/UI: judging what AI builds.
 *
 * The concrete stage is a "screen": a small form, made up for this lesson as if
 * an AI had built it, that learners really use. It sits in a sandboxed frame
 * (lesson-core.js, screenExercise). Six numbered parts are marked on it. Each
 * part carries:
 *   label      what the learner looks at, in the list beside the frame
 *   desc       the same part in words, for the "Text version of this screen"
 *   principle  the design principle it breaks, or "fine" for the part that works
 *   goal       the usability goal that suffers most (`also` names a second one)
 *   harm, reach  how bad it is and how many users it hits, for the pictorial grid
 *   note       the reveal: how you could tell, and what to change
 *
 * `html` is the frame's content. It is meant to be flawed, so it is kept out of
 * the page's own audit; the tests check the frame's markup instead. It has no
 * external URLs, and is built to reflow at about 340px wide.
 *
 * These screens are "planted": written by a model for this lesson, with problems
 * placed on purpose. Replace them with captured AI-built screens when you have
 * good ones, and set provenance to "captured" with the model and capture date.
 */

// Shared look for the three mock screens: a plausible, polished app style.
const MOCK_CSS = `*{box-sizing:border-box}body{margin:0;font:15px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif;color:#1f2430;background:#fff}
header{background:#4757d6;color:#fff;padding:12px 14px}header h1{font-size:18px;margin:0 0 6px;display:flex;align-items:center}
.link{color:#fff;font-size:14px;text-decoration:underline;display:inline-flex;align-items:center}
main{padding:12px 14px 20px}label,.lbl{display:flex;align-items:center;margin:14px 0 4px;font-weight:600;font-size:14px}
input,select{width:100%;padding:9px 10px;font:inherit;border:1px solid #c5c9d6;border-radius:8px;background:#fff}
.n{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:#111;color:#fff;font:700 12px/1 system-ui;margin-right:6px;flex:none}
.row{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:14px}
.note{display:flex;align-items:center;font-size:13px;color:#5a6070;margin:12px 0 0}
.tool{padding:6px 8px;font:13px system-ui;background:#eef0f4;border:1px solid #d5d8e0;border-radius:6px;color:#333}`;

const page = (body, script) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${MOCK_CSS}</style></head><body>${body}<script>${script}</script></body></html>`;

export default {
  n: 6,
  slug: "judging-screens",
  title: "UX/UI: judging what AI builds",
  ready: true,
  objectivesApproved: "2026-09-24",
  framing:
    "An AI can build a screen in a minute, and it can look finished while breaking the basics of good design. Goals tell you how to measure a screen. Principles tell you where to look.",
  objectives: [
    {
      id: "6.1",
      bloom: "understand",
      text: "Explain in plain language what each usability goal and design principle asks of a screen."
    },
    {
      id: "6.2",
      bloom: "analyze",
      text: "Identify which design principle an AI-built screen breaks, and which usability goal suffers."
    },
    {
      id: "6.3",
      bloom: "evaluate",
      text: "Judge an AI-built screen against the usability goals, and decide what to fix first."
    }
  ],

  arcs: {
    attention:
      "Put one of the screens up and say: \"An AI built this in a minute. Would you send it out? Use it before you answer.\"",
    relevance: {
      educators:
        "More school forms and sign-up pages are built with AI now. When one confuses parents, the calls and emails come to you.",
      professionals:
        "AI can build a form in minutes. If it slows people down or loses their work, the cost lands on your team, not on the tool.",
      students:
        "You will use AI to build apps and sites for projects. These rules help you spot what it got wrong before anyone else does."
    },
    confidence:
      "You already know when a screen feels wrong. This lesson gives you names for what you feel, and a way to decide what to fix first.",
    satisfaction:
      "Learners leave able to name what is wrong with a screen, and with a short brief that asks an AI to get it right."
  },

  warmup: {
    minutes: 5,
    items: [
      {
        id: "w1",
        targets: ["6.1"],
        prompt: "What makes an app easy to use? Name two things.",
        expected:
          "Most say \"it looks nice\" or \"it's fast.\" Note who mentions knowing what to do next, or being told when something worked."
      },
      {
        id: "w2",
        targets: ["6.2"],
        prompt: "You used an app that felt wrong, but you couldn't say why. What might have been wrong with it?",
        expected:
          "Most say \"it was confusing.\" Note whether anyone names a real cause, like a button they couldn't find."
      },
      {
        id: "w3",
        targets: ["6.3"],
        prompt: "An AI builds you an app screen in one minute, and it looks polished. How much should you trust it?",
        expected:
          "Most say \"it looks finished, so it's fine.\" That is the belief this lesson tests. Don't correct it yet."
      }
    ]
  },

  stages: [
    {
      kind: "concrete",
      exercise: "screen",
      title: "Use the screen. Find what it gets wrong",
      minutes: 12,
      targets: ["6.2"],
      moves: [
        "Open the screen for the group's track. Say it was made up for this lesson, with problems planted on purpose.",
        "Learners use it for two minutes. Fill it in, press the buttons, and try to make a mistake.",
        "For each numbered part, learners write one principle, or \"works\". Then they write the goal that suffers.",
        "Reveal one part at a time. Ask how they could tell."
      ],
      say: [
        ["Facilitator", "Don't judge how it looks. Use it. Where did you get stuck, or feel unsure?"],
        ["Expected", "\"It's fine. It looks professional.\" Ask them to press the main button and say what happened."],
        ["Facilitator", "One part works well. Which one, and what makes it work?"]
      ],
      watch:
        "Learners judge by looks. A polished screen can still lose your work. Make them use each part before they judge it.",
      tracks: {
        educators: {
          context: "An AI-built page where parents book a parent-teacher meeting.",
          screen: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l6-key-educators",
            title: "Parent-teacher meeting sign-up",
            height: 520,
            html: page(
              `<header><h1><span class="n">1</span>Slot Allocation Module v2</h1><span class="link"><span class="n">2</span>Book a slot</span></header>
<main><form id="f" onsubmit="return false">
<label for="c"><span class="n">3</span>Your child's name</label><input id="c" autocomplete="off">
<label for="t">Time</label><select id="t"><option>Thursday 4:00</option><option>Thursday 4:15</option><option>Thursday 4:30</option></select>
<p class="note"><span class="n">4</span>Bookings are final.</p>
<div class="row"><span class="n">5</span><button type="button" id="cancel" style="flex:1;padding:12px;font:700 16px system-ui;background:#d6333a;color:#fff;border:0;border-radius:8px">Cancel</button><button type="button" id="go" style="background:none;border:0;color:#9aa0ab;font:13px system-ui;text-decoration:underline">Reserve</button><span class="n">6</span></div>
</form></main>`,
              `var f=document.getElementById("f");document.getElementById("go").onclick=function(){f.reset()};document.getElementById("cancel").onclick=function(){f.reset()};`
            ),
            parts: [
              {
                label: "The page title",
                desc: "The page title reads \"Slot Allocation Module v2\".",
                principle: "user-centricity",
                goal: "learnability",
                harm: "low",
                reach: "all",
                note: "That's the system's name, not the parent's task. A parent wants to book a meeting, so say that: \"Book a parent-teacher meeting.\""
              },
              {
                label: "The link in the header",
                desc: "The header link says \"Book a slot\". The button on the form says \"Reserve\".",
                principle: "consistency",
                goal: "learnability",
                harm: "low",
                reach: "some",
                note: "The same action has two names. People wonder if they are two different things. Pick one word and use it everywhere."
              },
              {
                label: "The name field",
                desc: "A box labelled \"Your child's name\".",
                principle: "fine",
                note: "A clear label, in the parent's words, right above the box. Nothing to fix."
              },
              {
                label: "The note under the time",
                desc: "A note says \"Bookings are final.\" There is no way to change or cancel a booking.",
                principle: "user-control",
                goal: "errors",
                harm: "medium",
                reach: "some",
                note: "Plans change. With no way to change a booking, one wrong tap stays wrong. Let people change or cancel."
              },
              {
                label: "The two buttons",
                desc: "Two buttons: a large, bold red \"Cancel\", and a small grey \"Reserve\" link.",
                principle: "hierarchy",
                goal: "errors",
                also: "efficiency",
                harm: "medium",
                reach: "all",
                note: "The button you want most looks the least important. The one that throws your work away looks the most. Make Reserve the big, bold button."
              },
              {
                label: "What happens after you press Reserve",
                desc: "Press Reserve and the form empties. Nothing says the booking worked.",
                principle: "context",
                goal: "errors",
                also: "satisfaction",
                harm: "high",
                reach: "all",
                note: "Did it book? Nobody can tell, so people book twice or not at all. Show a message, like \"Booked: Thursday 4:15.\""
              }
            ]
          }
        },
        professionals: {
          context: "An AI-built form where staff claim back work expenses.",
          screen: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l6-key-professionals",
            title: "Expense report form",
            height: 860,
            html: page(
              `<header><h1>New expense report</h1></header>
<main><form id="f" onsubmit="return false">
<div class="row"><span class="n">1</span><button type="button" class="tool">Save draft</button><button type="button" class="tool">Preview</button><button type="button" class="tool">Print</button><button type="button" class="tool">Export</button><button type="button" class="tool">Submit</button><button type="button" class="tool">Help</button></div>
<label for="d"><span class="n">2</span>Date of expense</label><input id="d" type="date">
<p class="lbl"><span class="n">3</span>Amount</p><input aria-label="Amount" inputmode="decimal">
<label for="t2">Total amount</label><input id="t2" inputmode="decimal">
<label for="t3">Confirm amount</label><input id="t3" inputmode="decimal">
<div class="row"><span class="n">4</span><button type="button" class="tool" id="att">Attach receipt</button><input type="file" id="file" hidden></div>
<label for="cc" style="color:#d6333a"><span class="n">5</span>Cost centre</label><input id="cc">
<label for="pc" style="color:#d6333a">Project code</label><input id="pc">
<p class="lbl"><span class="n">6</span>Line items</p>
<ul id="items" style="list-style:none;padding:0;margin:0">
<li style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee">Taxi to client <a href="#" class="del">Delete</a></li>
<li style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee">Lunch meeting <a href="#" class="del">Delete</a></li>
<li style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee">Train ticket <a href="#" class="del">Delete</a></li>
</ul>
</form></main>`,
              `document.getElementById("att").onclick=function(){document.getElementById("file").click()};document.querySelectorAll(".del").forEach(function(a){a.onclick=function(e){e.preventDefault();a.parentNode.remove()}});`
            ),
            parts: [
              {
                label: "The row of buttons",
                desc: "Six buttons of the same size and colour: Save draft, Preview, Print, Export, Submit and Help.",
                principle: "hierarchy",
                goal: "efficiency",
                harm: "medium",
                reach: "all",
                note: "Submit is the one that matters, and it looks like all the others. People hunt for it, or press the wrong one. Make Submit stand out."
              },
              {
                label: "The date field",
                desc: "A box labelled \"Date of expense\", with a calendar.",
                principle: "fine",
                note: "A clear label, and a calendar that stops dates that can't exist. Nothing to fix."
              },
              {
                label: "The three amount boxes",
                desc: "Three boxes: \"Amount\", \"Total amount\" and \"Confirm amount\". All three ask for the same number.",
                principle: "usability",
                goal: "efficiency",
                also: "errors",
                harm: "low",
                reach: "all",
                note: "Typing the same number three times wastes time and invites typos. Ask for it once."
              },
              {
                label: "The Attach receipt button",
                desc: "An \"Attach receipt\" button. After you choose a file, nothing on the screen changes.",
                principle: "context",
                goal: "errors",
                harm: "high",
                reach: "all",
                note: "Did the receipt attach? Nobody can tell until the claim bounces back. Show the file name and a tick."
              },
              {
                label: "The labels for Cost centre and Project code",
                desc: "\"Cost centre\" and \"Project code\" must be filled in. Their labels are red, and nothing else says they are needed.",
                principle: "accessibility",
                goal: "errors",
                harm: "high",
                reach: "few",
                note: "Colour is the only sign. People who can't see red, and people using screen readers, miss it. Add the word \"required\"."
              },
              {
                label: "The Delete links",
                desc: "Each line item has a \"Delete\" link. It removes the line at once, with no warning and no undo.",
                principle: "user-control",
                goal: "errors",
                also: "satisfaction",
                harm: "high",
                reach: "some",
                note: "One slip deletes a line you then have to type again. Add undo, or ask before deleting."
              }
            ]
          }
        },
        students: {
          context: "An AI-built page where students sign up for a school club.",
          screen: {
            provenance: "planted",
            model: "claude-opus-5-5",
            claim: "l6-key-students",
            title: "Robotics club sign-up",
            height: 560,
            html: page(
              `<header><h1>Join the Robotics Club</h1><p style="margin:0;display:flex;align-items:center;font-size:14px"><span class="n">1</span><span id="step">Step 1 of 3</span>&nbsp;· 12 required fields</p></header>
<main><form id="f" onsubmit="return false">
<label for="u"><span class="n">2</span>Enter UID per SIS</label><input id="u">
<label for="g"><span class="n">3</span>Grade</label><input id="g" style="border:2px solid #d6333a">
<label for="e"><span class="n">4</span>Email</label><input id="e" type="email">
<p class="note"><span class="n">5</span>Going back will clear your answers.</p>
<div class="row"><span class="n">6</span><button type="button" id="next" style="flex:1;padding:12px;font:700 16px system-ui;background:#4757d6;color:#fff;border:0;border-radius:8px">Next</button></div>
</form></main>`,
              `var words=["Next","Continue","Proceed"],i=0;document.getElementById("next").onclick=function(){i=(i+1)%3;this.textContent=words[i];document.getElementById("step").textContent="Step "+(i+1)+" of 3"};`
            ),
            parts: [
              {
                label: "The line under the title",
                desc: "A line reads \"Step 1 of 3 · 12 required fields\".",
                principle: "usability",
                goal: "efficiency",
                also: "satisfaction",
                harm: "medium",
                reach: "all",
                note: "Twelve required fields to join a club is too many. Ask for what the club needs now, and the rest later."
              },
              {
                label: "The first box's label",
                desc: "The first box is labelled \"Enter UID per SIS\".",
                principle: "user-centricity",
                goal: "learnability",
                harm: "medium",
                reach: "some",
                note: "That's the school system's language. Say what you mean: \"Your student number\"."
              },
              {
                label: "The Grade box",
                desc: "The Grade box has a red border. No message says what is wrong.",
                principle: "accessibility",
                goal: "errors",
                harm: "high",
                reach: "few",
                note: "A red border is the only sign. Some people can't see it, and nobody knows what to fix. Add a message in words."
              },
              {
                label: "The email box",
                desc: "A box labelled \"Email\".",
                principle: "fine",
                note: "Short, clear and expected. Nothing to fix."
              },
              {
                label: "The note above the button",
                desc: "A note says \"Going back will clear your answers.\" There is no Back button.",
                principle: "user-control",
                goal: "errors",
                harm: "high",
                reach: "some",
                note: "There's no way back, and going back loses your work. Add a Back button that keeps your answers."
              },
              {
                label: "The button at the bottom",
                desc: "The button says \"Next\". On step 2 it says \"Continue\", and on step 3 \"Proceed\".",
                principle: "consistency",
                goal: "learnability",
                harm: "low",
                reach: "all",
                note: "Three words for one action. People stop to wonder if each one does something new. Use \"Next\" every time."
              }
            ]
          }
        }
      }
    },
    {
      kind: "pictorial",
      title: "What to fix first",
      minutes: 10,
      targets: ["6.3"],
      figure: "fix-first",
      moves: [
        "Draw the grid on the board: how bad it is down the side, and how many users it hits across the top.",
        "Learners place each problem from the screen by its number.",
        "Reveal the finished grid. Compare, and talk about any that moved.",
        "Read the fix order aloud. Ask why the top right comes first."
      ],
      say: [
        ["Facilitator", "Every problem here is real. You can't fix them all today. Which one comes first?"],
        ["Expected", "\"The ugliest one.\" Ask: who does it hurt, and how badly?"],
        ["Facilitator", "A problem that hits only a few people can still come early, if it stops them completely."]
      ],
      watch:
        "Learners fix what they noticed first, or what looks worst. Bring them back to two questions: how bad is it, and for how many people?"
    },
    {
      kind: "abstract",
      title: "The goals and the principles",
      minutes: 8,
      targets: ["6.1", "6.2", "6.3"],
      principles: ["usability-goals", "design-principles", "context-principle", "user-control-principle", "ai-ui-polish"],
      tables: [
        {
          title: "Usability goals (Nielsen, 1993): how you know it works",
          head: ["Goal", "The question it asks"],
          rows: [
            ["Learnability", "How quickly can a new user start getting things done?"],
            ["Efficiency", "Once they know it, how fast can they finish?"],
            ["Memorability", "After time away, can they use it without learning it again?"],
            ["Errors", "Are mistakes few, easy to recover from, and never a disaster?"],
            ["Satisfaction", "Is it pleasant to use?"]
          ]
        },
        {
          title: "Design principles (this course's set): how you get there",
          head: ["Principle", "The question it asks", "Mainly helps (the course's view)"],
          rows: [
            ["User-centricity", "Is it built around the user's task and words?", "Satisfaction, learnability"],
            ["Consistency", "Does the same thing look and act the same everywhere?", "Learnability, memorability"],
            ["Hierarchy", "Do size, weight and space show what matters most?", "Efficiency, learnability"],
            ["Context", "Does the user know where they are and what just happened?", "Errors, memorability"],
            ["User control", "Can the user go back, undo and cancel?", "Errors, satisfaction"],
            ["Accessibility", "Can everyone use it? Lesson 7 goes deeper.", "All five"],
            ["Usability", "Can a real person finish the task with little effort?", "Efficiency, errors"]
          ]
        }
      ],
      moves: [
        "Read the five goals. For each, ask for a part of today's screen that hurt it.",
        "Read the seven principles. Ask which one each problem broke.",
        "Learners write a five-line brief for their next AI-built screen. Use the four parts from Lesson 2, and name two principles it must follow."
      ],
      say: [
        ["Facilitator", "The goals tell you if a screen works. The principles tell you where to look when it doesn't."],
        ["Expected", "\"So AI can't build screens?\""],
        ["Facilitator", "It can, and fast. But it builds what you ask for. Ask for undo, messages and clear labels, then check it did."]
      ],
      watch:
        "Learners mix up goals and principles. A goal is a result you can measure. A principle is a way to get there. Ask: is this something you check, or something you do?"
    }
  ],

  check: {
    minutes: 10,
    items: [
      {
        id: "p1",
        targets: ["6.1"],
        prompt: "Explain what \"user control\" asks of a screen. Give one example.",
        crit:
          "Says users can go back, undo or cancel, with an example such as undoing a delete. Reteach if they say it means the designer is in control, or only name a settings page."
      },
      {
        id: "p2",
        targets: ["6.2"],
        prompt:
          "An AI-built checkout shows a spinner after you press Pay, then goes blank. Which principle does it break, and which goal suffers?",
        crit:
          "Says context, because the user can't tell what happened. Accepts errors or satisfaction as the goal, with a reason. Reteach if they say \"it's confusing\" or name no principle."
      },
      {
        id: "p3",
        targets: ["6.3"],
        prompt:
          "An AI-built screen has three problems. (a) The Submit button is small. (b) Nothing happens after you press it. (c) The page title is a slightly different blue on each page. Which do you fix first, and why?",
        crit:
          "Fixes (b) first, because every user is left unsure it worked, and says why (c) comes last. Reteach if they fix (a) or (c) first, or say \"all of them.\""
      }
    ],
    exit: {
      rating: "How relevant was today to what you actually use AI for? (1 = not at all, 5 = directly)",
      open: "Which principle will you check first on the next screen an AI builds for you?"
    }
  },

  transfer: {
    educators:
      "Before you share an AI-built form with families, use it once as a parent would. Fix the first problem on your grid, then share it.",
    professionals:
      "Take one AI-built tool your team uses. Check it against the five goals, and send the owner the one problem to fix first.",
    students:
      "Next time you build an app or site with AI, name two principles in your request. Then test it once as a new user would."
  },

  access: [
    {
      channel: "vision",
      note: "The screen is also written out as a text version, one part at a time, so the exercise works with a screen reader. The grid is also a table."
    },
    {
      channel: "motor",
      note: "The screen is a plain form that works with the keyboard. Learners who can't use it can work from the text version instead."
    },
    {
      channel: "attention",
      note: "Six parts, one at a time. Use the screen for two minutes before anyone starts naming problems."
    }
  ]
};
