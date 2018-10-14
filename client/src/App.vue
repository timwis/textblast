<template lang="pug">
  v-app
    v-navigation-drawer(
      fixed
      clipped
      app
      v-model='drawer'
    )
      v-list(dense)
        router-link(to='/contacts' tag='v-list-tile')
          v-list-tile-action
            v-icon contacts
          v-list-tile-content
            v-list-tile-title Contacts
        router-link(to='/messages' tag='v-list-tile')
          v-list-tile-action
            v-icon message
          v-list-tile-content
            v-list-tile-title Messages
    v-toolbar(
      color='blue darken-3'
      dark
      app
      clipped-left
      fixed
    )
      v-toolbar-title
        v-toolbar-side-icon(@click.stop='drawer = !drawer')
        span TextBlast
    v-content
      v-container(fluid)
        router-view
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

import NavBar from './components/NavBar.vue'
import { State } from './types'

export default Vue.extend({
  data: () => ({
    drawer: null
  }),
  computed: mapState({
    email: (state: State) => state.user.email
  }),
  components: {
    NavBar
  }
})
</script>
