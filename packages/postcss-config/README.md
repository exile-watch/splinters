<p align="center">
  <a href="https://postcss.org/">
    <img alt="postcss logo" src="./postcss.svg" width="200" />
  </a>
</p>
<h1 align="center">
  <code>@exile-watch/postcss-config</code>
</h1>

## Description

Shared `Post CSS` configuration for [exile.watch](https://github.com/exile-watch) projects.

## About PostCSS

[PostCSS](https://postcss.org/) is a tool for transforming CSS with JavaScript

## About this package

This package contains both, shared PostCSS configuration and PostCSS related dependencies itself.

## Usage

1. Install `@exile-watch/postcss-config` as a `devDependency` in project's root dir
```bash
$: npm i -D @exile-watch/postcss-config
```


2. In the project’s `postcss.config.js` file, add the following content:

```js
// postcss.config.js

const sharedPostCSSconfig = require('@exile-watch/postcss-config')
module.exports = sharedPostCSSconfig
```