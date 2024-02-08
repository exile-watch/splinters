import { RollupWarning, WarningHandler } from 'rollup';
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
export type UpgradedWarning = 'CIRCULAR_DEPENDENCY' | 'CYCLIC_CROSS_CHUNK_REEXPORT' | 'MISSING_EXPORT' | 'NON_EXISTENT_EXPORT' | 'UNKNOWN_OPTION' | 'UNRESOLVED_IMPORT' | 'UNUSED_EXTERNAL_IMPORT';
export declare const warningsToErrors: UpgradedWarning[];
/**
 * If a Rollup warning is in our `warningsToErrors` list, throw it as an error
 *
 * This logic appears convoluted but it is in the interests of reporting more complete information.
 * Some warnings have location information (including `loc` and `frame`), and some have URLs to a help page.
 * These if statements append this useful info to the error message before throwing it.
 */
export declare const getOnWarn: (warningExceptions?: UpgradedWarning[]) => (warning: RollupWarning, warn: WarningHandler) => void;
