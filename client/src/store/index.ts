import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import { State } from '../types'

Vue.use(Vuex)

const state: State = {
  user: {
    id: null,
    email: null,
    token: null
  }
}

const store = new Vuex.Store<State>({
  strict: (process.env.NODE_ENV !== 'production'),
  state,
  actions,
  mutations
})

export default store
