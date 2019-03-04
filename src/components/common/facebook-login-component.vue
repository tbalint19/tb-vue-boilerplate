<template lang="html">
<script>
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '615996065493980',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.2'
      });

      window.statusChangeCallback = function(response) {
        console.log(response)
        FB.logout(function(response) {
          console.log(response)
        });
      }

      FB.getLoginStatus(function(response) {
        window.statusChangeCallback(response);
      });
      FB.AppEvents.logPageView();
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
    size="xlarge"
    scope="public_profile,email"
    onlogin="checkLoginState();">
    Continue with Facebook
  </fb:login-button>

  <script type="text/javascript">
    function checkLoginState() {
      FB.getLoginStatus(function(response) {
        window.statusChangeCallback(response);
      });
    }
  </script>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
