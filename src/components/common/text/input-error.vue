<template>
  <grow-appear>
    <p v-if="condition">
      <slide-swap>
        <p class="small text-danger" :key="localization">
          <span class="faded">
            <v-icon name="exclamation-triangle" />
            {{ $t(localization) }}
          </span>
        </p>
      </slide-swap>
    </p>
  </grow-appear>
</template>

<script>
export default {
  props: ["localization", "condition"],
}
</script>

<style lang="css" scoped>
.faded {
  opacity: 0.7;
}
</style>
