<template lang="html">
  <div id="offer-page">
    <b-container fluid>
      <b-row>
        <b-col cols="6">
          <h4>{{ selected.pageContent.title }}</h4>
          <h6 class="text-center">{{ selected.pageContent.subTitle }}</h6>
        </b-col>
        <b-col cols="6">
          <b-card header="Rendelés">
            <div class="d-flex justify-content-between">
              <div class="">{{ selected.pageContent.offerDetails.price }}$</div>
              <div class="">
                {{ selected.pageContent.offerDetails.quantity }} {{ selected.pageContent.offerDetails.unit }}
              </div>
              <b-button variant="outline-success">Megrendelem</b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <hr>
      <b-row v-for="paragraph of selected.pageContent.paragraphs" :key="paragraph.text">
        <b-col cols="3">
          <b-img thumbnail fluid :src="paragraph.image"></b-img>
        </b-col>
        <b-col cols="9">
          {{ paragraph.text }}
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
      'selected'
    ])
  },
  methods: {
    ...mapActions('offers', [
      'selectOffer'
    ])
  },
  created() {
    this.selectOffer(this.$route.query.offer)
    if (!this.selected) this.$router.push("/demo")
  }
}
</script>

<style lang="css" scoped>
</style>
