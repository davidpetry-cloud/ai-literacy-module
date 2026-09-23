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
export function textRoles(lesson, tracks) {
  const [concrete] = lesson.stages;
  return {
    objectives: lesson.objectives.map((o) => o.text),
    framing: [lesson.framing],
    learnerPrompts: [...lesson.warmup.items, ...lesson.check.items].map((i) => i.prompt)
      .concat(lesson.check.exit.rating, lesson.check.exit.open),
    facilitator: [
      ...lesson.stages.flatMap((s) => [...s.moves, ...s.say.map(([, line]) => line), s.watch]),
      ...lesson.warmup.items.map((i) => i.expected),
      ...lesson.check.items.map((i) => i.crit),
      lesson.arcs.attention, lesson.arcs.confidence, lesson.arcs.satisfaction,
      ...lesson.access.map((a) => a.note)
    ],
    ...Object.fromEntries(tracks.flatMap((t) => [
      [`relevance:${t}`, [lesson.arcs.relevance[t], lesson.transfer[t]]],
      [`passage:${t}`, concrete.tracks[t].passage.sentences.map((s) => s.text)],
      [`key:${t}`, concrete.tracks[t].passage.sentences.map((s) => s.note)]
    ]))
  };
}
