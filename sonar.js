var sonarqubeScanner = require('sonarqube-scanner');

var sonarJob = function(callback) {
  sonarqubeScanner({
    serverUrl : "http://172.17.64.60:9004"
  }, callback);
}

var sonarAnalysis = function func(...args) {
  args.forEach(arg => console.log(arg))
}

sonarJob(sonarAnalysis)
