import { __awaiter, __generator, __spreadArray, __read } from 'tslib';
import pluginCommonjs from '@rollup/plugin-commonjs';
import pluginJson from '@rollup/plugin-json';
import pluginNodeResolve from '@rollup/plugin-node-resolve';
import pluginTypescript from '@rollup/plugin-typescript';
import pluginYaml from '@rollup/plugin-yaml';
import jsx from 'acorn-jsx';
import path from 'path';
import pluginIncludePaths from 'rollup-plugin-includepaths';
import pluginPostCss from 'rollup-plugin-postcss';
import { getBasePackage } from './externalMatcher.esm.js';
import { getPostCssPluginConfig } from './plugins/getPostCssPluginConfig.esm.js';
import { getTypescriptPluginConfig } from './plugins/getTypescriptPluginConfig.esm.js';
import { getOnWarn } from './warningToError.esm.js';

/**
 * Create a Rollup configuration object that supports Typescript, Sass, and CSS modules
 * See `options.ts` for details on optional override params
 */
var createRollupConfig = function (options) {
    if (options === void 0) { options = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var input, externals, exports, pkg, myExternals, preserveModulesRoot;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    input = options.input, externals = options.externals, exports = options.exports;
                    return [4 /*yield*/, import(path.resolve(process.cwd(), 'package.json'))];
                case 1:
                    pkg = (_a.sent());
                    myExternals = externals || __spreadArray(__spreadArray([], __read(Object.keys(pkg.dependencies || {})), false), __read(Object.keys(pkg.peerDependencies || {})), false);
                    preserveModulesRoot = input ? path.dirname(path.join(process.cwd(), input)) : "".concat(process.cwd(), "/src");
                    /**
                     * Return the complete Rollup config object
                     * @see https://rollupjs.org/guide/en/#big-list-of-options
                     */
                    return [2 /*return*/, {
                            /**
                             * This block enables Rollup to understand JSX
                             * @see https://github.com/rollup/plugins/tree/master/packages/typescript#preserving-jsx-output
                             */
                            acornInjectPlugins: [jsx()],
                            /**
                             * This allows us to dynamically calculate externals.
                             * The use of `getBasePackage` enhances matching to include nested imports,
                             * such as importing `next/router` from the `next` package
                             * @see https://rollupjs.org/guide/en/#external
                             */
                            external: function (importPath) {
                                var basePackage = getBasePackage(importPath);
                                if (!basePackage || basePackage === importPath) {
                                    return myExternals.includes(importPath);
                                }
                                else {
                                    return myExternals.includes(importPath) || myExternals.includes(basePackage);
                                }
                            },
                            /**
                             * The main library file to bundle. Equivalent to webpack's 'entry'
                             * @see https://rollupjs.org/guide/en/#input
                             */
                            input: input || 'src/index.ts',
                            /**
                             * This upgrades selected Rollup warnings to Errors, due to their impacts on
                             * the final bundle. All other warnings will be reported as usual.
                             *
                             * Use option `allowAsWarning` to disable this upgrading for specific error types,
                             * if needed in your project.
                             *
                             * @see https://rollupjs.org/guide/en/#onwarn
                             * @see warningToError.ts
                             */
                            onwarn: getOnWarn(options.allowAsWarning),
                            /**
                             * Configure output formats
                             *
                             * Note: `assetFileNames` is used by `styles` plugin to name & locate CSS output. Required in all output configs.
                             * @see https://rollupjs.org/guide/en/#outputfile
                             */
                            output: [
                                /**
                                 * Outputs CommonJS version with `js` extension
                                 */
                                {
                                    assetFileNames: '[name][extname]',
                                    /**
                                     * Using output.dir retains the original modular structure of the src folder
                                     * @see https://rollupjs.org/guide/en/#outputpreservemodules
                                     */
                                    dir: 'dist',
                                    exports: exports || 'auto',
                                    format: 'cjs',
                                    preserveModules: true,
                                    preserveModulesRoot: preserveModulesRoot,
                                    sourcemap: true,
                                },
                                /**
                                 * Outputs ES Modules version with `.esm.js` extension
                                 */
                                {
                                    assetFileNames: '[name][extname]',
                                    chunkFileNames: '[name]-[hash].esm.js',
                                    dir: 'dist',
                                    entryFileNames: '[name].esm.js',
                                    exports: exports || 'auto',
                                    format: 'es',
                                    preserveModules: true,
                                    preserveModulesRoot: preserveModulesRoot,
                                    sourcemap: true,
                                },
                            ],
                            /********************************************
                             * Configure Plugins
                             ********************************************/
                            plugins: [
                                /**
                                 * Typescript support
                                 *
                                 * Settings for this plugin override any settings in `tsconfig`
                                 * @see https://github.com/rollup/plugins/tree/master/packages/typescript/#readme
                                 */
                                pluginTypescript(getTypescriptPluginConfig(options)),
                                /**
                                 * Support SCSS + CSS Modules
                                 *
                                 * Note: _many_ Rollup CSS/SCSS/Style plugins were tested, and only PostCSS properly handles ordering
                                 * CSS rules in import/dependency order. Stick with postcss plugin.
                                 * @see https://github.com/egoist/rollup-plugin-postcss
                                 */
                                pluginPostCss(getPostCssPluginConfig(options)),
                                /**
                                 * Allows us to import/require packages from `node_modules`
                                 */
                                pluginNodeResolve(),
                                /**
                                 * Allows us to import/require CommonJS modules
                                 */
                                pluginCommonjs(),
                                /**
                                 * Allow importing YAML as JSON / ES Module
                                 * @see https://github.com/rollup/plugins/tree/master/packages/yaml
                                 */
                                pluginYaml(),
                                /**
                                 * Allow importing JSON as ES module
                                 * @see https://github.com/rollup/plugins/tree/master/packages/json#readme
                                 */
                                pluginJson(),
                                /**
                                 * Required to support absolute/root imports of SCSS & CSS modules
                                 * Works along with `styles` plugin (which has no way to set baseUrls)
                                 *
                                 * This is necessary because of the disconnect between TypeScript and CSS modules
                                 * Our CSS module typings are generic and apply to any path, so TS is not actually
                                 * _validating_ the presence of a given CSS/SCSS import. Regardless, we need to support
                                 * import paths for SCSS that align with how we import JS, TS, JSON, etc
                                 *
                                 * Since styles do not inherit the `baseUrl` or `include` paths of a Typescript config,
                                 * we need another way for the Rollup Styles plugin to be able to resolve absolute root-relative imports
                                 */
                                pluginIncludePaths({
                                    extensions: ['.scss', '.css', '.less'],
                                    paths: ['src'],
                                }),
                            ],
                        }];
            }
        });
    });
};

export { createRollupConfig as default };
//# sourceMappingURL=rollup.config.esm.js.map
