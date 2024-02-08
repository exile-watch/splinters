import {RollupWarning, WarningHandler} from 'rollup'

/**
 * The following list contains Rollup warning types that will be upgraded to Errors,
 * causing build failure. This brings Rollup's behavior more in line with Webpack and
 * other tools that our devs are used to.
 *
 * These are typed to enable code hints for available error types when setting up configs
 *
 * Tip: to find all available warning codes, search `code: '` in the Rollup repository
 *
 * @see https://rollupjs.org/guide/en/#onwarn
 */
export type UpgradedWarning =
  | 'CIRCULAR_DEPENDENCY'
  | 'CYCLIC_CROSS_CHUNK_REEXPORT'
  | 'MISSING_EXPORT'
  | 'NON_EXISTENT_EXPORT'
  | 'UNKNOWN_OPTION'
  | 'UNRESOLVED_IMPORT'
  | 'UNUSED_EXTERNAL_IMPORT'

export const warningsToErrors: UpgradedWarning[] = [
  'CIRCULAR_DEPENDENCY',
  'CYCLIC_CROSS_CHUNK_REEXPORT',
  'MISSING_EXPORT',
  'NON_EXISTENT_EXPORT',
  'UNKNOWN_OPTION',
  'UNRESOLVED_IMPORT',
  'UNUSED_EXTERNAL_IMPORT',
]

/**
 * If a Rollup warning is in our `warningsToErrors` list, throw it as an error
 *
 * This logic appears convoluted but it is in the interests of reporting more complete information.
 * Some warnings have location information (including `loc` and `frame`), and some have URLs to a help page.
 * These if statements append this useful info to the error message before throwing it.
 */
export const getOnWarn = (warningExceptions: UpgradedWarning[] = []) => {
  return (warning: RollupWarning, warn: WarningHandler) => {
    const myWarnings = warningExceptions.length
      ? warningsToErrors.filter(item => !warningExceptions.includes(item))
      : warningsToErrors

    if (warning.code && myWarnings.includes(warning.code as UpgradedWarning)) {
      const {loc, message, frame, url} = warning
      const errorParts: string[] = []

      /**
       * If an intercepted warning includes location of the source,
       * format it and include it in the error
       * @see https://rollupjs.org/guide/en/#onwarn
       */
      if (loc) {
        errorParts.push(`${loc.file || ''} (${loc.line}:${loc.column})`)

        /**
         * Some warnings with location include a 'frame' - if so, include it in the report
         */
        if (frame) {
          errorParts.push(frame)
        }
      }

      /**
       * All warnings should include a message
       */
      if (message) {
        errorParts.push(message)
      }

      /**
       * Some warnings include a URL for more help
       */
      if (url) {
        errorParts.push(`See: ${url}}`)
      }

      /**
       * Throw the assembled error, breaking up sections with newlines
       */
      throw new Error(errorParts.join('\n\n'))
    } else {
      /**
       * Treat all warnings that are NOT in our `warningsToErrors` list as normal warnings,
       * and pass them on to Rollup's built-in warning mechanism.
       */
      warn(warning)
    }
  }
}