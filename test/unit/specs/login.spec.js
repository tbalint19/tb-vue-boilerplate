import { testStore } from '../util/testStoreFactory'
import {
  to, by, expectRedirect, expectNotification, expectNoRedirection
} from '../util/sinonAssertions'

describe('Store tests', () => {

  it('Should update username', () => {
    // given
    let store = testStore()

    // when
    store.dispatch("login/updateUsername", "bela")

    // then
    expect(store.getters["login/username"]).to.equal("bela")
    expect(store.getters["login/usernameIsValid"]).to.equal(false)
  })

  it('Should update username and getter for validation', () => {
    // given
    let store = testStore()

    // when
    store.dispatch("login/updateUsername", "ottokar")

    // then
    expect(store.getters["login/username"]).to.equal("ottokar")
    expect(store.getters["login/usernameIsValid"]).to.equal(true)
  })

  it('Should update password', () => {
    // given
    let store = testStore()

    // when
    store.dispatch("login/updatePassword", "ottokarpw")

    // then
    expect(store.getters["login/password"]).to.equal("ottokarpw")
    expect(store.getters["login/passwordIsValid"]).to.equal(true)
  })

  it('Should start loading', async () => {
    // given
    let store = testStore()
    store.adapters.domain.onPost('/posts')
      .reply(201, { username: "belaFromMock" })

    // when
    store.dispatch("login/login")

    // then
    expect(store.getters["login/isLoading"]).to.equal(true)
  })

  it('Should login', async () => {
    // given
    let store = testStore()
    store.adapters.domain.onPost('/posts')
      .reply(201, { username: "belaFromMock" })

    // when
    await store.dispatch("login/login")

    // then
    expect(store.getters["user/loggedIn"]).to.equal(true)
    expect(store.getters["login/isLoading"]).to.equal(false)
    expect(store.getters["user/username"]).to.equal("belaFromMock")

    expectRedirect(by(store), to("/"))
    expectNotification(by(store))
  })

  it('Should not login for 401', async () => {
    // given
    let store = testStore()
    store.adapters.domain.onPost('/posts')
      .reply(401)

    // when
    await store.dispatch("login/login")

    // then
    expect(store.getters["user/loggedIn"]).to.equal(false)
    expect(store.getters["login/isLoading"]).to.equal(false)
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
