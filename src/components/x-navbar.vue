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

    <v-app-bar app color="blue darken-4" dark>
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
          <span v-if="!$slots.logo">
            <span v-if="$vuetify.breakpoint.smAndUp">{{ siteName }}</span>
            <span v-else>{{ shortName }}</span>
          </span>
          <span v-else>
            <slot name="logo"></slot>
          </span>
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
      <slot name="menu"></slot>
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
export default {
  data: () => ({
    languageSnackbar: false,
    language: null,
    navigationDrawer: null,
  }),
  props: ['links', 'locales', 'siteName', 'shortName'],
  created() {
    this.language = this.$i18n.locale
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
