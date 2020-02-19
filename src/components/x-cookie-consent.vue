<template lang="html">
  <v-overlay :value="overlay" absolute>
    <v-alert
      class="ma-3"
      v-if="$vuetify.breakpoint.smAndUp"
      icon="mdi-alert"
      dark
      prominent
    >
      <v-row align="center">
        <v-col class="grow">{{ $t(text) }}</v-col>
        <v-col class="shrink">
          <v-btn color="success" @click="acceptConsent">
            {{ $t(button) }}
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
    <v-card class="ma-3" v-else>
      <v-card-text class="text-center op-50 mb-0 pb-0">
        <v-icon x-large>mdi-alert</v-icon>
      </v-card-text>
      <v-card-text class="text-center">
        {{ $t(text) }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="text-center">
        <v-btn color="success" @click="acceptConsent">
          {{ $t(button) }}
        </v-btn>
      </v-card-text>
    </v-card>
  </v-overlay>
</template>

<script>
export default {
  data: () => ({
    overlay: false,
  }),
  props: ['text', 'button'],
  methods: {
    acceptConsent() {
      if (window && window.localStorage)
        window.localStorage.setItem('consent-accepted', true)
      this.overlay = false
    },
  },
  created() {
    if (window && window.localStorage) {
      const consentAccepted = window.localStorage.getItem('consent-accepted')
      if (!consentAccepted) this.overlay = true
    } else {
      this.overlay = true
    }
  },
}
</script>
