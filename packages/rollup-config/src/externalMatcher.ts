/**
 * This regex boils down an import path to its top-level package name,
 * including scope if present. This augments our ability to automatically pare
 * externals by matching with `dependencies` and `peerDependencies`,
 * even if a given import reaches into a deeply-nested package path.
 * @see https://rollupjs.org/guide/en/#external
 */
const basePackageMatcher = /^(@(\w[-.]?)+\/)?(\w[-.]?)+/gm

/**
 * Gets the base package name, including scope (if applicable) from an import path
 * @param id full import path used in an import processed by Rollup
 * @returns package name, or null if the import path is not a node_module
 * @see https://rollupjs.org/guide/en/#external
 */
export const getBasePackage = (id: string) => {
  const basePackageMatches = id.match(basePackageMatcher)
  return basePackageMatches && basePackageMatches[0]
}