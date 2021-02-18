import { preprocessTypescript } from '@nrwl/cypress/plugins/preprocessor';

export default function(on, config) {
  on('file:preprocessor', preprocessTypescript(config)
}