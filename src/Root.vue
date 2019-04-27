<template>
  <div id="root">
    <navbar-component></navbar-component>

    <router-view></router-view>

    <notifications group="auth" position="bottom center" width="75%"/>
    <notifications group="error" position="top right" classes="vue-notification with-margin"/>
  </div>
</template>

<script>
export default {
  name: 'Root'
}
</script>

<style>
/* Put here style that is applied to all components */
.container {
  margin-top: 25px;
}

.with-margin {
  margin-top: 10px;
}
</style>
