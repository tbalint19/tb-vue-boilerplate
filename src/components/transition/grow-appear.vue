<template lang="html">
<transition name="growAppearAndCollapseFade">
  <slot></slot>
</transition>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.growAppearAndCollapseFade-enter-active {
  animation: grow-and-appear 1.2s ease forwards;
}

.growAppearAndCollapseFade-leave-active {
  animation: collapse-and-fade 1.2s ease forwards;
}

@keyframes grow-and-appear {
  0% { opacity: 0; max-height: 0; }
  20% { opacity: 0; }
  60% { max-height: 25em; }
  100% { opacity: 1; max-height: 25em; }
}

@keyframes collapse-and-fade {
  0% { opacity: 1; max-height: 25em; }
  20% { max-height: 25em; }
  60% { opacity: 0; }
  100% { opacity: 0; max-height: 0; }
}
</style>
