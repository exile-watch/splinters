/**
 * Gets the base package name, including scope (if applicable) from an import path
 * @param id full import path used in an import processed by Rollup
 * @returns package name, or null if the import path is not a node_module
 * @see https://rollupjs.org/guide/en/#external
 */
export declare const getBasePackage: (id: string) => string | null;
