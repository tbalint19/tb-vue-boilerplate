<template lang="html">
<div id="landing-page">
  <b-container>
    <b-row class="justify-content-md-center">
      <b-col cols="6" s="12" lg="6">
        <landing-message-component>
        </landing-message-component>
      </b-col>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-col col s="12" lg="6">
        <login-card-component>
        </login-card-component>
      </b-col>
    </b-row>
    <b-row v-for="number in numbers">{{number}}</b-row>
  </b-container>
</div>
</template>

<script>
export default {
  data() {return {numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9]}}
}
</script>

<style lang="css" scoped>
</style>
