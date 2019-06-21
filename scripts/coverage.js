var asJson = require('./asJson.js')
var tresholds = require('../package.json').pipeline.coverage

var checkTresholds = function(report, name) {
  for (var key in report) {
    if (report[key] < tresholds[name][key])
      throw "" + tresholds[name][key] + "% not passed for " + key + " at " + name + " tests!"
  }
}

var utilReport = asJson('./reports/coverage/store/text-report/coverage.txt')
var storeReport = asJson('./reports/coverage/store/text-report/coverage.txt')

checkTresholds(utilReport, "util")
checkTresholds(storeReport, "store")
