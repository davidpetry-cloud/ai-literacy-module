// Project hooks for Claude Code sessions (wired up in .claude/settings.json).
//
//   pre     PreToolUse on Edit|Write|Bash. "A model proposes. Only David attests."
//           Refuses any Claude edit that adds, changes or removes an attestation
//           field in claims.js (source: "practitioner", by, verified), and any shell
//           command that could write to claims.js or throw away uncommitted edits.
//           David edits claims.js by hand, so nothing here gets in his way.
//   post    PostToolUse on Edit|Write. Reminds Claude to run `npm run csp` after
//           touching the import map or a mock screen's inline script.
//   status  statusLine: "Claims attested 6/106".
//   start   SessionStart: the same count as a one-line message.
//
// Pure Node, no dependencies. Test: echo '<hook json>' | node .claude/hooks/claims-guard.mjs pre

import { readFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const CLAIMS = join(ROOT, "claims.js");

// The fields resolveStatus() reads to decide a claim is attested. A model claim's
// `by: null` and `verified: null` don't match, so proposing claims stays allowed.
const FIELDS = [
  /source\s*:\s*["'`]practitioner["'`]/g,
  /\bby\s*:\s*["'`][^"'`\n]*["'`]/g,
  /\bverified\s*:\s*["'`][^"'`\n]*["'`]/g,
];

export function attestationFields(text) {
  const found = [];
  for (const re of FIELDS) {
    for (const m of text.matchAll(re)) found.push(m[0].replace(/\s+/g, " ").replace(/['`]/g, '"'));
  }
  return found.sort();
}

export function sameFields(before, after) {
  const a = attestationFields(before);
  const b = attestationFields(after);
  return a.length === b.length && a.every((x, i) => x === b[i]);
}

export function applyEdit(text, { old_string, new_string, replace_all }) {
  if (!text.includes(old_string)) return null;
  return replace_all ? text.split(old_string).join(new_string) : text.replace(old_string, () => new_string);
}

// Shell commands that could change claims.js or discard work on it. Reading is fine.
const WRITES = /\bsed\s+(-\w*\s+)*-\w*i|\bperl\s+-\w*i|\btee\b|\bcp\b|\bmv\b|\brm\b|\btruncate\b|>>?\s*["']?[^\s;&|]*claims\.js|writeFile|\bopen\s*\(|\bpython3?\b|\bnode\s+(-e|-p|--eval)|\bruby\b|\bgit\s+(checkout|restore|reset|stash|apply|am|cherry-pick|revert)\b/;
const INTERPRETER = /\bpython3?\b|\bnode\s+(-e|-p|--eval)|\bruby\b|\bperl\b|\bdeno\b|\bbun\b/;

export function riskyCommand(command) {
  if (!/claims\.js\b/.test(command)) return false;
  if (/>>?\s*["']?[^\s;&|"']*claims\.js/.test(command)) return true; // a redirect into it, quoted or not
  // Named only inside quoted text (a commit message, a grep pattern) is not a write,
  // unless a script interpreter could act on that text.
  const unquoted = command.replace(/'[^']*'|"(?:\\.|[^"\\])*"/g, "''");
  if (!/claims\.js\b/.test(unquoted) && !INTERPRETER.test(command)) return false;
  return WRITES.test(command);
}

const REFUSAL =
  "Refused by the project's attestation guard. In this project a model proposes and only David attests: " +
  "Claude must never add, change or remove `source: \"practitioner\"`, `by` or `verified` in claims.js. " +
  "Propose claims with proposedBy(...) instead, and tell David which ones are ready for him to check.";

function deny(reason) {
  return { hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: reason } };
}

export function pre(input) {
  const { tool_name: tool, tool_input: args = {} } = input;
  if (tool === "Bash") {
    return riskyCommand(args.command ?? "")
      ? deny(`${REFUSAL} Shell commands that could write to claims.js or discard edits to it are refused too; use the Edit tool so the guard can check the change.`)
      : null;
  }
  if (!args.file_path || basename(args.file_path) !== "claims.js") return null;
  let before = "";
  try {
    before = readFileSync(args.file_path, "utf8");
  } catch {
    before = "";
  }
  const after = tool === "Write" ? args.content ?? "" : applyEdit(before, args);
  if (after === null) return null; // the Edit tool will report that old_string wasn't found
  return sameFields(before, after) ? null : deny(REFUSAL);
}

const SCRIPTED = /importmap|<script|attestation-ledger@/;

export function post(input) {
  const { tool_name: tool, tool_input: args = {} } = input;
  const file = args.file_path ?? "";
  const isPage = file.endsWith(".html");
  const isLesson = /\/lessons\/lesson-\d+\.js$/.test(file);
  if (!isPage && !isLesson) return null;
  const touched = tool === "Write" ? args.content ?? "" : `${args.old_string ?? ""}\n${args.new_string ?? ""}`;
  if (!SCRIPTED.test(touched)) return null;
  return {
    hookSpecificOutput: {
      hookEventName: "PostToolUse",
      additionalContext:
        "Project hook: this edit touched the import map or an inline script. Run `npm run csp` before `npm test`, or the governance test fails on a stale Content Security Policy.",
    },
  };
}

export function count(text) {
  const live = text.split("\n").filter((line) => !/^\s*(\*|\/\/)/.test(line)).join("\n");
  return {
    attested: (live.match(/source\s*:\s*["'`]practitioner["'`]/g) ?? []).length,
    total: (live.match(/^\s*attestation\s*:/gm) ?? []).length,
  };
}

function summary() {
  try {
    const { attested, total } = count(readFileSync(CLAIMS, "utf8"));
    return `Claims attested ${attested}/${total}`;
  } catch {
    return "";
  }
}

async function stdin() {
  let data = "";
  for await (const chunk of process.stdin) data += chunk;
  try {
    return JSON.parse(data || "{}");
  } catch {
    return {};
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const mode = process.argv[2];
  const input = await stdin();
  let out = null;
  if (mode === "pre") {
    try {
      out = pre(input);
    } catch (err) {
      // Fail closed for claims.js, open for everything else.
      const path = input.tool_input?.file_path ?? input.tool_input?.command ?? "";
      if (/claims\.js\b/.test(path)) out = deny(`${REFUSAL} (The guard itself failed: ${err.message}.)`);
    }
  } else if (mode === "post") {
    out = post(input);
  } else if (mode === "status") {
    process.stdout.write(summary());
  } else if (mode === "start") {
    const line = summary();
    if (line) out = { systemMessage: `${line}. Only David attests.` };
  }
  if (out) process.stdout.write(JSON.stringify(out));
}
