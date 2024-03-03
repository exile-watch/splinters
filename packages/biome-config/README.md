<p align="center">
  <a href="https://biomejs.dev">
    <img alt="biome logo" src="./biome.svg" width="200" />
  </a>
</p>
<h1 align="center">
  <code>@exile-watch/biome-config</code>
</h1>

## Description

Shared `Biome` configuration for exile.watch frontend projects.

## About Biome

[Biome](https://biomejs.dev/) is a fast formatter and a performant linter for JavaScript, TypeScript, and JSX.

## About this package

This package contains both, shared Biome configuration and the Biome dependency itself.

## Usage

1. Install `@exile-watch/biome-config` as a `devDependency` in project's root dir
```bash
$: npm i -D @exile-watch/biome-config
```

2. Create a new configuration file at `./biome.json` and inherit all the options using `extends` property:
```json
{
  "extends": "@exile-watch/biome-config"
}
```