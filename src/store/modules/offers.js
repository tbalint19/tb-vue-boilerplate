const namespaced = true

const _state = (content) => () => ({
  filterParam: '',
  purchasedPackages: [],
  isLoading: false,
  primaryOffers: content.demo.offer,
  selected: null,
})

const _mutations = {
  UPDATE_FILTER_PARAM(state, value) {
    state.filterParam = value
  },
  SET_PURCHASED_PACKAGES(state, value) {
    state.purchasedPackages = value
  },
  TOGGLE_LOADING(state, to) {
    state.isLoading = to
  },
  SELECT_OFFER(state, title) {
    state.selected = title
  },
}

const _getters = {
  primaryOffers: (state) => state.primaryOffers,
  purchasedPackages: (state) => state.purchasedPackages,
  filterParam: (state) => state.filterParam,
  isLoading: (state) => state.isLoading,
  filteredOffers: (state, getters) =>
    getters.primaryOffers.filter((offer) =>
      offer.title.includes(state.filterParam)
    ),
  personalizedOffers: (state, getters) =>
    getters.filteredOffers.filter(
      (offer) =>
        !state.purchasedPackages.map((p) => p.title).includes(offer.title)
    ),
  selected: (state, getters) =>
    getters.primaryOffers.find((offer) => offer.title == state.selected),
}

const _actions = {
  reset(context) {
    context.commit('UPDATE_FILTER_PARAM', '')
    context.commit('SET_PURCHASED_PACKAGES', [])
  },
  updateFilterParam(context, value) {
    context.commit('UPDATE_FILTER_PARAM', value)
  },
  selectOffer(context, title) {
    context.commit('SELECT_OFFER', title)
  },
  async loadPurchasedPackages(context) {
    context.commit('TOGGLE_LOADING', true)
    try {
      const response = await this.$api.packageService.getPackages()
      context.commit('SET_PURCHASED_PACKAGES', response.data)
    } catch (e) {
      context.commit('SET_PURCHASED_PACKAGES', [])
    } finally {
      context.commit('TOGGLE_LOADING', false)
    }
  },
}

export default (content) => ({
  namespaced,
  state: _state(content),
  getters: _getters,
  mutations: _mutations,
  actions: _actions,
})
