<template>
  <div class="home">
    <img alt="Vue logo" src="@/../public/img/logo.png" />
    <center>
      <input
        type="text"
        placeholder="Keress"
        :value="filterParam"
        @input="updateFilterParam">
      <loading v-if="isLoading"></loading>
      <div v-else>
        <list-element
          v-for="offer of personalizedOffers"
          :text="offer.name"
          :key="offer.name">
        </list-element>
      </div>
    </center>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'home',
  computed: {
    ...mapGetters('offers', [
      'isLoading',
      'filterParam',
      'personalizedOffers'
    ])
  },
  methods: {
    ...mapActions('offers', [
      'updateFilterParam',
      'loadPurchasedPackages'
    ])
  },
  created() {
    this.loadPurchasedPackages()
  }
}
</script>
