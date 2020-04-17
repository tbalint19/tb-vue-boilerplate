<template lang="html">
  <v-container fill-height fluid class="op-50">
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <v-progress-circular
          indeterminate
          size="150"
          class="mb-4"
        ></v-progress-circular>
        <p>{{ $t(loadingText) }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { content } from '@/content'

export default {
  data: () => ({
    loadingText: content.pages.login.loadingText,
  }),
  methods: {
    ...mapActions('user', ['login']),
  },
  created() {
    const authorizationCode = this.$route.query.code
    const redirect = window.localStorage.getItem('redirect') || '/'
    window.localStorage.removeItem('redirect')
    if (window.opener) {
      window.opener.postMessage({ authorizationCode, redirect })
      window.close()
    }
  },
}
</script>
