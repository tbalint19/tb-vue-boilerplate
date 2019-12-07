<template lang="html">
  <div class="about">
    <v-container fluid>
      <v-row>
        <v-col cols="4" justify="center">
          <v-alert
            border="top"
            colored-border
            type="info"
            elevation="2"
          >
          {{ selected.title }} - {{ selected.subtitle }}
          </v-alert>
          <hr>
          <v-carousel
             cycle
             height="400"
             hide-delimiter-background
             show-arrows-on-hover
           >
             <v-carousel-item
               v-for="(image, i) in selected.images"
               :key="i"
             >
               <v-sheet
                 color="info"
                 height="100%"
               >
                 <v-row
                   class="fill-height"
                   align="center"
                   justify="center"
                 >
                 <v-img
                    :src="image"
                    :lazy-src="'https://picsum.photos/10/6?image=20'"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    max-width="500"
                    max-height="300"
                  >
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                    >
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-row>
                  </v-img>
                 </v-row>
               </v-sheet>
             </v-carousel-item>
           </v-carousel>
        </v-col>
        <v-col cols="8" justify="center">
          <v-card
            class="mx-auto"
          >
            <v-card-text>
              <p class="text-justify">{{ selected.description }}</p>
            </v-card-text>
          </v-card>
          <div class="d-flex flex-row-reverse mt-3">
            <v-btn color="success" class="ml-3">
              Megvásárolom
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
            <v-btn depressed @click="$router.push('/')">
              <v-icon>menu_open</v-icon>
              Másik készüléket keresek
            </v-btn>
          </div>
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
