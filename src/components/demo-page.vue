<template lang="html">
  <div id="demo-page">
    <b-container fluid>
      <b-row>
        <b-col cols="12">
          <carousel :responsive="{0:{items:1,nav:false},600:{items:4,nav:true}}">
            <b-card
              v-for="offer of personalizedOffers"
              :key="offer.name"
              :title="offer.name"
              :img-src="offer.cardImageUrl"
              img-top
              tag="article"
              class="m-2"
            >
              <b-card-text v-for="feature of offer.mainFeatures" :key="feature.text">
                <span :class="feature.iconColor">
                  <v-icon :name="feature.icon"/>
                </span>
                {{ feature.text }}
              </b-card-text>

              <b-button
                @click="$router.push({ path: 'offer', query: { offer: offer.name }})"
                variant="primary">
                Check offer
              </b-button>
            </b-card>
          </carousel>
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
