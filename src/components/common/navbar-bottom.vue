<template lang="html">
  <b-navbar type="light" variant="light" fixed="bottom">
    <b-navbar-nav class="ml-auto">
      <b-form-select
        v-model="selected"
        :options="options"
        size="sm"
      ></b-form-select>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      selected: 'en',
      options: [
        { value: 'hu', text: 'Magyar' },
        { value: 'en', text: 'English' },
      ],
    }
  },
  watch: {
    selected(value) {
      this.$i18n.locale = value
    },
  },
}
</script>

<style lang="css" scoped></style>
