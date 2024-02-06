const plugins = require("./plugins");


module.exports = {
  releaseRules: plugins[0][1].releaseRules,
  parserOpts: {
    mergePattern: /^Merge pull request #(\d+) from (.*)$/,
    mergeCorrespondence: ["id", "source"]
  },
  branches: ['main', {name: 'beta', prerelease: true}, {name: 'alpha', prerelease: true}],
  plugins
};