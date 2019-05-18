<template lang="html">
<b-card :header="$t('login.title')">
  <b-form-input type="text" :placeholder="$t('login.username')"/>
  <b-form-input type="text" :placeholder="$t('login.password')"/>
  <hr>
  <b-button variant="outline-success btn-block">{{ $t('login.button') }}</b-button>
</b-card>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.form-control {
  margin-bottom: 10px;
}
</style>
