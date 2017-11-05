<template lang="pug">
  div#app
    NavBar(:email='email')
    router-view
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import NavBar from './components/NavBar.vue'
import { State } from './types'

export default Vue.extend({
  computed: mapState({
    email: (state: State) => state.user.email
  }),
  components: {
    NavBar
  }
})
</script>

<style lang="sass">
@import "~bulma/sass/utilities/initial-variables"

@import "~bulma"
</style>
