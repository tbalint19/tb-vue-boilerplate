const namespaced = true

const state = (content) => () => ({
  filterParam: '',
  purchasedPackages: [],
  isLoading: false,
  primaryOffers: content.primaryOffers,
  selected: null,
})

const mutations = {
  UPDATE_FILTER_PARAM(state, value) {
    state.filterParam = value
  },
  SET_PURCHASED_PACKAGES(state, value) {
    state.purchasedPackages = value
  },
  TOGGLE_LOADING(state, to) {
    state.isLoading = to
  },
  SELECT_OFFER(state, name) {
    state.selected = name
  },
}

const getters = {
  primaryOffers: (state) => state.primaryOffers,
  filterParam: (state) => state.filterParam,
  isLoading: (state) => state.isLoading,
  filteredOffers: (state, getters) =>
    getters.primaryOffers.filter((offer) =>
      offer.name.includes(state.filterParam)
    ),
  personalizedOffers: (state, getters) =>
    getters.filteredOffers.filter(
      (offer) =>
        !state.purchasedPackages.map((p) => p.name).includes(offer.name)
    ),
  selected: (state, getters) =>
    getters.primaryOffers.find((offer) => offer.name == state.selected),
}

const actions = {
  reset(context) {
    context.commit('UPDATE_FILTER_PARAM', '')
    context.commit('SET_PURCHASED_PACKAGES', [])
  },
  updateFilterParam(context, value) {
    context.commit('UPDATE_FILTER_PARAM', value)
  },
  selectOffer(context, name) {
    context.commit('SELECT_OFFER', name)
  },
  async loadPurchasedPackages(context) {
    context.commit('TOGGLE_LOADING', true)
    try {
      const purchasedPackages = await this.$api.packageService.getPackages()
      context.commit('SET_PURCHASED_PACKAGES', purchasedPackages)
    } catch (e) {
      context.commit('SET_PURCHASED_PACKAGES', [])
    } finally {
      context.commit('TOGGLE_LOADING', false)
    }
  },
}

export default (content) => ({
  namespaced,
  state: state(content),
  getters,
  mutations,
  actions,
})
