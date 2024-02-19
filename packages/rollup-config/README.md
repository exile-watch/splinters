<p align="center">
  <a href="https://rollupjs.org/">
    <img alt="rollup logo" src="./rollup-logo.svg" width="200" />
  </a>
</p>
<h1 align="center">
  <code>@exile-watch/rollup-config</code>
</h1>

## Description

Shared `Rollup` configuration for exile.watch frontend projects.

## About Rollup

[Rollup](https://rollupjs.org/) is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application.

## About this package

This package contains both, shared Rollup configuration and the Rollup dependency itself.

## Usage

1. Create a new configuration file at `./rollup.config.ts`:
```ts
// rollup.config.ts

import createRollupConfig from '@exile-watch/rollup-config'

export default createRollupConfig()
```

2. Add `build` script to `package.json`
```json
{
  "build": "rollup -c"
}
```