<template lang="html">
  <v-btn @click="logout()" text>
    <v-icon>mdi-account-circle</v-icon>
    <v-icon>mdi-exit-to-app</v-icon>
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('user', ['logout']),
  },
}
</script>

<style lang="css" scoped></style>
