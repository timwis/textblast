import Vue from 'vue'
import App from './App.vue'

import router from './router/index.ts'
import store from './store/index.ts'

new Vue({ // eslint-disable-line
  el: '#app',
  router,
  store,
  render: h => h(App)
})
