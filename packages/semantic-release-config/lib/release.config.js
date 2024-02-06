const baseCommitPreset = {
  parserOpts: {
    noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
  },
  preset: 'conventionalcommits',
}

module.exports = {
  branches: ['main'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        ...baseCommitPreset,
        releaseRules: [
          {breaking: true, release: 'major'},
          {revert: true, release: 'patch'},
          {type: 'feat', release: 'minor'},
          {type: 'fix', release: 'patch'},
          {type: 'docs', release: 'patch'},
          {type: 'style', release: 'patch'},
          {type: 'refactor', release: 'patch'},
          {type: 'perf', release: 'patch'},
          {type: 'test', release: 'patch'},
          {type: 'build', release: 'patch'},
          {type: 'ci', release: 'patch'},
          {type: 'chore', release: 'patch'},
        ],
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        ...baseCommitPreset,
        presetConfig: {
          types: [
            {section: 'Features', type: 'feat'},
            {section: 'Bug Fixes', type: 'fix'},
            {section: 'Documentation', type: 'docs'},
            {section: 'Code Quality', type: 'style'},
            {section: 'Code Quality', type: 'refactor'},
            {section: 'Code Quality', type: 'perf'},
            {section: 'Code Quality', type: 'test'},
            {section: 'Build & Deploy', type: 'build'},
            {section: 'Build & Deploy', type: 'ci'},
            {section: 'Internal', type: 'chore'},
          ],
        },
      },
    ],
    '@semantic-release/changelog',
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        assets: [
          'CHANGELOG.md',
          'package.json',
          'package-lock.json'
        ],
        message: 'chore(bump-version): ${nextRelease.version} [skip ci]',
      },
    ],
    '@semantic-release/github',
  ],
}