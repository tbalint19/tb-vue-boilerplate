import { testStore } from '../util/testStoreFactory'
import {
  to,
  by,
  expectRedirect,
  expectNotification,
  expectNoRedirection,
} from '../util/sinonAssertions'
var jwt = require('jsonwebtoken')

describe('Auth tests', () => {
  it('should initialize proper state', () => {
    // given
    let store = testStore()

    // when
    store.dispatch('auth/init')

    // then
    expect(store.getters['auth/username']).to.equal('')
    expect(store.getters['auth/password']).to.equal('')
    expect(store.getters['auth/usernameErrorKey']).to.equal(
      'login.error.username.empty'
    )
    expect(store.getters['auth/passwordErrorKey']).to.equal(
      'login.error.password.empty'
    )
    expect(store.getters['auth/hasUsernameError']).to.equal(true)
    expect(store.getters['auth/hasPasswordError']).to.equal(true)
    expect(store.getters['auth/userNameErrorShown']).to.equal(false)
    expect(store.getters['auth/passwordErrorShown']).to.equal(false)
    expect(store.getters['auth/hasInputError']).to.equal(true)
    expect(store.getters['auth/isLoading']).to.equal(false)
    expect(store.getters['auth/isDisabled']).to.equal(true)
  })

  it('should update username', () => {
    // given
    let store = testStore()

    // when
    store.dispatch('auth/updateUsername', { value: 'a' })

    // then
    expect(store.getters['auth/username']).to.equal('a')
  })

  it('should not show error before blur', () => {
    // given
    let store = testStore()

    // when
    store.dispatch('auth/updateUsername', { value: 'a' })

    // then
    expect(store.getters['auth/usernameErrorKey']).to.equal(
      'login.error.username.lessThen3'
    )
    expect(store.getters['auth/hasUsernameError']).to.equal(true)
    expect(store.getters['auth/userNameErrorShown']).to.equal(false)
  })

  it('should show username error after blur', () => {
    // given
    let store = testStore()
    store.dispatch('auth/updateUsername', { value: 'a' })

    // when
    store.dispatch('auth/blurUsername')

    // then
    expect(store.getters['auth/userNameErrorShown']).to.equal(true)
  })

  it('Should update getter for validation with valid username', () => {
    // given
    let store = testStore()

    // when
    store.dispatch('auth/updateUsername', { value: 'ottokar' })

    // then
    expect(store.getters['auth/hasUsernameError']).to.equal(false)
  })

  it('Should update password', () => {
    // given
    let store = testStore()

    // when
    store.dispatch('auth/updatePassword', { value: 'a' })

    // then
    expect(store.getters['auth/password']).to.equal('a')
    expect(store.getters['auth/hasPasswordError']).to.equal(true)
  })

  it('Should update getter for validation with password', () => {
    // given
    let store = testStore()

    // when
    store.dispatch('auth/updatePassword',  { value: 'ottokarpw' })

    // then
    expect(store.getters['auth/hasPasswordError']).to.equal(false)
  })

  it('Should start loading when login request is sent', async () => {
    // given
    let store = testStore()
    let token = 'asd'
    store.$domainMock.onPost('/api/login').reply(201, { token })

    // when
    store.dispatch('auth/login')

    // then
    expect(store.getters['auth/isLoading']).to.equal(true)
  })

  it('Should login for http200', async () => {
    // given
    let store = testStore()
    let token = jwt.sign(
      {
        username: 'bela',
        role: 'admin',
        permissions: ['doStuff', 'doOtherStuff'],
      },
      'secret-key'
    )
    store.$domainMock.onPost('/api/login').reply(200, { token })

    // when
    await store.dispatch('auth/login')

    // then
    expect(store.getters['user/isLoggedIn']).to.equal(true)
    expect(store.getters['auth/isLoading']).to.equal(false)
    expect(store.getters['user/username']).to.equal('bela')

    expectRedirect(by(store), to('/'))
    expectNotification(by(store), 'success.login')
  })

  it('Should not login for http401', async () => {
    // given
    let store = testStore()
    store.$domainMock.onPost('/api/login').reply(401)

    // when
    await store.dispatch('auth/login')

    // then
    expect(store.getters['user/isLoggedIn']).to.equal(false)
    expect(store.getters['auth/isLoading']).to.equal(false)
    expect(store.getters['user/username']).to.equal(null)

    expectNoRedirection(by(store))
    expectNotification(by(store), 'error.login.connection')
  })

  it('Should update disabled getter')

  it('Should update active getter')

  it('Should notify user about network error', async () => {
    // given
    let store = testStore()
    store.$domainMock.onPost('/api/login').networkError()

    // when
    await store.dispatch('auth/login')

    // then
    expect(store.getters['user/isLoggedIn']).to.equal(false)
    expect(store.getters['auth/isLoading']).to.equal(false)
    expect(store.getters['user/username']).to.equal(null)

    expectNoRedirection(by(store))
    expectNotification(by(store), 'error.login.connection')
  })

  it('Should logout', () => {
    // given
    let store = testStore()

    // when
    store.dispatch('auth/logout')

    // then
    expect(store.getters['user/isLoggedIn']).to.equal(false)

    expectRedirect(by(store), to('/login'))
    expectNotification(by(store), 'note.logout')
  })
})
