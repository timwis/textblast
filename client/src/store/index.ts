import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions.ts'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: (process.env.NODE_ENV !== 'production'),
  state: {

  },
  actions
})

export default store
