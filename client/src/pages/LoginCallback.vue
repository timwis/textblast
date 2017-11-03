<template lang="pug">
  section.section
    div.container Loading...
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  props: [
    'query'
  ],
  created (): void {
    this.finishLogin()
  },
  methods: mapActions([
    'finishLogin'
  ])
})
</script>
