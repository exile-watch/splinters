#!/usr/bin/env node
import {execSync} from 'child_process'

const port = 6006
const outputDir = 'dist-storybook'

const execProps = {encoding: 'utf-8', stdio: 'inherit'}
const execAction = String(process.argv[2]) //gets 'start' or 'build' command from calling package

if (execAction === 'start') {
  execSync(`npx start-storybook --port=${port}`, execProps)
} else if (execAction === 'build') {
  execSync(`npx build-storybook --output-dir=${outputDir}`, execProps)
}