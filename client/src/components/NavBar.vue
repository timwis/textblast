<template lang="pug" functional>
  nav.navbar.is-link(role='navigation' aria-label='main navigation')
    div.navbar-brand
      a.navbar-item(href='/') TextBlast

      button.button.navbar-burger
        span
        span
        span
    div.navbar-menu
      div.navbar-end
        a.navbar-item(href='/login') Login
</template>
