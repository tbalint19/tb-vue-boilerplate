<template lang="html">
  <div>
    <v-snackbar bottom right v-model="languageSnackbar" dark color="grey">
      <v-select
        rounded
        v-model="language"
        :items="locales"
        dark
        item-color="grey"
      ></v-select>
    </v-snackbar>

    <v-app-bar app color="grey lighten-5">
      <div class="d-flex align-center">
        <v-btn
          aria-label="nav"
          tile
          @click.stop="navigationDrawer = !navigationDrawer"
          text
        >
          <v-icon>menu</v-icon>
        </v-btn>
        <h2 @click="$router.push('/')" class="ml-5 pointer-cursor">
          <span v-if="$vuetify.breakpoint.smAndUp">{{ siteName }}</span>
          <span v-else>{{ shortName }}</span>
        </h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        aria-label="shop"
        tile
        text
        @click="languageSnackbar = !languageSnackbar"
      >
        <v-icon>language</v-icon>
      </v-btn>
      <login-button v-if="!isLoggedIn"> </login-button>
      <v-avatar size="40" v-if="picture">
        <img :src="picture" alt="user" />
      </v-avatar>
      <logout-button v-if="isLoggedIn"> </logout-button>
    </v-app-bar>

    <v-navigation-drawer v-model="navigationDrawer" fixed temporary width="450">
      <div v-for="(link, i) in links">
        <v-list-item
          v-if="!link.subLinks.length"
          :key="i"
          @click="$nav(link.nav)"
          class="v-list-item"
        >
          <v-list-item-action>
            <v-icon>{{ link.icon.name }}</v-icon>
          </v-list-item-action>

          <v-list-item-title v-text="$t(link.text)" />
        </v-list-item>

        <v-list-group v-else :key="link.text" no-action>
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ $t(link.text) }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-list-item
            v-for="sublink in link.subLinks"
            @click="$nav(sublink.nav)"
            :key="sublink.text"
          >
            <v-list-item-title v-text="$t(sublink.text)" />
          </v-list-item>
        </v-list-group>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    languageSnackbar: false,
    language: 'en',
    navigationDrawer: null,
  }),
  props: ['links', 'locales', 'siteName', 'shortName'],
  computed: {
    ...mapGetters('user', ['isLoggedIn', 'picture']),
  },
  methods: {
    ...mapActions('user', []),
  },
  created() {
    this.language =
      navigator.languages && navigator.languages.length
        ? navigator.languages[0].split('-')[0]
        : navigator.userLanguage ||
          navigator.language ||
          navigator.browserLanguage ||
          process.env.VUE_APP_I18N_LOCALE
    this.$i18n.locale = this.language
  },
  watch: {
    language(value) {
      this.$i18n.locale = value
      const vm = this
      setTimeout(() => (vm.languageSnackbar = false), 150)
    },
  },
}
</script>
