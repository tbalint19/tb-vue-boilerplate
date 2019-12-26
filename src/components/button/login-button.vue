<template lang="html">
  <v-btn @click="googleAuthRedirect()" text>
    <v-icon>mdi-account-circle</v-icon>
    <v-icon>mdi-chevron-right</v-icon>
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex'
const GOOGLE_CONFIG = require('@/../google.json')

export default {
  methods: {
    googleAuthRedirect: function() {
      const baseURL = 'https://accounts.google.com/o/oauth2/v2/auth'
      const clientId = 'client_id=' + GOOGLE_CONFIG.client_ID
      const responseType = 'response_type=code'
      const scope = 'scope=openid+email+profile'
      const redirectUri = 'redirect_uri=' + GOOGLE_CONFIG.redirect_uri
      const prompt = 'prompt=consent'
      const googleAuthUrl =
        baseURL +
        '?' +
        clientId +
        '&' +
        responseType +
        '&' +
        scope +
        '&' +
        redirectUri +
        '&' +
        prompt
      window.localStorage.setItem('redirect', this.$route.fullPath)
      window.location.href = googleAuthUrl
    },
    ...mapActions('user', ['set']),
  },
  mounted() {
    this.set({ sessionToken: null })
  },
}
</script>

<style lang="css" scoped></style>
