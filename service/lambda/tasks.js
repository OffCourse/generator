let invokeLocal = "./node_modules/node-lambda/bin/node-lambda run";
let watch       = "boot dev";
let build       = "boot build";

let package = function (service, bucket) {
  return `${build} && aws cloudformation package --template-file build.yml --output-template-file ${service}.yml --s3-bucket ${bucket}`;};

let deploy = function (service) {
  return `aws cloudformation deploy --template-file ${service}.yml --stack-name ${service} --capabilities CAPABILITY_IAM`;};

let functionName = `aws cloudformation describe-stack-resources --stack-name echo | jq '.StackResources | map(select(.ResourceType == \\\"AWS::Lambda::Function\\\"))[0].PhysicalResourceId' | sed -e 's/\\\"//g'`;

let invokeRemote = `aws lambda invoke --function-name $(functionName) --payload file://event.json output.json --log-type Tail | jq '.LogResult' > logs.txt && cat output.json | jq && echo \\\"\\\" && cat logs.txt | base64 -di`;

let remove = function(service) {
  return `aws cloudformation delete-stack --stack-name ${service}`;
};


module.exports = {
  invokeLocal,
  invokeRemote,
  watch,
  deploy,
  build,
  package,
  remove
};
