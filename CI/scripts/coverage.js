var asJson = require('../util/coverageReportAsObj.js')
var config = require('../config.json')

var coverage = config.coverage

var checkTresholds = function(report, name) {
  for (var key in report) {
    if (report[key] < coverage[name][key])
      throw "" + coverage[name][key] + "% not passed for " + key + " at " + name + " tests! (" + report[key] + "%)"
    else
      console.log("" + name + "/" + key + " - passed (" + report[key] + "%)");
  }
}

var utilReport = asJson('./reports/coverage/util/text-report/coverage.txt')
var storeReport = asJson('./reports/coverage/store/text-report/coverage.txt')

checkTresholds(utilReport, "util")
checkTresholds(storeReport, "store")
