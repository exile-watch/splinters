const config = require('conventional-changelog-conventionalcommits')

module.exports = config({
  commitUrlFormat: '{{host}}/{{owner}}/{{repository}}/commit/{{hash}}',
  compareUrlFormat: '{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}',
  types: [
    {
      section: '✨ Features',
      type: 'feat',
    },
    {
      section: '🐞 Bug Fixes',
      type: 'fix',
    },
    {
      section: '📄 Documentation',
      type: 'docs',
    },
    {
      section: '⚙️ Internal',
      type: 'chore',
    },
    {
      section: '⚙️ Code Quality',
      type: 'style',
    },
    {
      section: '⚙️ Code Quality',
      type: 'refactor',
    },
    {
      section: '⚙️ Code Quality',
      type: 'perf',
    },
    {
      section: '🤖 CI/CD',
      type: 'test',
    },
    {
      section: '🤖 CI/CD',
      type: 'ci',
    },
    {
      section: '🤖 CI/CD',
      type: 'build',
    },
  ],
  userUrlFormat: '{{host}}/{{user}}',
})