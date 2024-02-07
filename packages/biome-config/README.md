<p align="center">
  <a href="https://biomejs.dev">
    <img alt="biome logo" src="https://biomejs.dev/_astro/slogan-dark-transparent.0580f4b3_ZpPxoY.svg" width="200" />
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

Create a new configuration file at `./biome.json` and inherit all the options using `extends` property:
```json
{
  "extends": "@exile-watch/biome-config"
}
```