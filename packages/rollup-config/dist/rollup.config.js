'use strict';

var tslib = require('tslib');
var pluginCommonjs = require('@rollup/plugin-commonjs');
var pluginJson = require('@rollup/plugin-json');
var pluginNodeResolve = require('@rollup/plugin-node-resolve');
var pluginTypescript = require('@rollup/plugin-typescript');
var pluginYaml = require('@rollup/plugin-yaml');
var jsx = require('acorn-jsx');
var path = require('path');
var pluginIncludePaths = require('rollup-plugin-includepaths');
var pluginPostCss = require('rollup-plugin-postcss');
var externalMatcher = require('./externalMatcher.js');
var getPostCssPluginConfig = require('./plugins/getPostCssPluginConfig.js');
var getTypescriptPluginConfig = require('./plugins/getTypescriptPluginConfig.js');
var warningToError = require('./warningToError.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var pluginCommonjs__default = /*#__PURE__*/_interopDefaultLegacy(pluginCommonjs);
var pluginJson__default = /*#__PURE__*/_interopDefaultLegacy(pluginJson);
var pluginNodeResolve__default = /*#__PURE__*/_interopDefaultLegacy(pluginNodeResolve);
var pluginTypescript__default = /*#__PURE__*/_interopDefaultLegacy(pluginTypescript);
var pluginYaml__default = /*#__PURE__*/_interopDefaultLegacy(pluginYaml);
var jsx__default = /*#__PURE__*/_interopDefaultLegacy(jsx);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var pluginIncludePaths__default = /*#__PURE__*/_interopDefaultLegacy(pluginIncludePaths);
var pluginPostCss__default = /*#__PURE__*/_interopDefaultLegacy(pluginPostCss);

/**
 * Create a Rollup configuration object that supports Typescript, Sass, and CSS modules
 * See `options.ts` for details on optional override params
 */
var createRollupConfig = function (options) {
    if (options === void 0) { options = {}; }
    return tslib.__awaiter(void 0, void 0, void 0, function () {
        var input, externals, exports, pkg, myExternals, preserveModulesRoot;
        return tslib.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    input = options.input, externals = options.externals, exports = options.exports;
                    return [4 /*yield*/, (function (t) { return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(t)); }); })(path__default["default"].resolve(process.cwd(), 'package.json'))];
                case 1:
                    pkg = (_a.sent());
                    myExternals = externals || tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(Object.keys(pkg.dependencies || {})), false), tslib.__read(Object.keys(pkg.peerDependencies || {})), false);
                    preserveModulesRoot = input ? path__default["default"].dirname(path__default["default"].join(process.cwd(), input)) : "".concat(process.cwd(), "/src");
                    /**
                     * Return the complete Rollup config object
                     * @see https://rollupjs.org/guide/en/#big-list-of-options
                     */
                    return [2 /*return*/, {
                            /**
                             * This block enables Rollup to understand JSX
                             * @see https://github.com/rollup/plugins/tree/master/packages/typescript#preserving-jsx-output
                             */
                            acornInjectPlugins: [jsx__default["default"]()],
                            /**
                             * This allows us to dynamically calculate externals.
                             * The use of `getBasePackage` enhances matching to include nested imports,
                             * such as importing `next/router` from the `next` package
                             * @see https://rollupjs.org/guide/en/#external
                             */
                            external: function (importPath) {
                                var basePackage = externalMatcher.getBasePackage(importPath);
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
                            onwarn: warningToError.getOnWarn(options.allowAsWarning),
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
                                pluginTypescript__default["default"](getTypescriptPluginConfig.getTypescriptPluginConfig(options)),
                                /**
                                 * Support SCSS + CSS Modules
                                 *
                                 * Note: _many_ Rollup CSS/SCSS/Style plugins were tested, and only PostCSS properly handles ordering
                                 * CSS rules in import/dependency order. Stick with postcss plugin.
                                 * @see https://github.com/egoist/rollup-plugin-postcss
                                 */
                                pluginPostCss__default["default"](getPostCssPluginConfig.getPostCssPluginConfig(options)),
                                /**
                                 * Allows us to import/require packages from `node_modules`
                                 */
                                pluginNodeResolve__default["default"](),
                                /**
                                 * Allows us to import/require CommonJS modules
                                 */
                                pluginCommonjs__default["default"](),
                                /**
                                 * Allow importing YAML as JSON / ES Module
                                 * @see https://github.com/rollup/plugins/tree/master/packages/yaml
                                 */
                                pluginYaml__default["default"](),
                                /**
                                 * Allow importing JSON as ES module
                                 * @see https://github.com/rollup/plugins/tree/master/packages/json#readme
                                 */
                                pluginJson__default["default"](),
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
                                pluginIncludePaths__default["default"]({
                                    extensions: ['.scss', '.css', '.less'],
                                    paths: ['src'],
                                }),
                            ],
                        }];
            }
        });
    });
};

module.exports = createRollupConfig;
//# sourceMappingURL=rollup.config.js.map
