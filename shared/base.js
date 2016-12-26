var Generator = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');

module.exports = Generator.extend({
  _copyTemplate: function(fileName, options) {
    let templatePath = path.join(options.templateDir || "", `_${fileName}`);
    let destinationPath = path.join(this.options.service, options.destinationDir || "", fileName);
    this.fs.copyTpl(
      this.templatePath(templatePath),
      this.destinationPath(destinationPath),
      options
    );
  },

  _copyTemplates: function(fileNames, options) {
    _.each(fileNames, (fileName) => this._copyTemplate(fileName, options));
  }
})
