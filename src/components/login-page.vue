<template lang="html">
  <div>
    <button @click="login()">Login</button>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  methods: {
    login: function() {
      this.$api1.post("/api/login").then((response) => {
        this.$setUser(response.token)
        console.log("should be true (is authenticated)", this.$isAuthenticated())
        console.log("should be true (has permission)", this.$hasPermission("DoDomainStuffOne"))
        console.log("should be false (has permission)", this.$hasPermission("whatever"))
        console.log("should be true (has group permission)", this.$hasGroupPermission("DoGroupStuffTwo", 1))
        console.log("should be false (has group permission)", this.$hasGroupPermission("DoGroupStuffTwo", 2))
        console.log("should be false (has group permission)", this.$hasGroupPermission("whatever", 3))
        console.log("should be false (has group permission)", this.$hasGroupPermission("whatever", 1))
        console.log("should be true (has group permission)", this.$hasGroupPermission("DoGroupStuffTwo"))
        console.log("should be false (has group permission)", this.$hasGroupPermission("whatever"))
        this.$navigate('dashboard-page')
      })
    }
  }
}
</script>

<style lang="css">
</style>
