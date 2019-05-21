<template>
  <div id="app">
    <navbar-top></navbar-top>

    <router-view></router-view>

    <notifications group="auth" position="bottom center" width="75%"/>
    <notifications group="error" position="top right" classes="vue-notification with-margin"/>

    <navbar-bottom></navbar-bottom>
  </div>
</template>

<script>
export default {
  name: 'App',
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
  }
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

.growAppearAndCollapseFade-enter-active {
  animation: grow-and-appear 1.2s ease forwards;
}

.growAppearAndCollapseFade-leave-active {
  animation: collapse-and-fade 1.2s ease forwards;
}

@keyframes grow-and-appear {
  0% { opacity: 0; max-height: 0; }
  20% { opacity: 0; }
  60% { max-height: 25em; }
  100% { opacity: 1; max-height: 25em; }
}

@keyframes collapse-and-fade {
  0% { opacity: 1; max-height: 25em; }
  20% { max-height: 25em; }
  60% { opacity: 0; }
  100% { opacity: 0; max-height: 0; }
}
</style>
