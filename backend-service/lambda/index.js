var Base = require('../../shared/base.js');
var _ = require('lodash');

module.exports = Base.extend({
  constructor: function () {
    Base.apply(this, arguments);
    this.destinationRoot(this.options.service);
  },

  writing: function() {
    let overrides = {};
    this._copyTemplates(["package.json", "index.js" , "context.json", "event.json", "build.yml"],
                        _.merge(this.options, overrides));
  },

  install: function(){
    let deps = ["atob@2.0.3",
                "btoa@1.1.2",
                "dynamodb-marshaler@2.0.0",
                "aws-sdk@2.6.4",
                "js-yaml@3.6.1",
                "fstream@1.0.10",
                "jsonwebtoken@7.1.9",
                "node-lambda@0.8.11",
                "path@0.12.7",
                "request@2.75.0",
                "unzipper@0.7.2"];
    this.yarnInstall(deps, {'exact': true});
  }
});
