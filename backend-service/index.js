const Base = require('../shared/base');
const _ = require('lodash');
const Immutable = require('immutable');
const buildSpec = require('./create-buildspec');

module.exports = Base.extend({

  _registerService(){
    let oldNames = Immutable.Set(this.config.get('services'));
    let newNames = oldNames.add(this.options.service);
    this.config.set('services', newNames.toJS());
  },

  _removeService(){
    let oldNames = Immutable.Set(this.config.get('services'));
    let newNames = oldNames.remove(this.options.service);
    this.config.set('services', newNames.toJS());
    this.fs.delete(this.options.service);
  },

  constructor: function () {
    Base.apply(this, arguments);
    this.argument('serviceName', { type: String, required: true});
    this.option('remove');
  },

  initializing() {
    this.options = {
      organization: this.config.get("organization"),
      bucket: this.config.get("bucket"),
      author: this.config.get("author"),
      service: this.options.serviceName,
      remove: this.options.remove
    };

    if(!this.options.remove){
      this.composeWith(require.resolve('./lambda/index'), this.options);
      this.composeWith(require.resolve('./cljs-app/index'), this.options);
    }
  },

  prompting: function() {
    let questions = [];

    if(this.options.remove){
      questions.push({
        type    : 'confirm',
        name    : 'confirmRemove',
        message : `Do you really want to remove the ${this.options.service} service?`
      });
    }
    return this.prompt(questions).then((answers) => {
      this.options.remove = answers.confirmRemove;
    });
  },

  configuring(){
    if(this.options.remove){
      this._removeService();
    } else {
      this._registerService();
    }
  },

  writing(){
    this.fs.write('buildspec.yml', buildSpec(this.config.get('services')));
  },

  install: function(){
    let deps = [];
    if(!_.isEmpty(deps)){
      this.yarnInstall(deps, {'exact': true});
    }
  }
});
