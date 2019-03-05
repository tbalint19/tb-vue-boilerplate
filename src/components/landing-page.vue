<template lang="html">
  <div>
    <navbar-component></navbar-component>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="text-center">
            Default packages
          </div>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-header">
              Npm packages
            </div>
            <div class="card-body">
              <p class="card-text">VueJs</p>
              <p class="card-text">Bootstrap</p>
              <p class="card-text">Bootstrap vue</p>
              <p class="card-text">Fontawesome</p>
              <p class="card-text">Fortawesome</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <div class="card-header">
              TB packages
            </div>
            <div class="card-body">
              <p class="card-text">Auth plugin</p>
              <p class="card-text">Notifications plugin</p>
              <p class="card-text">Http plugin</p>
              <p class="card-text">Hash-router plugin</p>
              <p class="card-text">i18n plugin</p>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col">
          <p>Unit test are also set up. Karma is configured with headless chrome.</p>
          <p>
            For more information on this boilerplate see the
            <a href="https://github.com/tbalint19/tb-vue-boilerplate" target="_blank">README</a>.
          </p>
        </div>
      </div>

      <hr>

      <login-component></login-component>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPage"
}
</script>

<style lang="css" scoped>
</style>
