// This config was generated using a preset.
// Please see the handbook for more information: https://github.com/stryker-mutator/stryker-handbook/blob/master/stryker/guides/vuejs.md#vuejs
module.exports = function(config) {
  config.set({
    mutate: ["src/util/*.js", "src/store/modules/*.js", "src/api/domains/*.js", "!src/**/index.js"],
    mutator: "javascript",
    testRunner: "karma",
    karma: {
      configFile: "test/store/karma.conf.js",
      config: {
        browsers: ["ChromeHeadless"]
      }
    },
    reporters: ["progress", "clear-text", "html"],
    coverageAnalysis: "off"
  });
};