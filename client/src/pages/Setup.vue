<template lang="pug">
  section.section
    div.container
      h1.title Pick a phone number
      h2.subtitle You'll send text messages from this number.

      form#search-numbers(@submit.prevent='searchNumbers')
        label(for='areaCode') Area code
        div.field.has-addons
          div.control
            input.input(
              ref='areaCode'
              id='areaCode'
              type='text'
              maxlength='3'
              placeholder='215'
            )
          div.control
            button.button.is-info(type='submit') Search

      div.panel#phone-numbers
        a.panel-block(
          v-for='number in availablePhoneNumbers'
          :key='number.phoneNumber'
          @click.prevent='selectNumber(number.phoneNumber)'
        ) {{ number.friendlyName }}
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

import { State } from '../types'

export default Vue.extend({
  computed: mapState({
    availablePhoneNumbers: (state: State) => state.availablePhoneNumbers
  }),
  methods: {
    searchNumbers () {
      const areaCodeEl = this.$refs.areaCode as HTMLInputElement
      const areaCode = areaCodeEl.value
      this.getAvailablePhoneNumbers(areaCode)
    },
    selectNumber (phoneNumber: string) {
      this.$dialog.confirm({
        message: `Select ${phoneNumber}?`,
        onConfirm: () => this.buyPhoneNumber(phoneNumber)
      })
    },
    ...mapActions([
      'getAvailablePhoneNumbers',
      'buyPhoneNumber'
    ])
  },
  created () {
    this.getAvailablePhoneNumbers()
  }
})
</script>

<style lang="sass">
#search-numbers
  margin-bottom: 20px

#phone-numbers
  max-width: 500px
</style>
