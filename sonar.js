var sonarqubeScanner = require('sonarqube-scanner');
var request = require('request');

var projectName = require('./package.json')["name"]
var serverUrl = "http://172.17.64.60:9004"
var resultUrl = serverUrl + "/api/issues/search?id=" + projectName

var sonarJob = function(callback) {
  sonarqubeScanner({
    serverUrl
  }, callback);
}

var sonarAnalysis = function() {
  request(resultUrl, function (error, response, body) {
    var issues = JSON.parse(body)["issues"]
    if (issues)
      throw "Sonar found " + issues.length + " issues"
  })
}

sonarJob(sonarAnalysis)
