import { GraphQLClient } from 'graphql-request'

interface AuthenticatedUser {
  id: string
  token: string
  email: string
}

export default class Api {
  client: GraphQLClient

  constructor (endpoint: string, token?: string) {
    const opts = (token)
      ? { headers: { Authorization: `Bearer ${token}`} }
      : {}
    this.client = new GraphQLClient(endpoint, opts)
  }

  async authenticateUser (accessToken: String): Promise<AuthenticatedUser> {
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
}
