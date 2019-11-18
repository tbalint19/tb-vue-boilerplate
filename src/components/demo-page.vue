<template lang="html">
  <div id="demo-page">
    <b-container fluid>
      <b-row>
        <b-col cols="12">
          <p v-for="offer of personalizedOffers">
            {{ offer.name }} ({{ offer.type }})
          </p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('offers', [
      'personalizedOffers', 'filterParam', 'isLoading'
    ])
  },
  methods: {
    ...mapActions('offers', [
      'updateFilterParam', 'reset', 'loadPurchasedPackages'
    ])
  }
}
</script>

<style lang="css" scoped>
</style>
