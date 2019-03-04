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
        var profile = googleUser.getBasicProfile();
        window.emitGoogleLoginSuccess(profile);
        var id_token = googleUser.getAuthResponse().id_token;
        sendToken(id_token)
      }
      function onFailure(err) {
        window.emitGoogleLoginFailure(err)
      }
      function sendToken(token) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', window.googleAuthUrl);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
          if (xhr.status === 200) {
            window.emitLoginSuccess()
          } else {
            window.emitLoginFailure()
          }
          googleSignOut()
        };
        xhr.send(JSON.stringify({ token }));
      }
      function googleSignOut() {
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
    emitGoogleLoginSuccess: function() {
      this.$emit("googleLoginSuccess")
    },
    emitLoginSuccess: function() {
      this.$emit("loginSuccess")
      this.disconnectGoogle()
    },
    emitGoogleLoginFailure: function() {
      this.$emit("googleLoginFailure")
    },
    emitLoginFailure: function() {
      this.$emit("loginFailure")
    },
    setup: function() {
      window.googleAuthUrl = this.authUrl
      window.emitGoogleLoginSuccess = this.emitGoogleLoginSuccess.bind(this)
      window.emitLoginSuccess = this.emitLoginSuccess.bind(this)
      window.emitGoogleLoginFailure = this.emitGoogleLoginFailure.bind(this)
      window.emitLoginFailure = this.emitLoginFailure.bind(this)
    },
    disconnectGoogle: function() {
      delete window["googleAuthUrl"]
      delete window["emitGoogleLoginSuccess"]
      delete window["emitLoginSuccess"]
      delete window["emitGoogleLoginFailure"]
      delete window["emitLoginFailure"]
    }
  },
  created() {
    this.setup()
  }
}
</script>

<style lang="css" scoped>
</style>
