var sonarqubeScanner = require('sonarqube-scanner');
var request = require('request');

var config = require('../config.json')
var packageJson = require('../../package.json')

var branch = process.env.npm_config_branch
console.log("BRANCH:::::::::", branch)

var projectName = packageJson.name
var serverUrl = config.sonar.url
var resultUrl = serverUrl + "/api/issues/search?componentRoots=" + projectName + "&pageSize=-1"

var maxIssues = config.sonar.maxIssues

var sonarJob = function(callback) {
  sonarqubeScanner({
    serverUrl,
    options: {
      'sonar.sources': 'src',
      'sonar.scm.forceReloadAll': 'true',
      'sonar.scm.exclusions.disabled': 'false',
      'sonar.projectName': branch,
      'sonar.projectKey': branch
    }
  }, callback);
}

var sonarAnalysis = function() {
  request(resultUrl, function (error, response, body) {
    var issues = JSON.parse(body)["issues"]
    var relevantIssues = issues.filter(issue => issue.component.startsWith(projectName + ":src"))
    var openRelevantIssues = relevantIssues.filter(issue => !(issue.resolution == 'FIXED' && issue.status == 'CLOSED'))
    console.log("Issues: ", openRelevantIssues.length)
    console.log(openRelevantIssues)
    if (openRelevantIssues.length > maxIssues)
      throw "Sonar found " + issues.length + " issues (only " + maxIssues + " is acceptable)"
  })
}

sonarJob(sonarAnalysis)
