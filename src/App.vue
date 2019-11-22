<template>
  <v-app>
    <navbar-top></navbar-top>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>

<style lang="scss">
@import './assets/style.scss';
</style>
