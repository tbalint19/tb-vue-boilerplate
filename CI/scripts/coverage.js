var asJson = require('../util/coverageReportAsJson.js')
var config = require('../config.json')

var coverage = config.pipeline.coverage

var checkTresholds = function(report, name) {
  for (var key in report) {
    if (report[key] < coverage[name][key])
      throw "" + coverage[name][key] + "% not passed for " + key + " at " + name + " tests!"
  }
}

var utilReport = asJson('./reports/coverage/store/text-report/coverage.txt')
var storeReport = asJson('./reports/coverage/store/text-report/coverage.txt')

checkTresholds(utilReport, "util")
checkTresholds(storeReport, "store")
