<template lang="html">
  <v-footer color="primary lighten-1" padless class="mt-12">
    <v-row justify="center" no-gutters class="grey darken-3">
      <v-btn
        :aria-label="$t(link.text)"
        v-for="(link, i) in links"
        :key="i"
        color="white"
        text
        rounded
        class="my-2"
        @click="$nav(link.nav)"
      >
        {{ $t(link.text) }}
      </v-btn>
      <v-col class="grey darken-2 py-4 text-center white--text" cols="12">
        {{ new Date().getFullYear() }} — <strong>{{ company }}</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  props: ['links', 'company'],
}
</script>
