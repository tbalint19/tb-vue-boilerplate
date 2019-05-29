import { testStore } from '../util/testStoreFactory'
import {
  to, by, expectRedirect, expectNotification, expectNoRedirection
} from '../util/sinonAssertions'

describe('Login tests', () => {

  it('Should initialize proper state')

  it('Should update username', () => {
    // given
    let store = testStore()

    // when
    store.dispatch("login/updateUsername", "a")

    // then
    expect(store.getters["login/username"]).to.equal("a")
    expect(store.getters["login/usernameIsValid"]).to.equal(false)
  })

  it('Should update getter for validation with valid username', () => {
    // given
    let store = testStore()

    // when
    store.dispatch("login/updateUsername", "ottokar")

    // then
    expect(store.getters["login/usernameIsValid"]).to.equal(true)
  })

  it('Should update password', () => {
    // given
    let store = testStore()

    // when
    store.dispatch("login/updatePassword", "a")

    // then
    expect(store.getters["login/password"]).to.equal("a")
    expect(store.getters["login/passwordIsValid"]).to.equal(false)
  })

  it('Should update getter for validation with password', () => {
    // given
    let store = testStore()

    // when
    store.dispatch("login/updatePassword", "ottokarpw")

    // then
    expect(store.getters["login/passwordIsValid"]).to.equal(true)
  })

  it('Should start loading when login request is sent', async () => {
    // given
    let store = testStore()
    store.$domainMock.onPost('/posts')
      .reply(201, { username: "belaFromMock" })

    // when
    store.dispatch("login/login")

    // then
    expect(store.getters["login/loading"]).to.equal(true)
  })

  it('Should login for http200', async () => {
    // given
    let store = testStore()
    store.$domainMock.onPost('/posts')
      .reply(201, { username: "belaFromMock" })

    // when
    await store.dispatch("login/login")

    // then
    expect(store.getters["user/loggedIn"]).to.equal(true)
    expect(store.getters["login/loading"]).to.equal(false)
    expect(store.getters["user/username"]).to.equal("belaFromMock")

    expectRedirect(by(store), to("/"))
    expectNotification(by(store))
  })

  it('Should not login for http401', async () => {
    // given
    let store = testStore()
    store.$domainMock.onPost('/posts')
      .reply(401)

    // when
    await store.dispatch("login/login")

    // then
    expect(store.getters["user/loggedIn"]).to.equal(false)
    expect(store.getters["login/loading"]).to.equal(false)
    expect(store.getters["user/username"]).to.equal(null)

    expectNoRedirection(by(store))
    expectNotification(by(store))
  })

  it('Should update disabled getter')

  it('Should update active getter')

  it('Should not notify user about network error', async () => {
    // given
    let store = testStore()
    store.$domainMock.onPost('/posts')
      .networkError();

    // when
    await store.dispatch("login/login")

    // then
    expect(store.getters["user/loggedIn"]).to.equal(false)
    expect(store.getters["login/loading"]).to.equal(false)
    expect(store.getters["user/username"]).to.equal(null)

    expectNoRedirection(by(store))
    expectNotification(by(store))
  })

  it('Should logout', () => {
    // given
    let store = testStore()

    // when
    store.dispatch("user/logout")

    // then
    expect(store.getters["user/loggedIn"]).to.equal(false)

    expectRedirect(by(store), to("/login"))
    expectNotification(by(store))
  })
})
