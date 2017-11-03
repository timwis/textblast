import { WebAuth } from 'auth0-js'
import { stringify } from 'query-string'
import { request } from 'graphql-request'
import * as pify from 'pify'

import * as api from '../api/index.ts'

const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID as string
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN as string
const AUTH0_API_IDENTIFIER = process.env.AUTH0_API_IDENTIFIER as string
const AUTH0_CALLBACK_URL = process.env.AUTH0_CALLBACK_URL as string

const auth0 = new WebAuth({
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID,
  audience: AUTH0_API_IDENTIFIER,
  redirectUri: AUTH0_CALLBACK_URL,
  responseType: 'token id_token',
  scope: 'openid profile email'
})

export function initiateLogin ():void {
  auth0.authorize()
}

export async function finishLogin () {
  const parseHash = pify(auth0.parseHash).bind(auth0)
  const authResult = await parseHash()
  const loginResult = await api.authenticateUser(authResult.accessToken)
  console.log(loginResult)
}
