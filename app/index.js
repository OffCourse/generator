var Base = require('../shared/base');

module.exports = Base.extend({
  prompting: function() {
    return this.prompt([{
      type    : 'input',
      name    : 'organization',
      message : 'The name of your organization',
      default : this.options.organization
    },{
      type    : 'input',
      name    : 'author',
      message : 'your name',
      default : this.options.author
    }]).then((answers) => {
      this.config.set("organization", answers.organization);
      this.config.set("author", answers.author);
    });
  }
});
