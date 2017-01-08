var Base = require('../shared/base');
const path = require('path');

module.exports = Base.extend({

  initializing: function () {
    let oldDir = process.cwd();
    let newdir = path.join(oldDir, "infrastructure");
    let ls = this.spawnCommandSync("terraform",
                                   ["output", "lambda_execution_role_arn"],
                                   {cwd: newdir,
                                    stdio: ['ignore', 'pipe', 'ignore']});
    this.execution_role = ls.stdout.toString();
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
