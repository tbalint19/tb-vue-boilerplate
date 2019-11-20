<template lang="html">
  <div id="login-page">
    <b-container fluid>
      <b-row class="justify-content-md-center">
        <b-col s="12" md="6" class="op-50 mt-5">
          <center>
            <p>Loading</p>
          </center>
          <center>
            <h4 class="mt-5 text-success">
              {{ $t('login.inProgress') }}
            </h4>
          </center>
        </b-col>
      </b-row>
    </b-container>
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
    this.login(authorizationCode)
  },
}
</script>

<style lang="css" scoped></style>
