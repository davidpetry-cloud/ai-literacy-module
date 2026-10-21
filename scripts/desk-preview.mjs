// A look at the attestation desk's page without the real sign-off file (`npm run desk:preview`), for checking
// its design in both themes and at phone widths. It runs on port 8092 against a throwaway copy in the system's
// temp folder, says "Preview" across the top, and is never the way to attest: that is `npm run attest`.

import { mkdtempSync, copyFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createDesk } from "./attest.mjs";

const PORT = 8092;
const dir = mkdtempSync(join(tmpdir(), "desk-preview-"));
const file = join(dir, "attestations.js");
copyFileSync(fileURLToPath(new URL("../attestations.js", import.meta.url)), file);

const desk = await createDesk({ file, port: PORT, preview: true, log: () => {} });
desk.listen(PORT, "127.0.0.1", () => console.log(`Desk preview (a scratch copy; nothing is saved): http://127.0.0.1:${PORT}/`));
for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => (rmSync(dir, { recursive: true, force: true }), process.exit(0)));
