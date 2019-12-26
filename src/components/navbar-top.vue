<template lang="html">
  <div class="">
    <v-app-bar app color="red accent-4" dark>
      <div class="d-flex align-center">
        <h1 class="pointer-cursor" @click="$router.push('/')">
          {{ $t('navbar.title') }}
        </h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn @click="snackbar = !snackbar" text>
        <v-icon>language</v-icon>
      </v-btn>
      <login-button v-if="!isLoggedIn"> </login-button>
      <logout-button v-else> </logout-button>
    </v-app-bar>
    <v-snackbar bottom right v-model="snackbar" color="grey lighten-5">
      <v-select rounded v-model="selected" :items="items"></v-select>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    snackbar: false,
    selected: 'en',
    items: [
      { text: 'Magyar', value: 'hu' },
      { text: 'English', value: 'en' },
    ],
  }),
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
  },
  watch: {
    selected(value) {
      this.$i18n.locale = value
      const vm = this
      setTimeout(() => (vm.snackbar = false), 150)
    },
  },
}
</script>

<style lang="css" scoped></style>
