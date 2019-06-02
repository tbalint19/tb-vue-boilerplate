import { testStore } from '../util/testStoreFactory'
var jwt = require('jsonwebtoken');

describe('User tests', () => {

  it('should delete user when set with null', () => {
    // given
    let store = testStore()

    // when
    store.dispatch("user/set")

    // then
    expect(store.getters["user/username"]).to.equal(null)
    expect(store.getters["user/isLoggedIn"]).to.equal(false)
    expect(store.getters["user/is"]("admin")).to.equal(false)
    expect(store.getters["user/can"]("doStuff")).to.equal(false)
  })

  it('should delete user when set with invalid jwt', () => {
    // given
    let store = testStore()
    let token = "somethingInvalid"

    // when
    store.dispatch("user/set", token)

    // then
    expect(store.getters["user/username"]).to.equal(null)
    expect(store.getters["user/isLoggedIn"]).to.equal(false)
    expect(store.getters["user/is"]("admin")).to.equal(false)
    expect(store.getters["user/can"]("doStuff")).to.equal(false)
  })

  it('should set user when set with valid jwt', () => {
    // given
    let store = testStore()
    let token = jwt.sign({ username: "bela", role: "admin", permissions: ["doStuff", "doOtherStuff"] }, "secret-key");

    // when
    store.dispatch("user/set", token)

    // then
    expect(store.getters["user/username"]).to.equal("bela")
    expect(store.getters["user/isLoggedIn"]).to.equal(true)
    expect(store.getters["user/is"]("admin")).to.equal(true)
    expect(store.getters["user/can"]("doStuff")).to.equal(true)
  })

  it('should not authorize user without role', () => {
    // given
    let store = testStore()
    let token = jwt.sign({ username: "bela", role: "admin", permissions: ["doStuff", "doOtherStuff"] }, "secret-key");

    // when
    store.dispatch("user/set", token)

    // then
    expect(store.getters["user/username"]).to.equal("bela")
    expect(store.getters["user/isLoggedIn"]).to.equal(true)
    expect(store.getters["user/is"]("user")).to.equal(false)
    expect(store.getters["user/can"]("doStuff")).to.equal(true)
  })

  it('should not authorize user without permission', () => {
    // given
    let store = testStore()
    let token = jwt.sign({ username: "bela", role: "admin", permissions: ["doStuff", "doOtherStuff"] }, "secret-key");

    // when
    store.dispatch("user/set", token)

    // then
    expect(store.getters["user/username"]).to.equal("bela")
    expect(store.getters["user/isLoggedIn"]).to.equal(true)
    expect(store.getters["user/is"]("admin")).to.equal(true)
    expect(store.getters["user/can"]("doEverything")).to.equal(false)
  })

})
