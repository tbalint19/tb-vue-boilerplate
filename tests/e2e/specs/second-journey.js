const { startMockServer, shutdownMockServer, mockServer, response } = require('../mock-server')
const { timeout } = require('../helper/timeout')
const { loadHomePage } = require('./first-journey')

/*
  User starts to filter on the homepage
  The number of cards changes accordingly
*/
module.exports = {

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
  },

  'filterOffers': browser => {
    loadHomePage(browser)
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
