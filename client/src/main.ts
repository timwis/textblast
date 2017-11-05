import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

Vue.config.productionTip = false

;(async function () {
  await store.dispatch('getStoredUser') // TODO: Better place for this?

  new Vue({ // eslint-disable-line
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
})()
