<template>
  <div id="app">
    <navbar-top></navbar-top>

    <fade-appear-swap>
      <router-view></router-view>
    </fade-appear-swap>

    <notifications :duration="7000">
      <custom-notification slot="body" slot-scope="props" :props="props">
      </custom-notification>
    </notifications>

    <navbar-bottom></navbar-bottom>
  </div>
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

<style>
/* Put here style that is applied to all components */
.container {
  margin-top: 100px;
  margin-bottom: 100px;
}

.container-fluid {
  margin-top: 100px;
  margin-bottom: 100px;
}

.op-50 {
  opacity: 0.5;
}

.fa-icon {
  width: auto;
  height: 0.8em;
  margin-left: 5px;
  margin-right: 5px;
  max-width: 100%;
  max-height: 100%;
}

.navbar {
  box-shadow: 0 0 15px 15px white;
}

.with-margin {
  margin-top: 10px;
}
</style>
