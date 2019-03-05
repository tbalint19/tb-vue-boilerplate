<template lang="html">
  <div class="d-flex justify-content-around">
    <google-login-component
      @authSuccess="log"
      @authFail="log"
      @loginSuccess="log"
      @loginFail="log">
    </google-login-component>

    <facebook-login-component
      @authSuccess="log"
      @authFail="log"
      @loginSuccess="log"
      @loginFail="log">
    </facebook-login-component>
  </div>
</template>

<script>
export default {
  name: "LoginComponent",
  methods: {
    log: function(emittedData) { console.log(emittedData); }
  }
}
</script>

<style lang="css" scoped>
</style>
