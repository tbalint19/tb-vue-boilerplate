var sonarqubeScanner = require('sonarqube-scanner');
var request = require('request');

var packageJson = require('../package.json')

var projectName = packageJson.name
var serverUrl = packageJson.pipeline.sonar.url
var resultUrl = serverUrl + "/api/issues/search?id=" + projectName

var maxIssues = packageJson.pipeline.sonar.maxIssues

var sonarJob = function(callback) {
  sonarqubeScanner({
    serverUrl
  }, callback);
}

var sonarAnalysis = function() {
  request(resultUrl, function (error, response, body) {
    var issues = JSON.parse(body)["issues"]
    if (issues.length > maxIssues)
      throw "Sonar found " + issues.length + " issues (only " + maxIssues + " is acceptable)"
  })
}

sonarJob(sonarAnalysis)
