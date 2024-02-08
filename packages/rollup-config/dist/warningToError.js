'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var warningsToErrors = [
    'CIRCULAR_DEPENDENCY',
    'CYCLIC_CROSS_CHUNK_REEXPORT',
    'MISSING_EXPORT',
    'NON_EXISTENT_EXPORT',
    'UNKNOWN_OPTION',
    'UNRESOLVED_IMPORT',
    'UNUSED_EXTERNAL_IMPORT',
];
/**
 * If a Rollup warning is in our `warningsToErrors` list, throw it as an error
 *
 * This logic appears convoluted but it is in the interests of reporting more complete information.
 * Some warnings have location information (including `loc` and `frame`), and some have URLs to a help page.
 * These if statements append this useful info to the error message before throwing it.
 */
var getOnWarn = function (warningExceptions) {
    if (warningExceptions === void 0) { warningExceptions = []; }
    return function (warning, warn) {
        var myWarnings = warningExceptions.length
            ? warningsToErrors.filter(function (item) { return !warningExceptions.includes(item); })
            : warningsToErrors;
        if (warning.code && myWarnings.includes(warning.code)) {
            var loc = warning.loc, message = warning.message, frame = warning.frame, url = warning.url;
            var errorParts = [];
            /**
             * If an intercepted warning includes location of the source,
             * format it and include it in the error
             * @see https://rollupjs.org/guide/en/#onwarn
             */
            if (loc) {
                errorParts.push("".concat(loc.file || '', " (").concat(loc.line, ":").concat(loc.column, ")"));
                /**
                 * Some warnings with location include a 'frame' - if so, include it in the report
                 */
                if (frame) {
                    errorParts.push(frame);
                }
            }
            /**
             * All warnings should include a message
             */
            if (message) {
                errorParts.push(message);
            }
            /**
             * Some warnings include a URL for more help
             */
            if (url) {
                errorParts.push("See: ".concat(url, "}"));
            }
            /**
             * Throw the assembled error, breaking up sections with newlines
             */
            throw new Error(errorParts.join('\n\n'));
        }
        else {
            /**
             * Treat all warnings that are NOT in our `warningsToErrors` list as normal warnings,
             * and pass them on to Rollup's built-in warning mechanism.
             */
            warn(warning);
        }
    };
};

exports.getOnWarn = getOnWarn;
exports.warningsToErrors = warningsToErrors;
//# sourceMappingURL=warningToError.js.map
