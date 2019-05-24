<template lang="html">
<b-card>
  <div class="landing-message">
    <h4>{{ $t(message.title) }}</h4>
    <p>{{ $t(message.p1) }}</p>
    <p>{{ $t(message.p2) }}</p>
  </div>
</b-card>
</template>

<script>
export default {
  props: ['message']
}
</script>

<style lang="css" scoped>
.landing-message {
  text-align: center;
}
</style>
