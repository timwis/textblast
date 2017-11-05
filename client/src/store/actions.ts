import { WebAuth } from 'auth0-js'
import { stringify } from 'query-string'
import { request } from 'graphql-request'
import * as pify from 'pify'
import { ActionTree } from 'vuex/types'
import * as localForage from 'localforage'

import Api from '../api'
import { State } from '../types'

const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID as string
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN as string
const AUTH0_API_IDENTIFIER = process.env.AUTH0_API_IDENTIFIER as string
const AUTH0_CALLBACK_URL = process.env.AUTH0_CALLBACK_URL as string
const API_ENDPOINT = process.env.API_ENDPOINT as string

const auth0 = new WebAuth({
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID,
  audience: AUTH0_API_IDENTIFIER,
  redirectUri: AUTH0_CALLBACK_URL,
  responseType: 'token id_token',
  scope: 'openid profile email'
})

export function initiateLogin (): void {
  auth0.authorize()
}

const actions: ActionTree<State, any> = {
  async finishLogin ({ commit, dispatch }) {
    const parseHash = pify(auth0.parseHash).bind(auth0)
    const authResult = await parseHash()
    const api = new Api(API_ENDPOINT)
    const loginResult = await api.authenticateUser(authResult.accessToken)
    commit('RECEIVE_USER', loginResult)
    dispatch('storeUser', loginResult)
  },

  async storeUser (ctx, user) {
    await localForage.setItem('user', user)
  },

  async getStoredUser ({ commit }) {
    const user = await localForage.getItem('user')
    if (user) commit('RECEIVE_USER', user)
  },

  async logout ({ commit }) {
    await localForage.removeItem('user')
    commit('RESET_USER')
  }
}

export default actions
