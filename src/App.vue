<template>
  <div id="app">
    <navbar-top></navbar-top>

    <fade-appear-swap>
      <router-view></router-view>
    </fade-appear-swap>

    <notifications :duration="7000">
      <custom-notification slot="body" slot-scope="props" :props="props">
      </custom-notification>
    </notifications>

    <navbar-bottom></navbar-bottom>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    /*
      TODO
        init store if necessary
         - initialy api calls
         - localstorage for "login"
         this.$store.dispatch("INIT")
         or nicer:
         mapstate + this.init()
       ...
    */
  },
}
</script>

<style>
/* Put here style that is applied to all components */
.container {
  margin-top: 100px;
  margin-bottom: 100px;
}

.fa-icon {
  width: auto;
  height: 0.8em;
  margin-left: 5px;
  margin-right: 5px;
  max-width: 100%;
  max-height: 100%;
}

.navbar {
  box-shadow: 0 0 15px 15px white;
}

.with-margin {
  margin-top: 10px;
}
</style>
