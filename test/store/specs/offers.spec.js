import { testStore } from '../util/testStoreFactory'
import { mockAPI, resetAPI } from '../util/mockAPI'
import {
  stubRouter,
  restoreRouter,
  expectRedirect,
  expectDidNotRoute,
} from '../util/mockRouter'
var jwt = require('jsonwebtoken')
const api = mockAPI()

describe('Offer tests', () => {
  beforeEach(function() {
    stubRouter()
  })

  afterEach(function() {
    restoreRouter()
    resetAPI(api)
  })

  it('should start with empty filter', async () => {
    // given

    // when
    let store = testStore()

    // then
    expect(store.getters['offers/filterParam']).to.equal("")
    expect(store.getters['offers/filteredOffers']).to.have.length(4)
  })

  it('should filter offers', async () => {
    // given
    let store = testStore()

    // when
    store.dispatch('offers/updateFilterParam', 'elso offer')

    // then
    expect(store.getters['offers/filteredOffers']).to.have.length(1)
  })
})
