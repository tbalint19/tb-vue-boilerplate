const { start, shutdown } = require('../mock-server')

module.exports = {

  before() {
    start('first-journey')
  },

  'LoadHomePage': browser => {
    browser
      .init()
      .waitForElementVisible('#app')
      .waitForElementVisible('.lofasz', 15000)
  },

  afterEach(browser) {
    browser
      .pause(15000)
      .end()
  },

  after() {
    shutdown()
  }
}
