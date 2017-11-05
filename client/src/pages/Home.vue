<template lang="pug">
  section.section
    div.container
      p Hello, world!
      ul
        li(v-for='recipient in recipients') {{ recipient.name }} ({{ recipient.phoneNumber }})
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

import { State } from '../types'

export default Vue.extend({
  computed: mapState({
    isLoggedIn: (state: State) => !!state.user.id,
    recipients: (state: State) => state.recipients
  }),
  created () {
    if (this.isLoggedIn) {
      console.log('getting recipients')
      this.getRecipients()
    } else console.log('not getting recipients')
  },
  methods: mapActions([
    'getRecipients'
  ])
})
</script>
