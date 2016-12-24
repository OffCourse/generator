var Generator = require('yeoman-generator');
var _ = require('lodash');

module.exports = Generator.extend({
  _copyTemplate: function(fileName, options) {
    this.fs.copyTpl(
      this.templatePath(`_${fileName}`),
      this.destinationPath(fileName),
      options
    );
  },

  _copyTemplates: function(fileNames, options) {
    _.each(fileNames, (fileName) => this._copyTemplate(fileName, options));
  },
})
