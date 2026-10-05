// Starts whichever page this is (hub, lesson or sources). A file, not an inline script,
// so the Content Security Policy can forbid inline code.
import { boot } from "./lesson-core.js";
boot(document);
