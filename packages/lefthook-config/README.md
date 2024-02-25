<p align="center">
  <a href="https://github.com/evilmartians/lefthook/tree/master">
    <img alt="lefthook logo" src="https://github.com/evilmartians/lefthook/blob/master/logo_sign.svg" width="200" />
  </a>
</p>
<h1 align="center">
  <code>@exile-watch/lefthook-config</code>
</h1>

## Description

Shared `lefthook` configuration for exile.watch projects.

## About lefthook

[lefthook](https://github.com/evilmartians/lefthook/tree/master?tab=readme-ov-file#lefthook) is a Git hooks manager for Node.js, Ruby and many other types of projects.

## About this package

This package contains shared lefthook configuration, lefthook dependency and commit-related dependencies.

## Usage

1. Add/update following `config` property in repo's root `package.json`:
```jsonc
// package.json
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

2. Create a new configuration file at `./commitlint.config.js` and inherit all the options using `extends` property:
```js
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional']
};
```

3. Create `lefthook.yml` in repo root:
```yaml
remotes:
  - git_url: https://github.com/exile-watch/splinters
    configs:
      - packages/lefthook-config/lefthook.yml
```