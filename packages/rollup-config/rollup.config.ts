import createRollupConfig from './src/rollup.config'

export default createRollupConfig({
  input: 'src/rollup.config.ts',
  outputFormats: ['cjs', 'esm']
})