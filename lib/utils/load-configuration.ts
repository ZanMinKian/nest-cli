import {
  Configuration,
  ConfigurationLoader,
  configurationSchema,
  NestConfigurationLoader,
} from '../configuration';
import { FileSystemReader } from '../readers';

export async function loadConfiguration(
  name?: string,
): Promise<Required<Configuration>> {
  const loader: ConfigurationLoader = new NestConfigurationLoader(
    new FileSystemReader(process.cwd()),
    configurationSchema,
  );
  return loader.load(name);
}
