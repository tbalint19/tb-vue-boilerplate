import { testStore } from '../util/testStoreFactory'
import { to, by, expectRedirect, expectNotification } from '../util/sinonAssertions'

describe('Store tests', () => {

  let store
  beforeEach(() => {
    store = testStore()
  })

  it('Should update username', () => {
    // given

    // when
    store.dispatch("login/updateUsername", "bela")

    // then
    expect(store.getters["login/username"]).to.equal("bela")
    expect(store.getters["login/usernameIsValid"]).to.equal(false)
  })

  it('Should update username and getter for validation', () => {
    // given

    // when
    store.dispatch("login/updateUsername", "ottokar")

    // then
    expect(store.getters["login/username"]).to.equal("ottokar")
    expect(store.getters["login/usernameIsValid"]).to.equal(true)
  })

  it('Should update password', () => {
    // given

    // when
    store.dispatch("login/updatePassword", "ottokarpw")

    // then
    expect(store.getters["login/password"]).to.equal("ottokarpw")
    expect(store.getters["login/passwordIsValid"]).to.equal(true)
  })

  it('Should login', async () => {
    // given
    store.adapters.domain.onPost('/posts')
      .reply(201, { username: "belaFromMock" })

    // when
    await store.dispatch("login/login")

    // then
    expect(store.getters["user/loggedIn"]).to.equal(true)
    expect(store.getters["user/username"]).to.equal("belaFromMock")

    expectRedirect(by(store), to("/"))
    expectNotification(by(store))
  })

  it('Should logout', () => {
    // given

    // when
    store.dispatch("user/logout")

    // then
    expect(store.getters["user/loggedIn"]).to.equal(false)

    expectRedirect(by(store), to("/login"))
    expectNotification(by(store))
  })
})
