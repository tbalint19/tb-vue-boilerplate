const { startMockServer, shutdownMockServer, mockServer, response } = require('../mock-server')
const { timeout } = require('../helper/timeout')
const { loadHomePage } = require('./first-journey')

/*
  User starts to filter on the homepage
  The number of cards changes accordingly
*/
module.exports = {
  '@disabled': false,

  before() {
    mockServer
      .onGet('/api/packages')
      .replyOnce(response({
        status: 200,
        body: [  ],
        delay: timeout(3)
      }))
    startMockServer()
  },

  beforeEach(browser) {
    browser
      .init()
    loadHomePage(browser)
  },

  'checkOffer': browser => {
    browser.waitForElementVisible('button[data-uid="Iphone X"]')

    browser
      .pause(timeout(1))

    browser.click('button[data-uid="Iphone X"]')
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
