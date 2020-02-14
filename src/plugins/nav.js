export default class NavPlugin {
  static install(Vue, options) {
    Vue.prototype.$nav = function({ _to, _new }) {
      if (_new) {
        window.open(_to, '_blank')
      } else {
        if (_to.startsWith('http'))
          window.location.replace(_to)
        else
          this.$router.push(_to)
      }
    }
  }
}
