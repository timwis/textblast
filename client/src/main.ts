import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import Buefy from 'buefy'
import 'vuetify/dist/vuetify.min.css'

import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(Vuetify)

;(async function () {
  await store.dispatch('getStoredUser') // TODO: Better place for this?

  new Vue({ // eslint-disable-line
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
})()
