var sinon = require('sinon');

import { testStore } from '../util/testStoreFactory'

describe('Store tests', () => {

  let store

  beforeEach(() => {
    store = testStore()

    store.$app.$router.push.callsFake((...args) => {
      console.info("FAKE ROUTING!!!", args)
    })

    store.$app.$t.callsFake((...args) => {
      console.info("FAKE LOCALIZATION!!!", args)
    })

    store.$app.$notify.callsFake((...args) => {
      console.info("FAKE NOTIFICATION!!!", args)
    })
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
    expect(store.state.login.username).to.equal("")
    expect(store.getters["login/passwordIsValid"]).to.equal(true)
    expect(store.getters["login/usernameIsValid"]).to.equal(false)
  })

  it('Should logout', () => {
    // given
    /* Default store is not touched */

    // when
    store.dispatch("user/LOGOUT")

    // then
    expect(store.state.user.loggedIn).to.equal(false)

    sinon.assert.calledOnce(store.$app.$router.push);
    //sinon.assert.calledOnce(i18nStub);
    sinon.assert.calledOnce(store.$app.$notify);
  })
})
