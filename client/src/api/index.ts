import { GraphQLClient } from 'graphql-request'

import { AuthenticatedUser, Recipient } from '../types'

export default class Api {
  client: GraphQLClient

  constructor (endpoint: string, token?: string) {
    const opts = (token)
      ? { headers: { Authorization: `Bearer ${token}`} }
      : {}
    this.client = new GraphQLClient(endpoint, opts)
  }

  async authenticateUser (accessToken: string): Promise<AuthenticatedUser> {
    const mutation = `
      mutation ($accessToken: String!) {
        authenticateUser(
          accessToken: $accessToken
        ) {
          id
          token
          email
        }
      }
    `
    return this.client.request<{ authenticateUser: AuthenticatedUser }>(mutation, { accessToken })
      .then((response) => response.authenticateUser)
  }

  async getRecipients (userId: string): Promise<[Recipient]> {
    const query = `
      query ($userId: ID!) {
        allRecipients(filter: {
          user: {
            id: $userId
          }
        }) {
          id
          tags
          phoneNumber
          name
          createdAt
        }
      }
    `
    return this.client.request<{allRecipients: [Recipient]}>(query, { userId })
      .then((response) => response.allRecipients)
  }
}
