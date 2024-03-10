import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

const defaultConfig = defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [
      '@testing-library/jest-dom',
      '@exile-watch/unit-testing-config/dist/test-setup.mjs'
    ]
  }
})

export {defaultConfig}