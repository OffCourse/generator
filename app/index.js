var Base = require('../shared/base');

module.exports = Base.extend({
  prompting: function() {
    return this.prompt([{
      type    : 'input',
      name    : 'organization',
      message : 'The name of your organization',
      default : this.config.get("organization")
    },{
      type    : 'input',
      name    : 'author',
      message : 'your name',
      default : this.config.get("author")
    },{
      type    : 'input',
      name    : 'bucket',
      message : 'S3 bucket in which to store your build artifacts',
      default : this.config.get("bucket")
    }]).then((answers) => {
      this.config.set("organization", answers.organization);
      this.config.set("author", answers.author);
      this.config.set("bucket", answers.bucket);
      this.config.set("services", this.config.get('services') || []);
    });
  }
});
