<template>
  <div :class="compClass" @click="props.close">
    <div class="card-header">
      <p class="card-text">
        {{ $t(props.item.text) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['props'],
  methods: {
    is(type) {
      return this.props.item.text.split('.')[0] == type
    },
    isNeither() {
      return !this.is('success') && !this.is('error')
    },
  },
  computed: {
    compClass() {
      return {
        card: true,
        'm-2': true,
        'w-shadow': true,
        'text-white': true,
        'bg-success': this.is('success'),
        'bg-danger': this.is('error'),
        'bg-secondary': this.isNeither(),
      }
    },
  },
}
</script>

<style lang="css" scoped>
.w-shadow {
  box-shadow: 0 0 7px #777;
  transition: opacity 0.5s;
  cursor: pointer;
}

.w-shadow:hover {
  opacity: 0.5;
}
</style>
