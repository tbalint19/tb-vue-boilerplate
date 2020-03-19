<template>
  <v-app>
    <x-navbar
      :links="navbar.links"
      :locales="navbar.locales"
      :siteName="navbar.siteName"
      :shortName="navbar.shortName"
    >
      <template v-slot:menu>
        <v-btn v-if="!isLoggedIn" @click="googleAuthRedirect()" text :loading="isLoggingIn" :disabled="isLoggingIn">
          <v-icon>mdi-account-circle</v-icon> <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <v-avatar size="40" v-if="picture">
          <img :src="picture" alt="user" />
        </v-avatar>
        <v-btn v-if="isLoggedIn" @click="logout()" text>
          <v-icon>mdi-account-circle</v-icon> <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </template>
    </x-navbar>

    <v-content>
      <x-slide-swap>
        <router-view></router-view>
      </x-slide-swap>
    </v-content>

    <x-cookie-consent :text="consent.text" :button="consent.button">
    </x-cookie-consent>

    <x-contact :options="footer.socialOptions"> </x-contact>

    <x-footer :links="footer.legal" :company="footer.company"> </x-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { content } from '@/content'
import querystring from 'querystring'

export default {
  name: 'App',
  data: () => ({
    navbar: content.common.navbar,
    consent: content.common.consent,
    footer: content.common.footer,
  }),
  computed: {
    ...mapGetters('user', ['isLoggedIn', 'picture', 'isLoggingIn']),
  },
  methods: {
    ...mapActions('user', [ 'set', 'login', 'logout' ]),
    googleAuthRedirect() {
      const googleAuthBaseUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
      const query = querystring.stringify({
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
        response_type: 'code',
        scope: 'openid email profile',
        redirect_uri: process.env.VUE_APP_GOOGLE_REDIRECT_URI,
        prompt: 'consent',
      })
      window.localStorage.setItem('redirect', this.$route.fullPath)
      const url = `${googleAuthBaseUrl}?${query}`
      const name = 'Authentication - openID'

      let windowObjectReference = null;
      let previousUrl = null;

      const vm = this
      const receiveMessage = ({ data }) => {
        const authorizationCode = data.authorizationCode
        const redirect = data.redirect
        if (authorizationCode)
          vm.login({ authorizationCode, redirect })
      }

       window.removeEventListener('message', receiveMessage);

       const viewportwidth = document.documentElement.clientWidth
       const width = 350
       const height = 550
       const top = 225
       const left = viewportwidth - 350 - 25
       const strWindowFeatures =
         `toolbar=no, menubar=no, width=${width}, height=${height}, top=${top}, left=${left}`;

       if (windowObjectReference === null || windowObjectReference.closed) {
         windowObjectReference = window.open(url, name, strWindowFeatures);
       } else if (previousUrl !== url) {
         windowObjectReference = window.open(url, name, strWindowFeatures)
         windowObjectReference.focus()
       } else {
         windowObjectReference.focus()
       }

       window.addEventListener('message', receiveMessage, false)
       previousUrl = url

    },
  },
  created() {
    this.$observeIdle()
    const sessionToken = window.sessionStorage.getItem('sessionToken')
    if (sessionToken) this.set({ sessionToken, redirect: this.$route.path })
  },
  mounted() {
    this.$onIdle('10m', () => console.log('will logout soon'))
    this.$onIdle('20m', this.logout)
  },
}
</script>

<style lang="scss">
@import './style/style.scss';
</style>
