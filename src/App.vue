<template>
  <v-app>
    <x-navbar
      :links="navbar.links"
      :locales="navbar.locales"
      :siteName="navbar.siteName"
      :shortName="navbar.shortName"
    >
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
import { mapActions } from 'vuex'
import { content } from '@/content'

export default {
  name: 'App',
  data: () => ({
    navbar: content.common.navbar,
    consent: content.common.consent,
    footer: content.common.footer,
  }),
  methods: {
    ...mapActions('user', ['logout', 'set']),
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
