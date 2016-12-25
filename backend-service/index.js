var Base = require('../shared/base');
var _ = require('lodash');
var Immutable = require('immutable');

module.exports = Base.extend({

  _registerService(){
    let oldNames = Immutable.Set(this.config.get('services'));
    let newNames = oldNames.add(this.options.serviceName);
    this.config.set('services', newNames.toJS());
  },

  constructor: function () {
    Base.apply(this, arguments);
    this.argument('serviceName', { type: String, required: true});
    this._registerService();
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
    console.log(this.config.get('services'));
  }
});
