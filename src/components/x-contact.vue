<template>
  <v-speed-dial
    v-model="fab"
    bottom
    right
    fixed
    :open-on-hover="true"
    transition="slide-y-reverse-transition"
  >
    <template v-slot:activator>
      <v-btn
        aria-label="social"
        v-model="fab"
        color="red accent-4"
        dark
        fab
        x-large
      >
        <v-icon v-if="fab">mdi-close</v-icon>
        <v-icon v-else>mdi-handshake</v-icon>
      </v-btn>
    </template>

    <v-btn
      @click="$nav(site.nav)"
      v-for="(site, i) in options"
      :key="i"
      fab
      dark
      small
      color="grey accent-4"
    >
      <v-icon>{{ site.icon.name }}</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  data: () => ({
    fab: false
  }),
  props: [ 'options' ]
}
</script>
