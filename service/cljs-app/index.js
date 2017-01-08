var Base = require('../../shared/base.js');
var _ = require('lodash');

module.exports = Base.extend({
  constructor: function () {
    Base.apply(this, arguments);
  },

  writing: function() {
    let overrides = {templateDir: 'src/app/',
                     destinationDir: `src/${this.options.service}/`};

    this._copyTemplates(["boot.properties", "build.boot"],
                        this.options);

    this._copyTemplates(["core.cljs", "specs.cljs", "mappings.cljs"],
                        _.merge(overrides, this.options));
  }
});
