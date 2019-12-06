<template lang="html">
  <div class="about">
    <v-container fluid>
      <v-row>
        <v-col cols="3" justify="center">
          <h1>{{ selected.title }}</h1>
          <hr>
          <p class="text-justify">{{ selected.description }}</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'offer',
  computed: {
    ...mapGetters('offers', [
      'selected',
    ])
  },
  methods: {
    ...mapActions('offers', [
      'selectOffer',
    ])
  },
  created() {
    const offer = this.$route.query.offer
    console.log(offer);
    if (!this.$route.query.offer)
      return this.$router.push({ path: "/" })
    this.selectOffer(offer)
    if (!this.selected)
      return this.$router.push({ path: "/" })
  }
}
</script>

<style lang="css" scoped>
</style>
