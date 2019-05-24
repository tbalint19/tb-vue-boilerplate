export default {

  state: {
    selectedIndex: 0,
    messages: [
      {
        title: "landing.message.first.title",
        p1: "landing.message.first.p1",
        p2: "landing.message.first.p1"
      },
      {
        title: "landing.message.second.title",
        p1: "landing.message.second.p1",
        p2: "landing.message.second.p2"
      },
      {
        title: "landing.message.third.title",
        p1: "landing.message.third.p1",
        p2: "landing.message.third.p2"
      },
    ]
  },

  mutations: {
    PREVIOUS (state) {
      if (0 < state.selectedIndex) {
          state.selectedIndex--
      } else {
        state.selectedIndex = state.messages.length - 1
      }
    },
    NEXT (state) {
      if (state.selectedIndex < state.messages.length - 1) {
          state.selectedIndex++
      } else {
        state.selectedIndex = 0
      }
    }
  },

  getters: {
    current: state => state.messages[state.selectedIndex],
    isSelected: (state, getters) => message => message.title == getters.current.title
  }
}
