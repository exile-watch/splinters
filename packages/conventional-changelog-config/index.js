let configModule;

try {
  configModule = require("conventional-changelog-conventionalcommits");
} catch (err) {
  // If the module is an ES Module, use dynamic import() as a fallback.
  if (err.code === "ERR_REQUIRE_ESM") {
    configModule = async () =>
      (await import("conventional-changelog-conventionalcommits")).default;
  } else {
    throw err;
  }
}

module.exports = configModule({
  commitUrlFormat: "{{host}}/{{owner}}/{{repository}}/commit/{{hash}}",
  compareUrlFormat:
    "{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}",
  types: [
    {
      section: "✨ Features",
      type: "feat",
    },
    {
      section: "🐞 Bug Fixes",
      type: "fix",
    },
    {
      section: "📄 Documentation",
      type: "docs",
    },
    {
      section: "⚙️ Internal",
      type: "chore",
    },
    {
      section: "⚙️ Code Quality",
      type: "style",
    },
    {
      section: "⚙️ Code Quality",
      type: "refactor",
    },
    {
      section: "⚙️ Code Quality",
      type: "perf",
    },
    {
      section: "🤖 CI/CD",
      type: "test",
    },
    {
      section: "🤖 CI/CD",
      type: "ci",
    },
    {
      section: "🤖 CI/CD",
      type: "build",
    },
  ],
  userUrlFormat: "{{host}}/{{user}}",
});
