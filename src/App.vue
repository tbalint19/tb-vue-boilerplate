<template>
  <v-app>
    <x-navbar
      :links="navbar.links"
      :locales="navbar.locales">
    </x-navbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import content from '@/content'

export default {
  data: () => ({
    navbar: content.demo.common.navbar,

    languageSnackbar: false,
    language: 'hu',
    navigationDrawer: null,
  }),
  name: 'App',
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
  },
  methods: {
    ...mapActions('user', ['logout', 'set']),
  },
  created() {
    this.$observeIdle()
    const sessionToken = window.sessionStorage.getItem('sessionToken')
    if (sessionToken) this.set({ sessionToken, redirect: this.$route.path })
  },
  mounted() {
    this.$onIdle('50m', () => console.log('will logout soon'))
    this.$onIdle('1h', this.logout)
  },
}
</script>

<style lang="scss">
@import './style/style.scss';
</style>
