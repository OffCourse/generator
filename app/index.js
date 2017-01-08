var Base = require('../shared/base');
const path = require('path');

module.exports = Base.extend({

  initializing: function () {
    let done = this.async();
    let oldDir = process.cwd();
    let newdir = path.join(oldDir, "infrastructure");
    let ls = this.spawnCommand("terraform",
                               ["output", "lambda_execution_role_arn"],
                               {cwd: newdir,
                                stdio: ['ignore', 'pipe', 'ignore']});
    ls.stdout.on('data', (arn) => {
      this.execution_role = arn.toString();
      done();
    });
  },

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
    }]).then((answers) => {
      this.config.set("organization", answers.organization);
      this.config.set("author", answers.author);
      this.config.set("execution_role", this.execution_role);
      this.config.set("services", this.config.get('services') || []);
    });
  }
});
