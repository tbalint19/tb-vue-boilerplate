const { startMockServer, shutdownMockServer, mockServer, response } = require('../mock-server')

module.exports = {

  before() {
    mockServer
      .onGet('/api/packages')
      .replyOnce(response({
        status: 200,
        body: [ { name: "elso offer" } ],
        delay: 5000
      }))
    startMockServer()
  },

  beforeEach(browser) {
    browser
      .init()
  },

  'LoadHomePage': browser => {
    browser
      .waitForElementVisible('#app')
      .waitForElementVisible('.lofasz', 15000, 200)
  },

  afterEach(browser) {
    browser
      .pause(15000)
      .end()
  },

  after() {
    shutdownMockServer()
  }
}
