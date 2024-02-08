import { CreateRollupConfigOptions } from 'src/options';
/**
 * This provides a customized version of '[name]__[local]' that strips '.module' from module file name
 * @see https://github.com/madyankin/postcss-modules#generating-scoped-names
 */
export declare const generateScopedName: (name: string, filename: string) => string;
/**
 * Returns the configuration for rollup postcss plugin
 */
export declare const getPostCssPluginConfig: ({ cssOutputFile, lessOptions, sassIncludePaths, }?: CreateRollupConfigOptions) => {
    /**
     * Customize CSS filename or disable extraction
     * @see https://github.com/egoist/rollup-plugin-postcss#extract-css
     */
    extract: string | boolean;
    inject: boolean;
    modules: {
        generateScopedName: (name: string, filename: string) => string;
        scopeBehavior: string;
    };
    use: {
        less: unknown;
        sass: {
            /**
             * This allows us to import styles from `node_modules` into SCSS files,
             * _without_ requiring a `~` prefix on the path.
             *
             * Please note that this setting works _with_ the rollup `includePaths` plugin - it does not replace the need for it
             * @see https://anidetrix.github.io/rollup-plugin-styles/interfaces/loaders_sass.sassloaderoptions.html#includepaths
             */
            includePaths: string[];
        };
        stylus: boolean;
    };
};
