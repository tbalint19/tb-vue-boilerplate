<template>
  <v-app>
    <x-navbar :links="navbar.links" :locales="navbar.locales"> </x-navbar>

    <v-content>
      <router-view></router-view>
    </v-content>

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
    footer: content.common.footer,

    languageSnackbar: false,
    language: 'hu',
    navigationDrawer: null,
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
