import createRollupConfig from '@exile-watch/rollup-config'

export default createRollupConfig({
  outputFormats: ['module'],
  externals: ["@exile-watch/writ-react"]
})