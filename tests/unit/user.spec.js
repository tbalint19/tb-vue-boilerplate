import { testStore } from './helper/testStore.js'
import apiMock from './helper/apiMock.js'
import routerMock from './helper/routerMock.js'
import jwt from 'jsonwebtoken'

describe('User module tests', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should logout user', () => {
    // given
    const store = testStore()

    // when
    store.dispatch('user/logout')

    // then
    expect(store.getters['user/isLoggedIn']).toBe(false)
    expect(store.getters['user/email']).toBe(null)
    expect(store.getters['user/is']('user')).toBe(false)

    expect(routerMock.push.mock.calls.length).toBe(1)
    expect(routerMock.push.mock.calls[0][0]).toBe("/")
  })

  it('should login user', async () => {
    // given
    const store = testStore()
    const sessionToken = jwt.sign(
      {
        email: 'a@bc',
        role: { name: "user", scope: null },
        permissions: []
      },
    'secret-key')
    apiMock.mockServices.userService
      .onPost('/api/user/login')
      .reply(200, { sessionToken })

    // when
    await store.dispatch('user/login', { authorizationCode: "abc", redirect: "/about" })

    // then
    expect(store.getters['user/isLoggedIn']).toBe(true)
    expect(store.getters['user/email']).toBe('a@bc')
    expect(store.getters['user/is']('user')).toBe(true)

    expect(routerMock.push.mock.calls.length).toBe(1)
    expect(routerMock.push.mock.calls[0][0]).toBe("/about")
  })

})
