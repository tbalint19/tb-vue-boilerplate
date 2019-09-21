<template lang="html">
  <div id="login-page">
    <b-container fluid>
      <b-row>
        <b-col cols="12">
          Login in progress...
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('user', [
      'login'
    ])
  },
  created() {
    const authorizationCode = this.$route.query.code
    this.login(authorizationCode)
  }
}
</script>

<style lang="css" scoped>
</style>
