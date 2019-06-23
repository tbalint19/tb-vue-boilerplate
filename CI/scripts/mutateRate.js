var asJson = require('../util/mutationReportAsObj.js')
var config = require('../config.json')

var killRate = config.mutates.killRate

var report = asJson()

for (var fileName in report.files) {
  var file = report.files[fileName]
  var mutants = file.mutants
  var all = mutants.length
  var killed = mutants.filter(mutant => mutant.status == 'Killed').length
  var killRate = killed / all * 100
  if (killRate < requiredKillRate) throw "Tests were not precise enough (" + killRate + "%)!"
}
