<template lang="html">
  <div id="dashboard-page">
    <h1>Dashboard</h1>
    <button @click="$navigate('landing-page')">To landing page</button>
    <p>Object from initial params: {{myData}}</p>
    <hr>
    <button @click="$addToQueryParams('name', 'bela')">Add name: bela to params</button>
    <button @click="$updateQueryParams({ age: 20 })">Set params to be only age: 20</button>
    <button @click="$updateQueryParams({})">Reset params to nothing</button>
    <button @click="$deleteQueryParam('name')">Remove the name from params</button>
    <button @click="$deleteQueryParams()">Remove all from params</button>
  </div>
</template>

<script>
export default {
  name: "DashboardPage",
  data() {
    return {
      myData: null
    }
  },
  created() {
    if (!this.$isAuthenticated()) {
      this.$navigate('login-page')
    }
    this.myData = this.$getRedirectParams()
  }
}
</script>

<style lang="css">
</style>
