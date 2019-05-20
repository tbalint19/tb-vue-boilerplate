<template>
<b-navbar type="light" variant="light" fixed="top">
  <b-navbar-brand to="/">{{ $t("navbar.title") }}</b-navbar-brand>
  <b-navbar-nav class="ml-auto">
     <b-button
      v-if="loggedIn"
      variant="outline-secondary"
      @click="logout">
      {{ $t('navbar.logout.button') }}
     </b-button>
  </b-navbar-nav>
</b-navbar>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('user', [
      "loggedIn"
    ])
  },
  methods: {
    ...mapActions('user', {
      logout: "LOGOUT"
    })
  }
}
</script>

<style lang="css" scoped>

</style>
