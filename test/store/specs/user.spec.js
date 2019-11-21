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

describe('User tests', () => {
  beforeEach(function() {
    stubRouter()
  })

  afterEach(function() {
    restoreRouter()
    resetAPI(api)
  })

  it('should not login for 403', async () => {
    // given
    let store = testStore()
    api['service'].onPost('/api/user/login').reply([403])

    // when
    await store.dispatch('user/login')

    // then
    expect(store.getters['user/email']).to.equal(null)
    expectRedirect('/auth')
  })

  it('should login for 200', async () => {
    // given
    let store = testStore()
    var sessionToken = jwt.sign(
      { email: 'a@b.c', role: 'USER', permissions: [] },
      'shhhhh'
    )
    api['service'].onPost('/api/user/login').reply(200, { sessionToken })

    // when
    await store.dispatch('user/login')

    // then
    expect(store.getters['user/email']).to.equal('a@b.c')
    expectRedirect('/home')
  })
})
