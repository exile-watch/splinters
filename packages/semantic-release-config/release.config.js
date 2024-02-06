const plugins = require("./plugins");

/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  releaseRules: plugins[0][1].releaseRules,
  parserOpts: {
    mergePattern: /^Merge pull request #(\d+) from (.*)$/,
    mergeCorrespondence: ["id", "source"]
  },
  branches: ['main'],
  plugins
};