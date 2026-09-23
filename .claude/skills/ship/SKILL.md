---
name: ship
description: Test, UI-check, commit, push and confirm the live GitHub Pages site for the AI literacy course. Use when David runs /ship.
argument-hint: "[optional commit message]"
disable-model-invocation: true
---

# Ship

Take the working tree to the live site. Stop at the first failure and report
it. **Never** skip a step to get something out.

## 1. See what's going out

- `git status --short` and `git diff --stat`. If there's nothing to ship, say
  so and stop.
- Look through the diff. Anything that looks like a secret, a stray scratch
  file or `node_modules` gets flagged, not committed.
- If `claims.js` changed, show which claims changed status. A
  `source: "practitioner"` block must have been written by David, not in a
  Claude session. If one appears and you can't confirm David wrote it, stop and ask.

## 2. Test

`npm test`. All suites pass or nothing ships.

## 3. UI check in the browser

Start `npm run preview` in the background. In the browser pane, run the audit
on the hub and on every ready lesson (`lesson.html?n=N`), at desktop width and
at 375px:

```js
const { audit } = await import("/scripts/ui-audit.js"); await audit();
```

Every page must return `pass: true`, which covers both themes, contrast,
text size, horizontal scroll and tap targets. Reset the viewport and stop the
server afterwards.

## 4. Commit

Follow CLAUDE.md's commit rules:

- a finished lesson is `lesson NN: <topic>`;
- tool, claim, UI and docs changes get their own commits.

Split unrelated changes into separate commits, staging files by name. If
`$ARGUMENTS` is given, use it as the message for a single commit. End every
message with the co-author line from the session's attribution instructions.

## 5. Push and confirm it's live

1. `git push`.
2. Wait for the Pages build of the new HEAD, not an older build. Poll
   `gh api repos/davidpetry-cloud/ai-literacy-module/pages/builds/latest`
   until `status` is `built` and `commit` matches `git rev-parse HEAD`.
   Report `errored` immediately.
3. Open the live site
   (`https://davidpetry-cloud.github.io/ai-literacy-module/`) and check the
   pages that changed. Browsers cache JS and CSS for 10 minutes, so re-fetch
   with `fetch(url, {cache: "reload"})` and reload before judging.

## 6. Report

Give the commits (hash and message), the live URL, and the audit result per
page, in a few lines. Also list any claims still awaiting attestation.
