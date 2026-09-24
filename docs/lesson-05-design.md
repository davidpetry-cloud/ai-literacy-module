# Lesson 5: How it goes wrong, and a checklist that holds. Design

**Status:** approved 2026-09-24. Built on Sonnet. `lessons/lesson-05.js` is the
source of truth for wording.

**Timing:** warm-up 5, concrete 12, pictorial 10, abstract 8, check 10. Same
split as Lesson 4, since the builder needs the time.

**Objectives** (approved 2026-09-23; 5.1 and 5.2 reworded 2026-09-24, see
below): 5.1 analyze, classify an output error as a made-up detail, outdated
information, bias, or a misread request; 5.2 create, assemble a personal
checklist for checking their own regular AI use; 5.3 evaluate, critique an
AI-assisted work product using that checklist.

**Objective rewording.** The approved wording of 5.1 and 5.2 read at grade
12.2 against a ceiling of 11 for objectives, and the ceiling never moves.
Only the words changed: "fabrication" became "a made-up detail", "instruction"
became "request", and "verification ... recurring" became "checking ... regular".
Levels, verbs and meaning are the same. Awaiting David's confirmation.

**Concrete, exercise `classify`:** the passage pattern with a new key set. Each
track gets a request (with facts and one rule) and an AI answer of five
sentences: one *fabrication*, one *outdated*, one *bias*, one *misread*, and one
*fine* so that "mark everything" loses. Learners name what they compared each
sentence with: a source, the date, who is left out, or the request. The misread
sentence always breaks a line of the request shown on the page. Order is
shuffled per track. Carries 5.1.

**Pictorial, figure `checklist`:** the builder. Eight numbered checks, shared by
every track: four that each catch one kind, one that overlaps the request
check, three that catch nothing ("read it again", "ask the AI if it's sure",
"a second chatbot"). A grid of four kinds by eight checks marks where a ticked
check covers a kind. A live line says what is covered, what is not, which
checks catch nothing, and which repeat another. Over five checks it warns. An
optional field names the weekly task; the builder prints the learner's
checklist back. Drawn twice: an SVG and a table for narrow screens. Nothing is
stored or sent. Carries 5.2.

**Abstract:** `error-kinds`, `outdated-cutoff`, `bias-inherited`,
`misread-instruction`, `checklist-specific`. Learners write a final checklist,
then run it over the concrete answer: which errors would each check catch, and
which slip through. Carries 5.3 (with check item p3).

**Revision, 2026-09-24 (Opus review, approved by David).**
1. The students answer was exactly 60 words against "under 60 words", an unkeyed
   misread. Every answer is now inside its limit, and a test holds that.
2. Objective 5.3 now has practice with the tool: after building a checklist, the
   builder runs it over the track's own five sentences and shows what each check
   catches and what slips through. The pictorial stage targets 5.2 and 5.3.
3. The three misreads now break different kinds of rule: a forbidden detail
   (educators), plain words with no legal terms (professionals), and who the
   message is for (students). A test holds that they differ.
4. Two arguable keys fixed. The professionals No error sentence added "so we need
   a legal basis", which the request never said; No error sentences now use only
   the request's words, and a test holds that. The students bias sentence mixed a
   contested group statistic with the bias; it is now a default assumption about
   families ("Ask your mom or dad").

**Decisions at approval:**
1. `fine` is a fifth key, so the concrete stage has five items.
2. The bias sentences are plain stereotypes, so the key is unarguable.
3. The weak checks are the same in every track.
4. The 5.3 critique reuses the concrete answer, not a new document.
