import {OutputOptions} from "rollup";

export const getOutputPluginConfig = ({format = 'esm', preserveModulesRoot, exports}: Partial<OutputOptions>): OutputOptions => {
  switch (format) {
    /**
     * Outputs CommonJS version with `js` extension
     */
    case 'cjs':
      return {
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
      };

    /**
     * Outputs ES Modules version with `.esm.js` extension
     */
    case 'esm':
      return {
        assetFileNames: '[name][extname]',
        chunkFileNames: '[name]-[hash].esm.js',
        dir: 'dist',
        entryFileNames: '[name].esm.js',
        exports: exports || 'auto',
        format: 'es',
        preserveModules: true,
        preserveModulesRoot,
        sourcemap: true,
      };

    /**
     * Outputs ES Modules version with `.mjs` extension
     */
    case 'module':
      return {
        assetFileNames: '[name][extname]',
        chunkFileNames: '[name]-[hash].mjs',
        dir: 'dist',
        entryFileNames: '[name].mjs', // Specify .mjs extension for entry files
        exports: exports || 'auto',
        format: 'es', // Ensure the format is set to 'es' for ES Modules
        preserveModules: true,
        preserveModulesRoot,
        sourcemap: true,
      }
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};