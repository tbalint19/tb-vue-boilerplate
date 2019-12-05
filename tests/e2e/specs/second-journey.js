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
        body: [ { name: "elso offer" } ],
        delay: timeout(5)
      }))
    startMockServer()
  },

  beforeEach(browser) {
    browser
      .init()
    loadHomePage(browser)
  },

  'filterOffers': browser => {
    browser
      .pause(timeout(5))
      .click('#filter')
      .pause(timeout(0.5))
      .keys('a')
      .pause(timeout(3))
      .keys('a')
      .pause(timeout(3))

    browser
      .keys(browser.Keys.BACK_SPACE)
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
