#!/bin/bash
function run_commitlint {
  echo $(head -n1 $1) | npx commitlint --edit --color --help-url='https://docs.exile.watch/development/commit-message-guidelines'
}