<template>
 <div class="jumbotron" id="footer">
    <div>
      <p>Brand</p>
      <p>2018</p>
    </div>
    <div>
      <p class="link-p" @click="open('github.com')">
        <font-awesome-icon icon="code-branch"></font-awesome-icon>
        Check us on github
      </p>
      <p class="link-p" @click="open('google.com')">
        <font-awesome-icon icon="search"></font-awesome-icon>
        Google us
      </p>
    </div>
 </div>
</template>

<script>
export default {
    name: "Footer",
    methods: {
      open: function (link) {
        window.open(link)
      }
    }
}
</script>

<style scoped>
#footer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;
  margin-top: 50px;
}

.link-p:hover {
  cursor: pointer;
  text-decoration: underline;
  color: #555;
}
</style>
