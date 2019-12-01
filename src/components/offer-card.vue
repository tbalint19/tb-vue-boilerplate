<template lang="html">
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="offer.cardImageUrl"
    >
      <v-card-title>{{ offer.name }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">{{ offer.type }}</v-card-subtitle>

    <v-card-text class="text--primary">
      <div v-for="feature of offer.mainFeatures">{{ feature.text }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange"
        text
      >
        Share
      </v-btn>

      <v-btn
        color="orange"
        text
      >
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: [ 'offer' ]
}
</script>

<style lang="css" scoped>
</style>
