let invokeLocalTask = "./node_modules/node-lambda/bin/node-lambda run";
let watchTask       = "boot dev";
let buildTask       = "boot build";

let packageTask = function(service, bucket) {
  return `${buildTask} && aws cloudformation package --template-file build.yml --output-template-file ${service}.yml --s3-bucket ${bucket}`;
};

module.exports = {
  invokeLocalTask,
  watchTask,
  buildTask,
  packageTask
};
