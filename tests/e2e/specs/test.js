module.exports = {
  'default e2e tests': browser => {
    browser
      .init()
      .waitForElementVisible('#app')
  },

  afterEach(browser) {
    browser
      .pause(3000)
      .end()
  }
}
