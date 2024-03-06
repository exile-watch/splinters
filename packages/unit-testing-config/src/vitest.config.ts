import { mergeConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

const defaultConfig =  {
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test-setup.tsx']
  }
}

export {defaultConfig, mergeConfig}