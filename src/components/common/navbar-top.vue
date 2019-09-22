<template>
  <b-navbar type="light" variant="light" fixed="top">
    <b-navbar-brand to="/">{{ $t('navbar.title') }}</b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-button @click="demoGet">
        {{ $t('demo.get') }}
      </b-button>
      <b-button v-if="isLoggedIn" variant="outline-secondary" @click="logout">
        {{ $t('navbar.logout.button') }}
      </b-button>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import API from '@/api'

export default {
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
  },
  methods: {
    demoGet: function() {
      API.service.getUsers().then(r => console.log(r)).catch(e => console.log(e))
    },
    ...mapActions('user', ['logout']),
  },
}
</script>

<style lang="css" scoped></style>
