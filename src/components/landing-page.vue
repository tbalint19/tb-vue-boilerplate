<template lang="html">
  <div id="landing-page">
    <h1>Landing</h1>
    <button @click="$navigate('dashboard-page')">To dashboard page</button>
    <hr>
    <button @click="$report('Bela')">
      Report
    </button>
    <button @click="$note('Bela')">
      Note
    </button>
    <button @click="$warn('Bela')">
      Warn
    </button>
    <hr>
    <p>{{ $i('example.hello') }}</p>
    <button @click="$setLang('eng')">Eng</button>
    <button @click="$setLang('hu')">Hun</button>
  </div>
</template>

<script>
export default {
  name: "LandingPage"
}
</script>

<style lang="css">
</style>
