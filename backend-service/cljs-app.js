var Base = require('../shared/base.js');
var _ = require('lodash');

module.exports = Base.extend({
  constructor: function () {
    Base.apply(this, arguments);
    this.destinationRoot(this.options.service);
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('src/app/_core.cljs'),
      this.destinationPath(`src/${this.options.service}/core.cljs`),
      this.options
    );

    this.fs.copyTpl(
      this.templatePath('src/app/_specs.cljs'),
      this.destinationPath(`src/${this.options.service}/specs.cljs`),
      this.options
    );

    this.fs.copyTpl(
      this.templatePath('src/app/_mappings.cljs'),
      this.destinationPath(`src/${this.options.service}/mappings.cljs`),
      this.options
    );

    this._copyTemplates(["boot.properties", "build.boot"], this.options);
  }

});
