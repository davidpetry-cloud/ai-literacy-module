// Flesch–Kincaid grade with a heuristic syllable count. A guardrail for
// consistency between lessons, not a precise measure of any one sentence.
function syllables(word) {
  let w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  if (w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
  return w.match(/[aeiouy]{1,2}/g)?.length ?? 1;
}

export function sentences(text) {
  return text
    .replace(/\b(e\.g|i\.e|et al|etc|vs)\./gi, "$1")
    .split(/(?<=[.!?])["”')\]]*\s+/)
    .map((s) => s.trim())
    .filter((s) => /[a-z]/i.test(s));
}

export function readability(texts) {
  const all = [].concat(texts).filter(Boolean);
  const sents = all.flatMap(sentences);
  const words = sents.flatMap((s) => s.split(/\s+/).filter((w) => /[a-z]/i.test(w)));
  const syl = words.reduce((n, w) => n + syllables(w), 0);
  const longest = Math.max(...sents.map((s) => s.split(/\s+/).length));
  return {
    grade: 0.39 * (words.length / sents.length) + 11.8 * (syl / words.length) - 15.59,
    wordsPerSentence: words.length / sents.length,
    longest,
    longestSentence: sents.find((s) => s.split(/\s+/).length === longest)
  };
}

// The text a lesson shows, grouped by who reads it. Shared by the test and
// by /build-lesson, so every lesson is measured the same way.
// A prompt pair's requests and outputs read as passage text; its answer key
// (gap notes, invented notes, what each part changed) reads as key text.
function concreteTexts(concrete, t) {
  const art = concrete.tracks[t];
  if (art.screen) {
    // What the learner looks at and the text version read as passage text; the reveals are the key.
    const parts = art.screen.parts;
    return { passage: parts.flatMap((p) => [p.label, p.desc]), key: parts.map((p) => p.note) };
  }
  if (art.classify) {
    // The request and answer read as passage text; the notes and the rule quoted from the request are the key.
    const c = art.classify;
    return { passage: [c.request, ...c.items.map((i) => i.text)], key: c.items.flatMap((i) => [i.note, i.rule]).filter(Boolean) };
  }
  if (art.signoffs) {
    // The document and its sign-offs read as passage text; the notes are the answer key.
    const items = art.signoffs.items;
    return { passage: items.flatMap((i) => [i.statement, i.basis]).filter(Boolean), key: items.map((i) => i.note) };
  }
  if (!art.pair) {
    return {
      passage: art.passage.sentences.map((s) => s.text),
      key: [...art.passage.sentences.map((s) => s.note), ...(art.passage.uses ?? []).flatMap((u) => [u.label, u.why])]
    };
  }
  const { vague, structured } = art.pair;
  return {
    passage: [vague.prompt, ...vague.output.map((l) => l.text), ...Object.values(structured.parts), ...structured.output.map((l) => l.text)],
    key: [
      ...Object.values(vague.gaps).map((g) => g.note),
      ...[...vague.output, ...structured.output].map((l) => l.invented),
      ...Object.values(structured.effects)
    ].filter(Boolean)
  };
}

export function textRoles(lesson, tracks) {
  const [concrete] = lesson.stages;
  return {
    objectives: lesson.objectives.map((o) => o.text),
    framing: [lesson.framing],
    learnerPrompts: [...lesson.warmup.items, ...lesson.check.items].map((i) => i.prompt)
      .concat(lesson.check.exit.rating, lesson.check.exit.open)
      // A checklist builder's options are learner text too.
      .concat(lesson.stages.flatMap((s) => s.checks ?? []).flatMap((c) => [c.text, c.note]).filter(Boolean))
      // Reference tables are for learners too; each cell is read as a sentence.
      .concat(lesson.stages.flatMap((s) => s.tables ?? []).flatMap((t) => t.rows.flatMap((r) => r.slice(1).map((c) => (/[.?!]$/.test(c) ? c : `${c}.`))))),
    facilitator: [
      ...lesson.stages.flatMap((s) => [...s.moves, ...s.say.map(([, line]) => line), s.watch]),
      ...lesson.warmup.items.map((i) => i.expected),
      ...lesson.check.items.map((i) => i.crit),
      lesson.arcs.attention, lesson.arcs.confidence, lesson.arcs.satisfaction,
      ...lesson.access.map((a) => a.note)
    ],
    ...Object.fromEntries(tracks.flatMap((t) => [
      [`relevance:${t}`, [lesson.arcs.relevance[t], lesson.transfer[t]]],
      [`passage:${t}`, concreteTexts(concrete, t).passage],
      [`key:${t}`, concreteTexts(concrete, t).key]
    ]))
  };
}
