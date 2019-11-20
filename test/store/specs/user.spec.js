import { testStore } from '../util/testStoreFactory'
import { mockAPI, restoreAPI } from '../util/mockAPI'
import { stubRouter, restoreRouter } from '../util/mockRouter'
var jwt = require('jsonwebtoken');

describe('User tests', () => {
  it('should not login for 403', async () => {
    // given
    let store = testStore()

    // when
    await unsuccessfulLogin(store)

    // then
    expect(store.getters['user/email']).to.equal(null)
  })

  it('should login for 200', async () => {
    // given
    let store = testStore()

    // when
    await successfulLogin(store)

    // then
    expect(store.getters['user/email']).to.equal('a@b.c')
  })
})

export const unsuccessfulLogin = async (store) => {
  const api = mockAPI()
  api['service'].onPost('/api/user/login').reply([403])

  await store.dispatch('user/login')

  restoreAPI(api)
}

export const successfulLogin = async (store) => {
  const api = mockAPI()
  var sessionToken = jwt.sign({ email: 'a@b.c', role: 'USER', permissions: [] }, 'shhhhh');
  api['service'].onPost('/api/user/login').reply(200, { sessionToken })

  await store.dispatch('user/login')

  restoreAPI(api)
}
