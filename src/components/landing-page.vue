<template lang="html">
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="text-center">
            Packages
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
              <p class="card-text">Fontawesome</p>
              <a class="card-text" href="https://www.npmjs.com/package/vue-notification" target="_blank">
                Vue notifications
              </a>
              <p class="card-text">Axios (HTTP plugin)</p>
              <p class="card-text">Vue router</p>
              <p class="card-text">Vuex (state management)</p>
              <p class="card-text">I18n plugin</p>
              <p class="card-text">Auth setup</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <div class="card-header">
              Demo
            </div>
            <div class="card-body">
              <p class="card-text">
                <button  class="btn btn-outline-danger" @click="$notify(errorNotification)">
                  <v-icon name="times"/>
                  Error notification
                </button>
                <button  class="btn btn-outline-success" @click="$notify(authNotification)">
                  <v-icon name="beer"/>
                  Success notification
                </button>
              </p>
              <hr>
              <p class="card-text btn-group">
                <button  class="btn btn-outline-primary" @click="$notify()">
                  <v-icon name="minus"/>
                </button>
                <input type="text" class="form-control">
                <button  class="btn btn-outline-primary" @click="$notify()">
                  <v-icon name="plus"/>
                </button>
              </p>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
  data() {
    return {
      errorNotification: {
        group: 'error',
        type: 'warn',
        title: 'Important message',
        text: 'Hello user! This is a notification!'
      },
      authNotification: {
        group: 'auth',
        title: 'Important message',
        text: 'Hello user! This is a notification!'
      }
    }
  }
}
</script>

<style lang="css" scoped>
.link-like {

}
</style>
