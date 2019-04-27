const state = {
  main: 0
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  }
}

const actions = {
  // LEAVE EMPTY
}

export default {
  state,
  mutations,
  actions
}
