<template>
<b-navbar type="light" variant="light" fixed="top">
  <b-navbar-brand to="/">{{ $t("navbar.title") }}</b-navbar-brand>
  <b-navbar-nav class="ml-auto">
     <b-button
      v-if="isLoggedIn"
      variant="outline-secondary"
      @click="logout">
      {{ $t('navbar.logout.button') }}
     </b-button>
  </b-navbar-nav>
</b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('user', [
      "isLoggedIn"
    ])
  },
  methods: {
    ...mapActions('auth', [
      'logout'
    ])
  }
}
</script>

<style lang="css" scoped>

</style>
