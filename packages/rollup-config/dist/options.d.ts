import { OutputOptions } from 'rollup';
import type { UpgradedWarning } from './warningToError';
export interface CreateRollupConfigOptions {
    /**
     * Primary index file for the library
     * Equivalent to Webpack's `entry`
     *
     * @default 'src/index.ts'
     * @see https://rollupjs.org/guide/en/#input
     */
    input?: string;
    /**
     * Optional override for name of CSS output file, if the package includes CSS
     * Path starts within the dist folder.
     *
     * To disable CSS extraction and instead enable style injection, set this to the boolean value `false`
     *
     * @default 'main.css'
     * @see https://github.com/egoist/rollup-plugin-postcss#extract
     */
    cssOutputFile?: string | boolean;
    /**
     * Optional - Array of paths that should be checked for SCSS imports. This enables
     * importing SCSS from node_modules without the use of a `~` prefix.
     *
     * Generally only needs customizing for packages within a monorepo, which
     * may need access to packages in the parent folder
     *
     * @default ['src', 'node_modules']
     * @see https://github.com/dot-build/rollup-plugin-includepaths#paths--
     */
    sassIncludePaths?: string[];
    /**
     * Optional override for Typescript exclusion patterns. Use to exclude non-standard
     * stories or unit tests, or enable exporting from folders that are normally excluded
     * @default ['**\/*.stories.tsx', '**\/*.stories.ts', '**\/stories', '**\/*.test.ts', '**\/*.test.tsx', '**\/test']
     * @see https://github.com/rollup/plugins/tree/master/packages/typescript/#exclude
     */
    typescriptExclude?: string[];
    /**
     * Optional override for project Typescript config path
     *
     * @default './tsconfig.json'
     * @see https://github.com/rollup/plugins/tree/master/packages/typescript/#tsconfig
     */
    tsConfigPath?: string;
    /**
     * Optional override for externals to be stripped from the bundle
     * Use with care - externals are calculated automatically, any options
     * passed in here will REPLACE default externals
     * @default [...pkg.dependencies, ...pkg.peerDependencies]
     * @see https://rollupjs.org/guide/en/#external
     */
    externals?: string[];
    /**
     * Optional override for Rollup output.exports option.
     * May need to be adjusted depending on whether your library uses named or default exports
     *
     * @default 'auto'
     * @see https://rollupjs.org/guide/en/#outputexports
     */
    exports?: OutputOptions['exports'];
    /**
     * Override Less options object
     * @see https://github.com/egoist/rollup-plugin-postcss#use
     */
    lessOptions?: unknown;
    /**
     * Our configuration upgrades certain Rollup warnings to errors, for consistency with
     * the Webpack behaviors that many developers are used to. However,in some cases, we
     * may make an educated decision to allow them through. Use this option to _disable_
     * the upgrading of warnings to errors for specific warning types.
     * @see https://rollupjs.org/guide/en/#onwarn for all warning types
     * @see warningToError.ts for list of warning types upgraded by default
     */
    allowAsWarning?: UpgradedWarning[];
}
