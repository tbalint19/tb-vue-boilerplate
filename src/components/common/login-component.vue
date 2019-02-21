<template lang="html">
  <div class="card">
    <google-login-component
      @googleLoginSuccess="googleLoginSuccessHandler()"
      :authUrl="'http://localhost:8080/api/auth/token'">
    </google-login-component>
  </div>
</template>

<script>
export default {
  name: "LoginComponent",
  methods: {
    googleLoginSuccessHandler: function() {
      console.log("received")
    }
  }
}
</script>

<style lang="css" scoped>
</style>
