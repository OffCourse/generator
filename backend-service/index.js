var Base = require('../shared/base');
var _ = require('lodash');

module.exports = Base.extend({
  constructor: function () {
    Base.apply(this, arguments);
    this.argument('serviceName', { type: String, required: true});
  },

  initializing() {
    let options = {
      organization: this.config.get("organization"),
      author: this.config.get("author"),
      service: this.options.serviceName
    };
    this.composeWith(require.resolve('./automation'), options);
    this.composeWith(require.resolve('./lambda'), options);
    this.composeWith(require.resolve('./cljs-app'), options);
  }

});
