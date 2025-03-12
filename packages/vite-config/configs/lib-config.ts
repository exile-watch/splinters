import path from "node:path";
import { fileURLToPath } from "node:url";
import { type UserConfig, defineConfig, mergeConfig } from "vite";
import dts from "vite-plugin-dts";
import baseConfig from "./base-config";

type LibConfigProps = {
  dirname?: string;
  config?: UserConfig;
};

const libConfig = ({
  dirname = import.meta.url,
  config = {},
}: LibConfigProps): UserConfig =>
  defineConfig(
    mergeConfig(
      baseConfig,
      mergeConfig(
        {
          build: {
            lib: {
              entry: path.resolve(fileURLToPath(dirname), "../src/index.ts"),
              formats: ["es"],
              fileName: (format: string) => `index.${format}.js`, // Output filename
            },
            rollupOptions: {
              external: [
                /^vite/,
                /^node/,
                /^@exile-watch/,
                /^react/,
                "path",
                "os",
                "fs",
                "module",
                "util",
              ],
              output: {
                globals: {
                  react: "React",
                  "react-dom": "ReactDOM",
                },
              },
            },
          },
          plugins: [dts()],
        },
        config,
      ),
    ),
  );

export default libConfig;
