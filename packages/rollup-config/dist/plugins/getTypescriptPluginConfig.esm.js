/**
 * Returns the configuration for rollup typescript plugin
 */
var getTypescriptPluginConfig = function (_a) {
    var _b = _a === void 0 ? {} : _a, typescriptExclude = _b.typescriptExclude, tsConfigPath = _b.tsConfigPath;
    /**
     * Typescript support
     *
     * Settings for this plugin override any settings in `tsconfig`
     * @see https://github.com/rollup/plugins/tree/master/packages/typescript/#readme
     */
    return {
        /**
         * Exclude stories and test files
         */
        exclude: (typescriptExclude || [
            '**/*.stories.tsx',
            '**/*.stories.ts',
            '**/stories',
            '**/*.test.ts',
            '**/*.test.tsx',
            '**/test',
        ]),
        /**
         * Compile JSX to React.CreateElement (will use external React)
         */
        jsx: 'react',
        /**
         * Rollup requires esnext modules
         */
        module: 'esnext',
        /**
         * This must be set to `dist` to enable output of both
         * CJS and ESM versions of the package to the same output folder
         */
        outDir: 'dist',
        /**
         * Compile to ES5 for compatibility
         */
        target: 'es5',
        /**
         * Load settings from project `tsconfig`
         */
        tsconfig: (tsConfigPath || './tsconfig.json'),
    };
};

export { getTypescriptPluginConfig };
//# sourceMappingURL=getTypescriptPluginConfig.esm.js.map
