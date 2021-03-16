import { preprocessTypescript } from '@nrwl/cypress/plugins/preprocessor'

export default function(on: any, config: any) {
  on('file:preprocessor', preprocessTypescript(config));
}
