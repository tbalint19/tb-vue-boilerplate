<template>
  <transition name="toLeft" mode="out-in">
    <slot></slot>
  </transition>
</template>

<script>
export default {}
</script>

<style lang="css" scoped>
.toLeft-enter-active {
  animation: toLeftEnter 0.2s ease-out forwards;
}
.toLeft-leave-active {
  animation: toLeftLeave 0.2s ease-in forwards;
}
@keyframes toLeftEnter {
  0% {
    opacity: 0;
    transform: translateX(10%);
  }
  100% {
    opacity: 1;
    transform: translateX(0%);
  }
}
@keyframes toLeftLeave {
  0% {
    opacity: 1;
    transform: translateX(0%);
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    transform: translateX(-5%);
  }
}
</style>
