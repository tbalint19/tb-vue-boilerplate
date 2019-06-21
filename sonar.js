var sonarqubeScanner = require('sonarqube-scanner');
var request = require('request');

var projectName = "tb-vue-boilerplate"
var serverUrl = "http://172.17.64.60:9004"
var resultUrl = serverUrl + "/api/issues/search?id=" + projectName

var sonarJob = function(callback) {
  sonarqubeScanner({
    serverUrl
  }, callback);
}

var sonarAnalysis = function() {
  request(resultUrl, function (error, response, body) {
  console.log('error:', error)
  console.log('statusCode:', response && response.statusCode)
  console.log('body:', body)

  var issues = body["issues"]
  if (issues) throw "Has issues!!!!!!!!!!!"
});
}

sonarJob(sonarAnalysis)
