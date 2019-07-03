const namespaced = true

const state = () => ({
  filterParam: '',
})

const mutations = {
  SET_FILTER_PARAM(state, value) {
    state.filterParam = value
  },
}

const getters = {
  filterParam: (state) => state.filterParam,
}

const actions = {
  filter(context, value) {
    context.commit('SET_FILTER_PARAM', value)
  },
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
}
