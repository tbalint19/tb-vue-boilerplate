<template lang="html">
  <div class="">
    <v-app-bar app color="success" dark>
      <div class="d-flex align-center">
        <h1>{{ $t('navbar.title') }}</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn @click="snackbar = !snackbar" text>
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>
    </v-app-bar>
    <v-snackbar bottom right v-model="snackbar" color="grey lighten-5">
      <v-select rounded v-model="selected" :items="items"></v-select>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    snackbar: false,
    selected: 'en',
    items: [
      { text: 'Magyar', value: 'hu' },
      { text: 'English', value: 'en' },
    ],
  }),
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
