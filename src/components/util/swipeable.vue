<template lang="html">
<v-touch
  v-on:swipeleft="onSwipeLeft(false)"
  v-on:swiperight="onSwipeRight(false)">
  <div class="rel">
    <transition v-bind:name="transitionName" mode="out-in">
      <slot></slot>
    </transition>
  </div>
</v-touch>
</template>

<script>
export default {
  data() {
    return {
      transitionName: null,
      interval: null,
      timeout: null
    }
  },
  props: [
    'auto'
  ],
  methods: {
    onSwipeLeft(cont) {
      this.transitionName = "toLeft"
      this.$emit('left')
      this.startAutoSwipe(cont ? 0 : 10)
    },
    onSwipeRight(cont) {
      this.transitionName = "toRight"
      this.$emit('right')
      this.startAutoSwipe(cont ? 0 : 10)
    },
    startAutoSwipe(after) {
      if (!this.auto) return
      this.stopAutoSwipe()
      const vm = this
      vm.timeout = setTimeout(function () {
        vm.interval = setInterval(function () {
          vm.onSwipeLeft(true)
        }, 5000)
      }, after*1000)
    },
    stopAutoSwipe() {
      clearTimeout(this.timeout)
      clearInterval(this.interval)
    }
  },
  created() {
    this.startAutoSwipe(0)
  },
  beforeDestroy() {
    this.stopAutoSwipe()
  }
}
</script>

<style lang="css" scoped>
.toLeft-enter-active {
  animation: toLeftEnter 0.3s ease-out forwards;
}

.toLeft-leave-active {
  animation: toLeftLeave 0.3s ease-in forwards;
}

@keyframes toLeftEnter {
  0% { opacity: 0; transform: translateX(50%); }
  100% { opacity: 1; transform: translateX(0%); }
}

@keyframes toLeftLeave {
  0% { opacity: 1; transform: translateX(0%); }
  100% { opacity: 0; transform: translateX(-50%); }
}

.toRight-enter-active {
  animation: toRightEnter 0.3s ease-out forwards;
}

.toRight-leave-active {
  animation: toRightLeave 0.3s ease-in forwards;
}

@keyframes toRightEnter {
  0% { opacity: 0; transform: translateX(-50%); }
  100% { opacity: 1; transform: translateX(0%); }
}

@keyframes toRightLeave {
  0% { opacity: 1; transform: translateX(0%); }
  100% { opacity: 0; transform: translateX(50%); }
}
</style>
