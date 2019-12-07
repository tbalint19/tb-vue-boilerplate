<template lang="html">
  <div class="loading">
    <v-row
      class="fill-height"
      align-content="center"
      justify="center"
    >
      <v-col
        class="subtitle-1 text-center"
        cols="12"
      >
        Személyre szabjuk ajánlatainkat a számodra...
      </v-col>
      <v-col cols="6">
        <v-progress-linear
          color="primary lighten-2"
          indeterminate
          rounded
          height="10"
        ></v-progress-linear>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
