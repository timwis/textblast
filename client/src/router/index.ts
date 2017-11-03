import Vue from 'vue'
import VueRouter from 'vue-router'
import { Route } from 'vue-router/types'

import Home from '../pages/Home.vue'
import LoginCallback from '../pages/LoginCallback.vue'
import { initiateLogin } from '../store/actions.ts'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter: initiateLogin
  },
  {
    path: '/login-callback',
    name: 'loginCallback',
    component: LoginCallback,
    props: (route: Route) => ({ query: route.query })
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
