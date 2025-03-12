import viteConfig from "@exile-watch/vite-config";
import type { UserConfig } from "vite";

export default viteConfig({
  dirname: import.meta.url,
  build: {
    rollupOptions: {
      external: [/^@testing-library/],
    },
  },
}) as UserConfig;
