import kebabCase from 'lodash.kebabcase'
import path from 'path'
import {CreateRollupConfigOptions} from 'src/options'

/**
 * This provides a customized version of '[name]__[local]' that strips '.module' from module file name
 * @see https://github.com/madyankin/postcss-modules#generating-scoped-names
 */
export const generateScopedName = function (name: string, filename: string) {
  const moduleName = path.basename(filename).replace('.module.scss', '')
  return `${kebabCase(moduleName)}--${kebabCase(name)}`
}

/**
 * Returns the configuration for rollup postcss plugin
 */
export const getPostCssPluginConfig = ({
  cssOutputFile,
  lessOptions,
  sassIncludePaths,
}: CreateRollupConfigOptions = {}) => {
  /**
   * Support SCSS + CSS Modules
   *
   * Note: _many_ Rollup CSS/SCSS/Style plugins were tested, and only PostCSS properly handles ordering
   * CSS rules in import/dependency order. Stick with postcss plugin.
   * @see https://github.com/egoist/rollup-plugin-postcss
   */
  return {
    /**
     * Customize CSS filename or disable extraction
     * @see https://github.com/egoist/rollup-plugin-postcss#extract-css
     */
    extract:
      typeof cssOutputFile === 'boolean'
        ? cssOutputFile
        : path.resolve('dist', (cssOutputFile || 'main.css') as string),
    inject: cssOutputFile === false ? true : false,
    modules: {
      generateScopedName,
      scopeBehavior: 'local',
    },
    use: {
      less: (lessOptions || {javascriptEnabled: true}) as unknown,
      sass: {
        /**
         * This allows us to import styles from `node_modules` into SCSS files,
         * _without_ requiring a `~` prefix on the path.
         *
         * Please note that this setting works _with_ the rollup `includePaths` plugin - it does not replace the need for it
         * @see https://anidetrix.github.io/rollup-plugin-styles/interfaces/loaders_sass.sassloaderoptions.html#includepaths
         */
        includePaths: (sassIncludePaths || ['src', 'node_modules']) as string[],
      },
      stylus: false,
    },
  }
}