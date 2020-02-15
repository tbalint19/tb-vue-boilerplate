<template lang="html">
  <div>
    This is a login page
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('user', ['login']),
  },
  created() {
    const authorizationCode = this.$route.query.code
    const redirect = window.localStorage.getItem('redirect') || '/'
    window.localStorage.removeItem('redirect')
    this.login({ authorizationCode, redirect })
  },
}
</script>
