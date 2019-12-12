<template lang="html">
  <v-carousel
     class="mt-3"
     cycle
     height="auto"
     hide-delimiter-background
     show-arrows-on-hover
   >
     <v-carousel-item
       v-for="(image, i) in images"
       :key="i"
     >
       <v-sheet
         color="grey darken-2"
         height="100%"
       >
         <v-row
           class="fill-height"
           align="center"
           justify="center"
         >
         <v-img
            :src="image.url"
            :lazy-src="'https://picsum.photos/10/6?image=20'"
            aspect-ratio="1"
            class="grey lighten-2"
          >
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
         </v-row>
       </v-sheet>
     </v-carousel-item>
   </v-carousel>
</template>

<script>
export default {
  props: [ 'images' ]
}
</script>

<style lang="css" scoped>
</style>
