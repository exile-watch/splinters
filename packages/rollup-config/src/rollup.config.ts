import pluginCommonjs from '@rollup/plugin-commonjs'
import pluginJson from '@rollup/plugin-json'
import pluginNodeResolve from '@rollup/plugin-node-resolve'
import pluginTypescript from '@rollup/plugin-typescript'
import pluginYaml from '@rollup/plugin-yaml'
import {JSONSchemaForNPMPackageJsonFiles} from '@schemastore/package'
import jsx from 'acorn-jsx'
import path from 'path'
import {RollupOptions} from 'rollup'
import pluginIncludePaths from 'rollup-plugin-includepaths'
import pluginPostCss from 'rollup-plugin-postcss'

import {getBasePackage} from './externalMatcher'
import {CreateRollupConfigOptions} from './options'
import {getPostCssPluginConfig} from './plugins/getPostCssPluginConfig'
import {getTypescriptPluginConfig} from './plugins/getTypescriptPluginConfig'
import {getOnWarn} from './warningToError'

/**
 * Schemastore package.json types do not accept valid strings for the
 * 'homepage' field, so we'll customize this type a bit
 */
export interface PackageJSON extends Omit<JSONSchemaForNPMPackageJsonFiles, 'homepage'> {
  homepage?: string
}

/**
 * Create a Rollup configuration object that supports Typescript, Sass, and CSS modules
 * See `options.ts` for details on optional override params
 */
const createRollupConfig = async (options: CreateRollupConfigOptions = {}): Promise<RollupOptions> => {
  const {input, externals, exports} = options

  /**
   * Retrieve the package.json file of the consumer
   */
  const pkg = (await import(path.resolve(process.cwd(), 'package.json'))) as PackageJSON

  /**
   * Dynamically calculate externals
   * All dependencies and peerDependencies will be stripped from the bundle
   */

  const myExternals = externals || [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})]

  /**
   * Set the expected root folder for module code,
   * which ensures package module output will resolve
   * to the root of the `dist` folder
   *
   * If custom `input` is supplied, this resolves to the
   * folder that contains the custom input file
   */
  const preserveModulesRoot = input ? path.dirname(path.join(process.cwd(), input)) : `${process.cwd()}/src`

  /**
   * Return the complete Rollup config object
   * @see https://rollupjs.org/guide/en/#big-list-of-options
   */
  return {
    /**
     * This block enables Rollup to understand JSX
     * @see https://github.com/rollup/plugins/tree/master/packages/typescript#preserving-jsx-output
     */
    acornInjectPlugins: [jsx() as () => unknown],

    /**
     * This allows us to dynamically calculate externals.
     * The use of `getBasePackage` enhances matching to include nested imports,
     * such as importing `next/router` from the `next` package
     * @see https://rollupjs.org/guide/en/#external
     */
    external: (importPath: string) => {
      const basePackage = getBasePackage(importPath)
      if (!basePackage || basePackage === importPath) {
        return myExternals.includes(importPath)
      } else {
        return myExternals.includes(importPath) || myExternals.includes(basePackage)
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
        preserveModulesRoot,
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
        preserveModulesRoot,
        sourcemap: true,
      },
    ],

    preserveSymlinks: true,

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
        extensions: ['.scss', '.css'],
        paths: ['src'],
      }),
    ],
  }
}

export default createRollupConfig