var sinon = require('sinon');

import { testStore } from '../util/testStoreFactory'

describe('Store tests', () => {

  let store
  let consoleLogStub
  let routerStub
  let i18nStub
  let notifyStub

  beforeEach(() => {
    store = testStore()

    consoleLogStub = sinon.stub(console, 'log')
    console.log.callsFake((...args) => {
      console.info("STUBBED!!!", args)
    });

    routerStub = sinon.stub(store.$app.$router, 'push')
    routerStub.callsFake((...args) => {
      console.info("FAKE ROUTING!!!", args)
    })

    i18nStub = sinon.stub(store.$app, '$t')
    i18nStub.callsFake((...args) => {
      console.info("FAKE LOCALIZATION!!!", args)
    })

    notifyStub = sinon.stub(store.$app, '$notify')
    notifyStub.callsFake((...args) => {
      console.info("FAKE NOTIFICATION!!!", args)
    })
  })

  afterEach(() => {
    consoleLogStub.restore()
    notifyStub.restore()
    routerStub.restore()
    i18nStub.restore()
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
    sinon.assert.calledOnce(console.log);
    sinon.assert.calledWith(console.log, "called", "ottokar");

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

    sinon.assert.calledOnce(routerStub);
    //sinon.assert.calledOnce(i18nStub);
    sinon.assert.calledOnce(notifyStub);
  })
})
