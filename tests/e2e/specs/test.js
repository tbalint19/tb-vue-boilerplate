module.exports = {
  'default e2e tests': browser => {
    browser
      .init()
      .waitForElementVisible('#app')
      .end()
  },

  before: function() {
    console.log("before");
  },

  beforeEach: function(browser) {
    console.log("before each");
  }
}
