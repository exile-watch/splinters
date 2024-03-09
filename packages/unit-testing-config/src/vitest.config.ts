import { mergeConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import {defineConfig} from "vitest/dist/config";

const defaultConfig =  defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [
      '@testing-library/jest-dom/extend-expect',
      './test-setup.tsx'
    ]
  }
})

export {defaultConfig, mergeConfig}