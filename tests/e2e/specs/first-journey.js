const { start, shutdown } = require('../mock-server')

module.exports = {

  before() {
    start('first-journey')
  },

  'LoadHomePage': browser => {
    browser
      .init()
      .waitForElementVisible('#app')
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
