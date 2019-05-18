<template lang="html">
  <div id="landing-page">
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
              <p class="card-text">
                <a href="https://vuejs.org/v2/guide/" target="_blank">
                  VueJs
                </a>
              </p>
              <p class="card-text">
                <a href="https://getbootstrap.com/docs/4.3/components/alerts/" target="_blank">
                  Bootstrap (out-of-the-box prod ready css components)
                </a>
              </p>
              <p class="card-text">
                <a href="https://github.com/Justineo/vue-awesome" target="_blank">
                  Fontawesome (icons)
                </a>
              </p>
              <p class="card-text">
                <a href="https://www.npmjs.com/package/vue-notification" target="_blank">
                  Vue notifications
                </a>
              </p>
              <p class="card-text">
                <a href="https://router.vuejs.org/guide/#html" target="_blank">
                  Vue router
                </a>
              </p>
              <p class="card-text">
                <a href="https://github.com/axios/axios" target="_blank">
                  Axios (HTTP client)
                </a>
              </p>
              <p class="card-text">
                <a href="http://kazupon.github.io/vue-i18n/started.html#html" target="_blank">
                  I18n plugin
                </a>
              </p>
              <p class="card-text">
                <a href="https://vuex.vuejs.org/guide/" target="_blank">
                  Vuex (state management)
                </a>
              </p>
              <p class="card-text">Auth setup (custom implementation)</p>
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
              <p class="card-text">
                <button class="btn btn-outline-secondary" @click="$router.push('/other')">
                  To other page
                </button>
              </p>
              <hr>
              <p class="card-text">
                <button class="btn btn-outline-warning" @click="getTodo()">
                  Get todos
                </button>
                <button class="btn btn-outline-warning">
                  Post todo
                </button>
              </p>
              <hr>
              <p class="card-text">
                <select v-model="$i18n.locale">
                  <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
                </select>
                <span>{{ $t("demo.title") }}</span>
              </p>
              <hr>
              <p class="card-text btn-group">
                <button  class="btn btn-outline-primary" @click="$store.commit('DECREMENT_MAIN_COUNTER')">
                  <v-icon name="minus"/>
                </button>
                <input class="form-control" type="text" disabled :placeholder="$store.state.counter.main">
                <button  class="btn btn-outline-primary" @click="$store.commit('INCREMENT_MAIN_COUNTER')">
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
  data() {
    return {
      langs: ['hu', 'en'],
      errorNotification: {
        group: 'error',
        type: 'error',
        title: 'Important message',
        text: 'Hello user! This is a notification!'
      },
      authNotification: {
        group: 'auth',
        type: 'success',
        title: 'Important message',
        text: 'Hello user! This is a notification!'
      }
    }
  },
  methods: {
    getTodo () {
      this.$todoApi.getTodo({ userId: 1 })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="css" scoped>

</style>
