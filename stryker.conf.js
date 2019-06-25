// This config was generated using a preset.
// Please see the handbook for more information: https://github.com/stryker-mutator/stryker-handbook/blob/master/stryker/guides/vuejs.md#vuejs
module.exports = function(config) {
  config.set({
    mutate: ["src/store/modules/user.js"],
    mutator: "javascript",
    testRunner: "karma",
    karma: {
      configFile: "test/store/karma.conf.js",
      config: {
        browsers: ['chromeHeadlessNoSandbox'],
        customLaunchers: {
          chromeHeadlessNoSandbox: {
            base: 'ChromeHeadless',
            flags: ['--no-sandbox'],
          },
        }
      }
    },
    reporters: ["progress", "clear-text", "html", "dots"],
    coverageAnalysis: "off"
  });
};
