import { CreateRollupConfigOptions } from '../options';
/**
 * Returns the configuration for rollup typescript plugin
 */
export declare const getTypescriptPluginConfig: ({ typescriptExclude, tsConfigPath }?: CreateRollupConfigOptions) => {
    /**
     * Exclude stories and test files
     */
    exclude: string[];
    /**
     * Compile JSX to React.CreateElement (will use external React)
     */
    jsx: string;
    /**
     * Rollup requires esnext modules
     */
    module: string;
    /**
     * This must be set to `dist` to enable output of both
     * CJS and ESM versions of the package to the same output folder
     */
    outDir: string;
    /**
     * Compile to ES5 for compatibility
     */
    target: string;
    /**
     * Load settings from project `tsconfig`
     */
    tsconfig: string;
};
