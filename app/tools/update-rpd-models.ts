import path from 'path';
import { type RapidModelsUpdateOptions, RapidModelsUpdater } from '@ruiapp/rapid-configure-tools';
import rapidAppDefinition from '~/rapidAppDefinition';

const env = process.env;

const updateOptions: RapidModelsUpdateOptions = {
  appDataDirLocation: path.join(__dirname, '..', '.benzene-data'),
  rapidApiUrl: env.RAPID_API_URL || 'http://127.0.0.1:3000/api',
  entities: rapidAppDefinition.entities,
  dataDictionaries: rapidAppDefinition.dataDictionaries,
};

const updater = new RapidModelsUpdater(updateOptions);
updater.updateRapidSystemConfigurations();