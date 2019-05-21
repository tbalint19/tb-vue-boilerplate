var sinon = require('sinon');

import { testStore } from '../util/testStoreFactory'
import { unitTestMockTodo } from '../../../src/api/mock/todo-mock'

describe('Store tests', () => {

  let store
  let mockApi
  let voidClosure = (...args) => { }

  beforeEach(() => {
    store = testStore()

    store.$app.$router.push.callsFake(voidClosure)
    store.$app.$t.callsFake(voidClosure)
    store.$app.$notify.callsFake(voidClosure)

    mockApi = unitTestMockTodo(store)
  })

  it('Should update username', () => {
    // given
    /* Default store is not touched */

    // when
    store.commit("login/UPDATE_LOGIN_USERNAME", "bela")

    // then
    expect(store.state.login.username).to.equal("bela")
    expect(store.getters["login/usernameIsValid"]).to.equal(false)
  })

  it('Should update username and getter for validation', () => {
    // given
    /* Default store is not touched */

    // when
    store.commit("login/UPDATE_LOGIN_USERNAME", "ottokar")

    // then
    expect(store.state.login.username).to.equal("ottokar")
    expect(store.getters["login/usernameIsValid"]).to.equal(true)
  })

  it('Should update password', () => {
    // given
    /* Default store is not touched */

    // when
    store.commit("login/UPDATE_LOGIN_PASSWORD", "ottokarpw")

    // then
    expect(store.state.login.password).to.equal("ottokarpw")
    expect(store.getters["login/passwordIsValid"]).to.equal(true)
  })

  it('Should login', () => {
    // given
    mockApi.onPost('/posts')
      .reply(201, { username: "belaFromMock" })

    // when
    store.dispatch("login/REQUEST_LOGIN")

    // then
    .then(() => {
      expect(store.state.user.loggedIn).to.equal(true)
      expect(store.state.user.username).to.equal("belaFromMock")
    })
  })

  it('Should logout', () => {
    // given
    /* Default store is not touched */

    // when
    store.dispatch("user/LOGOUT")

    // then
    expect(store.state.user.loggedIn).to.equal(false)

    sinon.assert.calledOnce(store.$app.$router.push);
    sinon.assert.calledOnce(store.$app.$notify);
    sinon.assert.callCount(store.$app.$t, 2);
  })
})
