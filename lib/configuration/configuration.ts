import * as Joi from 'types-joi';
import { InterfaceFrom } from 'types-joi';

export type Asset = 'string' | AssetEntry;

export interface AssetEntry {
  glob: string;
  include?: string;
  flat?: boolean;
  exclude?: string;
  outDir?: string;
  watchAssets?: boolean;
}

export interface ActionOnFile {
  action: 'change' | 'unlink';
  item: AssetEntry;
  path: string;
  sourceRoot: string;
  watchAssetsMode: boolean;
}

const pluginOptionsSchema = Joi.object({
  name: Joi.string().required(),
  options: Joi.array()
    .items(Joi.object().pattern(Joi.string(), Joi.any().required()))
    .required(),
});

const generateOptionsSchema = Joi.object({
  spec: Joi.alternatives([
    Joi.boolean(),
    Joi.object().pattern(Joi.string(), Joi.boolean().required()),
  ]).optional(),
});

const compilerOptionsSchema = Joi.object({
  tsConfigPath: Joi.string().optional(),
  webpack: Joi.boolean().optional(),
  webpackConfigPath: Joi.string().optional(),
  plugins: Joi.array()
    .items(Joi.alternatives([Joi.string(), pluginOptionsSchema]))
    .optional(),
  assets: Joi.array()
    .items(
      Joi.alternatives([
        Joi.string(),
        Joi.object({
          include: Joi.string().optional(),
          exclude: Joi.string().optional(),
          outDir: Joi.string().optional(),
          watchAssets: Joi.boolean().optional(),
        }),
      ]),
    )
    .optional(),
  watchAssets: Joi.boolean().optional(),
  deleteOutDir: Joi.boolean().optional(),
});

const projectConfigurationSchema = Joi.object({
  type: Joi.string().optional(),
  root: Joi.string().optional(),
  entryFile: Joi.string().optional(),
  sourceRoot: Joi.string().optional(),
  compilerOptions: compilerOptionsSchema.optional(),
});

export const configurationSchema = Joi.object({
  language: Joi.string().default('ts'),
  collection: Joi.string().default('@nestjs/schematics'),
  sourceRoot: Joi.string().optional(),
  entryFile: Joi.string().optional(),
  monorepo: Joi.boolean().optional(),
  root: Joi.string().optional(),
  compilerOptions: compilerOptionsSchema,
  generateOptions: generateOptionsSchema,
  projects: Joi.object().pattern(
    Joi.string(),
    projectConfigurationSchema.required(),
  ),
}).required();

export type Configuration = InterfaceFrom<typeof configurationSchema>;

export type ProjectConfiguration = InterfaceFrom<
  typeof projectConfigurationSchema
>;
