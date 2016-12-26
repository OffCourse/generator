const yaml = require('js-yaml');
const _ = require('lodash');

let template = {
  version: 0.1,
  phases: {
    install: {
      commands: []
    },
    build: {
      commands: []
    }
  },
  artifacts: {
    files: []
  }
};

module.exports = function(services){
  template.phases.install.commands.push(`yarn install`);
  _.each(services, function(service){
    template.phases.build.commands.push(`${service}`);
    template.artifacts.files.push(`${service}`);
  });
  return yaml.safeDump(template);
}
