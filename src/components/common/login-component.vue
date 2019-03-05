<template lang="html">
  <div class="d-flex justify-content-center">
    <google-login-component
      @authSuccess="log"
      @authFail="log"
      @loginSuccess="log"
      @loginFail="log">
    </google-login-component>
    &nbsp;
    <facebook-login-component>
    </facebook-login-component>
  </div>
</template>

<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      googleAuthUrl: 'http://localhost:8080/login'
    }
  },
  methods: {
    log: function(r) {
      console.log(r)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
