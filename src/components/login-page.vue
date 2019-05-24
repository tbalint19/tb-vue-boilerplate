<template lang="html">
<div id="landing-page">
  <b-container>
    <b-row class="justify-content-md-center">
      <b-col s="12" md="6">
        <swipeable @left="next" @right="previous" :auto="true">
          <landing-message-card
            v-for="message in messages"
            v-if="isSelected(message)"
            :key="message.title"
            :message="message">
          </landing-message-card>
        </swipeable>
      </b-col>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-col s="12" md="6">
        <login-card>
        </login-card>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('landing', [
      'messages'
    ]),
    ...mapGetters('landing', [
      'isSelected'
    ])
  },
  methods: {
    ...mapMutations('landing', {
      previous: "PREVIOUS",
      next: "NEXT"
    })
  }
}
</script>

<style lang="css" scoped>
.row {
  margin-bottom: 20px;
}
</style>
