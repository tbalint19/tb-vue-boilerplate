<template lang="html">
  <div id="google-login-component">
    <div id="my-signin2" class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
    <script type="application/javascript">
      function renderButton() {
        gapi.signin2.render('my-signin2', {
          'scope': 'profile email',
          'width': 300,
          'height': 50,
          'longtitle': true,
          'theme': 'dark',
          'onsuccess': onSuccess,
          'onfailure': onFailure
        });
      }
      function onSuccess(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        sendToken(id_token)
      }
      function onFailure(error) {
        console.log(error);
      }
      function sendToken(token) {
        console.log("sending now...")
        var xhr = new XMLHttpRequest();
        xhr.open('POST', window.googleAuthUrl);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
          if (xhr.status === 200) {
            console.log('Signed in as: ' + xhr.responseText);
            signOut()
            window.emitLogin()
          } else {
            console.log("Error with status code", xhr.status)
            signOut()
            window.emitLogin()
          }
        };
        xhr.send(JSON.stringify({ token }));
      }
      function signOut() {
        gapi.auth2.getAuthInstance().signOut()
          .then(() => console.log("Succes"))
          .catch(err => console.log("Error", err))
      }
    </script>
    <script
      type="application/javascript"
      src="https://apis.google.com/js/platform.js?onload=renderButton" async defer>
    </script>
  </div>
</template>

<script>
export default {
  name: "GoogleLoginComponent",
  props: {
    authUrl: String
  },
  methods: {
    emitGoogleLogin: function() {
      this.$emit("googleLoginSuccess")
      delete window["googleAuthUrl"]
      delete window["emitLogin"]
    }
  },
  created() {
    window.googleAuthUrl = this.authUrl
    window.emitLogin = this.emitGoogleLogin.bind(this)
  }
}
</script>

<style lang="css" scoped>
</style>
