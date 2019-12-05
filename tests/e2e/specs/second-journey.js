const { startMockServer, shutdownMockServer, mockServer, response } = require('../mock-server')
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
        delay: 5000
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
      .pause(10000)
      .end()
  },

  after() {
    shutdownMockServer()
  }
}
