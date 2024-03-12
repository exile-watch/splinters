import { defineConfig, UserConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import {PluginOption} from "vite";

const defaultConfig = (config?: UserConfig) => defineConfig({
  ...config,
  plugins: [
    ...config?.plugins as PluginOption[],
    tsconfigPaths()
  ],
  test: {
    ...config?.test,
    globals: true,
    environment: 'jsdom',
    setupFiles: [
      ...config?.test?.setupFiles as string | string[],
      '@testing-library/jest-dom',
      '@exile-watch/unit-testing-config/dist/test-setup.mjs'
    ]
  }
})

export {defaultConfig}