<template lang="pug">
  div#app
    NavBar
    router-view
</template>

<script lang="ts">
import NavBar from './components/NavBar.vue'

export default {
  components: {
    NavBar
  }
}
</script>

<style lang="sass">
@import "~bulma/sass/utilities/initial-variables"

@import "~bulma"
</style>
