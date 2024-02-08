import { JSONSchemaForNPMPackageJsonFiles } from '@schemastore/package';
import { RollupOptions } from 'rollup';
import { CreateRollupConfigOptions } from './options';
/**
 * Schemastore package.json types do not accept valid strings for the
 * 'homepage' field, so we'll customize this type a bit
 */
export interface PackageJSON extends Omit<JSONSchemaForNPMPackageJsonFiles, 'homepage'> {
    homepage?: string;
}
/**
 * Create a Rollup configuration object that supports Typescript, Sass, and CSS modules
 * See `options.ts` for details on optional override params
 */
declare const createRollupConfig: (options?: CreateRollupConfigOptions) => Promise<RollupOptions>;
export default createRollupConfig;
