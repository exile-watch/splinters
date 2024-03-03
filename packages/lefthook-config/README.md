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

> [!NOTE]
> Make sure your repo has [@exile-watch/biome-config](https://github.com/exile-watch/splinters/tree/main/packages/biome-config) and [@exile-watch/typescript-config](https://github.com/exile-watch/splinters/tree/main/packages/typescript-config) installed, as commands are utilizing binaries from those packages

1. Install `@exile-watch/lefthook-config` as a `devDependency` in project's root dir
```bash
$: npm i -D @exile-watch/lefthook-config
```

2. Add/update following `config` and `scripts` properties in repo's root `package.json`:
```jsonc
// package.json
{
  "scripts": {
    "lint": ...,        // "exit 0" if linting is not set
    "lint:apply": ...,  // "exit 0" if linting is not set
    "format": ...       // "exit 0" if formatting is not set
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

3. Create a new configuration file at `./commitlint.config.js` and inherit all the options using `extends` property:
```js
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional']
};
```

4. In project root in `lefthook.yml` replace generated content with:
```yaml
remotes:
  - git_url: https://github.com/exile-watch/splinters
    configs:
      - packages/lefthook-config/lefthook.yml
```

5. Run `npx lefthook install` to sync lefthook configs

> [!CAUTION]
> This step syncs lefthook configs
> 
> Skipping this step after initial setup will throw `commitlint.sh (skip) not specified in config file` message

> [!WARNING]
> Every new minor version bump in your app will require `npx lefthook install` to sync configs