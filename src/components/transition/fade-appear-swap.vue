<template lang="html">
<transition name="fadeAppear" mode="out-in">
  <slot></slot>
</transition>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.fadeAppear-enter-active {
  animation: appear 0.25s ease forwards;
}

.fadeAppear-leave-active {
  animation: fade 0.25s ease forwards;
}

@keyframes appear {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes fade {
  0% { opacity: 1; }
  100% { opacity: 0;  }
}
</style>
