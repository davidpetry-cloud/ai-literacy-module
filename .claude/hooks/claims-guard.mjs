// Project hooks for Claude Code sessions (wired up in .claude/settings.json).
//
//   pre     PreToolUse on Edit|Write|Bash. "A model proposes. Only David attests."
//           Refuses any Claude edit that adds, changes or removes an attestation
//           field in claims.js (source: "practitioner", by, verified), and any shell
//           command that could write to claims.js or throw away uncommitted edits.
//           David edits claims.js by hand, so nothing here gets in his way.
//           The attestation desk (2026-10-21): attestations.js is written only by the desk
//           (`npm run attest`), which David runs himself, so Claude may not edit that file
//           at all, start the desk (in a shell or the terminal panel), or open it in a browser.
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
const DESK_PORT = 8091;

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

export function riskyCommand(command, name = "claims") {
  const file = new RegExp(`\\b${name}\\.js\\b`);
  if (!file.test(command)) return false;
  if (new RegExp(`>>?\\s*["']?[^\\s;&|"']*${name}\\.js`).test(command)) return true; // a redirect into it, quoted or not
  // Named only inside quoted text (a commit message, a grep pattern) is not a write,
  // unless a script interpreter could act on that text.
  const unquoted = command.replace(/'[^']*'|"(?:\\.|[^"\\])*"/g, "''");
  if (!file.test(unquoted) && !INTERPRETER.test(command)) return false;
  return WRITES.test(command);
}

// Starting the attestation desk is David's job alone. Running its tests (tests/attest.test.js) is fine.
// Reading the desk's code (grep, cat, git diff) is fine too; only running it is refused.
// Quoted text (a commit message) is only text, unless a shell or interpreter could run it.
const DESK = /\bnpm\s+(run(-script)?\s+)?attest(?![\w:.-])|\b(node|bun|deno|npx|tsx)\b[^;&|]*\battest\.mjs\b|(^|[;&|]\s*)\.?\/?scripts\/attest\.mjs\b/;
export const startsDesk = (command) => {
  const runsText = INTERPRETER.test(command) || /\b(sh|bash|zsh)\s+(-\w+\s+)*-c\b|\beval\b|\bxargs\b|\bosascript\b/.test(command);
  return DESK.test(runsText ? command : command.replace(/'[^']*'|"(?:\\.|[^"\\])*"/g, "''"));
};

const REFUSAL =
  "Refused by the project's attestation guard. In this project a model proposes and only David attests: " +
  "Claude must never add, change or remove `source: \"practitioner\"`, `by` or `verified` in claims.js. " +
  "Propose claims with proposedBy(...) instead, and tell David which ones are ready for him to check.";

const DESK_REFUSAL =
  "Refused by the project's attestation guard. attestations.js is written only by the attestation desk, " +
  "and only David runs the desk (`npm run attest`) or uses its page. Claude may not edit that file, start the desk, " +
  "or open the desk in a browser. Tell David which claims are ready for him to check instead.";

function deny(reason) {
  return { hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: reason } };
}

export function pre(input) {
  const { tool_name: tool, tool_input: args = {} } = input;
  if (/^mcp__(Claude_Browser|claude-in-chrome)__/.test(tool)) {
    return new RegExp(`(127\\.0\\.0\\.1|localhost|\\[::1\\]|0\\.0\\.0\\.0):${DESK_PORT}\\b`).test(JSON.stringify(args)) ? deny(DESK_REFUSAL) : null;
  }
  if (tool === "mcp__terminal__run_in_terminal") {
    const command = args.command ?? JSON.stringify(args);
    return startsDesk(command) || riskyCommand(command, "attestations") || riskyCommand(command) ? deny(DESK_REFUSAL) : null;
  }
  if (tool === "Bash") {
    const command = args.command ?? "";
    if (startsDesk(command) || riskyCommand(command, "attestations")) return deny(DESK_REFUSAL);
    return riskyCommand(command)
      ? deny(`${REFUSAL} Shell commands that could write to claims.js or discard edits to it are refused too; use the Edit tool so the guard can check the change.`)
      : null;
  }
  if (args.file_path && basename(args.file_path) === "attestations.js") return deny(DESK_REFUSAL);
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

// The count the site itself shows: claims.js with the desk's sign-offs applied, judged by the ledger
// (so a lapsed sign-off isn't counted). Falls back to reading claims.js as text if that can't load.
async function summary() {
  try {
    const { pathToFileURL } = await import("node:url");
    const { CLAIMS: claims } = await import(`${pathToFileURL(CLAIMS).href}?v=${Date.now()}`);
    const { resolveStatus } = await import(pathToFileURL(join(ROOT, "node_modules/attestation-ledger/src/index.js")).href);
    const all = Object.values(claims);
    return `Claims attested ${all.filter((c) => resolveStatus(c) === "attested").length}/${all.length}`;
  } catch {
    try {
      const { attested, total } = count(readFileSync(CLAIMS, "utf8"));
      return `Claims attested ${attested}/${total}`;
    } catch {
      return "";
    }
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
      // Fail closed for claims.js, attestations.js and the desk; open for everything else.
      const path = JSON.stringify(input.tool_input ?? {});
      if (/claims\.js\b|attestations\.js\b|attest\.mjs\b|attest\b|:8091\b/.test(path)) out = deny(`${REFUSAL} (The guard itself failed: ${err.message}.)`);
    }
  } else if (mode === "post") {
    out = post(input);
  } else if (mode === "status") {
    process.stdout.write(await summary());
  } else if (mode === "start") {
    const line = await summary();
    if (line) out = { systemMessage: `${line}. Only David attests.` };
  }
  if (out) process.stdout.write(JSON.stringify(out));
}
