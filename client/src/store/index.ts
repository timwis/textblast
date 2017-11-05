import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import { State, Recipient } from '../types'

Vue.use(Vuex)

const state: State = {
  user: {
    id: undefined,
    email: undefined,
    token: undefined
  },
  recipients: []
}

const store = new Vuex.Store<State>({
  strict: (process.env.NODE_ENV !== 'production'),
  state,
  actions,
  mutations
})

export default store
