var Base = require('../shared/base.js');
var _ = require('lodash');

module.exports = Base.extend({
  constructor: function () {
    Base.apply(this, arguments);
    this.destinationRoot(this.options.service);
  },

  prompting: function() {
    return this.prompt([{
      type    : 'input',
      name    : 'bucket',
      message : 'The s3 bucket in which you want to store your artifacts',
      default : 'offcourse-bootstrap'
    }]).then((answers) => {
      this.bucketName = answers.bucket;
    });
  },

  writing: function() {
    let overrides = {outputTemplate: `${this.options.service}.yml`,
                     bucketName: this.bucketName,
                     functionName: `${_.upperFirst(this.options.service)}Function`};

    this._copyTemplates(["package.json" , "build.yml"], _.merge(this.options, overrides));
  },

  install: function(){
    let deps = ["aws-sdk@2.6.4"];
    this.yarnInstall(deps, {'exact': true});
  }
});
