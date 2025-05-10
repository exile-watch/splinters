import { type UserConfig, defineConfig } from "vite";
import libConfig from "./configs/lib-config";

type ViteConfigProps = {
  type?: "lib" | "app";
  dirname?: string;
} & Partial<UserConfig>;

export default function viteConfig({
  type = "lib",
  dirname = import.meta.url,
  ...config
}: ViteConfigProps): UserConfig {
  return defineConfig(type === "lib" ? libConfig({ dirname, config }) : {});
}
