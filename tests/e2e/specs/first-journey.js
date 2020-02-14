const { startMockServer, shutdownMockServer, mockServer, response } = require('../mock-server')
const { timeout } = require('../helper/timeout')

/*
  User opens the home page
  The loading mask is shonw
  When the response arrives they see the cards
*/
module.exports = {
  '@disabled': false,

  before() {
    mockServer
      .onGet('/api/packages')
      .replyOnce(response({
        status: 200,
          body: [ { name: "Samsung 10" } ],
        delay: timeout(5)
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
  },

  afterEach(browser) {
    browser
      .pause(timeout(10))
      .end()
  },

  after() {
    shutdownMockServer()
  }
}
