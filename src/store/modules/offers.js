import content from "@/content"

const namespaced = true

const state = () => ({
  filterParam: "",
  primaryOffers: content.primaryOffers,
  purchasedPackages: [],
  isLoading: false,
  selected: null
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
  }
}

const getters = {
  filterParam: (state) => state.filterParam,
  isLoading: (state) => state.isLoading,
  primaryOffers: (state) => state.primaryOffers,
  filteredOffers: (state, getters) => getters.primaryOffers
    .filter(offer => offer.name.includes(state.filterParam)),
  personalizedOffers: (state, getters) => getters.filteredOffers
    .filter(offer => !(state.purchasedPackages
      .map(p => p.name)
        .includes(offer.name))),
  selected: (state, getters) => getters.primaryOffers
    .find(offer => offer.name == state.selected)
}

const actions = {
  reset(context) {
    context.commit('UPDATE_FILTER_PARAM', "")
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
      const purchasedPackages = await API.service.getPackages()
      context.commit('SET_PURCHASED_PACKAGES', purchasedPackages)
      this._vm.$notify('packages.loaded')
    } catch (e) {
      context.commit('SET_PURCHASED_PACKAGES', [])
    } finally {
      context.commit('TOGGLE_LOADING', false)
    }
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
}
