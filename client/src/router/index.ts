import Vue from 'vue'
import VueRouter from 'vue-router'
import { Route, RouteConfig } from 'vue-router'

import Home from '../pages/Home.vue'
import LoginCallback from '../pages/LoginCallback.vue'
import Setup from '../pages/Setup.vue'
import { initiateLogin } from '../store/actions'
import { setupMaster } from 'cluster';

Vue.use(VueRouter)

const routes: [RouteConfig] = [
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
  },
  {
    path: '/setup',
    name: 'setup',
    component: Setup
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
