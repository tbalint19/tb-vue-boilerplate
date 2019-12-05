<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col cols="3" justify="center">
          <v-text-field
            id="filter"
            label="Search"
            outlined
            placeholder="Type to search in full offer"
            @input="updateFilterParam"
            :value="filterParam"
            color="primary">
          </v-text-field>
        </v-col>
        <v-col cols="9" justify="center">
          <v-row v-if="!isLoading">
            <v-col cols="4" justify="center" v-for="offer of personalizedOffers" :key="offer.name">
              <offer-card
                :offer="offer">
              </offer-card>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="4" offset="4">
              <loading></loading>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
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
