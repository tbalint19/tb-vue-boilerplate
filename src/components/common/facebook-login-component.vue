<template lang="html">
  <div class="">
    <script type="application/javascript">
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '615996065493980',
          cookie     : true,
          xfbml      : true,
          version    : 'v3.2'
        });

        window.statusChangeCallback = function(response) {
          window.emitFacebookLoginSuccess();
          FB.logout(function(response){});
        }

        FB.getLoginStatus(function(response) {
          window.statusChangeCallback(response);
        });
        FB.AppEvents.logPageView();

        function sendToken(token) {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', window.facebookAuthUrl);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.onload = function() {
            if (xhr.status === 200) {
              window.emitLoginSuccessWithFBToken()
            } else {
              window.emitLoginFailureWithFBToken()
            }
            FB.logout(function(response){})
          };
          xhr.send(JSON.stringify({ token }));
        }
      };

      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    </script>

    <fb:login-button
      size="large"
      scope="public_profile,email"
      onlogin="checkLoginState();">
      Sign in with Facebook
    </fb:login-button>

    <script type="application/javascript">
      function checkLoginState() {
        FB.getLoginStatus(function(response) {
          window.statusChangeCallback(response);
        });
      }
    </script>
  </div>
</template>

<script>
export default {
  name: "FacebookLoginComponent",
  methods: {
    emitFacebookLoginSuccess: function() {
      this.$emit("facebookLoginSuccess")
    },
    emitLoginSuccess: function() {
      this.$emit("loginSuccess")
      this.disconnectGoogle()
    },
    emitFacebookLoginFailure: function() {
      this.$emit("facebookLoginFailure")
    },
    emitLoginFailure: function() {
      this.$emit("loginFailure")
    },
    setup: function() {
      window.emitFacebookLoginSuccess = this.emitFacebookLoginSuccess.bind(this)
      window.emitLoginSuccessWithFBToken = this.emitLoginSuccess.bind(this)
      window.emitFacebookLoginFailure = this.emitFacebookLoginFailure.bind(this)
      window.emitLoginFailureWithFBToken = this.emitLoginFailure.bind(this)
    },
    disconnectGoogle: function() {
      delete window["emitFacebookLoginSuccess"]
      delete window["emitLoginSuccessWithFBToken"]
      delete window["emitFacebookLoginFailure"]
      delete window["emitLoginFailureWithFBToken"]
    }
  },
  created() {
    this.setup()
  }
}
</script>

<style lang="css" scoped>
</style>
