const namespaced = true

const state = () => ({
  stuff: '',
})

const mutations = {
  SET_STUFF(state, value) {
    state.stuff = value
  },
}

const getters = {
  stuff: (state) => state.stuff,
}

const actions = {
  setStuff(context, value) {
    context.commit('SET_STUFF', value)
  },
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
}
