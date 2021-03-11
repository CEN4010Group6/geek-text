const { preprocessTypescript } = require('@nrwl/cypress/plugins/preprocessor');

module.exports = function(on, config) {
  on('file:preprocessor', preprocessTypescript(config));
}
