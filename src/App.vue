<template>
  <v-app>
    <navbar-top></navbar-top>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
const _ = require('lodash')

export default {
  name: 'App',
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
  },
  methods: {
    ...mapActions('user', ['logout']),
  },
  mounted() {
    let logoutTimeoutId
    let vm = this
    const logoutIfNeeded = function() {
      if (vm.isLoggedIn) {
        // map other logout blocking activities, e.g. 'isWatchingVideo'
        vm.logout()
      }
      debouncedTimer()
    }
    function startTimer() {
      if (logoutTimeoutId) clearTimeout(logoutTimeoutId)
      logoutTimeoutId = window.setTimeout(logoutIfNeeded, 900000)
    }
    const debouncedTimer = _.debounce(startTimer, 1000, { leading: true })
    document.addEventListener('mousemove', debouncedTimer, false)
    document.addEventListener('mousedown', debouncedTimer, false)
    document.addEventListener('scroll', debouncedTimer, false)
    document.addEventListener('keyup', debouncedTimer, false)
    document.addEventListener('touchmove', debouncedTimer, false)
    debouncedTimer()
  },
}
</script>

<style lang="scss">
@import './style/style.scss';
</style>
