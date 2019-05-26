<template lang="html">
<b-card :header="$t('login.title')">
  <b-form-input
    type="text"
    :placeholder="$t('login.username')"
    :value="username"
    @input="updateUsername"
    :disabled="isLoading"/>
  <b-form-input
    type="password"
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
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('login', [
      'username', 'password', 'isLoading', 'isActive', 'usernameIsValid', 'passwordIsValid'
    ])
  },
  methods: {
    ...mapActions('login',[
      'login', 'updateUsername', 'updatePassword'
    ])
  }
}
</script>

<style lang="css" scoped>
.form-control {
  margin-bottom: 10px;
}
</style>
