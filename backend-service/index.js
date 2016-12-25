var Base = require('../shared/base');
var _ = require('lodash');

module.exports = Base.extend({
  constructor: function () {
    Base.apply(this, arguments);
    this.argument('serviceName', { type: String, required: true});
    this.destinationRoot(this.options.service);
  },

  initializing() {
    this.options = {
      organization: this.config.get("organization"),
      bucket: this.config.get("bucket"),
      author: this.config.get("author"),
      service: this.options.serviceName
    };

    this.composeWith(require.resolve('./lambda/index'), this.options);
    this.composeWith(require.resolve('./cljs-app/index'), this.options);
  }
});
