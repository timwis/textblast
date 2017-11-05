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
  async created () {
    await this.finishLogin()
    this.$router.push('/')
  },
  methods: mapActions([
    'finishLogin'
  ])
})
</script>
