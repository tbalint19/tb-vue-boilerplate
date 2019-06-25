var sonarqubeScanner = require('sonarqube-scanner');
var request = require('request');

var config = require('../config.json')
var packageJson = require('../../package.json')

var projectName = process.env.npm_config_branch
var serverUrl = config.sonar.url
var bugUrl = serverUrl + "/api/issues/search?componentRoots=" + projectName + "&pageSize=-1"
var duplicationsUrl = serverUrl + "/api/measures/component_tree?baseComponentKey=" + projectKey + "&metricKeys=duplicated_lines&pageSize=-1"

var maxIssues = config.sonar.maxIssues
var maxDuplications = config.sonar.maxDuplications

//http://sonarqube.vodafone.hu:9000/api/measures/component_tree?baseComponentKey=IntDev-vue-frontend-kitchensink-app:feature-NMA-761-frontend-pipeline-check-duplications-sonar&metricKeys=duplicated_lines

var sonarJob = function(callback) {
  sonarqubeScanner({
    serverUrl,
    options: {
      'sonar.sources': 'src,test',
      'sonar.scm.forceReloadAll': 'true',
      'sonar.scm.exclusions.disabled': 'false',
      'sonar.projectName': projectName,
      'sonar.projectKey': projectName
    }
  }, callback);
}

var bugAnalysis = function() {
  request(bugUrl, function (error, response, body) {
    var issues = JSON.parse(body)["issues"]
    var relevantIssues = issues.filter(issue => issue.component.startsWith(projectName))
    var openRelevantIssues = relevantIssues.filter(issue => !issue.resolution == 'FIXED' || !issue.status == 'CLOSED')
    console.log("Fetched: ", resultUrl)
    console.log("Project: ", projectName)
    console.log("Issues: ", openRelevantIssues.length)
    console.log(openRelevantIssues)
    if (openRelevantIssues.length > maxIssues)
      throw "Sonar found " + issues.length + " issues (only " + maxIssues + " is acceptable)"
  })
}

var duplicationAnalysis = function() {
  request(duplicationsUrl, function (error, response, body) {
    var response = JSON.parse(body)
    var filesWithDuplications = response["components"]
      .map(c => { return { file: c.name, duplicatedLines: c.measures[0].value } })
      .filter(res => res.lines > 0)
    filesWithDuplications.forEach(fileData => console.log(fileData))
    if (filesWithDuplications.length > 0)
      throw "Sonar found duplications in" + filesWithDuplications.length + " (only " + maxDuplications + " is acceptable)"
  })
}

var sonarAnalysis = function() {
  bugAnalysis()
  duplicationAnalysis()
}

sonarJob(sonarAnalysis)
