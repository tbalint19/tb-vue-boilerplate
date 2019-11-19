<template lang="html">
  <div class="voda-heading">
    <h4>{{ text }}</h4>
  </div>
</template>

<script>
export default {
  props: [ 'text' ]
}
</script>

<style lang="css" scoped>
.voda-heading {
  color: red;
  text-decoration: underline;
  text-align: center;
  box-shadow: 0 0 10px red;
  transition: color 3s, transform 3s cubic-bezier(0.98, -1.26, 0.49, 2.1), opacity 3s;
  font-size: 1em;
  opacity: 1;
}

.voda-heading:hover {
  color: green;
  box-shadow: 0 0 10px green;
  transform: scale(1.7);
  opacity: 0.3;
}

</style>
