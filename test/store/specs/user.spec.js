import { testStore } from '../util/testStoreFactory'
import { mockAPI, restoreAPI } from '../util/mockAPI'
import { stubRouter, restoreRouter } from '../util/mockRouter'

describe('User tests', () => {
  it('should delete user when set with null', async () => {
    // given
    let store = testStore()

    // when
    await unsuccessfulLogin(store)

    // then
    expect(store.getters['user/email']).to.equal(null)
  })
})

export const unsuccessfulLogin = async (store) => {
  const api = mockAPI()
  api['service'].onPost('/api/user/login').reply([403])

  await store.dispatch('user/login')

  restoreAPI(api)
}
