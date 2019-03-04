<template lang="html">
  <div class="card">
    <google-login-component
      @loginSuccess="loginSuccessHandler()"
      :authUrl="googleAuthUrl">
    </google-login-component>
  </div>
</template>

<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      googleAuthUrl: 'http://localhost:8080/api/auth/token'
    }
  },
  methods: {
    loginSuccessHandler: function() {
      console.log("received")
    }
  }
}
</script>

<style lang="css" scoped>
</style>
