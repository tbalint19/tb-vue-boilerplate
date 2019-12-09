<template lang="html">
  <div class="offer-card">
    <v-card
      class="mx-auto"
      max-width="400"
    >
      <v-img
        class="white--text align-end"
        height="200px"
        :src="offer.images[0].url"
        :lazy-src="'https://picsum.photos/10/6?image=20'"
      >
        <v-card-title>{{ offer.title }}</v-card-title>
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
            >
            <v-progress-circular indeterminate color="red accent-4"></v-progress-circular>
          </v-row>
        </template>
      </v-img>

      <v-card-subtitle class="pb-0">{{ offer.subtitle }}</v-card-subtitle>

      <v-card-text class="mt-3">
        <div v-for="advantage of offer.advantages">
          <span>
            <v-icon :class="advantage.color.name">{{ advantage.icon.name }}</v-icon>
            <span class="ml-3">{{ advantage.name }}</span>
          </span>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="grey darken-2"
          text
          >
          Share
        </v-btn>

        <v-btn
        :data-uid="offer.title"
        @click="$router.push(`/offer?offer=${offer.title}`)"
        color="red accent-4"
        text
        >
        Explore
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: [ 'offer' ]
}
</script>

<style lang="css" scoped>
</style>
