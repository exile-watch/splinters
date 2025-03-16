const version = "${version}";
const packageName = process.env.npm_package_name;
const repo = process.env.repo;
const scope = packageName.split("/")[1];

module.exports = {
  plugins: {
    "@release-it/conventional-changelog": {
      path: ".",
      infile: "CHANGELOG.md",
      preset: "conventionalcommits",
      gitRawCommitsOpts: {
        path: ".",
      },
    },
  },
  git: {
    push: true,
    tagName: `${packageName}@${version}`,
    pushRepo: `git@github.com:exile-watch/${repo}.git`,
    commitsPath: ".",
    commitMessage: `feat(${scope}): released version v${version} [skip ci]`,
    requireCommits: true,
    requireCommitsFail: false,
  },
  npm: {
    publish: false,
    versionArgs: ["--workspaces false"],
  },
  github: {
    release: true,
    releaseName: `${packageName}-v${version}`,
  },
  // hooks: {
  //   'before:git:release': [
  //     'mvm-update',
  //     'git add --all',
  //   ],
  // },
};
