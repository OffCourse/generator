var Generator = require('yeoman-generator');
var _ = require('lodash');

module.exports = Generator.extend({
  _copyTemplate: function(fileName, options) {
    this.fs.copyTpl(
      this.templatePath(`${options.templateDir || ""}_${fileName}`),
      this.destinationPath(`${options.destinationDir || ""}${fileName}`),
      options
    );
  },

  _copyTemplates: function(fileNames, options) {
    _.each(fileNames, (fileName) => this._copyTemplate(fileName, options));
  }
})
