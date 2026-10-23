// Run only this checkout's tests. Claude Code keeps session worktrees under .claude/worktrees, each a full
// copy of the project; without this, their tests run too, and two copies of the desk tests collide on a port.
import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, ".claude/**"]
  }
});
