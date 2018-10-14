import { MutationTree } from 'vuex/types'

import { State, LoginSuccess, Recipient, AvailablePhoneNumbers } from '../types'

const mutations: MutationTree<State> = {
  RECEIVE_USER (state, payload: LoginSuccess): void {
    state.user.id = payload.id
    state.user.email = payload.email
    state.user.token = payload.token
  },

  RESET_USER (state): void {
    state.user.id = undefined
    state.user.email = undefined
    state.user.token = undefined
  },

  RECEIVE_RECIPIENTS (state, recipients: [Recipient]): void {
    state.recipients = recipients
  },

  RECEIVE_AVAILABLE_PHONE_NUMBERS (state, availablePhoneNumbers: [AvailablePhoneNumbers]): void {
    state.availablePhoneNumbers = availablePhoneNumbers
  }
}

export default mutations
