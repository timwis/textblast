import { MutationTree } from 'vuex/types'

import { State, LoginSuccess } from '../types'

const mutations: MutationTree<State> = {
  RECEIVE_USER (state, payload: LoginSuccess): void {
    state.user.id = payload.id
    state.user.email = payload.email
    state.user.token = payload.token
  },

  RESET_USER (state): void {
    state.user.id = null
    state.user.email = null
    state.user.token = null
  }
}

export default mutations
