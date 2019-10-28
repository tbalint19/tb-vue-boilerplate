<template lang="html">
  <div id="auth-page">
    <b-container fluid>
      <b-row class="justify-content-md-center">
        <b-col s="12" md="6">
          <landing-message> </landing-message>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center">
        <b-col s="12" md="6">
          <b-button
            variant="outline-success btn-block mt-2"
            @click="googleAuthRedirect()"
          >
            {{ $t('login.with.google') }}
          </b-button>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center">
        <b-col s="12" md="6">
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()">
          <button v-on:click="submitFile()">Submit</button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import API from '@/api'
const GOOGLE_CONFIG = require('../../google.json')

export default {
  data() {
    return {
      file: null
    }
  },
  methods: {
    handleFileUpload: function() {
      this.file = this.$refs.file.files[0];
    },
    async submitFile(){
      let formData = new FormData();
      formData.append('file', this.file);
      try {
        let response = await API.service.upload(formData)
      } catch (e) {
        console.log("!!!!!!!!error");
        console.log(e);
      }
    },
    googleAuthRedirect: function() {
      const baseURL = 'https://accounts.google.com/o/oauth2/v2/auth'
      const clientId = 'client_id=' + GOOGLE_CONFIG.client_ID
      const responseType = 'response_type=code'
      const scope = 'scope=openid+email+profile'
      const redirectUri = 'redirect_uri=' + GOOGLE_CONFIG.redirect_uri
      const prompt = 'prompt=consent'
      const googleAuthUrl =
        baseURL +
        '?' +
        clientId +
        '&' +
        responseType +
        '&' +
        scope +
        '&' +
        redirectUri +
        '&' +
        prompt
      window.location.href = googleAuthUrl
    },
    ...mapActions('user', ['set']),
  },
  mounted() {
    this.set({ sessionToken: null })
  },
}
</script>

<style lang="css" scoped></style>
