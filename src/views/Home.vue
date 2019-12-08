<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="12" md="4" lg="3" justify="center">
          <v-text-field
            id="filter"
            label="Search"
            outlined
            placeholder="Type to search in offers"
            @input="updateFilterParam"
            :value="filterParam"
            color="red accent-4">
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="8" lg="9">
          <v-row v-if="!isLoading">
            <v-col cols="12" sm="12" md="6" lg="4" v-for="offer of personalizedOffers" :key="offer.name">
              <offer-card
                :offer="offer">
              </offer-card>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12" justify="center">
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
