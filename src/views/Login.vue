<template lang="html">
  <div class="">
    This is a login page
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('user', ['login']),
  },
  created() {
    const authorizationCode = this.$route.query.code
    const redirect = window.localStorage.getItem('redirect') || "/"
    window.localStorage.removeItem('redirect')
    this.login({ authorizationCode, redirect })
  },
}
</script>

<style lang="css" scoped>
</style>
