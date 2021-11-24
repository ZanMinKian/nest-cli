import {
  Configuration,
  ConfigurationLoader,
  configurationSchema,
  NestConfigurationLoader,
} from '../configuration';
import { FileSystemReader } from '../readers';

function validateConfiguration(configuration: Configuration): Configuration {
  const { error, value } = configurationSchema.validate(configuration);
  if (error) throw error;
  return value;
}

export async function loadConfiguration(
  name?: string,
): Promise<Required<Configuration>> {
  const loader: ConfigurationLoader = new NestConfigurationLoader(
    new FileSystemReader(process.cwd()),
  );
  return validateConfiguration(await loader.load(name));
}
