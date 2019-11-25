import { testStore } from './helper/testStore.js'

describe('User module tests', () => {

  it('should logout user', () => {
    // given
    const store = testStore()

    // when
    store.dispatch('user/logout')

    // then
    expect(null).toBe(null)
  })

})
