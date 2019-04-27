<template lang="html">
  <div id="other-page">
    <div class="container">
      <p>Other page</p>
      <button class="btn btn-outline-secondary" @click="$router.push('/')">
        Back to landing page
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "OtherPage"
}
</script>

<style lang="css" scoped>
</style>
