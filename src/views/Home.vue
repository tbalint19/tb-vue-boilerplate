<template>
  <div class="home">
    <v-container fluid>
      <v-card width="344" class="pa-3">
        <v-text-field v-if="!firstName" label="Keresztnév" outlined>
        </v-text-field>
        <v-text-field v-else :value="firstName" label="Keresztnév" outlined>
        </v-text-field>
        <v-text-field v-if="!lastName" label="Vezetéknév" outlined>
        </v-text-field>
        <v-text-field v-else :value="lastName" label="Vezetéknév" outlined>
        </v-text-field>
        <v-textarea label="Ez a bajom" outlined> </v-textarea>
        <v-checkbox
          :label="'Tudomásul veszem hogy nem érdekel titeket'"
        ></v-checkbox>
        <v-switch :label="'Hírlevél azért jöhet'"></v-switch>
        <div class="d-flex flex-row-reverse">
          <v-btn color="success" @click="submit()">
            Küldés
          </v-btn>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

const url = (token) => {
  const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
  const RECAPTCHA_SECRET = "6LdbLa4ZAAAAAIHduf78nb_XgDyy-ik93MXtOSIy"
  return `${RECAPTCHA_VERIFY_URL}?response=${token}&secret=${RECAPTCHA_SECRET}`;
}

export default {
  name: 'home',
  computed: {
    ...mapGetters('user', ['firstName', 'lastName']),
  },
  methods: {
    async submit() {
      const token = await this.recaptchaToken()
      console.log("TOKEN (SEND TO BACKEND IN A HEADER ALONG WITH THE SUBMIT)", token)
      // ACTUAL SUBMIT (POST REQUEST WITH THE FORM DATA IN BODY AND TOKEN IN HEADER)
      console.log("URL TARGET ON BACKEND (WITH THE SECRET)", url(token))
    },
    recaptchaToken() {
      return new Promise((resolve) => {
        grecaptcha.ready(async () => {
          const RECAPTCHA_TOKEN = "6LdbLa4ZAAAAAANU86OKpQ5TSTsdzKhCt8fdtmTy"
          const token = await grecaptcha.execute(RECAPTCHA_TOKEN)
          resolve(token)
        });
      });
    }
  }
}
</script>
