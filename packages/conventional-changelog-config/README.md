<p align="center">
  <a href="https://github.com/conventional-changelog/conventional-changelog">
    <img alt="exile.watch logo" src="https://avatars.githubusercontent.com/u/158840748?s=400&u=4c73ba2a9a2ebc70b01c6303d41e8571df84ec37&v=4" width="300" />
  </a>
</p>
<h1 align="center">
  <code>@exile-watch/conventional-changelog-config</code>
</h1>

## Description

Shared `Conventional Changelog` configuration for [exile.watch](https://github.com/exile-watch) projects.

## About Conventional Changelog

[Conventional Changelog](https://github.com/conventional-changelog/conventional-changelog) generates a CHANGELOG from git metadata.

## About this package

This package contains both, shared Conventional Changelog configuration and the Conventional Changelog dependency itself.

## Usage

Install `@exile-watch/conventional-changelog-config` as a `devDependency` in project's root dir.

In the project’s `lerna.json` file, add the following content:

```json
{
  "command": {
    "version": {
      "changelogPreset": "@exile-watch/conventional-changelog-config"
    }
  }
}
```