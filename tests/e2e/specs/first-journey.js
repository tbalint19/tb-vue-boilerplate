const { startMockServer, shutdownMockServer, mockServer, response } = require('../mock-server')

/*
  User opens the home page
  The loading mask is shonw
  When the response arrives they see the cards
*/
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

  'loadHomePage': browser => {
    browser
      .waitForElementVisible('#app')
      .waitForElementVisible('.loading')
  },

  afterEach(browser) {
    browser
      .pause(10000)
      .end()
  },

  after() {
    shutdownMockServer()
  }
}
