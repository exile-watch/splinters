import {defineWorkspace, mergeConfig, defineConfig} from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

const defaultConfig = defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test-setup.tsx']
  }
})

export {defaultConfig, mergeConfig}