<template lang="html">
<b-card :header="$t('login.title')">
  <b-form-input
    type="text"
    :placeholder="$t('login.username')"
    :value="username"
    @input="updateUsername"
    :disabled="isLoading"/>
  <b-form-input
    type="text"
    :placeholder="$t('login.password')"
    :value="password"
    @input="updatePassword"
    :disabled="isLoading"/>
  <hr>
  <b-button
    variant="outline-success btn-block"
    :disabled="!isActive"
    @click="login">
    <v-icon v-if="!isLoading" name="user"/>
    <v-icon v-else name="spinner" :spin="true"/>
    {{ $t('login.button') }}
  </b-button>
</b-card>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('login', [
      'username', 'password'
    ]),
    ...mapGetters('login', [
      'isLoading', 'isActive', 'usernameIsValid', 'passwordIsValid'
    ])
  },
  methods: {
    ...mapMutations('login', {
      updateUsername: 'UPDATE_LOGIN_USERNAME',
      updatePassword: 'UPDATE_LOGIN_PASSWORD'
    }),
    ...mapActions('login', {
      login: 'REQUEST_LOGIN'
    })
  }
}
</script>

<style lang="css" scoped>
.form-control {
  margin-bottom: 10px;
}
</style>
