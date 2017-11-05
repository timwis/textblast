<template lang="pug">
  nav.navbar.is-link(role='navigation' aria-label='main navigation')
    div.navbar-brand
      a.navbar-item(href='/') TextBlast

      button.button.navbar-burger
        span
        span
        span

    div.navbar-menu
      div.navbar-end

        div.navbar-item.has-dropdown.is-hoverable(v-if='email')
          a.navbar-link {{ email }}
          div.navbar-dropdown
            a.navbar-item(@click.prevent='logout') Logout

        router-link.navbar-item(to='/login' v-else) Login
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  props: [
    'email'
  ],
  methods: mapActions([
    'logout'
  ])
})
</script>
