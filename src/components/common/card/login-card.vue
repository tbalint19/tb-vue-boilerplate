<template lang="html">
  <b-card :header="$t('login.title')">
    <b-form-input
      type="text"
      :placeholder="$t('login.username')"
      :value="username"
      @input="updateUsername"
      @blur="blurUsername"
    />
    <input-error
      :condition="userNameErrorShown"
      :localization="usernameErrorKey"
    >
    </input-error>
    <b-form-input
      type="password"
      :placeholder="$t('login.password')"
      :value="password"
      @input="updatePassword"
      @blur="blurPassword"
    />
    <input-error
      :condition="passwordErrorShown"
      :localization="passwordErrorKey"
    >
    </input-error>
    <hr />
    <b-button
      variant="outline-success btn-block"
      :disabled="isDisabled"
      @click="login"
    >
      <v-icon v-if="!isLoading" name="user" />
      <v-icon v-else name="spinner" :spin="true" />
      {{ $t('login.button') }}
    </b-button>
  </b-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', [
      'username',
      'password',
      'usernameIsValid',
      'passwordIsValid',
      'userNameErrorShown',
      'passwordErrorShown',
      'usernameErrorKey',
      'passwordErrorKey',
      'isLoading',
      'isDisabled',
    ]),
  },
  methods: {
    ...mapActions('auth', [
      'init',
      'updateUsername',
      'blurUsername',
      'updatePassword',
      'blurPassword',
      'login',
    ]),
  },
  created() {
    this.init()
  },
}
</script>

<style lang="css" scoped>
.form-control {
  margin-bottom: 10px;
}
</style>
