#!/usr/bin/env node
const {execSync} = require('child_process')
const path = require('path')

const port = 6006
const outputDir = 'dist-storybook'

const execProps = {encoding: 'utf-8', stdio: 'inherit'}
const execAction = String(process.argv[2]) //gets 'start' or 'build' command from calling package
const sbConfigDir = path.join(__dirname, '.storybook')

if (execAction === 'start') {
  execSync(`npx storybook dev --port=${port} --config-dir=${sbConfigDir}`, execProps)
} else if (execAction === 'build') {
  execSync(`npx build-storybook --output-dir=${outputDir}`, execProps)
}